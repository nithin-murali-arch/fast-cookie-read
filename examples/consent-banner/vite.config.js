import { defineConfig } from 'vite';

export default defineConfig({ server: { allowedHosts: ['app.example.test', 'www.example.test'] } });
