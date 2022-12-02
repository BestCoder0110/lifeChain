import { c as create_ssr_component, v as validate_component, b as add_attribute } from './index-db5fbcb5-273f270b.js';
import 'magic-sdk';
import './config-cb33326c-d0d5dcb6.js';
import 'axios';

const css = {
  code: ".content.svelte-1nclh2l{width:100%;max-width:var(--column-width);margin:var(--column-margin-top) auto 0 auto}form.svelte-1nclh2l{width:28rem;margin:auto;font-size:1.5rem}label.svelte-1nclh2l{display:block;font-weight:bold;margin-bottom:0.25rem}input.svelte-1nclh2l{margin-bottom:0.75rem;width:100%;padding:0 0.5rem;box-sizing:border-box;height:2.5rem}button.svelte-1nclh2l{width:100%;background-color:var(--accent-color);color:white;border:none;height:2.5rem;font-weight:bold;transition:background-color 0.2s ease-in-out;cursor:pointer}button.svelte-1nclh2l:hover{background-color:var(--accent-hover)}",
  map: null
};
const AuthForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Login</title>`, ""}`, ""}

<div class="${"content svelte-1nclh2l"}"><form class="${"svelte-1nclh2l"}"><label for="${"email"}" class="${"svelte-1nclh2l"}">Email</label>
		<input id="${"email"}" class="${"svelte-1nclh2l"}"${add_attribute("value", email, 0)}>
		<div class="${"btn-container"}"><button type="${"submit"}" class="${"svelte-1nclh2l"}">Login</button></div></form>
</div>`;
});
const Auth = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(AuthForm, "AuthForm").$$render($$result, {}, {}, {})}`;
});

var auth_svelte = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': Auth
});

const index = 4;
const file = '_app/immutable/pages/auth.svelte-ecd97542.js';
const imports = ["_app/immutable/pages/auth.svelte-ecd97542.js","_app/immutable/chunks/index-5b9f5232.js","_app/immutable/chunks/auth-63ff4a40.js","_app/immutable/chunks/index-d30e7481.js","_app/immutable/chunks/singletons-eca981c1.js","_app/immutable/chunks/index-74255380.js"];
const stylesheets = ["_app/immutable/assets/auth-eae41edf.css"];

export { file, imports, index, auth_svelte as module, stylesheets };
//# sourceMappingURL=4-8b17ad41.js.map
