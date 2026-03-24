export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };

    // Manejo de CORS preflight
    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

    try {
        // ---------------------------------------------------------
        // 1. ENDPOINT: CREAR COTIZACIÓN (Desde el Panel)
        // ---------------------------------------------------------
        if (request.method === "POST" && url.searchParams.get("accion") === "crear_cotizacion") {
            const data = await request.json();
            
            // Asegurar cliente
            await env.DB.prepare("INSERT OR IGNORE INTO Clientes (placa) VALUES (?)").bind(data.placa).run();
            
            // Generar token único
            const token = crypto.randomUUID(); 
            
            // Insertar en Cotizaciones
            const stmt = env.DB.prepare(`
                INSERT INTO Cotizaciones (cliente_id, placa, tecnico, kilometraje, detalles, monto, whatsapp, estado, token, fecha_creacion)
                VALUES ((SELECT id FROM Clientes WHERE placa = ?), ?, ?, ?, ?, ?, 'Pendiente', ?, datetime('now'))
            `);
            
            await stmt.bind(data.placa, data.placa, data.tecnico, data.km, data.detalles, data.monto, data.whatsapp, token).run();
            
            return new Response(JSON.stringify({ success: true, token: token }), { headers: corsHeaders });
        }

        // ---------------------------------------------------------
        // 2. ENDPOINT: PÁGINA DE APROBACIÓN CON FIRMA (Para el Cliente)
        // ---------------------------------------------------------
        if (request.method === "GET" && url.pathname.startsWith("/aprobar")) {
            const token = url.searchParams.get("token");
            
            // Buscar cotización
            const { results } = await env.DB.prepare("SELECT * FROM Cotizaciones WHERE token = ?").bind(token).all();
            
            if (results.length === 0) return new Response("Enlace inválido o expirado", { status: 404 });
            
            const cot = results[0];

            // Si ya está aprobado, mostrar mensaje final
            if (cot.estado === 'Aprobado') {
                return new Response(`
                    <!DOCTYPE html>
                    <body style="font-family:sans-serif; text-align:center; padding:20px; background:#f3f4f6;">
                        <div style="background:white; padding:30px; border-radius:10px; max-width:400px; margin:50px auto; box-shadow:0 4px 6px rgba(0,0,0,0.1);">
                            <h1 style="color:green; font-size:50px;">✅</h1>
                            <h2 style="color:#1f2937;">¡Aprobado!</h2>
                            <p style="color:#6b7280;">Ya has firmado y autorizado esta orden. El técnico ha sido notificado.</p>
                        </div>
                    </body>
                `, { headers: { "Content-Type": "text/html" } });
            }

            // Si está pendiente, mostrar la interfaz con el Canvas de Firma
            const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <title>Autorizar Servicio - GlobalPro</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                    /* Evitar scroll mientras se firma */
                    body { overscroll-behavior: none; }
                    canvas { touch-action: none; cursor: crosshair; }
                </style>
            </head>
            <body class="bg-slate-100 min-h-screen flex items-center justify-center p-4">
                <div class="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
                    <!-- Header -->
                    <div class="bg-blue-900 p-6 text-white text-center">
                        <h2 class="text-xl font-bold">Autorización de Trabajo</h2>
                        <p class="text-blue-200 text-sm">Placa: ${cot.placa}</p>
                    </div>

                    <div class="p-6">
                        <div class="bg-blue-50 p-4 rounded-lg mb-6 text-center">
                            <p class="text-xs text-blue-500 uppercase font-bold">Monto Estimado</p>
                            <p class="text-3xl font-black text-blue-900">$${cot.monto}</p>
                            <p class="text-sm text-gray-600 mt-2 leading-snug">${cot.detalles}</p>
                        </div>

                        <p class="text-center text-sm text-gray-500 mb-2">Firme abajo con su dedo para aceptar:</p>
                        
                        <!-- CANVAS DE FIRMA -->
                        <div class="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 mb-4 relative">
                            <canvas id="sig-canvas" width="350" height="150" class="w-full h-40 bg-white rounded"></canvas>
                            <button onclick="limpiarFirma()" class="absolute top-2 right-2 text-xs text-red-500 font-bold bg-white px-2 py-1 border rounded shadow">BORRAR</button>
                        </div>

                        <button id="btnFirmar" onclick="enviarFirma()" class="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-green-500 active:scale-95 transition flex items-center justify-center gap-2">
                            <span>✍️ FIRMAR Y ACEPTAR</span>
                        </button>
                    </div>
                </div>

                <script>
                    const canvas = document.getElementById('sig-canvas');
                    const ctx = canvas.getContext('2d');
                    let drawing = false;

                    // Ajustar canvas a pantalla
                    function resizeCanvas() {
                        const rect = canvas.getBoundingClientRect();
                        canvas.width = rect.width;
                        canvas.height = rect.height;
                        ctx.lineWidth = 2;
                        ctx.lineCap = 'round';
                        ctx.strokeStyle = '#000';
                    }
                    window.addEventListener('resize', resizeCanvas);
                    resizeCanvas();

                    // Eventos Mouse/Touch para dibujar
                    function start(e) { drawing = true; ctx.beginPath(); draw(e); }
                    function end() { drawing = false; ctx.beginPath(); }
                    function draw(e) {
                        if (!drawing) return;
                        e.preventDefault();
                        const rect = canvas.getBoundingClientRect();
                        const x = (e.clientX || e.touches[0].clientX) - rect.left;
                        const y = (e.clientY || e.touches[0].clientY) - rect.top;
                        ctx.lineTo(x, y);
                        ctx.stroke();
                    }

                    canvas.addEventListener('mousedown', start);
                    canvas.addEventListener('mouseup', end);
                    canvas.addEventListener('mousemove', draw);
                    canvas.addEventListener('touchstart', start, {passive: false});
                    canvas.addEventListener('touchend', end);
                    canvas.addEventListener('touchmove', draw, {passive: false});

                    function limpiarFirma() { ctx.clearRect(0, 0, canvas.width, canvas.height); }

                    async function enviarFirma() {
                        // Validar si está vacío (básico)
                        // Convertir canvas a imagen Base64
                        const imagenBase64 = canvas.toDataURL(); 
                        
                        const btn = document.getElementById('btnFirmar');
                        btn.innerText = "ENVIANDO...";
                        btn.disabled = true;

                        try {
                            const res = await fetch('?token=${token}&confirmar_firma=si', {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({ firma: imagenBase64 })
                            });
                            if(res.ok) {
                                document.body.innerHTML = '<div class="text-center p-10"><h1 class="text-6xl text-green-500 mb-4">✅</h1><h2 class="text-2xl font-bold">¡Gracias!</h2><p>Su firma ha sido registrada.</p></div>';
                            } else {
                                alert("Error al guardar firma");
                                btn.disabled = false;
                                btn.innerText = "REINTENTAR";
                            }
                        } catch(e) { alert("Error de red"); btn.disabled = false; }
                    }
                </script>
            </body>
            </html>
            `;
            return new Response(html, { headers: { "Content-Type": "text/html" } });
        }

        // ---------------------------------------------------------
        // 3. ENDPOINT: RECIBIR FIRMA (POST Interno del Canvas)
        // ---------------------------------------------------------
        if (request.method === "POST" && url.pathname.startsWith("/aprobar")) {
            if (url.searchParams.get("confirmar_firma") === "si") {
                const token = url.searchParams.get("token");
                const data = await request.json();
                
                // Actualizar estado y guardar la imagen
                await env.DB.prepare("UPDATE Cotizaciones SET estado = 'Aprobado', firma_imagen = ? WHERE token = ?")
                    .bind(data.firma, token)
                    .run();
                
                return new Response("OK");
            }
        }

        // ---------------------------------------------------------
        // 4. ENDPOINT: CONSULTAR ESTADO (Para el Panel)
        // ---------------------------------------------------------
        if (request.method === "GET" && url.searchParams.get("tipo") === "estado_aprobacion") {
            const placa = url.searchParams.get("placa");
            const { results } = await env.DB.prepare("SELECT * FROM Cotizaciones WHERE placa = ? ORDER BY id DESC LIMIT 5").bind(placa).all();
            return new Response(JSON.stringify(results), { headers: corsHeaders });
        }

        // --- TU CÓDIGO ORIGINAL (Eventos y Citas) ---
        // Mantenemos la lógica original para guardar rápido
        if (request.method === "POST") {
            const data = await request.json();
            // Si es el guardado rápido (tipo OT)
            if (data.tipo === 'OT') {
                await env.DB.prepare("INSERT OR IGNORE INTO Clientes (placa) VALUES (?)").bind(data.placa).run();
                await env.DB.prepare(`
                    INSERT INTO Eventos (cliente_id, fecha_hora, tecnico_nombre, kilometraje, notas_exigibles)
                    VALUES ((SELECT id FROM Clientes WHERE placa = ?), datetime('now', 'localtime'), ?, ?, ?)
                `).bind(data.placa, data.tecnico, data.km, data.notas).run();
                return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
            }
            // Aquí iría tu lógica de Citas si la usas...
        }
        
        // ... (Resto de tu lógica GET para Citas si la necesitas) ...

        return new Response("Ok", { headers: corsHeaders });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
    }
}