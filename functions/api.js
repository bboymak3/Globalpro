// ... (dentro del bloque if (request.method === "GET"))
const periodo = url.searchParams.get("periodo");
let sql = `
    SELECT c.placa, ct.fecha_cita, ct.hora_cita, ct.servicio 
    FROM Citas ct 
    JOIN Clientes c ON c.id = ct.cliente_id 
`;

if (periodo === "ayer") {
    sql += "WHERE ct.fecha_cita = date('now', '-1 day', 'localtime') ";
} else if (periodo === "hoy") {
    sql += "WHERE ct.fecha_cita = date('now', 'localtime') ";
} else if (periodo === "manana") {
    sql += "WHERE ct.fecha_cita = date('now', '+1 day', 'localtime') ";
} else if (periodo === "mes") {
    sql += "WHERE strftime('%m', ct.fecha_cita) = strftime('%m', 'now', 'localtime') ";
} else {
    // Si no hay filtro o es "todos", mostrar todo lo pendiente en adelante
    sql += "WHERE ct.fecha_cita >= date('now', '-1 month', 'localtime') ";
}

sql += "ORDER BY ct.fecha_cita DESC, ct.hora_cita ASC";

const { results } = await env.DB.prepare(sql).all();
return new Response(JSON.stringify(results), { 
    headers: { ...corsHeaders, "Content-Type": "application/json" } 
});
