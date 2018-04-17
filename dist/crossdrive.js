module.exports=function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=13)}([function(e,n){var t;t=function(){return this}();try{t=t||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(t=window)}e.exports=t},function(e,n){var t,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function u(){throw new Error("clearTimeout has not been defined")}function a(e){if(t===setTimeout)return setTimeout(e,0);if((t===i||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:i}catch(e){t=i}try{r="function"==typeof clearTimeout?clearTimeout:u}catch(e){r=u}}();var c,f=[],l=!1,s=-1;function p(){l&&c&&(l=!1,c.length?f=c.concat(f):s=-1,f.length&&h())}function h(){if(!l){var e=a(p);l=!0;for(var n=f.length;n;){for(c=f,f=[];++s<n;)c&&c[s].run();s=-1,n=f.length}c=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===u||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(n){try{return r.call(null,e)}catch(n){return r.call(this,e)}}}(e)}}function d(e,n){this.fun=e,this.array=n}function v(){}o.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)n[t-1]=arguments[t];f.push(new d(e,n)),1!==f.length||l||a(h)},d.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=v,o.addListener=v,o.once=v,o.off=v,o.removeListener=v,o.removeAllListeners=v,o.emit=v,o.prependListener=v,o.prependOnceListener=v,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,n,t){(function(r){function o(){var e;try{e=n.storage.debug}catch(e){}return!e&&void 0!==r&&"env"in r&&(e=r.env.DEBUG),e}(n=e.exports=t(12)).log=function(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},n.formatArgs=function(e){var t=this.useColors;if(e[0]=(t?"%c":"")+this.namespace+(t?" %c":" ")+e[0]+(t?"%c ":" ")+"+"+n.humanize(this.diff),!t)return;var r="color: "+this.color;e.splice(1,0,r,"color: inherit");var o=0,i=0;e[0].replace(/%[a-zA-Z%]/g,function(e){"%%"!==e&&"%c"===e&&(i=++o)}),e.splice(i,0,r)},n.save=function(e){try{null==e?n.storage.removeItem("debug"):n.storage.debug=e}catch(e){}},n.load=o,n.useColors=function(){if("undefined"!=typeof window&&window.process&&"renderer"===window.process.type)return!0;if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},n.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(e){}}(),n.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],n.formatters.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},n.enable(o())}).call(this,t(1))},function(e,n){function t(e){return r(e),`${e}/`.split(/\/+/g).reduce((e,n)=>(Array.isArray(e)||(e=[e]),"."===n?e:(".."===n?e.pop():n.length&&e.push(n),e))).join("/")}function r(e){if("string"!=typeof e)throw new TypeError("path must be string.")}e.exports={normalize:e=>t(e),basename:(e,n)=>(function(e,n){var t=e.split(/\//g).pop();if(n){var r=t.split(/\./g),o=r.pop();if(n===o||n.slice(1)===o)return r.join(".")}return t})(t(e),n),dirname:e=>(function(e){return e.split(/\//g).slice(0,-1).join("/")})(t(e)),extname:e=>(function(e){var n=e.replace(/^[\.]+/,"");return/\./.test(n)?n.match(/\.[^.]*$/)[0]:""})(t(e)),format:e=>(function(e){var{dir:n,root:t,base:r,name:o,ext:i}=e,u=n||t,a=r||`${o||""}${/^\./.test(i)?"":"."}${i||""}`;return normalize(`${u}/${a}`)})(e),isAbsolute:e=>(function(e){return/^\//.test(e)})(r(e)),parse:e=>(function(e){var n,t={},r=e.split(/\//g);return t.base=r.pop(),t.dir=r.join("/"),/^\//.test(t.dir)&&(t.root="/"),void 0!=t.base?(n=t.base.replace(/^[\.]+/,""),/\./.test(n)?(t.ext=n.match(/\.[^.]*$/)[0],t.name=t.base.slice(0,-t.ext.length)):t.name=t.base):delete t.base,t})(t(e)),resolve(){return function(e){return t(e.reduce((e,n)=>(Array.isArray(e)||(e=[e]),Array.isArray(n)&&Array.prototype.push.apply(e,n),Array.prototype.push.call(e,n),e)).reduce((e,n)=>/^\//.test(n)?n:`${e}/${n}`))}.call({},Array.prototype.slice.call(arguments,0))},relative:(e,n)=>(function(e,n){for(e=e.split(/\//g),n=n.split(/\//g);e[0]===n[0];)e.shift(),n.shift();return Array(e.length).fill("..").concat(n).join("/")})(t(e),t(n))}},function(e,n){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,n,t){(function(e,n){!function(e,t){"use strict";if(!e.setImmediate){var r,o,i,u,a,c=1,f={},l=!1,s=e.document,p=Object.getPrototypeOf&&Object.getPrototypeOf(e);p=p&&p.setTimeout?p:e,"[object process]"==={}.toString.call(e.process)?r=function(e){n.nextTick(function(){d(e)})}:!function(){if(e.postMessage&&!e.importScripts){var n=!0,t=e.onmessage;return e.onmessage=function(){n=!1},e.postMessage("","*"),e.onmessage=t,n}}()?e.MessageChannel?((i=new MessageChannel).port1.onmessage=function(e){d(e.data)},r=function(e){i.port2.postMessage(e)}):s&&"onreadystatechange"in s.createElement("script")?(o=s.documentElement,r=function(e){var n=s.createElement("script");n.onreadystatechange=function(){d(e),n.onreadystatechange=null,o.removeChild(n),n=null},o.appendChild(n)}):r=function(e){setTimeout(d,0,e)}:(u="setImmediate$"+Math.random()+"$",a=function(n){n.source===e&&"string"==typeof n.data&&0===n.data.indexOf(u)&&d(+n.data.slice(u.length))},e.addEventListener?e.addEventListener("message",a,!1):e.attachEvent("onmessage",a),r=function(n){e.postMessage(u+n,"*")}),p.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var n=new Array(arguments.length-1),t=0;t<n.length;t++)n[t]=arguments[t+1];var o={callback:e,args:n};return f[c]=o,r(c),c++},p.clearImmediate=h}function h(e){delete f[e]}function d(e){if(l)setTimeout(d,0,e);else{var n=f[e];if(n){l=!0;try{!function(e){var n=e.callback,r=e.args;switch(r.length){case 0:n();break;case 1:n(r[0]);break;case 2:n(r[0],r[1]);break;case 3:n(r[0],r[1],r[2]);break;default:n.apply(t,r)}}(n)}finally{h(e),l=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,t(0),t(1))},function(e,n,t){(function(e){var r=this,o=Function.prototype.apply;function i(e,n){this._id=e,this._clearFn=n}n.setTimeout=function(){return new i(o.call(setTimeout,r,arguments),clearTimeout)},n.setInterval=function(){return new i(o.call(setInterval,r,arguments),clearInterval)},n.clearTimeout=n.clearInterval=function(e){e&&e.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(r,this._id)},n.enroll=function(e,n){clearTimeout(e._idleTimeoutId),e._idleTimeout=n},n.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},n._unrefActive=n.active=function(e){clearTimeout(e._idleTimeoutId);var n=e._idleTimeout;n>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},n))},t(5),n.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,n.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(this,t(0))},function(e,n,t){(function(e,t,r,o){(function(n){"use strict";function i(e,n){n|=0;for(var t=Math.max(e.length-n,0),r=Array(t),o=0;o<t;o++)r[o]=e[n+o];return r}var u=function(e){var n=i(arguments,1);return function(){var t=i(arguments);return e.apply(null,n.concat(t))}},a=function(e){return function(){var n=i(arguments),t=n.pop();e.call(this,n,t)}};function c(e){var n=typeof e;return null!=e&&("object"==n||"function"==n)}var f="function"==typeof e&&e,l="object"==typeof t&&"function"==typeof t.nextTick;function s(e){setTimeout(e,0)}function p(e){return function(n){var t=i(arguments,1);e(function(){n.apply(null,t)})}}var h=p(f?e:l?t.nextTick:s);function d(e){return a(function(n,t){var r;try{r=e.apply(this,n)}catch(e){return t(e)}c(r)&&"function"==typeof r.then?r.then(function(e){v(t,null,e)},function(e){v(t,e.message?e:new Error(e))}):t(null,r)})}function v(e,n,t){try{e(n,t)}catch(e){h(y,e)}}function y(e){throw e}var m="function"==typeof Symbol;function g(e){return m&&"AsyncFunction"===e[Symbol.toStringTag]}function b(e){return g(e)?d(e):e}function C(e){return function(n){var t=i(arguments,1),r=a(function(t,r){var o=this;return e(n,function(e,n){b(e).apply(o,t.concat(n))},r)});return t.length?r.apply(this,t):r}}var w="object"==typeof r&&r&&r.Object===Object&&r,j="object"==typeof self&&self&&self.Object===Object&&self,F=w||j||Function("return this")(),k=F.Symbol,x=Object.prototype,A=x.hasOwnProperty,T=x.toString,S=k?k.toStringTag:void 0;var O=Object.prototype.toString;var E="[object Null]",L="[object Undefined]",_=k?k.toStringTag:void 0;function I(e){return null==e?void 0===e?L:E:_&&_ in Object(e)?function(e){var n=A.call(e,S),t=e[S];try{e[S]=void 0;var r=!0}catch(e){}var o=T.call(e);return r&&(n?e[S]=t:delete e[S]),o}(e):function(e){return O.call(e)}(e)}var M="[object AsyncFunction]",P="[object Function]",$="[object GeneratorFunction]",B="[object Proxy]";var z=9007199254740991;function U(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=z}function D(e){return null!=e&&U(e.length)&&!function(e){if(!c(e))return!1;var n=I(e);return n==P||n==$||n==M||n==B}(e)}var N={};function R(){}function V(e){return function(){if(null!==e){var n=e;e=null,n.apply(this,arguments)}}}var q="function"==typeof Symbol&&Symbol.iterator,W=function(e){return q&&e[q]&&e[q]()};function J(e){return null!=e&&"object"==typeof e}var G="[object Arguments]";function Q(e){return J(e)&&I(e)==G}var Z=Object.prototype,H=Z.hasOwnProperty,K=Z.propertyIsEnumerable,X=Q(function(){return arguments}())?Q:function(e){return J(e)&&H.call(e,"callee")&&!K.call(e,"callee")},Y=Array.isArray;var ee="object"==typeof n&&n&&!n.nodeType&&n,ne=ee&&"object"==typeof o&&o&&!o.nodeType&&o,te=ne&&ne.exports===ee?F.Buffer:void 0,re=(te?te.isBuffer:void 0)||function(){return!1},oe=9007199254740991,ie=/^(?:0|[1-9]\d*)$/;function ue(e,n){return!!(n=null==n?oe:n)&&("number"==typeof e||ie.test(e))&&e>-1&&e%1==0&&e<n}var ae={};ae["[object Float32Array]"]=ae["[object Float64Array]"]=ae["[object Int8Array]"]=ae["[object Int16Array]"]=ae["[object Int32Array]"]=ae["[object Uint8Array]"]=ae["[object Uint8ClampedArray]"]=ae["[object Uint16Array]"]=ae["[object Uint32Array]"]=!0,ae["[object Arguments]"]=ae["[object Array]"]=ae["[object ArrayBuffer]"]=ae["[object Boolean]"]=ae["[object DataView]"]=ae["[object Date]"]=ae["[object Error]"]=ae["[object Function]"]=ae["[object Map]"]=ae["[object Number]"]=ae["[object Object]"]=ae["[object RegExp]"]=ae["[object Set]"]=ae["[object String]"]=ae["[object WeakMap]"]=!1;var ce,fe="object"==typeof n&&n&&!n.nodeType&&n,le=fe&&"object"==typeof o&&o&&!o.nodeType&&o,se=le&&le.exports===fe&&w.process,pe=function(){try{return se&&se.binding&&se.binding("util")}catch(e){}}(),he=pe&&pe.isTypedArray,de=he?(ce=he,function(e){return ce(e)}):function(e){return J(e)&&U(e.length)&&!!ae[I(e)]},ve=Object.prototype.hasOwnProperty;function ye(e,n){var t=Y(e),r=!t&&X(e),o=!t&&!r&&re(e),i=!t&&!r&&!o&&de(e),u=t||r||o||i,a=u?function(e,n){for(var t=-1,r=Array(e);++t<e;)r[t]=n(t);return r}(e.length,String):[],c=a.length;for(var f in e)!n&&!ve.call(e,f)||u&&("length"==f||o&&("offset"==f||"parent"==f)||i&&("buffer"==f||"byteLength"==f||"byteOffset"==f)||ue(f,c))||a.push(f);return a}var me=Object.prototype;var ge=function(e,n){return function(t){return e(n(t))}}(Object.keys,Object),be=Object.prototype.hasOwnProperty;function Ce(e){if(t=(n=e)&&n.constructor,n!==("function"==typeof t&&t.prototype||me))return ge(e);var n,t,r=[];for(var o in Object(e))be.call(e,o)&&"constructor"!=o&&r.push(o);return r}function we(e){return D(e)?ye(e):Ce(e)}function je(e){if(D(e))return function(e){var n=-1,t=e.length;return function(){return++n<t?{value:e[n],key:n}:null}}(e);var n,t,r,o,i=W(e);return i?function(e){var n=-1;return function(){var t=e.next();return t.done?null:(n++,{value:t.value,key:n})}}(i):(t=we(n=e),r=-1,o=t.length,function(){var e=t[++r];return r<o?{value:n[e],key:e}:null})}function Fe(e){return function(){if(null===e)throw new Error("Callback was already called.");var n=e;e=null,n.apply(this,arguments)}}function ke(e){return function(n,t,r){if(r=V(r||R),e<=0||!n)return r(null);var o=je(n),i=!1,u=0;function a(e,n){if(u-=1,e)i=!0,r(e);else{if(n===N||i&&u<=0)return i=!0,r(null);c()}}function c(){for(;u<e&&!i;){var n=o();if(null===n)return i=!0,void(u<=0&&r(null));u+=1,t(n.value,n.key,Fe(a))}}c()}}function xe(e,n,t,r){ke(n)(e,b(t),r)}function Ae(e,n){return function(t,r,o){return e(t,n,r,o)}}function Te(e,n,t){t=V(t||R);var r=0,o=0,i=e.length;function u(e,n){e?t(e):++o!==i&&n!==N||t(null)}for(0===i&&t(null);r<i;r++)n(e[r],r,Fe(u))}var Se=Ae(xe,1/0),Oe=function(e,n,t){(D(e)?Te:Se)(e,b(n),t)};function Ee(e){return function(n,t,r){return e(Oe,n,b(t),r)}}function Le(e,n,t,r){r=r||R,n=n||[];var o=[],i=0,u=b(t);e(n,function(e,n,t){var r=i++;u(e,function(e,n){o[r]=n,t(e)})},function(e){r(e,o)})}var _e=Ee(Le),Ie=C(_e);function Me(e){return function(n,t,r,o){return e(ke(t),n,b(r),o)}}var Pe=Me(Le),$e=Ae(Pe,1),Be=C($e);function ze(e,n){for(var t=-1,r=null==e?0:e.length;++t<r&&!1!==n(e[t],t,e););return e}var Ue,De=function(e,n,t){for(var r=-1,o=Object(e),i=t(e),u=i.length;u--;){var a=i[Ue?u:++r];if(!1===n(o[a],a,o))break}return e};function Ne(e,n){return e&&De(e,n,we)}function Re(e){return e!=e}function Ve(e,n,t){return n==n?function(e,n,t){for(var r=t-1,o=e.length;++r<o;)if(e[r]===n)return r;return-1}(e,n,t):function(e,n,t,r){for(var o=e.length,i=t+(r?1:-1);r?i--:++i<o;)if(n(e[i],i,e))return i;return-1}(e,Re,t)}var qe=function(e,n,t){"function"==typeof n&&(t=n,n=null),t=V(t||R);var r=we(e).length;if(!r)return t(null);n||(n=r);var o={},u=0,a=!1,c=Object.create(null),f=[],l=[],s={};function p(e,n){f.push(function(){!function(e,n){if(a)return;var r=Fe(function(n,r){if(u--,arguments.length>2&&(r=i(arguments,1)),n){var f={};Ne(o,function(e,n){f[n]=e}),f[e]=r,a=!0,c=Object.create(null),t(n,f)}else o[e]=r,ze(c[e]||[],function(e){e()}),h()});u++;var f=b(n[n.length-1]);n.length>1?f(o,r):f(r)}(e,n)})}function h(){if(0===f.length&&0===u)return t(null,o);for(;f.length&&u<n;){f.shift()()}}function d(n){var t=[];return Ne(e,function(e,r){Y(e)&&Ve(e,n,0)>=0&&t.push(r)}),t}Ne(e,function(n,t){if(!Y(n))return p(t,[n]),void l.push(t);var r=n.slice(0,n.length-1),o=r.length;if(0===o)return p(t,n),void l.push(t);s[t]=o,ze(r,function(i){if(!e[i])throw new Error("async.auto task `"+t+"` has a non-existent dependency `"+i+"` in "+r.join(", "));!function(e,n){var t=c[e];t||(t=c[e]=[]);t.push(n)}(i,function(){0===--o&&p(t,n)})})}),function(){var e,n=0;for(;l.length;)e=l.pop(),n++,ze(d(e),function(e){0==--s[e]&&l.push(e)});if(n!==r)throw new Error("async.auto cannot execute tasks due to a recursive dependency")}(),h()};function We(e,n){for(var t=-1,r=null==e?0:e.length,o=Array(r);++t<r;)o[t]=n(e[t],t,e);return o}var Je="[object Symbol]";var Ge=1/0,Qe=k?k.prototype:void 0,Ze=Qe?Qe.toString:void 0;function He(e){if("string"==typeof e)return e;if(Y(e))return We(e,He)+"";if(function(e){return"symbol"==typeof e||J(e)&&I(e)==Je}(e))return Ze?Ze.call(e):"";var n=e+"";return"0"==n&&1/e==-Ge?"-0":n}function Ke(e,n,t){var r=e.length;return t=void 0===t?r:t,!n&&t>=r?e:function(e,n,t){var r=-1,o=e.length;n<0&&(n=-n>o?0:o+n),(t=t>o?o:t)<0&&(t+=o),o=n>t?0:t-n>>>0,n>>>=0;for(var i=Array(o);++r<o;)i[r]=e[r+n];return i}(e,n,t)}var Xe=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");var Ye="[\\ud800-\\udfff]",en="[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",nn="\\ud83c[\\udffb-\\udfff]",tn="[^\\ud800-\\udfff]",rn="(?:\\ud83c[\\udde6-\\uddff]){2}",on="[\\ud800-\\udbff][\\udc00-\\udfff]",un="(?:"+en+"|"+nn+")"+"?",an="[\\ufe0e\\ufe0f]?"+un+("(?:\\u200d(?:"+[tn,rn,on].join("|")+")[\\ufe0e\\ufe0f]?"+un+")*"),cn="(?:"+[tn+en+"?",en,rn,on,Ye].join("|")+")",fn=RegExp(nn+"(?="+nn+")|"+cn+an,"g");function ln(e){return function(e){return Xe.test(e)}(e)?function(e){return e.match(fn)||[]}(e):function(e){return e.split("")}(e)}var sn=/^\s+|\s+$/g;function pn(e,n,t){var r;if((e=null==(r=e)?"":He(r))&&(t||void 0===n))return e.replace(sn,"");if(!e||!(n=He(n)))return e;var o=ln(e),i=ln(n);return Ke(o,function(e,n){for(var t=-1,r=e.length;++t<r&&Ve(n,e[t],0)>-1;);return t}(o,i),function(e,n){for(var t=e.length;t--&&Ve(n,e[t],0)>-1;);return t}(o,i)+1).join("")}var hn=/^(?:async\s+)?(function)?\s*[^\(]*\(\s*([^\)]*)\)/m,dn=/,/,vn=/(=.+)?(\s*)$/,yn=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;function mn(e,n){var t={};Ne(e,function(e,n){var r,o,i=g(e),u=!i&&1===e.length||i&&0===e.length;if(Y(e))r=e.slice(0,-1),e=e[e.length-1],t[n]=r.concat(r.length>0?a:e);else if(u)t[n]=e;else{if(r=o=(o=(o=(o=(o=e).toString().replace(yn,"")).match(hn)[2].replace(" ",""))?o.split(dn):[]).map(function(e){return pn(e.replace(vn,""))}),0===e.length&&!i&&0===r.length)throw new Error("autoInject task functions require explicit parameters.");i||r.pop(),t[n]=r.concat(a)}function a(n,t){var o=We(r,function(e){return n[e]});o.push(t),b(e).apply(null,o)}}),qe(t,n)}function gn(){this.head=this.tail=null,this.length=0}function bn(e,n){e.length=1,e.head=e.tail=n}function Cn(e,n,t){if(null==n)n=1;else if(0===n)throw new Error("Concurrency must not be zero");var r=b(e),o=0,i=[],u=!1;function a(e,n,t){if(null!=t&&"function"!=typeof t)throw new Error("task callback must be a function");if(l.started=!0,Y(e)||(e=[e]),0===e.length&&l.idle())return h(function(){l.drain()});for(var r=0,o=e.length;r<o;r++){var i={data:e[r],callback:t||R};n?l._tasks.unshift(i):l._tasks.push(i)}u||(u=!0,h(function(){u=!1,l.process()}))}function c(e){return function(n){o-=1;for(var t=0,r=e.length;t<r;t++){var u=e[t],a=Ve(i,u,0);0===a?i.shift():a>0&&i.splice(a,1),u.callback.apply(u,arguments),null!=n&&l.error(n,u.data)}o<=l.concurrency-l.buffer&&l.unsaturated(),l.idle()&&l.drain(),l.process()}}var f=!1,l={_tasks:new gn,concurrency:n,payload:t,saturated:R,unsaturated:R,buffer:n/4,empty:R,drain:R,error:R,started:!1,paused:!1,push:function(e,n){a(e,!1,n)},kill:function(){l.drain=R,l._tasks.empty()},unshift:function(e,n){a(e,!0,n)},remove:function(e){l._tasks.remove(e)},process:function(){if(!f){for(f=!0;!l.paused&&o<l.concurrency&&l._tasks.length;){var e=[],n=[],t=l._tasks.length;l.payload&&(t=Math.min(t,l.payload));for(var u=0;u<t;u++){var a=l._tasks.shift();e.push(a),i.push(a),n.push(a.data)}o+=1,0===l._tasks.length&&l.empty(),o===l.concurrency&&l.saturated();var s=Fe(c(e));r(n,s)}f=!1}},length:function(){return l._tasks.length},running:function(){return o},workersList:function(){return i},idle:function(){return l._tasks.length+o===0},pause:function(){l.paused=!0},resume:function(){!1!==l.paused&&(l.paused=!1,h(l.process))}};return l}function wn(e,n){return Cn(e,1,n)}gn.prototype.removeLink=function(e){return e.prev?e.prev.next=e.next:this.head=e.next,e.next?e.next.prev=e.prev:this.tail=e.prev,e.prev=e.next=null,this.length-=1,e},gn.prototype.empty=function(){for(;this.head;)this.shift();return this},gn.prototype.insertAfter=function(e,n){n.prev=e,n.next=e.next,e.next?e.next.prev=n:this.tail=n,e.next=n,this.length+=1},gn.prototype.insertBefore=function(e,n){n.prev=e.prev,n.next=e,e.prev?e.prev.next=n:this.head=n,e.prev=n,this.length+=1},gn.prototype.unshift=function(e){this.head?this.insertBefore(this.head,e):bn(this,e)},gn.prototype.push=function(e){this.tail?this.insertAfter(this.tail,e):bn(this,e)},gn.prototype.shift=function(){return this.head&&this.removeLink(this.head)},gn.prototype.pop=function(){return this.tail&&this.removeLink(this.tail)},gn.prototype.toArray=function(){for(var e=Array(this.length),n=this.head,t=0;t<this.length;t++)e[t]=n.data,n=n.next;return e},gn.prototype.remove=function(e){for(var n=this.head;n;){var t=n.next;e(n)&&this.removeLink(n),n=t}return this};var jn=Ae(xe,1);function Fn(e,n,t,r){r=V(r||R);var o=b(t);jn(e,function(e,t,r){o(n,e,function(e,t){n=t,r(e)})},function(e){r(e,n)})}function kn(){var e=We(arguments,b);return function(){var n=i(arguments),t=this,r=n[n.length-1];"function"==typeof r?n.pop():r=R,Fn(e,n,function(e,n,r){n.apply(t,e.concat(function(e){var n=i(arguments,1);r(e,n)}))},function(e,n){r.apply(t,[e].concat(n))})}}var xn=function(){return kn.apply(null,i(arguments).reverse())},An=Array.prototype.concat,Tn=function(e,n,t,r){r=r||R;var o=b(t);Pe(e,n,function(e,n){o(e,function(e){return e?n(e):n(null,i(arguments,1))})},function(e,n){for(var t=[],o=0;o<n.length;o++)n[o]&&(t=An.apply(t,n[o]));return r(e,t)})},Sn=Ae(Tn,1/0),On=Ae(Tn,1),En=function(){var e=i(arguments),n=[null].concat(e);return function(){return arguments[arguments.length-1].apply(this,n)}};function Ln(e){return e}function _n(e,n){return function(t,r,o,i){i=i||R;var u,a=!1;t(r,function(t,r,i){o(t,function(r,o){r?i(r):e(o)&&!u?(a=!0,u=n(!0,t),i(null,N)):i()})},function(e){e?i(e):i(null,a?u:n(!1))})}}function In(e,n){return n}var Mn=Ee(_n(Ln,In)),Pn=Me(_n(Ln,In)),$n=Ae(Pn,1);function Bn(e){return function(n){var t=i(arguments,1);t.push(function(n){var t=i(arguments,1);"object"==typeof console&&(n?console.error&&console.error(n):console[e]&&ze(t,function(n){console[e](n)}))}),b(n).apply(null,t)}}var zn=Bn("dir");function Un(e,n,t){t=Fe(t||R);var r=b(e),o=b(n);function u(e){if(e)return t(e);var n=i(arguments,1);n.push(a),o.apply(this,n)}function a(e,n){return e?t(e):n?void r(u):t(null)}a(null,!0)}function Dn(e,n,t){t=Fe(t||R);var r=b(e),o=function(e){if(e)return t(e);var u=i(arguments,1);if(n.apply(this,u))return r(o);t.apply(null,[null].concat(u))};r(o)}function Nn(e,n,t){Dn(e,function(){return!n.apply(this,arguments)},t)}function Rn(e,n,t){t=Fe(t||R);var r=b(n),o=b(e);function i(e){if(e)return t(e);o(u)}function u(e,n){return e?t(e):n?void r(i):t(null)}o(u)}function Vn(e){return function(n,t,r){return e(n,r)}}function qn(e,n,t){Oe(e,Vn(b(n)),t)}function Wn(e,n,t,r){ke(n)(e,Vn(b(t)),r)}var Jn=Ae(Wn,1);function Gn(e){return g(e)?e:a(function(n,t){var r=!0;n.push(function(){var e=arguments;r?h(function(){t.apply(null,e)}):t.apply(null,e)}),e.apply(this,n),r=!1})}function Qn(e){return!e}var Zn=Ee(_n(Qn,Qn)),Hn=Me(_n(Qn,Qn)),Kn=Ae(Hn,1);function Xn(e){return function(n){return null==n?void 0:n[e]}}function Yn(e,n,t,r){var o=new Array(n.length);e(n,function(e,n,r){t(e,function(e,t){o[n]=!!t,r(e)})},function(e){if(e)return r(e);for(var t=[],i=0;i<n.length;i++)o[i]&&t.push(n[i]);r(null,t)})}function et(e,n,t,r){var o=[];e(n,function(e,n,r){t(e,function(t,i){t?r(t):(i&&o.push({index:n,value:e}),r())})},function(e){e?r(e):r(null,We(o.sort(function(e,n){return e.index-n.index}),Xn("value")))})}function nt(e,n,t,r){(D(n)?Yn:et)(e,n,b(t),r||R)}var tt=Ee(nt),rt=Me(nt),ot=Ae(rt,1);function it(e,n){var t=Fe(n||R),r=b(Gn(e));!function e(n){if(n)return t(n);r(e)}()}var ut=function(e,n,t,r){r=r||R;var o=b(t);Pe(e,n,function(e,n){o(e,function(t,r){return t?n(t):n(null,{key:r,val:e})})},function(e,n){for(var t={},o=Object.prototype.hasOwnProperty,i=0;i<n.length;i++)if(n[i]){var u=n[i].key,a=n[i].val;o.call(t,u)?t[u].push(a):t[u]=[a]}return r(e,t)})},at=Ae(ut,1/0),ct=Ae(ut,1),ft=Bn("log");function lt(e,n,t,r){r=V(r||R);var o={},i=b(t);xe(e,n,function(e,n,t){i(e,n,function(e,r){if(e)return t(e);o[n]=r,t()})},function(e){r(e,o)})}var st=Ae(lt,1/0),pt=Ae(lt,1);function ht(e,n){return n in e}function dt(e,n){var t=Object.create(null),r=Object.create(null);n=n||Ln;var o=b(e),u=a(function(e,u){var a=n.apply(null,e);ht(t,a)?h(function(){u.apply(null,t[a])}):ht(r,a)?r[a].push(u):(r[a]=[u],o.apply(null,e.concat(function(){var e=i(arguments);t[a]=e;var n=r[a];delete r[a];for(var o=0,u=n.length;o<u;o++)n[o].apply(null,e)})))});return u.memo=t,u.unmemoized=e,u}var vt=p(l?t.nextTick:f?e:s);function yt(e,n,t){t=t||R;var r=D(n)?[]:{};e(n,function(e,n,t){b(e)(function(e,o){arguments.length>2&&(o=i(arguments,1)),r[n]=o,t(e)})},function(e){t(e,r)})}function mt(e,n){yt(Oe,e,n)}function gt(e,n,t){yt(ke(n),e,t)}var bt=function(e,n){var t=b(e);return Cn(function(e,n){t(e[0],n)},n,1)},Ct=function(e,n){var t=bt(e,n);return t.push=function(e,n,r){if(null==r&&(r=R),"function"!=typeof r)throw new Error("task callback must be a function");if(t.started=!0,Y(e)||(e=[e]),0===e.length)return h(function(){t.drain()});n=n||0;for(var o=t._tasks.head;o&&n>=o.priority;)o=o.next;for(var i=0,u=e.length;i<u;i++){var a={data:e[i],priority:n,callback:r};o?t._tasks.insertBefore(o,a):t._tasks.push(a)}h(t.process)},delete t.unshift,t};function wt(e,n){if(n=V(n||R),!Y(e))return n(new TypeError("First argument to race must be an array of functions"));if(!e.length)return n();for(var t=0,r=e.length;t<r;t++)b(e[t])(n)}function jt(e,n,t,r){Fn(i(e).reverse(),n,t,r)}function Ft(e){var n=b(e);return a(function(e,t){return e.push(function(e,n){var r;e?t(null,{error:e}):(r=arguments.length<=2?n:i(arguments,1),t(null,{value:r}))}),n.apply(this,e)})}function kt(e){var n;return Y(e)?n=We(e,Ft):(n={},Ne(e,function(e,t){n[t]=Ft.call(this,e)})),n}function xt(e,n,t,r){nt(e,n,function(e,n){t(e,function(e,t){n(e,!t)})},r)}var At=Ee(xt),Tt=Me(xt),St=Ae(Tt,1);function Ot(e){return function(){return e}}function Et(e,n,t){var r=5,o=0,i={times:r,intervalFunc:Ot(o)};if(arguments.length<3&&"function"==typeof e?(t=n||R,n=e):(!function(e,n){if("object"==typeof n)e.times=+n.times||r,e.intervalFunc="function"==typeof n.interval?n.interval:Ot(+n.interval||o),e.errorFilter=n.errorFilter;else{if("number"!=typeof n&&"string"!=typeof n)throw new Error("Invalid arguments for async.retry");e.times=+n||r}}(i,e),t=t||R),"function"!=typeof n)throw new Error("Invalid arguments for async.retry");var u=b(n),a=1;!function e(){u(function(n){n&&a++<i.times&&("function"!=typeof i.errorFilter||i.errorFilter(n))?setTimeout(e,i.intervalFunc(a)):t.apply(null,arguments)})}()}var Lt=function(e,n){n||(n=e,e=null);var t=b(n);return a(function(n,r){function o(e){t.apply(null,n.concat(e))}e?Et(e,o,r):Et(o,r)})};function _t(e,n){yt(jn,e,n)}var It=Ee(_n(Boolean,Ln)),Mt=Me(_n(Boolean,Ln)),Pt=Ae(Mt,1);function $t(e,n,t){var r=b(n);function o(e,n){var t=e.criteria,r=n.criteria;return t<r?-1:t>r?1:0}_e(e,function(e,n){r(e,function(t,r){if(t)return n(t);n(null,{value:e,criteria:r})})},function(e,n){if(e)return t(e);t(null,We(n.sort(o),Xn("value")))})}function Bt(e,n,t){var r=b(e);return a(function(o,i){var u,a=!1;o.push(function(){a||(i.apply(null,arguments),clearTimeout(u))}),u=setTimeout(function(){var n=e.name||"anonymous",r=new Error('Callback function "'+n+'" timed out.');r.code="ETIMEDOUT",t&&(r.info=t),a=!0,i(r)},n),r.apply(null,o)})}var zt=Math.ceil,Ut=Math.max;function Dt(e,n,t,r){var o=b(t);Pe(function(e,n,t,r){for(var o=-1,i=Ut(zt((n-e)/(t||1)),0),u=Array(i);i--;)u[r?i:++o]=e,e+=t;return u}(0,e,1),n,o,r)}var Nt=Ae(Dt,1/0),Rt=Ae(Dt,1);function Vt(e,n,t,r){arguments.length<=3&&(r=t,t=n,n=Y(e)?[]:{}),r=V(r||R);var o=b(t);Oe(e,function(e,t,r){o(n,e,t,r)},function(e){r(e,n)})}function qt(e,n){var t,r=null;n=n||R,Jn(e,function(e,n){b(e)(function(e,o){t=arguments.length>2?i(arguments,1):o,r=e,n(!e)})},function(){n(r,t)})}function Wt(e){return function(){return(e.unmemoized||e).apply(null,arguments)}}function Jt(e,n,t){t=Fe(t||R);var r=b(n);if(!e())return t(null);var o=function(n){if(n)return t(n);if(e())return r(o);var u=i(arguments,1);t.apply(null,[null].concat(u))};r(o)}function Gt(e,n,t){Jt(function(){return!e.apply(this,arguments)},n,t)}var Qt=function(e,n){if(n=V(n||R),!Y(e))return n(new Error("First argument to waterfall must be an array of functions"));if(!e.length)return n();var t=0;function r(n){var r=b(e[t++]);n.push(Fe(o)),r.apply(null,n)}function o(o){if(o||t===e.length)return n.apply(null,arguments);r(i(arguments,1))}r([])},Zt={apply:u,applyEach:Ie,applyEachSeries:Be,asyncify:d,auto:qe,autoInject:mn,cargo:wn,compose:xn,concat:Sn,concatLimit:Tn,concatSeries:On,constant:En,detect:Mn,detectLimit:Pn,detectSeries:$n,dir:zn,doDuring:Un,doUntil:Nn,doWhilst:Dn,during:Rn,each:qn,eachLimit:Wn,eachOf:Oe,eachOfLimit:xe,eachOfSeries:jn,eachSeries:Jn,ensureAsync:Gn,every:Zn,everyLimit:Hn,everySeries:Kn,filter:tt,filterLimit:rt,filterSeries:ot,forever:it,groupBy:at,groupByLimit:ut,groupBySeries:ct,log:ft,map:_e,mapLimit:Pe,mapSeries:$e,mapValues:st,mapValuesLimit:lt,mapValuesSeries:pt,memoize:dt,nextTick:vt,parallel:mt,parallelLimit:gt,priorityQueue:Ct,queue:bt,race:wt,reduce:Fn,reduceRight:jt,reflect:Ft,reflectAll:kt,reject:At,rejectLimit:Tt,rejectSeries:St,retry:Et,retryable:Lt,seq:kn,series:_t,setImmediate:h,some:It,someLimit:Mt,someSeries:Pt,sortBy:$t,timeout:Bt,times:Nt,timesLimit:Dt,timesSeries:Rt,transform:Vt,tryEach:qt,unmemoize:Wt,until:Gt,waterfall:Qt,whilst:Jt,all:Zn,allLimit:Hn,allSeries:Kn,any:It,anyLimit:Mt,anySeries:Pt,find:Mn,findLimit:Pn,findSeries:$n,forEach:qn,forEachSeries:Jn,forEachLimit:Wn,forEachOf:Oe,forEachOfSeries:jn,forEachOfLimit:xe,inject:Fn,foldl:Fn,foldr:jt,select:tt,selectLimit:rt,selectSeries:ot,wrapSync:d};n.default=Zt,n.apply=u,n.applyEach=Ie,n.applyEachSeries=Be,n.asyncify=d,n.auto=qe,n.autoInject=mn,n.cargo=wn,n.compose=xn,n.concat=Sn,n.concatLimit=Tn,n.concatSeries=On,n.constant=En,n.detect=Mn,n.detectLimit=Pn,n.detectSeries=$n,n.dir=zn,n.doDuring=Un,n.doUntil=Nn,n.doWhilst=Dn,n.during=Rn,n.each=qn,n.eachLimit=Wn,n.eachOf=Oe,n.eachOfLimit=xe,n.eachOfSeries=jn,n.eachSeries=Jn,n.ensureAsync=Gn,n.every=Zn,n.everyLimit=Hn,n.everySeries=Kn,n.filter=tt,n.filterLimit=rt,n.filterSeries=ot,n.forever=it,n.groupBy=at,n.groupByLimit=ut,n.groupBySeries=ct,n.log=ft,n.map=_e,n.mapLimit=Pe,n.mapSeries=$e,n.mapValues=st,n.mapValuesLimit=lt,n.mapValuesSeries=pt,n.memoize=dt,n.nextTick=vt,n.parallel=mt,n.parallelLimit=gt,n.priorityQueue=Ct,n.queue=bt,n.race=wt,n.reduce=Fn,n.reduceRight=jt,n.reflect=Ft,n.reflectAll=kt,n.reject=At,n.rejectLimit=Tt,n.rejectSeries=St,n.retry=Et,n.retryable=Lt,n.seq=kn,n.series=_t,n.setImmediate=h,n.some=It,n.someLimit=Mt,n.someSeries=Pt,n.sortBy=$t,n.timeout=Bt,n.times=Nt,n.timesLimit=Dt,n.timesSeries=Rt,n.transform=Vt,n.tryEach=qt,n.unmemoize=Wt,n.until=Gt,n.waterfall=Qt,n.whilst=Jt,n.all=Zn,n.allLimit=Hn,n.allSeries=Kn,n.any=It,n.anyLimit=Mt,n.anySeries=Pt,n.find=Mn,n.findLimit=Pn,n.findSeries=$n,n.forEach=qn,n.forEachSeries=Jn,n.forEachLimit=Wn,n.forEachOf=Oe,n.forEachOfSeries=jn,n.forEachOfLimit=xe,n.inject=Fn,n.foldl=Fn,n.foldr=jt,n.select=tt,n.selectLimit=rt,n.selectSeries=ot,n.wrapSync=d,Object.defineProperty(n,"__esModule",{value:!0})})(n)}).call(this,t(6).setImmediate,t(1),t(0),t(4)(e))},function(e,n){e.exports={google:{auth:{OAuth2:{}}}}},function(e,n,t){const{google:r}=t(8),o=t(7),i=t(3),u=t(2)("xdrive-google"),a=r.auth.OAuth2;var c,f,l,s={};function p(e,n){var t=function(e){"/"!==e.charAt(0)&&(e="/"+e);"/"===e.slice(-1)&&(e=e.slice(0,-1));return e}(e);return s[t]&&s[t].id?Promise.resolve(s[t].id):function(e,n){return new Promise((u,a)=>{var c=(t=[],(r=e.split("/")).forEach((e,n)=>{var o=r.slice(0,n+1).join("/");o&&"/"!==o&&t.push(o)}),t);if(!c||!c.length)return u(null);o.eachOfSeries(c,(e,t,r)=>{if(s[e]&&s[e].id)return r();var o=null;return t>0&&(o=s[c[t-1]].id),function(e,n,t){return d(i.basename(e),n).then(n=>{if(n.data.length){var r=n.data[0].id;return h(e,r),r}return t?m(e).then(e=>e.id):null})}(e,o,n).then(e=>{r(!e)})},()=>{s[e]?u(s[e].id):u(null)})});var t,r}(t,n)}function h(e,n){n&&(s[e]={key:e,basename:i.basename(e),id:n})}function d(e,n){return new Promise((o,i)=>{var a={};n&&("object"==typeof n&&(n=n.id),a[n]=["in","parents"]),e&&(a.name=e),u("doList",e,n),f.files.list({q:(t=a,r="",t=t||{},Object.keys(t).forEach(function(e){r&&(r+=" AND ");var n=t[e];if("type"===e&&(e="mimeType","folder"===n&&(n="application/vnd.google-apps.folder")),"title"===e&&(e="name"),Array.isArray(n))var o=g(e)+" "+n[0]+" "+("in"===n[0]?n[1]:g(n[1]));else o=e+"="+g(n);r+=o="("+o+")"}),r)},(e,n)=>{if(e)return u(e),i(e);o({data:n.data.files.map(b),next:n.data.nextPageToken})})});var t,r}function v(e,n,t){var r,o,u=i.dirname(e),a=i.basename(e);return p(u,!0).then(e=>y(a,r=e)).then(e=>e?function(e,n){return new Promise((t,r)=>{var o={body:n};f.files.update({media:o,fileId:e},(e,n)=>e?r(e):t(b(n.data)))})}(e,t):(o={type:n,name:a,body:t,folder:r},new Promise((e,n)=>{var t={mimeType:o.type,name:o.name};["folder","directory"].indexOf(o.type)>-1&&(t.mimeType="application/vnd.google-apps.folder");var r={mimeType:o.type};o.body&&(r.body=o.body),o.folder&&(t.parents=[o.folder]),f.files.create({resource:t,media:r},(t,r)=>t?n(t):e(b(r.data)))}))).then(n=>(h(e,n.id),n))}function y(e,n){return d(e,n).then(e=>!!e.data.length&&e.data[0].id)}function m(e){return v(e,"folder")}function g(e){return"'"+e+"'"}function b(e){return e.title=e.name,e.type="application/vnd.google-apps.folder"==e.mimeType?"folder":"file",e}e.exports={createClient:function(e,n){l=e,(c=new a).setCredentials({access_token:e.access_token,refresh_token:e.refresh_token}),f=r.drive({version:"v3",auth:c}),Array.isArray(n)||(n=[n]);n},list:function(e){return u("listFiles",e),p(e).then(e=>!!e&&d(null,e))},upload:v,createFolder:m,tokenCheck:function(){return u("token check",l.access_token),c.getTokenInfo(l.access_token)},deleteFile:function(e){return new Promise((n,t)=>{var r=i.dirname(e),o=i.basename(e);return p(r).then(e=>y(o,e)).then(e=>{if(!e)return n();f.files.delete({fileId:e},function(e,r){return e?t(e):n(r)})}).catch(t)})},download:function(e){var n=i.dirname(e),t=i.basename(e);return p(n).then(e=>y(t,e)).then(e=>f.files.get({fileId:e,alt:"media"},{responseType:"stream"})).then(e=>e.data)}}},function(e,n){e.exports={}},function(e,n){var t=1e3,r=60*t,o=60*r,i=24*o,u=365.25*i;function a(e,n,t){if(!(e<n))return e<1.5*n?Math.floor(e/n)+" "+t:Math.ceil(e/n)+" "+t+"s"}e.exports=function(e,n){n=n||{};var c,f=typeof e;if("string"===f&&e.length>0)return function(e){if((e=String(e)).length>100)return;var n=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(!n)return;var a=parseFloat(n[1]);switch((n[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return a*u;case"days":case"day":case"d":return a*i;case"hours":case"hour":case"hrs":case"hr":case"h":return a*o;case"minutes":case"minute":case"mins":case"min":case"m":return a*r;case"seconds":case"second":case"secs":case"sec":case"s":return a*t;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return a;default:return}}(e);if("number"===f&&!1===isNaN(e))return n.long?a(c=e,i,"day")||a(c,o,"hour")||a(c,r,"minute")||a(c,t,"second")||c+" ms":function(e){if(e>=i)return Math.round(e/i)+"d";if(e>=o)return Math.round(e/o)+"h";if(e>=r)return Math.round(e/r)+"m";if(e>=t)return Math.round(e/t)+"s";return e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},function(e,n,t){function r(e){var t;function r(){if(r.enabled){var e=r,o=+new Date,i=o-(t||o);e.diff=i,e.prev=t,e.curr=o,t=o;for(var u=new Array(arguments.length),a=0;a<u.length;a++)u[a]=arguments[a];u[0]=n.coerce(u[0]),"string"!=typeof u[0]&&u.unshift("%O");var c=0;u[0]=u[0].replace(/%([a-zA-Z%])/g,function(t,r){if("%%"===t)return t;c++;var o=n.formatters[r];if("function"==typeof o){var i=u[c];t=o.call(e,i),u.splice(c,1),c--}return t}),n.formatArgs.call(e,u),(r.log||n.log||console.log.bind(console)).apply(e,u)}}return r.namespace=e,r.enabled=n.enabled(e),r.useColors=n.useColors(),r.color=function(e){var t,r=0;for(t in e)r=(r<<5)-r+e.charCodeAt(t),r|=0;return n.colors[Math.abs(r)%n.colors.length]}(e),r.destroy=o,"function"==typeof n.init&&n.init(r),n.instances.push(r),r}function o(){var e=n.instances.indexOf(this);return-1!==e&&(n.instances.splice(e,1),!0)}(n=e.exports=r.debug=r.default=r).coerce=function(e){return e instanceof Error?e.stack||e.message:e},n.disable=function(){n.enable("")},n.enable=function(e){var t;n.save(e),n.names=[],n.skips=[];var r=("string"==typeof e?e:"").split(/[\s,]+/),o=r.length;for(t=0;t<o;t++)r[t]&&("-"===(e=r[t].replace(/\*/g,".*?"))[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")));for(t=0;t<n.instances.length;t++){var i=n.instances[t];i.enabled=n.enabled(i.namespace)}},n.enabled=function(e){if("*"===e[e.length-1])return!0;var t,r;for(t=0,r=n.skips.length;t<r;t++)if(n.skips[t].test(e))return!1;for(t=0,r=n.names.length;t<r;t++)if(n.names[t].test(e))return!0;return!1},n.humanize=t(11),n.instances=[],n.names=[],n.skips=[],n.formatters={}},function(e,n,t){t(3),t(2)("crossdrive");var r={"googledrive-browser":t(10),googledrive:t(9)};e.exports=function(e,n){if(!r[e])throw"Bad provider";return r[e].createClient(n),r[e]}}]);