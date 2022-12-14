import { c as create_ssr_component, v as validate_component, a as subscribe, f as escape, h as now, l as loop } from './index-db5fbcb5-273f270b.js';
import { w as writable } from './index-5b6611b2-658d06fc.js';

function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map((_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i]));
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
function spring(value, opts = {}) {
  const store = writable(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = value;
  let target_value = value;
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = now();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = now();
      cancel_task = false;
      task = loop((now2) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: (now2 - last_time) * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now2;
        last_value = value;
        store.set(value = next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token)
          fulfil();
      });
    });
  }
  const spring2 = {
    set,
    update: (fn, opts2) => set(fn(target_value, value), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
const css$1 = {
  code: ".counter.svelte-sx9eo4.svelte-sx9eo4{display:flex;border-top:1px solid rgba(0, 0, 0, 0.1);border-bottom:1px solid rgba(0, 0, 0, 0.1);margin:1rem 0}.counter.svelte-sx9eo4 button.svelte-sx9eo4{width:2em;padding:0;display:flex;align-items:center;justify-content:center;border:0;background-color:transparent;touch-action:manipulation;color:var(--text-color);font-size:2rem}.counter.svelte-sx9eo4 button.svelte-sx9eo4:hover{background-color:var(--secondary-color)}svg.svelte-sx9eo4.svelte-sx9eo4{width:25%;height:25%}path.svelte-sx9eo4.svelte-sx9eo4{vector-effect:non-scaling-stroke;stroke-width:2px;stroke:var(--text-color)}.counter-viewport.svelte-sx9eo4.svelte-sx9eo4{width:8em;height:4em;overflow:hidden;text-align:center;position:relative}.counter-viewport.svelte-sx9eo4 strong.svelte-sx9eo4{position:absolute;display:flex;width:100%;height:100%;font-weight:400;color:var(--accent-color);font-size:4rem;align-items:center;justify-content:center}.counter-digits.svelte-sx9eo4.svelte-sx9eo4{position:absolute;width:100%;height:100%}.hidden.svelte-sx9eo4.svelte-sx9eo4{top:-100%;user-select:none}",
  map: null
};
function modulo(n, m) {
  return (n % m + m) % m;
}
const Counter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let offset;
  let $displayed_count, $$unsubscribe_displayed_count;
  let count = 0;
  const displayed_count = spring();
  $$unsubscribe_displayed_count = subscribe(displayed_count, (value) => $displayed_count = value);
  $$result.css.add(css$1);
  {
    displayed_count.set(count);
  }
  offset = modulo($displayed_count, 1);
  $$unsubscribe_displayed_count();
  return `<div class="${"counter svelte-sx9eo4"}"><button aria-label="${"Decrease the counter by one"}" class="${"svelte-sx9eo4"}"><svg aria-hidden="${"true"}" viewBox="${"0 0 1 1"}" class="${"svelte-sx9eo4"}"><path d="${"M0,0.5 L1,0.5"}" class="${"svelte-sx9eo4"}"></path></svg></button>

	<div class="${"counter-viewport svelte-sx9eo4"}"><div class="${"counter-digits svelte-sx9eo4"}" style="${"transform: translate(0, " + escape(100 * offset, true) + "%)"}"><strong class="${"hidden svelte-sx9eo4"}" aria-hidden="${"true"}">${escape(Math.floor($displayed_count + 1))}</strong>
			<strong class="${"svelte-sx9eo4"}">${escape(Math.floor($displayed_count))}</strong></div></div>

	<button aria-label="${"Increase the counter by one"}" class="${"svelte-sx9eo4"}"><svg aria-hidden="${"true"}" viewBox="${"0 0 1 1"}" class="${"svelte-sx9eo4"}"><path d="${"M0,0.5 L1,0.5 M0.5,0 L0.5,1"}" class="${"svelte-sx9eo4"}"></path></svg></button>
</div>`;
});
const css = {
  code: "section.svelte-qdtkan.svelte-qdtkan{display:flex;flex-direction:column;justify-content:center;align-items:center;max-width:1024px;flex:1;margin-left:50%;transform:translate(-50%)}h1.svelte-qdtkan.svelte-qdtkan{width:100%}.welcome.svelte-qdtkan.svelte-qdtkan{position:relative;width:100%;height:0;padding:0 0 calc(100% * 495 / 2048) 0}.welcome.svelte-qdtkan img.svelte-qdtkan{position:absolute;width:100%;height:100%;top:0;display:block}",
  map: null
};
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Home</title>`, ""}`, ""}

<section class="${"svelte-qdtkan"}"><h1 class="${"svelte-qdtkan"}"><div class="${"welcome svelte-qdtkan"}"><picture><source srcset="${"svelte-welcome.webp"}" type="${"image/webp"}">
				<img src="${"svelte-welcome.png"}" alt="${"Welcome"}" class="${"svelte-qdtkan"}"></picture></div>

		to your new<br>SvelteKit app
	</h1>

	<h2>try editing <strong>src/routes/index.svelte</strong></h2>

	${validate_component(Counter, "Counter").$$render($$result, {}, {}, {})}
</section>`;
});

var index_svelte = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': Routes
});

const index = 5;
const file = '_app/immutable/pages/index.svelte-8ac30cd4.js';
const imports = ["_app/immutable/pages/index.svelte-8ac30cd4.js","_app/immutable/chunks/index-5b9f5232.js","_app/immutable/chunks/index-d30e7481.js"];
const stylesheets = ["_app/immutable/assets/index-74533cdb.css"];

export { file, imports, index, index_svelte as module, stylesheets };
//# sourceMappingURL=5-6e5a7478.js.map
