import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // السطر اللي تحت ده محطوط عشان يرضي Cloudflare وميوقعش الـ Build
  plugins: [],
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
