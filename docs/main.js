(()=>{"use strict";var t,e=function(t,e){return t[e]<<8^t[e+1]},r=function(t){if(4!==t.length)throw new Error("Invalid data format for DataAddressQuantity!");this.address=e(t,0),this.quantity=e(t,2)},n=function(){function t(e){if(e[0]!==e.length-1)throw new Error("Invalid data format for DataBooleans!");this.onOff=e.slice(1).flatMap((function(e){return t.bitsInByte.map((function(t){return!!(t&e)}))}))}return t.bitsInByte=[128,64,32,16,8,4,2,1],t}(),o=function(t){if(this.uInt16=[],this.int16=[],t[0]!==t.length-1||0!=(1&t[0]))throw new Error("Invalid data format for DataRegisters!");for(var e=new DataView(new Uint8Array(t).buffer),r=1;r<t.length;r+=2)this.uInt16.push(e.getUint16(r,!1)),this.int16.push(e.getInt16(r,!1));if(0==(3&t[0])&&t[0]>=4)for(this.float32=[],this.uInt32=[],this.int32=[],r=1;r<t.length;r+=4)this.float32.push(e.getFloat32(r,!1)),this.uInt32.push(e.getUint32(r,!1)),this.int32.push(e.getInt32(r,!1))},a=function(t){if(4!==t.length)throw new Error("Invalid data format for DataWriteSingleBoolean!");if(this.address=e(t,0),0===t[2]&&0===t[3])this.onOff=!1;else{if(!(255===t[2]&&0===t[3]||0===t[2]&&255===t[3]))throw new Error("Invalid data format for single register... Allowed only: 0xFF00, 0x00FF, 0x0000");this.onOff=!0}},i=function(t){if(4!==t.length)throw new Error("Invalid data format for DataAddressData!");this.address=e(t,0),this.data=e(t,2)},s={1:{fromMasterToSlave:r,fromSlaveToMaster:n},2:{fromMasterToSlave:r,fromSlaveToMaster:n},3:{fromMasterToSlave:r,fromSlaveToMaster:o},4:{fromMasterToSlave:r,fromSlaveToMaster:o},5:{fromMasterToSlave:a,fromSlaveToMaster:a},6:{fromMasterToSlave:i,fromSlaveToMaster:i},15:{fromMasterToSlave:function(t){if(t.length<=4)throw new Error("Invalid data format for DataAddressQuantityBooleans!");this.dataAddressQuantity=new r(t.slice(0,4)),this.dataBooleans=new n(t.slice(4))},fromSlaveToMaster:r},16:{fromMasterToSlave:function(t){if(t.length<=4)throw new Error("Invalid data format for DataAddressQuantityRegisters!");this.dataAddressQuantity=new r(t.slice(0,4)),this.dataRegisters=new o(t.slice(4))},fromSlaveToMaster:r}},c=function(){function t(t){this.data=t,this.slaveAddress=t.shift(),this.functionCode=t.shift();var e=s[this.functionCode];if(e){try{this.fromMasterToSlave=new e.fromMasterToSlave(t)}catch(t){this.fromMasterToSlave=this.getError(t)}try{this.fromSlaveToMaster=new e.fromSlaveToMaster(t)}catch(t){this.fromSlaveToMaster=this.getError(t)}}}return t.prototype.getError=function(t){return"".concat(t.message)},t}(),l={1:"Read Coils",2:"Read Discrete Inputs",3:"Read Holding Registers",4:"Read Input Registers",5:"Write Single Coil",6:"Write Single Register",7:"Read Status",8:"Diagnostic Test",15:"Write Multiple Coils",16:"Write Multiple Registers",17:"Identify Device Server"},u={129:"Illegal Function",130:"Illegal Data Address",131:"Illegal Data Value",132:"Server Device Failure",133:"Acknowledge",134:"Server Device Busy",135:"Negative Acknowledge",136:"Memory Parity Error",144:"Gateway Path Unavailable",145:"Gateway Target Device Failed to Respond"},f=function(t){return null==t?"".concat(t):"0x".concat(t<16?"0":"").concat(t.toString(16))},h=(t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},t(e,r)},function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}),d=function(){function t(){this.snifferTable=document.querySelector("tbody")}return t.prototype.receive=function(t){},t.prototype.getItemElement=function(t,e){void 0===e&&(e=!1);var r=document.createElement("td");return r.appendChild(document.createTextNode(t)),e&&r.classList.add("error"),r},t.prototype.report=function(t,e){var r,n=this,o=document.createElement("tr"),a=new Date,i="".concat(a.toLocaleTimeString(),"+").concat(a.getMilliseconds(),"ms");if(t){var s=new c(e);[i,"".concat(s.slaveAddress),"".concat(s.functionCode),(r=s.functionCode,128&r?u[r]||"Unknown error ".concat(f(r)):l[r]||"Unknown function ".concat(f(r))),"".concat(e.length)].forEach((function(t){return o.appendChild(n.getItemElement(t))}));var h=[s.fromMasterToSlave,s.fromSlaveToMaster];"string"==typeof h[0]&&"string"==typeof h[1]?h.forEach((function(t){return o.appendChild(n.getItemElement("".concat(t," ").concat(n.getBytesAsHex(e)),!0))})):h.forEach((function(t){return o.appendChild(n.getItemElement("object"==typeof t?JSON.stringify(t,void 0,1):""))}))}else o.classList.add("error"),[i,"","","","".concat(e.length),this.getBytesAsHex(e),""].forEach((function(t){return o.appendChild(n.getItemElement(t))}));this.snifferTable.insertBefore(o,this.snifferTable.firstChild)},t.prototype.getBytesAsHex=function(t){return t.map((function(t){return f(t)})).join(" ")},t}(),p=function(){function t(t){this.byte=t,this.crc=65535}return t.prototype.updateCrc=function(t){this.crc^=t;for(var e=0;e<8;++e){var r=1&this.crc;this.crc>>=1,r&&(this.crc^=40961)}return 0===this.crc},t}(),m=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.history=[],e}return h(e,t),e.prototype.receive=function(e){var r=this;t.prototype.receive.call(this,e),this.timeoutHandler&&clearTimeout(this.timeoutHandler),this.timeoutHandler=setTimeout((function(){return r.resetFrame()}),300),e.forEach((function(t){r.history.push(new p(t));for(var e=0;e<r.history.length;++e)if(r.history[e].updateCrc(t)){var n=r.history.map((function(t){return t.byte}));e&&r.report(!1,n.slice(0,e)),r.report(!0,n.slice(e,-2)),r.history=[],clearTimeout(r.timeoutHandler);break}r.history.length>300&&console.warn("Rejecteding because history bigger than 300",r.history.shift())}))},e.prototype.resetFrame=function(){console.warn("timeout"),this.report(!1,this.history.map((function(t){return t.byte}))),this.history=[]},e}(d),y=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.frameChars=[],e.frameBytes=[],e.currentLrc=0,e}return h(e,t),e.prototype.receive=function(e){var r=this;for(t.prototype.receive.call(this,e),e.forEach((function(t){return r.frameChars.push(t)}));this.frameChars.length>=2;){var n=this.frameChars.shift();if(58===n)this.resetFrame();else{var o=this.frameChars.shift();if(58===o)this.resetFrame();else if(13===n&&10===o)this.frameBytes.pop(),this.report(!isNaN(this.currentLrc)&&0==(255&this.currentLrc),this.frameBytes),this.frameBytes=[],this.currentLrc=0;else{var a=parseInt(String.fromCharCode(n,o),16);this.frameBytes.push(a),this.updateLrc(a)}}}},e.prototype.resetFrame=function(){this.frameBytes.length&&(this.report(!1,this.frameBytes),this.frameBytes=[],this.currentLrc=0)},e.prototype.updateLrc=function(t){this.currentLrc+=t},e}(d),v=document.querySelector("h2.error").appendChild(document.createTextNode("")),g=function(t){console.error(t),v.nodeValue="Error: ".concat(t)},w=document.querySelector("fieldset"),b=navigator.serial;b||(g("No serial support in this browser!"),w.disabled=!0),document.querySelector("form").addEventListener("submit",(function(t){t.preventDefault();var e=Object.fromEntries(function(t,e,r){if(r||2===arguments.length)for(var n,o=0,a=e.length;o<a;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))}([],t.target,!0).map((function(t){return[t.name,+t.value||t.value]})));console.log(e),S(e,"ASCII"===e.modbusmode?new y:new m)}));var S=function(t,e){b.requestPort().then((function(r){console.log("serialPort",r),r.open(t).then((function(){return t=void 0,n=void 0,a=function(){var t,n,o,a;return function(t,e){var r,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,n=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=e.call(t,i)}catch(t){a=[6,t],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}}(this,(function(i){switch(i.label){case 0:v.nodeValue="",w.disabled=!0,i.label=1;case 1:if(!r.readable)return[3,9];t=r.readable.getReader(),i.label=2;case 2:i.trys.push([2,6,7,8]),i.label=3;case 3:return[4,t.read()];case 4:return n=i.sent(),o=n.value,n.done?[3,5]:(e.receive(o),[3,3]);case 5:return[3,8];case 6:return a=i.sent(),g(a),[3,8];case 7:return t.releaseLock(),[7];case 8:return[3,1];case 9:return[4,r.close()];case 10:return i.sent(),w.disabled=!1,[2]}}))},new((o=void 0)||(o=Promise))((function(e,r){function i(t){try{c(a.next(t))}catch(t){r(t)}}function s(t){try{c(a.throw(t))}catch(t){r(t)}}function c(t){var r;t.done?e(t.value):(r=t.value,r instanceof o?r:new o((function(t){t(r)}))).then(i,s)}c((a=a.apply(t,n||[])).next())}));var t,n,o,a}),g)}),console.warn)};(new m).receive(new Uint8Array([17,34,51,68,85,4,1,0,10,0,13,221,152,17,34,51,68,85,17,15,0,19,0,10,2,205,1,191,11,1,3,8,65,32,0,0,66,200,0,0,228,111,1,16,15,163,0,2,4,0,20,7,208,187,154])),(new y).receive((new TextEncoder).encode("&*^&^%^%$*&&%%$#:0401000A000DE4\r\nxyz!@=$%#$;:0401000A0DE4\r\n:0401000A000D00\r\n"))})();