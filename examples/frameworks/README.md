# Run the framework examples

Each example declares the published library. You can replace it with a local `npm pack` archive to verify changes before publishing. Use Node 22.12 or newer.

From the repository root, pack the library first.

```sh
npm ci
npm pack --pack-destination examples/frameworks
```

Choose `solid`, `lit`, `astro`, or `qwik`, then install and run that app.

```sh
cd examples/frameworks/solid
npm install
npm install --no-save --package-lock=false ../fast-cookie-read-2.0.7.tgz
npm run build
npm run preview
```

Open the printed local URL. The page starts with `light` when no `theme` cookie exists. Click **Toggle theme** to write `dark`, then reload to check that the cookie persists. All examples use the same cookie name and path, so pages on the same hostname share the preference.

Solid reads cookies in `onMount`. Its server render uses the same initial `light` value. Run `node check-ssr.mjs` in the Solid directory to render the component without `document`.

Lit reads cookies in `firstUpdated`. Import `src/cookie-theme.js` to use the component in a server renderer. The `src/main.js` entry registers and mounts it in the browser.

Astro prerenders a Solid component and hydrates it with `client:load`. Its build verifies that the component can render without browser globals.

Qwik builds its client chunks and server renderer, then writes a static page through `prerender.mjs`. The build checks the rendered `light` output without `document`. `useVisibleTask$` reads the browser cookie after the component becomes visible. Run `npm run check` for its TypeScript check.

Cookie values are browser state. For a server response that depends on the request's cookies, use the framework's server cookie API. The examples intentionally render `light` on the server, then read the saved preference in the browser.

After building all four apps and the migration example, install the consent example development dependencies and run `node examples/verify-consumers.mjs` from the repository root to check all five apps in installed Google Chrome.
