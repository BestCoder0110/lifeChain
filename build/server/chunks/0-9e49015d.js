import { c as create_ssr_component, v as validate_component, a as subscribe, b as add_attribute, g as getContext } from './index-db5fbcb5-273f270b.js';
import { M as Modals } from './Modals-8bfea06b-08dc5ecc.js';
import { s as store } from './auth-30b11ff3-8a6acd90.js';
import 'magic-sdk';
import './config-cb33326c-d0d5dcb6.js';
import 'axios';
import './index-5b6611b2-658d06fc.js';

const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session,
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store2 = getStores().page;
    return store2.subscribe(fn);
  }
};
const logo = "/_app/immutable/assets/svelte-logo-87df40b8.svg";
const css$1 = {
  code: "header.svelte-1w3a7se.svelte-1w3a7se{display:flex;justify-content:space-between;height:48px}.corner.svelte-1w3a7se.svelte-1w3a7se{width:3em;height:3em}.corner.svelte-1w3a7se a.svelte-1w3a7se{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.corner.svelte-1w3a7se img.svelte-1w3a7se{width:2em;height:2em;object-fit:contain}nav.svelte-1w3a7se.svelte-1w3a7se{display:flex;justify-content:center;--background:rgba(255, 255, 255, 0.7)}svg.svelte-1w3a7se.svelte-1w3a7se{width:2em;height:3em;display:block}path.svelte-1w3a7se.svelte-1w3a7se{fill:var(--background)}ul.svelte-1w3a7se.svelte-1w3a7se{position:relative;padding:0;margin:0;height:3em;display:flex;justify-content:center;align-items:center;list-style:none;background:var(--background);background-size:contain}li.svelte-1w3a7se.svelte-1w3a7se{position:relative;height:100%}li.active.svelte-1w3a7se.svelte-1w3a7se::before{--size:6px;content:'';width:0;height:0;position:absolute;top:0;left:calc(50% - var(--size));border:var(--size) solid transparent;border-top:var(--size) solid var(--accent-color)}nav.svelte-1w3a7se a.svelte-1w3a7se{display:flex;height:100%;align-items:center;padding:0 1em;color:var(--heading-color);font-weight:700;font-size:0.8rem;text-transform:uppercase;letter-spacing:10%;text-decoration:none;transition:color 0.2s linear}a.svelte-1w3a7se.svelte-1w3a7se:hover{color:var(--accent-color)}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let auth;
  let $authStore, $$unsubscribe_authStore;
  let $page, $$unsubscribe_page;
  $$unsubscribe_authStore = subscribe(store, (value) => $authStore = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css$1);
  auth = $authStore;
  $$unsubscribe_authStore();
  $$unsubscribe_page();
  return `<header class="${"svelte-1w3a7se"}"><div class="${"corner svelte-1w3a7se"}"><a href="${"https://kit.svelte.dev"}" class="${"svelte-1w3a7se"}"><img${add_attribute("src", logo, 0)} alt="${"SvelteKit"}" class="${"svelte-1w3a7se"}"></a></div>

	<nav class="${"svelte-1w3a7se"}"><svg viewBox="${"0 0 2 3"}" aria-hidden="${"true"}" class="${"svelte-1w3a7se"}"><path d="${"M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"}" class="${"svelte-1w3a7se"}"></path></svg>
		<ul class="${"svelte-1w3a7se"}"><li class="${["svelte-1w3a7se", $page.url.pathname === "/" ? "active" : ""].join(" ").trim()}"><a sveltekit:prefetch href="${"/"}" class="${"svelte-1w3a7se"}">Home</a></li>
			<li class="${["svelte-1w3a7se", $page.url.pathname === "/about" ? "active" : ""].join(" ").trim()}"><a sveltekit:prefetch href="${"/about"}" class="${"svelte-1w3a7se"}">About</a></li>
			<li class="${["svelte-1w3a7se", $page.url.pathname === "/todos" ? "active" : ""].join(" ").trim()}"><a sveltekit:prefetch href="${"/todos"}" class="${"svelte-1w3a7se"}">Todos</a></li>
			${auth && auth.user ? `<li class="${["svelte-1w3a7se", $page.url.pathname === "/auth" ? "active" : ""].join(" ").trim()}"><a href="${"javascript:void(0)"}" class="${"svelte-1w3a7se"}">Logout</a></li>` : `<li class="${["svelte-1w3a7se", $page.url.pathname === "/auth" ? "active" : ""].join(" ").trim()}"><a href="${"/auth"}" class="${"svelte-1w3a7se"}">Login</a></li>`}</ul>
		<svg viewBox="${"0 0 2 3"}" aria-hidden="${"true"}" class="${"svelte-1w3a7se"}"><path d="${"M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"}" class="${"svelte-1w3a7se"}"></path></svg></nav>

	<div class="${"corner svelte-1w3a7se"}"></div>
</header>`;
});
const css = {
  code: "main.svelte-jag9pz{height:calc(100% - 48px);display:flex;flex-direction:column;width:100%;margin:0 auto;box-sizing:border-box}.backdrop.svelte-jag9pz{position:fixed;z-index:100;top:0;bottom:0;right:0;left:0;background:rgba(0,0,0,0.50)\r\n  }@media(min-width: 480px){}",
  map: null
};
const load = async ({ fetch }) => {
  const res = await fetch("/api/auth/user");
  const json = await res.json();
  const { user } = json;
  store.set({ loading: false, user });
  return { status: 200 };
};
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(Modals, "Modals").$$render($$result, {}, {}, {
    backdrop: () => {
      return `<div slot="${"backdrop"}" class="${"backdrop svelte-jag9pz"}"></div>`;
    }
  })}
${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

<main class="${"svelte-jag9pz"}">${slots.default ? slots.default({}) : ``}</main>

`;
});

var __layout_svelte = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': _layout,
  load: load
});

const index = 0;
const file = '_app/immutable/pages/__layout.svelte-806a3193.js';
const imports = ["_app/immutable/pages/__layout.svelte-806a3193.js","_app/immutable/chunks/index-5b9f5232.js","_app/immutable/chunks/Modals-4904eec8.js","_app/immutable/chunks/index-d30e7481.js","_app/immutable/chunks/auth-63ff4a40.js","_app/immutable/chunks/singletons-eca981c1.js","_app/immutable/chunks/index-74255380.js"];
const stylesheets = ["_app/immutable/assets/__layout-65e444e4.css"];

export { file, imports, index, __layout_svelte as module, stylesheets };
//# sourceMappingURL=0-9e49015d.js.map
