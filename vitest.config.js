/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,
    css: true,
    setupFiles: "./src/utils/extendsVitest.js",
  },
  resolve: {
    alias: {
      services: path.resolve(__dirname, "./src/services"),
      Components: path.resolve(__dirname, "./src/Components"),
      config: path.resolve(__dirname, "./src/config"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      utils: path.resolve(__dirname, "./src/utils"),
    },
  },
});
