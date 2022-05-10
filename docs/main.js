(()=>{"use strict";var t,e={1:"Read Coils",2:"Read Discrete Inputs",3:"Read Holding Registers",4:"Read Input Registers",5:"Write Single Coil",6:"Write Single Register",7:"Read Status",8:"Diagnostic Test",15:"Write Multiple Coils",16:"Write Multiple Registers",17:"Identify Device Server"},r={129:"Illegal Function",130:"Illegal Data Address",131:"Illegal Data Value",132:"Server Device Failure",133:"Acknowledge",134:"Server Device Busy",135:"Negative Acknowledge",136:"Memory Parity Error",144:"Gateway Path Unavailable",145:"Gateway Target Device Failed to Respond"},n=function(t){return"0x".concat(t<16?"0":"").concat(t.toString(16))},i=function(t,e){return t[e]<<8^t[e+1]},a=function(t){if(4!==t.length)throw new Error("Invalid data format for DataAddressQuantity! ".concat(JSON.stringify(t)));this.address=i(t,0),this.quantity=i(t,2)},o=function(){function t(e){if(e[0]!==e.length-1)throw new Error("Invalid data format for DataBooleans! ".concat(JSON.stringify(e)));this.onOff=e.slice(1).flatMap((function(e){return t.bitsInByte.map((function(t){return!!(t&e)}))}))}return t.bitsInByte=[128,64,32,16,8,4,2,1],t}(),s=function(t){if(this.uInt16=[],this.int16=[],t[0]!==t.length-1||0!=(1&t[0]))throw new Error("Invalid data format for DataRegisters! ".concat(JSON.stringify(t)));for(var e=new DataView(new Uint8Array(t).buffer),r=1;r<t.length;r+=2)this.uInt16.push(e.getUint16(r,!1)),this.int16.push(e.getInt16(r,!1));if(0==(3&t[0])&&t[0]>=4)for(this.float32=[],this.uInt32=[],this.int32=[],r=1;r<t.length;r+=4)this.float32.push(e.getFloat32(r,!1)),this.uInt32.push(e.getUint32(r,!1)),this.int32.push(e.getInt32(r,!1))},c={1:[a,o],2:[a,o],3:[a,s],4:[a,s],5:[function(t){if(4!==t.length)throw new Error("Invalid data format for DataRegisters! ".concat(JSON.stringify(t)));this.address=i(t,0),this.onOff=!!t[2]||!!t[3]}],6:[function(t){if(4!==t.length)throw new Error("Invalid data format for DataAddressQuantity! ".concat(JSON.stringify(t)));this.address=i(t,0),this.data=i(t,2)}],15:[function(t){if(t.length<=4)throw new Error("Invalid data format for DataAddressQuantity! ".concat(JSON.stringify(t)));this.dataAddressQuantity=new a(t.slice(0,4)),this.dataBooleans=new o(t.slice(4))},a],16:[function(t){if(t.length<=4)throw new Error("Invalid data format for DataAddressQuantity! ".concat(JSON.stringify(t)));this.dataAddressQuantity=new a(t.slice(0,4)),this.dataRegisters=new s(t.slice(4))},a]},u=function(t){var i;this.data=t,this.specificFormats=[],this.slaveAddress=t.shift(),this.functionCode=t.shift(),this.functionDescription=128&(i=this.functionCode)?r[i]||"Unknown error ".concat(n(i)):e[i]||"Unknown function ".concat(n(i));var a=c[this.functionCode];if(a){for(var o=[],s=0,u=a;s<u.length;s++){var l=u[s];try{this.specificFormats.push(new l(t))}catch(t){o.push((null==t?void 0:t.message)||t)}}this.specificFormats.length||(this.specificFormats=o)}},l=(t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},t(e,r)},function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}),f=function(){function t(){this.snifferTable=document.querySelector("table")}return t.prototype.receive=function(t){},t.prototype.report=function(t,e){for(var r=new Date,n=["".concat(r.toLocaleTimeString(),"+").concat(r.getMilliseconds(),"ms"),"".concat(e.slaveAddress),"".concat(e.functionCode),e.functionDescription,JSON.stringify(e.specificFormats,void 0,1)],i=document.createElement("tr"),a=0,o=n;a<o.length;a++){var s=o[a],c=document.createElement("td");c.appendChild(document.createTextNode(s)),i.appendChild(c)}t||i.classList.add("error"),this.snifferTable.appendChild(i)},t}(),h=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.frameBytes=[],e.currentCrc=65535,e}return l(e,t),e.prototype.receive=function(e){var r=this;t.prototype.receive.call(this,e),this.timeoutHandler&&clearTimeout(this.timeoutHandler),this.timeoutHandler=setTimeout((function(){return r.endFrame()}),120),e.forEach((function(t){r.frameBytes.push(t),r.updateCrc(t),0===r.currentCrc&&r.frameBytes.length>=4&&r.endFrame()}))},e.prototype.endFrame=function(){this.frameBytes.pop(),this.frameBytes.pop(),this.frameBytes.length&&(this.report(0===this.currentCrc,new u(this.frameBytes)),this.frameBytes=[],this.currentCrc=65535)},e.prototype.updateCrc=function(t){this.currentCrc^=t;for(var e=0;e<8;++e){var r=1&this.currentCrc;this.currentCrc>>=1,r&&(this.currentCrc^=40961)}},e}(f),d=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.frameChars=[],e.frameBytes=[],e.currentLrc=0,e}return l(e,t),e.prototype.receive=function(e){var r=this;for(t.prototype.receive.call(this,e),e.forEach((function(t){return r.frameChars.push(t)}));this.frameChars.length>=2;){var n=this.frameChars.shift();if(this.frameBytes.length,58===n)this.frameBytes.length&&this.endFrame();else{var i=this.frameChars.shift();if(13===n&&10===i)this.endFrame();else{var a=parseInt(String.fromCharCode(n,i),16);this.frameBytes.push(a),this.updateLrc(a)}}}},e.prototype.endFrame=function(){this.frameBytes.pop(),this.report(0===this.currentLrc,new u(this.frameBytes)),this.frameBytes=[],this.currentLrc=0},e.prototype.updateLrc=function(t){this.currentLrc+=t,this.currentLrc&=255},e}(f),p=document.querySelector("h2.error").appendChild(document.createTextNode("")),y=function(t){console.error(t),p.nodeValue="".concat(t)},v=document.querySelector("fieldset"),m=navigator.serial;m||(y("No serial support in this browser!"),v.disabled=!0),document.querySelector("form").addEventListener("submit",(function(t){t.preventDefault();var e=Object.fromEntries(function(t,e,r){if(r||2===arguments.length)for(var n,i=0,a=e.length;i<a;i++)!n&&i in e||(n||(n=Array.prototype.slice.call(e,0,i)),n[i]=e[i]);return t.concat(n||Array.prototype.slice.call(e))}([],t.target,!0).map((function(t){return[t.name,+t.value||t.value]})));console.log(e),g(e,"ASCII"===e.modbusmode?new d:new h)}));var g=function(t,e){m.requestPort().then((function(r){console.log("serialPort",r),r.open(t).then((function(){return t=void 0,n=void 0,a=function(){var t,n,i,a;return function(t,e){var r,n,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;o;)try{if(r=1,n&&(i=2&a[0]?n.return:a[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,a[1])).done)return i;switch(n=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,n=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!((i=(i=o.trys).length>0&&i[i.length-1])||6!==a[0]&&2!==a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=e.call(t,o)}catch(t){a=[6,t],n=0}finally{r=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}}(this,(function(o){switch(o.label){case 0:p.nodeValue="",v.disabled=!0,o.label=1;case 1:if(!r.readable)return[3,9];t=r.readable.getReader(),o.label=2;case 2:o.trys.push([2,6,7,8]),o.label=3;case 3:return[4,t.read()];case 4:return n=o.sent(),i=n.value,n.done?[3,5]:(e.receive(i),[3,3]);case 5:return[3,8];case 6:return a=o.sent(),y(a),[3,8];case 7:return t.releaseLock(),[7];case 8:return[3,1];case 9:return[4,r.close()];case 10:return o.sent(),v.disabled=!1,[2]}}))},new((i=void 0)||(i=Promise))((function(e,r){function o(t){try{c(a.next(t))}catch(t){r(t)}}function s(t){try{c(a.throw(t))}catch(t){r(t)}}function c(t){var r;t.done?e(t.value):(r=t.value,r instanceof i?r:new i((function(t){t(r)}))).then(o,s)}c((a=a.apply(t,n||[])).next())}));var t,n,i,a}),y)}),console.warn)},w=new h;w.receive(new Uint8Array([4,1,0,10,0,13,221,152])),w.receive(new Uint8Array([17,15,0,19,0,10,2,205,1,191,11])),w.receive(new Uint8Array([1,3,8,65,32,0,0,66,200,0,0,228,111])),w.receive(new Uint8Array([1,16,15,163,0,2,4,0,20,7,208,187,154]));var b=new d;b.receive((new TextEncoder).encode(":0401000A000DE4\r\n")),b.receive((new TextEncoder).encode(":0401000A000D00\r\n"))})();