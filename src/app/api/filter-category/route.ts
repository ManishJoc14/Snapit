export async function GET(req: Request) {
    const params = new URLSearchParams(req.url.split("?")[1]);

    try {
        const response = await fetch(`https://snap-it-umber.vercel.app/api/filter-category?${params.toString()}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();

        return new Response(JSON.stringify({ data }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Allow all origins (change for security)
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    } catch (error) {
        console.error("Error fetching data:", error);

        return new Response(JSON.stringify({ error: "Failed to fetch categories" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
