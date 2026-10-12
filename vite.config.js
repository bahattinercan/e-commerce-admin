import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const apiUrl = process.env.VITE_API_URL || "http://localhost:4000";

// Injects a Content-Security-Policy into the served/built HTML so it also
// applies in production (a <meta> tag baked into index.html could not know the
// configured API host).
const cspPlugin = () => ({
  name: "security-headers",
  transformIndexHtml(html) {
    const csp = [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      `img-src 'self' data: ${apiUrl}`,
      `connect-src 'self' ${apiUrl}`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join("; ");

    return html.replace(
      '<meta name="viewport"',
      `<meta http-equiv="Content-Security-Policy" content="${csp}" />\n  <meta name="viewport"`
    );
  },
});

export default defineConfig({
  plugins: [react(), cspPlugin()],
});
