import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

// The HotD dashboard is a self-contained, client-only React feature that lives
// in the main Next.js app under src/. This tiny Vite project bundles just that
// feature into a static site for GitHub Pages, reusing the exact same source
// via the "@" alias (pointed at the repo's src/).
//
// Because the shared source lives OUTSIDE this project, the bare imports it
// makes (e.g. clsx / tailwind-merge via @/lib/utils) would otherwise be
// resolved against a root node_modules that only exists when the whole app is
// installed. Pin them to THIS project's node_modules so the static build is
// fully self-contained and works in CI without a root `npm install`.
//
// `base` must match the GitHub Pages project path, i.e. the repo name, so that
// asset URLs resolve at https://<user>.github.io/<repo>/.
export default defineConfig({
  base: "/uigen/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("../src", import.meta.url)),
      clsx: require.resolve("clsx"),
      "tailwind-merge": require.resolve("tailwind-merge"),
    },
  },
});
