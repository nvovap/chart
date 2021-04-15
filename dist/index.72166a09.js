// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"12yWF":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 5500;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "c75227167347e57df55b258c72166a09";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"5XPnV":[function(require,module,exports) {
require('./styles.scss');
var _data = require('./data');
var _chart = require('./chart');
const toChart = _chart.chart(document.getElementById("chart"), _data.getChartData());
toChart.init();

},{"./styles.scss":"1ApLC","./data":"4AbXi","./chart":"1b3aX"}],"1ApLC":[function() {},{}],"4AbXi":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "getChartData", function () {
  return getChartData;
});
function getChartData() {
  return [{
    columns: [['x', 1542412800000, 1542499200000, 1542585600000, 1542672000000, 1542758400000, 1542844800000, 1542931200000, 1543017600000, 1543104000000, 1543190400000, 1543276800000, 1543363200000, 1543449600000, 1543536000000, 1543622400000, 1543708800000, 1543795200000, 1543881600000, 1543968000000, 1544054400000, 1544140800000, 1544227200000, 1544313600000, 1544400000000, 1544486400000, 1544572800000, 1544659200000, 1544745600000, 1544832000000, 1544918400000, 1545004800000, 1545091200000, 1545177600000, 1545264000000, 1545350400000, 1545436800000, 1545523200000, 1545609600000, 1545696000000, 1545782400000, 1545868800000, 1545955200000, 1546041600000, 1546128000000, 1546214400000, 1546300800000, 1546387200000, 1546473600000, 1546560000000, 1546646400000, 1546732800000, 1546819200000, 1546905600000, 1546992000000, 1547078400000, 1547164800000, 1547251200000, 1547337600000, 1547424000000, 1547510400000, 1547596800000, 1547683200000, 1547769600000, 1547856000000, 1547942400000, 1548028800000, 1548115200000, 1548201600000, 1548288000000, 1548374400000, 1548460800000, 1548547200000, 1548633600000, 1548720000000, 1548806400000, 1548892800000, 1548979200000, 1549065600000, 1549152000000, 1549238400000, 1549324800000, 1549411200000, 1549497600000, 1549584000000, 1549670400000, 1549756800000, 1549843200000, 1549929600000, 1550016000000, 1550102400000, 1550188800000, 1550275200000, 1550361600000, 1550448000000, 1550534400000, 1550620800000, 1550707200000, 1550793600000, 1550880000000, 1550966400000, 1551052800000, 1551139200000, 1551225600000, 1551312000000, 1551398400000, 1551484800000, 1551571200000, 1551657600000, 1551744000000, 1551830400000, 1551916800000, 1552003200000], ['y0', 37, 20, 32, 39, 32, 35, 19, 65, 36, 62, 113, 69, 120, 60, 51, 49, 71, 122, 149, 69, 57, 21, 33, 55, 92, 62, 47, 50, 56, 116, 63, 60, 55, 65, 76, 33, 45, 64, 54, 81, 180, 123, 106, 37, 60, 70, 46, 68, 46, 51, 33, 57, 75, 70, 95, 70, 50, 68, 63, 66, 53, 38, 52, 109, 121, 53, 36, 71, 96, 55, 58, 29, 31, 55, 52, 44, 126, 191, 73, 87, 255, 278, 219, 170, 129, 125, 126, 84, 65, 53, 154, 57, 71, 64, 75, 72, 39, 47, 52, 73, 89, 156, 86, 105, 88, 45, 33, 56, 142, 124, 114, 64], ['y1', 22, 12, 30, 40, 33, 23, 18, 41, 45, 69, 57, 61, 70, 47, 31, 34, 40, 55, 27, 57, 48, 32, 40, 49, 54, 49, 34, 51, 51, 51, 66, 51, 94, 60, 64, 28, 44, 96, 49, 73, 30, 88, 63, 42, 56, 67, 52, 67, 35, 61, 40, 55, 63, 61, 105, 59, 51, 76, 63, 57, 47, 56, 51, 98, 103, 62, 54, 104, 48, 41, 41, 37, 30, 28, 26, 37, 65, 86, 70, 81, 54, 74, 70, 50, 74, 79, 85, 62, 36, 46, 68, 43, 66, 50, 28, 66, 39, 23, 63, 74, 83, 66, 40, 60, 29, 36, 27, 54, 89, 50, 73, 52]],
    types: {
      y0: 'line',
      y1: 'line',
      x: 'x'
    },
    names: {
      y0: '#0',
      y1: '#1'
    },
    colors: {
      y0: '#3DC23F',
      y1: '#F34C44'
    }
  }][0];
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"1b3aX":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "chart", function () {
  return chart;
});
var _utils = require('./utils');
var _tooltip = require('./tooltip');
var _slider = require('./slider');
const PADDING = 40;
const WIDTH = 600;
const HEIGHT = 200;
const DPI_WIDTH = WIDTH * 2;
const DPI_HEIGHT = HEIGHT * 2;
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2;
const VIEW_WIDTH = DPI_WIDTH;
const ROWS_COUNT = 5;
function chart(root, data) {
  let raf;
  const canvas = root.querySelector('[data-el="main"]');
  const tip = _tooltip.tooltip(root.querySelector('[data-el="tooltip"]'));
  const ctx = canvas.getContext("2d");
  canvas.style.width = WIDTH + 'px';
  canvas.style.height = HEIGHT + 'px';
  _utils.css(canvas, {
    width: WIDTH + 'px',
    height: HEIGHT + 'px'
  });
  canvas.width = DPI_WIDTH;
  canvas.height = DPI_HEIGHT;
  canvas.addEventListener("mousemove", mousemove);
  canvas.addEventListener("mouseleave", mouseleave);
  function mouseleave() {
    proxy.mouse = null;
    tip.hide();
  }
  function mousemove({clientX, clientY}) {
    const {left, top} = canvas.getBoundingClientRect();
    proxy.mouse = {
      x: (clientX - left) * 2,
      tooltip: {
        left: clientX - left,
        top: clientY - top
      }
    };
  }
  const slider = _slider.sliderChart(root.querySelector('[data-el="slider"]'), data, DPI_WIDTH);
  const proxy = new Proxy({}, {
    set(...args) {
      const result = Reflect.set(...args);
      raf = requestAnimationFrame(paint);
      return result;
    }
  });
  function clear() {
    ctx.clearRect(0, 0, DPI_WIDTH, DPI_HEIGHT);
  }
  function paint() {
    clear();
    const [yMin, yMax] = _utils.computeBounderies(data);
    const xRatio = VIEW_WIDTH / (data.columns[0].length - 2);
    const yRatio = VIEW_HEIGHT / (yMax - yMin);
    xData = data.columns.filter(col => data.types[col[0]] !== 'line')[0];
    yData = data.columns.filter(col => data.types[col[0]] === 'line');
    // Painting
    yAxis(yMin, yMax);
    xAxis(xData, yData, xRatio);
    yData.map(_utils.toCoords(xRatio, yRatio, DPI_HEIGHT, PADDING)).forEach((coords, indx) => {
      const name = yData[indx][0];
      const color = data.colors[name];
      _utils.line(ctx, coords, {
        color
      });
      for (const [x, y] of coords) {
        if (_utils.isOver(proxy.mouse, x, coords.length, DPI_WIDTH)) {
          _utils.circle(ctx, [x, y], color);
          break;
        }
      }
    });
  }
  function xAxis(xData, yData, xRatio) {
    const colsCount = 10;
    const step = Math.round(xData.length / colsCount);
    ctx.beginPath();
    ctx.font = 'normal 20px Helvetica, sans-serif';
    ctx.fillStyle = '#96a2aa';
    for (let i = 1; i < xData.length; i++) {
      const pos_x = xRatio * i;
      if ((i - 1) % step == 0) {
        const xText = _utils.toDate(xData[i]);
        ctx.fillText(xText, pos_x, DPI_HEIGHT - 10);
      }
      if (_utils.isOver(proxy.mouse, pos_x, xData.length, DPI_WIDTH)) {
        ctx.save();
        // ctx.strokeStyle = '#96a2aa'
        ctx.moveTo(pos_x, PADDING);
        ctx.lineTo(pos_x, DPI_HEIGHT - PADDING);
        ctx.restore();
        tip.show(proxy.mouse.tooltip, {
          title: _utils.toDate(xData[i]),
          items: yData.map(col => {
            return {
              color: data.colors[col[0]],
              name: data.names[col[0]],
              value: col[i + 1]
            };
          })
        });
      }
    }
    ctx.stroke();
    ctx.closePath();
  }
  function yAxis(yMin, yMax) {
    const step = VIEW_HEIGHT / ROWS_COUNT;
    const stepText = Math.round((yMax - yMin) / ROWS_COUNT);
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#bbb';
    ctx.font = 'normal 20px Helvetica, sans-serif';
    ctx.fillStyle = '#96a2aa';
    for (let i = 1; i <= ROWS_COUNT; i++) {
      const y = step * i;
      const yText = yMax - stepText * i;
      const pos_y = y + PADDING;
      ctx.fillText(yText, 0, pos_y - 10);
      ctx.moveTo(0, pos_y);
      ctx.lineTo(DPI_WIDTH, pos_y);
    }
    ctx.stroke();
    ctx.closePath();
  }
  return {
    init() {
      paint();
    },
    destroy() {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", mousemove);
      canvas.removeEventListener("mouseleave", mouseleave);
    }
  };
}

},{"./utils":"3EQWo","./tooltip":"1RUfP","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y","./slider":"6zrPB"}],"3EQWo":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "toDate", function () {
  return toDate;
});
_parcelHelpers.export(exports, "isOver", function () {
  return isOver;
});
_parcelHelpers.export(exports, "computeBounderies", function () {
  return computeBounderies;
});
_parcelHelpers.export(exports, "circle", function () {
  return circle;
});
_parcelHelpers.export(exports, "line", function () {
  return line;
});
_parcelHelpers.export(exports, "css", function () {
  return css;
});
_parcelHelpers.export(exports, "toCoords", function () {
  return toCoords;
});
const CIRCLE_RADIUS = 10;
function toDate(timestamp) {
  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(timestamp);
  return `${shortMonths[date.getMonth()]} ${date.getDate()}`;
}
function isOver(mouse, x, lenhth, DPI_WIDTH) {
  if (!mouse) return false;
  const width = DPI_WIDTH / lenhth;
  return Math.abs(x - mouse.x) < width / 2;
}
function computeBounderies({columns, types}) {
  let min;
  let max;
  columns.forEach(col => {
    if (types[col[0]] !== 'line') return;
    if (typeof min !== 'number') min = col[1];
    if (typeof max !== 'number') max = col[1];
    if (min > col[1]) min = col[1];
    if (max < col[1]) max = col[1];
    for (let i = 2; i < col.length; i++) {
      if (min > col[i]) min = col[i];
      if (max < col[i]) max = col[i];
    }
  });
  return [min, max];
}
function circle(ctx, [x, y], color) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.fillStyle = '#fff';
  ctx.arc(x, y, CIRCLE_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}
