import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  optimizeDeps: {
    include: [
      "pako",
      "pako/lib/zlib/inflate.js",
      "pako/lib/zlib/deflate.js",
      "pako/lib/zlib/zstream.js",
    ],
  },

  ssr: {
    noExternal: [
      "@react-pdf/renderer",
      "pako",
    ],
  },
});