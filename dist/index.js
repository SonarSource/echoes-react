import "./style.css";
import { jsxs as ee, jsx as F } from "@emotion/react/jsx-runtime";
import k from "@emotion/styled";
import * as te from "react";
import I, { useCallback as N, createContext as j, useMemo as O, createElement as v, useContext as oe, forwardRef as S, Children as P, isValidElement as L, cloneElement as H, Fragment as xe, useEffect as E, useLayoutEffect as Ce, useRef as R, useState as w, useReducer as Re } from "react";
import { flushSync as Se } from "react-dom";
function kt(e) {
  const { a: t, b: o, c: n } = e;
  return /* @__PURE__ */ ee(Ie, { children: [
    "test: ",
    o ? t : n
  ] });
}
const Ie = k.div`
  padding: 20px;
  background-color: var(--color-accent-bg);
  font: var(--typography-h1-bold);
`;
function x() {
  return x = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];
      for (var n in o)
        Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
    }
    return e;
  }, x.apply(this, arguments);
}
function A(e, t, { checkForDefaultPrevented: o = !0 } = {}) {
  return function(r) {
    if (e == null || e(r), o === !1 || !r.defaultPrevented)
      return t == null ? void 0 : t(r);
  };
}
function Ae(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function ne(...e) {
  return (t) => e.forEach(
    (o) => Ae(o, t)
  );
}
function T(...e) {
  return N(ne(...e), e);
}
function B(e, t = []) {
  let o = [];
  function n(c, s) {
    const d = /* @__PURE__ */ j(s), i = o.length;
    o = [
      ...o,
      s
    ];
    function a(l) {
      const { scope: b, children: f, ...u } = l, p = (b == null ? void 0 : b[e][i]) || d, g = O(
        () => u,
        Object.values(u)
      );
      return /* @__PURE__ */ v(p.Provider, {
        value: g
      }, f);
    }
    function $(l, b) {
      const f = (b == null ? void 0 : b[e][i]) || d, u = oe(f);
      if (u)
        return u;
      if (s !== void 0)
        return s;
      throw new Error(`\`${l}\` must be used within \`${c}\``);
    }
    return a.displayName = c + "Provider", [
      a,
      $
    ];
  }
  const r = () => {
    const c = o.map((s) => /* @__PURE__ */ j(s));
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
    _e(r, ...t)
  ];
}
function _e(...e) {
  const t = e[0];
  if (e.length === 1)
    return t;
  const o = () => {
    const n = e.map(
      (r) => ({
        useScope: r(),
        scopeName: r.scopeName
      })
    );
    return function(c) {
      const s = n.reduce((d, { useScope: i, scopeName: a }) => {
        const l = i(c)[`__scope${a}`];
        return {
          ...d,
          ...l
        };
      }, {});
      return O(
        () => ({
          [`__scope${t.scopeName}`]: s
        }),
        [
          s
        ]
      );
    };
  };
  return o.scopeName = t.scopeName, o;
}
const U = /* @__PURE__ */ S((e, t) => {
  const { children: o, ...n } = e, r = P.toArray(o), c = r.find(ye);
  if (c) {
    const s = c.props.children, d = r.map((i) => i === c ? P.count(s) > 1 ? P.only(null) : /* @__PURE__ */ L(s) ? s.props.children : null : i);
    return /* @__PURE__ */ v(W, x({}, n, {
      ref: t
    }), /* @__PURE__ */ L(s) ? /* @__PURE__ */ H(s, void 0, d) : null);
  }
  return /* @__PURE__ */ v(W, x({}, n, {
    ref: t
  }), o);
});
U.displayName = "Slot";
const W = /* @__PURE__ */ S((e, t) => {
  const { children: o, ...n } = e;
  return /* @__PURE__ */ L(o) ? /* @__PURE__ */ H(o, {
    ...Ne(n, o.props),
    ref: t ? ne(t, o.ref) : o.ref
  }) : P.count(o) > 1 ? P.only(null) : null;
});
W.displayName = "SlotClone";
const Ee = ({ children: e }) => /* @__PURE__ */ v(xe, null, e);
function ye(e) {
  return /* @__PURE__ */ L(e) && e.type === Ee;
}
function Ne(e, t) {
  const o = {
    ...t
  };
  for (const n in t) {
    const r = e[n], c = t[n];
    /^on[A-Z]/.test(n) ? r && c ? o[n] = (...d) => {
      c(...d), r(...d);
    } : r && (o[n] = r) : n === "style" ? o[n] = {
      ...r,
      ...c
    } : n === "className" && (o[n] = [
      r,
      c
    ].filter(Boolean).join(" "));
  }
  return {
    ...e,
    ...o
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
], M = Pe.reduce((e, t) => {
  const o = /* @__PURE__ */ S((n, r) => {
    const { asChild: c, ...s } = n, d = c ? U : t;
    return E(() => {
      window[Symbol.for("radix-ui")] = !0;
    }, []), /* @__PURE__ */ v(d, x({}, s, {
      ref: r
    }));
  });
  return o.displayName = `Primitive.${t}`, {
    ...e,
    [t]: o
  };
}, {});
function we(e) {
  const t = e + "CollectionProvider", [o, n] = B(t), [r, c] = o(t, {
    collectionRef: {
      current: null
    },
    itemMap: /* @__PURE__ */ new Map()
  }), s = (f) => {
    const { scope: u, children: p } = f, g = I.useRef(null), m = I.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ I.createElement(r, {
      scope: u,
      itemMap: m,
      collectionRef: g
    }, p);
  }, d = e + "CollectionSlot", i = /* @__PURE__ */ I.forwardRef((f, u) => {
    const { scope: p, children: g } = f, m = c(d, p), h = T(u, m.collectionRef);
    return /* @__PURE__ */ I.createElement(U, {
      ref: h
    }, g);
  }), a = e + "CollectionItemSlot", $ = "data-radix-collection-item", l = /* @__PURE__ */ I.forwardRef((f, u) => {
    const { scope: p, children: g, ...m } = f, h = I.useRef(null), D = T(u, h), _ = c(a, p);
    return I.useEffect(() => (_.itemMap.set(h, {
      ref: h,
      ...m
    }), () => void _.itemMap.delete(h))), /* @__PURE__ */ I.createElement(U, {
      [$]: "",
      ref: D
    }, g);
  });
  function b(f) {
    const u = c(e + "CollectionConsumer", f);
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
      ItemSlot: l
    },
    b,
    n
  ];
}
const z = globalThis != null && globalThis.document ? Ce : () => {
}, Te = te["useId".toString()] || (() => {
});
let ke = 0;
function Fe(e) {
  const [t, o] = te.useState(Te());
  return z(() => {
    e || o(
      (n) => n ?? String(ke++)
    );
  }, [
    e
  ]), e || (t ? `radix-${t}` : "");
}
function X(e) {
  const t = R(e);
  return E(() => {
    t.current = e;
  }), O(
    () => (...o) => {
      var n;
      return (n = t.current) === null || n === void 0 ? void 0 : n.call(t, ...o);
    },
    []
  );
}
function re({ prop: e, defaultProp: t, onChange: o = () => {
} }) {
  const [n, r] = Oe({
    defaultProp: t,
    onChange: o
  }), c = e !== void 0, s = c ? e : n, d = X(o), i = N((a) => {
    if (c) {
      const l = typeof a == "function" ? a(e) : a;
      l !== e && d(l);
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
function Oe({ defaultProp: e, onChange: t }) {
  const o = w(e), [n] = o, r = R(n), c = X(t);
  return E(() => {
    r.current !== n && (c(n), r.current = n);
  }, [
    n,
    r,
    c
  ]), o;
}
const Me = /* @__PURE__ */ j(void 0);
function ce(e) {
  const t = oe(Me);
  return e || t || "ltr";
}
const q = "rovingFocusGroup.onEntryFocus", De = {
  bubbles: !1,
  cancelable: !0
}, Z = "RovingFocusGroup", [Y, se, Ge] = we(Z), [Le, ae] = B(Z, [
  Ge
]), [Ue, ze] = Le(Z), Be = /* @__PURE__ */ S((e, t) => /* @__PURE__ */ v(Y.Provider, {
  scope: e.__scopeRovingFocusGroup
}, /* @__PURE__ */ v(Y.Slot, {
  scope: e.__scopeRovingFocusGroup
}, /* @__PURE__ */ v(Ve, x({}, e, {
  ref: t
}))))), Ve = /* @__PURE__ */ S((e, t) => {
  const { __scopeRovingFocusGroup: o, orientation: n, loop: r = !1, dir: c, currentTabStopId: s, defaultCurrentTabStopId: d, onCurrentTabStopIdChange: i, onEntryFocus: a, ...$ } = e, l = R(null), b = T(t, l), f = ce(c), [u = null, p] = re({
    prop: s,
    defaultProp: d,
    onChange: i
  }), [g, m] = w(!1), h = X(a), D = se(o), _ = R(!1), [V, J] = w(0);
  return E(() => {
    const C = l.current;
    if (C)
      return C.addEventListener(q, h), () => C.removeEventListener(q, h);
  }, [
    h
  ]), /* @__PURE__ */ v(Ue, {
    scope: o,
    orientation: n,
    dir: f,
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
}), Ke = "RovingFocusGroupItem", qe = /* @__PURE__ */ S((e, t) => {
  const { __scopeRovingFocusGroup: o, focusable: n = !0, active: r = !1, tabStopId: c, ...s } = e, d = Fe(), i = c || d, a = ze(Ke, o), $ = a.currentTabStopId === i, l = se(o), { onFocusableItemAdd: b, onFocusableItemRemove: f } = a;
  return E(() => {
    if (n)
      return b(), () => f();
  }, [
    n,
    b,
    f
  ]), /* @__PURE__ */ v(Y.ItemSlot, {
    scope: o,
    id: i,
    focusable: n,
    active: r
  }, /* @__PURE__ */ v(M.span, x({
    tabIndex: $ ? 0 : -1,
    "data-orientation": a.orientation
  }, s, {
    ref: t,
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
        let m = l().filter(
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
function We(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Ye(e, t, o) {
  const n = We(e.key, o);
  if (!(t === "vertical" && [
    "ArrowLeft",
    "ArrowRight"
  ].includes(n)) && !(t === "horizontal" && [
    "ArrowUp",
    "ArrowDown"
  ].includes(n)))
    return je[n];
}
function ie(e) {
  const t = document.activeElement;
  for (const o of e)
    if (o === t || (o.focus(), document.activeElement !== t))
      return;
}
function He(e, t) {
  return e.map(
    (o, n) => e[(t + n) % e.length]
  );
}
const Xe = Be, Ze = qe;
function Je(e) {
  const [t, o] = w(void 0);
  return z(() => {
    if (e) {
      o({
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
        o({
          width: s,
          height: d
        });
      });
      return n.observe(e, {
        box: "border-box"
      }), () => n.unobserve(e);
    } else
      o(void 0);
  }, [
    e
  ]), t;
}
function Qe(e) {
  const t = R({
    value: e,
    previous: e
  });
  return O(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [
    e
  ]);
}
function et(e, t) {
  return Re((o, n) => {
    const r = t[o][n];
    return r ?? o;
  }, e);
}
const de = (e) => {
  const { present: t, children: o } = e, n = tt(t), r = typeof o == "function" ? o({
    present: n.isPresent
  }) : P.only(o), c = T(n.ref, r.ref);
  return typeof o == "function" || n.isPresent ? /* @__PURE__ */ H(r, {
    ref: c
  }) : null;
};
de.displayName = "Presence";
function tt(e) {
  const [t, o] = w(), n = R({}), r = R(e), c = R("none"), s = e ? "mounted" : "unmounted", [d, i] = et(s, {
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
      const b = c.current, f = G(a);
      e ? i("MOUNT") : f === "none" || (a == null ? void 0 : a.display) === "none" ? i("UNMOUNT") : i($ && b !== f ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [
    e,
    i
  ]), z(() => {
    if (t) {
      const a = (l) => {
        const f = G(n.current).includes(l.animationName);
        l.target === t && f && Se(
          () => i("ANIMATION_END")
        );
      }, $ = (l) => {
        l.target === t && (c.current = G(n.current));
      };
      return t.addEventListener("animationstart", $), t.addEventListener("animationcancel", a), t.addEventListener("animationend", a), () => {
        t.removeEventListener("animationstart", $), t.removeEventListener("animationcancel", a), t.removeEventListener("animationend", a);
      };
    } else
      i("ANIMATION_END");
  }, [
    t,
    i
  ]), {
    isPresent: [
      "mounted",
      "unmountSuspended"
    ].includes(d),
    ref: N((a) => {
      a && (n.current = getComputedStyle(a)), o(a);
    }, [])
  };
}
function G(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
const ue = "Radio", [ot, fe] = B(ue), [nt, rt] = ot(ue), ct = /* @__PURE__ */ S((e, t) => {
  const { __scopeRadio: o, name: n, checked: r = !1, required: c, disabled: s, value: d = "on", onCheck: i, ...a } = e, [$, l] = w(null), b = T(
    t,
    (p) => l(p)
  ), f = R(!1), u = $ ? !!$.closest("form") : !0;
  return /* @__PURE__ */ v(nt, {
    scope: o,
    checked: r,
    disabled: s
  }, /* @__PURE__ */ v(M.button, x({
    type: "button",
    role: "radio",
    "aria-checked": r,
    "data-state": le(r),
    "data-disabled": s ? "" : void 0,
    disabled: s,
    value: d
  }, a, {
    ref: b,
    onClick: A(e.onClick, (p) => {
      r || i == null || i(), u && (f.current = p.isPropagationStopped(), f.current || p.stopPropagation());
    })
  })), u && /* @__PURE__ */ v(it, {
    control: $,
    bubbles: !f.current,
    name: n,
    value: d,
    checked: r,
    required: c,
    disabled: s,
    style: {
      transform: "translateX(-100%)"
    }
  }));
}), st = "RadioIndicator", at = /* @__PURE__ */ S((e, t) => {
  const { __scopeRadio: o, forceMount: n, ...r } = e, c = rt(st, o);
  return /* @__PURE__ */ v(de, {
    present: n || c.checked
  }, /* @__PURE__ */ v(M.span, x({
    "data-state": le(c.checked),
    "data-disabled": c.disabled ? "" : void 0
  }, r, {
    ref: t
  })));
}), it = (e) => {
  const { control: t, checked: o, bubbles: n = !0, ...r } = e, c = R(null), s = Qe(o), d = Je(t);
  return E(() => {
    const i = c.current, a = window.HTMLInputElement.prototype, l = Object.getOwnPropertyDescriptor(a, "checked").set;
    if (s !== o && l) {
      const b = new Event("click", {
        bubbles: n
      });
      l.call(i, o), i.dispatchEvent(b);
    }
  }, [
    s,
    o,
    n
  ]), /* @__PURE__ */ v("input", x({
    type: "radio",
    "aria-hidden": !0,
    defaultChecked: o
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
function le(e) {
  return e ? "checked" : "unchecked";
}
const dt = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight"
], be = "RadioGroup", [ut, Ft] = B(be, [
  ae,
  fe
]), pe = ae(), $e = fe(), [ft, lt] = ut(be), bt = /* @__PURE__ */ S((e, t) => {
  const { __scopeRadioGroup: o, name: n, defaultValue: r, value: c, required: s = !1, disabled: d = !1, orientation: i, dir: a, loop: $ = !0, onValueChange: l, ...b } = e, f = pe(o), u = ce(a), [p, g] = re({
    prop: c,
    defaultProp: r,
    onChange: l
  });
  return /* @__PURE__ */ v(ft, {
    scope: o,
    name: n,
    required: s,
    disabled: d,
    value: p,
    onValueChange: g
  }, /* @__PURE__ */ v(Xe, x({
    asChild: !0
  }, f, {
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
    ref: t
  }))));
}), pt = "RadioGroupItem", $t = /* @__PURE__ */ S((e, t) => {
  const { __scopeRadioGroup: o, disabled: n, ...r } = e, c = lt(pt, o), s = c.disabled || n, d = pe(o), i = $e(o), a = R(null), $ = T(t, a), l = c.value === r.value, b = R(!1);
  return E(() => {
    const f = (p) => {
      dt.includes(p.key) && (b.current = !0);
    }, u = () => b.current = !1;
    return document.addEventListener("keydown", f), document.addEventListener("keyup", u), () => {
      document.removeEventListener("keydown", f), document.removeEventListener("keyup", u);
    };
  }, []), /* @__PURE__ */ v(Ze, x({
    asChild: !0
  }, d, {
    focusable: !s,
    active: l
  }), /* @__PURE__ */ v(ct, x({
    disabled: s,
    required: c.required,
    checked: l
  }, i, r, {
    name: c.name,
    ref: $,
    onCheck: () => c.onValueChange(r.value),
    onKeyDown: A((f) => {
      f.key === "Enter" && f.preventDefault();
    }),
    onFocus: A(r.onFocus, () => {
      var f;
      b.current && ((f = a.current) === null || f === void 0 || f.click());
    })
  })));
}), vt = /* @__PURE__ */ S((e, t) => {
  const { __scopeRadioGroup: o, ...n } = e, r = $e(o);
  return /* @__PURE__ */ v(at, x({}, r, n, {
    ref: t
  }));
}), mt = bt, ht = $t, gt = vt;
function Ot(e) {
  const { onChange: t, options: o, ...n } = e;
  return /* @__PURE__ */ F(Ct, { onValueChange: t, ...n, children: o.map((r) => /* @__PURE__ */ F(xt, { groupId: n.id, ...r }, r.value)) });
}
function xt(e) {
  const { ariaLabel: t, disabled: o, groupId: n, label: r, value: c } = e, s = `${n}-${c}`;
  return /* @__PURE__ */ ee(Rt, { children: [
    /* @__PURE__ */ F(St, { "aria-label": t ?? (typeof r == "string" ? r : void 0), disabled: o, value: c, id: s, children: /* @__PURE__ */ F(It, {}) }),
    /* @__PURE__ */ F(At, { htmlFor: s, ...o ? { "data-disabled": !0 } : {}, children: r })
  ] });
}
const Ct = k(mt)``, Rt = k.div`
  display: flex;
  align-items: center;
  margin: var(--size-spacing-sm) 0;
`, St = k(ht)`
  appearance: none;
  cursor: pointer;
  background-color: transparent;

  box-sizing: border-box;
  padding: 0;
  border: 1px solid var(--radio-fg);
  border-radius: 100%;

  height: var(--size-dimension-md);
  width: var(--size-dimension-md);
  min-width: var(--size-dimension-md);

  &:hover,
  &[data-state='checked'] {
    background-color: var(--radio-bg);
  }

  &:focus,
  &:focus-visible {
    background-color: var(--radio-bg);
    outline: var(--radio-bg) solid 4px;
  }

  &:disabled {
    cursor: default;
    background-color: var(--radio-bg-disabled);
    border-color: var(--radio-fg-disabled);
  }
`, It = k(gt)`
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
    height: var(--radio-size-indicator);
    width: var(--radio-size-indicator);
    border-radius: 50%;

    background-color: var(--radio-fg);
  }

  &[data-disabled]::after {
    background-color: var(--radio-fg-disabled);
  }
`, At = k.label`
  display: block;
  width: 100%;
  cursor: pointer;
  margin-left: var(--size-spacing-sm);

  [data-disabled] &, /* disabled group */
  &[data-disabled] /* disabled option */ {
    cursor: default;
  }
`;
function Mt(e) {
  document.documentElement.setAttribute("data-echoes-theme", e);
}
var _t = /* @__PURE__ */ ((e) => (e.light = "light", e.dark = "dark", e))(_t || {});
export {
  kt as ExampleComponent,
  Ot as RadioButtonGroup,
  _t as Theme,
  Mt as setTheme
};
