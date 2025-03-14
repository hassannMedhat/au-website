// app/api/set-token/route.js
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    if (!token) {
      return new Response(JSON.stringify({ error: "Token not provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    const maxAge = 7 * 24 * 60 * 60;
    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": `token=${token}; Path=/; Max-Age=${maxAge}; SameSite=Lax`,
        "Location": "/",
      },
    });
  }
  