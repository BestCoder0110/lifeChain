import { c as create_ssr_component, f as escape } from './index-db5fbcb5-273f270b.js';

function load({ error, status }) {
  return { props: { error, status } };
}
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0)
    $$bindings.error(error);
  return `<h1>${escape(status)}</h1>

<pre>${escape(error.message)}</pre>



${error.frame ? `<pre>${escape(error.frame)}</pre>` : ``}
${error.stack ? `<pre>${escape(error.stack)}</pre>` : ``}`;
});

var error_svelte = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': Error,
  load: load
});

const index = 1;
const file = '_app/immutable/error.svelte-c7d12300.js';
const imports = ["_app/immutable/error.svelte-c7d12300.js","_app/immutable/chunks/index-5b9f5232.js"];
const stylesheets = [];

export { file, imports, index, error_svelte as module, stylesheets };
//# sourceMappingURL=1-1c85f52f.js.map
