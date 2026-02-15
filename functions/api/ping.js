export async function onRequestGet() {
try {
    const body = {
        ok: true,
        message: "as we all know, zby is the best",
        timestamp: Date.now(),
    };
    return new Response(JSON.stringify(body), {
        headers: {
            "content-type": "application/json; charset=utf-8",
            "cache-control": "no-cache no-store"
        }
    });
}
catch (error) {
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
        status: 500,
        headers: { "content-type": "application/json; charset=utf-8" },
    });
}}