function line(ctx, coords, {color}) {
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = color;
  for ([x, y] of coords) {
    ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.closePath();
}
function css(el, styles = {}) {
  Object.assign(el.style, styles);
}
function toCoords(xRatio, yRatio, DPI_HEIGHT, PADDING = 0) {
  return col => col.filter((_, i) => i !== 0).map((y, i) => [Math.floor(i * xRatio), Math.floor(DPI_HEIGHT - PADDING - y * yRatio)]);
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"1RUfP":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "tooltip", function () {
  return tooltip;
});
var _utils = require('./utils');
const template = data => `
<div class="tooltip-title">${data.title}</div>
<ul class="tooltip-list">
  ${data.items.map(item => {
  return `<li class="tooltip-list-item">
      <div class="value" style="color: ${item.color}">${item.value}</div>
      <div class="name" style="color: ${item.color}">${item.name}</div>
    </li>`;
}).join(' ')}
</ul>
`;
function tooltip(el) {
  const clear = () => el.innerHTML = '';
  return {
    show({left, top}, data) {
      const {height, width} = el.getBoundingClientRect();
      clear();
      _utils.css(el, {
        display: 'block',
        top: top - height + 'px',
        left: left + width + 'px'
      });
      el.insertAdjacentHTML('afterbegin', template(data));
    },
    hide() {
      _utils.css(el, {
        display: 'none'
      });
    }
  };
}

},{"./utils":"3EQWo","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6zrPB":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "sliderChart", function () {
  return sliderChart;
});
var _utils = require('./utils');
const HEIGHT = 40;
const DPI_HEIGHT = HEIGHT * 2;
function sliderChart(root, data, DPI_WIDTH) {
  const WIDTH = DPI_WIDTH / 2;
  const VIEW_WIDTH = DPI_WIDTH;
  const VIEW_HEIGHT = DPI_HEIGHT;
  const canvas = root.querySelector('canvas');
  const ctx = canvas.getContext("2d");
  canvas.style.width = WIDTH + 'px';
  canvas.style.height = HEIGHT + 'px';
  _utils.css(canvas, {
    width: WIDTH + 'px',
    height: HEIGHT + 'px'
  });
  canvas.width = DPI_WIDTH;
  canvas.height = DPI_HEIGHT;
  const [yMin, yMax] = _utils.computeBounderies(data);
  const xRatio = VIEW_WIDTH / (data.columns[0].length - 2);
  const yRatio = VIEW_HEIGHT / (yMax - yMin);
  xData = data.columns.filter(col => data.types[col[0]] !== 'line')[0];
  yData = data.columns.filter(col => data.types[col[0]] === 'line');
  // Painting
  // yAxis(yMin, yMax)
  // xAxis(xData, yData, xRatio)
  yData.map(_utils.toCoords(xRatio, yRatio, DPI_HEIGHT, -5)).forEach((coords, indx) => {
    const name = yData[indx][0];
    const color = data.colors[name];
    _utils.line(ctx, coords, {
      color
    });
  });
}

},{"./utils":"3EQWo","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}]},["12yWF","5XPnV"], "5XPnV", "parcelRequireb826")

//# sourceMappingURL=index.72166a09.js.map
