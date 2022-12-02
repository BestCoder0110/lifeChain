import { c as create_ssr_component, v as validate_component, k as createEventDispatcher, f as escape, e as each, o as null_to_empty, b as add_attribute } from './index-db5fbcb5-273f270b.js';
import { M as Modals } from './Modals-8bfea06b-08dc5ecc.js';
import './config-cb33326c-d0d5dcb6.js';
import 'axios';
import './index-5b6611b2-658d06fc.js';

const css$b = {
  code: ".button.svelte-1hx5dx7{display:inline-block;background:rgb(232, 0, 51);padding:8px;border-radius:8px;width:60%;font-size:16px;text-align:center;cursor:pointer}.button.svelte-1hx5dx7:hover{opacity:0.8}.disable.svelte-1hx5dx7{background-color:gray;cursor:not-allowed}.disable.svelte-1hx5dx7:hover{opacity:1}",
  map: null
};
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { name } = $$props;
  let { disable = false } = $$props;
  let { class: clazz } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.disable === void 0 && $$bindings.disable && disable !== void 0)
    $$bindings.disable(disable);
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
    $$bindings.class(clazz);
  $$result.css.add(css$b);
  return `<div class="${escape(null_to_empty(`button ${clazz} ${disable && "disable"}`), true) + " svelte-1hx5dx7"}"><span>${escape(name)}</span>
</div>`;
});
const css$a = {
  code: ".form-group.svelte-t1nzt0.svelte-t1nzt0.svelte-t1nzt0{position:relative}.form-group.svelte-t1nzt0 .form-label.svelte-t1nzt0.svelte-t1nzt0{position:absolute;left:0;top:10px;color:#999;background-color:#fff;z-index:10;transition:transform 150ms ease-out, font-size 150ms ease-out}.form-group.svelte-t1nzt0 .form-input.svelte-t1nzt0.svelte-t1nzt0{position:relative;padding:12px 0px 5px 0;width:100%;outline:0;border:0;box-shadow:0 1px 0 0 #e5e5e5;transition:box-shadow 150ms ease-out}.form-group.svelte-t1nzt0 .form-input.svelte-t1nzt0.svelte-t1nzt0:focus{box-shadow:0 2px 0 0 rgb(232, 0, 51)}.form-group.svelte-t1nzt0 .form-input.svelte-t1nzt0:focus~.form-label.svelte-t1nzt0{transform:translateY(-125%);font-size:0.75em;color:rgb(232, 0, 51)}.fill.svelte-t1nzt0 .form-label.svelte-t1nzt0.svelte-t1nzt0{transform:translateY(-125%);font-size:0.75em;color:rgb(232, 0, 51)}",
  map: null
};
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { label = "" } = $$props;
  let { value = "" } = $$props;
  let { error = "" } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0)
    $$bindings.error(error);
  $$result.css.add(css$a);
  return `<div class="${"form-group " + escape(!!value && "fill", true) + " svelte-t1nzt0"}"><input id="${"first"}" class="${"form-input svelte-t1nzt0"}" type="${"text"}"${add_attribute("value", value, 0)}>
	<label class="${"form-label svelte-t1nzt0"}" for="${"first"}">${escape(label)}</label>
	<span class="${"form-error"}">${escape(error)}</span>
</div>`;
});
const css$9 = {
  code: ".form-group.svelte-12fjs3z.svelte-12fjs3z.svelte-12fjs3z{position:relative}.form-group.svelte-12fjs3z .form-label.svelte-12fjs3z.svelte-12fjs3z{position:absolute;left:0;top:10px;color:#999;background-color:#fff;z-index:10;transition:transform 150ms ease-out, font-size 150ms ease-out}.form-group.svelte-12fjs3z .form-input.svelte-12fjs3z.svelte-12fjs3z{position:relative;padding:12px 0px 5px 0;width:100%;outline:0;border:0;box-shadow:0 1px 0 0 #e5e5e5;transition:box-shadow 150ms ease-out}.form-group.svelte-12fjs3z .form-input.svelte-12fjs3z.svelte-12fjs3z:focus{box-shadow:0 2px 0 0 rgb(232, 0, 51)}.form-group.svelte-12fjs3z .form-input.svelte-12fjs3z:focus~.form-label.svelte-12fjs3z{transform:translateY(-125%);font-size:0.75em;color:rgb(232, 0, 51)}.form-group.svelte-12fjs3z .form-down.svelte-12fjs3z.svelte-12fjs3z{position:absolute;top:50%;right:0%;transform:translate(0%, -50%)}.form-group.svelte-12fjs3z .private-menu{box-shadow:-2px -2px 4px 4px gray;width:100%;position:absolute;bottom:0px;z-index:11}.fill.svelte-12fjs3z .form-label.svelte-12fjs3z.svelte-12fjs3z{transform:translateY(-125%);font-size:0.75em;color:rgb(232, 0, 51)}",
  map: null
};
const Select = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { options = [] } = $$props;
  let { value } = $$props;
  let { label } = $$props;
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  $$result.css.add(css$9);
  return `<div class="${"form-group " + escape(!!value && "fill", true) + " svelte-12fjs3z"}"><input id="${"first"}" class="${"form-input svelte-12fjs3z"}" type="${"text"}"${add_attribute("value", value, 0)}>
	<label class="${"form-label svelte-12fjs3z"}" for="${"first"}">${escape(label)}</label>
	<span class="${"form-down svelte-12fjs3z"}"><i class="${"fa fa-caret-down"}"></i></span>
	${``}

</div>`;
});
const durationUnitRegex = /[a-zA-Z]/;
const range = (size, startAt = 0) => [...Array(size).keys()].map((i) => i + startAt);
const css$8 = {
  code: ".wrapper.svelte-1cy66mt{width:var(--size);height:var(--size)}.circle.svelte-1cy66mt{border-radius:100%;animation-fill-mode:both;position:absolute;opacity:0;width:var(--size);height:var(--size);background-color:var(--color);animation:svelte-1cy66mt-bounce var(--duration) linear infinite}@keyframes svelte-1cy66mt-bounce{0%{opacity:0;transform:scale(0)}5%{opacity:1}100%{opacity:0;transform:scale(1)}}",
  map: null
};
const Jumper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color = "#FF3E00" } = $$props;
  let { unit = "px" } = $$props;
  let { duration = "1s" } = $$props;
  let { size = "60" } = $$props;
  let durationUnit = duration.match(durationUnitRegex)[0];
  let durationNum = duration.replace(durationUnitRegex, "");
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.unit === void 0 && $$bindings.unit && unit !== void 0)
    $$bindings.unit(unit);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  $$result.css.add(css$8);
  return `<div class="${"wrapper svelte-1cy66mt"}" style="${"--size: " + escape(size, true) + escape(unit, true) + "; --color: " + escape(color, true) + "; --duration: " + escape(duration, true) + ";"}">${each(range(3, 1), (version) => {
    return `<div class="${"circle svelte-1cy66mt"}" style="${"animation-delay: " + escape(durationNum / 3 * (version - 1) + durationUnit, true) + ";"}"></div>`;
  })}</div>`;
});
const css$7 = {
  code: ".load-modal.svelte-19771dj.svelte-19771dj{position:fixed;z-index:1002;top:0;bottom:0;right:0;left:0;display:flex;justify-content:center;align-items:center;pointer-events:none}.loading-modal.svelte-19771dj.svelte-19771dj{border-radius:6px;background:white;display:flex;flex-direction:column;justify-content:space-between;pointer-events:auto}.loading-modal-header.svelte-19771dj.svelte-19771dj{background:black;color:white;padding:16px}.loading-modal-body.svelte-19771dj.svelte-19771dj{display:flex;flex-direction:column;gap:20px;padding:16px}.loading-modal-body.svelte-19771dj .loading.svelte-19771dj{margin:auto}",
  map: null
};
const LoadingModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isOpen = false } = $$props;
  let { title: title2 = "" } = $$props;
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  $$result.css.add(css$7);
  return `<div role="${"dialog"}" class="${"load-modal svelte-19771dj"}"><div class="${"loading-modal svelte-19771dj"}"><div class="${"loading-modal-header svelte-19771dj"}"><span>${escape(title2)}</span></div>
    <div class="${"loading-modal-body svelte-19771dj"}"><div class="${"loading svelte-19771dj"}">${validate_component(Jumper, "Jumper").$$render($$result, {
    size: "60",
    color: "#FF3E00",
    unit: "px",
    duration: "1s"
  }, {}, {})}</div></div></div>
</div>`;
});
const css$6 = {
  code: ".error.svelte-1fttrti{color:red;font-size:0.7em}.disable.svelte-1fttrti{position:absolute;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.2);z-index:1000}.loading.svelte-1fttrti{opacity:0.3}.modal.svelte-1fttrti{position:fixed;z-index:1001;top:0;bottom:0;right:0;left:0;display:flex;justify-content:center;align-items:center;pointer-events:none}.drive-modal.svelte-1fttrti{min-width:400px;border-radius:6px;background:white;display:flex;flex-direction:column;justify-content:space-between;pointer-events:auto;position:relative}.drive-modal-header.svelte-1fttrti{background:black;color:white;padding:16px}.drive-modal-body.svelte-1fttrti{display:flex;flex-direction:column;gap:20px;padding:16px}.drive-modal-footer.svelte-1fttrti{display:flex;justify-content:flex-end;padding:16px;gap:10px}.drive-modal-footer.svelte-1fttrti .button{width:unset}.drive-modal-footer.svelte-1fttrti .cancel{background:white;color:gray}.drive-modal-footer.svelte-1fttrti .create{color:white}",
  map: null
};
const CreateDriveModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { isOpen = true } = $$props;
  let { error = "" } = $$props;
  const options = ["Public", "Private"];
  let name = "";
  let value = options[0];
  let { loading = false } = $$props;
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0)
    $$bindings.error(error);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  $$result.css.add(css$6);
  return `${isOpen ? `${loading ? `${validate_component(Modals, "Modals").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(LoadingModal, "LoadingModal").$$render($$result, { title: "Creating Drive..." }, {}, {})}`;
    }
  })}` : ``}
  <div class="${escape(null_to_empty(`modal ${loading && "loading"}`), true) + " svelte-1fttrti"}"><div class="${"drive-modal svelte-1fttrti"}">${loading ? `<div class="${"disable svelte-1fttrti"}"></div>` : ``}
      <div class="${"drive-modal-header svelte-1fttrti"}"><span>CREATE DRIVE</span></div>
      <div class="${"drive-modal-body svelte-1fttrti"}">${validate_component(Input, "Input").$$render($$result, { label: "Name", value: name, error: "" }, {}, {})}
        ${`<span class="${"error svelte-1fttrti"}">Please input drive name</span>`}
        ${validate_component(Select, "Select").$$render($$result, {
    label: "Privacy",
    options: ["Public", "Private"],
    value
  }, {}, {})}
        ${error !== "" ? `<span class="${"error svelte-1fttrti"}">${escape(error)}</span>` : ``}</div>
      <div class="${"drive-modal-footer svelte-1fttrti"}">${validate_component(Button, "Button").$$render($$result, { name: "CANCEL", class: "cancel" }, {}, {})}
        ${validate_component(Button, "Button").$$render($$result, { name: "CREATE", class: "create" }, {}, {})}</div></div></div>` : ``}`;
});
function formatBytes(bytes, decimals = 2) {
  if (!+bytes)
    return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
const css$5 = {
  code: ".error.svelte-21ihfg.svelte-21ihfg{color:red;font-size:0.7em}.loading.svelte-21ihfg.svelte-21ihfg{opacity:0.3}.modal.svelte-21ihfg.svelte-21ihfg{position:fixed;z-index:1001;top:0;bottom:0;right:0;left:0;display:flex;justify-content:center;align-items:center;pointer-events:none}.upload-modal.svelte-21ihfg.svelte-21ihfg{min-width:400px;border-radius:6px;background:white;display:flex;flex-direction:column;justify-content:space-between;pointer-events:auto}.upload-modal-header.svelte-21ihfg.svelte-21ihfg{background:black;color:white;padding:16px}.upload-modal-body.svelte-21ihfg.svelte-21ihfg{display:flex;flex-direction:column;gap:20px}.upload-modal-body.svelte-21ihfg .loading.svelte-21ihfg{display:flex;flex-direction:column;justify-content:center;align-items:center}.upload-modal-body.svelte-21ihfg .upload-files.svelte-21ihfg{color:gray;display:flex;flex-direction:column;border-bottom:1px solid gray;max-height:500px;overflow:auto}.upload-modal-body.svelte-21ihfg .upload-files.svelte-21ihfg::-webkit-scrollbar{width:10px}.upload-modal-body.svelte-21ihfg .upload-files.svelte-21ihfg::-webkit-scrollbar-track{background-color:darkgrey}.upload-modal-body.svelte-21ihfg .upload-files.svelte-21ihfg::-webkit-scrollbar-thumb{box-shadow:inset 0 0 6px rgb(0, 0, 0)}.upload-modal-body.svelte-21ihfg .upload-files .upload-file-item.svelte-21ihfg{padding:8px 16px;cursor:pointer}.upload-modal-body.svelte-21ihfg .upload-files .upload-file-item.svelte-21ihfg:hover{background:gray;color:white;transition:all 0.3s}.upload-modal-body.svelte-21ihfg .upload-files .upload-file-item-name.svelte-21ihfg{font-size:14px}.upload-modal-body.svelte-21ihfg .upload-files .upload-file-item-size.svelte-21ihfg{margin-top:4px;font-size:12px}.upload-modal-footer.svelte-21ihfg.svelte-21ihfg{display:flex;justify-content:flex-end;padding:16px;gap:10px}.upload-modal-footer.svelte-21ihfg .button{width:unset}.upload-modal-footer.svelte-21ihfg .cancel{background:white;color:gray}.upload-modal-footer.svelte-21ihfg .upload{color:white}",
  map: null
};
const UploadModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { isOpen } = $$props;
  let { sendFiles = [] } = $$props;
  let { title: title2 = "" } = $$props;
  let { tempFolder = "" } = $$props;
  let { loading } = $$props;
  let { cost } = $$props;
  let { prepareLoading = false } = $$props;
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.sendFiles === void 0 && $$bindings.sendFiles && sendFiles !== void 0)
    $$bindings.sendFiles(sendFiles);
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.tempFolder === void 0 && $$bindings.tempFolder && tempFolder !== void 0)
    $$bindings.tempFolder(tempFolder);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  if ($$props.cost === void 0 && $$bindings.cost && cost !== void 0)
    $$bindings.cost(cost);
  if ($$props.prepareLoading === void 0 && $$bindings.prepareLoading && prepareLoading !== void 0)
    $$bindings.prepareLoading(prepareLoading);
  $$result.css.add(css$5);
  {
    {
      title2 = "Upload " + (sendFiles.length ? sendFiles.length : "") + " File(s)";
    }
  }
  return `${isOpen ? `${loading ? `${validate_component(Modals, "Modals").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(LoadingModal, "LoadingModal").$$render($$result, { title: "Uploading file(s)..." }, {}, {})}`;
    }
  })}` : ``}
