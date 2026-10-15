import { renderToString, type RenderToStringOptions } from '@builder.io/qwik/server';
import { manifest } from '@qwik-client-manifest';
import Root from './root';

export const render = (options: RenderToStringOptions = {}) => renderToString(<Root />, { manifest, ...options });
