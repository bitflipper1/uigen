import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// The HotD dashboard is a self-contained, client-only React feature that lives
// in the main Next.js app under src/. This tiny Vite project bundles just that
// feature into a static site for GitHub Pages, reusing the exact same source
// via the "@" alias (pointed at the repo's src/).
//
// `base` must match the GitHub Pages project path, i.e. the repo name, so that
// asset URLs resolve at https://<user>.github.io/<repo>/.
export default defineConfig({
  base: "/uigen/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("../src", import.meta.url)),
    },
  },
});
