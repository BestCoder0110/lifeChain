import { j as get_store_value, c as create_ssr_component } from './index-db5fbcb5-273f270b.js';
import { s as store } from './auth-30b11ff3-8a6acd90.js';
import 'magic-sdk';
import './config-cb33326c-d0d5dcb6.js';
import 'axios';
import './index-5b6611b2-658d06fc.js';

function load() {
  const user = get_store_value(store);
  if (!(user == null ? void 0 : user.user)) {
    return { status: 302, redirect: "/auth" };
  }
  return { status: 200 };
}
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${slots.default ? slots.default({}) : ``}`;
});

var __layout_svelte = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': _layout,
  load: load
});

const index = 2;
const file = '_app/immutable/pages/todos/__layout.svelte-815afa1a.js';
const imports = ["_app/immutable/pages/todos/__layout.svelte-815afa1a.js","_app/immutable/chunks/index-5b9f5232.js","_app/immutable/chunks/auth-63ff4a40.js","_app/immutable/chunks/index-d30e7481.js","_app/immutable/chunks/singletons-eca981c1.js","_app/immutable/chunks/index-74255380.js"];
const stylesheets = [];

export { file, imports, index, __layout_svelte as module, stylesheets };
//# sourceMappingURL=2-979928bb.js.map
