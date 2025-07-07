(() => {
  (() => {
    var F = {
        940943: (e) => {
          var r = "%[a-f0-9]{2}",
            t = new RegExp("(" + r + ")|([^%]+?)", "gi"),
            m = new RegExp("(" + r + ")+", "gi");
          function p(i, a) {
            try {
              return [decodeURIComponent(i.join(""))];
            } catch (f) {}
            if (i.length === 1) return i;
            a = a || 1;
            var u = i.slice(0, a),
              l = i.slice(a);
            return Array.prototype.concat.call([], p(u), p(l));
          }
          function y(i) {
            try {
              return decodeURIComponent(i);
            } catch (l) {
              for (var a = i.match(t) || [], u = 1; u < a.length; u++)
                (i = p(a, u).join("")), (a = i.match(t) || []);
              return i;
            }
          }
          function d(i) {
            for (
              var a = { "%FE%FF": "\uFFFD\uFFFD", "%FF%FE": "\uFFFD\uFFFD" },
                u = m.exec(i);
              u;
            ) {
              try {
                a[u[0]] = decodeURIComponent(u[0]);
              } catch (c) {
                var l = y(u[0]);
                l !== u[0] && (a[u[0]] = l);
              }
              u = m.exec(i);
            }
            a["%C2"] = "\uFFFD";
            for (var f = Object.keys(a), n = 0; n < f.length; n++) {
              var o = f[n];
              i = i.replace(new RegExp(o, "g"), a[o]);
            }
            return i;
          }
          e.exports = (i) => {
            if (typeof i != "string")
              throw new TypeError(
                "Expected `encodedURI` to be of type `string`, got `" +
                  typeof i +
                  "`",
              );
            try {
              return (i = i.replace(/\+/g, " ")), decodeURIComponent(i);
            } catch (a) {
              return d(i);
            }
          };
        },
        903329: (e) => {
          /*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var r = Object.getOwnPropertySymbols,
            t = Object.prototype.hasOwnProperty,
            m = Object.prototype.propertyIsEnumerable;
          function p(d) {
            if (d == null)
              throw new TypeError(
                "Object.assign cannot be called with null or undefined",
              );
            return Object(d);
          }
          function y() {
            try {
              if (!Object.assign) return !1;
              var d = new String("abc");
              if (((d[5] = "de"), Object.getOwnPropertyNames(d)[0] === "5"))
                return !1;
              for (var i = {}, a = 0; a < 10; a++)
                i["_" + String.fromCharCode(a)] = a;
              var u = Object.getOwnPropertyNames(i).map((f) => i[f]);
              if (u.join("") !== "0123456789") return !1;
              var l = {};
              return (
                "abcdefghijklmnopqrst".split("").forEach((f) => {
                  l[f] = f;
                }),
                Object.keys(Object.assign({}, l)).join("") ===
                  "abcdefghijklmnopqrst"
              );
            } catch (f) {
              return !1;
            }
          }
          e.exports = y()
            ? Object.assign
            : (d, i) => {
                for (var a, u = p(d), l, f = 1; f < arguments.length; f++) {
                  a = Object(arguments[f]);
                  for (var n in a) t.call(a, n) && (u[n] = a[n]);
                  if (r) {
                    l = r(a);
                    for (var o = 0; o < l.length; o++)
                      m.call(a, l[o]) && (u[l[o]] = a[l[o]]);
                  }
                }
                return u;
              };
        },
        630828: (e, r, t) => {
          var m = t(820073),
            p = t(903329),
            y = t(940943);
          function d(n) {
            switch (n.arrayFormat) {
              case "index":
                return (o, c, g) =>
                  c === null
                    ? [a(o, n), "[", g, "]"].join("")
                    : [a(o, n), "[", a(g, n), "]=", a(c, n)].join("");
              case "bracket":
                return (o, c) =>
                  c === null ? a(o, n) : [a(o, n), "[]=", a(c, n)].join("");
              default:
                return (o, c) =>
                  c === null ? a(o, n) : [a(o, n), "=", a(c, n)].join("");
            }
          }
          function i(n) {
            var o;
            switch (n.arrayFormat) {
              case "index":
                return (c, g, s) => {
                  if (
                    ((o = /\[(\d*)\]$/.exec(c)),
                    (c = c.replace(/\[\d*\]$/, "")),
                    !o)
                  ) {
                    s[c] = g;
                    return;
                  }
                  s[c] === void 0 && (s[c] = {}), (s[c][o[1]] = g);
                };
              case "bracket":
                return (c, g, s) => {
                  if (
                    ((o = /(\[\])$/.exec(c)), (c = c.replace(/\[\]$/, "")), o)
                  ) {
                    if (s[c] === void 0) {
                      s[c] = [g];
                      return;
                    }
                  } else {
                    s[c] = g;
                    return;
                  }
                  s[c] = [].concat(s[c], g);
                };
              default:
                return (c, g, s) => {
                  if (s[c] === void 0) {
                    s[c] = g;
                    return;
                  }
                  s[c] = [].concat(s[c], g);
                };
            }
          }
          function a(n, o) {
            return o.encode ? (o.strict ? m(n) : encodeURIComponent(n)) : n;
          }
          function u(n) {
            return Array.isArray(n)
              ? n.sort()
              : typeof n == "object"
                ? u(Object.keys(n))
                    .sort((o, c) => Number(o) - Number(c))
                    .map((o) => n[o])
                : n;
          }
          function l(n) {
            var o = n.indexOf("?");
            return o === -1 ? "" : n.slice(o + 1);
          }
          function f(n, o) {
            o = p({ arrayFormat: "none" }, o);
            var c = i(o),
              g = Object.create(null);
            return typeof n != "string" ||
              ((n = n.trim().replace(/^[?#&]/, "")), !n)
              ? g
              : (n.split("&").forEach((s) => {
                  var b = s.replace(/\+/g, " ").split("="),
                    h = b.shift(),
                    v = b.length > 0 ? b.join("=") : void 0;
                  (v = v === void 0 ? null : y(v)), c(y(h), v, g);
                }),
                Object.keys(g)
                  .sort()
                  .reduce((s, b) => {
                    var h = g[b];
                    return (
                      Boolean(h) && typeof h == "object" && !Array.isArray(h)
                        ? (s[b] = u(h))
                        : (s[b] = h),
                      s
                    );
                  }, Object.create(null)));
          }
          (r.extract = l),
            (r.parse = f),
            (r.stringify = (n, o) => {
              var c = { encode: !0, strict: !0, arrayFormat: "none" };
              (o = p(c, o)), o.sort === !1 && (o.sort = () => {});
              var g = d(o);
              return n
                ? Object.keys(n)
                    .sort(o.sort)
                    .map((s) => {
                      var b = n[s];
                      if (b === void 0) return "";
                      if (b === null) return a(s, o);
                      if (Array.isArray(b)) {
                        var h = [];
                        return (
                          b.slice().forEach((v) => {
                            v !== void 0 && h.push(g(s, v, h.length));
                          }),
                          h.join("&")
                        );
                      }
                      return a(s, o) + "=" + a(b, o);
                    })
                    .filter((s) => s.length > 0)
                    .join("&")
                : "";
            }),
            (r.parseUrl = (n, o) => ({
              url: n.split("?")[0] || "",
              query: f(l(n), o),
            }));
        },
        820073: (e) => {
          e.exports = (r) =>
            encodeURIComponent(r).replace(
              /[!'()*]/g,
              (t) => "%" + t.charCodeAt(0).toString(16).toUpperCase(),
            );
        },
      },
      O = {};
    function S(e) {
      var r = O[e];
      if (r !== void 0) return r.exports;
      var t = (O[e] = { exports: {} });
      return F[e](t, t.exports, S), t.exports;
    }
    var R = {};
    const I = !1,
      w = () => {
        const e = "localStorage";
        try {
          const r = window[e],
            t = "__storage_test__";
          return r.setItem(t, t), r.removeItem(t), !0;
        } catch (r) {
          return !1;
        }
      },
      U = (e) => {
        if (w())
          try {
            return localStorage.getItem(e);
          } catch (r) {
            return null;
          }
        else return null;
      },
      L = (e) => {
        if (w())
          try {
            return localStorage.removeItem(e);
          } catch (r) {
            return null;
          }
        else return null;
      },
      M = (e, r) => {
        if (w())
          try {
            localStorage.setItem(e, r);
          } catch (t) {
            devError(t);
          }
      },
      E = (...e) => {
        (I || U("dev_error") === "true") && console.error("Error:", ...e);
      };
    var P = S(630828),
      x = Object.defineProperty,
      A = Object.defineProperties,
      D = Object.getOwnPropertyDescriptors,
      C = Object.getOwnPropertySymbols,
      B = Object.prototype.hasOwnProperty,
      N = Object.prototype.propertyIsEnumerable,
      k = (e, r, t) =>
        r in e
          ? x(e, r, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: t,
            })
          : (e[r] = t),
      _ = (e, r) => {
        for (var t in r || (r = {})) B.call(r, t) && k(e, t, r[t]);
        if (C) for (var t of C(r)) N.call(r, t) && k(e, t, r[t]);
        return e;
      },
      W = (e, r) => A(e, D(r));
    function K(e) {
      throw new Error(`Unexpected object: ${e}`);
    }
    function $(e, r = window.location.href) {
      return P.parseUrl(r).query[e];
    }
    function j(e, r = window.location.href) {
      const t = $(e, r);
      return t instanceof Array
        ? t[t.length - 1].toString()
        : t == null
          ? ""
          : t.toString();
    }
    function Q(e, r = window.location.href, t) {
      const m = j(e, r);
      return t && !m ? null : m.toLowerCase() === "true";
    }
    function Z(e, r, t) {
      const m = queryString.parseUrl(e);
      return `${m.url}?${queryString.stringify(W(_({}, m.query), { [r]: t }))}`;
    }
    function z(e, r) {
      if (!r) return e;
      const t = queryString.parseUrl(e);
      return `${t.url}?${queryString.stringify(_(_({}, t.query), r))}`;
    }
    const V = (e) => {
      switch (e) {
        case "iw":
          return "he";
        case "ji":
          return "yi";
        case "in":
          return "id";
      }
      return e;
    };
    function G(e, r) {
      let t = e;
      return (
        Object.keys(r).map((m) => {
          var p;
          (t = t.replace(/\([a-zA-Z]*?\)/, "")),
            (t = t.replace(`:${m}`, (p = r[m]) != null ? p : ""));
        }),
        t
      );
    }
    const H = (e) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e),
      Y = (e) =>
        (e == null ? void 0 : e.replace(/\/\*.*?\*\/|\/\*.*$/g, "")) || "",
      J = (e) => {
        const r = document.createElement("a");
        (r.href = e),
          document.body.appendChild(r),
          r.click(),
          document.body.removeChild(r);
      };
    function X(e, r) {
      return Math.floor(Math.random() * (r - e + 1) + e);
    }
    const ee = "bokun-modal-iFrame",
      re = "bokun-widgets-cart",
      te = "bokun-widgets-cart-wrapper",
      ne = "bokunButton",
      q = "bokunWidget",
      oe = "bokunSessionId",
      ae = "data-bokun-widget-loaded",
      ce = "bokun-modal-container",
      ie = "hostUrl",
      ue = "setCookies",
      se = "trackingCode",
      de = "bokunWidgetsTrackingCode",
      le = "widgetRoot",
      fe = "widget-resizer-element",
      ge = "goToCheckout",
      me = "referralSource",
      pe = "gttd",
      be = "_gcl_ls",
      T = () => {
        const e = "__BokunWidgetsLoader";
        return (window[e] = window[e] || {}), window[e];
      };
    (() => {
      const e = document.getElementsByTagName("script"),
        r = Array.from(e).find((t) => t.src.includes("BokunWidgetsLoader"));
      if (r) {
        const t = r.src.replace(/([^/:])[/#?].*/, "$1"),
          m = j("bookingChannelUUID", r.src),
          p = j("isDuda", r.src),
          y = T();
        {
          const d = y.bookingChannelUUID;
          if (d === void 0)
            (y.bookingChannelUUID = m),
              (y.origin = t),
              (y.isDuda = p === "true");
          else {
            d !== m &&
              alert(
                `You can not load B\xF3kun widgets from different booking channels on the same page. The active booking channel is: ${d}`,
              );
            return;
          }
        }
        {
          const d = e[0];
          ((a) => {
            const u = document.createElement("script");
            u.type = "text/javascript";
            const l = "05189470b478b2646fac3f25f8dea929e2e6f9b6";
            u.src = `${l ? "https://static.bokun.io" : `${t}/assets/javascripts/apps/build`}/${a}${l ? `.${l}` : ""}.js`;
            const f = document.querySelector("script[nonce]"),
              n = f && (f.nonce || f.getAttribute("nonce"));
            n && u.setAttribute("nonce", n),
              d != null && d.parentNode
                ? d.parentNode.insertBefore(u, d)
                : document.body.appendChild(u);
          })("BokunWidgets");
        }
        try {
          Array.from(document.body.getElementsByClassName(q))
            .filter((d) => !!d.attributes["data-src"])
            .forEach((d) => {
              d.innerHTML =
                '<div style="height:700px;">Loading booking engine...</div>';
            });
        } catch (d) {}
      } else E("Could not find BokunWidgetsLoaderScript ");
    })();
  })();
})();
