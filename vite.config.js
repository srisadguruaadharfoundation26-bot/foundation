import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [
    {
      name: "shield-bank-assets",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = (req.url || "").split("?")[0].toLowerCase();
          if (
            url.includes("donation-qr") ||
            url.includes("uco-bank-payment")
          ) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end("404 Not Found");
            return;
          }
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = (req.url || "").split("?")[0].toLowerCase();
          if (
            url.includes("donation-qr") ||
            url.includes("uco-bank-payment")
          ) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end("404 Not Found");
            return;
          }
          next();
        });
      },
    },
  ],
});

