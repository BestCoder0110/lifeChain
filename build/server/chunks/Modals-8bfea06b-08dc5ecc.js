import { c as create_ssr_component, a as subscribe, e as each, i as is_promise, n as noop, v as validate_component, m as missing_component } from './index-db5fbcb5-273f270b.js';
import { w as writable } from './index-5b6611b2-658d06fc.js';

const exitBeforeEnter = writable(false);
const transitioning = writable(null);
const modals = writable([]);
function isLazyModal(component) {
  return typeof component.prototype === "undefined";
}
async function getComponent(component) {
  return component().then((res) => res.default);
}
const Modals = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $modals, $$unsubscribe_modals;
  let $transitioning, $$unsubscribe_transitioning;
  let $$unsubscribe_exitBeforeEnter;
  $$unsubscribe_modals = subscribe(modals, (value) => $modals = value);
  $$unsubscribe_transitioning = subscribe(transitioning, (value) => $transitioning = value);
  $$unsubscribe_exitBeforeEnter = subscribe(exitBeforeEnter, (value) => value);
  $$unsubscribe_modals();
  $$unsubscribe_transitioning();
  $$unsubscribe_exitBeforeEnter();
  return `${$modals.length > 0 ? `${slots.backdrop ? slots.backdrop({}) : ``}` : ``}

${slots.default ? slots.default({}) : `
  ${each($modals, (modal, i) => {
    return `
    ${isLazyModal(modal.component) ? `${function(__value) {
      if (is_promise(__value)) {
        __value.then(null, noop);
        return `
        ${slots.loading ? slots.loading({}) : ``}
      `;
      }
      return function(component) {
        return `
        ${validate_component(component || missing_component, "svelte:component").$$render($$result, Object.assign({
          isOpen: i === $modals.length - 1 && !$transitioning
        }, modal.props), {}, {})}
      `;
      }(__value);
    }(getComponent(modal.component))}` : `
      ${validate_component(modal.component || missing_component, "svelte:component").$$render($$result, Object.assign({
      isOpen: i === $modals.length - 1 && !$transitioning
    }, modal.props), {}, {})}`}`;
  })}
`}`;
});

export { Modals as M };
//# sourceMappingURL=Modals-8bfea06b-08dc5ecc.js.map
