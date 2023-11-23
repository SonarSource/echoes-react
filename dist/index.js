import "./style.css";
import { jsxs as n } from "@emotion/react/jsx-runtime";
import a from "@emotion/styled";
function l(t) {
  const { a: o, b: r, c: e } = t;
  return /* @__PURE__ */ n(c, { children: [
    "test: ",
    r ? o : e
  ] });
}
const c = a.div`
  padding: 20px;
  background-color: var(--color-accent-bg);
  font: var(--typography-h1-bold);
`;
function s(t) {
  document.documentElement.setAttribute("data-echoes-theme", t);
}
var d = /* @__PURE__ */ ((t) => (t.light = "light", t.dark = "dark", t))(d || {});
export {
  l as ExampleComponent,
  d as Theme,
  s as setTheme
};
