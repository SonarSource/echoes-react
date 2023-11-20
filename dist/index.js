import { jsxs as e } from "@emotion/react/jsx-runtime";
import p from "@emotion/styled";
function m(o) {
  const { a: r, b: t, c: n } = o;
  return /* @__PURE__ */ e(c, { children: [
    "test: ",
    t ? r : n
  ] });
}
const c = p.div`
  padding: 20px;
  background-color: grey;
`;
function s() {
}
export {
  m as ExampleComponent,
  s as util
};