<div class="${escape(null_to_empty(`modal ${loading && "loading"}`), true) + " svelte-21ihfg"}"><div class="${"upload-modal svelte-21ihfg"}"><div class="${"upload-modal-header svelte-21ihfg"}"><span>${escape(title2)}</span></div>
    <div class="${"upload-modal-body svelte-21ihfg"}">${prepareLoading === true ? `<div class="${"loading svelte-21ihfg"}">${validate_component(Jumper, "Jumper").$$render($$result, {
    size: "60",
    color: "#FF3E00",
    unit: "px",
    duration: "1s"
  }, {}, {})}</div>` : `<div class="${"upload-files svelte-21ihfg"}">${each(sendFiles, (item) => {
    return `<div class="${"upload-file-item svelte-21ihfg"}"><div class="${"upload-file-item-name svelte-21ihfg"}">${escape(item.filename)}</div>
              <div class="${"upload-file-item-size svelte-21ihfg"}">${escape(formatBytes(item.size))}</div>
            </div>`;
  })}</div>`}</div>
    <div class="${"upload-modal-footer svelte-21ihfg"}">${validate_component(Button, "Button").$$render($$result, { name: "CANCEL", class: "cancel" }, {}, {})}
      ${validate_component(Button, "Button").$$render($$result, {
    name: "UPLOAD",
    class: "upload",
    disable: prepareLoading
  }, {}, {})}</div></div></div>` : ``}`;
});
const css$4 = {
  code: ".error.svelte-11ucr4y{color:red;font-size:0.7em}.loading.svelte-11ucr4y{opacity:0.3}.modal.svelte-11ucr4y{position:fixed;z-index:1001;top:0;bottom:0;right:0;left:0;display:flex;justify-content:center;align-items:center;pointer-events:none}.create-folder-modal.svelte-11ucr4y{min-width:400px;border-radius:6px;background:white;display:flex;flex-direction:column;justify-content:space-between;pointer-events:auto}.create-folder-modal-header.svelte-11ucr4y{background:black;color:white;padding:16px}.create-folder-modal-body.svelte-11ucr4y{display:flex;flex-direction:column;gap:20px;padding:16px}.create-folder-modal-footer.svelte-11ucr4y{display:flex;justify-content:flex-end;padding:16px;gap:10px}.create-folder-modal-footer.svelte-11ucr4y .button{width:unset}.create-folder-modal-footer.svelte-11ucr4y .cancel{background:white;color:gray}.create-folder-modal-footer.svelte-11ucr4y .create{color:white}",
  map: null
};
let title = "CREATE FOLDER";
const CreateFolderModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { isOpen } = $$props;
  let { loading = false } = $$props;
  let name = "";
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  $$result.css.add(css$4);
  return `${isOpen ? `${loading ? `${validate_component(Modals, "Modals").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(LoadingModal, "LoadingModal").$$render($$result, { title: "Creating Folder..." }, {}, {})}`;
    }
  })}` : ``}
  <div class="${escape(null_to_empty(`modal ${loading && "loading"}`), true) + " svelte-11ucr4y"}"><div class="${"create-folder-modal svelte-11ucr4y"}"><div class="${"create-folder-modal-header svelte-11ucr4y"}"><span>${escape(title)}</span></div>
      <div class="${"create-folder-modal-body svelte-11ucr4y"}">${validate_component(Input, "Input").$$render($$result, { label: "Folder name", value: name }, {}, {})}</div>
      <div class="${"create-folder-modal-footer svelte-11ucr4y"}">${validate_component(Button, "Button").$$render($$result, { name: "CANCEL", class: "cancel" }, {}, {})}
        ${validate_component(Button, "Button").$$render($$result, { name: "CREATE", class: "create" }, {}, {})}</div></div></div>` : ``}`;
});
const css$3 = {
  code: ".disable.svelte-19uf159.svelte-19uf159{height:100vh;width:100vw;position:fixed;background:black;top:0;z-index:1000;opacity:0.8}.navbar.svelte-19uf159.svelte-19uf159{width:240px;height:100%;background:black;color:white;padding:12px;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;gap:20px}.navbar.svelte-19uf159 input.svelte-19uf159{display:none}.navbar-caption.svelte-19uf159.svelte-19uf159{font-weight:800;font-size:36px}.navbar.svelte-19uf159 .button-container.svelte-19uf159{align-self:stretch;text-align:center;position:relative}.navbar.svelte-19uf159 .button-container.svelte-19uf159 .new{width:60%}.navbar.svelte-19uf159 .button-container.svelte-19uf159 .new-menu{width:70%;position:absolute;left:50%;top:0%;transform:translate(-50%)}.navbar.svelte-19uf159 .drives.svelte-19uf159{margin-top:20px;align-self:stretch;font-size:14px;cursor:pointer}.navbar.svelte-19uf159 .drives-action.svelte-19uf159{display:flex;justify-content:space-between}.navbar.svelte-19uf159 .drives-item.svelte-19uf159{margin-left:20px;margin-top:8px;color:gray;display:flex;justify-content:space-between}.navbar.svelte-19uf159 .drives-item span.svelte-19uf159{color:gray}.navbar.svelte-19uf159 .drives .selected span.svelte-19uf159{color:white}.navbar-footer.svelte-19uf159.svelte-19uf159{margin-top:auto}.navbar.svelte-19uf159 .add-drive-modal{position:absolute;z-index:10;width:100%;color:black}@media(max-width: 860px){.navbar.svelte-19uf159.svelte-19uf159{position:absolute;z-index:1;left:-240px;transition:all 0.5s}.show.svelte-19uf159.svelte-19uf159{left:0px}}",
  map: null
};
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { personalDrives = [] } = $$props;
  let { selectedDrive = "" } = $$props;
  let { newDriveInfo = {} } = $$props;
  let { newItemInfo = {} } = $$props;
  let { selectedFolderId = "" } = $$props;
  let driveLoading = false;
  let driveError = "";
  let sendFiles = "";
  let tempFolder = "";
  let prepareLoading = false;
  let isDriveOpen = false;
  let isFolderOpen = false;
  let { isFileOpen = false } = $$props;
  let { disable = false } = $$props;
  let { show } = $$props;
  if ($$props.personalDrives === void 0 && $$bindings.personalDrives && personalDrives !== void 0)
    $$bindings.personalDrives(personalDrives);
  if ($$props.selectedDrive === void 0 && $$bindings.selectedDrive && selectedDrive !== void 0)
    $$bindings.selectedDrive(selectedDrive);
  if ($$props.newDriveInfo === void 0 && $$bindings.newDriveInfo && newDriveInfo !== void 0)
    $$bindings.newDriveInfo(newDriveInfo);
  if ($$props.newItemInfo === void 0 && $$bindings.newItemInfo && newItemInfo !== void 0)
    $$bindings.newItemInfo(newItemInfo);
  if ($$props.selectedFolderId === void 0 && $$bindings.selectedFolderId && selectedFolderId !== void 0)
    $$bindings.selectedFolderId(selectedFolderId);
  if ($$props.isFileOpen === void 0 && $$bindings.isFileOpen && isFileOpen !== void 0)
    $$bindings.isFileOpen(isFileOpen);
  if ($$props.disable === void 0 && $$bindings.disable && disable !== void 0)
    $$bindings.disable(disable);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  $$result.css.add(css$3);
  {
    {
      if (Object.keys(newDriveInfo).length) {
        if (newDriveInfo.status) {
          disable = false;
          isDriveOpen = false;
          driveError = "";
        } else {
          disable = true;
          isDriveOpen = true;
          driveLoading = false;
          driveError = newDriveInfo.msg;
        }
      }
      if (Object.keys(newItemInfo).length) {
        if (newItemInfo.status) {
          disable = false;
          isFolderOpen = false;
          driveError = "";
        } else {
          disable = true;
          isFolderOpen = true;
          driveLoading = false;
          driveError = newItemInfo.msg;
        }
      }
    }
  }
  return `<div class="${"navbar " + escape(show && "show", true) + " svelte-19uf159"}"><input type="${"file"}" multiple class="${"svelte-19uf159"}">
	<div class="${"navbar-caption svelte-19uf159"}">ardrive
	</div>
	<div class="${"button-container svelte-19uf159"}">${validate_component(Button, "Button").$$render($$result, { name: "NEW", class: "new" }, {}, {})}
		${``}</div>
	<div class="${"drives svelte-19uf159"}"><div class="${"drives-action svelte-19uf159"}"><span class="${"svelte-19uf159"}">PERSONAL DRIVES</span>
			<span class="${"fa fa-undo reload svelte-19uf159"}"></span></div>
		${each(personalDrives, (item) => {
    return `<div class="${escape(null_to_empty(`drives-item ${selectedDrive === item.rootFolderId && "selected"}`), true) + " svelte-19uf159"}"><span class="${"svelte-19uf159"}">${escape(item.name)} drive</span>
				${item.drivePrivacy === "private" ? `<span class="${"svelte-19uf159"}"><i class="${"fa fa-lock"}"></i></span>` : ``}
			</div>`;
  })}</div>
	<div class="${"drives svelte-19uf159"}"><span class="${"svelte-19uf159"}">SHARED DRIVES</span>
		<div class="${"drives-item svelte-19uf159"}"></div></div>
	<div class="${"navbar-footer svelte-19uf159"}">Version 1.0
	</div></div>
