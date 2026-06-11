import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    // بنجبر الـ nitro الداخلي إنه يحول الـ target لـ vercel
    nitro: {
      preset: "vercel"
    }
  }
});
