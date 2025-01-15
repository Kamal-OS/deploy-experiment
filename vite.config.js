import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
    define: {
        global: {},
    },
    plugins: [
        react(),

        // Vite's visualizer plugin
        visualizer({
            open: true // Open automatically after build
        })
    ],
    base: "/deploy-experiment/",

    // Code splitting
    // This will generate separate JS files for each library loaded
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.includes('plotly.js')
                            ? id.split('node_modules/')[1]
                            : id.split('node_modules/')[1].split('/')[0];
                    }
                }
            }
        }
    },
});