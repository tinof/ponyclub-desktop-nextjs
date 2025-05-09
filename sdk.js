var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
function noop() {
}
const identity = (x) => x;
function assign(tar, src) {
  for (const k in src) tar[k] = src[k];
  return (
    /** @type {T & S} */
    tar
  );
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
  if (element_src === url) return true;
  if (!src_url_equal_anchor) {
    src_url_equal_anchor = document.createElement("a");
  }
  src_url_equal_anchor.href = url;
  return element_src === src_url_equal_anchor.href;
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
}
function exclude_internal_props(props) {
  const result = {};
  for (const k in props) if (k[0] !== "$") result[k] = props[k];
  return result;
}
function split_css_unit(value) {
  const split = typeof value === "string" && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
  return split ? [parseFloat(split[1]), split[2] || "px"] : [
    /** @type {number} */
    value,
    "px"
  ];
}
const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0) raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
function append(target, node) {
  target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
  const append_styles_to = get_root_for_style(target);
  if (!append_styles_to.getElementById(style_sheet_id)) {
    const style = element("style");
    style.id = style_sheet_id;
    style.textContent = styles;
    append_stylesheet(append_styles_to, style);
  }
}
function get_root_for_style(node) {
  if (!node) return document;
  const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
  if (root && /** @type {ShadowRoot} */
  root.host) {
    return (
      /** @type {ShadowRoot} */
      root
    );
  }
  return node.ownerDocument;
}
function append_empty_stylesheet(node) {
  const style_element = element("style");
  style_element.textContent = "/* empty */";
  append_stylesheet(get_root_for_style(node), style_element);
  return style_element.sheet;
}
function append_stylesheet(node, style) {
  append(
    /** @type {Document} */
    node.head || node,
    style
  );
  return style.sheet;
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function element(name) {
  return document.createElement(name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_style(node, key, value, important) {
  if (value == null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, "");
  }
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  return new CustomEvent(type, { detail, bubbles, cancelable });
}
function get_custom_elements_slots(element2) {
  const result = {};
  element2.childNodes.forEach(
    /** @param {Element} node */
    (node) => {
      result[node.slot || "default"] = true;
    }
  );
  return result;
}
function construct_svelte_component(component, props) {
  return new component(props);
}
const managed_styles = /* @__PURE__ */ new Map();
let active = 0;
function hash(str) {
  let hash2 = 5381;
  let i = str.length;
  while (i--) hash2 = (hash2 << 5) - hash2 ^ str.charCodeAt(i);
  return hash2 >>> 0;
}
function create_style_information(doc, node) {
  const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
  managed_styles.set(doc, info);
  return info;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
  const step = 16.666 / duration;
  let keyframes = "{\n";
  for (let p = 0; p <= 1; p += step) {
    const t = a + (b - a) * ease(p);
    keyframes += p * 100 + `%{${fn(t, 1 - t)}}
`;
  }
  const rule = keyframes + `100% {${fn(b, 1 - b)}}
}`;
  const name = `__svelte_${hash(rule)}_${uid}`;
  const doc = get_root_for_style(node);
  const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
  if (!rules[name]) {
    rules[name] = true;
    stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
  }
  const animation = node.style.animation || "";
  node.style.animation = `${animation ? `${animation}, ` : ""}${name} ${duration}ms linear ${delay}ms 1 both`;
  active += 1;
  return name;
}
function delete_rule(node, name) {
  const previous = (node.style.animation || "").split(", ");
  const next = previous.filter(
    name ? (anim) => anim.indexOf(name) < 0 : (anim) => anim.indexOf("__svelte") === -1
    // remove all Svelte animations
  );
  const deleted = previous.length - next.length;
  if (deleted) {
    node.style.animation = next.join(", ");
    active -= deleted;
    if (!active) clear_rules();
  }
}
function clear_rules() {
  raf(() => {
    if (active) return;
    managed_styles.forEach((info) => {
      const { ownerNode } = info.stylesheet;
      if (ownerNode) detach(ownerNode);
    });
    managed_styles.clear();
  });
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];
  if (callbacks) {
    callbacks.slice().forEach((fn) => fn.call(this, event));
  }
}
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach((c) => c());
  render_callbacks = filtered;
}
let promise;
function wait() {
  if (!promise) {
    promise = Promise.resolve();
    promise.then(() => {
      promise = null;
    });
  }
  return promise;
}
function dispatch(node, direction, kind) {
  node.dispatchEvent(custom_event(`${direction ? "intro" : "outro"}${kind}`));
}
const outroing = /* @__PURE__ */ new Set();
let outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
    // parent group
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2) block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
  const options = { direction: "in" };
  let config = fn(node, params, options);
  let running = false;
  let animation_name;
  let task;
  let uid = 0;
  function cleanup() {
    if (animation_name) delete_rule(node, animation_name);
  }
  function go() {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick = noop,
      css
    } = config || null_transition;
    if (css) animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
    tick(0, 1);
    const start_time = now() + delay;
    const end_time = start_time + duration;
    if (task) task.abort();
    running = true;
    add_render_callback(() => dispatch(node, true, "start"));
    task = loop((now2) => {
      if (running) {
        if (now2 >= end_time) {
          tick(1, 0);
          dispatch(node, true, "end");
          cleanup();
          return running = false;
        }
        if (now2 >= start_time) {
          const t = easing((now2 - start_time) / duration);
          tick(t, 1 - t);
        }
      }
      return running;
    });
  }
  let started = false;
  return {
    start() {
      if (started) return;
      started = true;
      delete_rule(node);
      if (is_function(config)) {
        config = config(options);
        wait().then(go);
      } else {
        go();
      }
    },
    invalidate() {
      started = false;
    },
    end() {
      if (running) {
        cleanup();
        running = false;
      }
    }
  };
}
function create_out_transition(node, fn, params) {
  const options = { direction: "out" };
  let config = fn(node, params, options);
  let running = true;
  let animation_name;
  const group = outros;
  group.r += 1;
  let original_inert_value;
  function go() {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick = noop,
      css
    } = config || null_transition;
    if (css) animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
    const start_time = now() + delay;
    const end_time = start_time + duration;
    add_render_callback(() => dispatch(node, false, "start"));
    if ("inert" in node) {
      original_inert_value = /** @type {HTMLElement} */
      node.inert;
      node.inert = true;
    }
    loop((now2) => {
      if (running) {
        if (now2 >= end_time) {
          tick(0, 1);
          dispatch(node, false, "end");
          if (!--group.r) {
            run_all(group.c);
          }
          return false;
        }
        if (now2 >= start_time) {
          const t = easing((now2 - start_time) / duration);
          tick(1 - t, t);
        }
      }
      return running;
    });
  }
  if (is_function(config)) {
    wait().then(() => {
      config = config(options);
      go();
    });
  } else {
    go();
  }
  return {
    end(reset) {
      if (reset && "inert" in node) {
        node.inert = original_inert_value;
      }
      if (reset && config.tick) {
        config.tick(1, 0);
      }
      if (running) {
        if (animation_name) delete_rule(node, animation_name);
        running = false;
      }
    }
  };
}
function create_bidirectional_transition(node, fn, params, intro) {
  const options = { direction: "both" };
  let config = fn(node, params, options);
  let t = intro ? 0 : 1;
  let running_program = null;
  let pending_program = null;
  let animation_name = null;
  let original_inert_value;
  function clear_animation() {
    if (animation_name) delete_rule(node, animation_name);
  }
  function init2(program, duration) {
    const d = (
      /** @type {Program['d']} */
      program.b - t
    );
    duration *= Math.abs(d);
    return {
      a: t,
      b: program.b,
      d,
      duration,
      start: program.start,
      end: program.start + duration,
      group: program.group
    };
  }
  function go(b) {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick = noop,
      css
    } = config || null_transition;
    const program = {
      start: now() + delay,
      b
    };
    if (!b) {
      program.group = outros;
      outros.r += 1;
    }
    if ("inert" in node) {
      if (b) {
        if (original_inert_value !== void 0) {
          node.inert = original_inert_value;
        }
      } else {
        original_inert_value = /** @type {HTMLElement} */
        node.inert;
        node.inert = true;
      }
    }
    if (running_program || pending_program) {
      pending_program = program;
    } else {
      if (css) {
        clear_animation();
        animation_name = create_rule(node, t, b, duration, delay, easing, css);
      }
      if (b) tick(0, 1);
      running_program = init2(program, duration);
      add_render_callback(() => dispatch(node, b, "start"));
      loop((now2) => {
        if (pending_program && now2 > pending_program.start) {
          running_program = init2(pending_program, duration);
          pending_program = null;
          dispatch(node, running_program.b, "start");
          if (css) {
            clear_animation();
            animation_name = create_rule(
              node,
              t,
              running_program.b,
              running_program.duration,
              0,
              easing,
              config.css
            );
          }
        }
        if (running_program) {
          if (now2 >= running_program.end) {
            tick(t = running_program.b, 1 - t);
            dispatch(node, running_program.b, "end");
            if (!pending_program) {
              if (running_program.b) {
                clear_animation();
              } else {
                if (!--running_program.group.r) run_all(running_program.group.c);
              }
            }
            running_program = null;
          } else if (now2 >= running_program.start) {
            const p = now2 - running_program.start;
            t = running_program.a + running_program.d * easing(p / running_program.duration);
            tick(t, 1 - t);
          }
        }
        return !!(running_program || pending_program);
      });
    }
  }
  return {
    run(b) {
      if (is_function(config)) {
        wait().then(() => {
          const opts = { direction: b ? "in" : "out" };
          config = config(opts);
          go(b);
        });
      } else {
        go(b);
      }
    },
    end() {
      clear_animation();
      running_program = pending_program = null;
    }
  };
}
function get_spread_update(levels, updates) {
  const update2 = {};
  const to_null_out = {};
  const accounted_for = { $$scope: 1 };
  let i = levels.length;
  while (i--) {
    const o = levels[i];
    const n = updates[i];
    if (n) {
      for (const key in o) {
        if (!(key in n)) to_null_out[key] = 1;
      }
      for (const key in n) {
        if (!accounted_for[key]) {
          update2[key] = n[key];
          accounted_for[key] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update2)) update2[key] = void 0;
  }
  return update2;
}
function get_spread_object(spread_props) {
  return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  add_render_callback(() => {
    const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
    if (component.$$.on_destroy) {
      component.$$.on_destroy.push(...new_on_destroy);
    } else {
      run_all(new_on_destroy);
    }
    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance2, create_fragment2, not_equal, props, append_styles2, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles2 && append_styles2($$.root);
  let ready = false;
  $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }
  set_current_component(parent_component);
}
let SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor($$componentCtor, $$slots, use_shadow_dom) {
      super();
      /** The Svelte component constructor */
      __publicField(this, "$$ctor");
      /** Slots */
      __publicField(this, "$$s");
      /** The Svelte component instance */
      __publicField(this, "$$c");
      /** Whether or not the custom element is connected */
      __publicField(this, "$$cn", false);
      /** Component props data */
      __publicField(this, "$$d", {});
      /** `true` if currently in the process of reflecting component props back to attributes */
      __publicField(this, "$$r", false);
      /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
      __publicField(this, "$$p_d", {});
      /** @type {Record<string, Function[]>} Event listeners */
      __publicField(this, "$$l", {});
      /** @type {Map<Function, Function>} Event listener unsubscribe functions */
      __publicField(this, "$$l_u", /* @__PURE__ */ new Map());
      this.$$ctor = $$componentCtor;
      this.$$s = $$slots;
      if (use_shadow_dom) {
        this.attachShadow({ mode: "open" });
      }
    }
    addEventListener(type, listener, options) {
      this.$$l[type] = this.$$l[type] || [];
      this.$$l[type].push(listener);
      if (this.$$c) {
        const unsub = this.$$c.$on(type, listener);
        this.$$l_u.set(listener, unsub);
      }
      super.addEventListener(type, listener, options);
    }
    removeEventListener(type, listener, options) {
      super.removeEventListener(type, listener, options);
      if (this.$$c) {
        const unsub = this.$$l_u.get(listener);
        if (unsub) {
          unsub();
          this.$$l_u.delete(listener);
        }
      }
    }
    async connectedCallback() {
      this.$$cn = true;
      if (!this.$$c) {
        let create_slot2 = function(name) {
          return () => {
            let node;
            const obj = {
              c: function create() {
                node = element("slot");
                if (name !== "default") {
                  attr(node, "name", name);
                }
              },
              /**
               * @param {HTMLElement} target
               * @param {HTMLElement} [anchor]
               */
              m: function mount(target, anchor) {
                insert(target, node, anchor);
              },
              d: function destroy(detaching) {
                if (detaching) {
                  detach(node);
                }
              }
            };
            return obj;
          };
        };
        await Promise.resolve();
        if (!this.$$cn) {
          return;
        }
        const $$slots = {};
        const existing_slots = get_custom_elements_slots(this);
        for (const name of this.$$s) {
          if (name in existing_slots) {
            $$slots[name] = [create_slot2(name)];
          }
        }
        for (const attribute of this.attributes) {
          const name = this.$$g_p(attribute.name);
          if (!(name in this.$$d)) {
            this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
          }
        }
        this.$$c = new this.$$ctor({
          target: this.shadowRoot || this,
          props: {
            ...this.$$d,
            $$slots,
            $$scope: {
              ctx: []
            }
          }
        });
        const reflect_attributes = () => {
          this.$$r = true;
          for (const key in this.$$p_d) {
            this.$$d[key] = this.$$c.$$.ctx[this.$$c.$$.props[key]];
            if (this.$$p_d[key].reflect) {
              const attribute_value = get_custom_element_value(
                key,
                this.$$d[key],
                this.$$p_d,
                "toAttribute"
              );
              if (attribute_value == null) {
                this.removeAttribute(key);
              } else {
                this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
              }
            }
          }
          this.$$r = false;
        };
        this.$$c.$$.after_update.push(reflect_attributes);
        reflect_attributes();
        for (const type in this.$$l) {
          for (const listener of this.$$l[type]) {
            const unsub = this.$$c.$on(type, listener);
            this.$$l_u.set(listener, unsub);
          }
        }
        this.$$l = {};
      }
    }
    // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
    // and setting attributes through setAttribute etc, this is helpful
    attributeChangedCallback(attr2, _oldValue, newValue) {
      var _a;
      if (this.$$r) return;
      attr2 = this.$$g_p(attr2);
      this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
      (_a = this.$$c) == null ? void 0 : _a.$set({ [attr2]: this.$$d[attr2] });
    }
    disconnectedCallback() {
      this.$$cn = false;
      Promise.resolve().then(() => {
        if (!this.$$cn) {
          this.$$c.$destroy();
          this.$$c = void 0;
        }
      });
    }
    $$g_p(attribute_name) {
      return Object.keys(this.$$p_d).find(
        (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
      ) || attribute_name;
    }
  };
}
function get_custom_element_value(prop, value, props_definition, transform) {
  var _a;
  const type = (_a = props_definition[prop]) == null ? void 0 : _a.type;
  value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
  if (!transform || !props_definition[prop]) {
    return value;
  } else if (transform === "toAttribute") {
    switch (type) {
      case "Object":
      case "Array":
        return value == null ? null : JSON.stringify(value);
      case "Boolean":
        return value ? "" : null;
      case "Number":
        return value == null ? null : value;
      default:
        return value;
    }
  } else {
    switch (type) {
      case "Object":
      case "Array":
        return value && JSON.parse(value);
      case "Boolean":
        return value;
      case "Number":
        return value != null ? +value : value;
      default:
        return value;
    }
  }
}
function create_custom_element(Component, props_definition, slots, accessors, use_shadow_dom, extend) {
  let Class = class extends SvelteElement {
    constructor() {
      super(Component, slots, use_shadow_dom);
      this.$$p_d = props_definition;
    }
    static get observedAttributes() {
      return Object.keys(props_definition).map(
        (key) => (props_definition[key].attribute || key).toLowerCase()
      );
    }
  };
  Object.keys(props_definition).forEach((prop) => {
    Object.defineProperty(Class.prototype, prop, {
      get() {
        return this.$$c && prop in this.$$c ? this.$$c[prop] : this.$$d[prop];
      },
      set(value) {
        var _a;
        value = get_custom_element_value(prop, value, props_definition);
        this.$$d[prop] = value;
        (_a = this.$$c) == null ? void 0 : _a.$set({ [prop]: value });
      }
    });
  });
  accessors.forEach((accessor) => {
    Object.defineProperty(Class.prototype, accessor, {
      get() {
        var _a;
        return (_a = this.$$c) == null ? void 0 : _a[accessor];
      }
    });
  });
  Component.element = /** @type {any} */
  Class;
  return Class;
}
class SvelteComponent {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    __publicField(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    __publicField(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1) callbacks.splice(index, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(props) {
    if (this.$$set && !is_empty(props)) {
      this.$$.skip_bound = true;
      this.$$set(props);
      this.$$.skip_bound = false;
    }
  }
}
const PUBLIC_VERSION = "4";
if (typeof window !== "undefined")
  (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var striptags = { exports: {} };
(function(module) {
  (function(global2) {
    if (typeof Symbol2 !== "function") {
      var Symbol2 = function(name) {
        return name;
      };
      Symbol2.nonNative = true;
    }
    const STATE_PLAINTEXT = Symbol2("plaintext");
    const STATE_HTML = Symbol2("html");
    const STATE_COMMENT = Symbol2("comment");
    const ALLOWED_TAGS_REGEX = /<(\w*)>/g;
    const NORMALIZE_TAG_REGEX = /<\/?([^\s\/>]+)/;
    function striptags2(html, allowable_tags, tag_replacement) {
      html = html || "";
      allowable_tags = allowable_tags || [];
      tag_replacement = tag_replacement || "";
      let context = init_context(allowable_tags, tag_replacement);
      return striptags_internal(html, context);
    }
    function init_striptags_stream(allowable_tags, tag_replacement) {
      allowable_tags = allowable_tags || [];
      tag_replacement = tag_replacement || "";
      let context = init_context(allowable_tags, tag_replacement);
      return function striptags_stream(html) {
        return striptags_internal(html || "", context);
      };
    }
    striptags2.init_streaming_mode = init_striptags_stream;
    function init_context(allowable_tags, tag_replacement) {
      allowable_tags = parse_allowable_tags(allowable_tags);
      return {
        allowable_tags,
        tag_replacement,
        state: STATE_PLAINTEXT,
        tag_buffer: "",
        depth: 0,
        in_quote_char: ""
      };
    }
    function striptags_internal(html, context) {
      if (typeof html != "string") {
        throw new TypeError("'html' parameter must be a string");
      }
      let allowable_tags = context.allowable_tags;
      let tag_replacement = context.tag_replacement;
      let state = context.state;
      let tag_buffer = context.tag_buffer;
      let depth = context.depth;
      let in_quote_char = context.in_quote_char;
      let output = "";
      for (let idx = 0, length = html.length; idx < length; idx++) {
        let char = html[idx];
        if (state === STATE_PLAINTEXT) {
          switch (char) {
            case "<":
              state = STATE_HTML;
              tag_buffer += char;
              break;
            default:
              output += char;
              break;
          }
        } else if (state === STATE_HTML) {
          switch (char) {
            case "<":
              if (in_quote_char) {
                break;
              }
              depth++;
              break;
            case ">":
              if (in_quote_char) {
                break;
              }
              if (depth) {
                depth--;
                break;
              }
              in_quote_char = "";
              state = STATE_PLAINTEXT;
              tag_buffer += ">";
              if (allowable_tags.has(normalize_tag(tag_buffer))) {
                output += tag_buffer;
              } else {
                output += tag_replacement;
              }
              tag_buffer = "";
              break;
            case '"':
            case "'":
              if (char === in_quote_char) {
                in_quote_char = "";
              } else {
                in_quote_char = in_quote_char || char;
              }
              tag_buffer += char;
              break;
            case "-":
              if (tag_buffer === "<!-") {
                state = STATE_COMMENT;
              }
              tag_buffer += char;
              break;
            case " ":
            case "\n":
              if (tag_buffer === "<") {
                state = STATE_PLAINTEXT;
                output += "< ";
                tag_buffer = "";
                break;
              }
              tag_buffer += char;
              break;
            default:
              tag_buffer += char;
              break;
          }
        } else if (state === STATE_COMMENT) {
          switch (char) {
            case ">":
              if (tag_buffer.slice(-2) == "--") {
                state = STATE_PLAINTEXT;
              }
              tag_buffer = "";
              break;
            default:
              tag_buffer += char;
              break;
          }
        }
      }
      context.state = state;
      context.tag_buffer = tag_buffer;
      context.depth = depth;
      context.in_quote_char = in_quote_char;
      return output;
    }
    function parse_allowable_tags(allowable_tags) {
      let tag_set = /* @__PURE__ */ new Set();
      if (typeof allowable_tags === "string") {
        let match;
        while (match = ALLOWED_TAGS_REGEX.exec(allowable_tags)) {
          tag_set.add(match[1]);
        }
      } else if (!Symbol2.nonNative && typeof allowable_tags[Symbol2.iterator] === "function") {
        tag_set = new Set(allowable_tags);
      } else if (typeof allowable_tags.forEach === "function") {
        allowable_tags.forEach(tag_set.add, tag_set);
      }
      return tag_set;
    }
    function normalize_tag(tag_buffer) {
      let match = NORMALIZE_TAG_REGEX.exec(tag_buffer);
      return match ? match[1].toLowerCase() : null;
    }
    if (module.exports) {
      module.exports = striptags2;
    } else {
      global2.striptags = striptags2;
    }
  })(commonjsGlobal);
})(striptags);
class BranchURLs {
  constructor(isLocal, branch, tld) {
    this.isLocal = isLocal;
    this.branch = branch;
    this.tld = tld;
  }
  _format(appName, options = {}) {
    const {
      supportsBranchEnvironments = true,
      localPort
    } = options;
    if (this.isLocal && Number.isFinite(localPort)) {
      return new URL(`http://${this.tld}:${localPort}`);
    }
    const appPrefix = appName ? `${appName}-` : "";
    const subdomain = this.branch && supportsBranchEnvironments ? `${appPrefix}${this.branch}` : appName;
    return subdomain ? new URL(`https://${subdomain}.${this.tld}`) : new URL(`https://${this.tld}`);
  }
}
class ExternalURLs extends BranchURLs {
  get homepage() {
    return this._format(void 0, { localPort: 1155 });
  }
  get dashboard() {
    return this._format("dashboard", { localPort: 1158 });
  }
  get checkout() {
    return this._format("checkout", { localPort: 1157 });
  }
  get auth() {
    return this._format("auth", { localPort: 3132 });
  }
  get api() {
    return this._format("api", { localPort: 3e3 });
  }
  get selfserve() {
    return this._format("my", { localPort: 1159 });
  }
  get whitelabel() {
    const { protocol, host } = this.homepage;
    return {
      partner(name) {
        return new URL(`${protocol}//${name}.on.${host}`);
      }
    };
  }
  get conversations() {
    return this._format("conversations");
  }
  get integrations() {
    return this._format("integrations", { localPort: 1160 });
  }
  get shop() {
    return this._format("shop", { localPort: 1161 });
  }
  get video() {
    return this._format("video", { supportsBranchEnvironments: false });
  }
}
const URLs = new ExternalURLs(
  false,
  "",
  "beyonk.com"
);
class RemoteEventDispatcher {
  constructor(w) {
    this.w = w;
    this.version = 1;
  }
  dispatch(eventName, meta2) {
    const message = JSON.stringify({
      version: this.version,
      eventName,
      meta: meta2
    });
    this.w.parent.postMessage(message, "*");
  }
}
class RemoteEventObserver {
  constructor(w, options = {}) {
    this.w = w;
    this.originFilter = options.originFilter || /.*/;
    this.callbacks = {};
    this.debug = this._hasRuntimeDebuggingEnabled || options.debug || false;
    this.debug && console.debug("Debugging is enabled");
    this.listening = false;
    this.version = 1;
  }
  get _hasRuntimeDebuggingEnabled() {
    try {
      return !!localStorage.getItem("_byk_embedded_debug");
    } catch (e) {
      return false;
    }
  }
  handle(ev) {
    if (!ev.origin.match(this.originFilter)) {
      this.debug && console.debug("Ignoring event from untrusted origin", ev.origin);
      return;
    }
    try {
      const { version, eventName, meta: meta2 } = JSON.parse(ev.data);
      if (version && version !== this.version) {
        this.debug && console.debug(`Received v${version} event in v${this.version} observer. Ignoring.`);
        return;
      }
      const cb = this.callbacks[eventName];
      if (!cb) {
        this.debug && console.debug(`No registered handlers for ${eventName}`);
        return;
      }
      const isWhitelabelResizeEvent = eventName === defaultLegacyEventName;
      return isWhitelabelResizeEvent ? cb(meta2.height) : cb(meta2);
    } catch (e) {
      this.debug && console.debug("Recieved unparseable event", ev.data);
    }
  }
  listen(eventName, callback) {
    this.debug && console.debug("Registered listener for", eventName);
    this.callbacks[eventName] = callback;
    if (!this.listening) {
      this.binding = this.handle.bind(this);
      this.w.addEventListener("message", this.binding, false);
      this.listening = true;
      this.debug && console.debug("Now listening for events");
    }
  }
  ignore(eventName) {
    const cb = this.callbacks[eventName];
    if (cb) {
      delete this.callbacks[eventName];
    }
    if (!this.callbacks.length) {
      this.w.removeEventListener("message", this.binding, false);
      this.listening = false;
      this.debug && console.debug("No more listeners, stopped listening for events");
    }
  }
}
const defaultLegacyEventName = "whitelabel:header:resize";
const EventNames = {
  ResizePortal: "beyonk:resize-portal",
  RedirectParent: "beyonk:redirect-parent",
  RegisterCart: "beyonk:register-cart",
  Analytics: "beyonk:analytics",
  ScrollIntoView: "beyonk:scroll-into-view"
};
function create_fragment$7(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "View Cart";
      attr(button, "type", "button");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*viewCart*/
          ctx[0]
        );
        mounted = true;
      }
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function instance$7($$self) {
  const red = new RemoteEventDispatcher(window);
  const currentCartId = sessionStorage == null ? void 0 : sessionStorage.getItem("cart");
  function viewCart() {
    const url = new URL(`/cart/${currentCartId}`, URLs.checkout).toString();
    red.dispatch(EventNames.RedirectParent, { url });
  }
  return [viewCart];
}
class CartButton extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$7, safe_not_equal, {});
  }
}
customElements.define("view-cart-button", create_custom_element(CartButton, {}, [], [], true));
const UTM_PARAMS = [
  "utm_id",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content"
];
function getUTMParams(url) {
  const { searchParams } = url instanceof URL ? url : new URL(url);
  const params = new URLSearchParams();
  for (const name of UTM_PARAMS) {
    if (!searchParams.has(name)) {
      continue;
    }
    params.set(name, searchParams.get(name));
  }
  return params;
}
function create_fragment$6(ctx) {
  let iframe;
  let iframe_src_value;
  return {
    c() {
      iframe = element("iframe");
      if (!src_url_equal(iframe.src, iframe_src_value = /*src*/
      ctx[2])) attr(iframe, "src", iframe_src_value);
      attr(
        iframe,
        "width",
        /*width*/
        ctx[0]
      );
      attr(
        iframe,
        "height",
        /*height*/
        ctx[1]
      );
      set_style(iframe, "min-height", "480px");
      attr(iframe, "frameborder", "0");
      attr(iframe, "scrolling", "no");
      attr(iframe, "allow", "payment *");
      attr(iframe, "title", "Beyonk Booking Form");
    },
    m(target, anchor) {
      insert(target, iframe, anchor);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*width*/
      1) {
        attr(
          iframe,
          "width",
          /*width*/
          ctx2[0]
        );
      }
      if (dirty & /*height*/
      2) {
        attr(
          iframe,
          "height",
          /*height*/
          ctx2[1]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(iframe);
      }
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let { organisation } = $$props;
  let { experience } = $$props;
  let { colour = "#32b0a2" } = $$props;
  let { color } = $$props;
  let { source = "form" } = $$props;
  let { partner = null } = $$props;
  let { integration = "byk-light" } = $$props;
  let { width = "100%" } = $$props;
  let { height = "100%" } = $$props;
  function buildIntegrationUrl() {
    const url = new URL(`${organisation}/form/experience/${experience}/tickets`, URLs.checkout);
    url.searchParams.set("source", source);
    url.searchParams.set("theme", (color || colour).slice(1));
    url.searchParams.set("integration", integration);
    if (partner) {
      url.searchParams.set("partner", partner);
    }
    const utmParams = getUTMParams(window.location.href);
    for (const [name, value] of utmParams.entries()) {
      url.searchParams.set(name, value);
    }
    return url.toString();
  }
  const src = buildIntegrationUrl();
  $$self.$$set = ($$props2) => {
    if ("organisation" in $$props2) $$invalidate(3, organisation = $$props2.organisation);
    if ("experience" in $$props2) $$invalidate(4, experience = $$props2.experience);
    if ("colour" in $$props2) $$invalidate(5, colour = $$props2.colour);
    if ("color" in $$props2) $$invalidate(6, color = $$props2.color);
    if ("source" in $$props2) $$invalidate(7, source = $$props2.source);
    if ("partner" in $$props2) $$invalidate(8, partner = $$props2.partner);
    if ("integration" in $$props2) $$invalidate(9, integration = $$props2.integration);
    if ("width" in $$props2) $$invalidate(0, width = $$props2.width);
    if ("height" in $$props2) $$invalidate(1, height = $$props2.height);
  };
  return [
    width,
    height,
    src,
    organisation,
    experience,
    colour,
    color,
    source,
    partner,
    integration
  ];
}
class BookingForm extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, {
      organisation: 3,
      experience: 4,
      colour: 5,
      color: 6,
      source: 7,
      partner: 8,
      integration: 9,
      width: 0,
      height: 1
    });
  }
  get organisation() {
    return this.$$.ctx[3];
  }
  set organisation(organisation) {
    this.$$set({ organisation });
    flush();
  }
  get experience() {
    return this.$$.ctx[4];
  }
  set experience(experience) {
    this.$$set({ experience });
    flush();
  }
  get colour() {
    return this.$$.ctx[5];
  }
  set colour(colour) {
    this.$$set({ colour });
    flush();
  }
  get color() {
    return this.$$.ctx[6];
  }
  set color(color) {
    this.$$set({ color });
    flush();
  }
  get source() {
    return this.$$.ctx[7];
  }
  set source(source) {
    this.$$set({ source });
    flush();
  }
  get partner() {
    return this.$$.ctx[8];
  }
  set partner(partner) {
    this.$$set({ partner });
    flush();
  }
  get integration() {
    return this.$$.ctx[9];
  }
  set integration(integration) {
    this.$$set({ integration });
    flush();
  }
  get width() {
    return this.$$.ctx[0];
  }
  set width(width) {
    this.$$set({ width });
    flush();
  }
  get height() {
    return this.$$.ctx[1];
  }
  set height(height) {
    this.$$set({ height });
    flush();
  }
}
customElements.define("booking-form", create_custom_element(BookingForm, { "organisation": {}, "experience": {}, "colour": {}, "color": {}, "source": {}, "partner": {}, "integration": {}, "width": {}, "height": {} }, [], [], true));
function create_fragment$5(ctx) {
  let iframe;
  let iframe_src_value;
  return {
    c() {
      iframe = element("iframe");
      if (!src_url_equal(iframe.src, iframe_src_value = /*src*/
      ctx[2])) attr(iframe, "src", iframe_src_value);
      attr(
        iframe,
        "width",
        /*width*/
        ctx[0]
      );
      attr(
        iframe,
        "height",
        /*height*/
        ctx[1]
      );
      set_style(iframe, "min-height", "480px");
      attr(iframe, "frameborder", "0");
      attr(iframe, "scrolling", "no");
      attr(iframe, "allow", "payment *");
      attr(iframe, "title", "Beyonk Gift Voucher Form");
    },
    m(target, anchor) {
      insert(target, iframe, anchor);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*width*/
      1) {
        attr(
          iframe,
          "width",
          /*width*/
          ctx2[0]
        );
      }
      if (dirty & /*height*/
      2) {
        attr(
          iframe,
          "height",
          /*height*/
          ctx2[1]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(iframe);
      }
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let { organisation } = $$props;
  let { experience = null } = $$props;
  let { colour = "#32b0a2" } = $$props;
  let { color } = $$props;
  let { source = "form" } = $$props;
  let { partner = null } = $$props;
  let { integration = "byk-light" } = $$props;
  let { width = "100%" } = $$props;
  let { height = "100%" } = $$props;
  function buildIntegrationUrl() {
    const url = new URL(`/${organisation}/form/gift-voucher`, URLs.checkout);
    url.searchParams.set("source", source);
    url.searchParams.set("theme", (color || colour).slice(1));
    if (experience) {
      url.searchParams.set("experience", experience);
    }
    if (partner) {
      url.searchParams.set("partner", partner);
    }
    url.searchParams.set("integration", integration);
    const utmParams = getUTMParams(window.location.href);
    for (const [name, value] of utmParams.entries()) {
      url.searchParams.set(name, value);
    }
    return url.toString();
  }
  const src = buildIntegrationUrl();
  $$self.$$set = ($$props2) => {
    if ("organisation" in $$props2) $$invalidate(3, organisation = $$props2.organisation);
    if ("experience" in $$props2) $$invalidate(4, experience = $$props2.experience);
    if ("colour" in $$props2) $$invalidate(5, colour = $$props2.colour);
    if ("color" in $$props2) $$invalidate(6, color = $$props2.color);
    if ("source" in $$props2) $$invalidate(7, source = $$props2.source);
    if ("partner" in $$props2) $$invalidate(8, partner = $$props2.partner);
    if ("integration" in $$props2) $$invalidate(9, integration = $$props2.integration);
    if ("width" in $$props2) $$invalidate(0, width = $$props2.width);
    if ("height" in $$props2) $$invalidate(1, height = $$props2.height);
  };
  return [
    width,
    height,
    src,
    organisation,
    experience,
    colour,
    color,
    source,
    partner,
    integration
  ];
}
class GiftVoucherForm extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, {
      organisation: 3,
      experience: 4,
      colour: 5,
      color: 6,
      source: 7,
      partner: 8,
      integration: 9,
      width: 0,
      height: 1
    });
  }
  get organisation() {
    return this.$$.ctx[3];
  }
  set organisation(organisation) {
    this.$$set({ organisation });
    flush();
  }
  get experience() {
    return this.$$.ctx[4];
  }
  set experience(experience) {
    this.$$set({ experience });
    flush();
  }
  get colour() {
    return this.$$.ctx[5];
  }
  set colour(colour) {
    this.$$set({ colour });
    flush();
  }
  get color() {
    return this.$$.ctx[6];
  }
  set color(color) {
    this.$$set({ color });
    flush();
  }
  get source() {
    return this.$$.ctx[7];
  }
  set source(source) {
    this.$$set({ source });
    flush();
  }
  get partner() {
    return this.$$.ctx[8];
  }
  set partner(partner) {
    this.$$set({ partner });
    flush();
  }
  get integration() {
    return this.$$.ctx[9];
  }
  set integration(integration) {
    this.$$set({ integration });
    flush();
  }
  get width() {
    return this.$$.ctx[0];
  }
  set width(width) {
    this.$$set({ width });
    flush();
  }
  get height() {
    return this.$$.ctx[1];
  }
  set height(height) {
    this.$$set({ height });
    flush();
  }
}
customElements.define("gift-voucher-form", create_custom_element(GiftVoucherForm, { "organisation": {}, "experience": {}, "colour": {}, "color": {}, "source": {}, "partner": {}, "integration": {}, "width": {}, "height": {} }, [], [], true));
function isElementTopAboveViewport(element2) {
  const rect = element2.getBoundingClientRect();
  return rect.top < 0;
}
function scrollIntoView(iframe) {
  if (!iframe) {
    return;
  }
  setTimeout(() => {
    if (isElementTopAboveViewport(iframe)) {
      iframe.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }, 100);
}
function create_fragment$4(ctx) {
  let iframe_1;
  let iframe_1_src_value;
  return {
    c() {
      iframe_1 = element("iframe");
      attr(iframe_1, "frameborder", "0");
      attr(iframe_1, "allow", "payment *");
      if (!src_url_equal(iframe_1.src, iframe_1_src_value = /*src*/
      ctx[3])) attr(iframe_1, "src", iframe_1_src_value);
      attr(
        iframe_1,
        "width",
        /*width*/
        ctx[1]
      );
      attr(
        iframe_1,
        "height",
        /*height*/
        ctx[0]
      );
      attr(iframe_1, "title", "Beyonk Portal");
    },
    m(target, anchor) {
      insert(target, iframe_1, anchor);
      ctx[11](iframe_1);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*width*/
      2) {
        attr(
          iframe_1,
          "width",
          /*width*/
          ctx2[1]
        );
      }
      if (dirty & /*height*/
      1) {
        attr(
          iframe_1,
          "height",
          /*height*/
          ctx2[0]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(iframe_1);
      }
      ctx[11](null);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let { organisation } = $$props;
  let { colour = "#32b0a2" } = $$props;
  let { color } = $$props;
  let { partner = null } = $$props;
  let { tags = null } = $$props;
  let { autoResize = true } = $$props;
  let { integration = "byk-light" } = $$props;
  let { width = "100%" } = $$props;
  let { height = "100%" } = $$props;
  let iframe;
  const reo2 = new RemoteEventObserver(window);
  reo2.listen(EventNames.ScrollIntoView, () => scrollIntoView(iframe));
  if (autoResize) {
    reo2.listen(EventNames.ResizePortal, (dimensions) => {
      $$invalidate(0, height = dimensions.height);
    });
  }
  function buildIntegrationUrl() {
    const url = new URL(`/${organisation}`, URLs.shop);
    url.searchParams.set("theme", (color || colour).slice(1));
    url.searchParams.set("integration", integration);
    if (tags) {
      for (const tag of tags.split(",")) {
        url.searchParams.append("tags", tag);
      }
    }
    if (partner) {
      url.searchParams.set("partnerId", partner);
    }
    const utmParams = getUTMParams(window.location.href);
    for (const [name, value] of utmParams.entries()) {
      url.searchParams.set(name, value);
    }
    return url.toString();
  }
  const src = buildIntegrationUrl();
  function iframe_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      iframe = $$value;
      $$invalidate(2, iframe);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("organisation" in $$props2) $$invalidate(4, organisation = $$props2.organisation);
    if ("colour" in $$props2) $$invalidate(5, colour = $$props2.colour);
    if ("color" in $$props2) $$invalidate(6, color = $$props2.color);
    if ("partner" in $$props2) $$invalidate(7, partner = $$props2.partner);
    if ("tags" in $$props2) $$invalidate(8, tags = $$props2.tags);
    if ("autoResize" in $$props2) $$invalidate(9, autoResize = $$props2.autoResize);
    if ("integration" in $$props2) $$invalidate(10, integration = $$props2.integration);
    if ("width" in $$props2) $$invalidate(1, width = $$props2.width);
    if ("height" in $$props2) $$invalidate(0, height = $$props2.height);
  };
  return [
    height,
    width,
    iframe,
    src,
    organisation,
    colour,
    color,
    partner,
    tags,
    autoResize,
    integration,
    iframe_1_binding
  ];
}
class Portal extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, {
      organisation: 4,
      colour: 5,
      color: 6,
      partner: 7,
      tags: 8,
      autoResize: 9,
      integration: 10,
      width: 1,
      height: 0
    });
  }
  get organisation() {
    return this.$$.ctx[4];
  }
  set organisation(organisation) {
    this.$$set({ organisation });
    flush();
  }
  get colour() {
    return this.$$.ctx[5];
  }
  set colour(colour) {
    this.$$set({ colour });
    flush();
  }
  get color() {
    return this.$$.ctx[6];
  }
  set color(color) {
    this.$$set({ color });
    flush();
  }
  get partner() {
    return this.$$.ctx[7];
  }
  set partner(partner) {
    this.$$set({ partner });
    flush();
  }
  get tags() {
    return this.$$.ctx[8];
  }
  set tags(tags) {
    this.$$set({ tags });
    flush();
  }
  get autoResize() {
    return this.$$.ctx[9];
  }
  set autoResize(autoResize) {
    this.$$set({ autoResize });
    flush();
  }
  get integration() {
    return this.$$.ctx[10];
  }
  set integration(integration) {
    this.$$set({ integration });
    flush();
  }
  get width() {
    return this.$$.ctx[1];
  }
  set width(width) {
    this.$$set({ width });
    flush();
  }
  get height() {
    return this.$$.ctx[0];
  }
  set height(height) {
    this.$$set({ height });
    flush();
  }
}
customElements.define("organisation-portal", create_custom_element(Portal, { "organisation": {}, "colour": {}, "color": {}, "partner": {}, "tags": {}, "autoResize": { "type": "Boolean", "attribute": "auto-resize" }, "integration": {}, "width": {}, "height": {} }, [], [], true));
function create_fragment$3(ctx) {
  let iframe;
  let iframe_src_value;
  return {
    c() {
      iframe = element("iframe");
      if (!src_url_equal(iframe.src, iframe_src_value = /*src*/
      ctx[2])) attr(iframe, "src", iframe_src_value);
      attr(
        iframe,
        "width",
        /*width*/
        ctx[1]
      );
      attr(
        iframe,
        "height",
        /*height*/
        ctx[0]
      );
      attr(iframe, "frameborder", "0");
      attr(iframe, "allow", "payment *");
      attr(iframe, "title", "Beyonk Experience Overview");
    },
    m(target, anchor) {
      insert(target, iframe, anchor);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*width*/
      2) {
        attr(
          iframe,
          "width",
          /*width*/
          ctx2[1]
        );
      }
      if (dirty & /*height*/
      1) {
        attr(
          iframe,
          "height",
          /*height*/
          ctx2[0]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(iframe);
      }
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let { experience } = $$props;
  let { colour = "#32b0a2" } = $$props;
  let { color } = $$props;
  let { partner = null } = $$props;
  let { autoResize = true } = $$props;
  let { integration = "byk-light" } = $$props;
  let { width = "100%" } = $$props;
  let { height = "100%" } = $$props;
  if (autoResize) {
    const reo2 = new RemoteEventObserver(window);
    reo2.listen(EventNames.ResizePortal, (dimensions) => {
      $$invalidate(0, height = dimensions.height);
    });
  }
  function buildIntegrationUrl() {
    const url = new URL(`/experiences/${experience}`, URLs.shop);
    url.searchParams.set("theme", (color || colour).slice(1));
    url.searchParams.set("integration", integration);
    if (partner) {
      url.searchParams.set("partnerId", partner);
    }
    const utmParams = getUTMParams(window.location.href);
    for (const [name, value] of utmParams.entries()) {
      url.searchParams.set(name, value);
    }
    return url.toString();
  }
  const src = buildIntegrationUrl();
  $$self.$$set = ($$props2) => {
    if ("experience" in $$props2) $$invalidate(3, experience = $$props2.experience);
    if ("colour" in $$props2) $$invalidate(4, colour = $$props2.colour);
    if ("color" in $$props2) $$invalidate(5, color = $$props2.color);
    if ("partner" in $$props2) $$invalidate(6, partner = $$props2.partner);
    if ("autoResize" in $$props2) $$invalidate(7, autoResize = $$props2.autoResize);
    if ("integration" in $$props2) $$invalidate(8, integration = $$props2.integration);
    if ("width" in $$props2) $$invalidate(1, width = $$props2.width);
    if ("height" in $$props2) $$invalidate(0, height = $$props2.height);
  };
  return [
    height,
    width,
    src,
    experience,
    colour,
    color,
    partner,
    autoResize,
    integration
  ];
}
class Overview extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {
      experience: 3,
      colour: 4,
      color: 5,
      partner: 6,
      autoResize: 7,
      integration: 8,
      width: 1,
      height: 0
    });
  }
  get experience() {
    return this.$$.ctx[3];
  }
  set experience(experience) {
    this.$$set({ experience });
    flush();
  }
  get colour() {
    return this.$$.ctx[4];
  }
  set colour(colour) {
    this.$$set({ colour });
    flush();
  }
  get color() {
    return this.$$.ctx[5];
  }
  set color(color) {
    this.$$set({ color });
    flush();
  }
  get partner() {
    return this.$$.ctx[6];
  }
  set partner(partner) {
    this.$$set({ partner });
    flush();
  }
  get autoResize() {
    return this.$$.ctx[7];
  }
  set autoResize(autoResize) {
    this.$$set({ autoResize });
    flush();
  }
  get integration() {
    return this.$$.ctx[8];
  }
  set integration(integration) {
    this.$$set({ integration });
    flush();
  }
  get width() {
    return this.$$.ctx[1];
  }
  set width(width) {
    this.$$set({ width });
    flush();
  }
  get height() {
    return this.$$.ctx[0];
  }
  set height(height) {
    this.$$set({ height });
    flush();
  }
}
customElements.define("experience-overview", create_custom_element(Overview, { "experience": {}, "colour": {}, "color": {}, "partner": {}, "autoResize": { "type": "Boolean", "attribute": "auto-resize" }, "integration": {}, "width": {}, "height": {} }, [], [], true));
function cubicInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 0.5 * Math.pow(2 * t - 2, 3) + 1;
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function blur(node, { delay = 0, duration = 400, easing = cubicInOut, amount = 5, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const f = style.filter === "none" ? "" : style.filter;
  const od = target_opacity * (1 - opacity);
  const [value, unit] = split_css_unit(amount);
  return {
    delay,
    duration,
    easing,
    css: (_t, u) => `opacity: ${target_opacity - od * u}; filter: ${f} blur(${u * value}${unit});`
  };
}
function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const od = target_opacity * (1 - opacity);
  const [xValue, xUnit] = split_css_unit(x);
  const [yValue, yUnit] = split_css_unit(y);
  return {
    delay,
    duration,
    easing,
    css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${(1 - t) * yValue}${yUnit});
			opacity: ${target_opacity - od * u}`
  };
}
function slide(node, { delay = 0, duration = 400, easing = cubicOut, axis = "y" } = {}) {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const primary_property = axis === "y" ? "height" : "width";
  const primary_property_value = parseFloat(style[primary_property]);
  const secondary_properties = axis === "y" ? ["top", "bottom"] : ["left", "right"];
  const capitalized_secondary_properties = secondary_properties.map(
    (e) => `${e[0].toUpperCase()}${e.slice(1)}`
  );
  const padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]);
  const padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]);
  const margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]);
  const margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]);
  const border_width_start_value = parseFloat(
    style[`border${capitalized_secondary_properties[0]}Width`]
  );
  const border_width_end_value = parseFloat(
    style[`border${capitalized_secondary_properties[1]}Width`]
  );
  return {
    delay,
    duration,
    easing,
    css: (t) => `overflow: hidden;opacity: ${Math.min(t * 20, 1) * opacity};${primary_property}: ${t * primary_property_value}px;padding-${secondary_properties[0]}: ${t * padding_start_value}px;padding-${secondary_properties[1]}: ${t * padding_end_value}px;margin-${secondary_properties[0]}: ${t * margin_start_value}px;margin-${secondary_properties[1]}: ${t * margin_end_value}px;border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;`
  };
}
function scale(node, { delay = 0, duration = 400, easing = cubicOut, start = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const sd = 1 - start;
  const od = target_opacity * (1 - opacity);
  return {
    delay,
    duration,
    easing,
    css: (_t, u) => `
			transform: ${transform} scale(${1 - sd * u});
			opacity: ${target_opacity - od * u}
		`
  };
}
function draw(node, { delay = 0, speed, duration, easing = cubicInOut } = {}) {
  let len = node.getTotalLength();
  const style = getComputedStyle(node);
  if (style.strokeLinecap !== "butt") {
    len += parseInt(style.strokeWidth);
  }
  if (duration === void 0) {
    if (speed === void 0) {
      duration = 800;
    } else {
      duration = len / speed;
    }
  } else if (typeof duration === "function") {
    duration = duration(len);
  }
  return {
    delay,
    duration,
    easing,
    css: (_, u) => `
			stroke-dasharray: ${len};
			stroke-dashoffset: ${u * len};
		`
  };
}
function crossfade({ fallback, ...defaults }) {
  const to_receive = /* @__PURE__ */ new Map();
  const to_send = /* @__PURE__ */ new Map();
  function crossfade2(from_node, node, params) {
    const {
      delay = 0,
      duration = (d2) => Math.sqrt(d2) * 30,
      easing = cubicOut
    } = assign(assign({}, defaults), params);
    const from = from_node.getBoundingClientRect();
    const to = node.getBoundingClientRect();
    const dx = from.left - to.left;
    const dy = from.top - to.top;
    const dw = from.width / to.width;
    const dh = from.height / to.height;
    const d = Math.sqrt(dx * dx + dy * dy);
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;
    const opacity = +style.opacity;
    return {
      delay,
      duration: is_function(duration) ? duration(d) : duration,
      easing,
      css: (t, u) => `
				opacity: ${t * opacity};
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${t + (1 - t) * dh});
			`
    };
  }
  function transition(items, counterparts, intro) {
    return (node, params) => {
      items.set(params.key, node);
      return () => {
        if (counterparts.has(params.key)) {
          const other_node = counterparts.get(params.key);
          counterparts.delete(params.key);
          return crossfade2(other_node, node, params);
        }
        items.delete(params.key);
        return fallback && fallback(node, params, intro);
      };
    };
  }
  return [transition(to_send, to_receive, false), transition(to_receive, to_send, true)];
}
const transitions = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  blur,
  crossfade,
  draw,
  fade,
  fly,
  scale,
  slide
}, Symbol.toStringTag, { value: "Module" }));
function add_css$1(target) {
  append_styles(target, "svelte-12llyur", "div.svelte-12llyur{z-index:-1;position:fixed;inset:0;background-color:black;opacity:0.32}");
}
function create_fragment$2(ctx) {
  let div;
  let div_intro;
  let div_outro;
  let current;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      attr(div, "role", "button");
      attr(div, "tabindex", "0");
      attr(div, "class", "svelte-12llyur");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            div,
            "click",
            /*click_handler*/
            ctx[3]
          ),
          listen(
            div,
            "keydown",
            /*keydown_handler*/
            ctx[4]
          )
        ];
        mounted = true;
      }
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
    },
    i(local) {
      if (current) return;
      if (local) {
        add_render_callback(() => {
          if (!current) return;
          if (div_outro) div_outro.end(1);
          div_intro = create_in_transition(div, fade, { duration: (
            /*enter*/
            ctx[0]
          ) });
          div_intro.start();
        });
      }
      current = true;
    },
    o(local) {
      if (div_intro) div_intro.invalidate();
      if (local) {
        div_outro = create_out_transition(div, fade, { duration: (
          /*leave*/
          ctx[1]
        ) });
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (detaching && div_outro) div_outro.end();
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { duration = null } = $$props;
  let { enter = duration || 150 } = $$props;
  let { leave = duration || 75 } = $$props;
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("duration" in $$props2) $$invalidate(2, duration = $$props2.duration);
    if ("enter" in $$props2) $$invalidate(0, enter = $$props2.enter);
    if ("leave" in $$props2) $$invalidate(1, leave = $$props2.leave);
  };
  return [enter, leave, duration, click_handler, keydown_handler];
}
class Scrim extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { duration: 2, enter: 0, leave: 1 }, add_css$1);
  }
  get duration() {
    return this.$$.ctx[2];
  }
  set duration(duration) {
    this.$$set({ duration });
    flush();
  }
  get enter() {
    return this.$$.ctx[0];
  }
  set enter(enter) {
    this.$$set({ enter });
    flush();
  }
  get leave() {
    return this.$$.ctx[1];
  }
  set leave(leave) {
    this.$$set({ leave });
    flush();
  }
}
create_custom_element(Scrim, { "duration": {}, "enter": {}, "leave": {} }, [], [], true);
function add_css(target) {
  append_styles(target, "svelte-1r0a6re", "button.svelte-1r0a6re{z-index:98999;background:transparent;border:0;padding:0}.click-to-book-with-beyonk.svelte-1r0a6re{font-size:16px;line-height:28px;font-weight:500;color:white;box-shadow:rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;padding:8px 16px 8px 16px;border-radius:4px;font-family:Cabin, sans-serif}.h-right.svelte-1r0a6re{position:fixed;right:20px}.h-left.svelte-1r0a6re{position:fixed;left:20px}.v-top.svelte-1r0a6re{position:fixed;top:20px}.v-bottom.svelte-1r0a6re{position:fixed;bottom:20px}.h-center.svelte-1r0a6re,.h-centre.svelte-1r0a6re{position:fixed;left:50%;transform:translateX(-50%)}.v-center.svelte-1r0a6re,.v-centre.svelte-1r0a6re{position:fixed;top:50%;transform:translateY(-50%)}aside.svelte-1r0a6re{z-index:99999;position:fixed;top:0;left:0;display:flex;align-items:center;width:100%;height:100%}dialog.svelte-1r0a6re{overflow:hidden;width:92%;height:92%;padding:0;border:none;border-radius:4px;background-color:white}");
}
function create_if_block(ctx) {
  let aside;
  let dialog;
  let switch_instance;
  let dialog_transition;
  let t;
  let scrim;
  let current;
  const switch_instance_spread_levels = [
    { autoResize: false },
    /*$$props*/
    ctx[9]
  ];
  var switch_value = (
    /*component*/
    ctx[5]
  );
  function switch_props(ctx2, dirty) {
    let switch_instance_props = {};
    if (dirty !== void 0 && dirty & /*$$props*/
    512) {
      switch_instance_props = get_spread_update(switch_instance_spread_levels, [switch_instance_spread_levels[0], get_spread_object(
        /*$$props*/
        ctx2[9]
      )]);
    } else {
      for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
        switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
      }
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
  }
  scrim = new Scrim({});
  scrim.$on(
    "click",
    /*close*/
    ctx[8]
  );
  return {
    c() {
      aside = element("aside");
      dialog = element("dialog");
      if (switch_instance) create_component(switch_instance.$$.fragment);
      t = space();
      create_component(scrim.$$.fragment);
      dialog.open = true;
      attr(dialog, "class", "svelte-1r0a6re");
      attr(aside, "class", "svelte-1r0a6re");
    },
    m(target, anchor) {
      insert(target, aside, anchor);
      append(aside, dialog);
      if (switch_instance) mount_component(switch_instance, dialog, null);
      append(aside, t);
      mount_component(scrim, aside, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (switch_value !== (switch_value = /*component*/
      ctx2[5])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, dialog, null);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        const switch_instance_changes = dirty & /*$$props*/
        512 ? get_spread_update(switch_instance_spread_levels, [
          switch_instance_spread_levels[0],
          get_spread_object(
            /*$$props*/
            ctx2[9]
          )
        ]) : {};
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      if (local) {
        add_render_callback(() => {
          if (!current) return;
          if (!dialog_transition) dialog_transition = create_bidirectional_transition(
            dialog,
            /*tn*/
            ctx[6],
            { y: 200, duration: 500 },
            true
          );
          dialog_transition.run(1);
        });
      }
      transition_in(scrim.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      if (local) {
        if (!dialog_transition) dialog_transition = create_bidirectional_transition(
          dialog,
          /*tn*/
          ctx[6],
          { y: 200, duration: 500 },
          false
        );
        dialog_transition.run(0);
      }
      transition_out(scrim.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(aside);
      }
      if (switch_instance) destroy_component(switch_instance);
      if (detaching && dialog_transition) dialog_transition.end();
      destroy_component(scrim);
    }
  };
}
function fallback_block(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<span>Book now</span>`;
      attr(div, "class", "click-to-book-with-beyonk svelte-1r0a6re");
      set_style(
        div,
        "background-color",
        /*color*/
        ctx[3] || /*colour*/
        ctx[2]
      );
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*color, colour*/
      12) {
        set_style(
          div,
          "background-color",
          /*color*/
          ctx2[3] || /*colour*/
          ctx2[2]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_fragment$1(ctx) {
  let t;
  let button;
  let button_class_value;
  let current;
  let mounted;
  let dispose;
  let if_block = (
    /*shown*/
    ctx[4] && create_if_block(ctx)
  );
  const default_slot_template = (
    /*#slots*/
    ctx[13].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[12],
    null
  );
  const default_slot_or_fallback = default_slot || fallback_block(ctx);
  return {
    c() {
      if (if_block) if_block.c();
      t = space();
      button = element("button");
      if (default_slot_or_fallback) default_slot_or_fallback.c();
      attr(button, "class", button_class_value = "h-" + /*horizontal*/
      (ctx[0] ?? "none") + " v-" + /*vertical*/
      (ctx[1] ?? "none") + " svelte-1r0a6re");
      button.disabled = /*shown*/
      ctx[4];
    },
    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, t, anchor);
      insert(target, button, anchor);
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(button, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            button,
            "click",
            /*open*/
            ctx[7]
          ),
          listen(
            button,
            "keydown",
            /*keydown_handler*/
            ctx[14]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*shown*/
        ctx2[4]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*shown*/
          16) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t.parentNode, t);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        4096)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[12],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[12]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[12],
              dirty,
              null
            ),
            null
          );
        }
      } else {
        if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*color, colour*/
        12)) {
          default_slot_or_fallback.p(ctx2, !current ? -1 : dirty);
        }
      }
      if (!current || dirty & /*horizontal, vertical*/
      3 && button_class_value !== (button_class_value = "h-" + /*horizontal*/
      (ctx2[0] ?? "none") + " v-" + /*vertical*/
      (ctx2[1] ?? "none") + " svelte-1r0a6re")) {
        attr(button, "class", button_class_value);
      }
      if (!current || dirty & /*shown*/
      16) {
        button.disabled = /*shown*/
        ctx2[4];
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      transition_in(default_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(default_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
        detach(button);
      }
      if (if_block) if_block.d(detaching);
      if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { horizontal } = $$props;
  let { vertical } = $$props;
  let { transition = "scale" } = $$props;
  let { experience } = $$props;
  let { colour = "#32B0A2" } = $$props;
  let { color } = $$props;
  const component = experience ? Overview : Portal;
  const tn = transitions[transition] || scale;
  let shown = false;
  function open() {
    $$invalidate(4, shown = true);
  }
  function close() {
    $$invalidate(4, shown = false);
  }
  const keydown_handler = (e) => e.key === "Enter" && open();
  $$self.$$set = ($$new_props) => {
    $$invalidate(9, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("horizontal" in $$new_props) $$invalidate(0, horizontal = $$new_props.horizontal);
    if ("vertical" in $$new_props) $$invalidate(1, vertical = $$new_props.vertical);
    if ("transition" in $$new_props) $$invalidate(10, transition = $$new_props.transition);
    if ("experience" in $$new_props) $$invalidate(11, experience = $$new_props.experience);
    if ("colour" in $$new_props) $$invalidate(2, colour = $$new_props.colour);
    if ("color" in $$new_props) $$invalidate(3, color = $$new_props.color);
    if ("$$scope" in $$new_props) $$invalidate(12, $$scope = $$new_props.$$scope);
  };
  $$props = exclude_internal_props($$props);
  return [
    horizontal,
    vertical,
    colour,
    color,
    shown,
    component,
    tn,
    open,
    close,
    $$props,
    transition,
    experience,
    $$scope,
    slots,
    keydown_handler
  ];
}
class PortalButton extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$1,
      create_fragment$1,
      safe_not_equal,
      {
        horizontal: 0,
        vertical: 1,
        transition: 10,
        experience: 11,
        colour: 2,
        color: 3
      },
      add_css
    );
  }
  get horizontal() {
    return this.$$.ctx[0];
  }
  set horizontal(horizontal) {
    this.$$set({ horizontal });
    flush();
  }
  get vertical() {
    return this.$$.ctx[1];
  }
  set vertical(vertical) {
    this.$$set({ vertical });
    flush();
  }
  get transition() {
    return this.$$.ctx[10];
  }
  set transition(transition) {
    this.$$set({ transition });
    flush();
  }
  get experience() {
    return this.$$.ctx[11];
  }
  set experience(experience) {
    this.$$set({ experience });
    flush();
  }
  get colour() {
    return this.$$.ctx[2];
  }
  set colour(colour) {
    this.$$set({ colour });
    flush();
  }
  get color() {
    return this.$$.ctx[3];
  }
  set color(color) {
    this.$$set({ color });
    flush();
  }
}
customElements.define("portal-button", create_custom_element(PortalButton, { "horizontal": {}, "vertical": {}, "transition": {}, "experience": {}, "colour": {}, "color": {} }, ["default"], [], true));
function create_fragment(ctx) {
  let iframe_1;
  let iframe_1_src_value;
  return {
    c() {
      iframe_1 = element("iframe");
      attr(iframe_1, "frameborder", "0");
      attr(iframe_1, "allow", "payment *");
      if (!src_url_equal(iframe_1.src, iframe_1_src_value = /*src*/
      ctx[3])) attr(iframe_1, "src", iframe_1_src_value);
      attr(
        iframe_1,
        "width",
        /*width*/
        ctx[1]
      );
      attr(
        iframe_1,
        "height",
        /*height*/
        ctx[0]
      );
      attr(iframe_1, "title", "Beyonk Shop");
    },
    m(target, anchor) {
      insert(target, iframe_1, anchor);
      ctx[10](iframe_1);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*width*/
      2) {
        attr(
          iframe_1,
          "width",
          /*width*/
          ctx2[1]
        );
      }
      if (dirty & /*height*/
      1) {
        attr(
          iframe_1,
          "height",
          /*height*/
          ctx2[0]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(iframe_1);
      }
      ctx[10](null);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { organisation } = $$props;
  let { colour = "#32b0a2" } = $$props;
  let { color } = $$props;
  let { autoResize = true } = $$props;
  let { tab = "experiences" } = $$props;
  let { integration = "byk-light" } = $$props;
  let { width = "100%" } = $$props;
  let { height = "100%" } = $$props;
  let iframe;
  const reo2 = new RemoteEventObserver(window);
  reo2.listen(EventNames.ScrollIntoView, () => scrollIntoView(iframe));
  if (autoResize) {
    reo2.listen(EventNames.ResizePortal, (dimensions) => {
      $$invalidate(0, height = dimensions.height);
    });
  }
  function buildIntegrationUrl() {
    const url = new URL(`/${organisation}/${tab}`, URLs.shop);
    url.searchParams.set("theme", (color || colour).slice(1));
    url.searchParams.set("integration", integration);
    const utmParams = getUTMParams(window.location.href);
    for (const [name, value] of utmParams.entries()) {
      url.searchParams.set(name, value);
    }
    return url.toString();
  }
  const src = buildIntegrationUrl();
  function iframe_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      iframe = $$value;
      $$invalidate(2, iframe);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("organisation" in $$props2) $$invalidate(4, organisation = $$props2.organisation);
    if ("colour" in $$props2) $$invalidate(5, colour = $$props2.colour);
    if ("color" in $$props2) $$invalidate(6, color = $$props2.color);
    if ("autoResize" in $$props2) $$invalidate(7, autoResize = $$props2.autoResize);
    if ("tab" in $$props2) $$invalidate(8, tab = $$props2.tab);
    if ("integration" in $$props2) $$invalidate(9, integration = $$props2.integration);
    if ("width" in $$props2) $$invalidate(1, width = $$props2.width);
    if ("height" in $$props2) $$invalidate(0, height = $$props2.height);
  };
  return [
    height,
    width,
    iframe,
    src,
    organisation,
    colour,
    color,
    autoResize,
    tab,
    integration,
    iframe_1_binding
  ];
}
class Shop extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      organisation: 4,
      colour: 5,
      color: 6,
      autoResize: 7,
      tab: 8,
      integration: 9,
      width: 1,
      height: 0
    });
  }
  get organisation() {
    return this.$$.ctx[4];
  }
  set organisation(organisation) {
    this.$$set({ organisation });
    flush();
  }
  get colour() {
    return this.$$.ctx[5];
  }
  set colour(colour) {
    this.$$set({ colour });
    flush();
  }
  get color() {
    return this.$$.ctx[6];
  }
  set color(color) {
    this.$$set({ color });
    flush();
  }
  get autoResize() {
    return this.$$.ctx[7];
  }
  set autoResize(autoResize) {
    this.$$set({ autoResize });
    flush();
  }
  get tab() {
    return this.$$.ctx[8];
  }
  set tab(tab) {
    this.$$set({ tab });
    flush();
  }
  get integration() {
    return this.$$.ctx[9];
  }
  set integration(integration) {
    this.$$set({ integration });
    flush();
  }
  get width() {
    return this.$$.ctx[1];
  }
  set width(width) {
    this.$$set({ width });
    flush();
  }
  get height() {
    return this.$$.ctx[0];
  }
  set height(height) {
    this.$$set({ height });
    flush();
  }
}
customElements.define("beyonk-shop", create_custom_element(Shop, { "organisation": {}, "colour": {}, "color": {}, "autoResize": { "type": "Boolean", "attribute": "auto-resize" }, "tab": {}, "integration": {}, "width": {}, "height": {} }, [], [], true));
let isDebuggingEnabled = false;
try {
  isDebuggingEnabled = !!localStorage.getItem("_byk_analytics_debug");
} catch (e) {
  isDebuggingEnabled = false;
}
function debug(...args) {
  if (isDebuggingEnabled) {
    console.debug(...args);
  }
}
const MetaEvents = /* @__PURE__ */ new Map();
const remapItemList$1 = (d) => {
  const content_ids = [];
  const contents = [];
  for (const item of d.items) {
    const { item_id, ...rest } = item;
    content_ids.push(item_id);
    contents.push({
      id: item_id,
      ...rest
    });
  }
  return {
    content_ids,
    contents,
    currency: d.currency,
    value: d.value
  };
};
MetaEvents.set("add_payment_info", {
  name: "AddPaymentInfo",
  remap: remapItemList$1
});
MetaEvents.set("begin_checkout", {
  name: "InitiateCheckout",
  remap: remapItemList$1
});
MetaEvents.set("select_item", {
  name: "Schedule",
  remap: (d) => {
    var _a, _b;
    return {
      occurrence: (_b = (_a = d.items) == null ? void 0 : _a[0]) == null ? void 0 : _b.item_id
    };
  }
});
MetaEvents.set("purchase", {
  name: "Purchase",
  remap: remapItemList$1
});
function trigger$2({ type, data }) {
  if (typeof window.fbq !== "function") {
    debug("No Meta pixel detected, ignoring tracking event");
    return;
  }
  if (!MetaEvents.has(type)) {
    return;
  }
  const { name, remap } = MetaEvents.get(type);
  window.fbq("track", name, remap(data));
}
const meta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  trigger: trigger$2
}, Symbol.toStringTag, { value: "Module" }));
function track() {
  window.dataLayer.push(arguments);
}
function trigger$1({ type, data }) {
  if (!Array.isArray(window.dataLayer)) {
    debug("No Google Analytics dataLayer detected, ignoring tracking event");
    return;
  }
  track("event", type, data);
}
const google = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  trigger: trigger$1
}, Symbol.toStringTag, { value: "Module" }));
const TikTokEvents = /* @__PURE__ */ new Map();
const remapItemList = (d) => {
  const content_ids = [];
  const contents = [];
  for (const item of d.items) {
    const { item_id, ...rest } = item;
    content_ids.push(item_id);
    contents.push({
      id: item_id,
      ...rest
    });
  }
  return {
    content_ids,
    contents,
    content_type: "product_group",
    currency: d.currency,
    value: d.value
  };
};
TikTokEvents.set("add_payment_info", {
  name: "AddPaymentInfo",
  remap: remapItemList
});
TikTokEvents.set("add_to_cart", {
  name: "AddToCart",
  remap: remapItemList
});
TikTokEvents.set("begin_checkout", {
  name: "InitiateCheckout",
  remap: remapItemList
});
TikTokEvents.set("select_item", {
  name: "CustomizeProduct",
  remap: (d) => {
    var _a, _b;
    return {
      occurrence: (_b = (_a = d.items) == null ? void 0 : _a[0]) == null ? void 0 : _b.item_id
    };
  }
});
TikTokEvents.set("purchase", {
  name: "CompletePayment",
  remap: remapItemList
});
function trigger({ type, data }) {
  const tracker = window[window.TiktokAnalyticsObject];
  if (typeof tracker.track !== "function") {
    debug(`No TikTok pixel detected when looking for one named "${window.TiktokAnalyticsObject}", ignoring tracking event`);
    return;
  }
  if (!TikTokEvents.has(type)) {
    return;
  }
  const { name, remap } = TikTokEvents.get(type);
  tracker.track(name, remap(data));
}
const tiktok = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  trigger
}, Symbol.toStringTag, { value: "Module" }));
class Mapping {
  constructor() {
    this.mappers = {
      meta,
      google,
      tiktok
    };
  }
  trigger({ type, data }) {
    for (const m of Object.values(this.mappers)) {
      m.trigger({ type, data });
    }
  }
}
function redirectParent({ url }) {
  window.location.href = url;
}
function registerCart({ cartId }) {
  sessionStorage == null ? void 0 : sessionStorage.setItem("cart", cartId);
}
const bookingFormElement = "byk-booking-form";
const giftVoucherFlement = "byk-gift-voucher-form";
const portalElement = "byk-portal";
const reo = new RemoteEventObserver(window);
const mapping = new Mapping();
reo.listen(EventNames.RedirectParent, redirectParent);
reo.listen(EventNames.RegisterCart, registerCart);
reo.listen(EventNames.Analytics, mapping.trigger.bind(mapping));
export {
  BookingForm,
  CartButton,
  GiftVoucherForm,
  Overview,
  Portal,
  PortalButton,
  Shop,
  bookingFormElement,
  giftVoucherFlement,
  portalElement
};
