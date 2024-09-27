(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=r(i);fetch(i.href,a)}})();const Bl=[(t,e)=>e in t,(t,e)=>e in t.constructor.prototype];function Ue(t,e){return t?Bl.some(r=>{try{return r(t,e)}catch{return!1}}):!1}function j(t){let e;try{e=Reflect.ownKeys(t)}catch{}return e??[...Object.keys(t),...Object.getOwnPropertySymbols(t)]}function qi(t){return j(t).map(e=>t[e])}function jt(t,e){return t.filter((r,n)=>!e.includes(n))}function jl(t,e,r){return t.reduce((n,i,a,s)=>{const o=e(i,a,s);return r(o,i,a,s)&&n.push(o),n},[])}function mi(t){return!!t}const Gl={capitalizeFirstLetter:!1};function Zl(t){return t.length?t[0].toUpperCase()+t.slice(1):""}function ql(t,e){return e.capitalizeFirstLetter?Zl(t):t}function Yl(t,e=Gl){const r=t.toLowerCase();if(!r.length)return"";const n=r.replace(/^-+/,"").replace(/-{2,}/g,"-").replace(/-(?:.|$)/g,i=>{const a=i[1];return a?a.toUpperCase():""});return ql(n,e)}var Yi;(function(t){t.Upper="upper",t.Lower="lower"})(Yi||(Yi={}));function Kl({min:t,max:e}){return t>e?{min:e,max:t}:{min:t,max:e}}function Ki(t){const e=Number(t);if(isNaN(e))throw new Error(`Cannot convert given input to a number: ${t}`);return e}var Ji;(function(t){t.FirstThenWait="first-then-wait",t.AfterWait="after-wait"})(Ji||(Ji={}));function er(t){return t?t instanceof Error?t.message:Ue(t,"message")?String(t.message):String(t):""}function Be(t){return t instanceof Error?t:new Error(er(t))}function Jl(t,e){const r=Be(t);return r.message=`${e}: ${r.message}`,r}class tr extends Error{constructor(){super(...arguments),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AssertionError"})}}const Ql=[(t,e)=>e in t,(t,e)=>e in t.constructor.prototype];function zn(t,e){return t?Ql.some(r=>{try{return r(t,e)}catch{return!1}}):!1}function Xl(t){return t instanceof Promise}function ht(t){return Array.isArray(t)?"array":typeof t}function I(t,e){return ht(t)===e}function ec(t,e,r){if(!I(t,e))throw new tr(r||`value is of type '${ht(t)}' but type '${e}' was expected.`)}function Yr(t,e,r){if(!(t instanceof e))throw new tr(r||"instanceof assertion failed")}function tc(t,e){try{return Yr(t,e),!0}catch(r){if(r instanceof tr)return!1;throw r}}function pe(t,e){if(t==null)throw new tr(e||"defined assertion failed")}class rc extends Error{constructor(e){super(`Failed to compare objects using JSON.stringify: ${e}`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"JsonStringifyError"})}}function pn(t,e){return JSON.stringify(t)===JSON.stringify(e)}function Wn(t,e){try{return t===e||pn(t,e)?!0:mt(t)&&mt(e)?pn(Object.keys(t).sort(),Object.keys(e).sort())?j(t).every(n=>Wn(t[n],e[n])):!1:pn(t,e)}catch(r){throw new rc(er(r))}}function nc(t,e){try{if(mt(t)&&mt(e)){const r=new Set([...j(t),...j(e)]);return Array.from(r).every(n=>{if(!Qi(t,n)||!Qi(e,n))return!1;const i=t[n],a=e[n];return typeof i!=typeof a?!1:Nr(()=>Wn(i,a),{fallbackValue:!0})})}else return Nr(()=>Wn(t,e),{fallbackValue:!1})}catch{return!1}}function mr(t,e){return t===e}function ic(t,e){if(!(I(t,"string")||I(t,"number")||I(t,"symbol")))throw new tr(e||`value is of type '${ht(t)}' but expected a PropertyKey.`)}function gn(t){try{return ic(t),!0}catch{return!1}}function mt(t){return!!t&&typeof t=="object"}function x(t){try{return JSON.parse(JSON.stringify(t))}catch(e){throw console.error("Failed to JSON copy for",t),e}}function Ss(t,e,r=!1,n={}){const i=j(t),a=new Set(j(e));if(!r){const s=i.filter(o=>!a.has(o));if(s.length)throw new Error(`Test object has extra keys: ${s.join(", ")}`)}a.forEach(s=>{if(!Ue(t,s))throw new Error(`test object does not have key "${String(s)}" from expected shape.`);function o(u){throw new Error(`test object value at key "${String(s)}" did not match expected shape: ${u}`)}const l=t[s],c=e[s];n[s]||As(l,c,o,r,n[s]??{})})}function As(t,e,r,n,i){var o;const a=typeof t,s=typeof e;a!==s&&r(`type "${a}" did not match expected type "${s}"`);try{Ue(e,"constructor")&&(!Ue(t,"constructor")||t.constructor!==e.constructor)&&r(`constructor "${(o=t==null?void 0:t.constructor)==null?void 0:o.name}" did not match expected constructor "${e.constructor}"`)}catch(l){if(l instanceof r)throw l}Array.isArray(e)?(Array.isArray(t)||r("expected an array"),t.forEach((l,c)=>{if(e.map(d=>{try{As(l,d,r,n,i);return}catch(f){return new Error(`entry at index "${c}" did not match expected shape: ${er(f)}`)}}).filter(mi).length===e.length)throw new Error(`entry at index "${c}" did not match any of the possible types from "${e.join(", ")}"`)})):mt(e)&&Ss(t,e,n,i)}function Nr(t,e={}){try{const r=t();return r instanceof Promise?r.catch(n=>e.handleError?e.handleError(n):zn(e,"fallbackValue")?e.fallbackValue:Be(n)):r}catch(r){return e.handleError?e.handleError(r):zn(e,"fallbackValue")?e.fallbackValue:Be(r)}}function ac({jsonString:t,errorHandler:e,shapeMatcher:r}){try{const n=JSON.parse(t);return r!=null&&(I(r,"object")?Ss(n,r):ec(n,ht(r),"parsedJson")),n}catch(n){if(e)return e(n);throw n}}function sc(t){return j(t).filter(e=>isNaN(Number(e)))}function qe(t){return sc(t).map(r=>t[r])}function rr(t,e){return qe(e).includes(t)}function oc(t,e,r){if(e in t)return t[e];{const n=r();return Xl(n)?new Promise(async(i,a)=>{try{const s=await n;t[e]=s,i(s)}catch(s){a(s)}}):(t[e]=n,n)}}function Qi(t,e){return e in t}function pi(t,e){let r=!1;const n=j(t).reduce((i,a)=>{const s=e(a,t[a],t);return s instanceof Promise&&(r=!0),{...i,[a]:s}},{});return r?new Promise(async(i,a)=>{try{await Promise.all(j(n).map(async s=>{const o=await n[s];n[s]=o})),i(n)}catch(s){a(s)}}):n}function Lr(t,e){try{return lc(t,e),!0}catch{return!1}}function lc(t,e,r){if(t.length<e)throw new Error(r?`'${r}' is not at least '${e}' in length.`:`Array is not at least '${e}' in length.`)}function Ir(){let t,e,r=!1;const n=new Promise((i,a)=>{t=s=>(r=!0,i(s)),e=s=>{r=!0,a(s)}});if(!t||!e)throw new Error(`Reject and resolve callbacks were not set by the promise constructor for ${Ir.name}.`);return{promise:n,resolve:t,reject:e,isSettled(){return r}}}function cc(t){return!!(Ue(t,"then")&&typeof t.then=="function")}function Xi(t){const e=Ir();return t!==1/0&&setTimeout(()=>{e.resolve()},t<=0?0:t),e.promise}function uc(){return globalThis.crypto?globalThis.crypto:require("crypto").webcrypto}const dc=uc();function fc({min:t,max:e}){const{min:r,max:n}=Kl({min:Math.floor(t),max:Math.floor(e)}),i=n-r+1,a=Math.ceil(Math.log2(i)/8),s=Math.floor(256**a/i)*i,o=new Uint8Array(a);let l;do dc.getRandomValues(o),l=o.reduce((c,u,d)=>c+u*256**d,0);while(l>=s);return r+l%i}const ea=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",0,1,2,3,4,5,6,7,8,9];function hc(t=16){let e="";for(let r=0;r<t;r++){const n=fc({min:0,max:ea.length-1});e+=ea[n]}return e}function mc({value:t,prefix:e}){return String(t).startsWith(e)?String(t):`${e}${String(t)}`}const pc="px";function Un(t){return gc({value:t,suffix:pc})}function gc({value:t,suffix:e}){return String(t).endsWith(e)?String(t):`${String(t)}${e}`}var wc=globalThis&&globalThis.__setFunctionName||function(t,e,r){return typeof e=="symbol"&&(e=e.description?"[".concat(e.description,"]"):""),Object.defineProperty(t,"name",{configurable:!0,value:r?"".concat(r," ",e):e})};function yc(){return class extends Event{constructor(e,r){super(e,r),Object.defineProperty(this,"detail",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.detail=r.detail}}}const vc=globalThis.CustomEvent||yc();function Ye(){function t(e){var r;return r=class extends vc{constructor(i){super(e,i)}},wc(r,"TypedEventConstructor"),Object.defineProperty(r,"type",{enumerable:!0,configurable:!0,writable:!0,value:e}),r}return t}var bc=globalThis&&globalThis.__setFunctionName||function(t,e,r){return typeof e=="symbol"&&(e=e.description?"[".concat(e.description,"]"):""),Object.defineProperty(t,"name",{configurable:!0,value:r?"".concat(r," ",e):e})};function xs(t){var e;return e=class extends Event{constructor(n){super(t,n)}},bc(e,"TypedEventConstructor"),Object.defineProperty(e,"type",{enumerable:!0,configurable:!0,writable:!0,value:t}),e}class Ec{constructor(){Object.defineProperty(this,"listeners",{enumerable:!0,configurable:!0,writable:!0,value:{}})}getListenerCount(){return qi(this.listeners).map(r=>(r==null?void 0:r.size)||0).reduce((r,n)=>r+n,0)}listen(e,r,n={}){const i=this.listeners,a=I(e,"string")?e:e.type;function s(){var l;return((l=i[a])==null?void 0:l.delete(r))||!1}function o(l,c){n.once&&s(),r(l,c)}return i[a]||(i[a]=new Map),i[a].set(r,{listener:o,removeListener:s}),s}removeListener(e,r){const n=I(e,"string")?e:e.type,i=this.listeners[n];if(!i)return!1;const a=i.get(r);return a?a.removeListener():!1}dispatch(e){const r=this.listeners[e.type],n=(r==null?void 0:r.size)||0;return r==null||r.forEach(i=>{i.listener(e,i.removeListener)}),n}removeAllListeners(){const r=qi(this.listeners).reduce((n,i)=>{const a=(i==null?void 0:i.size)||0;return i==null||i.clear(),n+a},0);return this.listeners={},r}destroy(){this.removeAllListeners()}}class $c extends Ec{}class wn extends Ye()("observable-value-update"){}class Tc extends Ye()("observable-value-resolve"){}class Sc extends Ye()("observable-value-error"){}class Ac extends xs("observable-destroy"){}class xc extends xs("observable-callback-call"){}class kc extends Ye()("observable-params-update"){}class ep extends Ye()("observable-interval-run"){}class tp extends Ye()("observable-interval-skip"){}class rp extends Ye()("observable-interval-rate-limited"){}class Mc extends $c{constructor(){super(...arguments),Object.defineProperty(this,"value",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"equalityCheck",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"listenerMap",{enumerable:!0,configurable:!0,writable:!0,value:new WeakMap})}setValue(e,r=this.equalityCheck){return!r||!r(this.value,e)?(this.value=e,this.dispatch(new wn({detail:e})),!0):!1}listen(e){const r=n=>e(n.detail);return this.listenerMap.set(e,r),super.listen(wn,r)}removeListener(e){const r=this.listenerMap.get(e);return!!r&&super.removeListener(wn,r)}destroy(){this.dispatch(new Ac),super.destroy()}listenToEvent(e,r,n){return super.listen(e,r,n)}}class Cc extends Mc{constructor(e={}){super(),Object.defineProperty(this,"equalityCheck",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"waitingForValueDeferredPromise",{enumerable:!0,configurable:!0,writable:!0,value:Ir()}),Object.defineProperty(this,"lastSetPromise",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"value",{enumerable:!0,configurable:!0,writable:!0,value:this.waitingForValueDeferredPromise.promise}),Object.defineProperty(this,"lastResolvedValue",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.equalityCheck=e.equalityCheck||mr,"defaultValue"in e&&this.setValue(e.defaultValue)}setPromise(e){return e===this.lastSetPromise?!1:(this.lastSetPromise=e,this.waitingForValueDeferredPromise.isSettled()&&(this.waitingForValueDeferredPromise=Ir(),super.setValue(this.waitingForValueDeferredPromise.promise,mr)),e.then(r=>{this.lastSetPromise===e&&this.resolveValue(r)}).catch(r=>{if(this.lastSetPromise!==e)return;this.waitingForValueDeferredPromise.promise.catch(()=>{});const n=Be(r);console.error(n),this.rejectValue(n)}),!0)}resolveValue(e){return this.lastResolvedValue=e,super.setValue(e,this.value instanceof Promise?mr:void 0)?(this.waitingForValueDeferredPromise.isSettled()||this.waitingForValueDeferredPromise.resolve(e),this.dispatch(new Tc({detail:e})),!0):!1}rejectValue(e){this.waitingForValueDeferredPromise.reject(e),super.setValue(e,mr),this.dispatch(new Sc({detail:e}))}setValue(e){try{return e instanceof Promise?this.setPromise(e):e instanceof Error?(this.rejectValue(e),!0):this.resolveValue(e)}catch(r){return this.rejectValue(Be(r)),!0}}listen(e){return super.listen(e)}}class De extends Cc{get lastParams(){if(this.internalParams!==De.NotSet)return this.internalParams}constructor(e={}){super(e),Object.defineProperty(this,"updateCallback",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"equalityCheck",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"internalParams",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.equalityCheck=e.equalityCheck||nc,this.updateCallback=e.updateCallback,this.internalParams="defaultParams"in e?e.defaultParams:De.NotSet}updateFromCallback(){if(this.updateCallback){if(this.internalParams===De.NotSet)throw new TypeError("Cannot update value: params were never set.")}else throw new TypeError("Cannot update value: updateCallback was never set.");try{return this.setValue(this.updateCallback(this.internalParams))}catch(e){return this.setValue(Be(e))}finally{this.dispatch(new xc)}}updateLastParams(e){try{return this.internalParams===De.NotSet||!this.equalityCheck(e,this.internalParams)?(this.internalParams=e,this.dispatch(new kc({detail:this.internalParams})),!0):!1}catch(r){return this.setValue(Be(r)),!1}}update(e){return this.updateLastParams(e)?(this.updateFromCallback(),!0):!1}setParams(e){return this.updateLastParams(e)}forceUpdate(...e){return Lr(e,1)&&this.updateLastParams(e[0]),this.updateFromCallback()}}Object.defineProperty(De,"NotSet",{enumerable:!0,configurable:!0,writable:!0,value:Symbol("not set")});function _c(t){let e;try{e=Reflect.ownKeys(t)}catch{}return e??[...Object.keys(t),...Object.getOwnPropertySymbols(t)]}var ta;(function(t){t.Upper="upper",t.Lower="lower"})(ta||(ta={}));var ra;(function(t){t.FirstThenWait="first-then-wait",t.AfterWait="after-wait"})(ra||(ra={}));function Oc(t,e){return _c(t).filter(n=>{const i=t[n];return e(n,i,t)}).reduce((n,i)=>(n[i]=t[i],n),{})}function Nc(t,e){return Oc(t,r=>e.includes(r))}function Lc(){return globalThis.crypto?globalThis.crypto:require("crypto").webcrypto}Lc();class Ke extends Error{}class Ic extends Ke{constructor(e){super(`Invalid DateTime: ${e.toMessage()}`)}}class Pc extends Ke{constructor(e){super(`Invalid Interval: ${e.toMessage()}`)}}class Dc extends Ke{constructor(e){super(`Invalid Duration: ${e.toMessage()}`)}}class at extends Ke{}class ks extends Ke{constructor(e){super(`Invalid unit ${e}`)}}class K extends Ke{}class Ee extends Ke{constructor(){super("Zone is an abstract class")}}const g="numeric",se="short",J="long",Pr={year:g,month:g,day:g},Ms={year:g,month:se,day:g},Vc={year:g,month:se,day:g,weekday:se},Cs={year:g,month:J,day:g},_s={year:g,month:J,day:g,weekday:J},Os={hour:g,minute:g},Ns={hour:g,minute:g,second:g},Ls={hour:g,minute:g,second:g,timeZoneName:se},Is={hour:g,minute:g,second:g,timeZoneName:J},Ps={hour:g,minute:g,hourCycle:"h23"},Ds={hour:g,minute:g,second:g,hourCycle:"h23"},Vs={hour:g,minute:g,second:g,hourCycle:"h23",timeZoneName:se},Hs={hour:g,minute:g,second:g,hourCycle:"h23",timeZoneName:J},Rs={year:g,month:g,day:g,hour:g,minute:g},Fs={year:g,month:g,day:g,hour:g,minute:g,second:g},zs={year:g,month:se,day:g,hour:g,minute:g},Ws={year:g,month:se,day:g,hour:g,minute:g,second:g},Hc={year:g,month:se,day:g,weekday:se,hour:g,minute:g},Us={year:g,month:J,day:g,hour:g,minute:g,timeZoneName:se},Bs={year:g,month:J,day:g,hour:g,minute:g,second:g,timeZoneName:se},js={year:g,month:J,day:g,weekday:J,hour:g,minute:g,timeZoneName:J},Gs={year:g,month:J,day:g,weekday:J,hour:g,minute:g,second:g,timeZoneName:J};class nr{get type(){throw new Ee}get name(){throw new Ee}get ianaName(){return this.name}get isUniversal(){throw new Ee}offsetName(e,r){throw new Ee}formatOffset(e,r){throw new Ee}offset(e){throw new Ee}equals(e){throw new Ee}get isValid(){throw new Ee}}let yn=null;class Kr extends nr{static get instance(){return yn===null&&(yn=new Kr),yn}get type(){return"system"}get name(){return new Intl.DateTimeFormat().resolvedOptions().timeZone}get isUniversal(){return!1}offsetName(e,{format:r,locale:n}){return to(e,r,n)}formatOffset(e,r){return Ft(this.offset(e),r)}offset(e){return-new Date(e).getTimezoneOffset()}equals(e){return e.type==="system"}get isValid(){return!0}}let xr={};function Rc(t){return xr[t]||(xr[t]=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",era:"short"})),xr[t]}const Fc={year:0,month:1,day:2,era:3,hour:4,minute:5,second:6};function zc(t,e){const r=t.format(e).replace(/\u200E/g,""),n=/(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(r),[,i,a,s,o,l,c,u]=n;return[s,i,a,o,l,c,u]}function Wc(t,e){const r=t.formatToParts(e),n=[];for(let i=0;i<r.length;i++){const{type:a,value:s}=r[i],o=Fc[a];a==="era"?n[o]=s:E(o)||(n[o]=parseInt(s,10))}return n}let pr={};class we extends nr{static create(e){return pr[e]||(pr[e]=new we(e)),pr[e]}static resetCache(){pr={},xr={}}static isValidSpecifier(e){return this.isValidZone(e)}static isValidZone(e){if(!e)return!1;try{return new Intl.DateTimeFormat("en-US",{timeZone:e}).format(),!0}catch{return!1}}constructor(e){super(),this.zoneName=e,this.valid=we.isValidZone(e)}get type(){return"iana"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(e,{format:r,locale:n}){return to(e,r,n,this.name)}formatOffset(e,r){return Ft(this.offset(e),r)}offset(e){const r=new Date(e);if(isNaN(r))return NaN;const n=Rc(this.name);let[i,a,s,o,l,c,u]=n.formatToParts?Wc(n,r):zc(n,r);o==="BC"&&(i=-Math.abs(i)+1);const f=Qr({year:i,month:a,day:s,hour:l===24?0:l,minute:c,second:u,millisecond:0});let h=+r;const m=h%1e3;return h-=m>=0?m:1e3+m,(f-h)/(60*1e3)}equals(e){return e.type==="iana"&&e.name===this.name}get isValid(){return this.valid}}let na={};function Uc(t,e={}){const r=JSON.stringify([t,e]);let n=na[r];return n||(n=new Intl.ListFormat(t,e),na[r]=n),n}let Bn={};function jn(t,e={}){const r=JSON.stringify([t,e]);let n=Bn[r];return n||(n=new Intl.DateTimeFormat(t,e),Bn[r]=n),n}let Gn={};function Bc(t,e={}){const r=JSON.stringify([t,e]);let n=Gn[r];return n||(n=new Intl.NumberFormat(t,e),Gn[r]=n),n}let Zn={};function jc(t,e={}){const{base:r,...n}=e,i=JSON.stringify([t,n]);let a=Zn[i];return a||(a=new Intl.RelativeTimeFormat(t,e),Zn[i]=a),a}let Vt=null;function Gc(){return Vt||(Vt=new Intl.DateTimeFormat().resolvedOptions().locale,Vt)}let ia={};function Zc(t){let e=ia[t];if(!e){const r=new Intl.Locale(t);e="getWeekInfo"in r?r.getWeekInfo():r.weekInfo,ia[t]=e}return e}function qc(t){const e=t.indexOf("-x-");e!==-1&&(t=t.substring(0,e));const r=t.indexOf("-u-");if(r===-1)return[t];{let n,i;try{n=jn(t).resolvedOptions(),i=t}catch{const l=t.substring(0,r);n=jn(l).resolvedOptions(),i=l}const{numberingSystem:a,calendar:s}=n;return[i,a,s]}}function Yc(t,e,r){return(r||e)&&(t.includes("-u-")||(t+="-u"),r&&(t+=`-ca-${r}`),e&&(t+=`-nu-${e}`)),t}function Kc(t){const e=[];for(let r=1;r<=12;r++){const n=T.utc(2009,r,1);e.push(t(n))}return e}function Jc(t){const e=[];for(let r=1;r<=7;r++){const n=T.utc(2016,11,13+r);e.push(t(n))}return e}function gr(t,e,r,n){const i=t.listingMode();return i==="error"?null:i==="en"?r(e):n(e)}function Qc(t){return t.numberingSystem&&t.numberingSystem!=="latn"?!1:t.numberingSystem==="latn"||!t.locale||t.locale.startsWith("en")||new Intl.DateTimeFormat(t.intl).resolvedOptions().numberingSystem==="latn"}class Xc{constructor(e,r,n){this.padTo=n.padTo||0,this.floor=n.floor||!1;const{padTo:i,floor:a,...s}=n;if(!r||Object.keys(s).length>0){const o={useGrouping:!1,...n};n.padTo>0&&(o.minimumIntegerDigits=n.padTo),this.inf=Bc(e,o)}}format(e){if(this.inf){const r=this.floor?Math.floor(e):e;return this.inf.format(r)}else{const r=this.floor?Math.floor(e):vi(e,3);return R(r,this.padTo)}}}class eu{constructor(e,r,n){this.opts=n,this.originalZone=void 0;let i;if(this.opts.timeZone)this.dt=e;else if(e.zone.type==="fixed"){const s=-1*(e.offset/60),o=s>=0?`Etc/GMT+${s}`:`Etc/GMT${s}`;e.offset!==0&&we.create(o).valid?(i=o,this.dt=e):(i="UTC",this.dt=e.offset===0?e:e.setZone("UTC").plus({minutes:e.offset}),this.originalZone=e.zone)}else e.zone.type==="system"?this.dt=e:e.zone.type==="iana"?(this.dt=e,i=e.zone.name):(i="UTC",this.dt=e.setZone("UTC").plus({minutes:e.offset}),this.originalZone=e.zone);const a={...this.opts};a.timeZone=a.timeZone||i,this.dtf=jn(r,a)}format(){return this.originalZone?this.formatToParts().map(({value:e})=>e).join(""):this.dtf.format(this.dt.toJSDate())}formatToParts(){const e=this.dtf.formatToParts(this.dt.toJSDate());return this.originalZone?e.map(r=>{if(r.type==="timeZoneName"){const n=this.originalZone.offsetName(this.dt.ts,{locale:this.dt.locale,format:this.opts.timeZoneName});return{...r,value:n}}else return r}):e}resolvedOptions(){return this.dtf.resolvedOptions()}}class tu{constructor(e,r,n){this.opts={style:"long",...n},!r&&Xs()&&(this.rtf=jc(e,n))}format(e,r){return this.rtf?this.rtf.format(e,r):Eu(r,e,this.opts.numeric,this.opts.style!=="long")}formatToParts(e,r){return this.rtf?this.rtf.formatToParts(e,r):[]}}const ru={firstDay:1,minimalDays:4,weekend:[6,7]};class _{static fromOpts(e){return _.create(e.locale,e.numberingSystem,e.outputCalendar,e.weekSettings,e.defaultToEN)}static create(e,r,n,i,a=!1){const s=e||P.defaultLocale,o=s||(a?"en-US":Gc()),l=r||P.defaultNumberingSystem,c=n||P.defaultOutputCalendar,u=qn(i)||P.defaultWeekSettings;return new _(o,l,c,u,s)}static resetCache(){Vt=null,Bn={},Gn={},Zn={}}static fromObject({locale:e,numberingSystem:r,outputCalendar:n,weekSettings:i}={}){return _.create(e,r,n,i)}constructor(e,r,n,i,a){const[s,o,l]=qc(e);this.locale=s,this.numberingSystem=r||o||null,this.outputCalendar=n||l||null,this.weekSettings=i,this.intl=Yc(this.locale,this.numberingSystem,this.outputCalendar),this.weekdaysCache={format:{},standalone:{}},this.monthsCache={format:{},standalone:{}},this.meridiemCache=null,this.eraCache={},this.specifiedLocale=a,this.fastNumbersCached=null}get fastNumbers(){return this.fastNumbersCached==null&&(this.fastNumbersCached=Qc(this)),this.fastNumbersCached}listingMode(){const e=this.isEnglish(),r=(this.numberingSystem===null||this.numberingSystem==="latn")&&(this.outputCalendar===null||this.outputCalendar==="gregory");return e&&r?"en":"intl"}clone(e){return!e||Object.getOwnPropertyNames(e).length===0?this:_.create(e.locale||this.specifiedLocale,e.numberingSystem||this.numberingSystem,e.outputCalendar||this.outputCalendar,qn(e.weekSettings)||this.weekSettings,e.defaultToEN||!1)}redefaultToEN(e={}){return this.clone({...e,defaultToEN:!0})}redefaultToSystem(e={}){return this.clone({...e,defaultToEN:!1})}months(e,r=!1){return gr(this,e,io,()=>{const n=r?{month:e,day:"numeric"}:{month:e},i=r?"format":"standalone";return this.monthsCache[i][e]||(this.monthsCache[i][e]=Kc(a=>this.extract(a,n,"month"))),this.monthsCache[i][e]})}weekdays(e,r=!1){return gr(this,e,oo,()=>{const n=r?{weekday:e,year:"numeric",month:"long",day:"numeric"}:{weekday:e},i=r?"format":"standalone";return this.weekdaysCache[i][e]||(this.weekdaysCache[i][e]=Jc(a=>this.extract(a,n,"weekday"))),this.weekdaysCache[i][e]})}meridiems(){return gr(this,void 0,()=>lo,()=>{if(!this.meridiemCache){const e={hour:"numeric",hourCycle:"h12"};this.meridiemCache=[T.utc(2016,11,13,9),T.utc(2016,11,13,19)].map(r=>this.extract(r,e,"dayperiod"))}return this.meridiemCache})}eras(e){return gr(this,e,co,()=>{const r={era:e};return this.eraCache[e]||(this.eraCache[e]=[T.utc(-40,1,1),T.utc(2017,1,1)].map(n=>this.extract(n,r,"era"))),this.eraCache[e]})}extract(e,r,n){const i=this.dtFormatter(e,r),a=i.formatToParts(),s=a.find(o=>o.type.toLowerCase()===n);return s?s.value:null}numberFormatter(e={}){return new Xc(this.intl,e.forceSimple||this.fastNumbers,e)}dtFormatter(e,r={}){return new eu(e,this.intl,r)}relFormatter(e={}){return new tu(this.intl,this.isEnglish(),e)}listFormatter(e={}){return Uc(this.intl,e)}isEnglish(){return this.locale==="en"||this.locale.toLowerCase()==="en-us"||new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us")}getWeekSettings(){return this.weekSettings?this.weekSettings:eo()?Zc(this.locale):ru}getStartOfWeek(){return this.getWeekSettings().firstDay}getMinDaysInFirstWeek(){return this.getWeekSettings().minimalDays}getWeekendDays(){return this.getWeekSettings().weekend}equals(e){return this.locale===e.locale&&this.numberingSystem===e.numberingSystem&&this.outputCalendar===e.outputCalendar}}let vn=null;class Z extends nr{static get utcInstance(){return vn===null&&(vn=new Z(0)),vn}static instance(e){return e===0?Z.utcInstance:new Z(e)}static parseSpecifier(e){if(e){const r=e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);if(r)return new Z(Xr(r[1],r[2]))}return null}constructor(e){super(),this.fixed=e}get type(){return"fixed"}get name(){return this.fixed===0?"UTC":`UTC${Ft(this.fixed,"narrow")}`}get ianaName(){return this.fixed===0?"Etc/UTC":`Etc/GMT${Ft(-this.fixed,"narrow")}`}offsetName(){return this.name}formatOffset(e,r){return Ft(this.fixed,r)}get isUniversal(){return!0}offset(){return this.fixed}equals(e){return e.type==="fixed"&&e.fixed===this.fixed}get isValid(){return!0}}class nu extends nr{constructor(e){super(),this.zoneName=e}get type(){return"invalid"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(){return null}formatOffset(){return""}offset(){return NaN}equals(){return!1}get isValid(){return!1}}function Se(t,e){if(E(t)||t===null)return e;if(t instanceof nr)return t;if(su(t)){const r=t.toLowerCase();return r==="default"?e:r==="local"||r==="system"?Kr.instance:r==="utc"||r==="gmt"?Z.utcInstance:Z.parseSpecifier(r)||we.create(t)}else return Fe(t)?Z.instance(t):typeof t=="object"&&"offset"in t&&typeof t.offset=="function"?t:new nu(t)}let aa=()=>Date.now(),sa="system",oa=null,la=null,ca=null,ua=60,da,fa=null;class P{static get now(){return aa}static set now(e){aa=e}static set defaultZone(e){sa=e}static get defaultZone(){return Se(sa,Kr.instance)}static get defaultLocale(){return oa}static set defaultLocale(e){oa=e}static get defaultNumberingSystem(){return la}static set defaultNumberingSystem(e){la=e}static get defaultOutputCalendar(){return ca}static set defaultOutputCalendar(e){ca=e}static get defaultWeekSettings(){return fa}static set defaultWeekSettings(e){fa=qn(e)}static get twoDigitCutoffYear(){return ua}static set twoDigitCutoffYear(e){ua=e%100}static get throwOnInvalid(){return da}static set throwOnInvalid(e){da=e}static resetCaches(){_.resetCache(),we.resetCache()}}class ae{constructor(e,r){this.reason=e,this.explanation=r}toMessage(){return this.explanation?`${this.reason}: ${this.explanation}`:this.reason}}const Zs=[0,31,59,90,120,151,181,212,243,273,304,334],qs=[0,31,60,91,121,152,182,213,244,274,305,335];function ee(t,e){return new ae("unit out of range",`you specified ${e} (of type ${typeof e}) as a ${t}, which is invalid`)}function gi(t,e,r){const n=new Date(Date.UTC(t,e-1,r));t<100&&t>=0&&n.setUTCFullYear(n.getUTCFullYear()-1900);const i=n.getUTCDay();return i===0?7:i}function Ys(t,e,r){return r+(ir(t)?qs:Zs)[e-1]}function Ks(t,e){const r=ir(t)?qs:Zs,n=r.findIndex(a=>a<e),i=e-r[n];return{month:n+1,day:i}}function wi(t,e){return(t-e+7)%7+1}function Dr(t,e=4,r=1){const{year:n,month:i,day:a}=t,s=Ys(n,i,a),o=wi(gi(n,i,a),r);let l=Math.floor((s-o+14-e)/7),c;return l<1?(c=n-1,l=Gt(c,e,r)):l>Gt(n,e,r)?(c=n+1,l=1):c=n,{weekYear:c,weekNumber:l,weekday:o,...en(t)}}function ha(t,e=4,r=1){const{weekYear:n,weekNumber:i,weekday:a}=t,s=wi(gi(n,1,e),r),o=ot(n);let l=i*7+a-s-7+e,c;l<1?(c=n-1,l+=ot(c)):l>o?(c=n+1,l-=ot(n)):c=n;const{month:u,day:d}=Ks(c,l);return{year:c,month:u,day:d,...en(t)}}function bn(t){const{year:e,month:r,day:n}=t,i=Ys(e,r,n);return{year:e,ordinal:i,...en(t)}}function ma(t){const{year:e,ordinal:r}=t,{month:n,day:i}=Ks(e,r);return{year:e,month:n,day:i,...en(t)}}function pa(t,e){if(!E(t.localWeekday)||!E(t.localWeekNumber)||!E(t.localWeekYear)){if(!E(t.weekday)||!E(t.weekNumber)||!E(t.weekYear))throw new at("Cannot mix locale-based week fields with ISO-based week fields");return E(t.localWeekday)||(t.weekday=t.localWeekday),E(t.localWeekNumber)||(t.weekNumber=t.localWeekNumber),E(t.localWeekYear)||(t.weekYear=t.localWeekYear),delete t.localWeekday,delete t.localWeekNumber,delete t.localWeekYear,{minDaysInFirstWeek:e.getMinDaysInFirstWeek(),startOfWeek:e.getStartOfWeek()}}else return{minDaysInFirstWeek:4,startOfWeek:1}}function iu(t,e=4,r=1){const n=Jr(t.weekYear),i=te(t.weekNumber,1,Gt(t.weekYear,e,r)),a=te(t.weekday,1,7);return n?i?a?!1:ee("weekday",t.weekday):ee("week",t.weekNumber):ee("weekYear",t.weekYear)}function au(t){const e=Jr(t.year),r=te(t.ordinal,1,ot(t.year));return e?r?!1:ee("ordinal",t.ordinal):ee("year",t.year)}function Js(t){const e=Jr(t.year),r=te(t.month,1,12),n=te(t.day,1,Vr(t.year,t.month));return e?r?n?!1:ee("day",t.day):ee("month",t.month):ee("year",t.year)}function Qs(t){const{hour:e,minute:r,second:n,millisecond:i}=t,a=te(e,0,23)||e===24&&r===0&&n===0&&i===0,s=te(r,0,59),o=te(n,0,59),l=te(i,0,999);return a?s?o?l?!1:ee("millisecond",i):ee("second",n):ee("minute",r):ee("hour",e)}function E(t){return typeof t>"u"}function Fe(t){return typeof t=="number"}function Jr(t){return typeof t=="number"&&t%1===0}function su(t){return typeof t=="string"}function ou(t){return Object.prototype.toString.call(t)==="[object Date]"}function Xs(){try{return typeof Intl<"u"&&!!Intl.RelativeTimeFormat}catch{return!1}}function eo(){try{return typeof Intl<"u"&&!!Intl.Locale&&("weekInfo"in Intl.Locale.prototype||"getWeekInfo"in Intl.Locale.prototype)}catch{return!1}}function lu(t){return Array.isArray(t)?t:[t]}function ga(t,e,r){if(t.length!==0)return t.reduce((n,i)=>{const a=[e(i),i];return n&&r(n[0],a[0])===n[0]?n:a},null)[1]}function cu(t,e){return e.reduce((r,n)=>(r[n]=t[n],r),{})}function pt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function qn(t){if(t==null)return null;if(typeof t!="object")throw new K("Week settings must be an object");if(!te(t.firstDay,1,7)||!te(t.minimalDays,1,7)||!Array.isArray(t.weekend)||t.weekend.some(e=>!te(e,1,7)))throw new K("Invalid week settings");return{firstDay:t.firstDay,minimalDays:t.minimalDays,weekend:Array.from(t.weekend)}}function te(t,e,r){return Jr(t)&&t>=e&&t<=r}function uu(t,e){return t-e*Math.floor(t/e)}function R(t,e=2){const r=t<0;let n;return r?n="-"+(""+-t).padStart(e,"0"):n=(""+t).padStart(e,"0"),n}function Te(t){if(!(E(t)||t===null||t===""))return parseInt(t,10)}function Ce(t){if(!(E(t)||t===null||t===""))return parseFloat(t)}function yi(t){if(!(E(t)||t===null||t==="")){const e=parseFloat("0."+t)*1e3;return Math.floor(e)}}function vi(t,e,r=!1){const n=10**e;return(r?Math.trunc:Math.round)(t*n)/n}function ir(t){return t%4===0&&(t%100!==0||t%400===0)}function ot(t){return ir(t)?366:365}function Vr(t,e){const r=uu(e-1,12)+1,n=t+(e-r)/12;return r===2?ir(n)?29:28:[31,null,31,30,31,30,31,31,30,31,30,31][r-1]}function Qr(t){let e=Date.UTC(t.year,t.month-1,t.day,t.hour,t.minute,t.second,t.millisecond);return t.year<100&&t.year>=0&&(e=new Date(e),e.setUTCFullYear(t.year,t.month-1,t.day)),+e}function wa(t,e,r){return-wi(gi(t,1,e),r)+e-1}function Gt(t,e=4,r=1){const n=wa(t,e,r),i=wa(t+1,e,r);return(ot(t)-n+i)/7}function Yn(t){return t>99?t:t>P.twoDigitCutoffYear?1900+t:2e3+t}function to(t,e,r,n=null){const i=new Date(t),a={hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"};n&&(a.timeZone=n);const s={timeZoneName:e,...a},o=new Intl.DateTimeFormat(r,s).formatToParts(i).find(l=>l.type.toLowerCase()==="timezonename");return o?o.value:null}function Xr(t,e){let r=parseInt(t,10);Number.isNaN(r)&&(r=0);const n=parseInt(e,10)||0,i=r<0||Object.is(r,-0)?-n:n;return r*60+i}function ro(t){const e=Number(t);if(typeof t=="boolean"||t===""||Number.isNaN(e))throw new K(`Invalid unit value ${t}`);return e}function Hr(t,e){const r={};for(const n in t)if(pt(t,n)){const i=t[n];if(i==null)continue;r[e(n)]=ro(i)}return r}function Ft(t,e){const r=Math.trunc(Math.abs(t/60)),n=Math.trunc(Math.abs(t%60)),i=t>=0?"+":"-";switch(e){case"short":return`${i}${R(r,2)}:${R(n,2)}`;case"narrow":return`${i}${r}${n>0?`:${n}`:""}`;case"techie":return`${i}${R(r,2)}${R(n,2)}`;default:throw new RangeError(`Value format ${e} is out of range for property format`)}}function en(t){return cu(t,["hour","minute","second","millisecond"])}const du=["January","February","March","April","May","June","July","August","September","October","November","December"],no=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],fu=["J","F","M","A","M","J","J","A","S","O","N","D"];function io(t){switch(t){case"narrow":return[...fu];case"short":return[...no];case"long":return[...du];case"numeric":return["1","2","3","4","5","6","7","8","9","10","11","12"];case"2-digit":return["01","02","03","04","05","06","07","08","09","10","11","12"];default:return null}}const ao=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],so=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],hu=["M","T","W","T","F","S","S"];function oo(t){switch(t){case"narrow":return[...hu];case"short":return[...so];case"long":return[...ao];case"numeric":return["1","2","3","4","5","6","7"];default:return null}}const lo=["AM","PM"],mu=["Before Christ","Anno Domini"],pu=["BC","AD"],gu=["B","A"];function co(t){switch(t){case"narrow":return[...gu];case"short":return[...pu];case"long":return[...mu];default:return null}}function wu(t){return lo[t.hour<12?0:1]}function yu(t,e){return oo(e)[t.weekday-1]}function vu(t,e){return io(e)[t.month-1]}function bu(t,e){return co(e)[t.year<0?0:1]}function Eu(t,e,r="always",n=!1){const i={years:["year","yr."],quarters:["quarter","qtr."],months:["month","mo."],weeks:["week","wk."],days:["day","day","days"],hours:["hour","hr."],minutes:["minute","min."],seconds:["second","sec."]},a=["hours","minutes","seconds"].indexOf(t)===-1;if(r==="auto"&&a){const d=t==="days";switch(e){case 1:return d?"tomorrow":`next ${i[t][0]}`;case-1:return d?"yesterday":`last ${i[t][0]}`;case 0:return d?"today":`this ${i[t][0]}`}}const s=Object.is(e,-0)||e<0,o=Math.abs(e),l=o===1,c=i[t],u=n?l?c[1]:c[2]||c[1]:l?i[t][0]:t;return s?`${o} ${u} ago`:`in ${o} ${u}`}function ya(t,e){let r="";for(const n of t)n.literal?r+=n.val:r+=e(n.val);return r}const $u={D:Pr,DD:Ms,DDD:Cs,DDDD:_s,t:Os,tt:Ns,ttt:Ls,tttt:Is,T:Ps,TT:Ds,TTT:Vs,TTTT:Hs,f:Rs,ff:zs,fff:Us,ffff:js,F:Fs,FF:Ws,FFF:Bs,FFFF:Gs};class B{static create(e,r={}){return new B(e,r)}static parseFormat(e){let r=null,n="",i=!1;const a=[];for(let s=0;s<e.length;s++){const o=e.charAt(s);o==="'"?(n.length>0&&a.push({literal:i||/^\s+$/.test(n),val:n}),r=null,n="",i=!i):i||o===r?n+=o:(n.length>0&&a.push({literal:/^\s+$/.test(n),val:n}),n=o,r=o)}return n.length>0&&a.push({literal:i||/^\s+$/.test(n),val:n}),a}static macroTokenToFormatOpts(e){return $u[e]}constructor(e,r){this.opts=r,this.loc=e,this.systemLoc=null}formatWithSystemDefault(e,r){return this.systemLoc===null&&(this.systemLoc=this.loc.redefaultToSystem()),this.systemLoc.dtFormatter(e,{...this.opts,...r}).format()}dtFormatter(e,r={}){return this.loc.dtFormatter(e,{...this.opts,...r})}formatDateTime(e,r){return this.dtFormatter(e,r).format()}formatDateTimeParts(e,r){return this.dtFormatter(e,r).formatToParts()}formatInterval(e,r){return this.dtFormatter(e.start,r).dtf.formatRange(e.start.toJSDate(),e.end.toJSDate())}resolvedOptions(e,r){return this.dtFormatter(e,r).resolvedOptions()}num(e,r=0){if(this.opts.forceSimple)return R(e,r);const n={...this.opts};return r>0&&(n.padTo=r),this.loc.numberFormatter(n).format(e)}formatDateTimeFromString(e,r){const n=this.loc.listingMode()==="en",i=this.loc.outputCalendar&&this.loc.outputCalendar!=="gregory",a=(h,m)=>this.loc.extract(e,h,m),s=h=>e.isOffsetFixed&&e.offset===0&&h.allowZ?"Z":e.isValid?e.zone.formatOffset(e.ts,h.format):"",o=()=>n?wu(e):a({hour:"numeric",hourCycle:"h12"},"dayperiod"),l=(h,m)=>n?vu(e,h):a(m?{month:h}:{month:h,day:"numeric"},"month"),c=(h,m)=>n?yu(e,h):a(m?{weekday:h}:{weekday:h,month:"long",day:"numeric"},"weekday"),u=h=>{const m=B.macroTokenToFormatOpts(h);return m?this.formatWithSystemDefault(e,m):h},d=h=>n?bu(e,h):a({era:h},"era"),f=h=>{switch(h){case"S":return this.num(e.millisecond);case"u":case"SSS":return this.num(e.millisecond,3);case"s":return this.num(e.second);case"ss":return this.num(e.second,2);case"uu":return this.num(Math.floor(e.millisecond/10),2);case"uuu":return this.num(Math.floor(e.millisecond/100));case"m":return this.num(e.minute);case"mm":return this.num(e.minute,2);case"h":return this.num(e.hour%12===0?12:e.hour%12);case"hh":return this.num(e.hour%12===0?12:e.hour%12,2);case"H":return this.num(e.hour);case"HH":return this.num(e.hour,2);case"Z":return s({format:"narrow",allowZ:this.opts.allowZ});case"ZZ":return s({format:"short",allowZ:this.opts.allowZ});case"ZZZ":return s({format:"techie",allowZ:this.opts.allowZ});case"ZZZZ":return e.zone.offsetName(e.ts,{format:"short",locale:this.loc.locale});case"ZZZZZ":return e.zone.offsetName(e.ts,{format:"long",locale:this.loc.locale});case"z":return e.zoneName;case"a":return o();case"d":return i?a({day:"numeric"},"day"):this.num(e.day);case"dd":return i?a({day:"2-digit"},"day"):this.num(e.day,2);case"c":return this.num(e.weekday);case"ccc":return c("short",!0);case"cccc":return c("long",!0);case"ccccc":return c("narrow",!0);case"E":return this.num(e.weekday);case"EEE":return c("short",!1);case"EEEE":return c("long",!1);case"EEEEE":return c("narrow",!1);case"L":return i?a({month:"numeric",day:"numeric"},"month"):this.num(e.month);case"LL":return i?a({month:"2-digit",day:"numeric"},"month"):this.num(e.month,2);case"LLL":return l("short",!0);case"LLLL":return l("long",!0);case"LLLLL":return l("narrow",!0);case"M":return i?a({month:"numeric"},"month"):this.num(e.month);case"MM":return i?a({month:"2-digit"},"month"):this.num(e.month,2);case"MMM":return l("short",!1);case"MMMM":return l("long",!1);case"MMMMM":return l("narrow",!1);case"y":return i?a({year:"numeric"},"year"):this.num(e.year);case"yy":return i?a({year:"2-digit"},"year"):this.num(e.year.toString().slice(-2),2);case"yyyy":return i?a({year:"numeric"},"year"):this.num(e.year,4);case"yyyyyy":return i?a({year:"numeric"},"year"):this.num(e.year,6);case"G":return d("short");case"GG":return d("long");case"GGGGG":return d("narrow");case"kk":return this.num(e.weekYear.toString().slice(-2),2);case"kkkk":return this.num(e.weekYear,4);case"W":return this.num(e.weekNumber);case"WW":return this.num(e.weekNumber,2);case"n":return this.num(e.localWeekNumber);case"nn":return this.num(e.localWeekNumber,2);case"ii":return this.num(e.localWeekYear.toString().slice(-2),2);case"iiii":return this.num(e.localWeekYear,4);case"o":return this.num(e.ordinal);case"ooo":return this.num(e.ordinal,3);case"q":return this.num(e.quarter);case"qq":return this.num(e.quarter,2);case"X":return this.num(Math.floor(e.ts/1e3));case"x":return this.num(e.ts);default:return u(h)}};return ya(B.parseFormat(r),f)}formatDurationFromString(e,r){const n=l=>{switch(l[0]){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":return"hour";case"d":return"day";case"w":return"week";case"M":return"month";case"y":return"year";default:return null}},i=l=>c=>{const u=n(c);return u?this.num(l.get(u),c.length):c},a=B.parseFormat(r),s=a.reduce((l,{literal:c,val:u})=>c?l:l.concat(u),[]),o=e.shiftTo(...s.map(n).filter(l=>l));return ya(a,i(o))}}const uo=/[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;function $t(...t){const e=t.reduce((r,n)=>r+n.source,"");return RegExp(`^${e}$`)}function Tt(...t){return e=>t.reduce(([r,n,i],a)=>{const[s,o,l]=a(e,i);return[{...r,...s},o||n,l]},[{},null,1]).slice(0,2)}function St(t,...e){if(t==null)return[null,null];for(const[r,n]of e){const i=r.exec(t);if(i)return n(i)}return[null,null]}function fo(...t){return(e,r)=>{const n={};let i;for(i=0;i<t.length;i++)n[t[i]]=Te(e[r+i]);return[n,null,r+i]}}const ho=/(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,Tu=`(?:${ho.source}?(?:\\[(${uo.source})\\])?)?`,bi=/(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,mo=RegExp(`${bi.source}${Tu}`),Ei=RegExp(`(?:T${mo.source})?`),Su=/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,Au=/(\d{4})-?W(\d\d)(?:-?(\d))?/,xu=/(\d{4})-?(\d{3})/,ku=fo("weekYear","weekNumber","weekDay"),Mu=fo("year","ordinal"),Cu=/(\d{4})-(\d\d)-(\d\d)/,po=RegExp(`${bi.source} ?(?:${ho.source}|(${uo.source}))?`),_u=RegExp(`(?: ${po.source})?`);function lt(t,e,r){const n=t[e];return E(n)?r:Te(n)}function Ou(t,e){return[{year:lt(t,e),month:lt(t,e+1,1),day:lt(t,e+2,1)},null,e+3]}function At(t,e){return[{hours:lt(t,e,0),minutes:lt(t,e+1,0),seconds:lt(t,e+2,0),milliseconds:yi(t[e+3])},null,e+4]}function ar(t,e){const r=!t[e]&&!t[e+1],n=Xr(t[e+1],t[e+2]),i=r?null:Z.instance(n);return[{},i,e+3]}function sr(t,e){const r=t[e]?we.create(t[e]):null;return[{},r,e+1]}const Nu=RegExp(`^T?${bi.source}$`),Lu=/^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;function Iu(t){const[e,r,n,i,a,s,o,l,c]=t,u=e[0]==="-",d=l&&l[0]==="-",f=(h,m=!1)=>h!==void 0&&(m||h&&u)?-h:h;return[{years:f(Ce(r)),months:f(Ce(n)),weeks:f(Ce(i)),days:f(Ce(a)),hours:f(Ce(s)),minutes:f(Ce(o)),seconds:f(Ce(l),l==="-0"),milliseconds:f(yi(c),d)}]}const Pu={GMT:0,EDT:-4*60,EST:-5*60,CDT:-5*60,CST:-6*60,MDT:-6*60,MST:-7*60,PDT:-7*60,PST:-8*60};function $i(t,e,r,n,i,a,s){const o={year:e.length===2?Yn(Te(e)):Te(e),month:no.indexOf(r)+1,day:Te(n),hour:Te(i),minute:Te(a)};return s&&(o.second=Te(s)),t&&(o.weekday=t.length>3?ao.indexOf(t)+1:so.indexOf(t)+1),o}const Du=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;function Vu(t){const[,e,r,n,i,a,s,o,l,c,u,d]=t,f=$i(e,i,n,r,a,s,o);let h;return l?h=Pu[l]:c?h=0:h=Xr(u,d),[f,new Z(h)]}function Hu(t){return t.replace(/\([^()]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").trim()}const Ru=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,Fu=/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,zu=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;function va(t){const[,e,r,n,i,a,s,o]=t;return[$i(e,i,n,r,a,s,o),Z.utcInstance]}function Wu(t){const[,e,r,n,i,a,s,o]=t;return[$i(e,o,r,n,i,a,s),Z.utcInstance]}const Uu=$t(Su,Ei),Bu=$t(Au,Ei),ju=$t(xu,Ei),Gu=$t(mo),go=Tt(Ou,At,ar,sr),Zu=Tt(ku,At,ar,sr),qu=Tt(Mu,At,ar,sr),Yu=Tt(At,ar,sr);function Ku(t){return St(t,[Uu,go],[Bu,Zu],[ju,qu],[Gu,Yu])}function Ju(t){return St(Hu(t),[Du,Vu])}function Qu(t){return St(t,[Ru,va],[Fu,va],[zu,Wu])}function Xu(t){return St(t,[Lu,Iu])}const ed=Tt(At);function td(t){return St(t,[Nu,ed])}const rd=$t(Cu,_u),nd=$t(po),id=Tt(At,ar,sr);function ad(t){return St(t,[rd,go],[nd,id])}const ba="Invalid Duration",wo={weeks:{days:7,hours:7*24,minutes:7*24*60,seconds:7*24*60*60,milliseconds:7*24*60*60*1e3},days:{hours:24,minutes:24*60,seconds:24*60*60,milliseconds:24*60*60*1e3},hours:{minutes:60,seconds:60*60,milliseconds:60*60*1e3},minutes:{seconds:60,milliseconds:60*1e3},seconds:{milliseconds:1e3}},sd={years:{quarters:4,months:12,weeks:52,days:365,hours:365*24,minutes:365*24*60,seconds:365*24*60*60,milliseconds:365*24*60*60*1e3},quarters:{months:3,weeks:13,days:91,hours:91*24,minutes:91*24*60,seconds:91*24*60*60,milliseconds:91*24*60*60*1e3},months:{weeks:4,days:30,hours:30*24,minutes:30*24*60,seconds:30*24*60*60,milliseconds:30*24*60*60*1e3},...wo},Q=146097/400,tt=146097/4800,od={years:{quarters:4,months:12,weeks:Q/7,days:Q,hours:Q*24,minutes:Q*24*60,seconds:Q*24*60*60,milliseconds:Q*24*60*60*1e3},quarters:{months:3,weeks:Q/28,days:Q/4,hours:Q*24/4,minutes:Q*24*60/4,seconds:Q*24*60*60/4,milliseconds:Q*24*60*60*1e3/4},months:{weeks:tt/7,days:tt,hours:tt*24,minutes:tt*24*60,seconds:tt*24*60*60,milliseconds:tt*24*60*60*1e3},...wo},Ve=["years","quarters","months","weeks","days","hours","minutes","seconds","milliseconds"],ld=Ve.slice(0).reverse();function $e(t,e,r=!1){const n={values:r?e.values:{...t.values,...e.values||{}},loc:t.loc.clone(e.loc),conversionAccuracy:e.conversionAccuracy||t.conversionAccuracy,matrix:e.matrix||t.matrix};return new k(n)}function yo(t,e){let r=e.milliseconds??0;for(const n of ld.slice(1))e[n]&&(r+=e[n]*t[n].milliseconds);return r}function Ea(t,e){const r=yo(t,e)<0?-1:1;Ve.reduceRight((n,i)=>{if(E(e[i]))return n;if(n){const a=e[n]*r,s=t[i][n],o=Math.floor(a/s);e[i]+=o*r,e[n]-=o*s*r}return i},null),Ve.reduce((n,i)=>{if(E(e[i]))return n;if(n){const a=e[n]%1;e[n]-=a,e[i]+=a*t[n][i]}return i},null)}function cd(t){const e={};for(const[r,n]of Object.entries(t))n!==0&&(e[r]=n);return e}class k{constructor(e){const r=e.conversionAccuracy==="longterm"||!1;let n=r?od:sd;e.matrix&&(n=e.matrix),this.values=e.values,this.loc=e.loc||_.create(),this.conversionAccuracy=r?"longterm":"casual",this.invalid=e.invalid||null,this.matrix=n,this.isLuxonDuration=!0}static fromMillis(e,r){return k.fromObject({milliseconds:e},r)}static fromObject(e,r={}){if(e==null||typeof e!="object")throw new K(`Duration.fromObject: argument expected to be an object, got ${e===null?"null":typeof e}`);return new k({values:Hr(e,k.normalizeUnit),loc:_.fromObject(r),conversionAccuracy:r.conversionAccuracy,matrix:r.matrix})}static fromDurationLike(e){if(Fe(e))return k.fromMillis(e);if(k.isDuration(e))return e;if(typeof e=="object")return k.fromObject(e);throw new K(`Unknown duration argument ${e} of type ${typeof e}`)}static fromISO(e,r){const[n]=Xu(e);return n?k.fromObject(n,r):k.invalid("unparsable",`the input "${e}" can't be parsed as ISO 8601`)}static fromISOTime(e,r){const[n]=td(e);return n?k.fromObject(n,r):k.invalid("unparsable",`the input "${e}" can't be parsed as ISO 8601`)}static invalid(e,r=null){if(!e)throw new K("need to specify a reason the Duration is invalid");const n=e instanceof ae?e:new ae(e,r);if(P.throwOnInvalid)throw new Dc(n);return new k({invalid:n})}static normalizeUnit(e){const r={year:"years",years:"years",quarter:"quarters",quarters:"quarters",month:"months",months:"months",week:"weeks",weeks:"weeks",day:"days",days:"days",hour:"hours",hours:"hours",minute:"minutes",minutes:"minutes",second:"seconds",seconds:"seconds",millisecond:"milliseconds",milliseconds:"milliseconds"}[e&&e.toLowerCase()];if(!r)throw new ks(e);return r}static isDuration(e){return e&&e.isLuxonDuration||!1}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}toFormat(e,r={}){const n={...r,floor:r.round!==!1&&r.floor!==!1};return this.isValid?B.create(this.loc,n).formatDurationFromString(this,e):ba}toHuman(e={}){if(!this.isValid)return ba;const r=Ve.map(n=>{const i=this.values[n];return E(i)?null:this.loc.numberFormatter({style:"unit",unitDisplay:"long",...e,unit:n.slice(0,-1)}).format(i)}).filter(n=>n);return this.loc.listFormatter({type:"conjunction",style:e.listStyle||"narrow",...e}).format(r)}toObject(){return this.isValid?{...this.values}:{}}toISO(){if(!this.isValid)return null;let e="P";return this.years!==0&&(e+=this.years+"Y"),(this.months!==0||this.quarters!==0)&&(e+=this.months+this.quarters*3+"M"),this.weeks!==0&&(e+=this.weeks+"W"),this.days!==0&&(e+=this.days+"D"),(this.hours!==0||this.minutes!==0||this.seconds!==0||this.milliseconds!==0)&&(e+="T"),this.hours!==0&&(e+=this.hours+"H"),this.minutes!==0&&(e+=this.minutes+"M"),(this.seconds!==0||this.milliseconds!==0)&&(e+=vi(this.seconds+this.milliseconds/1e3,3)+"S"),e==="P"&&(e+="T0S"),e}toISOTime(e={}){if(!this.isValid)return null;const r=this.toMillis();return r<0||r>=864e5?null:(e={suppressMilliseconds:!1,suppressSeconds:!1,includePrefix:!1,format:"extended",...e,includeOffset:!1},T.fromMillis(r,{zone:"UTC"}).toISOTime(e))}toJSON(){return this.toISO()}toString(){return this.toISO()}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Duration { values: ${JSON.stringify(this.values)} }`:`Duration { Invalid, reason: ${this.invalidReason} }`}toMillis(){return this.isValid?yo(this.matrix,this.values):NaN}valueOf(){return this.toMillis()}plus(e){if(!this.isValid)return this;const r=k.fromDurationLike(e),n={};for(const i of Ve)(pt(r.values,i)||pt(this.values,i))&&(n[i]=r.get(i)+this.get(i));return $e(this,{values:n},!0)}minus(e){if(!this.isValid)return this;const r=k.fromDurationLike(e);return this.plus(r.negate())}mapUnits(e){if(!this.isValid)return this;const r={};for(const n of Object.keys(this.values))r[n]=ro(e(this.values[n],n));return $e(this,{values:r},!0)}get(e){return this[k.normalizeUnit(e)]}set(e){if(!this.isValid)return this;const r={...this.values,...Hr(e,k.normalizeUnit)};return $e(this,{values:r})}reconfigure({locale:e,numberingSystem:r,conversionAccuracy:n,matrix:i}={}){const s={loc:this.loc.clone({locale:e,numberingSystem:r}),matrix:i,conversionAccuracy:n};return $e(this,s)}as(e){return this.isValid?this.shiftTo(e).get(e):NaN}normalize(){if(!this.isValid)return this;const e=this.toObject();return Ea(this.matrix,e),$e(this,{values:e},!0)}rescale(){if(!this.isValid)return this;const e=cd(this.normalize().shiftToAll().toObject());return $e(this,{values:e},!0)}shiftTo(...e){if(!this.isValid)return this;if(e.length===0)return this;e=e.map(s=>k.normalizeUnit(s));const r={},n={},i=this.toObject();let a;for(const s of Ve)if(e.indexOf(s)>=0){a=s;let o=0;for(const c in n)o+=this.matrix[c][s]*n[c],n[c]=0;Fe(i[s])&&(o+=i[s]);const l=Math.trunc(o);r[s]=l,n[s]=(o*1e3-l*1e3)/1e3}else Fe(i[s])&&(n[s]=i[s]);for(const s in n)n[s]!==0&&(r[a]+=s===a?n[s]:n[s]/this.matrix[a][s]);return Ea(this.matrix,r),$e(this,{values:r},!0)}shiftToAll(){return this.isValid?this.shiftTo("years","months","weeks","days","hours","minutes","seconds","milliseconds"):this}negate(){if(!this.isValid)return this;const e={};for(const r of Object.keys(this.values))e[r]=this.values[r]===0?0:-this.values[r];return $e(this,{values:e},!0)}get years(){return this.isValid?this.values.years||0:NaN}get quarters(){return this.isValid?this.values.quarters||0:NaN}get months(){return this.isValid?this.values.months||0:NaN}get weeks(){return this.isValid?this.values.weeks||0:NaN}get days(){return this.isValid?this.values.days||0:NaN}get hours(){return this.isValid?this.values.hours||0:NaN}get minutes(){return this.isValid?this.values.minutes||0:NaN}get seconds(){return this.isValid?this.values.seconds||0:NaN}get milliseconds(){return this.isValid?this.values.milliseconds||0:NaN}get isValid(){return this.invalid===null}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}equals(e){if(!this.isValid||!e.isValid||!this.loc.equals(e.loc))return!1;function r(n,i){return n===void 0||n===0?i===void 0||i===0:n===i}for(const n of Ve)if(!r(this.values[n],e.values[n]))return!1;return!0}}const rt="Invalid Interval";function ud(t,e){return!t||!t.isValid?H.invalid("missing or invalid start"):!e||!e.isValid?H.invalid("missing or invalid end"):e<t?H.invalid("end before start",`The end of an interval must be after its start, but you had start=${t.toISO()} and end=${e.toISO()}`):null}class H{constructor(e){this.s=e.start,this.e=e.end,this.invalid=e.invalid||null,this.isLuxonInterval=!0}static invalid(e,r=null){if(!e)throw new K("need to specify a reason the Interval is invalid");const n=e instanceof ae?e:new ae(e,r);if(P.throwOnInvalid)throw new Pc(n);return new H({invalid:n})}static fromDateTimes(e,r){const n=Lt(e),i=Lt(r),a=ud(n,i);return a??new H({start:n,end:i})}static after(e,r){const n=k.fromDurationLike(r),i=Lt(e);return H.fromDateTimes(i,i.plus(n))}static before(e,r){const n=k.fromDurationLike(r),i=Lt(e);return H.fromDateTimes(i.minus(n),i)}static fromISO(e,r){const[n,i]=(e||"").split("/",2);if(n&&i){let a,s;try{a=T.fromISO(n,r),s=a.isValid}catch{s=!1}let o,l;try{o=T.fromISO(i,r),l=o.isValid}catch{l=!1}if(s&&l)return H.fromDateTimes(a,o);if(s){const c=k.fromISO(i,r);if(c.isValid)return H.after(a,c)}else if(l){const c=k.fromISO(n,r);if(c.isValid)return H.before(o,c)}}return H.invalid("unparsable",`the input "${e}" can't be parsed as ISO 8601`)}static isInterval(e){return e&&e.isLuxonInterval||!1}get start(){return this.isValid?this.s:null}get end(){return this.isValid?this.e:null}get isValid(){return this.invalidReason===null}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}length(e="milliseconds"){return this.isValid?this.toDuration(e).get(e):NaN}count(e="milliseconds",r){if(!this.isValid)return NaN;const n=this.start.startOf(e,r);let i;return r!=null&&r.useLocaleWeeks?i=this.end.reconfigure({locale:n.locale}):i=this.end,i=i.startOf(e,r),Math.floor(i.diff(n,e).get(e))+(i.valueOf()!==this.end.valueOf())}hasSame(e){return this.isValid?this.isEmpty()||this.e.minus(1).hasSame(this.s,e):!1}isEmpty(){return this.s.valueOf()===this.e.valueOf()}isAfter(e){return this.isValid?this.s>e:!1}isBefore(e){return this.isValid?this.e<=e:!1}contains(e){return this.isValid?this.s<=e&&this.e>e:!1}set({start:e,end:r}={}){return this.isValid?H.fromDateTimes(e||this.s,r||this.e):this}splitAt(...e){if(!this.isValid)return[];const r=e.map(Lt).filter(s=>this.contains(s)).sort((s,o)=>s.toMillis()-o.toMillis()),n=[];let{s:i}=this,a=0;for(;i<this.e;){const s=r[a]||this.e,o=+s>+this.e?this.e:s;n.push(H.fromDateTimes(i,o)),i=o,a+=1}return n}splitBy(e){const r=k.fromDurationLike(e);if(!this.isValid||!r.isValid||r.as("milliseconds")===0)return[];let{s:n}=this,i=1,a;const s=[];for(;n<this.e;){const o=this.start.plus(r.mapUnits(l=>l*i));a=+o>+this.e?this.e:o,s.push(H.fromDateTimes(n,a)),n=a,i+=1}return s}divideEqually(e){return this.isValid?this.splitBy(this.length()/e).slice(0,e):[]}overlaps(e){return this.e>e.s&&this.s<e.e}abutsStart(e){return this.isValid?+this.e==+e.s:!1}abutsEnd(e){return this.isValid?+e.e==+this.s:!1}engulfs(e){return this.isValid?this.s<=e.s&&this.e>=e.e:!1}equals(e){return!this.isValid||!e.isValid?!1:this.s.equals(e.s)&&this.e.equals(e.e)}intersection(e){if(!this.isValid)return this;const r=this.s>e.s?this.s:e.s,n=this.e<e.e?this.e:e.e;return r>=n?null:H.fromDateTimes(r,n)}union(e){if(!this.isValid)return this;const r=this.s<e.s?this.s:e.s,n=this.e>e.e?this.e:e.e;return H.fromDateTimes(r,n)}static merge(e){const[r,n]=e.sort((i,a)=>i.s-a.s).reduce(([i,a],s)=>a?a.overlaps(s)||a.abutsStart(s)?[i,a.union(s)]:[i.concat([a]),s]:[i,s],[[],null]);return n&&r.push(n),r}static xor(e){let r=null,n=0;const i=[],a=e.map(l=>[{time:l.s,type:"s"},{time:l.e,type:"e"}]),s=Array.prototype.concat(...a),o=s.sort((l,c)=>l.time-c.time);for(const l of o)n+=l.type==="s"?1:-1,n===1?r=l.time:(r&&+r!=+l.time&&i.push(H.fromDateTimes(r,l.time)),r=null);return H.merge(i)}difference(...e){return H.xor([this].concat(e)).map(r=>this.intersection(r)).filter(r=>r&&!r.isEmpty())}toString(){return this.isValid?`[${this.s.toISO()} – ${this.e.toISO()})`:rt}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`:`Interval { Invalid, reason: ${this.invalidReason} }`}toLocaleString(e=Pr,r={}){return this.isValid?B.create(this.s.loc.clone(r),e).formatInterval(this):rt}toISO(e){return this.isValid?`${this.s.toISO(e)}/${this.e.toISO(e)}`:rt}toISODate(){return this.isValid?`${this.s.toISODate()}/${this.e.toISODate()}`:rt}toISOTime(e){return this.isValid?`${this.s.toISOTime(e)}/${this.e.toISOTime(e)}`:rt}toFormat(e,{separator:r=" – "}={}){return this.isValid?`${this.s.toFormat(e)}${r}${this.e.toFormat(e)}`:rt}toDuration(e,r){return this.isValid?this.e.diff(this.s,e,r):k.invalid(this.invalidReason)}mapEndpoints(e){return H.fromDateTimes(e(this.s),e(this.e))}}class wr{static hasDST(e=P.defaultZone){const r=T.now().setZone(e).set({month:12});return!e.isUniversal&&r.offset!==r.set({month:6}).offset}static isValidIANAZone(e){return we.isValidZone(e)}static normalizeZone(e){return Se(e,P.defaultZone)}static getStartOfWeek({locale:e=null,locObj:r=null}={}){return(r||_.create(e)).getStartOfWeek()}static getMinimumDaysInFirstWeek({locale:e=null,locObj:r=null}={}){return(r||_.create(e)).getMinDaysInFirstWeek()}static getWeekendWeekdays({locale:e=null,locObj:r=null}={}){return(r||_.create(e)).getWeekendDays().slice()}static months(e="long",{locale:r=null,numberingSystem:n=null,locObj:i=null,outputCalendar:a="gregory"}={}){return(i||_.create(r,n,a)).months(e)}static monthsFormat(e="long",{locale:r=null,numberingSystem:n=null,locObj:i=null,outputCalendar:a="gregory"}={}){return(i||_.create(r,n,a)).months(e,!0)}static weekdays(e="long",{locale:r=null,numberingSystem:n=null,locObj:i=null}={}){return(i||_.create(r,n,null)).weekdays(e)}static weekdaysFormat(e="long",{locale:r=null,numberingSystem:n=null,locObj:i=null}={}){return(i||_.create(r,n,null)).weekdays(e,!0)}static meridiems({locale:e=null}={}){return _.create(e).meridiems()}static eras(e="short",{locale:r=null}={}){return _.create(r,null,"gregory").eras(e)}static features(){return{relative:Xs(),localeWeek:eo()}}}function $a(t,e){const r=i=>i.toUTC(0,{keepLocalTime:!0}).startOf("day").valueOf(),n=r(e)-r(t);return Math.floor(k.fromMillis(n).as("days"))}function dd(t,e,r){const n=[["years",(l,c)=>c.year-l.year],["quarters",(l,c)=>c.quarter-l.quarter+(c.year-l.year)*4],["months",(l,c)=>c.month-l.month+(c.year-l.year)*12],["weeks",(l,c)=>{const u=$a(l,c);return(u-u%7)/7}],["days",$a]],i={},a=t;let s,o;for(const[l,c]of n)r.indexOf(l)>=0&&(s=l,i[l]=c(t,e),o=a.plus(i),o>e?(i[l]--,t=a.plus(i),t>e&&(o=t,i[l]--,t=a.plus(i))):t=o);return[t,i,o,s]}function fd(t,e,r,n){let[i,a,s,o]=dd(t,e,r);const l=e-i,c=r.filter(d=>["hours","minutes","seconds","milliseconds"].indexOf(d)>=0);c.length===0&&(s<e&&(s=i.plus({[o]:1})),s!==i&&(a[o]=(a[o]||0)+l/(s-i)));const u=k.fromObject(a,n);return c.length>0?k.fromMillis(l,n).shiftTo(...c).plus(u):u}const Ti={arab:"[٠-٩]",arabext:"[۰-۹]",bali:"[᭐-᭙]",beng:"[০-৯]",deva:"[०-९]",fullwide:"[０-９]",gujr:"[૦-૯]",hanidec:"[〇|一|二|三|四|五|六|七|八|九]",khmr:"[០-៩]",knda:"[೦-೯]",laoo:"[໐-໙]",limb:"[᥆-᥏]",mlym:"[൦-൯]",mong:"[᠐-᠙]",mymr:"[၀-၉]",orya:"[୦-୯]",tamldec:"[௦-௯]",telu:"[౦-౯]",thai:"[๐-๙]",tibt:"[༠-༩]",latn:"\\d"},Ta={arab:[1632,1641],arabext:[1776,1785],bali:[6992,7001],beng:[2534,2543],deva:[2406,2415],fullwide:[65296,65303],gujr:[2790,2799],khmr:[6112,6121],knda:[3302,3311],laoo:[3792,3801],limb:[6470,6479],mlym:[3430,3439],mong:[6160,6169],mymr:[4160,4169],orya:[2918,2927],tamldec:[3046,3055],telu:[3174,3183],thai:[3664,3673],tibt:[3872,3881]},hd=Ti.hanidec.replace(/[\[|\]]/g,"").split("");function md(t){let e=parseInt(t,10);if(isNaN(e)){e="";for(let r=0;r<t.length;r++){const n=t.charCodeAt(r);if(t[r].search(Ti.hanidec)!==-1)e+=hd.indexOf(t[r]);else for(const i in Ta){const[a,s]=Ta[i];n>=a&&n<=s&&(e+=n-a)}}return parseInt(e,10)}else return e}function ne({numberingSystem:t},e=""){return new RegExp(`${Ti[t||"latn"]}${e}`)}const pd="missing Intl.DateTimeFormat.formatToParts support";function M(t,e=r=>r){return{regex:t,deser:([r])=>e(md(r))}}const gd=String.fromCharCode(160),vo=`[ ${gd}]`,bo=new RegExp(vo,"g");function wd(t){return t.replace(/\./g,"\\.?").replace(bo,vo)}function Sa(t){return t.replace(/\./g,"").replace(bo," ").toLowerCase()}function ie(t,e){return t===null?null:{regex:RegExp(t.map(wd).join("|")),deser:([r])=>t.findIndex(n=>Sa(r)===Sa(n))+e}}function Aa(t,e){return{regex:t,deser:([,r,n])=>Xr(r,n),groups:e}}function yr(t){return{regex:t,deser:([e])=>e}}function yd(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function vd(t,e){const r=ne(e),n=ne(e,"{2}"),i=ne(e,"{3}"),a=ne(e,"{4}"),s=ne(e,"{6}"),o=ne(e,"{1,2}"),l=ne(e,"{1,3}"),c=ne(e,"{1,6}"),u=ne(e,"{1,9}"),d=ne(e,"{2,4}"),f=ne(e,"{4,6}"),h=V=>({regex:RegExp(yd(V.val)),deser:([Y])=>Y,literal:!0}),b=(V=>{if(t.literal)return h(V);switch(V.val){case"G":return ie(e.eras("short"),0);case"GG":return ie(e.eras("long"),0);case"y":return M(c);case"yy":return M(d,Yn);case"yyyy":return M(a);case"yyyyy":return M(f);case"yyyyyy":return M(s);case"M":return M(o);case"MM":return M(n);case"MMM":return ie(e.months("short",!0),1);case"MMMM":return ie(e.months("long",!0),1);case"L":return M(o);case"LL":return M(n);case"LLL":return ie(e.months("short",!1),1);case"LLLL":return ie(e.months("long",!1),1);case"d":return M(o);case"dd":return M(n);case"o":return M(l);case"ooo":return M(i);case"HH":return M(n);case"H":return M(o);case"hh":return M(n);case"h":return M(o);case"mm":return M(n);case"m":return M(o);case"q":return M(o);case"qq":return M(n);case"s":return M(o);case"ss":return M(n);case"S":return M(l);case"SSS":return M(i);case"u":return yr(u);case"uu":return yr(o);case"uuu":return M(r);case"a":return ie(e.meridiems(),0);case"kkkk":return M(a);case"kk":return M(d,Yn);case"W":return M(o);case"WW":return M(n);case"E":case"c":return M(r);case"EEE":return ie(e.weekdays("short",!1),1);case"EEEE":return ie(e.weekdays("long",!1),1);case"ccc":return ie(e.weekdays("short",!0),1);case"cccc":return ie(e.weekdays("long",!0),1);case"Z":case"ZZ":return Aa(new RegExp(`([+-]${o.source})(?::(${n.source}))?`),2);case"ZZZ":return Aa(new RegExp(`([+-]${o.source})(${n.source})?`),2);case"z":return yr(/[a-z_+-/]{1,256}?/i);case" ":return yr(/[^\S\n\r]/);default:return h(V)}})(t)||{invalidReason:pd};return b.token=t,b}const bd={year:{"2-digit":"yy",numeric:"yyyyy"},month:{numeric:"M","2-digit":"MM",short:"MMM",long:"MMMM"},day:{numeric:"d","2-digit":"dd"},weekday:{short:"EEE",long:"EEEE"},dayperiod:"a",dayPeriod:"a",hour12:{numeric:"h","2-digit":"hh"},hour24:{numeric:"H","2-digit":"HH"},minute:{numeric:"m","2-digit":"mm"},second:{numeric:"s","2-digit":"ss"},timeZoneName:{long:"ZZZZZ",short:"ZZZ"}};function Ed(t,e,r){const{type:n,value:i}=t;if(n==="literal"){const l=/^\s+$/.test(i);return{literal:!l,val:l?" ":i}}const a=e[n];let s=n;n==="hour"&&(e.hour12!=null?s=e.hour12?"hour12":"hour24":e.hourCycle!=null?e.hourCycle==="h11"||e.hourCycle==="h12"?s="hour12":s="hour24":s=r.hour12?"hour12":"hour24");let o=bd[s];if(typeof o=="object"&&(o=o[a]),o)return{literal:!1,val:o}}function $d(t){return[`^${t.map(r=>r.regex).reduce((r,n)=>`${r}(${n.source})`,"")}$`,t]}function Td(t,e,r){const n=t.match(e);if(n){const i={};let a=1;for(const s in r)if(pt(r,s)){const o=r[s],l=o.groups?o.groups+1:1;!o.literal&&o.token&&(i[o.token.val[0]]=o.deser(n.slice(a,a+l))),a+=l}return[n,i]}else return[n,{}]}function Sd(t){const e=a=>{switch(a){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":case"H":return"hour";case"d":return"day";case"o":return"ordinal";case"L":case"M":return"month";case"y":return"year";case"E":case"c":return"weekday";case"W":return"weekNumber";case"k":return"weekYear";case"q":return"quarter";default:return null}};let r=null,n;return E(t.z)||(r=we.create(t.z)),E(t.Z)||(r||(r=new Z(t.Z)),n=t.Z),E(t.q)||(t.M=(t.q-1)*3+1),E(t.h)||(t.h<12&&t.a===1?t.h+=12:t.h===12&&t.a===0&&(t.h=0)),t.G===0&&t.y&&(t.y=-t.y),E(t.u)||(t.S=yi(t.u)),[Object.keys(t).reduce((a,s)=>{const o=e(s);return o&&(a[o]=t[s]),a},{}),r,n]}let En=null;function Ad(){return En||(En=T.fromMillis(1555555555555)),En}function xd(t,e){if(t.literal)return t;const r=B.macroTokenToFormatOpts(t.val),n=To(r,e);return n==null||n.includes(void 0)?t:n}function Eo(t,e){return Array.prototype.concat(...t.map(r=>xd(r,e)))}function $o(t,e,r){const n=Eo(B.parseFormat(r),t),i=n.map(s=>vd(s,t)),a=i.find(s=>s.invalidReason);if(a)return{input:e,tokens:n,invalidReason:a.invalidReason};{const[s,o]=$d(i),l=RegExp(s,"i"),[c,u]=Td(e,l,o),[d,f,h]=u?Sd(u):[null,null,void 0];if(pt(u,"a")&&pt(u,"H"))throw new at("Can't include meridiem when specifying 24-hour format");return{input:e,tokens:n,regex:l,rawMatches:c,matches:u,result:d,zone:f,specificOffset:h}}}function kd(t,e,r){const{result:n,zone:i,specificOffset:a,invalidReason:s}=$o(t,e,r);return[n,i,a,s]}function To(t,e){if(!t)return null;const n=B.create(e,t).dtFormatter(Ad()),i=n.formatToParts(),a=n.resolvedOptions();return i.map(s=>Ed(s,t,a))}const $n="Invalid DateTime",xa=864e13;function vr(t){return new ae("unsupported zone",`the zone "${t.name}" is not supported`)}function Tn(t){return t.weekData===null&&(t.weekData=Dr(t.c)),t.weekData}function Sn(t){return t.localWeekData===null&&(t.localWeekData=Dr(t.c,t.loc.getMinDaysInFirstWeek(),t.loc.getStartOfWeek())),t.localWeekData}function _e(t,e){const r={ts:t.ts,zone:t.zone,c:t.c,o:t.o,loc:t.loc,invalid:t.invalid};return new T({...r,...e,old:r})}function So(t,e,r){let n=t-e*60*1e3;const i=r.offset(n);if(e===i)return[n,e];n-=(i-e)*60*1e3;const a=r.offset(n);return i===a?[n,i]:[t-Math.min(i,a)*60*1e3,Math.max(i,a)]}function br(t,e){t+=e*60*1e3;const r=new Date(t);return{year:r.getUTCFullYear(),month:r.getUTCMonth()+1,day:r.getUTCDate(),hour:r.getUTCHours(),minute:r.getUTCMinutes(),second:r.getUTCSeconds(),millisecond:r.getUTCMilliseconds()}}function kr(t,e,r){return So(Qr(t),e,r)}function ka(t,e){const r=t.o,n=t.c.year+Math.trunc(e.years),i=t.c.month+Math.trunc(e.months)+Math.trunc(e.quarters)*3,a={...t.c,year:n,month:i,day:Math.min(t.c.day,Vr(n,i))+Math.trunc(e.days)+Math.trunc(e.weeks)*7},s=k.fromObject({years:e.years-Math.trunc(e.years),quarters:e.quarters-Math.trunc(e.quarters),months:e.months-Math.trunc(e.months),weeks:e.weeks-Math.trunc(e.weeks),days:e.days-Math.trunc(e.days),hours:e.hours,minutes:e.minutes,seconds:e.seconds,milliseconds:e.milliseconds}).as("milliseconds"),o=Qr(a);let[l,c]=So(o,r,t.zone);return s!==0&&(l+=s,c=t.zone.offset(l)),{ts:l,o:c}}function Nt(t,e,r,n,i,a){const{setZone:s,zone:o}=r;if(t&&Object.keys(t).length!==0||e){const l=e||o,c=T.fromObject(t,{...r,zone:l,specificOffset:a});return s?c:c.setZone(o)}else return T.invalid(new ae("unparsable",`the input "${i}" can't be parsed as ${n}`))}function Er(t,e,r=!0){return t.isValid?B.create(_.create("en-US"),{allowZ:r,forceSimple:!0}).formatDateTimeFromString(t,e):null}function An(t,e){const r=t.c.year>9999||t.c.year<0;let n="";return r&&t.c.year>=0&&(n+="+"),n+=R(t.c.year,r?6:4),e?(n+="-",n+=R(t.c.month),n+="-",n+=R(t.c.day)):(n+=R(t.c.month),n+=R(t.c.day)),n}function Ma(t,e,r,n,i,a){let s=R(t.c.hour);return e?(s+=":",s+=R(t.c.minute),(t.c.millisecond!==0||t.c.second!==0||!r)&&(s+=":")):s+=R(t.c.minute),(t.c.millisecond!==0||t.c.second!==0||!r)&&(s+=R(t.c.second),(t.c.millisecond!==0||!n)&&(s+=".",s+=R(t.c.millisecond,3))),i&&(t.isOffsetFixed&&t.offset===0&&!a?s+="Z":t.o<0?(s+="-",s+=R(Math.trunc(-t.o/60)),s+=":",s+=R(Math.trunc(-t.o%60))):(s+="+",s+=R(Math.trunc(t.o/60)),s+=":",s+=R(Math.trunc(t.o%60)))),a&&(s+="["+t.zone.ianaName+"]"),s}const Ao={month:1,day:1,hour:0,minute:0,second:0,millisecond:0},Md={weekNumber:1,weekday:1,hour:0,minute:0,second:0,millisecond:0},Cd={ordinal:1,hour:0,minute:0,second:0,millisecond:0},xo=["year","month","day","hour","minute","second","millisecond"],_d=["weekYear","weekNumber","weekday","hour","minute","second","millisecond"],Od=["year","ordinal","hour","minute","second","millisecond"];function Nd(t){const e={year:"year",years:"year",month:"month",months:"month",day:"day",days:"day",hour:"hour",hours:"hour",minute:"minute",minutes:"minute",quarter:"quarter",quarters:"quarter",second:"second",seconds:"second",millisecond:"millisecond",milliseconds:"millisecond",weekday:"weekday",weekdays:"weekday",weeknumber:"weekNumber",weeksnumber:"weekNumber",weeknumbers:"weekNumber",weekyear:"weekYear",weekyears:"weekYear",ordinal:"ordinal"}[t.toLowerCase()];if(!e)throw new ks(t);return e}function Ca(t){switch(t.toLowerCase()){case"localweekday":case"localweekdays":return"localWeekday";case"localweeknumber":case"localweeknumbers":return"localWeekNumber";case"localweekyear":case"localweekyears":return"localWeekYear";default:return Nd(t)}}function _a(t,e){const r=Se(e.zone,P.defaultZone),n=_.fromObject(e),i=P.now();let a,s;if(E(t.year))a=i;else{for(const c of xo)E(t[c])&&(t[c]=Ao[c]);const o=Js(t)||Qs(t);if(o)return T.invalid(o);const l=r.offset(i);[a,s]=kr(t,l,r)}return new T({ts:a,zone:r,loc:n,o:s})}function Oa(t,e,r){const n=E(r.round)?!0:r.round,i=(s,o)=>(s=vi(s,n||r.calendary?0:2,!0),e.loc.clone(r).relFormatter(r).format(s,o)),a=s=>r.calendary?e.hasSame(t,s)?0:e.startOf(s).diff(t.startOf(s),s).get(s):e.diff(t,s).get(s);if(r.unit)return i(a(r.unit),r.unit);for(const s of r.units){const o=a(s);if(Math.abs(o)>=1)return i(o,s)}return i(t>e?-0:0,r.units[r.units.length-1])}function Na(t){let e={},r;return t.length>0&&typeof t[t.length-1]=="object"?(e=t[t.length-1],r=Array.from(t).slice(0,t.length-1)):r=Array.from(t),[e,r]}class T{constructor(e){const r=e.zone||P.defaultZone;let n=e.invalid||(Number.isNaN(e.ts)?new ae("invalid input"):null)||(r.isValid?null:vr(r));this.ts=E(e.ts)?P.now():e.ts;let i=null,a=null;if(!n)if(e.old&&e.old.ts===this.ts&&e.old.zone.equals(r))[i,a]=[e.old.c,e.old.o];else{const o=r.offset(this.ts);i=br(this.ts,o),n=Number.isNaN(i.year)?new ae("invalid input"):null,i=n?null:i,a=n?null:o}this._zone=r,this.loc=e.loc||_.create(),this.invalid=n,this.weekData=null,this.localWeekData=null,this.c=i,this.o=a,this.isLuxonDateTime=!0}static now(){return new T({})}static local(){const[e,r]=Na(arguments),[n,i,a,s,o,l,c]=r;return _a({year:n,month:i,day:a,hour:s,minute:o,second:l,millisecond:c},e)}static utc(){const[e,r]=Na(arguments),[n,i,a,s,o,l,c]=r;return e.zone=Z.utcInstance,_a({year:n,month:i,day:a,hour:s,minute:o,second:l,millisecond:c},e)}static fromJSDate(e,r={}){const n=ou(e)?e.valueOf():NaN;if(Number.isNaN(n))return T.invalid("invalid input");const i=Se(r.zone,P.defaultZone);return i.isValid?new T({ts:n,zone:i,loc:_.fromObject(r)}):T.invalid(vr(i))}static fromMillis(e,r={}){if(Fe(e))return e<-xa||e>xa?T.invalid("Timestamp out of range"):new T({ts:e,zone:Se(r.zone,P.defaultZone),loc:_.fromObject(r)});throw new K(`fromMillis requires a numerical input, but received a ${typeof e} with value ${e}`)}static fromSeconds(e,r={}){if(Fe(e))return new T({ts:e*1e3,zone:Se(r.zone,P.defaultZone),loc:_.fromObject(r)});throw new K("fromSeconds requires a numerical input")}static fromObject(e,r={}){e=e||{};const n=Se(r.zone,P.defaultZone);if(!n.isValid)return T.invalid(vr(n));const i=_.fromObject(r),a=Hr(e,Ca),{minDaysInFirstWeek:s,startOfWeek:o}=pa(a,i),l=P.now(),c=E(r.specificOffset)?n.offset(l):r.specificOffset,u=!E(a.ordinal),d=!E(a.year),f=!E(a.month)||!E(a.day),h=d||f,m=a.weekYear||a.weekNumber;if((h||u)&&m)throw new at("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(f&&u)throw new at("Can't mix ordinal dates with month/day");const b=m||a.weekday&&!h;let V,Y,ce=br(l,c);b?(V=_d,Y=Md,ce=Dr(ce,s,o)):u?(V=Od,Y=Cd,ce=bn(ce)):(V=xo,Y=Ao);let Ct=!1;for(const Ot of V){const Ul=a[Ot];E(Ul)?Ct?a[Ot]=Y[Ot]:a[Ot]=ce[Ot]:Ct=!0}const _t=b?iu(a,s,o):u?au(a):Js(a),hr=_t||Qs(a);if(hr)return T.invalid(hr);const Fl=b?ha(a,s,o):u?ma(a):a,[zl,Wl]=kr(Fl,c,n),mn=new T({ts:zl,zone:n,o:Wl,loc:i});return a.weekday&&h&&e.weekday!==mn.weekday?T.invalid("mismatched weekday",`you can't specify both a weekday of ${a.weekday} and a date of ${mn.toISO()}`):mn}static fromISO(e,r={}){const[n,i]=Ku(e);return Nt(n,i,r,"ISO 8601",e)}static fromRFC2822(e,r={}){const[n,i]=Ju(e);return Nt(n,i,r,"RFC 2822",e)}static fromHTTP(e,r={}){const[n,i]=Qu(e);return Nt(n,i,r,"HTTP",r)}static fromFormat(e,r,n={}){if(E(e)||E(r))throw new K("fromFormat requires an input string and a format");const{locale:i=null,numberingSystem:a=null}=n,s=_.fromOpts({locale:i,numberingSystem:a,defaultToEN:!0}),[o,l,c,u]=kd(s,e,r);return u?T.invalid(u):Nt(o,l,n,`format ${r}`,e,c)}static fromString(e,r,n={}){return T.fromFormat(e,r,n)}static fromSQL(e,r={}){const[n,i]=ad(e);return Nt(n,i,r,"SQL",e)}static invalid(e,r=null){if(!e)throw new K("need to specify a reason the DateTime is invalid");const n=e instanceof ae?e:new ae(e,r);if(P.throwOnInvalid)throw new Ic(n);return new T({invalid:n})}static isDateTime(e){return e&&e.isLuxonDateTime||!1}static parseFormatForOpts(e,r={}){const n=To(e,_.fromObject(r));return n?n.map(i=>i?i.val:null).join(""):null}static expandFormat(e,r={}){return Eo(B.parseFormat(e),_.fromObject(r)).map(i=>i.val).join("")}get(e){return this[e]}get isValid(){return this.invalid===null}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}get outputCalendar(){return this.isValid?this.loc.outputCalendar:null}get zone(){return this._zone}get zoneName(){return this.isValid?this.zone.name:null}get year(){return this.isValid?this.c.year:NaN}get quarter(){return this.isValid?Math.ceil(this.c.month/3):NaN}get month(){return this.isValid?this.c.month:NaN}get day(){return this.isValid?this.c.day:NaN}get hour(){return this.isValid?this.c.hour:NaN}get minute(){return this.isValid?this.c.minute:NaN}get second(){return this.isValid?this.c.second:NaN}get millisecond(){return this.isValid?this.c.millisecond:NaN}get weekYear(){return this.isValid?Tn(this).weekYear:NaN}get weekNumber(){return this.isValid?Tn(this).weekNumber:NaN}get weekday(){return this.isValid?Tn(this).weekday:NaN}get isWeekend(){return this.isValid&&this.loc.getWeekendDays().includes(this.weekday)}get localWeekday(){return this.isValid?Sn(this).weekday:NaN}get localWeekNumber(){return this.isValid?Sn(this).weekNumber:NaN}get localWeekYear(){return this.isValid?Sn(this).weekYear:NaN}get ordinal(){return this.isValid?bn(this.c).ordinal:NaN}get monthShort(){return this.isValid?wr.months("short",{locObj:this.loc})[this.month-1]:null}get monthLong(){return this.isValid?wr.months("long",{locObj:this.loc})[this.month-1]:null}get weekdayShort(){return this.isValid?wr.weekdays("short",{locObj:this.loc})[this.weekday-1]:null}get weekdayLong(){return this.isValid?wr.weekdays("long",{locObj:this.loc})[this.weekday-1]:null}get offset(){return this.isValid?+this.o:NaN}get offsetNameShort(){return this.isValid?this.zone.offsetName(this.ts,{format:"short",locale:this.locale}):null}get offsetNameLong(){return this.isValid?this.zone.offsetName(this.ts,{format:"long",locale:this.locale}):null}get isOffsetFixed(){return this.isValid?this.zone.isUniversal:null}get isInDST(){return this.isOffsetFixed?!1:this.offset>this.set({month:1,day:1}).offset||this.offset>this.set({month:5}).offset}getPossibleOffsets(){if(!this.isValid||this.isOffsetFixed)return[this];const e=864e5,r=6e4,n=Qr(this.c),i=this.zone.offset(n-e),a=this.zone.offset(n+e),s=this.zone.offset(n-i*r),o=this.zone.offset(n-a*r);if(s===o)return[this];const l=n-s*r,c=n-o*r,u=br(l,s),d=br(c,o);return u.hour===d.hour&&u.minute===d.minute&&u.second===d.second&&u.millisecond===d.millisecond?[_e(this,{ts:l}),_e(this,{ts:c})]:[this]}get isInLeapYear(){return ir(this.year)}get daysInMonth(){return Vr(this.year,this.month)}get daysInYear(){return this.isValid?ot(this.year):NaN}get weeksInWeekYear(){return this.isValid?Gt(this.weekYear):NaN}get weeksInLocalWeekYear(){return this.isValid?Gt(this.localWeekYear,this.loc.getMinDaysInFirstWeek(),this.loc.getStartOfWeek()):NaN}resolvedLocaleOptions(e={}){const{locale:r,numberingSystem:n,calendar:i}=B.create(this.loc.clone(e),e).resolvedOptions(this);return{locale:r,numberingSystem:n,outputCalendar:i}}toUTC(e=0,r={}){return this.setZone(Z.instance(e),r)}toLocal(){return this.setZone(P.defaultZone)}setZone(e,{keepLocalTime:r=!1,keepCalendarTime:n=!1}={}){if(e=Se(e,P.defaultZone),e.equals(this.zone))return this;if(e.isValid){let i=this.ts;if(r||n){const a=e.offset(this.ts),s=this.toObject();[i]=kr(s,a,e)}return _e(this,{ts:i,zone:e})}else return T.invalid(vr(e))}reconfigure({locale:e,numberingSystem:r,outputCalendar:n}={}){const i=this.loc.clone({locale:e,numberingSystem:r,outputCalendar:n});return _e(this,{loc:i})}setLocale(e){return this.reconfigure({locale:e})}set(e){if(!this.isValid)return this;const r=Hr(e,Ca),{minDaysInFirstWeek:n,startOfWeek:i}=pa(r,this.loc),a=!E(r.weekYear)||!E(r.weekNumber)||!E(r.weekday),s=!E(r.ordinal),o=!E(r.year),l=!E(r.month)||!E(r.day),c=o||l,u=r.weekYear||r.weekNumber;if((c||s)&&u)throw new at("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(l&&s)throw new at("Can't mix ordinal dates with month/day");let d;a?d=ha({...Dr(this.c,n,i),...r},n,i):E(r.ordinal)?(d={...this.toObject(),...r},E(r.day)&&(d.day=Math.min(Vr(d.year,d.month),d.day))):d=ma({...bn(this.c),...r});const[f,h]=kr(d,this.o,this.zone);return _e(this,{ts:f,o:h})}plus(e){if(!this.isValid)return this;const r=k.fromDurationLike(e);return _e(this,ka(this,r))}minus(e){if(!this.isValid)return this;const r=k.fromDurationLike(e).negate();return _e(this,ka(this,r))}startOf(e,{useLocaleWeeks:r=!1}={}){if(!this.isValid)return this;const n={},i=k.normalizeUnit(e);switch(i){case"years":n.month=1;case"quarters":case"months":n.day=1;case"weeks":case"days":n.hour=0;case"hours":n.minute=0;case"minutes":n.second=0;case"seconds":n.millisecond=0;break}if(i==="weeks")if(r){const a=this.loc.getStartOfWeek(),{weekday:s}=this;s<a&&(n.weekNumber=this.weekNumber-1),n.weekday=a}else n.weekday=1;if(i==="quarters"){const a=Math.ceil(this.month/3);n.month=(a-1)*3+1}return this.set(n)}endOf(e,r){return this.isValid?this.plus({[e]:1}).startOf(e,r).minus(1):this}toFormat(e,r={}){return this.isValid?B.create(this.loc.redefaultToEN(r)).formatDateTimeFromString(this,e):$n}toLocaleString(e=Pr,r={}){return this.isValid?B.create(this.loc.clone(r),e).formatDateTime(this):$n}toLocaleParts(e={}){return this.isValid?B.create(this.loc.clone(e),e).formatDateTimeParts(this):[]}toISO({format:e="extended",suppressSeconds:r=!1,suppressMilliseconds:n=!1,includeOffset:i=!0,extendedZone:a=!1}={}){if(!this.isValid)return null;const s=e==="extended";let o=An(this,s);return o+="T",o+=Ma(this,s,r,n,i,a),o}toISODate({format:e="extended"}={}){return this.isValid?An(this,e==="extended"):null}toISOWeekDate(){return Er(this,"kkkk-'W'WW-c")}toISOTime({suppressMilliseconds:e=!1,suppressSeconds:r=!1,includeOffset:n=!0,includePrefix:i=!1,extendedZone:a=!1,format:s="extended"}={}){return this.isValid?(i?"T":"")+Ma(this,s==="extended",r,e,n,a):null}toRFC2822(){return Er(this,"EEE, dd LLL yyyy HH:mm:ss ZZZ",!1)}toHTTP(){return Er(this.toUTC(),"EEE, dd LLL yyyy HH:mm:ss 'GMT'")}toSQLDate(){return this.isValid?An(this,!0):null}toSQLTime({includeOffset:e=!0,includeZone:r=!1,includeOffsetSpace:n=!0}={}){let i="HH:mm:ss.SSS";return(r||e)&&(n&&(i+=" "),r?i+="z":e&&(i+="ZZ")),Er(this,i,!0)}toSQL(e={}){return this.isValid?`${this.toSQLDate()} ${this.toSQLTime(e)}`:null}toString(){return this.isValid?this.toISO():$n}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`:`DateTime { Invalid, reason: ${this.invalidReason} }`}valueOf(){return this.toMillis()}toMillis(){return this.isValid?this.ts:NaN}toSeconds(){return this.isValid?this.ts/1e3:NaN}toUnixInteger(){return this.isValid?Math.floor(this.ts/1e3):NaN}toJSON(){return this.toISO()}toBSON(){return this.toJSDate()}toObject(e={}){if(!this.isValid)return{};const r={...this.c};return e.includeConfig&&(r.outputCalendar=this.outputCalendar,r.numberingSystem=this.loc.numberingSystem,r.locale=this.loc.locale),r}toJSDate(){return new Date(this.isValid?this.ts:NaN)}diff(e,r="milliseconds",n={}){if(!this.isValid||!e.isValid)return k.invalid("created by diffing an invalid DateTime");const i={locale:this.locale,numberingSystem:this.numberingSystem,...n},a=lu(r).map(k.normalizeUnit),s=e.valueOf()>this.valueOf(),o=s?this:e,l=s?e:this,c=fd(o,l,a,i);return s?c.negate():c}diffNow(e="milliseconds",r={}){return this.diff(T.now(),e,r)}until(e){return this.isValid?H.fromDateTimes(this,e):this}hasSame(e,r,n){if(!this.isValid)return!1;const i=e.valueOf(),a=this.setZone(e.zone,{keepLocalTime:!0});return a.startOf(r,n)<=i&&i<=a.endOf(r,n)}equals(e){return this.isValid&&e.isValid&&this.valueOf()===e.valueOf()&&this.zone.equals(e.zone)&&this.loc.equals(e.loc)}toRelative(e={}){if(!this.isValid)return null;const r=e.base||T.fromObject({},{zone:this.zone}),n=e.padding?this<r?-e.padding:e.padding:0;let i=["years","months","days","hours","minutes","seconds"],a=e.unit;return Array.isArray(e.unit)&&(i=e.unit,a=void 0),Oa(r,this.plus(n),{...e,numeric:"always",units:i,unit:a})}toRelativeCalendar(e={}){return this.isValid?Oa(e.base||T.fromObject({},{zone:this.zone}),this,{...e,numeric:"auto",units:["years","months","days"],calendary:!0}):null}static min(...e){if(!e.every(T.isDateTime))throw new K("min requires all arguments be DateTimes");return ga(e,r=>r.valueOf(),Math.min)}static max(...e){if(!e.every(T.isDateTime))throw new K("max requires all arguments be DateTimes");return ga(e,r=>r.valueOf(),Math.max)}static fromFormatExplain(e,r,n={}){const{locale:i=null,numberingSystem:a=null}=n,s=_.fromOpts({locale:i,numberingSystem:a,defaultToEN:!0});return $o(s,e,r)}static fromStringExplain(e,r,n={}){return T.fromFormatExplain(e,r,n)}static get DATE_SHORT(){return Pr}static get DATE_MED(){return Ms}static get DATE_MED_WITH_WEEKDAY(){return Vc}static get DATE_FULL(){return Cs}static get DATE_HUGE(){return _s}static get TIME_SIMPLE(){return Os}static get TIME_WITH_SECONDS(){return Ns}static get TIME_WITH_SHORT_OFFSET(){return Ls}static get TIME_WITH_LONG_OFFSET(){return Is}static get TIME_24_SIMPLE(){return Ps}static get TIME_24_WITH_SECONDS(){return Ds}static get TIME_24_WITH_SHORT_OFFSET(){return Vs}static get TIME_24_WITH_LONG_OFFSET(){return Hs}static get DATETIME_SHORT(){return Rs}static get DATETIME_SHORT_WITH_SECONDS(){return Fs}static get DATETIME_MED(){return zs}static get DATETIME_MED_WITH_SECONDS(){return Ws}static get DATETIME_MED_WITH_WEEKDAY(){return Hc}static get DATETIME_FULL(){return Us}static get DATETIME_FULL_WITH_SECONDS(){return Bs}static get DATETIME_HUGE(){return js}static get DATETIME_HUGE_WITH_SECONDS(){return Gs}}function Lt(t){if(T.isDateTime(t))return t;if(t&&t.valueOf&&Fe(t.valueOf()))return T.fromJSDate(t);if(t&&typeof t=="object")return T.fromObject(t);throw new K(`Unknown datetime argument: ${t}, of type ${typeof t}`)}const Ld=[(t,e)=>e in t,(t,e)=>e in t.constructor.prototype];function zt(t,e){return t?Ld.some(r=>{try{return r(t,e)}catch{return!1}}):!1}function je(t){let e;try{e=Reflect.ownKeys(t)}catch{}return e??[...Object.keys(t),...Object.getOwnPropertySymbols(t)]}function Id(t){return je(t).map(e=>t[e])}function Pd(t,e){return t.includes(e)}function Dd(t){return!!t}var La;(function(t){t.Upper="upper",t.Lower="lower"})(La||(La={}));var Ia;(function(t){t.FirstThenWait="first-then-wait",t.AfterWait="after-wait"})(Ia||(Ia={}));function Vd(t){return t?t.map(ko).filter(Dd).join(`
`):""}function ko(t){return t?t instanceof Error?t.message:zt(t,"message")?String(t.message):String(t):""}function gt(t){return!!t&&typeof t=="object"}function Mo(t,e){let r=!1;const n=je(t).reduce((i,a)=>{const s=e(a,t[a],t);return s instanceof Promise&&(r=!0),{...i,[a]:s}},{});return r?new Promise(async(i,a)=>{try{await Promise.all(je(n).map(async s=>{const o=await n[s];n[s]=o})),i(n)}catch(s){a(s)}}):n}function Hd(t,e){try{return Rd(t,e),!0}catch{return!1}}function Rd(t,e,r){if(t.length<e)throw new Error(r?`'${r}' is not at least '${e}' in length.`:`Array is not at least '${e}' in length.`)}function Fd(){return globalThis.crypto?globalThis.crypto:require("crypto").webcrypto}Fd();function zd(t,e){var o;const r=e==null?void 0:e.constructor,n=(o=t==null?void 0:t.constructor)==null?void 0:o.prototype,i=(t==null?void 0:t.constructor)===r,a=r&&n?n instanceof r:!1,s=i||a;return ht(t)===ht(e)&&s}const Co="__vir__shape__definition__key__do__not__use__in__actual__objects";function _o(t){return zt(t,Co)}const Oo=Symbol("and"),No=Symbol("instance"),Si=Symbol("enum"),Ai=Symbol("exact"),xi=Symbol("indexed-keys"),ki=Symbol("or"),Mi=Symbol("unknown"),Wd=[Oo,Si,Ai,xi,No,ki,Mi],Lo="__vir__shape__specifier__key__do__not__use__in__actual__objects";function ye(...t){return cr(t,Si)}function or(...t){return cr(t,Ai)}function Ud(...t){return cr(t,xi)}function Bd(...t){return cr(t,ki)}function jd(t){return cr([t],Mi)}function tn(t){return Je(t,Oo)}function rn(t){return Je(t,No)}function nn(t){return Je(t,Si)}function an(t){return Je(t,Ai)}function sn(t){return Je(t,xi)}function lr(t){return Je(t,ki)}function on(t){return Je(t,Mi)}function Je(t,e){const r=ur(t);return!!r&&r.specifierType===e}function cr(t,e){return{[Lo]:!0,specifierType:e,parts:t}}function He(t,e,r,n){const i=ur(e);if(i){if(rn(i))return t instanceof i.parts[0];if(tn(i))return i.parts.every(a=>He(t,a));if(lr(i))return i.parts.some(a=>He(t,a));if(an(i))return gt(t)?He(t,i.parts[0]):t===i.parts[0];if(nn(i))return Object.values(i.parts[0]).some(a=>a===t);if(sn(i))return gt(t)?Gd(t,i,!!r)&&Id(t).every(a=>He(a,i.parts[0].values)):!1;if(on(i))return!0}return n?e===t:zd(t,e)}function Gd(t,e,r){const n=e.parts[0].required,i=e.parts[0].keys;if(r)if(n){const a=Ci(e);return I(a,"boolean")?a:a.every(s=>je(t).some(o=>He(o,s,!1,!0)))}else return!0;else return je(t).every(a=>He(a,i))}function Ci(t){const e=t.parts[0].keys,r=ur(e);if(gn(e))return[e];if(r){if(rn(r))return!1;if(tn(r))return!1;if(lr(r)){const n=r.parts.map(a=>Ci(Ud({...t.parts[0],keys:a})));let i;return n.forEach(a=>{I(a,"boolean")&&(a&&i==null?i=!0:i=!1)}),I(i,"boolean")?i:n.flat().filter(gn)}else if(an(r)){const n=r.parts.filter(gn);return n.length!==r.parts.length?!1:n}else{if(nn(r))return Object.values(r.parts[0]);if(sn(r))return!1;if(on(r))return!0}}return!1}function ur(t){if(gt(t)&&zt(t,Lo)){if(!zt(t,"parts")||!I(t.parts,"array"))throw new Error("Found a shape specifier but its parts are not valid.");if(!zt(t,"specifierType")||!Pd(Wd,t.specifierType))throw new Error("Found a shape specifier but its specifier type is not valid.");return t}}class Pa extends TypeError{constructor(){super(...arguments),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"DefaultValueConstructionError"})}}function Kn(t,e=!1){return Ht(t)}function Ht(t){const e=ur(t);if(e)if(rn(e)){const r=e.parts[0];try{return new r}catch(n){throw new Pa(`Failed to create default value for classShape for class '${r.name}': ${ko(n)}`)}}else{if(lr(e)||an(e))return Ht(e.parts[0]);if(tn(e))return e.parts.reduce((r,n)=>Object.assign(r,Ht(n)),{});if(nn(e))return Object.values(e.parts[0])[0];if(sn(e)){const r=Ci(e);return!e.parts[0].required||I(r,"boolean")?{}:Object.fromEntries(r.map(n=>[n,Ht(e.parts[0].values)]))}else{if(on(e))return e.parts[0]??{};throw new Pa(`found specifier but it matches no expected specifiers: ${String(e.specifierType)}`)}}return _o(t)?Kn(t.shape):t instanceof RegExp?t:I(t,"array")?t.map(Ht):gt(t)?Mo(t,(r,n)=>Kn(n)):t}function G(t,e=!1){return{shape:t,get runTimeType(){throw new Error("runTimeType cannot be used as a value, it is only for types.")},isReadonly:e,get defaultValue(){return Kn(t)},[Co]:!0}}class X extends TypeError{constructor(){super(...arguments),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ShapeMismatchError"})}}function Jn(t,e,r={}){try{return Zt(t,e,r),!0}catch{return!1}}function Zt(t,e,r={}){fe({subject:t,shape:e.shape,keys:["top level"],options:{exactValues:!1,ignoreExtraKeys:!!r.allowExtraKeys}})}function Qn(t){return[t[0],...t.slice(1).map(e=>`'${String(e)}'`)].join(" -> ")}function fe({subject:t,shape:e,keys:r,options:n}){if(on(e))return!0;if(_o(e))return fe({subject:t,shape:e.shape,keys:r,options:n});const i=Qn(r);if(ur(t))throw new X(`Shape test subjects cannot be contain shape specifiers but one was found at ${i}.`);if(!He(t,e,!n.ignoreExtraKeys))throw new X(`Subject does not match shape definition at key ${i}`);if(I(e,"function"))return I(t,"function");if(rn(e))return t instanceof e.parts[0];if(gt(t)){const s=t,o=n.ignoreExtraKeys?{}:Object.fromEntries(Object.keys(s).map(u=>[u,!1])),l=[];let c=!1;if(lr(e)){const u=[];c=e.parts.some(d=>{try{const f=fe({subject:t,shape:d,keys:r,options:{...n}});return Object.assign(o,f),!0}catch(f){if(f instanceof X)return u.push(f),!1;throw f}}),!c&&Hd(u,1)&&l.push(u[0])}else if(tn(e))c=e.parts.every(u=>{try{const d=fe({subject:t,shape:u,keys:r,options:{...n,ignoreExtraKeys:!0}});return Object.assign(o,d),!0}catch(d){if(d instanceof X)return l.push(d),!1;throw d}});else if(an(e)){const u=fe({subject:t,shape:e.parts[0],keys:r,options:{...n,exactValues:!0}});Object.assign(o,u),c=!0}else{if(nn(e))throw new X(`Cannot compare an enum specifier to an object at ${i}`);if(I(e,"array")&&I(s,"array"))c=s.every((u,d)=>{const f=e.some(h=>{try{return fe({subject:u,shape:h,keys:[...r,d],options:n}),!0}catch(m){if(m instanceof X)return l.push(m),!1;throw m}});return o[d]=f,f});else if(sn(e)){const u=Mo(t,(d,f)=>(n.ignoreExtraKeys||fe({shape:e.parts[0].keys,subject:d,keys:[...r,d],options:n}),fe({shape:e.parts[0].values,subject:f,keys:[...r,d],options:n}),!0));Object.assign(o,u),c=!0}else{const u=Zd({keys:r,options:n,shape:e,subject:t});Object.assign(o,u),c=!0}}if(l.length)throw new X(Vd(l));if(!c){const d=`Failed on key(s): ${Object.keys(o).filter(f=>!o[f]).map(f=>Qn([...r,f])).join(",")}`;throw new X(d)}return n.ignoreExtraKeys||Object.entries(o).forEach(([u,d])=>{if(!d)throw new X(`subject as extra key '${u}' in ${i}.`)}),o}else if(n.exactValues)return t===e;return!0}function Zd({keys:t,options:e,shape:r,subject:n}){const i=Qn(t),a={};if(gt(r)){const s=new Set(je(r)),o=new Set(je(n));s.forEach(l=>{l in n&&o.add(l)}),e.ignoreExtraKeys||o.forEach(l=>{if(!s.has(l))throw new X(`Subject has extra key '${String(l)}' in ${i}`)}),s.forEach(l=>{var f;const c=r[l],u=lr(c)?c.parts.includes(void 0):!1,d=((f=c==null?void 0:c.includes)==null?void 0:f.call(c,void 0))||c===void 0;if(!o.has(l)&&!u&&!d)throw new X(`Subject missing key '${String(l)}' in ${i}`)}),o.forEach(l=>{const c=n[l];if(e.ignoreExtraKeys&&!s.has(l))return;const u=r[l];fe({subject:c,shape:u,keys:[...t,l],options:e}),a[l]=!0})}else throw new X(`shape definition at ${i} was not an object.`);return a}const qd=["Africa/Abidjan","Africa/Accra","Africa/Addis_Ababa","Africa/Algiers","Africa/Asmara","Africa/Bamako","Africa/Bangui","Africa/Banjul","Africa/Bissau","Africa/Blantyre","Africa/Brazzaville","Africa/Bujumbura","Africa/Cairo","Africa/Casablanca","Africa/Ceuta","Africa/Conakry","Africa/Dakar","Africa/Dar_es_Salaam","Africa/Djibouti","Africa/Douala","Africa/El_Aaiun","Africa/Freetown","Africa/Gaborone","Africa/Harare","Africa/Johannesburg","Africa/Juba","Africa/Kampala","Africa/Khartoum","Africa/Kigali","Africa/Kinshasa","Africa/Lagos","Africa/Libreville","Africa/Lome","Africa/Luanda","Africa/Lubumbashi","Africa/Lusaka","Africa/Malabo","Africa/Maputo","Africa/Maseru","Africa/Mbabane","Africa/Mogadishu","Africa/Monrovia","Africa/Nairobi","Africa/Ndjamena","Africa/Niamey","Africa/Nouakchott","Africa/Ouagadougou","Africa/Porto-Novo","Africa/Sao_Tome","Africa/Timbuktu","Africa/Tripoli","Africa/Tunis","Africa/Windhoek","America/Adak","America/Anchorage","America/Anguilla","America/Antigua","America/Araguaina","America/Argentina/Buenos_Aires","America/Argentina/Catamarca","America/Argentina/ComodRivadavia","America/Argentina/Cordoba","America/Argentina/Jujuy","America/Argentina/La_Rioja","America/Argentina/Mendoza","America/Argentina/Rio_Gallegos","America/Argentina/Salta","America/Argentina/San_Juan","America/Argentina/San_Luis","America/Argentina/Tucuman","America/Argentina/Ushuaia","America/Aruba","America/Asuncion","America/Atikokan","America/Bahia","America/Bahia_Banderas","America/Barbados","America/Belem","America/Belize","America/Blanc-Sablon","America/Boa_Vista","America/Bogota","America/Boise","America/Cambridge_Bay","America/Campo_Grande","America/Cancun","America/Caracas","America/Cayenne","America/Cayman","America/Chicago","America/Chihuahua","America/Coral_Harbour","America/Costa_Rica","America/Creston","America/Cuiaba","America/Curacao","America/Danmarkshavn","America/Dawson","America/Dawson_Creek","America/Denver","America/Detroit","America/Dominica","America/Edmonton","America/Eirunepe","America/El_Salvador","America/Ensenada","America/Fort_Nelson","America/Fortaleza","America/Glace_Bay","America/Goose_Bay","America/Grand_Turk","America/Grenada","America/Guadeloupe","America/Guatemala","America/Guayaquil","America/Guyana","America/Halifax","America/Havana","America/Hermosillo","America/Indiana/Indianapolis","America/Indiana/Knox","America/Indiana/Marengo","America/Indiana/Petersburg","America/Indiana/Tell_City","America/Indiana/Vevay","America/Indiana/Vincennes","America/Indiana/Winamac","America/Inuvik","America/Iqaluit","America/Jamaica","America/Juneau","America/Kentucky/Louisville","America/Kentucky/Monticello","America/La_Paz","America/Lima","America/Los_Angeles","America/Maceio","America/Managua","America/Manaus","America/Martinique","America/Matamoros","America/Mazatlan","America/Menominee","America/Merida","America/Metlakatla","America/Mexico_City","America/Miquelon","America/Moncton","America/Monterrey","America/Montevideo","America/Montreal","America/Montserrat","America/Nassau","America/New_York","America/Nipigon","America/Nome","America/Noronha","America/North_Dakota/Beulah","America/North_Dakota/Center","America/North_Dakota/New_Salem","America/Nuuk","America/Ojinaga","America/Panama","America/Pangnirtung","America/Paramaribo","America/Phoenix","America/Port-au-Prince","America/Port_of_Spain","America/Porto_Velho","America/Puerto_Rico","America/Punta_Arenas","America/Rainy_River","America/Rankin_Inlet","America/Recife","America/Regina","America/Resolute","America/Rio_Branco","America/Rosario","America/Santarem","America/Santiago","America/Santo_Domingo","America/Sao_Paulo","America/Scoresbysund","America/Sitka","America/St_Johns","America/St_Kitts","America/St_Lucia","America/St_Thomas","America/St_Vincent","America/Swift_Current","America/Tegucigalpa","America/Thule","America/Thunder_Bay","America/Tijuana","America/Toronto","America/Tortola","America/Vancouver","America/Whitehorse","America/Winnipeg","America/Yakutat","America/Yellowknife","Antarctica/Casey","Antarctica/Davis","Antarctica/DumontDUrville","Antarctica/Macquarie","Antarctica/Mawson","Antarctica/McMurdo","Antarctica/Palmer","Antarctica/Rothera","Antarctica/Syowa","Antarctica/Troll","Antarctica/Vostok","Asia/Aden","Asia/Almaty","Asia/Amman","Asia/Anadyr","Asia/Aqtau","Asia/Aqtobe","Asia/Ashgabat","Asia/Atyrau","Asia/Baghdad","Asia/Bahrain","Asia/Baku","Asia/Bangkok","Asia/Barnaul","Asia/Beirut","Asia/Bishkek","Asia/Brunei","Asia/Chita","Asia/Choibalsan","Asia/Chongqing","Asia/Colombo","Asia/Damascus","Asia/Dhaka","Asia/Dili","Asia/Dubai","Asia/Dushanbe","Asia/Famagusta","Asia/Gaza","Asia/Harbin","Asia/Hebron","Asia/Ho_Chi_Minh","Asia/Hong_Kong","Asia/Hovd","Asia/Irkutsk","Asia/Jakarta","Asia/Jayapura","Asia/Jerusalem","Asia/Kabul","Asia/Kamchatka","Asia/Karachi","Asia/Kashgar","Asia/Kathmandu","Asia/Khandyga","Asia/Kolkata","Asia/Krasnoyarsk","Asia/Kuala_Lumpur","Asia/Kuching","Asia/Kuwait","Asia/Macau","Asia/Magadan","Asia/Makassar","Asia/Manila","Asia/Muscat","Asia/Nicosia","Asia/Novokuznetsk","Asia/Novosibirsk","Asia/Omsk","Asia/Oral","Asia/Phnom_Penh","Asia/Pontianak","Asia/Pyongyang","Asia/Qatar","Asia/Qostanay","Asia/Qyzylorda","Asia/Riyadh","Asia/Sakhalin","Asia/Samarkand","Asia/Seoul","Asia/Shanghai","Asia/Singapore","Asia/Srednekolymsk","Asia/Taipei","Asia/Tashkent","Asia/Tbilisi","Asia/Tehran","Asia/Tel_Aviv","Asia/Thimphu","Asia/Tokyo","Asia/Tomsk","Asia/Ulaanbaatar","Asia/Urumqi","Asia/Ust-Nera","Asia/Vientiane","Asia/Vladivostok","Asia/Yakutsk","Asia/Yangon","Asia/Yekaterinburg","Asia/Yerevan","Atlantic/Azores","Atlantic/Bermuda","Atlantic/Canary","Atlantic/Cape_Verde","Atlantic/Faroe","Atlantic/Jan_Mayen","Atlantic/Madeira","Atlantic/Reykjavik","Atlantic/South_Georgia","Atlantic/St_Helena","Atlantic/Stanley","Australia/Adelaide","Australia/Brisbane","Australia/Broken_Hill","Australia/Currie","Australia/Darwin","Australia/Eucla","Australia/Hobart","Australia/Lindeman","Australia/Lord_Howe","Australia/Melbourne","Australia/Perth","Australia/Sydney","CET","CST6CDT","EET","EST","EST5EDT","Etc/GMT+1","Etc/GMT+10","Etc/GMT+11","Etc/GMT+12","Etc/GMT+2","Etc/GMT+3","Etc/GMT+4","Etc/GMT+5","Etc/GMT+6","Etc/GMT+7","Etc/GMT+8","Etc/GMT+9","Etc/GMT-1","Etc/GMT-10","Etc/GMT-11","Etc/GMT-12","Etc/GMT-13","Etc/GMT-14","Etc/GMT-2","Etc/GMT-3","Etc/GMT-4","Etc/GMT-5","Etc/GMT-6","Etc/GMT-7","Etc/GMT-8","Etc/GMT-9","Europe/Amsterdam","Europe/Andorra","Europe/Astrakhan","Europe/Athens","Europe/Belfast","Europe/Belgrade","Europe/Berlin","Europe/Brussels","Europe/Bucharest","Europe/Budapest","Europe/Chisinau","Europe/Copenhagen","Europe/Dublin","Europe/Gibraltar","Europe/Guernsey","Europe/Helsinki","Europe/Isle_of_Man","Europe/Istanbul","Europe/Jersey","Europe/Kaliningrad","Europe/Kirov","Europe/Kyiv","Europe/Lisbon","Europe/Ljubljana","Europe/London","Europe/Luxembourg","Europe/Madrid","Europe/Malta","Europe/Minsk","Europe/Monaco","Europe/Moscow","Europe/Oslo","Europe/Paris","Europe/Prague","Europe/Riga","Europe/Rome","Europe/Samara","Europe/Sarajevo","Europe/Saratov","Europe/Simferopol","Europe/Skopje","Europe/Sofia","Europe/Stockholm","Europe/Tallinn","Europe/Tirane","Europe/Tiraspol","Europe/Ulyanovsk","Europe/Uzhgorod","Europe/Vaduz","Europe/Vienna","Europe/Vilnius","Europe/Volgograd","Europe/Warsaw","Europe/Zagreb","Europe/Zaporozhye","Europe/Zurich","Factory","HST","Indian/Antananarivo","Indian/Chagos","Indian/Christmas","Indian/Cocos","Indian/Comoro","Indian/Kerguelen","Indian/Mahe","Indian/Maldives","Indian/Mauritius","Indian/Mayotte","Indian/Reunion","MET","MST","MST7MDT","PST8PDT","Pacific/Apia","Pacific/Auckland","Pacific/Bougainville","Pacific/Chatham","Pacific/Chuuk","Pacific/Easter","Pacific/Efate","Pacific/Enderbury","Pacific/Fakaofo","Pacific/Fiji","Pacific/Funafuti","Pacific/Galapagos","Pacific/Gambier","Pacific/Guadalcanal","Pacific/Guam","Pacific/Honolulu","Pacific/Johnston","Pacific/Kanton","Pacific/Kiritimati","Pacific/Kosrae","Pacific/Kwajalein","Pacific/Majuro","Pacific/Marquesas","Pacific/Midway","Pacific/Nauru","Pacific/Niue","Pacific/Norfolk","Pacific/Noumea","Pacific/Pago_Pago","Pacific/Palau","Pacific/Pitcairn","Pacific/Pohnpei","Pacific/Port_Moresby","Pacific/Rarotonga","Pacific/Saipan","Pacific/Tahiti","Pacific/Tarawa","Pacific/Tongatapu","Pacific/Wake","Pacific/Wallis","UTC","WET"],Yd=qd.reduce((t,e)=>(t[e]=e,t),{});P.defaultZone.name;Yd.UTC;var Da;(function(t){t.Date="date",t.Time="time",t.DateTime="datetime-local"})(Da||(Da={}));const Kd=["hour","minute","second","millisecond"];var S;(function(t){t.Years="years",t.Quarters="quarters",t.Months="months",t.Weeks="weeks",t.Days="days",t.Hours="hours",t.Minutes="minutes",t.Seconds="seconds",t.Milliseconds="milliseconds"})(S||(S={}));S.Milliseconds+"",S.Seconds+"",S.Minutes+"",S.Hours+"",S.Days+"",S.Weeks+"",S.Months+"",S.Quarters+"",S.Years+"";S.Milliseconds,S.Seconds,S.Minutes,S.Hours,S.Days,S.Weeks,S.Months,S.Quarters,S.Years;S.Years+"",S.Quarters+"",S.Months+"",S.Weeks+"",S.Days+"",S.Hours+"",S.Minutes+"",S.Seconds+"",S.Milliseconds+"";var Va;(function(t){t.AdditiveUnits="additive-units",t.EquivalentUnits="equivalent-units"})(Va||(Va={}));const Jd={year:0,month:1,day:1,hour:0,minute:0,second:0,millisecond:0};Nc(Jd,Kd);P.defaultLocale;S.Milliseconds+"",S.Seconds+"",S.Minutes+"",S.Hours+"",S.Days+"",S.Weeks+"",S.Months+"",S.Quarters+"",S.Years+"";const Qd=G({listen(t){return()=>!1},destroy(){},removeListener(t){return!1},value:jd()});function xn(t){return Jn(t,Qd,{allowExtraKeys:!0})}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mr=globalThis,_i=Mr.ShadowRoot&&(Mr.ShadyCSS===void 0||Mr.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Oi=Symbol(),Ha=new WeakMap;let Io=class{constructor(e,r,n){if(this._$cssResult$=!0,n!==Oi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o;const r=this.t;if(_i&&e===void 0){const n=r!==void 0&&r.length===1;n&&(e=Ha.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Ha.set(r,e))}return e}toString(){return this.cssText}};const de=t=>new Io(typeof t=="string"?t:t+"",void 0,Oi),Cr=(t,...e)=>{const r=t.length===1?t[0]:e.reduce((n,i,a)=>n+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[a+1],t[0]);return new Io(r,t,Oi)},Xd=(t,e)=>{if(_i)t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of e){const n=document.createElement("style"),i=Mr.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=r.cssText,t.appendChild(n)}},Ra=_i?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(const n of e.cssRules)r+=n.cssText;return de(r)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ef,defineProperty:tf,getOwnPropertyDescriptor:rf,getOwnPropertyNames:nf,getOwnPropertySymbols:af,getPrototypeOf:sf}=Object,ke=globalThis,Fa=ke.trustedTypes,of=Fa?Fa.emptyScript:"",kn=ke.reactiveElementPolyfillSupport,Wt=(t,e)=>t,Rr={toAttribute(t,e){switch(e){case Boolean:t=t?of:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},Ni=(t,e)=>!ef(t,e),za={attribute:!0,type:String,converter:Rr,reflect:!1,hasChanged:Ni};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),ke.litPropertyMetadata??(ke.litPropertyMetadata=new WeakMap);class nt extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=za){if(r.state&&(r.attribute=!1),this._$Ei(),this.elementProperties.set(e,r),!r.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,r);i!==void 0&&tf(this.prototype,e,i)}}static getPropertyDescriptor(e,r,n){const{get:i,set:a}=rf(this.prototype,e)??{get(){return this[r]},set(s){this[r]=s}};return{get(){return i==null?void 0:i.call(this)},set(s){const o=i==null?void 0:i.call(this);a.call(this,s),this.requestUpdate(e,o,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??za}static _$Ei(){if(this.hasOwnProperty(Wt("elementProperties")))return;const e=sf(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Wt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Wt("properties"))){const r=this.properties,n=[...nf(r),...af(r)];for(const i of n)this.createProperty(i,r[i])}const e=this[Symbol.metadata];if(e!==null){const r=litPropertyMetadata.get(e);if(r!==void 0)for(const[n,i]of r)this.elementProperties.set(n,i)}this._$Eh=new Map;for(const[r,n]of this.elementProperties){const i=this._$Eu(r,n);i!==void 0&&this._$Eh.set(i,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const r=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const i of n)r.unshift(Ra(i))}else e!==void 0&&r.push(Ra(e));return r}static _$Eu(e,r){const n=r.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(r=>r(this))}addController(e){var r;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((r=e.hostConnected)==null||r.call(e))}removeController(e){var r;(r=this._$EO)==null||r.delete(e)}_$E_(){const e=new Map,r=this.constructor.elementProperties;for(const n of r.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Xd(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(r=>{var n;return(n=r.hostConnected)==null?void 0:n.call(r)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(r=>{var n;return(n=r.hostDisconnected)==null?void 0:n.call(r)})}attributeChangedCallback(e,r,n){this._$AK(e,n)}_$EC(e,r){var a;const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(i!==void 0&&n.reflect===!0){const s=(((a=n.converter)==null?void 0:a.toAttribute)!==void 0?n.converter:Rr).toAttribute(r,n.type);this._$Em=e,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,r){var a;const n=this.constructor,i=n._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const s=n.getPropertyOptions(i),o=typeof s.converter=="function"?{fromAttribute:s.converter}:((a=s.converter)==null?void 0:a.fromAttribute)!==void 0?s.converter:Rr;this._$Em=i,this[i]=o.fromAttribute(r,s.type),this._$Em=null}}requestUpdate(e,r,n){if(e!==void 0){if(n??(n=this.constructor.getPropertyOptions(e)),!(n.hasChanged??Ni)(this[e],r))return;this.P(e,r,n)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,r,n){this._$AL.has(e)||this._$AL.set(e,r),n.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var n;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[a,s]of this._$Ep)this[a]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[a,s]of i)s.wrapped!==!0||this._$AL.has(a)||this[a]===void 0||this.P(a,this[a],s)}let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),(n=this._$EO)==null||n.forEach(i=>{var a;return(a=i.hostUpdate)==null?void 0:a.call(i)}),this.update(r)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(r)}willUpdate(e){}_$AE(e){var r;(r=this._$EO)==null||r.forEach(n=>{var i;return(i=n.hostUpdated)==null?void 0:i.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(r=>this._$EC(r,this[r]))),this._$EU()}updated(e){}firstUpdated(e){}}nt.elementStyles=[],nt.shadowRootOptions={mode:"open"},nt[Wt("elementProperties")]=new Map,nt[Wt("finalized")]=new Map,kn==null||kn({ReactiveElement:nt}),(ke.reactiveElementVersions??(ke.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ut=globalThis,Fr=Ut.trustedTypes,Wa=Fr?Fr.createPolicy("lit-html",{createHTML:t=>t}):void 0,Li="$lit$",he=`lit$${(Math.random()+"").slice(9)}$`,Ii="?"+he,lf=`<${Ii}>`,Ge=document,qt=()=>Ge.createComment(""),Yt=t=>t===null||typeof t!="object"&&typeof t!="function",Po=Array.isArray,Do=t=>Po(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",Mn=`[ 	
\f\r]`,It=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ua=/-->/g,Ba=/>/g,Oe=RegExp(`>|${Mn}(?:([^\\s"'>=/]+)(${Mn}*=${Mn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ja=/'/g,Ga=/"/g,Vo=/^(?:script|style|textarea|title)$/i,cf=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),uf=cf(1),oe=Symbol.for("lit-noChange"),O=Symbol.for("lit-nothing"),Za=new WeakMap,Re=Ge.createTreeWalker(Ge,129);function Ho(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Wa!==void 0?Wa.createHTML(e):e}const Ro=(t,e)=>{const r=t.length-1,n=[];let i,a=e===2?"<svg>":"",s=It;for(let o=0;o<r;o++){const l=t[o];let c,u,d=-1,f=0;for(;f<l.length&&(s.lastIndex=f,u=s.exec(l),u!==null);)f=s.lastIndex,s===It?u[1]==="!--"?s=Ua:u[1]!==void 0?s=Ba:u[2]!==void 0?(Vo.test(u[2])&&(i=RegExp("</"+u[2],"g")),s=Oe):u[3]!==void 0&&(s=Oe):s===Oe?u[0]===">"?(s=i??It,d=-1):u[1]===void 0?d=-2:(d=s.lastIndex-u[2].length,c=u[1],s=u[3]===void 0?Oe:u[3]==='"'?Ga:ja):s===Ga||s===ja?s=Oe:s===Ua||s===Ba?s=It:(s=Oe,i=void 0);const h=s===Oe&&t[o+1].startsWith("/>")?" ":"";a+=s===It?l+lf:d>=0?(n.push(c),l.slice(0,d)+Li+l.slice(d)+he+h):l+he+(d===-2?o:h)}return[Ho(t,a+(t[r]||"<?>")+(e===2?"</svg>":"")),n]};class Kt{constructor({strings:e,_$litType$:r},n){let i;this.parts=[];let a=0,s=0;const o=e.length-1,l=this.parts,[c,u]=Ro(e,r);if(this.el=Kt.createElement(c,n),Re.currentNode=this.el.content,r===2){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=Re.nextNode())!==null&&l.length<o;){if(i.nodeType===1){if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(Li)){const f=u[s++],h=i.getAttribute(d).split(he),m=/([.?@])?(.*)/.exec(f);l.push({type:1,index:a,name:m[2],strings:h,ctor:m[1]==="."?zo:m[1]==="?"?Wo:m[1]==="@"?Uo:dr}),i.removeAttribute(d)}else d.startsWith(he)&&(l.push({type:6,index:a}),i.removeAttribute(d));if(Vo.test(i.tagName)){const d=i.textContent.split(he),f=d.length-1;if(f>0){i.textContent=Fr?Fr.emptyScript:"";for(let h=0;h<f;h++)i.append(d[h],qt()),Re.nextNode(),l.push({type:2,index:++a});i.append(d[f],qt())}}}else if(i.nodeType===8)if(i.data===Ii)l.push({type:2,index:a});else{let d=-1;for(;(d=i.data.indexOf(he,d+1))!==-1;)l.push({type:7,index:a}),d+=he.length-1}a++}}static createElement(e,r){const n=Ge.createElement("template");return n.innerHTML=e,n}}function Ze(t,e,r=t,n){var s,o;if(e===oe)return e;let i=n!==void 0?(s=r._$Co)==null?void 0:s[n]:r._$Cl;const a=Yt(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==a&&((o=i==null?void 0:i._$AO)==null||o.call(i,!1),a===void 0?i=void 0:(i=new a(t),i._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=i:r._$Cl=i),i!==void 0&&(e=Ze(t,i._$AS(t,e.values),i,n)),e}class Fo{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:r},parts:n}=this._$AD,i=((e==null?void 0:e.creationScope)??Ge).importNode(r,!0);Re.currentNode=i;let a=Re.nextNode(),s=0,o=0,l=n[0];for(;l!==void 0;){if(s===l.index){let c;l.type===2?c=new xt(a,a.nextSibling,this,e):l.type===1?c=new l.ctor(a,l.name,l.strings,this,e):l.type===6&&(c=new Bo(a,this,e)),this._$AV.push(c),l=n[++o]}s!==(l==null?void 0:l.index)&&(a=Re.nextNode(),s++)}return Re.currentNode=Ge,i}p(e){let r=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}}class xt{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,r,n,i){this.type=2,this._$AH=O,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Ze(this,e,r),Yt(e)?e===O||e==null||e===""?(this._$AH!==O&&this._$AR(),this._$AH=O):e!==this._$AH&&e!==oe&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Do(e)?this.k(e):this._(e)}S(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.S(e))}_(e){this._$AH!==O&&Yt(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ge.createTextNode(e)),this._$AH=e}$(e){var a;const{values:r,_$litType$:n}=e,i=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Kt.createElement(Ho(n.h,n.h[0]),this.options)),n);if(((a=this._$AH)==null?void 0:a._$AD)===i)this._$AH.p(r);else{const s=new Fo(i,this),o=s.u(this.options);s.p(r),this.T(o),this._$AH=s}}_$AC(e){let r=Za.get(e.strings);return r===void 0&&Za.set(e.strings,r=new Kt(e)),r}k(e){Po(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let n,i=0;for(const a of e)i===r.length?r.push(n=new xt(this.S(qt()),this.S(qt()),this,this.options)):n=r[i],n._$AI(a),i++;i<r.length&&(this._$AR(n&&n._$AB.nextSibling,i),r.length=i)}_$AR(e=this._$AA.nextSibling,r){var n;for((n=this._$AP)==null?void 0:n.call(this,!1,!0,r);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var r;this._$AM===void 0&&(this._$Cv=e,(r=this._$AP)==null||r.call(this,e))}}class dr{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,i,a){this.type=1,this._$AH=O,this._$AN=void 0,this.element=e,this.name=r,this._$AM=i,this.options=a,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=O}_$AI(e,r=this,n,i){const a=this.strings;let s=!1;if(a===void 0)e=Ze(this,e,r,0),s=!Yt(e)||e!==this._$AH&&e!==oe,s&&(this._$AH=e);else{const o=e;let l,c;for(e=a[0],l=0;l<a.length-1;l++)c=Ze(this,o[n+l],r,l),c===oe&&(c=this._$AH[l]),s||(s=!Yt(c)||c!==this._$AH[l]),c===O?e=O:e!==O&&(e+=(c??"")+a[l+1]),this._$AH[l]=c}s&&!i&&this.j(e)}j(e){e===O?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class zo extends dr{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===O?void 0:e}}class Wo extends dr{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==O)}}class Uo extends dr{constructor(e,r,n,i,a){super(e,r,n,i,a),this.type=5}_$AI(e,r=this){if((e=Ze(this,e,r,0)??O)===oe)return;const n=this._$AH,i=e===O&&n!==O||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,a=e!==O&&(n===O||i);i&&this.element.removeEventListener(this.name,this,n),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var r;typeof this._$AH=="function"?this._$AH.call(((r=this.options)==null?void 0:r.host)??this.element,e):this._$AH.handleEvent(e)}}class Bo{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Ze(this,e)}}const df={P:Li,A:he,C:Ii,M:1,L:Ro,R:Fo,D:Do,V:Ze,I:xt,H:dr,N:Wo,U:Uo,B:zo,F:Bo},Cn=Ut.litHtmlPolyfillSupport;Cn==null||Cn(Kt,xt),(Ut.litHtmlVersions??(Ut.litHtmlVersions=[])).push("3.1.2");const ff=(t,e,r)=>{const n=(r==null?void 0:r.renderBefore)??e;let i=n._$litPart$;if(i===void 0){const a=(r==null?void 0:r.renderBefore)??null;n._$litPart$=i=new xt(e.insertBefore(qt(),a),a,void 0,r??{})}return i._$AI(t),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Bt=class extends nt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var r;const e=super.createRenderRoot();return(r=this.renderOptions).renderBefore??(r.renderBefore=e.firstChild),e}update(e){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ff(r,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return oe}};var Ts;Bt._$litElement$=!0,Bt.finalized=!0,(Ts=globalThis.litElementHydrateSupport)==null||Ts.call(globalThis,{LitElement:Bt});const _n=globalThis.litElementPolyfillSupport;_n==null||_n({LitElement:Bt});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:hf}=df,qa=()=>document.createComment(""),Pt=(t,e,r)=>{var a;const n=t._$AA.parentNode,i=e===void 0?t._$AB:e._$AA;if(r===void 0){const s=n.insertBefore(qa(),i),o=n.insertBefore(qa(),i);r=new hf(s,o,t,t.options)}else{const s=r._$AB.nextSibling,o=r._$AM,l=o!==t;if(l){let c;(a=r._$AQ)==null||a.call(r,t),r._$AM=t,r._$AP!==void 0&&(c=t._$AU)!==o._$AU&&r._$AP(c)}if(s!==i||l){let c=r._$AA;for(;c!==s;){const u=c.nextSibling;n.insertBefore(c,i),c=u}}}return r},Ne=(t,e,r=t)=>(t._$AI(e,r),t),mf={},pf=(t,e=mf)=>t._$AH=e,gf=t=>t._$AH,On=t=>{var n;(n=t._$AP)==null||n.call(t,!1,!0);let e=t._$AA;const r=t._$AB.nextSibling;for(;e!==r;){const i=e.nextSibling;e.remove(),e=i}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ln={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Qe=t=>(...e)=>({_$litDirective$:t,values:e});class Xe{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wf={attribute:!0,type:String,converter:Rr,reflect:!1,hasChanged:Ni},yf=(t=wf,e,r)=>{const{kind:n,metadata:i}=r;let a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),a.set(r.name,t),n==="accessor"){const{name:s}=r;return{set(o){const l=e.get.call(this);e.set.call(this,o),this.requestUpdate(s,l,t)},init(o){return o!==void 0&&this.P(s,void 0,t),o}}}if(n==="setter"){const{name:s}=r;return function(o){const l=this[s];e.call(this,o),this.requestUpdate(s,l,t)}}throw Error("Unsupported decorator location: "+n)};function vf(t){return(e,r)=>typeof r=="object"?yf(t,e,r):((n,i,a)=>{const s=i.hasOwnProperty(a);return i.constructor.createProperty(a,s?{...n,wrapped:!0}:n),s?Object.getOwnPropertyDescriptor(i,a):void 0})(t,e,r)}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const cn=Qe(class extends Xe{constructor(t){var e;if(super(t),t.type!==ln.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var n,i;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(a=>a!=="")));for(const a in e)e[a]&&!((n=this.nt)!=null&&n.has(a))&&this.st.add(a);return this.render(e)}const r=t.element.classList;for(const a of this.st)a in e||(r.remove(a),this.st.delete(a));for(const a in e){const s=!!e[a];s===this.st.has(a)||(i=this.nt)!=null&&i.has(a)||(s?(r.add(a),this.st.add(a)):(r.remove(a),this.st.delete(a)))}return oe}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class zr extends Xe{constructor(e){if(super(e),this.it=O,e.type!==ln.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===O||e==null)return this._t=void 0,this.it=e;if(e===oe)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}}zr.directiveName="unsafeHTML",zr.resultType=1;const bf=Qe(zr);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Ya extends zr{}Ya.directiveName="unsafeSVG",Ya.resultType=2;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ef(t,e,r){return t?e(t):r==null?void 0:r(t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ka=(t,e,r)=>{const n=new Map;for(let i=e;i<=r;i++)n.set(t[i],i);return n},$f=Qe(class extends Xe{constructor(t){if(super(t),t.type!==ln.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,e,r){let n;r===void 0?r=e:e!==void 0&&(n=e);const i=[],a=[];let s=0;for(const o of t)i[s]=n?n(o,s):s,a[s]=r(o,s),s++;return{values:a,keys:i}}render(t,e,r){return this.dt(t,e,r).values}update(t,[e,r,n]){const i=gf(t),{values:a,keys:s}=this.dt(e,r,n);if(!Array.isArray(i))return this.ut=s,a;const o=this.ut??(this.ut=[]),l=[];let c,u,d=0,f=i.length-1,h=0,m=a.length-1;for(;d<=f&&h<=m;)if(i[d]===null)d++;else if(i[f]===null)f--;else if(o[d]===s[h])l[h]=Ne(i[d],a[h]),d++,h++;else if(o[f]===s[m])l[m]=Ne(i[f],a[m]),f--,m--;else if(o[d]===s[m])l[m]=Ne(i[d],a[m]),Pt(t,l[m+1],i[d]),d++,m--;else if(o[f]===s[h])l[h]=Ne(i[f],a[h]),Pt(t,i[d],i[f]),f--,h++;else if(c===void 0&&(c=Ka(s,h,m),u=Ka(o,d,f)),c.has(o[d]))if(c.has(o[f])){const b=u.get(s[h]),V=b!==void 0?i[b]:null;if(V===null){const Y=Pt(t,i[d]);Ne(Y,a[h]),l[h]=Y}else l[h]=Ne(V,a[h]),Pt(t,i[d],V),i[b]=null;h++}else On(i[f]),f--;else On(i[d]),d++;for(;h<=m;){const b=Pt(t,l[m+1]);Ne(b,a[h]),l[h++]=b}for(;d<=f;){const b=i[d++];b!==null&&On(b)}return this.ut=s,pf(t,l),oe}}),Tf=$f;class jo extends Bt{}function Ja(t){let e;try{e=Reflect.ownKeys(t)}catch{}return e??[...Object.keys(t),...Object.getOwnPropertySymbols(t)]}var wt;(function(t){t.Upper="upper",t.Lower="lower"})(wt||(wt={}));function Sf(t){return t.toLowerCase()!==t.toUpperCase()}function Qa(t,e,r){if(!t&&(r!=null&&r.blockNoCaseCharacters))return!1;for(let n=0;n<t.length;n++){const i=t[n]||"";if(!Sf(i)){if(r!=null&&r.blockNoCaseCharacters)return!1;continue}if(e===wt.Upper&&i!==i.toUpperCase())return!1;if(e===wt.Lower&&i!==i.toLowerCase())return!1}return!0}function Af(t){return t.split("").reduce((r,n,i,a)=>{const s=i>0&&a[i-1]||"",o=i<a.length-1&&a[i+1]||"",l=Qa(s,wt.Lower,{blockNoCaseCharacters:!0})||Qa(o,wt.Lower,{blockNoCaseCharacters:!0});return n===n.toLowerCase()||i===0||!l?r+=n:r+=`-${n.toLowerCase()}`,r},"").toLowerCase()}var Xa;(function(t){t.FirstThenWait="first-then-wait",t.AfterWait="after-wait"})(Xa||(Xa={}));function xf(t){return!!t&&typeof t=="object"}function kf(t,e){let r=!1;const n=Ja(t).reduce((i,a)=>{const s=e(a,t[a],t);return s instanceof Promise&&(r=!0),{...i,[a]:s}},{});return r?new Promise(async(i,a)=>{try{await Promise.all(Ja(n).map(async s=>{const o=await n[s];n[s]=o})),i(n)}catch(s){a(s)}}):n}function Mf(){return globalThis.crypto?globalThis.crypto:require("crypto").webcrypto}Mf();function et(t){if(xf(t))return kf(t,(r,n)=>{if(!I(r,"string"))throw new Error(`Invalid CSS var name '${String(r)}' given. CSS var names must be strings.`);if(Af(r).toLowerCase()!==r)throw new Error(`Invalid CSS var name '${r}' given. CSS var names must be in lower kebab case.`);const a=n,s=r.startsWith("--")?de(r):r.startsWith("-")?Cr`-${de(r)}`:Cr`--${de(r)}`;return{name:s,value:Cr`var(${s}, ${de(a)})`,default:String(a)}});throw new Error(`Invalid setup input for '${et.name}' function.`)}function es({onElement:t,toValue:e,forCssVar:r}){t.style.setProperty(String(r.name),String(e))}function Cf(t,e,r){const n=!e.length&&!r.length,i=t.length?!1:!e.filter(o=>!!o.index).length;if(n||i)return[...t];const a=t.map(o=>[o]);return a.length||(a[0]=[]),r.forEach(o=>{o>=0&&o<t.length&&(a[o]=[])}),e.forEach(o=>{const l=a[o.index];l&&l.splice(0,0,...o.values)}),a.flat()}function _r(t){return Ue(t,"_elementVirIsMinimalDefinitionWithInputs")&&!!t._elementVirIsMinimalDefinitionWithInputs}function Pi(t){return Ue(t,"tagName")&&!!t.tagName&&typeof t.tagName=="string"}function Go(t){return jl(t,e=>{if(_r(e))return e.definition;if(Pi(e))return e.tagInterpolationKey||e},mi)}const Zo=new WeakMap;function _f(t,e){var i;const r=Go(e);return(i=qo(Zo,[t,...r]).value)==null?void 0:i.template}function Of(t,e,r){const n=Go(e);return Ko(Zo,[t,...n],r)}function qo(t,e,r=0){const{currentTemplateAndNested:n,reason:i}=Yo(t,e,r);return n?r===e.length-1?{value:n,reason:"reached end of keys array"}:n.nested?qo(n.nested,e,r+1):{value:void 0,reason:`map at key index ${r} did not have nested maps`}:{value:n,reason:i}}function Yo(t,e,r){const n=e[r];if(n==null)return{currentKey:void 0,currentTemplateAndNested:void 0,reason:`key at index ${r} not found`};if(!t.has(n))return{currentKey:n,currentTemplateAndNested:void 0,reason:`key at index ${r} was not in the map`};const i=t.get(n);return i==null?{currentKey:n,currentTemplateAndNested:void 0,reason:`value at key at index ${r} was undefined`}:{currentKey:n,currentTemplateAndNested:i,reason:"key and value exists"}}function Ko(t,e,r,n=0){const{currentTemplateAndNested:i,currentKey:a,reason:s}=Yo(t,e,n);if(!a)return{result:!1,reason:s};const o=i??{nested:void 0,template:void 0};if(i||t.set(a,o),n===e.length-1)return o.template=r,{result:!0,reason:"set value at end of keys array"};const l=o.nested??new WeakMap;return o.nested||(o.nested=l),Ko(l,e,r,n+1)}const Nf=new WeakMap;function Jo(t,e,r){const n=_f(t,e),i=n??r();if(!n){const o=Of(t,e,i);if(o.result)Nf.set(t,i);else throw new Error(`Failed to set template transform: ${o.reason}`)}const a=i.valuesTransform(e),s=Cf(e,a.valueInsertions,a.valueIndexDeletions);return{strings:i.templateStrings,values:s}}function Qo(t,e,r,n){const i=[],a=[],s=[],o=[];return t.forEach((c,u)=>{const d=i.length-1,f=i[d],h=u-1,m=e[h];n&&n(c);let b,V=[];if(typeof f=="string"&&(b=r(f,c,m),b)){i[d]=f+b.replacement,s.push(h);const ce=b.getExtraValues;V=ce?ce(m):[],V.length&&ce?(i[d]+=" ",V.forEach((Ct,_t)=>{_t&&i.push(" ")}),o.push(Ct=>{const _t=Ct[h],hr=ce(_t);return{index:h,values:hr}}),i.push(c)):i[d]+=c}b||i.push(c);const Y=t.raw[u];b?(a[d]=a[d]+b.replacement+Y,V.length&&V.forEach(()=>{a.push("")})):a.push(Y)}),{templateStrings:Object.assign([],i,{raw:a}),valuesTransform(c){const u=o.map(d=>d(c)).flat();return{valueIndexDeletions:s,valueInsertions:u}}}}function Lf(...[t,e,r]){if(Pi(r))return{replacement:r.tagName,getExtraValues:void 0}}function If(t,e){return Qo(t,e,Lf)}function v(t,...e){const r=Jo(t,e,()=>If(t,e));return Cr(r.strings,...r.values)}const Pf={ignoreUnsetInputs:!0,allowPolymorphicState:!1};function Xo(t){const e=t.getRootNode();if(!(e instanceof ShadowRoot))return!1;const r=e.host;return r instanceof jo?!0:Xo(r)}function el(t,e){const r=t.instanceState;j(e).forEach(n=>{if(r&&n in r)throw new Error(`Cannot set input '${n}' on '${t.tagName}'. '${t.tagName}' already has a state property with the same name.`);"instanceInputs"in t?t.instanceInputs[n]=e[n]:t[n]=e[n]}),"instanceInputs"in t&&j(t.instanceInputs).forEach(n=>{n in e||(t.instanceInputs[n]=void 0)}),Df(t)}function Df(t){t._haveInputsBeenSet||(t._haveInputsBeenSet=!0)}function ts(t,e){const r=[t,"-"].join("");Object.keys(e).forEach(n=>{if(!n.startsWith(r))throw new Error(`Invalid CSS property name '${n}' in '${t}': CSS property names must begin with the element's tag name.`)})}class Vf extends CustomEvent{get type(){return this._type}constructor(e,r){super(typeof e=="string"?e:e.type,{detail:r,bubbles:!0,composed:!0}),Object.defineProperty(this,"_type",{enumerable:!0,configurable:!0,writable:!0,value:""})}}function kt(){return t=>{var e;return e=class extends Vf{constructor(r){super(t,r),Object.defineProperty(this,"_type",{enumerable:!0,configurable:!0,writable:!0,value:t})}},Object.defineProperty(e,"type",{enumerable:!0,configurable:!0,writable:!0,value:t}),e}}function W(){return kt()}function Hf(t,e){return e?Object.keys(e).filter(r=>{if(typeof r!="string")throw new Error(`Expected event key of type string but got type "${typeof r}" for key ${String(r)}`);if(r==="")throw new Error("Got empty string for events key.");return!0}).reduce((r,n)=>{const i=kt()([t,n].join("-"));return r[n]=i,r},{}):{}}function Rf(t){return t?pi(t,e=>e):{}}const Di=Symbol("element-vir-state-setup");function Ff(t){return mt(t)?Di in t:!1}function tl(t,e){e in t||vf()(t,e)}function zf(t,e,r){if(typeof t!="string"&&typeof t!="number"&&typeof t!="symbol")throw new Error(`Property name must be a string, got type '${typeof t}' from: '${String(t)}' for '${r.toLowerCase()}'`);if(!(t in e))throw new Error(`Property '${String(t)}' does not exist on '${r.toLowerCase()}'.`)}function rs(t,e){const r=t;function n(s){e?zf(s,t,t.tagName):tl(t,s)}function i(s,o){return n(o),r[o]}return new Proxy({},{get:i,set(s,o,l){const c=Ff(l)?l[Di]():l;n(o);const u=r[o];function d(m){s[o]=m,r[o]=m}const f=t.observablePropertyListenerMap[o];if(u!==c&&xn(u)&&f&&u.removeListener(f),xn(c))if(f)c.listen(f);else{let m=function(){t.requestUpdate()};var h=m;t.observablePropertyListenerMap[o]=m,c.listen(m)}else xn(u)&&(t.observablePropertyListenerMap[o]=void 0);return d(c),!0},ownKeys(s){return Reflect.ownKeys(s)},getOwnPropertyDescriptor(s,o){if(o in s)return{get value(){return i(s,o)},configurable:!0,enumerable:!0}},has(s,o){return Reflect.has(s,o)}})}function Wf({hostClassNames:t,cssVars:e}){return{hostClasses:pi(t,(r,n)=>({name:de(n),selector:de(`:host(.${n})`)})),cssVars:e}}function Uf({host:t,hostClassesInit:e,hostClassNames:r,state:n,inputs:i}){e&&j(e).forEach(a=>{const s=e[a],o=r[a];typeof s=="function"&&(s({state:n,inputs:i})?t.classList.add(o):t.classList.remove(o))})}function Bf({element:t,eventsMap:e,cssVars:r,slotNamesMap:n}){function i(s){j(s).forEach(o=>{const l=s[o];t.instanceState[o]=l})}return{cssVars:r,slotNames:n,dispatch:s=>t.dispatchEvent(s),events:e,host:t,inputs:t.instanceInputs,state:t.instanceState,updateState:i}}function jf(t){return t?t.reduce((r,n)=>(r[n]=n,r),{}):{}}var Gf=globalThis&&globalThis.__setFunctionName||function(t,e,r){return typeof e=="symbol"&&(e=e.description?"[".concat(e.description,"]"):""),Object.defineProperty(t,"name",{configurable:!0,value:r?"".concat(r," ",e):e})};function un(t){var e;const r=t;if(!I(r,"object"))throw new Error("Cannot define element with non-object init: ${init}");if(!I(r.tagName,"string"))throw new Error("Missing valid tagName (expected a string).");if(!r.renderCallback||typeof r.renderCallback=="string")throw new Error(`Failed to define element '${r.tagName}': renderCallback is not a function`);const n={...Pf,...r.options},i=Hf(r.tagName,r.events),a=Rf(r.hostClasses);r.hostClasses&&ts(r.tagName,r.hostClasses),r.cssVars&&ts(r.tagName,r.cssVars);const s=r.cssVars?et(r.cssVars):{},o=jf(r.slotNames),l=typeof r.styles=="function"?r.styles(Wf({hostClassNames:a,cssVars:s})):r.styles||v``,c=r.renderCallback;function u(...[f]){return{_elementVirIsMinimalDefinitionWithInputs:!0,definition:d,inputs:f}}const d=(e=class extends jo{createRenderParams(){return Bf({element:this,eventsMap:i,cssVars:s,slotNamesMap:o})}get instanceType(){throw new Error(`"instanceType" was called on ${r.tagName} as a value but it is only for types.`)}static get inputsType(){throw new Error(`"inputsType" was called on ${r.tagName} as a value but it is only for types.`)}static get stateType(){throw new Error(`"stateType" was called on ${r.tagName} as a value but it is only for types.`)}render(){this._internalRenderCount++;try{Xo(this)&&!this._haveInputsBeenSet&&!n.ignoreUnsetInputs&&console.warn(this,`${r.tagName} got rendered before its input object was set. This was most likely caused by forgetting to use '.assign()' on its opening tag. If no inputs are intended, use '${un.name}' to define ${r.tagName}.`),this._hasRendered=!0;const f=this.createRenderParams();if(!this._initCalled&&r.initCallback&&(this._initCalled=!0,r.initCallback(f)instanceof Promise))throw new Error("initCallback cannot be asynchronous");const h=c(f);if(h instanceof Promise)throw new Error("renderCallback cannot be asynchronous");return Uf({host:f.host,hostClassesInit:r.hostClasses,hostClassNames:a,state:f.state,inputs:f.inputs}),this._lastRenderedProps={inputs:{...f.inputs},state:{...f.state}},h}catch(f){const h=Jl(f,`Failed to render ${r.tagName}`);return console.error(h),this._lastRenderError=h,er(h)}}connectedCallback(){if(super.connectedCallback(),this._hasRendered&&!this._initCalled&&r.initCallback){this._initCalled=!0;const f=this.createRenderParams();if(r.initCallback(f)instanceof Promise)throw new Error(`initCallback in '${r.tagName}' cannot be asynchronous`)}}destroy(){Object.values(this.instanceState).forEach(f=>{zn(f,"destroy")&&I(f.destroy,"function")&&f.destroy()})}disconnectedCallback(){if(super.disconnectedCallback(),r.cleanupCallback){const f=this.createRenderParams();if(r.cleanupCallback(f)instanceof Promise)throw new Error(`cleanupCallback in '${r.tagName}' cannot be asynchronous`)}this.destroy(),this._initCalled=!1}assignInputs(f){el(this,f)}constructor(){super(),Object.defineProperty(this,"_lastRenderError",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_internalRenderCount",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"_initCalled",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"_hasRendered",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"_lastRenderedProps",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_haveInputsBeenSet",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"definition",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"observablePropertyListenerMap",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"instanceInputs",{enumerable:!0,configurable:!0,writable:!0,value:rs(this,!1)}),Object.defineProperty(this,"instanceState",{enumerable:!0,configurable:!0,writable:!0,value:rs(this,!n.allowPolymorphicState)});const f=r.stateInitStatic||{};j(f).forEach(h=>{tl(this,h),this.instanceState[h]=f[h]}),this.definition=d}},Gf(e,"anonymousClass"),Object.defineProperty(e,"elementOptions",{enumerable:!0,configurable:!0,writable:!0,value:n}),Object.defineProperty(e,"tagName",{enumerable:!0,configurable:!0,writable:!0,value:r.tagName}),Object.defineProperty(e,"styles",{enumerable:!0,configurable:!0,writable:!0,value:l}),Object.defineProperty(e,"assign",{enumerable:!0,configurable:!0,writable:!0,value:u}),Object.defineProperty(e,"isStrictInstance",{enumerable:!0,configurable:!0,writable:!0,value:()=>!1}),Object.defineProperty(e,"events",{enumerable:!0,configurable:!0,writable:!0,value:i}),Object.defineProperty(e,"renderCallback",{enumerable:!0,configurable:!0,writable:!0,value:c}),Object.defineProperty(e,"hostClasses",{enumerable:!0,configurable:!0,writable:!0,value:a}),Object.defineProperty(e,"cssVars",{enumerable:!0,configurable:!0,writable:!0,value:s}),Object.defineProperty(e,"init",{enumerable:!0,configurable:!0,writable:!0,value:r}),Object.defineProperty(e,"slotNames",{enumerable:!0,configurable:!0,writable:!0,value:o}),Object.defineProperty(e,"stateInitStatic",{enumerable:!0,configurable:!0,writable:!0,value:r.stateInitStatic}),e);return Object.defineProperties(d,{name:{value:Yl(r.tagName,{capitalizeFirstLetter:!0}),writable:!0},isStrictInstance:{value:f=>f instanceof d,writable:!1}}),window.customElements.get(r.tagName)?console.warn(`Tried to define custom element '${r.tagName}' but it is already defined.`):window.customElements.define(r.tagName,d),d}function C(){return t=>{const e=t;if(!I(e,"object"))throw new Error("Cannot define element with non-object init: ${init}");return un({...e,options:{ignoreUnsetInputs:!1,...e.options}})}}class Zf extends De{}function ns(t){return{[Di](){return new Zf(t)}}}function rl(t,e){return Jt(t,e),t.element}function qf(t){try{return t.options.host.tagName.toLowerCase()}catch{return}}function Jt(t,e){const r=qf(t),n=r?`: in ${r}`:"";if(t.type!==ln.ELEMENT)throw new Error(`${e} directive can only be attached directly to an element${n}.`);if(!t.element)throw new Error(`${e} directive found no element${n}.`)}function is(t){return!cc(t)}function as(t){return t instanceof Error}function w(t,e){return Yf(t,e)}const Yf=Qe(class extends Xe{constructor(t){super(t),Object.defineProperty(this,"element",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"lastListenerMetaData",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.element=rl(t,"listen")}resetListener(t){this.lastListenerMetaData&&this.element.removeEventListener(this.lastListenerMetaData.eventType,this.lastListenerMetaData.listener),this.element.addEventListener(t.eventType,t.listener),this.lastListenerMetaData=t}createListenerMetaData(t,e){return{eventType:t,callback:e,listener:r=>{var n;return(n=this.lastListenerMetaData)==null?void 0:n.callback(r)}}}render(t,e){const r=typeof t=="string"?t:t.type;if(typeof r!="string")throw new Error(`Cannot listen to an event with a name that is not a string. Given event name: "${r}"`);return this.lastListenerMetaData&&this.lastListenerMetaData.eventType===r?this.lastListenerMetaData.callback=e:this.resetListener(this.createListenerMetaData(r,e)),oe}}),ss="onDomCreated",Vi=Qe(class extends Xe{constructor(t){super(t),Object.defineProperty(this,"element",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Jt(t,ss)}update(t,[e]){Jt(t,ss);const r=t.element;return r!==this.element&&(requestAnimationFrame(()=>e(r)),this.element=r),this.render(e)}render(t){}}),Nn="onResize",nl=Qe(class extends Xe{constructor(t){super(t),Object.defineProperty(this,"element",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"resizeObserver",{enumerable:!0,configurable:!0,writable:!0,value:new ResizeObserver(e=>this.fireCallback(e))}),Object.defineProperty(this,"callback",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Jt(t,Nn)}fireCallback(t){var r;const e=t[0];if(!e)throw console.error(t),new Error(`${Nn} observation triggered but the first entry was empty.`);(r=this.callback)==null||r.call(this,{target:e.target,contentRect:e.contentRect},this.element)}update(t,[e]){Jt(t,Nn),this.callback=e;const r=t.element,n=this.element;return r!==n&&(this.element=r,n&&this.resizeObserver.unobserve(n),this.resizeObserver.observe(r)),this.render(e)}render(t){}});function Rt(t,e,r){return Ef(t,()=>e,()=>r)}j({assign:"",assignedInputs:"",cssVars:"",elementOptions:"",events:"",hostClasses:"",init:"",inputsType:"",isStrictInstance:"",renderCallback:"",slotNames:"",stateInitStatic:"",stateType:"",styles:"",tagName:"",updateStateType:""});function Kf(t){const{assertInputs:e,transformInputs:r}={assertInputs:(t==null?void 0:t.assertInputs)??(()=>{}),transformInputs:(t==null?void 0:t.transformInputs)??(n=>n)};return{defineElement:()=>n=>(e(n),C()(r(n))),defineElementNoInputs:n=>(e(n),un(r(n)))}}function Jf(t,e){return e?os(t,e):os(void 0,t)}const os=Qe(class extends Xe{constructor(t){super(t),Object.defineProperty(this,"element",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.element=rl(t,"assign")}render(t,e){return el(this.element,e),oe}}),Qf={};function Xf(t,e){return e.map((r,n)=>{const i=t[n],a=t[n+1];if(i&&a){const{shouldHaveTagNameHere:s}=il(i,a);if(s&&I(r,"string"))return{tagName:r,tagInterpolationKey:oc(Qf,r,()=>({tagName:r}))}}return r})}function il(t,e){const r=t.trim().endsWith("<")&&!!e.match(/^[\s\n>]/),n=(t==null?void 0:t.trim().endsWith("</"))&&e.trim().startsWith(">");return{isOpeningTag:r,shouldHaveTagNameHere:r||n}}function eh(...[t,e,r]){var l,c,u;const n=_r(r)?r.definition:r,{isOpeningTag:i,shouldHaveTagNameHere:a}=il(t,e),s=Pi(n);if(s&&a&&n.tagInterpolationKey)return{replacement:n.tagName,getExtraValues:void 0};if(a&&!s)throw console.error({lastNewString:t,currentTemplateString:e,currentValue:n}),new Error(`Got interpolated tag name but found no tag name on the given value: '${(n==null?void 0:n.tagName)||((c=(l=n==null?void 0:n.prototype)==null?void 0:l.constructor)==null?void 0:c.name)||((u=n==null?void 0:n.constructor)==null?void 0:u.name)}'`);if(!a||!s)return;if(i&&n.elementOptions&&!n.elementOptions.ignoreUnsetInputs&&!_r(r))throw new Error(`Missing inputs for '${n.tagName}'`);return{replacement:n.tagName,getExtraValues(d){const f=_r(d)?d.inputs:void 0;return[i&&f?Jf(f):void 0].filter(mi)}}}function th(t){}function rh(t){return Qo(t.strings,t.values,eh,th)}function p(t,...e){const r=Xf(t,e),n=uf(t,...r),i=Jo(t,r,()=>rh(n));return{...n,strings:i.strings,values:i.values}}const ls="vira-",{defineElement:Mt,defineElementNoInputs:ap}=Kf({assertInputs:t=>{if(!t.tagName.startsWith(ls))throw new Error(`Tag name should start with '${ls}' but got '${t.tagName}'`)}}),al=v`
    pointer-events: none;
    opacity: 0.3;
`,ze=et({"vira-extended-animation-duration":"1.2s","vira-pretty-animation-duration":"300ms","vira-interaction-animation-duration":"84ms"}),Wr=et({"vira-form-input-border-radius":"8px"}),Ur=et({"vira-focus-outline-color":"blue","vira-focus-outline-border-radius":v`calc(${Wr["vira-form-input-border-radius"].value} + 4px)`});function sl({mainSelector:t,elementBorderSize:e,outlineGap:r=2,outlineWidth:n=3}){const i=de(Un(n+r+e));return v`
        ${de(t)}::after {
            content: '';
            top: calc(${i} * -1);
            left: calc(${i} * -1);
            position: absolute;
            width: calc(100% + calc(${i} * 2));
            height: calc(100% + calc(${i} * 2));
            box-sizing: border-box;
            pointer-events: none;
            border: ${n}px solid ${Ur["vira-focus-outline-color"].value};
            border-radius: ${Ur["vira-focus-outline-border-radius"].value};
            z-index: 100;
        }
    `}const dn=v`
    padding: 0;
    margin: 0;
`,Ae=v`
    ${dn};
    cursor: unset;
    background: none;
    border: none;
    font: inherit;
    color: inherit;
    text-transform: inherit;
    text-decoration: inherit;
    -webkit-tap-highlight-color: transparent;
`,Xn=v`
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
`,U=Mt()({tagName:"vira-icon",hostClasses:{"vira-icon-fit-container":({inputs:t})=>!!t.fitContainer},styles:({hostClasses:t})=>v`
        :host {
            display: inline-block;
        }

        svg {
            /*
                svg is set to inline by default which causes weird padding under the image.
                See: https://stackoverflow.com/a/34952703
            */
            display: block;
        }

        ${t["vira-icon-fit-container"].selector} svg {
            height: 100%;
            width: 100%;
        }
    `,renderCallback({inputs:t}){return t.icon?t.icon.svgTemplate:""}});var ei;(function(t){t.Default="vira-button-default",t.Outline="vira-button-outline"})(ei||(ei={}));const We=Mt()({tagName:"vira-button",hostClasses:{"vira-button-outline-style":({inputs:t})=>t.buttonStyle===ei.Outline,"vira-button-disabled":({inputs:t})=>!!t.disabled},cssVars:{"vira-button-primary-color":"#0a89ff","vira-button-primary-hover-color":"#59b1ff","vira-button-primary-active-color":"#007ff6","vira-button-secondary-color":"#ffffff","vira-button-padding":"5px 10px","vira-button-internal-foreground-color":"","vira-button-internal-background-color":""},styles:({hostClasses:t,cssVars:e})=>v`
        :host {
            font-weight: bold;
            display: inline-flex;
            position: relative;
            vertical-align: middle;
            align-items: center;
            box-sizing: border-box;
            ${Xn};
            ${e["vira-button-internal-background-color"].name}: ${e["vira-button-primary-color"].value};
            ${e["vira-button-internal-foreground-color"].name}: ${e["vira-button-secondary-color"].value};
            ${Ur["vira-focus-outline-color"].name}: ${e["vira-button-primary-hover-color"].value}
        }

        :host(:hover) button,
        button:hover {
            ${e["vira-button-internal-background-color"].name}: ${e["vira-button-primary-hover-color"].value};
        }

        :host(:active) button,
        button:active {
            ${e["vira-button-internal-background-color"].name}: ${e["vira-button-primary-active-color"].value};
        }

        ${t["vira-button-disabled"].selector} {
            ${al};
        }

        ${t["vira-button-outline-style"].selector} button {
            color: ${e["vira-button-internal-background-color"].value};
            background-color: transparent;
            border-color: currentColor;
        }

        button {
            ${Ae};
            cursor: pointer;
            position: relative;
            width: 100%;
            height: 100%;
            outline: none;
            border: 2px solid transparent;
            box-sizing: border-box;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            border-radius: ${Wr["vira-form-input-border-radius"].value};
            background-color: ${e["vira-button-internal-background-color"].value};
            color: ${e["vira-button-internal-foreground-color"].value};
            padding: ${e["vira-button-padding"].value};
            transition:
                color ${ze["vira-interaction-animation-duration"].value},
                background-color
                    ${ze["vira-interaction-animation-duration"].value},
                border-color ${ze["vira-interaction-animation-duration"].value};
        }

        ${sl({mainSelector:"button:focus:focus-visible:not(:active):not([disabled])",elementBorderSize:2})}

        button ${U} + .text-template {
            margin-left: 8px;
        }
    `,renderCallback:({inputs:t})=>{const e=t.icon?p`
                  <${U.assign({icon:t.icon})}></${U}>
              `:"",r=t.text?p`
                  <span class="text-template">${t.text}</span>
              `:"";return p`
            <button ?disabled=${t.disabled}>${e} ${r}</button>
        `}});var ti;(function(t){t.Header="header"})(ti||(ti={}));Mt()({tagName:"vira-collapsible-wrapper",hostClasses:{"vira-collapsible-wrapper-expanded":({inputs:t})=>t.expanded},styles:({hostClasses:t})=>v`
        :host {
            display: flex;
            flex-direction: column;
        }

        .header-wrapper {
            ${Ae};
            cursor: pointer;
        }

        .content-wrapper,
        .collapsing-element {
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
        }

        .collapsing-element {
            transition: height ${ze["vira-pretty-animation-duration"].value};
            overflow: hidden;
        }
        ${t["vira-collapsible-wrapper-expanded"].name} .collapsing-element {
            pointer-events: none;
        }
    `,events:{expandChange:W()},stateInitStatic:{contentHeight:0},renderCallback({state:t,updateState:e,dispatch:r,events:n,inputs:i}){const a=i.expanded?v`
                  height: ${t.contentHeight}px;
              `:v`
                  height: 0;
              `;return p`
            <button
                class="header-wrapper"
                ${w("click",()=>{r(new n.expandChange(!i.expanded))})}
            >
                <slot name=${ti.Header}>Header</slot>
            </button>
            <div class="collapsing-element" style=${a} disabled="disabled">
                <div
                    ${nl(({contentRect:s})=>{e({contentHeight:s.height})})}
                    class="content-wrapper"
                >
                    <slot></slot>
                </div>
            </div>
        `}});const $=et({"vira-icon-stroke-color":"currentColor","vira-icon-fill-color":"none","vira-icon-stroke-width":"1px"});function le({name:t,svgTemplate:e}){return{name:t,svgTemplate:e}}const ol=le({name:"CloseX24Icon",svgTemplate:p`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <circle
                cx="12"
                cy="12"
                r="8"
                fill=${$["vira-icon-fill-color"].value}
                stroke=${$["vira-icon-stroke-color"].value}
                stroke-width=${$["vira-icon-stroke-width"].value}
            />
            <path
                d="M9 8.5l6 7m0 -7l-6 7"
                fill="none"
                stroke=${$["vira-icon-stroke-color"].value}
                stroke-width=${$["vira-icon-stroke-width"].value}
            />
        </svg>
    `});le({name:"Element16Icon",svgTemplate:p`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path
                d="M4 5 1 8l3 3m8-6 3 3-3 3m-5 0 2-6"
                fill="none"
                stroke=${$["vira-icon-stroke-color"].value}
                stroke-width=${$["vira-icon-stroke-width"].value}
            />
        </svg>
    `});le({name:"Element24Icon",svgTemplate:p`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
                d="m7 7-5 5 5 5M17 7l5 5-5 5m-6 0 2-10"
                fill="none"
                stroke=${$["vira-icon-stroke-color"].value}
                stroke-width=${$["vira-icon-stroke-width"].value}
            />
        </svg>
    `});const nh=le({name:"EyeClosed24Icon",svgTemplate:p`
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill=${$["vira-icon-fill-color"].value}
            stroke=${$["vira-icon-stroke-color"].value}
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path
                stroke-width=${$["vira-icon-stroke-width"].value}
                d="M4 20 20 4M18.4 8.54C20 10.28 21 12 21 12s-4.03 7-9 7a6.53 6.53 0 0 1-3.16-.9M5.6 15.46C4 13.72 3 12 3 12s4.03-7 9-7c1.11 0 2.18.35 3.16.9"
            />
        </svg>
    `}),ih=le({name:"EyeOpen24Icon",svgTemplate:p`
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill=${$["vira-icon-fill-color"].value}
            stroke=${$["vira-icon-stroke-color"].value}
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path
                stroke-width=${$["vira-icon-stroke-width"].value}
                d="M12 5c5 0 9 7 9 7s-4 7-9 7-9-7-9-7 4-7 9-7Zm0 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
            />
        </svg>
    `}),ah=le({name:"Loader24Icon",svgTemplate:p`
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="loader-animated-24-icon"
        >
            <path
                d="M12 8V2M16 12h6M12 16v6M8 12H2M9.17 9.17 4.93 4.93M14.83 9.17l4.24-4.24M14.83 14.83l4.24 4.24M9.17 14.83l-4.24 4.24"
                fill="none"
                stroke=${$["vira-icon-stroke-color"].value}
                stroke-width=${$["vira-icon-stroke-width"].value}
            />
        </svg>
    `}),sh=v`
    @keyframes loader-animated-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    svg {
        animation: ${ze["vira-extended-animation-duration"].value} linear
            loader-animated-spin infinite;
    }
`,ll=le({name:"LoaderAnimated24Icon",svgTemplate:p`
        <style>
            ${sh}
        </style>
        ${ah.svgTemplate}
    `}),oh=le({name:"Options24Icon",svgTemplate:p`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g
                fill=${$["vira-icon-fill-color"].value}
                stroke=${$["vira-icon-stroke-color"].value}
                stroke-width=${$["vira-icon-stroke-width"].value}
            >
                <circle cx="9.5" cy="5.5" r="2.5" />
                <circle cx="16.5" cy="12.5" r="2.5" />
                <circle cx="8.5" cy="18.5" r="2.5" />
            </g>
            <path
                d="M3 5.5h3.5m5 0h8.5M3 12.5h11m5 0h2M3 18.5h3m5 0h10"
                fill="none"
                stroke="${$["vira-icon-stroke-color"].value}"
                stroke-width=${$["vira-icon-stroke-width"].value}
            />
        </svg>
    `}),lh=le({name:"StatusFailure24Icon",svgTemplate:p`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <circle
                cx="12"
                cy="12"
                r="10"
                fill=${$["vira-icon-fill-color"].value}
                stroke=${$["vira-icon-stroke-color"].value}
                stroke-width=${$["vira-icon-stroke-width"].value}
            />
            <path
                d="M8 16.5 L16 7.5 M8 7.5 L16 16.5"
                fill="none"
                stroke=${$["vira-icon-stroke-color"].value}
                stroke-width=${$["vira-icon-stroke-width"].value}
            />
        </svg>
    `});le({name:"StatusInProgress24Icon",svgTemplate:p`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <circle
                cx="12"
                cy="12"
                r="10"
                fill=${$["vira-icon-fill-color"].value}
                stroke=${$["vira-icon-stroke-color"].value}
                stroke-width=${$["vira-icon-stroke-width"].value}
            />
            <circle
                cx="7"
                cy="12"
                r="1"
                fill=${$["vira-icon-stroke-color"].value}
                stroke=${$["vira-icon-stroke-color"].value}
                stroke-width="calc(${$["vira-icon-stroke-width"].value} - 1px)"
            />
            <circle
                cx="12"
                cy="12"
                r="1"
                fill=${$["vira-icon-stroke-color"].value}
                stroke=${$["vira-icon-stroke-color"].value}
                stroke-width="calc(${$["vira-icon-stroke-width"].value} - 1px)"
            />
            <circle
                cx="17"
                cy="12"
                r="1"
                fill=${$["vira-icon-stroke-color"].value}
                stroke=${$["vira-icon-stroke-color"].value}
                stroke-width="calc(${$["vira-icon-stroke-width"].value} - 1px)"
            />
        </svg>
    `});le({name:"StatusSuccess24Icon",svgTemplate:p`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <circle
                cx="12"
                cy="12"
                r="10"
                fill=${$["vira-icon-fill-color"].value}
                stroke=${$["vira-icon-stroke-color"].value}
                stroke-width=${$["vira-icon-stroke-width"].value}
            />
            <path
                d="m17 8.5-7 8-3-3"
                fill="none"
                stroke=${$["vira-icon-stroke-color"].value}
                stroke-width=${$["vira-icon-stroke-width"].value}
            />
        </svg>
    `});var Qt;(function(t){t.Loading="loading",t.Error="error"})(Qt||(Qt={}));const ct=Mt()({tagName:"vira-image",hostClasses:{"vira-image-height-constrained":({inputs:t})=>t.dominantDimension==="height"},events:{imageLoad:W(),imageError:W()},styles:({hostClasses:t})=>v`
        :host {
            display: inline-flex;
            overflow: hidden;
            flex-direction: column;
            justify-content: center;
            position: relative;
            border-radius: inherit;
            min-height: 100px;
            min-width: 100px;
        }

        img {
            width: 100%;
            height: auto;
            flex-shrink: 0;
        }
        ${t["vira-image-height-constrained"].selector} {
            flex-direction: row;
        }

        ${t["vira-image-height-constrained"].selector} img {
            width: auto;
            height: 100%;
        }

        .status-wrapper {
            overflow: hidden;
            border-radius: inherit;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .error {
            color: red;
        }

        .hidden {
            display: none;
        }
    `,stateInitStatic:{loadedUrls:{},erroredUrls:{}},renderCallback({inputs:t,state:e,updateState:r,dispatch:n,events:i}){const a=t.imageUrl,s=e.erroredUrls[a]?p`
                  <slot class="status-wrapper" name=${Qt.Error}>
                      <${U.assign({icon:lh})} class="error"></${U}>
                  </slot>
              `:e.loadedUrls[a]?void 0:p`
                    <slot class="status-wrapper" name=${Qt.Loading}>
                        <${U.assign({icon:ll})}></${U}>
                    </slot>
                `;return p`
            ${Rt(!!s,s)}
            <img
                class=${cn({hidden:!!s})}
                ${w("load",async()=>{t._debugLoadDelay&&await Xi(t._debugLoadDelay.milliseconds),r({loadedUrls:{...e.loadedUrls,[a]:!0}}),n(new i.imageLoad)})}
                ${w("error",async o=>{t._debugLoadDelay&&await Xi(t._debugLoadDelay.milliseconds),r({erroredUrls:{...e.erroredUrls,[a]:!0}}),n(new i.imageError(o.error))})}
                src=${a}
            />
        `}});function ch(t){let e;try{e=Reflect.ownKeys(t)}catch{}return e??[...Object.keys(t),...Object.getOwnPropertySymbols(t)]}function Ln(t){return ch(t).map(e=>[e,t[e]])}var cs;(function(t){t.Upper="upper",t.Lower="lower"})(cs||(cs={}));var us;(function(t){t.FirstThenWait="first-then-wait",t.AfterWait="after-wait"})(us||(us={}));function uh(){return globalThis.crypto?globalThis.crypto:require("crypto").webcrypto}uh();const cl={a:window.HTMLAnchorElement,abbr:window.HTMLElement,address:window.HTMLElement,area:window.HTMLAreaElement,article:window.HTMLElement,aside:window.HTMLElement,audio:window.HTMLAudioElement,b:window.HTMLElement,base:window.HTMLBaseElement,bdi:window.HTMLElement,bdo:window.HTMLElement,blockquote:window.HTMLQuoteElement,body:window.HTMLBodyElement,br:window.HTMLBRElement,button:window.HTMLButtonElement,canvas:window.HTMLCanvasElement,caption:window.HTMLTableCaptionElement,cite:window.HTMLElement,code:window.HTMLElement,col:window.HTMLTableColElement,colgroup:window.HTMLTableColElement,data:window.HTMLDataElement,datalist:window.HTMLDataListElement,dd:window.HTMLElement,del:window.HTMLModElement,details:window.HTMLDetailsElement,dfn:window.HTMLElement,dialog:window.HTMLDialogElement,div:window.HTMLDivElement,dl:window.HTMLDListElement,dt:window.HTMLElement,em:window.HTMLElement,embed:window.HTMLEmbedElement,fieldset:window.HTMLFieldSetElement,figcaption:window.HTMLElement,figure:window.HTMLElement,footer:window.HTMLElement,form:window.HTMLFormElement,h1:window.HTMLHeadingElement,h2:window.HTMLHeadingElement,h3:window.HTMLHeadingElement,h4:window.HTMLHeadingElement,h5:window.HTMLHeadingElement,h6:window.HTMLHeadingElement,head:window.HTMLHeadElement,header:window.HTMLElement,hgroup:window.HTMLElement,hr:window.HTMLHRElement,html:window.HTMLHtmlElement,i:window.HTMLElement,iframe:window.HTMLIFrameElement,img:window.HTMLImageElement,input:window.HTMLInputElement,ins:window.HTMLModElement,kbd:window.HTMLElement,label:window.HTMLLabelElement,legend:window.HTMLLegendElement,li:window.HTMLLIElement,link:window.HTMLLinkElement,main:window.HTMLElement,map:window.HTMLMapElement,mark:window.HTMLElement,menu:window.HTMLMenuElement,meta:window.HTMLMetaElement,meter:window.HTMLMeterElement,nav:window.HTMLElement,noscript:window.HTMLElement,object:window.HTMLObjectElement,ol:window.HTMLOListElement,optgroup:window.HTMLOptGroupElement,option:window.HTMLOptionElement,output:window.HTMLOutputElement,p:window.HTMLParagraphElement,picture:window.HTMLPictureElement,pre:window.HTMLPreElement,progress:window.HTMLProgressElement,q:window.HTMLQuoteElement,rp:window.HTMLElement,rt:window.HTMLElement,ruby:window.HTMLElement,s:window.HTMLElement,samp:window.HTMLElement,script:window.HTMLScriptElement,search:window.HTMLElement,section:window.HTMLElement,select:window.HTMLSelectElement,slot:window.HTMLSlotElement,small:window.HTMLElement,source:window.HTMLSourceElement,span:window.HTMLSpanElement,strong:window.HTMLElement,style:window.HTMLStyleElement,sub:window.HTMLElement,summary:window.HTMLElement,sup:window.HTMLElement,table:window.HTMLTableElement,tbody:window.HTMLTableSectionElement,td:window.HTMLTableCellElement,template:window.HTMLTemplateElement,textarea:window.HTMLTextAreaElement,tfoot:window.HTMLTableSectionElement,th:window.HTMLTableCellElement,thead:window.HTMLTableSectionElement,time:window.HTMLTimeElement,title:window.HTMLTitleElement,tr:window.HTMLTableRowElement,track:window.HTMLTrackElement,u:window.HTMLElement,ul:window.HTMLUListElement,var:window.HTMLElement,video:window.HTMLVideoElement,wbr:window.HTMLElement},dh=Object.keys(cl),ul={annotation:window.MathMLElement,"annotation-xml":window.MathMLElement,maction:window.MathMLElement,math:window.MathMLElement,merror:window.MathMLElement,mfrac:window.MathMLElement,mi:window.MathMLElement,mmultiscripts:window.MathMLElement,mn:window.MathMLElement,mo:window.MathMLElement,mover:window.MathMLElement,mpadded:window.MathMLElement,mphantom:window.MathMLElement,mprescripts:window.MathMLElement,mroot:window.MathMLElement,mrow:window.MathMLElement,ms:window.MathMLElement,mspace:window.MathMLElement,msqrt:window.MathMLElement,mstyle:window.MathMLElement,msub:window.MathMLElement,msubsup:window.MathMLElement,msup:window.MathMLElement,mtable:window.MathMLElement,mtd:window.MathMLElement,mtext:window.MathMLElement,mtr:window.MathMLElement,munder:window.MathMLElement,munderover:window.MathMLElement,semantics:window.MathMLElement},fh=Object.keys(ul),dl={a:window.SVGAElement,animate:window.SVGAnimateElement,animateMotion:window.SVGAnimateMotionElement,animateTransform:window.SVGAnimateTransformElement,circle:window.SVGCircleElement,clipPath:window.SVGClipPathElement,defs:window.SVGDefsElement,desc:window.SVGDescElement,ellipse:window.SVGEllipseElement,feBlend:window.SVGFEBlendElement,feColorMatrix:window.SVGFEColorMatrixElement,feComponentTransfer:window.SVGFEComponentTransferElement,feComposite:window.SVGFECompositeElement,feConvolveMatrix:window.SVGFEConvolveMatrixElement,feDiffuseLighting:window.SVGFEDiffuseLightingElement,feDisplacementMap:window.SVGFEDisplacementMapElement,feDistantLight:window.SVGFEDistantLightElement,feDropShadow:window.SVGFEDropShadowElement,feFlood:window.SVGFEFloodElement,feFuncA:window.SVGFEFuncAElement,feFuncB:window.SVGFEFuncBElement,feFuncG:window.SVGFEFuncGElement,feFuncR:window.SVGFEFuncRElement,feGaussianBlur:window.SVGFEGaussianBlurElement,feImage:window.SVGFEImageElement,feMerge:window.SVGFEMergeElement,feMergeNode:window.SVGFEMergeNodeElement,feMorphology:window.SVGFEMorphologyElement,feOffset:window.SVGFEOffsetElement,fePointLight:window.SVGFEPointLightElement,feSpecularLighting:window.SVGFESpecularLightingElement,feSpotLight:window.SVGFESpotLightElement,feTile:window.SVGFETileElement,feTurbulence:window.SVGFETurbulenceElement,filter:window.SVGFilterElement,foreignObject:window.SVGForeignObjectElement,g:window.SVGGElement,image:window.SVGImageElement,line:window.SVGLineElement,linearGradient:window.SVGLinearGradientElement,marker:window.SVGMarkerElement,mask:window.SVGMaskElement,metadata:window.SVGMetadataElement,mpath:window.SVGMPathElement,path:window.SVGPathElement,pattern:window.SVGPatternElement,polygon:window.SVGPolygonElement,polyline:window.SVGPolylineElement,radialGradient:window.SVGRadialGradientElement,rect:window.SVGRectElement,script:window.SVGScriptElement,set:window.SVGSetElement,stop:window.SVGStopElement,style:window.SVGStyleElement,svg:window.SVGSVGElement,switch:window.SVGSwitchElement,symbol:window.SVGSymbolElement,text:window.SVGTextElement,textPath:window.SVGTextPathElement,title:window.SVGTitleElement,tspan:window.SVGTSpanElement,use:window.SVGUseElement,view:window.SVGViewElement},hh=Object.keys(dl),mh=[Ln(cl).map(([t,e])=>[e,t]),Ln(ul).map(([t,e])=>[e,t]),Ln(dl).map(([t,e])=>[e,t])].flat();new Map(mh);Array.from(new Set([...dh,...hh,...fh].sort()));function fn(t,e,r={}){const n=r.useOriginalTarget?t.target:t.currentTarget;if(!(n instanceof e)){const i=e.name,a=n==null?void 0:n.constructor.name,s=r.useOriginalTarget?`Current target from event '${t.type}' was not of type '${i}'. Got '${a}'.`:`Target from event '${t.type}' was not of type '${i}'. Got '${a}'.`;throw new Error(s)}return n}function ri({input:t,matcher:e}){return!t||!e?!0:t.length>1?!!t.split("").every(r=>ri({input:r,matcher:e})):e instanceof RegExp?!!t.match(e):e.includes(t)}function fl({value:t,allowed:e,blocked:r}){const n=e?ri({input:t,matcher:e}):!0,i=r?ri({input:t,matcher:r}):!1;return n&&!i}function hl(t){if(!t.value)return{filtered:t.value,blocked:""};const{filtered:e,blocked:r}=t.value.split("").reduce((n,i)=>(fl({...t,value:i})?n.filtered.push(i):n.blocked.push(i),n),{filtered:[],blocked:[]});return{filtered:e.join(""),blocked:r.join("")}}function ph({inputs:t,filteredValue:e,event:r,inputBlockedCallback:n,newValueCallback:i}){if(!(r instanceof InputEvent))throw new Error("Text input event was not an InputEvent.");const a=fn(r,HTMLInputElement),s=r.data,o=e;let l=a.value??"";if(s)if(s.length===1)fl({value:s,allowed:t.allowedInputs,blocked:t.blockedInputs})||(l=o,n(s));else{const{filtered:c,blocked:u}=hl({value:s,allowed:t.allowedInputs,blocked:t.blockedInputs});l=c,n(u)}a.value!==l&&(a.value=l),o!==l&&i(l)}var ut;(function(t){t.Default="text",t.Password="password",t.Email="email"})(ut||(ut={}));const me=Mt()({tagName:"vira-input",hostClasses:{"vira-input-disabled":({inputs:t})=>!!t.disabled,"vira-input-fit-text":({inputs:t})=>!!t.fitText,"vira-input-clear-button-shown":({inputs:t})=>!!t.showClearButton},cssVars:{"vira-input-placeholder-color":"#cccccc","vira-input-text-color":"#000000","vira-input-border-color":"#cccccc","vira-input-focus-border-color":"#59b1ff","vira-input-text-selection-color":"#cfe9ff","vira-input-action-button-color":"#aaaaaa","vira-input-clear-button-hover-color":"#ff0000","vira-input-clear-button-active-color":"#b30000","vira-input-show-password-button-hover-color":"#0a89ff","vira-input-show-password-button-active-color":"#0261ba","vira-input-padding-horizontal":"10px","vira-input-padding-vertical":"6px"},events:{valueChange:W(),inputBlocked:W()},styles:({hostClasses:t,cssVars:e})=>v`
            :host {
                position: relative;
                display: inline-flex;
                width: 224px;
                box-sizing: border-box;
                ${Ur["vira-focus-outline-color"].name}: ${e["vira-input-focus-border-color"].value};
                color: ${e["vira-input-text-color"].value};
            }

            ${t["vira-input-disabled"].selector} {
                ${al};
            }

            ${t["vira-input-fit-text"].selector} {
                width: unset;
            }
            ${t["vira-input-fit-text"].selector} input {
                flex-grow: 0;
            }
            ${t["vira-input-fit-text"].selector} input.has-value {
                /*
                    Account for weird Safari <input> behavior with text alignment and size. so we
                    don't lose a pixel on the left side.
                    Only apply this when <input> has a value, otherwise externally-set width and a
                    placeholder input will cause the text selector bar to initially be in the center
                    of the element.
                */
                text-align: center;
            }
            ${t["vira-input-fit-text"].selector} .size-span {
                ${Ae};
                font-family: inherit;
                display: inline-block;
                font-size: inherit;
                line-height: inherit;
                box-sizing: border-box;
                position: absolute;
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                z-index: -1;
                width: min-content;
                ${Xn};
                vertical-align: middle;
                max-height: 100%;
            }

            ${t["vira-input-clear-button-shown"].selector} label {
                padding-right: 4px;
            }

            pre {
                ${Ae};
                font: inherit;
                /*
                    Leave at least a few pixels for the cursor bar when there is no text at all.
                    This also accounts for a weird Safari <input> behavior where the text moves
                    around if it's not given a tiny bit of padding.
                */
                padding-left: 2px;
                display: block;
            }

            .border-style {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: ${Wr["vira-form-input-border-radius"].value};
                z-index: 0;
                pointer-events: none;
            }

            .label-border {
                top: -1px;
                left: -1px;
                border: 1px solid ${e["vira-input-border-color"].value};
                transition: border
                    ${ze["vira-interaction-animation-duration"].value};
            }

            label {
                ${Ae};
                max-width: 100%;
                flex-grow: 1;
                display: inline-flex;
                box-sizing: border-box;
                align-items: center;
                position: relative;
                padding: 0 ${e["vira-input-padding-horizontal"].value};
                border-radius: ${Wr["vira-form-input-border-radius"].value};
                background-color: transparent;
                /*
                    Border colors are actually applied via the .label-border class. However, we must
                    apply a border here still so that it takes up space.
                */
                border: 1px solid transparent;
                gap: 4px;
                cursor: text;
            }

            ${sl({mainSelector:"input:focus:focus-visible:not(:active):not([disabled]) ~ .focus-border",elementBorderSize:0})}

            .left-side-icon {
                margin-right: calc(${e["vira-input-padding-horizontal"].value} - 4px);
            }

            input {
                ${Ae};
                cursor: text;
                margin: ${e["vira-input-padding-vertical"].value} 0;
                flex-grow: 1;
                max-width: 100%;
                /* fix input element not shrinking by default */
                width: 0;
                text-overflow: ellipsis;
                box-sizing: border-box;
                overflow: hidden;
            }

            ::selection {
                background: ${e["vira-input-text-selection-color"].value}; /* WebKit/Blink Browsers */
            }
            ::-moz-selection {
                background: ${e["vira-input-text-selection-color"].value}; /* Gecko Browsers */
            }

            input:placeholder-shown {
                text-overflow: ellipsis;
                overflow: hidden;
            }

            input:focus {
                outline: none;
            }

            input::placeholder {
                color: ${e["vira-input-placeholder-color"].value};
            }

            .suffix {
                font-weight: bold;
                ${Xn};
            }

            button {
                ${Ae};
                cursor: pointer;
                display: flex;
                transition: color
                    ${ze["vira-interaction-animation-duration"].value};
            }

            .clear-x-button,
            .show-password-button {
                color: ${e["vira-input-action-button-color"].value};
            }

            .clear-x-button:hover {
                color: ${e["vira-input-clear-button-hover-color"].value};
            }

            .clear-x-button:active {
                color: ${e["vira-input-clear-button-active-color"].value};
            }

            .show-password-button:hover {
                color: ${e["vira-input-show-password-button-hover-color"].value};
            }

            .show-password-button:active {
                color: ${e["vira-input-show-password-button-active-color"].value};
            }
        `,stateInitStatic:{forcedInputWidth:0,showPassword:!1},renderCallback:({inputs:t,dispatch:e,state:r,updateState:n,events:i})=>{const{filtered:a}=hl({value:t.value??"",allowed:t.allowedInputs,blocked:t.blockedInputs}),s=t.icon?p`
                  <${U.assign({icon:t.icon})} class="left-side-icon"></${U}>
              `:"",o=t.fitText?v`
                  width: ${r.forcedInputWidth}px;
              `:"";return p`
            <label>
                ${s}
                ${Rt(!!t.fitText,p`
                        <span
                            class="size-span"
                            ${nl(({contentRect:l})=>{n({forcedInputWidth:l.width})})}
                        >
                            <pre>${a||t.placeholder||""}</pre>
                        </span>
                    `)}
                <input
                    type=${gh(t.type,r.showPassword)}
                    style=${o}
                    autocomplete=${t.disableBrowserHelps?"off":""}
                    autocorrect=${t.disableBrowserHelps?"off":""}
                    autocapitalize=${t.disableBrowserHelps?"off":""}
                    spellcheck=${t.disableBrowserHelps?"false":""}
                    ?disabled=${t.disabled}
                    .value=${a}
                    ${w("input",l=>{ph({inputs:t,filteredValue:a,event:l,inputBlockedCallback(c){e(new i.inputBlocked(c))},newValueCallback(c){e(new i.valueChange(c))}})})}
                    placeholder=${t.placeholder}
                />
                ${Rt(!!(t.showClearButton&&t.value),p`
                        <button
                            class="clear-x-button"
                            title="clear"
                            ${w("click",l=>{l.stopImmediatePropagation(),l.preventDefault(),e(new i.valueChange(""))})}
                        >
                            <${U.assign({icon:ol})}></${U}>
                        </button>
                    `)}
                ${Rt(t.type===ut.Password,p`
                        <button
                            class="show-password-button"
                            title="show password"
                            ${w("click",l=>{l.stopImmediatePropagation(),l.preventDefault(),n({showPassword:!r.showPassword})})}
                        >
                            <${U.assign({icon:r.showPassword?ih:nh})}></${U}>
                        </button>
                    `)}
                ${Rt(!!t.suffix,p`
                        <div class="suffix">${t.suffix}</div>
                    `)}
                <!--
                    These separate style elements are necessary so that we can select them as
                    siblings of the focused <input> element.
                -->
                <div class="border-style focus-border"></div>
                <div class="border-style label-border"></div>
            </label>
        `}});function gh(t,e){return t===ut.Password&&e?ut.Default:t||ut.Default}const wh=0;function yh(t){return!(t.type!=="click"||t.metaKey||t.altKey||t.ctrlKey||t.shiftKey||t.button!==wh)}globalThis.SPA_ROUTER_VIR_HISTORY_EVENTS_CONSOLIDATED_ALREADY=!1;var ds;(function(t){t.Upper="upper",t.Lower="lower"})(ds||(ds={}));var fs;(function(t){t.FirstThenWait="first-then-wait",t.AfterWait="after-wait"})(fs||(fs={}));function vh(){return globalThis.crypto?globalThis.crypto:require("crypto").webcrypto}vh();Mt()({tagName:"vira-link",cssVars:{"vira-link-hover-color":"currentColor"},styles:({cssVars:t})=>v`
        :host {
            display: inline;
            text-decoration: underline;
        }

        a,
        a:visited,
        a:active,
        a:link,
        a:hover {
            color: inherit;
            text-decoration: inherit;
            white-space: inherit;
        }

        :host(:hover) a,
        a:hover,
        :host(:active) a,
        a:active {
            color: ${t["vira-link-hover-color"].value};
        }
    `,events:{routeChange:W()},renderCallback({inputs:t,dispatch:e,events:r}){var i,a;function n(s){t.route&&yh(s)&&(s.preventDefault(),t.route.scrollToTop&&window.scrollTo(0,0),e(new r.routeChange(t.route.route)))}if((i=t.link)!=null&&i.newTab)return p`
                <a href=${t.link.url} target="_blank" rel="noopener noreferrer">
                    <slot></slot>
                </a>
            `;{const s=t.link?t.link.url:(a=t.route)==null?void 0:a.router.createRoutesUrl(t.route.route);return p`
                <a href=${s} rel="noopener noreferrer" ${w("click",n)}>
                    <slot></slot>
                </a>
            `}}});var F=(t=>(t.H1="h1",t.H2="h2",t.H3="h3",t.H4="h4",t.H5="h5",t.H6="h6",t.Regular="regular",t.Small="small",t.Tiny="tiny",t))(F||{});const ni=G({left:"",right:""}),bh=G([ni]),Eh=G({sectionType:or("chronology"),rows:bh,size:ye(F)}),$h=G({sectionType:or("heading"),title:"",subtitle:"",date:"",size:ye(F),subtitleSize:ye(F)}),Th=G({sectionType:or("photos"),dimensions:{width:100,height:100},photoUrls:[""]}),ii=G({text:"",isHeader:!1}),ml=G([ii]),Sh=G([ml]),Ah=G({sectionType:or("table"),rows:Sh,size:ye(F)});var yt=(t=>(t.Center="center",t.Left="left",t.Justify="justify",t))(yt||{});const xh=G({sectionType:or("text"),alignment:ye(yt),text:"",size:ye(F)}),Hi=[Eh,$h,Th,Ah,xh],kh=G(Bd(...Hi)),Ri=Hi.reduce((t,e)=>{const r=e.defaultValue.sectionType;return t[r]=e,t},{}),Mh=Hi.map(t=>t.defaultValue.sectionType).sort();function pl(t){if(t in Ri)return t;throw new Error(`Invalid section type received: '${t}'`)}var ge=(t=>(t.HalfSheet="half-sheet",t.FullSheet="full-sheet",t))(ge||{}),Fi=(t=>(t.Letter="letter",t))(Fi||{}),Xt=(t=>(t.Fill="fill",t.Start="start",t))(Xt||{});const ai=G({spacing:ye(Xt),sections:[kh]}),vt=G({pages:[ai],paperFill:ye(ge),paperSize:ye(Fi),duplicateForPrinting:!1}),si=G({id:"random string",name:"template name",config:vt});function Ch(){try{if(typeof indexedDB<"u")return indexedDB;if(typeof webkitIndexedDB<"u")return webkitIndexedDB;if(typeof mozIndexedDB<"u")return mozIndexedDB;if(typeof OIndexedDB<"u")return OIndexedDB;if(typeof msIndexedDB<"u")return msIndexedDB}catch{return}}var bt=Ch();function _h(){try{if(!bt||!bt.open)return!1;var t=typeof openDatabase<"u"&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),e=typeof fetch=="function"&&fetch.toString().indexOf("[native code")!==-1;return(!t||e)&&typeof indexedDB<"u"&&typeof IDBKeyRange<"u"}catch{return!1}}function zi(t,e){t=t||[],e=e||{};try{return new Blob(t,e)}catch(a){if(a.name!=="TypeError")throw a;for(var r=typeof BlobBuilder<"u"?BlobBuilder:typeof MSBlobBuilder<"u"?MSBlobBuilder:typeof MozBlobBuilder<"u"?MozBlobBuilder:WebKitBlobBuilder,n=new r,i=0;i<t.length;i+=1)n.append(t[i]);return n.getBlob(e.type)}}typeof Promise>"u"&&require("lie/polyfill");const y=Promise;function L(t,e){e&&t.then(function(r){e(null,r)},function(r){e(r)})}function it(t,e,r){typeof e=="function"&&t.then(e),typeof r=="function"&&t.catch(r)}function ve(t){return typeof t!="string"&&(console.warn(`${t} used as a key, but it is not a string.`),t=String(t)),t}function Wi(){if(arguments.length&&typeof arguments[arguments.length-1]=="function")return arguments[arguments.length-1]}const oi="local-forage-detect-blob-support";let $r;const re={},Oh=Object.prototype.toString,fr="readonly",hn="readwrite";function Nh(t){for(var e=t.length,r=new ArrayBuffer(e),n=new Uint8Array(r),i=0;i<e;i++)n[i]=t.charCodeAt(i);return r}function Lh(t){return new y(function(e){var r=t.transaction(oi,hn),n=zi([""]);r.objectStore(oi).put(n,"key"),r.onabort=function(i){i.preventDefault(),i.stopPropagation(),e(!1)},r.oncomplete=function(){var i=navigator.userAgent.match(/Chrome\/(\d+)/),a=navigator.userAgent.match(/Edge\//);e(a||!i||parseInt(i[1],10)>=43)}}).catch(function(){return!1})}function Ih(t){return typeof $r=="boolean"?y.resolve($r):Lh(t).then(function(e){return $r=e,$r})}function Br(t){var e=re[t.name],r={};r.promise=new y(function(n,i){r.resolve=n,r.reject=i}),e.deferredOperations.push(r),e.dbReady?e.dbReady=e.dbReady.then(function(){return r.promise}):e.dbReady=r.promise}function li(t){var e=re[t.name],r=e.deferredOperations.pop();if(r)return r.resolve(),r.promise}function ci(t,e){var r=re[t.name],n=r.deferredOperations.pop();if(n)return n.reject(e),n.promise}function gl(t,e){return new y(function(r,n){if(re[t.name]=re[t.name]||bl(),t.db)if(e)Br(t),t.db.close();else return r(t.db);var i=[t.name];e&&i.push(t.version);var a=bt.open.apply(bt,i);e&&(a.onupgradeneeded=function(s){var o=a.result;try{o.createObjectStore(t.storeName),s.oldVersion<=1&&o.createObjectStore(oi)}catch(l){if(l.name==="ConstraintError")console.warn('The database "'+t.name+'" has been upgraded from version '+s.oldVersion+" to version "+s.newVersion+', but the storage "'+t.storeName+'" already exists.');else throw l}}),a.onerror=function(s){s.preventDefault(),n(a.error)},a.onsuccess=function(){var s=a.result;s.onversionchange=function(o){o.target.close()},r(s),li(t)}})}function Ui(t){return gl(t,!1)}function Bi(t){return gl(t,!0)}function wl(t,e){if(!t.db)return!0;var r=!t.db.objectStoreNames.contains(t.storeName),n=t.version<t.db.version,i=t.version>t.db.version;if(n&&(t.version!==e&&console.warn('The database "'+t.name+`" can't be downgraded from version `+t.db.version+" to version "+t.version+"."),t.version=t.db.version),i||r){if(r){var a=t.db.version+1;a>t.version&&(t.version=a)}return!0}return!1}function Ph(t){return new y(function(e,r){var n=new FileReader;n.onerror=r,n.onloadend=function(i){var a=btoa(i.target.result||"");e({__local_forage_encoded_blob:!0,data:a,type:t.type})},n.readAsBinaryString(t)})}function yl(t){var e=Nh(atob(t.data));return zi([e],{type:t.type})}function vl(t){return t&&t.__local_forage_encoded_blob}function Dh(t){var e=this,r=e._initReady().then(function(){var n=re[e._dbInfo.name];if(n&&n.dbReady)return n.dbReady});return it(r,t,t),r}function Vh(t){Br(t);for(var e=re[t.name],r=e.forages,n=0;n<r.length;n++){const i=r[n];i._dbInfo.db&&(i._dbInfo.db.close(),i._dbInfo.db=null)}return t.db=null,Ui(t).then(i=>(t.db=i,wl(t)?Bi(t):i)).then(i=>{t.db=e.db=i;for(var a=0;a<r.length;a++)r[a]._dbInfo.db=i}).catch(i=>{throw ci(t,i),i})}function be(t,e,r,n){n===void 0&&(n=1);try{var i=t.db.transaction(t.storeName,e);r(null,i)}catch(a){if(n>0&&(!t.db||a.name==="InvalidStateError"||a.name==="NotFoundError"))return y.resolve().then(()=>{if(!t.db||a.name==="NotFoundError"&&!t.db.objectStoreNames.contains(t.storeName)&&t.version<=t.db.version)return t.db&&(t.version=t.db.version+1),Bi(t)}).then(()=>Vh(t).then(function(){be(t,e,r,n-1)})).catch(r);r(a)}}function bl(){return{forages:[],db:null,dbReady:null,deferredOperations:[]}}function Hh(t){var e=this,r={db:null};if(t)for(var n in t)r[n]=t[n];var i=re[r.name];i||(i=bl(),re[r.name]=i),i.forages.push(e),e._initReady||(e._initReady=e.ready,e.ready=Dh);var a=[];function s(){return y.resolve()}for(var o=0;o<i.forages.length;o++){var l=i.forages[o];l!==e&&a.push(l._initReady().catch(s))}var c=i.forages.slice(0);return y.all(a).then(function(){return r.db=i.db,Ui(r)}).then(function(u){return r.db=u,wl(r,e._defaultConfig.version)?Bi(r):u}).then(function(u){r.db=i.db=u,e._dbInfo=r;for(var d=0;d<c.length;d++){var f=c[d];f!==e&&(f._dbInfo.db=r.db,f._dbInfo.version=r.version)}})}function Rh(t,e){var r=this;t=ve(t);var n=new y(function(i,a){r.ready().then(function(){be(r._dbInfo,fr,function(s,o){if(s)return a(s);try{var l=o.objectStore(r._dbInfo.storeName),c=l.get(t);c.onsuccess=function(){var u=c.result;u===void 0&&(u=null),vl(u)&&(u=yl(u)),i(u)},c.onerror=function(){a(c.error)}}catch(u){a(u)}})}).catch(a)});return L(n,e),n}function Fh(t,e){var r=this,n=new y(function(i,a){r.ready().then(function(){be(r._dbInfo,fr,function(s,o){if(s)return a(s);try{var l=o.objectStore(r._dbInfo.storeName),c=l.openCursor(),u=1;c.onsuccess=function(){var d=c.result;if(d){var f=d.value;vl(f)&&(f=yl(f));var h=t(f,d.key,u++);h!==void 0?i(h):d.continue()}else i()},c.onerror=function(){a(c.error)}}catch(d){a(d)}})}).catch(a)});return L(n,e),n}function zh(t,e,r){var n=this;t=ve(t);var i=new y(function(a,s){var o;n.ready().then(function(){return o=n._dbInfo,Oh.call(e)==="[object Blob]"?Ih(o.db).then(function(l){return l?e:Ph(e)}):e}).then(function(l){be(n._dbInfo,hn,function(c,u){if(c)return s(c);try{var d=u.objectStore(n._dbInfo.storeName);l===null&&(l=void 0);var f=d.put(l,t);u.oncomplete=function(){l===void 0&&(l=null),a(l)},u.onabort=u.onerror=function(){var h=f.error?f.error:f.transaction.error;s(h)}}catch(h){s(h)}})}).catch(s)});return L(i,r),i}function Wh(t,e){var r=this;t=ve(t);var n=new y(function(i,a){r.ready().then(function(){be(r._dbInfo,hn,function(s,o){if(s)return a(s);try{var l=o.objectStore(r._dbInfo.storeName),c=l.delete(t);o.oncomplete=function(){i()},o.onerror=function(){a(c.error)},o.onabort=function(){var u=c.error?c.error:c.transaction.error;a(u)}}catch(u){a(u)}})}).catch(a)});return L(n,e),n}function Uh(t){var e=this,r=new y(function(n,i){e.ready().then(function(){be(e._dbInfo,hn,function(a,s){if(a)return i(a);try{var o=s.objectStore(e._dbInfo.storeName),l=o.clear();s.oncomplete=function(){n()},s.onabort=s.onerror=function(){var c=l.error?l.error:l.transaction.error;i(c)}}catch(c){i(c)}})}).catch(i)});return L(r,t),r}function Bh(t){var e=this,r=new y(function(n,i){e.ready().then(function(){be(e._dbInfo,fr,function(a,s){if(a)return i(a);try{var o=s.objectStore(e._dbInfo.storeName),l=o.count();l.onsuccess=function(){n(l.result)},l.onerror=function(){i(l.error)}}catch(c){i(c)}})}).catch(i)});return L(r,t),r}function jh(t,e){var r=this,n=new y(function(i,a){if(t<0){i(null);return}r.ready().then(function(){be(r._dbInfo,fr,function(s,o){if(s)return a(s);try{var l=o.objectStore(r._dbInfo.storeName),c=!1,u=l.openKeyCursor();u.onsuccess=function(){var d=u.result;if(!d){i(null);return}t===0||c?i(d.key):(c=!0,d.advance(t))},u.onerror=function(){a(u.error)}}catch(d){a(d)}})}).catch(a)});return L(n,e),n}function Gh(t){var e=this,r=new y(function(n,i){e.ready().then(function(){be(e._dbInfo,fr,function(a,s){if(a)return i(a);try{var o=s.objectStore(e._dbInfo.storeName),l=o.openKeyCursor(),c=[];l.onsuccess=function(){var u=l.result;if(!u){n(c);return}c.push(u.key),u.continue()},l.onerror=function(){i(l.error)}}catch(u){i(u)}})}).catch(i)});return L(r,t),r}function Zh(t,e){e=Wi.apply(this,arguments);var r=this.config();t=typeof t!="function"&&t||{},t.name||(t.name=t.name||r.name,t.storeName=t.storeName||r.storeName);var n=this,i;if(!t.name)i=y.reject("Invalid arguments");else{const s=t.name===r.name&&n._dbInfo.db?y.resolve(n._dbInfo.db):Ui(t).then(o=>{const l=re[t.name],c=l.forages;l.db=o;for(var u=0;u<c.length;u++)c[u]._dbInfo.db=o;return o});t.storeName?i=s.then(o=>{if(!o.objectStoreNames.contains(t.storeName))return;const l=o.version+1;Br(t);const c=re[t.name],u=c.forages;o.close();for(let f=0;f<u.length;f++){const h=u[f];h._dbInfo.db=null,h._dbInfo.version=l}return new y((f,h)=>{const m=bt.open(t.name,l);m.onerror=b=>{m.result.close(),h(b)},m.onupgradeneeded=()=>{var b=m.result;b.deleteObjectStore(t.storeName)},m.onsuccess=()=>{const b=m.result;b.close(),f(b)}}).then(f=>{c.db=f;for(let h=0;h<u.length;h++){const m=u[h];m._dbInfo.db=f,li(m._dbInfo)}}).catch(f=>{throw(ci(t,f)||y.resolve()).catch(()=>{}),f})}):i=s.then(o=>{Br(t);const l=re[t.name],c=l.forages;o.close();for(var u=0;u<c.length;u++){const f=c[u];f._dbInfo.db=null}return new y((f,h)=>{var m=bt.deleteDatabase(t.name);m.onerror=()=>{const b=m.result;b&&b.close(),h(m.error)},m.onblocked=()=>{console.warn('dropInstance blocked for database "'+t.name+'" until all open connections are closed')},m.onsuccess=()=>{const b=m.result;b&&b.close(),f(b)}}).then(f=>{l.db=f;for(var h=0;h<c.length;h++){const m=c[h];li(m._dbInfo)}}).catch(f=>{throw(ci(t,f)||y.resolve()).catch(()=>{}),f})})}return L(i,e),i}var qh={_driver:"asyncStorage",_initStorage:Hh,_support:_h(),iterate:Fh,getItem:Rh,setItem:zh,removeItem:Wh,clear:Uh,length:Bh,key:jh,keys:Gh,dropInstance:Zh};function Yh(){return typeof openDatabase=="function"}var xe="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Kh="~~local_forage_type~",hs=/^~~local_forage_type~([^~]+)~/,jr="__lfsc__:",ui=jr.length,ji="arbf",di="blob",El="si08",$l="ui08",Tl="uic8",Sl="si16",Al="si32",xl="ur16",kl="ui32",Ml="fl32",Cl="fl64",ms=ui+ji.length,ps=Object.prototype.toString;function _l(t){var e=t.length*.75,r=t.length,n,i=0,a,s,o,l;t[t.length-1]==="="&&(e--,t[t.length-2]==="="&&e--);var c=new ArrayBuffer(e),u=new Uint8Array(c);for(n=0;n<r;n+=4)a=xe.indexOf(t[n]),s=xe.indexOf(t[n+1]),o=xe.indexOf(t[n+2]),l=xe.indexOf(t[n+3]),u[i++]=a<<2|s>>4,u[i++]=(s&15)<<4|o>>2,u[i++]=(o&3)<<6|l&63;return c}function fi(t){var e=new Uint8Array(t),r="",n;for(n=0;n<e.length;n+=3)r+=xe[e[n]>>2],r+=xe[(e[n]&3)<<4|e[n+1]>>4],r+=xe[(e[n+1]&15)<<2|e[n+2]>>6],r+=xe[e[n+2]&63];return e.length%3===2?r=r.substring(0,r.length-1)+"=":e.length%3===1&&(r=r.substring(0,r.length-2)+"=="),r}function Jh(t,e){var r="";if(t&&(r=ps.call(t)),t&&(r==="[object ArrayBuffer]"||t.buffer&&ps.call(t.buffer)==="[object ArrayBuffer]")){var n,i=jr;t instanceof ArrayBuffer?(n=t,i+=ji):(n=t.buffer,r==="[object Int8Array]"?i+=El:r==="[object Uint8Array]"?i+=$l:r==="[object Uint8ClampedArray]"?i+=Tl:r==="[object Int16Array]"?i+=Sl:r==="[object Uint16Array]"?i+=xl:r==="[object Int32Array]"?i+=Al:r==="[object Uint32Array]"?i+=kl:r==="[object Float32Array]"?i+=Ml:r==="[object Float64Array]"?i+=Cl:e(new Error("Failed to get type for BinaryArray"))),e(i+fi(n))}else if(r==="[object Blob]"){var a=new FileReader;a.onload=function(){var s=Kh+t.type+"~"+fi(this.result);e(jr+di+s)},a.readAsArrayBuffer(t)}else try{e(JSON.stringify(t))}catch(s){console.error("Couldn't convert value into a JSON string: ",t),e(null,s)}}function Qh(t){if(t.substring(0,ui)!==jr)return JSON.parse(t);var e=t.substring(ms),r=t.substring(ui,ms),n;if(r===di&&hs.test(e)){var i=e.match(hs);n=i[1],e=e.substring(i[0].length)}var a=_l(e);switch(r){case ji:return a;case di:return zi([a],{type:n});case El:return new Int8Array(a);case $l:return new Uint8Array(a);case Tl:return new Uint8ClampedArray(a);case Sl:return new Int16Array(a);case xl:return new Uint16Array(a);case Al:return new Int32Array(a);case kl:return new Uint32Array(a);case Ml:return new Float32Array(a);case Cl:return new Float64Array(a);default:throw new Error("Unkown type: "+r)}}var Gi={serialize:Jh,deserialize:Qh,stringToBuffer:_l,bufferToString:fi};function Ol(t,e,r,n){t.executeSql(`CREATE TABLE IF NOT EXISTS ${e.storeName} (id INTEGER PRIMARY KEY, key unique, value)`,[],r,n)}function Xh(t){var e=this,r={db:null};if(t)for(var n in t)r[n]=typeof t[n]!="string"?t[n].toString():t[n];var i=new y(function(a,s){try{r.db=openDatabase(r.name,String(r.version),r.description,r.size)}catch(o){return s(o)}r.db.transaction(function(o){Ol(o,r,function(){e._dbInfo=r,a()},function(l,c){s(c)})},s)});return r.serializer=Gi,i}function Me(t,e,r,n,i,a){t.executeSql(r,n,i,function(s,o){o.code===o.SYNTAX_ERR?s.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[e.storeName],function(l,c){c.rows.length?a(l,o):Ol(l,e,function(){l.executeSql(r,n,i,a)},a)},a):a(s,o)},a)}function em(t,e){var r=this;t=ve(t);var n=new y(function(i,a){r.ready().then(function(){var s=r._dbInfo;s.db.transaction(function(o){Me(o,s,`SELECT * FROM ${s.storeName} WHERE key = ? LIMIT 1`,[t],function(l,c){var u=c.rows.length?c.rows.item(0).value:null;u&&(u=s.serializer.deserialize(u)),i(u)},function(l,c){a(c)})})}).catch(a)});return L(n,e),n}function tm(t,e){var r=this,n=new y(function(i,a){r.ready().then(function(){var s=r._dbInfo;s.db.transaction(function(o){Me(o,s,`SELECT * FROM ${s.storeName}`,[],function(l,c){for(var u=c.rows,d=u.length,f=0;f<d;f++){var h=u.item(f),m=h.value;if(m&&(m=s.serializer.deserialize(m)),m=t(m,h.key,f+1),m!==void 0){i(m);return}}i()},function(l,c){a(c)})})}).catch(a)});return L(n,e),n}function Nl(t,e,r,n){var i=this;t=ve(t);var a=new y(function(s,o){i.ready().then(function(){e===void 0&&(e=null);var l=e,c=i._dbInfo;c.serializer.serialize(e,function(u,d){d?o(d):c.db.transaction(function(f){Me(f,c,`INSERT OR REPLACE INTO ${c.storeName} (key, value) VALUES (?, ?)`,[t,u],function(){s(l)},function(h,m){o(m)})},function(f){if(f.code===f.QUOTA_ERR){if(n>0){s(Nl.apply(i,[t,l,r,n-1]));return}o(f)}})})}).catch(o)});return L(a,r),a}function rm(t,e,r){return Nl.apply(this,[t,e,r,1])}function nm(t,e){var r=this;t=ve(t);var n=new y(function(i,a){r.ready().then(function(){var s=r._dbInfo;s.db.transaction(function(o){Me(o,s,`DELETE FROM ${s.storeName} WHERE key = ?`,[t],function(){i()},function(l,c){a(c)})})}).catch(a)});return L(n,e),n}function im(t){var e=this,r=new y(function(n,i){e.ready().then(function(){var a=e._dbInfo;a.db.transaction(function(s){Me(s,a,`DELETE FROM ${a.storeName}`,[],function(){n()},function(o,l){i(l)})})}).catch(i)});return L(r,t),r}function am(t){var e=this,r=new y(function(n,i){e.ready().then(function(){var a=e._dbInfo;a.db.transaction(function(s){Me(s,a,`SELECT COUNT(key) as c FROM ${a.storeName}`,[],function(o,l){var c=l.rows.item(0).c;n(c)},function(o,l){i(l)})})}).catch(i)});return L(r,t),r}function sm(t,e){var r=this,n=new y(function(i,a){r.ready().then(function(){var s=r._dbInfo;s.db.transaction(function(o){Me(o,s,`SELECT key FROM ${s.storeName} WHERE id = ? LIMIT 1`,[t+1],function(l,c){var u=c.rows.length?c.rows.item(0).key:null;i(u)},function(l,c){a(c)})})}).catch(a)});return L(n,e),n}function om(t){var e=this,r=new y(function(n,i){e.ready().then(function(){var a=e._dbInfo;a.db.transaction(function(s){Me(s,a,`SELECT key FROM ${a.storeName}`,[],function(o,l){for(var c=[],u=0;u<l.rows.length;u++)c.push(l.rows.item(u).key);n(c)},function(o,l){i(l)})})}).catch(i)});return L(r,t),r}function lm(t){return new y(function(e,r){t.transaction(function(n){n.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(i,a){for(var s=[],o=0;o<a.rows.length;o++)s.push(a.rows.item(o).name);e({db:t,storeNames:s})},function(i,a){r(a)})},function(n){r(n)})})}function cm(t,e){e=Wi.apply(this,arguments);var r=this.config();t=typeof t!="function"&&t||{},t.name||(t.name=t.name||r.name,t.storeName=t.storeName||r.storeName);var n=this,i;return t.name?i=new y(function(a){var s;t.name===r.name?s=n._dbInfo.db:s=openDatabase(t.name,"","",0),t.storeName?a({db:s,storeNames:[t.storeName]}):a(lm(s))}).then(function(a){return new y(function(s,o){a.db.transaction(function(l){function c(h){return new y(function(m,b){l.executeSql(`DROP TABLE IF EXISTS ${h}`,[],function(){m()},function(V,Y){b(Y)})})}for(var u=[],d=0,f=a.storeNames.length;d<f;d++)u.push(c(a.storeNames[d]));y.all(u).then(function(){s()}).catch(function(h){o(h)})},function(l){o(l)})})}):i=y.reject("Invalid arguments"),L(i,e),i}var um={_driver:"webSQLStorage",_initStorage:Xh,_support:Yh(),iterate:tm,getItem:em,setItem:rm,removeItem:nm,clear:im,length:am,key:sm,keys:om,dropInstance:cm};function dm(){try{return typeof localStorage<"u"&&"setItem"in localStorage&&!!localStorage.setItem}catch{return!1}}function Ll(t,e){var r=t.name+"/";return t.storeName!==e.storeName&&(r+=t.storeName+"/"),r}function fm(){var t="_localforage_support_test";try{return localStorage.setItem(t,!0),localStorage.removeItem(t),!1}catch{return!0}}function hm(){return!fm()||localStorage.length>0}function mm(t){var e=this,r={};if(t)for(var n in t)r[n]=t[n];return r.keyPrefix=Ll(t,e._defaultConfig),hm()?(e._dbInfo=r,r.serializer=Gi,y.resolve()):y.reject()}function pm(t){var e=this,r=e.ready().then(function(){for(var n=e._dbInfo.keyPrefix,i=localStorage.length-1;i>=0;i--){var a=localStorage.key(i);a.indexOf(n)===0&&localStorage.removeItem(a)}});return L(r,t),r}function gm(t,e){var r=this;t=ve(t);var n=r.ready().then(function(){var i=r._dbInfo,a=localStorage.getItem(i.keyPrefix+t);return a&&(a=i.serializer.deserialize(a)),a});return L(n,e),n}function wm(t,e){var r=this,n=r.ready().then(function(){for(var i=r._dbInfo,a=i.keyPrefix,s=a.length,o=localStorage.length,l=1,c=0;c<o;c++){var u=localStorage.key(c);if(u.indexOf(a)===0){var d=localStorage.getItem(u);if(d&&(d=i.serializer.deserialize(d)),d=t(d,u.substring(s),l++),d!==void 0)return d}}});return L(n,e),n}function ym(t,e){var r=this,n=r.ready().then(function(){var i=r._dbInfo,a;try{a=localStorage.key(t)}catch{a=null}return a&&(a=a.substring(i.keyPrefix.length)),a});return L(n,e),n}function vm(t){var e=this,r=e.ready().then(function(){for(var n=e._dbInfo,i=localStorage.length,a=[],s=0;s<i;s++){var o=localStorage.key(s);o.indexOf(n.keyPrefix)===0&&a.push(o.substring(n.keyPrefix.length))}return a});return L(r,t),r}function bm(t){var e=this,r=e.keys().then(function(n){return n.length});return L(r,t),r}function Em(t,e){var r=this;t=ve(t);var n=r.ready().then(function(){var i=r._dbInfo;localStorage.removeItem(i.keyPrefix+t)});return L(n,e),n}function $m(t,e,r){var n=this;t=ve(t);var i=n.ready().then(function(){e===void 0&&(e=null);var a=e;return new y(function(s,o){var l=n._dbInfo;l.serializer.serialize(e,function(c,u){if(u)o(u);else try{localStorage.setItem(l.keyPrefix+t,c),s(a)}catch(d){(d.name==="QuotaExceededError"||d.name==="NS_ERROR_DOM_QUOTA_REACHED")&&o(d),o(d)}})})});return L(i,r),i}function Tm(t,e){if(e=Wi.apply(this,arguments),t=typeof t!="function"&&t||{},!t.name){var r=this.config();t.name=t.name||r.name,t.storeName=t.storeName||r.storeName}var n=this,i;return t.name?i=new y(function(a){t.storeName?a(Ll(t,n._defaultConfig)):a(`${t.name}/`)}).then(function(a){for(var s=localStorage.length-1;s>=0;s--){var o=localStorage.key(s);o.indexOf(a)===0&&localStorage.removeItem(o)}}):i=y.reject("Invalid arguments"),L(i,e),i}var Sm={_driver:"localStorageWrapper",_initStorage:mm,_support:dm(),iterate:wm,getItem:gm,setItem:$m,removeItem:Em,clear:pm,length:bm,key:ym,keys:vm,dropInstance:Tm};const Am=(t,e)=>t===e||typeof t=="number"&&typeof e=="number"&&isNaN(t)&&isNaN(e),xm=(t,e)=>{const r=t.length;let n=0;for(;n<r;){if(Am(t[n],e))return!0;n++}return!1},Il=Array.isArray||function(t){return Object.prototype.toString.call(t)==="[object Array]"},Dt={},gs={},dt={INDEXEDDB:qh,WEBSQL:um,LOCALSTORAGE:Sm},km=[dt.INDEXEDDB._driver,dt.WEBSQL._driver,dt.LOCALSTORAGE._driver],Or=["dropInstance"],In=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(Or),Mm={description:"",driver:km.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function Cm(t,e){t[e]=function(){const r=arguments;return t.ready().then(function(){return t[e].apply(t,r)})}}function Pn(){for(let t=1;t<arguments.length;t++){const e=arguments[t];if(e)for(let r in e)e.hasOwnProperty(r)&&(Il(e[r])?arguments[0][r]=e[r].slice():arguments[0][r]=e[r])}return arguments[0]}class Zi{constructor(e){for(let r in dt)if(dt.hasOwnProperty(r)){const n=dt[r],i=n._driver;this[r]=i,Dt[i]||this.defineDriver(n)}this._defaultConfig=Pn({},Mm),this._config=Pn({},this._defaultConfig,e),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(()=>{})}config(e){if(typeof e=="object"){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(let r in e){if(r==="storeName"&&(e[r]=e[r].replace(/\W/g,"_")),r==="version"&&typeof e[r]!="number")return new Error("Database version must be a number.");this._config[r]=e[r]}return"driver"in e&&e.driver?this.setDriver(this._config.driver):!0}else return typeof e=="string"?this._config[e]:this._config}defineDriver(e,r,n){const i=new y(function(a,s){try{const o=e._driver,l=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!e._driver){s(l);return}const c=In.concat("_initStorage");for(let f=0,h=c.length;f<h;f++){const m=c[f];if((!xm(Or,m)||e[m])&&typeof e[m]!="function"){s(l);return}}(function(){const f=function(h){return function(){const m=new Error(`Method ${h} is not implemented by the current driver`),b=y.reject(m);return L(b,arguments[arguments.length-1]),b}};for(let h=0,m=Or.length;h<m;h++){const b=Or[h];e[b]||(e[b]=f(b))}})();const d=function(f){Dt[o]&&console.info(`Redefining LocalForage driver: ${o}`),Dt[o]=e,gs[o]=f,a()};"_support"in e?e._support&&typeof e._support=="function"?e._support().then(d,s):d(!!e._support):d(!0)}catch(o){s(o)}});return it(i,r,n),i}driver(){return this._driver||null}getDriver(e,r,n){const i=Dt[e]?y.resolve(Dt[e]):y.reject(new Error("Driver not found."));return it(i,r,n),i}getSerializer(e){const r=y.resolve(Gi);return it(r,e),r}ready(e){const r=this,n=r._driverSet.then(()=>(r._ready===null&&(r._ready=r._initDriver()),r._ready));return it(n,e,e),n}setDriver(e,r,n){const i=this;Il(e)||(e=[e]);const a=this._getSupportedDrivers(e);function s(){i._config.driver=i.driver()}function o(u){return i._extend(u),s(),i._ready=i._initStorage(i._config),i._ready}function l(u){return function(){let d=0;function f(){for(;d<u.length;){let m=u[d];return d++,i._dbInfo=null,i._ready=null,i.getDriver(m).then(o).catch(f)}s();const h=new Error("No available storage method found.");return i._driverSet=y.reject(h),i._driverSet}return f()}}const c=this._driverSet!==null?this._driverSet.catch(()=>y.resolve()):y.resolve();return this._driverSet=c.then(()=>{const u=a[0];return i._dbInfo=null,i._ready=null,i.getDriver(u).then(d=>{i._driver=d._driver,s(),i._wrapLibraryMethodsWithReady(),i._initDriver=l(a)})}).catch(()=>{s();const u=new Error("No available storage method found.");return i._driverSet=y.reject(u),i._driverSet}),it(this._driverSet,r,n),this._driverSet}supports(e){return!!gs[e]}_extend(e){Pn(this,e)}_getSupportedDrivers(e){const r=[];for(let n=0,i=e.length;n<i;n++){const a=e[n];this.supports(a)&&r.push(a)}return r}_wrapLibraryMethodsWithReady(){for(let e=0,r=In.length;e<r;e++)Cm(this,In[e])}createInstance(e){return new Zi(e)}}const _m=new Zi,Om=_m,Pl=Om.createInstance({description:"Stores created agendas",name:"agenda-editor-storage",storeName:"agenda-editor-storage"});var Pe=(t=>(t.AgendaConfig="stored-config",t.AgendaTemplates="stored-templates",t))(Pe||{});const Nm={"stored-config":vt,"stored-templates":G([si])};async function Tr(t,e){return Zt(e,Nm[t]),await Pl.setItem(t,e)}async function ws(t){return await Pl.getItem(t)}const Dl="vir-agenda-editor-orientation-style",Lm=mc({value:Dl,prefix:"#"}),Im={[ge.FullSheet]:v`portrait`,[ge.HalfSheet]:v`landscape`};function Pm(t){const e=Dm();e.innerHTML=String(v`
        @page {
            size: ${Im[t]};
        }
    `)}function Dm(){const t=document.head.querySelector(Lm);if(tc(t,HTMLStyleElement))return t;const e=document.createElement("style");return e.setAttribute("id",Dl),document.head.appendChild(e),e}const Et=kt()("agenda-edit"),Vl=kt()("save-as-template"),Hl=kt()("templates-edit"),Gr=un({tagName:"vir-error-message",styles:v`
        :host {
            color: red;
        }
    `,renderCallback(){return p`
            <slot></slot>
        `}}),q=C()({tagName:"vir-label",styles:v`
        :host {
            position: relative;
            display: flex;
            flex-direction: column;
            max-height: 100%;
            max-width: 100%;
            height: 100%;
            width: 100%;
        }

        p {
            ${dn};
        }

        label {
            display: flex;
            flex-direction: column;
            position: relative;
            max-height: 100%;
            max-width: 100%;
            height: 100%;
            width: 100%;
        }

        .slot-wrapper {
            position: relative;
            max-height: 100%;
            max-width: 100%;
            height: 100%;
            width: 100%;
        }

        .label {
            font-weight: bold;
            font-size: 0.5em;
        }
    `,renderCallback({inputs:t}){return p`
            <label>
                <p class="label">
                    ${t.label||(t.omitLabelSpace?"":p`
                              &nbsp;
                          `)}
                </p>
                <div class="slot-wrapper">
                    <slot></slot>
                </div>
            </label>
        `}}),A=C()({tagName:"vir-input",events:{valueChange:W()},styles:v`
        :host {
            display: flex;
            flex-direction: column;
        }

        ${q}, ${me} {
            max-width: 100%;
        }

        ${me} {
            width: 100%;
        }
    `,renderCallback({inputs:t,dispatch:e,events:r}){return p`
            <${q.assign({label:t.label,omitLabelSpace:t.omitLabelSpace})}>
                <${me.assign({value:t.value,placeholder:t.label})}
                    ${w(me.events.valueChange,n=>{e(new r.valueChange(n.detail))})}
                ></${me}>
            </${q}>
        `}}),Le=C()({tagName:"vir-agenda-template-entry",stateInitStatic:{isEditing:!1},hostClasses:{"vir-agenda-template-entry-disabled":({inputs:t})=>t.isDefault},events:{useTemplate:W(),deleteTemplate:W(),changeTemplateName:W()},styles:({hostClasses:t})=>v`
        :host {
            display: flex;
            gap: 8px;
        }

        ${t["vir-agenda-template-entry-disabled"].selector} .icons {
            visibility: hidden;
        }

        .icons {
            display: flex;
            align-items: center;
            align-self: stretch;
        }

        .delete:hover {
            color: red;
        }

        .use:hover {
            color: dodgerblue;
        }

        button {
            ${Ae};
            cursor: pointer;
            color: #999;
            display: flex;
            align-items: center;
        }

        ${me} {
            flex-grow: 1;
        }

        .template-name {
            flex-grow: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 1.5em;
        }
    `,renderCallback({state:t,inputs:e,updateState:r,dispatch:n,events:i}){const a=[{icon:oh,action:()=>{r({isEditing:!t.isEditing})},title:"Edit template name",htmlClass:"use",isDisabled:e.isDefault},{icon:ol,action:()=>{n(new i.deleteTemplate)},title:"Delete this template",htmlClass:"delete",isDisabled:e.isDefault}].map(o=>p`
                <button
                    class=${cn({"disabled-icon":o.isDisabled,[o.htmlClass]:!0})}
                >
                    <${U.assign({icon:o.icon})}
                        title=${o.title}
                        ${w("click",()=>{o.isDisabled||o.action()})}
                    ></${U}>
                </button>
            `),s=t.isEditing?p`
                  <${me.assign({value:e.agendaTemplate.name})}
                      ${w(me.events.valueChange,o=>{n(new i.changeTemplateName(o.detail))})}
                  ></${me}>
              `:p`
                  <div class="template-name">${e.agendaTemplate.name}</div>
              `;return p`
            ${s}
            <${We.assign({text:"Use"})}
                ${w("click",()=>{n(new i.useTemplate)})}
            ></${We}>
            <div class="icons">${a}</div>
        `}}),ys=C()({tagName:"vir-agenda-templates",stateInitStatic:{newTemplateName:""},styles:v`
        :host {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .new-template-entry {
            display: flex;
            align-items: flex-end;
            gap: 8px;
        }

        .new-template-entry ${A} {
            flex-grow: 1;
        }

        .templates {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
    `,renderCallback({state:t,inputs:e,dispatch:r,updateState:n}){function i(o){const l=x(e.userTemplates);o(l),r(new Hl(l))}const a=e.userTemplates.map((o,l)=>p`
                <${Le.assign({agendaTemplate:o,isDefault:!1})}
                    ${w(Le.events.changeTemplateName,c=>{i(u=>{const d=u[l];if(!d)throw new Error("failed to find template to edit");d.name=c.detail})})}
                    ${w(Le.events.deleteTemplate,()=>{i(c=>{c.splice(l,1)})})}
                    ${w(Le.events.useTemplate,()=>{r(new Et(o.config))})}
                ></${Le}>
            `),s=e.defaultTemplates.map(o=>p`
                <${Le.assign({agendaTemplate:o,isDefault:!0})}></${Le}>
            `);return p`
            <div class="new-template-entry">
                <${A.assign({value:t.newTemplateName,label:"Template Name"})}
                    ${w(A.events.valueChange,o=>{n({newTemplateName:o.detail})})}
                ></${A}>
                <${We.assign({text:"Save New Template"})}
                    title="Create a new template form the current config"
                    ${w("click",()=>{r(new Vl({name:t.newTemplateName})),n({newTemplateName:""})})}
                ></${We}>
            </div>
            <div class="templates">${s} ${a}</div>
        `}}),Dn=C()({tagName:"vir-checkbox",events:{checkedChange:W()},styles:v`
        :host {
            display: inline-flex;
            flex-direction: column;
        }

        ${q} {
            max-width: 100%;
        }

        * {
            cursor: pointer;
        }
    `,stateInitStatic:{inputElement:void 0},renderCallback({inputs:t,dispatch:e,events:r,state:n,updateState:i}){return n.inputElement&&n.inputElement.checked!==t.checked&&(n.inputElement.checked=t.checked),p`
            <${q.assign({label:"",omitLabelSpace:t.omitLabelSpace})}
                ${w("click",()=>{e(new r.checkedChange(!t.checked))})}
            >
                <input
                    type="checkbox"
                    .checked=${t.checked}
                    ${Vi(a=>{Yr(a,HTMLInputElement),i({inputElement:a})})}
                />
                <span>${t.label}</span>
            </${q}>
        `}}),z=C()({tagName:"vir-select",events:{valueChange:W()},stateInitStatic:{selectElement:void 0},renderCallback({inputs:t,dispatch:e,events:r,state:n,updateState:i}){return Vm(t.options),n.selectElement&&t.value!==n.selectElement.value&&(n.selectElement.value=t.value),p`
            <${q.assign({label:t.label})}>
                <select
                    .value=${t.value}
                    ${Vi(a=>{Yr(a,HTMLSelectElement),i({selectElement:a})})}
                    ${w("change",a=>{const s=fn(a,HTMLSelectElement);e(new r.valueChange(s.value))})}
                >
                    ${Tf(t.options,a=>a,a=>p`
                                <option value=${a}>${a}</option>
                            `)}
                </select>
            </${q}>
        `}});function Vm(t){if(new Set(t).size!==t.length)throw new Error("Duplicate options found.")}const vs=C()({tagName:"vir-agenda-settings",renderCallback({inputs:t,dispatch:e}){function r(n){const i=x(t.agendaConfig);n(i)!==!1&&e(new Et(i))}return p`
            <${z.assign({label:"Paper fill",options:qe(ge),value:t.agendaConfig.paperFill})}
                ${w(z.events.valueChange,n=>{r(i=>{if(!rr(n.detail,ge))return!1;i.paperFill=n.detail})})}
            ></${z}>
            <${Dn.assign({checked:t.agendaConfig.duplicateForPrinting,label:"duplicate half pages"})}
                ${w(Dn.events.checkedChange,n=>{r(i=>{i.duplicateForPrinting=n.detail})})}
            ></${Dn}>
        `}}),N=C()({tagName:"vir-button",styles:v`
        :host {
            display: flex;
            flex-direction: column;
        }

        ${We} {
            max-height: 100%;
        }
    `,renderCallback({inputs:t}){return p`
            <${q.assign({label:t.label,omitLabelSpace:t.omitLabelSpace})}>
                <${We.assign({icon:t.icon,text:t.text,disabled:t.disabled})}></${We}>
            </${q}>
        `}});var st=(t=>(t.Edit="edit",t.Raw="raw",t.Templates="templates",t.Settings="settings",t))(st||{});const Sr=C()({tagName:"vir-editor-tabs",styles:v`
        :host {
            display: flex;
        }
    `,events:{tabChange:W()},renderCallback({inputs:t,events:e,dispatch:r}){return qe(st).map(i=>p`
                <${N.assign({label:"",text:i,disabled:t.currentTab===i,omitLabelSpace:!0})}
                    ${w("click",()=>{r(new e.tabChange(i))})}
                ></${N}>
            `)}}),D=kt()("section-edit"),bs=C()({tagName:"vir-section-type-header",styles:v`
        :host {
            display: block;
        }

        h4 {
            ${dn};
        }
    `,renderCallback({inputs:t}){return p`
            <h4>${t.section.sectionType}</h4>
        `}});var Rl=(t=>(t.Horizontal="horizontal",t.Vertical="vertical",t))(Rl||{});const Vn=C()({tagName:"vir-table-size",events:{sizeChange:W()},hostClasses:{"vir-table-size-vertical":({inputs:t})=>t.direction==="vertical"},styles:({hostClasses:t})=>v`
        .controls-wrapper {
            display: flex;
            justify-content: space-between;
        }

        ${t["vir-table-size-vertical"].selector} .controls-wrapper {
            flex-direction: column;
            height: 100%;
        }

        ${t["vir-table-size-vertical"].selector} ${q} {
            height: 100%;
        }

        * {
            flex-basis: 0;
        }

        .size {
            font-family: monospace;
            margin: auto;
            font-size: 2em;
        }
    `,renderCallback({inputs:t,dispatch:e,events:r}){return p`
            <${q.assign({label:t.label})}>
                <div class="controls-wrapper">
                    <${N.assign({label:"",text:t.direction==="horizontal"?"◀":"▲",omitLabelSpace:!0})}
                        ${w("click",()=>{e(new r.sizeChange(t.size-1))})}
                    ></${N}>
                    <span class="size">${t.size}</span>
                    <${N.assign({label:"",text:t.direction==="horizontal"?"▶":"▼",omitLabelSpace:!0})}
                        ${w("click",()=>{e(new r.sizeChange(t.size+1))})}
                    ></${N}>
                </div>
            </${q}>
        `}}),Hm=C()({tagName:"vir-table-editor",styles:v`
        :host {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .table-row {
            display: flex;
            align-items: center;
            gap: 2px;
        }

        ${A} {
            flex-basis: 0;
            flex-grow: 1;
        }

        .bold {
            font-weight: bold;
        }
    `,renderCallback({inputs:t,dispatch:e}){const r=t.section.rows;if(!Lr(r,1)){const i=x(t.section);return i.rows.push([{isHeader:!0,text:""},{isHeader:!0,text:""}]),e(new D(i)),O}const n=r.map((i,a)=>{const s=i.map((o,l)=>p`
                    <${A.assign({label:"",value:o.text,omitLabelSpace:!0})}
                        class=${cn({bold:o.isHeader})}
                        ${w(A.events.valueChange,c=>{const u=x(t.section),d=u.rows[a];pe(d);const f=d[l];pe(f),f.text=c.detail,e(new D(u))})}
                        ${w("click",c=>{c.altKey&&Fm({cellIndex:l,currentTableSection:t.section,dispatch:e,rowIndex:a})})}
                    ></${A}>
                `);return p`
                <div class="table-row">
                    <${N.assign({label:"",text:"x",omitLabelSpace:!0})}
                        ${w("click",()=>{const o=x(t.section);o.rows=jt(o.rows,[a]),e(new D(o))})}
                    ></${N}>
                    ${s}
                    <${N.assign({label:"",text:"+",omitLabelSpace:!0})}
                        ${w("click",()=>{const o=x(t.section),l=Array(o.rows[0].length).fill(0).map(()=>({text:"",isHeader:!1}));o.rows=[...o.rows.slice(0,a+1),l,...o.rows.slice(a+1)],e(new D(o))})}
                    ></${N}>
                </div>
            `});return p`
            <${Vn.assign({direction:Rl.Horizontal,size:r[0].length,label:"columns"})}
                ${w(Vn.events.sizeChange,i=>{Rm({currentTableSection:t.section,newSize:i.detail,direction:"columns",dispatch:e})})}
            ></${Vn}>
            ${n}
        `}});function Rm({currentTableSection:t,newSize:e,direction:r,dispatch:n}){const i=x(t);if(Lr(i.rows,1)){if(!Lr(i.rows[0],1))return}else return;const a=i.rows[0].length,s=i.rows.length;if(r==="columns"){const o=Math.abs(a-e);if(e===a)return;e>a?i.rows.forEach(l=>{Array(o).fill(0).forEach(()=>{l.push(x(ii.defaultValue))})}):i.rows.forEach(l=>{l.splice(-o)})}else{const o=Math.abs(s-e);if(e===s)return;if(e>s){const l=x(ml.defaultValue);Array(a-1).fill(0).forEach(()=>{l.push(x(ii.defaultValue))}),Array(o).fill(0).forEach(()=>{i.rows.push(x(l))})}else i.rows.splice(-o)}n(new D(i))}function Fm({currentTableSection:t,rowIndex:e,cellIndex:r,dispatch:n}){const i=x(t),a=i.rows[e];pe(a);const s=a[r];pe(s),s.isHeader=!s.isHeader,n(new D(i))}const zm=C()({tagName:"vir-chronology-editor",styles:v`
        :host {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .chronology-row {
            display: flex;
        }

        .chronology-row > ${A} {
            flex-basis: 0;
            flex-grow: 1;
        }
    `,renderCallback({inputs:t,dispatch:e}){if(!t.section.rows.length){const n=x(t.section);return n.rows.push(ni.defaultValue),e(new D(n)),O}return t.section.rows.map((n,i)=>p`
                <div class="chronology-row">
                    <${N.assign({label:"",text:"x"})}
                        ${w("click",()=>{const a=x(t.section);a.rows=jt(a.rows,[i]),e(new D(a))})}
                    ></${N}>
                    <${A.assign({label:"left",value:n.left})}
                        ${w(A.events.valueChange,a=>{Es({currentChronologySection:t.section,dispatch:e,newValue:a.detail,rowIndex:i,side:"left"})})}
                    ></${A}>
                    <${A.assign({label:"right",value:n.right})}
                        ${w(A.events.valueChange,a=>{Es({currentChronologySection:t.section,dispatch:e,newValue:a.detail,rowIndex:i,side:"right"})})}
                    ></${A}>
                    <${N.assign({label:"",text:"+"})}
                        ${w("click",()=>{const a=x(t.section);a.rows=[...a.rows.slice(0,i+1),ni.defaultValue,...a.rows.slice(i+1)],e(new D(a))})}
                    ></${N}>
                </div>
            `)}});function Es({currentChronologySection:t,rowIndex:e,side:r,newValue:n,dispatch:i}){const a=x(t),s=a.rows[e];pe(s),s[r]=n,i(new D(a))}const Wm=C()({tagName:"vir-heading-editor",styles:v`
        :host {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .bottom-config {
            display: flex;
            gap: 8px;
        }

        .bottom-config ${A} {
            flex-grow: 1;
        }
    `,renderCallback({inputs:t,dispatch:e}){return p`
            <${A.assign({value:t.section.title,label:"title"})}
                ${w(A.events.valueChange,r=>{const n=x(t.section);n.title=r.detail,e(new D(n))})}
            ></${A}>
            <${A.assign({value:t.section.subtitle,label:"subtitle"})}
                ${w(A.events.valueChange,r=>{const n=x(t.section);n.subtitle=r.detail,e(new D(n))})}
            ></${A}>
            <div class="bottom-config">
                <${z.assign({label:"subtitle size",options:qe(F),value:t.section.subtitleSize})}
                    ${w(z.events.valueChange,r=>{if(!rr(r.detail,F))return;const n=x(t.section);n.subtitleSize=r.detail,e(new D(n))})}
                ></${z}>
                <${A.assign({label:"date",value:t.section.date})}
                    ${w(A.events.valueChange,r=>{const n=x(t.section);n.date=r.detail,e(new D(n))})}
                ></${A}>
            </div>
        `}}),Um=C()({tagName:"vir-photos-editor",styles:v`
        :host {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .photo-row {
            display: flex;
        }

        ${A} {
            flex-grow: 1;
        }

        ${ct} {
            max-height: 32px;
            max-width: 32px;
            min-height: 32px;
            min-width: 32px;
            align-self: flex-end;
            margin: 0 2px;
        }

        .dimensions-input {
            display: flex;
        }
    `,renderCallback({inputs:t,dispatch:e}){if(!t.section.photoUrls.length){const i=x(t.section);return i.photoUrls.push(""),e(new D(i)),O}const r=t.section.photoUrls.map((i,a)=>p`
                <div class="photo-row">
                    <${N.assign({label:"",text:"x"})}
                        ${w("click",()=>{const s=x(t.section);s.photoUrls=jt(s.photoUrls,[a]),e(new D(s))})}
                    ></${N}>
                    <${ct.assign({imageUrl:i})}>
                        <div slot=${Qt.Error}></div>
                    </${ct}>
                    <${A.assign({label:"photo url",value:i})}
                        ${w(A.events.valueChange,s=>{const o=x(t.section);o.photoUrls[a]=s.detail,e(new D(o))})}
                    ></${A}>
                    <${N.assign({label:"",text:"+"})}
                        ${w("click",()=>{const s=x(t.section);s.photoUrls=[...s.photoUrls.slice(0,a+1),"",...s.photoUrls.slice(a+1)],e(new D(s))})}
                    ></${N}>
                </div>
            `);return[p`
            <div class="dimensions-input">
                <${A.assign({label:"width",value:String(t.section.dimensions.width)})}
                    ${w(A.events.valueChange,i=>{const a=x(t.section);a.dimensions.width=Ki(i.detail),e(new D(a))})}
                ></${A}>
                <${A.assign({label:"height",value:String(t.section.dimensions.height)})}
                    ${w(A.events.valueChange,i=>{const a=x(t.section);a.dimensions.height=Ki(i.detail),e(new D(a))})}
                ></${A}>
            </div>
        `,r]}}),Hn=C()({tagName:"vir-text-area",events:{valueChange:W()},hostClasses:{"vir-text-area-block-resize":({inputs:t})=>!!t.blockResize},styles:({hostClasses:t})=>v`
        ${t["vir-text-area-block-resize"].selector} textarea {
            resize: none;
        }

        textarea {
            flex-grow: 1;
            font-family: monospace;
            width: 100%;
            max-width: 100%;
            min-width: 100%;
            min-height: 50px;
            box-sizing: border-box;
        }
    `,renderCallback({inputs:t,dispatch:e,events:r}){return p`
            <${q.assign({label:t.label})}>
                <textarea
                    .value=${t.value}
                    ${w("input",n=>{const i=fn(n,HTMLTextAreaElement);e(new r.valueChange(i.value))})}
                ></textarea>
            </${q}>
        `}}),Bm=C()({tagName:"vir-text-editor",styles:v`
        :host {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
    `,renderCallback({inputs:t,dispatch:e}){return p`
            <${z.assign({label:"align",options:qe(yt),value:t.section.alignment})}
                ${w(z.events.valueChange,r=>{const n=x(t.section),i=r.detail;rr(i,yt)&&(n.alignment=i,e(new D(n)))})}
            ></${z}>
            <${Hn.assign({label:"text",value:t.section.text})}
                ${w(Hn.events.valueChange,r=>{const n=x(t.section);n.text=r.detail,e(new D(n))})}
            ></${Hn}>
        `}}),jm={chronology:zm,heading:Wm,photos:Um,table:Hm,text:Bm},Ie=C()({tagName:"vir-section-editor",events:{sectionEdit:W(),newSection:W(),sectionDelete:W()},styles:v`
        :host {
            display: flex;
            flex-direction: column;
            padding: 4px 0;
        }
        .section-edit {
            display: flex;
            opacity: 0.5;
            justify-content: space-between;
        }

        .section-edit > * {
            flex-basis: 0;
        }
    `,renderCallback({inputs:t,dispatch:e,events:r}){const n=jm[t.section.sectionType],i={section:t.section},a="size"in t.section?p`
                      <${z.assign({label:"size",options:qe(F),value:t.section.size})}
                          ${w(z.events.valueChange,s=>{if("size"in t.section){if(!rr(s.detail,F))return}else return;const o=x(t.section);o.size=s.detail,e(new r.sectionEdit(o))})}
                      ></${z}>
                  `:O;return p`
            <${bs.assign({section:t.section})}></${bs}>
            <${n.assign(i)}
                ${w(D,s=>{e(new r.sectionEdit(s.detail))})}
            ></${n}>
            <div class="section-edit">
                <${N.assign({text:"x",label:""})}
                    ${w("click",()=>{e(new r.sectionDelete)})}
                ></${N}>
                <${z.assign({label:"type",options:Mh,value:t.section.sectionType})}
                    ${w(z.events.valueChange,s=>{const o=pl(s.detail);if(o!==t.section.sectionType){const l=x(Ri[o].defaultValue);e(new r.sectionEdit(l))}})}
                ></${z}>
                ${a}
                <${N.assign({text:"+",label:""})}
                    ${w("click",()=>{e(new r.newSection(t.section.sectionType))})}
                ></${N}>
            </div>
        `}}),$s=C()({tagName:"vir-pages-editor",styles:v`
        :host {
            display: flex;
            flex-direction: column;
            gap: 64px;
        }

        ${Ie} + ${Ie} {
            border-top: 2px solid dodgerblue;
        }

        .page-editor {
            display: flex;
            flex-direction: column;
        }

        .page-controls {
            margin-top: 16px;
            padding-top: 16px;
            border-top: 2px solid #ccc;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    `,renderCallback({inputs:t,dispatch:e}){function r(i){const a=x(t.agendaConfig);i(a),e(new Et(a))}return t.agendaConfig.pages.length?t.agendaConfig.pages.map((i,a)=>{const s=i.sections.map((o,l)=>p`
                    <${Ie.assign({section:o})}
                        ${w(Ie.events.sectionEdit,c=>{r(u=>{const d=u.pages[a];pe(d),d.sections[l]=c.detail})})}
                        ${w(Ie.events.newSection,c=>{r(u=>{const d=u.pages[a];pe(d);const f=x(Ri[pl(c.detail)].defaultValue),h=[...d.sections.slice(0,l+1),f,...d.sections.slice(l+1)];d.sections=h})})}
                        ${w(Ie.events.sectionDelete,()=>{r(c=>{const u=c.pages[a];pe(u);const d=jt(u==null?void 0:u.sections,[l]);u.sections=d})})}
                    ></${Ie}>
                `);return p`
                <section class="page-editor">
                    ${s}
                    <div class="page-controls">
                        <${N.assign({label:"",omitLabelSpace:!0,text:"x"})}
                            ${w("click",()=>{r(o=>{o.pages=jt(o.pages,[a])})})}
                        ></${N}>
                        <${z.assign({label:"spacing",options:qe(Xt),value:i.spacing})}
                            ${w(z.events.valueChange,o=>{r(l=>{const c=l.pages[a];if(pe(c),!rr(o.detail,Xt))throw new Error(`Invalid page spacing selected: '${o.detail}'`);c.spacing=o.detail})})}
                        ></${z}>
                        Page ${a+1}
                        <${N.assign({label:"",omitLabelSpace:!0,text:"+"})}
                            ${w("click",()=>{r(o=>{o.pages.push(x(ai.defaultValue))})})}
                        ></${N}>
                    </div>
                </section>
            `}):(r(i=>{i.pages.push(x(ai.defaultValue))}),O)}}),ft=C()({tagName:"vir-raw-json-editor",styles:v`
        :host {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        textarea {
            flex-grow: 1;
            font-size: 1.2em;
            font-family: monospace;
            resize: none;
        }

        .bottom-buttons {
            display: flex;
            align-items: center;
            gap: 16px;
        }
    `,stateInitStatic:{textAreaElement:void 0,inputJson:""},renderCallback({inputs:t,state:e,updateState:r,dispatch:n}){const i=e.inputJson||JSON.stringify(t.agendaConfig,null,4),a=ac({jsonString:i,errorHandler(){return{}}}),s=Nr(()=>Zt(a,vt));return p`
            <textarea
                .value=${i}
                ${Vi(o=>{Yr(o,HTMLTextAreaElement),r({textAreaElement:o})})}
                ${w("input",o=>{const l=fn(o,HTMLTextAreaElement);r({inputJson:l.value})})}
            ></textarea>

            <div class="bottom-buttons">
                <${N.assign({label:"",text:"Save",disabled:!!s,omitLabelSpace:!0})}
                    ${w("click",()=>{Zt(a,vt),n(new Et(a))})}
                ></${N}>
                <${Gr}>
                    ${s?er(s):p`
                              &nbsp;
                          `}
                </${Gr}>
            </div>
        `}}),Ar=C()({tagName:"vir-agenda-editor",styles:v`
        :host {
            display: flex;
            padding: 0 4px 4px;
            flex-direction: column;
            gap: 12px;
            border-right: #eee solid 1px;
            height: 100%;
            box-sizing: border-box;
            overflow-y: auto;
        }

        ${ft} {
            flex-grow: 1;
        }

        ${Sr} {
            position: sticky;
            top: 0;
            background-color: white;
            padding: 4px 0;
            z-index: 100;
        }
    `,stateInitStatic:{currentEditorTab:st.Edit},renderCallback({inputs:t,state:e,updateState:r}){const n=e.currentEditorTab===st.Edit?p`
                      <${$s.assign({agendaConfig:t.agendaConfig})}></${$s}>
                  `:e.currentEditorTab===st.Raw?p`
                        <${ft.assign({agendaConfig:t.agendaConfig})}></${ft}>
                    `:e.currentEditorTab===st.Settings?p`
                          <${vs.assign({agendaConfig:t.agendaConfig})}></${vs}>
                      `:p`
                          <${ys.assign({defaultTemplates:t.defaultTemplates,userTemplates:t.userTemplates})}></${ys}>
                      `;return p`
            <${Sr.assign({currentTab:e.currentEditorTab})}
                ${w(Sr.events.tabChange,i=>{r({currentEditorTab:i.detail})})}
            ></${Sr}>
            ${n}
        `}}),hi={"vir-font-h1":48,"vir-font-h2":40,"vir-font-h3":32,"vir-font-h4":27,"vir-font-h5":24,"vir-font-h6":20,"vir-font-regular":20,"vir-font-small":16,"vir-font-tiny":14},ue=et(pi(hi,(t,e)=>`${e}px`));function Gm(t){const e=j(hi).map(r=>{const n=hi[r]*t;return`${ue[r].name}: ${n}px;`});return de(e.join(`
`))}const Zr=C()({tagName:"vir-font",hostClasses:{"vir-font-h1":({inputs:t})=>t.size===F.H1,"vir-font-h2":({inputs:t})=>t.size===F.H2,"vir-font-h3":({inputs:t})=>t.size===F.H3,"vir-font-h4":({inputs:t})=>t.size===F.H4,"vir-font-h5":({inputs:t})=>t.size===F.H5,"vir-font-h6":({inputs:t})=>t.size===F.H6,"vir-font-regular":({inputs:t})=>t.size===F.Regular,"vir-font-small":({inputs:t})=>t.size===F.Small,"vir-font-tiny":({inputs:t})=>t.size===F.Tiny},styles:({hostClasses:t})=>v`
        ${t["vir-font-h1"].selector} {
            font-size: ${ue["vir-font-h1"].value};
            font-weight: bold;
        }
        ${t["vir-font-h2"].selector} {
            font-size: ${ue["vir-font-h2"].value};
            font-weight: bold;
        }
        ${t["vir-font-h3"].selector} {
            font-size: ${ue["vir-font-h3"].value};
            font-weight: bold;
        }
        ${t["vir-font-h4"].selector} {
            font-size: ${ue["vir-font-h4"].value};
            font-weight: bold;
        }
        ${t["vir-font-h5"].selector} {
            font-size: ${ue["vir-font-h5"].value};
            font-weight: bold;
        }
        ${t["vir-font-h6"].selector} {
            font-size: ${ue["vir-font-h6"].value};
            font-weight: bold;
        }
        ${t["vir-font-regular"].selector} {
            font-size: ${ue["vir-font-regular"].value};
        }
        ${t["vir-font-small"].selector} {
            font-size: ${ue["vir-font-small"].value};
        }
        ${t["vir-font-tiny"].selector} {
            font-size: ${ue["vir-font-tiny"].value};
        }
    `,renderCallback(){return p`
            <slot></slot>
        `}});function qr(t){return p`
        ${bf(t.replace(/\\n /g,"<br>&nbsp;").replace(/\\n/g,"<br>"))}
    `}const Zm=C()({tagName:"vir-chronology-present",styles:v`
        :host {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .row {
            display: flex;
            position: relative;
            justify-content: space-between;
        }

        span {
            background-color: white;
            z-index: 10;
        }

        span:last-of-type {
            padding-left: 4px;
            text-align: end;
        }

        span:first-of-type {
            padding-right: 4px;
        }

        .dots {
            position: absolute;
            z-index: 4;
            top: 0;
            left: 0;
            width: calc(100% - 20px);
            margin: 0 10px;
            border-bottom: 2px dotted black;
            box-sizing: border-box;
            height: calc(1em - 2px);
        }
    `,renderCallback({inputs:t}){return t.section.rows.map(r=>p`
                <div class="row">
                    <span>${qr(r.left)}</span>
                    <span>${qr(r.right)}</span>
                    <div class="dots"></div>
                </div>
            `)}}),qm=C()({tagName:"vir-heading-present",hostClasses:{"vir-heading-present-with-time":({inputs:t})=>!!t.section.date},styles:({hostClasses:t})=>v`
        :host {
            display: flex;
            align-items: baseline;
            gap: 0.5em;
            justify-content: center;
        }

        ${t["vir-heading-present-with-time"].selector} {
            align-items: center;
        }

        * {
            ${dn};
        }

        h1 {
            font-size: 1em;
        }

        h2 {
            font-size: 1em;
            font-weight: normal;
        }
    `,renderCallback({inputs:t}){const e=t.section.subtitle?p`
                  <h2>${t.section.subtitle}</h2>
              `:O,r=t.section.title?p`
                  <h1>${t.section.title}</h1>
              `:O,n=t.section.date?p`
                  <h2>${t.section.date}</h2>
              `:O;return p`
            ${r}
            <${Zr.assign({size:t.section.subtitleSize})}>
                ${e}${n}
            </${Zr}>
        `}}),Ym=C()({tagName:"vir-photos-present",cssVars:{"vir-photos-present-image-height":"100px","vir-photos-present-image-width":"100px"},styles:({cssVars:t})=>v`
        :host {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
        }

        ${ct} {
            max-height: ${t["vir-photos-present-image-height"].value};
            max-width: ${t["vir-photos-present-image-width"].value};
        }
    `,renderCallback({inputs:t,host:e,cssVars:r}){return es({forCssVar:r["vir-photos-present-image-height"],onElement:e,toValue:Un(t.section.dimensions.height)}),es({forCssVar:r["vir-photos-present-image-width"],onElement:e,toValue:Un(t.section.dimensions.width)}),t.section.photoUrls.map(i=>p`
                <${ct.assign({imageUrl:i})}></${ct}>
            `)}}),Km=C()({tagName:"vir-table-present",styles:v`
        :host {
            display: flex;
            justify-content: center;
            width: 100%;
        }

        table {
            max-width: 100%;
        }

        th {
            text-align: left;
        }

        th,
        td {
            vertical-align: top;
            padding: 4px;
            white-space: nowrap;
        }
    `,renderCallback({inputs:t}){const e=t.section.rows.map(r=>{const n=r.map(i=>{const a=qr(i.text);return i.isHeader?p`
                        <th>${a}</th>
                    `:p`
                        <td>${a}</td>
                    `});return p`
                <tr>${n}</tr>
            `});return p`
            <table><tbody>${e}</tbody></table>
        `}}),Jm=C()({tagName:"vir-text-present",hostClasses:{"vir-text-present-left":({inputs:t})=>t.section.alignment===yt.Left,"vir-text-present-justify":({inputs:t})=>t.section.alignment===yt.Justify},styles:({hostClasses:t})=>v`
        :host {
            display: block;
            text-align: center;
        }

        ${t["vir-text-present-left"].selector} {
            text-align: left;
        }

        ${t["vir-text-present-justify"].selector} {
            text-align: justify;
            display: table-row;
            text-align-last: left;
        }
    `,renderCallback({inputs:t}){return qr(t.section.text)}}),Qm={chronology:Zm,heading:qm,photos:Ym,table:Km,text:Jm},Rn=C()({tagName:"vir-section-present",styles:v`
        * {
            width: 100%;
        }
    `,renderCallback({inputs:t}){const e=Qm[t.section.sectionType],r={section:t.section},n=p`
            <${e.assign(r)}></${e}>
        `;return"size"in t.section?p`
                <${Zr.assign({size:t.section.size})}>${n}</${Zr}>
            `:n}}),Fn=C()({tagName:"vir-agenda-present",cssVars:{"vir-agenda-present-font":"Times New Roman"},hostClasses:{"vir-agenda-present-letter":({inputs:t})=>t.agendaConfig.paperSize===Fi.Letter,"vir-agenda-present-half-sheet":({inputs:t})=>t.agendaConfig.paperFill===ge.HalfSheet,"vir-agenda-present-full-sheet":({inputs:t})=>t.agendaConfig.paperFill===ge.FullSheet},styles:({hostClasses:t,cssVars:e})=>v`
        :host {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            justify-content: center;
            font-family: ${e["vir-agenda-present-font"].value}, serif;
            box-sizing: border-box;
        }

        .page-present {
            box-sizing: border-box;
            flex-shrink: 0;
            border: 1px solid #ccc;
            overflow: hidden;
        }

        ${Rn} {
            max-width: 100%;
            box-sizing: border-box;
        }

        .padding-marker {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            justify-content: space-between;
            border: 1px solid #ccc;
        }

        .page-present.space-start .padding-marker {
            justify-content: center;
            gap: 32px;
        }

        .page-present {
            display: flex;
        }

        ${t["vir-agenda-present-letter"].selector}${t["vir-agenda-present-half-sheet"].selector} .page-present {
            padding: 0.2in 0.25in 0.3in;
            width: 5.5in;
            height: 8.5in;
        }

        ${t["vir-agenda-present-letter"].selector}${t["vir-agenda-present-full-sheet"].selector} .page-present {
            padding: 0.3in 0.5in;
            width: 8.5in;
            height: 11in;
            ${Gm(1.4)};
        }

        .page-present.duplicate {
            display: none;
        }

        .photos {
            margin: 4px 0;
        }

        .chronology {
            margin-top: 8px;
        }

        .chronology + .heading {
            margin-top: 8px;
        }

        .text + .chronology {
            margin-top: 0;
        }

        .table + .heading {
            margin-top: 16px;
        }

        .table + .text {
            margin-top: 8px;
        }

        @media print {
            :host {
                gap: 0;
            }

            .page-present.duplicate {
                display: flex;
            }

            .padding-marker {
                border: none;
            }

            .page-present {
                border-color: transparent;
            }

            .page-present:nth-child(2n) {
                border-left-color: #f8f8f8 !important;
            }

            ${t["vir-agenda-present-half-sheet"].selector} .page-present {
                width: 50% !important;
                height: 100% !important;
            }

            ${t["vir-agenda-present-full-sheet"].selector} .page-present {
                width: 100% !important;
                height: 100% !important;
            }
        }
    `,renderCallback({inputs:t}){return t.agendaConfig.pages.map(r=>{const n=r.sections.map(s=>p`
                    <${Rn.assign({section:s})}
                        class=${s.sectionType}
                    ></${Rn}>
                `),i=t.agendaConfig.paperFill===ge.HalfSheet&&t.agendaConfig.duplicateForPrinting?2:1;return Array(i).fill(0).map((s,o)=>p`
                        <section
                            class="page-present ${cn({duplicate:o>0,"space-start":r.spacing===Xt.Start})}"
                        >
                            <div class="padding-marker">${n}</div>
                        </section>
                    `)})}});C()({tagName:"vir-agenda-editor-app",styles:v`
        :host {
            display: flex;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
        }

        ${ft} {
            flex-grow: 1;
        }

        ${Ar} {
            width: 800px;
            max-width: 40%;
        }

        .presentation {
            flex-grow: 1;
            display: flex;
            position: relative;
            justify-content: center;
            overflow-y: auto;
            margin: 10px 0;
            padding: 0 32px;
        }

        .fix-error-editor {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        @media print {
            ${Ar} {
                display: none;
            }

            ${Fn} {
                height: 100%;
            }

            .presentation {
                display: block;
                overflow: visible;
                margin: 0;
                padding: 0;
            }
        }
    `,stateInitStatic:{agendaConfig:ns({defaultValue:ws(Pe.AgendaConfig)}),userAgendaTemplates:ns({defaultValue:ws(Pe.AgendaTemplates).then(t=>I(t,"array")?t.filter(r=>Jn(r,si)):[])})},renderCallback({state:t,inputs:e}){if((t.agendaConfig.value==null||as(t.agendaConfig.value))&&t.agendaConfig.setValue(e.defaultAgendaConfig),is(t.agendaConfig.value)){if(!Jn(t.agendaConfig.value,vt)){const i=Nr(()=>Zt(t.agendaConfig.value,vt));console.error(i);const a=p`
                Invalid saved config: ${(i==null?void 0:i.message)||""}
                <br />
                Please edit and fix below.
            `;return p`
                <div class="fix-error-editor">
                    <${Gr}>${a}</${Gr}>
                    <${ft.assign({agendaConfig:t.agendaConfig.value})}
                        ${w(Et,async s=>{t.agendaConfig.setValue(s.detail),await Tr(Pe.AgendaConfig,s.detail)})}
                    ></${ft}>
                </div>
            `}}else return p`
                <${U.assign({icon:ll})}></${U}>
            `;const r=t.agendaConfig.value;Pm(r.paperFill);const n=is(t.userAgendaTemplates.value)&&!as(t.userAgendaTemplates.value)?t.userAgendaTemplates.value:[];return p`
            <${Ar.assign({agendaConfig:r,defaultTemplates:e.defaultAgendaTemplates||[si.defaultValue],userTemplates:n})}
                ${w(Et,async i=>{t.agendaConfig.setValue(i.detail),await Tr(Pe.AgendaConfig,i.detail)})}
                ${w(Hl,async i=>{t.userAgendaTemplates.setValue(i.detail),await Tr(Pe.AgendaTemplates,i.detail)})}
                ${w(Vl,async i=>{const a=[...n,{name:i.detail.name,id:hc(8),config:r}];t.userAgendaTemplates.setValue(a),await Tr(Pe.AgendaTemplates,a)})}
            ></${Ar}>
            <div class="presentation">
                <${Fn.assign({agendaConfig:r})}></${Fn}>
            </div>
        `}});
