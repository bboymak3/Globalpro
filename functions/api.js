export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

    try {
        // --- GUARDAR CITA (POST) ---
        if (request.method === "POST") {
            const data = await request.json();
            
            // 1. Asegurar que el cliente existe
            await env.DB.prepare("INSERT OR IGNORE INTO Clientes (placa) VALUES (?)")
                .bind(data.placa).run();
            
            // 2. Insertar la cita
            await env.DB.prepare(`
                INSERT INTO Citas (cliente_id, fecha_cita, hora_cita, servicio)
                VALUES ((SELECT id FROM Clientes WHERE placa = ?), ?, ?, ?)
            `).bind(data.placa, data.fecha, data.hora, data.servicio).run();

            return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
        }

        // --- CONSULTAR CITAS (GET) ---
        if (request.method === "GET") {
            const periodo = url.searchParams.get("periodo");
            let sql = `
                SELECT c.placa, ct.fecha_cita, ct.hora_cita, ct.servicio 
                FROM Citas ct 
                JOIN Clientes c ON c.id = ct.cliente_id 
            `;
            
            if (periodo === "hoy") {
                sql += "WHERE ct.fecha_cita = date('now', 'localtime') ";
            } else if (periodo === "manana") {
                sql += "WHERE ct.fecha_cita = date('now', '+1 day', 'localtime') ";
            } else {
                sql += "WHERE ct.fecha_cita >= date('now', 'start of month') ";
            }
            
            sql += "ORDER BY ct.fecha_cita ASC, ct.hora_cita ASC";

            const { results } = await env.DB.prepare(sql).all();
            return new Response(JSON.stringify(results), { 
                headers: { ...corsHeaders, "Content-Type": "application/json" } 
            });
        }
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { 
            status: 500, 
            headers: corsHeaders 
        });
    }
}
