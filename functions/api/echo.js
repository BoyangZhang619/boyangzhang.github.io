export async function onRequestPost({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
      status: 400,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
  const send = {
    ok: true,
    youSent: body,
    IP: request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "Unknown",
    timestamp: Date.now(),
  };
  return new Response(JSON.stringify(send), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
