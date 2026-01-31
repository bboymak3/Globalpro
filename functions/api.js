export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

    try {
        // --- 1. GUARDAR DATOS (POST) ---
        if (request.method === "POST") {
            const data = await request.json();
            
            // Primero aseguramos que el cliente existe por su placa
            await env.DB.prepare("INSERT OR IGNORE INTO Clientes (placa) VALUES (?)")
                .bind(data.placa).run();

            // CASO A: Es una Orden de Trabajo (OT)
            if (data.tipo === 'OT') {
                await env.DB.prepare(`
                    INSERT INTO Eventos (cliente_id, fecha_hora, tecnico_nombre, kilometraje, notas_exigibles)
                    VALUES ((SELECT id FROM Clientes WHERE placa = ?), CURRENT_TIMESTAMP, ?, ?, ?)
                `).bind(data.placa, data.tecnico, data.km, data.detalles).run();
                
                return new Response(JSON.stringify({ success: true, msg: "OT Guardada" }), { headers: corsHeaders });
            } 
            
            // CASO B: Es una Cita
            else {
                await env.DB.prepare(`
                    INSERT INTO Citas (cliente_id, fecha_cita, hora_cita, servicio, whatsapp, estado)
                    VALUES ((SELECT id FROM Clientes WHERE placa = ?), ?, ?, ?, ?, 'Pendiente')
                `).bind(data.placa, data.fecha, data.hora, data.servicio, data.whatsapp).run();
                
                return new Response(JSON.stringify({ success: true, msg: "Cita Guardada" }), { headers: corsHeaders });
            }
        }

        // --- 2. ACTUALIZAR ESTADO DE CITA (PATCH) ---
        if (request.method === "PATCH") {
            const { id, nuevoEstado } = await request.json();
            await env.DB.prepare("UPDATE Citas SET estado = ? WHERE id = ?")
                .bind(nuevoEstado, id).run();
            return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
        }

        // --- 3. CONSULTAR DATOS (GET) ---
        if (request.method === "GET") {
            const placa = url.searchParams.get("placa");
            const tipo = url.searchParams.get("tipo");
            const periodo = url.searchParams.get("periodo");

            // Consulta de Estatus para el Cliente
            if (tipo === "consulta") {
                const { results } = await env.DB.prepare(`
                    SELECT estado, fecha_cita, servicio FROM Citas ct 
                    JOIN Clientes c ON c.id = ct.cliente_id 
                    WHERE c.placa = ? ORDER BY ct.id DESC LIMIT 1
                `).bind(placa).all();
                return new Response(JSON.stringify(results), { headers: corsHeaders });
            }

            // Listado de Citas para el Panel de Sistema
            let sql = `
                SELECT ct.id, c.placa, ct.fecha_cita, ct.hora_cita, ct.servicio, ct.whatsapp, ct.estado 
                FROM Citas ct 
                JOIN Clientes c ON c.id = ct.cliente_id 
            `;
            
            if (periodo === "hoy") {
                sql += "WHERE ct.fecha_cita = date('now', 'localtime') ";
            } else if (periodo === "manana") {
                sql += "WHERE ct.fecha_cita = date('now', '+1 day', 'localtime') ";
            } else if (periodo === "ayer") {
                sql += "WHERE ct.fecha_cita = date('now', '-1 day', 'localtime') ";
            } else if (periodo === "mes") {
                sql += "WHERE strftime('%m', ct.fecha_cita) = strftime('%m', 'now', 'localtime') ";
            }

            sql += "ORDER BY ct.fecha_cita DESC, ct.hora_cita ASC";
            const { results } = await env.DB.prepare(sql).all();
            return new Response(JSON.stringify(results), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
    }
}
