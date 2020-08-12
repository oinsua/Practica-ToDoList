"use strict";function _createForOfIteratorHelper(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,l=!0,c=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return l=e.done,e},e:function(e){c=!0,a=e},f:function(){try{l||null==n.return||n.return()}finally{if(c)throw a}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var button=document.getElementById("button"),container_green=document.getElementById("green"),container_yellow=document.getElementById("yellow"),container_red=document.getElementById("red"),Color_Selected=function(e){var t,n=_createForOfIteratorHelper(document.querySelectorAll(".container-color"));try{for(n.s();!(t=n.n()).done;){t.value.classList.remove("color_selected")}}catch(e){n.e(e)}finally{n.f()}e.classList.add("color_selected")};container_green.addEventListener("click",(function(){document.getElementById("radio_green").checked=!0,Color_Selected(document.getElementById("green"))})),container_yellow.addEventListener("click",(function(){document.getElementById("radio_yellow").checked=!0,Color_Selected(document.getElementById("yellow"))})),container_red.addEventListener("click",(function(){document.getElementById("radio_red").checked=!0,Color_Selected(document.getElementById("red"))}));var Agregar_Tasks=function(e){var t=document.createElement("SPAN"),n=document.createElement("SPAN"),r=document.createElement("IMG"),o=document.createElement("IMG"),a=document.createElement("DIV"),l=document.getElementById("super-container");t.textContent=e.task,n.textContent=e.date,r.src="./images/Update.png",r.alt="Update",o.src="./images/Delete.png",o.alt="Delete",a.classList.add(e.priority),a.classList.add("list_task"),a.appendChild(t),a.appendChild(n),a.appendChild(r),a.appendChild(o),l.appendChild(a)};button.addEventListener("click",(function(e){e.preventDefault();for(var t=document.getElementById("task").value,n=document.getElementById("calendar").value,r=document.querySelectorAll(".radio"),o=null,a=0;a<r.length;a++)r[a].checked&&(o=r[a].value);var l={task:t,date:n,priority:o};try{localStorage.setItem(t,JSON.stringify(l)),Agregar_Tasks(l)}catch(e){console.error(e)}}));