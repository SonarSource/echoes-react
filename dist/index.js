/**
 * Echoes React
 * Version: 0.0.0
 * Generated: 2023-12-08
 * Copyright (C) 2023-2023 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

import "./style.css";
import { jsxs as ee, jsx as F } from "@emotion/react/jsx-runtime";
import T from "@emotion/styled";
import * as oe from "react";
import I, { useCallback as N, createContext as j, useMemo as O, createElement as v, useContext as te, forwardRef as S, Children as P, isValidElement as L, cloneElement as H, Fragment as xe, useEffect as E, useLayoutEffect as Ce, useRef as R, useState as w, useReducer as Re } from "react";
import { flushSync as Se } from "react-dom";
function Fo(e) {
  const { a: o, b: t, c: n } = e;
  return /* @__PURE__ */ ee(Ie, { children: [
    "test: ",
    t ? o : n
  ] });
}
const Ie = T.div`
  padding: 20px;
  background-color: var(--color-accent-bg);
  font: var(--typography-h1-bold);
`;
function x() {
  return x = Object.assign ? Object.assign.bind() : function(e) {
    for (var o = 1; o < arguments.length; o++) {
      var t = arguments[o];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
  }, x.apply(this, arguments);
}
function A(e, o, { checkForDefaultPrevented: t = !0 } = {}) {
  return function(r) {
    if (e == null || e(r), t === !1 || !r.defaultPrevented)
      return o == null ? void 0 : o(r);
  };
}
function Ae(e, o) {
  typeof e == "function" ? e(o) : e != null && (e.current = o);
}
function ne(...e) {
  return (o) => e.forEach(
    (t) => Ae(t, o)
  );
}
function k(...e) {
  return N(ne(...e), e);
}
function B(e, o = []) {
  let t = [];
  function n(c, s) {
    const d = /* @__PURE__ */ j(s), i = t.length;
    t = [
      ...t,
      s
    ];
    function a(f) {
      const { scope: b, children: l, ...u } = f, p = (b == null ? void 0 : b[e][i]) || d, g = O(
        () => u,
        Object.values(u)
      );
      return /* @__PURE__ */ v(p.Provider, {
        value: g
      }, l);
    }
    function $(f, b) {
      const l = (b == null ? void 0 : b[e][i]) || d, u = te(l);
      if (u)
        return u;
      if (s !== void 0)
        return s;
      throw new Error(`\`${f}\` must be used within \`${c}\``);
    }
    return a.displayName = c + "Provider", [
      a,
      $
    ];
  }
  const r = () => {
    const c = t.map((s) => /* @__PURE__ */ j(s));
    return function(d) {
      const i = (d == null ? void 0 : d[e]) || c;
      return O(
        () => ({
          [`__scope${e}`]: {
            ...d,
            [e]: i
          }
        }),
        [
          d,
          i
        ]
      );
    };
  };
  return r.scopeName = e, [
    n,
    _e(r, ...o)
  ];
}
function _e(...e) {
  const o = e[0];
  if (e.length === 1)
    return o;
  const t = () => {
    const n = e.map(
      (r) => ({
        useScope: r(),
        scopeName: r.scopeName
      })
    );
    return function(c) {
      const s = n.reduce((d, { useScope: i, scopeName: a }) => {
        const f = i(c)[`__scope${a}`];
        return {
          ...d,
          ...f
        };
      }, {});
      return O(
        () => ({
          [`__scope${o.scopeName}`]: s
        }),
        [
          s
        ]
      );
    };
  };
  return t.scopeName = o.scopeName, t;
}
const U = /* @__PURE__ */ S((e, o) => {
  const { children: t, ...n } = e, r = P.toArray(t), c = r.find(ye);
  if (c) {
    const s = c.props.children, d = r.map((i) => i === c ? P.count(s) > 1 ? P.only(null) : /* @__PURE__ */ L(s) ? s.props.children : null : i);
    return /* @__PURE__ */ v(W, x({}, n, {
      ref: o
    }), /* @__PURE__ */ L(s) ? /* @__PURE__ */ H(s, void 0, d) : null);
  }
  return /* @__PURE__ */ v(W, x({}, n, {
    ref: o
  }), t);
});
U.displayName = "Slot";
const W = /* @__PURE__ */ S((e, o) => {
  const { children: t, ...n } = e;
  return /* @__PURE__ */ L(t) ? /* @__PURE__ */ H(t, {
    ...Ne(n, t.props),
    ref: o ? ne(o, t.ref) : t.ref
  }) : P.count(t) > 1 ? P.only(null) : null;
});
W.displayName = "SlotClone";
const Ee = ({ children: e }) => /* @__PURE__ */ v(xe, null, e);
function ye(e) {
  return /* @__PURE__ */ L(e) && e.type === Ee;
}
function Ne(e, o) {
  const t = {
    ...o
  };
  for (const n in o) {
    const r = e[n], c = o[n];
    /^on[A-Z]/.test(n) ? r && c ? t[n] = (...d) => {
      c(...d), r(...d);
    } : r && (t[n] = r) : n === "style" ? t[n] = {
      ...r,
      ...c
    } : n === "className" && (t[n] = [
      r,
      c
    ].filter(Boolean).join(" "));
  }
  return {
    ...e,
    ...t
  };
}
const Pe = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul"
], M = Pe.reduce((e, o) => {
  const t = /* @__PURE__ */ S((n, r) => {
    const { asChild: c, ...s } = n, d = c ? U : o;
    return E(() => {
      window[Symbol.for("radix-ui")] = !0;
    }, []), /* @__PURE__ */ v(d, x({}, s, {
      ref: r
    }));
  });
  return t.displayName = `Primitive.${o}`, {
    ...e,
    [o]: t
  };
}, {});
function we(e) {
  const o = e + "CollectionProvider", [t, n] = B(o), [r, c] = t(o, {
    collectionRef: {
      current: null
    },
    itemMap: /* @__PURE__ */ new Map()
  }), s = (l) => {
    const { scope: u, children: p } = l, g = I.useRef(null), m = I.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ I.createElement(r, {
      scope: u,
      itemMap: m,
      collectionRef: g
    }, p);
  }, d = e + "CollectionSlot", i = /* @__PURE__ */ I.forwardRef((l, u) => {
    const { scope: p, children: g } = l, m = c(d, p), h = k(u, m.collectionRef);
    return /* @__PURE__ */ I.createElement(U, {
      ref: h
    }, g);
  }), a = e + "CollectionItemSlot", $ = "data-radix-collection-item", f = /* @__PURE__ */ I.forwardRef((l, u) => {
    const { scope: p, children: g, ...m } = l, h = I.useRef(null), D = k(u, h), _ = c(a, p);
    return I.useEffect(() => (_.itemMap.set(h, {
      ref: h,
      ...m
    }), () => void _.itemMap.delete(h))), /* @__PURE__ */ I.createElement(U, {
      [$]: "",
      ref: D
    }, g);
  });
  function b(l) {
    const u = c(e + "CollectionConsumer", l);
    return I.useCallback(() => {
      const g = u.collectionRef.current;
      if (!g)
        return [];
      const m = Array.from(g.querySelectorAll(`[${$}]`));
      return Array.from(u.itemMap.values()).sort(
        (_, V) => m.indexOf(_.ref.current) - m.indexOf(V.ref.current)
      );
    }, [
      u.collectionRef,
      u.itemMap
    ]);
  }
  return [
    {
      Provider: s,
      Slot: i,
      ItemSlot: f
    },
    b,
    n
  ];
}
const z = globalThis != null && globalThis.document ? Ce : () => {
}, ke = oe["useId".toString()] || (() => {
});
let Te = 0;
function Fe(e) {
  const [o, t] = oe.useState(ke());
  return z(() => {
    e || t(
      (n) => n ?? String(Te++)
    );
  }, [
    e
  ]), e || (o ? `radix-${o}` : "");
}
function X(e) {
  const o = R(e);
  return E(() => {
    o.current = e;
  }), O(
    () => (...t) => {
      var n;
      return (n = o.current) === null || n === void 0 ? void 0 : n.call(o, ...t);
    },
    []
  );
}
function re({ prop: e, defaultProp: o, onChange: t = () => {
} }) {
  const [n, r] = Oe({
    defaultProp: o,
    onChange: t
  }), c = e !== void 0, s = c ? e : n, d = X(t), i = N((a) => {
    if (c) {
      const f = typeof a == "function" ? a(e) : a;
      f !== e && d(f);
    } else
      r(a);
  }, [
    c,
    e,
    r,
    d
  ]);
  return [
    s,
    i
  ];
}
function Oe({ defaultProp: e, onChange: o }) {
  const t = w(e), [n] = t, r = R(n), c = X(o);
  return E(() => {
    r.current !== n && (c(n), r.current = n);
  }, [
    n,
    r,
    c
  ]), t;
}
const Me = /* @__PURE__ */ j(void 0);
function ce(e) {
  const o = te(Me);
  return e || o || "ltr";
}
const q = "rovingFocusGroup.onEntryFocus", De = {
  bubbles: !1,
  cancelable: !0
}, Z = "RovingFocusGroup", [Y, se, Ge] = we(Z), [Le, ae] = B(Z, [
  Ge
]), [Ue, ze] = Le(Z), Be = /* @__PURE__ */ S((e, o) => /* @__PURE__ */ v(Y.Provider, {
  scope: e.__scopeRovingFocusGroup
}, /* @__PURE__ */ v(Y.Slot, {
  scope: e.__scopeRovingFocusGroup
}, /* @__PURE__ */ v(Ve, x({}, e, {
  ref: o
}))))), Ve = /* @__PURE__ */ S((e, o) => {
  const { __scopeRovingFocusGroup: t, orientation: n, loop: r = !1, dir: c, currentTabStopId: s, defaultCurrentTabStopId: d, onCurrentTabStopIdChange: i, onEntryFocus: a, ...$ } = e, f = R(null), b = k(o, f), l = ce(c), [u = null, p] = re({
    prop: s,
    defaultProp: d,
    onChange: i
  }), [g, m] = w(!1), h = X(a), D = se(t), _ = R(!1), [V, J] = w(0);
  return E(() => {
    const C = f.current;
    if (C)
      return C.addEventListener(q, h), () => C.removeEventListener(q, h);
  }, [
    h
  ]), /* @__PURE__ */ v(Ue, {
    scope: t,
    orientation: n,
    dir: l,
    loop: r,
    currentTabStopId: u,
    onItemFocus: N(
      (C) => p(C),
      [
        p
      ]
    ),
    onItemShiftTab: N(
      () => m(!0),
      []
    ),
    onFocusableItemAdd: N(
      () => J(
        (C) => C + 1
      ),
      []
    ),
    onFocusableItemRemove: N(
      () => J(
        (C) => C - 1
      ),
      []
    )
  }, /* @__PURE__ */ v(M.div, x({
    tabIndex: g || V === 0 ? -1 : 0,
    "data-orientation": n
  }, $, {
    ref: b,
    style: {
      outline: "none",
      ...e.style
    },
    onMouseDown: A(e.onMouseDown, () => {
      _.current = !0;
    }),
    onFocus: A(e.onFocus, (C) => {
      const ve = !_.current;
      if (C.target === C.currentTarget && ve && !g) {
        const Q = new CustomEvent(q, De);
        if (C.currentTarget.dispatchEvent(Q), !Q.defaultPrevented) {
          const K = D().filter(
            (y) => y.focusable
          ), me = K.find(
            (y) => y.active
          ), he = K.find(
            (y) => y.id === u
          ), ge = [
            me,
            he,
            ...K
          ].filter(Boolean).map(
            (y) => y.ref.current
          );
          ie(ge);
        }
      }
      _.current = !1;
    }),
    onBlur: A(
      e.onBlur,
      () => m(!1)
    )
  })));
}), Ke = "RovingFocusGroupItem", qe = /* @__PURE__ */ S((e, o) => {
  const { __scopeRovingFocusGroup: t, focusable: n = !0, active: r = !1, tabStopId: c, ...s } = e, d = Fe(), i = c || d, a = ze(Ke, t), $ = a.currentTabStopId === i, f = se(t), { onFocusableItemAdd: b, onFocusableItemRemove: l } = a;
  return E(() => {
    if (n)
      return b(), () => l();
  }, [
    n,
    b,
    l
  ]), /* @__PURE__ */ v(Y.ItemSlot, {
    scope: t,
    id: i,
    focusable: n,
    active: r
  }, /* @__PURE__ */ v(M.span, x({
    tabIndex: $ ? 0 : -1,
    "data-orientation": a.orientation
  }, s, {
    ref: o,
    onMouseDown: A(e.onMouseDown, (u) => {
      n ? a.onItemFocus(i) : u.preventDefault();
    }),
    onFocus: A(
      e.onFocus,
      () => a.onItemFocus(i)
    ),
    onKeyDown: A(e.onKeyDown, (u) => {
      if (u.key === "Tab" && u.shiftKey) {
        a.onItemShiftTab();
        return;
      }
      if (u.target !== u.currentTarget)
        return;
      const p = Ye(u, a.orientation, a.dir);
      if (p !== void 0) {
        u.preventDefault();
        let m = f().filter(
          (h) => h.focusable
        ).map(
          (h) => h.ref.current
        );
        if (p === "last")
          m.reverse();
        else if (p === "prev" || p === "next") {
          p === "prev" && m.reverse();
          const h = m.indexOf(u.currentTarget);
          m = a.loop ? He(m, h + 1) : m.slice(h + 1);
        }
        setTimeout(
          () => ie(m)
        );
      }
    })
  })));
}), je = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function We(e, o) {
  return o !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Ye(e, o, t) {
  const n = We(e.key, t);
  if (!(o === "vertical" && [
    "ArrowLeft",
    "ArrowRight"
  ].includes(n)) && !(o === "horizontal" && [
    "ArrowUp",
    "ArrowDown"
  ].includes(n)))
    return je[n];
}
function ie(e) {
  const o = document.activeElement;
  for (const t of e)
    if (t === o || (t.focus(), document.activeElement !== o))
      return;
}
function He(e, o) {
  return e.map(
    (t, n) => e[(o + n) % e.length]
  );
}
const Xe = Be, Ze = qe;
function Je(e) {
  const [o, t] = w(void 0);
  return z(() => {
    if (e) {
      t({
        width: e.offsetWidth,
        height: e.offsetHeight
      });
      const n = new ResizeObserver((r) => {
        if (!Array.isArray(r) || !r.length)
          return;
        const c = r[0];
        let s, d;
        if ("borderBoxSize" in c) {
          const i = c.borderBoxSize, a = Array.isArray(i) ? i[0] : i;
          s = a.inlineSize, d = a.blockSize;
        } else
          s = e.offsetWidth, d = e.offsetHeight;
        t({
          width: s,
          height: d
        });
      });
      return n.observe(e, {
        box: "border-box"
      }), () => n.unobserve(e);
    } else
      t(void 0);
  }, [
    e
  ]), o;
}
function Qe(e) {
  const o = R({
    value: e,
    previous: e
  });
  return O(() => (o.current.value !== e && (o.current.previous = o.current.value, o.current.value = e), o.current.previous), [
    e
  ]);
}
function eo(e, o) {
  return Re((t, n) => {
    const r = o[t][n];
    return r ?? t;
  }, e);
}
const de = (e) => {
  const { present: o, children: t } = e, n = oo(o), r = typeof t == "function" ? t({
    present: n.isPresent
  }) : P.only(t), c = k(n.ref, r.ref);
  return typeof t == "function" || n.isPresent ? /* @__PURE__ */ H(r, {
    ref: c
  }) : null;
};
de.displayName = "Presence";
function oo(e) {
  const [o, t] = w(), n = R({}), r = R(e), c = R("none"), s = e ? "mounted" : "unmounted", [d, i] = eo(s, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return E(() => {
    const a = G(n.current);
    c.current = d === "mounted" ? a : "none";
  }, [
    d
  ]), z(() => {
    const a = n.current, $ = r.current;
    if ($ !== e) {
      const b = c.current, l = G(a);
      e ? i("MOUNT") : l === "none" || (a == null ? void 0 : a.display) === "none" ? i("UNMOUNT") : i($ && b !== l ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [
    e,
    i
  ]), z(() => {
    if (o) {
      const a = (f) => {
        const l = G(n.current).includes(f.animationName);
        f.target === o && l && Se(
          () => i("ANIMATION_END")
        );
      }, $ = (f) => {
        f.target === o && (c.current = G(n.current));
      };
      return o.addEventListener("animationstart", $), o.addEventListener("animationcancel", a), o.addEventListener("animationend", a), () => {
        o.removeEventListener("animationstart", $), o.removeEventListener("animationcancel", a), o.removeEventListener("animationend", a);
      };
    } else
      i("ANIMATION_END");
  }, [
    o,
    i
  ]), {
    isPresent: [
      "mounted",
      "unmountSuspended"
    ].includes(d),
    ref: N((a) => {
      a && (n.current = getComputedStyle(a)), t(a);
    }, [])
  };
}
function G(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
const ue = "Radio", [to, le] = B(ue), [no, ro] = to(ue), co = /* @__PURE__ */ S((e, o) => {
  const { __scopeRadio: t, name: n, checked: r = !1, required: c, disabled: s, value: d = "on", onCheck: i, ...a } = e, [$, f] = w(null), b = k(
    o,
    (p) => f(p)
  ), l = R(!1), u = $ ? !!$.closest("form") : !0;
  return /* @__PURE__ */ v(no, {
    scope: t,
    checked: r,
    disabled: s
  }, /* @__PURE__ */ v(M.button, x({
    type: "button",
    role: "radio",
    "aria-checked": r,
    "data-state": fe(r),
    "data-disabled": s ? "" : void 0,
    disabled: s,
    value: d
  }, a, {
    ref: b,
    onClick: A(e.onClick, (p) => {
      r || i == null || i(), u && (l.current = p.isPropagationStopped(), l.current || p.stopPropagation());
    })
  })), u && /* @__PURE__ */ v(io, {
    control: $,
    bubbles: !l.current,
    name: n,
    value: d,
    checked: r,
    required: c,
    disabled: s,
    style: {
      transform: "translateX(-100%)"
    }
  }));
}), so = "RadioIndicator", ao = /* @__PURE__ */ S((e, o) => {
  const { __scopeRadio: t, forceMount: n, ...r } = e, c = ro(so, t);
  return /* @__PURE__ */ v(de, {
    present: n || c.checked
  }, /* @__PURE__ */ v(M.span, x({
    "data-state": fe(c.checked),
    "data-disabled": c.disabled ? "" : void 0
  }, r, {
    ref: o
  })));
}), io = (e) => {
  const { control: o, checked: t, bubbles: n = !0, ...r } = e, c = R(null), s = Qe(t), d = Je(o);
  return E(() => {
    const i = c.current, a = window.HTMLInputElement.prototype, f = Object.getOwnPropertyDescriptor(a, "checked").set;
    if (s !== t && f) {
      const b = new Event("click", {
        bubbles: n
      });
      f.call(i, t), i.dispatchEvent(b);
    }
  }, [
    s,
    t,
    n
  ]), /* @__PURE__ */ v("input", x({
    type: "radio",
    "aria-hidden": !0,
    defaultChecked: t
  }, r, {
    tabIndex: -1,
    ref: c,
    style: {
      ...e.style,
      ...d,
      position: "absolute",
      pointerEvents: "none",
      opacity: 0,
      margin: 0
    }
  }));
};
function fe(e) {
  return e ? "checked" : "unchecked";
}
const uo = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight"
], be = "RadioGroup", [lo, Oo] = B(be, [
  ae,
  le
]), pe = ae(), $e = le(), [fo, bo] = lo(be), po = /* @__PURE__ */ S((e, o) => {
  const { __scopeRadioGroup: t, name: n, defaultValue: r, value: c, required: s = !1, disabled: d = !1, orientation: i, dir: a, loop: $ = !0, onValueChange: f, ...b } = e, l = pe(t), u = ce(a), [p, g] = re({
    prop: c,
    defaultProp: r,
    onChange: f
  });
  return /* @__PURE__ */ v(fo, {
    scope: t,
    name: n,
    required: s,
    disabled: d,
    value: p,
    onValueChange: g
  }, /* @__PURE__ */ v(Xe, x({
    asChild: !0
  }, l, {
    orientation: i,
    dir: u,
    loop: $
  }), /* @__PURE__ */ v(M.div, x({
    role: "radiogroup",
    "aria-required": s,
    "aria-orientation": i,
    "data-disabled": d ? "" : void 0,
    dir: u
  }, b, {
    ref: o
  }))));
}), $o = "RadioGroupItem", vo = /* @__PURE__ */ S((e, o) => {
  const { __scopeRadioGroup: t, disabled: n, ...r } = e, c = bo($o, t), s = c.disabled || n, d = pe(t), i = $e(t), a = R(null), $ = k(o, a), f = c.value === r.value, b = R(!1);
  return E(() => {
    const l = (p) => {
      uo.includes(p.key) && (b.current = !0);
    }, u = () => b.current = !1;
    return document.addEventListener("keydown", l), document.addEventListener("keyup", u), () => {
      document.removeEventListener("keydown", l), document.removeEventListener("keyup", u);
    };
  }, []), /* @__PURE__ */ v(Ze, x({
    asChild: !0
  }, d, {
    focusable: !s,
    active: f
  }), /* @__PURE__ */ v(co, x({
    disabled: s,
    required: c.required,
    checked: f
  }, i, r, {
    name: c.name,
    ref: $,
    onCheck: () => c.onValueChange(r.value),
    onKeyDown: A((l) => {
      l.key === "Enter" && l.preventDefault();
    }),
    onFocus: A(r.onFocus, () => {
      var l;
      b.current && ((l = a.current) === null || l === void 0 || l.click());
    })
  })));
}), mo = /* @__PURE__ */ S((e, o) => {
  const { __scopeRadioGroup: t, ...n } = e, r = $e(t);
  return /* @__PURE__ */ v(ao, x({}, r, n, {
    ref: o
  }));
}), ho = po, go = vo, xo = mo;
function Mo(e) {
  const { onChange: o, options: t, ...n } = e;
  return /* @__PURE__ */ F(Ro, { onValueChange: o, ...n, children: t.map((r) => /* @__PURE__ */ F(Co, { groupId: n.id, ...r }, r.value)) });
}
function Co(e) {
  const { ariaLabel: o, disabled: t, groupId: n, label: r, value: c } = e, s = `${n}-${c}`;
  return /* @__PURE__ */ ee(So, { children: [
    /* @__PURE__ */ F(Io, { "aria-label": o ?? (typeof r == "string" ? r : void 0), disabled: t, id: s, value: c, children: /* @__PURE__ */ F(Ao, {}) }),
    /* @__PURE__ */ F(_o, { htmlFor: s, ...t ? { "data-disabled": !0 } : {}, children: r })
  ] });
}
const Ro = T(ho)``, So = T.div`
  display: flex;
  align-items: center;
  margin: var(--echoes-dimension-space-100) 0;
`, Io = T(go)`
  appearance: none;
  cursor: pointer;
  background-color: transparent;

  box-sizing: border-box;
  padding: 0;
  border: 1px solid var(--echoes-color-background-accent-default);
  border-radius: 100%;

  height: var(--echoes-dimension-size-200);
  width: var(--echoes-dimension-size-200);
  min-width: var(--echoes-dimension-size-200);

  &:hover,
  &[data-state='checked'] {
    background-color: var(--echoes-color-background-accent-weak);
  }

  &:focus,
  &:focus-visible {
    background-color: var(--echoes-color-background-accent-weak);
    outline: var(--echoes-color-background-accent-weak) solid 4px;
  }

  &:disabled {
    cursor: default;
    background-color: var(--echoes-color-background-disabled);
    border-color: var(--echoes-color-border-disabled);
  }
`, Ao = T(xo)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;

  &::after {
    content: '';
    display: block;

    box-sizing: border-box;
    height: var(--echoes-dimension-size-75);
    width: var(--echoes-dimension-size-75);
    border-radius: 50%;

    background-color: var(--echoes-color-background-accent-default);
  }

  &[data-disabled]::after {
    background-color: var(--echoes-color-border-disabled);
  }
`, _o = T.label`
  display: block;
  width: 100%;
  cursor: pointer;
  margin-left: var(--echoes-dimension-space-100);

  [data-disabled] &, /* disabled group */
  &[data-disabled] /* disabled option */ {
    cursor: default;
  }
`;
function Do(e) {
  document.documentElement.setAttribute("data-echoes-theme", e);
}
var Eo = /* @__PURE__ */ ((e) => (e.light = "light", e.dark = "dark", e))(Eo || {});
export {
  Fo as ExampleComponent,
  Mo as RadioButtonGroup,
  Eo as Theme,
  Do as setTheme
};