${disable ? `<div class="${"disable svelte-19uf159"}"></div>` : ``}


${validate_component(Modals, "Modals").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(CreateDriveModal, "Modal").$$render($$result, {
        isOpen: isDriveOpen,
        loading: driveLoading,
        error: driveError
      }, {}, {})}`;
    }
  })}

${validate_component(Modals, "Modals").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(CreateFolderModal, "CreateFolderModal").$$render($$result, {
        isOpen: isFolderOpen,
        loading: driveLoading
      }, {}, {})}`;
    }
  })}

${validate_component(Modals, "Modals").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(UploadModal, "UploadModal").$$render($$result, {
        isOpen: isFileOpen,
        loading: driveLoading,
        prepareLoading,
        sendFiles,
        tempFolder
      }, {}, {})}`;
    }
  })}`;
});
const css$2 = {
  code: ".modal.svelte-17zcpdn.svelte-17zcpdn{position:fixed;z-index:1001;top:0;bottom:0;right:0;left:0;display:flex;justify-content:center;align-items:center;pointer-events:none}.move-modal.svelte-17zcpdn.svelte-17zcpdn{min-width:500px;border-radius:6px;background:white;display:flex;flex-direction:column;justify-content:space-between;pointer-events:auto}.move-modal-header.svelte-17zcpdn.svelte-17zcpdn{background:black;color:white;padding:16px}.move-modal-body.svelte-17zcpdn.svelte-17zcpdn{display:flex;flex-direction:column;gap:20px;padding:16px;min-height:200px}.move-modal-body.svelte-17zcpdn .loading.svelte-17zcpdn{margin:auto}.move-modal-body.svelte-17zcpdn .list-item-folder.svelte-17zcpdn{display:flex;align-items:center;justify-content:space-between;gap:30px;cursor:pointer}.move-modal-body.svelte-17zcpdn .list-item-folder i.svelte-17zcpdn:last-child{margin-left:auto}.move-modal-body.svelte-17zcpdn .list-item-file.svelte-17zcpdn{display:flex;align-items:center;gap:30px;cursor:pointer}.move-modal-body.svelte-17zcpdn .disabled.svelte-17zcpdn{cursor:not-allowed;opacity:0.3}.move-modal-footer.svelte-17zcpdn.svelte-17zcpdn{display:flex;justify-content:space-between;align-items:center;padding:16px;border-top:1px solid rgba(128, 128, 128, 0.3);gap:10px}.move-modal-footer.svelte-17zcpdn .create-folder.svelte-17zcpdn{margin-right:auto}.move-modal-footer.svelte-17zcpdn .create-folder .error.svelte-17zcpdn{color:red}.move-modal-footer.svelte-17zcpdn .button{width:unset}.move-modal-footer.svelte-17zcpdn .cancel{background:white;color:gray}.move-modal-footer.svelte-17zcpdn .move{color:white}",
  map: null
};
let message = "";
const MoveModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { isOpen } = $$props;
  let { error = "" } = $$props;
  let { itemsList = [] } = $$props;
  let { folderHistories = [] } = $$props;
  let { folderNameHistories = [] } = $$props;
  let title2 = "MOVE FILE";
  let { loading = false } = $$props;
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0)
    $$bindings.error(error);
  if ($$props.itemsList === void 0 && $$bindings.itemsList && itemsList !== void 0)
    $$bindings.itemsList(itemsList);
  if ($$props.folderHistories === void 0 && $$bindings.folderHistories && folderHistories !== void 0)
    $$bindings.folderHistories(folderHistories);
  if ($$props.folderNameHistories === void 0 && $$bindings.folderNameHistories && folderNameHistories !== void 0)
    $$bindings.folderNameHistories(folderNameHistories);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  $$result.css.add(css$2);
  {
    {
      title2 = loading ? "Moving Files..." : "Move File";
    }
  }
  return `${isOpen ? `<div role="${"dialog"}" class="${"modal svelte-17zcpdn"}"><div class="${"move-modal svelte-17zcpdn"}"><div class="${"move-modal-header svelte-17zcpdn"}"><span>${escape(title2)}</span></div>
    <div class="${"move-modal-body svelte-17zcpdn"}">${loading ? `<div class="${"loading svelte-17zcpdn"}">${validate_component(Jumper, "Jumper").$$render($$result, {
    size: "60",
    color: "#FF3E00",
    unit: "px",
    duration: "1s"
  }, {}, {})}
          <span>${escape(message)}</span></div>` : `${folderHistories.length > 1 ? `<div class="${"list-item-file svelte-17zcpdn"}"><i class="${"fa fa-arrow-left svelte-17zcpdn"}"></i>
            <span>${escape(folderNameHistories[folderNameHistories.length - 1])}</span></div>` : ``}
        ${each(itemsList, (item) => {
    return `<div class="${"list-item-" + escape(item.entityType, true) + " " + escape(false, true) + " svelte-17zcpdn"}"><i class="${"fa fa-" + escape(item.entityType, true) + " svelte-17zcpdn"}"></i>
            <span>${escape(item.name)}</span>
            ${item.entityType === "folder" ? `<i class="${"fa fa-chevron-right svelte-17zcpdn"}"></i>` : ``}
          </div>`;
  })}`}</div>
    ${!loading ? `<div class="${"move-modal-footer svelte-17zcpdn"}"><div class="${"create-folder svelte-17zcpdn"}">
        
        ${error !== "" ? `<span class="${"error svelte-17zcpdn"}">${escape(error)}</span>` : ``}</div>
      ${validate_component(Button, "Button").$$render($$result, { name: "CANCEL", class: "cancel" }, {}, {})}
      ${validate_component(Button, "Button").$$render($$result, { name: "MOVE HERE", class: "move" }, {}, {})}</div>` : ``}</div></div>` : ``}`;
});
const css$1 = {
  code: ".disable.svelte-59k1u4.svelte-59k1u4{height:100vh;width:100vw;position:fixed;background:black;top:0;z-index:1000;opacity:0.8}.panel.svelte-59k1u4.svelte-59k1u4{box-sizing:border-box;width:calc(100% - 240px);background:white;padding:10px;position:relative}.panel.svelte-59k1u4 .pin.svelte-59k1u4{display:none}.panel.svelte-59k1u4 .profile.svelte-59k1u4{display:flex;justify-content:right;gap:10px}.panel.svelte-59k1u4 .profile span.svelte-59k1u4{font-size:24px}.panel.svelte-59k1u4 .action.svelte-59k1u4{margin-top:20px;display:flex;justify-content:space-between;gap:16px}.panel.svelte-59k1u4 .action .drive-name.svelte-59k1u4{margin-right:auto;font-size:24px;color:rgb(232, 0, 51)}.panel.svelte-59k1u4 .action span.svelte-59k1u4{font-size:20px;position:relative;cursor:pointer}.panel.svelte-59k1u4 .action span span.svelte-59k1u4{position:absolute;top:30px;right:0px;font-size:12px;width:max-content;background:gray;color:white;padding:4px;display:none}.panel.svelte-59k1u4 .action span:hover span.svelte-59k1u4{display:inline-block}.panel.svelte-59k1u4 .action .border.svelte-59k1u4{border:1px solid rgba(128, 128, 128, 0.4)}.panel.svelte-59k1u4 .content.svelte-59k1u4{margin:30px}.panel.svelte-59k1u4 .content .empty.svelte-59k1u4{margin-top:10px}.panel.svelte-59k1u4 .content .list-header.svelte-59k1u4{display:grid;grid-template-columns:repeat(3, 1fr);border-bottom:1px solid rgba(128, 128, 128, 0.5);padding-bottom:8px}.panel.svelte-59k1u4 .content .list-content-row.svelte-59k1u4{display:grid;grid-template-columns:repeat(3, 1fr);grid-column-gap:20px;padding:8px;cursor:pointer}.panel.svelte-59k1u4 .content .list-content-row.svelte-59k1u4:hover{background:rgba(230, 138, 138, 0.2)}.panel.svelte-59k1u4 .content .list-content-item.svelte-59k1u4{overflow:hidden;display:flex;gap:8px}.panel.svelte-59k1u4 .content .list-content .select.svelte-59k1u4{background:rgb(230, 138, 138)}.panel.svelte-59k1u4 .help.svelte-59k1u4{position:absolute;z-index:1;background:rgb(232, 0, 51);border-radius:50%;width:50px;height:50px;line-height:50px;text-align:center;font-size:24px;color:white;right:20px;bottom:20px}@media(max-width: 860px){.panel.svelte-59k1u4.svelte-59k1u4{width:100%}.panel.svelte-59k1u4 .pin.svelte-59k1u4{position:absolute;z-index:0;display:inline-block}}",
  map: null
};
function getDateFromTimeStamp(unix_timestamp) {
  let date = new Date(unix_timestamp * 1e3);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  return `${months[month]} ${day}, ${year}`;
}
const Panel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let select = -1;
  let title2, message2;
  let isMoveModalOpen = false;
  let { moveError = "" } = $$props;
  let { moveLoading = false } = $$props;
  let { selectFileId = "" } = $$props;
  let { selectedDriveName = "" } = $$props;
  let { itemsList = [] } = $$props;
  let { folderHistories = [] } = $$props;
  let { folderNameHistories = [] } = $$props;
  let { itemsListForMove = [] } = $$props;
  let { folderHistoriesForMove = [] } = $$props;
  let { folderNameHistoriesForMove = [] } = $$props;
  let { selectedDrive = "" } = $$props;
  if ($$props.moveError === void 0 && $$bindings.moveError && moveError !== void 0)
    $$bindings.moveError(moveError);
  if ($$props.moveLoading === void 0 && $$bindings.moveLoading && moveLoading !== void 0)
    $$bindings.moveLoading(moveLoading);
  if ($$props.selectFileId === void 0 && $$bindings.selectFileId && selectFileId !== void 0)
    $$bindings.selectFileId(selectFileId);
  if ($$props.selectedDriveName === void 0 && $$bindings.selectedDriveName && selectedDriveName !== void 0)
    $$bindings.selectedDriveName(selectedDriveName);
  if ($$props.itemsList === void 0 && $$bindings.itemsList && itemsList !== void 0)
    $$bindings.itemsList(itemsList);
  if ($$props.folderHistories === void 0 && $$bindings.folderHistories && folderHistories !== void 0)
    $$bindings.folderHistories(folderHistories);
  if ($$props.folderNameHistories === void 0 && $$bindings.folderNameHistories && folderNameHistories !== void 0)
    $$bindings.folderNameHistories(folderNameHistories);
  if ($$props.itemsListForMove === void 0 && $$bindings.itemsListForMove && itemsListForMove !== void 0)
    $$bindings.itemsListForMove(itemsListForMove);
  if ($$props.folderHistoriesForMove === void 0 && $$bindings.folderHistoriesForMove && folderHistoriesForMove !== void 0)
    $$bindings.folderHistoriesForMove(folderHistoriesForMove);
  if ($$props.folderNameHistoriesForMove === void 0 && $$bindings.folderNameHistoriesForMove && folderNameHistoriesForMove !== void 0)
    $$bindings.folderNameHistoriesForMove(folderNameHistoriesForMove);
  if ($$props.selectedDrive === void 0 && $$bindings.selectedDrive && selectedDrive !== void 0)
    $$bindings.selectedDrive(selectedDrive);
  $$result.css.add(css$1);
  {
    {
      console.log("###", folderHistories, "###", folderNameHistories);
    }
  }
  return `<div class="${"panel svelte-59k1u4"}"><span class="${"pin svelte-59k1u4"}"><i class="${"fa fa-reorder"}"></i></span>
	<div class="${"profile svelte-59k1u4"}"><span class="${"svelte-59k1u4"}"><i class="${"fa fa-users"}"></i></span>
		<span class="${"svelte-59k1u4"}"><i class="${"fa fa-user-circle-o"}"></i></span></div>
	<div class="${"action svelte-59k1u4"}"><span class="${"drive-name svelte-59k1u4"}">${selectedDriveName !== "" ? `${escape(selectedDriveName)} Drive` : ``}</span>
		${selectFileId !== "" ? `<span class="${"svelte-59k1u4"}"><i class="${"fa fa-download"}"></i>
			<span class="${"svelte-59k1u4"}">Download</span></span>` : ``}
		<span class="${"svelte-59k1u4"}"><i class="${"fa fa-pencil"}"></i>
			<span class="${"svelte-59k1u4"}">Rename</span></span>
		
		${selectFileId !== "" ? `<span class="${"svelte-59k1u4"}"><i class="${"fa fa-exchange"}"></i>
			<span class="${"svelte-59k1u4"}">Move</span></span>` : ``}
		</div>
	<div class="${"content svelte-59k1u4"}"><div class="${"list"}"><div class="${"list-header svelte-59k1u4"}"><div class="${"list-header-item"}">Name <span class="${"svelte-59k1u4"}"><i class="${"fa fa-arrow-down"}"></i></span></div>
					<div class="${"list-header-item"}">File size
					</div>
					<div class="${"list-header-item"}">Last updated
					</div></div>
				<div class="${"list-content"}">${folderHistories.length > 1 ? `<div class="${"list-content-row svelte-59k1u4"}">...
						</div>` : ``}
					${itemsList.length ? `${each(itemsList, (item, i) => {
    return `<div class="${"list-content-row " + escape(i === select && "select", true) + " svelte-59k1u4"}"><div class="${"list-content-item svelte-59k1u4"}"><i class="${"fa fa-" + escape(item.entityType, true) + "-o svelte-59k1u4"}"></i>
								${escape(item.name)}</div>
							<div class="${"list-content-item svelte-59k1u4"}"><span class="${"svelte-59k1u4"}">${item.entityType !== "folder" ? `${escape(formatBytes(item.size))}` : ``}
								</span></div>
							<div class="${"list-content-item svelte-59k1u4"}"><span class="${"svelte-59k1u4"}">${escape(getDateFromTimeStamp(item.unixTime))}
								</span></div>
						</div>`;
  })}` : `<div class="${"empty svelte-59k1u4"}"><i class="${"fa fa-folder-o"}"></i>
							<span class="${"svelte-59k1u4"}">There&#39;s nothing to see here. Click &quot;new&quot; to add some files.
							</span></div>`}</div></div></div>
	<div class="${"help svelte-59k1u4"}"><span class="${"svelte-59k1u4"}"><i class="${"fa fa-question-circle-o"}"></i></span></div></div>
${``}
${validate_component(Modals, "Modals").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(MoveModal, "MoveModal").$$render($$result, {
        isOpen: isMoveModalOpen,
        title: title2,
        message: message2,
        loading: moveLoading,
        error: moveError,
        itemsList: itemsListForMove,
        folderHistories: folderHistoriesForMove,
        folderNameHistories: folderNameHistoriesForMove
      }, {}, {})}`;
    }
  })}`;
});
const css = {
  code: "section.svelte-q5luon.svelte-q5luon{height:100%;display:flex}section.svelte-q5luon .loading.svelte-q5luon{cursor:wait;position:fixed;z-index:10000;width:100vw;height:100vh;background:rgba(0, 0, 0, 0.5)}",
  map: null
};
let driveOpen = false;
const Todos = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let moveLoading = false;
  let pinShow = false;
  let personalDrives = [];
  let itemsList = [];
  let itemsListForMove = [];
  let selectedDrive = "";
  let selectedDriveKey = "";
  let selectedDriveName = "";
  let selectFileId = "";
  let selectedFolderId = "";
  let folderHistories = [];
  let folderNameHistories = [];
  let folderHistoriesForMove = [];
  let folderNameHistoriesForMove = [];
  let newDriveInfo = {};
  let newItemInfo = {};
  let isFileOpen = false;
  let disable = false;
  let moveError = "";
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `${$$result.title = `<title>TODOS</title>`, ""}`, ""}

<section class="${"svelte-q5luon"}">${``}
  
  ${validate_component(Navbar, "Navbar").$$render($$result, {
      personalDrives,
      selectedDrive,
      selectedFolderId,
      driveOpen,
      isFileOpen,
      disable,
      show: pinShow,
      newDriveInfo,
      newItemInfo
    }, {
      isFileOpen: ($$value) => {
        isFileOpen = $$value;
        $$settled = false;
      },
      disable: ($$value) => {
        disable = $$value;
        $$settled = false;
      },
      show: ($$value) => {
        pinShow = $$value;
        $$settled = false;
      },
      newDriveInfo: ($$value) => {
        newDriveInfo = $$value;
        $$settled = false;
      },
      newItemInfo: ($$value) => {
        newItemInfo = $$value;
        $$settled = false;
      }
    }, {})}
  ${validate_component(Panel, "Panel").$$render($$result, {
      moveLoading,
      moveError,
      selectFileId,
      selectedDriveName,
      selectedDrive,
      selectedDriveKey,
      itemsList,
      folderHistories,
      folderNameHistories,
      itemsListForMove,
      folderHistoriesForMove,
      folderNameHistoriesForMove
    }, {}, {})}
</section>`;
  } while (!$$settled);
  return $$rendered;
});

var index_svelte = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': Todos
});

const index = 6;
const file = '_app/immutable/pages/todos/index.svelte-8a3c01bd.js';
const imports = ["_app/immutable/pages/todos/index.svelte-8a3c01bd.js","_app/immutable/chunks/index-5b9f5232.js","_app/immutable/chunks/Modals-4904eec8.js","_app/immutable/chunks/index-d30e7481.js","_app/immutable/chunks/index-74255380.js"];
const stylesheets = ["_app/immutable/assets/index-f052976f.css"];

export { file, imports, index, index_svelte as module, stylesheets };
//# sourceMappingURL=6-a40fe71d.js.map
