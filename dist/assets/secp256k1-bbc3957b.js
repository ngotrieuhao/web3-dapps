import{j as Te,k as Le,t as Ue,l as ne,m as ke,n as He,r as he,o as _t}from"./index-8d8cb10c.js";/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */const Tt=BigInt(0),Lt=BigInt(1),Ce=BigInt(2);function ft(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"}function W(t){if(!ft(t))throw new Error("Uint8Array expected")}function wt(t,n){if(typeof n!="boolean")throw new Error(t+" boolean expected, got "+n)}const Ze=Array.from({length:256},(t,n)=>n.toString(16).padStart(2,"0"));function gt(t){W(t);let n="";for(let e=0;e<t.length;e++)n+=Ze[t[e]];return n}function dt(t){const n=t.toString(16);return n.length&1?"0"+n:n}function Xt(t){if(typeof t!="string")throw new Error("hex string expected, got "+typeof t);return t===""?Tt:BigInt("0x"+t)}const Q={_0:48,_9:57,A:65,F:70,a:97,f:102};function re(t){if(t>=Q._0&&t<=Q._9)return t-Q._0;if(t>=Q.A&&t<=Q.F)return t-(Q.A-10);if(t>=Q.a&&t<=Q.f)return t-(Q.a-10)}function mt(t){if(typeof t!="string")throw new Error("hex string expected, got "+typeof t);const n=t.length,e=n/2;if(n%2)throw new Error("hex string expected, got unpadded hex of length "+n);const r=new Uint8Array(e);for(let o=0,i=0;o<e;o++,i+=2){const c=re(t.charCodeAt(i)),f=re(t.charCodeAt(i+1));if(c===void 0||f===void 0){const s=t[i]+t[i+1];throw new Error('hex string expected, got non-hex character "'+s+'" at index '+i)}r[o]=c*16+f}return r}function $(t){return Xt(gt(t))}function Qt(t){return W(t),Xt(gt(Uint8Array.from(t).reverse()))}function rt(t,n){return mt(t.toString(16).padStart(n*2,"0"))}function Jt(t,n){return rt(t,n).reverse()}function ze(t){return mt(dt(t))}function z(t,n,e){let r;if(typeof n=="string")try{r=mt(n)}catch(i){throw new Error(t+" must be hex string or Uint8Array, cause: "+i)}else if(ft(n))r=Uint8Array.from(n);else throw new Error(t+" must be hex string or Uint8Array");const o=r.length;if(typeof e=="number"&&o!==e)throw new Error(t+" of length "+e+" expected, got "+o);return r}function K(...t){let n=0;for(let r=0;r<t.length;r++){const o=t[r];W(o),n+=o.length}const e=new Uint8Array(n);for(let r=0,o=0;r<t.length;r++){const i=t[r];e.set(i,o),o+=i.length}return e}function Ve(t,n){if(t.length!==n.length)return!1;let e=0;for(let r=0;r<t.length;r++)e|=t[r]^n[r];return e===0}function Ut(t){if(typeof t!="string")throw new Error("string expected");return new Uint8Array(new TextEncoder().encode(t))}const Zt=t=>typeof t=="bigint"&&Tt<=t;function yt(t,n,e){return Zt(t)&&Zt(n)&&Zt(e)&&n<=t&&t<e}function nt(t,n,e,r){if(!yt(n,e,r))throw new Error("expected valid "+t+": "+e+" <= n < "+r+", got "+n)}function we(t){let n;for(n=0;t>Tt;t>>=Lt,n+=1);return n}function Me(t,n){return t>>BigInt(n)&Lt}function Pe(t,n,e){return t|(e?Lt:Tt)<<BigInt(n)}const Ft=t=>(Ce<<BigInt(t-1))-Lt,zt=t=>new Uint8Array(t),oe=t=>Uint8Array.from(t);function ge(t,n,e){if(typeof t!="number"||t<2)throw new Error("hashLen must be a number");if(typeof n!="number"||n<2)throw new Error("qByteLen must be a number");if(typeof e!="function")throw new Error("hmacFn must be a function");let r=zt(t),o=zt(t),i=0;const c=()=>{r.fill(1),o.fill(0),i=0},f=(...y)=>e(o,r,...y),s=(y=zt())=>{o=f(oe([0]),y),r=f(),y.length!==0&&(o=f(oe([1]),y),r=f())},u=()=>{if(i++>=1e3)throw new Error("drbg: tried 1000 values");let y=0;const d=[];for(;y<n;){r=f();const m=r.slice();d.push(m),y+=r.length}return K(...d)};return(y,d)=>{c(),s(y);let m;for(;!(m=d(u()));)s();return c(),m}}const je={bigint:t=>typeof t=="bigint",function:t=>typeof t=="function",boolean:t=>typeof t=="boolean",string:t=>typeof t=="string",stringOrUint8Array:t=>typeof t=="string"||ft(t),isSafeInteger:t=>Number.isSafeInteger(t),array:t=>Array.isArray(t),field:(t,n)=>n.Fp.isValid(t),hash:t=>typeof t=="function"&&Number.isSafeInteger(t.outputLen)};function bt(t,n,e={}){const r=(o,i,c)=>{const f=je[i];if(typeof f!="function")throw new Error("invalid validator function");const s=t[o];if(!(c&&s===void 0)&&!f(s,t))throw new Error("param "+String(o)+" is invalid. Expected "+i+", got "+s)};for(const[o,i]of Object.entries(n))r(o,i,!1);for(const[o,i]of Object.entries(e))r(o,i,!0);return t}const Ke=()=>{throw new Error("not implemented")};function Yt(t){const n=new WeakMap;return(e,...r)=>{const o=n.get(e);if(o!==void 0)return o;const i=t(e,...r);return n.set(e,i),i}}const Ye=Object.freeze(Object.defineProperty({__proto__:null,aInRange:nt,abool:wt,abytes:W,bitGet:Me,bitLen:we,bitMask:Ft,bitSet:Pe,bytesToHex:gt,bytesToNumberBE:$,bytesToNumberLE:Qt,concatBytes:K,createHmacDrbg:ge,ensureBytes:z,equalBytes:Ve,hexToBytes:mt,hexToNumber:Xt,inRange:yt,isBytes:ft,memoized:Yt,notImplemented:Ke,numberToBytesBE:rt,numberToBytesLE:Jt,numberToHexUnpadded:dt,numberToVarBytesBE:ze,utf8ToBytes:Ut,validateObject:bt},Symbol.toStringTag,{value:"Module"}));class me extends Te{constructor(n,e){super(),this.finished=!1,this.destroyed=!1,Le(n);const r=Ue(e);if(this.iHash=n.create(),typeof this.iHash.update!="function")throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;const o=this.blockLen,i=new Uint8Array(o);i.set(r.length>o?n.create().update(r).digest():r);for(let c=0;c<i.length;c++)i[c]^=54;this.iHash.update(i),this.oHash=n.create();for(let c=0;c<i.length;c++)i[c]^=106;this.oHash.update(i),i.fill(0)}update(n){return ne(this),this.iHash.update(n),this}digestInto(n){ne(this),ke(n,this.outputLen),this.finished=!0,this.iHash.digestInto(n),this.oHash.update(n),this.oHash.digestInto(n),this.destroy()}digest(){const n=new Uint8Array(this.oHash.outputLen);return this.digestInto(n),n}_cloneInto(n){n||(n=Object.create(Object.getPrototypeOf(this),{}));const{oHash:e,iHash:r,finished:o,destroyed:i,blockLen:c,outputLen:f}=this;return n=n,n.finished=o,n.destroyed=i,n.blockLen=c,n.outputLen=f,n.oHash=e._cloneInto(n.oHash),n.iHash=r._cloneInto(n.iHash),n}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}}const ye=(t,n,e)=>new me(t,n).update(e).digest();ye.create=(t,n)=>new me(t,n);/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */const C=BigInt(0),U=BigInt(1),ct=BigInt(2),De=BigInt(3),Dt=BigInt(4),ie=BigInt(5),se=BigInt(8);function H(t,n){const e=t%n;return e>=C?e:n+e}function Ge(t,n,e){if(n<C)throw new Error("invalid exponent, negatives unsupported");if(e<=C)throw new Error("invalid modulus");if(e===U)return C;let r=U;for(;n>C;)n&U&&(r=r*t%e),t=t*t%e,n>>=U;return r}function Y(t,n,e){let r=t;for(;n-- >C;)r*=r,r%=e;return r}function Gt(t,n){if(t===C)throw new Error("invert: expected non-zero number");if(n<=C)throw new Error("invert: expected positive modulus, got "+n);let e=H(t,n),r=n,o=C,i=U;for(;e!==C;){const f=r/e,s=r%e,u=o-i*f;r=e,e=s,o=i,i=u}if(r!==U)throw new Error("invert: does not exist");return H(o,n)}function $e(t){const n=(t-U)/ct;let e,r,o;for(e=t-U,r=0;e%ct===C;e/=ct,r++);for(o=ct;o<t&&Ge(o,n,t)!==t-U;o++)if(o>1e3)throw new Error("Cannot find square root: likely non-prime P");if(r===1){const c=(t+U)/Dt;return function(s,u){const h=s.pow(u,c);if(!s.eql(s.sqr(h),u))throw new Error("Cannot find square root");return h}}const i=(e+U)/ct;return function(f,s){if(f.pow(s,n)===f.neg(f.ONE))throw new Error("Cannot find square root");let u=r,h=f.pow(f.mul(f.ONE,o),e),y=f.pow(s,i),d=f.pow(s,e);for(;!f.eql(d,f.ONE);){if(f.eql(d,f.ZERO))return f.ZERO;let m=1;for(let b=f.sqr(d);m<u&&!f.eql(b,f.ONE);m++)b=f.sqr(b);const S=f.pow(h,U<<BigInt(u-m-1));h=f.sqr(S),y=f.mul(y,S),d=f.mul(d,h),u=m}return y}}function We(t){if(t%Dt===De){const n=(t+U)/Dt;return function(r,o){const i=r.pow(o,n);if(!r.eql(r.sqr(i),o))throw new Error("Cannot find square root");return i}}if(t%se===ie){const n=(t-ie)/se;return function(r,o){const i=r.mul(o,ct),c=r.pow(i,n),f=r.mul(o,c),s=r.mul(r.mul(f,ct),c),u=r.mul(f,r.sub(s,r.ONE));if(!r.eql(r.sqr(u),o))throw new Error("Cannot find square root");return u}}return $e(t)}const Xe=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function be(t){const n={ORDER:"bigint",MASK:"bigint",BYTES:"isSafeInteger",BITS:"isSafeInteger"},e=Xe.reduce((r,o)=>(r[o]="function",r),n);return bt(t,e)}function Qe(t,n,e){if(e<C)throw new Error("invalid exponent, negatives unsupported");if(e===C)return t.ONE;if(e===U)return n;let r=t.ONE,o=n;for(;e>C;)e&U&&(r=t.mul(r,o)),o=t.sqr(o),e>>=U;return r}function Je(t,n){const e=new Array(n.length),r=n.reduce((i,c,f)=>t.is0(c)?i:(e[f]=i,t.mul(i,c)),t.ONE),o=t.inv(r);return n.reduceRight((i,c,f)=>t.is0(c)?i:(e[f]=t.mul(i,e[f]),t.mul(i,c)),o),e}function pe(t,n){const e=n!==void 0?n:t.toString(2).length,r=Math.ceil(e/8);return{nBitLength:e,nByteLength:r}}function Ee(t,n,e=!1,r={}){if(t<=C)throw new Error("invalid field: expected ORDER > 0, got "+t);const{nBitLength:o,nByteLength:i}=pe(t,n);if(i>2048)throw new Error("invalid field: expected ORDER of <= 2048 bytes");let c;const f=Object.freeze({ORDER:t,isLE:e,BITS:o,BYTES:i,MASK:Ft(o),ZERO:C,ONE:U,create:s=>H(s,t),isValid:s=>{if(typeof s!="bigint")throw new Error("invalid field element: expected bigint, got "+typeof s);return C<=s&&s<t},is0:s=>s===C,isOdd:s=>(s&U)===U,neg:s=>H(-s,t),eql:(s,u)=>s===u,sqr:s=>H(s*s,t),add:(s,u)=>H(s+u,t),sub:(s,u)=>H(s-u,t),mul:(s,u)=>H(s*u,t),pow:(s,u)=>Qe(f,s,u),div:(s,u)=>H(s*Gt(u,t),t),sqrN:s=>s*s,addN:(s,u)=>s+u,subN:(s,u)=>s-u,mulN:(s,u)=>s*u,inv:s=>Gt(s,t),sqrt:r.sqrt||(s=>(c||(c=We(t)),c(f,s))),invertBatch:s=>Je(f,s),cmov:(s,u,h)=>h?u:s,toBytes:s=>e?Jt(s,i):rt(s,i),fromBytes:s=>{if(s.length!==i)throw new Error("Field.fromBytes: expected "+i+" bytes, got "+s.length);return e?Qt(s):$(s)}});return Object.freeze(f)}function ve(t){if(typeof t!="bigint")throw new Error("field order must be bigint");const n=t.toString(2).length;return Math.ceil(n/8)}function Be(t){const n=ve(t);return n+Math.ceil(n/2)}function Fe(t,n,e=!1){const r=t.length,o=ve(n),i=Be(n);if(r<16||r<i||r>1024)throw new Error("expected "+i+"-1024 bytes of input, got "+r);const c=e?Qt(t):$(t),f=H(c,n-U)+U;return e?Jt(f,o):rt(f,o)}/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */const ce=BigInt(0),It=BigInt(1);function Vt(t,n){const e=n.negate();return t?e:n}function xe(t,n){if(!Number.isSafeInteger(t)||t<=0||t>n)throw new Error("invalid window size, expected [1.."+n+"], got W="+t)}function Mt(t,n){xe(t,n);const e=Math.ceil(n/t)+1,r=2**(t-1);return{windows:e,windowSize:r}}function tn(t,n){if(!Array.isArray(t))throw new Error("array expected");t.forEach((e,r)=>{if(!(e instanceof n))throw new Error("invalid point at index "+r)})}function en(t,n){if(!Array.isArray(t))throw new Error("array of scalars expected");t.forEach((e,r)=>{if(!n.isValid(e))throw new Error("invalid scalar at index "+r)})}const Pt=new WeakMap,Se=new WeakMap;function jt(t){return Se.get(t)||1}function nn(t,n){return{constTimeNegate:Vt,hasPrecomputes(e){return jt(e)!==1},unsafeLadder(e,r,o=t.ZERO){let i=e;for(;r>ce;)r&It&&(o=o.add(i)),i=i.double(),r>>=It;return o},precomputeWindow(e,r){const{windows:o,windowSize:i}=Mt(r,n),c=[];let f=e,s=f;for(let u=0;u<o;u++){s=f,c.push(s);for(let h=1;h<i;h++)s=s.add(f),c.push(s);f=s.double()}return c},wNAF(e,r,o){const{windows:i,windowSize:c}=Mt(e,n);let f=t.ZERO,s=t.BASE;const u=BigInt(2**e-1),h=2**e,y=BigInt(e);for(let d=0;d<i;d++){const m=d*c;let S=Number(o&u);o>>=y,S>c&&(S-=h,o+=It);const b=m,a=m+Math.abs(S)-1,l=d%2!==0,w=S<0;S===0?s=s.add(Vt(l,r[b])):f=f.add(Vt(w,r[a]))}return{p:f,f:s}},wNAFUnsafe(e,r,o,i=t.ZERO){const{windows:c,windowSize:f}=Mt(e,n),s=BigInt(2**e-1),u=2**e,h=BigInt(e);for(let y=0;y<c;y++){const d=y*f;if(o===ce)break;let m=Number(o&s);if(o>>=h,m>f&&(m-=u,o+=It),m===0)continue;let S=r[d+Math.abs(m)-1];m<0&&(S=S.negate()),i=i.add(S)}return i},getPrecomputes(e,r,o){let i=Pt.get(r);return i||(i=this.precomputeWindow(r,e),e!==1&&Pt.set(r,o(i))),i},wNAFCached(e,r,o){const i=jt(e);return this.wNAF(i,this.getPrecomputes(i,e,o),r)},wNAFCachedUnsafe(e,r,o,i){const c=jt(e);return c===1?this.unsafeLadder(e,r,i):this.wNAFUnsafe(c,this.getPrecomputes(c,e,o),r,i)},setWindowSize(e,r){xe(r,n),Se.set(e,r),Pt.delete(e)}}}function rn(t,n,e,r){if(tn(e,t),en(r,n),e.length!==r.length)throw new Error("arrays of points and scalars must have equal length");const o=t.ZERO,i=we(BigInt(e.length)),c=i>12?i-3:i>4?i-2:i?2:1,f=(1<<c)-1,s=new Array(f+1).fill(o),u=Math.floor((n.BITS-1)/c)*c;let h=o;for(let y=u;y>=0;y-=c){s.fill(o);for(let m=0;m<r.length;m++){const S=r[m],b=Number(S>>BigInt(y)&BigInt(f));s[b]=s[b].add(e[m])}let d=o;for(let m=s.length-1,S=o;m>0;m--)S=S.add(s[m]),d=d.add(S);if(h=h.add(d),y!==0)for(let m=0;m<c;m++)h=h.double()}return h}function Ae(t){return be(t.Fp),bt(t,{n:"bigint",h:"bigint",Gx:"field",Gy:"field"},{nBitLength:"isSafeInteger",nByteLength:"isSafeInteger"}),Object.freeze({...pe(t.n,t.nBitLength),...t,p:t.Fp.ORDER})}/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */function fe(t){t.lowS!==void 0&&wt("lowS",t.lowS),t.prehash!==void 0&&wt("prehash",t.prehash)}function on(t){const n=Ae(t);bt(n,{a:"field",b:"field"},{allowedPrivateKeyLengths:"array",wrapPrivateKey:"boolean",isTorsionFree:"function",clearCofactor:"function",allowInfinityPoint:"boolean",fromBytes:"function",toBytes:"function"});const{endo:e,Fp:r,a:o}=n;if(e){if(!r.eql(o,r.ZERO))throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");if(typeof e!="object"||typeof e.beta!="bigint"||typeof e.splitScalar!="function")throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function")}return Object.freeze({...n})}const{bytesToNumberBE:sn,hexToBytes:cn}=Ye;class fn extends Error{constructor(n=""){super(n)}}const J={Err:fn,_tlv:{encode:(t,n)=>{const{Err:e}=J;if(t<0||t>256)throw new e("tlv.encode: wrong tag");if(n.length&1)throw new e("tlv.encode: unpadded data");const r=n.length/2,o=dt(r);if(o.length/2&128)throw new e("tlv.encode: long form length too big");const i=r>127?dt(o.length/2|128):"";return dt(t)+i+o+n},decode(t,n){const{Err:e}=J;let r=0;if(t<0||t>256)throw new e("tlv.encode: wrong tag");if(n.length<2||n[r++]!==t)throw new e("tlv.decode: wrong tlv");const o=n[r++],i=!!(o&128);let c=0;if(!i)c=o;else{const s=o&127;if(!s)throw new e("tlv.decode(long): indefinite length not supported");if(s>4)throw new e("tlv.decode(long): byte length is too big");const u=n.subarray(r,r+s);if(u.length!==s)throw new e("tlv.decode: length bytes not complete");if(u[0]===0)throw new e("tlv.decode(long): zero leftmost byte");for(const h of u)c=c<<8|h;if(r+=s,c<128)throw new e("tlv.decode(long): not minimal encoding")}const f=n.subarray(r,r+c);if(f.length!==c)throw new e("tlv.decode: wrong value length");return{v:f,l:n.subarray(r+c)}}},_int:{encode(t){const{Err:n}=J;if(t<G)throw new n("integer: negative integers are not allowed");let e=dt(t);if(Number.parseInt(e[0],16)&8&&(e="00"+e),e.length&1)throw new n("unexpected DER parsing assertion: unpadded hex");return e},decode(t){const{Err:n}=J;if(t[0]&128)throw new n("invalid signature integer: negative");if(t[0]===0&&!(t[1]&128))throw new n("invalid signature integer: unnecessary leading zero");return sn(t)}},toSig(t){const{Err:n,_int:e,_tlv:r}=J,o=typeof t=="string"?cn(t):t;W(o);const{v:i,l:c}=r.decode(48,o);if(c.length)throw new n("invalid signature: left bytes after parsing");const{v:f,l:s}=r.decode(2,i),{v:u,l:h}=r.decode(2,s);if(h.length)throw new n("invalid signature: left bytes after parsing");return{r:e.decode(f),s:e.decode(u)}},hexFromSig(t){const{_tlv:n,_int:e}=J,r=n.encode(2,e.encode(t.r)),o=n.encode(2,e.encode(t.s)),i=r+o;return n.encode(48,i)}},G=BigInt(0),T=BigInt(1),tt=BigInt(2),qt=BigInt(3),ae=BigInt(4);function an(t){const n=on(t),{Fp:e}=n,r=Ee(n.n,n.nBitLength),o=n.toBytes||((b,a,l)=>{const w=a.toAffine();return K(Uint8Array.from([4]),e.toBytes(w.x),e.toBytes(w.y))}),i=n.fromBytes||(b=>{const a=b.subarray(1),l=e.fromBytes(a.subarray(0,e.BYTES)),w=e.fromBytes(a.subarray(e.BYTES,2*e.BYTES));return{x:l,y:w}});function c(b){const{a,b:l}=n,w=e.sqr(b),p=e.mul(w,b);return e.add(e.add(p,e.mul(b,a)),l)}if(!e.eql(e.sqr(n.Gy),c(n.Gx)))throw new Error("bad generator point: equation left != right");function f(b){return yt(b,T,n.n)}function s(b){const{allowedPrivateKeyLengths:a,nByteLength:l,wrapPrivateKey:w,n:p}=n;if(a&&typeof b!="bigint"){if(ft(b)&&(b=gt(b)),typeof b!="string"||!a.includes(b.length))throw new Error("invalid private key");b=b.padStart(l*2,"0")}let B;try{B=typeof b=="bigint"?b:$(z("private key",b,l))}catch{throw new Error("invalid private key, expected hex or "+l+" bytes, got "+typeof b)}return w&&(B=H(B,p)),nt("private key",B,T,p),B}function u(b){if(!(b instanceof d))throw new Error("ProjectivePoint expected")}const h=Yt((b,a)=>{const{px:l,py:w,pz:p}=b;if(e.eql(p,e.ONE))return{x:l,y:w};const B=b.is0();a==null&&(a=B?e.ONE:e.inv(p));const O=e.mul(l,a),_=e.mul(w,a),x=e.mul(p,a);if(B)return{x:e.ZERO,y:e.ZERO};if(!e.eql(x,e.ONE))throw new Error("invZ was invalid");return{x:O,y:_}}),y=Yt(b=>{if(b.is0()){if(n.allowInfinityPoint&&!e.is0(b.py))return;throw new Error("bad point: ZERO")}const{x:a,y:l}=b.toAffine();if(!e.isValid(a)||!e.isValid(l))throw new Error("bad point: x or y not FE");const w=e.sqr(l),p=c(a);if(!e.eql(w,p))throw new Error("bad point: equation left != right");if(!b.isTorsionFree())throw new Error("bad point: not in prime-order subgroup");return!0});class d{constructor(a,l,w){if(this.px=a,this.py=l,this.pz=w,a==null||!e.isValid(a))throw new Error("x required");if(l==null||!e.isValid(l))throw new Error("y required");if(w==null||!e.isValid(w))throw new Error("z required");Object.freeze(this)}static fromAffine(a){const{x:l,y:w}=a||{};if(!a||!e.isValid(l)||!e.isValid(w))throw new Error("invalid affine point");if(a instanceof d)throw new Error("projective point not allowed");const p=B=>e.eql(B,e.ZERO);return p(l)&&p(w)?d.ZERO:new d(l,w,e.ONE)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}static normalizeZ(a){const l=e.invertBatch(a.map(w=>w.pz));return a.map((w,p)=>w.toAffine(l[p])).map(d.fromAffine)}static fromHex(a){const l=d.fromAffine(i(z("pointHex",a)));return l.assertValidity(),l}static fromPrivateKey(a){return d.BASE.multiply(s(a))}static msm(a,l){return rn(d,r,a,l)}_setWindowSize(a){S.setWindowSize(this,a)}assertValidity(){y(this)}hasEvenY(){const{y:a}=this.toAffine();if(e.isOdd)return!e.isOdd(a);throw new Error("Field doesn't support isOdd")}equals(a){u(a);const{px:l,py:w,pz:p}=this,{px:B,py:O,pz:_}=a,x=e.eql(e.mul(l,_),e.mul(B,p)),I=e.eql(e.mul(w,_),e.mul(O,p));return x&&I}negate(){return new d(this.px,e.neg(this.py),this.pz)}double(){const{a,b:l}=n,w=e.mul(l,qt),{px:p,py:B,pz:O}=this;let _=e.ZERO,x=e.ZERO,I=e.ZERO,A=e.mul(p,p),Z=e.mul(B,B),L=e.mul(O,O),R=e.mul(p,B);return R=e.add(R,R),I=e.mul(p,O),I=e.add(I,I),_=e.mul(a,I),x=e.mul(w,L),x=e.add(_,x),_=e.sub(Z,x),x=e.add(Z,x),x=e.mul(_,x),_=e.mul(R,_),I=e.mul(w,I),L=e.mul(a,L),R=e.sub(A,L),R=e.mul(a,R),R=e.add(R,I),I=e.add(A,A),A=e.add(I,A),A=e.add(A,L),A=e.mul(A,R),x=e.add(x,A),L=e.mul(B,O),L=e.add(L,L),A=e.mul(L,R),_=e.sub(_,A),I=e.mul(L,Z),I=e.add(I,I),I=e.add(I,I),new d(_,x,I)}add(a){u(a);const{px:l,py:w,pz:p}=this,{px:B,py:O,pz:_}=a;let x=e.ZERO,I=e.ZERO,A=e.ZERO;const Z=n.a,L=e.mul(n.b,qt);let R=e.mul(l,B),j=e.mul(w,O),g=e.mul(p,_),E=e.add(l,w),v=e.add(B,O);E=e.mul(E,v),v=e.add(R,j),E=e.sub(E,v),v=e.add(l,p);let q=e.add(B,_);return v=e.mul(v,q),q=e.add(R,g),v=e.sub(v,q),q=e.add(w,p),x=e.add(O,_),q=e.mul(q,x),x=e.add(j,g),q=e.sub(q,x),A=e.mul(Z,v),x=e.mul(L,g),A=e.add(x,A),x=e.sub(j,A),A=e.add(j,A),I=e.mul(x,A),j=e.add(R,R),j=e.add(j,R),g=e.mul(Z,g),v=e.mul(L,v),j=e.add(j,g),g=e.sub(R,g),g=e.mul(Z,g),v=e.add(v,g),R=e.mul(j,v),I=e.add(I,R),R=e.mul(q,v),x=e.mul(E,x),x=e.sub(x,R),R=e.mul(E,j),A=e.mul(q,A),A=e.add(A,R),new d(x,I,A)}subtract(a){return this.add(a.negate())}is0(){return this.equals(d.ZERO)}wNAF(a){return S.wNAFCached(this,a,d.normalizeZ)}multiplyUnsafe(a){const{endo:l,n:w}=n;nt("scalar",a,G,w);const p=d.ZERO;if(a===G)return p;if(this.is0()||a===T)return this;if(!l||S.hasPrecomputes(this))return S.wNAFCachedUnsafe(this,a,d.normalizeZ);let{k1neg:B,k1:O,k2neg:_,k2:x}=l.splitScalar(a),I=p,A=p,Z=this;for(;O>G||x>G;)O&T&&(I=I.add(Z)),x&T&&(A=A.add(Z)),Z=Z.double(),O>>=T,x>>=T;return B&&(I=I.negate()),_&&(A=A.negate()),A=new d(e.mul(A.px,l.beta),A.py,A.pz),I.add(A)}multiply(a){const{endo:l,n:w}=n;nt("scalar",a,T,w);let p,B;if(l){const{k1neg:O,k1:_,k2neg:x,k2:I}=l.splitScalar(a);let{p:A,f:Z}=this.wNAF(_),{p:L,f:R}=this.wNAF(I);A=S.constTimeNegate(O,A),L=S.constTimeNegate(x,L),L=new d(e.mul(L.px,l.beta),L.py,L.pz),p=A.add(L),B=Z.add(R)}else{const{p:O,f:_}=this.wNAF(a);p=O,B=_}return d.normalizeZ([p,B])[0]}multiplyAndAddUnsafe(a,l,w){const p=d.BASE,B=(_,x)=>x===G||x===T||!_.equals(p)?_.multiplyUnsafe(x):_.multiply(x),O=B(this,l).add(B(a,w));return O.is0()?void 0:O}toAffine(a){return h(this,a)}isTorsionFree(){const{h:a,isTorsionFree:l}=n;if(a===T)return!0;if(l)return l(d,this);throw new Error("isTorsionFree() has not been declared for the elliptic curve")}clearCofactor(){const{h:a,clearCofactor:l}=n;return a===T?this:l?l(d,this):this.multiplyUnsafe(n.h)}toRawBytes(a=!0){return wt("isCompressed",a),this.assertValidity(),o(d,this,a)}toHex(a=!0){return wt("isCompressed",a),gt(this.toRawBytes(a))}}d.BASE=new d(n.Gx,n.Gy,e.ONE),d.ZERO=new d(e.ZERO,e.ONE,e.ZERO);const m=n.nBitLength,S=nn(d,n.endo?Math.ceil(m/2):m);return{CURVE:n,ProjectivePoint:d,normPrivateKeyToScalar:s,weierstrassEquation:c,isWithinCurveOrder:f}}function un(t){const n=Ae(t);return bt(n,{hash:"hash",hmac:"function",randomBytes:"function"},{bits2int:"function",bits2int_modN:"function",lowS:"boolean"}),Object.freeze({lowS:!0,...n})}function ln(t){const n=un(t),{Fp:e,n:r}=n,o=e.BYTES+1,i=2*e.BYTES+1;function c(g){return H(g,r)}function f(g){return Gt(g,r)}const{ProjectivePoint:s,normPrivateKeyToScalar:u,weierstrassEquation:h,isWithinCurveOrder:y}=an({...n,toBytes(g,E,v){const q=E.toAffine(),N=e.toBytes(q.x),k=K;return wt("isCompressed",v),v?k(Uint8Array.from([E.hasEvenY()?2:3]),N):k(Uint8Array.from([4]),N,e.toBytes(q.y))},fromBytes(g){const E=g.length,v=g[0],q=g.subarray(1);if(E===o&&(v===2||v===3)){const N=$(q);if(!yt(N,T,e.ORDER))throw new Error("Point is not on curve");const k=h(N);let M;try{M=e.sqrt(k)}catch(D){const P=D instanceof Error?": "+D.message:"";throw new Error("Point is not on curve"+P)}const V=(M&T)===T;return(v&1)===1!==V&&(M=e.neg(M)),{x:N,y:M}}else if(E===i&&v===4){const N=e.fromBytes(q.subarray(0,e.BYTES)),k=e.fromBytes(q.subarray(e.BYTES,2*e.BYTES));return{x:N,y:k}}else{const N=o,k=i;throw new Error("invalid Point, expected length of "+N+", or uncompressed "+k+", got "+E)}}}),d=g=>gt(rt(g,n.nByteLength));function m(g){const E=r>>T;return g>E}function S(g){return m(g)?c(-g):g}const b=(g,E,v)=>$(g.slice(E,v));class a{constructor(E,v,q){this.r=E,this.s=v,this.recovery=q,this.assertValidity()}static fromCompact(E){const v=n.nByteLength;return E=z("compactSignature",E,v*2),new a(b(E,0,v),b(E,v,2*v))}static fromDER(E){const{r:v,s:q}=J.toSig(z("DER",E));return new a(v,q)}assertValidity(){nt("r",this.r,T,r),nt("s",this.s,T,r)}addRecoveryBit(E){return new a(this.r,this.s,E)}recoverPublicKey(E){const{r:v,s:q,recovery:N}=this,k=_(z("msgHash",E));if(N==null||![0,1,2,3].includes(N))throw new Error("recovery id invalid");const M=N===2||N===3?v+n.n:v;if(M>=e.ORDER)throw new Error("recovery id 2 or 3 invalid");const V=N&1?"03":"02",X=s.fromHex(V+d(M)),D=f(M),P=c(-k*D),at=c(q*D),F=s.BASE.multiplyAndAddUnsafe(X,P,at);if(!F)throw new Error("point at infinify");return F.assertValidity(),F}hasHighS(){return m(this.s)}normalizeS(){return this.hasHighS()?new a(this.r,c(-this.s),this.recovery):this}toDERRawBytes(){return mt(this.toDERHex())}toDERHex(){return J.hexFromSig({r:this.r,s:this.s})}toCompactRawBytes(){return mt(this.toCompactHex())}toCompactHex(){return d(this.r)+d(this.s)}}const l={isValidPrivateKey(g){try{return u(g),!0}catch{return!1}},normPrivateKeyToScalar:u,randomPrivateKey:()=>{const g=Be(n.n);return Fe(n.randomBytes(g),n.n)},precompute(g=8,E=s.BASE){return E._setWindowSize(g),E.multiply(BigInt(3)),E}};function w(g,E=!0){return s.fromPrivateKey(g).toRawBytes(E)}function p(g){const E=ft(g),v=typeof g=="string",q=(E||v)&&g.length;return E?q===o||q===i:v?q===2*o||q===2*i:g instanceof s}function B(g,E,v=!0){if(p(g))throw new Error("first arg must be private key");if(!p(E))throw new Error("second arg must be public key");return s.fromHex(E).multiply(u(g)).toRawBytes(v)}const O=n.bits2int||function(g){if(g.length>8192)throw new Error("input is too large");const E=$(g),v=g.length*8-n.nBitLength;return v>0?E>>BigInt(v):E},_=n.bits2int_modN||function(g){return c(O(g))},x=Ft(n.nBitLength);function I(g){return nt("num < 2^"+n.nBitLength,g,G,x),rt(g,n.nByteLength)}function A(g,E,v=Z){if(["recovered","canonical"].some(it=>it in v))throw new Error("sign() legacy options not supported");const{hash:q,randomBytes:N}=n;let{lowS:k,prehash:M,extraEntropy:V}=v;k==null&&(k=!0),g=z("msgHash",g),fe(v),M&&(g=z("prehashed msgHash",q(g)));const X=_(g),D=u(E),P=[I(D),I(X)];if(V!=null&&V!==!1){const it=V===!0?N(e.BYTES):V;P.push(z("extraEntropy",it))}const at=K(...P),F=X;function Ht(it){const ut=O(it);if(!y(ut))return;const Ct=f(ut),pt=s.BASE.multiply(ut).toAffine(),st=c(pt.x);if(st===G)return;const Et=c(Ct*c(F+st*D));if(Et===G)return;let vt=(pt.x===st?0:2)|Number(pt.y&T),lt=Et;return k&&m(Et)&&(lt=S(Et),vt^=1),new a(st,lt,vt)}return{seed:at,k2sig:Ht}}const Z={lowS:n.lowS,prehash:!1},L={lowS:n.lowS,prehash:!1};function R(g,E,v=Z){const{seed:q,k2sig:N}=A(g,E,v),k=n;return ge(k.hash.outputLen,k.nByteLength,k.hmac)(q,N)}s.BASE._setWindowSize(8);function j(g,E,v,q=L){var vt;const N=g;E=z("msgHash",E),v=z("publicKey",v);const{lowS:k,prehash:M,format:V}=q;if(fe(q),"strict"in q)throw new Error("options.strict was renamed to lowS");if(V!==void 0&&V!=="compact"&&V!=="der")throw new Error("format must be compact or der");const X=typeof N=="string"||ft(N),D=!X&&!V&&typeof N=="object"&&N!==null&&typeof N.r=="bigint"&&typeof N.s=="bigint";if(!X&&!D)throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");let P,at;try{if(D&&(P=new a(N.r,N.s)),X){try{V!=="compact"&&(P=a.fromDER(N))}catch(lt){if(!(lt instanceof J.Err))throw lt}!P&&V!=="der"&&(P=a.fromCompact(N))}at=s.fromHex(v)}catch{return!1}if(!P||k&&P.hasHighS())return!1;M&&(E=n.hash(E));const{r:F,s:Ht}=P,it=_(E),ut=f(Ht),Ct=c(it*ut),pt=c(F*ut),st=(vt=s.BASE.multiplyAndAddUnsafe(at,Ct,pt))==null?void 0:vt.toAffine();return st?c(st.x)===F:!1}return{CURVE:n,getPublicKey:w,getSharedSecret:B,sign:R,verify:j,ProjectivePoint:s,Signature:a,utils:l}}function dn(t,n){const e=t.ORDER;let r=G;for(let S=e-T;S%tt===G;S/=tt)r+=T;const o=r,i=tt<<o-T-T,c=i*tt,f=(e-T)/c,s=(f-T)/tt,u=c-T,h=i,y=t.pow(n,f),d=t.pow(n,(f+T)/tt);let m=(S,b)=>{let a=y,l=t.pow(b,u),w=t.sqr(l);w=t.mul(w,b);let p=t.mul(S,w);p=t.pow(p,s),p=t.mul(p,l),l=t.mul(p,b),w=t.mul(p,S);let B=t.mul(w,l);p=t.pow(B,h);let O=t.eql(p,t.ONE);l=t.mul(w,d),p=t.mul(B,a),w=t.cmov(l,w,O),B=t.cmov(p,B,O);for(let _=o;_>T;_--){let x=_-tt;x=tt<<x-T;let I=t.pow(B,x);const A=t.eql(I,t.ONE);l=t.mul(w,a),a=t.mul(a,a),I=t.mul(B,a),w=t.cmov(l,w,A),B=t.cmov(I,B,A)}return{isValid:O,value:w}};if(t.ORDER%ae===qt){const S=(t.ORDER-qt)/ae,b=t.sqrt(t.neg(n));m=(a,l)=>{let w=t.sqr(l);const p=t.mul(a,l);w=t.mul(w,p);let B=t.pow(w,S);B=t.mul(B,p);const O=t.mul(B,b),_=t.mul(t.sqr(B),l),x=t.eql(_,a);let I=t.cmov(O,B,x);return{isValid:x,value:I}}}return m}function hn(t,n){if(be(t),!t.isValid(n.A)||!t.isValid(n.B)||!t.isValid(n.Z))throw new Error("mapToCurveSimpleSWU: invalid opts");const e=dn(t,n.Z);if(!t.isOdd)throw new Error("Fp.isOdd is not implemented!");return r=>{let o,i,c,f,s,u,h,y;o=t.sqr(r),o=t.mul(o,n.Z),i=t.sqr(o),i=t.add(i,o),c=t.add(i,t.ONE),c=t.mul(c,n.B),f=t.cmov(n.Z,t.neg(i),!t.eql(i,t.ZERO)),f=t.mul(f,n.A),i=t.sqr(c),u=t.sqr(f),s=t.mul(u,n.A),i=t.add(i,s),i=t.mul(i,c),u=t.mul(u,f),s=t.mul(u,n.B),i=t.add(i,s),h=t.mul(o,c);const{isValid:d,value:m}=e(i,u);y=t.mul(o,r),y=t.mul(y,m),h=t.cmov(h,c,d),y=t.cmov(y,m,d);const S=t.isOdd(r)===t.isOdd(y);return y=t.cmov(t.neg(y),y,S),h=t.div(h,f),{x:h,y}}}/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */function wn(t){return{hash:t,hmac:(n,...e)=>ye(t,n,He(...e)),randomBytes:he}}function gn(t,n){const e=r=>ln({...t,...wn(r)});return{...e(n),create:e}}const mn=$;function et(t,n){if(Bt(t),Bt(n),t<0||t>=1<<8*n)throw new Error("invalid I2OSP input: "+t);const e=Array.from({length:n}).fill(0);for(let r=n-1;r>=0;r--)e[r]=t&255,t>>>=8;return new Uint8Array(e)}function yn(t,n){const e=new Uint8Array(t.length);for(let r=0;r<t.length;r++)e[r]=t[r]^n[r];return e}function Bt(t){if(!Number.isSafeInteger(t))throw new Error("number expected")}function bn(t,n,e,r){W(t),W(n),Bt(e),n.length>255&&(n=r(K(Ut("H2C-OVERSIZE-DST-"),n)));const{outputLen:o,blockLen:i}=r,c=Math.ceil(e/o);if(e>65535||c>255)throw new Error("expand_message_xmd: invalid lenInBytes");const f=K(n,et(n.length,1)),s=et(0,i),u=et(e,2),h=new Array(c),y=r(K(s,t,u,et(0,1),f));h[0]=r(K(y,et(1,1),f));for(let m=1;m<=c;m++){const S=[yn(y,h[m-1]),et(m+1,1),f];h[m]=r(K(...S))}return K(...h).slice(0,e)}function pn(t,n,e,r,o){if(W(t),W(n),Bt(e),n.length>255){const i=Math.ceil(2*r/8);n=o.create({dkLen:i}).update(Ut("H2C-OVERSIZE-DST-")).update(n).digest()}if(e>65535||n.length>255)throw new Error("expand_message_xof: invalid lenInBytes");return o.create({dkLen:e}).update(t).update(et(e,2)).update(n).update(et(n.length,1)).digest()}function ue(t,n,e){bt(e,{DST:"stringOrUint8Array",p:"bigint",m:"isSafeInteger",k:"isSafeInteger",hash:"hash"});const{p:r,k:o,m:i,hash:c,expand:f,DST:s}=e;W(t),Bt(n);const u=typeof s=="string"?Ut(s):s,h=r.toString(2).length,y=Math.ceil((h+o)/8),d=n*i*y;let m;if(f==="xmd")m=bn(t,u,d,c);else if(f==="xof")m=pn(t,u,d,o,c);else if(f==="_internal_pass")m=t;else throw new Error('expand must be "xmd" or "xof"');const S=new Array(n);for(let b=0;b<n;b++){const a=new Array(i);for(let l=0;l<i;l++){const w=y*(l+b*i),p=m.subarray(w,w+y);a[l]=H(mn(p),r)}S[b]=a}return S}function En(t,n){const e=n.map(r=>Array.from(r).reverse());return(r,o)=>{const[i,c,f,s]=e.map(u=>u.reduce((h,y)=>t.add(t.mul(h,r),y)));return r=t.div(i,c),o=t.mul(o,t.div(f,s)),{x:r,y:o}}}function vn(t,n,e){if(typeof n!="function")throw new Error("mapToCurve() must be defined");return{hashToCurve(r,o){const i=ue(r,2,{...e,DST:e.DST,...o}),c=t.fromAffine(n(i[0])),f=t.fromAffine(n(i[1])),s=c.add(f).clearCofactor();return s.assertValidity(),s},encodeToCurve(r,o){const i=ue(r,1,{...e,DST:e.encodeDST,...o}),c=t.fromAffine(n(i[0])).clearCofactor();return c.assertValidity(),c},mapToCurve(r){if(!Array.isArray(r))throw new Error("mapToCurve: expected array of bigints");for(const i of r)if(typeof i!="bigint")throw new Error("mapToCurve: expected array of bigints");const o=t.fromAffine(n(r)).clearCofactor();return o.assertValidity(),o}}}/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */const At=BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),Ot=BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),xt=BigInt(1),Nt=BigInt(2),le=(t,n)=>(t+n/Nt)/n;function Ie(t){const n=At,e=BigInt(3),r=BigInt(6),o=BigInt(11),i=BigInt(22),c=BigInt(23),f=BigInt(44),s=BigInt(88),u=t*t*t%n,h=u*u*t%n,y=Y(h,e,n)*h%n,d=Y(y,e,n)*h%n,m=Y(d,Nt,n)*u%n,S=Y(m,o,n)*m%n,b=Y(S,i,n)*S%n,a=Y(b,f,n)*b%n,l=Y(a,s,n)*a%n,w=Y(l,f,n)*b%n,p=Y(w,e,n)*h%n,B=Y(p,c,n)*S%n,O=Y(B,r,n)*u%n,_=Y(O,Nt,n);if(!ot.eql(ot.sqr(_),t))throw new Error("Cannot find square root");return _}const ot=Ee(At,void 0,void 0,{sqrt:Ie}),kt=gn({a:BigInt(0),b:BigInt(7),Fp:ot,n:Ot,Gx:BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),Gy:BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),h:BigInt(1),lowS:!0,endo:{beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),splitScalar:t=>{const n=Ot,e=BigInt("0x3086d221a7d46bcde86c90e49284eb15"),r=-xt*BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),o=BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),i=e,c=BigInt("0x100000000000000000000000000000000"),f=le(i*t,n),s=le(-r*t,n);let u=H(t-f*e-s*o,n),h=H(-f*r-s*i,n);const y=u>c,d=h>c;if(y&&(u=n-u),d&&(h=n-h),u>c||h>c)throw new Error("splitScalar: Endomorphism failed, k="+t);return{k1neg:y,k1:u,k2neg:d,k2:h}}}},_t),_e=BigInt(0),de={};function Rt(t,...n){let e=de[t];if(e===void 0){const r=_t(Uint8Array.from(t,o=>o.charCodeAt(0)));e=K(r,r),de[t]=e}return _t(K(e,...n))}const te=t=>t.toRawBytes(!0).slice(1),$t=t=>rt(t,32),Kt=t=>H(t,At),St=t=>H(t,Ot),ee=kt.ProjectivePoint,Bn=(t,n,e)=>ee.BASE.multiplyAndAddUnsafe(t,n,e);function Wt(t){let n=kt.utils.normPrivateKeyToScalar(t),e=ee.fromPrivateKey(n);return{scalar:e.hasEvenY()?n:St(-n),bytes:te(e)}}function qe(t){nt("x",t,xt,At);const n=Kt(t*t),e=Kt(n*t+BigInt(7));let r=Ie(e);r%Nt!==_e&&(r=Kt(-r));const o=new ee(t,r,xt);return o.assertValidity(),o}const ht=$;function Oe(...t){return St(ht(Rt("BIP0340/challenge",...t)))}function xn(t){return Wt(t).bytes}function Sn(t,n,e=he(32)){const r=z("message",t),{bytes:o,scalar:i}=Wt(n),c=z("auxRand",e,32),f=$t(i^ht(Rt("BIP0340/aux",c))),s=Rt("BIP0340/nonce",f,o,r),u=St(ht(s));if(u===_e)throw new Error("sign failed: k is zero");const{bytes:h,scalar:y}=Wt(u),d=Oe(h,o,r),m=new Uint8Array(64);if(m.set(h,0),m.set($t(St(y+d*i)),32),!Ne(m,r,o))throw new Error("sign: Invalid signature produced");return m}function Ne(t,n,e){const r=z("signature",t,64),o=z("message",n),i=z("publicKey",e,32);try{const c=qe(ht(i)),f=ht(r.subarray(0,32));if(!yt(f,xt,At))return!1;const s=ht(r.subarray(32,64));if(!yt(s,xt,Ot))return!1;const u=Oe($t(f),te(c),o),h=Bn(c,s,St(-u));return!(!h||!h.hasEvenY()||h.toAffine().x!==f)}catch{return!1}}const qn=(()=>({getPublicKey:xn,sign:Sn,verify:Ne,utils:{randomPrivateKey:kt.utils.randomPrivateKey,lift_x:qe,pointToBytes:te,numberToBytesBE:rt,bytesToNumberBE:$,taggedHash:Rt,mod:H}}))(),An=(()=>En(ot,[["0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7","0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581","0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262","0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c"],["0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b","0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14","0x0000000000000000000000000000000000000000000000000000000000000001"],["0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c","0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3","0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931","0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84"],["0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b","0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573","0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f","0x0000000000000000000000000000000000000000000000000000000000000001"]].map(t=>t.map(n=>BigInt(n)))))(),In=(()=>hn(ot,{A:BigInt("0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533"),B:BigInt("1771"),Z:ot.create(BigInt("-11"))}))(),Re=(()=>vn(kt.ProjectivePoint,t=>{const{x:n,y:e}=In(ot.create(t[0]));return An(n,e)},{DST:"secp256k1_XMD:SHA-256_SSWU_RO_",encodeDST:"secp256k1_XMD:SHA-256_SSWU_NU_",p:ot.ORDER,m:1,k:128,expand:"xmd",hash:_t}))(),On=(()=>Re.hashToCurve)(),Nn=(()=>Re.encodeToCurve)();export{Nn as encodeToCurve,On as hashToCurve,qn as schnorr,kt as secp256k1};
