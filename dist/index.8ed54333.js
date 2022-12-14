/* store.js - Copyright (c) 2010-2017 Marcus Westin */ !function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.store = t();
    }
}(function() {
    var define, module, exports;
    return (function t1(e, n1, r) {
        function o(u, s) {
            if (!n1[u]) {
                if (!e[u]) {
                    var a = "function" == typeof require && undefined;
                    if (!s && a) return a(u, !0);
                    if (i) return i(u, !0);
                    var c = new Error("Cannot find module '" + u + "'");
                    throw c.code = "MODULE_NOT_FOUND", c;
                }
                var f = n1[u] = {
                    exports: {}
                };
                e[u][0].call(f.exports, function(t) {
                    var n = e[u][1][t];
                    return o(n ? n : t);
                }, f, f.exports, t1, e, n1, r);
            }
            return n1[u].exports;
        }
        for(var i = "function" == typeof require && undefined, u1 = 0; u1 < r.length; u1++)o(r[u1]);
        return o;
    })({
        1: [
            function(t, e, n) {
                "use strict";
                var r = t("../src/store-engine"), o = t("../storages/all"), i = t("../plugins/all");
                e.exports = r.createStore(o, i);
            },
            {
                "../plugins/all": 2,
                "../src/store-engine": 15,
                "../storages/all": 17
            }
        ],
        2: [
            function(t, e, n) {
                "use strict";
                e.exports = [
                    t("./compression"),
                    t("./defaults"),
                    t("./dump"),
                    t("./events"),
                    t("./observe"),
                    t("./expire"),
                    t("./json2"),
                    t("./operations"),
                    t("./update"),
                    t("./v1-backcompat")
                ];
            },
            {
                "./compression": 3,
                "./defaults": 4,
                "./dump": 5,
                "./events": 6,
                "./expire": 7,
                "./json2": 8,
                "./observe": 11,
                "./operations": 12,
                "./update": 13,
                "./v1-backcompat": 14
            }
        ],
        3: [
            function(t2, e1, n2) {
                "use strict";
                function r1() {
                    function t3(t, e) {
                        var n = t(e);
                        if (!n) return n;
                        var r = o.decompress(n);
                        return null == r ? n : this._deserialize(r);
                    }
                    function e2(t, e, n) {
                        var r = o.compress(this._serialize(n));
                        t(e, r);
                    }
                    return {
                        get: t3,
                        set: e2
                    };
                }
                var o = t2("./lib/lz-string");
                e1.exports = r1;
            },
            {
                "./lib/lz-string": 10
            }
        ],
        4: [
            function(t4, e3, n3) {
                "use strict";
                function r2() {
                    function t5(t, e) {
                        n = e;
                    }
                    function e4(t, e) {
                        var r = t();
                        return void 0 !== r ? r : n[e];
                    }
                    var n = {};
                    return {
                        defaults: t5,
                        get: e4
                    };
                }
                e3.exports = r2;
            },
            {}
        ],
        5: [
            function(t6, e5, n4) {
                "use strict";
                function r() {
                    function t7(t8) {
                        var e = {};
                        return this.each(function(t, n) {
                            e[n] = t;
                        }), e;
                    }
                    return {
                        dump: t7
                    };
                }
                e5.exports = r;
            },
            {}
        ],
        6: [
            function(t9, e6, n5) {
                "use strict";
                function r3() {
                    function t10(t, e, n) {
                        return c.on(e, u(this, n));
                    }
                    function e7(t, e) {
                        c.off(e);
                    }
                    function n6(t, e, n) {
                        c.once(e, u(this, n));
                    }
                    function r4(t, e, n) {
                        var r = this.get(e);
                        t(), c.fire(e, n, r);
                    }
                    function i(t, e) {
                        var n = this.get(e);
                        t(), c.fire(e, void 0, n);
                    }
                    function a(t11) {
                        var e8 = {};
                        this.each(function(t, n) {
                            e8[n] = t;
                        }), t11(), s(e8, function(t, e) {
                            c.fire(e, void 0, t);
                        });
                    }
                    var c = o();
                    return {
                        watch: t10,
                        unwatch: e7,
                        once: n6,
                        set: r4,
                        remove: i,
                        clearAll: a
                    };
                }
                function o() {
                    return a1(f, {
                        _id: 0,
                        _subSignals: {},
                        _subCallbacks: {}
                    });
                }
                var i1 = t9("../src/util"), u = i1.bind, s = i1.each, a1 = i1.create, c1 = i1.slice;
                e6.exports = r3;
                var f = {
                    _id: null,
                    _subCallbacks: null,
                    _subSignals: null,
                    on: function(t, e) {
                        return this._subCallbacks[t] || (this._subCallbacks[t] = {}), this._id += 1, this._subCallbacks[t][this._id] = e, this._subSignals[this._id] = t, this._id;
                    },
                    off: function(t) {
                        var e = this._subSignals[t];
                        delete this._subCallbacks[e][t], delete this._subSignals[t];
                    },
                    once: function(t, e) {
                        var n = this.on(t, u(this, function() {
                            e.apply(this, arguments), this.off(n);
                        }));
                    },
                    fire: function(t12) {
                        var e = c1(arguments, 1);
                        s(this._subCallbacks[t12], function(t) {
                            t.apply(this, e);
                        });
                    }
                };
            },
            {
                "../src/util": 16
            }
        ],
        7: [
            function(t13, e9, n7) {
                "use strict";
                function r5() {
                    function t14(t, e, n, r) {
                        return this.hasNamespace(o) || s.set(e, r), t();
                    }
                    function e10(t, e) {
                        return this.hasNamespace(o) || u.call(this, e), t();
                    }
                    function n8(t, e) {
                        return this.hasNamespace(o) || s.remove(e), t();
                    }
                    function r6(t, e) {
                        return s.get(e);
                    }
                    function i(t) {
                        var e = [];
                        this.each(function(t, n) {
                            e.push(n);
                        });
                        for(var n9 = 0; n9 < e.length; n9++)u.call(this, e[n9]);
                    }
                    function u(t) {
                        var e = s.get(t, Number.MAX_VALUE);
                        e <= (new Date).getTime() && (this.raw.remove(t), s.remove(t));
                    }
                    var s = this.createStore(this.storage, null, this._namespacePrefix + o);
                    return {
                        set: t14,
                        get: e10,
                        remove: n8,
                        getExpiration: r6,
                        removeExpiredKeys: i
                    };
                }
                var o = "expire_mixin";
                e9.exports = r5;
            },
            {}
        ],
        8: [
            function(t, e, n) {
                "use strict";
                function r() {
                    return t("./lib/json2"), {};
                }
                e.exports = r;
            },
            {
                "./lib/json2": 9
            }
        ],
        9: [
            function(require, module, exports) {
                "use strict";
                var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t;
                } : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                };
                "object" !== ("undefined" == typeof JSON ? "undefined" : _typeof(JSON)) && (JSON = {}), function() {
                    function f(t) {
                        return t < 10 ? "0" + t : t;
                    }
                    function this_value() {
                        return this.valueOf();
                    }
                    function quote(t15) {
                        return rx_escapable.lastIndex = 0, rx_escapable.test(t15) ? '"' + t15.replace(rx_escapable, function(t) {
                            var e = meta[t];
                            return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
                        }) + '"' : '"' + t15 + '"';
                    }
                    function str(t, e) {
                        var n, r, o, i, u, s = gap, a = e[t];
                        switch(a && "object" === ("undefined" == typeof a ? "undefined" : _typeof(a)) && "function" == typeof a.toJSON && (a = a.toJSON(t)), "function" == typeof rep && (a = rep.call(e, t, a)), "undefined" == typeof a ? "undefined" : _typeof(a)){
                            case "string":
                                return quote(a);
                            case "number":
                                return isFinite(a) ? String(a) : "null";
                            case "boolean":
                            case "null":
                                return String(a);
                            case "object":
                                if (!a) return "null";
                                if (gap += indent, u = [], "[object Array]" === Object.prototype.toString.apply(a)) {
                                    for(i = a.length, n = 0; n < i; n += 1)u[n] = str(n, a) || "null";
                                    return o = 0 === u.length ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + s + "]" : "[" + u.join(",") + "]", gap = s, o;
                                }
                                if (rep && "object" === ("undefined" == typeof rep ? "undefined" : _typeof(rep))) for(i = rep.length, n = 0; n < i; n += 1)"string" == typeof rep[n] && (r = rep[n], o = str(r, a), o && u.push(quote(r) + (gap ? ": " : ":") + o));
                                else for(r in a)Object.prototype.hasOwnProperty.call(a, r) && (o = str(r, a), o && u.push(quote(r) + (gap ? ": " : ":") + o));
                                return o = 0 === u.length ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + s + "}" : "{" + u.join(",") + "}", gap = s, o;
                        }
                    }
                    var rx_one = /^[\],:{}\s]*$/, rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rx_four = /(?:^|:|,)(?:\s*\[)+/g, rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
                    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
                        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
                    }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value);
                    var gap, indent, meta, rep;
                    "function" != typeof JSON.stringify && (meta = {
                        "\b": "\\b",
                        "	": "\\t",
                        "\n": "\\n",
                        "\f": "\\f",
                        "\r": "\\r",
                        '"': '\\"',
                        "\\": "\\\\"
                    }, JSON.stringify = function(t, e, n) {
                        var r;
                        if (gap = "", indent = "", "number" == typeof n) for(r = 0; r < n; r += 1)indent += " ";
                        else "string" == typeof n && (indent = n);
                        if (rep = e, e && "function" != typeof e && ("object" !== ("undefined" == typeof e ? "undefined" : _typeof(e)) || "number" != typeof e.length)) throw new Error("JSON.stringify");
                        return str("", {
                            "": t
                        });
                    }), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
                        function walk(t, e) {
                            var n, r, o = t[e];
                            if (o && "object" === ("undefined" == typeof o ? "undefined" : _typeof(o))) for(n in o)Object.prototype.hasOwnProperty.call(o, n) && (r = walk(o, n), void 0 !== r ? o[n] = r : delete o[n]);
                            return reviver.call(t, e, o);
                        }
                        var j;
                        if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function(t) {
                            return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
                        })), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                            "": j
                        }, "") : j;
                        throw new SyntaxError("JSON.parse");
                    });
                }();
            },
            {}
        ],
        10: [
            function(t16, e11, n10) {
                "use strict";
                var r7 = function() {
                    function t17(t, e) {
                        if (!o1[t]) {
                            o1[t] = {};
                            for(var n = 0; n < t.length; n++)o1[t][t.charAt(n)] = n;
                        }
                        return o1[t][e];
                    }
                    var e12 = String.fromCharCode, n11 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", r8 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", o1 = {}, i2 = {
                        compressToBase64: function(t18) {
                            if (null == t18) return "";
                            var e = i2._compress(t18, 6, function(t) {
                                return n11.charAt(t);
                            });
                            switch(e.length % 4){
                                default:
                                case 0:
                                    return e;
                                case 1:
                                    return e + "===";
                                case 2:
                                    return e + "==";
                                case 3:
                                    return e + "=";
                            }
                        },
                        decompressFromBase64: function(e) {
                            return null == e ? "" : "" == e ? null : i2._decompress(e.length, 32, function(r) {
                                return t17(n11, e.charAt(r));
                            });
                        },
                        compressToUTF16: function(t19) {
                            return null == t19 ? "" : i2._compress(t19, 15, function(t) {
                                return e12(t + 32);
                            }) + " ";
                        },
                        decompressFromUTF16: function(t) {
                            return null == t ? "" : "" == t ? null : i2._decompress(t.length, 16384, function(e) {
                                return t.charCodeAt(e) - 32;
                            });
                        },
                        compressToUint8Array: function(t) {
                            for(var e = i2.compress(t), n = new Uint8Array(2 * e.length), r = 0, o = e.length; r < o; r++){
                                var u = e.charCodeAt(r);
                                n[2 * r] = u >>> 8, n[2 * r + 1] = u % 256;
                            }
                            return n;
                        },
                        decompressFromUint8Array: function(t20) {
                            if (null === t20 || void 0 === t20) return i2.decompress(t20);
                            for(var n = new Array(t20.length / 2), r = 0, o = n.length; r < o; r++)n[r] = 256 * t20[2 * r] + t20[2 * r + 1];
                            var u = [];
                            return n.forEach(function(t) {
                                u.push(e12(t));
                            }), i2.decompress(u.join(""));
                        },
                        compressToEncodedURIComponent: function(t21) {
                            return null == t21 ? "" : i2._compress(t21, 6, function(t) {
                                return r8.charAt(t);
                            });
                        },
                        decompressFromEncodedURIComponent: function(e) {
                            return null == e ? "" : "" == e ? null : (e = e.replace(/ /g, "+"), i2._decompress(e.length, 32, function(n) {
                                return t17(r8, e.charAt(n));
                            }));
                        },
                        compress: function(t22) {
                            return i2._compress(t22, 16, function(t) {
                                return e12(t);
                            });
                        },
                        _compress: function(t, e, n) {
                            if (null == t) return "";
                            var r, o, i, u = {}, s = {}, a = "", c = "", f = "", l = 2, p = 3, h = 2, d = [], g = 0, v = 0;
                            for(i = 0; i < t.length; i += 1)if (a = t.charAt(i), Object.prototype.hasOwnProperty.call(u, a) || (u[a] = p++, s[a] = !0), c = f + a, Object.prototype.hasOwnProperty.call(u, c)) f = c;
                            else {
                                if (Object.prototype.hasOwnProperty.call(s, f)) {
                                    if (f.charCodeAt(0) < 256) {
                                        for(r = 0; r < h; r++)g <<= 1, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++;
                                        for(o = f.charCodeAt(0), r = 0; r < 8; r++)g = g << 1 | 1 & o, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++, o >>= 1;
                                    } else {
                                        for(o = 1, r = 0; r < h; r++)g = g << 1 | o, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++, o = 0;
                                        for(o = f.charCodeAt(0), r = 0; r < 16; r++)g = g << 1 | 1 & o, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++, o >>= 1;
                                    }
                                    l--, 0 == l && (l = Math.pow(2, h), h++), delete s[f];
                                } else for(o = u[f], r = 0; r < h; r++)g = g << 1 | 1 & o, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++, o >>= 1;
                                l--, 0 == l && (l = Math.pow(2, h), h++), u[c] = p++, f = String(a);
                            }
                            if ("" !== f) {
                                if (Object.prototype.hasOwnProperty.call(s, f)) {
                                    if (f.charCodeAt(0) < 256) {
                                        for(r = 0; r < h; r++)g <<= 1, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++;
                                        for(o = f.charCodeAt(0), r = 0; r < 8; r++)g = g << 1 | 1 & o, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++, o >>= 1;
                                    } else {
                                        for(o = 1, r = 0; r < h; r++)g = g << 1 | o, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++, o = 0;
                                        for(o = f.charCodeAt(0), r = 0; r < 16; r++)g = g << 1 | 1 & o, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++, o >>= 1;
                                    }
                                    l--, 0 == l && (l = Math.pow(2, h), h++), delete s[f];
                                } else for(o = u[f], r = 0; r < h; r++)g = g << 1 | 1 & o, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++, o >>= 1;
                                l--, 0 == l && (l = Math.pow(2, h), h++);
                            }
                            for(o = 2, r = 0; r < h; r++)g = g << 1 | 1 & o, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++, o >>= 1;
                            for(;;){
                                if (g <<= 1, v == e - 1) {
                                    d.push(n(g));
                                    break;
                                }
                                v++;
                            }
                            return d.join("");
                        },
                        decompress: function(t) {
                            return null == t ? "" : "" == t ? null : i2._decompress(t.length, 32768, function(e) {
                                return t.charCodeAt(e);
                            });
                        },
                        _decompress: function(t, n, r) {
                            var o, i, u, s, a, c, f, l, p = [], h = 4, d = 4, g = 3, v = "", m = [], y = {
                                val: r(0),
                                position: n,
                                index: 1
                            };
                            for(i = 0; i < 3; i += 1)p[i] = i;
                            for(s = 0, c = Math.pow(2, 2), f = 1; f != c;)a = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = n, y.val = r(y.index++)), s |= (a > 0 ? 1 : 0) * f, f <<= 1;
                            switch(o = s){
                                case 0:
                                    for(s = 0, c = Math.pow(2, 8), f = 1; f != c;)a = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = n, y.val = r(y.index++)), s |= (a > 0 ? 1 : 0) * f, f <<= 1;
                                    l = e12(s);
                                    break;
                                case 1:
                                    for(s = 0, c = Math.pow(2, 16), f = 1; f != c;)a = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = n, y.val = r(y.index++)), s |= (a > 0 ? 1 : 0) * f, f <<= 1;
                                    l = e12(s);
                                    break;
                                case 2:
                                    return "";
                            }
                            for(p[3] = l, u = l, m.push(l);;){
                                if (y.index > t) return "";
                                for(s = 0, c = Math.pow(2, g), f = 1; f != c;)a = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = n, y.val = r(y.index++)), s |= (a > 0 ? 1 : 0) * f, f <<= 1;
                                switch(l = s){
                                    case 0:
                                        for(s = 0, c = Math.pow(2, 8), f = 1; f != c;)a = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = n, y.val = r(y.index++)), s |= (a > 0 ? 1 : 0) * f, f <<= 1;
                                        p[d++] = e12(s), l = d - 1, h--;
                                        break;
                                    case 1:
                                        for(s = 0, c = Math.pow(2, 16), f = 1; f != c;)a = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = n, y.val = r(y.index++)), s |= (a > 0 ? 1 : 0) * f, f <<= 1;
                                        p[d++] = e12(s), l = d - 1, h--;
                                        break;
                                    case 2:
                                        return m.join("");
                                }
                                if (0 == h && (h = Math.pow(2, g), g++), p[l]) v = p[l];
                                else {
                                    if (l !== d) return null;
                                    v = u + u.charAt(0);
                                }
                                m.push(v), p[d++] = u + v.charAt(0), h--, u = v, 0 == h && (h = Math.pow(2, g), g++);
                            }
                        }
                    };
                    return i2;
                }();
                "function" == typeof define && define.amd ? define(function() {
                    return r7;
                }) : "undefined" != typeof e11 && null != e11 && (e11.exports = r7);
            },
            {}
        ],
        11: [
            function(t23, e13, n12) {
                "use strict";
                function r9() {
                    function t(t, e, n) {
                        var r = this.watch(e, n);
                        return n(this.get(e)), r;
                    }
                    function e14(t, e) {
                        this.unwatch(e);
                    }
                    return {
                        observe: t,
                        unobserve: e14
                    };
                }
                var o = t23("./events");
                e13.exports = [
                    o,
                    r9
                ];
            },
            {
                "./events": 6
            }
        ],
        12: [
            function(t24, e15, n13) {
                "use strict";
                function r10() {
                    function t25(t, e, n, r, o, i) {
                        return a.call(this, "push", arguments);
                    }
                    function e16(t, e) {
                        return a.call(this, "pop", arguments);
                    }
                    function n14(t, e) {
                        return a.call(this, "shift", arguments);
                    }
                    function r11(t, e, n, r, o, i) {
                        return a.call(this, "unshift", arguments);
                    }
                    function i(t26, e, n, r, i, a) {
                        var c = u(arguments, 2);
                        return this.update(e, {}, function(t) {
                            if ("object" != ("undefined" == typeof t ? "undefined" : o2(t))) throw new Error('store.assign called for non-object value with key "' + e + '"');
                            return c.unshift(t), s.apply(Object, c);
                        });
                    }
                    function a(t, e17) {
                        var n, r = e17[1], o = u(e17, 2);
                        return this.update(r, [], function(e) {
                            n = Array.prototype[t].apply(e, o);
                        }), n;
                    }
                    return {
                        push: t25,
                        pop: e16,
                        shift: n14,
                        unshift: r11,
                        assign: i
                    };
                }
                var o2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t;
                } : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                }, i3 = t24("../src/util"), u = i3.slice, s = i3.assign, a2 = t24("./update");
                e15.exports = [
                    a2,
                    r10
                ];
            },
            {
                "../src/util": 16,
                "./update": 13
            }
        ],
        13: [
            function(t27, e18, n15) {
                "use strict";
                function r12() {
                    function t(t, e, n, r) {
                        3 == arguments.length && (r = n, n = void 0);
                        var o = this.get(e, n), i = r(o);
                        this.set(e, void 0 != i ? i : o);
                    }
                    return {
                        update: t
                    };
                }
                e18.exports = r12;
            },
            {}
        ],
        14: [
            function(t28, e19, n16) {
                "use strict";
                function r13() {
                    return this.disabled = !this.enabled, {
                        has: o3,
                        transact: i4,
                        clear: u,
                        forEach: s,
                        getAll: a,
                        serialize: c,
                        deserialize: f
                    };
                }
                function o3(t, e) {
                    return void 0 !== this.get(e);
                }
                function i4(t, e, n, r) {
                    null == r && (r = n, n = null), null == n && (n = {});
                    var o = this.get(e, n), i = r(o);
                    this.set(e, void 0 === i ? o : i);
                }
                function u(t) {
                    return this.clearAll.call(this);
                }
                function s(t29, e) {
                    return this.each.call(this, function(t, n) {
                        e(n, t);
                    });
                }
                function a(t) {
                    return this.dump.call(this);
                }
                function c(t, e) {
                    return JSON.stringify(e);
                }
                function f(t, e) {
                    if ("string" == typeof e) try {
                        return JSON.parse(e);
                    } catch (n) {
                        return e || void 0;
                    }
                }
                var l = t28("./dump"), p = t28("./json2");
                e19.exports = [
                    l,
                    p,
                    r13
                ];
            },
            {
                "./dump": 5,
                "./json2": 8
            }
        ],
        15: [
            function(t30, e20, n17) {
                "use strict";
                function r14() {
                    var t = "undefined" == typeof console ? null : console;
                    if (t) {
                        var e = t.warn ? t.warn : t.log;
                        e.apply(t, arguments);
                    }
                }
                function o4(t31, e21, n18) {
                    n18 || (n18 = ""), t31 && !l(t31) && (t31 = [
                        t31
                    ]), e21 && !l(e21) && (e21 = [
                        e21
                    ]);
                    var o5 = n18 ? "__storejs_" + n18 + "_" : "", i6 = n18 ? new RegExp("^" + o5) : null, g = /^[a-zA-Z0-9_\-]*$/;
                    if (!g.test(n18)) throw new Error("store.js namespaces can only have alphanumerics + underscores and dashes");
                    var v = {
                        _namespacePrefix: o5,
                        _namespaceRegexp: i6,
                        _testStorage: function(t) {
                            try {
                                var e = "__storejs__test__";
                                t.write(e, e);
                                var n = t.read(e) === e;
                                return t.remove(e), n;
                            } catch (r) {
                                return !1;
                            }
                        },
                        _assignPluginFnProp: function(t32, e22) {
                            var n = this[e22];
                            this[e22] = function() {
                                function e23() {
                                    if (n) return a(arguments, function(t, e) {
                                        r[e] = t;
                                    }), n.apply(o, r);
                                }
                                var r = u(arguments, 0), o = this, i = [
                                    e23
                                ].concat(r);
                                return t32.apply(o, i);
                            };
                        },
                        _serialize: function(t) {
                            return JSON.stringify(t);
                        },
                        _deserialize: function(t, e) {
                            if (!t) return e;
                            var n = "";
                            try {
                                n = JSON.parse(t);
                            } catch (r) {
                                n = t;
                            }
                            return void 0 !== n ? n : e;
                        },
                        _addStorage: function(t) {
                            this.enabled || this._testStorage(t) && (this.storage = t, this.enabled = !0);
                        },
                        _addPlugin: function(t33) {
                            var e24 = this;
                            if (l(t33)) return void a(t33, function(t) {
                                e24._addPlugin(t);
                            });
                            var n19 = s(this.plugins, function(e) {
                                return t33 === e;
                            });
                            if (!n19) {
                                if (this.plugins.push(t33), !p(t33)) throw new Error("Plugins must be function values that return objects");
                                var r15 = t33.call(this);
                                if (!h(r15)) throw new Error("Plugins must return an object of function properties");
                                a(r15, function(n, r) {
                                    if (!p(n)) throw new Error("Bad plugin property: " + r + " from plugin " + t33.name + ". Plugins should only return functions.");
                                    e24._assignPluginFnProp(n, r);
                                });
                            }
                        },
                        addStorage: function(t) {
                            r14("store.addStorage(storage) is deprecated. Use createStore([storages])"), this._addStorage(t);
                        }
                    }, m = f(v, d, {
                        plugins: []
                    });
                    return m.raw = {}, a(m, function(t, e) {
                        p(t) && (m.raw[e] = c(m, t));
                    }), a(t31, function(t) {
                        m._addStorage(t);
                    }), a(e21, function(t) {
                        m._addPlugin(t);
                    }), m;
                }
                var i5 = t30("./util"), u = i5.slice, s = i5.pluck, a = i5.each, c = i5.bind, f = i5.create, l = i5.isList, p = i5.isFunction, h = i5.isObject;
                e20.exports = {
                    createStore: o4
                };
                var d = {
                    version: "2.0.12",
                    enabled: !1,
                    get: function(t, e) {
                        var n = this.storage.read(this._namespacePrefix + t);
                        return this._deserialize(n, e);
                    },
                    set: function(t, e) {
                        return void 0 === e ? this.remove(t) : (this.storage.write(this._namespacePrefix + t, this._serialize(e)), e);
                    },
                    remove: function(t) {
                        this.storage.remove(this._namespacePrefix + t);
                    },
                    each: function(t) {
                        var e = this;
                        this.storage.each(function(n, r) {
                            t.call(e, e._deserialize(n), (r || "").replace(e._namespaceRegexp, ""));
                        });
                    },
                    clearAll: function() {
                        this.storage.clearAll();
                    },
                    hasNamespace: function(t) {
                        return this._namespacePrefix == "__storejs_" + t + "_";
                    },
                    createStore: function() {
                        return o4.apply(this, arguments);
                    },
                    addPlugin: function(t) {
                        this._addPlugin(t);
                    },
                    namespace: function(t) {
                        return o4(this.storage, this.plugins, t);
                    }
                };
            },
            {
                "./util": 16
            }
        ],
        16: [
            function(t34, e25, n20) {
                (function(t35) {
                    "use strict";
                    function n21() {
                        return Object.assign ? Object.assign : function(t, e26, n22, r) {
                            for(var o = 1; o < arguments.length; o++)s(Object(arguments[o]), function(e, n) {
                                t[n] = e;
                            });
                            return t;
                        };
                    }
                    function r17() {
                        if (Object.create) return function(t, e, n, r) {
                            var o = u(arguments, 1);
                            return h.apply(this, [
                                Object.create(t)
                            ].concat(o));
                        };
                        var t36 = function() {};
                        return function(e, n, r, o) {
                            var i = u(arguments, 1);
                            return t36.prototype = e, h.apply(this, [
                                new t36
                            ].concat(i));
                        };
                    }
                    function o6() {
                        return String.prototype.trim ? function(t) {
                            return String.prototype.trim.call(t);
                        } : function(t) {
                            return t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
                        };
                    }
                    function i7(t, e) {
                        return function() {
                            return e.apply(t, Array.prototype.slice.call(arguments, 0));
                        };
                    }
                    function u(t, e) {
                        return Array.prototype.slice.call(t, e || 0);
                    }
                    function s(t37, e) {
                        c(t37, function(t, n) {
                            return e(t, n), !1;
                        });
                    }
                    function a(t38, e) {
                        var n = f(t38) ? [] : {};
                        return c(t38, function(t, r) {
                            return n[r] = e(t, r), !1;
                        }), n;
                    }
                    function c(t, e) {
                        if (f(t)) {
                            for(var n = 0; n < t.length; n++)if (e(t[n], n)) return t[n];
                        } else for(var r in t)if (t.hasOwnProperty(r) && e(t[r], r)) return t[r];
                    }
                    function f(t) {
                        return null != t && "function" != typeof t && "number" == typeof t.length;
                    }
                    function l(t) {
                        return t && "[object Function]" === ({}).toString.call(t);
                    }
                    function p(t) {
                        return t && "[object Object]" === ({}).toString.call(t);
                    }
                    var h = n21(), d = r17(), g = o6(), v = "undefined" != typeof window ? window : t35;
                    e25.exports = {
                        assign: h,
                        create: d,
                        trim: g,
                        bind: i7,
                        slice: u,
                        each: s,
                        map: a,
                        pluck: c,
                        isList: f,
                        isFunction: l,
                        isObject: p,
                        Global: v
                    };
                }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
            },
            {}
        ],
        17: [
            function(t, e, n) {
                "use strict";
                e.exports = [
                    t("./localStorage"),
                    t("./oldFF-globalStorage"),
                    t("./oldIE-userDataStorage"),
                    t("./cookieStorage"),
                    t("./sessionStorage"),
                    t("./memoryStorage")
                ];
            },
            {
                "./cookieStorage": 18,
                "./localStorage": 19,
                "./memoryStorage": 20,
                "./oldFF-globalStorage": 21,
                "./oldIE-userDataStorage": 22,
                "./sessionStorage": 23
            }
        ],
        18: [
            function(t39, e27, n23) {
                "use strict";
                function r18(t) {
                    if (!t || !a(t)) return null;
                    var e = "(?:^|.*;\\s*)" + escape(t).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*";
                    return unescape(p.cookie.replace(new RegExp(e), "$1"));
                }
                function o7(t) {
                    for(var e = p.cookie.split(/; ?/g), n = e.length - 1; n >= 0; n--)if (l(e[n])) {
                        var r = e[n].split("="), o = unescape(r[0]), i = unescape(r[1]);
                        t(i, o);
                    }
                }
                function i8(t, e) {
                    t && (p.cookie = escape(t) + "=" + escape(e) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/");
                }
                function u(t) {
                    t && a(t) && (p.cookie = escape(t) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/");
                }
                function s() {
                    o7(function(t, e) {
                        u(e);
                    });
                }
                function a(t) {
                    return new RegExp("(?:^|;\\s*)" + escape(t).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(p.cookie);
                }
                var c = t39("../src/util"), f = c.Global, l = c.trim;
                e27.exports = {
                    name: "cookieStorage",
                    read: r18,
                    write: i8,
                    each: o7,
                    remove: u,
                    clearAll: s
                };
                var p = f.document;
            },
            {
                "../src/util": 16
            }
        ],
        19: [
            function(t40, e28, n24) {
                "use strict";
                function r() {
                    return f.localStorage;
                }
                function o(t) {
                    return r().getItem(t);
                }
                function i(t, e) {
                    return r().setItem(t, e);
                }
                function u(t) {
                    for(var e = r().length - 1; e >= 0; e--){
                        var n = r().key(e);
                        t(o(n), n);
                    }
                }
                function s(t) {
                    return r().removeItem(t);
                }
                function a() {
                    return r().clear();
                }
                var c = t40("../src/util"), f = c.Global;
                e28.exports = {
                    name: "localStorage",
                    read: o,
                    write: i,
                    each: u,
                    remove: s,
                    clearAll: a
                };
            },
            {
                "../src/util": 16
            }
        ],
        20: [
            function(t41, e29, n) {
                "use strict";
                function r(t) {
                    return a[t];
                }
                function o(t, e) {
                    a[t] = e;
                }
                function i(t) {
                    for(var e in a)a.hasOwnProperty(e) && t(a[e], e);
                }
                function u(t) {
                    delete a[t];
                }
                function s(t) {
                    a = {};
                }
                e29.exports = {
                    name: "memoryStorage",
                    read: r,
                    write: o,
                    each: i,
                    remove: u,
                    clearAll: s
                };
                var a = {};
            },
            {}
        ],
        21: [
            function(t42, e30, n25) {
                "use strict";
                function r(t) {
                    return f[t];
                }
                function o(t, e) {
                    f[t] = e;
                }
                function i(t) {
                    for(var e = f.length - 1; e >= 0; e--){
                        var n = f.key(e);
                        t(f[n], n);
                    }
                }
                function u(t) {
                    return f.removeItem(t);
                }
                function s() {
                    i(function(t, e) {
                        delete f[t];
                    });
                }
                var a = t42("../src/util"), c = a.Global;
                e30.exports = {
                    name: "oldFF-globalStorage",
                    read: r,
                    write: o,
                    each: i,
                    remove: u,
                    clearAll: s
                };
                var f = c.globalStorage;
            },
            {
                "../src/util": 16
            }
        ],
        22: [
            function(t43, e31, n26) {
                "use strict";
                function r19(t44, e) {
                    if (!g) {
                        var n = a(t44);
                        d(function(t) {
                            t.setAttribute(n, e), t.save(p);
                        });
                    }
                }
                function o8(t45) {
                    if (!g) {
                        var e = a(t45), n = null;
                        return d(function(t) {
                            n = t.getAttribute(e);
                        }), n;
                    }
                }
                function i(t) {
                    d(function(e) {
                        for(var n = e.XMLDocument.documentElement.attributes, r = n.length - 1; r >= 0; r--){
                            var o = n[r];
                            t(e.getAttribute(o.name), o.name);
                        }
                    });
                }
                function u(t46) {
                    var e = a(t46);
                    d(function(t) {
                        t.removeAttribute(e), t.save(p);
                    });
                }
                function s() {
                    d(function(t) {
                        var e = t.XMLDocument.documentElement.attributes;
                        t.load(p);
                        for(var n = e.length - 1; n >= 0; n--)t.removeAttribute(e[n].name);
                        t.save(p);
                    });
                }
                function a(t) {
                    return t.replace(/^\d/, "___$&").replace(v, "___");
                }
                function c() {
                    if (!h || !h.documentElement || !h.documentElement.addBehavior) return null;
                    var t, e32, n, r20 = "script";
                    try {
                        e32 = new ActiveXObject("htmlfile"), e32.open(), e32.write("<" + r20 + ">document.w=window</" + r20 + '><iframe src="/favicon.ico"></iframe>'), e32.close(), t = e32.w.frames[0].document, n = t.createElement("div");
                    } catch (o) {
                        n = h.createElement("div"), t = h.body;
                    }
                    return function(e) {
                        var r = [].slice.call(arguments, 0);
                        r.unshift(n), t.appendChild(n), n.addBehavior("#default#userData"), n.load(p), e.apply(this, r), t.removeChild(n);
                    };
                }
                var f = t43("../src/util"), l = f.Global;
                e31.exports = {
                    name: "oldIE-userDataStorage",
                    write: r19,
                    read: o8,
                    each: i,
                    remove: u,
                    clearAll: s
                };
                var p = "storejs", h = l.document, d = c(), g = (l.navigator ? l.navigator.userAgent : "").match(/ (MSIE 8|MSIE 9|MSIE 10)\./), v = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
            },
            {
                "../src/util": 16
            }
        ],
        23: [
            function(t47, e33, n27) {
                "use strict";
                function r() {
                    return f.sessionStorage;
                }
                function o(t) {
                    return r().getItem(t);
                }
                function i(t, e) {
                    return r().setItem(t, e);
                }
                function u(t) {
                    for(var e = r().length - 1; e >= 0; e--){
                        var n = r().key(e);
                        t(o(n), n);
                    }
                }
                function s(t) {
                    return r().removeItem(t);
                }
                function a() {
                    return r().clear();
                }
                var c = t47("../src/util"), f = c.Global;
                e33.exports = {
                    name: "sessionStorage",
                    read: o,
                    write: i,
                    each: u,
                    remove: s,
                    clearAll: a
                };
            },
            {
                "../src/util": 16
            }
        ]
    }, {}, [
        1
    ])(1);
});

//# sourceMappingURL=index.8ed54333.js.map
