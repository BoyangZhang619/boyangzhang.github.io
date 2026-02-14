export async function onRequestGet() {
  const data = {
    ok: true,
    message: "pong",
    ts: Date.now(),
  };

  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
