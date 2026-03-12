import hono from "@/api/hono";
import html from "@/src/index.html";
import { serve } from "bun";
import { env } from "@/env";

const isDev = env.NODE_ENV === "development";

const server = serve({
    development: isDev
        ? {
            hmr: true,
            console: false,
        }
        : false,
    port: process.env.PORT,

    routes: {
        "/api/v1/*": (req, server) => hono.fetch(req, server),

        "/static/*": (req) => {
            const url = new URL(req.url);
            const filePath = url.pathname.replace("/static/", "");
            const file = Bun.file(`public/${filePath}`);
            return new Response(file);
        },

        "/*": html,
    },


    error(error) {
        console.error(error);
        return new Response(`Internal Error: ${error.message}`, { status: 500 });
    },
});

console.log("Server", {
    bunVersion: Bun.version,
    port: env.PORT,
    env: isDev ? "development" : "production",
    url: server.url.href,
})
