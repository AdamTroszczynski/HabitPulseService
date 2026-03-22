var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../node_modules/requires-port/index.js
var require_requires_port = __commonJS({
  "../node_modules/requires-port/index.js"(exports, module) {
    "use strict";
    module.exports = function required2(port, protocol) {
      protocol = protocol.split(":")[0];
      port = +port;
      if (!port) return false;
      switch (protocol) {
        case "http":
        case "ws":
          return port !== 80;
        case "https":
        case "wss":
          return port !== 443;
        case "ftp":
          return port !== 21;
        case "gopher":
          return port !== 70;
        case "file":
          return false;
      }
      return port !== 0;
    };
  }
});

// ../node_modules/querystringify/index.js
var require_querystringify = __commonJS({
  "../node_modules/querystringify/index.js"(exports) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var undef;
    function decode3(input) {
      try {
        return decodeURIComponent(input.replace(/\+/g, " "));
      } catch (e) {
        return null;
      }
    }
    function encode3(input) {
      try {
        return encodeURIComponent(input);
      } catch (e) {
        return null;
      }
    }
    function querystring(query) {
      var parser = /([^=?#&]+)=?([^&]*)/g, result = {}, part;
      while (part = parser.exec(query)) {
        var key = decode3(part[1]), value = decode3(part[2]);
        if (key === null || value === null || key in result) continue;
        result[key] = value;
      }
      return result;
    }
    function querystringify(obj, prefix) {
      prefix = prefix || "";
      var pairs = [], value, key;
      if ("string" !== typeof prefix) prefix = "?";
      for (key in obj) {
        if (has.call(obj, key)) {
          value = obj[key];
          if (!value && (value === null || value === undef || isNaN(value))) {
            value = "";
          }
          key = encode3(key);
          value = encode3(value);
          if (key === null || value === null) continue;
          pairs.push(key + "=" + value);
        }
      }
      return pairs.length ? prefix + pairs.join("&") : "";
    }
    exports.stringify = querystringify;
    exports.parse = querystring;
  }
});

// ../node_modules/url-parse/index.js
var require_url_parse = __commonJS({
  "../node_modules/url-parse/index.js"(exports, module) {
    "use strict";
    var required2 = require_requires_port();
    var qs = require_querystringify();
    var controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
    var CRHTLF = /[\n\r\t]/g;
    var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
    var port = /:\d+$/;
    var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i;
    var windowsDriveLetter = /^[a-zA-Z]:/;
    function trimLeft(str) {
      return (str ? str : "").toString().replace(controlOrWhitespace, "");
    }
    var rules = [
      ["#", "hash"],
      // Extract from the back.
      ["?", "query"],
      // Extract from the back.
      function sanitize(address, url2) {
        return isSpecial(url2.protocol) ? address.replace(/\\/g, "/") : address;
      },
      ["/", "pathname"],
      // Extract from the back.
      ["@", "auth", 1],
      // Extract from the front.
      [NaN, "host", void 0, 1, 1],
      // Set left over value.
      [/:(\d*)$/, "port", void 0, 1],
      // RegExp the back.
      [NaN, "hostname", void 0, 1, 1]
      // Set left over.
    ];
    var ignore = { hash: 1, query: 1 };
    function lolcation(loc) {
      var globalVar;
      if (typeof window !== "undefined") globalVar = window;
      else if (typeof global !== "undefined") globalVar = global;
      else if (typeof self !== "undefined") globalVar = self;
      else globalVar = {};
      var location = globalVar.location || {};
      loc = loc || location;
      var finaldestination = {}, type = typeof loc, key;
      if ("blob:" === loc.protocol) {
        finaldestination = new Url(unescape(loc.pathname), {});
      } else if ("string" === type) {
        finaldestination = new Url(loc, {});
        for (key in ignore) delete finaldestination[key];
      } else if ("object" === type) {
        for (key in loc) {
          if (key in ignore) continue;
          finaldestination[key] = loc[key];
        }
        if (finaldestination.slashes === void 0) {
          finaldestination.slashes = slashes.test(loc.href);
        }
      }
      return finaldestination;
    }
    function isSpecial(scheme) {
      return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
    }
    function extractProtocol(address, location) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      location = location || {};
      var match = protocolre.exec(address);
      var protocol = match[1] ? match[1].toLowerCase() : "";
      var forwardSlashes = !!match[2];
      var otherSlashes = !!match[3];
      var slashesCount = 0;
      var rest;
      if (forwardSlashes) {
        if (otherSlashes) {
          rest = match[2] + match[3] + match[4];
          slashesCount = match[2].length + match[3].length;
        } else {
          rest = match[2] + match[4];
          slashesCount = match[2].length;
        }
      } else {
        if (otherSlashes) {
          rest = match[3] + match[4];
          slashesCount = match[3].length;
        } else {
          rest = match[4];
        }
      }
      if (protocol === "file:") {
        if (slashesCount >= 2) {
          rest = rest.slice(2);
        }
      } else if (isSpecial(protocol)) {
        rest = match[4];
      } else if (protocol) {
        if (forwardSlashes) {
          rest = rest.slice(2);
        }
      } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
        rest = match[4];
      }
      return {
        protocol,
        slashes: forwardSlashes || isSpecial(protocol),
        slashesCount,
        rest
      };
    }
    function resolve(relative, base) {
      if (relative === "") return base;
      var path2 = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i = path2.length, last = path2[i - 1], unshift = false, up = 0;
      while (i--) {
        if (path2[i] === ".") {
          path2.splice(i, 1);
        } else if (path2[i] === "..") {
          path2.splice(i, 1);
          up++;
        } else if (up) {
          if (i === 0) unshift = true;
          path2.splice(i, 1);
          up--;
        }
      }
      if (unshift) path2.unshift("");
      if (last === "." || last === "..") path2.push("");
      return path2.join("/");
    }
    function Url(address, location, parser) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      if (!(this instanceof Url)) {
        return new Url(address, location, parser);
      }
      var relative, extracted, parse3, instruction, index, key, instructions = rules.slice(), type = typeof location, url2 = this, i = 0;
      if ("object" !== type && "string" !== type) {
        parser = location;
        location = null;
      }
      if (parser && "function" !== typeof parser) parser = qs.parse;
      location = lolcation(location);
      extracted = extractProtocol(address || "", location);
      relative = !extracted.protocol && !extracted.slashes;
      url2.slashes = extracted.slashes || relative && location.slashes;
      url2.protocol = extracted.protocol || location.protocol || "";
      address = extracted.rest;
      if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url2.protocol))) {
        instructions[3] = [/(.*)/, "pathname"];
      }
      for (; i < instructions.length; i++) {
        instruction = instructions[i];
        if (typeof instruction === "function") {
          address = instruction(address, url2);
          continue;
        }
        parse3 = instruction[0];
        key = instruction[1];
        if (parse3 !== parse3) {
          url2[key] = address;
        } else if ("string" === typeof parse3) {
          index = parse3 === "@" ? address.lastIndexOf(parse3) : address.indexOf(parse3);
          if (~index) {
            if ("number" === typeof instruction[2]) {
              url2[key] = address.slice(0, index);
              address = address.slice(index + instruction[2]);
            } else {
              url2[key] = address.slice(index);
              address = address.slice(0, index);
            }
          }
        } else if (index = parse3.exec(address)) {
          url2[key] = index[1];
          address = address.slice(0, index.index);
        }
        url2[key] = url2[key] || (relative && instruction[3] ? location[key] || "" : "");
        if (instruction[4]) url2[key] = url2[key].toLowerCase();
      }
      if (parser) url2.query = parser(url2.query);
      if (relative && location.slashes && url2.pathname.charAt(0) !== "/" && (url2.pathname !== "" || location.pathname !== "")) {
        url2.pathname = resolve(url2.pathname, location.pathname);
      }
      if (url2.pathname.charAt(0) !== "/" && isSpecial(url2.protocol)) {
        url2.pathname = "/" + url2.pathname;
      }
      if (!required2(url2.port, url2.protocol)) {
        url2.host = url2.hostname;
        url2.port = "";
      }
      url2.username = url2.password = "";
      if (url2.auth) {
        index = url2.auth.indexOf(":");
        if (~index) {
          url2.username = url2.auth.slice(0, index);
          url2.username = encodeURIComponent(decodeURIComponent(url2.username));
          url2.password = url2.auth.slice(index + 1);
          url2.password = encodeURIComponent(decodeURIComponent(url2.password));
        } else {
          url2.username = encodeURIComponent(decodeURIComponent(url2.auth));
        }
        url2.auth = url2.password ? url2.username + ":" + url2.password : url2.username;
      }
      url2.origin = url2.protocol !== "file:" && isSpecial(url2.protocol) && url2.host ? url2.protocol + "//" + url2.host : "null";
      url2.href = url2.toString();
    }
    function set2(part, value, fn) {
      var url2 = this;
      switch (part) {
        case "query":
          if ("string" === typeof value && value.length) {
            value = (fn || qs.parse)(value);
          }
          url2[part] = value;
          break;
        case "port":
          url2[part] = value;
          if (!required2(value, url2.protocol)) {
            url2.host = url2.hostname;
            url2[part] = "";
          } else if (value) {
            url2.host = url2.hostname + ":" + value;
          }
          break;
        case "hostname":
          url2[part] = value;
          if (url2.port) value += ":" + url2.port;
          url2.host = value;
          break;
        case "host":
          url2[part] = value;
          if (port.test(value)) {
            value = value.split(":");
            url2.port = value.pop();
            url2.hostname = value.join(":");
          } else {
            url2.hostname = value;
            url2.port = "";
          }
          break;
        case "protocol":
          url2.protocol = value.toLowerCase();
          url2.slashes = !fn;
          break;
        case "pathname":
        case "hash":
          if (value) {
            var char = part === "pathname" ? "/" : "#";
            url2[part] = value.charAt(0) !== char ? char + value : value;
          } else {
            url2[part] = value;
          }
          break;
        case "username":
        case "password":
          url2[part] = encodeURIComponent(value);
          break;
        case "auth":
          var index = value.indexOf(":");
          if (~index) {
            url2.username = value.slice(0, index);
            url2.username = encodeURIComponent(decodeURIComponent(url2.username));
            url2.password = value.slice(index + 1);
            url2.password = encodeURIComponent(decodeURIComponent(url2.password));
          } else {
            url2.username = encodeURIComponent(decodeURIComponent(value));
          }
      }
      for (var i = 0; i < rules.length; i++) {
        var ins = rules[i];
        if (ins[4]) url2[ins[1]] = url2[ins[1]].toLowerCase();
      }
      url2.auth = url2.password ? url2.username + ":" + url2.password : url2.username;
      url2.origin = url2.protocol !== "file:" && isSpecial(url2.protocol) && url2.host ? url2.protocol + "//" + url2.host : "null";
      url2.href = url2.toString();
      return url2;
    }
    function toString(stringify) {
      if (!stringify || "function" !== typeof stringify) stringify = qs.stringify;
      var query, url2 = this, host = url2.host, protocol = url2.protocol;
      if (protocol && protocol.charAt(protocol.length - 1) !== ":") protocol += ":";
      var result = protocol + (url2.protocol && url2.slashes || isSpecial(url2.protocol) ? "//" : "");
      if (url2.username) {
        result += url2.username;
        if (url2.password) result += ":" + url2.password;
        result += "@";
      } else if (url2.password) {
        result += ":" + url2.password;
        result += "@";
      } else if (url2.protocol !== "file:" && isSpecial(url2.protocol) && !host && url2.pathname !== "/") {
        result += "@";
      }
      if (host[host.length - 1] === ":" || port.test(url2.hostname) && !url2.port) {
        host += ":";
      }
      result += host + url2.pathname;
      query = "object" === typeof url2.query ? stringify(url2.query) : url2.query;
      if (query) result += "?" !== query.charAt(0) ? "?" + query : query;
      if (url2.hash) result += url2.hash;
      return result;
    }
    Url.prototype = { set: set2, toString };
    Url.extractProtocol = extractProtocol;
    Url.location = lolcation;
    Url.trimLeft = trimLeft;
    Url.qs = qs;
    module.exports = Url;
  }
});

// ../node_modules/buffer-more-ints/buffer-more-ints.js
var require_buffer_more_ints = __commonJS({
  "../node_modules/buffer-more-ints/buffer-more-ints.js"(exports, module) {
    "use strict";
    var SHIFT_LEFT_32 = (1 << 16) * (1 << 16);
    var SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;
    var MAX_INT = 9007199254740991;
    function isContiguousInt(val) {
      return val <= MAX_INT && val >= -MAX_INT;
    }
    function assertContiguousInt(val) {
      if (!isContiguousInt(val)) {
        throw new TypeError("number cannot be represented as a contiguous integer");
      }
    }
    module.exports.isContiguousInt = isContiguousInt;
    module.exports.assertContiguousInt = assertContiguousInt;
    ["UInt", "Int"].forEach(function(sign) {
      var suffix = sign + "8";
      module.exports["read" + suffix] = Buffer.prototype["read" + suffix].call;
      module.exports["write" + suffix] = Buffer.prototype["write" + suffix].call;
      ["16", "32"].forEach(function(size) {
        ["LE", "BE"].forEach(function(endian) {
          var suffix2 = sign + size + endian;
          var read = Buffer.prototype["read" + suffix2];
          module.exports["read" + suffix2] = function(buf, offset) {
            return read.call(buf, offset);
          };
          var write = Buffer.prototype["write" + suffix2];
          module.exports["write" + suffix2] = function(buf, val, offset) {
            return write.call(buf, val, offset);
          };
        });
      });
    });
    function check_value(val, min, max) {
      val = +val;
      if (typeof val != "number" || val < min || val > max || Math.floor(val) !== val) {
        throw new TypeError('"value" argument is out of bounds');
      }
      return val;
    }
    function check_bounds(buf, offset, len) {
      if (offset < 0 || offset + len > buf.length) {
        throw new RangeError("Index out of range");
      }
    }
    function readUInt24BE(buf, offset) {
      return buf.readUInt8(offset) << 16 | buf.readUInt16BE(offset + 1);
    }
    module.exports.readUInt24BE = readUInt24BE;
    function writeUInt24BE(buf, val, offset) {
      val = check_value(val, 0, 16777215);
      check_bounds(buf, offset, 3);
      buf.writeUInt8(val >>> 16, offset);
      buf.writeUInt16BE(val & 65535, offset + 1);
    }
    module.exports.writeUInt24BE = writeUInt24BE;
    function readUInt40BE(buf, offset) {
      return (buf.readUInt8(offset) || 0) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 1);
    }
    module.exports.readUInt40BE = readUInt40BE;
    function writeUInt40BE(buf, val, offset) {
      val = check_value(val, 0, 1099511627775);
      check_bounds(buf, offset, 5);
      buf.writeUInt8(Math.floor(val * SHIFT_RIGHT_32), offset);
      buf.writeInt32BE(val & -1, offset + 1);
    }
    module.exports.writeUInt40BE = writeUInt40BE;
    function readUInt48BE(buf, offset) {
      return buf.readUInt16BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 2);
    }
    module.exports.readUInt48BE = readUInt48BE;
    function writeUInt48BE(buf, val, offset) {
      val = check_value(val, 0, 281474976710655);
      check_bounds(buf, offset, 6);
      buf.writeUInt16BE(Math.floor(val * SHIFT_RIGHT_32), offset);
      buf.writeInt32BE(val & -1, offset + 2);
    }
    module.exports.writeUInt48BE = writeUInt48BE;
    function readUInt56BE(buf, offset) {
      return ((buf.readUInt8(offset) || 0) << 16 | buf.readUInt16BE(offset + 1)) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 3);
    }
    module.exports.readUInt56BE = readUInt56BE;
    function writeUInt56BE(buf, val, offset) {
      val = check_value(val, 0, 72057594037927940);
      check_bounds(buf, offset, 7);
      if (val < 72057594037927940) {
        var hi = Math.floor(val * SHIFT_RIGHT_32);
        buf.writeUInt8(hi >>> 16, offset);
        buf.writeUInt16BE(hi & 65535, offset + 1);
        buf.writeInt32BE(val & -1, offset + 3);
      } else {
        buf[offset] = 255;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
      }
    }
    module.exports.writeUInt56BE = writeUInt56BE;
    function readUInt64BE(buf, offset) {
      return buf.readUInt32BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 4);
    }
    module.exports.readUInt64BE = readUInt64BE;
    function writeUInt64BE(buf, val, offset) {
      val = check_value(val, 0, 18446744073709552e3);
      check_bounds(buf, offset, 8);
      if (val < 18446744073709552e3) {
        buf.writeUInt32BE(Math.floor(val * SHIFT_RIGHT_32), offset);
        buf.writeInt32BE(val & -1, offset + 4);
      } else {
        buf[offset] = 255;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
        buf[offset + 7] = 255;
      }
    }
    module.exports.writeUInt64BE = writeUInt64BE;
    function readUInt24LE(buf, offset) {
      return buf.readUInt8(offset + 2) << 16 | buf.readUInt16LE(offset);
    }
    module.exports.readUInt24LE = readUInt24LE;
    function writeUInt24LE(buf, val, offset) {
      val = check_value(val, 0, 16777215);
      check_bounds(buf, offset, 3);
      buf.writeUInt16LE(val & 65535, offset);
      buf.writeUInt8(val >>> 16, offset + 2);
    }
    module.exports.writeUInt24LE = writeUInt24LE;
    function readUInt40LE(buf, offset) {
      return (buf.readUInt8(offset + 4) || 0) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module.exports.readUInt40LE = readUInt40LE;
    function writeUInt40LE(buf, val, offset) {
      val = check_value(val, 0, 1099511627775);
      check_bounds(buf, offset, 5);
      buf.writeInt32LE(val & -1, offset);
      buf.writeUInt8(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
    }
    module.exports.writeUInt40LE = writeUInt40LE;
    function readUInt48LE(buf, offset) {
      return buf.readUInt16LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module.exports.readUInt48LE = readUInt48LE;
    function writeUInt48LE(buf, val, offset) {
      val = check_value(val, 0, 281474976710655);
      check_bounds(buf, offset, 6);
      buf.writeInt32LE(val & -1, offset);
      buf.writeUInt16LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
    }
    module.exports.writeUInt48LE = writeUInt48LE;
    function readUInt56LE(buf, offset) {
      return ((buf.readUInt8(offset + 6) || 0) << 16 | buf.readUInt16LE(offset + 4)) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module.exports.readUInt56LE = readUInt56LE;
    function writeUInt56LE(buf, val, offset) {
      val = check_value(val, 0, 72057594037927940);
      check_bounds(buf, offset, 7);
      if (val < 72057594037927940) {
        buf.writeInt32LE(val & -1, offset);
        var hi = Math.floor(val * SHIFT_RIGHT_32);
        buf.writeUInt16LE(hi & 65535, offset + 4);
        buf.writeUInt8(hi >>> 16, offset + 6);
      } else {
        buf[offset] = 255;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
      }
    }
    module.exports.writeUInt56LE = writeUInt56LE;
    function readUInt64LE(buf, offset) {
      return buf.readUInt32LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module.exports.readUInt64LE = readUInt64LE;
    function writeUInt64LE(buf, val, offset) {
      val = check_value(val, 0, 18446744073709552e3);
      check_bounds(buf, offset, 8);
      if (val < 18446744073709552e3) {
        buf.writeInt32LE(val & -1, offset);
        buf.writeUInt32LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
      } else {
        buf[offset] = 255;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
        buf[offset + 7] = 255;
      }
    }
    module.exports.writeUInt64LE = writeUInt64LE;
    function readInt24BE(buf, offset) {
      return (buf.readInt8(offset) << 16) + buf.readUInt16BE(offset + 1);
    }
    module.exports.readInt24BE = readInt24BE;
    function writeInt24BE(buf, val, offset) {
      val = check_value(val, -8388608, 8388607);
      check_bounds(buf, offset, 3);
      buf.writeInt8(val >> 16, offset);
      buf.writeUInt16BE(val & 65535, offset + 1);
    }
    module.exports.writeInt24BE = writeInt24BE;
    function readInt40BE(buf, offset) {
      return (buf.readInt8(offset) || 0) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 1);
    }
    module.exports.readInt40BE = readInt40BE;
    function writeInt40BE(buf, val, offset) {
      val = check_value(val, -549755813888, 549755813887);
      check_bounds(buf, offset, 5);
      buf.writeInt8(Math.floor(val * SHIFT_RIGHT_32), offset);
      buf.writeInt32BE(val & -1, offset + 1);
    }
    module.exports.writeInt40BE = writeInt40BE;
    function readInt48BE(buf, offset) {
      return buf.readInt16BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 2);
    }
    module.exports.readInt48BE = readInt48BE;
    function writeInt48BE(buf, val, offset) {
      val = check_value(val, -140737488355328, 140737488355327);
      check_bounds(buf, offset, 6);
      buf.writeInt16BE(Math.floor(val * SHIFT_RIGHT_32), offset);
      buf.writeInt32BE(val & -1, offset + 2);
    }
    module.exports.writeInt48BE = writeInt48BE;
    function readInt56BE(buf, offset) {
      return (((buf.readInt8(offset) || 0) << 16) + buf.readUInt16BE(offset + 1)) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 3);
    }
    module.exports.readInt56BE = readInt56BE;
    function writeInt56BE(buf, val, offset) {
      val = check_value(val, -576460752303423500, 36028797018963970);
      check_bounds(buf, offset, 7);
      if (val < 36028797018963970) {
        var hi = Math.floor(val * SHIFT_RIGHT_32);
        buf.writeInt8(hi >> 16, offset);
        buf.writeUInt16BE(hi & 65535, offset + 1);
        buf.writeInt32BE(val & -1, offset + 3);
      } else {
        buf[offset] = 127;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
      }
    }
    module.exports.writeInt56BE = writeInt56BE;
    function readInt64BE(buf, offset) {
      return buf.readInt32BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 4);
    }
    module.exports.readInt64BE = readInt64BE;
    function writeInt64BE(buf, val, offset) {
      val = check_value(val, -23611832414348226e5, 9223372036854776e3);
      check_bounds(buf, offset, 8);
      if (val < 9223372036854776e3) {
        buf.writeInt32BE(Math.floor(val * SHIFT_RIGHT_32), offset);
        buf.writeInt32BE(val & -1, offset + 4);
      } else {
        buf[offset] = 127;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
        buf[offset + 7] = 255;
      }
    }
    module.exports.writeInt64BE = writeInt64BE;
    function readInt24LE(buf, offset) {
      return (buf.readInt8(offset + 2) << 16) + buf.readUInt16LE(offset);
    }
    module.exports.readInt24LE = readInt24LE;
    function writeInt24LE(buf, val, offset) {
      val = check_value(val, -8388608, 8388607);
      check_bounds(buf, offset, 3);
      buf.writeUInt16LE(val & 65535, offset);
      buf.writeInt8(val >> 16, offset + 2);
    }
    module.exports.writeInt24LE = writeInt24LE;
    function readInt40LE(buf, offset) {
      return (buf.readInt8(offset + 4) || 0) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module.exports.readInt40LE = readInt40LE;
    function writeInt40LE(buf, val, offset) {
      val = check_value(val, -549755813888, 549755813887);
      check_bounds(buf, offset, 5);
      buf.writeInt32LE(val & -1, offset);
      buf.writeInt8(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
    }
    module.exports.writeInt40LE = writeInt40LE;
    function readInt48LE(buf, offset) {
      return buf.readInt16LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module.exports.readInt48LE = readInt48LE;
    function writeInt48LE(buf, val, offset) {
      val = check_value(val, -140737488355328, 140737488355327);
      check_bounds(buf, offset, 6);
      buf.writeInt32LE(val & -1, offset);
      buf.writeInt16LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
    }
    module.exports.writeInt48LE = writeInt48LE;
    function readInt56LE(buf, offset) {
      return (((buf.readInt8(offset + 6) || 0) << 16) + buf.readUInt16LE(offset + 4)) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module.exports.readInt56LE = readInt56LE;
    function writeInt56LE(buf, val, offset) {
      val = check_value(val, -36028797018963970, 36028797018963970);
      check_bounds(buf, offset, 7);
      if (val < 36028797018963970) {
        buf.writeInt32LE(val & -1, offset);
        var hi = Math.floor(val * SHIFT_RIGHT_32);
        buf.writeUInt16LE(hi & 65535, offset + 4);
        buf.writeInt8(hi >> 16, offset + 6);
      } else {
        buf[offset] = 255;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 127;
      }
    }
    module.exports.writeInt56LE = writeInt56LE;
    function readInt64LE(buf, offset) {
      return buf.readInt32LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module.exports.readInt64LE = readInt64LE;
    function writeInt64LE(buf, val, offset) {
      val = check_value(val, -9223372036854776e3, 9223372036854776e3);
      check_bounds(buf, offset, 8);
      if (val < 9223372036854776e3) {
        buf.writeInt32LE(val & -1, offset);
        buf.writeInt32LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
      } else {
        buf[offset] = 255;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
        buf[offset + 7] = 127;
      }
    }
    module.exports.writeInt64LE = writeInt64LE;
  }
});

// ../node_modules/amqplib/lib/codec.js
var require_codec = __commonJS({
  "../node_modules/amqplib/lib/codec.js"(exports, module) {
    "use strict";
    var ints = require_buffer_more_ints();
    function isFloatingPoint(n) {
      return n >= 9223372036854776e3 || Math.abs(n) < 1125899906842624 && Math.floor(n) !== n;
    }
    function encodeTable(buffer, val, offset) {
      var start = offset;
      offset += 4;
      for (var key in val) {
        if (val[key] !== void 0) {
          var len = Buffer.byteLength(key);
          buffer.writeUInt8(len, offset);
          offset++;
          buffer.write(key, offset, "utf8");
          offset += len;
          offset += encodeFieldValue(buffer, val[key], offset);
        }
      }
      var size = offset - start;
      buffer.writeUInt32BE(size - 4, start);
      return size;
    }
    function encodeArray(buffer, val, offset) {
      var start = offset;
      offset += 4;
      for (var i = 0, num = val.length; i < num; i++) {
        offset += encodeFieldValue(buffer, val[i], offset);
      }
      var size = offset - start;
      buffer.writeUInt32BE(size - 4, start);
      return size;
    }
    function encodeFieldValue(buffer, value, offset) {
      var start = offset;
      var type = typeof value, val = value;
      if (value && type === "object" && value.hasOwnProperty("!")) {
        val = value.value;
        type = value["!"];
      }
      if (type == "number") {
        if (isFloatingPoint(val)) {
          type = "double";
        } else {
          if (val < 128 && val >= -128) {
            type = "byte";
          } else if (val >= -32768 && val < 32768) {
            type = "short";
          } else if (val >= -2147483648 && val < 2147483648) {
            type = "int";
          } else {
            type = "long";
          }
        }
      }
      function tag(t) {
        buffer.write(t, offset);
        offset++;
      }
      switch (type) {
        case "string":
          var len = Buffer.byteLength(val, "utf8");
          tag("S");
          buffer.writeUInt32BE(len, offset);
          offset += 4;
          buffer.write(val, offset, "utf8");
          offset += len;
          break;
        case "object":
          if (val === null) {
            tag("V");
          } else if (Array.isArray(val)) {
            tag("A");
            offset += encodeArray(buffer, val, offset);
          } else if (Buffer.isBuffer(val)) {
            tag("x");
            buffer.writeUInt32BE(val.length, offset);
            offset += 4;
            val.copy(buffer, offset);
            offset += val.length;
          } else {
            tag("F");
            offset += encodeTable(buffer, val, offset);
          }
          break;
        case "boolean":
          tag("t");
          buffer.writeUInt8(val ? 1 : 0, offset);
          offset++;
          break;
        // These are the types that are either guessed above, or
        // explicitly given using the {'!': type} notation.
        case "double":
        case "float64":
          tag("d");
          buffer.writeDoubleBE(val, offset);
          offset += 8;
          break;
        case "byte":
        case "int8":
          tag("b");
          buffer.writeInt8(val, offset);
          offset++;
          break;
        case "unsignedbyte":
        case "uint8":
          tag("B");
          buffer.writeUInt8(val, offset);
          offset++;
          break;
        case "short":
        case "int16":
          tag("s");
          buffer.writeInt16BE(val, offset);
          offset += 2;
          break;
        case "unsignedshort":
        case "uint16":
          tag("u");
          buffer.writeUInt16BE(val, offset);
          offset += 2;
          break;
        case "int":
        case "int32":
          tag("I");
          buffer.writeInt32BE(val, offset);
          offset += 4;
          break;
        case "unsignedint":
        case "uint32":
          tag("i");
          buffer.writeUInt32BE(val, offset);
          offset += 4;
          break;
        case "long":
        case "int64":
          tag("l");
          ints.writeInt64BE(buffer, val, offset);
          offset += 8;
          break;
        // Now for exotic types, those can _only_ be denoted by using
        // `{'!': type, value: val}
        case "timestamp":
          tag("T");
          ints.writeUInt64BE(buffer, val, offset);
          offset += 8;
          break;
        case "float":
          tag("f");
          buffer.writeFloatBE(val, offset);
          offset += 4;
          break;
        case "decimal":
          tag("D");
          if (val.hasOwnProperty("places") && val.hasOwnProperty("digits") && val.places >= 0 && val.places < 256) {
            buffer[offset] = val.places;
            offset++;
            buffer.writeUInt32BE(val.digits, offset);
            offset += 4;
          } else throw new TypeError(
            "Decimal value must be {'places': 0..255, 'digits': uint32}, got " + JSON.stringify(val)
          );
          break;
        default:
          throw new TypeError("Unknown type to encode: " + type);
      }
      return offset - start;
    }
    function decodeFields(slice) {
      var fields = {}, offset = 0, size = slice.length;
      var len, key, val;
      function decodeFieldValue() {
        var tag = String.fromCharCode(slice[offset]);
        offset++;
        switch (tag) {
          case "b":
            val = slice.readInt8(offset);
            offset++;
            break;
          case "B":
            val = slice.readUInt8(offset);
            offset++;
            break;
          case "S":
            len = slice.readUInt32BE(offset);
            offset += 4;
            val = slice.toString("utf8", offset, offset + len);
            offset += len;
            break;
          case "I":
            val = slice.readInt32BE(offset);
            offset += 4;
            break;
          case "i":
            val = slice.readUInt32BE(offset);
            offset += 4;
            break;
          case "D":
            var places = slice[offset];
            offset++;
            var digits = slice.readUInt32BE(offset);
            offset += 4;
            val = { "!": "decimal", value: { places, digits } };
            break;
          case "T":
            val = ints.readUInt64BE(slice, offset);
            offset += 8;
            val = { "!": "timestamp", value: val };
            break;
          case "F":
            len = slice.readUInt32BE(offset);
            offset += 4;
            val = decodeFields(slice.subarray(offset, offset + len));
            offset += len;
            break;
          case "A":
            len = slice.readUInt32BE(offset);
            offset += 4;
            decodeArray(offset + len);
            break;
          case "d":
            val = slice.readDoubleBE(offset);
            offset += 8;
            break;
          case "f":
            val = slice.readFloatBE(offset);
            offset += 4;
            break;
          case "l":
            val = ints.readInt64BE(slice, offset);
            offset += 8;
            break;
          case "s":
            val = slice.readInt16BE(offset);
            offset += 2;
            break;
          case "u":
            val = slice.readUInt16BE(offset);
            offset += 2;
            break;
          case "t":
            val = slice[offset] != 0;
            offset++;
            break;
          case "V":
            val = null;
            break;
          case "x":
            len = slice.readUInt32BE(offset);
            offset += 4;
            val = slice.subarray(offset, offset + len);
            offset += len;
            break;
          default:
            throw new TypeError('Unexpected type tag "' + tag + '"');
        }
      }
      function decodeArray(until) {
        var vals = [];
        while (offset < until) {
          decodeFieldValue();
          vals.push(val);
        }
        val = vals;
      }
      while (offset < size) {
        len = slice.readUInt8(offset);
        offset++;
        key = slice.toString("utf8", offset, offset + len);
        offset += len;
        decodeFieldValue();
        fields[key] = val;
      }
      return fields;
    }
    module.exports.encodeTable = encodeTable;
    module.exports.decodeFields = decodeFields;
  }
});

// ../node_modules/amqplib/lib/defs.js
var require_defs = __commonJS({
  "../node_modules/amqplib/lib/defs.js"(exports, module) {
    "use strict";
    function decodeBasicQos(buffer) {
      var val, offset = 0, fields = {
        prefetchSize: void 0,
        prefetchCount: void 0,
        global: void 0
      };
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.prefetchSize = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.prefetchCount = val;
      val = !!(1 & buffer[offset]);
      fields.global = val;
      return fields;
    }
    function encodeBasicQos(channel2, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(19);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3932170, 7);
      offset = 11;
      val = fields.prefetchSize;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'prefetchSize' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      val = fields.prefetchCount;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'prefetchCount' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.global;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicQosOk(buffer) {
      return {};
    }
    function encodeBasicQosOk(channel2, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3932171, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicConsume(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        consumerTag: void 0,
        noLocal: void 0,
        noAck: void 0,
        exclusive: void 0,
        nowait: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.consumerTag = val;
      val = !!(1 & buffer[offset]);
      fields.noLocal = val;
      val = !!(2 & buffer[offset]);
      fields.noAck = val;
      val = !!(4 & buffer[offset]);
      fields.exclusive = val;
      val = !!(8 & buffer[offset]);
      fields.nowait = val;
      offset++;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.subarray(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeBasicConsume(channel2, fields) {
      var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
      val = fields.queue;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      val = fields.consumerTag;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
      var consumerTag_len = Buffer.byteLength(val, "utf8");
      varyingSize += consumerTag_len;
      val = fields.arguments;
      if (void 0 === val) val = {};
      else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(17 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3932180, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.consumerTag;
      void 0 === val && (val = "");
      buffer[offset] = consumerTag_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += consumerTag_len;
      val = fields.noLocal;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.noAck;
      void 0 === val && (val = false);
      val && (bits += 2);
      val = fields.exclusive;
      void 0 === val && (val = false);
      val && (bits += 4);
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 8);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicConsumeOk(buffer) {
      var val, len, offset = 0, fields = {
        consumerTag: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.consumerTag = val;
      return fields;
    }
    function encodeBasicConsumeOk(channel2, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.consumerTag;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'consumerTag'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
      var consumerTag_len = Buffer.byteLength(val, "utf8");
      varyingSize += consumerTag_len;
      var buffer = Buffer.alloc(13 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3932181, 7);
      offset = 11;
      val = fields.consumerTag;
      void 0 === val && (val = void 0);
      buffer[offset] = consumerTag_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += consumerTag_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicCancel(buffer) {
      var val, len, offset = 0, fields = {
        consumerTag: void 0,
        nowait: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.consumerTag = val;
      val = !!(1 & buffer[offset]);
      fields.nowait = val;
      return fields;
    }
    function encodeBasicCancel(channel2, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.consumerTag;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'consumerTag'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
      var consumerTag_len = Buffer.byteLength(val, "utf8");
      varyingSize += consumerTag_len;
      var buffer = Buffer.alloc(14 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3932190, 7);
      offset = 11;
      val = fields.consumerTag;
      void 0 === val && (val = void 0);
      buffer[offset] = consumerTag_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += consumerTag_len;
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicCancelOk(buffer) {
      var val, len, offset = 0, fields = {
        consumerTag: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.consumerTag = val;
      return fields;
    }
    function encodeBasicCancelOk(channel2, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.consumerTag;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'consumerTag'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
      var consumerTag_len = Buffer.byteLength(val, "utf8");
      varyingSize += consumerTag_len;
      var buffer = Buffer.alloc(13 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3932191, 7);
      offset = 11;
      val = fields.consumerTag;
      void 0 === val && (val = void 0);
      buffer[offset] = consumerTag_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += consumerTag_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicPublish(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        exchange: void 0,
        routingKey: void 0,
        mandatory: void 0,
        immediate: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      val = !!(1 & buffer[offset]);
      fields.mandatory = val;
      val = !!(2 & buffer[offset]);
      fields.immediate = val;
      return fields;
    }
    function encodeBasicPublish(channel2, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.exchange;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.routingKey;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      var buffer = Buffer.alloc(17 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3932200, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.exchange;
      void 0 === val && (val = "");
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.routingKey;
      void 0 === val && (val = "");
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      val = fields.mandatory;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.immediate;
      void 0 === val && (val = false);
      val && (bits += 2);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicReturn(buffer) {
      var val, len, offset = 0, fields = {
        replyCode: void 0,
        replyText: void 0,
        exchange: void 0,
        routingKey: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.replyCode = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.replyText = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      return fields;
    }
    function encodeBasicReturn(channel2, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.replyText;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'replyText' is the wrong type; must be a string (up to 255 chars)");
      var replyText_len = Buffer.byteLength(val, "utf8");
      varyingSize += replyText_len;
      val = fields.exchange;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.routingKey;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'routingKey'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      var buffer = Buffer.alloc(17 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3932210, 7);
      offset = 11;
      val = fields.replyCode;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'replyCode'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'replyCode' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.replyText;
      void 0 === val && (val = "");
      buffer[offset] = replyText_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += replyText_len;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.routingKey;
      void 0 === val && (val = void 0);
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicDeliver(buffer) {
      var val, len, offset = 0, fields = {
        consumerTag: void 0,
        deliveryTag: void 0,
        redelivered: void 0,
        exchange: void 0,
        routingKey: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.consumerTag = val;
      val = ints.readUInt64BE(buffer, offset);
      offset += 8;
      fields.deliveryTag = val;
      val = !!(1 & buffer[offset]);
      fields.redelivered = val;
      offset++;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      return fields;
    }
    function encodeBasicDeliver(channel2, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.consumerTag;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'consumerTag'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
      var consumerTag_len = Buffer.byteLength(val, "utf8");
      varyingSize += consumerTag_len;
      val = fields.exchange;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.routingKey;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'routingKey'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      var buffer = Buffer.alloc(24 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3932220, 7);
      offset = 11;
      val = fields.consumerTag;
      void 0 === val && (val = void 0);
      buffer[offset] = consumerTag_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += consumerTag_len;
      val = fields.deliveryTag;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'deliveryTag'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
      ints.writeUInt64BE(buffer, val, offset);
      offset += 8;
      val = fields.redelivered;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.routingKey;
      void 0 === val && (val = void 0);
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicGet(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        noAck: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      val = !!(1 & buffer[offset]);
      fields.noAck = val;
      return fields;
    }
    function encodeBasicGet(channel2, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.queue;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3932230, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.noAck;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicGetOk(buffer) {
      var val, len, offset = 0, fields = {
        deliveryTag: void 0,
        redelivered: void 0,
        exchange: void 0,
        routingKey: void 0,
        messageCount: void 0
      };
      val = ints.readUInt64BE(buffer, offset);
      offset += 8;
      fields.deliveryTag = val;
      val = !!(1 & buffer[offset]);
      fields.redelivered = val;
      offset++;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.messageCount = val;
      return fields;
    }
    function encodeBasicGetOk(channel2, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.exchange;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.routingKey;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'routingKey'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      var buffer = Buffer.alloc(27 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3932231, 7);
      offset = 11;
      val = fields.deliveryTag;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'deliveryTag'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
      ints.writeUInt64BE(buffer, val, offset);
      offset += 8;
      val = fields.redelivered;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.routingKey;
      void 0 === val && (val = void 0);
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      val = fields.messageCount;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'messageCount'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicGetEmpty(buffer) {
      var val, len, offset = 0, fields = {
        clusterId: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.clusterId = val;
      return fields;
    }
    function encodeBasicGetEmpty(channel2, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.clusterId;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'clusterId' is the wrong type; must be a string (up to 255 chars)");
      var clusterId_len = Buffer.byteLength(val, "utf8");
      varyingSize += clusterId_len;
      var buffer = Buffer.alloc(13 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3932232, 7);
      offset = 11;
      val = fields.clusterId;
      void 0 === val && (val = "");
      buffer[offset] = clusterId_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += clusterId_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicAck(buffer) {
      var val, offset = 0, fields = {
        deliveryTag: void 0,
        multiple: void 0
      };
      val = ints.readUInt64BE(buffer, offset);
      offset += 8;
      fields.deliveryTag = val;
      val = !!(1 & buffer[offset]);
      fields.multiple = val;
      return fields;
    }
    function encodeBasicAck(channel2, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(21);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3932240, 7);
      offset = 11;
      val = fields.deliveryTag;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
      ints.writeUInt64BE(buffer, val, offset);
      offset += 8;
      val = fields.multiple;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicReject(buffer) {
      var val, offset = 0, fields = {
        deliveryTag: void 0,
        requeue: void 0
      };
      val = ints.readUInt64BE(buffer, offset);
      offset += 8;
      fields.deliveryTag = val;
      val = !!(1 & buffer[offset]);
      fields.requeue = val;
      return fields;
    }
    function encodeBasicReject(channel2, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(21);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3932250, 7);
      offset = 11;
      val = fields.deliveryTag;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'deliveryTag'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
      ints.writeUInt64BE(buffer, val, offset);
      offset += 8;
      val = fields.requeue;
      void 0 === val && (val = true);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicRecoverAsync(buffer) {
      var val, fields = {
        requeue: void 0
      };
      val = !!(1 & buffer[0]);
      fields.requeue = val;
      return fields;
    }
    function encodeBasicRecoverAsync(channel2, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3932260, 7);
      offset = 11;
      val = fields.requeue;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicRecover(buffer) {
      var val, fields = {
        requeue: void 0
      };
      val = !!(1 & buffer[0]);
      fields.requeue = val;
      return fields;
    }
    function encodeBasicRecover(channel2, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3932270, 7);
      offset = 11;
      val = fields.requeue;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicRecoverOk(buffer) {
      return {};
    }
    function encodeBasicRecoverOk(channel2, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3932271, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicNack(buffer) {
      var val, offset = 0, fields = {
        deliveryTag: void 0,
        multiple: void 0,
        requeue: void 0
      };
      val = ints.readUInt64BE(buffer, offset);
      offset += 8;
      fields.deliveryTag = val;
      val = !!(1 & buffer[offset]);
      fields.multiple = val;
      val = !!(2 & buffer[offset]);
      fields.requeue = val;
      return fields;
    }
    function encodeBasicNack(channel2, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(21);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3932280, 7);
      offset = 11;
      val = fields.deliveryTag;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
      ints.writeUInt64BE(buffer, val, offset);
      offset += 8;
      val = fields.multiple;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.requeue;
      void 0 === val && (val = true);
      val && (bits += 2);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionStart(buffer) {
      var val, len, offset = 0, fields = {
        versionMajor: void 0,
        versionMinor: void 0,
        serverProperties: void 0,
        mechanisms: void 0,
        locales: void 0
      };
      val = buffer[offset];
      offset++;
      fields.versionMajor = val;
      val = buffer[offset];
      offset++;
      fields.versionMinor = val;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.subarray(offset, offset + len));
      offset += len;
      fields.serverProperties = val;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.subarray(offset, offset + len);
      offset += len;
      fields.mechanisms = val;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.subarray(offset, offset + len);
      offset += len;
      fields.locales = val;
      return fields;
    }
    function encodeConnectionStart(channel2, fields) {
      var len, offset = 0, val = null, varyingSize = 0, scratchOffset = 0;
      val = fields.serverProperties;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'serverProperties'");
      if ("object" != typeof val) throw new TypeError("Field 'serverProperties' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var serverProperties_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += serverProperties_encoded.length;
      val = fields.mechanisms;
      if (void 0 === val) val = Buffer.from("PLAIN");
      else if (!Buffer.isBuffer(val)) throw new TypeError("Field 'mechanisms' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      val = fields.locales;
      if (void 0 === val) val = Buffer.from("en_US");
      else if (!Buffer.isBuffer(val)) throw new TypeError("Field 'locales' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      var buffer = Buffer.alloc(22 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(655370, 7);
      offset = 11;
      val = fields.versionMajor;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'versionMajor' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt8(val, offset);
      offset++;
      val = fields.versionMinor;
      if (void 0 === val) val = 9;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'versionMinor' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt8(val, offset);
      offset++;
      offset += serverProperties_encoded.copy(buffer, offset);
      val = fields.mechanisms;
      void 0 === val && (val = Buffer.from("PLAIN"));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      val = fields.locales;
      void 0 === val && (val = Buffer.from("en_US"));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionStartOk(buffer) {
      var val, len, offset = 0, fields = {
        clientProperties: void 0,
        mechanism: void 0,
        response: void 0,
        locale: void 0
      };
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.subarray(offset, offset + len));
      offset += len;
      fields.clientProperties = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.mechanism = val;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.subarray(offset, offset + len);
      offset += len;
      fields.response = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.locale = val;
      return fields;
    }
    function encodeConnectionStartOk(channel2, fields) {
      var len, offset = 0, val = null, varyingSize = 0, scratchOffset = 0;
      val = fields.clientProperties;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'clientProperties'");
      if ("object" != typeof val) throw new TypeError("Field 'clientProperties' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var clientProperties_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += clientProperties_encoded.length;
      val = fields.mechanism;
      if (void 0 === val) val = "PLAIN";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'mechanism' is the wrong type; must be a string (up to 255 chars)");
      var mechanism_len = Buffer.byteLength(val, "utf8");
      varyingSize += mechanism_len;
      val = fields.response;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'response'");
      if (!Buffer.isBuffer(val)) throw new TypeError("Field 'response' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      val = fields.locale;
      if (void 0 === val) val = "en_US";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'locale' is the wrong type; must be a string (up to 255 chars)");
      var locale_len = Buffer.byteLength(val, "utf8");
      varyingSize += locale_len;
      var buffer = Buffer.alloc(18 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(655371, 7);
      offset = 11;
      offset += clientProperties_encoded.copy(buffer, offset);
      val = fields.mechanism;
      void 0 === val && (val = "PLAIN");
      buffer[offset] = mechanism_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += mechanism_len;
      val = fields.response;
      void 0 === val && (val = Buffer.from(void 0));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      val = fields.locale;
      void 0 === val && (val = "en_US");
      buffer[offset] = locale_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += locale_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionSecure(buffer) {
      var val, len, offset = 0, fields = {
        challenge: void 0
      };
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.subarray(offset, offset + len);
      offset += len;
      fields.challenge = val;
      return fields;
    }
    function encodeConnectionSecure(channel2, fields) {
      var len, offset = 0, val = null, varyingSize = 0;
      val = fields.challenge;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'challenge'");
      if (!Buffer.isBuffer(val)) throw new TypeError("Field 'challenge' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(655380, 7);
      offset = 11;
      val = fields.challenge;
      void 0 === val && (val = Buffer.from(void 0));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionSecureOk(buffer) {
      var val, len, offset = 0, fields = {
        response: void 0
      };
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.subarray(offset, offset + len);
      offset += len;
      fields.response = val;
      return fields;
    }
    function encodeConnectionSecureOk(channel2, fields) {
      var len, offset = 0, val = null, varyingSize = 0;
      val = fields.response;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'response'");
      if (!Buffer.isBuffer(val)) throw new TypeError("Field 'response' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(655381, 7);
      offset = 11;
      val = fields.response;
      void 0 === val && (val = Buffer.from(void 0));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionTune(buffer) {
      var val, offset = 0, fields = {
        channelMax: void 0,
        frameMax: void 0,
        heartbeat: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.channelMax = val;
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.frameMax = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.heartbeat = val;
      return fields;
    }
    function encodeConnectionTune(channel2, fields) {
      var offset = 0, val = null, buffer = Buffer.alloc(20);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(655390, 7);
      offset = 11;
      val = fields.channelMax;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'channelMax' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.frameMax;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'frameMax' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      val = fields.heartbeat;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'heartbeat' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionTuneOk(buffer) {
      var val, offset = 0, fields = {
        channelMax: void 0,
        frameMax: void 0,
        heartbeat: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.channelMax = val;
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.frameMax = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.heartbeat = val;
      return fields;
    }
    function encodeConnectionTuneOk(channel2, fields) {
      var offset = 0, val = null, buffer = Buffer.alloc(20);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(655391, 7);
      offset = 11;
      val = fields.channelMax;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'channelMax' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.frameMax;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'frameMax' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      val = fields.heartbeat;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'heartbeat' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionOpen(buffer) {
      var val, len, offset = 0, fields = {
        virtualHost: void 0,
        capabilities: void 0,
        insist: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.virtualHost = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.capabilities = val;
      val = !!(1 & buffer[offset]);
      fields.insist = val;
      return fields;
    }
    function encodeConnectionOpen(channel2, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.virtualHost;
      if (void 0 === val) val = "/";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'virtualHost' is the wrong type; must be a string (up to 255 chars)");
      var virtualHost_len = Buffer.byteLength(val, "utf8");
      varyingSize += virtualHost_len;
      val = fields.capabilities;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'capabilities' is the wrong type; must be a string (up to 255 chars)");
      var capabilities_len = Buffer.byteLength(val, "utf8");
      varyingSize += capabilities_len;
      var buffer = Buffer.alloc(15 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(655400, 7);
      offset = 11;
      val = fields.virtualHost;
      void 0 === val && (val = "/");
      buffer[offset] = virtualHost_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += virtualHost_len;
      val = fields.capabilities;
      void 0 === val && (val = "");
      buffer[offset] = capabilities_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += capabilities_len;
      val = fields.insist;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionOpenOk(buffer) {
      var val, len, offset = 0, fields = {
        knownHosts: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.knownHosts = val;
      return fields;
    }
    function encodeConnectionOpenOk(channel2, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.knownHosts;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'knownHosts' is the wrong type; must be a string (up to 255 chars)");
      var knownHosts_len = Buffer.byteLength(val, "utf8");
      varyingSize += knownHosts_len;
      var buffer = Buffer.alloc(13 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(655401, 7);
      offset = 11;
      val = fields.knownHosts;
      void 0 === val && (val = "");
      buffer[offset] = knownHosts_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += knownHosts_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionClose(buffer) {
      var val, len, offset = 0, fields = {
        replyCode: void 0,
        replyText: void 0,
        classId: void 0,
        methodId: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.replyCode = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.replyText = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.classId = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.methodId = val;
      return fields;
    }
    function encodeConnectionClose(channel2, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.replyText;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'replyText' is the wrong type; must be a string (up to 255 chars)");
      var replyText_len = Buffer.byteLength(val, "utf8");
      varyingSize += replyText_len;
      var buffer = Buffer.alloc(19 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(655410, 7);
      offset = 11;
      val = fields.replyCode;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'replyCode'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'replyCode' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.replyText;
      void 0 === val && (val = "");
      buffer[offset] = replyText_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += replyText_len;
      val = fields.classId;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'classId'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'classId' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.methodId;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'methodId'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'methodId' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionCloseOk(buffer) {
      return {};
    }
    function encodeConnectionCloseOk(channel2, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(655411, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionBlocked(buffer) {
      var val, len, offset = 0, fields = {
        reason: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.reason = val;
      return fields;
    }
    function encodeConnectionBlocked(channel2, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.reason;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'reason' is the wrong type; must be a string (up to 255 chars)");
      var reason_len = Buffer.byteLength(val, "utf8");
      varyingSize += reason_len;
      var buffer = Buffer.alloc(13 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(655420, 7);
      offset = 11;
      val = fields.reason;
      void 0 === val && (val = "");
      buffer[offset] = reason_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += reason_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionUnblocked(buffer) {
      return {};
    }
    function encodeConnectionUnblocked(channel2, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(655421, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionUpdateSecret(buffer) {
      var val, len, offset = 0, fields = {
        newSecret: void 0,
        reason: void 0
      };
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.subarray(offset, offset + len);
      offset += len;
      fields.newSecret = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.reason = val;
      return fields;
    }
    function encodeConnectionUpdateSecret(channel2, fields) {
      var len, offset = 0, val = null, varyingSize = 0;
      val = fields.newSecret;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'newSecret'");
      if (!Buffer.isBuffer(val)) throw new TypeError("Field 'newSecret' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      val = fields.reason;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'reason'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'reason' is the wrong type; must be a string (up to 255 chars)");
      var reason_len = Buffer.byteLength(val, "utf8");
      varyingSize += reason_len;
      var buffer = Buffer.alloc(17 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(655430, 7);
      offset = 11;
      val = fields.newSecret;
      void 0 === val && (val = Buffer.from(void 0));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      val = fields.reason;
      void 0 === val && (val = void 0);
      buffer[offset] = reason_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += reason_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionUpdateSecretOk(buffer) {
      return {};
    }
    function encodeConnectionUpdateSecretOk(channel2, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(655431, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeChannelOpen(buffer) {
      var val, len, offset = 0, fields = {
        outOfBand: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.outOfBand = val;
      return fields;
    }
    function encodeChannelOpen(channel2, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.outOfBand;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'outOfBand' is the wrong type; must be a string (up to 255 chars)");
      var outOfBand_len = Buffer.byteLength(val, "utf8");
      varyingSize += outOfBand_len;
      var buffer = Buffer.alloc(13 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(1310730, 7);
      offset = 11;
      val = fields.outOfBand;
      void 0 === val && (val = "");
      buffer[offset] = outOfBand_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += outOfBand_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeChannelOpenOk(buffer) {
      var val, len, offset = 0, fields = {
        channelId: void 0
      };
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.subarray(offset, offset + len);
      offset += len;
      fields.channelId = val;
      return fields;
    }
    function encodeChannelOpenOk(channel2, fields) {
      var len, offset = 0, val = null, varyingSize = 0;
      val = fields.channelId;
      if (void 0 === val) val = Buffer.from("");
      else if (!Buffer.isBuffer(val)) throw new TypeError("Field 'channelId' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(1310731, 7);
      offset = 11;
      val = fields.channelId;
      void 0 === val && (val = Buffer.from(""));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeChannelFlow(buffer) {
      var val, fields = {
        active: void 0
      };
      val = !!(1 & buffer[0]);
      fields.active = val;
      return fields;
    }
    function encodeChannelFlow(channel2, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(1310740, 7);
      offset = 11;
      val = fields.active;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'active'");
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeChannelFlowOk(buffer) {
      var val, fields = {
        active: void 0
      };
      val = !!(1 & buffer[0]);
      fields.active = val;
      return fields;
    }
    function encodeChannelFlowOk(channel2, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(1310741, 7);
      offset = 11;
      val = fields.active;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'active'");
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeChannelClose(buffer) {
      var val, len, offset = 0, fields = {
        replyCode: void 0,
        replyText: void 0,
        classId: void 0,
        methodId: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.replyCode = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.replyText = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.classId = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.methodId = val;
      return fields;
    }
    function encodeChannelClose(channel2, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.replyText;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'replyText' is the wrong type; must be a string (up to 255 chars)");
      var replyText_len = Buffer.byteLength(val, "utf8");
      varyingSize += replyText_len;
      var buffer = Buffer.alloc(19 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(1310760, 7);
      offset = 11;
      val = fields.replyCode;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'replyCode'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'replyCode' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.replyText;
      void 0 === val && (val = "");
      buffer[offset] = replyText_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += replyText_len;
      val = fields.classId;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'classId'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'classId' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.methodId;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'methodId'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'methodId' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeChannelCloseOk(buffer) {
      return {};
    }
    function encodeChannelCloseOk(channel2, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(1310761, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeAccessRequest(buffer) {
      var val, len, offset = 0, fields = {
        realm: void 0,
        exclusive: void 0,
        passive: void 0,
        active: void 0,
        write: void 0,
        read: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.realm = val;
      val = !!(1 & buffer[offset]);
      fields.exclusive = val;
      val = !!(2 & buffer[offset]);
      fields.passive = val;
      val = !!(4 & buffer[offset]);
      fields.active = val;
      val = !!(8 & buffer[offset]);
      fields.write = val;
      val = !!(16 & buffer[offset]);
      fields.read = val;
      return fields;
    }
    function encodeAccessRequest(channel2, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.realm;
      if (void 0 === val) val = "/data";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'realm' is the wrong type; must be a string (up to 255 chars)");
      var realm_len = Buffer.byteLength(val, "utf8");
      varyingSize += realm_len;
      var buffer = Buffer.alloc(14 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(1966090, 7);
      offset = 11;
      val = fields.realm;
      void 0 === val && (val = "/data");
      buffer[offset] = realm_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += realm_len;
      val = fields.exclusive;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.passive;
      void 0 === val && (val = true);
      val && (bits += 2);
      val = fields.active;
      void 0 === val && (val = true);
      val && (bits += 4);
      val = fields.write;
      void 0 === val && (val = true);
      val && (bits += 8);
      val = fields.read;
      void 0 === val && (val = true);
      val && (bits += 16);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeAccessRequestOk(buffer) {
      var val, offset = 0, fields = {
        ticket: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      return fields;
    }
    function encodeAccessRequestOk(channel2, fields) {
      var offset = 0, val = null, buffer = Buffer.alloc(14);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(1966091, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 1;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeDeclare(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        exchange: void 0,
        type: void 0,
        passive: void 0,
        durable: void 0,
        autoDelete: void 0,
        internal: void 0,
        nowait: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.type = val;
      val = !!(1 & buffer[offset]);
      fields.passive = val;
      val = !!(2 & buffer[offset]);
      fields.durable = val;
      val = !!(4 & buffer[offset]);
      fields.autoDelete = val;
      val = !!(8 & buffer[offset]);
      fields.internal = val;
      val = !!(16 & buffer[offset]);
      fields.nowait = val;
      offset++;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.subarray(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeExchangeDeclare(channel2, fields) {
      var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
      val = fields.exchange;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.type;
      if (void 0 === val) val = "direct";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'type' is the wrong type; must be a string (up to 255 chars)");
      var type_len = Buffer.byteLength(val, "utf8");
      varyingSize += type_len;
      val = fields.arguments;
      if (void 0 === val) val = {};
      else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(17 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(2621450, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.type;
      void 0 === val && (val = "direct");
      buffer[offset] = type_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += type_len;
      val = fields.passive;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.durable;
      void 0 === val && (val = false);
      val && (bits += 2);
      val = fields.autoDelete;
      void 0 === val && (val = false);
      val && (bits += 4);
      val = fields.internal;
      void 0 === val && (val = false);
      val && (bits += 8);
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 16);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeDeclareOk(buffer) {
      return {};
    }
    function encodeExchangeDeclareOk(channel2, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(2621451, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeDelete(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        exchange: void 0,
        ifUnused: void 0,
        nowait: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      val = !!(1 & buffer[offset]);
      fields.ifUnused = val;
      val = !!(2 & buffer[offset]);
      fields.nowait = val;
      return fields;
    }
    function encodeExchangeDelete(channel2, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.exchange;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(2621460, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.ifUnused;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 2);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeDeleteOk(buffer) {
      return {};
    }
    function encodeExchangeDeleteOk(channel2, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(2621461, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeBind(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        destination: void 0,
        source: void 0,
        routingKey: void 0,
        nowait: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.destination = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.source = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      val = !!(1 & buffer[offset]);
      fields.nowait = val;
      offset++;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.subarray(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeExchangeBind(channel2, fields) {
      var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
      val = fields.destination;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'destination'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'destination' is the wrong type; must be a string (up to 255 chars)");
      var destination_len = Buffer.byteLength(val, "utf8");
      varyingSize += destination_len;
      val = fields.source;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'source'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'source' is the wrong type; must be a string (up to 255 chars)");
      var source_len = Buffer.byteLength(val, "utf8");
      varyingSize += source_len;
      val = fields.routingKey;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      val = fields.arguments;
      if (void 0 === val) val = {};
      else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(18 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(2621470, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.destination;
      void 0 === val && (val = void 0);
      buffer[offset] = destination_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += destination_len;
      val = fields.source;
      void 0 === val && (val = void 0);
      buffer[offset] = source_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += source_len;
      val = fields.routingKey;
      void 0 === val && (val = "");
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeBindOk(buffer) {
      return {};
    }
    function encodeExchangeBindOk(channel2, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(2621471, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeUnbind(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        destination: void 0,
        source: void 0,
        routingKey: void 0,
        nowait: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.destination = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.source = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      val = !!(1 & buffer[offset]);
      fields.nowait = val;
      offset++;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.subarray(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeExchangeUnbind(channel2, fields) {
      var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
      val = fields.destination;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'destination'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'destination' is the wrong type; must be a string (up to 255 chars)");
      var destination_len = Buffer.byteLength(val, "utf8");
      varyingSize += destination_len;
      val = fields.source;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'source'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'source' is the wrong type; must be a string (up to 255 chars)");
      var source_len = Buffer.byteLength(val, "utf8");
      varyingSize += source_len;
      val = fields.routingKey;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      val = fields.arguments;
      if (void 0 === val) val = {};
      else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(18 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(2621480, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.destination;
      void 0 === val && (val = void 0);
      buffer[offset] = destination_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += destination_len;
      val = fields.source;
      void 0 === val && (val = void 0);
      buffer[offset] = source_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += source_len;
      val = fields.routingKey;
      void 0 === val && (val = "");
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeUnbindOk(buffer) {
      return {};
    }
    function encodeExchangeUnbindOk(channel2, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(2621491, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueDeclare(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        passive: void 0,
        durable: void 0,
        exclusive: void 0,
        autoDelete: void 0,
        nowait: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      val = !!(1 & buffer[offset]);
      fields.passive = val;
      val = !!(2 & buffer[offset]);
      fields.durable = val;
      val = !!(4 & buffer[offset]);
      fields.exclusive = val;
      val = !!(8 & buffer[offset]);
      fields.autoDelete = val;
      val = !!(16 & buffer[offset]);
      fields.nowait = val;
      offset++;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.subarray(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeQueueDeclare(channel2, fields) {
      var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
      val = fields.queue;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      val = fields.arguments;
      if (void 0 === val) val = {};
      else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3276810, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.passive;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.durable;
      void 0 === val && (val = false);
      val && (bits += 2);
      val = fields.exclusive;
      void 0 === val && (val = false);
      val && (bits += 4);
      val = fields.autoDelete;
      void 0 === val && (val = false);
      val && (bits += 8);
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 16);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueDeclareOk(buffer) {
      var val, len, offset = 0, fields = {
        queue: void 0,
        messageCount: void 0,
        consumerCount: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.messageCount = val;
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.consumerCount = val;
      return fields;
    }
    function encodeQueueDeclareOk(channel2, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.queue;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'queue'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      var buffer = Buffer.alloc(21 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3276811, 7);
      offset = 11;
      val = fields.queue;
      void 0 === val && (val = void 0);
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.messageCount;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'messageCount'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      val = fields.consumerCount;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'consumerCount'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'consumerCount' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueBind(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        exchange: void 0,
        routingKey: void 0,
        nowait: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      val = !!(1 & buffer[offset]);
      fields.nowait = val;
      offset++;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.subarray(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeQueueBind(channel2, fields) {
      var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
      val = fields.queue;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      val = fields.exchange;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.routingKey;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      val = fields.arguments;
      if (void 0 === val) val = {};
      else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(18 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3276820, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.routingKey;
      void 0 === val && (val = "");
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueBindOk(buffer) {
      return {};
    }
    function encodeQueueBindOk(channel2, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3276821, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueuePurge(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        nowait: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      val = !!(1 & buffer[offset]);
      fields.nowait = val;
      return fields;
    }
    function encodeQueuePurge(channel2, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.queue;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3276830, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueuePurgeOk(buffer) {
      var val, offset = 0, fields = {
        messageCount: void 0
      };
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.messageCount = val;
      return fields;
    }
    function encodeQueuePurgeOk(channel2, fields) {
      var offset = 0, val = null, buffer = Buffer.alloc(16);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3276831, 7);
      offset = 11;
      val = fields.messageCount;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'messageCount'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueDelete(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        ifUnused: void 0,
        ifEmpty: void 0,
        nowait: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      val = !!(1 & buffer[offset]);
      fields.ifUnused = val;
      val = !!(2 & buffer[offset]);
      fields.ifEmpty = val;
      val = !!(4 & buffer[offset]);
      fields.nowait = val;
      return fields;
    }
    function encodeQueueDelete(channel2, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.queue;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3276840, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.ifUnused;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.ifEmpty;
      void 0 === val && (val = false);
      val && (bits += 2);
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 4);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueDeleteOk(buffer) {
      var val, offset = 0, fields = {
        messageCount: void 0
      };
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.messageCount = val;
      return fields;
    }
    function encodeQueueDeleteOk(channel2, fields) {
      var offset = 0, val = null, buffer = Buffer.alloc(16);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3276841, 7);
      offset = 11;
      val = fields.messageCount;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'messageCount'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueUnbind(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        exchange: void 0,
        routingKey: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.subarray(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeQueueUnbind(channel2, fields) {
      var len, offset = 0, val = null, varyingSize = 0, scratchOffset = 0;
      val = fields.queue;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      val = fields.exchange;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.routingKey;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      val = fields.arguments;
      if (void 0 === val) val = {};
      else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(17 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3276850, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.routingKey;
      void 0 === val && (val = "");
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueUnbindOk(buffer) {
      return {};
    }
    function encodeQueueUnbindOk(channel2, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3276851, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeTxSelect(buffer) {
      return {};
    }
    function encodeTxSelect(channel2, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(5898250, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeTxSelectOk(buffer) {
      return {};
    }
    function encodeTxSelectOk(channel2, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(5898251, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeTxCommit(buffer) {
      return {};
    }
    function encodeTxCommit(channel2, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(5898260, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeTxCommitOk(buffer) {
      return {};
    }
    function encodeTxCommitOk(channel2, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(5898261, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeTxRollback(buffer) {
      return {};
    }
    function encodeTxRollback(channel2, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(5898270, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeTxRollbackOk(buffer) {
      return {};
    }
    function encodeTxRollbackOk(channel2, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(5898271, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConfirmSelect(buffer) {
      var val, fields = {
        nowait: void 0
      };
      val = !!(1 & buffer[0]);
      fields.nowait = val;
      return fields;
    }
    function encodeConfirmSelect(channel2, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(5570570, 7);
      offset = 11;
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConfirmSelectOk(buffer) {
      return {};
    }
    function encodeConfirmSelectOk(channel2, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(5570571, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function encodeBasicProperties(channel2, size, fields) {
      var val, len, offset = 0, flags = 0, scratchOffset = 0, varyingSize = 0;
      val = fields.contentType;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'contentType' is the wrong type; must be a string (up to 255 chars)");
        var contentType_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += contentType_len;
      }
      val = fields.contentEncoding;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'contentEncoding' is the wrong type; must be a string (up to 255 chars)");
        var contentEncoding_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += contentEncoding_len;
      }
      val = fields.headers;
      if (void 0 != val) {
        if ("object" != typeof val) throw new TypeError("Field 'headers' is the wrong type; must be an object");
        len = encodeTable(SCRATCH, val, scratchOffset);
        var headers_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
        scratchOffset += len;
        varyingSize += headers_encoded.length;
      }
      val = fields.deliveryMode;
      if (void 0 != val) {
        if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'deliveryMode' is the wrong type; must be a number (but not NaN)");
        varyingSize += 1;
      }
      val = fields.priority;
      if (void 0 != val) {
        if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'priority' is the wrong type; must be a number (but not NaN)");
        varyingSize += 1;
      }
      val = fields.correlationId;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'correlationId' is the wrong type; must be a string (up to 255 chars)");
        var correlationId_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += correlationId_len;
      }
      val = fields.replyTo;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'replyTo' is the wrong type; must be a string (up to 255 chars)");
        var replyTo_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += replyTo_len;
      }
      val = fields.expiration;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'expiration' is the wrong type; must be a string (up to 255 chars)");
        var expiration_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += expiration_len;
      }
      val = fields.messageId;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'messageId' is the wrong type; must be a string (up to 255 chars)");
        var messageId_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += messageId_len;
      }
      val = fields.timestamp;
      if (void 0 != val) {
        if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'timestamp' is the wrong type; must be a number (but not NaN)");
        varyingSize += 8;
      }
      val = fields.type;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'type' is the wrong type; must be a string (up to 255 chars)");
        var type_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += type_len;
      }
      val = fields.userId;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'userId' is the wrong type; must be a string (up to 255 chars)");
        var userId_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += userId_len;
      }
      val = fields.appId;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'appId' is the wrong type; must be a string (up to 255 chars)");
        var appId_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += appId_len;
      }
      val = fields.clusterId;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'clusterId' is the wrong type; must be a string (up to 255 chars)");
        var clusterId_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += clusterId_len;
      }
      var buffer = Buffer.alloc(22 + varyingSize);
      buffer[0] = 2;
      buffer.writeUInt16BE(channel2, 1);
      buffer.writeUInt32BE(3932160, 7);
      ints.writeUInt64BE(buffer, size, 11);
      flags = 0;
      offset = 21;
      val = fields.contentType;
      if (void 0 != val) {
        flags += 32768;
        buffer[offset] = contentType_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += contentType_len;
      }
      val = fields.contentEncoding;
      if (void 0 != val) {
        flags += 16384;
        buffer[offset] = contentEncoding_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += contentEncoding_len;
      }
      val = fields.headers;
      if (void 0 != val) {
        flags += 8192;
        offset += headers_encoded.copy(buffer, offset);
      }
      val = fields.deliveryMode;
      if (void 0 != val) {
        flags += 4096;
        buffer.writeUInt8(val, offset);
        offset++;
      }
      val = fields.priority;
      if (void 0 != val) {
        flags += 2048;
        buffer.writeUInt8(val, offset);
        offset++;
      }
      val = fields.correlationId;
      if (void 0 != val) {
        flags += 1024;
        buffer[offset] = correlationId_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += correlationId_len;
      }
      val = fields.replyTo;
      if (void 0 != val) {
        flags += 512;
        buffer[offset] = replyTo_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += replyTo_len;
      }
      val = fields.expiration;
      if (void 0 != val) {
        flags += 256;
        buffer[offset] = expiration_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += expiration_len;
      }
      val = fields.messageId;
      if (void 0 != val) {
        flags += 128;
        buffer[offset] = messageId_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += messageId_len;
      }
      val = fields.timestamp;
      if (void 0 != val) {
        flags += 64;
        ints.writeUInt64BE(buffer, val, offset);
        offset += 8;
      }
      val = fields.type;
      if (void 0 != val) {
        flags += 32;
        buffer[offset] = type_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += type_len;
      }
      val = fields.userId;
      if (void 0 != val) {
        flags += 16;
        buffer[offset] = userId_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += userId_len;
      }
      val = fields.appId;
      if (void 0 != val) {
        flags += 8;
        buffer[offset] = appId_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += appId_len;
      }
      val = fields.clusterId;
      if (void 0 != val) {
        flags += 4;
        buffer[offset] = clusterId_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += clusterId_len;
      }
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      buffer.writeUInt16BE(flags, 19);
      return buffer.subarray(0, offset + 1);
    }
    function decodeBasicProperties(buffer) {
      var flags, val, len, offset = 2;
      flags = buffer.readUInt16BE(0);
      if (0 === flags) return {};
      var fields = {
        contentType: void 0,
        contentEncoding: void 0,
        headers: void 0,
        deliveryMode: void 0,
        priority: void 0,
        correlationId: void 0,
        replyTo: void 0,
        expiration: void 0,
        messageId: void 0,
        timestamp: void 0,
        type: void 0,
        userId: void 0,
        appId: void 0,
        clusterId: void 0
      };
      if (32768 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.contentType = val;
      }
      if (16384 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.contentEncoding = val;
      }
      if (8192 & flags) {
        len = buffer.readUInt32BE(offset);
        offset += 4;
        val = decodeFields(buffer.subarray(offset, offset + len));
        offset += len;
        fields.headers = val;
      }
      if (4096 & flags) {
        val = buffer[offset];
        offset++;
        fields.deliveryMode = val;
      }
      if (2048 & flags) {
        val = buffer[offset];
        offset++;
        fields.priority = val;
      }
      if (1024 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.correlationId = val;
      }
      if (512 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.replyTo = val;
      }
      if (256 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.expiration = val;
      }
      if (128 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.messageId = val;
      }
      if (64 & flags) {
        val = ints.readUInt64BE(buffer, offset);
        offset += 8;
        fields.timestamp = val;
      }
      if (32 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.type = val;
      }
      if (16 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.userId = val;
      }
      if (8 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.appId = val;
      }
      if (4 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.clusterId = val;
      }
      return fields;
    }
    var codec2 = require_codec();
    var ints = require_buffer_more_ints();
    var encodeTable = codec2.encodeTable;
    var decodeFields = codec2.decodeFields;
    var SCRATCH = Buffer.alloc(65536);
    var EMPTY_OBJECT = Object.freeze({});
    module.exports.constants = {
      FRAME_METHOD: 1,
      FRAME_HEADER: 2,
      FRAME_BODY: 3,
      FRAME_HEARTBEAT: 8,
      FRAME_MIN_SIZE: 4096,
      FRAME_END: 206,
      REPLY_SUCCESS: 200,
      CONTENT_TOO_LARGE: 311,
      NO_ROUTE: 312,
      NO_CONSUMERS: 313,
      ACCESS_REFUSED: 403,
      NOT_FOUND: 404,
      RESOURCE_LOCKED: 405,
      PRECONDITION_FAILED: 406,
      CONNECTION_FORCED: 320,
      INVALID_PATH: 402,
      FRAME_ERROR: 501,
      SYNTAX_ERROR: 502,
      COMMAND_INVALID: 503,
      CHANNEL_ERROR: 504,
      UNEXPECTED_FRAME: 505,
      RESOURCE_ERROR: 506,
      NOT_ALLOWED: 530,
      NOT_IMPLEMENTED: 540,
      INTERNAL_ERROR: 541
    };
    module.exports.constant_strs = {
      "1": "FRAME-METHOD",
      "2": "FRAME-HEADER",
      "3": "FRAME-BODY",
      "8": "FRAME-HEARTBEAT",
      "200": "REPLY-SUCCESS",
      "206": "FRAME-END",
      "311": "CONTENT-TOO-LARGE",
      "312": "NO-ROUTE",
      "313": "NO-CONSUMERS",
      "320": "CONNECTION-FORCED",
      "402": "INVALID-PATH",
      "403": "ACCESS-REFUSED",
      "404": "NOT-FOUND",
      "405": "RESOURCE-LOCKED",
      "406": "PRECONDITION-FAILED",
      "501": "FRAME-ERROR",
      "502": "SYNTAX-ERROR",
      "503": "COMMAND-INVALID",
      "504": "CHANNEL-ERROR",
      "505": "UNEXPECTED-FRAME",
      "506": "RESOURCE-ERROR",
      "530": "NOT-ALLOWED",
      "540": "NOT-IMPLEMENTED",
      "541": "INTERNAL-ERROR",
      "4096": "FRAME-MIN-SIZE"
    };
    module.exports.FRAME_OVERHEAD = 8;
    module.exports.decode = function(id, buf) {
      switch (id) {
        case 3932170:
          return decodeBasicQos(buf);
        case 3932171:
          return decodeBasicQosOk(buf);
        case 3932180:
          return decodeBasicConsume(buf);
        case 3932181:
          return decodeBasicConsumeOk(buf);
        case 3932190:
          return decodeBasicCancel(buf);
        case 3932191:
          return decodeBasicCancelOk(buf);
        case 3932200:
          return decodeBasicPublish(buf);
        case 3932210:
          return decodeBasicReturn(buf);
        case 3932220:
          return decodeBasicDeliver(buf);
        case 3932230:
          return decodeBasicGet(buf);
        case 3932231:
          return decodeBasicGetOk(buf);
        case 3932232:
          return decodeBasicGetEmpty(buf);
        case 3932240:
          return decodeBasicAck(buf);
        case 3932250:
          return decodeBasicReject(buf);
        case 3932260:
          return decodeBasicRecoverAsync(buf);
        case 3932270:
          return decodeBasicRecover(buf);
        case 3932271:
          return decodeBasicRecoverOk(buf);
        case 3932280:
          return decodeBasicNack(buf);
        case 655370:
          return decodeConnectionStart(buf);
        case 655371:
          return decodeConnectionStartOk(buf);
        case 655380:
          return decodeConnectionSecure(buf);
        case 655381:
          return decodeConnectionSecureOk(buf);
        case 655390:
          return decodeConnectionTune(buf);
        case 655391:
          return decodeConnectionTuneOk(buf);
        case 655400:
          return decodeConnectionOpen(buf);
        case 655401:
          return decodeConnectionOpenOk(buf);
        case 655410:
          return decodeConnectionClose(buf);
        case 655411:
          return decodeConnectionCloseOk(buf);
        case 655420:
          return decodeConnectionBlocked(buf);
        case 655421:
          return decodeConnectionUnblocked(buf);
        case 655430:
          return decodeConnectionUpdateSecret(buf);
        case 655431:
          return decodeConnectionUpdateSecretOk(buf);
        case 1310730:
          return decodeChannelOpen(buf);
        case 1310731:
          return decodeChannelOpenOk(buf);
        case 1310740:
          return decodeChannelFlow(buf);
        case 1310741:
          return decodeChannelFlowOk(buf);
        case 1310760:
          return decodeChannelClose(buf);
        case 1310761:
          return decodeChannelCloseOk(buf);
        case 1966090:
          return decodeAccessRequest(buf);
        case 1966091:
          return decodeAccessRequestOk(buf);
        case 2621450:
          return decodeExchangeDeclare(buf);
        case 2621451:
          return decodeExchangeDeclareOk(buf);
        case 2621460:
          return decodeExchangeDelete(buf);
        case 2621461:
          return decodeExchangeDeleteOk(buf);
        case 2621470:
          return decodeExchangeBind(buf);
        case 2621471:
          return decodeExchangeBindOk(buf);
        case 2621480:
          return decodeExchangeUnbind(buf);
        case 2621491:
          return decodeExchangeUnbindOk(buf);
        case 3276810:
          return decodeQueueDeclare(buf);
        case 3276811:
          return decodeQueueDeclareOk(buf);
        case 3276820:
          return decodeQueueBind(buf);
        case 3276821:
          return decodeQueueBindOk(buf);
        case 3276830:
          return decodeQueuePurge(buf);
        case 3276831:
          return decodeQueuePurgeOk(buf);
        case 3276840:
          return decodeQueueDelete(buf);
        case 3276841:
          return decodeQueueDeleteOk(buf);
        case 3276850:
          return decodeQueueUnbind(buf);
        case 3276851:
          return decodeQueueUnbindOk(buf);
        case 5898250:
          return decodeTxSelect(buf);
        case 5898251:
          return decodeTxSelectOk(buf);
        case 5898260:
          return decodeTxCommit(buf);
        case 5898261:
          return decodeTxCommitOk(buf);
        case 5898270:
          return decodeTxRollback(buf);
        case 5898271:
          return decodeTxRollbackOk(buf);
        case 5570570:
          return decodeConfirmSelect(buf);
        case 5570571:
          return decodeConfirmSelectOk(buf);
        case 60:
          return decodeBasicProperties(buf);
        default:
          throw new Error("Unknown class/method ID");
      }
    };
    module.exports.encodeMethod = function(id, channel2, fields) {
      switch (id) {
        case 3932170:
          return encodeBasicQos(channel2, fields);
        case 3932171:
          return encodeBasicQosOk(channel2, fields);
        case 3932180:
          return encodeBasicConsume(channel2, fields);
        case 3932181:
          return encodeBasicConsumeOk(channel2, fields);
        case 3932190:
          return encodeBasicCancel(channel2, fields);
        case 3932191:
          return encodeBasicCancelOk(channel2, fields);
        case 3932200:
          return encodeBasicPublish(channel2, fields);
        case 3932210:
          return encodeBasicReturn(channel2, fields);
        case 3932220:
          return encodeBasicDeliver(channel2, fields);
        case 3932230:
          return encodeBasicGet(channel2, fields);
        case 3932231:
          return encodeBasicGetOk(channel2, fields);
        case 3932232:
          return encodeBasicGetEmpty(channel2, fields);
        case 3932240:
          return encodeBasicAck(channel2, fields);
        case 3932250:
          return encodeBasicReject(channel2, fields);
        case 3932260:
          return encodeBasicRecoverAsync(channel2, fields);
        case 3932270:
          return encodeBasicRecover(channel2, fields);
        case 3932271:
          return encodeBasicRecoverOk(channel2, fields);
        case 3932280:
          return encodeBasicNack(channel2, fields);
        case 655370:
          return encodeConnectionStart(channel2, fields);
        case 655371:
          return encodeConnectionStartOk(channel2, fields);
        case 655380:
          return encodeConnectionSecure(channel2, fields);
        case 655381:
          return encodeConnectionSecureOk(channel2, fields);
        case 655390:
          return encodeConnectionTune(channel2, fields);
        case 655391:
          return encodeConnectionTuneOk(channel2, fields);
        case 655400:
          return encodeConnectionOpen(channel2, fields);
        case 655401:
          return encodeConnectionOpenOk(channel2, fields);
        case 655410:
          return encodeConnectionClose(channel2, fields);
        case 655411:
          return encodeConnectionCloseOk(channel2, fields);
        case 655420:
          return encodeConnectionBlocked(channel2, fields);
        case 655421:
          return encodeConnectionUnblocked(channel2, fields);
        case 655430:
          return encodeConnectionUpdateSecret(channel2, fields);
        case 655431:
          return encodeConnectionUpdateSecretOk(channel2, fields);
        case 1310730:
          return encodeChannelOpen(channel2, fields);
        case 1310731:
          return encodeChannelOpenOk(channel2, fields);
        case 1310740:
          return encodeChannelFlow(channel2, fields);
        case 1310741:
          return encodeChannelFlowOk(channel2, fields);
        case 1310760:
          return encodeChannelClose(channel2, fields);
        case 1310761:
          return encodeChannelCloseOk(channel2, fields);
        case 1966090:
          return encodeAccessRequest(channel2, fields);
        case 1966091:
          return encodeAccessRequestOk(channel2, fields);
        case 2621450:
          return encodeExchangeDeclare(channel2, fields);
        case 2621451:
          return encodeExchangeDeclareOk(channel2, fields);
        case 2621460:
          return encodeExchangeDelete(channel2, fields);
        case 2621461:
          return encodeExchangeDeleteOk(channel2, fields);
        case 2621470:
          return encodeExchangeBind(channel2, fields);
        case 2621471:
          return encodeExchangeBindOk(channel2, fields);
        case 2621480:
          return encodeExchangeUnbind(channel2, fields);
        case 2621491:
          return encodeExchangeUnbindOk(channel2, fields);
        case 3276810:
          return encodeQueueDeclare(channel2, fields);
        case 3276811:
          return encodeQueueDeclareOk(channel2, fields);
        case 3276820:
          return encodeQueueBind(channel2, fields);
        case 3276821:
          return encodeQueueBindOk(channel2, fields);
        case 3276830:
          return encodeQueuePurge(channel2, fields);
        case 3276831:
          return encodeQueuePurgeOk(channel2, fields);
        case 3276840:
          return encodeQueueDelete(channel2, fields);
        case 3276841:
          return encodeQueueDeleteOk(channel2, fields);
        case 3276850:
          return encodeQueueUnbind(channel2, fields);
        case 3276851:
          return encodeQueueUnbindOk(channel2, fields);
        case 5898250:
          return encodeTxSelect(channel2, fields);
        case 5898251:
          return encodeTxSelectOk(channel2, fields);
        case 5898260:
          return encodeTxCommit(channel2, fields);
        case 5898261:
          return encodeTxCommitOk(channel2, fields);
        case 5898270:
          return encodeTxRollback(channel2, fields);
        case 5898271:
          return encodeTxRollbackOk(channel2, fields);
        case 5570570:
          return encodeConfirmSelect(channel2, fields);
        case 5570571:
          return encodeConfirmSelectOk(channel2, fields);
        default:
          throw new Error("Unknown class/method ID");
      }
    };
    module.exports.encodeProperties = function(id, channel2, size, fields) {
      switch (id) {
        case 60:
          return encodeBasicProperties(channel2, size, fields);
        default:
          throw new Error("Unknown class/properties ID");
      }
    };
    module.exports.info = function(id) {
      switch (id) {
        case 3932170:
          return methodInfoBasicQos;
        case 3932171:
          return methodInfoBasicQosOk;
        case 3932180:
          return methodInfoBasicConsume;
        case 3932181:
          return methodInfoBasicConsumeOk;
        case 3932190:
          return methodInfoBasicCancel;
        case 3932191:
          return methodInfoBasicCancelOk;
        case 3932200:
          return methodInfoBasicPublish;
        case 3932210:
          return methodInfoBasicReturn;
        case 3932220:
          return methodInfoBasicDeliver;
        case 3932230:
          return methodInfoBasicGet;
        case 3932231:
          return methodInfoBasicGetOk;
        case 3932232:
          return methodInfoBasicGetEmpty;
        case 3932240:
          return methodInfoBasicAck;
        case 3932250:
          return methodInfoBasicReject;
        case 3932260:
          return methodInfoBasicRecoverAsync;
        case 3932270:
          return methodInfoBasicRecover;
        case 3932271:
          return methodInfoBasicRecoverOk;
        case 3932280:
          return methodInfoBasicNack;
        case 655370:
          return methodInfoConnectionStart;
        case 655371:
          return methodInfoConnectionStartOk;
        case 655380:
          return methodInfoConnectionSecure;
        case 655381:
          return methodInfoConnectionSecureOk;
        case 655390:
          return methodInfoConnectionTune;
        case 655391:
          return methodInfoConnectionTuneOk;
        case 655400:
          return methodInfoConnectionOpen;
        case 655401:
          return methodInfoConnectionOpenOk;
        case 655410:
          return methodInfoConnectionClose;
        case 655411:
          return methodInfoConnectionCloseOk;
        case 655420:
          return methodInfoConnectionBlocked;
        case 655421:
          return methodInfoConnectionUnblocked;
        case 655430:
          return methodInfoConnectionUpdateSecret;
        case 655431:
          return methodInfoConnectionUpdateSecretOk;
        case 1310730:
          return methodInfoChannelOpen;
        case 1310731:
          return methodInfoChannelOpenOk;
        case 1310740:
          return methodInfoChannelFlow;
        case 1310741:
          return methodInfoChannelFlowOk;
        case 1310760:
          return methodInfoChannelClose;
        case 1310761:
          return methodInfoChannelCloseOk;
        case 1966090:
          return methodInfoAccessRequest;
        case 1966091:
          return methodInfoAccessRequestOk;
        case 2621450:
          return methodInfoExchangeDeclare;
        case 2621451:
          return methodInfoExchangeDeclareOk;
        case 2621460:
          return methodInfoExchangeDelete;
        case 2621461:
          return methodInfoExchangeDeleteOk;
        case 2621470:
          return methodInfoExchangeBind;
        case 2621471:
          return methodInfoExchangeBindOk;
        case 2621480:
          return methodInfoExchangeUnbind;
        case 2621491:
          return methodInfoExchangeUnbindOk;
        case 3276810:
          return methodInfoQueueDeclare;
        case 3276811:
          return methodInfoQueueDeclareOk;
        case 3276820:
          return methodInfoQueueBind;
        case 3276821:
          return methodInfoQueueBindOk;
        case 3276830:
          return methodInfoQueuePurge;
        case 3276831:
          return methodInfoQueuePurgeOk;
        case 3276840:
          return methodInfoQueueDelete;
        case 3276841:
          return methodInfoQueueDeleteOk;
        case 3276850:
          return methodInfoQueueUnbind;
        case 3276851:
          return methodInfoQueueUnbindOk;
        case 5898250:
          return methodInfoTxSelect;
        case 5898251:
          return methodInfoTxSelectOk;
        case 5898260:
          return methodInfoTxCommit;
        case 5898261:
          return methodInfoTxCommitOk;
        case 5898270:
          return methodInfoTxRollback;
        case 5898271:
          return methodInfoTxRollbackOk;
        case 5570570:
          return methodInfoConfirmSelect;
        case 5570571:
          return methodInfoConfirmSelectOk;
        case 60:
          return propertiesInfoBasicProperties;
        default:
          throw new Error("Unknown class/method ID");
      }
    };
    module.exports.BasicQos = 3932170;
    var methodInfoBasicQos = module.exports.methodInfoBasicQos = {
      id: 3932170,
      classId: 60,
      methodId: 10,
      name: "BasicQos",
      args: [{
        type: "long",
        name: "prefetchSize",
        default: 0
      }, {
        type: "short",
        name: "prefetchCount",
        default: 0
      }, {
        type: "bit",
        name: "global",
        default: false
      }]
    };
    module.exports.BasicQosOk = 3932171;
    var methodInfoBasicQosOk = module.exports.methodInfoBasicQosOk = {
      id: 3932171,
      classId: 60,
      methodId: 11,
      name: "BasicQosOk",
      args: []
    };
    module.exports.BasicConsume = 3932180;
    var methodInfoBasicConsume = module.exports.methodInfoBasicConsume = {
      id: 3932180,
      classId: 60,
      methodId: 20,
      name: "BasicConsume",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "shortstr",
        name: "consumerTag",
        default: ""
      }, {
        type: "bit",
        name: "noLocal",
        default: false
      }, {
        type: "bit",
        name: "noAck",
        default: false
      }, {
        type: "bit",
        name: "exclusive",
        default: false
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module.exports.BasicConsumeOk = 3932181;
    var methodInfoBasicConsumeOk = module.exports.methodInfoBasicConsumeOk = {
      id: 3932181,
      classId: 60,
      methodId: 21,
      name: "BasicConsumeOk",
      args: [{
        type: "shortstr",
        name: "consumerTag"
      }]
    };
    module.exports.BasicCancel = 3932190;
    var methodInfoBasicCancel = module.exports.methodInfoBasicCancel = {
      id: 3932190,
      classId: 60,
      methodId: 30,
      name: "BasicCancel",
      args: [{
        type: "shortstr",
        name: "consumerTag"
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }]
    };
    module.exports.BasicCancelOk = 3932191;
    var methodInfoBasicCancelOk = module.exports.methodInfoBasicCancelOk = {
      id: 3932191,
      classId: 60,
      methodId: 31,
      name: "BasicCancelOk",
      args: [{
        type: "shortstr",
        name: "consumerTag"
      }]
    };
    module.exports.BasicPublish = 3932200;
    var methodInfoBasicPublish = module.exports.methodInfoBasicPublish = {
      id: 3932200,
      classId: 60,
      methodId: 40,
      name: "BasicPublish",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "exchange",
        default: ""
      }, {
        type: "shortstr",
        name: "routingKey",
        default: ""
      }, {
        type: "bit",
        name: "mandatory",
        default: false
      }, {
        type: "bit",
        name: "immediate",
        default: false
      }]
    };
    module.exports.BasicReturn = 3932210;
    var methodInfoBasicReturn = module.exports.methodInfoBasicReturn = {
      id: 3932210,
      classId: 60,
      methodId: 50,
      name: "BasicReturn",
      args: [{
        type: "short",
        name: "replyCode"
      }, {
        type: "shortstr",
        name: "replyText",
        default: ""
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "shortstr",
        name: "routingKey"
      }]
    };
    module.exports.BasicDeliver = 3932220;
    var methodInfoBasicDeliver = module.exports.methodInfoBasicDeliver = {
      id: 3932220,
      classId: 60,
      methodId: 60,
      name: "BasicDeliver",
      args: [{
        type: "shortstr",
        name: "consumerTag"
      }, {
        type: "longlong",
        name: "deliveryTag"
      }, {
        type: "bit",
        name: "redelivered",
        default: false
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "shortstr",
        name: "routingKey"
      }]
    };
    module.exports.BasicGet = 3932230;
    var methodInfoBasicGet = module.exports.methodInfoBasicGet = {
      id: 3932230,
      classId: 60,
      methodId: 70,
      name: "BasicGet",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "bit",
        name: "noAck",
        default: false
      }]
    };
    module.exports.BasicGetOk = 3932231;
    var methodInfoBasicGetOk = module.exports.methodInfoBasicGetOk = {
      id: 3932231,
      classId: 60,
      methodId: 71,
      name: "BasicGetOk",
      args: [{
        type: "longlong",
        name: "deliveryTag"
      }, {
        type: "bit",
        name: "redelivered",
        default: false
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "shortstr",
        name: "routingKey"
      }, {
        type: "long",
        name: "messageCount"
      }]
    };
    module.exports.BasicGetEmpty = 3932232;
    var methodInfoBasicGetEmpty = module.exports.methodInfoBasicGetEmpty = {
      id: 3932232,
      classId: 60,
      methodId: 72,
      name: "BasicGetEmpty",
      args: [{
        type: "shortstr",
        name: "clusterId",
        default: ""
      }]
    };
    module.exports.BasicAck = 3932240;
    var methodInfoBasicAck = module.exports.methodInfoBasicAck = {
      id: 3932240,
      classId: 60,
      methodId: 80,
      name: "BasicAck",
      args: [{
        type: "longlong",
        name: "deliveryTag",
        default: 0
      }, {
        type: "bit",
        name: "multiple",
        default: false
      }]
    };
    module.exports.BasicReject = 3932250;
    var methodInfoBasicReject = module.exports.methodInfoBasicReject = {
      id: 3932250,
      classId: 60,
      methodId: 90,
      name: "BasicReject",
      args: [{
        type: "longlong",
        name: "deliveryTag"
      }, {
        type: "bit",
        name: "requeue",
        default: true
      }]
    };
    module.exports.BasicRecoverAsync = 3932260;
    var methodInfoBasicRecoverAsync = module.exports.methodInfoBasicRecoverAsync = {
      id: 3932260,
      classId: 60,
      methodId: 100,
      name: "BasicRecoverAsync",
      args: [{
        type: "bit",
        name: "requeue",
        default: false
      }]
    };
    module.exports.BasicRecover = 3932270;
    var methodInfoBasicRecover = module.exports.methodInfoBasicRecover = {
      id: 3932270,
      classId: 60,
      methodId: 110,
      name: "BasicRecover",
      args: [{
        type: "bit",
        name: "requeue",
        default: false
      }]
    };
    module.exports.BasicRecoverOk = 3932271;
    var methodInfoBasicRecoverOk = module.exports.methodInfoBasicRecoverOk = {
      id: 3932271,
      classId: 60,
      methodId: 111,
      name: "BasicRecoverOk",
      args: []
    };
    module.exports.BasicNack = 3932280;
    var methodInfoBasicNack = module.exports.methodInfoBasicNack = {
      id: 3932280,
      classId: 60,
      methodId: 120,
      name: "BasicNack",
      args: [{
        type: "longlong",
        name: "deliveryTag",
        default: 0
      }, {
        type: "bit",
        name: "multiple",
        default: false
      }, {
        type: "bit",
        name: "requeue",
        default: true
      }]
    };
    module.exports.ConnectionStart = 655370;
    var methodInfoConnectionStart = module.exports.methodInfoConnectionStart = {
      id: 655370,
      classId: 10,
      methodId: 10,
      name: "ConnectionStart",
      args: [{
        type: "octet",
        name: "versionMajor",
        default: 0
      }, {
        type: "octet",
        name: "versionMinor",
        default: 9
      }, {
        type: "table",
        name: "serverProperties"
      }, {
        type: "longstr",
        name: "mechanisms",
        default: "PLAIN"
      }, {
        type: "longstr",
        name: "locales",
        default: "en_US"
      }]
    };
    module.exports.ConnectionStartOk = 655371;
    var methodInfoConnectionStartOk = module.exports.methodInfoConnectionStartOk = {
      id: 655371,
      classId: 10,
      methodId: 11,
      name: "ConnectionStartOk",
      args: [{
        type: "table",
        name: "clientProperties"
      }, {
        type: "shortstr",
        name: "mechanism",
        default: "PLAIN"
      }, {
        type: "longstr",
        name: "response"
      }, {
        type: "shortstr",
        name: "locale",
        default: "en_US"
      }]
    };
    module.exports.ConnectionSecure = 655380;
    var methodInfoConnectionSecure = module.exports.methodInfoConnectionSecure = {
      id: 655380,
      classId: 10,
      methodId: 20,
      name: "ConnectionSecure",
      args: [{
        type: "longstr",
        name: "challenge"
      }]
    };
    module.exports.ConnectionSecureOk = 655381;
    var methodInfoConnectionSecureOk = module.exports.methodInfoConnectionSecureOk = {
      id: 655381,
      classId: 10,
      methodId: 21,
      name: "ConnectionSecureOk",
      args: [{
        type: "longstr",
        name: "response"
      }]
    };
    module.exports.ConnectionTune = 655390;
    var methodInfoConnectionTune = module.exports.methodInfoConnectionTune = {
      id: 655390,
      classId: 10,
      methodId: 30,
      name: "ConnectionTune",
      args: [{
        type: "short",
        name: "channelMax",
        default: 0
      }, {
        type: "long",
        name: "frameMax",
        default: 0
      }, {
        type: "short",
        name: "heartbeat",
        default: 0
      }]
    };
    module.exports.ConnectionTuneOk = 655391;
    var methodInfoConnectionTuneOk = module.exports.methodInfoConnectionTuneOk = {
      id: 655391,
      classId: 10,
      methodId: 31,
      name: "ConnectionTuneOk",
      args: [{
        type: "short",
        name: "channelMax",
        default: 0
      }, {
        type: "long",
        name: "frameMax",
        default: 0
      }, {
        type: "short",
        name: "heartbeat",
        default: 0
      }]
    };
    module.exports.ConnectionOpen = 655400;
    var methodInfoConnectionOpen = module.exports.methodInfoConnectionOpen = {
      id: 655400,
      classId: 10,
      methodId: 40,
      name: "ConnectionOpen",
      args: [{
        type: "shortstr",
        name: "virtualHost",
        default: "/"
      }, {
        type: "shortstr",
        name: "capabilities",
        default: ""
      }, {
        type: "bit",
        name: "insist",
        default: false
      }]
    };
    module.exports.ConnectionOpenOk = 655401;
    var methodInfoConnectionOpenOk = module.exports.methodInfoConnectionOpenOk = {
      id: 655401,
      classId: 10,
      methodId: 41,
      name: "ConnectionOpenOk",
      args: [{
        type: "shortstr",
        name: "knownHosts",
        default: ""
      }]
    };
    module.exports.ConnectionClose = 655410;
    var methodInfoConnectionClose = module.exports.methodInfoConnectionClose = {
      id: 655410,
      classId: 10,
      methodId: 50,
      name: "ConnectionClose",
      args: [{
        type: "short",
        name: "replyCode"
      }, {
        type: "shortstr",
        name: "replyText",
        default: ""
      }, {
        type: "short",
        name: "classId"
      }, {
        type: "short",
        name: "methodId"
      }]
    };
    module.exports.ConnectionCloseOk = 655411;
    var methodInfoConnectionCloseOk = module.exports.methodInfoConnectionCloseOk = {
      id: 655411,
      classId: 10,
      methodId: 51,
      name: "ConnectionCloseOk",
      args: []
    };
    module.exports.ConnectionBlocked = 655420;
    var methodInfoConnectionBlocked = module.exports.methodInfoConnectionBlocked = {
      id: 655420,
      classId: 10,
      methodId: 60,
      name: "ConnectionBlocked",
      args: [{
        type: "shortstr",
        name: "reason",
        default: ""
      }]
    };
    module.exports.ConnectionUnblocked = 655421;
    var methodInfoConnectionUnblocked = module.exports.methodInfoConnectionUnblocked = {
      id: 655421,
      classId: 10,
      methodId: 61,
      name: "ConnectionUnblocked",
      args: []
    };
    module.exports.ConnectionUpdateSecret = 655430;
    var methodInfoConnectionUpdateSecret = module.exports.methodInfoConnectionUpdateSecret = {
      id: 655430,
      classId: 10,
      methodId: 70,
      name: "ConnectionUpdateSecret",
      args: [{
        type: "longstr",
        name: "newSecret"
      }, {
        type: "shortstr",
        name: "reason"
      }]
    };
    module.exports.ConnectionUpdateSecretOk = 655431;
    var methodInfoConnectionUpdateSecretOk = module.exports.methodInfoConnectionUpdateSecretOk = {
      id: 655431,
      classId: 10,
      methodId: 71,
      name: "ConnectionUpdateSecretOk",
      args: []
    };
    module.exports.ChannelOpen = 1310730;
    var methodInfoChannelOpen = module.exports.methodInfoChannelOpen = {
      id: 1310730,
      classId: 20,
      methodId: 10,
      name: "ChannelOpen",
      args: [{
        type: "shortstr",
        name: "outOfBand",
        default: ""
      }]
    };
    module.exports.ChannelOpenOk = 1310731;
    var methodInfoChannelOpenOk = module.exports.methodInfoChannelOpenOk = {
      id: 1310731,
      classId: 20,
      methodId: 11,
      name: "ChannelOpenOk",
      args: [{
        type: "longstr",
        name: "channelId",
        default: ""
      }]
    };
    module.exports.ChannelFlow = 1310740;
    var methodInfoChannelFlow = module.exports.methodInfoChannelFlow = {
      id: 1310740,
      classId: 20,
      methodId: 20,
      name: "ChannelFlow",
      args: [{
        type: "bit",
        name: "active"
      }]
    };
    module.exports.ChannelFlowOk = 1310741;
    var methodInfoChannelFlowOk = module.exports.methodInfoChannelFlowOk = {
      id: 1310741,
      classId: 20,
      methodId: 21,
      name: "ChannelFlowOk",
      args: [{
        type: "bit",
        name: "active"
      }]
    };
    module.exports.ChannelClose = 1310760;
    var methodInfoChannelClose = module.exports.methodInfoChannelClose = {
      id: 1310760,
      classId: 20,
      methodId: 40,
      name: "ChannelClose",
      args: [{
        type: "short",
        name: "replyCode"
      }, {
        type: "shortstr",
        name: "replyText",
        default: ""
      }, {
        type: "short",
        name: "classId"
      }, {
        type: "short",
        name: "methodId"
      }]
    };
    module.exports.ChannelCloseOk = 1310761;
    var methodInfoChannelCloseOk = module.exports.methodInfoChannelCloseOk = {
      id: 1310761,
      classId: 20,
      methodId: 41,
      name: "ChannelCloseOk",
      args: []
    };
    module.exports.AccessRequest = 1966090;
    var methodInfoAccessRequest = module.exports.methodInfoAccessRequest = {
      id: 1966090,
      classId: 30,
      methodId: 10,
      name: "AccessRequest",
      args: [{
        type: "shortstr",
        name: "realm",
        default: "/data"
      }, {
        type: "bit",
        name: "exclusive",
        default: false
      }, {
        type: "bit",
        name: "passive",
        default: true
      }, {
        type: "bit",
        name: "active",
        default: true
      }, {
        type: "bit",
        name: "write",
        default: true
      }, {
        type: "bit",
        name: "read",
        default: true
      }]
    };
    module.exports.AccessRequestOk = 1966091;
    var methodInfoAccessRequestOk = module.exports.methodInfoAccessRequestOk = {
      id: 1966091,
      classId: 30,
      methodId: 11,
      name: "AccessRequestOk",
      args: [{
        type: "short",
        name: "ticket",
        default: 1
      }]
    };
    module.exports.ExchangeDeclare = 2621450;
    var methodInfoExchangeDeclare = module.exports.methodInfoExchangeDeclare = {
      id: 2621450,
      classId: 40,
      methodId: 10,
      name: "ExchangeDeclare",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "shortstr",
        name: "type",
        default: "direct"
      }, {
        type: "bit",
        name: "passive",
        default: false
      }, {
        type: "bit",
        name: "durable",
        default: false
      }, {
        type: "bit",
        name: "autoDelete",
        default: false
      }, {
        type: "bit",
        name: "internal",
        default: false
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module.exports.ExchangeDeclareOk = 2621451;
    var methodInfoExchangeDeclareOk = module.exports.methodInfoExchangeDeclareOk = {
      id: 2621451,
      classId: 40,
      methodId: 11,
      name: "ExchangeDeclareOk",
      args: []
    };
    module.exports.ExchangeDelete = 2621460;
    var methodInfoExchangeDelete = module.exports.methodInfoExchangeDelete = {
      id: 2621460,
      classId: 40,
      methodId: 20,
      name: "ExchangeDelete",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "bit",
        name: "ifUnused",
        default: false
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }]
    };
    module.exports.ExchangeDeleteOk = 2621461;
    var methodInfoExchangeDeleteOk = module.exports.methodInfoExchangeDeleteOk = {
      id: 2621461,
      classId: 40,
      methodId: 21,
      name: "ExchangeDeleteOk",
      args: []
    };
    module.exports.ExchangeBind = 2621470;
    var methodInfoExchangeBind = module.exports.methodInfoExchangeBind = {
      id: 2621470,
      classId: 40,
      methodId: 30,
      name: "ExchangeBind",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "destination"
      }, {
        type: "shortstr",
        name: "source"
      }, {
        type: "shortstr",
        name: "routingKey",
        default: ""
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module.exports.ExchangeBindOk = 2621471;
    var methodInfoExchangeBindOk = module.exports.methodInfoExchangeBindOk = {
      id: 2621471,
      classId: 40,
      methodId: 31,
      name: "ExchangeBindOk",
      args: []
    };
    module.exports.ExchangeUnbind = 2621480;
    var methodInfoExchangeUnbind = module.exports.methodInfoExchangeUnbind = {
      id: 2621480,
      classId: 40,
      methodId: 40,
      name: "ExchangeUnbind",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "destination"
      }, {
        type: "shortstr",
        name: "source"
      }, {
        type: "shortstr",
        name: "routingKey",
        default: ""
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module.exports.ExchangeUnbindOk = 2621491;
    var methodInfoExchangeUnbindOk = module.exports.methodInfoExchangeUnbindOk = {
      id: 2621491,
      classId: 40,
      methodId: 51,
      name: "ExchangeUnbindOk",
      args: []
    };
    module.exports.QueueDeclare = 3276810;
    var methodInfoQueueDeclare = module.exports.methodInfoQueueDeclare = {
      id: 3276810,
      classId: 50,
      methodId: 10,
      name: "QueueDeclare",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "bit",
        name: "passive",
        default: false
      }, {
        type: "bit",
        name: "durable",
        default: false
      }, {
        type: "bit",
        name: "exclusive",
        default: false
      }, {
        type: "bit",
        name: "autoDelete",
        default: false
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module.exports.QueueDeclareOk = 3276811;
    var methodInfoQueueDeclareOk = module.exports.methodInfoQueueDeclareOk = {
      id: 3276811,
      classId: 50,
      methodId: 11,
      name: "QueueDeclareOk",
      args: [{
        type: "shortstr",
        name: "queue"
      }, {
        type: "long",
        name: "messageCount"
      }, {
        type: "long",
        name: "consumerCount"
      }]
    };
    module.exports.QueueBind = 3276820;
    var methodInfoQueueBind = module.exports.methodInfoQueueBind = {
      id: 3276820,
      classId: 50,
      methodId: 20,
      name: "QueueBind",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "shortstr",
        name: "routingKey",
        default: ""
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module.exports.QueueBindOk = 3276821;
    var methodInfoQueueBindOk = module.exports.methodInfoQueueBindOk = {
      id: 3276821,
      classId: 50,
      methodId: 21,
      name: "QueueBindOk",
      args: []
    };
    module.exports.QueuePurge = 3276830;
    var methodInfoQueuePurge = module.exports.methodInfoQueuePurge = {
      id: 3276830,
      classId: 50,
      methodId: 30,
      name: "QueuePurge",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }]
    };
    module.exports.QueuePurgeOk = 3276831;
    var methodInfoQueuePurgeOk = module.exports.methodInfoQueuePurgeOk = {
      id: 3276831,
      classId: 50,
      methodId: 31,
      name: "QueuePurgeOk",
      args: [{
        type: "long",
        name: "messageCount"
      }]
    };
    module.exports.QueueDelete = 3276840;
    var methodInfoQueueDelete = module.exports.methodInfoQueueDelete = {
      id: 3276840,
      classId: 50,
      methodId: 40,
      name: "QueueDelete",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "bit",
        name: "ifUnused",
        default: false
      }, {
        type: "bit",
        name: "ifEmpty",
        default: false
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }]
    };
    module.exports.QueueDeleteOk = 3276841;
    var methodInfoQueueDeleteOk = module.exports.methodInfoQueueDeleteOk = {
      id: 3276841,
      classId: 50,
      methodId: 41,
      name: "QueueDeleteOk",
      args: [{
        type: "long",
        name: "messageCount"
      }]
    };
    module.exports.QueueUnbind = 3276850;
    var methodInfoQueueUnbind = module.exports.methodInfoQueueUnbind = {
      id: 3276850,
      classId: 50,
      methodId: 50,
      name: "QueueUnbind",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "shortstr",
        name: "routingKey",
        default: ""
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module.exports.QueueUnbindOk = 3276851;
    var methodInfoQueueUnbindOk = module.exports.methodInfoQueueUnbindOk = {
      id: 3276851,
      classId: 50,
      methodId: 51,
      name: "QueueUnbindOk",
      args: []
    };
    module.exports.TxSelect = 5898250;
    var methodInfoTxSelect = module.exports.methodInfoTxSelect = {
      id: 5898250,
      classId: 90,
      methodId: 10,
      name: "TxSelect",
      args: []
    };
    module.exports.TxSelectOk = 5898251;
    var methodInfoTxSelectOk = module.exports.methodInfoTxSelectOk = {
      id: 5898251,
      classId: 90,
      methodId: 11,
      name: "TxSelectOk",
      args: []
    };
    module.exports.TxCommit = 5898260;
    var methodInfoTxCommit = module.exports.methodInfoTxCommit = {
      id: 5898260,
      classId: 90,
      methodId: 20,
      name: "TxCommit",
      args: []
    };
    module.exports.TxCommitOk = 5898261;
    var methodInfoTxCommitOk = module.exports.methodInfoTxCommitOk = {
      id: 5898261,
      classId: 90,
      methodId: 21,
      name: "TxCommitOk",
      args: []
    };
    module.exports.TxRollback = 5898270;
    var methodInfoTxRollback = module.exports.methodInfoTxRollback = {
      id: 5898270,
      classId: 90,
      methodId: 30,
      name: "TxRollback",
      args: []
    };
    module.exports.TxRollbackOk = 5898271;
    var methodInfoTxRollbackOk = module.exports.methodInfoTxRollbackOk = {
      id: 5898271,
      classId: 90,
      methodId: 31,
      name: "TxRollbackOk",
      args: []
    };
    module.exports.ConfirmSelect = 5570570;
    var methodInfoConfirmSelect = module.exports.methodInfoConfirmSelect = {
      id: 5570570,
      classId: 85,
      methodId: 10,
      name: "ConfirmSelect",
      args: [{
        type: "bit",
        name: "nowait",
        default: false
      }]
    };
    module.exports.ConfirmSelectOk = 5570571;
    var methodInfoConfirmSelectOk = module.exports.methodInfoConfirmSelectOk = {
      id: 5570571,
      classId: 85,
      methodId: 11,
      name: "ConfirmSelectOk",
      args: []
    };
    module.exports.BasicProperties = 60;
    var propertiesInfoBasicProperties = module.exports.propertiesInfoBasicProperties = {
      id: 60,
      name: "BasicProperties",
      args: [{
        type: "shortstr",
        name: "contentType"
      }, {
        type: "shortstr",
        name: "contentEncoding"
      }, {
        type: "table",
        name: "headers"
      }, {
        type: "octet",
        name: "deliveryMode"
      }, {
        type: "octet",
        name: "priority"
      }, {
        type: "shortstr",
        name: "correlationId"
      }, {
        type: "shortstr",
        name: "replyTo"
      }, {
        type: "shortstr",
        name: "expiration"
      }, {
        type: "shortstr",
        name: "messageId"
      }, {
        type: "timestamp",
        name: "timestamp"
      }, {
        type: "shortstr",
        name: "type"
      }, {
        type: "shortstr",
        name: "userId"
      }, {
        type: "shortstr",
        name: "appId"
      }, {
        type: "shortstr",
        name: "clusterId"
      }]
    };
  }
});

// ../node_modules/amqplib/lib/frame.js
var require_frame = __commonJS({
  "../node_modules/amqplib/lib/frame.js"(exports, module) {
    "use strict";
    var ints = require_buffer_more_ints();
    var defs = require_defs();
    var constants = defs.constants;
    var decode3 = defs.decode;
    module.exports.PROTOCOL_HEADER = "AMQP" + String.fromCharCode(0, 0, 9, 1);
    var FRAME_METHOD = constants.FRAME_METHOD;
    var FRAME_HEARTBEAT = constants.FRAME_HEARTBEAT;
    var FRAME_HEADER = constants.FRAME_HEADER;
    var FRAME_BODY = constants.FRAME_BODY;
    var FRAME_END = constants.FRAME_END;
    var TYPE_BYTES = 1;
    var CHANNEL_BYTES = 2;
    var SIZE_BYTES = 4;
    var FRAME_HEADER_BYTES = TYPE_BYTES + CHANNEL_BYTES + SIZE_BYTES;
    var FRAME_END_BYTES = 1;
    function readInt64BE(buffer, offset) {
      if (typeof Buffer.prototype.readBigInt64BE === "function") {
        return Number(buffer.readBigInt64BE(offset));
      }
      return ints.readInt64BE(buffer, offset);
    }
    module.exports.makeBodyFrame = function(channel2, payload) {
      const frameSize = FRAME_HEADER_BYTES + payload.length + FRAME_END_BYTES;
      const frame = Buffer.alloc(frameSize);
      let offset = 0;
      offset = frame.writeUInt8(FRAME_BODY, offset);
      offset = frame.writeUInt16BE(channel2, offset);
      offset = frame.writeInt32BE(payload.length, offset);
      payload.copy(frame, offset);
      offset += payload.length;
      frame.writeUInt8(FRAME_END, offset);
      return frame;
    };
    function parseFrame(bin) {
      if (bin.length < FRAME_HEADER_BYTES) {
        return false;
      }
      const type = bin.readUInt8(0);
      const channel2 = bin.readUInt16BE(1);
      const size = bin.readUInt32BE(3);
      const totalSize = FRAME_HEADER_BYTES + size + FRAME_END_BYTES;
      if (bin.length < totalSize) {
        return false;
      }
      const frameEnd = bin.readUInt8(FRAME_HEADER_BYTES + size);
      if (frameEnd !== FRAME_END) {
        throw new Error("Invalid frame");
      }
      return {
        type,
        channel: channel2,
        size,
        payload: bin.subarray(FRAME_HEADER_BYTES, FRAME_HEADER_BYTES + size),
        rest: bin.subarray(totalSize)
      };
    }
    module.exports.parseFrame = parseFrame;
    var HEARTBEAT = { channel: 0 };
    module.exports.decodeFrame = (frame) => {
      const payload = frame.payload;
      const channel2 = frame.channel;
      switch (frame.type) {
        case FRAME_METHOD: {
          const id = payload.readUInt32BE(0);
          const args = payload.subarray(4);
          const fields = decode3(id, args);
          return { id, channel: channel2, fields };
        }
        case FRAME_HEADER: {
          const id = payload.readUInt16BE(0);
          const size = readInt64BE(payload, 4);
          const flagsAndfields = payload.subarray(12);
          const fields = decode3(id, flagsAndfields);
          return { id, channel: channel2, size, fields };
        }
        case FRAME_BODY:
          return { channel: channel2, content: payload };
        case FRAME_HEARTBEAT:
          return HEARTBEAT;
        default:
          throw new Error("Unknown frame type " + frame.type);
      }
    };
    module.exports.HEARTBEAT_BUF = Buffer.from([
      constants.FRAME_HEARTBEAT,
      0,
      0,
      0,
      0,
      // size = 0
      0,
      0,
      // channel = 0
      constants.FRAME_END
    ]);
    module.exports.HEARTBEAT = HEARTBEAT;
  }
});

// ../node_modules/amqplib/lib/mux.js
var require_mux = __commonJS({
  "../node_modules/amqplib/lib/mux.js"(exports, module) {
    "use strict";
    var assert2 = __require("assert");
    var schedule = typeof setImmediate === "function" ? setImmediate : process.nextTick;
    var Mux = class {
      constructor(downstream) {
        this.newStreams = [];
        this.oldStreams = [];
        this.blocked = false;
        this.scheduledRead = false;
        this.out = downstream;
        var self2 = this;
        downstream.on("drain", function() {
          self2.blocked = false;
          self2._readIncoming();
        });
      }
      // There are 2 states we can be in:
      // - waiting for outbound capacity, which will be signalled by a
      // - 'drain' event on the downstream; or,
      // - no packets to send, waiting for an inbound buffer to have
      //   packets, which will be signalled by a 'readable' event
      // If we write all packets available whenever there is outbound
      // capacity, we will either run out of outbound capacity (`#write`
      // returns false), or run out of packets (all calls to an
      // `inbound.read()` have returned null).
      _readIncoming() {
        if (this.blocked) return;
        var accepting = true;
        var out = this.out;
        function roundrobin(streams) {
          var s;
          while (accepting && (s = streams.shift())) {
            var chunk = s.read();
            if (chunk !== null) {
              accepting = out.write(chunk);
              streams.push(s);
            }
          }
        }
        roundrobin(this.newStreams);
        if (accepting) {
          assert2.equal(0, this.newStreams.length);
          roundrobin(this.oldStreams);
        } else {
          assert2(this.newStreams.length > 0, "Expect some new streams to remain");
          Array.prototype.push.apply(this.oldStreams, this.newStreams);
          this.newStreams = [];
        }
        this.blocked = !accepting;
      }
      _scheduleRead() {
        var self2 = this;
        if (!self2.scheduledRead) {
          schedule(function() {
            self2.scheduledRead = false;
            self2._readIncoming();
          });
          self2.scheduledRead = true;
        }
      }
      pipeFrom(readable) {
        var self2 = this;
        function enqueue() {
          self2.newStreams.push(readable);
          self2._scheduleRead();
        }
        function cleanup() {
          readable.removeListener("readable", enqueue);
          readable.removeListener("error", cleanup);
          readable.removeListener("end", cleanup);
          readable.removeListener("unpipeFrom", cleanupIfMe);
        }
        function cleanupIfMe(dest) {
          if (dest === self2) cleanup();
        }
        readable.on("unpipeFrom", cleanupIfMe);
        readable.on("end", cleanup);
        readable.on("error", cleanup);
        readable.on("readable", enqueue);
      }
      unpipeFrom(readable) {
        readable.emit("unpipeFrom", this);
      }
    };
    module.exports.Mux = Mux;
  }
});

// ../node_modules/amqplib/lib/heartbeat.js
var require_heartbeat = __commonJS({
  "../node_modules/amqplib/lib/heartbeat.js"(exports, module) {
    "use strict";
    var EventEmitter = __require("events");
    module.exports.UNITS_TO_MS = 1e3;
    var Heart = class extends EventEmitter {
      constructor(interval, checkSend, checkRecv) {
        super();
        this.interval = interval;
        var intervalMs = interval * module.exports.UNITS_TO_MS;
        var beat = this.emit.bind(this, "beat");
        var timeout = this.emit.bind(this, "timeout");
        this.sendTimer = setInterval(
          this.runHeartbeat.bind(this, checkSend, beat),
          intervalMs / 2
        );
        var recvMissed = 0;
        function missedTwo() {
          if (!checkRecv())
            return ++recvMissed < 2;
          else {
            recvMissed = 0;
            return true;
          }
        }
        this.recvTimer = setInterval(
          this.runHeartbeat.bind(this, missedTwo, timeout),
          intervalMs
        );
      }
      clear() {
        clearInterval(this.sendTimer);
        clearInterval(this.recvTimer);
      }
      runHeartbeat(check2, fail2) {
        if (!check2())
          fail2();
      }
    };
    module.exports.Heart = Heart;
  }
});

// ../node_modules/amqplib/lib/format.js
var require_format = __commonJS({
  "../node_modules/amqplib/lib/format.js"(exports, module) {
    "use strict";
    var defs = require_defs();
    var format = __require("util").format;
    var HEARTBEAT = require_frame().HEARTBEAT;
    module.exports.closeMessage = function(close) {
      var code = close.fields.replyCode;
      return format(
        '%d (%s) with message "%s"',
        code,
        defs.constant_strs[code],
        close.fields.replyText
      );
    };
    module.exports.methodName = function(id) {
      return defs.info(id).name;
    };
    module.exports.inspect = function(frame, showFields) {
      if (frame === HEARTBEAT) {
        return "<Heartbeat>";
      } else if (!frame.id) {
        return format(
          "<Content channel:%d size:%d>",
          frame.channel,
          frame.size
        );
      } else {
        var info = defs.info(frame.id);
        return format(
          "<%s channel:%d%s>",
          info.name,
          frame.channel,
          showFields ? " " + JSON.stringify(frame.fields, void 0, 2) : ""
        );
      }
    };
  }
});

// ../node_modules/amqplib/lib/bitset.js
var require_bitset = __commonJS({
  "../node_modules/amqplib/lib/bitset.js"(exports, module) {
    "use strict";
    var BitSet = class {
      /**
       * @param {number} [size]
       */
      constructor(size) {
        if (size) {
          const numWords = Math.ceil(size / 32);
          this.words = new Array(numWords);
        } else {
          this.words = [];
        }
        this.wordsInUse = 0;
      }
      /**
       * @param {number} numWords
       */
      ensureSize(numWords) {
        const wordsPresent = this.words.length;
        if (wordsPresent < numWords) {
          this.words = this.words.concat(new Array(numWords - wordsPresent));
        }
      }
      /**
       * @param {number} bitIndex
       */
      set(bitIndex) {
        const w = wordIndex(bitIndex);
        if (w >= this.wordsInUse) {
          this.ensureSize(w + 1);
          this.wordsInUse = w + 1;
        }
        const bit = 1 << bitIndex;
        this.words[w] |= bit;
      }
      /**
       * @param {number} bitIndex
       */
      clear(bitIndex) {
        const w = wordIndex(bitIndex);
        if (w >= this.wordsInUse) return;
        const mask = ~(1 << bitIndex);
        this.words[w] &= mask;
      }
      /**
       * @param {number} bitIndex
       */
      get(bitIndex) {
        const w = wordIndex(bitIndex);
        if (w >= this.wordsInUse) return false;
        const bit = 1 << bitIndex;
        return !!(this.words[w] & bit);
      }
      /**
       * Give the next bit that is set on or after fromIndex, or -1 if no such bit
       *
       * @param {number} fromIndex
       */
      nextSetBit(fromIndex) {
        let w = wordIndex(fromIndex);
        if (w >= this.wordsInUse) return -1;
        let word = this.words[w] & 4294967295 << fromIndex;
        while (true) {
          if (word) return w * 32 + trailingZeros(word);
          w++;
          if (w === this.wordsInUse) return -1;
          word = this.words[w];
        }
      }
      /**
       * @param {number} fromIndex
       */
      nextClearBit(fromIndex) {
        let w = wordIndex(fromIndex);
        if (w >= this.wordsInUse) return fromIndex;
        let word = ~this.words[w] & 4294967295 << fromIndex;
        while (true) {
          if (word) return w * 32 + trailingZeros(word);
          w++;
          if (w == this.wordsInUse) return w * 32;
          word = ~this.words[w];
        }
      }
    };
    function wordIndex(bitIndex) {
      return Math.floor(bitIndex / 32);
    }
    function trailingZeros(i) {
      if (i === 0) return 32;
      let y, n = 31;
      y = i << 16;
      if (y != 0) {
        n = n - 16;
        i = y;
      }
      y = i << 8;
      if (y != 0) {
        n = n - 8;
        i = y;
      }
      y = i << 4;
      if (y != 0) {
        n = n - 4;
        i = y;
      }
      y = i << 2;
      if (y != 0) {
        n = n - 2;
        i = y;
      }
      return n - (i << 1 >>> 31);
    }
    module.exports.BitSet = BitSet;
  }
});

// ../node_modules/amqplib/lib/error.js
var require_error = __commonJS({
  "../node_modules/amqplib/lib/error.js"(exports, module) {
    "use strict";
    var inherits = __require("util").inherits;
    function trimStack(stack, num) {
      return stack && stack.split("\n").slice(num).join("\n");
    }
    function IllegalOperationError(msg, stack) {
      var tmp = new Error();
      this.message = msg;
      this.stack = this.toString() + "\n" + trimStack(tmp.stack, 2);
      this.stackAtStateChange = stack;
    }
    inherits(IllegalOperationError, Error);
    IllegalOperationError.prototype.name = "IllegalOperationError";
    function stackCapture(reason) {
      var e = new Error();
      return "Stack capture: " + reason + "\n" + trimStack(e.stack, 2);
    }
    module.exports.IllegalOperationError = IllegalOperationError;
    module.exports.stackCapture = stackCapture;
  }
});

// ../node_modules/amqplib/lib/connection.js
var require_connection = __commonJS({
  "../node_modules/amqplib/lib/connection.js"(exports, module) {
    "use strict";
    var defs = require_defs();
    var constants = defs.constants;
    var frame = require_frame();
    var HEARTBEAT = frame.HEARTBEAT;
    var Mux = require_mux().Mux;
    var Duplex = __require("stream").Duplex;
    var EventEmitter = __require("events");
    var Heart = require_heartbeat().Heart;
    var methodName = require_format().methodName;
    var closeMsg = require_format().closeMessage;
    var inspect = require_format().inspect;
    var BitSet = require_bitset().BitSet;
    var fmt = __require("util").format;
    var PassThrough = __require("stream").PassThrough;
    var IllegalOperationError = require_error().IllegalOperationError;
    var stackCapture = require_error().stackCapture;
    var DEFAULT_WRITE_HWM = 1024;
    var SINGLE_CHUNK_THRESHOLD = 2048;
    var Connection = class extends EventEmitter {
      constructor(underlying) {
        super();
        var stream = this.stream = wrapStream(underlying);
        this.muxer = new Mux(stream);
        this.rest = Buffer.alloc(0);
        this.frameMax = constants.FRAME_MIN_SIZE;
        this.sentSinceLastCheck = false;
        this.recvSinceLastCheck = false;
        this.expectSocketClose = false;
        this.freeChannels = new BitSet();
        this.channels = [{
          channel: { accept: channel0(this) },
          buffer: underlying
        }];
      }
      // This changed between versions, as did the codec, methods, etc. AMQP
      // 0-9-1 is fairly similar to 0.8, but better, and nothing implements
      // 0.8 that doesn't implement 0-9-1. In other words, it doesn't make
      // much sense to generalise here.
      sendProtocolHeader() {
        this.sendBytes(frame.PROTOCOL_HEADER);
      }
      /*
          The frighteningly complicated opening protocol (spec section 2.2.4):
      
             Client -> Server
      
               protocol header ->
                 <- start
               start-ok ->
             .. next two zero or more times ..
                 <- secure
               secure-ok ->
                 <- tune
               tune-ok ->
               open ->
                 <- open-ok
      
        If I'm only supporting SASL's PLAIN mechanism (which I am for the time
        being), it gets a bit easier since the server won't in general send
        back a `secure`, it'll just send `tune` after the `start-ok`.
        (SASL PLAIN: http://tools.ietf.org/html/rfc4616)
      
        */
      open(allFields, openCallback0) {
        var self2 = this;
        var openCallback = openCallback0 || function() {
        };
        var tunedOptions = Object.create(allFields);
        function wait(k) {
          self2.step(function(err, frame2) {
            if (err !== null)
              bail(err);
            else if (frame2.channel !== 0) {
              bail(new Error(
                fmt(
                  "Frame on channel != 0 during handshake: %s",
                  inspect(frame2, false)
                )
              ));
            } else
              k(frame2);
          });
        }
        function expect(Method, k) {
          wait(function(frame2) {
            if (frame2.id === Method)
              k(frame2);
            else {
              bail(new Error(
                fmt(
                  "Expected %s; got %s",
                  methodName(Method),
                  inspect(frame2, false)
                )
              ));
            }
          });
        }
        function bail(err) {
          openCallback(err);
        }
        function send(Method) {
          self2.sendMethod(0, Method, tunedOptions);
        }
        function negotiate(server, desired) {
          if (server === 0 || desired === 0) {
            return Math.max(server, desired);
          } else {
            return Math.min(server, desired);
          }
        }
        function onStart(start) {
          var mechanisms = start.fields.mechanisms.toString().split(" ");
          if (mechanisms.indexOf(allFields.mechanism) < 0) {
            bail(new Error(fmt(
              "SASL mechanism %s is not provided by the server",
              allFields.mechanism
            )));
            return;
          }
          self2.serverProperties = start.fields.serverProperties;
          try {
            send(defs.ConnectionStartOk);
          } catch (err) {
            bail(err);
            return;
          }
          wait(afterStartOk);
        }
        function afterStartOk(reply) {
          switch (reply.id) {
            case defs.ConnectionSecure:
              bail(new Error(
                "Wasn't expecting to have to go through secure"
              ));
              break;
            case defs.ConnectionClose:
              bail(new Error(fmt(
                "Handshake terminated by server: %s",
                closeMsg(reply)
              )));
              break;
            case defs.ConnectionTune:
              var fields = reply.fields;
              tunedOptions.frameMax = negotiate(fields.frameMax, allFields.frameMax);
              tunedOptions.channelMax = negotiate(fields.channelMax, allFields.channelMax);
              tunedOptions.heartbeat = negotiate(fields.heartbeat, allFields.heartbeat);
              try {
                send(defs.ConnectionTuneOk);
                send(defs.ConnectionOpen);
              } catch (err) {
                bail(err);
                return;
              }
              expect(defs.ConnectionOpenOk, onOpenOk);
              break;
            default:
              bail(new Error(
                fmt(
                  "Expected connection.secure, connection.close, or connection.tune during handshake; got %s",
                  inspect(reply, false)
                )
              ));
              break;
          }
        }
        function onOpenOk(openOk) {
          self2.channelMax = tunedOptions.channelMax || 65535;
          self2.frameMax = tunedOptions.frameMax || 4294967295;
          self2.heartbeat = tunedOptions.heartbeat;
          self2.heartbeater = self2.startHeartbeater();
          self2.accept = mainAccept;
          succeed(openOk);
        }
        function endWhileOpening(err) {
          bail(err || new Error("Socket closed abruptly during opening handshake"));
        }
        this.stream.on("end", endWhileOpening);
        this.stream.on("error", endWhileOpening);
        function succeed(ok2) {
          self2.stream.removeListener("end", endWhileOpening);
          self2.stream.removeListener("error", endWhileOpening);
          self2.stream.on("error", self2.onSocketError.bind(self2));
          self2.stream.on("end", self2.onSocketError.bind(
            self2,
            new Error("Unexpected close")
          ));
          self2.on("frameError", self2.onSocketError.bind(self2));
          self2.acceptLoop();
          openCallback(null, ok2);
        }
        this.sendProtocolHeader();
        expect(defs.ConnectionStart, onStart);
      }
      // Closing things: AMQP has a closing handshake that applies to
      // closing both connects and channels. As the initiating party, I send
      // Close, then ignore all frames until I see either CloseOK --
      // which signifies that the other party has seen the Close and shut
      // the connection or channel down, so it's fine to free resources; or
      // Close, which means the other party also wanted to close the
      // whatever, and I should send CloseOk so it can free resources,
      // then go back to waiting for the CloseOk. If I receive a Close
      // out of the blue, I should throw away any unsent frames (they will
      // be ignored anyway) and send CloseOk, then clean up resources. In
      // general, Close out of the blue signals an error (or a forced
      // closure, which may as well be an error).
      //
      //  RUNNING [1] --- send Close ---> Closing [2] ---> recv Close --+
      //     |                               |                         [3]
      //     |                               +------ send CloseOk ------+
      //  recv Close                   recv CloseOk
      //     |                               |
      //     V                               V
      //  Ended [4] ---- send CloseOk ---> Closed [5]
      //
      // [1] All frames accepted; getting a Close frame from the server
      // moves to Ended; client may initiate a close by sending Close
      // itself.
      // [2] Client has initiated a close; only CloseOk or (simulataneously
      // sent) Close is accepted.
      // [3] Simultaneous close
      // [4] Server won't send any more frames; accept no more frames, send
      // CloseOk.
      // [5] Fully closed, client will send no more, server will send no
      // more. Signal 'close' or 'error'.
      //
      // There are two signalling mechanisms used in the API. The first is
      // that calling `close` will return a promise, that will either
      // resolve once the connection or channel is cleanly shut down, or
      // will reject if the shutdown times out.
      //
      // The second is the 'close' and 'error' events. These are
      // emitted as above. The events will fire *before* promises are
      // resolved.
      // Close the connection without even giving a reason. Typical.
      close(closeCallback) {
        var k = closeCallback && function() {
          closeCallback(null);
        };
        this.closeBecause("Cheers, thanks", constants.REPLY_SUCCESS, k);
      }
      // Close with a reason and a 'code'. I'm pretty sure RabbitMQ totally
      // ignores these; maybe it logs them. The continuation will be invoked
      // when the CloseOk has been received, and before the 'close' event.
      closeBecause(reason, code, k) {
        this.sendMethod(0, defs.ConnectionClose, {
          replyText: reason,
          replyCode: code,
          methodId: 0,
          classId: 0
        });
        var s = stackCapture("closeBecause called: " + reason);
        this.toClosing(s, k);
      }
      closeWithError(reason, code, error48) {
        this.emit("error", error48);
        this.closeBecause(reason, code);
      }
      onSocketError(err) {
        if (!this.expectSocketClose) {
          this.expectSocketClose = true;
          this.emit("error", err);
          var s = stackCapture("Socket error");
          this.toClosed(s, err);
        }
      }
      // A close has been initiated. Repeat: a close has been initiated.
      // This means we should not send more frames, anyway they will be
      // ignored. We also have to shut down all the channels.
      toClosing(capturedStack, k) {
        var send = this.sendMethod.bind(this);
        this.accept = function(f) {
          if (f.id === defs.ConnectionCloseOk) {
            if (k)
              k();
            var s = stackCapture("ConnectionCloseOk received");
            this.toClosed(s, void 0);
          } else if (f.id === defs.ConnectionClose) {
            send(0, defs.ConnectionCloseOk, {});
          }
        };
        invalidateSend(this, "Connection closing", capturedStack);
      }
      _closeChannels(capturedStack) {
        for (var i = 1; i < this.channels.length; i++) {
          var ch = this.channels[i];
          if (ch !== null) {
            ch.channel.toClosed(capturedStack);
          }
        }
      }
      // A close has been confirmed. Cease all communication.
      toClosed(capturedStack, maybeErr) {
        this._closeChannels(capturedStack);
        var info = fmt(
          "Connection closed (%s)",
          maybeErr ? maybeErr.toString() : "by client"
        );
        invalidateSend(this, info, capturedStack);
        this.accept = invalidOp(info, capturedStack);
        this.close = function(cb) {
          cb && cb(new IllegalOperationError(info, capturedStack));
        };
        if (this.heartbeater)
          this.heartbeater.clear();
        this.expectSocketClose = true;
        this.stream.end();
        this.emit("close", maybeErr);
      }
      _updateSecret(newSecret, reason, cb) {
        this.sendMethod(0, defs.ConnectionUpdateSecret, {
          newSecret,
          reason
        });
        this.once("update-secret-ok", cb);
      }
      // ===
      startHeartbeater() {
        if (this.heartbeat === 0)
          return null;
        else {
          var self2 = this;
          var hb = new Heart(
            this.heartbeat,
            this.checkSend.bind(this),
            this.checkRecv.bind(this)
          );
          hb.on("timeout", function() {
            var hberr = new Error("Heartbeat timeout");
            self2.emit("error", hberr);
            var s = stackCapture("Heartbeat timeout");
            self2.toClosed(s, hberr);
          });
          hb.on("beat", function() {
            self2.sendHeartbeat();
          });
          return hb;
        }
      }
      // I use an array to keep track of the channels, rather than an
      // object. The channel identifiers are numbers, and allocated by the
      // connection. If I try to allocate low numbers when they are
      // available (which I do, by looking from the start of the bitset),
      // this ought to keep the array small, and out of 'sparse array
      // storage'. I also set entries to null, rather than deleting them, in
      // the expectation that the next channel allocation will fill the slot
      // again rather than growing the array. See
      // http://www.html5rocks.com/en/tutorials/speed/v8/
      freshChannel(channel2, options) {
        var next = this.freeChannels.nextClearBit(1);
        if (next < 0 || next > this.channelMax)
          throw new Error("No channels left to allocate");
        this.freeChannels.set(next);
        var hwm = options && options.highWaterMark || DEFAULT_WRITE_HWM;
        var writeBuffer = new PassThrough({
          objectMode: true,
          highWaterMark: hwm
        });
        this.channels[next] = { channel: channel2, buffer: writeBuffer };
        writeBuffer.on("drain", function() {
          channel2.onBufferDrain();
        });
        this.muxer.pipeFrom(writeBuffer);
        return next;
      }
      releaseChannel(channel2) {
        this.freeChannels.clear(channel2);
        var buffer = this.channels[channel2].buffer;
        buffer.end();
        this.channels[channel2] = null;
      }
      acceptLoop() {
        var self2 = this;
        function go() {
          try {
            var f;
            while (f = self2.recvFrame())
              self2.accept(f);
          } catch (e) {
            self2.emit("frameError", e);
          }
        }
        self2.stream.on("readable", go);
        go();
      }
      step(cb) {
        var self2 = this;
        function recv() {
          var f;
          try {
            f = self2.recvFrame();
          } catch (e) {
            cb(e, null);
            return;
          }
          if (f)
            cb(null, f);
          else
            self2.stream.once("readable", recv);
        }
        recv();
      }
      checkSend() {
        var check2 = this.sentSinceLastCheck;
        this.sentSinceLastCheck = false;
        return check2;
      }
      checkRecv() {
        var check2 = this.recvSinceLastCheck;
        this.recvSinceLastCheck = false;
        return check2;
      }
      sendBytes(bytes) {
        this.sentSinceLastCheck = true;
        this.stream.write(bytes);
      }
      sendHeartbeat() {
        return this.sendBytes(frame.HEARTBEAT_BUF);
      }
      sendMethod(channel2, Method, fields) {
        var frame2 = encodeMethod(Method, channel2, fields);
        this.sentSinceLastCheck = true;
        var buffer = this.channels[channel2].buffer;
        return buffer.write(frame2);
      }
      sendMessage(channel2, Method, fields, Properties, props, content) {
        if (!Buffer.isBuffer(content))
          throw new TypeError("content is not a buffer");
        var mframe = encodeMethod(Method, channel2, fields);
        var pframe = encodeProperties(
          Properties,
          channel2,
          content.length,
          props
        );
        var buffer = this.channels[channel2].buffer;
        this.sentSinceLastCheck = true;
        var methodHeaderLen = mframe.length + pframe.length;
        var bodyLen = content.length > 0 ? content.length + FRAME_OVERHEAD : 0;
        var allLen = methodHeaderLen + bodyLen;
        if (allLen < SINGLE_CHUNK_THRESHOLD) {
          var all = Buffer.allocUnsafe(allLen);
          var offset = mframe.copy(all, 0);
          offset += pframe.copy(all, offset);
          if (bodyLen > 0)
            makeBodyFrame(channel2, content).copy(all, offset);
          return buffer.write(all);
        } else {
          if (methodHeaderLen < SINGLE_CHUNK_THRESHOLD) {
            var both = Buffer.allocUnsafe(methodHeaderLen);
            var offset = mframe.copy(both, 0);
            pframe.copy(both, offset);
            buffer.write(both);
          } else {
            buffer.write(mframe);
            buffer.write(pframe);
          }
          return this.sendContent(channel2, content);
        }
      }
      sendContent(channel2, body) {
        if (!Buffer.isBuffer(body)) {
          throw new TypeError(fmt("Expected buffer; got %s", body));
        }
        var writeResult = true;
        var buffer = this.channels[channel2].buffer;
        var maxBody = this.frameMax - FRAME_OVERHEAD;
        for (var offset = 0; offset < body.length; offset += maxBody) {
          var end = offset + maxBody;
          var slice = end > body.length ? body.subarray(offset) : body.subarray(offset, end);
          var bodyFrame = makeBodyFrame(channel2, slice);
          writeResult = buffer.write(bodyFrame);
        }
        this.sentSinceLastCheck = true;
        return writeResult;
      }
      recvFrame() {
        var frame2 = parseFrame(this.rest);
        if (!frame2) {
          var incoming = this.stream.read();
          if (incoming === null) {
            return false;
          } else {
            this.recvSinceLastCheck = true;
            this.rest = Buffer.concat([this.rest, incoming]);
            return this.recvFrame();
          }
        } else {
          this.rest = frame2.rest;
          return decodeFrame(frame2);
        }
      }
    };
    function mainAccept(frame2) {
      var rec = this.channels[frame2.channel];
      if (rec) {
        return rec.channel.accept(frame2);
      } else
        this.closeWithError(
          fmt("Frame on unknown channel %d", frame2.channel),
          constants.CHANNEL_ERROR,
          new Error(fmt(
            "Frame on unknown channel: %s",
            inspect(frame2, false)
          ))
        );
    }
    function channel0(connection2) {
      return function(f) {
        if (f === HEARTBEAT) ;
        else if (f.id === defs.ConnectionClose) {
          connection2.sendMethod(0, defs.ConnectionCloseOk, {});
          var emsg = fmt("Connection closed: %s", closeMsg(f));
          var s = stackCapture(emsg);
          var e = new Error(emsg);
          e.code = f.fields.replyCode;
          if (isFatalError(e)) {
            connection2.emit("error", e);
          }
          connection2.toClosed(s, e);
        } else if (f.id === defs.ConnectionBlocked) {
          connection2.emit("blocked", f.fields.reason);
        } else if (f.id === defs.ConnectionUnblocked) {
          connection2.emit("unblocked");
        } else if (f.id === defs.ConnectionUpdateSecretOk) {
          connection2.emit("update-secret-ok");
        } else {
          connection2.closeWithError(
            fmt("Unexpected frame on channel 0"),
            constants.UNEXPECTED_FRAME,
            new Error(fmt(
              "Unexpected frame on channel 0: %s",
              inspect(f, false)
            ))
          );
        }
      };
    }
    function invalidOp(msg, stack) {
      return function() {
        throw new IllegalOperationError(msg, stack);
      };
    }
    function invalidateSend(conn, msg, stack) {
      conn.sendMethod = conn.sendContent = conn.sendMessage = invalidOp(msg, stack);
    }
    var encodeMethod = defs.encodeMethod;
    var encodeProperties = defs.encodeProperties;
    var FRAME_OVERHEAD = defs.FRAME_OVERHEAD;
    var makeBodyFrame = frame.makeBodyFrame;
    var parseFrame = frame.parseFrame;
    var decodeFrame = frame.decodeFrame;
    function wrapStream(s) {
      if (s instanceof Duplex) return s;
      else {
        var ws = new Duplex();
        ws.wrap(s);
        ws._write = function(chunk, encoding, callback) {
          return s.write(chunk, encoding, callback);
        };
        return ws;
      }
    }
    function isFatalError(error48) {
      switch (error48 && error48.code) {
        case defs.constants.CONNECTION_FORCED:
        case defs.constants.REPLY_SUCCESS:
          return false;
        default:
          return true;
      }
    }
    module.exports.Connection = Connection;
    module.exports.isFatalError = isFatalError;
  }
});

// ../node_modules/amqplib/lib/credentials.js
var require_credentials = __commonJS({
  "../node_modules/amqplib/lib/credentials.js"(exports, module) {
    "use strict";
    var codec2 = require_codec();
    module.exports.plain = function(user, passwd) {
      return {
        mechanism: "PLAIN",
        response: function() {
          return Buffer.from(["", user, passwd].join(String.fromCharCode(0)));
        },
        username: user,
        password: passwd
      };
    };
    module.exports.amqplain = function(user, passwd) {
      return {
        mechanism: "AMQPLAIN",
        response: function() {
          const buffer = Buffer.alloc(16384);
          const size = codec2.encodeTable(buffer, { LOGIN: user, PASSWORD: passwd }, 0);
          return buffer.subarray(4, size);
        },
        username: user,
        password: passwd
      };
    };
    module.exports.external = function() {
      return {
        mechanism: "EXTERNAL",
        response: function() {
          return Buffer.from("");
        }
      };
    };
  }
});

// ../node_modules/amqplib/package.json
var require_package = __commonJS({
  "../node_modules/amqplib/package.json"(exports, module) {
    module.exports = {
      name: "amqplib",
      homepage: "http://amqp-node.github.io/amqplib/",
      main: "./channel_api.js",
      version: "0.10.9",
      description: "An AMQP 0-9-1 (e.g., RabbitMQ) library and client.",
      repository: {
        type: "git",
        url: "git+https://github.com/amqp-node/amqplib.git"
      },
      engines: {
        node: ">=10"
      },
      dependencies: {
        "buffer-more-ints": "~1.0.0",
        "url-parse": "~1.5.10"
      },
      devDependencies: {
        claire: "0.4.1",
        mocha: "^9.2.2",
        nyc: "^15.1.0",
        "uglify-js": "2.8.x"
      },
      scripts: {
        test: "make test"
      },
      keywords: [
        "AMQP",
        "AMQP 0-9-1",
        "RabbitMQ"
      ],
      author: "Michael Bridgen <mikeb@squaremobius.net>",
      license: "MIT"
    };
  }
});

// ../node_modules/amqplib/lib/connect.js
var require_connect = __commonJS({
  "../node_modules/amqplib/lib/connect.js"(exports, module) {
    "use strict";
    var URL2 = require_url_parse();
    var QS = __require("querystring");
    var Connection = require_connection().Connection;
    var fmt = __require("util").format;
    var credentials = require_credentials();
    function copyInto(obj, target) {
      var keys = Object.keys(obj);
      var i = keys.length;
      while (i--) {
        var k = keys[i];
        target[k] = obj[k];
      }
      return target;
    }
    function clone2(obj) {
      return copyInto(obj, {});
    }
    var CLIENT_PROPERTIES = {
      "product": "amqplib",
      "version": require_package().version,
      "platform": fmt("Node.JS %s", process.version),
      "information": "https://amqp-node.github.io/amqplib/",
      "capabilities": {
        "publisher_confirms": true,
        "exchange_exchange_bindings": true,
        "basic.nack": true,
        "consumer_cancel_notify": true,
        "connection.blocked": true,
        "authentication_failure_close": true
      }
    };
    function openFrames(vhost, query, credentials2, extraClientProperties) {
      if (!vhost)
        vhost = "/";
      else
        vhost = QS.unescape(vhost);
      var query = query || {};
      function intOrDefault(val, def) {
        return val === void 0 ? def : parseInt(val);
      }
      var clientProperties = Object.create(CLIENT_PROPERTIES);
      return {
        // start-ok
        "clientProperties": copyInto(extraClientProperties, clientProperties),
        "mechanism": credentials2.mechanism,
        "response": credentials2.response(),
        "locale": query.locale || "en_US",
        // tune-ok
        "channelMax": intOrDefault(query.channelMax, 0),
        "frameMax": intOrDefault(query.frameMax, 131072),
        "heartbeat": intOrDefault(query.heartbeat, 0),
        // open
        "virtualHost": vhost,
        "capabilities": "",
        "insist": 0
      };
    }
    function credentialsFromUrl(parts) {
      var user = "guest", passwd = "guest";
      if (parts.username != "" || parts.password != "") {
        user = parts.username ? unescape(parts.username) : "";
        passwd = parts.password ? unescape(parts.password) : "";
      }
      return credentials.plain(user, passwd);
    }
    function connect(url2, socketOptions, openCallback) {
      var sockopts = clone2(socketOptions || {});
      url2 = url2 || "amqp://localhost";
      var noDelay = !!sockopts.noDelay;
      var timeout = sockopts.timeout;
      var keepAlive = !!sockopts.keepAlive;
      var keepAliveDelay = sockopts.keepAliveDelay || 0;
      var extraClientProperties = sockopts.clientProperties || {};
      var protocol, fields;
      if (typeof url2 === "object") {
        protocol = (url2.protocol || "amqp") + ":";
        sockopts.host = url2.hostname;
        sockopts.servername = sockopts.servername || url2.hostname;
        sockopts.port = url2.port || (protocol === "amqp:" ? 5672 : 5671);
        var user, pass;
        if (url2.username == void 0 && url2.password == void 0) {
          user = "guest";
          pass = "guest";
        } else {
          user = url2.username || "";
          pass = url2.password || "";
        }
        var config3 = {
          locale: url2.locale,
          channelMax: url2.channelMax,
          frameMax: url2.frameMax,
          heartbeat: url2.heartbeat
        };
        fields = openFrames(url2.vhost, config3, sockopts.credentials || credentials.plain(user, pass), extraClientProperties);
      } else {
        var parts = URL2(url2, true);
        var host = parts.hostname.replace(/^\[|\]$/g, "");
        protocol = parts.protocol;
        sockopts.host = host;
        sockopts.servername = sockopts.servername || host;
        sockopts.port = parseInt(parts.port) || (protocol === "amqp:" ? 5672 : 5671);
        var vhost = parts.pathname ? parts.pathname.substr(1) : null;
        fields = openFrames(vhost, parts.query, sockopts.credentials || credentialsFromUrl(parts), extraClientProperties);
      }
      var sockok = false;
      var sock;
      function onConnect() {
        sockok = true;
        sock.setNoDelay(noDelay);
        if (keepAlive) sock.setKeepAlive(keepAlive, keepAliveDelay);
        var c = new Connection(sock);
        c.open(fields, function(err, ok2) {
          if (timeout) sock.setTimeout(0);
          if (err === null) {
            openCallback(null, c);
          } else {
            sock.end();
            sock.destroy();
            openCallback(err);
          }
        });
      }
      if (protocol === "amqp:") {
        sock = __require("net").connect(sockopts, onConnect);
      } else if (protocol === "amqps:") {
        sock = __require("tls").connect(sockopts, onConnect);
      } else {
        throw new Error("Expected amqp: or amqps: as the protocol; got " + protocol);
      }
      if (timeout) {
        sock.setTimeout(timeout, function() {
          sock.end();
          sock.destroy();
          openCallback(new Error("connect ETIMEDOUT"));
        });
      }
      sock.once("error", function(err) {
        if (!sockok) openCallback(err);
      });
    }
    module.exports.connect = connect;
    module.exports.credentialsFromUrl = credentialsFromUrl;
  }
});

// ../node_modules/amqplib/lib/channel.js
var require_channel = __commonJS({
  "../node_modules/amqplib/lib/channel.js"(exports, module) {
    "use strict";
    var defs = require_defs();
    var closeMsg = require_format().closeMessage;
    var inspect = require_format().inspect;
    var methodName = require_format().methodName;
    var assert2 = __require("assert");
    var EventEmitter = __require("events");
    var fmt = __require("util").format;
    var IllegalOperationError = require_error().IllegalOperationError;
    var stackCapture = require_error().stackCapture;
    var Channel = class extends EventEmitter {
      constructor(connection2) {
        super();
        this.connection = connection2;
        this.reply = null;
        this.pending = [];
        this.lwm = 1;
        this.unconfirmed = [];
        this.on("ack", this.handleConfirm.bind(this, function(cb) {
          if (cb)
            cb(null);
        }));
        this.on("nack", this.handleConfirm.bind(this, function(cb) {
          if (cb)
            cb(new Error("message nacked"));
        }));
        this.on("close", function() {
          var cb;
          while (cb = this.unconfirmed.shift()) {
            if (cb)
              cb(new Error("channel closed"));
          }
        });
        this.handleMessage = acceptDeliveryOrReturn;
      }
      setOptions(options) {
        this.options = options;
      }
      allocate() {
        this.ch = this.connection.freshChannel(this, this.options);
        return this;
      }
      // Incoming frames are either notifications of e.g., message delivery,
      // or replies to something we've sent. In general I deal with the
      // former by emitting an event, and with the latter by keeping a track
      // of what's expecting a reply.
      //
      // The AMQP specification implies that RPCs can't be pipelined; that
      // is, you can have only one outstanding RPC on a channel at a
      // time. Certainly that's what RabbitMQ and its clients assume. For
      // this reason, I buffer RPCs if the channel is already waiting for a
      // reply.
      // Just send the damn frame.
      sendImmediately(method, fields) {
        return this.connection.sendMethod(this.ch, method, fields);
      }
      // Invariant: !this.reply -> pending.length == 0. That is, whenever we
      // clear a reply, we must send another RPC (and thereby fill
      // this.reply) if there is one waiting. The invariant relevant here
      // and in `accept`.
      sendOrEnqueue(method, fields, reply) {
        if (!this.reply) {
          assert2(this.pending.length === 0);
          this.reply = reply;
          this.sendImmediately(method, fields);
        } else {
          this.pending.push({
            method,
            fields,
            reply
          });
        }
      }
      sendMessage(fields, properties, content) {
        return this.connection.sendMessage(
          this.ch,
          defs.BasicPublish,
          fields,
          defs.BasicProperties,
          properties,
          content
        );
      }
      // Internal, synchronously resolved RPC; the return value is resolved
      // with the whole frame.
      _rpc(method, fields, expect, cb) {
        var self2 = this;
        function reply(err, f) {
          if (err === null) {
            if (f.id === expect) {
              return cb(null, f);
            } else {
              var expectedName = methodName(expect);
              var e = new Error(fmt(
                "Expected %s; got %s",
                expectedName,
                inspect(f, false)
              ));
              self2.closeWithError(
                f.id,
                fmt(
                  "Expected %s; got %s",
                  expectedName,
                  methodName(f.id)
                ),
                defs.constants.UNEXPECTED_FRAME,
                e
              );
              return cb(e);
            }
          } else if (err instanceof Error)
            return cb(err);
          else {
            var closeReason = (err.fields.classId << 16) + err.fields.methodId;
            var e = method === closeReason ? fmt(
              "Operation failed: %s; %s",
              methodName(method),
              closeMsg(err)
            ) : fmt("Channel closed by server: %s", closeMsg(err));
            var closeFrameError = new Error(e);
            closeFrameError.code = err.fields.replyCode;
            closeFrameError.classId = err.fields.classId;
            closeFrameError.methodId = err.fields.methodId;
            return cb(closeFrameError);
          }
        }
        this.sendOrEnqueue(method, fields, reply);
      }
      // Move to entirely closed state.
      toClosed(capturedStack) {
        this._rejectPending();
        invalidateSend(this, "Channel closed", capturedStack);
        this.accept = invalidOp("Channel closed", capturedStack);
        this.connection.releaseChannel(this.ch);
        this.emit("close");
      }
      // Stop being able to send and receive methods and content. Used when
      // we close the channel. Invokes the continuation once the server has
      // acknowledged the close, but before the channel is moved to the
      // closed state.
      toClosing(capturedStack, k) {
        var send = this.sendImmediately.bind(this);
        invalidateSend(this, "Channel closing", capturedStack);
        this.accept = function(f) {
          if (f.id === defs.ChannelCloseOk) {
            if (k)
              k();
            var s = stackCapture("ChannelCloseOk frame received");
            this.toClosed(s);
          } else if (f.id === defs.ChannelClose) {
            send(defs.ChannelCloseOk, {});
          }
        };
      }
      _rejectPending() {
        function rej(r) {
          r(new Error("Channel ended, no reply will be forthcoming"));
        }
        if (this.reply !== null)
          rej(this.reply);
        this.reply = null;
        var discard;
        while (discard = this.pending.shift())
          rej(discard.reply);
        this.pending = null;
      }
      closeBecause(reason, code, k) {
        this.sendImmediately(defs.ChannelClose, {
          replyText: reason,
          replyCode: code,
          methodId: 0,
          classId: 0
        });
        var s = stackCapture("closeBecause called: " + reason);
        this.toClosing(s, k);
      }
      // If we close because there's been an error, we need to distinguish
      // between what we tell the server (`reason`) and what we report as
      // the cause in the client (`error`).
      closeWithError(id, reason, code, error48) {
        var self2 = this;
        this.closeBecause(reason, code, function() {
          error48.code = code;
          if (id) {
            error48.classId = defs.info(id).classId;
            error48.methodId = defs.info(id).methodId;
          }
          self2.emit("error", error48);
        });
      }
      // A trampolining state machine for message frames on a channel. A
      // message arrives in at least two frames: first, a method announcing
      // the message (either a BasicDeliver or BasicGetOk); then, a message
      // header with the message properties; then, zero or more content
      // frames.
      // Keep the try/catch localised, in an attempt to avoid disabling
      // optimisation
      acceptMessageFrame(f) {
        try {
          this.handleMessage = this.handleMessage(f);
        } catch (msg) {
          if (typeof msg === "string") {
            this.closeWithError(
              f.id,
              msg,
              defs.constants.UNEXPECTED_FRAME,
              new Error(msg)
            );
          } else if (msg instanceof Error) {
            this.closeWithError(
              f.id,
              "Error while processing message",
              defs.constants.INTERNAL_ERROR,
              msg
            );
          } else {
            this.closeWithError(
              f.id,
              "Internal error while processing message",
              defs.constants.INTERNAL_ERROR,
              new Error(msg.toString())
            );
          }
        }
      }
      handleConfirm(handle, f) {
        var tag = f.deliveryTag;
        var multi = f.multiple;
        if (multi) {
          var confirmed = this.unconfirmed.splice(0, tag - this.lwm + 1);
          this.lwm = tag + 1;
          confirmed.forEach(handle);
        } else {
          var c;
          if (tag === this.lwm) {
            c = this.unconfirmed.shift();
            this.lwm++;
            while (this.unconfirmed[0] === null) {
              this.unconfirmed.shift();
              this.lwm++;
            }
          } else {
            c = this.unconfirmed[tag - this.lwm];
            this.unconfirmed[tag - this.lwm] = null;
          }
          handle(c);
        }
      }
      pushConfirmCallback(cb) {
        this.unconfirmed.push(cb || false);
      }
      onBufferDrain() {
        this.emit("drain");
      }
      accept(f) {
        switch (f.id) {
          // Message frames
          case void 0:
          // content frame!
          case defs.BasicDeliver:
          case defs.BasicReturn:
          case defs.BasicProperties:
            return this.acceptMessageFrame(f);
          // confirmations, need to do confirm.select first
          case defs.BasicAck:
            return this.emit("ack", f.fields);
          case defs.BasicNack:
            return this.emit("nack", f.fields);
          case defs.BasicCancel:
            return this.emit("cancel", f.fields);
          case defs.ChannelClose:
            if (this.reply) {
              var reply = this.reply;
              this.reply = null;
              reply(f);
            }
            var emsg = "Channel closed by server: " + closeMsg(f);
            this.sendImmediately(defs.ChannelCloseOk, {});
            var error48 = new Error(emsg);
            error48.code = f.fields.replyCode;
            error48.classId = f.fields.classId;
            error48.methodId = f.fields.methodId;
            this.emit("error", error48);
            var s = stackCapture(emsg);
            this.toClosed(s);
            return;
          case defs.BasicFlow:
            return this.closeWithError(
              f.id,
              "Flow not implemented",
              defs.constants.NOT_IMPLEMENTED,
              new Error("Flow not implemented")
            );
          default:
            var reply = this.reply;
            this.reply = null;
            if (this.pending.length > 0) {
              var send = this.pending.shift();
              this.reply = send.reply;
              this.sendImmediately(send.method, send.fields);
            }
            return reply(null, f);
        }
      }
    };
    function invalidOp(msg, stack) {
      return function() {
        throw new IllegalOperationError(msg, stack);
      };
    }
    function invalidateSend(ch, msg, stack) {
      ch.sendImmediately = ch.sendOrEnqueue = ch.sendMessage = invalidOp(msg, stack);
    }
    function acceptDeliveryOrReturn(f) {
      var event;
      if (f.id === defs.BasicDeliver) event = "delivery";
      else if (f.id === defs.BasicReturn) event = "return";
      else throw fmt(
        "Expected BasicDeliver or BasicReturn; got %s",
        inspect(f)
      );
      var self2 = this;
      var fields = f.fields;
      return acceptMessage(function(message) {
        message.fields = fields;
        self2.emit(event, message);
      });
    }
    function acceptMessage(continuation) {
      var totalSize = 0, remaining = 0;
      var buffers = null;
      var message = {
        fields: null,
        properties: null,
        content: null
      };
      return headers;
      function headers(f) {
        if (f.id === defs.BasicProperties) {
          message.properties = f.fields;
          totalSize = remaining = f.size;
          if (totalSize === 0) {
            message.content = Buffer.alloc(0);
            continuation(message);
            return acceptDeliveryOrReturn;
          } else {
            return content;
          }
        } else {
          throw "Expected headers frame after delivery";
        }
      }
      function content(f) {
        if (f.content) {
          var size = f.content.length;
          remaining -= size;
          if (remaining === 0) {
            if (buffers !== null) {
              buffers.push(f.content);
              message.content = Buffer.concat(buffers);
            } else {
              message.content = f.content;
            }
            continuation(message);
            return acceptDeliveryOrReturn;
          } else if (remaining < 0) {
            throw fmt(
              "Too much content sent! Expected %d bytes",
              totalSize
            );
          } else {
            if (buffers !== null)
              buffers.push(f.content);
            else
              buffers = [f.content];
            return content;
          }
        } else throw "Expected content frame after headers";
      }
    }
    var BaseChannel = class extends Channel {
      constructor(connection2) {
        super(connection2);
        this.consumers = /* @__PURE__ */ new Map();
      }
      // Not sure I like the ff, it's going to be changing hidden classes
      // all over the place. On the other hand, whaddya do.
      registerConsumer(tag, callback) {
        this.consumers.set(tag, callback);
      }
      unregisterConsumer(tag) {
        this.consumers.delete(tag);
      }
      dispatchMessage(fields, message) {
        var consumerTag = fields.consumerTag;
        var consumer = this.consumers.get(consumerTag);
        if (consumer) {
          return consumer(message);
        } else {
          throw new Error("Unknown consumer: " + consumerTag);
        }
      }
      handleDelivery(message) {
        return this.dispatchMessage(message.fields, message);
      }
      handleCancel(fields) {
        var result = this.dispatchMessage(fields, null);
        this.unregisterConsumer(fields.consumerTag);
        return result;
      }
    };
    module.exports.acceptMessage = acceptMessage;
    module.exports.BaseChannel = BaseChannel;
    module.exports.Channel = Channel;
  }
});

// ../node_modules/amqplib/lib/api_args.js
var require_api_args = __commonJS({
  "../node_modules/amqplib/lib/api_args.js"(exports, module) {
    "use strict";
    function setIfDefined(obj, prop, value) {
      if (value != void 0) obj[prop] = value;
    }
    var EMPTY_OPTIONS = Object.freeze({});
    var Args = {};
    Args.assertQueue = function(queue, options) {
      queue = queue || "";
      options = options || EMPTY_OPTIONS;
      var argt = Object.create(options.arguments || null);
      setIfDefined(argt, "x-expires", options.expires);
      setIfDefined(argt, "x-message-ttl", options.messageTtl);
      setIfDefined(
        argt,
        "x-dead-letter-exchange",
        options.deadLetterExchange
      );
      setIfDefined(
        argt,
        "x-dead-letter-routing-key",
        options.deadLetterRoutingKey
      );
      setIfDefined(argt, "x-max-length", options.maxLength);
      setIfDefined(argt, "x-max-priority", options.maxPriority);
      setIfDefined(argt, "x-overflow", options.overflow);
      setIfDefined(argt, "x-queue-mode", options.queueMode);
      return {
        queue,
        exclusive: !!options.exclusive,
        durable: options.durable === void 0 ? true : options.durable,
        autoDelete: !!options.autoDelete,
        arguments: argt,
        passive: false,
        // deprecated but we have to include it
        ticket: 0,
        nowait: false
      };
    };
    Args.checkQueue = function(queue) {
      return {
        queue,
        passive: true,
        // switch to "completely different" mode
        nowait: false,
        durable: true,
        autoDelete: false,
        exclusive: false,
        // ignored
        ticket: 0
      };
    };
    Args.deleteQueue = function(queue, options) {
      options = options || EMPTY_OPTIONS;
      return {
        queue,
        ifUnused: !!options.ifUnused,
        ifEmpty: !!options.ifEmpty,
        ticket: 0,
        nowait: false
      };
    };
    Args.purgeQueue = function(queue) {
      return {
        queue,
        ticket: 0,
        nowait: false
      };
    };
    Args.bindQueue = function(queue, source, pattern, argt) {
      return {
        queue,
        exchange: source,
        routingKey: pattern,
        arguments: argt,
        ticket: 0,
        nowait: false
      };
    };
    Args.unbindQueue = function(queue, source, pattern, argt) {
      return {
        queue,
        exchange: source,
        routingKey: pattern,
        arguments: argt,
        ticket: 0,
        nowait: false
      };
    };
    Args.assertExchange = function(exchange, type, options) {
      options = options || EMPTY_OPTIONS;
      var argt = Object.create(options.arguments || null);
      setIfDefined(argt, "alternate-exchange", options.alternateExchange);
      return {
        exchange,
        ticket: 0,
        type,
        passive: false,
        durable: options.durable === void 0 ? true : options.durable,
        autoDelete: !!options.autoDelete,
        internal: !!options.internal,
        nowait: false,
        arguments: argt
      };
    };
    Args.checkExchange = function(exchange) {
      return {
        exchange,
        passive: true,
        // switch to 'may as well be another method' mode
        nowait: false,
        // ff are ignored
        durable: true,
        internal: false,
        type: "",
        autoDelete: false,
        ticket: 0
      };
    };
    Args.deleteExchange = function(exchange, options) {
      options = options || EMPTY_OPTIONS;
      return {
        exchange,
        ifUnused: !!options.ifUnused,
        ticket: 0,
        nowait: false
      };
    };
    Args.bindExchange = function(dest, source, pattern, argt) {
      return {
        source,
        destination: dest,
        routingKey: pattern,
        arguments: argt,
        ticket: 0,
        nowait: false
      };
    };
    Args.unbindExchange = function(dest, source, pattern, argt) {
      return {
        source,
        destination: dest,
        routingKey: pattern,
        arguments: argt,
        ticket: 0,
        nowait: false
      };
    };
    Args.publish = function(exchange, routingKey, options) {
      options = options || EMPTY_OPTIONS;
      function convertCC(cc) {
        if (cc === void 0) {
          return void 0;
        } else if (Array.isArray(cc)) {
          return cc.map(String);
        } else return [String(cc)];
      }
      var headers = Object.create(options.headers || null);
      setIfDefined(headers, "CC", convertCC(options.CC));
      setIfDefined(headers, "BCC", convertCC(options.BCC));
      var deliveryMode;
      if (options.persistent !== void 0)
        deliveryMode = options.persistent ? 2 : 1;
      else if (typeof options.deliveryMode === "number")
        deliveryMode = options.deliveryMode;
      else if (options.deliveryMode)
        deliveryMode = 2;
      var expiration = options.expiration;
      if (expiration !== void 0) expiration = expiration.toString();
      return {
        // method fields
        exchange,
        routingKey,
        mandatory: !!options.mandatory,
        immediate: false,
        // RabbitMQ doesn't implement this any more
        ticket: void 0,
        // properties
        contentType: options.contentType,
        contentEncoding: options.contentEncoding,
        headers,
        deliveryMode,
        priority: options.priority,
        correlationId: options.correlationId,
        replyTo: options.replyTo,
        expiration,
        messageId: options.messageId,
        timestamp: options.timestamp,
        type: options.type,
        userId: options.userId,
        appId: options.appId,
        clusterId: void 0
      };
    };
    Args.consume = function(queue, options) {
      options = options || EMPTY_OPTIONS;
      var argt = Object.create(options.arguments || null);
      setIfDefined(argt, "x-priority", options.priority);
      return {
        ticket: 0,
        queue,
        consumerTag: options.consumerTag || "",
        noLocal: !!options.noLocal,
        noAck: !!options.noAck,
        exclusive: !!options.exclusive,
        nowait: false,
        arguments: argt
      };
    };
    Args.cancel = function(consumerTag) {
      return {
        consumerTag,
        nowait: false
      };
    };
    Args.get = function(queue, options) {
      options = options || EMPTY_OPTIONS;
      return {
        ticket: 0,
        queue,
        noAck: !!options.noAck
      };
    };
    Args.ack = function(tag, allUpTo) {
      return {
        deliveryTag: tag,
        multiple: !!allUpTo
      };
    };
    Args.nack = function(tag, allUpTo, requeue) {
      return {
        deliveryTag: tag,
        multiple: !!allUpTo,
        requeue: requeue === void 0 ? true : requeue
      };
    };
    Args.reject = function(tag, requeue) {
      return {
        deliveryTag: tag,
        requeue: requeue === void 0 ? true : requeue
      };
    };
    Args.prefetch = function(count, global2) {
      return {
        prefetchCount: count || 0,
        prefetchSize: 0,
        global: !!global2
      };
    };
    Args.recover = function() {
      return { requeue: true };
    };
    module.exports = Object.freeze(Args);
  }
});

// ../node_modules/amqplib/lib/channel_model.js
var require_channel_model = __commonJS({
  "../node_modules/amqplib/lib/channel_model.js"(exports, module) {
    "use strict";
    var EventEmitter = __require("events");
    var promisify = __require("util").promisify;
    var defs = require_defs();
    var { BaseChannel } = require_channel();
    var { acceptMessage } = require_channel();
    var Args = require_api_args();
    var { inspect } = require_format();
    var ChannelModel = class extends EventEmitter {
      constructor(connection2) {
        super();
        this.connection = connection2;
        ["error", "close", "blocked", "unblocked"].forEach((ev) => {
          connection2.on(ev, this.emit.bind(this, ev));
        });
      }
      close() {
        return promisify(this.connection.close.bind(this.connection))();
      }
      updateSecret(newSecret, reason) {
        return promisify(this.connection._updateSecret.bind(this.connection))(newSecret, reason);
      }
      async createChannel(options) {
        const channel2 = new Channel(this.connection);
        channel2.setOptions(options);
        await channel2.open();
        return channel2;
      }
      async createConfirmChannel(options) {
        const channel2 = new ConfirmChannel(this.connection);
        channel2.setOptions(options);
        await channel2.open();
        await channel2.rpc(defs.ConfirmSelect, { nowait: false }, defs.ConfirmSelectOk);
        return channel2;
      }
    };
    var Channel = class extends BaseChannel {
      constructor(connection2) {
        super(connection2);
        this.on("delivery", this.handleDelivery.bind(this));
        this.on("cancel", this.handleCancel.bind(this));
      }
      // An RPC that returns a 'proper' promise, which resolves to just the
      // response's fields; this is intended to be suitable for implementing
      // API procedures.
      async rpc(method, fields, expect) {
        const f = await promisify((cb) => {
          return this._rpc(method, fields, expect, cb);
        })();
        return f.fields;
      }
      // Do the remarkably simple channel open handshake
      async open() {
        const ch = await this.allocate.bind(this)();
        return ch.rpc(
          defs.ChannelOpen,
          { outOfBand: "" },
          defs.ChannelOpenOk
        );
      }
      close() {
        return promisify((cb) => {
          return this.closeBecause(
            "Goodbye",
            defs.constants.REPLY_SUCCESS,
            cb
          );
        })();
      }
      // === Public API, declaring queues and stuff ===
      assertQueue(queue, options) {
        return this.rpc(
          defs.QueueDeclare,
          Args.assertQueue(queue, options),
          defs.QueueDeclareOk
        );
      }
      checkQueue(queue) {
        return this.rpc(
          defs.QueueDeclare,
          Args.checkQueue(queue),
          defs.QueueDeclareOk
        );
      }
      deleteQueue(queue, options) {
        return this.rpc(
          defs.QueueDelete,
          Args.deleteQueue(queue, options),
          defs.QueueDeleteOk
        );
      }
      purgeQueue(queue) {
        return this.rpc(
          defs.QueuePurge,
          Args.purgeQueue(queue),
          defs.QueuePurgeOk
        );
      }
      bindQueue(queue, source, pattern, argt) {
        return this.rpc(
          defs.QueueBind,
          Args.bindQueue(queue, source, pattern, argt),
          defs.QueueBindOk
        );
      }
      unbindQueue(queue, source, pattern, argt) {
        return this.rpc(
          defs.QueueUnbind,
          Args.unbindQueue(queue, source, pattern, argt),
          defs.QueueUnbindOk
        );
      }
      assertExchange(exchange, type, options) {
        return this.rpc(
          defs.ExchangeDeclare,
          Args.assertExchange(exchange, type, options),
          defs.ExchangeDeclareOk
        ).then((_ok) => {
          return { exchange };
        });
      }
      checkExchange(exchange) {
        return this.rpc(
          defs.ExchangeDeclare,
          Args.checkExchange(exchange),
          defs.ExchangeDeclareOk
        );
      }
      deleteExchange(name, options) {
        return this.rpc(
          defs.ExchangeDelete,
          Args.deleteExchange(name, options),
          defs.ExchangeDeleteOk
        );
      }
      bindExchange(dest, source, pattern, argt) {
        return this.rpc(
          defs.ExchangeBind,
          Args.bindExchange(dest, source, pattern, argt),
          defs.ExchangeBindOk
        );
      }
      unbindExchange(dest, source, pattern, argt) {
        return this.rpc(
          defs.ExchangeUnbind,
          Args.unbindExchange(dest, source, pattern, argt),
          defs.ExchangeUnbindOk
        );
      }
      // Working with messages
      publish(exchange, routingKey, content, options) {
        const fieldsAndProps = Args.publish(exchange, routingKey, options);
        return this.sendMessage(fieldsAndProps, fieldsAndProps, content);
      }
      sendToQueue(queue, content, options) {
        return this.publish("", queue, content, options);
      }
      consume(queue, callback, options) {
        const fields = Args.consume(queue, options);
        return new Promise((resolve, reject) => {
          this._rpc(defs.BasicConsume, fields, defs.BasicConsumeOk, (err, ok2) => {
            if (err) return reject(err);
            this.registerConsumer(ok2.fields.consumerTag, callback);
            resolve(ok2.fields);
          });
        });
      }
      async cancel(consumerTag) {
        const ok2 = await promisify((cb) => {
          this._rpc(
            defs.BasicCancel,
            Args.cancel(consumerTag),
            defs.BasicCancelOk,
            cb
          );
        })().then((ok3) => {
          this.unregisterConsumer(consumerTag);
          return ok3.fields;
        });
      }
      get(queue, options) {
        const fields = Args.get(queue, options);
        return new Promise((resolve, reject) => {
          this.sendOrEnqueue(defs.BasicGet, fields, (err, f) => {
            if (err) return reject(err);
            if (f.id === defs.BasicGetEmpty) {
              return resolve(false);
            } else if (f.id === defs.BasicGetOk) {
              const fields2 = f.fields;
              this.handleMessage = acceptMessage((m) => {
                m.fields = fields2;
                resolve(m);
              });
            } else {
              reject(new Error(`Unexpected response to BasicGet: ${inspect(f)}`));
            }
          });
        });
      }
      ack(message, allUpTo) {
        this.sendImmediately(
          defs.BasicAck,
          Args.ack(message.fields.deliveryTag, allUpTo)
        );
      }
      ackAll() {
        this.sendImmediately(defs.BasicAck, Args.ack(0, true));
      }
      nack(message, allUpTo, requeue) {
        this.sendImmediately(
          defs.BasicNack,
          Args.nack(message.fields.deliveryTag, allUpTo, requeue)
        );
      }
      nackAll(requeue) {
        this.sendImmediately(
          defs.BasicNack,
          Args.nack(0, true, requeue)
        );
      }
      // `Basic.Nack` is not available in older RabbitMQ versions (or in the
      // AMQP specification), so you have to use the one-at-a-time
      // `Basic.Reject`. This is otherwise synonymous with
      // `#nack(message, false, requeue)`.
      reject(message, requeue) {
        this.sendImmediately(
          defs.BasicReject,
          Args.reject(message.fields.deliveryTag, requeue)
        );
      }
      recover() {
        return this.rpc(
          defs.BasicRecover,
          Args.recover(),
          defs.BasicRecoverOk
        );
      }
      qos(count, global2) {
        return this.rpc(
          defs.BasicQos,
          Args.prefetch(count, global2),
          defs.BasicQosOk
        );
      }
    };
    Channel.prototype.prefetch = Channel.prototype.qos;
    var ConfirmChannel = class extends Channel {
      publish(exchange, routingKey, content, options, cb) {
        this.pushConfirmCallback(cb);
        return super.publish(exchange, routingKey, content, options);
      }
      sendToQueue(queue, content, options, cb) {
        return this.publish("", queue, content, options, cb);
      }
      waitForConfirms() {
        const awaiting = [];
        const unconfirmed = this.unconfirmed;
        unconfirmed.forEach((val, index) => {
          if (val !== null) {
            const confirmed = new Promise((resolve, reject) => {
              unconfirmed[index] = (err) => {
                if (val) val(err);
                if (err === null) resolve();
                else reject(err);
              };
            });
            awaiting.push(confirmed);
          }
        });
        if (!this.pending) {
          var cb;
          while (cb = this.unconfirmed.shift()) {
            if (cb) cb(new Error("channel closed"));
          }
        }
        return Promise.all(awaiting);
      }
    };
    module.exports.ConfirmChannel = ConfirmChannel;
    module.exports.Channel = Channel;
    module.exports.ChannelModel = ChannelModel;
  }
});

// ../node_modules/amqplib/channel_api.js
var require_channel_api = __commonJS({
  "../node_modules/amqplib/channel_api.js"(exports, module) {
    "use strict";
    var raw_connect = require_connect().connect;
    var ChannelModel = require_channel_model().ChannelModel;
    var promisify = __require("util").promisify;
    function connect(url2, connOptions) {
      return promisify(function(cb) {
        return raw_connect(url2, connOptions, cb);
      })().then(function(conn) {
        return new ChannelModel(conn);
      });
    }
    module.exports.connect = connect;
    module.exports.credentials = require_credentials();
    module.exports.IllegalOperationError = require_error().IllegalOperationError;
  }
});

// ../node_modules/dotenv/package.json
var require_package2 = __commonJS({
  "../node_modules/dotenv/package.json"(exports, module) {
    module.exports = {
      name: "dotenv",
      version: "17.3.1",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        pretest: "npm run lint && npm run dts-check",
        test: "tap run tests/**/*.js --allow-empty-coverage --disable-coverage --timeout=60000",
        "test:coverage": "tap run tests/**/*.js --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      homepage: "https://github.com/motdotla/dotenv#readme",
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^18.11.3",
        decache: "^4.6.2",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-version": "^9.5.0",
        tap: "^19.2.0",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// ../node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "../node_modules/dotenv/lib/main.js"(exports, module) {
    "use strict";
    var fs = __require("fs");
    var path2 = __require("path");
    var os = __require("os");
    var crypto2 = __require("crypto");
    var packageJson = require_package2();
    var version2 = packageJson.version;
    var TIPS = [
      "\u{1F510} encrypt with Dotenvx: https://dotenvx.com",
      "\u{1F510} prevent committing .env to code: https://dotenvx.com/precommit",
      "\u{1F510} prevent building .env in docker: https://dotenvx.com/prebuild",
      "\u{1F916} agentic secret storage: https://dotenvx.com/as2",
      "\u26A1\uFE0F secrets for agents: https://dotenvx.com/as2",
      "\u{1F6E1}\uFE0F auth for agents: https://vestauth.com",
      "\u{1F6E0}\uFE0F  run anywhere with `dotenvx run -- yourcommand`",
      "\u2699\uFE0F  specify custom .env file path with { path: '/custom/path/.env' }",
      "\u2699\uFE0F  enable debug logging with { debug: true }",
      "\u2699\uFE0F  override existing env vars with { override: true }",
      "\u2699\uFE0F  suppress all logs with { quiet: true }",
      "\u2699\uFE0F  write to custom object with { processEnv: myObject }",
      "\u2699\uFE0F  load multiple .env files with { path: ['.env.local', '.env'] }"
    ];
    function _getRandomTip() {
      return TIPS[Math.floor(Math.random() * TIPS.length)];
    }
    function parseBoolean(value) {
      if (typeof value === "string") {
        return !["false", "0", "no", "off", ""].includes(value.toLowerCase());
      }
      return Boolean(value);
    }
    function supportsAnsi() {
      return process.stdout.isTTY;
    }
    function dim(text) {
      return supportsAnsi() ? `\x1B[2m${text}\x1B[0m` : text;
    }
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse3(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      options = options || {};
      const vaultPath = _vaultPath(options);
      options.path = vaultPath;
      const result = DotenvModule.configDotenv(options);
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error48) {
          if (i + 1 >= length) {
            throw error48;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _warn(message) {
      console.error(`[dotenv@${version2}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version2}][DEBUG] ${message}`);
    }
    function _log(message) {
      console.log(`[dotenv@${version2}] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error48) {
        if (error48.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error48;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path2.resolve(process.cwd(), ".env.vault");
      }
      if (fs.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path2.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      const debug = parseBoolean(process.env.DOTENV_CONFIG_DEBUG || options && options.debug);
      const quiet = parseBoolean(process.env.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (debug || !quiet) {
        _log("Loading env from encrypted .env.vault");
      }
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path2.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      let debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || options && options.debug);
      let quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path3 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs.readFileSync(path3, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`Failed to load ${path3} ${e.message}`);
          }
          lastError = e;
        }
      }
      const populated = DotenvModule.populate(processEnv, parsedAll, options);
      debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || debug);
      quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || quiet);
      if (debug || !quiet) {
        const keysCount = Object.keys(populated).length;
        const shortPaths = [];
        for (const filePath of optionPaths) {
          try {
            const relative = path2.relative(process.cwd(), filePath);
            shortPaths.push(relative);
          } catch (e) {
            if (debug) {
              _debug(`Failed to load ${filePath} ${e.message}`);
            }
            lastError = e;
          }
        }
        _log(`injecting env (${keysCount}) from ${shortPaths.join(",")} ${dim(`-- tip: ${_getRandomTip()}`)}`);
      }
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config3(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto2.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error48) {
        const isRange = error48 instanceof RangeError;
        const invalidKeyLength = error48.message === "Invalid key length";
        const decryptionFailed = error48.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error48;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      const populated = {};
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
            populated[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
          populated[key] = parsed[key];
        }
      }
      return populated;
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config: config3,
      decrypt,
      parse: parse3,
      populate
    };
    module.exports.configDotenv = DotenvModule.configDotenv;
    module.exports._configVault = DotenvModule._configVault;
    module.exports._parseVault = DotenvModule._parseVault;
    module.exports.config = DotenvModule.config;
    module.exports.decrypt = DotenvModule.decrypt;
    module.exports.parse = DotenvModule.parse;
    module.exports.populate = DotenvModule.populate;
    module.exports = DotenvModule;
  }
});

// ../node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "../node_modules/dotenv/lib/env-options.js"(exports, module) {
    "use strict";
    var options = {};
    if (process.env.DOTENV_CONFIG_ENCODING != null) {
      options.encoding = process.env.DOTENV_CONFIG_ENCODING;
    }
    if (process.env.DOTENV_CONFIG_PATH != null) {
      options.path = process.env.DOTENV_CONFIG_PATH;
    }
    if (process.env.DOTENV_CONFIG_QUIET != null) {
      options.quiet = process.env.DOTENV_CONFIG_QUIET;
    }
    if (process.env.DOTENV_CONFIG_DEBUG != null) {
      options.debug = process.env.DOTENV_CONFIG_DEBUG;
    }
    if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
      options.override = process.env.DOTENV_CONFIG_OVERRIDE;
    }
    if (process.env.DOTENV_CONFIG_DOTENV_KEY != null) {
      options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY;
    }
    module.exports = options;
  }
});

// ../node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "../node_modules/dotenv/lib/cli-options.js"(exports, module) {
    "use strict";
    var re = /^dotenv_config_(encoding|path|quiet|debug|override|DOTENV_KEY)=(.+)$/;
    module.exports = function optionMatcher(args) {
      const options = args.reduce(function(acc, cur) {
        const matches = cur.match(re);
        if (matches) {
          acc[matches[1]] = matches[2];
        }
        return acc;
      }, {});
      if (!("quiet" in options)) {
        options.quiet = "true";
      }
      return options;
    };
  }
});

// ../shared/lib/rabbitmq.ts
var import_amqplib = __toESM(require_channel_api(), 1);

// ../shared/helpers/ConfigEnv.ts
var requireEnv = (key) => {
  const value = process.env[key];
  if (!value) throw new Error("Missing environment variable");
  return value;
};
var optionalEnv = (key, defaultValue) => {
  return process.env[key] ?? defaultValue;
};
var env = {
  JWT_SECRET: requireEnv("JWT_SECRET"),
  BCRYPT_ROUNDS: Number(requireEnv("BCRYPT_ROUNDS")),
  DATABASE_URL: requireEnv("DATABASE_URL"),
  NODE_ENV: requireEnv("NODE_ENV"),
  REDIS_URL: requireEnv("REDIS_URL"),
  RABBITMQ_URL: requireEnv("RABBITMQ_URL"),
  RABBITMQ_VHOST: optionalEnv("RABBITMQ_VHOST", "/"),
  MAIL_EMAIL: requireEnv("MAIL_EMAIL"),
  MAIL_PASSWORD: requireEnv("MAIL_PASSWORD"),
  MAIL_HOST: requireEnv("MAIL_HOST"),
  MAIL_PORT: requireEnv("MAIL_PORT")
};

// ../shared/lib/rabbitmq.ts
var connection;
var channel;
var connectRabbitMQ = async () => {
  connection = await import_amqplib.default.connect(env.RABBITMQ_URL, { vhost: env.RABBITMQ_VHOST });
  channel = await connection.createChannel();
  await channel.assertExchange("habitpulse.auth", "direct", { durable: true });
  await channel.assertQueue("auth.email", { durable: true });
  await channel.bindQueue("auth.email", "habitpulse.auth", "email");
  console.log("RabbitMQ connected");
};
var getChannel = () => {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  return channel;
};

// ../shared/lib/redis.ts
import { createClient } from "redis";
var redisClient = createClient({ url: env.REDIS_URL });
redisClient.on("error", (err) => console.error("Redis error:", err));
redisClient.on("connect", () => console.log("Redis connected"));
var redis_default = redisClient;

// src/app.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// ../node_modules/zod/v4/classic/external.js
var external_exports = {};
__export(external_exports, {
  $brand: () => $brand,
  $input: () => $input,
  $output: () => $output,
  NEVER: () => NEVER,
  TimePrecision: () => TimePrecision,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBase64: () => ZodBase64,
  ZodBase64URL: () => ZodBase64URL,
  ZodBigInt: () => ZodBigInt,
  ZodBigIntFormat: () => ZodBigIntFormat,
  ZodBoolean: () => ZodBoolean,
  ZodCIDRv4: () => ZodCIDRv4,
  ZodCIDRv6: () => ZodCIDRv6,
  ZodCUID: () => ZodCUID,
  ZodCUID2: () => ZodCUID2,
  ZodCatch: () => ZodCatch,
  ZodCodec: () => ZodCodec,
  ZodCustom: () => ZodCustom,
  ZodCustomStringFormat: () => ZodCustomStringFormat,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodE164: () => ZodE164,
  ZodEmail: () => ZodEmail,
  ZodEmoji: () => ZodEmoji,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodExactOptional: () => ZodExactOptional,
  ZodFile: () => ZodFile,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodGUID: () => ZodGUID,
  ZodIPv4: () => ZodIPv4,
  ZodIPv6: () => ZodIPv6,
  ZodISODate: () => ZodISODate,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODuration: () => ZodISODuration,
  ZodISOTime: () => ZodISOTime,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodJWT: () => ZodJWT,
  ZodKSUID: () => ZodKSUID,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMAC: () => ZodMAC,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNanoID: () => ZodNanoID,
  ZodNever: () => ZodNever,
  ZodNonOptional: () => ZodNonOptional,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodNumberFormat: () => ZodNumberFormat,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodPipe: () => ZodPipe,
  ZodPrefault: () => ZodPrefault,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRealError: () => ZodRealError,
  ZodRecord: () => ZodRecord,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodStringFormat: () => ZodStringFormat,
  ZodSuccess: () => ZodSuccess,
  ZodSymbol: () => ZodSymbol,
  ZodTemplateLiteral: () => ZodTemplateLiteral,
  ZodTransform: () => ZodTransform,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodULID: () => ZodULID,
  ZodURL: () => ZodURL,
  ZodUUID: () => ZodUUID,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  ZodXID: () => ZodXID,
  ZodXor: () => ZodXor,
  _ZodString: () => _ZodString,
  _default: () => _default2,
  _function: () => _function,
  any: () => any,
  array: () => array,
  base64: () => base642,
  base64url: () => base64url2,
  bigint: () => bigint2,
  boolean: () => boolean2,
  catch: () => _catch2,
  check: () => check,
  cidrv4: () => cidrv42,
  cidrv6: () => cidrv62,
  clone: () => clone,
  codec: () => codec,
  coerce: () => coerce_exports,
  config: () => config,
  core: () => core_exports2,
  cuid: () => cuid3,
  cuid2: () => cuid22,
  custom: () => custom,
  date: () => date3,
  decode: () => decode2,
  decodeAsync: () => decodeAsync2,
  describe: () => describe2,
  discriminatedUnion: () => discriminatedUnion,
  e164: () => e1642,
  email: () => email2,
  emoji: () => emoji2,
  encode: () => encode2,
  encodeAsync: () => encodeAsync2,
  endsWith: () => _endsWith,
  enum: () => _enum2,
  exactOptional: () => exactOptional,
  file: () => file,
  flattenError: () => flattenError,
  float32: () => float32,
  float64: () => float64,
  formatError: () => formatError,
  fromJSONSchema: () => fromJSONSchema,
  function: () => _function,
  getErrorMap: () => getErrorMap,
  globalRegistry: () => globalRegistry,
  gt: () => _gt,
  gte: () => _gte,
  guid: () => guid2,
  hash: () => hash,
  hex: () => hex2,
  hostname: () => hostname2,
  httpUrl: () => httpUrl,
  includes: () => _includes,
  instanceof: () => _instanceof,
  int: () => int,
  int32: () => int32,
  int64: () => int64,
  intersection: () => intersection,
  ipv4: () => ipv42,
  ipv6: () => ipv62,
  iso: () => iso_exports,
  json: () => json,
  jwt: () => jwt,
  keyof: () => keyof,
  ksuid: () => ksuid2,
  lazy: () => lazy,
  length: () => _length,
  literal: () => literal,
  locales: () => locales_exports,
  looseObject: () => looseObject,
  looseRecord: () => looseRecord,
  lowercase: () => _lowercase,
  lt: () => _lt,
  lte: () => _lte,
  mac: () => mac2,
  map: () => map,
  maxLength: () => _maxLength,
  maxSize: () => _maxSize,
  meta: () => meta2,
  mime: () => _mime,
  minLength: () => _minLength,
  minSize: () => _minSize,
  multipleOf: () => _multipleOf,
  nan: () => nan,
  nanoid: () => nanoid2,
  nativeEnum: () => nativeEnum,
  negative: () => _negative,
  never: () => never,
  nonnegative: () => _nonnegative,
  nonoptional: () => nonoptional,
  nonpositive: () => _nonpositive,
  normalize: () => _normalize,
  null: () => _null3,
  nullable: () => nullable,
  nullish: () => nullish2,
  number: () => number2,
  object: () => object,
  optional: () => optional,
  overwrite: () => _overwrite,
  parse: () => parse2,
  parseAsync: () => parseAsync2,
  partialRecord: () => partialRecord,
  pipe: () => pipe,
  positive: () => _positive,
  prefault: () => prefault,
  preprocess: () => preprocess,
  prettifyError: () => prettifyError,
  promise: () => promise,
  property: () => _property,
  readonly: () => readonly,
  record: () => record,
  refine: () => refine,
  regex: () => _regex,
  regexes: () => regexes_exports,
  registry: () => registry,
  safeDecode: () => safeDecode2,
  safeDecodeAsync: () => safeDecodeAsync2,
  safeEncode: () => safeEncode2,
  safeEncodeAsync: () => safeEncodeAsync2,
  safeParse: () => safeParse2,
  safeParseAsync: () => safeParseAsync2,
  set: () => set,
  setErrorMap: () => setErrorMap,
  size: () => _size,
  slugify: () => _slugify,
  startsWith: () => _startsWith,
  strictObject: () => strictObject,
  string: () => string2,
  stringFormat: () => stringFormat,
  stringbool: () => stringbool,
  success: () => success,
  superRefine: () => superRefine,
  symbol: () => symbol,
  templateLiteral: () => templateLiteral,
  toJSONSchema: () => toJSONSchema,
  toLowerCase: () => _toLowerCase,
  toUpperCase: () => _toUpperCase,
  transform: () => transform,
  treeifyError: () => treeifyError,
  trim: () => _trim,
  tuple: () => tuple,
  uint32: () => uint32,
  uint64: () => uint64,
  ulid: () => ulid2,
  undefined: () => _undefined3,
  union: () => union,
  unknown: () => unknown,
  uppercase: () => _uppercase,
  url: () => url,
  util: () => util_exports,
  uuid: () => uuid2,
  uuidv4: () => uuidv4,
  uuidv6: () => uuidv6,
  uuidv7: () => uuidv7,
  void: () => _void2,
  xid: () => xid2,
  xor: () => xor
});

// ../node_modules/zod/v4/core/index.js
var core_exports2 = {};
__export(core_exports2, {
  $ZodAny: () => $ZodAny,
  $ZodArray: () => $ZodArray,
  $ZodAsyncError: () => $ZodAsyncError,
  $ZodBase64: () => $ZodBase64,
  $ZodBase64URL: () => $ZodBase64URL,
  $ZodBigInt: () => $ZodBigInt,
  $ZodBigIntFormat: () => $ZodBigIntFormat,
  $ZodBoolean: () => $ZodBoolean,
  $ZodCIDRv4: () => $ZodCIDRv4,
  $ZodCIDRv6: () => $ZodCIDRv6,
  $ZodCUID: () => $ZodCUID,
  $ZodCUID2: () => $ZodCUID2,
  $ZodCatch: () => $ZodCatch,
  $ZodCheck: () => $ZodCheck,
  $ZodCheckBigIntFormat: () => $ZodCheckBigIntFormat,
  $ZodCheckEndsWith: () => $ZodCheckEndsWith,
  $ZodCheckGreaterThan: () => $ZodCheckGreaterThan,
  $ZodCheckIncludes: () => $ZodCheckIncludes,
  $ZodCheckLengthEquals: () => $ZodCheckLengthEquals,
  $ZodCheckLessThan: () => $ZodCheckLessThan,
  $ZodCheckLowerCase: () => $ZodCheckLowerCase,
  $ZodCheckMaxLength: () => $ZodCheckMaxLength,
  $ZodCheckMaxSize: () => $ZodCheckMaxSize,
  $ZodCheckMimeType: () => $ZodCheckMimeType,
  $ZodCheckMinLength: () => $ZodCheckMinLength,
  $ZodCheckMinSize: () => $ZodCheckMinSize,
  $ZodCheckMultipleOf: () => $ZodCheckMultipleOf,
  $ZodCheckNumberFormat: () => $ZodCheckNumberFormat,
  $ZodCheckOverwrite: () => $ZodCheckOverwrite,
  $ZodCheckProperty: () => $ZodCheckProperty,
  $ZodCheckRegex: () => $ZodCheckRegex,
  $ZodCheckSizeEquals: () => $ZodCheckSizeEquals,
  $ZodCheckStartsWith: () => $ZodCheckStartsWith,
  $ZodCheckStringFormat: () => $ZodCheckStringFormat,
  $ZodCheckUpperCase: () => $ZodCheckUpperCase,
  $ZodCodec: () => $ZodCodec,
  $ZodCustom: () => $ZodCustom,
  $ZodCustomStringFormat: () => $ZodCustomStringFormat,
  $ZodDate: () => $ZodDate,
  $ZodDefault: () => $ZodDefault,
  $ZodDiscriminatedUnion: () => $ZodDiscriminatedUnion,
  $ZodE164: () => $ZodE164,
  $ZodEmail: () => $ZodEmail,
  $ZodEmoji: () => $ZodEmoji,
  $ZodEncodeError: () => $ZodEncodeError,
  $ZodEnum: () => $ZodEnum,
  $ZodError: () => $ZodError,
  $ZodExactOptional: () => $ZodExactOptional,
  $ZodFile: () => $ZodFile,
  $ZodFunction: () => $ZodFunction,
  $ZodGUID: () => $ZodGUID,
  $ZodIPv4: () => $ZodIPv4,
  $ZodIPv6: () => $ZodIPv6,
  $ZodISODate: () => $ZodISODate,
  $ZodISODateTime: () => $ZodISODateTime,
  $ZodISODuration: () => $ZodISODuration,
  $ZodISOTime: () => $ZodISOTime,
  $ZodIntersection: () => $ZodIntersection,
  $ZodJWT: () => $ZodJWT,
  $ZodKSUID: () => $ZodKSUID,
  $ZodLazy: () => $ZodLazy,
  $ZodLiteral: () => $ZodLiteral,
  $ZodMAC: () => $ZodMAC,
  $ZodMap: () => $ZodMap,
  $ZodNaN: () => $ZodNaN,
  $ZodNanoID: () => $ZodNanoID,
  $ZodNever: () => $ZodNever,
  $ZodNonOptional: () => $ZodNonOptional,
  $ZodNull: () => $ZodNull,
  $ZodNullable: () => $ZodNullable,
  $ZodNumber: () => $ZodNumber,
  $ZodNumberFormat: () => $ZodNumberFormat,
  $ZodObject: () => $ZodObject,
  $ZodObjectJIT: () => $ZodObjectJIT,
  $ZodOptional: () => $ZodOptional,
  $ZodPipe: () => $ZodPipe,
  $ZodPrefault: () => $ZodPrefault,
  $ZodPromise: () => $ZodPromise,
  $ZodReadonly: () => $ZodReadonly,
  $ZodRealError: () => $ZodRealError,
  $ZodRecord: () => $ZodRecord,
  $ZodRegistry: () => $ZodRegistry,
  $ZodSet: () => $ZodSet,
  $ZodString: () => $ZodString,
  $ZodStringFormat: () => $ZodStringFormat,
  $ZodSuccess: () => $ZodSuccess,
  $ZodSymbol: () => $ZodSymbol,
  $ZodTemplateLiteral: () => $ZodTemplateLiteral,
  $ZodTransform: () => $ZodTransform,
  $ZodTuple: () => $ZodTuple,
  $ZodType: () => $ZodType,
  $ZodULID: () => $ZodULID,
  $ZodURL: () => $ZodURL,
  $ZodUUID: () => $ZodUUID,
  $ZodUndefined: () => $ZodUndefined,
  $ZodUnion: () => $ZodUnion,
  $ZodUnknown: () => $ZodUnknown,
  $ZodVoid: () => $ZodVoid,
  $ZodXID: () => $ZodXID,
  $ZodXor: () => $ZodXor,
  $brand: () => $brand,
  $constructor: () => $constructor,
  $input: () => $input,
  $output: () => $output,
  Doc: () => Doc,
  JSONSchema: () => json_schema_exports,
  JSONSchemaGenerator: () => JSONSchemaGenerator,
  NEVER: () => NEVER,
  TimePrecision: () => TimePrecision,
  _any: () => _any,
  _array: () => _array,
  _base64: () => _base64,
  _base64url: () => _base64url,
  _bigint: () => _bigint,
  _boolean: () => _boolean,
  _catch: () => _catch,
  _check: () => _check,
  _cidrv4: () => _cidrv4,
  _cidrv6: () => _cidrv6,
  _coercedBigint: () => _coercedBigint,
  _coercedBoolean: () => _coercedBoolean,
  _coercedDate: () => _coercedDate,
  _coercedNumber: () => _coercedNumber,
  _coercedString: () => _coercedString,
  _cuid: () => _cuid,
  _cuid2: () => _cuid2,
  _custom: () => _custom,
  _date: () => _date,
  _decode: () => _decode,
  _decodeAsync: () => _decodeAsync,
  _default: () => _default,
  _discriminatedUnion: () => _discriminatedUnion,
  _e164: () => _e164,
  _email: () => _email,
  _emoji: () => _emoji2,
  _encode: () => _encode,
  _encodeAsync: () => _encodeAsync,
  _endsWith: () => _endsWith,
  _enum: () => _enum,
  _file: () => _file,
  _float32: () => _float32,
  _float64: () => _float64,
  _gt: () => _gt,
  _gte: () => _gte,
  _guid: () => _guid,
  _includes: () => _includes,
  _int: () => _int,
  _int32: () => _int32,
  _int64: () => _int64,
  _intersection: () => _intersection,
  _ipv4: () => _ipv4,
  _ipv6: () => _ipv6,
  _isoDate: () => _isoDate,
  _isoDateTime: () => _isoDateTime,
  _isoDuration: () => _isoDuration,
  _isoTime: () => _isoTime,
  _jwt: () => _jwt,
  _ksuid: () => _ksuid,
  _lazy: () => _lazy,
  _length: () => _length,
  _literal: () => _literal,
  _lowercase: () => _lowercase,
  _lt: () => _lt,
  _lte: () => _lte,
  _mac: () => _mac,
  _map: () => _map,
  _max: () => _lte,
  _maxLength: () => _maxLength,
  _maxSize: () => _maxSize,
  _mime: () => _mime,
  _min: () => _gte,
  _minLength: () => _minLength,
  _minSize: () => _minSize,
  _multipleOf: () => _multipleOf,
  _nan: () => _nan,
  _nanoid: () => _nanoid,
  _nativeEnum: () => _nativeEnum,
  _negative: () => _negative,
  _never: () => _never,
  _nonnegative: () => _nonnegative,
  _nonoptional: () => _nonoptional,
  _nonpositive: () => _nonpositive,
  _normalize: () => _normalize,
  _null: () => _null2,
  _nullable: () => _nullable,
  _number: () => _number,
  _optional: () => _optional,
  _overwrite: () => _overwrite,
  _parse: () => _parse,
  _parseAsync: () => _parseAsync,
  _pipe: () => _pipe,
  _positive: () => _positive,
  _promise: () => _promise,
  _property: () => _property,
  _readonly: () => _readonly,
  _record: () => _record,
  _refine: () => _refine,
  _regex: () => _regex,
  _safeDecode: () => _safeDecode,
  _safeDecodeAsync: () => _safeDecodeAsync,
  _safeEncode: () => _safeEncode,
  _safeEncodeAsync: () => _safeEncodeAsync,
  _safeParse: () => _safeParse,
  _safeParseAsync: () => _safeParseAsync,
  _set: () => _set,
  _size: () => _size,
  _slugify: () => _slugify,
  _startsWith: () => _startsWith,
  _string: () => _string,
  _stringFormat: () => _stringFormat,
  _stringbool: () => _stringbool,
  _success: () => _success,
  _superRefine: () => _superRefine,
  _symbol: () => _symbol,
  _templateLiteral: () => _templateLiteral,
  _toLowerCase: () => _toLowerCase,
  _toUpperCase: () => _toUpperCase,
  _transform: () => _transform,
  _trim: () => _trim,
  _tuple: () => _tuple,
  _uint32: () => _uint32,
  _uint64: () => _uint64,
  _ulid: () => _ulid,
  _undefined: () => _undefined2,
  _union: () => _union,
  _unknown: () => _unknown,
  _uppercase: () => _uppercase,
  _url: () => _url,
  _uuid: () => _uuid,
  _uuidv4: () => _uuidv4,
  _uuidv6: () => _uuidv6,
  _uuidv7: () => _uuidv7,
  _void: () => _void,
  _xid: () => _xid,
  _xor: () => _xor,
  clone: () => clone,
  config: () => config,
  createStandardJSONSchemaMethod: () => createStandardJSONSchemaMethod,
  createToJSONSchemaMethod: () => createToJSONSchemaMethod,
  decode: () => decode,
  decodeAsync: () => decodeAsync,
  describe: () => describe,
  encode: () => encode,
  encodeAsync: () => encodeAsync,
  extractDefs: () => extractDefs,
  finalize: () => finalize,
  flattenError: () => flattenError,
  formatError: () => formatError,
  globalConfig: () => globalConfig,
  globalRegistry: () => globalRegistry,
  initializeContext: () => initializeContext,
  isValidBase64: () => isValidBase64,
  isValidBase64URL: () => isValidBase64URL,
  isValidJWT: () => isValidJWT,
  locales: () => locales_exports,
  meta: () => meta,
  parse: () => parse,
  parseAsync: () => parseAsync,
  prettifyError: () => prettifyError,
  process: () => process2,
  regexes: () => regexes_exports,
  registry: () => registry,
  safeDecode: () => safeDecode,
  safeDecodeAsync: () => safeDecodeAsync,
  safeEncode: () => safeEncode,
  safeEncodeAsync: () => safeEncodeAsync,
  safeParse: () => safeParse,
  safeParseAsync: () => safeParseAsync,
  toDotPath: () => toDotPath,
  toJSONSchema: () => toJSONSchema,
  treeifyError: () => treeifyError,
  util: () => util_exports,
  version: () => version
});

// ../node_modules/zod/v4/core/core.js
var NEVER = Object.freeze({
  status: "aborted"
});
// @__NO_SIDE_EFFECTS__
function $constructor(name, initializer3, params) {
  function init(inst, def) {
    if (!inst._zod) {
      Object.defineProperty(inst, "_zod", {
        value: {
          def,
          constr: _,
          traits: /* @__PURE__ */ new Set()
        },
        enumerable: false
      });
    }
    if (inst._zod.traits.has(name)) {
      return;
    }
    inst._zod.traits.add(name);
    initializer3(inst, def);
    const proto = _.prototype;
    const keys = Object.keys(proto);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (!(k in inst)) {
        inst[k] = proto[k].bind(inst);
      }
    }
  }
  const Parent = params?.Parent ?? Object;
  class Definition extends Parent {
  }
  Object.defineProperty(Definition, "name", { value: name });
  function _(def) {
    var _a2;
    const inst = params?.Parent ? new Definition() : this;
    init(inst, def);
    (_a2 = inst._zod).deferred ?? (_a2.deferred = []);
    for (const fn of inst._zod.deferred) {
      fn();
    }
    return inst;
  }
  Object.defineProperty(_, "init", { value: init });
  Object.defineProperty(_, Symbol.hasInstance, {
    value: (inst) => {
      if (params?.Parent && inst instanceof params.Parent)
        return true;
      return inst?._zod?.traits?.has(name);
    }
  });
  Object.defineProperty(_, "name", { value: name });
  return _;
}
var $brand = /* @__PURE__ */ Symbol("zod_brand");
var $ZodAsyncError = class extends Error {
  constructor() {
    super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
  }
};
var $ZodEncodeError = class extends Error {
  constructor(name) {
    super(`Encountered unidirectional transform during encode: ${name}`);
    this.name = "ZodEncodeError";
  }
};
var globalConfig = {};
function config(newConfig) {
  if (newConfig)
    Object.assign(globalConfig, newConfig);
  return globalConfig;
}

// ../node_modules/zod/v4/core/util.js
var util_exports = {};
__export(util_exports, {
  BIGINT_FORMAT_RANGES: () => BIGINT_FORMAT_RANGES,
  Class: () => Class,
  NUMBER_FORMAT_RANGES: () => NUMBER_FORMAT_RANGES,
  aborted: () => aborted,
  allowsEval: () => allowsEval,
  assert: () => assert,
  assertEqual: () => assertEqual,
  assertIs: () => assertIs,
  assertNever: () => assertNever,
  assertNotEqual: () => assertNotEqual,
  assignProp: () => assignProp,
  base64ToUint8Array: () => base64ToUint8Array,
  base64urlToUint8Array: () => base64urlToUint8Array,
  cached: () => cached,
  captureStackTrace: () => captureStackTrace,
  cleanEnum: () => cleanEnum,
  cleanRegex: () => cleanRegex,
  clone: () => clone,
  cloneDef: () => cloneDef,
  createTransparentProxy: () => createTransparentProxy,
  defineLazy: () => defineLazy,
  esc: () => esc,
  escapeRegex: () => escapeRegex,
  extend: () => extend,
  finalizeIssue: () => finalizeIssue,
  floatSafeRemainder: () => floatSafeRemainder,
  getElementAtPath: () => getElementAtPath,
  getEnumValues: () => getEnumValues,
  getLengthableOrigin: () => getLengthableOrigin,
  getParsedType: () => getParsedType,
  getSizableOrigin: () => getSizableOrigin,
  hexToUint8Array: () => hexToUint8Array,
  isObject: () => isObject,
  isPlainObject: () => isPlainObject,
  issue: () => issue,
  joinValues: () => joinValues,
  jsonStringifyReplacer: () => jsonStringifyReplacer,
  merge: () => merge,
  mergeDefs: () => mergeDefs,
  normalizeParams: () => normalizeParams,
  nullish: () => nullish,
  numKeys: () => numKeys,
  objectClone: () => objectClone,
  omit: () => omit,
  optionalKeys: () => optionalKeys,
  parsedType: () => parsedType,
  partial: () => partial,
  pick: () => pick,
  prefixIssues: () => prefixIssues,
  primitiveTypes: () => primitiveTypes,
  promiseAllObject: () => promiseAllObject,
  propertyKeyTypes: () => propertyKeyTypes,
  randomString: () => randomString,
  required: () => required,
  safeExtend: () => safeExtend,
  shallowClone: () => shallowClone,
  slugify: () => slugify,
  stringifyPrimitive: () => stringifyPrimitive,
  uint8ArrayToBase64: () => uint8ArrayToBase64,
  uint8ArrayToBase64url: () => uint8ArrayToBase64url,
  uint8ArrayToHex: () => uint8ArrayToHex,
  unwrapMessage: () => unwrapMessage
});
function assertEqual(val) {
  return val;
}
function assertNotEqual(val) {
  return val;
}
function assertIs(_arg) {
}
function assertNever(_x) {
  throw new Error("Unexpected value in exhaustive check");
}
function assert(_) {
}
function getEnumValues(entries) {
  const numericValues = Object.values(entries).filter((v) => typeof v === "number");
  const values = Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
  return values;
}
function joinValues(array2, separator = "|") {
  return array2.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
  if (typeof value === "bigint")
    return value.toString();
  return value;
}
function cached(getter) {
  const set2 = false;
  return {
    get value() {
      if (!set2) {
        const value = getter();
        Object.defineProperty(this, "value", { value });
        return value;
      }
      throw new Error("cached value already set");
    }
  };
}
function nullish(input) {
  return input === null || input === void 0;
}
function cleanRegex(source) {
  const start = source.startsWith("^") ? 1 : 0;
  const end = source.endsWith("$") ? source.length - 1 : source.length;
  return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepString = step.toString();
  let stepDecCount = (stepString.split(".")[1] || "").length;
  if (stepDecCount === 0 && /\d?e-\d?/.test(stepString)) {
    const match = stepString.match(/\d?e-(\d?)/);
    if (match?.[1]) {
      stepDecCount = Number.parseInt(match[1]);
    }
  }
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var EVALUATING = /* @__PURE__ */ Symbol("evaluating");
function defineLazy(object2, key, getter) {
  let value = void 0;
  Object.defineProperty(object2, key, {
    get() {
      if (value === EVALUATING) {
        return void 0;
      }
      if (value === void 0) {
        value = EVALUATING;
        value = getter();
      }
      return value;
    },
    set(v) {
      Object.defineProperty(object2, key, {
        value: v
        // configurable: true,
      });
    },
    configurable: true
  });
}
function objectClone(obj) {
  return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}
function assignProp(target, prop, value) {
  Object.defineProperty(target, prop, {
    value,
    writable: true,
    enumerable: true,
    configurable: true
  });
}
function mergeDefs(...defs) {
  const mergedDescriptors = {};
  for (const def of defs) {
    const descriptors = Object.getOwnPropertyDescriptors(def);
    Object.assign(mergedDescriptors, descriptors);
  }
  return Object.defineProperties({}, mergedDescriptors);
}
function cloneDef(schema) {
  return mergeDefs(schema._zod.def);
}
function getElementAtPath(obj, path2) {
  if (!path2)
    return obj;
  return path2.reduce((acc, key) => acc?.[key], obj);
}
function promiseAllObject(promisesObj) {
  const keys = Object.keys(promisesObj);
  const promises = keys.map((key) => promisesObj[key]);
  return Promise.all(promises).then((results) => {
    const resolvedObj = {};
    for (let i = 0; i < keys.length; i++) {
      resolvedObj[keys[i]] = results[i];
    }
    return resolvedObj;
  });
}
function randomString(length = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
function esc(str) {
  return JSON.stringify(str);
}
function slugify(input) {
  return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {
};
function isObject(data) {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}
var allowsEval = cached(() => {
  if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
    return false;
  }
  try {
    const F = Function;
    new F("");
    return true;
  } catch (_) {
    return false;
  }
});
function isPlainObject(o) {
  if (isObject(o) === false)
    return false;
  const ctor = o.constructor;
  if (ctor === void 0)
    return true;
  if (typeof ctor !== "function")
    return true;
  const prot = ctor.prototype;
  if (isObject(prot) === false)
    return false;
  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
    return false;
  }
  return true;
}
function shallowClone(o) {
  if (isPlainObject(o))
    return { ...o };
  if (Array.isArray(o))
    return [...o];
  return o;
}
function numKeys(data) {
  let keyCount = 0;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      keyCount++;
    }
  }
  return keyCount;
}
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return "undefined";
    case "string":
      return "string";
    case "number":
      return Number.isNaN(data) ? "nan" : "number";
    case "boolean":
      return "boolean";
    case "function":
      return "function";
    case "bigint":
      return "bigint";
    case "symbol":
      return "symbol";
    case "object":
      if (Array.isArray(data)) {
        return "array";
      }
      if (data === null) {
        return "null";
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return "promise";
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return "map";
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return "set";
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return "date";
      }
      if (typeof File !== "undefined" && data instanceof File) {
        return "file";
      }
      return "object";
    default:
      throw new Error(`Unknown data type: ${t}`);
  }
};
var propertyKeyTypes = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
var primitiveTypes = /* @__PURE__ */ new Set(["string", "number", "bigint", "boolean", "symbol", "undefined"]);
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
  const cl = new inst._zod.constr(def ?? inst._zod.def);
  if (!def || params?.parent)
    cl._zod.parent = inst;
  return cl;
}
function normalizeParams(_params) {
  const params = _params;
  if (!params)
    return {};
  if (typeof params === "string")
    return { error: () => params };
  if (params?.message !== void 0) {
    if (params?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    params.error = params.message;
  }
  delete params.message;
  if (typeof params.error === "string")
    return { ...params, error: () => params.error };
  return params;
}
function createTransparentProxy(getter) {
  let target;
  return new Proxy({}, {
    get(_, prop, receiver) {
      target ?? (target = getter());
      return Reflect.get(target, prop, receiver);
    },
    set(_, prop, value, receiver) {
      target ?? (target = getter());
      return Reflect.set(target, prop, value, receiver);
    },
    has(_, prop) {
      target ?? (target = getter());
      return Reflect.has(target, prop);
    },
    deleteProperty(_, prop) {
      target ?? (target = getter());
      return Reflect.deleteProperty(target, prop);
    },
    ownKeys(_) {
      target ?? (target = getter());
      return Reflect.ownKeys(target);
    },
    getOwnPropertyDescriptor(_, prop) {
      target ?? (target = getter());
      return Reflect.getOwnPropertyDescriptor(target, prop);
    },
    defineProperty(_, prop, descriptor) {
      target ?? (target = getter());
      return Reflect.defineProperty(target, prop, descriptor);
    }
  });
}
function stringifyPrimitive(value) {
  if (typeof value === "bigint")
    return value.toString() + "n";
  if (typeof value === "string")
    return `"${value}"`;
  return `${value}`;
}
function optionalKeys(shape) {
  return Object.keys(shape).filter((k) => {
    return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
  });
}
var NUMBER_FORMAT_RANGES = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
var BIGINT_FORMAT_RANGES = {
  int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
  uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
};
function pick(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const newShape = {};
      for (const key in mask) {
        if (!(key in currDef.shape)) {
          throw new Error(`Unrecognized key: "${key}"`);
        }
        if (!mask[key])
          continue;
        newShape[key] = currDef.shape[key];
      }
      assignProp(this, "shape", newShape);
      return newShape;
    },
    checks: []
  });
  return clone(schema, def);
}
function omit(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const newShape = { ...schema._zod.def.shape };
      for (const key in mask) {
        if (!(key in currDef.shape)) {
          throw new Error(`Unrecognized key: "${key}"`);
        }
        if (!mask[key])
          continue;
        delete newShape[key];
      }
      assignProp(this, "shape", newShape);
      return newShape;
    },
    checks: []
  });
  return clone(schema, def);
}
function extend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to extend: expected a plain object");
  }
  const checks = schema._zod.def.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    const existingShape = schema._zod.def.shape;
    for (const key in shape) {
      if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) {
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
      }
    }
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    }
  });
  return clone(schema, def);
}
function safeExtend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to safeExtend: expected a plain object");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    }
  });
  return clone(schema, def);
}
function merge(a, b) {
  const def = mergeDefs(a._zod.def, {
    get shape() {
      const _shape = { ...a._zod.def.shape, ...b._zod.def.shape };
      assignProp(this, "shape", _shape);
      return _shape;
    },
    get catchall() {
      return b._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return clone(a, def);
}
function partial(Class2, schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const oldShape = schema._zod.def.shape;
      const shape = { ...oldShape };
      if (mask) {
        for (const key in mask) {
          if (!(key in oldShape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key])
            continue;
          shape[key] = Class2 ? new Class2({
            type: "optional",
            innerType: oldShape[key]
          }) : oldShape[key];
        }
      } else {
        for (const key in oldShape) {
          shape[key] = Class2 ? new Class2({
            type: "optional",
            innerType: oldShape[key]
          }) : oldShape[key];
        }
      }
      assignProp(this, "shape", shape);
      return shape;
    },
    checks: []
  });
  return clone(schema, def);
}
function required(Class2, schema, mask) {
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const oldShape = schema._zod.def.shape;
      const shape = { ...oldShape };
      if (mask) {
        for (const key in mask) {
          if (!(key in shape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key])
            continue;
          shape[key] = new Class2({
            type: "nonoptional",
            innerType: oldShape[key]
          });
        }
      } else {
        for (const key in oldShape) {
          shape[key] = new Class2({
            type: "nonoptional",
            innerType: oldShape[key]
          });
        }
      }
      assignProp(this, "shape", shape);
      return shape;
    }
  });
  return clone(schema, def);
}
function aborted(x, startIndex = 0) {
  if (x.aborted === true)
    return true;
  for (let i = startIndex; i < x.issues.length; i++) {
    if (x.issues[i]?.continue !== true) {
      return true;
    }
  }
  return false;
}
function prefixIssues(path2, issues) {
  return issues.map((iss) => {
    var _a2;
    (_a2 = iss).path ?? (_a2.path = []);
    iss.path.unshift(path2);
    return iss;
  });
}
function unwrapMessage(message) {
  return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config3) {
  const full = { ...iss, path: iss.path ?? [] };
  if (!iss.message) {
    const message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config3.customError?.(iss)) ?? unwrapMessage(config3.localeError?.(iss)) ?? "Invalid input";
    full.message = message;
  }
  delete full.inst;
  delete full.continue;
  if (!ctx?.reportInput) {
    delete full.input;
  }
  return full;
}
function getSizableOrigin(input) {
  if (input instanceof Set)
    return "set";
  if (input instanceof Map)
    return "map";
  if (input instanceof File)
    return "file";
  return "unknown";
}
function getLengthableOrigin(input) {
  if (Array.isArray(input))
    return "array";
  if (typeof input === "string")
    return "string";
  return "unknown";
}
function parsedType(data) {
  const t = typeof data;
  switch (t) {
    case "number": {
      return Number.isNaN(data) ? "nan" : "number";
    }
    case "object": {
      if (data === null) {
        return "null";
      }
      if (Array.isArray(data)) {
        return "array";
      }
      const obj = data;
      if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) {
        return obj.constructor.name;
      }
    }
  }
  return t;
}
function issue(...args) {
  const [iss, input, inst] = args;
  if (typeof iss === "string") {
    return {
      message: iss,
      code: "custom",
      input,
      inst
    };
  }
  return { ...iss };
}
function cleanEnum(obj) {
  return Object.entries(obj).filter(([k, _]) => {
    return Number.isNaN(Number.parseInt(k, 10));
  }).map((el) => el[1]);
}
function base64ToUint8Array(base643) {
  const binaryString = atob(base643);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
function uint8ArrayToBase64(bytes) {
  let binaryString = "";
  for (let i = 0; i < bytes.length; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  return btoa(binaryString);
}
function base64urlToUint8Array(base64url3) {
  const base643 = base64url3.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - base643.length % 4) % 4);
  return base64ToUint8Array(base643 + padding);
}
function uint8ArrayToBase64url(bytes) {
  return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function hexToUint8Array(hex3) {
  const cleanHex = hex3.replace(/^0x/, "");
  if (cleanHex.length % 2 !== 0) {
    throw new Error("Invalid hex string length");
  }
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
  }
  return bytes;
}
function uint8ArrayToHex(bytes) {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
var Class = class {
  constructor(..._args) {
  }
};

// ../node_modules/zod/v4/core/errors.js
var initializer = (inst, def) => {
  inst.name = "$ZodError";
  Object.defineProperty(inst, "_zod", {
    value: inst._zod,
    enumerable: false
  });
  Object.defineProperty(inst, "issues", {
    value: def,
    enumerable: false
  });
  inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
  Object.defineProperty(inst, "toString", {
    value: () => inst.message,
    enumerable: false
  });
};
var $ZodError = $constructor("$ZodError", initializer);
var $ZodRealError = $constructor("$ZodError", initializer, { Parent: Error });
function flattenError(error48, mapper = (issue2) => issue2.message) {
  const fieldErrors = {};
  const formErrors = [];
  for (const sub of error48.issues) {
    if (sub.path.length > 0) {
      fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
      fieldErrors[sub.path[0]].push(mapper(sub));
    } else {
      formErrors.push(mapper(sub));
    }
  }
  return { formErrors, fieldErrors };
}
function formatError(error48, mapper = (issue2) => issue2.message) {
  const fieldErrors = { _errors: [] };
  const processError = (error49) => {
    for (const issue2 of error49.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues });
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues });
      } else if (issue2.path.length === 0) {
        fieldErrors._errors.push(mapper(issue2));
      } else {
        let curr = fieldErrors;
        let i = 0;
        while (i < issue2.path.length) {
          const el = issue2.path[i];
          const terminal = i === issue2.path.length - 1;
          if (!terminal) {
            curr[el] = curr[el] || { _errors: [] };
          } else {
            curr[el] = curr[el] || { _errors: [] };
            curr[el]._errors.push(mapper(issue2));
          }
          curr = curr[el];
          i++;
        }
      }
    }
  };
  processError(error48);
  return fieldErrors;
}
function treeifyError(error48, mapper = (issue2) => issue2.message) {
  const result = { errors: [] };
  const processError = (error49, path2 = []) => {
    var _a2, _b;
    for (const issue2 of error49.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }, issue2.path));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues }, issue2.path);
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues }, issue2.path);
      } else {
        const fullpath = [...path2, ...issue2.path];
        if (fullpath.length === 0) {
          result.errors.push(mapper(issue2));
          continue;
        }
        let curr = result;
        let i = 0;
        while (i < fullpath.length) {
          const el = fullpath[i];
          const terminal = i === fullpath.length - 1;
          if (typeof el === "string") {
            curr.properties ?? (curr.properties = {});
            (_a2 = curr.properties)[el] ?? (_a2[el] = { errors: [] });
            curr = curr.properties[el];
          } else {
            curr.items ?? (curr.items = []);
            (_b = curr.items)[el] ?? (_b[el] = { errors: [] });
            curr = curr.items[el];
          }
          if (terminal) {
            curr.errors.push(mapper(issue2));
          }
          i++;
        }
      }
    }
  };
  processError(error48);
  return result;
}
function toDotPath(_path) {
  const segs = [];
  const path2 = _path.map((seg) => typeof seg === "object" ? seg.key : seg);
  for (const seg of path2) {
    if (typeof seg === "number")
      segs.push(`[${seg}]`);
    else if (typeof seg === "symbol")
      segs.push(`[${JSON.stringify(String(seg))}]`);
    else if (/[^\w$]/.test(seg))
      segs.push(`[${JSON.stringify(seg)}]`);
    else {
      if (segs.length)
        segs.push(".");
      segs.push(seg);
    }
  }
  return segs.join("");
}
function prettifyError(error48) {
  const lines = [];
  const issues = [...error48.issues].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length);
  for (const issue2 of issues) {
    lines.push(`\u2716 ${issue2.message}`);
    if (issue2.path?.length)
      lines.push(`  \u2192 at ${toDotPath(issue2.path)}`);
  }
  return lines.join("\n");
}

// ../node_modules/zod/v4/core/parse.js
var _parse = (_Err) => (schema, value, _ctx, _params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError();
  }
  if (result.issues.length) {
    const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, _params?.callee);
    throw e;
  }
  return result.value;
};
var parse = /* @__PURE__ */ _parse($ZodRealError);
var _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  if (result.issues.length) {
    const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, params?.callee);
    throw e;
  }
  return result.value;
};
var parseAsync = /* @__PURE__ */ _parseAsync($ZodRealError);
var _safeParse = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError();
  }
  return result.issues.length ? {
    success: false,
    error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result.value };
};
var safeParse = /* @__PURE__ */ _safeParse($ZodRealError);
var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  return result.issues.length ? {
    success: false,
    error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result.value };
};
var safeParseAsync = /* @__PURE__ */ _safeParseAsync($ZodRealError);
var _encode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _parse(_Err)(schema, value, ctx);
};
var encode = /* @__PURE__ */ _encode($ZodRealError);
var _decode = (_Err) => (schema, value, _ctx) => {
  return _parse(_Err)(schema, value, _ctx);
};
var decode = /* @__PURE__ */ _decode($ZodRealError);
var _encodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _parseAsync(_Err)(schema, value, ctx);
};
var encodeAsync = /* @__PURE__ */ _encodeAsync($ZodRealError);
var _decodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _parseAsync(_Err)(schema, value, _ctx);
};
var decodeAsync = /* @__PURE__ */ _decodeAsync($ZodRealError);
var _safeEncode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _safeParse(_Err)(schema, value, ctx);
};
var safeEncode = /* @__PURE__ */ _safeEncode($ZodRealError);
var _safeDecode = (_Err) => (schema, value, _ctx) => {
  return _safeParse(_Err)(schema, value, _ctx);
};
var safeDecode = /* @__PURE__ */ _safeDecode($ZodRealError);
var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _safeParseAsync(_Err)(schema, value, ctx);
};
var safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync($ZodRealError);
var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _safeParseAsync(_Err)(schema, value, _ctx);
};
var safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync($ZodRealError);

// ../node_modules/zod/v4/core/regexes.js
var regexes_exports = {};
__export(regexes_exports, {
  base64: () => base64,
  base64url: () => base64url,
  bigint: () => bigint,
  boolean: () => boolean,
  browserEmail: () => browserEmail,
  cidrv4: () => cidrv4,
  cidrv6: () => cidrv6,
  cuid: () => cuid,
  cuid2: () => cuid2,
  date: () => date,
  datetime: () => datetime,
  domain: () => domain,
  duration: () => duration,
  e164: () => e164,
  email: () => email,
  emoji: () => emoji,
  extendedDuration: () => extendedDuration,
  guid: () => guid,
  hex: () => hex,
  hostname: () => hostname,
  html5Email: () => html5Email,
  idnEmail: () => idnEmail,
  integer: () => integer,
  ipv4: () => ipv4,
  ipv6: () => ipv6,
  ksuid: () => ksuid,
  lowercase: () => lowercase,
  mac: () => mac,
  md5_base64: () => md5_base64,
  md5_base64url: () => md5_base64url,
  md5_hex: () => md5_hex,
  nanoid: () => nanoid,
  null: () => _null,
  number: () => number,
  rfc5322Email: () => rfc5322Email,
  sha1_base64: () => sha1_base64,
  sha1_base64url: () => sha1_base64url,
  sha1_hex: () => sha1_hex,
  sha256_base64: () => sha256_base64,
  sha256_base64url: () => sha256_base64url,
  sha256_hex: () => sha256_hex,
  sha384_base64: () => sha384_base64,
  sha384_base64url: () => sha384_base64url,
  sha384_hex: () => sha384_hex,
  sha512_base64: () => sha512_base64,
  sha512_base64url: () => sha512_base64url,
  sha512_hex: () => sha512_hex,
  string: () => string,
  time: () => time,
  ulid: () => ulid,
  undefined: () => _undefined,
  unicodeEmail: () => unicodeEmail,
  uppercase: () => uppercase,
  uuid: () => uuid,
  uuid4: () => uuid4,
  uuid6: () => uuid6,
  uuid7: () => uuid7,
  xid: () => xid
});
var cuid = /^[cC][^\s-]{8,}$/;
var cuid2 = /^[0-9a-z]+$/;
var ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
var xid = /^[0-9a-vA-V]{20}$/;
var ksuid = /^[A-Za-z0-9]{27}$/;
var nanoid = /^[a-zA-Z0-9_-]{21}$/;
var duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
var extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
var uuid = (version2) => {
  if (!version2)
    return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
  return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version2}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
var uuid4 = /* @__PURE__ */ uuid(4);
var uuid6 = /* @__PURE__ */ uuid(6);
var uuid7 = /* @__PURE__ */ uuid(7);
var email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
var idnEmail = unicodeEmail;
var browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var _emoji = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
  return new RegExp(_emoji, "u");
}
var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
var mac = (delimiter) => {
  const escapedDelim = escapeRegex(delimiter ?? ":");
  return new RegExp(`^(?:[0-9A-F]{2}${escapedDelim}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${escapedDelim}){5}[0-9a-f]{2}$`);
};
var cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var base64url = /^[A-Za-z0-9_-]*$/;
var hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
var domain = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
var e164 = /^\+[1-9]\d{6,14}$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
var date = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
function timeSource(args) {
  const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
  const regex = typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
  return regex;
}
function time(args) {
  return new RegExp(`^${timeSource(args)}$`);
}
function datetime(args) {
  const time3 = timeSource({ precision: args.precision });
  const opts = ["Z"];
  if (args.local)
    opts.push("");
  if (args.offset)
    opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
  const timeRegex = `${time3}(?:${opts.join("|")})`;
  return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
var string = (params) => {
  const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
  return new RegExp(`^${regex}$`);
};
var bigint = /^-?\d+n?$/;
var integer = /^-?\d+$/;
var number = /^-?\d+(?:\.\d+)?$/;
var boolean = /^(?:true|false)$/i;
var _null = /^null$/i;
var _undefined = /^undefined$/i;
var lowercase = /^[^A-Z]*$/;
var uppercase = /^[^a-z]*$/;
var hex = /^[0-9a-fA-F]*$/;
function fixedBase64(bodyLength, padding) {
  return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
}
function fixedBase64url(length) {
  return new RegExp(`^[A-Za-z0-9_-]{${length}}$`);
}
var md5_hex = /^[0-9a-fA-F]{32}$/;
var md5_base64 = /* @__PURE__ */ fixedBase64(22, "==");
var md5_base64url = /* @__PURE__ */ fixedBase64url(22);
var sha1_hex = /^[0-9a-fA-F]{40}$/;
var sha1_base64 = /* @__PURE__ */ fixedBase64(27, "=");
var sha1_base64url = /* @__PURE__ */ fixedBase64url(27);
var sha256_hex = /^[0-9a-fA-F]{64}$/;
var sha256_base64 = /* @__PURE__ */ fixedBase64(43, "=");
var sha256_base64url = /* @__PURE__ */ fixedBase64url(43);
var sha384_hex = /^[0-9a-fA-F]{96}$/;
var sha384_base64 = /* @__PURE__ */ fixedBase64(64, "");
var sha384_base64url = /* @__PURE__ */ fixedBase64url(64);
var sha512_hex = /^[0-9a-fA-F]{128}$/;
var sha512_base64 = /* @__PURE__ */ fixedBase64(86, "==");
var sha512_base64url = /* @__PURE__ */ fixedBase64url(86);

// ../node_modules/zod/v4/core/checks.js
var $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
  var _a2;
  inst._zod ?? (inst._zod = {});
  inst._zod.def = def;
  (_a2 = inst._zod).onattach ?? (_a2.onattach = []);
});
var numericOriginMap = {
  number: "number",
  bigint: "bigint",
  object: "date"
};
var $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    if (def.value < curr) {
      if (def.inclusive)
        bag.maximum = def.value;
      else
        bag.exclusiveMaximum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    if (def.value > curr) {
      if (def.inclusive)
        bag.minimum = def.value;
      else
        bag.exclusiveMinimum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    var _a2;
    (_a2 = inst2._zod.bag).multipleOf ?? (_a2.multipleOf = def.value);
  });
  inst._zod.check = (payload) => {
    if (typeof payload.value !== typeof def.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    const isMultiple = typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0;
    if (isMultiple)
      return;
    payload.issues.push({
      origin: typeof payload.value,
      code: "not_multiple_of",
      divisor: def.value,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  def.format = def.format || "float64";
  const isInt = def.format?.includes("int");
  const origin = isInt ? "int" : "number";
  const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    bag.minimum = minimum;
    bag.maximum = maximum;
    if (isInt)
      bag.pattern = integer;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (isInt) {
      if (!Number.isInteger(input)) {
        payload.issues.push({
          expected: origin,
          format: def.format,
          code: "invalid_type",
          continue: false,
          input,
          inst
        });
        return;
      }
      if (!Number.isSafeInteger(input)) {
        if (input > 0) {
          payload.issues.push({
            input,
            code: "too_big",
            maximum: Number.MAX_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        } else {
          payload.issues.push({
            input,
            code: "too_small",
            minimum: Number.MIN_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        }
        return;
      }
    }
    if (input < minimum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_big",
        maximum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodCheckBigIntFormat = /* @__PURE__ */ $constructor("$ZodCheckBigIntFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  const [minimum, maximum] = BIGINT_FORMAT_RANGES[def.format];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    bag.minimum = minimum;
    bag.maximum = maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (input < minimum) {
      payload.issues.push({
        origin: "bigint",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "bigint",
        input,
        code: "too_big",
        maximum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodCheckMaxSize = /* @__PURE__ */ $constructor("$ZodCheckMaxSize", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.size !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (def.maximum < curr)
      inst2._zod.bag.maximum = def.maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size <= def.maximum)
      return;
    payload.issues.push({
      origin: getSizableOrigin(input),
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMinSize = /* @__PURE__ */ $constructor("$ZodCheckMinSize", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.size !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (def.minimum > curr)
      inst2._zod.bag.minimum = def.minimum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size >= def.minimum)
      return;
    payload.issues.push({
      origin: getSizableOrigin(input),
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckSizeEquals = /* @__PURE__ */ $constructor("$ZodCheckSizeEquals", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.size !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.minimum = def.size;
    bag.maximum = def.size;
    bag.size = def.size;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size === def.size)
      return;
    const tooBig = size > def.size;
    payload.issues.push({
      origin: getSizableOrigin(input),
      ...tooBig ? { code: "too_big", maximum: def.size } : { code: "too_small", minimum: def.size },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (def.maximum < curr)
      inst2._zod.bag.maximum = def.maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length <= def.maximum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (def.minimum > curr)
      inst2._zod.bag.minimum = def.minimum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length >= def.minimum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.minimum = def.length;
    bag.maximum = def.length;
    bag.length = def.length;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length === def.length)
      return;
    const origin = getLengthableOrigin(input);
    const tooBig = length > def.length;
    payload.issues.push({
      origin,
      ...tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
  var _a2, _b;
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    if (def.pattern) {
      bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
      bag.patterns.add(def.pattern);
    }
  });
  if (def.pattern)
    (_a2 = inst._zod).check ?? (_a2.check = (payload) => {
      def.pattern.lastIndex = 0;
      if (def.pattern.test(payload.value))
        return;
      payload.issues.push({
        origin: "string",
        code: "invalid_format",
        format: def.format,
        input: payload.value,
        ...def.pattern ? { pattern: def.pattern.toString() } : {},
        inst,
        continue: !def.abort
      });
    });
  else
    (_b = inst._zod).check ?? (_b.check = () => {
    });
});
var $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    def.pattern.lastIndex = 0;
    if (def.pattern.test(payload.value))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: payload.value,
      pattern: def.pattern.toString(),
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
  def.pattern ?? (def.pattern = lowercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
  def.pattern ?? (def.pattern = uppercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
  $ZodCheck.init(inst, def);
  const escapedRegex = escapeRegex(def.includes);
  const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
  def.pattern = pattern;
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.includes(def.includes, def.position))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: def.includes,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.startsWith(def.prefix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: def.prefix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.endsWith(def.suffix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: def.suffix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function handleCheckPropertyResult(result, payload, property) {
  if (result.issues.length) {
    payload.issues.push(...prefixIssues(property, result.issues));
  }
}
var $ZodCheckProperty = /* @__PURE__ */ $constructor("$ZodCheckProperty", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    const result = def.schema._zod.run({
      value: payload.value[def.property],
      issues: []
    }, {});
    if (result instanceof Promise) {
      return result.then((result2) => handleCheckPropertyResult(result2, payload, def.property));
    }
    handleCheckPropertyResult(result, payload, def.property);
    return;
  };
});
var $ZodCheckMimeType = /* @__PURE__ */ $constructor("$ZodCheckMimeType", (inst, def) => {
  $ZodCheck.init(inst, def);
  const mimeSet = new Set(def.mime);
  inst._zod.onattach.push((inst2) => {
    inst2._zod.bag.mime = def.mime;
  });
  inst._zod.check = (payload) => {
    if (mimeSet.has(payload.value.type))
      return;
    payload.issues.push({
      code: "invalid_value",
      values: def.mime,
      input: payload.value.type,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    payload.value = def.tx(payload.value);
  };
});

// ../node_modules/zod/v4/core/doc.js
var Doc = class {
  constructor(args = []) {
    this.content = [];
    this.indent = 0;
    if (this)
      this.args = args;
  }
  indented(fn) {
    this.indent += 1;
    fn(this);
    this.indent -= 1;
  }
  write(arg) {
    if (typeof arg === "function") {
      arg(this, { execution: "sync" });
      arg(this, { execution: "async" });
      return;
    }
    const content = arg;
    const lines = content.split("\n").filter((x) => x);
    const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
    const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
    for (const line of dedented) {
      this.content.push(line);
    }
  }
  compile() {
    const F = Function;
    const args = this?.args;
    const content = this?.content ?? [``];
    const lines = [...content.map((x) => `  ${x}`)];
    return new F(...args, lines.join("\n"));
  }
};

// ../node_modules/zod/v4/core/versions.js
var version = {
  major: 4,
  minor: 3,
  patch: 6
};

// ../node_modules/zod/v4/core/schemas.js
var $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
  var _a2;
  inst ?? (inst = {});
  inst._zod.def = def;
  inst._zod.bag = inst._zod.bag || {};
  inst._zod.version = version;
  const checks = [...inst._zod.def.checks ?? []];
  if (inst._zod.traits.has("$ZodCheck")) {
    checks.unshift(inst);
  }
  for (const ch of checks) {
    for (const fn of ch._zod.onattach) {
      fn(inst);
    }
  }
  if (checks.length === 0) {
    (_a2 = inst._zod).deferred ?? (_a2.deferred = []);
    inst._zod.deferred?.push(() => {
      inst._zod.run = inst._zod.parse;
    });
  } else {
    const runChecks = (payload, checks2, ctx) => {
      let isAborted = aborted(payload);
      let asyncResult;
      for (const ch of checks2) {
        if (ch._zod.def.when) {
          const shouldRun = ch._zod.def.when(payload);
          if (!shouldRun)
            continue;
        } else if (isAborted) {
          continue;
        }
        const currLen = payload.issues.length;
        const _ = ch._zod.check(payload);
        if (_ instanceof Promise && ctx?.async === false) {
          throw new $ZodAsyncError();
        }
        if (asyncResult || _ instanceof Promise) {
          asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
            await _;
            const nextLen = payload.issues.length;
            if (nextLen === currLen)
              return;
            if (!isAborted)
              isAborted = aborted(payload, currLen);
          });
        } else {
          const nextLen = payload.issues.length;
          if (nextLen === currLen)
            continue;
          if (!isAborted)
            isAborted = aborted(payload, currLen);
        }
      }
      if (asyncResult) {
        return asyncResult.then(() => {
          return payload;
        });
      }
      return payload;
    };
    const handleCanaryResult = (canary, payload, ctx) => {
      if (aborted(canary)) {
        canary.aborted = true;
        return canary;
      }
      const checkResult = runChecks(payload, checks, ctx);
      if (checkResult instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError();
        return checkResult.then((checkResult2) => inst._zod.parse(checkResult2, ctx));
      }
      return inst._zod.parse(checkResult, ctx);
    };
    inst._zod.run = (payload, ctx) => {
      if (ctx.skipChecks) {
        return inst._zod.parse(payload, ctx);
      }
      if (ctx.direction === "backward") {
        const canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: true });
        if (canary instanceof Promise) {
          return canary.then((canary2) => {
            return handleCanaryResult(canary2, payload, ctx);
          });
        }
        return handleCanaryResult(canary, payload, ctx);
      }
      const result = inst._zod.parse(payload, ctx);
      if (result instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError();
        return result.then((result2) => runChecks(result2, checks, ctx));
      }
      return runChecks(result, checks, ctx);
    };
  }
  defineLazy(inst, "~standard", () => ({
    validate: (value) => {
      try {
        const r = safeParse(inst, value);
        return r.success ? { value: r.data } : { issues: r.error?.issues };
      } catch (_) {
        return safeParseAsync(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  }));
});
var $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string(inst._zod.bag);
  inst._zod.parse = (payload, _) => {
    if (def.coerce)
      try {
        payload.value = String(payload.value);
      } catch (_2) {
      }
    if (typeof payload.value === "string")
      return payload;
    payload.issues.push({
      expected: "string",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  $ZodString.init(inst, def);
});
var $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
  def.pattern ?? (def.pattern = guid);
  $ZodStringFormat.init(inst, def);
});
var $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
  if (def.version) {
    const versionMap = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    };
    const v = versionMap[def.version];
    if (v === void 0)
      throw new Error(`Invalid UUID version: "${def.version}"`);
    def.pattern ?? (def.pattern = uuid(v));
  } else
    def.pattern ?? (def.pattern = uuid());
  $ZodStringFormat.init(inst, def);
});
var $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
  def.pattern ?? (def.pattern = email);
  $ZodStringFormat.init(inst, def);
});
var $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    try {
      const trimmed = payload.value.trim();
      const url2 = new URL(trimmed);
      if (def.hostname) {
        def.hostname.lastIndex = 0;
        if (!def.hostname.test(url2.hostname)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid hostname",
            pattern: def.hostname.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      }
      if (def.protocol) {
        def.protocol.lastIndex = 0;
        if (!def.protocol.test(url2.protocol.endsWith(":") ? url2.protocol.slice(0, -1) : url2.protocol)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid protocol",
            pattern: def.protocol.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      }
      if (def.normalize) {
        payload.value = url2.href;
      } else {
        payload.value = trimmed;
      }
      return;
    } catch (_) {
      payload.issues.push({
        code: "invalid_format",
        format: "url",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
  def.pattern ?? (def.pattern = emoji());
  $ZodStringFormat.init(inst, def);
});
var $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
  def.pattern ?? (def.pattern = nanoid);
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
  def.pattern ?? (def.pattern = cuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
  def.pattern ?? (def.pattern = cuid2);
  $ZodStringFormat.init(inst, def);
});
var $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
  def.pattern ?? (def.pattern = ulid);
  $ZodStringFormat.init(inst, def);
});
var $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
  def.pattern ?? (def.pattern = xid);
  $ZodStringFormat.init(inst, def);
});
var $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
  def.pattern ?? (def.pattern = ksuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
  def.pattern ?? (def.pattern = datetime(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
  def.pattern ?? (def.pattern = date);
  $ZodStringFormat.init(inst, def);
});
var $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
  def.pattern ?? (def.pattern = time(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
  def.pattern ?? (def.pattern = duration);
  $ZodStringFormat.init(inst, def);
});
var $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
  def.pattern ?? (def.pattern = ipv4);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `ipv4`;
});
var $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
  def.pattern ?? (def.pattern = ipv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `ipv6`;
  inst._zod.check = (payload) => {
    try {
      new URL(`http://[${payload.value}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodMAC = /* @__PURE__ */ $constructor("$ZodMAC", (inst, def) => {
  def.pattern ?? (def.pattern = mac(def.delimiter));
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `mac`;
});
var $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv4);
  $ZodStringFormat.init(inst, def);
});
var $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    const parts = payload.value.split("/");
    try {
      if (parts.length !== 2)
        throw new Error();
      const [address, prefix] = parts;
      if (!prefix)
        throw new Error();
      const prefixNum = Number(prefix);
      if (`${prefixNum}` !== prefix)
        throw new Error();
      if (prefixNum < 0 || prefixNum > 128)
        throw new Error();
      new URL(`http://[${address}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
function isValidBase64(data) {
  if (data === "")
    return true;
  if (data.length % 4 !== 0)
    return false;
  try {
    atob(data);
    return true;
  } catch {
    return false;
  }
}
var $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
  def.pattern ?? (def.pattern = base64);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.contentEncoding = "base64";
  inst._zod.check = (payload) => {
    if (isValidBase64(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function isValidBase64URL(data) {
  if (!base64url.test(data))
    return false;
  const base643 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
  const padded = base643.padEnd(Math.ceil(base643.length / 4) * 4, "=");
  return isValidBase64(padded);
}
var $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
  def.pattern ?? (def.pattern = base64url);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.contentEncoding = "base64url";
  inst._zod.check = (payload) => {
    if (isValidBase64URL(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
  def.pattern ?? (def.pattern = e164);
  $ZodStringFormat.init(inst, def);
});
function isValidJWT(token, algorithm = null) {
  try {
    const tokensParts = token.split(".");
    if (tokensParts.length !== 3)
      return false;
    const [header] = tokensParts;
    if (!header)
      return false;
    const parsedHeader = JSON.parse(atob(header));
    if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
      return false;
    if (!parsedHeader.alg)
      return false;
    if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
      return false;
    return true;
  } catch {
    return false;
  }
}
var $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidJWT(payload.value, def.alg))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCustomStringFormat = /* @__PURE__ */ $constructor("$ZodCustomStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (def.fn(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: def.format,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = inst._zod.bag.pattern ?? number;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Number(payload.value);
      } catch (_) {
      }
    const input = payload.value;
    if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
      return payload;
    }
    const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
    payload.issues.push({
      expected: "number",
      code: "invalid_type",
      input,
      inst,
      ...received ? { received } : {}
    });
    return payload;
  };
});
var $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumberFormat", (inst, def) => {
  $ZodCheckNumberFormat.init(inst, def);
  $ZodNumber.init(inst, def);
});
var $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = boolean;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Boolean(payload.value);
      } catch (_) {
      }
    const input = payload.value;
    if (typeof input === "boolean")
      return payload;
    payload.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodBigInt = /* @__PURE__ */ $constructor("$ZodBigInt", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = bigint;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = BigInt(payload.value);
      } catch (_) {
      }
    if (typeof payload.value === "bigint")
      return payload;
    payload.issues.push({
      expected: "bigint",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodBigIntFormat = /* @__PURE__ */ $constructor("$ZodBigIntFormat", (inst, def) => {
  $ZodCheckBigIntFormat.init(inst, def);
  $ZodBigInt.init(inst, def);
});
var $ZodSymbol = /* @__PURE__ */ $constructor("$ZodSymbol", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "symbol")
      return payload;
    payload.issues.push({
      expected: "symbol",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodUndefined = /* @__PURE__ */ $constructor("$ZodUndefined", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _undefined;
  inst._zod.values = /* @__PURE__ */ new Set([void 0]);
  inst._zod.optin = "optional";
  inst._zod.optout = "optional";
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "undefined")
      return payload;
    payload.issues.push({
      expected: "undefined",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodNull = /* @__PURE__ */ $constructor("$ZodNull", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _null;
  inst._zod.values = /* @__PURE__ */ new Set([null]);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input === null)
      return payload;
    payload.issues.push({
      expected: "null",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodAny = /* @__PURE__ */ $constructor("$ZodAny", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
var $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
var $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    payload.issues.push({
      expected: "never",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodVoid = /* @__PURE__ */ $constructor("$ZodVoid", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "undefined")
      return payload;
    payload.issues.push({
      expected: "void",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodDate = /* @__PURE__ */ $constructor("$ZodDate", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce) {
      try {
        payload.value = new Date(payload.value);
      } catch (_err) {
      }
    }
    const input = payload.value;
    const isDate = input instanceof Date;
    const isValidDate = isDate && !Number.isNaN(input.getTime());
    if (isValidDate)
      return payload;
    payload.issues.push({
      expected: "date",
      code: "invalid_type",
      input,
      ...isDate ? { received: "Invalid Date" } : {},
      inst
    });
    return payload;
  };
});
function handleArrayResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
var $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        expected: "array",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = Array(input.length);
    const proms = [];
    for (let i = 0; i < input.length; i++) {
      const item = input[i];
      const result = def.element._zod.run({
        value: item,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleArrayResult(result2, payload, i)));
      } else {
        handleArrayResult(result, payload, i);
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
function handlePropertyResult(result, final, key, input, isOptionalOut) {
  if (result.issues.length) {
    if (isOptionalOut && !(key in input)) {
      return;
    }
    final.issues.push(...prefixIssues(key, result.issues));
  }
  if (result.value === void 0) {
    if (key in input) {
      final.value[key] = void 0;
    }
  } else {
    final.value[key] = result.value;
  }
}
function normalizeDef(def) {
  const keys = Object.keys(def.shape);
  for (const k of keys) {
    if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) {
      throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
    }
  }
  const okeys = optionalKeys(def.shape);
  return {
    ...def,
    keys,
    keySet: new Set(keys),
    numKeys: keys.length,
    optionalKeys: new Set(okeys)
  };
}
function handleCatchall(proms, input, payload, ctx, def, inst) {
  const unrecognized = [];
  const keySet = def.keySet;
  const _catchall = def.catchall._zod;
  const t = _catchall.def.type;
  const isOptionalOut = _catchall.optout === "optional";
  for (const key in input) {
    if (keySet.has(key))
      continue;
    if (t === "never") {
      unrecognized.push(key);
      continue;
    }
    const r = _catchall.run({ value: input[key], issues: [] }, ctx);
    if (r instanceof Promise) {
      proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalOut)));
    } else {
      handlePropertyResult(r, payload, key, input, isOptionalOut);
    }
  }
  if (unrecognized.length) {
    payload.issues.push({
      code: "unrecognized_keys",
      keys: unrecognized,
      input,
      inst
    });
  }
  if (!proms.length)
    return payload;
  return Promise.all(proms).then(() => {
    return payload;
  });
}
var $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
  $ZodType.init(inst, def);
  const desc = Object.getOwnPropertyDescriptor(def, "shape");
  if (!desc?.get) {
    const sh = def.shape;
    Object.defineProperty(def, "shape", {
      get: () => {
        const newSh = { ...sh };
        Object.defineProperty(def, "shape", {
          value: newSh
        });
        return newSh;
      }
    });
  }
  const _normalized = cached(() => normalizeDef(def));
  defineLazy(inst._zod, "propValues", () => {
    const shape = def.shape;
    const propValues = {};
    for (const key in shape) {
      const field = shape[key]._zod;
      if (field.values) {
        propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
        for (const v of field.values)
          propValues[key].add(v);
      }
    }
    return propValues;
  });
  const isObject2 = isObject;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = {};
    const proms = [];
    const shape = value.shape;
    for (const key of value.keys) {
      const el = shape[key];
      const isOptionalOut = el._zod.optout === "optional";
      const r = el._zod.run({ value: input[key], issues: [] }, ctx);
      if (r instanceof Promise) {
        proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalOut)));
      } else {
        handlePropertyResult(r, payload, key, input, isOptionalOut);
      }
    }
    if (!catchall) {
      return proms.length ? Promise.all(proms).then(() => payload) : payload;
    }
    return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
  };
});
var $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def) => {
  $ZodObject.init(inst, def);
  const superParse = inst._zod.parse;
  const _normalized = cached(() => normalizeDef(def));
  const generateFastpass = (shape) => {
    const doc = new Doc(["shape", "payload", "ctx"]);
    const normalized = _normalized.value;
    const parseStr = (key) => {
      const k = esc(key);
      return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
    };
    doc.write(`const input = payload.value;`);
    const ids = /* @__PURE__ */ Object.create(null);
    let counter = 0;
    for (const key of normalized.keys) {
      ids[key] = `key_${counter++}`;
    }
    doc.write(`const newResult = {};`);
    for (const key of normalized.keys) {
      const id = ids[key];
      const k = esc(key);
      const schema = shape[key];
      const isOptionalOut = schema?._zod?.optout === "optional";
      doc.write(`const ${id} = ${parseStr(key)};`);
      if (isOptionalOut) {
        doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
      } else {
        doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
      }
    }
    doc.write(`payload.value = newResult;`);
    doc.write(`return payload;`);
    const fn = doc.compile();
    return (payload, ctx) => fn(shape, payload, ctx);
  };
  let fastpass;
  const isObject2 = isObject;
  const jit = !globalConfig.jitless;
  const allowsEval2 = allowsEval;
  const fastEnabled = jit && allowsEval2.value;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
      if (!fastpass)
        fastpass = generateFastpass(def.shape);
      payload = fastpass(payload, ctx);
      if (!catchall)
        return payload;
      return handleCatchall([], input, payload, ctx, value, inst);
    }
    return superParse(payload, ctx);
  };
});
function handleUnionResults(results, final, inst, ctx) {
  for (const result of results) {
    if (result.issues.length === 0) {
      final.value = result.value;
      return final;
    }
  }
  const nonaborted = results.filter((r) => !aborted(r));
  if (nonaborted.length === 1) {
    final.value = nonaborted[0].value;
    return nonaborted[0];
  }
  final.issues.push({
    code: "invalid_union",
    input: final.value,
    inst,
    errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  });
  return final;
}
var $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
  defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
  defineLazy(inst._zod, "values", () => {
    if (def.options.every((o) => o._zod.values)) {
      return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
    }
    return void 0;
  });
  defineLazy(inst._zod, "pattern", () => {
    if (def.options.every((o) => o._zod.pattern)) {
      const patterns = def.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
    }
    return void 0;
  });
  const single = def.options.length === 1;
  const first = def.options[0]._zod.run;
  inst._zod.parse = (payload, ctx) => {
    if (single) {
      return first(payload, ctx);
    }
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        if (result.issues.length === 0)
          return result;
        results.push(result);
      }
    }
    if (!async)
      return handleUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results2) => {
      return handleUnionResults(results2, payload, inst, ctx);
    });
  };
});
function handleExclusiveUnionResults(results, final, inst, ctx) {
  const successes = results.filter((r) => r.issues.length === 0);
  if (successes.length === 1) {
    final.value = successes[0].value;
    return final;
  }
  if (successes.length === 0) {
    final.issues.push({
      code: "invalid_union",
      input: final.value,
      inst,
      errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
    });
  } else {
    final.issues.push({
      code: "invalid_union",
      input: final.value,
      inst,
      errors: [],
      inclusive: false
    });
  }
  return final;
}
var $ZodXor = /* @__PURE__ */ $constructor("$ZodXor", (inst, def) => {
  $ZodUnion.init(inst, def);
  def.inclusive = false;
  const single = def.options.length === 1;
  const first = def.options[0]._zod.run;
  inst._zod.parse = (payload, ctx) => {
    if (single) {
      return first(payload, ctx);
    }
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        results.push(result);
      }
    }
    if (!async)
      return handleExclusiveUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results2) => {
      return handleExclusiveUnionResults(results2, payload, inst, ctx);
    });
  };
});
var $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
  def.inclusive = false;
  $ZodUnion.init(inst, def);
  const _super = inst._zod.parse;
  defineLazy(inst._zod, "propValues", () => {
    const propValues = {};
    for (const option of def.options) {
      const pv = option._zod.propValues;
      if (!pv || Object.keys(pv).length === 0)
        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
      for (const [k, v] of Object.entries(pv)) {
        if (!propValues[k])
          propValues[k] = /* @__PURE__ */ new Set();
        for (const val of v) {
          propValues[k].add(val);
        }
      }
    }
    return propValues;
  });
  const disc = cached(() => {
    const opts = def.options;
    const map2 = /* @__PURE__ */ new Map();
    for (const o of opts) {
      const values = o._zod.propValues?.[def.discriminator];
      if (!values || values.size === 0)
        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
      for (const v of values) {
        if (map2.has(v)) {
          throw new Error(`Duplicate discriminator value "${String(v)}"`);
        }
        map2.set(v, o);
      }
    }
    return map2;
  });
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isObject(input)) {
      payload.issues.push({
        code: "invalid_type",
        expected: "object",
        input,
        inst
      });
      return payload;
    }
    const opt = disc.value.get(input?.[def.discriminator]);
    if (opt) {
      return opt._zod.run(payload, ctx);
    }
    if (def.unionFallback) {
      return _super(payload, ctx);
    }
    payload.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      discriminator: def.discriminator,
      input,
      path: [def.discriminator],
      inst
    });
    return payload;
  };
});
var $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    const left = def.left._zod.run({ value: input, issues: [] }, ctx);
    const right = def.right._zod.run({ value: input, issues: [] }, ctx);
    const async = left instanceof Promise || right instanceof Promise;
    if (async) {
      return Promise.all([left, right]).then(([left2, right2]) => {
        return handleIntersectionResults(payload, left2, right2);
      });
    }
    return handleIntersectionResults(payload, left, right);
  };
});
function mergeValues(a, b) {
  if (a === b) {
    return { valid: true, data: a };
  }
  if (a instanceof Date && b instanceof Date && +a === +b) {
    return { valid: true, data: a };
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const bKeys = Object.keys(b);
    const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
        };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return { valid: false, mergeErrorPath: [] };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
        };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  }
  return { valid: false, mergeErrorPath: [] };
}
function handleIntersectionResults(result, left, right) {
  const unrecKeys = /* @__PURE__ */ new Map();
  let unrecIssue;
  for (const iss of left.issues) {
    if (iss.code === "unrecognized_keys") {
      unrecIssue ?? (unrecIssue = iss);
      for (const k of iss.keys) {
        if (!unrecKeys.has(k))
          unrecKeys.set(k, {});
        unrecKeys.get(k).l = true;
      }
    } else {
      result.issues.push(iss);
    }
  }
  for (const iss of right.issues) {
    if (iss.code === "unrecognized_keys") {
      for (const k of iss.keys) {
        if (!unrecKeys.has(k))
          unrecKeys.set(k, {});
        unrecKeys.get(k).r = true;
      }
    } else {
      result.issues.push(iss);
    }
  }
  const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
  if (bothKeys.length && unrecIssue) {
    result.issues.push({ ...unrecIssue, keys: bothKeys });
  }
  if (aborted(result))
    return result;
  const merged = mergeValues(left.value, right.value);
  if (!merged.valid) {
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
  }
  result.value = merged.data;
  return result;
}
var $ZodTuple = /* @__PURE__ */ $constructor("$ZodTuple", (inst, def) => {
  $ZodType.init(inst, def);
  const items = def.items;
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        input,
        inst,
        expected: "tuple",
        code: "invalid_type"
      });
      return payload;
    }
    payload.value = [];
    const proms = [];
    const reversedIndex = [...items].reverse().findIndex((item) => item._zod.optin !== "optional");
    const optStart = reversedIndex === -1 ? 0 : items.length - reversedIndex;
    if (!def.rest) {
      const tooBig = input.length > items.length;
      const tooSmall = input.length < optStart - 1;
      if (tooBig || tooSmall) {
        payload.issues.push({
          ...tooBig ? { code: "too_big", maximum: items.length, inclusive: true } : { code: "too_small", minimum: items.length },
          input,
          inst,
          origin: "array"
        });
        return payload;
      }
    }
    let i = -1;
    for (const item of items) {
      i++;
      if (i >= input.length) {
        if (i >= optStart)
          continue;
      }
      const result = item._zod.run({
        value: input[i],
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleTupleResult(result2, payload, i)));
      } else {
        handleTupleResult(result, payload, i);
      }
    }
    if (def.rest) {
      const rest = input.slice(items.length);
      for (const el of rest) {
        i++;
        const result = def.rest._zod.run({
          value: el,
          issues: []
        }, ctx);
        if (result instanceof Promise) {
          proms.push(result.then((result2) => handleTupleResult(result2, payload, i)));
        } else {
          handleTupleResult(result, payload, i);
        }
      }
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleTupleResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
var $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isPlainObject(input)) {
      payload.issues.push({
        expected: "record",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    const values = def.keyType._zod.values;
    if (values) {
      payload.value = {};
      const recordKeys = /* @__PURE__ */ new Set();
      for (const key of values) {
        if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
          recordKeys.add(typeof key === "number" ? key.toString() : key);
          const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
          if (result instanceof Promise) {
            proms.push(result.then((result2) => {
              if (result2.issues.length) {
                payload.issues.push(...prefixIssues(key, result2.issues));
              }
              payload.value[key] = result2.value;
            }));
          } else {
            if (result.issues.length) {
              payload.issues.push(...prefixIssues(key, result.issues));
            }
            payload.value[key] = result.value;
          }
        }
      }
      let unrecognized;
      for (const key in input) {
        if (!recordKeys.has(key)) {
          unrecognized = unrecognized ?? [];
          unrecognized.push(key);
        }
      }
      if (unrecognized && unrecognized.length > 0) {
        payload.issues.push({
          code: "unrecognized_keys",
          input,
          inst,
          keys: unrecognized
        });
      }
    } else {
      payload.value = {};
      for (const key of Reflect.ownKeys(input)) {
        if (key === "__proto__")
          continue;
        let keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
        if (keyResult instanceof Promise) {
          throw new Error("Async schemas not supported in object keys currently");
        }
        const checkNumericKey = typeof key === "string" && number.test(key) && keyResult.issues.length;
        if (checkNumericKey) {
          const retryResult = def.keyType._zod.run({ value: Number(key), issues: [] }, ctx);
          if (retryResult instanceof Promise) {
            throw new Error("Async schemas not supported in object keys currently");
          }
          if (retryResult.issues.length === 0) {
            keyResult = retryResult;
          }
        }
        if (keyResult.issues.length) {
          if (def.mode === "loose") {
            payload.value[key] = input[key];
          } else {
            payload.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
              input: key,
              path: [key],
              inst
            });
          }
          continue;
        }
        const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
        if (result instanceof Promise) {
          proms.push(result.then((result2) => {
            if (result2.issues.length) {
              payload.issues.push(...prefixIssues(key, result2.issues));
            }
            payload.value[keyResult.value] = result2.value;
          }));
        } else {
          if (result.issues.length) {
            payload.issues.push(...prefixIssues(key, result.issues));
          }
          payload.value[keyResult.value] = result.value;
        }
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
var $ZodMap = /* @__PURE__ */ $constructor("$ZodMap", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!(input instanceof Map)) {
      payload.issues.push({
        expected: "map",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    payload.value = /* @__PURE__ */ new Map();
    for (const [key, value] of input) {
      const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
      const valueResult = def.valueType._zod.run({ value, issues: [] }, ctx);
      if (keyResult instanceof Promise || valueResult instanceof Promise) {
        proms.push(Promise.all([keyResult, valueResult]).then(([keyResult2, valueResult2]) => {
          handleMapResult(keyResult2, valueResult2, payload, key, input, inst, ctx);
        }));
      } else {
        handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
      }
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
  if (keyResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, keyResult.issues));
    } else {
      final.issues.push({
        code: "invalid_key",
        origin: "map",
        input,
        inst,
        issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
      });
    }
  }
  if (valueResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, valueResult.issues));
    } else {
      final.issues.push({
        origin: "map",
        code: "invalid_element",
        input,
        inst,
        key,
        issues: valueResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
      });
    }
  }
  final.value.set(keyResult.value, valueResult.value);
}
var $ZodSet = /* @__PURE__ */ $constructor("$ZodSet", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!(input instanceof Set)) {
      payload.issues.push({
        input,
        inst,
        expected: "set",
        code: "invalid_type"
      });
      return payload;
    }
    const proms = [];
    payload.value = /* @__PURE__ */ new Set();
    for (const item of input) {
      const result = def.valueType._zod.run({ value: item, issues: [] }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleSetResult(result2, payload)));
      } else
        handleSetResult(result, payload);
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleSetResult(result, final) {
  if (result.issues.length) {
    final.issues.push(...result.issues);
  }
  final.value.add(result.value);
}
var $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
  $ZodType.init(inst, def);
  const values = getEnumValues(def.entries);
  const valuesSet = new Set(values);
  inst._zod.values = valuesSet;
  inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (valuesSet.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  if (def.values.length === 0) {
    throw new Error("Cannot create literal schema with no valid values");
  }
  const values = new Set(def.values);
  inst._zod.values = values;
  inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (values.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values: def.values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodFile = /* @__PURE__ */ $constructor("$ZodFile", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input instanceof File)
      return payload;
    payload.issues.push({
      expected: "file",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    const _out = def.transform(payload.value, payload);
    if (ctx.async) {
      const output = _out instanceof Promise ? _out : Promise.resolve(_out);
      return output.then((output2) => {
        payload.value = output2;
        return payload;
      });
    }
    if (_out instanceof Promise) {
      throw new $ZodAsyncError();
    }
    payload.value = _out;
    return payload;
  };
});
function handleOptionalResult(result, input) {
  if (result.issues.length && input === void 0) {
    return { issues: [], value: void 0 };
  }
  return result;
}
var $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  inst._zod.optout = "optional";
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
  });
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    if (def.innerType._zod.optin === "optional") {
      const result = def.innerType._zod.run(payload, ctx);
      if (result instanceof Promise)
        return result.then((r) => handleOptionalResult(r, payload.value));
      return handleOptionalResult(result, payload.value);
    }
    if (payload.value === void 0) {
      return payload;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
  inst._zod.parse = (payload, ctx) => {
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
  });
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === null)
      return payload;
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === void 0) {
      payload.value = def.defaultValue;
      return payload;
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => handleDefaultResult(result2, def));
    }
    return handleDefaultResult(result, def);
  };
});
function handleDefaultResult(payload, def) {
  if (payload.value === void 0) {
    payload.value = def.defaultValue;
  }
  return payload;
}
var $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === void 0) {
      payload.value = def.defaultValue;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => {
    const v = def.innerType._zod.values;
    return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => handleNonOptionalResult(result2, inst));
    }
    return handleNonOptionalResult(result, inst);
  };
});
function handleNonOptionalResult(payload, inst) {
  if (!payload.issues.length && payload.value === void 0) {
    payload.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: payload.value,
      inst
    });
  }
  return payload;
}
var $ZodSuccess = /* @__PURE__ */ $constructor("$ZodSuccess", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      throw new $ZodEncodeError("ZodSuccess");
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => {
        payload.value = result2.issues.length === 0;
        return payload;
      });
    }
    payload.value = result.issues.length === 0;
    return payload;
  };
});
var $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => {
        payload.value = result2.value;
        if (result2.issues.length) {
          payload.value = def.catchValue({
            ...payload,
            error: {
              issues: result2.issues.map((iss) => finalizeIssue(iss, ctx, config()))
            },
            input: payload.value
          });
          payload.issues = [];
        }
        return payload;
      });
    }
    payload.value = result.value;
    if (result.issues.length) {
      payload.value = def.catchValue({
        ...payload,
        error: {
          issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config()))
        },
        input: payload.value
      });
      payload.issues = [];
    }
    return payload;
  };
});
var $ZodNaN = /* @__PURE__ */ $constructor("$ZodNaN", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
      payload.issues.push({
        input: payload.value,
        inst,
        expected: "nan",
        code: "invalid_type"
      });
      return payload;
    }
    return payload;
  };
});
var $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => def.in._zod.values);
  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
  defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      const right = def.out._zod.run(payload, ctx);
      if (right instanceof Promise) {
        return right.then((right2) => handlePipeResult(right2, def.in, ctx));
      }
      return handlePipeResult(right, def.in, ctx);
    }
    const left = def.in._zod.run(payload, ctx);
    if (left instanceof Promise) {
      return left.then((left2) => handlePipeResult(left2, def.out, ctx));
    }
    return handlePipeResult(left, def.out, ctx);
  };
});
function handlePipeResult(left, next, ctx) {
  if (left.issues.length) {
    left.aborted = true;
    return left;
  }
  return next._zod.run({ value: left.value, issues: left.issues }, ctx);
}
var $ZodCodec = /* @__PURE__ */ $constructor("$ZodCodec", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => def.in._zod.values);
  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
  defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
  inst._zod.parse = (payload, ctx) => {
    const direction = ctx.direction || "forward";
    if (direction === "forward") {
      const left = def.in._zod.run(payload, ctx);
      if (left instanceof Promise) {
        return left.then((left2) => handleCodecAResult(left2, def, ctx));
      }
      return handleCodecAResult(left, def, ctx);
    } else {
      const right = def.out._zod.run(payload, ctx);
      if (right instanceof Promise) {
        return right.then((right2) => handleCodecAResult(right2, def, ctx));
      }
      return handleCodecAResult(right, def, ctx);
    }
  };
});
function handleCodecAResult(result, def, ctx) {
  if (result.issues.length) {
    result.aborted = true;
    return result;
  }
  const direction = ctx.direction || "forward";
  if (direction === "forward") {
    const transformed = def.transform(result.value, result);
    if (transformed instanceof Promise) {
      return transformed.then((value) => handleCodecTxResult(result, value, def.out, ctx));
    }
    return handleCodecTxResult(result, transformed, def.out, ctx);
  } else {
    const transformed = def.reverseTransform(result.value, result);
    if (transformed instanceof Promise) {
      return transformed.then((value) => handleCodecTxResult(result, value, def.in, ctx));
    }
    return handleCodecTxResult(result, transformed, def.in, ctx);
  }
}
function handleCodecTxResult(left, value, nextSchema, ctx) {
  if (left.issues.length) {
    left.aborted = true;
    return left;
  }
  return nextSchema._zod.run({ value, issues: left.issues }, ctx);
}
var $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
  defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then(handleReadonlyResult);
    }
    return handleReadonlyResult(result);
  };
});
function handleReadonlyResult(payload) {
  payload.value = Object.freeze(payload.value);
  return payload;
}
var $ZodTemplateLiteral = /* @__PURE__ */ $constructor("$ZodTemplateLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  const regexParts = [];
  for (const part of def.parts) {
    if (typeof part === "object" && part !== null) {
      if (!part._zod.pattern) {
        throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
      }
      const source = part._zod.pattern instanceof RegExp ? part._zod.pattern.source : part._zod.pattern;
      if (!source)
        throw new Error(`Invalid template literal part: ${part._zod.traits}`);
      const start = source.startsWith("^") ? 1 : 0;
      const end = source.endsWith("$") ? source.length - 1 : source.length;
      regexParts.push(source.slice(start, end));
    } else if (part === null || primitiveTypes.has(typeof part)) {
      regexParts.push(escapeRegex(`${part}`));
    } else {
      throw new Error(`Invalid template literal part: ${part}`);
    }
  }
  inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "string") {
      payload.issues.push({
        input: payload.value,
        inst,
        expected: "string",
        code: "invalid_type"
      });
      return payload;
    }
    inst._zod.pattern.lastIndex = 0;
    if (!inst._zod.pattern.test(payload.value)) {
      payload.issues.push({
        input: payload.value,
        inst,
        code: "invalid_format",
        format: def.format ?? "template_literal",
        pattern: inst._zod.pattern.source
      });
      return payload;
    }
    return payload;
  };
});
var $ZodFunction = /* @__PURE__ */ $constructor("$ZodFunction", (inst, def) => {
  $ZodType.init(inst, def);
  inst._def = def;
  inst._zod.def = def;
  inst.implement = (func) => {
    if (typeof func !== "function") {
      throw new Error("implement() must be called with a function");
    }
    return function(...args) {
      const parsedArgs = inst._def.input ? parse(inst._def.input, args) : args;
      const result = Reflect.apply(func, this, parsedArgs);
      if (inst._def.output) {
        return parse(inst._def.output, result);
      }
      return result;
    };
  };
  inst.implementAsync = (func) => {
    if (typeof func !== "function") {
      throw new Error("implementAsync() must be called with a function");
    }
    return async function(...args) {
      const parsedArgs = inst._def.input ? await parseAsync(inst._def.input, args) : args;
      const result = await Reflect.apply(func, this, parsedArgs);
      if (inst._def.output) {
        return await parseAsync(inst._def.output, result);
      }
      return result;
    };
  };
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "function") {
      payload.issues.push({
        code: "invalid_type",
        expected: "function",
        input: payload.value,
        inst
      });
      return payload;
    }
    const hasPromiseOutput = inst._def.output && inst._def.output._zod.def.type === "promise";
    if (hasPromiseOutput) {
      payload.value = inst.implementAsync(payload.value);
    } else {
      payload.value = inst.implement(payload.value);
    }
    return payload;
  };
  inst.input = (...args) => {
    const F = inst.constructor;
    if (Array.isArray(args[0])) {
      return new F({
        type: "function",
        input: new $ZodTuple({
          type: "tuple",
          items: args[0],
          rest: args[1]
        }),
        output: inst._def.output
      });
    }
    return new F({
      type: "function",
      input: args[0],
      output: inst._def.output
    });
  };
  inst.output = (output) => {
    const F = inst.constructor;
    return new F({
      type: "function",
      input: inst._def.input,
      output
    });
  };
  return inst;
});
var $ZodPromise = /* @__PURE__ */ $constructor("$ZodPromise", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({ value: inner, issues: [] }, ctx));
  };
});
var $ZodLazy = /* @__PURE__ */ $constructor("$ZodLazy", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "innerType", () => def.getter());
  defineLazy(inst._zod, "pattern", () => inst._zod.innerType?._zod?.pattern);
  defineLazy(inst._zod, "propValues", () => inst._zod.innerType?._zod?.propValues);
  defineLazy(inst._zod, "optin", () => inst._zod.innerType?._zod?.optin ?? void 0);
  defineLazy(inst._zod, "optout", () => inst._zod.innerType?._zod?.optout ?? void 0);
  inst._zod.parse = (payload, ctx) => {
    const inner = inst._zod.innerType;
    return inner._zod.run(payload, ctx);
  };
});
var $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
  $ZodCheck.init(inst, def);
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _) => {
    return payload;
  };
  inst._zod.check = (payload) => {
    const input = payload.value;
    const r = def.fn(input);
    if (r instanceof Promise) {
      return r.then((r2) => handleRefineResult(r2, payload, input, inst));
    }
    handleRefineResult(r, payload, input, inst);
    return;
  };
});
function handleRefineResult(result, payload, input, inst) {
  if (!result) {
    const _iss = {
      code: "custom",
      input,
      inst,
      // incorporates params.error into issue reporting
      path: [...inst._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !inst._zod.def.abort
      // params: inst._zod.def.params,
    };
    if (inst._zod.def.params)
      _iss.params = inst._zod.def.params;
    payload.issues.push(issue(_iss));
  }
}

// ../node_modules/zod/v4/locales/index.js
var locales_exports = {};
__export(locales_exports, {
  ar: () => ar_default,
  az: () => az_default,
  be: () => be_default,
  bg: () => bg_default,
  ca: () => ca_default,
  cs: () => cs_default,
  da: () => da_default,
  de: () => de_default,
  en: () => en_default,
  eo: () => eo_default,
  es: () => es_default,
  fa: () => fa_default,
  fi: () => fi_default,
  fr: () => fr_default,
  frCA: () => fr_CA_default,
  he: () => he_default,
  hu: () => hu_default,
  hy: () => hy_default,
  id: () => id_default,
  is: () => is_default,
  it: () => it_default,
  ja: () => ja_default,
  ka: () => ka_default,
  kh: () => kh_default,
  km: () => km_default,
  ko: () => ko_default,
  lt: () => lt_default,
  mk: () => mk_default,
  ms: () => ms_default,
  nl: () => nl_default,
  no: () => no_default,
  ota: () => ota_default,
  pl: () => pl_default,
  ps: () => ps_default,
  pt: () => pt_default,
  ru: () => ru_default,
  sl: () => sl_default,
  sv: () => sv_default,
  ta: () => ta_default,
  th: () => th_default,
  tr: () => tr_default,
  ua: () => ua_default,
  uk: () => uk_default,
  ur: () => ur_default,
  uz: () => uz_default,
  vi: () => vi_default,
  yo: () => yo_default,
  zhCN: () => zh_CN_default,
  zhTW: () => zh_TW_default
});

// ../node_modules/zod/v4/locales/ar.js
var error = () => {
  const Sizable = {
    string: { unit: "\u062D\u0631\u0641", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
    file: { unit: "\u0628\u0627\u064A\u062A", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
    array: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
    set: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0645\u062F\u062E\u0644",
    email: "\u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
    url: "\u0631\u0627\u0628\u0637",
    emoji: "\u0625\u064A\u0645\u0648\u062C\u064A",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    date: "\u062A\u0627\u0631\u064A\u062E \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    time: "\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    duration: "\u0645\u062F\u0629 \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    ipv4: "\u0639\u0646\u0648\u0627\u0646 IPv4",
    ipv6: "\u0639\u0646\u0648\u0627\u0646 IPv6",
    cidrv4: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv4",
    cidrv6: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv6",
    base64: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64-encoded",
    base64url: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64url-encoded",
    json_string: "\u0646\u064E\u0635 \u0639\u0644\u0649 \u0647\u064A\u0626\u0629 JSON",
    e164: "\u0631\u0642\u0645 \u0647\u0627\u062A\u0641 \u0628\u0645\u0639\u064A\u0627\u0631 E.164",
    jwt: "JWT",
    template_literal: "\u0645\u062F\u062E\u0644"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 instanceof ${issue2.expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${received}`;
        }
        return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${stringifyPrimitive(issue2.values[0])}`;
        return `\u0627\u062E\u062A\u064A\u0627\u0631 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062A\u0648\u0642\u0639 \u0627\u0646\u062A\u0642\u0627\u0621 \u0623\u062D\u062F \u0647\u0630\u0647 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return ` \u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${issue2.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631"}`;
        return `\u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${issue2.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${issue2.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${issue2.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0628\u062F\u0623 \u0628\u0640 "${issue2.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0646\u062A\u0647\u064A \u0628\u0640 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u062A\u0636\u0645\u0651\u064E\u0646 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0646\u0645\u0637 ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644`;
      }
      case "not_multiple_of":
        return `\u0631\u0642\u0645 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0645\u0646 \u0645\u0636\u0627\u0639\u0641\u0627\u062A ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u0645\u0639\u0631\u0641${issue2.keys.length > 1 ? "\u0627\u062A" : ""} \u063A\u0631\u064A\u0628${issue2.keys.length > 1 ? "\u0629" : ""}: ${joinValues(issue2.keys, "\u060C ")}`;
      case "invalid_key":
        return `\u0645\u0639\u0631\u0641 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${issue2.origin}`;
      case "invalid_union":
        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
      case "invalid_element":
        return `\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${issue2.origin}`;
      default:
        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
    }
  };
};
function ar_default() {
  return {
    localeError: error()
  };
}

// ../node_modules/zod/v4/locales/az.js
var error2 = () => {
  const Sizable = {
    string: { unit: "simvol", verb: "olmal\u0131d\u0131r" },
    file: { unit: "bayt", verb: "olmal\u0131d\u0131r" },
    array: { unit: "element", verb: "olmal\u0131d\u0131r" },
    set: { unit: "element", verb: "olmal\u0131d\u0131r" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n instanceof ${issue2.expected}, daxil olan ${received}`;
        }
        return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${expected}, daxil olan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${stringifyPrimitive(issue2.values[0])}`;
        return `Yanl\u0131\u015F se\xE7im: a\u015Fa\u011F\u0131dak\u0131lardan biri olmal\u0131d\u0131r: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${issue2.origin ?? "d\u0259y\u0259r"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
        return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${issue2.origin ?? "d\u0259y\u0259r"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Yanl\u0131\u015F m\u0259tn: "${_issue.prefix}" il\u0259 ba\u015Flamal\u0131d\u0131r`;
        if (_issue.format === "ends_with")
          return `Yanl\u0131\u015F m\u0259tn: "${_issue.suffix}" il\u0259 bitm\u0259lidir`;
        if (_issue.format === "includes")
          return `Yanl\u0131\u015F m\u0259tn: "${_issue.includes}" daxil olmal\u0131d\u0131r`;
        if (_issue.format === "regex")
          return `Yanl\u0131\u015F m\u0259tn: ${_issue.pattern} \u015Fablonuna uy\u011Fun olmal\u0131d\u0131r`;
        return `Yanl\u0131\u015F ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Yanl\u0131\u015F \u0259d\u0259d: ${issue2.divisor} il\u0259 b\xF6l\xFCn\u0259 bil\u0259n olmal\u0131d\u0131r`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan a\xE7ar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} daxilind\u0259 yanl\u0131\u015F a\xE7ar`;
      case "invalid_union":
        return "Yanl\u0131\u015F d\u0259y\u0259r";
      case "invalid_element":
        return `${issue2.origin} daxilind\u0259 yanl\u0131\u015F d\u0259y\u0259r`;
      default:
        return `Yanl\u0131\u015F d\u0259y\u0259r`;
    }
  };
};
function az_default() {
  return {
    localeError: error2()
  };
}

// ../node_modules/zod/v4/locales/be.js
function getBelarusianPlural(count, one, few, many) {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
var error3 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "\u0441\u0456\u043C\u0432\u0430\u043B",
        few: "\u0441\u0456\u043C\u0432\u0430\u043B\u044B",
        many: "\u0441\u0456\u043C\u0432\u0430\u043B\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    },
    array: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    },
    set: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    },
    file: {
      unit: {
        one: "\u0431\u0430\u0439\u0442",
        few: "\u0431\u0430\u0439\u0442\u044B",
        many: "\u0431\u0430\u0439\u0442\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0443\u0432\u043E\u0434",
    email: "email \u0430\u0434\u0440\u0430\u0441",
    url: "URL",
    emoji: "\u044D\u043C\u043E\u0434\u0437\u0456",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0434\u0430\u0442\u0430 \u0456 \u0447\u0430\u0441",
    date: "ISO \u0434\u0430\u0442\u0430",
    time: "ISO \u0447\u0430\u0441",
    duration: "ISO \u043F\u0440\u0430\u0446\u044F\u0433\u043B\u0430\u0441\u0446\u044C",
    ipv4: "IPv4 \u0430\u0434\u0440\u0430\u0441",
    ipv6: "IPv6 \u0430\u0434\u0440\u0430\u0441",
    cidrv4: "IPv4 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
    cidrv6: "IPv6 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
    base64: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64",
    base64url: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64url",
    json_string: "JSON \u0440\u0430\u0434\u043E\u043A",
    e164: "\u043D\u0443\u043C\u0430\u0440 E.164",
    jwt: "JWT",
    template_literal: "\u0443\u0432\u043E\u0434"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u043B\u0456\u043A",
    array: "\u043C\u0430\u0441\u0456\u045E"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F instanceof ${issue2.expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${received}`;
        }
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F ${expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F ${stringifyPrimitive(issue2.values[0])}`;
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0432\u0430\u0440\u044B\u044F\u043D\u0442: \u0447\u0430\u043A\u0430\u045E\u0441\u044F \u0430\u0434\u0437\u0456\u043D \u0437 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getBelarusianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${sizing.verb} ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getBelarusianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${sizing.verb} ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u043F\u0430\u0447\u044B\u043D\u0430\u0446\u0446\u0430 \u0437 "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u0430\u043A\u0430\u043D\u0447\u0432\u0430\u0446\u0446\u0430 \u043D\u0430 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u043C\u044F\u0448\u0447\u0430\u0446\u044C "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0430\u0434\u043F\u0430\u0432\u044F\u0434\u0430\u0446\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043B\u0456\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0431\u044B\u0446\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0441\u043F\u0430\u0437\u043D\u0430\u043D\u044B ${issue2.keys.length > 1 ? "\u043A\u043B\u044E\u0447\u044B" : "\u043A\u043B\u044E\u0447"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043A\u043B\u044E\u0447 \u0443 ${issue2.origin}`;
      case "invalid_union":
        return "\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434";
      case "invalid_element":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u0430\u0435 \u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435 \u045E ${issue2.origin}`;
      default:
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434`;
    }
  };
};
function be_default() {
  return {
    localeError: error3()
  };
}

// ../node_modules/zod/v4/locales/bg.js
var error4 = () => {
  const Sizable = {
    string: { unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
    file: { unit: "\u0431\u0430\u0439\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
    array: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
    set: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0432\u0445\u043E\u0434",
    email: "\u0438\u043C\u0435\u0439\u043B \u0430\u0434\u0440\u0435\u0441",
    url: "URL",
    emoji: "\u0435\u043C\u043E\u0434\u0436\u0438",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0432\u0440\u0435\u043C\u0435",
    date: "ISO \u0434\u0430\u0442\u0430",
    time: "ISO \u0432\u0440\u0435\u043C\u0435",
    duration: "ISO \u043F\u0440\u043E\u0434\u044A\u043B\u0436\u0438\u0442\u0435\u043B\u043D\u043E\u0441\u0442",
    ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441",
    ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441",
    cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
    cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
    base64: "base64-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437",
    base64url: "base64url-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437",
    json_string: "JSON \u043D\u0438\u0437",
    e164: "E.164 \u043D\u043E\u043C\u0435\u0440",
    jwt: "JWT",
    template_literal: "\u0432\u0445\u043E\u0434"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0447\u0438\u0441\u043B\u043E",
    array: "\u043C\u0430\u0441\u0438\u0432"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D instanceof ${issue2.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${received}`;
        }
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${stringifyPrimitive(issue2.values[0])}`;
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u043E\u043F\u0446\u0438\u044F: \u043E\u0447\u0430\u043A\u0432\u0430\u043D\u043E \u0435\u0434\u043D\u043E \u043E\u0442 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430"}`;
        return `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0431\u044A\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin} \u0434\u0430 \u0431\u044A\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u0432\u0430 \u0441 "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u0432\u044A\u0440\u0448\u0432\u0430 \u0441 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0432\u043A\u043B\u044E\u0447\u0432\u0430 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0441\u044A\u0432\u043F\u0430\u0434\u0430 \u0441 ${_issue.pattern}`;
        let invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D";
        if (_issue.format === "emoji")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
        if (_issue.format === "datetime")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
        if (_issue.format === "date")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430";
        if (_issue.format === "time")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
        if (_issue.format === "duration")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430";
        return `${invalid_adj} ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E \u0447\u0438\u0441\u043B\u043E: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0431\u044A\u0434\u0435 \u043A\u0440\u0430\u0442\u043D\u043E \u043D\u0430 ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0437\u043F\u043E\u0437\u043D\u0430\u0442${issue2.keys.length > 1 ? "\u0438" : ""} \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "\u043E\u0432\u0435" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043A\u043B\u044E\u0447 \u0432 ${issue2.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434";
      case "invalid_element":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u0432 ${issue2.origin}`;
      default:
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434`;
    }
  };
};
function bg_default() {
  return {
    localeError: error4()
  };
}

// ../node_modules/zod/v4/locales/ca.js
var error5 = () => {
  const Sizable = {
    string: { unit: "car\xE0cters", verb: "contenir" },
    file: { unit: "bytes", verb: "contenir" },
    array: { unit: "elements", verb: "contenir" },
    set: { unit: "elements", verb: "contenir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrada",
    email: "adre\xE7a electr\xF2nica",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data i hora ISO",
    date: "data ISO",
    time: "hora ISO",
    duration: "durada ISO",
    ipv4: "adre\xE7a IPv4",
    ipv6: "adre\xE7a IPv6",
    cidrv4: "rang IPv4",
    cidrv6: "rang IPv6",
    base64: "cadena codificada en base64",
    base64url: "cadena codificada en base64url",
    json_string: "cadena JSON",
    e164: "n\xFAmero E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Tipus inv\xE0lid: s'esperava instanceof ${issue2.expected}, s'ha rebut ${received}`;
        }
        return `Tipus inv\xE0lid: s'esperava ${expected}, s'ha rebut ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Valor inv\xE0lid: s'esperava ${stringifyPrimitive(issue2.values[0])}`;
        return `Opci\xF3 inv\xE0lida: s'esperava una de ${joinValues(issue2.values, " o ")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "com a m\xE0xim" : "menys de";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} contingu\xE9s ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} fos ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "com a m\xEDnim" : "m\xE9s de";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Massa petit: s'esperava que ${issue2.origin} contingu\xE9s ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Massa petit: s'esperava que ${issue2.origin} fos ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Format inv\xE0lid: ha de comen\xE7ar amb "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Format inv\xE0lid: ha d'acabar amb "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Format inv\xE0lid: ha d'incloure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Format inv\xE0lid: ha de coincidir amb el patr\xF3 ${_issue.pattern}`;
        return `Format inv\xE0lid per a ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE0lid: ha de ser m\xFAltiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Clau${issue2.keys.length > 1 ? "s" : ""} no reconeguda${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Clau inv\xE0lida a ${issue2.origin}`;
      case "invalid_union":
        return "Entrada inv\xE0lida";
      // Could also be "Tipus d'unió invàlid" but "Entrada invàlida" is more general
      case "invalid_element":
        return `Element inv\xE0lid a ${issue2.origin}`;
      default:
        return `Entrada inv\xE0lida`;
    }
  };
};
function ca_default() {
  return {
    localeError: error5()
  };
}

// ../node_modules/zod/v4/locales/cs.js
var error6 = () => {
  const Sizable = {
    string: { unit: "znak\u016F", verb: "m\xEDt" },
    file: { unit: "bajt\u016F", verb: "m\xEDt" },
    array: { unit: "prvk\u016F", verb: "m\xEDt" },
    set: { unit: "prvk\u016F", verb: "m\xEDt" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "regul\xE1rn\xED v\xFDraz",
    email: "e-mailov\xE1 adresa",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "datum a \u010Das ve form\xE1tu ISO",
    date: "datum ve form\xE1tu ISO",
    time: "\u010Das ve form\xE1tu ISO",
    duration: "doba trv\xE1n\xED ISO",
    ipv4: "IPv4 adresa",
    ipv6: "IPv6 adresa",
    cidrv4: "rozsah IPv4",
    cidrv6: "rozsah IPv6",
    base64: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64",
    base64url: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64url",
    json_string: "\u0159et\u011Bzec ve form\xE1tu JSON",
    e164: "\u010D\xEDslo E.164",
    jwt: "JWT",
    template_literal: "vstup"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u010D\xEDslo",
    string: "\u0159et\u011Bzec",
    function: "funkce",
    array: "pole"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no instanceof ${issue2.expected}, obdr\u017Eeno ${received}`;
        }
        return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${expected}, obdr\u017Eeno ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${stringifyPrimitive(issue2.values[0])}`;
        return `Neplatn\xE1 mo\u017Enost: o\u010Dek\xE1v\xE1na jedna z hodnot ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${issue2.origin ?? "hodnota"} mus\xED m\xEDt ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "prvk\u016F"}`;
        }
        return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${issue2.origin ?? "hodnota"} mus\xED b\xFDt ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${issue2.origin ?? "hodnota"} mus\xED m\xEDt ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "prvk\u016F"}`;
        }
        return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${issue2.origin ?? "hodnota"} mus\xED b\xFDt ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED za\u010D\xEDnat na "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED kon\u010Dit na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED obsahovat "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED odpov\xEDdat vzoru ${_issue.pattern}`;
        return `Neplatn\xFD form\xE1t ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neplatn\xE9 \u010D\xEDslo: mus\xED b\xFDt n\xE1sobkem ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nezn\xE1m\xE9 kl\xED\u010De: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neplatn\xFD kl\xED\u010D v ${issue2.origin}`;
      case "invalid_union":
        return "Neplatn\xFD vstup";
      case "invalid_element":
        return `Neplatn\xE1 hodnota v ${issue2.origin}`;
      default:
        return `Neplatn\xFD vstup`;
    }
  };
};
function cs_default() {
  return {
    localeError: error6()
  };
}

// ../node_modules/zod/v4/locales/da.js
var error7 = () => {
  const Sizable = {
    string: { unit: "tegn", verb: "havde" },
    file: { unit: "bytes", verb: "havde" },
    array: { unit: "elementer", verb: "indeholdt" },
    set: { unit: "elementer", verb: "indeholdt" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "e-mailadresse",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dato- og klokkesl\xE6t",
    date: "ISO-dato",
    time: "ISO-klokkesl\xE6t",
    duration: "ISO-varighed",
    ipv4: "IPv4-omr\xE5de",
    ipv6: "IPv6-omr\xE5de",
    cidrv4: "IPv4-spektrum",
    cidrv6: "IPv6-spektrum",
    base64: "base64-kodet streng",
    base64url: "base64url-kodet streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "streng",
    number: "tal",
    boolean: "boolean",
    array: "liste",
    object: "objekt",
    set: "s\xE6t",
    file: "fil"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ugyldigt input: forventede instanceof ${issue2.expected}, fik ${received}`;
        }
        return `Ugyldigt input: forventede ${expected}, fik ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ugyldig v\xE6rdi: forventede ${stringifyPrimitive(issue2.values[0])}`;
        return `Ugyldigt valg: forventede en af f\xF8lgende ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing)
          return `For stor: forventede ${origin ?? "value"} ${sizing.verb} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
        return `For stor: forventede ${origin ?? "value"} havde ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing) {
          return `For lille: forventede ${origin} ${sizing.verb} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `For lille: forventede ${origin} havde ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ugyldig streng: skal starte med "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ugyldig streng: skal ende med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ugyldig streng: skal indeholde "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ugyldig streng: skal matche m\xF8nsteret ${_issue.pattern}`;
        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ugyldigt tal: skal v\xE6re deleligt med ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ukendte n\xF8gler" : "Ukendt n\xF8gle"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig n\xF8gle i ${issue2.origin}`;
      case "invalid_union":
        return "Ugyldigt input: matcher ingen af de tilladte typer";
      case "invalid_element":
        return `Ugyldig v\xE6rdi i ${issue2.origin}`;
      default:
        return `Ugyldigt input`;
    }
  };
};
function da_default() {
  return {
    localeError: error7()
  };
}

// ../node_modules/zod/v4/locales/de.js
var error8 = () => {
  const Sizable = {
    string: { unit: "Zeichen", verb: "zu haben" },
    file: { unit: "Bytes", verb: "zu haben" },
    array: { unit: "Elemente", verb: "zu haben" },
    set: { unit: "Elemente", verb: "zu haben" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "Eingabe",
    email: "E-Mail-Adresse",
    url: "URL",
    emoji: "Emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-Datum und -Uhrzeit",
    date: "ISO-Datum",
    time: "ISO-Uhrzeit",
    duration: "ISO-Dauer",
    ipv4: "IPv4-Adresse",
    ipv6: "IPv6-Adresse",
    cidrv4: "IPv4-Bereich",
    cidrv6: "IPv6-Bereich",
    base64: "Base64-codierter String",
    base64url: "Base64-URL-codierter String",
    json_string: "JSON-String",
    e164: "E.164-Nummer",
    jwt: "JWT",
    template_literal: "Eingabe"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "Zahl",
    array: "Array"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ung\xFCltige Eingabe: erwartet instanceof ${issue2.expected}, erhalten ${received}`;
        }
        return `Ung\xFCltige Eingabe: erwartet ${expected}, erhalten ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ung\xFCltige Eingabe: erwartet ${stringifyPrimitive(issue2.values[0])}`;
        return `Ung\xFCltige Option: erwartet eine von ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Zu gro\xDF: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "Elemente"} hat`;
        return `Zu gro\xDF: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ist`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} hat`;
        }
        return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ist`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ung\xFCltiger String: muss mit "${_issue.prefix}" beginnen`;
        if (_issue.format === "ends_with")
          return `Ung\xFCltiger String: muss mit "${_issue.suffix}" enden`;
        if (_issue.format === "includes")
          return `Ung\xFCltiger String: muss "${_issue.includes}" enthalten`;
        if (_issue.format === "regex")
          return `Ung\xFCltiger String: muss dem Muster ${_issue.pattern} entsprechen`;
        return `Ung\xFCltig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ung\xFCltige Zahl: muss ein Vielfaches von ${issue2.divisor} sein`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Unbekannte Schl\xFCssel" : "Unbekannter Schl\xFCssel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ung\xFCltiger Schl\xFCssel in ${issue2.origin}`;
      case "invalid_union":
        return "Ung\xFCltige Eingabe";
      case "invalid_element":
        return `Ung\xFCltiger Wert in ${issue2.origin}`;
      default:
        return `Ung\xFCltige Eingabe`;
    }
  };
};
function de_default() {
  return {
    localeError: error8()
  };
}

// ../node_modules/zod/v4/locales/en.js
var error9 = () => {
  const Sizable = {
    string: { unit: "characters", verb: "to have" },
    file: { unit: "bytes", verb: "to have" },
    array: { unit: "items", verb: "to have" },
    set: { unit: "items", verb: "to have" },
    map: { unit: "entries", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    mac: "MAC address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    // Compatibility: "nan" -> "NaN" for display
    nan: "NaN"
    // All other type names omitted - they fall back to raw values via ?? operator
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `Invalid input: expected ${expected}, received ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
        return `Invalid option: expected one of ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Too big: expected ${issue2.origin ?? "value"} to have ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Too big: expected ${issue2.origin ?? "value"} to be ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Too small: expected ${issue2.origin} to have ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Too small: expected ${issue2.origin} to be ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Invalid string: must start with "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Invalid string: must end with "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Invalid string: must include "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Invalid string: must match pattern ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${issue2.origin}`;
      case "invalid_union":
        return "Invalid input";
      case "invalid_element":
        return `Invalid value in ${issue2.origin}`;
      default:
        return `Invalid input`;
    }
  };
};
function en_default() {
  return {
    localeError: error9()
  };
}

// ../node_modules/zod/v4/locales/eo.js
var error10 = () => {
  const Sizable = {
    string: { unit: "karaktrojn", verb: "havi" },
    file: { unit: "bajtojn", verb: "havi" },
    array: { unit: "elementojn", verb: "havi" },
    set: { unit: "elementojn", verb: "havi" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "enigo",
    email: "retadreso",
    url: "URL",
    emoji: "emo\u011Dio",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-datotempo",
    date: "ISO-dato",
    time: "ISO-tempo",
    duration: "ISO-da\u016Dro",
    ipv4: "IPv4-adreso",
    ipv6: "IPv6-adreso",
    cidrv4: "IPv4-rango",
    cidrv6: "IPv6-rango",
    base64: "64-ume kodita karaktraro",
    base64url: "URL-64-ume kodita karaktraro",
    json_string: "JSON-karaktraro",
    e164: "E.164-nombro",
    jwt: "JWT",
    template_literal: "enigo"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombro",
    array: "tabelo",
    null: "senvalora"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Nevalida enigo: atendi\u011Dis instanceof ${issue2.expected}, ricevi\u011Dis ${received}`;
        }
        return `Nevalida enigo: atendi\u011Dis ${expected}, ricevi\u011Dis ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Nevalida enigo: atendi\u011Dis ${stringifyPrimitive(issue2.values[0])}`;
        return `Nevalida opcio: atendi\u011Dis unu el ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Tro granda: atendi\u011Dis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementojn"}`;
        return `Tro granda: atendi\u011Dis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Tro malgranda: atendi\u011Dis ke ${issue2.origin} havu ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Tro malgranda: atendi\u011Dis ke ${issue2.origin} estu ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Nevalida karaktraro: devas komenci\u011Di per "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Nevalida karaktraro: devas fini\u011Di per "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}`;
        return `Nevalida ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nevalida nombro: devas esti oblo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nekonata${issue2.keys.length > 1 ? "j" : ""} \u015Dlosilo${issue2.keys.length > 1 ? "j" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Nevalida \u015Dlosilo en ${issue2.origin}`;
      case "invalid_union":
        return "Nevalida enigo";
      case "invalid_element":
        return `Nevalida valoro en ${issue2.origin}`;
      default:
        return `Nevalida enigo`;
    }
  };
};
function eo_default() {
  return {
    localeError: error10()
  };
}

// ../node_modules/zod/v4/locales/es.js
var error11 = () => {
  const Sizable = {
    string: { unit: "caracteres", verb: "tener" },
    file: { unit: "bytes", verb: "tener" },
    array: { unit: "elementos", verb: "tener" },
    set: { unit: "elementos", verb: "tener" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrada",
    email: "direcci\xF3n de correo electr\xF3nico",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "fecha y hora ISO",
    date: "fecha ISO",
    time: "hora ISO",
    duration: "duraci\xF3n ISO",
    ipv4: "direcci\xF3n IPv4",
    ipv6: "direcci\xF3n IPv6",
    cidrv4: "rango IPv4",
    cidrv6: "rango IPv6",
    base64: "cadena codificada en base64",
    base64url: "URL codificada en base64",
    json_string: "cadena JSON",
    e164: "n\xFAmero E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "texto",
    number: "n\xFAmero",
    boolean: "booleano",
    array: "arreglo",
    object: "objeto",
    set: "conjunto",
    file: "archivo",
    date: "fecha",
    bigint: "n\xFAmero grande",
    symbol: "s\xEDmbolo",
    undefined: "indefinido",
    null: "nulo",
    function: "funci\xF3n",
    map: "mapa",
    record: "registro",
    tuple: "tupla",
    enum: "enumeraci\xF3n",
    union: "uni\xF3n",
    literal: "literal",
    promise: "promesa",
    void: "vac\xEDo",
    never: "nunca",
    unknown: "desconocido",
    any: "cualquiera"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entrada inv\xE1lida: se esperaba instanceof ${issue2.expected}, recibido ${received}`;
        }
        return `Entrada inv\xE1lida: se esperaba ${expected}, recibido ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrada inv\xE1lida: se esperaba ${stringifyPrimitive(issue2.values[0])}`;
        return `Opci\xF3n inv\xE1lida: se esperaba una de ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing)
          return `Demasiado grande: se esperaba que ${origin ?? "valor"} tuviera ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Demasiado grande: se esperaba que ${origin ?? "valor"} fuera ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing) {
          return `Demasiado peque\xF1o: se esperaba que ${origin} tuviera ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Demasiado peque\xF1o: se esperaba que ${origin} fuera ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Cadena inv\xE1lida: debe comenzar con "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Cadena inv\xE1lida: debe terminar en "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Cadena inv\xE1lida: debe incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Cadena inv\xE1lida: debe coincidir con el patr\xF3n ${_issue.pattern}`;
        return `Inv\xE1lido ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE1lido: debe ser m\xFAltiplo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Llave${issue2.keys.length > 1 ? "s" : ""} desconocida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Llave inv\xE1lida en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      case "invalid_union":
        return "Entrada inv\xE1lida";
      case "invalid_element":
        return `Valor inv\xE1lido en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      default:
        return `Entrada inv\xE1lida`;
    }
  };
};
function es_default() {
  return {
    localeError: error11()
  };
}

// ../node_modules/zod/v4/locales/fa.js
var error12 = () => {
  const Sizable = {
    string: { unit: "\u06A9\u0627\u0631\u0627\u06A9\u062A\u0631", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
    file: { unit: "\u0628\u0627\u06CC\u062A", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
    array: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
    set: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0648\u0631\u0648\u062F\u06CC",
    email: "\u0622\u062F\u0631\u0633 \u0627\u06CC\u0645\u06CC\u0644",
    url: "URL",
    emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u062A\u0627\u0631\u06CC\u062E \u0648 \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
    date: "\u062A\u0627\u0631\u06CC\u062E \u0627\u06CC\u0632\u0648",
    time: "\u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
    duration: "\u0645\u062F\u062A \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
    ipv4: "IPv4 \u0622\u062F\u0631\u0633",
    ipv6: "IPv6 \u0622\u062F\u0631\u0633",
    cidrv4: "IPv4 \u062F\u0627\u0645\u0646\u0647",
    cidrv6: "IPv6 \u062F\u0627\u0645\u0646\u0647",
    base64: "base64-encoded \u0631\u0634\u062A\u0647",
    base64url: "base64url-encoded \u0631\u0634\u062A\u0647",
    json_string: "JSON \u0631\u0634\u062A\u0647",
    e164: "E.164 \u0639\u062F\u062F",
    jwt: "JWT",
    template_literal: "\u0648\u0631\u0648\u062F\u06CC"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0639\u062F\u062F",
    array: "\u0622\u0631\u0627\u06CC\u0647"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A instanceof ${issue2.expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${received} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
        }
        return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${received} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
      }
      case "invalid_value":
        if (issue2.values.length === 1) {
          return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${stringifyPrimitive(issue2.values[0])} \u0645\u06CC\u200C\u0628\u0648\u062F`;
        }
        return `\u06AF\u0632\u06CC\u0646\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A \u06CC\u06A9\u06CC \u0627\u0632 ${joinValues(issue2.values, "|")} \u0645\u06CC\u200C\u0628\u0648\u062F`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${issue2.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631"} \u0628\u0627\u0634\u062F`;
        }
        return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${issue2.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} \u0628\u0627\u0634\u062F`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0628\u0627\u0634\u062F`;
        }
        return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} \u0628\u0627\u0634\u062F`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${_issue.prefix}" \u0634\u0631\u0648\u0639 \u0634\u0648\u062F`;
        }
        if (_issue.format === "ends_with") {
          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${_issue.suffix}" \u062A\u0645\u0627\u0645 \u0634\u0648\u062F`;
        }
        if (_issue.format === "includes") {
          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0634\u0627\u0645\u0644 "${_issue.includes}" \u0628\u0627\u0634\u062F`;
        }
        if (_issue.format === "regex") {
          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 \u0627\u0644\u06AF\u0648\u06CC ${_issue.pattern} \u0645\u0637\u0627\u0628\u0642\u062A \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F`;
        }
        return `${FormatDictionary[_issue.format] ?? issue2.format} \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
      }
      case "not_multiple_of":
        return `\u0639\u062F\u062F \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0645\u0636\u0631\u0628 ${issue2.divisor} \u0628\u0627\u0634\u062F`;
      case "unrecognized_keys":
        return `\u06A9\u0644\u06CC\u062F${issue2.keys.length > 1 ? "\u0647\u0627\u06CC" : ""} \u0646\u0627\u0634\u0646\u0627\u0633: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u06A9\u0644\u06CC\u062F \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0631 ${issue2.origin}`;
      case "invalid_union":
        return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
      case "invalid_element":
        return `\u0645\u0642\u062F\u0627\u0631 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u062F\u0631 ${issue2.origin}`;
      default:
        return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
    }
  };
};
function fa_default() {
  return {
    localeError: error12()
  };
}

// ../node_modules/zod/v4/locales/fi.js
var error13 = () => {
  const Sizable = {
    string: { unit: "merkki\xE4", subject: "merkkijonon" },
    file: { unit: "tavua", subject: "tiedoston" },
    array: { unit: "alkiota", subject: "listan" },
    set: { unit: "alkiota", subject: "joukon" },
    number: { unit: "", subject: "luvun" },
    bigint: { unit: "", subject: "suuren kokonaisluvun" },
    int: { unit: "", subject: "kokonaisluvun" },
    date: { unit: "", subject: "p\xE4iv\xE4m\xE4\xE4r\xE4n" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "s\xE4\xE4nn\xF6llinen lauseke",
    email: "s\xE4hk\xF6postiosoite",
    url: "URL-osoite",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-aikaleima",
    date: "ISO-p\xE4iv\xE4m\xE4\xE4r\xE4",
    time: "ISO-aika",
    duration: "ISO-kesto",
    ipv4: "IPv4-osoite",
    ipv6: "IPv6-osoite",
    cidrv4: "IPv4-alue",
    cidrv6: "IPv6-alue",
    base64: "base64-koodattu merkkijono",
    base64url: "base64url-koodattu merkkijono",
    json_string: "JSON-merkkijono",
    e164: "E.164-luku",
    jwt: "JWT",
    template_literal: "templaattimerkkijono"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Virheellinen tyyppi: odotettiin instanceof ${issue2.expected}, oli ${received}`;
        }
        return `Virheellinen tyyppi: odotettiin ${expected}, oli ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Virheellinen sy\xF6te: t\xE4ytyy olla ${stringifyPrimitive(issue2.values[0])}`;
        return `Virheellinen valinta: t\xE4ytyy olla yksi seuraavista: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Liian suuri: ${sizing.subject} t\xE4ytyy olla ${adj}${issue2.maximum.toString()} ${sizing.unit}`.trim();
        }
        return `Liian suuri: arvon t\xE4ytyy olla ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Liian pieni: ${sizing.subject} t\xE4ytyy olla ${adj}${issue2.minimum.toString()} ${sizing.unit}`.trim();
        }
        return `Liian pieni: arvon t\xE4ytyy olla ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Virheellinen sy\xF6te: t\xE4ytyy alkaa "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Virheellinen sy\xF6te: t\xE4ytyy loppua "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Virheellinen sy\xF6te: t\xE4ytyy sis\xE4lt\xE4\xE4 "${_issue.includes}"`;
        if (_issue.format === "regex") {
          return `Virheellinen sy\xF6te: t\xE4ytyy vastata s\xE4\xE4nn\xF6llist\xE4 lauseketta ${_issue.pattern}`;
        }
        return `Virheellinen ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Virheellinen luku: t\xE4ytyy olla luvun ${issue2.divisor} monikerta`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return "Virheellinen avain tietueessa";
      case "invalid_union":
        return "Virheellinen unioni";
      case "invalid_element":
        return "Virheellinen arvo joukossa";
      default:
        return `Virheellinen sy\xF6te`;
    }
  };
};
function fi_default() {
  return {
    localeError: error13()
  };
}

// ../node_modules/zod/v4/locales/fr.js
var error14 = () => {
  const Sizable = {
    string: { unit: "caract\xE8res", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "\xE9l\xE9ments", verb: "avoir" },
    set: { unit: "\xE9l\xE9ments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entr\xE9e",
    email: "adresse e-mail",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "date et heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "dur\xE9e ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "cha\xEEne encod\xE9e en base64",
    base64url: "cha\xEEne encod\xE9e en base64url",
    json_string: "cha\xEEne JSON",
    e164: "num\xE9ro E.164",
    jwt: "JWT",
    template_literal: "entr\xE9e"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombre",
    array: "tableau"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entr\xE9e invalide : instanceof ${issue2.expected} attendu, ${received} re\xE7u`;
        }
        return `Entr\xE9e invalide : ${expected} attendu, ${received} re\xE7u`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entr\xE9e invalide : ${stringifyPrimitive(issue2.values[0])} attendu`;
        return `Option invalide : une valeur parmi ${joinValues(issue2.values, "|")} attendue`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Trop grand : ${issue2.origin ?? "valeur"} doit ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\xE9l\xE9ment(s)"}`;
        return `Trop grand : ${issue2.origin ?? "valeur"} doit \xEAtre ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Trop petit : ${issue2.origin} doit ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Trop petit : ${issue2.origin} doit \xEAtre ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Cha\xEEne invalide : doit commencer par "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Cha\xEEne invalide : doit se terminer par "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Cha\xEEne invalide : doit inclure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Cha\xEEne invalide : doit correspondre au mod\xE8le ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit \xEAtre un multiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Cl\xE9${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Cl\xE9 invalide dans ${issue2.origin}`;
      case "invalid_union":
        return "Entr\xE9e invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue2.origin}`;
      default:
        return `Entr\xE9e invalide`;
    }
  };
};
function fr_default() {
  return {
    localeError: error14()
  };
}

// ../node_modules/zod/v4/locales/fr-CA.js
var error15 = () => {
  const Sizable = {
    string: { unit: "caract\xE8res", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "\xE9l\xE9ments", verb: "avoir" },
    set: { unit: "\xE9l\xE9ments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entr\xE9e",
    email: "adresse courriel",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "date-heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "dur\xE9e ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "cha\xEEne encod\xE9e en base64",
    base64url: "cha\xEEne encod\xE9e en base64url",
    json_string: "cha\xEEne JSON",
    e164: "num\xE9ro E.164",
    jwt: "JWT",
    template_literal: "entr\xE9e"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entr\xE9e invalide : attendu instanceof ${issue2.expected}, re\xE7u ${received}`;
        }
        return `Entr\xE9e invalide : attendu ${expected}, re\xE7u ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entr\xE9e invalide : attendu ${stringifyPrimitive(issue2.values[0])}`;
        return `Option invalide : attendu l'une des valeurs suivantes ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "\u2264" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} ait ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} soit ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "\u2265" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Trop petit : attendu que ${issue2.origin} ait ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Trop petit : attendu que ${issue2.origin} soit ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Cha\xEEne invalide : doit commencer par "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Cha\xEEne invalide : doit se terminer par "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Cha\xEEne invalide : doit inclure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Cha\xEEne invalide : doit correspondre au motif ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit \xEAtre un multiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Cl\xE9${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Cl\xE9 invalide dans ${issue2.origin}`;
      case "invalid_union":
        return "Entr\xE9e invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue2.origin}`;
      default:
        return `Entr\xE9e invalide`;
    }
  };
};
function fr_CA_default() {
  return {
    localeError: error15()
  };
}

// ../node_modules/zod/v4/locales/he.js
var error16 = () => {
  const TypeNames = {
    string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA", gender: "f" },
    number: { label: "\u05DE\u05E1\u05E4\u05E8", gender: "m" },
    boolean: { label: "\u05E2\u05E8\u05DA \u05D1\u05D5\u05DC\u05D9\u05D0\u05E0\u05D9", gender: "m" },
    bigint: { label: "BigInt", gender: "m" },
    date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA", gender: "m" },
    array: { label: "\u05DE\u05E2\u05E8\u05DA", gender: "m" },
    object: { label: "\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8", gender: "m" },
    null: { label: "\u05E2\u05E8\u05DA \u05E8\u05D9\u05E7 (null)", gender: "m" },
    undefined: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05DE\u05D5\u05D2\u05D3\u05E8 (undefined)", gender: "m" },
    symbol: { label: "\u05E1\u05D9\u05DE\u05D1\u05D5\u05DC (Symbol)", gender: "m" },
    function: { label: "\u05E4\u05D5\u05E0\u05E7\u05E6\u05D9\u05D4", gender: "f" },
    map: { label: "\u05DE\u05E4\u05D4 (Map)", gender: "f" },
    set: { label: "\u05E7\u05D1\u05D5\u05E6\u05D4 (Set)", gender: "f" },
    file: { label: "\u05E7\u05D5\u05D1\u05E5", gender: "m" },
    promise: { label: "Promise", gender: "m" },
    NaN: { label: "NaN", gender: "m" },
    unknown: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2", gender: "m" },
    value: { label: "\u05E2\u05E8\u05DA", gender: "m" }
  };
  const Sizable = {
    string: { unit: "\u05EA\u05D5\u05D5\u05D9\u05DD", shortLabel: "\u05E7\u05E6\u05E8", longLabel: "\u05D0\u05E8\u05D5\u05DA" },
    file: { unit: "\u05D1\u05D9\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
    array: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
    set: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
    number: { unit: "", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" }
    // no unit
  };
  const typeEntry = (t) => t ? TypeNames[t] : void 0;
  const typeLabel = (t) => {
    const e = typeEntry(t);
    if (e)
      return e.label;
    return t ?? TypeNames.unknown.label;
  };
  const withDefinite = (t) => `\u05D4${typeLabel(t)}`;
  const verbFor = (t) => {
    const e = typeEntry(t);
    const gender = e?.gender ?? "m";
    return gender === "f" ? "\u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05D9\u05D5\u05EA" : "\u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA";
  };
  const getSizing = (origin) => {
    if (!origin)
      return null;
    return Sizable[origin] ?? null;
  };
  const FormatDictionary = {
    regex: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    email: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC", gender: "f" },
    url: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05E8\u05E9\u05EA", gender: "f" },
    emoji: { label: "\u05D0\u05D9\u05DE\u05D5\u05D2'\u05D9", gender: "m" },
    uuid: { label: "UUID", gender: "m" },
    nanoid: { label: "nanoid", gender: "m" },
    guid: { label: "GUID", gender: "m" },
    cuid: { label: "cuid", gender: "m" },
    cuid2: { label: "cuid2", gender: "m" },
    ulid: { label: "ULID", gender: "m" },
    xid: { label: "XID", gender: "m" },
    ksuid: { label: "KSUID", gender: "m" },
    datetime: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D5\u05D6\u05DE\u05DF ISO", gender: "m" },
    date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA ISO", gender: "m" },
    time: { label: "\u05D6\u05DE\u05DF ISO", gender: "m" },
    duration: { label: "\u05DE\u05E9\u05DA \u05D6\u05DE\u05DF ISO", gender: "m" },
    ipv4: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv4", gender: "f" },
    ipv6: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv6", gender: "f" },
    cidrv4: { label: "\u05D8\u05D5\u05D5\u05D7 IPv4", gender: "m" },
    cidrv6: { label: "\u05D8\u05D5\u05D5\u05D7 IPv6", gender: "m" },
    base64: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64", gender: "f" },
    base64url: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64 \u05DC\u05DB\u05EA\u05D5\u05D1\u05D5\u05EA \u05E8\u05E9\u05EA", gender: "f" },
    json_string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA JSON", gender: "f" },
    e164: { label: "\u05DE\u05E1\u05E4\u05E8 E.164", gender: "m" },
    jwt: { label: "JWT", gender: "m" },
    ends_with: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    includes: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    lowercase: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    starts_with: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    uppercase: { label: "\u05E7\u05DC\u05D8", gender: "m" }
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expectedKey = issue2.expected;
        const expected = TypeDictionary[expectedKey ?? ""] ?? typeLabel(expectedKey);
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? TypeNames[receivedType]?.label ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA instanceof ${issue2.expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${received}`;
        }
        return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${received}`;
      }
      case "invalid_value": {
        if (issue2.values.length === 1) {
          return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05E2\u05E8\u05DA \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA ${stringifyPrimitive(issue2.values[0])}`;
        }
        const stringified = issue2.values.map((v) => stringifyPrimitive(v));
        if (issue2.values.length === 2) {
          return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${stringified[0]} \u05D0\u05D5 ${stringified[1]}`;
        }
        const lastValue = stringified[stringified.length - 1];
        const restValues = stringified.slice(0, -1).join(", ");
        return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${restValues} \u05D0\u05D5 ${lastValue}`;
      }
      case "too_big": {
        const sizing = getSizing(issue2.origin);
        const subject = withDefinite(issue2.origin ?? "value");
        if (issue2.origin === "string") {
          return `${sizing?.longLabel ?? "\u05D0\u05E8\u05D5\u05DA"} \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${issue2.maximum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "\u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA" : "\u05DC\u05DB\u05DC \u05D4\u05D9\u05D5\u05EA\u05E8"}`.trim();
        }
        if (issue2.origin === "number") {
          const comparison = issue2.inclusive ? `\u05E7\u05D8\u05DF \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${issue2.maximum}` : `\u05E7\u05D8\u05DF \u05DE-${issue2.maximum}`;
          return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${comparison}`;
        }
        if (issue2.origin === "array" || issue2.origin === "set") {
          const verb = issue2.origin === "set" ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA";
          const comparison = issue2.inclusive ? `${issue2.maximum} ${sizing?.unit ?? ""} \u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA` : `\u05E4\u05D7\u05D5\u05EA \u05DE-${issue2.maximum} ${sizing?.unit ?? ""}`;
          return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${comparison}`.trim();
        }
        const adj = issue2.inclusive ? "<=" : "<";
        const be = verbFor(issue2.origin ?? "value");
        if (sizing?.unit) {
          return `${sizing.longLabel} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        }
        return `${sizing?.longLabel ?? "\u05D2\u05D3\u05D5\u05DC"} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const sizing = getSizing(issue2.origin);
        const subject = withDefinite(issue2.origin ?? "value");
        if (issue2.origin === "string") {
          return `${sizing?.shortLabel ?? "\u05E7\u05E6\u05E8"} \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${issue2.minimum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "\u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8" : "\u05DC\u05E4\u05D7\u05D5\u05EA"}`.trim();
        }
        if (issue2.origin === "number") {
          const comparison = issue2.inclusive ? `\u05D2\u05D3\u05D5\u05DC \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${issue2.minimum}` : `\u05D2\u05D3\u05D5\u05DC \u05DE-${issue2.minimum}`;
          return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${comparison}`;
        }
        if (issue2.origin === "array" || issue2.origin === "set") {
          const verb = issue2.origin === "set" ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA";
          if (issue2.minimum === 1 && issue2.inclusive) {
            const singularPhrase = issue2.origin === "set" ? "\u05DC\u05E4\u05D7\u05D5\u05EA \u05E4\u05E8\u05D9\u05D8 \u05D0\u05D7\u05D3" : "\u05DC\u05E4\u05D7\u05D5\u05EA \u05E4\u05E8\u05D9\u05D8 \u05D0\u05D7\u05D3";
            return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${singularPhrase}`;
          }
          const comparison = issue2.inclusive ? `${issue2.minimum} ${sizing?.unit ?? ""} \u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8` : `\u05D9\u05D5\u05EA\u05E8 \u05DE-${issue2.minimum} ${sizing?.unit ?? ""}`;
          return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${comparison}`.trim();
        }
        const adj = issue2.inclusive ? ">=" : ">";
        const be = verbFor(issue2.origin ?? "value");
        if (sizing?.unit) {
          return `${sizing.shortLabel} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `${sizing?.shortLabel ?? "\u05E7\u05D8\u05DF"} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC \u05D1 "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05E1\u05EA\u05D9\u05D9\u05DD \u05D1 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05DB\u05DC\u05D5\u05DC "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D0\u05D9\u05DD \u05DC\u05EA\u05D1\u05E0\u05D9\u05EA ${_issue.pattern}`;
        const nounEntry = FormatDictionary[_issue.format];
        const noun = nounEntry?.label ?? _issue.format;
        const gender = nounEntry?.gender ?? "m";
        const adjective = gender === "f" ? "\u05EA\u05E7\u05D9\u05E0\u05D4" : "\u05EA\u05E7\u05D9\u05DF";
        return `${noun} \u05DC\u05D0 ${adjective}`;
      }
      case "not_multiple_of":
        return `\u05DE\u05E1\u05E4\u05E8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA \u05DE\u05DB\u05E4\u05DC\u05D4 \u05E9\u05DC ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u05DE\u05E4\u05EA\u05D7${issue2.keys.length > 1 ? "\u05D5\u05EA" : ""} \u05DC\u05D0 \u05DE\u05D6\u05D5\u05D4${issue2.keys.length > 1 ? "\u05D9\u05DD" : "\u05D4"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key": {
        return `\u05E9\u05D3\u05D4 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8`;
      }
      case "invalid_union":
        return "\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF";
      case "invalid_element": {
        const place = withDefinite(issue2.origin ?? "array");
        return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1${place}`;
      }
      default:
        return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF`;
    }
  };
};
function he_default() {
  return {
    localeError: error16()
  };
}

// ../node_modules/zod/v4/locales/hu.js
var error17 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "legyen" },
    file: { unit: "byte", verb: "legyen" },
    array: { unit: "elem", verb: "legyen" },
    set: { unit: "elem", verb: "legyen" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "bemenet",
    email: "email c\xEDm",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO id\u0151b\xE9lyeg",
    date: "ISO d\xE1tum",
    time: "ISO id\u0151",
    duration: "ISO id\u0151intervallum",
    ipv4: "IPv4 c\xEDm",
    ipv6: "IPv6 c\xEDm",
    cidrv4: "IPv4 tartom\xE1ny",
    cidrv6: "IPv6 tartom\xE1ny",
    base64: "base64-k\xF3dolt string",
    base64url: "base64url-k\xF3dolt string",
    json_string: "JSON string",
    e164: "E.164 sz\xE1m",
    jwt: "JWT",
    template_literal: "bemenet"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "sz\xE1m",
    array: "t\xF6mb"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k instanceof ${issue2.expected}, a kapott \xE9rt\xE9k ${received}`;
        }
        return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${expected}, a kapott \xE9rt\xE9k ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${stringifyPrimitive(issue2.values[0])}`;
        return `\xC9rv\xE9nytelen opci\xF3: valamelyik \xE9rt\xE9k v\xE1rt ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `T\xFAl nagy: ${issue2.origin ?? "\xE9rt\xE9k"} m\xE9rete t\xFAl nagy ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elem"}`;
        return `T\xFAl nagy: a bemeneti \xE9rt\xE9k ${issue2.origin ?? "\xE9rt\xE9k"} t\xFAl nagy: ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${issue2.origin} m\xE9rete t\xFAl kicsi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${issue2.origin} t\xFAl kicsi ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\xC9rv\xE9nytelen string: "${_issue.prefix}" \xE9rt\xE9kkel kell kezd\u0151dnie`;
        if (_issue.format === "ends_with")
          return `\xC9rv\xE9nytelen string: "${_issue.suffix}" \xE9rt\xE9kkel kell v\xE9gz\u0151dnie`;
        if (_issue.format === "includes")
          return `\xC9rv\xE9nytelen string: "${_issue.includes}" \xE9rt\xE9ket kell tartalmaznia`;
        if (_issue.format === "regex")
          return `\xC9rv\xE9nytelen string: ${_issue.pattern} mint\xE1nak kell megfelelnie`;
        return `\xC9rv\xE9nytelen ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\xC9rv\xE9nytelen sz\xE1m: ${issue2.divisor} t\xF6bbsz\xF6r\xF6s\xE9nek kell lennie`;
      case "unrecognized_keys":
        return `Ismeretlen kulcs${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\xC9rv\xE9nytelen kulcs ${issue2.origin}`;
      case "invalid_union":
        return "\xC9rv\xE9nytelen bemenet";
      case "invalid_element":
        return `\xC9rv\xE9nytelen \xE9rt\xE9k: ${issue2.origin}`;
      default:
        return `\xC9rv\xE9nytelen bemenet`;
    }
  };
};
function hu_default() {
  return {
    localeError: error17()
  };
}

// ../node_modules/zod/v4/locales/hy.js
function getArmenianPlural(count, one, many) {
  return Math.abs(count) === 1 ? one : many;
}
function withDefiniteArticle(word) {
  if (!word)
    return "";
  const vowels = ["\u0561", "\u0565", "\u0568", "\u056B", "\u0578", "\u0578\u0582", "\u0585"];
  const lastChar = word[word.length - 1];
  return word + (vowels.includes(lastChar) ? "\u0576" : "\u0568");
}
var error18 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "\u0576\u0577\u0561\u0576",
        many: "\u0576\u0577\u0561\u0576\u0576\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    },
    file: {
      unit: {
        one: "\u0562\u0561\u0575\u0569",
        many: "\u0562\u0561\u0575\u0569\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    },
    array: {
      unit: {
        one: "\u057F\u0561\u0580\u0580",
        many: "\u057F\u0561\u0580\u0580\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    },
    set: {
      unit: {
        one: "\u057F\u0561\u0580\u0580",
        many: "\u057F\u0561\u0580\u0580\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0574\u0578\u0582\u057F\u0584",
    email: "\u0567\u056C. \u0570\u0561\u057D\u0581\u0565",
    url: "URL",
    emoji: "\u0567\u0574\u0578\u057B\u056B",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E \u0587 \u056A\u0561\u0574",
    date: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E",
    time: "ISO \u056A\u0561\u0574",
    duration: "ISO \u057F\u0587\u0578\u0572\u0578\u0582\u0569\u0575\u0578\u0582\u0576",
    ipv4: "IPv4 \u0570\u0561\u057D\u0581\u0565",
    ipv6: "IPv6 \u0570\u0561\u057D\u0581\u0565",
    cidrv4: "IPv4 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584",
    cidrv6: "IPv6 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584",
    base64: "base64 \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572",
    base64url: "base64url \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572",
    json_string: "JSON \u057F\u0578\u0572",
    e164: "E.164 \u0570\u0561\u0574\u0561\u0580",
    jwt: "JWT",
    template_literal: "\u0574\u0578\u0582\u057F\u0584"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0569\u056B\u057E",
    array: "\u0566\u0561\u0576\u0563\u057E\u0561\u056E"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 instanceof ${issue2.expected}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${received}`;
        }
        return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${expected}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${stringifyPrimitive(issue2.values[1])}`;
        return `\u054D\u056D\u0561\u056C \u057F\u0561\u0580\u0562\u0565\u0580\u0561\u056F\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 \u0570\u0565\u057F\u0587\u0575\u0561\u056C\u0576\u0565\u0580\u056B\u0581 \u0574\u0565\u056F\u0568\u055D ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getArmenianPlural(maxValue, sizing.unit.one, sizing.unit.many);
          return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056C\u056B\u0576\u056B ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getArmenianPlural(minValue, sizing.unit.one, sizing.unit.many);
          return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin)} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin)} \u056C\u056B\u0576\u056B ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057D\u056F\u057D\u057E\u056B "${_issue.prefix}"-\u0578\u057E`;
        if (_issue.format === "ends_with")
          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0561\u057E\u0561\u0580\u057F\u057E\u056B "${_issue.suffix}"-\u0578\u057E`;
        if (_issue.format === "includes")
          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057A\u0561\u0580\u0578\u0582\u0576\u0561\u056F\u056B "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0570\u0561\u0574\u0561\u057A\u0561\u057F\u0561\u057D\u056D\u0561\u0576\u056B ${_issue.pattern} \u0571\u0587\u0561\u0579\u0561\u0583\u056B\u0576`;
        return `\u054D\u056D\u0561\u056C ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u054D\u056D\u0561\u056C \u0569\u056B\u057E\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0562\u0561\u0566\u0574\u0561\u057A\u0561\u057F\u056B\u056F \u056C\u056B\u0576\u056B ${issue2.divisor}-\u056B`;
      case "unrecognized_keys":
        return `\u0549\u0573\u0561\u0576\u0561\u0579\u057E\u0561\u056E \u0562\u0561\u0576\u0561\u056C\u056B${issue2.keys.length > 1 ? "\u0576\u0565\u0580" : ""}. ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u054D\u056D\u0561\u056C \u0562\u0561\u0576\u0561\u056C\u056B ${withDefiniteArticle(issue2.origin)}-\u0578\u0582\u0574`;
      case "invalid_union":
        return "\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574";
      case "invalid_element":
        return `\u054D\u056D\u0561\u056C \u0561\u0580\u056A\u0565\u0584 ${withDefiniteArticle(issue2.origin)}-\u0578\u0582\u0574`;
      default:
        return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574`;
    }
  };
};
function hy_default() {
  return {
    localeError: error18()
  };
}

// ../node_modules/zod/v4/locales/id.js
var error19 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "memiliki" },
    file: { unit: "byte", verb: "memiliki" },
    array: { unit: "item", verb: "memiliki" },
    set: { unit: "item", verb: "memiliki" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "alamat email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "tanggal dan waktu format ISO",
    date: "tanggal format ISO",
    time: "jam format ISO",
    duration: "durasi format ISO",
    ipv4: "alamat IPv4",
    ipv6: "alamat IPv6",
    cidrv4: "rentang alamat IPv4",
    cidrv6: "rentang alamat IPv6",
    base64: "string dengan enkode base64",
    base64url: "string dengan enkode base64url",
    json_string: "string JSON",
    e164: "angka E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input tidak valid: diharapkan instanceof ${issue2.expected}, diterima ${received}`;
        }
        return `Input tidak valid: diharapkan ${expected}, diterima ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input tidak valid: diharapkan ${stringifyPrimitive(issue2.values[0])}`;
        return `Pilihan tidak valid: diharapkan salah satu dari ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} memiliki ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
        return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} menjadi ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Terlalu kecil: diharapkan ${issue2.origin} memiliki ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Terlalu kecil: diharapkan ${issue2.origin} menjadi ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `String tidak valid: harus dimulai dengan "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `String tidak valid: harus berakhir dengan "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `String tidak valid: harus menyertakan "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `String tidak valid: harus sesuai pola ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} tidak valid`;
      }
      case "not_multiple_of":
        return `Angka tidak valid: harus kelipatan dari ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak valid di ${issue2.origin}`;
      case "invalid_union":
        return "Input tidak valid";
      case "invalid_element":
        return `Nilai tidak valid di ${issue2.origin}`;
      default:
        return `Input tidak valid`;
    }
  };
};
function id_default() {
  return {
    localeError: error19()
  };
}

// ../node_modules/zod/v4/locales/is.js
var error20 = () => {
  const Sizable = {
    string: { unit: "stafi", verb: "a\xF0 hafa" },
    file: { unit: "b\xE6ti", verb: "a\xF0 hafa" },
    array: { unit: "hluti", verb: "a\xF0 hafa" },
    set: { unit: "hluti", verb: "a\xF0 hafa" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "gildi",
    email: "netfang",
    url: "vefsl\xF3\xF0",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dagsetning og t\xEDmi",
    date: "ISO dagsetning",
    time: "ISO t\xEDmi",
    duration: "ISO t\xEDmalengd",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded strengur",
    base64url: "base64url-encoded strengur",
    json_string: "JSON strengur",
    e164: "E.164 t\xF6lugildi",
    jwt: "JWT",
    template_literal: "gildi"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "n\xFAmer",
    array: "fylki"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Rangt gildi: \xDE\xFA sl\xF3st inn ${received} \xFEar sem \xE1 a\xF0 vera instanceof ${issue2.expected}`;
        }
        return `Rangt gildi: \xDE\xFA sl\xF3st inn ${received} \xFEar sem \xE1 a\xF0 vera ${expected}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Rangt gildi: gert r\xE1\xF0 fyrir ${stringifyPrimitive(issue2.values[0])}`;
        return `\xD3gilt val: m\xE1 vera eitt af eftirfarandi ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin ?? "gildi"} hafi ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "hluti"}`;
        return `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin ?? "gildi"} s\xE9 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin} hafi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin} s\xE9 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\xD3gildur strengur: ver\xF0ur a\xF0 byrja \xE1 "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\xD3gildur strengur: ver\xF0ur a\xF0 enda \xE1 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\xD3gildur strengur: ver\xF0ur a\xF0 innihalda "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\xD3gildur strengur: ver\xF0ur a\xF0 fylgja mynstri ${_issue.pattern}`;
        return `Rangt ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `R\xF6ng tala: ver\xF0ur a\xF0 vera margfeldi af ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\xD3\xFEekkt ${issue2.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Rangur lykill \xED ${issue2.origin}`;
      case "invalid_union":
        return "Rangt gildi";
      case "invalid_element":
        return `Rangt gildi \xED ${issue2.origin}`;
      default:
        return `Rangt gildi`;
    }
  };
};
function is_default() {
  return {
    localeError: error20()
  };
}

// ../node_modules/zod/v4/locales/it.js
var error21 = () => {
  const Sizable = {
    string: { unit: "caratteri", verb: "avere" },
    file: { unit: "byte", verb: "avere" },
    array: { unit: "elementi", verb: "avere" },
    set: { unit: "elementi", verb: "avere" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "indirizzo email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data e ora ISO",
    date: "data ISO",
    time: "ora ISO",
    duration: "durata ISO",
    ipv4: "indirizzo IPv4",
    ipv6: "indirizzo IPv6",
    cidrv4: "intervallo IPv4",
    cidrv6: "intervallo IPv6",
    base64: "stringa codificata in base64",
    base64url: "URL codificata in base64",
    json_string: "stringa JSON",
    e164: "numero E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "numero",
    array: "vettore"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input non valido: atteso instanceof ${issue2.expected}, ricevuto ${received}`;
        }
        return `Input non valido: atteso ${expected}, ricevuto ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input non valido: atteso ${stringifyPrimitive(issue2.values[0])}`;
        return `Opzione non valida: atteso uno tra ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Troppo grande: ${issue2.origin ?? "valore"} deve avere ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementi"}`;
        return `Troppo grande: ${issue2.origin ?? "valore"} deve essere ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Troppo piccolo: ${issue2.origin} deve avere ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Troppo piccolo: ${issue2.origin} deve essere ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Stringa non valida: deve iniziare con "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Stringa non valida: deve terminare con "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Stringa non valida: deve includere "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Numero non valido: deve essere un multiplo di ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Chiav${issue2.keys.length > 1 ? "i" : "e"} non riconosciut${issue2.keys.length > 1 ? "e" : "a"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Chiave non valida in ${issue2.origin}`;
      case "invalid_union":
        return "Input non valido";
      case "invalid_element":
        return `Valore non valido in ${issue2.origin}`;
      default:
        return `Input non valido`;
    }
  };
};
function it_default() {
  return {
    localeError: error21()
  };
}

// ../node_modules/zod/v4/locales/ja.js
var error22 = () => {
  const Sizable = {
    string: { unit: "\u6587\u5B57", verb: "\u3067\u3042\u308B" },
    file: { unit: "\u30D0\u30A4\u30C8", verb: "\u3067\u3042\u308B" },
    array: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" },
    set: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u5165\u529B\u5024",
    email: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9",
    url: "URL",
    emoji: "\u7D75\u6587\u5B57",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO\u65E5\u6642",
    date: "ISO\u65E5\u4ED8",
    time: "ISO\u6642\u523B",
    duration: "ISO\u671F\u9593",
    ipv4: "IPv4\u30A2\u30C9\u30EC\u30B9",
    ipv6: "IPv6\u30A2\u30C9\u30EC\u30B9",
    cidrv4: "IPv4\u7BC4\u56F2",
    cidrv6: "IPv6\u7BC4\u56F2",
    base64: "base64\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217",
    base64url: "base64url\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217",
    json_string: "JSON\u6587\u5B57\u5217",
    e164: "E.164\u756A\u53F7",
    jwt: "JWT",
    template_literal: "\u5165\u529B\u5024"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u6570\u5024",
    array: "\u914D\u5217"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u7121\u52B9\u306A\u5165\u529B: instanceof ${issue2.expected}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${received}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
        }
        return `\u7121\u52B9\u306A\u5165\u529B: ${expected}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${received}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u7121\u52B9\u306A\u5165\u529B: ${stringifyPrimitive(issue2.values[0])}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F`;
        return `\u7121\u52B9\u306A\u9078\u629E: ${joinValues(issue2.values, "\u3001")}\u306E\u3044\u305A\u308C\u304B\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      case "too_big": {
        const adj = issue2.inclusive ? "\u4EE5\u4E0B\u3067\u3042\u308B" : "\u3088\u308A\u5C0F\u3055\u3044";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u5927\u304D\u3059\u304E\u308B\u5024: ${issue2.origin ?? "\u5024"}\u306F${issue2.maximum.toString()}${sizing.unit ?? "\u8981\u7D20"}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        return `\u5927\u304D\u3059\u304E\u308B\u5024: ${issue2.origin ?? "\u5024"}\u306F${issue2.maximum.toString()}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "\u4EE5\u4E0A\u3067\u3042\u308B" : "\u3088\u308A\u5927\u304D\u3044";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${issue2.origin}\u306F${issue2.minimum.toString()}${sizing.unit}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${issue2.origin}\u306F${issue2.minimum.toString()}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.prefix}"\u3067\u59CB\u307E\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        if (_issue.format === "ends_with")
          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.suffix}"\u3067\u7D42\u308F\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        if (_issue.format === "includes")
          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.includes}"\u3092\u542B\u3080\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        if (_issue.format === "regex")
          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: \u30D1\u30BF\u30FC\u30F3${_issue.pattern}\u306B\u4E00\u81F4\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        return `\u7121\u52B9\u306A${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u7121\u52B9\u306A\u6570\u5024: ${issue2.divisor}\u306E\u500D\u6570\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      case "unrecognized_keys":
        return `\u8A8D\u8B58\u3055\u308C\u3066\u3044\u306A\u3044\u30AD\u30FC${issue2.keys.length > 1 ? "\u7FA4" : ""}: ${joinValues(issue2.keys, "\u3001")}`;
      case "invalid_key":
        return `${issue2.origin}\u5185\u306E\u7121\u52B9\u306A\u30AD\u30FC`;
      case "invalid_union":
        return "\u7121\u52B9\u306A\u5165\u529B";
      case "invalid_element":
        return `${issue2.origin}\u5185\u306E\u7121\u52B9\u306A\u5024`;
      default:
        return `\u7121\u52B9\u306A\u5165\u529B`;
    }
  };
};
function ja_default() {
  return {
    localeError: error22()
  };
}

// ../node_modules/zod/v4/locales/ka.js
var error23 = () => {
  const Sizable = {
    string: { unit: "\u10E1\u10D8\u10DB\u10D1\u10DD\u10DA\u10DD", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" },
    file: { unit: "\u10D1\u10D0\u10D8\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" },
    array: { unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" },
    set: { unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0",
    email: "\u10D4\u10DA-\u10E4\u10DD\u10E1\u10E2\u10D8\u10E1 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
    url: "URL",
    emoji: "\u10D4\u10DB\u10DD\u10EF\u10D8",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8-\u10D3\u10E0\u10DD",
    date: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8",
    time: "\u10D3\u10E0\u10DD",
    duration: "\u10EE\u10D0\u10DC\u10D2\u10E0\u10EB\u10DA\u10D8\u10D5\u10DD\u10D1\u10D0",
    ipv4: "IPv4 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
    ipv6: "IPv6 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
    cidrv4: "IPv4 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8",
    cidrv6: "IPv6 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8",
    base64: "base64-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
    base64url: "base64url-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
    json_string: "JSON \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
    e164: "E.164 \u10DC\u10DD\u10DB\u10D4\u10E0\u10D8",
    jwt: "JWT",
    template_literal: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u10E0\u10D8\u10EA\u10EE\u10D5\u10D8",
    string: "\u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
    boolean: "\u10D1\u10E3\u10DA\u10D4\u10D0\u10DC\u10D8",
    function: "\u10E4\u10E3\u10DC\u10E5\u10EA\u10D8\u10D0",
    array: "\u10DB\u10D0\u10E1\u10D8\u10D5\u10D8"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 instanceof ${issue2.expected}, \u10DB\u10D8\u10E6\u10D4\u10D1\u10E3\u10DA\u10D8 ${received}`;
        }
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${expected}, \u10DB\u10D8\u10E6\u10D4\u10D1\u10E3\u10DA\u10D8 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${stringifyPrimitive(issue2.values[0])}`;
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D0\u10E0\u10D8\u10D0\u10DC\u10E2\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8\u10D0 \u10D4\u10E0\u10D7-\u10D4\u10E0\u10D7\u10D8 ${joinValues(issue2.values, "|")}-\u10D3\u10D0\u10DC`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} \u10D8\u10E7\u10DD\u10E1 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin} \u10D8\u10E7\u10DD\u10E1 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10EC\u10E7\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${_issue.prefix}"-\u10D8\u10D7`;
        }
        if (_issue.format === "ends_with")
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10DB\u10D7\u10D0\u10D5\u10E0\u10D3\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${_issue.suffix}"-\u10D8\u10D7`;
        if (_issue.format === "includes")
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1 "${_issue.includes}"-\u10E1`;
        if (_issue.format === "regex")
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D4\u10E1\u10D0\u10D1\u10D0\u10DB\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 \u10E8\u10D0\u10D1\u10DA\u10DD\u10DC\u10E1 ${_issue.pattern}`;
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E0\u10D8\u10EA\u10EE\u10D5\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10E7\u10DD\u10E1 ${issue2.divisor}-\u10D8\u10E1 \u10EF\u10D4\u10E0\u10D0\u10D3\u10D8`;
      case "unrecognized_keys":
        return `\u10E3\u10EA\u10DC\u10DD\u10D1\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1${issue2.keys.length > 1 ? "\u10D4\u10D1\u10D8" : "\u10D8"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1\u10D8 ${issue2.origin}-\u10E8\u10D8`;
      case "invalid_union":
        return "\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0";
      case "invalid_element":
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0 ${issue2.origin}-\u10E8\u10D8`;
      default:
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0`;
    }
  };
};
function ka_default() {
  return {
    localeError: error23()
  };
}

// ../node_modules/zod/v4/locales/km.js
var error24 = () => {
  const Sizable = {
    string: { unit: "\u178F\u17BD\u17A2\u1780\u17D2\u179F\u179A", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" },
    file: { unit: "\u1794\u17C3", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" },
    array: { unit: "\u1792\u17B6\u178F\u17BB", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" },
    set: { unit: "\u1792\u17B6\u178F\u17BB", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B",
    email: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793\u17A2\u17CA\u17B8\u1798\u17C2\u179B",
    url: "URL",
    emoji: "\u179F\u1789\u17D2\u1789\u17B6\u17A2\u17B6\u179A\u1798\u17D2\u1798\u178E\u17CD",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 \u1793\u17B7\u1784\u1798\u17C9\u17C4\u1784 ISO",
    date: "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 ISO",
    time: "\u1798\u17C9\u17C4\u1784 ISO",
    duration: "\u179A\u1799\u17C8\u1796\u17C1\u179B ISO",
    ipv4: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4",
    ipv6: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6",
    cidrv4: "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4",
    cidrv6: "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6",
    base64: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64",
    base64url: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64url",
    json_string: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A JSON",
    e164: "\u179B\u17C1\u1781 E.164",
    jwt: "JWT",
    template_literal: "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u179B\u17C1\u1781",
    array: "\u17A2\u17B6\u179A\u17C1 (Array)",
    null: "\u1782\u17D2\u1798\u17B6\u1793\u178F\u1798\u17D2\u179B\u17C3 (null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A instanceof ${issue2.expected} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${received}`;
        }
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${expected} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${stringifyPrimitive(issue2.values[0])}`;
        return `\u1787\u1798\u17D2\u179A\u17BE\u179F\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1787\u17B6\u1798\u17BD\u1799\u1780\u17D2\u1793\u17BB\u1784\u1785\u17C6\u178E\u17C4\u1798 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "\u1792\u17B6\u178F\u17BB"}`;
        return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin} ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1785\u17B6\u1794\u17CB\u1795\u17D2\u178F\u17BE\u1798\u178A\u17C4\u1799 "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1794\u1789\u17D2\u1785\u1794\u17CB\u178A\u17C4\u1799 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1798\u17B6\u1793 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1795\u17D2\u1782\u17BC\u1795\u17D2\u1782\u1784\u1793\u17B9\u1784\u1791\u1798\u17D2\u179A\u1784\u17CB\u178A\u17C2\u179B\u1794\u17B6\u1793\u1780\u17C6\u178E\u178F\u17CB ${_issue.pattern}`;
        return `\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u179B\u17C1\u1781\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1787\u17B6\u1796\u17A0\u17BB\u1782\u17BB\u178E\u1793\u17C3 ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u179A\u1780\u1783\u17BE\u1789\u179F\u17C4\u1798\u17B7\u1793\u179F\u17D2\u1782\u17B6\u179B\u17CB\u17D6 ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u179F\u17C4\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${issue2.origin}`;
      case "invalid_union":
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C`;
      case "invalid_element":
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${issue2.origin}`;
      default:
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C`;
    }
  };
};
function km_default() {
  return {
    localeError: error24()
  };
}

// ../node_modules/zod/v4/locales/kh.js
function kh_default() {
  return km_default();
}

// ../node_modules/zod/v4/locales/ko.js
var error25 = () => {
  const Sizable = {
    string: { unit: "\uBB38\uC790", verb: "to have" },
    file: { unit: "\uBC14\uC774\uD2B8", verb: "to have" },
    array: { unit: "\uAC1C", verb: "to have" },
    set: { unit: "\uAC1C", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\uC785\uB825",
    email: "\uC774\uBA54\uC77C \uC8FC\uC18C",
    url: "URL",
    emoji: "\uC774\uBAA8\uC9C0",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \uB0A0\uC9DC\uC2DC\uAC04",
    date: "ISO \uB0A0\uC9DC",
    time: "ISO \uC2DC\uAC04",
    duration: "ISO \uAE30\uAC04",
    ipv4: "IPv4 \uC8FC\uC18C",
    ipv6: "IPv6 \uC8FC\uC18C",
    cidrv4: "IPv4 \uBC94\uC704",
    cidrv6: "IPv6 \uBC94\uC704",
    base64: "base64 \uC778\uCF54\uB529 \uBB38\uC790\uC5F4",
    base64url: "base64url \uC778\uCF54\uB529 \uBB38\uC790\uC5F4",
    json_string: "JSON \uBB38\uC790\uC5F4",
    e164: "E.164 \uBC88\uD638",
    jwt: "JWT",
    template_literal: "\uC785\uB825"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 instanceof ${issue2.expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${received}\uC785\uB2C8\uB2E4`;
        }
        return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 ${expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${received}\uC785\uB2C8\uB2E4`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\uC798\uBABB\uB41C \uC785\uB825: \uAC12\uC740 ${stringifyPrimitive(issue2.values[0])} \uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4`;
        return `\uC798\uBABB\uB41C \uC635\uC158: ${joinValues(issue2.values, "\uB610\uB294 ")} \uC911 \uD558\uB098\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
      case "too_big": {
        const adj = issue2.inclusive ? "\uC774\uD558" : "\uBBF8\uB9CC";
        const suffix = adj === "\uBBF8\uB9CC" ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4";
        const sizing = getSizing(issue2.origin);
        const unit = sizing?.unit ?? "\uC694\uC18C";
        if (sizing)
          return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${issue2.maximum.toString()}${unit} ${adj}${suffix}`;
        return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${issue2.maximum.toString()} ${adj}${suffix}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "\uC774\uC0C1" : "\uCD08\uACFC";
        const suffix = adj === "\uC774\uC0C1" ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4";
        const sizing = getSizing(issue2.origin);
        const unit = sizing?.unit ?? "\uC694\uC18C";
        if (sizing) {
          return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${issue2.minimum.toString()}${unit} ${adj}${suffix}`;
        }
        return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${issue2.minimum.toString()} ${adj}${suffix}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.prefix}"(\uC73C)\uB85C \uC2DC\uC791\uD574\uC57C \uD569\uB2C8\uB2E4`;
        }
        if (_issue.format === "ends_with")
          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.suffix}"(\uC73C)\uB85C \uB05D\uB098\uC57C \uD569\uB2C8\uB2E4`;
        if (_issue.format === "includes")
          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.includes}"\uC744(\uB97C) \uD3EC\uD568\uD574\uC57C \uD569\uB2C8\uB2E4`;
        if (_issue.format === "regex")
          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: \uC815\uADDC\uC2DD ${_issue.pattern} \uD328\uD134\uACFC \uC77C\uCE58\uD574\uC57C \uD569\uB2C8\uB2E4`;
        return `\uC798\uBABB\uB41C ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\uC798\uBABB\uB41C \uC22B\uC790: ${issue2.divisor}\uC758 \uBC30\uC218\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
      case "unrecognized_keys":
        return `\uC778\uC2DD\uD560 \uC218 \uC5C6\uB294 \uD0A4: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\uC798\uBABB\uB41C \uD0A4: ${issue2.origin}`;
      case "invalid_union":
        return `\uC798\uBABB\uB41C \uC785\uB825`;
      case "invalid_element":
        return `\uC798\uBABB\uB41C \uAC12: ${issue2.origin}`;
      default:
        return `\uC798\uBABB\uB41C \uC785\uB825`;
    }
  };
};
function ko_default() {
  return {
    localeError: error25()
  };
}

// ../node_modules/zod/v4/locales/lt.js
var capitalizeFirstCharacter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
function getUnitTypeFromNumber(number4) {
  const abs = Math.abs(number4);
  const last = abs % 10;
  const last2 = abs % 100;
  if (last2 >= 11 && last2 <= 19 || last === 0)
    return "many";
  if (last === 1)
    return "one";
  return "few";
}
var error26 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "simbolis",
        few: "simboliai",
        many: "simboli\u0173"
      },
      verb: {
        smaller: {
          inclusive: "turi b\u016Bti ne ilgesn\u0117 kaip",
          notInclusive: "turi b\u016Bti trumpesn\u0117 kaip"
        },
        bigger: {
          inclusive: "turi b\u016Bti ne trumpesn\u0117 kaip",
          notInclusive: "turi b\u016Bti ilgesn\u0117 kaip"
        }
      }
    },
    file: {
      unit: {
        one: "baitas",
        few: "baitai",
        many: "bait\u0173"
      },
      verb: {
        smaller: {
          inclusive: "turi b\u016Bti ne didesnis kaip",
          notInclusive: "turi b\u016Bti ma\u017Eesnis kaip"
        },
        bigger: {
          inclusive: "turi b\u016Bti ne ma\u017Eesnis kaip",
          notInclusive: "turi b\u016Bti didesnis kaip"
        }
      }
    },
    array: {
      unit: {
        one: "element\u0105",
        few: "elementus",
        many: "element\u0173"
      },
      verb: {
        smaller: {
          inclusive: "turi tur\u0117ti ne daugiau kaip",
          notInclusive: "turi tur\u0117ti ma\u017Eiau kaip"
        },
        bigger: {
          inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip",
          notInclusive: "turi tur\u0117ti daugiau kaip"
        }
      }
    },
    set: {
      unit: {
        one: "element\u0105",
        few: "elementus",
        many: "element\u0173"
      },
      verb: {
        smaller: {
          inclusive: "turi tur\u0117ti ne daugiau kaip",
          notInclusive: "turi tur\u0117ti ma\u017Eiau kaip"
        },
        bigger: {
          inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip",
          notInclusive: "turi tur\u0117ti daugiau kaip"
        }
      }
    }
  };
  function getSizing(origin, unitType, inclusive, targetShouldBe) {
    const result = Sizable[origin] ?? null;
    if (result === null)
      return result;
    return {
      unit: result.unit[unitType],
      verb: result.verb[targetShouldBe][inclusive ? "inclusive" : "notInclusive"]
    };
  }
  const FormatDictionary = {
    regex: "\u012Fvestis",
    email: "el. pa\u0161to adresas",
    url: "URL",
    emoji: "jaustukas",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO data ir laikas",
    date: "ISO data",
    time: "ISO laikas",
    duration: "ISO trukm\u0117",
    ipv4: "IPv4 adresas",
    ipv6: "IPv6 adresas",
    cidrv4: "IPv4 tinklo prefiksas (CIDR)",
    cidrv6: "IPv6 tinklo prefiksas (CIDR)",
    base64: "base64 u\u017Ekoduota eilut\u0117",
    base64url: "base64url u\u017Ekoduota eilut\u0117",
    json_string: "JSON eilut\u0117",
    e164: "E.164 numeris",
    jwt: "JWT",
    template_literal: "\u012Fvestis"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "skai\u010Dius",
    bigint: "sveikasis skai\u010Dius",
    string: "eilut\u0117",
    boolean: "login\u0117 reik\u0161m\u0117",
    undefined: "neapibr\u0117\u017Eta reik\u0161m\u0117",
    function: "funkcija",
    symbol: "simbolis",
    array: "masyvas",
    object: "objektas",
    null: "nulin\u0117 reik\u0161m\u0117"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Gautas tipas ${received}, o tik\u0117tasi - instanceof ${issue2.expected}`;
        }
        return `Gautas tipas ${received}, o tik\u0117tasi - ${expected}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Privalo b\u016Bti ${stringifyPrimitive(issue2.values[0])}`;
        return `Privalo b\u016Bti vienas i\u0161 ${joinValues(issue2.values, "|")} pasirinkim\u0173`;
      case "too_big": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.maximum)), issue2.inclusive ?? false, "smaller");
        if (sizing?.verb)
          return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} ${sizing.verb} ${issue2.maximum.toString()} ${sizing.unit ?? "element\u0173"}`;
        const adj = issue2.inclusive ? "ne didesnis kaip" : "ma\u017Eesnis kaip";
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${adj} ${issue2.maximum.toString()} ${sizing?.unit}`;
      }
      case "too_small": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.minimum)), issue2.inclusive ?? false, "bigger");
        if (sizing?.verb)
          return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} ${sizing.verb} ${issue2.minimum.toString()} ${sizing.unit ?? "element\u0173"}`;
        const adj = issue2.inclusive ? "ne ma\u017Eesnis kaip" : "didesnis kaip";
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${adj} ${issue2.minimum.toString()} ${sizing?.unit}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Eilut\u0117 privalo prasid\u0117ti "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Eilut\u0117 privalo pasibaigti "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Eilut\u0117 privalo \u012Ftraukti "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Eilut\u0117 privalo atitikti ${_issue.pattern}`;
        return `Neteisingas ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Skai\u010Dius privalo b\u016Bti ${issue2.divisor} kartotinis.`;
      case "unrecognized_keys":
        return `Neatpa\u017Eint${issue2.keys.length > 1 ? "i" : "as"} rakt${issue2.keys.length > 1 ? "ai" : "as"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return "Rastas klaidingas raktas";
      case "invalid_union":
        return "Klaidinga \u012Fvestis";
      case "invalid_element": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} turi klaiding\u0105 \u012Fvest\u012F`;
      }
      default:
        return "Klaidinga \u012Fvestis";
    }
  };
};
function lt_default() {
  return {
    localeError: error26()
  };
}

// ../node_modules/zod/v4/locales/mk.js
var error27 = () => {
  const Sizable = {
    string: { unit: "\u0437\u043D\u0430\u0446\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" },
    file: { unit: "\u0431\u0430\u0458\u0442\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" },
    array: { unit: "\u0441\u0442\u0430\u0432\u043A\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" },
    set: { unit: "\u0441\u0442\u0430\u0432\u043A\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0432\u043D\u0435\u0441",
    email: "\u0430\u0434\u0440\u0435\u0441\u0430 \u043D\u0430 \u0435-\u043F\u043E\u0448\u0442\u0430",
    url: "URL",
    emoji: "\u0435\u043C\u043E\u045F\u0438",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0434\u0430\u0442\u0443\u043C \u0438 \u0432\u0440\u0435\u043C\u0435",
    date: "ISO \u0434\u0430\u0442\u0443\u043C",
    time: "ISO \u0432\u0440\u0435\u043C\u0435",
    duration: "ISO \u0432\u0440\u0435\u043C\u0435\u0442\u0440\u0430\u0435\u045A\u0435",
    ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441\u0430",
    ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441\u0430",
    cidrv4: "IPv4 \u043E\u043F\u0441\u0435\u0433",
    cidrv6: "IPv6 \u043E\u043F\u0441\u0435\u0433",
    base64: "base64-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430",
    base64url: "base64url-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430",
    json_string: "JSON \u043D\u0438\u0437\u0430",
    e164: "E.164 \u0431\u0440\u043E\u0458",
    jwt: "JWT",
    template_literal: "\u0432\u043D\u0435\u0441"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0431\u0440\u043E\u0458",
    array: "\u043D\u0438\u0437\u0430"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 instanceof ${issue2.expected}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${received}`;
        }
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${expected}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
        return `\u0413\u0440\u0435\u0448\u0430\u043D\u0430 \u043E\u043F\u0446\u0438\u0458\u0430: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 \u0435\u0434\u043D\u0430 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0438\u043C\u0430 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0438"}`;
        return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0431\u0438\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin} \u0434\u0430 \u0438\u043C\u0430 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin} \u0434\u0430 \u0431\u0438\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u043D\u0443\u0432\u0430 \u0441\u043E "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u0432\u0440\u0448\u0443\u0432\u0430 \u0441\u043E "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0432\u043A\u043B\u0443\u0447\u0443\u0432\u0430 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u043E\u0434\u0433\u043E\u0430\u0440\u0430 \u043D\u0430 \u043F\u0430\u0442\u0435\u0440\u043D\u043E\u0442 ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0431\u0440\u043E\u0458: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0431\u0438\u0434\u0435 \u0434\u0435\u043B\u0438\u0432 \u0441\u043E ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D\u0438 \u043A\u043B\u0443\u0447\u0435\u0432\u0438" : "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D \u043A\u043B\u0443\u0447"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u043A\u043B\u0443\u0447 \u0432\u043E ${issue2.origin}`;
      case "invalid_union":
        return "\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441";
      case "invalid_element":
        return `\u0413\u0440\u0435\u0448\u043D\u0430 \u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442 \u0432\u043E ${issue2.origin}`;
      default:
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441`;
    }
  };
};
function mk_default() {
  return {
    localeError: error27()
  };
}

// ../node_modules/zod/v4/locales/ms.js
var error28 = () => {
  const Sizable = {
    string: { unit: "aksara", verb: "mempunyai" },
    file: { unit: "bait", verb: "mempunyai" },
    array: { unit: "elemen", verb: "mempunyai" },
    set: { unit: "elemen", verb: "mempunyai" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "alamat e-mel",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "tarikh masa ISO",
    date: "tarikh ISO",
    time: "masa ISO",
    duration: "tempoh ISO",
    ipv4: "alamat IPv4",
    ipv6: "alamat IPv6",
    cidrv4: "julat IPv4",
    cidrv6: "julat IPv6",
    base64: "string dikodkan base64",
    base64url: "string dikodkan base64url",
    json_string: "string JSON",
    e164: "nombor E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombor"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input tidak sah: dijangka instanceof ${issue2.expected}, diterima ${received}`;
        }
        return `Input tidak sah: dijangka ${expected}, diterima ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input tidak sah: dijangka ${stringifyPrimitive(issue2.values[0])}`;
        return `Pilihan tidak sah: dijangka salah satu daripada ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
        return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} adalah ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Terlalu kecil: dijangka ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Terlalu kecil: dijangka ${issue2.origin} adalah ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `String tidak sah: mesti bermula dengan "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `String tidak sah: mesti berakhir dengan "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `String tidak sah: mesti mengandungi "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `String tidak sah: mesti sepadan dengan corak ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} tidak sah`;
      }
      case "not_multiple_of":
        return `Nombor tidak sah: perlu gandaan ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak sah dalam ${issue2.origin}`;
      case "invalid_union":
        return "Input tidak sah";
      case "invalid_element":
        return `Nilai tidak sah dalam ${issue2.origin}`;
      default:
        return `Input tidak sah`;
    }
  };
};
function ms_default() {
  return {
    localeError: error28()
  };
}

// ../node_modules/zod/v4/locales/nl.js
var error29 = () => {
  const Sizable = {
    string: { unit: "tekens", verb: "heeft" },
    file: { unit: "bytes", verb: "heeft" },
    array: { unit: "elementen", verb: "heeft" },
    set: { unit: "elementen", verb: "heeft" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "invoer",
    email: "emailadres",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum en tijd",
    date: "ISO datum",
    time: "ISO tijd",
    duration: "ISO duur",
    ipv4: "IPv4-adres",
    ipv6: "IPv6-adres",
    cidrv4: "IPv4-bereik",
    cidrv6: "IPv6-bereik",
    base64: "base64-gecodeerde tekst",
    base64url: "base64 URL-gecodeerde tekst",
    json_string: "JSON string",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "invoer"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "getal"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ongeldige invoer: verwacht instanceof ${issue2.expected}, ontving ${received}`;
        }
        return `Ongeldige invoer: verwacht ${expected}, ontving ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ongeldige invoer: verwacht ${stringifyPrimitive(issue2.values[0])}`;
        return `Ongeldige optie: verwacht \xE9\xE9n van ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const longName = issue2.origin === "date" ? "laat" : issue2.origin === "string" ? "lang" : "groot";
        if (sizing)
          return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementen"} ${sizing.verb}`;
        return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} is`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const shortName = issue2.origin === "date" ? "vroeg" : issue2.origin === "string" ? "kort" : "klein";
        if (sizing) {
          return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        }
        return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} is`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Ongeldige tekst: moet met "${_issue.prefix}" beginnen`;
        }
        if (_issue.format === "ends_with")
          return `Ongeldige tekst: moet op "${_issue.suffix}" eindigen`;
        if (_issue.format === "includes")
          return `Ongeldige tekst: moet "${_issue.includes}" bevatten`;
        if (_issue.format === "regex")
          return `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}`;
        return `Ongeldig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ongeldig getal: moet een veelvoud van ${issue2.divisor} zijn`;
      case "unrecognized_keys":
        return `Onbekende key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ongeldige key in ${issue2.origin}`;
      case "invalid_union":
        return "Ongeldige invoer";
      case "invalid_element":
        return `Ongeldige waarde in ${issue2.origin}`;
      default:
        return `Ongeldige invoer`;
    }
  };
};
function nl_default() {
  return {
    localeError: error29()
  };
}

// ../node_modules/zod/v4/locales/no.js
var error30 = () => {
  const Sizable = {
    string: { unit: "tegn", verb: "\xE5 ha" },
    file: { unit: "bytes", verb: "\xE5 ha" },
    array: { unit: "elementer", verb: "\xE5 inneholde" },
    set: { unit: "elementer", verb: "\xE5 inneholde" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "e-postadresse",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dato- og klokkeslett",
    date: "ISO-dato",
    time: "ISO-klokkeslett",
    duration: "ISO-varighet",
    ipv4: "IPv4-omr\xE5de",
    ipv6: "IPv6-omr\xE5de",
    cidrv4: "IPv4-spekter",
    cidrv6: "IPv6-spekter",
    base64: "base64-enkodet streng",
    base64url: "base64url-enkodet streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "tall",
    array: "liste"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ugyldig input: forventet instanceof ${issue2.expected}, fikk ${received}`;
        }
        return `Ugyldig input: forventet ${expected}, fikk ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ugyldig verdi: forventet ${stringifyPrimitive(issue2.values[0])}`;
        return `Ugyldig valg: forventet en av ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `For stor(t): forventet ${issue2.origin ?? "value"} til \xE5 ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
        return `For stor(t): forventet ${issue2.origin ?? "value"} til \xE5 ha ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `For lite(n): forventet ${issue2.origin} til \xE5 ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `For lite(n): forventet ${issue2.origin} til \xE5 ha ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ugyldig streng: m\xE5 starte med "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ugyldig streng: m\xE5 ende med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ugyldig streng: m\xE5 inneholde "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ugyldig streng: m\xE5 matche m\xF8nsteret ${_issue.pattern}`;
        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ugyldig tall: m\xE5 v\xE6re et multiplum av ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ukjente n\xF8kler" : "Ukjent n\xF8kkel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig n\xF8kkel i ${issue2.origin}`;
      case "invalid_union":
        return "Ugyldig input";
      case "invalid_element":
        return `Ugyldig verdi i ${issue2.origin}`;
      default:
        return `Ugyldig input`;
    }
  };
};
function no_default() {
  return {
    localeError: error30()
  };
}

// ../node_modules/zod/v4/locales/ota.js
var error31 = () => {
  const Sizable = {
    string: { unit: "harf", verb: "olmal\u0131d\u0131r" },
    file: { unit: "bayt", verb: "olmal\u0131d\u0131r" },
    array: { unit: "unsur", verb: "olmal\u0131d\u0131r" },
    set: { unit: "unsur", verb: "olmal\u0131d\u0131r" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "giren",
    email: "epostag\xE2h",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO heng\xE2m\u0131",
    date: "ISO tarihi",
    time: "ISO zaman\u0131",
    duration: "ISO m\xFCddeti",
    ipv4: "IPv4 ni\u015F\xE2n\u0131",
    ipv6: "IPv6 ni\u015F\xE2n\u0131",
    cidrv4: "IPv4 menzili",
    cidrv6: "IPv6 menzili",
    base64: "base64-\u015Fifreli metin",
    base64url: "base64url-\u015Fifreli metin",
    json_string: "JSON metin",
    e164: "E.164 say\u0131s\u0131",
    jwt: "JWT",
    template_literal: "giren"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "numara",
    array: "saf",
    null: "gayb"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `F\xE2sit giren: umulan instanceof ${issue2.expected}, al\u0131nan ${received}`;
        }
        return `F\xE2sit giren: umulan ${expected}, al\u0131nan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `F\xE2sit giren: umulan ${stringifyPrimitive(issue2.values[0])}`;
        return `F\xE2sit tercih: m\xFBteberler ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Fazla b\xFCy\xFCk: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"} sahip olmal\u0131yd\u0131.`;
        return `Fazla b\xFCy\xFCk: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} olmal\u0131yd\u0131.`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Fazla k\xFC\xE7\xFCk: ${issue2.origin}, ${adj}${issue2.minimum.toString()} ${sizing.unit} sahip olmal\u0131yd\u0131.`;
        }
        return `Fazla k\xFC\xE7\xFCk: ${issue2.origin}, ${adj}${issue2.minimum.toString()} olmal\u0131yd\u0131.`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `F\xE2sit metin: "${_issue.prefix}" ile ba\u015Flamal\u0131.`;
        if (_issue.format === "ends_with")
          return `F\xE2sit metin: "${_issue.suffix}" ile bitmeli.`;
        if (_issue.format === "includes")
          return `F\xE2sit metin: "${_issue.includes}" ihtiv\xE2 etmeli.`;
        if (_issue.format === "regex")
          return `F\xE2sit metin: ${_issue.pattern} nak\u015F\u0131na uymal\u0131.`;
        return `F\xE2sit ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `F\xE2sit say\u0131: ${issue2.divisor} kat\u0131 olmal\u0131yd\u0131.`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan anahtar ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} i\xE7in tan\u0131nmayan anahtar var.`;
      case "invalid_union":
        return "Giren tan\u0131namad\u0131.";
      case "invalid_element":
        return `${issue2.origin} i\xE7in tan\u0131nmayan k\u0131ymet var.`;
      default:
        return `K\u0131ymet tan\u0131namad\u0131.`;
    }
  };
};
function ota_default() {
  return {
    localeError: error31()
  };
}

// ../node_modules/zod/v4/locales/ps.js
var error32 = () => {
  const Sizable = {
    string: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" },
    file: { unit: "\u0628\u0627\u06CC\u067C\u0633", verb: "\u0648\u0644\u0631\u064A" },
    array: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" },
    set: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0648\u0631\u0648\u062F\u064A",
    email: "\u0628\u0631\u06CC\u069A\u0646\u0627\u0644\u06CC\u06A9",
    url: "\u06CC\u0648 \u0622\u0631 \u0627\u0644",
    emoji: "\u0627\u06CC\u0645\u0648\u062C\u064A",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u0646\u06CC\u067C\u0647 \u0627\u0648 \u0648\u062E\u062A",
    date: "\u0646\u06D0\u067C\u0647",
    time: "\u0648\u062E\u062A",
    duration: "\u0645\u0648\u062F\u0647",
    ipv4: "\u062F IPv4 \u067E\u062A\u0647",
    ipv6: "\u062F IPv6 \u067E\u062A\u0647",
    cidrv4: "\u062F IPv4 \u0633\u0627\u062D\u0647",
    cidrv6: "\u062F IPv6 \u0633\u0627\u062D\u0647",
    base64: "base64-encoded \u0645\u062A\u0646",
    base64url: "base64url-encoded \u0645\u062A\u0646",
    json_string: "JSON \u0645\u062A\u0646",
    e164: "\u062F E.164 \u0634\u0645\u06D0\u0631\u0647",
    jwt: "JWT",
    template_literal: "\u0648\u0631\u0648\u062F\u064A"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0639\u062F\u062F",
    array: "\u0627\u0631\u06D0"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F instanceof ${issue2.expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${received} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
        }
        return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${received} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
      }
      case "invalid_value":
        if (issue2.values.length === 1) {
          return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${stringifyPrimitive(issue2.values[0])} \u0648\u0627\u06CC`;
        }
        return `\u0646\u0627\u0633\u0645 \u0627\u0646\u062A\u062E\u0627\u0628: \u0628\u0627\u06CC\u062F \u06CC\u0648 \u0644\u0647 ${joinValues(issue2.values, "|")} \u0685\u062E\u0647 \u0648\u0627\u06CC`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${issue2.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631\u0648\u0646\u0647"} \u0648\u0644\u0631\u064A`;
        }
        return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${issue2.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} \u0648\u064A`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0648\u0644\u0631\u064A`;
        }
        return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} \u0648\u064A`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${_issue.prefix}" \u0633\u0631\u0647 \u067E\u06CC\u0644 \u0634\u064A`;
        }
        if (_issue.format === "ends_with") {
          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${_issue.suffix}" \u0633\u0631\u0647 \u067E\u0627\u06CC \u062A\u0647 \u0648\u0631\u0633\u064A\u0696\u064A`;
        }
        if (_issue.format === "includes") {
          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F "${_issue.includes}" \u0648\u0644\u0631\u064A`;
        }
        if (_issue.format === "regex") {
          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F ${_issue.pattern} \u0633\u0631\u0647 \u0645\u0637\u0627\u0628\u0642\u062A \u0648\u0644\u0631\u064A`;
        }
        return `${FormatDictionary[_issue.format] ?? issue2.format} \u0646\u0627\u0633\u0645 \u062F\u06CC`;
      }
      case "not_multiple_of":
        return `\u0646\u0627\u0633\u0645 \u0639\u062F\u062F: \u0628\u0627\u06CC\u062F \u062F ${issue2.divisor} \u0645\u0636\u0631\u0628 \u0648\u064A`;
      case "unrecognized_keys":
        return `\u0646\u0627\u0633\u0645 ${issue2.keys.length > 1 ? "\u06A9\u0644\u06CC\u0689\u0648\u0646\u0647" : "\u06A9\u0644\u06CC\u0689"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u0646\u0627\u0633\u0645 \u06A9\u0644\u06CC\u0689 \u067E\u0647 ${issue2.origin} \u06A9\u06D0`;
      case "invalid_union":
        return `\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A`;
      case "invalid_element":
        return `\u0646\u0627\u0633\u0645 \u0639\u0646\u0635\u0631 \u067E\u0647 ${issue2.origin} \u06A9\u06D0`;
      default:
        return `\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A`;
    }
  };
};
function ps_default() {
  return {
    localeError: error32()
  };
}

// ../node_modules/zod/v4/locales/pl.js
var error33 = () => {
  const Sizable = {
    string: { unit: "znak\xF3w", verb: "mie\u0107" },
    file: { unit: "bajt\xF3w", verb: "mie\u0107" },
    array: { unit: "element\xF3w", verb: "mie\u0107" },
    set: { unit: "element\xF3w", verb: "mie\u0107" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "wyra\u017Cenie",
    email: "adres email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data i godzina w formacie ISO",
    date: "data w formacie ISO",
    time: "godzina w formacie ISO",
    duration: "czas trwania ISO",
    ipv4: "adres IPv4",
    ipv6: "adres IPv6",
    cidrv4: "zakres IPv4",
    cidrv6: "zakres IPv6",
    base64: "ci\u0105g znak\xF3w zakodowany w formacie base64",
    base64url: "ci\u0105g znak\xF3w zakodowany w formacie base64url",
    json_string: "ci\u0105g znak\xF3w w formacie JSON",
    e164: "liczba E.164",
    jwt: "JWT",
    template_literal: "wej\u015Bcie"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "liczba",
    array: "tablica"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano instanceof ${issue2.expected}, otrzymano ${received}`;
        }
        return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${expected}, otrzymano ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${stringifyPrimitive(issue2.values[0])}`;
        return `Nieprawid\u0142owa opcja: oczekiwano jednej z warto\u015Bci ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Za du\u017Ca warto\u015B\u0107: oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element\xF3w"}`;
        }
        return `Zbyt du\u017C(y/a/e): oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Za ma\u0142a warto\u015B\u0107: oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "element\xF3w"}`;
        }
        return `Zbyt ma\u0142(y/a/e): oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zaczyna\u0107 si\u0119 od "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi ko\u0144czy\u0107 si\u0119 na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zawiera\u0107 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi odpowiada\u0107 wzorcowi ${_issue.pattern}`;
        return `Nieprawid\u0142ow(y/a/e) ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nieprawid\u0142owa liczba: musi by\u0107 wielokrotno\u015Bci\u0105 ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nierozpoznane klucze${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Nieprawid\u0142owy klucz w ${issue2.origin}`;
      case "invalid_union":
        return "Nieprawid\u0142owe dane wej\u015Bciowe";
      case "invalid_element":
        return `Nieprawid\u0142owa warto\u015B\u0107 w ${issue2.origin}`;
      default:
        return `Nieprawid\u0142owe dane wej\u015Bciowe`;
    }
  };
};
function pl_default() {
  return {
    localeError: error33()
  };
}

// ../node_modules/zod/v4/locales/pt.js
var error34 = () => {
  const Sizable = {
    string: { unit: "caracteres", verb: "ter" },
    file: { unit: "bytes", verb: "ter" },
    array: { unit: "itens", verb: "ter" },
    set: { unit: "itens", verb: "ter" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "padr\xE3o",
    email: "endere\xE7o de e-mail",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data e hora ISO",
    date: "data ISO",
    time: "hora ISO",
    duration: "dura\xE7\xE3o ISO",
    ipv4: "endere\xE7o IPv4",
    ipv6: "endere\xE7o IPv6",
    cidrv4: "faixa de IPv4",
    cidrv6: "faixa de IPv6",
    base64: "texto codificado em base64",
    base64url: "URL codificada em base64",
    json_string: "texto JSON",
    e164: "n\xFAmero E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "n\xFAmero",
    null: "nulo"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Tipo inv\xE1lido: esperado instanceof ${issue2.expected}, recebido ${received}`;
        }
        return `Tipo inv\xE1lido: esperado ${expected}, recebido ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrada inv\xE1lida: esperado ${stringifyPrimitive(issue2.values[0])}`;
        return `Op\xE7\xE3o inv\xE1lida: esperada uma das ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Muito grande: esperado que ${issue2.origin ?? "valor"} tivesse ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Muito grande: esperado que ${issue2.origin ?? "valor"} fosse ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Muito pequeno: esperado que ${issue2.origin} tivesse ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Muito pequeno: esperado que ${issue2.origin} fosse ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Texto inv\xE1lido: deve come\xE7ar com "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Texto inv\xE1lido: deve terminar com "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Texto inv\xE1lido: deve incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Texto inv\xE1lido: deve corresponder ao padr\xE3o ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} inv\xE1lido`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE1lido: deve ser m\xFAltiplo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Chave${issue2.keys.length > 1 ? "s" : ""} desconhecida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Chave inv\xE1lida em ${issue2.origin}`;
      case "invalid_union":
        return "Entrada inv\xE1lida";
      case "invalid_element":
        return `Valor inv\xE1lido em ${issue2.origin}`;
      default:
        return `Campo inv\xE1lido`;
    }
  };
};
function pt_default() {
  return {
    localeError: error34()
  };
}

// ../node_modules/zod/v4/locales/ru.js
function getRussianPlural(count, one, few, many) {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
var error35 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "\u0441\u0438\u043C\u0432\u043E\u043B",
        few: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430",
        many: "\u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"
      },
      verb: "\u0438\u043C\u0435\u0442\u044C"
    },
    file: {
      unit: {
        one: "\u0431\u0430\u0439\u0442",
        few: "\u0431\u0430\u0439\u0442\u0430",
        many: "\u0431\u0430\u0439\u0442"
      },
      verb: "\u0438\u043C\u0435\u0442\u044C"
    },
    array: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432"
      },
      verb: "\u0438\u043C\u0435\u0442\u044C"
    },
    set: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432"
      },
      verb: "\u0438\u043C\u0435\u0442\u044C"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0432\u0432\u043E\u0434",
    email: "email \u0430\u0434\u0440\u0435\u0441",
    url: "URL",
    emoji: "\u044D\u043C\u043E\u0434\u0437\u0438",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0434\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F",
    date: "ISO \u0434\u0430\u0442\u0430",
    time: "ISO \u0432\u0440\u0435\u043C\u044F",
    duration: "ISO \u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C",
    ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441",
    ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441",
    cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
    cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
    base64: "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64",
    base64url: "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64url",
    json_string: "JSON \u0441\u0442\u0440\u043E\u043A\u0430",
    e164: "\u043D\u043E\u043C\u0435\u0440 E.164",
    jwt: "JWT",
    template_literal: "\u0432\u0432\u043E\u0434"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0447\u0438\u0441\u043B\u043E",
    array: "\u043C\u0430\u0441\u0441\u0438\u0432"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C instanceof ${issue2.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${received}`;
        }
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${stringifyPrimitive(issue2.values[0])}`;
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0434\u043D\u043E \u0438\u0437 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getRussianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getRussianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin} \u0431\u0443\u0434\u0435\u0442 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C\u0441\u044F \u0441 "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u043D\u0430 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E: \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u043D${issue2.keys.length > 1 ? "\u044B\u0435" : "\u044B\u0439"} \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "\u0438" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043B\u044E\u0447 \u0432 ${issue2.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435";
      case "invalid_element":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432 ${issue2.origin}`;
      default:
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435`;
    }
  };
};
function ru_default() {
  return {
    localeError: error35()
  };
}

// ../node_modules/zod/v4/locales/sl.js
var error36 = () => {
  const Sizable = {
    string: { unit: "znakov", verb: "imeti" },
    file: { unit: "bajtov", verb: "imeti" },
    array: { unit: "elementov", verb: "imeti" },
    set: { unit: "elementov", verb: "imeti" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "vnos",
    email: "e-po\u0161tni naslov",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum in \u010Das",
    date: "ISO datum",
    time: "ISO \u010Das",
    duration: "ISO trajanje",
    ipv4: "IPv4 naslov",
    ipv6: "IPv6 naslov",
    cidrv4: "obseg IPv4",
    cidrv6: "obseg IPv6",
    base64: "base64 kodiran niz",
    base64url: "base64url kodiran niz",
    json_string: "JSON niz",
    e164: "E.164 \u0161tevilka",
    jwt: "JWT",
    template_literal: "vnos"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0161tevilo",
    array: "tabela"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Neveljaven vnos: pri\u010Dakovano instanceof ${issue2.expected}, prejeto ${received}`;
        }
        return `Neveljaven vnos: pri\u010Dakovano ${expected}, prejeto ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Neveljaven vnos: pri\u010Dakovano ${stringifyPrimitive(issue2.values[0])}`;
        return `Neveljavna mo\u017Enost: pri\u010Dakovano eno izmed ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Preveliko: pri\u010Dakovano, da bo ${issue2.origin ?? "vrednost"} imelo ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementov"}`;
        return `Preveliko: pri\u010Dakovano, da bo ${issue2.origin ?? "vrednost"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Premajhno: pri\u010Dakovano, da bo ${issue2.origin} imelo ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Premajhno: pri\u010Dakovano, da bo ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Neveljaven niz: mora se za\u010Deti z "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Neveljaven niz: mora se kon\u010Dati z "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neveljaven niz: mora vsebovati "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neveljaven niz: mora ustrezati vzorcu ${_issue.pattern}`;
        return `Neveljaven ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neveljavno \u0161tevilo: mora biti ve\u010Dkratnik ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Neprepoznan${issue2.keys.length > 1 ? "i klju\u010Di" : " klju\u010D"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neveljaven klju\u010D v ${issue2.origin}`;
      case "invalid_union":
        return "Neveljaven vnos";
      case "invalid_element":
        return `Neveljavna vrednost v ${issue2.origin}`;
      default:
        return "Neveljaven vnos";
    }
  };
};
function sl_default() {
  return {
    localeError: error36()
  };
}

// ../node_modules/zod/v4/locales/sv.js
var error37 = () => {
  const Sizable = {
    string: { unit: "tecken", verb: "att ha" },
    file: { unit: "bytes", verb: "att ha" },
    array: { unit: "objekt", verb: "att inneh\xE5lla" },
    set: { unit: "objekt", verb: "att inneh\xE5lla" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "regulj\xE4rt uttryck",
    email: "e-postadress",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-datum och tid",
    date: "ISO-datum",
    time: "ISO-tid",
    duration: "ISO-varaktighet",
    ipv4: "IPv4-intervall",
    ipv6: "IPv6-intervall",
    cidrv4: "IPv4-spektrum",
    cidrv6: "IPv6-spektrum",
    base64: "base64-kodad str\xE4ng",
    base64url: "base64url-kodad str\xE4ng",
    json_string: "JSON-str\xE4ng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "mall-literal"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "antal",
    array: "lista"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ogiltig inmatning: f\xF6rv\xE4ntat instanceof ${issue2.expected}, fick ${received}`;
        }
        return `Ogiltig inmatning: f\xF6rv\xE4ntat ${expected}, fick ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ogiltig inmatning: f\xF6rv\xE4ntat ${stringifyPrimitive(issue2.values[0])}`;
        return `Ogiltigt val: f\xF6rv\xE4ntade en av ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `F\xF6r stor(t): f\xF6rv\xE4ntade ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
        }
        return `F\xF6r stor(t): f\xF6rv\xE4ntat ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `F\xF6r lite(t): f\xF6rv\xE4ntade ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `F\xF6r lite(t): f\xF6rv\xE4ntade ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Ogiltig str\xE4ng: m\xE5ste b\xF6rja med "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Ogiltig str\xE4ng: m\xE5ste sluta med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ogiltig str\xE4ng: m\xE5ste inneh\xE5lla "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ogiltig str\xE4ng: m\xE5ste matcha m\xF6nstret "${_issue.pattern}"`;
        return `Ogiltig(t) ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ogiltigt tal: m\xE5ste vara en multipel av ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ok\xE4nda nycklar" : "Ok\xE4nd nyckel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ogiltig nyckel i ${issue2.origin ?? "v\xE4rdet"}`;
      case "invalid_union":
        return "Ogiltig input";
      case "invalid_element":
        return `Ogiltigt v\xE4rde i ${issue2.origin ?? "v\xE4rdet"}`;
      default:
        return `Ogiltig input`;
    }
  };
};
function sv_default() {
  return {
    localeError: error37()
  };
}

// ../node_modules/zod/v4/locales/ta.js
var error38 = () => {
  const Sizable = {
    string: { unit: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" },
    file: { unit: "\u0BAA\u0BC8\u0B9F\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" },
    array: { unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" },
    set: { unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1",
    email: "\u0BAE\u0BBF\u0BA9\u0BCD\u0BA9\u0B9E\u0BCD\u0B9A\u0BB2\u0BCD \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0BA4\u0BC7\u0BA4\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
    date: "ISO \u0BA4\u0BC7\u0BA4\u0BBF",
    time: "ISO \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
    duration: "ISO \u0B95\u0BBE\u0BB2 \u0B85\u0BB3\u0BB5\u0BC1",
    ipv4: "IPv4 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
    ipv6: "IPv6 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
    cidrv4: "IPv4 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1",
    cidrv6: "IPv6 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1",
    base64: "base64-encoded \u0B9A\u0BB0\u0BAE\u0BCD",
    base64url: "base64url-encoded \u0B9A\u0BB0\u0BAE\u0BCD",
    json_string: "JSON \u0B9A\u0BB0\u0BAE\u0BCD",
    e164: "E.164 \u0B8E\u0BA3\u0BCD",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0B8E\u0BA3\u0BCD",
    array: "\u0B85\u0BA3\u0BBF",
    null: "\u0BB5\u0BC6\u0BB1\u0BC1\u0BAE\u0BC8"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 instanceof ${issue2.expected}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${received}`;
        }
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${expected}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${stringifyPrimitive(issue2.values[0])}`;
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BAE\u0BCD: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${joinValues(issue2.values, "|")} \u0B87\u0BB2\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BC1`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD"} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        }
        return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${adj}${issue2.maximum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        }
        return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin} ${adj}${issue2.minimum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.prefix}" \u0B87\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        if (_issue.format === "ends_with")
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.suffix}" \u0B87\u0BB2\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0B9F\u0BC8\u0BAF \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        if (_issue.format === "includes")
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.includes}" \u0B90 \u0B89\u0BB3\u0BCD\u0BB3\u0B9F\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        if (_issue.format === "regex")
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: ${_issue.pattern} \u0BAE\u0BC1\u0BB1\u0BC8\u0BAA\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B9F\u0BA9\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B8E\u0BA3\u0BCD: ${issue2.divisor} \u0B87\u0BA9\u0BCD \u0BAA\u0BB2\u0BAE\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      case "unrecognized_keys":
        return `\u0B85\u0B9F\u0BC8\u0BAF\u0BBE\u0BB3\u0BAE\u0BCD \u0BA4\u0BC6\u0BB0\u0BBF\u0BAF\u0BBE\u0BA4 \u0BB5\u0BBF\u0B9A\u0BC8${issue2.keys.length > 1 ? "\u0B95\u0BB3\u0BCD" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9A\u0BC8`;
      case "invalid_union":
        return "\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1";
      case "invalid_element":
        return `${issue2.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1`;
      default:
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1`;
    }
  };
};
function ta_default() {
  return {
    localeError: error38()
  };
}

// ../node_modules/zod/v4/locales/th.js
var error39 = () => {
  const Sizable = {
    string: { unit: "\u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" },
    file: { unit: "\u0E44\u0E1A\u0E15\u0E4C", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" },
    array: { unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" },
    set: { unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19",
    email: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E2D\u0E35\u0E40\u0E21\u0E25",
    url: "URL",
    emoji: "\u0E2D\u0E34\u0E42\u0E21\u0E08\u0E34",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
    date: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E41\u0E1A\u0E1A ISO",
    time: "\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
    duration: "\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
    ipv4: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv4",
    ipv6: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv6",
    cidrv4: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv4",
    cidrv6: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv6",
    base64: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64",
    base64url: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A URL",
    json_string: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A JSON",
    e164: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28 (E.164)",
    jwt: "\u0E42\u0E17\u0E40\u0E04\u0E19 JWT",
    template_literal: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02",
    array: "\u0E2D\u0E32\u0E23\u0E4C\u0E40\u0E23\u0E22\u0E4C (Array)",
    null: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E48\u0E32 (null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 instanceof ${issue2.expected} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${received}`;
        }
        return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${expected} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u0E04\u0E48\u0E32\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${stringifyPrimitive(issue2.values[0])}`;
        return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E43\u0E19 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19" : "\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"}`;
        return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22" : "\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E36\u0E49\u0E19\u0E15\u0E49\u0E19\u0E14\u0E49\u0E27\u0E22 "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E25\u0E07\u0E17\u0E49\u0E32\u0E22\u0E14\u0E49\u0E27\u0E22 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35 "${_issue.includes}" \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21`;
        if (_issue.format === "regex")
          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14 ${_issue.pattern}`;
        return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E2B\u0E32\u0E23\u0E14\u0E49\u0E27\u0E22 ${issue2.divisor} \u0E44\u0E14\u0E49\u0E25\u0E07\u0E15\u0E31\u0E27`;
      case "unrecognized_keys":
        return `\u0E1E\u0E1A\u0E04\u0E35\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E23\u0E39\u0E49\u0E08\u0E31\u0E01: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u0E04\u0E35\u0E22\u0E4C\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${issue2.origin}`;
      case "invalid_union":
        return "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E22\u0E39\u0E40\u0E19\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E44\u0E27\u0E49";
      case "invalid_element":
        return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${issue2.origin}`;
      default:
        return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07`;
    }
  };
};
function th_default() {
  return {
    localeError: error39()
  };
}

// ../node_modules/zod/v4/locales/tr.js
var error40 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "olmal\u0131" },
    file: { unit: "bayt", verb: "olmal\u0131" },
    array: { unit: "\xF6\u011Fe", verb: "olmal\u0131" },
    set: { unit: "\xF6\u011Fe", verb: "olmal\u0131" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "girdi",
    email: "e-posta adresi",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO tarih ve saat",
    date: "ISO tarih",
    time: "ISO saat",
    duration: "ISO s\xFCre",
    ipv4: "IPv4 adresi",
    ipv6: "IPv6 adresi",
    cidrv4: "IPv4 aral\u0131\u011F\u0131",
    cidrv6: "IPv6 aral\u0131\u011F\u0131",
    base64: "base64 ile \u015Fifrelenmi\u015F metin",
    base64url: "base64url ile \u015Fifrelenmi\u015F metin",
    json_string: "JSON dizesi",
    e164: "E.164 say\u0131s\u0131",
    jwt: "JWT",
    template_literal: "\u015Eablon dizesi"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ge\xE7ersiz de\u011Fer: beklenen instanceof ${issue2.expected}, al\u0131nan ${received}`;
        }
        return `Ge\xE7ersiz de\u011Fer: beklenen ${expected}, al\u0131nan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ge\xE7ersiz de\u011Fer: beklenen ${stringifyPrimitive(issue2.values[0])}`;
        return `Ge\xE7ersiz se\xE7enek: a\u015Fa\u011F\u0131dakilerden biri olmal\u0131: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\xC7ok b\xFCy\xFCk: beklenen ${issue2.origin ?? "de\u011Fer"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\xF6\u011Fe"}`;
        return `\xC7ok b\xFCy\xFCk: beklenen ${issue2.origin ?? "de\u011Fer"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\xC7ok k\xFC\xE7\xFCk: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        return `\xC7ok k\xFC\xE7\xFCk: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ge\xE7ersiz metin: "${_issue.prefix}" ile ba\u015Flamal\u0131`;
        if (_issue.format === "ends_with")
          return `Ge\xE7ersiz metin: "${_issue.suffix}" ile bitmeli`;
        if (_issue.format === "includes")
          return `Ge\xE7ersiz metin: "${_issue.includes}" i\xE7ermeli`;
        if (_issue.format === "regex")
          return `Ge\xE7ersiz metin: ${_issue.pattern} desenine uymal\u0131`;
        return `Ge\xE7ersiz ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ge\xE7ersiz say\u0131: ${issue2.divisor} ile tam b\xF6l\xFCnebilmeli`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan anahtar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} i\xE7inde ge\xE7ersiz anahtar`;
      case "invalid_union":
        return "Ge\xE7ersiz de\u011Fer";
      case "invalid_element":
        return `${issue2.origin} i\xE7inde ge\xE7ersiz de\u011Fer`;
      default:
        return `Ge\xE7ersiz de\u011Fer`;
    }
  };
};
function tr_default() {
  return {
    localeError: error40()
  };
}

// ../node_modules/zod/v4/locales/uk.js
var error41 = () => {
  const Sizable = {
    string: { unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" },
    file: { unit: "\u0431\u0430\u0439\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" },
    array: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" },
    set: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456",
    email: "\u0430\u0434\u0440\u0435\u0441\u0430 \u0435\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0457 \u043F\u043E\u0448\u0442\u0438",
    url: "URL",
    emoji: "\u0435\u043C\u043E\u0434\u0437\u0456",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u0434\u0430\u0442\u0430 \u0442\u0430 \u0447\u0430\u0441 ISO",
    date: "\u0434\u0430\u0442\u0430 ISO",
    time: "\u0447\u0430\u0441 ISO",
    duration: "\u0442\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C ISO",
    ipv4: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv4",
    ipv6: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv6",
    cidrv4: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv4",
    cidrv6: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv6",
    base64: "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64",
    base64url: "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64url",
    json_string: "\u0440\u044F\u0434\u043E\u043A JSON",
    e164: "\u043D\u043E\u043C\u0435\u0440 E.164",
    jwt: "JWT",
    template_literal: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0447\u0438\u0441\u043B\u043E",
    array: "\u043C\u0430\u0441\u0438\u0432"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F instanceof ${issue2.expected}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${received}`;
        }
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${expected}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${stringifyPrimitive(issue2.values[0])}`;
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0430 \u043E\u043F\u0446\u0456\u044F: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F \u043E\u0434\u043D\u0435 \u0437 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432"}`;
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} \u0431\u0443\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin} \u0431\u0443\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043F\u043E\u0447\u0438\u043D\u0430\u0442\u0438\u0441\u044F \u0437 "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0437\u0430\u043A\u0456\u043D\u0447\u0443\u0432\u0430\u0442\u0438\u0441\u044F \u043D\u0430 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043C\u0456\u0441\u0442\u0438\u0442\u0438 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0442\u0438 \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0447\u0438\u0441\u043B\u043E: \u043F\u043E\u0432\u0438\u043D\u043D\u043E \u0431\u0443\u0442\u0438 \u043A\u0440\u0430\u0442\u043D\u0438\u043C ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u043E\u0437\u043F\u0456\u0437\u043D\u0430\u043D\u0438\u0439 \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "\u0456" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u043A\u043B\u044E\u0447 \u0443 ${issue2.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456";
      case "invalid_element":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0443 ${issue2.origin}`;
      default:
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456`;
    }
  };
};
function uk_default() {
  return {
    localeError: error41()
  };
}

// ../node_modules/zod/v4/locales/ua.js
function ua_default() {
  return uk_default();
}

// ../node_modules/zod/v4/locales/ur.js
var error42 = () => {
  const Sizable = {
    string: { unit: "\u062D\u0631\u0648\u0641", verb: "\u06C1\u0648\u0646\u0627" },
    file: { unit: "\u0628\u0627\u0626\u0679\u0633", verb: "\u06C1\u0648\u0646\u0627" },
    array: { unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627" },
    set: { unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0627\u0646 \u067E\u0679",
    email: "\u0627\u06CC \u0645\u06CC\u0644 \u0627\u06CC\u0688\u0631\u06CC\u0633",
    url: "\u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644",
    emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC",
    uuid: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    uuidv4: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 4",
    uuidv6: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 6",
    nanoid: "\u0646\u06CC\u0646\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    guid: "\u062C\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    cuid: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    cuid2: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC 2",
    ulid: "\u06CC\u0648 \u0627\u06CC\u0644 \u0622\u0626\u06CC \u0688\u06CC",
    xid: "\u0627\u06CC\u06A9\u0633 \u0622\u0626\u06CC \u0688\u06CC",
    ksuid: "\u06A9\u06D2 \u0627\u06CC\u0633 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    datetime: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0688\u06CC\u0679 \u0679\u0627\u0626\u0645",
    date: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u062A\u0627\u0631\u06CC\u062E",
    time: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0648\u0642\u062A",
    duration: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0645\u062F\u062A",
    ipv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0627\u06CC\u0688\u0631\u06CC\u0633",
    ipv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0627\u06CC\u0688\u0631\u06CC\u0633",
    cidrv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0631\u06CC\u0646\u062C",
    cidrv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0631\u06CC\u0646\u062C",
    base64: "\u0628\u06CC\u0633 64 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF",
    base64url: "\u0628\u06CC\u0633 64 \u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF",
    json_string: "\u062C\u06D2 \u0627\u06CC\u0633 \u0627\u0648 \u0627\u06CC\u0646 \u0633\u0679\u0631\u0646\u06AF",
    e164: "\u0627\u06CC 164 \u0646\u0645\u0628\u0631",
    jwt: "\u062C\u06D2 \u0688\u0628\u0644\u06CC\u0648 \u0679\u06CC",
    template_literal: "\u0627\u0646 \u067E\u0679"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0646\u0645\u0628\u0631",
    array: "\u0622\u0631\u06D2",
    null: "\u0646\u0644"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: instanceof ${issue2.expected} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${received} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
        }
        return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${expected} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${received} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${stringifyPrimitive(issue2.values[0])} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
        return `\u063A\u0644\u0637 \u0622\u067E\u0634\u0646: ${joinValues(issue2.values, "|")} \u0645\u06CC\u06BA \u0633\u06D2 \u0627\u06CC\u06A9 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${issue2.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u06D2 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0627\u0635\u0631"} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
        return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${issue2.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u0627 ${adj}${issue2.maximum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${issue2.origin} \u06A9\u06D2 ${adj}${issue2.minimum.toString()} ${sizing.unit} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
        }
        return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${issue2.origin} \u06A9\u0627 ${adj}${issue2.minimum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.prefix}" \u0633\u06D2 \u0634\u0631\u0648\u0639 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        }
        if (_issue.format === "ends_with")
          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.suffix}" \u067E\u0631 \u062E\u062A\u0645 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        if (_issue.format === "includes")
          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.includes}" \u0634\u0627\u0645\u0644 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        if (_issue.format === "regex")
          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: \u067E\u06CC\u0679\u0631\u0646 ${_issue.pattern} \u0633\u06D2 \u0645\u06CC\u0686 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        return `\u063A\u0644\u0637 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u063A\u0644\u0637 \u0646\u0645\u0628\u0631: ${issue2.divisor} \u06A9\u0627 \u0645\u0636\u0627\u0639\u0641 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
      case "unrecognized_keys":
        return `\u063A\u06CC\u0631 \u062A\u0633\u0644\u06CC\u0645 \u0634\u062F\u06C1 \u06A9\u06CC${issue2.keys.length > 1 ? "\u0632" : ""}: ${joinValues(issue2.keys, "\u060C ")}`;
      case "invalid_key":
        return `${issue2.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u06A9\u06CC`;
      case "invalid_union":
        return "\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679";
      case "invalid_element":
        return `${issue2.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u0648\u06CC\u0644\u06CC\u0648`;
      default:
        return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679`;
    }
  };
};
function ur_default() {
  return {
    localeError: error42()
  };
}

// ../node_modules/zod/v4/locales/uz.js
var error43 = () => {
  const Sizable = {
    string: { unit: "belgi", verb: "bo\u2018lishi kerak" },
    file: { unit: "bayt", verb: "bo\u2018lishi kerak" },
    array: { unit: "element", verb: "bo\u2018lishi kerak" },
    set: { unit: "element", verb: "bo\u2018lishi kerak" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "kirish",
    email: "elektron pochta manzili",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO sana va vaqti",
    date: "ISO sana",
    time: "ISO vaqt",
    duration: "ISO davomiylik",
    ipv4: "IPv4 manzil",
    ipv6: "IPv6 manzil",
    mac: "MAC manzil",
    cidrv4: "IPv4 diapazon",
    cidrv6: "IPv6 diapazon",
    base64: "base64 kodlangan satr",
    base64url: "base64url kodlangan satr",
    json_string: "JSON satr",
    e164: "E.164 raqam",
    jwt: "JWT",
    template_literal: "kirish"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "raqam",
    array: "massiv"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Noto\u2018g\u2018ri kirish: kutilgan instanceof ${issue2.expected}, qabul qilingan ${received}`;
        }
        return `Noto\u2018g\u2018ri kirish: kutilgan ${expected}, qabul qilingan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Noto\u2018g\u2018ri kirish: kutilgan ${stringifyPrimitive(issue2.values[0])}`;
        return `Noto\u2018g\u2018ri variant: quyidagilardan biri kutilgan ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        }
        return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Noto\u2018g\u2018ri satr: "${_issue.prefix}" bilan boshlanishi kerak`;
        if (_issue.format === "ends_with")
          return `Noto\u2018g\u2018ri satr: "${_issue.suffix}" bilan tugashi kerak`;
        if (_issue.format === "includes")
          return `Noto\u2018g\u2018ri satr: "${_issue.includes}" ni o\u2018z ichiga olishi kerak`;
        if (_issue.format === "regex")
          return `Noto\u2018g\u2018ri satr: ${_issue.pattern} shabloniga mos kelishi kerak`;
        return `Noto\u2018g\u2018ri ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Noto\u2018g\u2018ri raqam: ${issue2.divisor} ning karralisi bo\u2018lishi kerak`;
      case "unrecognized_keys":
        return `Noma\u2019lum kalit${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} dagi kalit noto\u2018g\u2018ri`;
      case "invalid_union":
        return "Noto\u2018g\u2018ri kirish";
      case "invalid_element":
        return `${issue2.origin} da noto\u2018g\u2018ri qiymat`;
      default:
        return `Noto\u2018g\u2018ri kirish`;
    }
  };
};
function uz_default() {
  return {
    localeError: error43()
  };
}

// ../node_modules/zod/v4/locales/vi.js
var error44 = () => {
  const Sizable = {
    string: { unit: "k\xFD t\u1EF1", verb: "c\xF3" },
    file: { unit: "byte", verb: "c\xF3" },
    array: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" },
    set: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0111\u1EA7u v\xE0o",
    email: "\u0111\u1ECBa ch\u1EC9 email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ng\xE0y gi\u1EDD ISO",
    date: "ng\xE0y ISO",
    time: "gi\u1EDD ISO",
    duration: "kho\u1EA3ng th\u1EDDi gian ISO",
    ipv4: "\u0111\u1ECBa ch\u1EC9 IPv4",
    ipv6: "\u0111\u1ECBa ch\u1EC9 IPv6",
    cidrv4: "d\u1EA3i IPv4",
    cidrv6: "d\u1EA3i IPv6",
    base64: "chu\u1ED7i m\xE3 h\xF3a base64",
    base64url: "chu\u1ED7i m\xE3 h\xF3a base64url",
    json_string: "chu\u1ED7i JSON",
    e164: "s\u1ED1 E.164",
    jwt: "JWT",
    template_literal: "\u0111\u1EA7u v\xE0o"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "s\u1ED1",
    array: "m\u1EA3ng"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i instanceof ${issue2.expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${received}`;
        }
        return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${stringifyPrimitive(issue2.values[0])}`;
        return `T\xF9y ch\u1ECDn kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i m\u1ED9t trong c\xE1c gi\xE1 tr\u1ECB ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${issue2.origin ?? "gi\xE1 tr\u1ECB"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "ph\u1EA7n t\u1EED"}`;
        return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${issue2.origin ?? "gi\xE1 tr\u1ECB"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i k\u1EBFt th\xFAc b\u1EB1ng "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i bao g\u1ED3m "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i kh\u1EDBp v\u1EDBi m\u1EABu ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} kh\xF4ng h\u1EE3p l\u1EC7`;
      }
      case "not_multiple_of":
        return `S\u1ED1 kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i l\xE0 b\u1ED9i s\u1ED1 c\u1EE7a ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kh\xF3a kh\xF4ng \u0111\u01B0\u1EE3c nh\u1EADn d\u1EA1ng: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kh\xF3a kh\xF4ng h\u1EE3p l\u1EC7 trong ${issue2.origin}`;
      case "invalid_union":
        return "\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7";
      case "invalid_element":
        return `Gi\xE1 tr\u1ECB kh\xF4ng h\u1EE3p l\u1EC7 trong ${issue2.origin}`;
      default:
        return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7`;
    }
  };
};
function vi_default() {
  return {
    localeError: error44()
  };
}

// ../node_modules/zod/v4/locales/zh-CN.js
var error45 = () => {
  const Sizable = {
    string: { unit: "\u5B57\u7B26", verb: "\u5305\u542B" },
    file: { unit: "\u5B57\u8282", verb: "\u5305\u542B" },
    array: { unit: "\u9879", verb: "\u5305\u542B" },
    set: { unit: "\u9879", verb: "\u5305\u542B" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u8F93\u5165",
    email: "\u7535\u5B50\u90AE\u4EF6",
    url: "URL",
    emoji: "\u8868\u60C5\u7B26\u53F7",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO\u65E5\u671F\u65F6\u95F4",
    date: "ISO\u65E5\u671F",
    time: "ISO\u65F6\u95F4",
    duration: "ISO\u65F6\u957F",
    ipv4: "IPv4\u5730\u5740",
    ipv6: "IPv6\u5730\u5740",
    cidrv4: "IPv4\u7F51\u6BB5",
    cidrv6: "IPv6\u7F51\u6BB5",
    base64: "base64\u7F16\u7801\u5B57\u7B26\u4E32",
    base64url: "base64url\u7F16\u7801\u5B57\u7B26\u4E32",
    json_string: "JSON\u5B57\u7B26\u4E32",
    e164: "E.164\u53F7\u7801",
    jwt: "JWT",
    template_literal: "\u8F93\u5165"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u6570\u5B57",
    array: "\u6570\u7EC4",
    null: "\u7A7A\u503C(null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B instanceof ${issue2.expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${received}`;
        }
        return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${stringifyPrimitive(issue2.values[0])}`;
        return `\u65E0\u6548\u9009\u9879\uFF1A\u671F\u671B\u4EE5\u4E0B\u4E4B\u4E00 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${issue2.origin ?? "\u503C"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u4E2A\u5143\u7D20"}`;
        return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${issue2.origin ?? "\u503C"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${_issue.prefix}" \u5F00\u5934`;
        if (_issue.format === "ends_with")
          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${_issue.suffix}" \u7ED3\u5C3E`;
        if (_issue.format === "includes")
          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u5305\u542B "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u6EE1\u8DB3\u6B63\u5219\u8868\u8FBE\u5F0F ${_issue.pattern}`;
        return `\u65E0\u6548${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u65E0\u6548\u6570\u5B57\uFF1A\u5FC5\u987B\u662F ${issue2.divisor} \u7684\u500D\u6570`;
      case "unrecognized_keys":
        return `\u51FA\u73B0\u672A\u77E5\u7684\u952E(key): ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} \u4E2D\u7684\u952E(key)\u65E0\u6548`;
      case "invalid_union":
        return "\u65E0\u6548\u8F93\u5165";
      case "invalid_element":
        return `${issue2.origin} \u4E2D\u5305\u542B\u65E0\u6548\u503C(value)`;
      default:
        return `\u65E0\u6548\u8F93\u5165`;
    }
  };
};
function zh_CN_default() {
  return {
    localeError: error45()
  };
}

// ../node_modules/zod/v4/locales/zh-TW.js
var error46 = () => {
  const Sizable = {
    string: { unit: "\u5B57\u5143", verb: "\u64C1\u6709" },
    file: { unit: "\u4F4D\u5143\u7D44", verb: "\u64C1\u6709" },
    array: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" },
    set: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u8F38\u5165",
    email: "\u90F5\u4EF6\u5730\u5740",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u65E5\u671F\u6642\u9593",
    date: "ISO \u65E5\u671F",
    time: "ISO \u6642\u9593",
    duration: "ISO \u671F\u9593",
    ipv4: "IPv4 \u4F4D\u5740",
    ipv6: "IPv6 \u4F4D\u5740",
    cidrv4: "IPv4 \u7BC4\u570D",
    cidrv6: "IPv6 \u7BC4\u570D",
    base64: "base64 \u7DE8\u78BC\u5B57\u4E32",
    base64url: "base64url \u7DE8\u78BC\u5B57\u4E32",
    json_string: "JSON \u5B57\u4E32",
    e164: "E.164 \u6578\u503C",
    jwt: "JWT",
    template_literal: "\u8F38\u5165"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA instanceof ${issue2.expected}\uFF0C\u4F46\u6536\u5230 ${received}`;
        }
        return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${expected}\uFF0C\u4F46\u6536\u5230 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${stringifyPrimitive(issue2.values[0])}`;
        return `\u7121\u6548\u7684\u9078\u9805\uFF1A\u9810\u671F\u70BA\u4EE5\u4E0B\u5176\u4E2D\u4E4B\u4E00 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${issue2.origin ?? "\u503C"} \u61C9\u70BA ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u500B\u5143\u7D20"}`;
        return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${issue2.origin ?? "\u503C"} \u61C9\u70BA ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${issue2.origin} \u61C9\u70BA ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${issue2.origin} \u61C9\u70BA ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${_issue.prefix}" \u958B\u982D`;
        }
        if (_issue.format === "ends_with")
          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${_issue.suffix}" \u7D50\u5C3E`;
        if (_issue.format === "includes")
          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u5305\u542B "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u7B26\u5408\u683C\u5F0F ${_issue.pattern}`;
        return `\u7121\u6548\u7684 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u7121\u6548\u7684\u6578\u5B57\uFF1A\u5FC5\u9808\u70BA ${issue2.divisor} \u7684\u500D\u6578`;
      case "unrecognized_keys":
        return `\u7121\u6CD5\u8B58\u5225\u7684\u9375\u503C${issue2.keys.length > 1 ? "\u5011" : ""}\uFF1A${joinValues(issue2.keys, "\u3001")}`;
      case "invalid_key":
        return `${issue2.origin} \u4E2D\u6709\u7121\u6548\u7684\u9375\u503C`;
      case "invalid_union":
        return "\u7121\u6548\u7684\u8F38\u5165\u503C";
      case "invalid_element":
        return `${issue2.origin} \u4E2D\u6709\u7121\u6548\u7684\u503C`;
      default:
        return `\u7121\u6548\u7684\u8F38\u5165\u503C`;
    }
  };
};
function zh_TW_default() {
  return {
    localeError: error46()
  };
}

// ../node_modules/zod/v4/locales/yo.js
var error47 = () => {
  const Sizable = {
    string: { unit: "\xE0mi", verb: "n\xED" },
    file: { unit: "bytes", verb: "n\xED" },
    array: { unit: "nkan", verb: "n\xED" },
    set: { unit: "nkan", verb: "n\xED" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9",
    email: "\xE0d\xEDr\u1EB9\u0301s\xEC \xECm\u1EB9\u0301l\xEC",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\xE0k\xF3k\xF2 ISO",
    date: "\u1ECDj\u1ECD\u0301 ISO",
    time: "\xE0k\xF3k\xF2 ISO",
    duration: "\xE0k\xF3k\xF2 t\xF3 p\xE9 ISO",
    ipv4: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv4",
    ipv6: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv6",
    cidrv4: "\xE0gb\xE8gb\xE8 IPv4",
    cidrv6: "\xE0gb\xE8gb\xE8 IPv6",
    base64: "\u1ECD\u0300r\u1ECD\u0300 t\xED a k\u1ECD\u0301 n\xED base64",
    base64url: "\u1ECD\u0300r\u1ECD\u0300 base64url",
    json_string: "\u1ECD\u0300r\u1ECD\u0300 JSON",
    e164: "n\u1ECD\u0301mb\xE0 E.164",
    jwt: "JWT",
    template_literal: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "n\u1ECD\u0301mb\xE0",
    array: "akop\u1ECD"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi instanceof ${issue2.expected}, \xE0m\u1ECD\u0300 a r\xED ${received}`;
        }
        return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${expected}, \xE0m\u1ECD\u0300 a r\xED ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${stringifyPrimitive(issue2.values[0])}`;
        return `\xC0\u1E63\xE0y\xE0n a\u1E63\xEC\u1E63e: yan \u1ECD\u0300kan l\xE1ra ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${issue2.origin ?? "iye"} ${sizing.verb} ${adj}${issue2.maximum} ${sizing.unit}`;
        return `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 ${adj}${issue2.maximum}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum} ${sizing.unit}`;
        return `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 ${adj}${issue2.minimum}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\u1EB9\u0300r\u1EB9\u0300 p\u1EB9\u0300l\xFA "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 par\xED p\u1EB9\u0300l\xFA "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 n\xED "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\xE1 \xE0p\u1EB9\u1EB9r\u1EB9 mu ${_issue.pattern}`;
        return `A\u1E63\xEC\u1E63e: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `N\u1ECD\u0301mb\xE0 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 j\u1EB9\u0301 \xE8y\xE0 p\xEDp\xEDn ti ${issue2.divisor}`;
      case "unrecognized_keys":
        return `B\u1ECDt\xECn\xEC \xE0\xECm\u1ECD\u0300: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `B\u1ECDt\xECn\xEC a\u1E63\xEC\u1E63e n\xEDn\xFA ${issue2.origin}`;
      case "invalid_union":
        return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
      case "invalid_element":
        return `Iye a\u1E63\xEC\u1E63e n\xEDn\xFA ${issue2.origin}`;
      default:
        return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
    }
  };
};
function yo_default() {
  return {
    localeError: error47()
  };
}

// ../node_modules/zod/v4/core/registries.js
var _a;
var $output = /* @__PURE__ */ Symbol("ZodOutput");
var $input = /* @__PURE__ */ Symbol("ZodInput");
var $ZodRegistry = class {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap();
    this._idmap = /* @__PURE__ */ new Map();
  }
  add(schema, ..._meta) {
    const meta3 = _meta[0];
    this._map.set(schema, meta3);
    if (meta3 && typeof meta3 === "object" && "id" in meta3) {
      this._idmap.set(meta3.id, schema);
    }
    return this;
  }
  clear() {
    this._map = /* @__PURE__ */ new WeakMap();
    this._idmap = /* @__PURE__ */ new Map();
    return this;
  }
  remove(schema) {
    const meta3 = this._map.get(schema);
    if (meta3 && typeof meta3 === "object" && "id" in meta3) {
      this._idmap.delete(meta3.id);
    }
    this._map.delete(schema);
    return this;
  }
  get(schema) {
    const p = schema._zod.parent;
    if (p) {
      const pm = { ...this.get(p) ?? {} };
      delete pm.id;
      const f = { ...pm, ...this._map.get(schema) };
      return Object.keys(f).length ? f : void 0;
    }
    return this._map.get(schema);
  }
  has(schema) {
    return this._map.has(schema);
  }
};
function registry() {
  return new $ZodRegistry();
}
(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
var globalRegistry = globalThis.__zod_globalRegistry;

// ../node_modules/zod/v4/core/api.js
// @__NO_SIDE_EFFECTS__
function _string(Class2, params) {
  return new Class2({
    type: "string",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedString(Class2, params) {
  return new Class2({
    type: "string",
    coerce: true,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _email(Class2, params) {
  return new Class2({
    type: "string",
    format: "email",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _guid(Class2, params) {
  return new Class2({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuidv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v4",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuidv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v6",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuidv7(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v7",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _url(Class2, params) {
  return new Class2({
    type: "string",
    format: "url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _emoji2(Class2, params) {
  return new Class2({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _nanoid(Class2, params) {
  return new Class2({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cuid2(Class2, params) {
  return new Class2({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ulid(Class2, params) {
  return new Class2({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _xid(Class2, params) {
  return new Class2({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ksuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ipv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ipv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _mac(Class2, params) {
  return new Class2({
    type: "string",
    format: "mac",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cidrv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cidrv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _base64(Class2, params) {
  return new Class2({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _base64url(Class2, params) {
  return new Class2({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _e164(Class2, params) {
  return new Class2({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _jwt(Class2, params) {
  return new Class2({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
var TimePrecision = {
  Any: null,
  Minute: -1,
  Second: 0,
  Millisecond: 3,
  Microsecond: 6
};
// @__NO_SIDE_EFFECTS__
function _isoDateTime(Class2, params) {
  return new Class2({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: false,
    local: false,
    precision: null,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _isoDate(Class2, params) {
  return new Class2({
    type: "string",
    format: "date",
    check: "string_format",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _isoTime(Class2, params) {
  return new Class2({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _isoDuration(Class2, params) {
  return new Class2({
    type: "string",
    format: "duration",
    check: "string_format",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _number(Class2, params) {
  return new Class2({
    type: "number",
    checks: [],
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedNumber(Class2, params) {
  return new Class2({
    type: "number",
    coerce: true,
    checks: [],
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _int(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "safeint",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _float32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float32",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _float64(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float64",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _int32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "int32",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uint32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "uint32",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _boolean(Class2, params) {
  return new Class2({
    type: "boolean",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedBoolean(Class2, params) {
  return new Class2({
    type: "boolean",
    coerce: true,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _bigint(Class2, params) {
  return new Class2({
    type: "bigint",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedBigint(Class2, params) {
  return new Class2({
    type: "bigint",
    coerce: true,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _int64(Class2, params) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "int64",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uint64(Class2, params) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "uint64",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _symbol(Class2, params) {
  return new Class2({
    type: "symbol",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _undefined2(Class2, params) {
  return new Class2({
    type: "undefined",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _null2(Class2, params) {
  return new Class2({
    type: "null",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _any(Class2) {
  return new Class2({
    type: "any"
  });
}
// @__NO_SIDE_EFFECTS__
function _unknown(Class2) {
  return new Class2({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function _never(Class2, params) {
  return new Class2({
    type: "never",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _void(Class2, params) {
  return new Class2({
    type: "void",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _date(Class2, params) {
  return new Class2({
    type: "date",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedDate(Class2, params) {
  return new Class2({
    type: "date",
    coerce: true,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _nan(Class2, params) {
  return new Class2({
    type: "nan",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _lt(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
// @__NO_SIDE_EFFECTS__
function _lte(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
// @__NO_SIDE_EFFECTS__
function _gt(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
// @__NO_SIDE_EFFECTS__
function _gte(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
// @__NO_SIDE_EFFECTS__
function _positive(params) {
  return /* @__PURE__ */ _gt(0, params);
}
// @__NO_SIDE_EFFECTS__
function _negative(params) {
  return /* @__PURE__ */ _lt(0, params);
}
// @__NO_SIDE_EFFECTS__
function _nonpositive(params) {
  return /* @__PURE__ */ _lte(0, params);
}
// @__NO_SIDE_EFFECTS__
function _nonnegative(params) {
  return /* @__PURE__ */ _gte(0, params);
}
// @__NO_SIDE_EFFECTS__
function _multipleOf(value, params) {
  return new $ZodCheckMultipleOf({
    check: "multiple_of",
    ...normalizeParams(params),
    value
  });
}
// @__NO_SIDE_EFFECTS__
function _maxSize(maximum, params) {
  return new $ZodCheckMaxSize({
    check: "max_size",
    ...normalizeParams(params),
    maximum
  });
}
// @__NO_SIDE_EFFECTS__
function _minSize(minimum, params) {
  return new $ZodCheckMinSize({
    check: "min_size",
    ...normalizeParams(params),
    minimum
  });
}
// @__NO_SIDE_EFFECTS__
function _size(size, params) {
  return new $ZodCheckSizeEquals({
    check: "size_equals",
    ...normalizeParams(params),
    size
  });
}
// @__NO_SIDE_EFFECTS__
function _maxLength(maximum, params) {
  const ch = new $ZodCheckMaxLength({
    check: "max_length",
    ...normalizeParams(params),
    maximum
  });
  return ch;
}
// @__NO_SIDE_EFFECTS__
function _minLength(minimum, params) {
  return new $ZodCheckMinLength({
    check: "min_length",
    ...normalizeParams(params),
    minimum
  });
}
// @__NO_SIDE_EFFECTS__
function _length(length, params) {
  return new $ZodCheckLengthEquals({
    check: "length_equals",
    ...normalizeParams(params),
    length
  });
}
// @__NO_SIDE_EFFECTS__
function _regex(pattern, params) {
  return new $ZodCheckRegex({
    check: "string_format",
    format: "regex",
    ...normalizeParams(params),
    pattern
  });
}
// @__NO_SIDE_EFFECTS__
function _lowercase(params) {
  return new $ZodCheckLowerCase({
    check: "string_format",
    format: "lowercase",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uppercase(params) {
  return new $ZodCheckUpperCase({
    check: "string_format",
    format: "uppercase",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _includes(includes, params) {
  return new $ZodCheckIncludes({
    check: "string_format",
    format: "includes",
    ...normalizeParams(params),
    includes
  });
}
// @__NO_SIDE_EFFECTS__
function _startsWith(prefix, params) {
  return new $ZodCheckStartsWith({
    check: "string_format",
    format: "starts_with",
    ...normalizeParams(params),
    prefix
  });
}
// @__NO_SIDE_EFFECTS__
function _endsWith(suffix, params) {
  return new $ZodCheckEndsWith({
    check: "string_format",
    format: "ends_with",
    ...normalizeParams(params),
    suffix
  });
}
// @__NO_SIDE_EFFECTS__
function _property(property, schema, params) {
  return new $ZodCheckProperty({
    check: "property",
    property,
    schema,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _mime(types, params) {
  return new $ZodCheckMimeType({
    check: "mime_type",
    mime: types,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _overwrite(tx) {
  return new $ZodCheckOverwrite({
    check: "overwrite",
    tx
  });
}
// @__NO_SIDE_EFFECTS__
function _normalize(form) {
  return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
}
// @__NO_SIDE_EFFECTS__
function _trim() {
  return /* @__PURE__ */ _overwrite((input) => input.trim());
}
// @__NO_SIDE_EFFECTS__
function _toLowerCase() {
  return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function _toUpperCase() {
  return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function _slugify() {
  return /* @__PURE__ */ _overwrite((input) => slugify(input));
}
// @__NO_SIDE_EFFECTS__
function _array(Class2, element, params) {
  return new Class2({
    type: "array",
    element,
    // get element() {
    //   return element;
    // },
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _union(Class2, options, params) {
  return new Class2({
    type: "union",
    options,
    ...normalizeParams(params)
  });
}
function _xor(Class2, options, params) {
  return new Class2({
    type: "union",
    options,
    inclusive: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _discriminatedUnion(Class2, discriminator, options, params) {
  return new Class2({
    type: "union",
    options,
    discriminator,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _intersection(Class2, left, right) {
  return new Class2({
    type: "intersection",
    left,
    right
  });
}
// @__NO_SIDE_EFFECTS__
function _tuple(Class2, items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new Class2({
    type: "tuple",
    items,
    rest,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _record(Class2, keyType, valueType, params) {
  return new Class2({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _map(Class2, keyType, valueType, params) {
  return new Class2({
    type: "map",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _set(Class2, valueType, params) {
  return new Class2({
    type: "set",
    valueType,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _enum(Class2, values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new Class2({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _nativeEnum(Class2, entries, params) {
  return new Class2({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _literal(Class2, value, params) {
  return new Class2({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _file(Class2, params) {
  return new Class2({
    type: "file",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _transform(Class2, fn) {
  return new Class2({
    type: "transform",
    transform: fn
  });
}
// @__NO_SIDE_EFFECTS__
function _optional(Class2, innerType) {
  return new Class2({
    type: "optional",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _nullable(Class2, innerType) {
  return new Class2({
    type: "nullable",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _default(Class2, innerType, defaultValue) {
  return new Class2({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
// @__NO_SIDE_EFFECTS__
function _nonoptional(Class2, innerType, params) {
  return new Class2({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _success(Class2, innerType) {
  return new Class2({
    type: "success",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _catch(Class2, innerType, catchValue) {
  return new Class2({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
  });
}
// @__NO_SIDE_EFFECTS__
function _pipe(Class2, in_, out) {
  return new Class2({
    type: "pipe",
    in: in_,
    out
  });
}
// @__NO_SIDE_EFFECTS__
function _readonly(Class2, innerType) {
  return new Class2({
    type: "readonly",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _templateLiteral(Class2, parts, params) {
  return new Class2({
    type: "template_literal",
    parts,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _lazy(Class2, getter) {
  return new Class2({
    type: "lazy",
    getter
  });
}
// @__NO_SIDE_EFFECTS__
function _promise(Class2, innerType) {
  return new Class2({
    type: "promise",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _custom(Class2, fn, _params) {
  const norm = normalizeParams(_params);
  norm.abort ?? (norm.abort = true);
  const schema = new Class2({
    type: "custom",
    check: "custom",
    fn,
    ...norm
  });
  return schema;
}
// @__NO_SIDE_EFFECTS__
function _refine(Class2, fn, _params) {
  const schema = new Class2({
    type: "custom",
    check: "custom",
    fn,
    ...normalizeParams(_params)
  });
  return schema;
}
// @__NO_SIDE_EFFECTS__
function _superRefine(fn) {
  const ch = /* @__PURE__ */ _check((payload) => {
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(issue(issue2, payload.value, ch._zod.def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = ch);
        _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
        payload.issues.push(issue(_issue));
      }
    };
    return fn(payload.value, payload);
  });
  return ch;
}
// @__NO_SIDE_EFFECTS__
function _check(fn, params) {
  const ch = new $ZodCheck({
    check: "custom",
    ...normalizeParams(params)
  });
  ch._zod.check = fn;
  return ch;
}
// @__NO_SIDE_EFFECTS__
function describe(description) {
  const ch = new $ZodCheck({ check: "describe" });
  ch._zod.onattach = [
    (inst) => {
      const existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, description });
    }
  ];
  ch._zod.check = () => {
  };
  return ch;
}
// @__NO_SIDE_EFFECTS__
function meta(metadata) {
  const ch = new $ZodCheck({ check: "meta" });
  ch._zod.onattach = [
    (inst) => {
      const existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, ...metadata });
    }
  ];
  ch._zod.check = () => {
  };
  return ch;
}
// @__NO_SIDE_EFFECTS__
function _stringbool(Classes, _params) {
  const params = normalizeParams(_params);
  let truthyArray = params.truthy ?? ["true", "1", "yes", "on", "y", "enabled"];
  let falsyArray = params.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
  if (params.case !== "sensitive") {
    truthyArray = truthyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
    falsyArray = falsyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
  }
  const truthySet = new Set(truthyArray);
  const falsySet = new Set(falsyArray);
  const _Codec = Classes.Codec ?? $ZodCodec;
  const _Boolean = Classes.Boolean ?? $ZodBoolean;
  const _String = Classes.String ?? $ZodString;
  const stringSchema = new _String({ type: "string", error: params.error });
  const booleanSchema = new _Boolean({ type: "boolean", error: params.error });
  const codec2 = new _Codec({
    type: "pipe",
    in: stringSchema,
    out: booleanSchema,
    transform: ((input, payload) => {
      let data = input;
      if (params.case !== "sensitive")
        data = data.toLowerCase();
      if (truthySet.has(data)) {
        return true;
      } else if (falsySet.has(data)) {
        return false;
      } else {
        payload.issues.push({
          code: "invalid_value",
          expected: "stringbool",
          values: [...truthySet, ...falsySet],
          input: payload.value,
          inst: codec2,
          continue: false
        });
        return {};
      }
    }),
    reverseTransform: ((input, _payload) => {
      if (input === true) {
        return truthyArray[0] || "true";
      } else {
        return falsyArray[0] || "false";
      }
    }),
    error: params.error
  });
  return codec2;
}
// @__NO_SIDE_EFFECTS__
function _stringFormat(Class2, format, fnOrRegex, _params = {}) {
  const params = normalizeParams(_params);
  const def = {
    ...normalizeParams(_params),
    check: "string_format",
    type: "string",
    format,
    fn: typeof fnOrRegex === "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
    ...params
  };
  if (fnOrRegex instanceof RegExp) {
    def.pattern = fnOrRegex;
  }
  const inst = new Class2(def);
  return inst;
}

// ../node_modules/zod/v4/core/to-json-schema.js
function initializeContext(params) {
  let target = params?.target ?? "draft-2020-12";
  if (target === "draft-4")
    target = "draft-04";
  if (target === "draft-7")
    target = "draft-07";
  return {
    processors: params.processors ?? {},
    metadataRegistry: params?.metadata ?? globalRegistry,
    target,
    unrepresentable: params?.unrepresentable ?? "throw",
    override: params?.override ?? (() => {
    }),
    io: params?.io ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    cycles: params?.cycles ?? "ref",
    reused: params?.reused ?? "inline",
    external: params?.external ?? void 0
  };
}
function process2(schema, ctx, _params = { path: [], schemaPath: [] }) {
  var _a2;
  const def = schema._zod.def;
  const seen = ctx.seen.get(schema);
  if (seen) {
    seen.count++;
    const isCycle = _params.schemaPath.includes(schema);
    if (isCycle) {
      seen.cycle = _params.path;
    }
    return seen.schema;
  }
  const result = { schema: {}, count: 1, cycle: void 0, path: _params.path };
  ctx.seen.set(schema, result);
  const overrideSchema = schema._zod.toJSONSchema?.();
  if (overrideSchema) {
    result.schema = overrideSchema;
  } else {
    const params = {
      ..._params,
      schemaPath: [..._params.schemaPath, schema],
      path: _params.path
    };
    if (schema._zod.processJSONSchema) {
      schema._zod.processJSONSchema(ctx, result.schema, params);
    } else {
      const _json = result.schema;
      const processor = ctx.processors[def.type];
      if (!processor) {
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
      }
      processor(schema, ctx, _json, params);
    }
    const parent = schema._zod.parent;
    if (parent) {
      if (!result.ref)
        result.ref = parent;
      process2(parent, ctx, params);
      ctx.seen.get(parent).isParent = true;
    }
  }
  const meta3 = ctx.metadataRegistry.get(schema);
  if (meta3)
    Object.assign(result.schema, meta3);
  if (ctx.io === "input" && isTransforming(schema)) {
    delete result.schema.examples;
    delete result.schema.default;
  }
  if (ctx.io === "input" && result.schema._prefault)
    (_a2 = result.schema).default ?? (_a2.default = result.schema._prefault);
  delete result.schema._prefault;
  const _result = ctx.seen.get(schema);
  return _result.schema;
}
function extractDefs(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const idToSchema = /* @__PURE__ */ new Map();
  for (const entry of ctx.seen.entries()) {
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      const existing = idToSchema.get(id);
      if (existing && existing !== entry[0]) {
        throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      }
      idToSchema.set(id, entry[0]);
    }
  }
  const makeURI = (entry) => {
    const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
    if (ctx.external) {
      const externalId = ctx.external.registry.get(entry[0])?.id;
      const uriGenerator = ctx.external.uri ?? ((id2) => id2);
      if (externalId) {
        return { ref: uriGenerator(externalId) };
      }
      const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
      entry[1].defId = id;
      return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}` };
    }
    if (entry[1] === root) {
      return { ref: "#" };
    }
    const uriPrefix = `#`;
    const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
    const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
    return { defId, ref: defUriPrefix + defId };
  };
  const extractToDef = (entry) => {
    if (entry[1].schema.$ref) {
      return;
    }
    const seen = entry[1];
    const { ref, defId } = makeURI(entry);
    seen.def = { ...seen.schema };
    if (defId)
      seen.defId = defId;
    const schema2 = seen.schema;
    for (const key in schema2) {
      delete schema2[key];
    }
    schema2.$ref = ref;
  };
  if (ctx.cycles === "throw") {
    for (const entry of ctx.seen.entries()) {
      const seen = entry[1];
      if (seen.cycle) {
        throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
      }
    }
  }
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (schema === entry[0]) {
      extractToDef(entry);
      continue;
    }
    if (ctx.external) {
      const ext = ctx.external.registry.get(entry[0])?.id;
      if (schema !== entry[0] && ext) {
        extractToDef(entry);
        continue;
      }
    }
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      extractToDef(entry);
      continue;
    }
    if (seen.cycle) {
      extractToDef(entry);
      continue;
    }
    if (seen.count > 1) {
      if (ctx.reused === "ref") {
        extractToDef(entry);
        continue;
      }
    }
  }
}
function finalize(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const flattenRef = (zodSchema) => {
    const seen = ctx.seen.get(zodSchema);
    if (seen.ref === null)
      return;
    const schema2 = seen.def ?? seen.schema;
    const _cached = { ...schema2 };
    const ref = seen.ref;
    seen.ref = null;
    if (ref) {
      flattenRef(ref);
      const refSeen = ctx.seen.get(ref);
      const refSchema = refSeen.schema;
      if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
        schema2.allOf = schema2.allOf ?? [];
        schema2.allOf.push(refSchema);
      } else {
        Object.assign(schema2, refSchema);
      }
      Object.assign(schema2, _cached);
      const isParentRef = zodSchema._zod.parent === ref;
      if (isParentRef) {
        for (const key in schema2) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (!(key in _cached)) {
            delete schema2[key];
          }
        }
      }
      if (refSchema.$ref && refSeen.def) {
        for (const key in schema2) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (key in refSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(refSeen.def[key])) {
            delete schema2[key];
          }
        }
      }
    }
    const parent = zodSchema._zod.parent;
    if (parent && parent !== ref) {
      flattenRef(parent);
      const parentSeen = ctx.seen.get(parent);
      if (parentSeen?.schema.$ref) {
        schema2.$ref = parentSeen.schema.$ref;
        if (parentSeen.def) {
          for (const key in schema2) {
            if (key === "$ref" || key === "allOf")
              continue;
            if (key in parentSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(parentSeen.def[key])) {
              delete schema2[key];
            }
          }
        }
      }
    }
    ctx.override({
      zodSchema,
      jsonSchema: schema2,
      path: seen.path ?? []
    });
  };
  for (const entry of [...ctx.seen.entries()].reverse()) {
    flattenRef(entry[0]);
  }
  const result = {};
  if (ctx.target === "draft-2020-12") {
    result.$schema = "https://json-schema.org/draft/2020-12/schema";
  } else if (ctx.target === "draft-07") {
    result.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (ctx.target === "draft-04") {
    result.$schema = "http://json-schema.org/draft-04/schema#";
  } else if (ctx.target === "openapi-3.0") {
  } else {
  }
  if (ctx.external?.uri) {
    const id = ctx.external.registry.get(schema)?.id;
    if (!id)
      throw new Error("Schema is missing an `id` property");
    result.$id = ctx.external.uri(id);
  }
  Object.assign(result, root.def ?? root.schema);
  const defs = ctx.external?.defs ?? {};
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (seen.def && seen.defId) {
      defs[seen.defId] = seen.def;
    }
  }
  if (ctx.external) {
  } else {
    if (Object.keys(defs).length > 0) {
      if (ctx.target === "draft-2020-12") {
        result.$defs = defs;
      } else {
        result.definitions = defs;
      }
    }
  }
  try {
    const finalized = JSON.parse(JSON.stringify(result));
    Object.defineProperty(finalized, "~standard", {
      value: {
        ...schema["~standard"],
        jsonSchema: {
          input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
          output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
        }
      },
      enumerable: false,
      writable: false
    });
    return finalized;
  } catch (_err) {
    throw new Error("Error converting schema to JSON.");
  }
}
function isTransforming(_schema, _ctx) {
  const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
  if (ctx.seen.has(_schema))
    return false;
  ctx.seen.add(_schema);
  const def = _schema._zod.def;
  if (def.type === "transform")
    return true;
  if (def.type === "array")
    return isTransforming(def.element, ctx);
  if (def.type === "set")
    return isTransforming(def.valueType, ctx);
  if (def.type === "lazy")
    return isTransforming(def.getter(), ctx);
  if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") {
    return isTransforming(def.innerType, ctx);
  }
  if (def.type === "intersection") {
    return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
  }
  if (def.type === "record" || def.type === "map") {
    return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
  }
  if (def.type === "pipe") {
    return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
  }
  if (def.type === "object") {
    for (const key in def.shape) {
      if (isTransforming(def.shape[key], ctx))
        return true;
    }
    return false;
  }
  if (def.type === "union") {
    for (const option of def.options) {
      if (isTransforming(option, ctx))
        return true;
    }
    return false;
  }
  if (def.type === "tuple") {
    for (const item of def.items) {
      if (isTransforming(item, ctx))
        return true;
    }
    if (def.rest && isTransforming(def.rest, ctx))
      return true;
    return false;
  }
  return false;
}
var createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
  const ctx = initializeContext({ ...params, processors });
  process2(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};
var createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
  const { libraryOptions, target } = params ?? {};
  const ctx = initializeContext({ ...libraryOptions ?? {}, target, io, processors });
  process2(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};

// ../node_modules/zod/v4/core/json-schema-processors.js
var formatMap = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
};
var stringProcessor = (schema, ctx, _json, _params) => {
  const json2 = _json;
  json2.type = "string";
  const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
  if (typeof minimum === "number")
    json2.minLength = minimum;
  if (typeof maximum === "number")
    json2.maxLength = maximum;
  if (format) {
    json2.format = formatMap[format] ?? format;
    if (json2.format === "")
      delete json2.format;
    if (format === "time") {
      delete json2.format;
    }
  }
  if (contentEncoding)
    json2.contentEncoding = contentEncoding;
  if (patterns && patterns.size > 0) {
    const regexes = [...patterns];
    if (regexes.length === 1)
      json2.pattern = regexes[0].source;
    else if (regexes.length > 1) {
      json2.allOf = [
        ...regexes.map((regex) => ({
          ...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
          pattern: regex.source
        }))
      ];
    }
  }
};
var numberProcessor = (schema, ctx, _json, _params) => {
  const json2 = _json;
  const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
  if (typeof format === "string" && format.includes("int"))
    json2.type = "integer";
  else
    json2.type = "number";
  if (typeof exclusiveMinimum === "number") {
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json2.minimum = exclusiveMinimum;
      json2.exclusiveMinimum = true;
    } else {
      json2.exclusiveMinimum = exclusiveMinimum;
    }
  }
  if (typeof minimum === "number") {
    json2.minimum = minimum;
    if (typeof exclusiveMinimum === "number" && ctx.target !== "draft-04") {
      if (exclusiveMinimum >= minimum)
        delete json2.minimum;
      else
        delete json2.exclusiveMinimum;
    }
  }
  if (typeof exclusiveMaximum === "number") {
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json2.maximum = exclusiveMaximum;
      json2.exclusiveMaximum = true;
    } else {
      json2.exclusiveMaximum = exclusiveMaximum;
    }
  }
  if (typeof maximum === "number") {
    json2.maximum = maximum;
    if (typeof exclusiveMaximum === "number" && ctx.target !== "draft-04") {
      if (exclusiveMaximum <= maximum)
        delete json2.maximum;
      else
        delete json2.exclusiveMaximum;
    }
  }
  if (typeof multipleOf === "number")
    json2.multipleOf = multipleOf;
};
var booleanProcessor = (_schema, _ctx, json2, _params) => {
  json2.type = "boolean";
};
var bigintProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("BigInt cannot be represented in JSON Schema");
  }
};
var symbolProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Symbols cannot be represented in JSON Schema");
  }
};
var nullProcessor = (_schema, ctx, json2, _params) => {
  if (ctx.target === "openapi-3.0") {
    json2.type = "string";
    json2.nullable = true;
    json2.enum = [null];
  } else {
    json2.type = "null";
  }
};
var undefinedProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Undefined cannot be represented in JSON Schema");
  }
};
var voidProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Void cannot be represented in JSON Schema");
  }
};
var neverProcessor = (_schema, _ctx, json2, _params) => {
  json2.not = {};
};
var anyProcessor = (_schema, _ctx, _json, _params) => {
};
var unknownProcessor = (_schema, _ctx, _json, _params) => {
};
var dateProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Date cannot be represented in JSON Schema");
  }
};
var enumProcessor = (schema, _ctx, json2, _params) => {
  const def = schema._zod.def;
  const values = getEnumValues(def.entries);
  if (values.every((v) => typeof v === "number"))
    json2.type = "number";
  if (values.every((v) => typeof v === "string"))
    json2.type = "string";
  json2.enum = values;
};
var literalProcessor = (schema, ctx, json2, _params) => {
  const def = schema._zod.def;
  const vals = [];
  for (const val of def.values) {
    if (val === void 0) {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
      } else {
      }
    } else if (typeof val === "bigint") {
      if (ctx.unrepresentable === "throw") {
        throw new Error("BigInt literals cannot be represented in JSON Schema");
      } else {
        vals.push(Number(val));
      }
    } else {
      vals.push(val);
    }
  }
  if (vals.length === 0) {
  } else if (vals.length === 1) {
    const val = vals[0];
    json2.type = val === null ? "null" : typeof val;
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json2.enum = [val];
    } else {
      json2.const = val;
    }
  } else {
    if (vals.every((v) => typeof v === "number"))
      json2.type = "number";
    if (vals.every((v) => typeof v === "string"))
      json2.type = "string";
    if (vals.every((v) => typeof v === "boolean"))
      json2.type = "boolean";
    if (vals.every((v) => v === null))
      json2.type = "null";
    json2.enum = vals;
  }
};
var nanProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("NaN cannot be represented in JSON Schema");
  }
};
var templateLiteralProcessor = (schema, _ctx, json2, _params) => {
  const _json = json2;
  const pattern = schema._zod.pattern;
  if (!pattern)
    throw new Error("Pattern not found in template literal");
  _json.type = "string";
  _json.pattern = pattern.source;
};
var fileProcessor = (schema, _ctx, json2, _params) => {
  const _json = json2;
  const file2 = {
    type: "string",
    format: "binary",
    contentEncoding: "binary"
  };
  const { minimum, maximum, mime } = schema._zod.bag;
  if (minimum !== void 0)
    file2.minLength = minimum;
  if (maximum !== void 0)
    file2.maxLength = maximum;
  if (mime) {
    if (mime.length === 1) {
      file2.contentMediaType = mime[0];
      Object.assign(_json, file2);
    } else {
      Object.assign(_json, file2);
      _json.anyOf = mime.map((m) => ({ contentMediaType: m }));
    }
  } else {
    Object.assign(_json, file2);
  }
};
var successProcessor = (_schema, _ctx, json2, _params) => {
  json2.type = "boolean";
};
var customProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Custom types cannot be represented in JSON Schema");
  }
};
var functionProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Function types cannot be represented in JSON Schema");
  }
};
var transformProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Transforms cannot be represented in JSON Schema");
  }
};
var mapProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Map cannot be represented in JSON Schema");
  }
};
var setProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Set cannot be represented in JSON Schema");
  }
};
var arrayProcessor = (schema, ctx, _json, params) => {
  const json2 = _json;
  const def = schema._zod.def;
  const { minimum, maximum } = schema._zod.bag;
  if (typeof minimum === "number")
    json2.minItems = minimum;
  if (typeof maximum === "number")
    json2.maxItems = maximum;
  json2.type = "array";
  json2.items = process2(def.element, ctx, { ...params, path: [...params.path, "items"] });
};
var objectProcessor = (schema, ctx, _json, params) => {
  const json2 = _json;
  const def = schema._zod.def;
  json2.type = "object";
  json2.properties = {};
  const shape = def.shape;
  for (const key in shape) {
    json2.properties[key] = process2(shape[key], ctx, {
      ...params,
      path: [...params.path, "properties", key]
    });
  }
  const allKeys = new Set(Object.keys(shape));
  const requiredKeys = new Set([...allKeys].filter((key) => {
    const v = def.shape[key]._zod;
    if (ctx.io === "input") {
      return v.optin === void 0;
    } else {
      return v.optout === void 0;
    }
  }));
  if (requiredKeys.size > 0) {
    json2.required = Array.from(requiredKeys);
  }
  if (def.catchall?._zod.def.type === "never") {
    json2.additionalProperties = false;
  } else if (!def.catchall) {
    if (ctx.io === "output")
      json2.additionalProperties = false;
  } else if (def.catchall) {
    json2.additionalProperties = process2(def.catchall, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
};
var unionProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  const isExclusive = def.inclusive === false;
  const options = def.options.map((x, i) => process2(x, ctx, {
    ...params,
    path: [...params.path, isExclusive ? "oneOf" : "anyOf", i]
  }));
  if (isExclusive) {
    json2.oneOf = options;
  } else {
    json2.anyOf = options;
  }
};
var intersectionProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  const a = process2(def.left, ctx, {
    ...params,
    path: [...params.path, "allOf", 0]
  });
  const b = process2(def.right, ctx, {
    ...params,
    path: [...params.path, "allOf", 1]
  });
  const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
  const allOf = [
    ...isSimpleIntersection(a) ? a.allOf : [a],
    ...isSimpleIntersection(b) ? b.allOf : [b]
  ];
  json2.allOf = allOf;
};
var tupleProcessor = (schema, ctx, _json, params) => {
  const json2 = _json;
  const def = schema._zod.def;
  json2.type = "array";
  const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
  const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
  const prefixItems = def.items.map((x, i) => process2(x, ctx, {
    ...params,
    path: [...params.path, prefixPath, i]
  }));
  const rest = def.rest ? process2(def.rest, ctx, {
    ...params,
    path: [...params.path, restPath, ...ctx.target === "openapi-3.0" ? [def.items.length] : []]
  }) : null;
  if (ctx.target === "draft-2020-12") {
    json2.prefixItems = prefixItems;
    if (rest) {
      json2.items = rest;
    }
  } else if (ctx.target === "openapi-3.0") {
    json2.items = {
      anyOf: prefixItems
    };
    if (rest) {
      json2.items.anyOf.push(rest);
    }
    json2.minItems = prefixItems.length;
    if (!rest) {
      json2.maxItems = prefixItems.length;
    }
  } else {
    json2.items = prefixItems;
    if (rest) {
      json2.additionalItems = rest;
    }
  }
  const { minimum, maximum } = schema._zod.bag;
  if (typeof minimum === "number")
    json2.minItems = minimum;
  if (typeof maximum === "number")
    json2.maxItems = maximum;
};
var recordProcessor = (schema, ctx, _json, params) => {
  const json2 = _json;
  const def = schema._zod.def;
  json2.type = "object";
  const keyType = def.keyType;
  const keyBag = keyType._zod.bag;
  const patterns = keyBag?.patterns;
  if (def.mode === "loose" && patterns && patterns.size > 0) {
    const valueSchema = process2(def.valueType, ctx, {
      ...params,
      path: [...params.path, "patternProperties", "*"]
    });
    json2.patternProperties = {};
    for (const pattern of patterns) {
      json2.patternProperties[pattern.source] = valueSchema;
    }
  } else {
    if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
      json2.propertyNames = process2(def.keyType, ctx, {
        ...params,
        path: [...params.path, "propertyNames"]
      });
    }
    json2.additionalProperties = process2(def.valueType, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
  const keyValues = keyType._zod.values;
  if (keyValues) {
    const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
    if (validKeyValues.length > 0) {
      json2.required = validKeyValues;
    }
  }
};
var nullableProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  const inner = process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  if (ctx.target === "openapi-3.0") {
    seen.ref = def.innerType;
    json2.nullable = true;
  } else {
    json2.anyOf = [inner, { type: "null" }];
  }
};
var nonoptionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var defaultProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  json2.default = JSON.parse(JSON.stringify(def.defaultValue));
};
var prefaultProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  if (ctx.io === "input")
    json2._prefault = JSON.parse(JSON.stringify(def.defaultValue));
};
var catchProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  let catchValue;
  try {
    catchValue = def.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  json2.default = catchValue;
};
var pipeProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  const innerType = ctx.io === "input" ? def.in._zod.def.type === "transform" ? def.out : def.in : def.out;
  process2(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var readonlyProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  json2.readOnly = true;
};
var promiseProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var optionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var lazyProcessor = (schema, ctx, _json, params) => {
  const innerType = schema._zod.innerType;
  process2(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var allProcessors = {
  string: stringProcessor,
  number: numberProcessor,
  boolean: booleanProcessor,
  bigint: bigintProcessor,
  symbol: symbolProcessor,
  null: nullProcessor,
  undefined: undefinedProcessor,
  void: voidProcessor,
  never: neverProcessor,
  any: anyProcessor,
  unknown: unknownProcessor,
  date: dateProcessor,
  enum: enumProcessor,
  literal: literalProcessor,
  nan: nanProcessor,
  template_literal: templateLiteralProcessor,
  file: fileProcessor,
  success: successProcessor,
  custom: customProcessor,
  function: functionProcessor,
  transform: transformProcessor,
  map: mapProcessor,
  set: setProcessor,
  array: arrayProcessor,
  object: objectProcessor,
  union: unionProcessor,
  intersection: intersectionProcessor,
  tuple: tupleProcessor,
  record: recordProcessor,
  nullable: nullableProcessor,
  nonoptional: nonoptionalProcessor,
  default: defaultProcessor,
  prefault: prefaultProcessor,
  catch: catchProcessor,
  pipe: pipeProcessor,
  readonly: readonlyProcessor,
  promise: promiseProcessor,
  optional: optionalProcessor,
  lazy: lazyProcessor
};
function toJSONSchema(input, params) {
  if ("_idmap" in input) {
    const registry2 = input;
    const ctx2 = initializeContext({ ...params, processors: allProcessors });
    const defs = {};
    for (const entry of registry2._idmap.entries()) {
      const [_, schema] = entry;
      process2(schema, ctx2);
    }
    const schemas = {};
    const external = {
      registry: registry2,
      uri: params?.uri,
      defs
    };
    ctx2.external = external;
    for (const entry of registry2._idmap.entries()) {
      const [key, schema] = entry;
      extractDefs(ctx2, schema);
      schemas[key] = finalize(ctx2, schema);
    }
    if (Object.keys(defs).length > 0) {
      const defsSegment = ctx2.target === "draft-2020-12" ? "$defs" : "definitions";
      schemas.__shared = {
        [defsSegment]: defs
      };
    }
    return { schemas };
  }
  const ctx = initializeContext({ ...params, processors: allProcessors });
  process2(input, ctx);
  extractDefs(ctx, input);
  return finalize(ctx, input);
}

// ../node_modules/zod/v4/core/json-schema-generator.js
var JSONSchemaGenerator = class {
  /** @deprecated Access via ctx instead */
  get metadataRegistry() {
    return this.ctx.metadataRegistry;
  }
  /** @deprecated Access via ctx instead */
  get target() {
    return this.ctx.target;
  }
  /** @deprecated Access via ctx instead */
  get unrepresentable() {
    return this.ctx.unrepresentable;
  }
  /** @deprecated Access via ctx instead */
  get override() {
    return this.ctx.override;
  }
  /** @deprecated Access via ctx instead */
  get io() {
    return this.ctx.io;
  }
  /** @deprecated Access via ctx instead */
  get counter() {
    return this.ctx.counter;
  }
  set counter(value) {
    this.ctx.counter = value;
  }
  /** @deprecated Access via ctx instead */
  get seen() {
    return this.ctx.seen;
  }
  constructor(params) {
    let normalizedTarget = params?.target ?? "draft-2020-12";
    if (normalizedTarget === "draft-4")
      normalizedTarget = "draft-04";
    if (normalizedTarget === "draft-7")
      normalizedTarget = "draft-07";
    this.ctx = initializeContext({
      processors: allProcessors,
      target: normalizedTarget,
      ...params?.metadata && { metadata: params.metadata },
      ...params?.unrepresentable && { unrepresentable: params.unrepresentable },
      ...params?.override && { override: params.override },
      ...params?.io && { io: params.io }
    });
  }
  /**
   * Process a schema to prepare it for JSON Schema generation.
   * This must be called before emit().
   */
  process(schema, _params = { path: [], schemaPath: [] }) {
    return process2(schema, this.ctx, _params);
  }
  /**
   * Emit the final JSON Schema after processing.
   * Must call process() first.
   */
  emit(schema, _params) {
    if (_params) {
      if (_params.cycles)
        this.ctx.cycles = _params.cycles;
      if (_params.reused)
        this.ctx.reused = _params.reused;
      if (_params.external)
        this.ctx.external = _params.external;
    }
    extractDefs(this.ctx, schema);
    const result = finalize(this.ctx, schema);
    const { "~standard": _, ...plainResult } = result;
    return plainResult;
  }
};

// ../node_modules/zod/v4/core/json-schema.js
var json_schema_exports = {};

// ../node_modules/zod/v4/classic/schemas.js
var schemas_exports2 = {};
__export(schemas_exports2, {
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBase64: () => ZodBase64,
  ZodBase64URL: () => ZodBase64URL,
  ZodBigInt: () => ZodBigInt,
  ZodBigIntFormat: () => ZodBigIntFormat,
  ZodBoolean: () => ZodBoolean,
  ZodCIDRv4: () => ZodCIDRv4,
  ZodCIDRv6: () => ZodCIDRv6,
  ZodCUID: () => ZodCUID,
  ZodCUID2: () => ZodCUID2,
  ZodCatch: () => ZodCatch,
  ZodCodec: () => ZodCodec,
  ZodCustom: () => ZodCustom,
  ZodCustomStringFormat: () => ZodCustomStringFormat,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodE164: () => ZodE164,
  ZodEmail: () => ZodEmail,
  ZodEmoji: () => ZodEmoji,
  ZodEnum: () => ZodEnum,
  ZodExactOptional: () => ZodExactOptional,
  ZodFile: () => ZodFile,
  ZodFunction: () => ZodFunction,
  ZodGUID: () => ZodGUID,
  ZodIPv4: () => ZodIPv4,
  ZodIPv6: () => ZodIPv6,
  ZodIntersection: () => ZodIntersection,
  ZodJWT: () => ZodJWT,
  ZodKSUID: () => ZodKSUID,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMAC: () => ZodMAC,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNanoID: () => ZodNanoID,
  ZodNever: () => ZodNever,
  ZodNonOptional: () => ZodNonOptional,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodNumberFormat: () => ZodNumberFormat,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodPipe: () => ZodPipe,
  ZodPrefault: () => ZodPrefault,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodStringFormat: () => ZodStringFormat,
  ZodSuccess: () => ZodSuccess,
  ZodSymbol: () => ZodSymbol,
  ZodTemplateLiteral: () => ZodTemplateLiteral,
  ZodTransform: () => ZodTransform,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodULID: () => ZodULID,
  ZodURL: () => ZodURL,
  ZodUUID: () => ZodUUID,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  ZodXID: () => ZodXID,
  ZodXor: () => ZodXor,
  _ZodString: () => _ZodString,
  _default: () => _default2,
  _function: () => _function,
  any: () => any,
  array: () => array,
  base64: () => base642,
  base64url: () => base64url2,
  bigint: () => bigint2,
  boolean: () => boolean2,
  catch: () => _catch2,
  check: () => check,
  cidrv4: () => cidrv42,
  cidrv6: () => cidrv62,
  codec: () => codec,
  cuid: () => cuid3,
  cuid2: () => cuid22,
  custom: () => custom,
  date: () => date3,
  describe: () => describe2,
  discriminatedUnion: () => discriminatedUnion,
  e164: () => e1642,
  email: () => email2,
  emoji: () => emoji2,
  enum: () => _enum2,
  exactOptional: () => exactOptional,
  file: () => file,
  float32: () => float32,
  float64: () => float64,
  function: () => _function,
  guid: () => guid2,
  hash: () => hash,
  hex: () => hex2,
  hostname: () => hostname2,
  httpUrl: () => httpUrl,
  instanceof: () => _instanceof,
  int: () => int,
  int32: () => int32,
  int64: () => int64,
  intersection: () => intersection,
  ipv4: () => ipv42,
  ipv6: () => ipv62,
  json: () => json,
  jwt: () => jwt,
  keyof: () => keyof,
  ksuid: () => ksuid2,
  lazy: () => lazy,
  literal: () => literal,
  looseObject: () => looseObject,
  looseRecord: () => looseRecord,
  mac: () => mac2,
  map: () => map,
  meta: () => meta2,
  nan: () => nan,
  nanoid: () => nanoid2,
  nativeEnum: () => nativeEnum,
  never: () => never,
  nonoptional: () => nonoptional,
  null: () => _null3,
  nullable: () => nullable,
  nullish: () => nullish2,
  number: () => number2,
  object: () => object,
  optional: () => optional,
  partialRecord: () => partialRecord,
  pipe: () => pipe,
  prefault: () => prefault,
  preprocess: () => preprocess,
  promise: () => promise,
  readonly: () => readonly,
  record: () => record,
  refine: () => refine,
  set: () => set,
  strictObject: () => strictObject,
  string: () => string2,
  stringFormat: () => stringFormat,
  stringbool: () => stringbool,
  success: () => success,
  superRefine: () => superRefine,
  symbol: () => symbol,
  templateLiteral: () => templateLiteral,
  transform: () => transform,
  tuple: () => tuple,
  uint32: () => uint32,
  uint64: () => uint64,
  ulid: () => ulid2,
  undefined: () => _undefined3,
  union: () => union,
  unknown: () => unknown,
  url: () => url,
  uuid: () => uuid2,
  uuidv4: () => uuidv4,
  uuidv6: () => uuidv6,
  uuidv7: () => uuidv7,
  void: () => _void2,
  xid: () => xid2,
  xor: () => xor
});

// ../node_modules/zod/v4/classic/checks.js
var checks_exports2 = {};
__export(checks_exports2, {
  endsWith: () => _endsWith,
  gt: () => _gt,
  gte: () => _gte,
  includes: () => _includes,
  length: () => _length,
  lowercase: () => _lowercase,
  lt: () => _lt,
  lte: () => _lte,
  maxLength: () => _maxLength,
  maxSize: () => _maxSize,
  mime: () => _mime,
  minLength: () => _minLength,
  minSize: () => _minSize,
  multipleOf: () => _multipleOf,
  negative: () => _negative,
  nonnegative: () => _nonnegative,
  nonpositive: () => _nonpositive,
  normalize: () => _normalize,
  overwrite: () => _overwrite,
  positive: () => _positive,
  property: () => _property,
  regex: () => _regex,
  size: () => _size,
  slugify: () => _slugify,
  startsWith: () => _startsWith,
  toLowerCase: () => _toLowerCase,
  toUpperCase: () => _toUpperCase,
  trim: () => _trim,
  uppercase: () => _uppercase
});

// ../node_modules/zod/v4/classic/iso.js
var iso_exports = {};
__export(iso_exports, {
  ZodISODate: () => ZodISODate,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODuration: () => ZodISODuration,
  ZodISOTime: () => ZodISOTime,
  date: () => date2,
  datetime: () => datetime2,
  duration: () => duration2,
  time: () => time2
});
var ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
  $ZodISODateTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function datetime2(params) {
  return _isoDateTime(ZodISODateTime, params);
}
var ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
  $ZodISODate.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function date2(params) {
  return _isoDate(ZodISODate, params);
}
var ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
  $ZodISOTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function time2(params) {
  return _isoTime(ZodISOTime, params);
}
var ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
  $ZodISODuration.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function duration2(params) {
  return _isoDuration(ZodISODuration, params);
}

// ../node_modules/zod/v4/classic/errors.js
var initializer2 = (inst, issues) => {
  $ZodError.init(inst, issues);
  inst.name = "ZodError";
  Object.defineProperties(inst, {
    format: {
      value: (mapper) => formatError(inst, mapper)
      // enumerable: false,
    },
    flatten: {
      value: (mapper) => flattenError(inst, mapper)
      // enumerable: false,
    },
    addIssue: {
      value: (issue2) => {
        inst.issues.push(issue2);
        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (issues2) => {
        inst.issues.push(...issues2);
        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
      }
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return inst.issues.length === 0;
      }
      // enumerable: false,
    }
  });
};
var ZodError = $constructor("ZodError", initializer2);
var ZodRealError = $constructor("ZodError", initializer2, {
  Parent: Error
});

// ../node_modules/zod/v4/classic/parse.js
var parse2 = /* @__PURE__ */ _parse(ZodRealError);
var parseAsync2 = /* @__PURE__ */ _parseAsync(ZodRealError);
var safeParse2 = /* @__PURE__ */ _safeParse(ZodRealError);
var safeParseAsync2 = /* @__PURE__ */ _safeParseAsync(ZodRealError);
var encode2 = /* @__PURE__ */ _encode(ZodRealError);
var decode2 = /* @__PURE__ */ _decode(ZodRealError);
var encodeAsync2 = /* @__PURE__ */ _encodeAsync(ZodRealError);
var decodeAsync2 = /* @__PURE__ */ _decodeAsync(ZodRealError);
var safeEncode2 = /* @__PURE__ */ _safeEncode(ZodRealError);
var safeDecode2 = /* @__PURE__ */ _safeDecode(ZodRealError);
var safeEncodeAsync2 = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
var safeDecodeAsync2 = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);

// ../node_modules/zod/v4/classic/schemas.js
var ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
  $ZodType.init(inst, def);
  Object.assign(inst["~standard"], {
    jsonSchema: {
      input: createStandardJSONSchemaMethod(inst, "input"),
      output: createStandardJSONSchemaMethod(inst, "output")
    }
  });
  inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
  inst.def = def;
  inst.type = def.type;
  Object.defineProperty(inst, "_def", { value: def });
  inst.check = (...checks) => {
    return inst.clone(util_exports.mergeDefs(def, {
      checks: [
        ...def.checks ?? [],
        ...checks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
      ]
    }), {
      parent: true
    });
  };
  inst.with = inst.check;
  inst.clone = (def2, params) => clone(inst, def2, params);
  inst.brand = () => inst;
  inst.register = ((reg, meta3) => {
    reg.add(inst, meta3);
    return inst;
  });
  inst.parse = (data, params) => parse2(inst, data, params, { callee: inst.parse });
  inst.safeParse = (data, params) => safeParse2(inst, data, params);
  inst.parseAsync = async (data, params) => parseAsync2(inst, data, params, { callee: inst.parseAsync });
  inst.safeParseAsync = async (data, params) => safeParseAsync2(inst, data, params);
  inst.spa = inst.safeParseAsync;
  inst.encode = (data, params) => encode2(inst, data, params);
  inst.decode = (data, params) => decode2(inst, data, params);
  inst.encodeAsync = async (data, params) => encodeAsync2(inst, data, params);
  inst.decodeAsync = async (data, params) => decodeAsync2(inst, data, params);
  inst.safeEncode = (data, params) => safeEncode2(inst, data, params);
  inst.safeDecode = (data, params) => safeDecode2(inst, data, params);
  inst.safeEncodeAsync = async (data, params) => safeEncodeAsync2(inst, data, params);
  inst.safeDecodeAsync = async (data, params) => safeDecodeAsync2(inst, data, params);
  inst.refine = (check2, params) => inst.check(refine(check2, params));
  inst.superRefine = (refinement) => inst.check(superRefine(refinement));
  inst.overwrite = (fn) => inst.check(_overwrite(fn));
  inst.optional = () => optional(inst);
  inst.exactOptional = () => exactOptional(inst);
  inst.nullable = () => nullable(inst);
  inst.nullish = () => optional(nullable(inst));
  inst.nonoptional = (params) => nonoptional(inst, params);
  inst.array = () => array(inst);
  inst.or = (arg) => union([inst, arg]);
  inst.and = (arg) => intersection(inst, arg);
  inst.transform = (tx) => pipe(inst, transform(tx));
  inst.default = (def2) => _default2(inst, def2);
  inst.prefault = (def2) => prefault(inst, def2);
  inst.catch = (params) => _catch2(inst, params);
  inst.pipe = (target) => pipe(inst, target);
  inst.readonly = () => readonly(inst);
  inst.describe = (description) => {
    const cl = inst.clone();
    globalRegistry.add(cl, { description });
    return cl;
  };
  Object.defineProperty(inst, "description", {
    get() {
      return globalRegistry.get(inst)?.description;
    },
    configurable: true
  });
  inst.meta = (...args) => {
    if (args.length === 0) {
      return globalRegistry.get(inst);
    }
    const cl = inst.clone();
    globalRegistry.add(cl, args[0]);
    return cl;
  };
  inst.isOptional = () => inst.safeParse(void 0).success;
  inst.isNullable = () => inst.safeParse(null).success;
  inst.apply = (fn) => fn(inst);
  return inst;
});
var _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => stringProcessor(inst, ctx, json2, params);
  const bag = inst._zod.bag;
  inst.format = bag.format ?? null;
  inst.minLength = bag.minimum ?? null;
  inst.maxLength = bag.maximum ?? null;
  inst.regex = (...args) => inst.check(_regex(...args));
  inst.includes = (...args) => inst.check(_includes(...args));
  inst.startsWith = (...args) => inst.check(_startsWith(...args));
  inst.endsWith = (...args) => inst.check(_endsWith(...args));
  inst.min = (...args) => inst.check(_minLength(...args));
  inst.max = (...args) => inst.check(_maxLength(...args));
  inst.length = (...args) => inst.check(_length(...args));
  inst.nonempty = (...args) => inst.check(_minLength(1, ...args));
  inst.lowercase = (params) => inst.check(_lowercase(params));
  inst.uppercase = (params) => inst.check(_uppercase(params));
  inst.trim = () => inst.check(_trim());
  inst.normalize = (...args) => inst.check(_normalize(...args));
  inst.toLowerCase = () => inst.check(_toLowerCase());
  inst.toUpperCase = () => inst.check(_toUpperCase());
  inst.slugify = () => inst.check(_slugify());
});
var ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  _ZodString.init(inst, def);
  inst.email = (params) => inst.check(_email(ZodEmail, params));
  inst.url = (params) => inst.check(_url(ZodURL, params));
  inst.jwt = (params) => inst.check(_jwt(ZodJWT, params));
  inst.emoji = (params) => inst.check(_emoji2(ZodEmoji, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.uuid = (params) => inst.check(_uuid(ZodUUID, params));
  inst.uuidv4 = (params) => inst.check(_uuidv4(ZodUUID, params));
  inst.uuidv6 = (params) => inst.check(_uuidv6(ZodUUID, params));
  inst.uuidv7 = (params) => inst.check(_uuidv7(ZodUUID, params));
  inst.nanoid = (params) => inst.check(_nanoid(ZodNanoID, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.cuid = (params) => inst.check(_cuid(ZodCUID, params));
  inst.cuid2 = (params) => inst.check(_cuid2(ZodCUID2, params));
  inst.ulid = (params) => inst.check(_ulid(ZodULID, params));
  inst.base64 = (params) => inst.check(_base64(ZodBase64, params));
  inst.base64url = (params) => inst.check(_base64url(ZodBase64URL, params));
  inst.xid = (params) => inst.check(_xid(ZodXID, params));
  inst.ksuid = (params) => inst.check(_ksuid(ZodKSUID, params));
  inst.ipv4 = (params) => inst.check(_ipv4(ZodIPv4, params));
  inst.ipv6 = (params) => inst.check(_ipv6(ZodIPv6, params));
  inst.cidrv4 = (params) => inst.check(_cidrv4(ZodCIDRv4, params));
  inst.cidrv6 = (params) => inst.check(_cidrv6(ZodCIDRv6, params));
  inst.e164 = (params) => inst.check(_e164(ZodE164, params));
  inst.datetime = (params) => inst.check(datetime2(params));
  inst.date = (params) => inst.check(date2(params));
  inst.time = (params) => inst.check(time2(params));
  inst.duration = (params) => inst.check(duration2(params));
});
function string2(params) {
  return _string(ZodString, params);
}
var ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  _ZodString.init(inst, def);
});
var ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
  $ZodEmail.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function email2(params) {
  return _email(ZodEmail, params);
}
var ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
  $ZodGUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function guid2(params) {
  return _guid(ZodGUID, params);
}
var ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
  $ZodUUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function uuid2(params) {
  return _uuid(ZodUUID, params);
}
function uuidv4(params) {
  return _uuidv4(ZodUUID, params);
}
function uuidv6(params) {
  return _uuidv6(ZodUUID, params);
}
function uuidv7(params) {
  return _uuidv7(ZodUUID, params);
}
var ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
  $ZodURL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function url(params) {
  return _url(ZodURL, params);
}
function httpUrl(params) {
  return _url(ZodURL, {
    protocol: /^https?$/,
    hostname: regexes_exports.domain,
    ...util_exports.normalizeParams(params)
  });
}
var ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
  $ZodEmoji.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function emoji2(params) {
  return _emoji2(ZodEmoji, params);
}
var ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
  $ZodNanoID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function nanoid2(params) {
  return _nanoid(ZodNanoID, params);
}
var ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
  $ZodCUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cuid3(params) {
  return _cuid(ZodCUID, params);
}
var ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
  $ZodCUID2.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cuid22(params) {
  return _cuid2(ZodCUID2, params);
}
var ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
  $ZodULID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ulid2(params) {
  return _ulid(ZodULID, params);
}
var ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
  $ZodXID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function xid2(params) {
  return _xid(ZodXID, params);
}
var ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
  $ZodKSUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ksuid2(params) {
  return _ksuid(ZodKSUID, params);
}
var ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
  $ZodIPv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ipv42(params) {
  return _ipv4(ZodIPv4, params);
}
var ZodMAC = /* @__PURE__ */ $constructor("ZodMAC", (inst, def) => {
  $ZodMAC.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function mac2(params) {
  return _mac(ZodMAC, params);
}
var ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
  $ZodIPv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ipv62(params) {
  return _ipv6(ZodIPv6, params);
}
var ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
  $ZodCIDRv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cidrv42(params) {
  return _cidrv4(ZodCIDRv4, params);
}
var ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
  $ZodCIDRv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cidrv62(params) {
  return _cidrv6(ZodCIDRv6, params);
}
var ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
  $ZodBase64.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function base642(params) {
  return _base64(ZodBase64, params);
}
var ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
  $ZodBase64URL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function base64url2(params) {
  return _base64url(ZodBase64URL, params);
}
var ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
  $ZodE164.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function e1642(params) {
  return _e164(ZodE164, params);
}
var ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
  $ZodJWT.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function jwt(params) {
  return _jwt(ZodJWT, params);
}
var ZodCustomStringFormat = /* @__PURE__ */ $constructor("ZodCustomStringFormat", (inst, def) => {
  $ZodCustomStringFormat.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function stringFormat(format, fnOrRegex, _params = {}) {
  return _stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
}
function hostname2(_params) {
  return _stringFormat(ZodCustomStringFormat, "hostname", regexes_exports.hostname, _params);
}
function hex2(_params) {
  return _stringFormat(ZodCustomStringFormat, "hex", regexes_exports.hex, _params);
}
function hash(alg, params) {
  const enc = params?.enc ?? "hex";
  const format = `${alg}_${enc}`;
  const regex = regexes_exports[format];
  if (!regex)
    throw new Error(`Unrecognized hash format: ${format}`);
  return _stringFormat(ZodCustomStringFormat, format, regex, params);
}
var ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
  $ZodNumber.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => numberProcessor(inst, ctx, json2, params);
  inst.gt = (value, params) => inst.check(_gt(value, params));
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.lt = (value, params) => inst.check(_lt(value, params));
  inst.lte = (value, params) => inst.check(_lte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  inst.int = (params) => inst.check(int(params));
  inst.safe = (params) => inst.check(int(params));
  inst.positive = (params) => inst.check(_gt(0, params));
  inst.nonnegative = (params) => inst.check(_gte(0, params));
  inst.negative = (params) => inst.check(_lt(0, params));
  inst.nonpositive = (params) => inst.check(_lte(0, params));
  inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
  inst.step = (value, params) => inst.check(_multipleOf(value, params));
  inst.finite = () => inst;
  const bag = inst._zod.bag;
  inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
  inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
  inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
  inst.isFinite = true;
  inst.format = bag.format ?? null;
});
function number2(params) {
  return _number(ZodNumber, params);
}
var ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
  $ZodNumberFormat.init(inst, def);
  ZodNumber.init(inst, def);
});
function int(params) {
  return _int(ZodNumberFormat, params);
}
function float32(params) {
  return _float32(ZodNumberFormat, params);
}
function float64(params) {
  return _float64(ZodNumberFormat, params);
}
function int32(params) {
  return _int32(ZodNumberFormat, params);
}
function uint32(params) {
  return _uint32(ZodNumberFormat, params);
}
var ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
  $ZodBoolean.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => booleanProcessor(inst, ctx, json2, params);
});
function boolean2(params) {
  return _boolean(ZodBoolean, params);
}
var ZodBigInt = /* @__PURE__ */ $constructor("ZodBigInt", (inst, def) => {
  $ZodBigInt.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => bigintProcessor(inst, ctx, json2, params);
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.gt = (value, params) => inst.check(_gt(value, params));
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.lt = (value, params) => inst.check(_lt(value, params));
  inst.lte = (value, params) => inst.check(_lte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  inst.positive = (params) => inst.check(_gt(BigInt(0), params));
  inst.negative = (params) => inst.check(_lt(BigInt(0), params));
  inst.nonpositive = (params) => inst.check(_lte(BigInt(0), params));
  inst.nonnegative = (params) => inst.check(_gte(BigInt(0), params));
  inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
  const bag = inst._zod.bag;
  inst.minValue = bag.minimum ?? null;
  inst.maxValue = bag.maximum ?? null;
  inst.format = bag.format ?? null;
});
function bigint2(params) {
  return _bigint(ZodBigInt, params);
}
var ZodBigIntFormat = /* @__PURE__ */ $constructor("ZodBigIntFormat", (inst, def) => {
  $ZodBigIntFormat.init(inst, def);
  ZodBigInt.init(inst, def);
});
function int64(params) {
  return _int64(ZodBigIntFormat, params);
}
function uint64(params) {
  return _uint64(ZodBigIntFormat, params);
}
var ZodSymbol = /* @__PURE__ */ $constructor("ZodSymbol", (inst, def) => {
  $ZodSymbol.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => symbolProcessor(inst, ctx, json2, params);
});
function symbol(params) {
  return _symbol(ZodSymbol, params);
}
var ZodUndefined = /* @__PURE__ */ $constructor("ZodUndefined", (inst, def) => {
  $ZodUndefined.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => undefinedProcessor(inst, ctx, json2, params);
});
function _undefined3(params) {
  return _undefined2(ZodUndefined, params);
}
var ZodNull = /* @__PURE__ */ $constructor("ZodNull", (inst, def) => {
  $ZodNull.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => nullProcessor(inst, ctx, json2, params);
});
function _null3(params) {
  return _null2(ZodNull, params);
}
var ZodAny = /* @__PURE__ */ $constructor("ZodAny", (inst, def) => {
  $ZodAny.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => anyProcessor(inst, ctx, json2, params);
});
function any() {
  return _any(ZodAny);
}
var ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
  $ZodUnknown.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => unknownProcessor(inst, ctx, json2, params);
});
function unknown() {
  return _unknown(ZodUnknown);
}
var ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
  $ZodNever.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => neverProcessor(inst, ctx, json2, params);
});
function never(params) {
  return _never(ZodNever, params);
}
var ZodVoid = /* @__PURE__ */ $constructor("ZodVoid", (inst, def) => {
  $ZodVoid.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => voidProcessor(inst, ctx, json2, params);
});
function _void2(params) {
  return _void(ZodVoid, params);
}
var ZodDate = /* @__PURE__ */ $constructor("ZodDate", (inst, def) => {
  $ZodDate.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => dateProcessor(inst, ctx, json2, params);
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  const c = inst._zod.bag;
  inst.minDate = c.minimum ? new Date(c.minimum) : null;
  inst.maxDate = c.maximum ? new Date(c.maximum) : null;
});
function date3(params) {
  return _date(ZodDate, params);
}
var ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
  $ZodArray.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => arrayProcessor(inst, ctx, json2, params);
  inst.element = def.element;
  inst.min = (minLength, params) => inst.check(_minLength(minLength, params));
  inst.nonempty = (params) => inst.check(_minLength(1, params));
  inst.max = (maxLength, params) => inst.check(_maxLength(maxLength, params));
  inst.length = (len, params) => inst.check(_length(len, params));
  inst.unwrap = () => inst.element;
});
function array(element, params) {
  return _array(ZodArray, element, params);
}
function keyof(schema) {
  const shape = schema._zod.def.shape;
  return _enum2(Object.keys(shape));
}
var ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
  $ZodObjectJIT.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => objectProcessor(inst, ctx, json2, params);
  util_exports.defineLazy(inst, "shape", () => {
    return def.shape;
  });
  inst.keyof = () => _enum2(Object.keys(inst._zod.def.shape));
  inst.catchall = (catchall) => inst.clone({ ...inst._zod.def, catchall });
  inst.passthrough = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
  inst.loose = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
  inst.strict = () => inst.clone({ ...inst._zod.def, catchall: never() });
  inst.strip = () => inst.clone({ ...inst._zod.def, catchall: void 0 });
  inst.extend = (incoming) => {
    return util_exports.extend(inst, incoming);
  };
  inst.safeExtend = (incoming) => {
    return util_exports.safeExtend(inst, incoming);
  };
  inst.merge = (other) => util_exports.merge(inst, other);
  inst.pick = (mask) => util_exports.pick(inst, mask);
  inst.omit = (mask) => util_exports.omit(inst, mask);
  inst.partial = (...args) => util_exports.partial(ZodOptional, inst, args[0]);
  inst.required = (...args) => util_exports.required(ZodNonOptional, inst, args[0]);
});
function object(shape, params) {
  const def = {
    type: "object",
    shape: shape ?? {},
    ...util_exports.normalizeParams(params)
  };
  return new ZodObject(def);
}
function strictObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: never(),
    ...util_exports.normalizeParams(params)
  });
}
function looseObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: unknown(),
    ...util_exports.normalizeParams(params)
  });
}
var ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
  $ZodUnion.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => unionProcessor(inst, ctx, json2, params);
  inst.options = def.options;
});
function union(options, params) {
  return new ZodUnion({
    type: "union",
    options,
    ...util_exports.normalizeParams(params)
  });
}
var ZodXor = /* @__PURE__ */ $constructor("ZodXor", (inst, def) => {
  ZodUnion.init(inst, def);
  $ZodXor.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => unionProcessor(inst, ctx, json2, params);
  inst.options = def.options;
});
function xor(options, params) {
  return new ZodXor({
    type: "union",
    options,
    inclusive: false,
    ...util_exports.normalizeParams(params)
  });
}
var ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def) => {
  ZodUnion.init(inst, def);
  $ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
  return new ZodDiscriminatedUnion({
    type: "union",
    options,
    discriminator,
    ...util_exports.normalizeParams(params)
  });
}
var ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
  $ZodIntersection.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => intersectionProcessor(inst, ctx, json2, params);
});
function intersection(left, right) {
  return new ZodIntersection({
    type: "intersection",
    left,
    right
  });
}
var ZodTuple = /* @__PURE__ */ $constructor("ZodTuple", (inst, def) => {
  $ZodTuple.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => tupleProcessor(inst, ctx, json2, params);
  inst.rest = (rest) => inst.clone({
    ...inst._zod.def,
    rest
  });
});
function tuple(items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new ZodTuple({
    type: "tuple",
    items,
    rest,
    ...util_exports.normalizeParams(params)
  });
}
var ZodRecord = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
  $ZodRecord.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => recordProcessor(inst, ctx, json2, params);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
function partialRecord(keyType, valueType, params) {
  const k = clone(keyType);
  k._zod.values = void 0;
  return new ZodRecord({
    type: "record",
    keyType: k,
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
function looseRecord(keyType, valueType, params) {
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    mode: "loose",
    ...util_exports.normalizeParams(params)
  });
}
var ZodMap = /* @__PURE__ */ $constructor("ZodMap", (inst, def) => {
  $ZodMap.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => mapProcessor(inst, ctx, json2, params);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
  inst.min = (...args) => inst.check(_minSize(...args));
  inst.nonempty = (params) => inst.check(_minSize(1, params));
  inst.max = (...args) => inst.check(_maxSize(...args));
  inst.size = (...args) => inst.check(_size(...args));
});
function map(keyType, valueType, params) {
  return new ZodMap({
    type: "map",
    keyType,
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
var ZodSet = /* @__PURE__ */ $constructor("ZodSet", (inst, def) => {
  $ZodSet.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => setProcessor(inst, ctx, json2, params);
  inst.min = (...args) => inst.check(_minSize(...args));
  inst.nonempty = (params) => inst.check(_minSize(1, params));
  inst.max = (...args) => inst.check(_maxSize(...args));
  inst.size = (...args) => inst.check(_size(...args));
});
function set(valueType, params) {
  return new ZodSet({
    type: "set",
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
var ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
  $ZodEnum.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => enumProcessor(inst, ctx, json2, params);
  inst.enum = def.entries;
  inst.options = Object.values(def.entries);
  const keys = new Set(Object.keys(def.entries));
  inst.extract = (values, params) => {
    const newEntries = {};
    for (const value of values) {
      if (keys.has(value)) {
        newEntries[value] = def.entries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...util_exports.normalizeParams(params),
      entries: newEntries
    });
  };
  inst.exclude = (values, params) => {
    const newEntries = { ...def.entries };
    for (const value of values) {
      if (keys.has(value)) {
        delete newEntries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...util_exports.normalizeParams(params),
      entries: newEntries
    });
  };
});
function _enum2(values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new ZodEnum({
    type: "enum",
    entries,
    ...util_exports.normalizeParams(params)
  });
}
function nativeEnum(entries, params) {
  return new ZodEnum({
    type: "enum",
    entries,
    ...util_exports.normalizeParams(params)
  });
}
var ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
  $ZodLiteral.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => literalProcessor(inst, ctx, json2, params);
  inst.values = new Set(def.values);
  Object.defineProperty(inst, "value", {
    get() {
      if (def.values.length > 1) {
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      }
      return def.values[0];
    }
  });
});
function literal(value, params) {
  return new ZodLiteral({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...util_exports.normalizeParams(params)
  });
}
var ZodFile = /* @__PURE__ */ $constructor("ZodFile", (inst, def) => {
  $ZodFile.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => fileProcessor(inst, ctx, json2, params);
  inst.min = (size, params) => inst.check(_minSize(size, params));
  inst.max = (size, params) => inst.check(_maxSize(size, params));
  inst.mime = (types, params) => inst.check(_mime(Array.isArray(types) ? types : [types], params));
});
function file(params) {
  return _file(ZodFile, params);
}
var ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
  $ZodTransform.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => transformProcessor(inst, ctx, json2, params);
  inst._zod.parse = (payload, _ctx) => {
    if (_ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(util_exports.issue(issue2, payload.value, def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = inst);
        payload.issues.push(util_exports.issue(_issue));
      }
    };
    const output = def.transform(payload.value, payload);
    if (output instanceof Promise) {
      return output.then((output2) => {
        payload.value = output2;
        return payload;
      });
    }
    payload.value = output;
    return payload;
  };
});
function transform(fn) {
  return new ZodTransform({
    type: "transform",
    transform: fn
  });
}
var ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => optionalProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
  return new ZodOptional({
    type: "optional",
    innerType
  });
}
var ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def) => {
  $ZodExactOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => optionalProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
  return new ZodExactOptional({
    type: "optional",
    innerType
  });
}
var ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
  $ZodNullable.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => nullableProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
  return new ZodNullable({
    type: "nullable",
    innerType
  });
}
function nullish2(innerType) {
  return optional(nullable(innerType));
}
var ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
  $ZodDefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => defaultProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeDefault = inst.unwrap;
});
function _default2(innerType, defaultValue) {
  return new ZodDefault({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
    }
  });
}
var ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
  $ZodPrefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => prefaultProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
  return new ZodPrefault({
    type: "prefault",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
    }
  });
}
var ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
  $ZodNonOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => nonoptionalProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
  return new ZodNonOptional({
    type: "nonoptional",
    innerType,
    ...util_exports.normalizeParams(params)
  });
}
var ZodSuccess = /* @__PURE__ */ $constructor("ZodSuccess", (inst, def) => {
  $ZodSuccess.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => successProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function success(innerType) {
  return new ZodSuccess({
    type: "success",
    innerType
  });
}
var ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
  $ZodCatch.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => catchProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeCatch = inst.unwrap;
});
function _catch2(innerType, catchValue) {
  return new ZodCatch({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
  });
}
var ZodNaN = /* @__PURE__ */ $constructor("ZodNaN", (inst, def) => {
  $ZodNaN.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => nanProcessor(inst, ctx, json2, params);
});
function nan(params) {
  return _nan(ZodNaN, params);
}
var ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
  $ZodPipe.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => pipeProcessor(inst, ctx, json2, params);
  inst.in = def.in;
  inst.out = def.out;
});
function pipe(in_, out) {
  return new ZodPipe({
    type: "pipe",
    in: in_,
    out
    // ...util.normalizeParams(params),
  });
}
var ZodCodec = /* @__PURE__ */ $constructor("ZodCodec", (inst, def) => {
  ZodPipe.init(inst, def);
  $ZodCodec.init(inst, def);
});
function codec(in_, out, params) {
  return new ZodCodec({
    type: "pipe",
    in: in_,
    out,
    transform: params.decode,
    reverseTransform: params.encode
  });
}
var ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
  $ZodReadonly.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => readonlyProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
  return new ZodReadonly({
    type: "readonly",
    innerType
  });
}
var ZodTemplateLiteral = /* @__PURE__ */ $constructor("ZodTemplateLiteral", (inst, def) => {
  $ZodTemplateLiteral.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => templateLiteralProcessor(inst, ctx, json2, params);
});
function templateLiteral(parts, params) {
  return new ZodTemplateLiteral({
    type: "template_literal",
    parts,
    ...util_exports.normalizeParams(params)
  });
}
var ZodLazy = /* @__PURE__ */ $constructor("ZodLazy", (inst, def) => {
  $ZodLazy.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => lazyProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
  return new ZodLazy({
    type: "lazy",
    getter
  });
}
var ZodPromise = /* @__PURE__ */ $constructor("ZodPromise", (inst, def) => {
  $ZodPromise.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => promiseProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function promise(innerType) {
  return new ZodPromise({
    type: "promise",
    innerType
  });
}
var ZodFunction = /* @__PURE__ */ $constructor("ZodFunction", (inst, def) => {
  $ZodFunction.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => functionProcessor(inst, ctx, json2, params);
});
function _function(params) {
  return new ZodFunction({
    type: "function",
    input: Array.isArray(params?.input) ? tuple(params?.input) : params?.input ?? array(unknown()),
    output: params?.output ?? unknown()
  });
}
var ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
  $ZodCustom.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => customProcessor(inst, ctx, json2, params);
});
function check(fn) {
  const ch = new $ZodCheck({
    check: "custom"
    // ...util.normalizeParams(params),
  });
  ch._zod.check = fn;
  return ch;
}
function custom(fn, _params) {
  return _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
  return _refine(ZodCustom, fn, _params);
}
function superRefine(fn) {
  return _superRefine(fn);
}
var describe2 = describe;
var meta2 = meta;
function _instanceof(cls, params = {}) {
  const inst = new ZodCustom({
    type: "custom",
    check: "custom",
    fn: (data) => data instanceof cls,
    abort: true,
    ...util_exports.normalizeParams(params)
  });
  inst._zod.bag.Class = cls;
  inst._zod.check = (payload) => {
    if (!(payload.value instanceof cls)) {
      payload.issues.push({
        code: "invalid_type",
        expected: cls.name,
        input: payload.value,
        inst,
        path: [...inst._zod.def.path ?? []]
      });
    }
  };
  return inst;
}
var stringbool = (...args) => _stringbool({
  Codec: ZodCodec,
  Boolean: ZodBoolean,
  String: ZodString
}, ...args);
function json(params) {
  const jsonSchema = lazy(() => {
    return union([string2(params), number2(), boolean2(), _null3(), array(jsonSchema), record(string2(), jsonSchema)]);
  });
  return jsonSchema;
}
function preprocess(fn, schema) {
  return pipe(transform(fn), schema);
}

// ../node_modules/zod/v4/classic/compat.js
var ZodIssueCode = {
  invalid_type: "invalid_type",
  too_big: "too_big",
  too_small: "too_small",
  invalid_format: "invalid_format",
  not_multiple_of: "not_multiple_of",
  unrecognized_keys: "unrecognized_keys",
  invalid_union: "invalid_union",
  invalid_key: "invalid_key",
  invalid_element: "invalid_element",
  invalid_value: "invalid_value",
  custom: "custom"
};
function setErrorMap(map2) {
  config({
    customError: map2
  });
}
function getErrorMap() {
  return config().customError;
}
var ZodFirstPartyTypeKind;
/* @__PURE__ */ (function(ZodFirstPartyTypeKind2) {
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));

// ../node_modules/zod/v4/classic/from-json-schema.js
var z = {
  ...schemas_exports2,
  ...checks_exports2,
  iso: iso_exports
};
var RECOGNIZED_KEYS = /* @__PURE__ */ new Set([
  // Schema identification
  "$schema",
  "$ref",
  "$defs",
  "definitions",
  // Core schema keywords
  "$id",
  "id",
  "$comment",
  "$anchor",
  "$vocabulary",
  "$dynamicRef",
  "$dynamicAnchor",
  // Type
  "type",
  "enum",
  "const",
  // Composition
  "anyOf",
  "oneOf",
  "allOf",
  "not",
  // Object
  "properties",
  "required",
  "additionalProperties",
  "patternProperties",
  "propertyNames",
  "minProperties",
  "maxProperties",
  // Array
  "items",
  "prefixItems",
  "additionalItems",
  "minItems",
  "maxItems",
  "uniqueItems",
  "contains",
  "minContains",
  "maxContains",
  // String
  "minLength",
  "maxLength",
  "pattern",
  "format",
  // Number
  "minimum",
  "maximum",
  "exclusiveMinimum",
  "exclusiveMaximum",
  "multipleOf",
  // Already handled metadata
  "description",
  "default",
  // Content
  "contentEncoding",
  "contentMediaType",
  "contentSchema",
  // Unsupported (error-throwing)
  "unevaluatedItems",
  "unevaluatedProperties",
  "if",
  "then",
  "else",
  "dependentSchemas",
  "dependentRequired",
  // OpenAPI
  "nullable",
  "readOnly"
]);
function detectVersion(schema, defaultTarget) {
  const $schema = schema.$schema;
  if ($schema === "https://json-schema.org/draft/2020-12/schema") {
    return "draft-2020-12";
  }
  if ($schema === "http://json-schema.org/draft-07/schema#") {
    return "draft-7";
  }
  if ($schema === "http://json-schema.org/draft-04/schema#") {
    return "draft-4";
  }
  return defaultTarget ?? "draft-2020-12";
}
function resolveRef(ref, ctx) {
  if (!ref.startsWith("#")) {
    throw new Error("External $ref is not supported, only local refs (#/...) are allowed");
  }
  const path2 = ref.slice(1).split("/").filter(Boolean);
  if (path2.length === 0) {
    return ctx.rootSchema;
  }
  const defsKey = ctx.version === "draft-2020-12" ? "$defs" : "definitions";
  if (path2[0] === defsKey) {
    const key = path2[1];
    if (!key || !ctx.defs[key]) {
      throw new Error(`Reference not found: ${ref}`);
    }
    return ctx.defs[key];
  }
  throw new Error(`Reference not found: ${ref}`);
}
function convertBaseSchema(schema, ctx) {
  if (schema.not !== void 0) {
    if (typeof schema.not === "object" && Object.keys(schema.not).length === 0) {
      return z.never();
    }
    throw new Error("not is not supported in Zod (except { not: {} } for never)");
  }
  if (schema.unevaluatedItems !== void 0) {
    throw new Error("unevaluatedItems is not supported");
  }
  if (schema.unevaluatedProperties !== void 0) {
    throw new Error("unevaluatedProperties is not supported");
  }
  if (schema.if !== void 0 || schema.then !== void 0 || schema.else !== void 0) {
    throw new Error("Conditional schemas (if/then/else) are not supported");
  }
  if (schema.dependentSchemas !== void 0 || schema.dependentRequired !== void 0) {
    throw new Error("dependentSchemas and dependentRequired are not supported");
  }
  if (schema.$ref) {
    const refPath = schema.$ref;
    if (ctx.refs.has(refPath)) {
      return ctx.refs.get(refPath);
    }
    if (ctx.processing.has(refPath)) {
      return z.lazy(() => {
        if (!ctx.refs.has(refPath)) {
          throw new Error(`Circular reference not resolved: ${refPath}`);
        }
        return ctx.refs.get(refPath);
      });
    }
    ctx.processing.add(refPath);
    const resolved = resolveRef(refPath, ctx);
    const zodSchema2 = convertSchema(resolved, ctx);
    ctx.refs.set(refPath, zodSchema2);
    ctx.processing.delete(refPath);
    return zodSchema2;
  }
  if (schema.enum !== void 0) {
    const enumValues = schema.enum;
    if (ctx.version === "openapi-3.0" && schema.nullable === true && enumValues.length === 1 && enumValues[0] === null) {
      return z.null();
    }
    if (enumValues.length === 0) {
      return z.never();
    }
    if (enumValues.length === 1) {
      return z.literal(enumValues[0]);
    }
    if (enumValues.every((v) => typeof v === "string")) {
      return z.enum(enumValues);
    }
    const literalSchemas = enumValues.map((v) => z.literal(v));
    if (literalSchemas.length < 2) {
      return literalSchemas[0];
    }
    return z.union([literalSchemas[0], literalSchemas[1], ...literalSchemas.slice(2)]);
  }
  if (schema.const !== void 0) {
    return z.literal(schema.const);
  }
  const type = schema.type;
  if (Array.isArray(type)) {
    const typeSchemas = type.map((t) => {
      const typeSchema = { ...schema, type: t };
      return convertBaseSchema(typeSchema, ctx);
    });
    if (typeSchemas.length === 0) {
      return z.never();
    }
    if (typeSchemas.length === 1) {
      return typeSchemas[0];
    }
    return z.union(typeSchemas);
  }
  if (!type) {
    return z.any();
  }
  let zodSchema;
  switch (type) {
    case "string": {
      let stringSchema = z.string();
      if (schema.format) {
        const format = schema.format;
        if (format === "email") {
          stringSchema = stringSchema.check(z.email());
        } else if (format === "uri" || format === "uri-reference") {
          stringSchema = stringSchema.check(z.url());
        } else if (format === "uuid" || format === "guid") {
          stringSchema = stringSchema.check(z.uuid());
        } else if (format === "date-time") {
          stringSchema = stringSchema.check(z.iso.datetime());
        } else if (format === "date") {
          stringSchema = stringSchema.check(z.iso.date());
        } else if (format === "time") {
          stringSchema = stringSchema.check(z.iso.time());
        } else if (format === "duration") {
          stringSchema = stringSchema.check(z.iso.duration());
        } else if (format === "ipv4") {
          stringSchema = stringSchema.check(z.ipv4());
        } else if (format === "ipv6") {
          stringSchema = stringSchema.check(z.ipv6());
        } else if (format === "mac") {
          stringSchema = stringSchema.check(z.mac());
        } else if (format === "cidr") {
          stringSchema = stringSchema.check(z.cidrv4());
        } else if (format === "cidr-v6") {
          stringSchema = stringSchema.check(z.cidrv6());
        } else if (format === "base64") {
          stringSchema = stringSchema.check(z.base64());
        } else if (format === "base64url") {
          stringSchema = stringSchema.check(z.base64url());
        } else if (format === "e164") {
          stringSchema = stringSchema.check(z.e164());
        } else if (format === "jwt") {
          stringSchema = stringSchema.check(z.jwt());
        } else if (format === "emoji") {
          stringSchema = stringSchema.check(z.emoji());
        } else if (format === "nanoid") {
          stringSchema = stringSchema.check(z.nanoid());
        } else if (format === "cuid") {
          stringSchema = stringSchema.check(z.cuid());
        } else if (format === "cuid2") {
          stringSchema = stringSchema.check(z.cuid2());
        } else if (format === "ulid") {
          stringSchema = stringSchema.check(z.ulid());
        } else if (format === "xid") {
          stringSchema = stringSchema.check(z.xid());
        } else if (format === "ksuid") {
          stringSchema = stringSchema.check(z.ksuid());
        }
      }
      if (typeof schema.minLength === "number") {
        stringSchema = stringSchema.min(schema.minLength);
      }
      if (typeof schema.maxLength === "number") {
        stringSchema = stringSchema.max(schema.maxLength);
      }
      if (schema.pattern) {
        stringSchema = stringSchema.regex(new RegExp(schema.pattern));
      }
      zodSchema = stringSchema;
      break;
    }
    case "number":
    case "integer": {
      let numberSchema = type === "integer" ? z.number().int() : z.number();
      if (typeof schema.minimum === "number") {
        numberSchema = numberSchema.min(schema.minimum);
      }
      if (typeof schema.maximum === "number") {
        numberSchema = numberSchema.max(schema.maximum);
      }
      if (typeof schema.exclusiveMinimum === "number") {
        numberSchema = numberSchema.gt(schema.exclusiveMinimum);
      } else if (schema.exclusiveMinimum === true && typeof schema.minimum === "number") {
        numberSchema = numberSchema.gt(schema.minimum);
      }
      if (typeof schema.exclusiveMaximum === "number") {
        numberSchema = numberSchema.lt(schema.exclusiveMaximum);
      } else if (schema.exclusiveMaximum === true && typeof schema.maximum === "number") {
        numberSchema = numberSchema.lt(schema.maximum);
      }
      if (typeof schema.multipleOf === "number") {
        numberSchema = numberSchema.multipleOf(schema.multipleOf);
      }
      zodSchema = numberSchema;
      break;
    }
    case "boolean": {
      zodSchema = z.boolean();
      break;
    }
    case "null": {
      zodSchema = z.null();
      break;
    }
    case "object": {
      const shape = {};
      const properties = schema.properties || {};
      const requiredSet = new Set(schema.required || []);
      for (const [key, propSchema] of Object.entries(properties)) {
        const propZodSchema = convertSchema(propSchema, ctx);
        shape[key] = requiredSet.has(key) ? propZodSchema : propZodSchema.optional();
      }
      if (schema.propertyNames) {
        const keySchema = convertSchema(schema.propertyNames, ctx);
        const valueSchema = schema.additionalProperties && typeof schema.additionalProperties === "object" ? convertSchema(schema.additionalProperties, ctx) : z.any();
        if (Object.keys(shape).length === 0) {
          zodSchema = z.record(keySchema, valueSchema);
          break;
        }
        const objectSchema2 = z.object(shape).passthrough();
        const recordSchema = z.looseRecord(keySchema, valueSchema);
        zodSchema = z.intersection(objectSchema2, recordSchema);
        break;
      }
      if (schema.patternProperties) {
        const patternProps = schema.patternProperties;
        const patternKeys = Object.keys(patternProps);
        const looseRecords = [];
        for (const pattern of patternKeys) {
          const patternValue = convertSchema(patternProps[pattern], ctx);
          const keySchema = z.string().regex(new RegExp(pattern));
          looseRecords.push(z.looseRecord(keySchema, patternValue));
        }
        const schemasToIntersect = [];
        if (Object.keys(shape).length > 0) {
          schemasToIntersect.push(z.object(shape).passthrough());
        }
        schemasToIntersect.push(...looseRecords);
        if (schemasToIntersect.length === 0) {
          zodSchema = z.object({}).passthrough();
        } else if (schemasToIntersect.length === 1) {
          zodSchema = schemasToIntersect[0];
        } else {
          let result = z.intersection(schemasToIntersect[0], schemasToIntersect[1]);
          for (let i = 2; i < schemasToIntersect.length; i++) {
            result = z.intersection(result, schemasToIntersect[i]);
          }
          zodSchema = result;
        }
        break;
      }
      const objectSchema = z.object(shape);
      if (schema.additionalProperties === false) {
        zodSchema = objectSchema.strict();
      } else if (typeof schema.additionalProperties === "object") {
        zodSchema = objectSchema.catchall(convertSchema(schema.additionalProperties, ctx));
      } else {
        zodSchema = objectSchema.passthrough();
      }
      break;
    }
    case "array": {
      const prefixItems = schema.prefixItems;
      const items = schema.items;
      if (prefixItems && Array.isArray(prefixItems)) {
        const tupleItems = prefixItems.map((item) => convertSchema(item, ctx));
        const rest = items && typeof items === "object" && !Array.isArray(items) ? convertSchema(items, ctx) : void 0;
        if (rest) {
          zodSchema = z.tuple(tupleItems).rest(rest);
        } else {
          zodSchema = z.tuple(tupleItems);
        }
        if (typeof schema.minItems === "number") {
          zodSchema = zodSchema.check(z.minLength(schema.minItems));
        }
        if (typeof schema.maxItems === "number") {
          zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
        }
      } else if (Array.isArray(items)) {
        const tupleItems = items.map((item) => convertSchema(item, ctx));
        const rest = schema.additionalItems && typeof schema.additionalItems === "object" ? convertSchema(schema.additionalItems, ctx) : void 0;
        if (rest) {
          zodSchema = z.tuple(tupleItems).rest(rest);
        } else {
          zodSchema = z.tuple(tupleItems);
        }
        if (typeof schema.minItems === "number") {
          zodSchema = zodSchema.check(z.minLength(schema.minItems));
        }
        if (typeof schema.maxItems === "number") {
          zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
        }
      } else if (items !== void 0) {
        const element = convertSchema(items, ctx);
        let arraySchema = z.array(element);
        if (typeof schema.minItems === "number") {
          arraySchema = arraySchema.min(schema.minItems);
        }
        if (typeof schema.maxItems === "number") {
          arraySchema = arraySchema.max(schema.maxItems);
        }
        zodSchema = arraySchema;
      } else {
        zodSchema = z.array(z.any());
      }
      break;
    }
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
  if (schema.description) {
    zodSchema = zodSchema.describe(schema.description);
  }
  if (schema.default !== void 0) {
    zodSchema = zodSchema.default(schema.default);
  }
  return zodSchema;
}
function convertSchema(schema, ctx) {
  if (typeof schema === "boolean") {
    return schema ? z.any() : z.never();
  }
  let baseSchema = convertBaseSchema(schema, ctx);
  const hasExplicitType = schema.type || schema.enum !== void 0 || schema.const !== void 0;
  if (schema.anyOf && Array.isArray(schema.anyOf)) {
    const options = schema.anyOf.map((s) => convertSchema(s, ctx));
    const anyOfUnion = z.union(options);
    baseSchema = hasExplicitType ? z.intersection(baseSchema, anyOfUnion) : anyOfUnion;
  }
  if (schema.oneOf && Array.isArray(schema.oneOf)) {
    const options = schema.oneOf.map((s) => convertSchema(s, ctx));
    const oneOfUnion = z.xor(options);
    baseSchema = hasExplicitType ? z.intersection(baseSchema, oneOfUnion) : oneOfUnion;
  }
  if (schema.allOf && Array.isArray(schema.allOf)) {
    if (schema.allOf.length === 0) {
      baseSchema = hasExplicitType ? baseSchema : z.any();
    } else {
      let result = hasExplicitType ? baseSchema : convertSchema(schema.allOf[0], ctx);
      const startIdx = hasExplicitType ? 0 : 1;
      for (let i = startIdx; i < schema.allOf.length; i++) {
        result = z.intersection(result, convertSchema(schema.allOf[i], ctx));
      }
      baseSchema = result;
    }
  }
  if (schema.nullable === true && ctx.version === "openapi-3.0") {
    baseSchema = z.nullable(baseSchema);
  }
  if (schema.readOnly === true) {
    baseSchema = z.readonly(baseSchema);
  }
  const extraMeta = {};
  const coreMetadataKeys = ["$id", "id", "$comment", "$anchor", "$vocabulary", "$dynamicRef", "$dynamicAnchor"];
  for (const key of coreMetadataKeys) {
    if (key in schema) {
      extraMeta[key] = schema[key];
    }
  }
  const contentMetadataKeys = ["contentEncoding", "contentMediaType", "contentSchema"];
  for (const key of contentMetadataKeys) {
    if (key in schema) {
      extraMeta[key] = schema[key];
    }
  }
  for (const key of Object.keys(schema)) {
    if (!RECOGNIZED_KEYS.has(key)) {
      extraMeta[key] = schema[key];
    }
  }
  if (Object.keys(extraMeta).length > 0) {
    ctx.registry.add(baseSchema, extraMeta);
  }
  return baseSchema;
}
function fromJSONSchema(schema, params) {
  if (typeof schema === "boolean") {
    return schema ? z.any() : z.never();
  }
  const version2 = detectVersion(schema, params?.defaultTarget);
  const defs = schema.$defs || schema.definitions || {};
  const ctx = {
    version: version2,
    defs,
    refs: /* @__PURE__ */ new Map(),
    processing: /* @__PURE__ */ new Set(),
    rootSchema: schema,
    registry: params?.registry ?? globalRegistry
  };
  return convertSchema(schema, ctx);
}

// ../node_modules/zod/v4/classic/coerce.js
var coerce_exports = {};
__export(coerce_exports, {
  bigint: () => bigint3,
  boolean: () => boolean3,
  date: () => date4,
  number: () => number3,
  string: () => string3
});
function string3(params) {
  return _coercedString(ZodString, params);
}
function number3(params) {
  return _coercedNumber(ZodNumber, params);
}
function boolean3(params) {
  return _coercedBoolean(ZodBoolean, params);
}
function bigint3(params) {
  return _coercedBigint(ZodBigInt, params);
}
function date4(params) {
  return _coercedDate(ZodDate, params);
}

// ../node_modules/zod/v4/classic/external.js
config(en_default());

// ../node_modules/zod/index.js
var zod_default = external_exports;

// src/helpers/ResponsHelpers.ts
var ok = (res, data, status = 200 /* OK */) => {
  res.status(status).json({ success: true, data, error: null });
};
var fail = (res, code, message, status) => {
  res.status(status).json({ success: false, data: null, error: { code, message } });
};

// src/middlewares/ErrorHandler.ts
var AppError = class extends Error {
  constructor(code, message, status) {
    super(message);
    this.code = code;
    this.message = message;
    this.status = status;
  }
};
var errorHandler = (err, req, res, _next) => {
  if (err instanceof ZodError) {
    return fail(res, "VALIDATION_ERROR" /* VALIDATION_ERROR */, err.issues[0].message, 422 /* UNPROCESSABLE_ENTITY */);
  }
  if (err instanceof AppError) {
    return fail(res, err.code, err.message, err.status);
  }
  return fail(res, "INTERNAL_ERROR" /* INTERNAL_ERROR */, "Something went wrong", 500 /* INTERNAL_SERVER_ERROR */);
};

// src/modules/Auth/AuthRoutes.ts
import { Router } from "express";

// src/modules/Auth/AuthSchemas.ts
var LoginDTOSchema = zod_default.object({
  email: zod_default.email().nonempty(),
  password: zod_default.string().min(6),
  rememberMe: zod_default.boolean(),
  token: zod_default.string().optional().nullable()
});
var LogoutDTOSchema = zod_default.object({
  token: zod_default.string().nonempty()
});
var RegisterDTOSchema = zod_default.object({
  email: zod_default.email().nonempty(),
  password: zod_default.string().nonempty()
});
var ActivateDTOSchema = zod_default.object({
  token: zod_default.string().nonempty()
});
var ResetPasswordDTOSchema = zod_default.object({
  email: zod_default.email().nonempty()
});
var ChangePasswordDTOSchema = zod_default.object({
  password: zod_default.string().min(6),
  token: zod_default.string().nonempty()
});
var ResendActivationDTOSchema = zod_default.object({
  email: zod_default.email().nonempty()
});

// src/modules/Auth/AuthService.ts
import bcrypt from "bcrypt";

// ../node_modules/dotenv/config.js
(function() {
  require_main().config(
    Object.assign(
      {},
      require_env_options(),
      require_cli_options()(process.argv)
    )
  );
})();

// src/lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config2 = {
  "previewFeatures": [],
  "clientVersion": "7.5.0",
  "engineVersion": "280c870be64f457428992c43c1f6d557fab6e29e",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum Lang {\n  PL @map("pl")\n}\n\nenum DateFormat {\n  DD_MM_YYYY @map("dd-mm-yyyy")\n  MM_DD_YYYY @map("mm-dd-yyyy")\n  YYYY_MM_DD @map("yyyy-mm-dd")\n}\n\nenum ReminderTaskStatus {\n  PENDING\n  SENT\n  CANCELLED\n  FAILED\n}\n\nmodel User {\n  id           Int        @id @default(autoincrement())\n  email        String     @unique @db.VarChar(255)\n  passwordHash String     @map("password_hash")\n  name         String     @db.VarChar(40)\n  secretBase32 String?    @map("secret_base32")\n  totpEnabled  Boolean    @default(false) @map("totp-enabled")\n  dateFormat   DateFormat @default(DD_MM_YYYY) @map("date_format")\n  lang         Lang       @default(PL)\n  habits       Habit[]\n  isVerified   Boolean    @default(false) @map("is_verified")\n  lastLogin    DateTime?  @map("last_login")\n  createdAt    DateTime   @default(now()) @map("created_at")\n  updatedAt    DateTime   @updatedAt @map("updated_at")\n\n  @@map("users")\n}\n\nmodel Habit {\n  id         Int        @id @default(autoincrement())\n  userId     Int        @map("user_id")\n  user       User       @relation(fields: [userId], references: [id])\n  name       String     @db.VarChar(255)\n  desc       String?\n  color      String?\n  icon       String?\n  frequency  String[]   @default([])\n  isArchived Boolean    @default(false) @map("is_archived")\n  reminder   Reminder?\n  trackings  Tracking[]\n  createdAt  DateTime   @default(now()) @map("created_at")\n  updatedAt  DateTime   @updatedAt @map("updated_at")\n\n  @@map("habits")\n}\n\nmodel Reminder {\n  id               Int            @id @default(autoincrement())\n  habitId          Int            @unique @map("habit_id")\n  habit            Habit          @relation(fields: [habitId], references: [id])\n  isReminderActive Boolean        @default(false) @map("is_reminder_active")\n  preferredTime    String         @default("12:00") @map("preferred_time")\n  frequency        String[]       @default([])\n  createdAt        DateTime       @default(now()) @map("created_at")\n  updatedAt        DateTime       @updatedAt @map("updated_at")\n  reminderTasks    ReminderTask[]\n\n  @@map("reminders")\n}\n\nmodel ReminderTask {\n  id           Int                @id @default(autoincrement())\n  reminderId   Int                @map("reminder_id")\n  reminder     Reminder           @relation(fields: [reminderId], references: [id])\n  jobId        String?            @unique @map("job_id")\n  scheduledFor DateTime           @map("scheduled_for")\n  status       ReminderTaskStatus @default(PENDING)\n  sentAt       DateTime?          @map("sent_at")\n  cancelledAt  DateTime?          @map("cancelled_at")\n  failReason   String?            @map("fail_reason")\n  createdAt    DateTime           @default(now()) @map("created_at")\n  updatedAt    DateTime           @updatedAt @map("updated_at")\n}\n\nmodel Tracking {\n  id         Int      @id @default(autoincrement())\n  habitId    Int      @map("habit_id")\n  habit      Habit    @relation(fields: [habitId], references: [id])\n  day        DateTime @db.Date\n  isFinished Boolean  @default(false) @map("is_finished")\n  createdAt  DateTime @default(now()) @map("created_at")\n  updatedAt  DateTime @updatedAt @map("updated_at")\n\n  @@unique([habitId, day])\n  @@map("trackings")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config2.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"email","kind":"scalar","type":"String"},{"name":"passwordHash","kind":"scalar","type":"String","dbName":"password_hash"},{"name":"name","kind":"scalar","type":"String"},{"name":"secretBase32","kind":"scalar","type":"String","dbName":"secret_base32"},{"name":"totpEnabled","kind":"scalar","type":"Boolean","dbName":"totp-enabled"},{"name":"dateFormat","kind":"enum","type":"DateFormat","dbName":"date_format"},{"name":"lang","kind":"enum","type":"Lang"},{"name":"habits","kind":"object","type":"Habit","relationName":"HabitToUser"},{"name":"isVerified","kind":"scalar","type":"Boolean","dbName":"is_verified"},{"name":"lastLogin","kind":"scalar","type":"DateTime","dbName":"last_login"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":"users"},"Habit":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"Int","dbName":"user_id"},{"name":"user","kind":"object","type":"User","relationName":"HabitToUser"},{"name":"name","kind":"scalar","type":"String"},{"name":"desc","kind":"scalar","type":"String"},{"name":"color","kind":"scalar","type":"String"},{"name":"icon","kind":"scalar","type":"String"},{"name":"frequency","kind":"scalar","type":"String"},{"name":"isArchived","kind":"scalar","type":"Boolean","dbName":"is_archived"},{"name":"reminder","kind":"object","type":"Reminder","relationName":"HabitToReminder"},{"name":"trackings","kind":"object","type":"Tracking","relationName":"HabitToTracking"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":"habits"},"Reminder":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"habitId","kind":"scalar","type":"Int","dbName":"habit_id"},{"name":"habit","kind":"object","type":"Habit","relationName":"HabitToReminder"},{"name":"isReminderActive","kind":"scalar","type":"Boolean","dbName":"is_reminder_active"},{"name":"preferredTime","kind":"scalar","type":"String","dbName":"preferred_time"},{"name":"frequency","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"reminderTasks","kind":"object","type":"ReminderTask","relationName":"ReminderToReminderTask"}],"dbName":"reminders"},"ReminderTask":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"reminderId","kind":"scalar","type":"Int","dbName":"reminder_id"},{"name":"reminder","kind":"object","type":"Reminder","relationName":"ReminderToReminderTask"},{"name":"jobId","kind":"scalar","type":"String","dbName":"job_id"},{"name":"scheduledFor","kind":"scalar","type":"DateTime","dbName":"scheduled_for"},{"name":"status","kind":"enum","type":"ReminderTaskStatus"},{"name":"sentAt","kind":"scalar","type":"DateTime","dbName":"sent_at"},{"name":"cancelledAt","kind":"scalar","type":"DateTime","dbName":"cancelled_at"},{"name":"failReason","kind":"scalar","type":"String","dbName":"fail_reason"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":null},"Tracking":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"habitId","kind":"scalar","type":"Int","dbName":"habit_id"},{"name":"habit","kind":"object","type":"Habit","relationName":"HabitToTracking"},{"name":"day","kind":"scalar","type":"DateTime"},{"name":"isFinished","kind":"scalar","type":"Boolean","dbName":"is_finished"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":"trackings"}},"enums":{},"types":{}}');
config2.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","habit","reminder","reminderTasks","_count","trackings","habits","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_avg","_sum","_min","_max","User.groupBy","User.aggregate","Habit.findUnique","Habit.findUniqueOrThrow","Habit.findFirst","Habit.findFirstOrThrow","Habit.findMany","Habit.createOne","Habit.createMany","Habit.createManyAndReturn","Habit.updateOne","Habit.updateMany","Habit.updateManyAndReturn","Habit.upsertOne","Habit.deleteOne","Habit.deleteMany","Habit.groupBy","Habit.aggregate","Reminder.findUnique","Reminder.findUniqueOrThrow","Reminder.findFirst","Reminder.findFirstOrThrow","Reminder.findMany","Reminder.createOne","Reminder.createMany","Reminder.createManyAndReturn","Reminder.updateOne","Reminder.updateMany","Reminder.updateManyAndReturn","Reminder.upsertOne","Reminder.deleteOne","Reminder.deleteMany","Reminder.groupBy","Reminder.aggregate","ReminderTask.findUnique","ReminderTask.findUniqueOrThrow","ReminderTask.findFirst","ReminderTask.findFirstOrThrow","ReminderTask.findMany","ReminderTask.createOne","ReminderTask.createMany","ReminderTask.createManyAndReturn","ReminderTask.updateOne","ReminderTask.updateMany","ReminderTask.updateManyAndReturn","ReminderTask.upsertOne","ReminderTask.deleteOne","ReminderTask.deleteMany","ReminderTask.groupBy","ReminderTask.aggregate","Tracking.findUnique","Tracking.findUniqueOrThrow","Tracking.findFirst","Tracking.findFirstOrThrow","Tracking.findMany","Tracking.createOne","Tracking.createMany","Tracking.createManyAndReturn","Tracking.updateOne","Tracking.updateMany","Tracking.updateManyAndReturn","Tracking.upsertOne","Tracking.deleteOne","Tracking.deleteMany","Tracking.groupBy","Tracking.aggregate","AND","OR","NOT","id","habitId","day","isFinished","createdAt","updatedAt","equals","not","in","notIn","lt","lte","gt","gte","reminderId","jobId","scheduledFor","ReminderTaskStatus","status","sentAt","cancelledAt","failReason","contains","startsWith","endsWith","isReminderActive","preferredTime","frequency","has","hasEvery","hasSome","every","some","none","userId","name","desc","color","icon","isArchived","email","passwordHash","secretBase32","totpEnabled","DateFormat","dateFormat","Lang","lang","isVerified","lastLogin","habitId_day","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","push","increment","decrement","multiply","divide"]'),
  graph: "ugI2UBAJAAC0AQAgYgAArgEAMGMAABUAEGQAAK4BADBlAgAAAAFpQACjAQAhakAAowEAIYgBAQCiAQAhjQEBAAAAAY4BAQCiAQAhjwEBALABACGQASAAoQEAIZIBAACxAZIBIpQBAACyAZQBIpUBIAChAQAhlgFAALMBACEBAAAAAQAgEAMAALsBACAFAAC8AQAgCAAAvQEAIGIAALoBADBjAAADABBkAAC6AQAwZQIArwEAIWlAAKMBACFqQACjAQAhgAEAAJ0BACCHAQIArwEAIYgBAQCiAQAhiQEBALABACGKAQEAsAEAIYsBAQCwAQAhjAEgAKEBACEGAwAAogIAIAUAAKECACAIAACjAgAgiQEAAMgBACCKAQAAyAEAIIsBAADIAQAgEAMAALsBACAFAAC8AQAgCAAAvQEAIGIAALoBADBjAAADABBkAAC6AQAwZQIAAAABaUAAowEAIWpAAKMBACGAAQAAnQEAIIcBAgCvAQAhiAEBAKIBACGJAQEAsAEAIYoBAQCwAQAhiwEBALABACGMASAAoQEAIQMAAAADACABAAAEADACAAAFACAMBAAApAEAIAYAAKUBACBiAACgAQAwYwAABwAQZAAAoAEAMGUCAK8BACFmAgCvAQAhaUAAowEAIWpAAKMBACF-IAChAQAhfwEAogEAIYABAACdAQAgAQAAAAcAIA4FAAC5AQAgYgAAtwEAMGMAAAkAEGQAALcBADBlAgCvAQAhaUAAowEAIWpAAKMBACFzAgCvAQAhdAEAsAEAIXVAAKMBACF3AAC4AXcieEAAswEAIXlAALMBACF6AQCwAQAhBQUAAKECACB0AADIAQAgeAAAyAEAIHkAAMgBACB6AADIAQAgDgUAALkBACBiAAC3AQAwYwAACQAQZAAAtwEAMGUCAAAAAWlAAKMBACFqQACjAQAhcwIArwEAIXQBAAAAAXVAAKMBACF3AAC4AXcieEAAswEAIXlAALMBACF6AQCwAQAhAwAAAAkAIAEAAAoAMAIAAAsAIAEAAAAJACAKBAAApAEAIGIAALYBADBjAAAOABBkAAC2AQAwZQIArwEAIWYCAK8BACFnQACjAQAhaCAAoQEAIWlAAKMBACFqQACjAQAhAQQAAOsBACALBAAApAEAIGIAALYBADBjAAAOABBkAAC2AQAwZQIAAAABZgIArwEAIWdAAKMBACFoIAChAQAhaUAAowEAIWpAAKMBACGXAQAAtQEAIAMAAAAOACABAAAPADACAAAQACABAAAADgAgAQAAAAMAIAEAAAABACAQCQAAtAEAIGIAAK4BADBjAAAVABBkAACuAQAwZQIArwEAIWlAAKMBACFqQACjAQAhiAEBAKIBACGNAQEAogEAIY4BAQCiAQAhjwEBALABACGQASAAoQEAIZIBAACxAZIBIpQBAACyAZQBIpUBIAChAQAhlgFAALMBACEDCQAAoAIAII8BAADIAQAglgEAAMgBACADAAAAFQAgAQAAFgAwAgAAAQAgAwAAABUAIAEAABYAMAIAAAEAIAMAAAAVACABAAAWADACAAABACANCQAAnwIAIGUCAAAAAWlAAAAAAWpAAAAAAYgBAQAAAAGNAQEAAAABjgEBAAAAAY8BAQAAAAGQASAAAAABkgEAAACSAQKUAQAAAJQBApUBIAAAAAGWAUAAAAABAQ8AABoAIAxlAgAAAAFpQAAAAAFqQAAAAAGIAQEAAAABjQEBAAAAAY4BAQAAAAGPAQEAAAABkAEgAAAAAZIBAAAAkgEClAEAAACUAQKVASAAAAABlgFAAAAAAQEPAAAcADABDwAAHAAwDQkAAJICACBlAgDFAQAhaUAAwwEAIWpAAMMBACGIAQEA2AEAIY0BAQDYAQAhjgEBANgBACGPAQEAzgEAIZABIADEAQAhkgEAAJACkgEilAEAAJEClAEilQEgAMQBACGWAUAA0AEAIQIAAAABACAPAAAfACAMZQIAxQEAIWlAAMMBACFqQADDAQAhiAEBANgBACGNAQEA2AEAIY4BAQDYAQAhjwEBAM4BACGQASAAxAEAIZIBAACQApIBIpQBAACRApQBIpUBIADEAQAhlgFAANABACECAAAAFQAgDwAAIQAgAgAAABUAIA8AACEAIAMAAAABACAWAAAaACAXAAAfACABAAAAAQAgAQAAABUAIAcHAACLAgAgHAAAjAIAIB0AAI8CACAeAACOAgAgHwAAjQIAII8BAADIAQAglgEAAMgBACAPYgAApwEAMGMAACgAEGQAAKcBADBlAgCGAQAhaUAAhwEAIWpAAIcBACGIAQEAnAEAIY0BAQCcAQAhjgEBAJwBACGPAQEAkQEAIZABIACIAQAhkgEAAKgBkgEilAEAAKkBlAEilQEgAIgBACGWAUAAkwEAIQMAAAAVACABAAAnADAbAAAoACADAAAAFQAgAQAAFgAwAgAAAQAgAQAAAAUAIAEAAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACANAwAAiAIAIAUAAIkCACAIAACKAgAgZQIAAAABaUAAAAABakAAAAABgAEAAIcCACCHAQIAAAABiAEBAAAAAYkBAQAAAAGKAQEAAAABiwEBAAAAAYwBIAAAAAEBDwAAMAAgCmUCAAAAAWlAAAAAAWpAAAAAAYABAACHAgAghwECAAAAAYgBAQAAAAGJAQEAAAABigEBAAAAAYsBAQAAAAGMASAAAAABAQ8AADIAMAEPAAAyADANAwAA8wEAIAUAAPQBACAIAAD1AQAgZQIAxQEAIWlAAMMBACFqQADDAQAhgAEAAPIBACCHAQIAxQEAIYgBAQDYAQAhiQEBAM4BACGKAQEAzgEAIYsBAQDOAQAhjAEgAMQBACECAAAABQAgDwAANQAgCmUCAMUBACFpQADDAQAhakAAwwEAIYABAADyAQAghwECAMUBACGIAQEA2AEAIYkBAQDOAQAhigEBAM4BACGLAQEAzgEAIYwBIADEAQAhAgAAAAMAIA8AADcAIAIAAAADACAPAAA3ACADAAAABQAgFgAAMAAgFwAANQAgAQAAAAUAIAEAAAADACAIBwAA7QEAIBwAAO4BACAdAADxAQAgHgAA8AEAIB8AAO8BACCJAQAAyAEAIIoBAADIAQAgiwEAAMgBACANYgAApgEAMGMAAD4AEGQAAKYBADBlAgCGAQAhaUAAhwEAIWpAAIcBACGAAQAAnQEAIIcBAgCGAQAhiAEBAJwBACGJAQEAkQEAIYoBAQCRAQAhiwEBAJEBACGMASAAiAEAIQMAAAADACABAAA9ADAbAAA-ACADAAAAAwAgAQAABAAwAgAABQAgDAQAAKQBACAGAAClAQAgYgAAoAEAMGMAAAcAEGQAAKABADBlAgAAAAFmAgAAAAFpQACjAQAhakAAowEAIX4gAKEBACF_AQCiAQAhgAEAAJ0BACABAAAAQQAgAQAAAEEAIAIEAADrAQAgBgAA7AEAIAMAAAAHACABAABEADACAABBACADAAAABwAgAQAARAAwAgAAQQAgAwAAAAcAIAEAAEQAMAIAAEEAIAkEAADpAQAgBgAA6gEAIGUCAAAAAWYCAAAAAWlAAAAAAWpAAAAAAX4gAAAAAX8BAAAAAYABAADoAQAgAQ8AAEgAIAdlAgAAAAFmAgAAAAFpQAAAAAFqQAAAAAF-IAAAAAF_AQAAAAGAAQAA6AEAIAEPAABKADABDwAASgAwCQQAANoBACAGAADbAQAgZQIAxQEAIWYCAMUBACFpQADDAQAhakAAwwEAIX4gAMQBACF_AQDYAQAhgAEAANkBACACAAAAQQAgDwAATQAgB2UCAMUBACFmAgDFAQAhaUAAwwEAIWpAAMMBACF-IADEAQAhfwEA2AEAIYABAADZAQAgAgAAAAcAIA8AAE8AIAIAAAAHACAPAABPACADAAAAQQAgFgAASAAgFwAATQAgAQAAAEEAIAEAAAAHACAFBwAA0wEAIBwAANQBACAdAADXAQAgHgAA1gEAIB8AANUBACAKYgAAmwEAMGMAAFYAEGQAAJsBADBlAgCGAQAhZgIAhgEAIWlAAIcBACFqQACHAQAhfiAAiAEAIX8BAJwBACGAAQAAnQEAIAMAAAAHACABAABVADAbAABWACADAAAABwAgAQAARAAwAgAAQQAgAQAAAAsAIAEAAAALACADAAAACQAgAQAACgAwAgAACwAgAwAAAAkAIAEAAAoAMAIAAAsAIAMAAAAJACABAAAKADACAAALACALBQAA0gEAIGUCAAAAAWlAAAAAAWpAAAAAAXMCAAAAAXQBAAAAAXVAAAAAAXcAAAB3AnhAAAAAAXlAAAAAAXoBAAAAAQEPAABeACAKZQIAAAABaUAAAAABakAAAAABcwIAAAABdAEAAAABdUAAAAABdwAAAHcCeEAAAAABeUAAAAABegEAAAABAQ8AAGAAMAEPAABgADALBQAA0QEAIGUCAMUBACFpQADDAQAhakAAwwEAIXMCAMUBACF0AQDOAQAhdUAAwwEAIXcAAM8BdyJ4QADQAQAheUAA0AEAIXoBAM4BACECAAAACwAgDwAAYwAgCmUCAMUBACFpQADDAQAhakAAwwEAIXMCAMUBACF0AQDOAQAhdUAAwwEAIXcAAM8BdyJ4QADQAQAheUAA0AEAIXoBAM4BACECAAAACQAgDwAAZQAgAgAAAAkAIA8AAGUAIAMAAAALACAWAABeACAXAABjACABAAAACwAgAQAAAAkAIAkHAADJAQAgHAAAygEAIB0AAM0BACAeAADMAQAgHwAAywEAIHQAAMgBACB4AADIAQAgeQAAyAEAIHoAAMgBACANYgAAkAEAMGMAAGwAEGQAAJABADBlAgCGAQAhaUAAhwEAIWpAAIcBACFzAgCGAQAhdAEAkQEAIXVAAIcBACF3AACSAXcieEAAkwEAIXlAAJMBACF6AQCRAQAhAwAAAAkAIAEAAGsAMBsAAGwAIAMAAAAJACABAAAKADACAAALACABAAAAEAAgAQAAABAAIAMAAAAOACABAAAPADACAAAQACADAAAADgAgAQAADwAwAgAAEAAgAwAAAA4AIAEAAA8AMAIAABAAIAcEAADHAQAgZQIAAAABZgIAAAABZ0AAAAABaCAAAAABaUAAAAABakAAAAABAQ8AAHQAIAZlAgAAAAFmAgAAAAFnQAAAAAFoIAAAAAFpQAAAAAFqQAAAAAEBDwAAdgAwAQ8AAHYAMAcEAADGAQAgZQIAxQEAIWYCAMUBACFnQADDAQAhaCAAxAEAIWlAAMMBACFqQADDAQAhAgAAABAAIA8AAHkAIAZlAgDFAQAhZgIAxQEAIWdAAMMBACFoIADEAQAhaUAAwwEAIWpAAMMBACECAAAADgAgDwAAewAgAgAAAA4AIA8AAHsAIAMAAAAQACAWAAB0ACAXAAB5ACABAAAAEAAgAQAAAA4AIAUHAAC-AQAgHAAAvwEAIB0AAMIBACAeAADBAQAgHwAAwAEAIAliAACFAQAwYwAAggEAEGQAAIUBADBlAgCGAQAhZgIAhgEAIWdAAIcBACFoIACIAQAhaUAAhwEAIWpAAIcBACEDAAAADgAgAQAAgQEAMBsAAIIBACADAAAADgAgAQAADwAwAgAAEAAgCWIAAIUBADBjAACCAQAQZAAAhQEAMGUCAIYBACFmAgCGAQAhZ0AAhwEAIWggAIgBACFpQACHAQAhakAAhwEAIQ0HAACKAQAgHAAAjwEAIB0AAIoBACAeAACKAQAgHwAAigEAIGsCAAAAAWwCAI4BACFtAgAAAARuAgAAAARvAgAAAAFwAgAAAAFxAgAAAAFyAgAAAAELBwAAigEAIB4AAI0BACAfAACNAQAga0AAAAABbEAAjAEAIW1AAAAABG5AAAAABG9AAAAAAXBAAAAAAXFAAAAAAXJAAAAAAQUHAACKAQAgHgAAiwEAIB8AAIsBACBrIAAAAAFsIACJAQAhBQcAAIoBACAeAACLAQAgHwAAiwEAIGsgAAAAAWwgAIkBACEIawIAAAABbAIAigEAIW0CAAAABG4CAAAABG8CAAAAAXACAAAAAXECAAAAAXICAAAAAQJrIAAAAAFsIACLAQAhCwcAAIoBACAeAACNAQAgHwAAjQEAIGtAAAAAAWxAAIwBACFtQAAAAARuQAAAAARvQAAAAAFwQAAAAAFxQAAAAAFyQAAAAAEIa0AAAAABbEAAjQEAIW1AAAAABG5AAAAABG9AAAAAAXBAAAAAAXFAAAAAAXJAAAAAAQ0HAACKAQAgHAAAjwEAIB0AAIoBACAeAACKAQAgHwAAigEAIGsCAAAAAWwCAI4BACFtAgAAAARuAgAAAARvAgAAAAFwAgAAAAFxAgAAAAFyAgAAAAEIawgAAAABbAgAjwEAIW0IAAAABG4IAAAABG8IAAAAAXAIAAAAAXEIAAAAAXIIAAAAAQ1iAACQAQAwYwAAbAAQZAAAkAEAMGUCAIYBACFpQACHAQAhakAAhwEAIXMCAIYBACF0AQCRAQAhdUAAhwEAIXcAAJIBdyJ4QACTAQAheUAAkwEAIXoBAJEBACEOBwAAlQEAIB4AAJoBACAfAACaAQAgawEAAAABbAEAmQEAIW0BAAAABW4BAAAABW8BAAAAAXABAAAAAXEBAAAAAXIBAAAAAXsBAAAAAXwBAAAAAX0BAAAAAQcHAACKAQAgHgAAmAEAIB8AAJgBACBrAAAAdwJsAACXAXcibQAAAHcIbgAAAHcICwcAAJUBACAeAACWAQAgHwAAlgEAIGtAAAAAAWxAAJQBACFtQAAAAAVuQAAAAAVvQAAAAAFwQAAAAAFxQAAAAAFyQAAAAAELBwAAlQEAIB4AAJYBACAfAACWAQAga0AAAAABbEAAlAEAIW1AAAAABW5AAAAABW9AAAAAAXBAAAAAAXFAAAAAAXJAAAAAAQhrAgAAAAFsAgCVAQAhbQIAAAAFbgIAAAAFbwIAAAABcAIAAAABcQIAAAABcgIAAAABCGtAAAAAAWxAAJYBACFtQAAAAAVuQAAAAAVvQAAAAAFwQAAAAAFxQAAAAAFyQAAAAAEHBwAAigEAIB4AAJgBACAfAACYAQAgawAAAHcCbAAAlwF3Im0AAAB3CG4AAAB3CARrAAAAdwJsAACYAXcibQAAAHcIbgAAAHcIDgcAAJUBACAeAACaAQAgHwAAmgEAIGsBAAAAAWwBAJkBACFtAQAAAAVuAQAAAAVvAQAAAAFwAQAAAAFxAQAAAAFyAQAAAAF7AQAAAAF8AQAAAAF9AQAAAAELawEAAAABbAEAmgEAIW0BAAAABW4BAAAABW8BAAAAAXABAAAAAXEBAAAAAXIBAAAAAXsBAAAAAXwBAAAAAX0BAAAAAQpiAACbAQAwYwAAVgAQZAAAmwEAMGUCAIYBACFmAgCGAQAhaUAAhwEAIWpAAIcBACF-IACIAQAhfwEAnAEAIYABAACdAQAgDgcAAIoBACAeAACfAQAgHwAAnwEAIGsBAAAAAWwBAJ4BACFtAQAAAARuAQAAAARvAQAAAAFwAQAAAAFxAQAAAAFyAQAAAAF7AQAAAAF8AQAAAAF9AQAAAAEEawEAAAAFgQEBAAAAAYIBAQAAAASDAQEAAAAEDgcAAIoBACAeAACfAQAgHwAAnwEAIGsBAAAAAWwBAJ4BACFtAQAAAARuAQAAAARvAQAAAAFwAQAAAAFxAQAAAAFyAQAAAAF7AQAAAAF8AQAAAAF9AQAAAAELawEAAAABbAEAnwEAIW0BAAAABG4BAAAABG8BAAAAAXABAAAAAXEBAAAAAXIBAAAAAXsBAAAAAXwBAAAAAX0BAAAAAQwEAACkAQAgBgAApQEAIGIAAKABADBjAAAHABBkAACgAQAwZQIArwEAIWYCAK8BACFpQACjAQAhakAAowEAIX4gAKEBACF_AQCiAQAhgAEAAJ0BACACayAAAAABbCAAiwEAIQtrAQAAAAFsAQCfAQAhbQEAAAAEbgEAAAAEbwEAAAABcAEAAAABcQEAAAABcgEAAAABewEAAAABfAEAAAABfQEAAAABCGtAAAAAAWxAAI0BACFtQAAAAARuQAAAAARvQAAAAAFwQAAAAAFxQAAAAAFyQAAAAAESAwAAuwEAIAUAALwBACAIAAC9AQAgYgAAugEAMGMAAAMAEGQAALoBADBlAgCvAQAhaUAAowEAIWpAAKMBACGAAQAAnQEAIIcBAgCvAQAhiAEBAKIBACGJAQEAsAEAIYoBAQCwAQAhiwEBALABACGMASAAoQEAIZgBAAADACCZAQAAAwAgA4QBAAAJACCFAQAACQAghgEAAAkAIA1iAACmAQAwYwAAPgAQZAAApgEAMGUCAIYBACFpQACHAQAhakAAhwEAIYABAACdAQAghwECAIYBACGIAQEAnAEAIYkBAQCRAQAhigEBAJEBACGLAQEAkQEAIYwBIACIAQAhD2IAAKcBADBjAAAoABBkAACnAQAwZQIAhgEAIWlAAIcBACFqQACHAQAhiAEBAJwBACGNAQEAnAEAIY4BAQCcAQAhjwEBAJEBACGQASAAiAEAIZIBAACoAZIBIpQBAACpAZQBIpUBIACIAQAhlgFAAJMBACEHBwAAigEAIB4AAK0BACAfAACtAQAgawAAAJIBAmwAAKwBkgEibQAAAJIBCG4AAACSAQgHBwAAigEAIB4AAKsBACAfAACrAQAgawAAAJQBAmwAAKoBlAEibQAAAJQBCG4AAACUAQgHBwAAigEAIB4AAKsBACAfAACrAQAgawAAAJQBAmwAAKoBlAEibQAAAJQBCG4AAACUAQgEawAAAJQBAmwAAKsBlAEibQAAAJQBCG4AAACUAQgHBwAAigEAIB4AAK0BACAfAACtAQAgawAAAJIBAmwAAKwBkgEibQAAAJIBCG4AAACSAQgEawAAAJIBAmwAAK0BkgEibQAAAJIBCG4AAACSAQgQCQAAtAEAIGIAAK4BADBjAAAVABBkAACuAQAwZQIArwEAIWlAAKMBACFqQACjAQAhiAEBAKIBACGNAQEAogEAIY4BAQCiAQAhjwEBALABACGQASAAoQEAIZIBAACxAZIBIpQBAACyAZQBIpUBIAChAQAhlgFAALMBACEIawIAAAABbAIAigEAIW0CAAAABG4CAAAABG8CAAAAAXACAAAAAXECAAAAAXICAAAAAQtrAQAAAAFsAQCaAQAhbQEAAAAFbgEAAAAFbwEAAAABcAEAAAABcQEAAAABcgEAAAABewEAAAABfAEAAAABfQEAAAABBGsAAACSAQJsAACtAZIBIm0AAACSAQhuAAAAkgEIBGsAAACUAQJsAACrAZQBIm0AAACUAQhuAAAAlAEICGtAAAAAAWxAAJYBACFtQAAAAAVuQAAAAAVvQAAAAAFwQAAAAAFxQAAAAAFyQAAAAAEDhAEAAAMAIIUBAAADACCGAQAAAwAgAmYCAAAAAWdAAAAAAQoEAACkAQAgYgAAtgEAMGMAAA4AEGQAALYBADBlAgCvAQAhZgIArwEAIWdAAKMBACFoIAChAQAhaUAAowEAIWpAAKMBACEOBQAAuQEAIGIAALcBADBjAAAJABBkAAC3AQAwZQIArwEAIWlAAKMBACFqQACjAQAhcwIArwEAIXQBALABACF1QACjAQAhdwAAuAF3InhAALMBACF5QACzAQAhegEAsAEAIQRrAAAAdwJsAACYAXcibQAAAHcIbgAAAHcIDgQAAKQBACAGAAClAQAgYgAAoAEAMGMAAAcAEGQAAKABADBlAgCvAQAhZgIArwEAIWlAAKMBACFqQACjAQAhfiAAoQEAIX8BAKIBACGAAQAAnQEAIJgBAAAHACCZAQAABwAgEAMAALsBACAFAAC8AQAgCAAAvQEAIGIAALoBADBjAAADABBkAAC6AQAwZQIArwEAIWlAAKMBACFqQACjAQAhgAEAAJ0BACCHAQIArwEAIYgBAQCiAQAhiQEBALABACGKAQEAsAEAIYsBAQCwAQAhjAEgAKEBACESCQAAtAEAIGIAAK4BADBjAAAVABBkAACuAQAwZQIArwEAIWlAAKMBACFqQACjAQAhiAEBAKIBACGNAQEAogEAIY4BAQCiAQAhjwEBALABACGQASAAoQEAIZIBAACxAZIBIpQBAACyAZQBIpUBIAChAQAhlgFAALMBACGYAQAAFQAgmQEAABUAIA4EAACkAQAgBgAApQEAIGIAAKABADBjAAAHABBkAACgAQAwZQIArwEAIWYCAK8BACFpQACjAQAhakAAowEAIX4gAKEBACF_AQCiAQAhgAEAAJ0BACCYAQAABwAgmQEAAAcAIAOEAQAADgAghQEAAA4AIIYBAAAOACAAAAAAAAGdAUAAAAABAZ0BIAAAAAEFnQECAAAAAaQBAgAAAAGlAQIAAAABpgECAAAAAacBAgAAAAEFFgAAtgIAIBcAALkCACCaAQAAtwIAIJsBAAC4AgAgoAEAAAUAIAMWAAC2AgAgmgEAALcCACCgAQAABQAgAAAAAAAAAZ0BAQAAAAEBnQEAAAB3AgGdAUAAAAABBRYAALECACAXAAC0AgAgmgEAALICACCbAQAAswIAIKABAABBACADFgAAsQIAIJoBAACyAgAgoAEAAEEAIAAAAAAAAZ0BAQAAAAECnQEBAAAABKMBAQAAAAUFFgAAqwIAIBcAAK8CACCaAQAArAIAIJsBAACuAgAgoAEAAAUAIAsWAADcAQAwFwAA4QEAMJoBAADdAQAwmwEAAN4BADCcAQAA3wEAIJ0BAADgAQAwngEAAOABADCfAQAA4AEAMKABAADgAQAwoQEAAOIBADCiAQAA4wEAMAllAgAAAAFpQAAAAAFqQAAAAAF0AQAAAAF1QAAAAAF3AAAAdwJ4QAAAAAF5QAAAAAF6AQAAAAECAAAACwAgFgAA5wEAIAMAAAALACAWAADnAQAgFwAA5gEAIAEPAACtAgAwDgUAALkBACBiAAC3AQAwYwAACQAQZAAAtwEAMGUCAAAAAWlAAKMBACFqQACjAQAhcwIArwEAIXQBAAAAAXVAAKMBACF3AAC4AXcieEAAswEAIXlAALMBACF6AQCwAQAhAgAAAAsAIA8AAOYBACACAAAA5AEAIA8AAOUBACANYgAA4wEAMGMAAOQBABBkAADjAQAwZQIArwEAIWlAAKMBACFqQACjAQAhcwIArwEAIXQBALABACF1QACjAQAhdwAAuAF3InhAALMBACF5QACzAQAhegEAsAEAIQ1iAADjAQAwYwAA5AEAEGQAAOMBADBlAgCvAQAhaUAAowEAIWpAAKMBACFzAgCvAQAhdAEAsAEAIXVAAKMBACF3AAC4AXcieEAAswEAIXlAALMBACF6AQCwAQAhCWUCAMUBACFpQADDAQAhakAAwwEAIXQBAM4BACF1QADDAQAhdwAAzwF3InhAANABACF5QADQAQAhegEAzgEAIQllAgDFAQAhaUAAwwEAIWpAAMMBACF0AQDOAQAhdUAAwwEAIXcAAM8BdyJ4QADQAQAheUAA0AEAIXoBAM4BACEJZQIAAAABaUAAAAABakAAAAABdAEAAAABdUAAAAABdwAAAHcCeEAAAAABeUAAAAABegEAAAABAZ0BAQAAAAQDFgAAqwIAIJoBAACsAgAgoAEAAAUAIAQWAADcAQAwmgEAAN0BADCcAQAA3wEAIKABAADgAQAwBgMAAKICACAFAAChAgAgCAAAowIAIIkBAADIAQAgigEAAMgBACCLAQAAyAEAIAAAAAAAAAKdAQEAAAAEowEBAAAABQUWAAClAgAgFwAAqQIAIJoBAACmAgAgmwEAAKgCACCgAQAAAQAgBxYAAIICACAXAACFAgAgmgEAAIMCACCbAQAAhAIAIJ4BAAAHACCfAQAABwAgoAEAAEEAIAsWAAD2AQAwFwAA-wEAMJoBAAD3AQAwmwEAAPgBADCcAQAA-QEAIJ0BAAD6AQAwngEAAPoBADCfAQAA-gEAMKABAAD6AQAwoQEAAPwBADCiAQAA_QEAMAVlAgAAAAFnQAAAAAFoIAAAAAFpQAAAAAFqQAAAAAECAAAAEAAgFgAAgQIAIAMAAAAQACAWAACBAgAgFwAAgAIAIAEPAACnAgAwCwQAAKQBACBiAAC2AQAwYwAADgAQZAAAtgEAMGUCAAAAAWYCAK8BACFnQACjAQAhaCAAoQEAIWlAAKMBACFqQACjAQAhlwEAALUBACACAAAAEAAgDwAAgAIAIAIAAAD-AQAgDwAA_wEAIAliAAD9AQAwYwAA_gEAEGQAAP0BADBlAgCvAQAhZgIArwEAIWdAAKMBACFoIAChAQAhaUAAowEAIWpAAKMBACEJYgAA_QEAMGMAAP4BABBkAAD9AQAwZQIArwEAIWYCAK8BACFnQACjAQAhaCAAoQEAIWlAAKMBACFqQACjAQAhBWUCAMUBACFnQADDAQAhaCAAxAEAIWlAAMMBACFqQADDAQAhBWUCAMUBACFnQADDAQAhaCAAxAEAIWlAAMMBACFqQADDAQAhBWUCAAAAAWdAAAAAAWggAAAAAWlAAAAAAWpAAAAAAQcGAADqAQAgZQIAAAABaUAAAAABakAAAAABfiAAAAABfwEAAAABgAEAAOgBACACAAAAQQAgFgAAggIAIAMAAAAHACAWAACCAgAgFwAAhgIAIAkAAAAHACAGAADbAQAgDwAAhgIAIGUCAMUBACFpQADDAQAhakAAwwEAIX4gAMQBACF_AQDYAQAhgAEAANkBACAHBgAA2wEAIGUCAMUBACFpQADDAQAhakAAwwEAIX4gAMQBACF_AQDYAQAhgAEAANkBACABnQEBAAAABAMWAAClAgAgmgEAAKYCACCgAQAAAQAgAxYAAIICACCaAQAAgwIAIKABAABBACAEFgAA9gEAMJoBAAD3AQAwnAEAAPkBACCgAQAA-gEAMAAAAAAAAZ0BAAAAkgECAZ0BAAAAlAECCxYAAJMCADAXAACYAgAwmgEAAJQCADCbAQAAlQIAMJwBAACWAgAgnQEAAJcCADCeAQAAlwIAMJ8BAACXAgAwoAEAAJcCADChAQAAmQIAMKIBAACaAgAwCwUAAIkCACAIAACKAgAgZQIAAAABaUAAAAABakAAAAABgAEAAIcCACCIAQEAAAABiQEBAAAAAYoBAQAAAAGLAQEAAAABjAEgAAAAAQIAAAAFACAWAACeAgAgAwAAAAUAIBYAAJ4CACAXAACdAgAgAQ8AAKQCADAQAwAAuwEAIAUAALwBACAIAAC9AQAgYgAAugEAMGMAAAMAEGQAALoBADBlAgAAAAFpQACjAQAhakAAowEAIYABAACdAQAghwECAK8BACGIAQEAogEAIYkBAQCwAQAhigEBALABACGLAQEAsAEAIYwBIAChAQAhAgAAAAUAIA8AAJ0CACACAAAAmwIAIA8AAJwCACANYgAAmgIAMGMAAJsCABBkAACaAgAwZQIArwEAIWlAAKMBACFqQACjAQAhgAEAAJ0BACCHAQIArwEAIYgBAQCiAQAhiQEBALABACGKAQEAsAEAIYsBAQCwAQAhjAEgAKEBACENYgAAmgIAMGMAAJsCABBkAACaAgAwZQIArwEAIWlAAKMBACFqQACjAQAhgAEAAJ0BACCHAQIArwEAIYgBAQCiAQAhiQEBALABACGKAQEAsAEAIYsBAQCwAQAhjAEgAKEBACEJZQIAxQEAIWlAAMMBACFqQADDAQAhgAEAAPIBACCIAQEA2AEAIYkBAQDOAQAhigEBAM4BACGLAQEAzgEAIYwBIADEAQAhCwUAAPQBACAIAAD1AQAgZQIAxQEAIWlAAMMBACFqQADDAQAhgAEAAPIBACCIAQEA2AEAIYkBAQDOAQAhigEBAM4BACGLAQEAzgEAIYwBIADEAQAhCwUAAIkCACAIAACKAgAgZQIAAAABaUAAAAABakAAAAABgAEAAIcCACCIAQEAAAABiQEBAAAAAYoBAQAAAAGLAQEAAAABjAEgAAAAAQQWAACTAgAwmgEAAJQCADCcAQAAlgIAIKABAACXAgAwAAIEAADrAQAgBgAA7AEAIAMJAACgAgAgjwEAAMgBACCWAQAAyAEAIAAJZQIAAAABaUAAAAABakAAAAABgAEAAIcCACCIAQEAAAABiQEBAAAAAYoBAQAAAAGLAQEAAAABjAEgAAAAAQxlAgAAAAFpQAAAAAFqQAAAAAGIAQEAAAABjQEBAAAAAY4BAQAAAAGPAQEAAAABkAEgAAAAAZIBAAAAkgEClAEAAACUAQKVASAAAAABlgFAAAAAAQIAAAABACAWAAClAgAgBWUCAAAAAWdAAAAAAWggAAAAAWlAAAAAAWpAAAAAAQMAAAAVACAWAAClAgAgFwAAqgIAIA4AAAAVACAPAACqAgAgZQIAxQEAIWlAAMMBACFqQADDAQAhiAEBANgBACGNAQEA2AEAIY4BAQDYAQAhjwEBAM4BACGQASAAxAEAIZIBAACQApIBIpQBAACRApQBIpUBIADEAQAhlgFAANABACEMZQIAxQEAIWlAAMMBACFqQADDAQAhiAEBANgBACGNAQEA2AEAIY4BAQDYAQAhjwEBAM4BACGQASAAxAEAIZIBAACQApIBIpQBAACRApQBIpUBIADEAQAhlgFAANABACEMAwAAiAIAIAgAAIoCACBlAgAAAAFpQAAAAAFqQAAAAAGAAQAAhwIAIIcBAgAAAAGIAQEAAAABiQEBAAAAAYoBAQAAAAGLAQEAAAABjAEgAAAAAQIAAAAFACAWAACrAgAgCWUCAAAAAWlAAAAAAWpAAAAAAXQBAAAAAXVAAAAAAXcAAAB3AnhAAAAAAXlAAAAAAXoBAAAAAQMAAAADACAWAACrAgAgFwAAsAIAIA4AAAADACADAADzAQAgCAAA9QEAIA8AALACACBlAgDFAQAhaUAAwwEAIWpAAMMBACGAAQAA8gEAIIcBAgDFAQAhiAEBANgBACGJAQEAzgEAIYoBAQDOAQAhiwEBAM4BACGMASAAxAEAIQwDAADzAQAgCAAA9QEAIGUCAMUBACFpQADDAQAhakAAwwEAIYABAADyAQAghwECAMUBACGIAQEA2AEAIYkBAQDOAQAhigEBAM4BACGLAQEAzgEAIYwBIADEAQAhCAQAAOkBACBlAgAAAAFmAgAAAAFpQAAAAAFqQAAAAAF-IAAAAAF_AQAAAAGAAQAA6AEAIAIAAABBACAWAACxAgAgAwAAAAcAIBYAALECACAXAAC1AgAgCgAAAAcAIAQAANoBACAPAAC1AgAgZQIAxQEAIWYCAMUBACFpQADDAQAhakAAwwEAIX4gAMQBACF_AQDYAQAhgAEAANkBACAIBAAA2gEAIGUCAMUBACFmAgDFAQAhaUAAwwEAIWpAAMMBACF-IADEAQAhfwEA2AEAIYABAADZAQAgDAMAAIgCACAFAACJAgAgZQIAAAABaUAAAAABakAAAAABgAEAAIcCACCHAQIAAAABiAEBAAAAAYkBAQAAAAGKAQEAAAABiwEBAAAAAYwBIAAAAAECAAAABQAgFgAAtgIAIAMAAAADACAWAAC2AgAgFwAAugIAIA4AAAADACADAADzAQAgBQAA9AEAIA8AALoCACBlAgDFAQAhaUAAwwEAIWpAAMMBACGAAQAA8gEAIIcBAgDFAQAhiAEBANgBACGJAQEAzgEAIYoBAQDOAQAhiwEBAM4BACGMASAAxAEAIQwDAADzAQAgBQAA9AEAIGUCAMUBACFpQADDAQAhakAAwwEAIYABAADyAQAghwECAMUBACGIAQEA2AEAIYkBAQDOAQAhigEBAM4BACGLAQEAzgEAIYwBIADEAQAhAgcACAkGAgQDAAEFCAMHAAcIEQYDBAACBgwEBwAFAQUAAwEGDQABBAACAQgSAAEJEwAAAAAFBwANHAAOHQAPHgAQHwARAAAAAAAFBwANHAAOHQAPHgAQHwARAQMAAQEDAAEFBwAWHAAXHQAYHgAZHwAaAAAAAAAFBwAWHAAXHQAYHgAZHwAaAQQAAgEEAAIFBwAfHAAgHQAhHgAiHwAjAAAAAAAFBwAfHAAgHQAhHgAiHwAjAQUAAwEFAAMFBwAoHAApHQAqHgArHwAsAAAAAAAFBwAoHAApHQAqHgArHwAsAQQAAgEEAAIFBwAxHAAyHQAzHgA0HwA1AAAAAAAFBwAxHAAyHQAzHgA0HwA1CgIBCxQBDBcBDRgBDhkBEBsBER0JEh4KEyABFCIJFSMLGCQBGSUBGiYJICkMISoSIisCIywCJC0CJS4CJi8CJzECKDMJKTQTKjYCKzgJLDkULToCLjsCLzwJMD8VMUAbMkIDM0MDNEUDNUYDNkcDN0kDOEsJOUwcOk4DO1AJPFEdPVIDPlMDP1QJQFceQVgkQlkEQ1oERFsERVwERl0ER18ESGEJSWIlSmQES2YJTGcmTWgETmkET2oJUG0nUW4tUm8GU3AGVHEGVXIGVnMGV3UGWHcJWXguWnoGW3wJXH0vXX4GXn8GX4ABCWCDATBhhAE2"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config2.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config2);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });
var prisma_default = prisma;

// src/repositories/User/UserRepository.ts
var getUserById = async (dto) => {
  return prisma_default.user.findUnique({ where: dto });
};
var getUserByEmail = async (dto) => {
  return prisma_default.user.findUnique({ where: dto });
};
var createUser = async (dto) => {
  return prisma_default.user.create({ data: dto });
};
var changeUserPassword = async (dto) => {
  return prisma_default.user.update({ where: { id: dto.id }, data: { passwordHash: dto.passwordHash } });
};
var changeUserTotp = async (dto) => {
  return prisma_default.user.update({ where: { id: dto.id }, data: { totpEnabled: dto.isEnabled } });
};
var changeUserTotpSecret = async (dto) => {
  return prisma_default.user.update({ where: { id: dto.id }, data: { secretBase32: dto.secret } });
};
var verifyUser = async (dto) => {
  return prisma_default.user.update({ where: { id: dto.id }, data: { isVerified: true } });
};

// src/lib/jwt.ts
import jwt2 from "jsonwebtoken";
var generateAuthToken = (dto) => {
  const payload = {
    jti: crypto.randomUUID(),
    userId: dto.userId,
    type: dto.type,
    duration: dto.duration,
    iat: Date.now()
  };
  const authToken = jwt2.sign(payload, env.JWT_SECRET, {
    expiresIn: dto.duration === "long" ? "30d" : "15m"
  });
  return authToken;
};
var verifyAuthToken = (token) => {
  try {
    return jwt2.verify(token, env.JWT_SECRET);
  } catch {
    throw new AppError("UNAUTHORIZED" /* UNAUTHORIZED */, "Invalid or expired token", 401 /* UNAUTHORIZED */);
  }
};

// src/modules/Auth/AuthService.ts
var loginService = async (dto) => {
  if (dto.token) {
    const isLogged = verifyAuthToken(dto.token);
    if (isLogged) throw new AppError("FORBIDDEN" /* FORBIDDEN */, "User is already logged", 403 /* FORBIDDEN */);
  }
  const user = await getUserByEmail({ email: dto.email });
  if (!user) throw new AppError("UNAUTHORIZED" /* UNAUTHORIZED */, "Invalid credentials", 401 /* UNAUTHORIZED */);
  const isPasswordMatch = await bcrypt.compare(dto.password, user.passwordHash);
  if (!isPasswordMatch) throw new AppError("UNAUTHORIZED" /* UNAUTHORIZED */, "Invalid credentials", 401 /* UNAUTHORIZED */);
  const token = generateAuthToken({ userId: user.id, duration: dto.rememberMe ? "long" : "short", type: "auth" });
  return { user, token };
};
var logoutService = async (dto) => {
  const authToken = verifyAuthToken(dto.token);
  const ttl = authToken.exp - Math.floor(Date.now() / 1e3);
  if (ttl > 0) {
    await redis_default.set(`habitpulse:blacklist:${authToken.jti}`, "1", { EX: ttl });
  }
};
var registerService = async (dto) => {
  const user = await getUserByEmail({ email: dto.email });
  if (user) throw new AppError("CONFLICT" /* CONFLICT */, "User already exists", 409 /* CONFLICT */);
  const passwordHash = await bcrypt.hash(dto.password, env.BCRYPT_ROUNDS);
  const newUser = await createUser({ email: dto.email, passwordHash, name: dto.email });
  const token = generateAuthToken({ userId: newUser.id, duration: "long", type: "activation" });
  getChannel().publish(
    "habitpulse.auth",
    "email",
    Buffer.from(JSON.stringify({ type: "activation", email: newUser.email, token })),
    { persistent: true }
  );
};
var activateService = async (dto) => {
  const authToken = verifyAuthToken(dto.token);
  if (authToken.type !== "activation")
    throw new AppError("UNAUTHORIZED" /* UNAUTHORIZED */, "Invalid credentials", 401 /* UNAUTHORIZED */);
  const user = await getUserById({ id: authToken.userId });
  if (!user) throw new AppError("NOT_FOUND" /* NOT_FOUND */, "User does not exist", 404 /* NOT_FOUND */);
  if (user.isVerified) throw new AppError("CONFLICT" /* CONFLICT */, "User is already verified", 409 /* CONFLICT */);
  await verifyUser({ id: authToken.userId });
};
var resendActivationService = async (dto) => {
  const user = await getUserByEmail({ email: dto.email });
  if (!user) throw new AppError("NOT_FOUND" /* NOT_FOUND */, "User does not exist", 404 /* NOT_FOUND */);
  if (user.isVerified) throw new AppError("CONFLICT" /* CONFLICT */, "User is already verified", 409 /* CONFLICT */);
  const token = generateAuthToken({ userId: user.id, duration: "long", type: "activation" });
  getChannel().publish(
    "habitpulse.auth",
    "email",
    Buffer.from(JSON.stringify({ type: "activation", email: user.email, token })),
    { persistent: true }
  );
};
var resetPasswordService = async (dto) => {
  const user = await getUserByEmail({ email: dto.email });
  if (!user) throw new AppError("UNAUTHORIZED" /* UNAUTHORIZED */, "Invalid credentials", 401 /* UNAUTHORIZED */);
  const token = generateAuthToken({ userId: user.id, duration: "short", type: "resetPassword" });
  getChannel().publish(
    "habitpulse.auth",
    "email",
    Buffer.from(JSON.stringify({ type: "resetPassword", email: user.email, token })),
    { persistent: true }
  );
};
var changePasswordService = async (dto) => {
  const authToken = verifyAuthToken(dto.token);
  if (authToken.type !== "resetPassword")
    throw new AppError("UNAUTHORIZED" /* UNAUTHORIZED */, "Invalid credentials", 401 /* UNAUTHORIZED */);
  const user = await getUserById({ id: authToken.userId });
  if (!user) throw new AppError("NOT_FOUND" /* NOT_FOUND */, "User does not exist", 404 /* NOT_FOUND */);
  const passwordHash = await bcrypt.hash(dto.password, env.BCRYPT_ROUNDS);
  await changeUserPassword({ id: authToken.userId, passwordHash });
};

// src/helpers/SendCookie.ts
var cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "strict"
};
var sendCookie = (res, key, value, isLong) => {
  res.cookie(key, value, {
    maxAge: isLong ? 30 * 24 * 60 * 60 * 1e3 : void 0,
    ...cookieOptions
  });
};
var removeCookie = (res, key) => {
  res.clearCookie(key, cookieOptions);
};

// src/const/CommonConst.ts
var AUTH_TOKEN_NAME = "authToken";

// src/modules/Auth/AuthController.ts
var loginController = async (req, res) => {
  const dto = LoginDTOSchema.parse(req.body);
  const authToken = req.cookies[AUTH_TOKEN_NAME];
  const data = await loginService({ ...dto, token: authToken });
  sendCookie(res, AUTH_TOKEN_NAME, data.token, dto.rememberMe);
  ok(res, data.user);
};
var logoutController = async (req, res) => {
  const authToken = req.cookies[AUTH_TOKEN_NAME];
  if (authToken) {
    await logoutService({ token: authToken });
    removeCookie(res, AUTH_TOKEN_NAME);
    ok(res, null);
  } else fail(res, "UNAUTHORIZED" /* UNAUTHORIZED */, "Token does not exist", 401 /* UNAUTHORIZED */);
};
var registerController = async (req, res) => {
  const dto = RegisterDTOSchema.parse(req.body);
  await registerService(dto);
  ok(res, null, 201 /* CREATED */);
};
var activeController = async (req, res) => {
  const dto = ActivateDTOSchema.parse(req.body);
  await activateService(dto);
  ok(res, null);
};
var resendActivationController = async (req, res) => {
  const dto = ResendActivationDTOSchema.parse(req.body);
  await resendActivationService(dto);
  ok(res, null);
};
var resetPasswordController = async (req, res) => {
  const dto = ResetPasswordDTOSchema.parse(req.body);
  await resetPasswordService(dto);
  ok(res, null);
};
var changePasswordController = async (req, res) => {
  const dto = ChangePasswordDTOSchema.parse(req.body);
  await changePasswordService(dto);
  ok(res, null);
};

// src/modules/Auth/AuthRoutes.ts
var authRouter = Router();
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);
authRouter.post("/register", registerController);
authRouter.post("/active", activeController);
authRouter.post("/resend-activation", resendActivationController);
authRouter.post("/reset-password", resetPasswordController);
authRouter.patch("/change-password", changePasswordController);

// src/middlewares/AuthMiddleware.ts
var authMiddleware = async (req, res, next) => {
  try {
    const authToken = req.cookies[AUTH_TOKEN_NAME];
    if (!authToken) throw new AppError("UNAUTHORIZED" /* UNAUTHORIZED */, "Unauthorized", 401 /* UNAUTHORIZED */);
    const authTokenPayload = verifyAuthToken(authToken);
    const isOnBlacklist = await redis_default.get(`habitpulse:blacklist:${authTokenPayload.jti}`);
    if (authTokenPayload?.type !== "auth" || isOnBlacklist) {
      removeCookie(res, AUTH_TOKEN_NAME);
      throw new AppError("UNAUTHORIZED" /* UNAUTHORIZED */, "Unauthorized", 401 /* UNAUTHORIZED */);
    }
    const oneMinuteInMs = 60 * 1e3;
    const elapsed = Date.now() - authTokenPayload.iat;
    if (authTokenPayload.duration === "short" && elapsed > oneMinuteInMs) {
      const newToken = generateAuthToken({ type: "auth", duration: "short", userId: authTokenPayload.userId });
      sendCookie(res, AUTH_TOKEN_NAME, newToken, false);
    }
    req.userId = authTokenPayload.userId;
    next();
  } catch (err) {
    next(err);
  }
};

// src/modules/Totp/TotpRoutes.ts
import { Router as Router2 } from "express";

// src/lib/totp.ts
import speakeasy from "speakeasy";
import QRCode from "qrcode";
var NAME = "HabitPulse";
var generate2FASecret = () => speakeasy.generateSecret({ name: NAME });
var verify2FACode = (dto) => speakeasy.totp.verify({ secret: dto.userSecret, encoding: "base32", token: dto.code, window: 1 });
var generate2FAQrcode = async (secret) => {
  if (!secret.otpauth_url) throw new Error("Missing otpauth_url");
  return QRCode.toDataURL(secret.otpauth_url);
};

// src/modules/Totp/TotpServices.ts
var enableService = async (dto) => {
  const user = await getUserById({ id: dto.userId });
  if (user?.totpEnabled) throw new AppError("FORBIDDEN" /* FORBIDDEN */, "TOTP already enabled", 403 /* FORBIDDEN */);
  const secret = generate2FASecret();
  const qrCode = await generate2FAQrcode(secret);
  await changeUserTotpSecret({ id: dto.userId, secret: secret.base32 });
  return qrCode;
};
var verifySetupService = async (dto) => {
  const user = await getUserById({ id: dto.userId });
  if (!user?.secretBase32) throw new AppError("FORBIDDEN" /* FORBIDDEN */, "First enable totp", 403 /* FORBIDDEN */);
  const isValid = verify2FACode({ userSecret: user.secretBase32, code: dto.code });
  if (!isValid) throw new AppError("UNAUTHORIZED" /* UNAUTHORIZED */, "Unauthorized", 401 /* UNAUTHORIZED */);
  await changeUserTotp({ id: user.id, isEnabled: true });
};

// src/modules/Totp/TotpSchemas.ts
var VerifySetupDTOSchema = zod_default.object({
  code: zod_default.string().nonempty()
});

// src/modules/Totp/TotpController.ts
var enableController = async (req, res) => {
  const userId = req.userId;
  const data = await enableService({ userId });
  ok(res, data);
};
var verifySetupController = async (req, res) => {
  const userId = req.userId;
  const dto = VerifySetupDTOSchema.parse(req.body);
  await verifySetupService({ userId, code: dto.code });
  ok(res, null);
};

// src/modules/Totp/TotpRoutes.ts
var totpRouter = Router2();
totpRouter.post("/enable", enableController);
totpRouter.post("/verify-setup", verifySetupController);

// src/app.ts
var app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.get("/", (req, res) => {
  res.send("<h1>Working2</h1>");
});
app.use("/auth", authRouter);
app.use("/api", authMiddleware);
app.use("/api/v1/totp", totpRouter);
app.get("/api/v1/test", (req, res) => {
  res.send("AuthWorking");
});
app.use(errorHandler);
var app_default = app;

// src/server.ts
var PORT = process.env.PORT || 3e3;
var startApp = async () => {
  await redis_default.connect();
  await connectRabbitMQ();
  app_default.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};
startApp();
/*! Bundled license information:

amqplib/lib/defs.js:
  (** @preserve This file is generated by the script
   * ../bin/generate-defs.js, which is not in general included in a
   * distribution, but is available in the source repository e.g. at
   * https://github.com/squaremo/amqp.node/
   *)
*/
