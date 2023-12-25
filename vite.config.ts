import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        react(),
        dts({
            include: ['src'],
            outDir: 'dist',
        })
    ],
    root: "src",
    build: {
        lib: {
            entry: resolve(__dirname, "src/components/Carousel.tsx"),
            formats: ['es'],
        },
        rollupOptions: {
            output: {
                dir: "dist",
            },
            external: ['react', 'react-dom']
        },
    },
    server: {
        open: './examples/index.html',
    },
});