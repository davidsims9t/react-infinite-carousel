import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
    test: {
        globals: true,
        environment: 'happy-dom',
        coverage: {
            provider: 'v8',
            reporter: ['text'],
        },
    },
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
            formats: ['es', 'cjs'],
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