import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';

export default defineConfig({ plugins: [qwikVite({
  client: { input: ['src/root.tsx'], devInput: 'src/entry.dev.tsx' },
  ssr: { input: 'src/entry.ssr.tsx' }
})] });
