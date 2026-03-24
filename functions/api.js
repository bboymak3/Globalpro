export async function onRequest(context) {
    const { request, env } = context;
    
    // Prueba de Quemado: Si esto aparece, el código nuevo está activo.
    if (request.url.includes("crear_cotizacion")) {
         return new Response(JSON.stringify({ mensaje: "Soy el NUEVO codigo - Funciona el Deploy", token: "test-123" }), {
            headers: { "Content-Type": "application/json" }
        });
    }

    return new Response("Worker actualizado, pero no es la ruta de prueba");
}