(()=>{"use strict";var e,t={1:"Read Coils",2:"Read Discrete Inputs",3:"Read Holding Registers",4:"Read Input Registers",5:"Write Single Coil",6:"Write Single Register",7:"Read Status",8:"Diagnostic Test",15:"Write Multiple Coils",16:"Write Multiple Registers",17:"Identify Device Server"},r={129:"Illegal Function",130:"Illegal Data Address",131:"Illegal Data Value",132:"Server Device Failure",133:"Acknowledge",134:"Server Device Busy",135:"Negative Acknowledge",136:"Memory Parity Error",144:"Gateway Path Unavailable",145:"Gateway Target Device Failed to Respond"},n=function(e){return"0x".concat(e.toString(16))},i=function(e,t){return e[t]<<8^e[t+1]},a=function(e){if(4!==e.length)throw new Error("Invalid data format for DataAddressQuantity! ".concat(JSON.stringify(e)));this.address=i(e,0),this.quantity=i(e,2)},o=function(){function e(t){if(t[0]!==t.length-1)throw new Error("Invalid data format for DataBooleans! ".concat(JSON.stringify(t)));this.onOff=t.slice(1).flatMap((function(t){return e.bitsInByte.map((function(e){return!!(e&t)}))}))}return e.bitsInByte=[128,64,32,16,8,4,2,1],e}(),s=function(e){if(this.registers=[],this.float32=[],e[0]!==e.length-1||0!=(1&e[0]))throw new Error("Invalid data format for DataRegisters! ".concat(JSON.stringify(e)));for(var t=new DataView(new Uint8Array(e).buffer),r=1;r<e.length;r+=2)this.registers.push(t.getUint16(r,!1));if(0==(3&e[0])&&e[0]>=4)for(r=1;r<e.length;r+=4)this.float32.push(t.getFloat32(r,!1))},c={1:[a,o],2:[a,o],3:[a,s],4:[a,s],5:[function(e){if(4!==e.length)throw new Error("Invalid data format for DataRegisters! ".concat(JSON.stringify(e)));this.address=i(e,0),this.onOff=!!e[2]||!!e[3]}],6:[function(e){if(4!==e.length)throw new Error("Invalid data format for DataAddressQuantity! ".concat(JSON.stringify(e)));this.address=i(e,0),this.data=i(e,2)}],15:[function(e){if(e.length<=4)throw new Error("Invalid data format for DataAddressQuantity! ".concat(JSON.stringify(e)));this.dataAddressQuantity=new a(e.slice(0,4)),this.dataBooleans=new o(e.slice(4))},a],16:[function(e){if(e.length<=4)throw new Error("Invalid data format for DataAddressQuantity! ".concat(JSON.stringify(e)));this.dataAddressQuantity=new a(e.slice(0,4)),this.dataRegisters=new s(e.slice(4))},a]},u=function(e){if(this.data=e,this.timestamp=(new Date).toLocaleString(),this.specificFormats=[],e.length<2)throw new Error("Too few data for Modbus frame! ".concat(JSON.stringify(e)));var i;this.slaveAddress=e.shift(),this.functionCode=e.shift(),this.functionDescription=128&(i=this.functionCode)?r[i]||"Unknown error ".concat(n(i)):t[i]||"Unknown function 0x".concat(n(i));var a=c[this.functionCode];if(a)for(var o=0,s=a;o<s.length;o++){var u=s[o];try{this.specificFormats.push(new u(e))}catch(e){this.specificFormats.push((null==e?void 0:e.message)||e)}}},l=(e=function(t,r){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},e(t,r)},function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}),f=function(){function e(){this.snifferElement=document.querySelector("#sniffer")}return e.prototype.receive=function(e){console.log("received: ",e)},e.prototype.report=function(e,t){var r=document.createElement("div");r.appendChild(document.createTextNode(e+JSON.stringify(t))),this.snifferElement.appendChild(r)},e}(),h=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.frameBytes=[],t.currentCrc=65535,t}return l(t,e),t.prototype.receive=function(t){var r=this;e.prototype.receive.call(this,t),this.timeoutHandler&&clearTimeout(this.timeoutHandler),t.forEach((function(e){r.frameBytes.push(e),r.updateCrc(e),0===r.currentCrc&&r.frameBytes.length>=4&&r.endFrame(),40===r.frameBytes.length&&(console.warn("Rejecteding 40 bytes"),r.endFrame())})),this.timeoutHandler=setTimeout((function(){return r.endFrame()}),200)},t.prototype.endFrame=function(){this.frameBytes.length&&(this.frameBytes.pop(),this.frameBytes.pop(),this.report(0===this.currentCrc?"CRC check success: ":"CRC check failed: ",new u(this.frameBytes)),this.frameBytes=[],this.currentCrc=65535)},t.prototype.updateCrc=function(e){var r=e^255&this.currentCrc;this.currentCrc>>=8,this.currentCrc^=t.crcArray[r]},t.crcArray=[0,49345,49537,320,49921,960,640,49729,50689,1728,1920,51009,1280,50625,50305,1088,52225,3264,3456,52545,3840,53185,52865,3648,2560,51905,52097,2880,51457,2496,2176,51265,55297,6336,6528,55617,6912,56257,55937,6720,7680,57025,57217,8e3,56577,7616,7296,56385,5120,54465,54657,5440,55041,6080,5760,54849,53761,4800,4992,54081,4352,53697,53377,4160,61441,12480,12672,61761,13056,62401,62081,12864,13824,63169,63361,14144,62721,13760,13440,62529,15360,64705,64897,15680,65281,16320,16e3,65089,64001,15040,15232,64321,14592,63937,63617,14400,10240,59585,59777,10560,60161,11200,10880,59969,60929,11968,12160,61249,11520,60865,60545,11328,58369,9408,9600,58689,9984,59329,59009,9792,8704,58049,58241,9024,57601,8640,8320,57409,40961,24768,24960,41281,25344,41921,41601,25152,26112,42689,42881,26432,42241,26048,25728,42049,27648,44225,44417,27968,44801,28608,28288,44609,43521,27328,27520,43841,26880,43457,43137,26688,30720,47297,47489,31040,47873,31680,31360,47681,48641,32448,32640,48961,32e3,48577,48257,31808,46081,29888,30080,46401,30464,47041,46721,30272,29184,45761,45953,29504,45313,29120,28800,45121,20480,37057,37249,20800,37633,21440,21120,37441,38401,22208,22400,38721,21760,38337,38017,21568,39937,23744,23936,40257,24320,40897,40577,24128,23040,39617,39809,23360,39169,22976,22656,38977,34817,18624,18816,35137,19200,35777,35457,19008,19968,36545,36737,20288,36097,19904,19584,35905,17408,33985,34177,17728,34561,18368,18048,34369,33281,17088,17280,33601,16640,33217,32897,16448],t}(f),d=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.frameChars=[],t.frameBytes=[],t.currentLrc=0,t}return l(t,e),t.prototype.receive=function(t){var r=this;for(e.prototype.receive.call(this,t),t.forEach((function(e){return r.frameChars.push(e)}));this.frameChars.length>=2;){var n=this.frameChars.shift();if(this.frameBytes.length,58===n)this.frameBytes.length&&this.endFrame();else{var i=this.frameChars.shift();if(13===n&&10===i)this.endFrame();else{var a=parseInt(String.fromCharCode(n,i),16);this.frameBytes.push(a),this.updateLrc(a)}}}},t.prototype.endFrame=function(){this.frameBytes.pop(),this.report(0===this.currentLrc?"LRC check success: ":"LRC check failed: ",new u(this.frameBytes)),this.frameBytes=[],this.currentLrc=0},t.prototype.updateLrc=function(e){this.currentLrc+=e,this.currentLrc&=255},t}(f);document.querySelector("form").addEventListener("submit",(function(e){e.preventDefault();var t=Object.fromEntries(function(e,t,r){if(r||2===arguments.length)for(var n,i=0,a=t.length;i<a;i++)!n&&i in t||(n||(n=Array.prototype.slice.call(t,0,i)),n[i]=t[i]);return e.concat(n||Array.prototype.slice.call(t))}([],e.target,!0).map((function(e){return[e.name,+e.value||e.value]})));console.log(t),v(t,"ASCII"===t.modbusmode?new d:new h)}));var p=document.querySelector("fieldset"),y=navigator.serial;y||(console.error("No serial support in this browser!"),p.disabled=!0);var v=function(e,t){y.requestPort().then((function(r){console.log("serialPort",r),r.open(e).then((function(){return e=void 0,n=void 0,a=function(){var e,n,i,a;return function(e,t){var r,n,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;o;)try{if(r=1,n&&(i=2&a[0]?n.return:a[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,a[1])).done)return i;switch(n=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,n=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!((i=(i=o.trys).length>0&&i[i.length-1])||6!==a[0]&&2!==a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(e){a=[6,e],n=0}finally{r=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}}(this,(function(o){switch(o.label){case 0:p.disabled=!0,o.label=1;case 1:if(!r.readable)return[3,9];e=r.readable.getReader(),o.label=2;case 2:o.trys.push([2,6,7,8]),o.label=3;case 3:return[4,e.read()];case 4:return n=o.sent(),i=n.value,n.done?[3,5]:(t.receive(i),[3,3]);case 5:return[3,8];case 6:return a=o.sent(),console.error("read catch",a),[3,8];case 7:return e.releaseLock(),[7];case 8:return[3,1];case 9:return[4,r.close()];case 10:return o.sent(),p.disabled=!1,[2]}}))},new((i=void 0)||(i=Promise))((function(t,r){function o(e){try{c(a.next(e))}catch(e){r(e)}}function s(e){try{c(a.throw(e))}catch(e){r(e)}}function c(e){var r;e.done?t(e.value):(r=e.value,r instanceof i?r:new i((function(e){e(r)}))).then(o,s)}c((a=a.apply(e,n||[])).next())}));var e,n,i,a}),console.error)}),console.error)},m=new h;m.receive(new Uint8Array([4,1,0,10,0,13,221,152])),m.receive(new Uint8Array([17,15,0,19,0,10,2,205,1,191,11])),m.receive(new Uint8Array([1,3,8,65,32,0,0,66,200,0,0,228,111])),m.receive(new Uint8Array([1,16,15,163,0,2,4,0,20,7,208,187,154])),(new d).receive((new TextEncoder).encode(":0401000A000DE4\r\n"))})();