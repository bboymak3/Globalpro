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
        // --- 1. LÓGICA DE LA IA (El Chatbot) ---
        // Si la petición va a /api/chat o es un POST sin tipo 'OT' ni 'CITA'
        if (url.pathname.includes("chat") || (request.method === "POST" && !url.searchParams.get("periodo"))) {
            const body = await request.json();
            
            // Si el mensaje es para la IA (no es formulario)
            if (body.messages) {
                const response = await env.AI.run('@cf/google/gemma-7b-it-loas', {
                    messages: [
                        { role: 'system', content: 'Eres el asistente virtual de Global Pro Automotriz en Barinas. Eres experto en mecánica y ayudas a agendar citas.' },
                        ...body.messages
                    ]
                });
                return new Response(JSON.stringify(response), { headers: corsHeaders });
            }
        }

        // --- 2. LÓGICA DE BASE DE DATOS (OT y Citas) ---
        if (request.method === "POST") {
            const data = await request.json();
            await env.DB.prepare("INSERT OR IGNORE INTO Clientes (placa) VALUES (?)").bind(data.placa).run();

            if (data.tipo === 'OT') {
                await env.DB.prepare(`
                    INSERT INTO Eventos (cliente_id, fecha_hora, tecnico_nombre, kilometraje, notas_exigibles)
                    VALUES ((SELECT id FROM Clientes WHERE placa = ?), CURRENT_TIMESTAMP, ?, ?, ?)
                `).bind(data.placa, data.tecnico, data.km, data.detalles).run();
                return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
            } else {
                await env.DB.prepare(`
                    INSERT INTO Citas (cliente_id, fecha_cita, hora_cita, servicio, whatsapp, estado)
                    VALUES ((SELECT id FROM Clientes WHERE placa = ?), ?, ?, ?, ?, 'Pendiente')
                `).bind(data.placa, data.fecha, data.hora, data.servicio, data.whatsapp).run();
                return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
            }
        }

        // --- 3. CONSULTAS Y ESTATUS (GET / PATCH) ---
        if (request.method === "PATCH") {
            const { id, nuevoEstado } = await request.json();
            await env.DB.prepare("UPDATE Citas SET estado = ? WHERE id = ?").bind(nuevoEstado, id).run();
            return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
        }

        if (request.method === "GET") {
            const periodo = url.searchParams.get("periodo");
            const placa = url.searchParams.get("placa");
            
            if (url.searchParams.get("tipo") === "consulta") {
                const { results } = await env.DB.prepare(`
                    SELECT estado FROM Citas ct JOIN Clientes c ON c.id = ct.cliente_id 
                    WHERE c.placa = ? ORDER BY ct.id DESC LIMIT 1
                `).bind(placa).all();
                return new Response(JSON.stringify(results), { headers: corsHeaders });
            }

            let sql = "SELECT ct.id, c.placa, ct.fecha_cita, ct.hora_cita, ct.servicio, ct.whatsapp, ct.estado FROM Citas ct JOIN Clientes c ON c.id = ct.cliente_id ";
            if (periodo === "hoy") sql += "WHERE ct.fecha_cita = date('now', 'localtime') ";
            else if (periodo === "manana") sql += "WHERE ct.fecha_cita = date('now', '+1 day', 'localtime') ";
            else if (periodo === "ayer") sql += "WHERE ct.fecha_cita = date('now', '-1 day', 'localtime') ";
            
            const { results } = await env.DB.prepare(sql).all();
            return new Response(JSON.stringify(results), { headers: corsHeaders });
        }

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
    }
}
