"use strict";function _createForOfIteratorHelper(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0,r=function(){};return{s:r,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,d=!0,l=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return d=e.done,e},e:function(e){l=!0,o=e},f:function(){try{d||null==n.return||n.return()}finally{if(l)throw o}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var form1=document.getElementById("form1"),button=document.getElementById("button"),container_green=document.getElementById("green"),container_yellow=document.getElementById("yellow"),container_red=document.getElementById("red"),container_tasks=document.getElementById("tasks"),formIsValid={task:!1,date:!1,radio:!1};addEventListener("load",(function(){for(var e=0;e<localStorage.length;e++){var t=localStorage.key(e),n=JSON.parse(localStorage.getItem(t));Agregar_Tasks(n)}}));var Color_Selected=function(e){var t,n=_createForOfIteratorHelper(document.querySelectorAll(".container-color"));try{for(n.s();!(t=n.n()).done;){t.value.classList.remove("color_selected")}}catch(e){n.e(e)}finally{n.f()}e.classList.add("color_selected")},Reset_Form=function(){document.getElementById("form1").reset();var e,t=_createForOfIteratorHelper(document.querySelectorAll(".container-color"));try{for(t.s();!(e=t.n()).done;){e.value.classList.remove("color_selected")}}catch(e){t.e(e)}finally{t.f()}};container_green.addEventListener("click",(function(){document.getElementById("radio_green").checked=!0,formIsValid.radio=!0,Color_Selected(document.getElementById("green"))})),container_yellow.addEventListener("click",(function(){document.getElementById("radio_yellow").checked=!0,formIsValid.radio=!0,Color_Selected(document.getElementById("yellow"))})),container_red.addEventListener("click",(function(){document.getElementById("radio_red").checked=!0,formIsValid.radio=!0,Color_Selected(document.getElementById("red"))}));var Agregar_Tasks=function(e){var t=document.createElement("SPAN"),n=document.createElement("SPAN"),a=document.createElement("IMG"),r=document.createElement("IMG"),o=document.createElement("DIV"),d=document.getElementById("tasks"),l=document.createDocumentFragment();t.textContent=e.task,n.textContent=e.date,a.src="./images/Update.png",a.dataset.key=e.task,a.dataset.type="update",r.src="./images/Delete.png",r.dataset.key=e.task,r.dataset.type="delete",o.id=e.task,o.classList.add(e.priority),o.classList.add("list_task"),l.appendChild(t),l.appendChild(n),l.appendChild(a),l.appendChild(r),o.appendChild(l),d.appendChild(o)};document.getElementById("task").addEventListener("change",(function(e){e.target.value.trim().length>0&&(formIsValid.task=!0)})),document.getElementById("calendar").addEventListener("change",(function(e){e.target.value.trim().length>0&&(formIsValid.date=!0)}));var validateToAdd=function(){return-1==Object.values(formIsValid).findIndex((function(e){return 0==e}))},validateToUpdate=function(e){document.getElementById("task").value.trim().length>0&&(formIsValid.task=!0),document.getElementById("calendar").value.trim().length>0&&(formIsValid.date=!0),1==document.getElementById("radio_"+e).checked&&(formIsValid.radio=!0)},Reset_IsValid=function(){formIsValid.task=!1,formIsValid.date=!1,formIsValid.radio=!1},add_Task=function(e,t){localStorage.setItem(t,JSON.stringify(e)),Agregar_Tasks(e),Reset_Form(),Reset_IsValid(),document.getElementById("error").textContent=""},get_Tasks=function(e){var t=JSON.parse(localStorage.getItem(e));document.getElementById("task").value=t.task,document.getElementById("calendar").value=t.date,document.getElementById("radio_"+t.priority).checked=!0,Color_Selected(document.getElementById(t.priority)),document.getElementById("button").dataset.action="update",document.getElementById("button").textContent="Update Task",delete_Task(e)},delete_Task=function(e){localStorage.removeItem(e),document.getElementById(e).remove()};container_tasks.addEventListener("click",(function(e){"update"==e.target.dataset.type?get_Tasks(e.target.dataset.key):"delete"==e.target.dataset.type&&delete_Task(e.target.dataset.key)})),form1.addEventListener("submit",(function(e){e.preventDefault();for(var t=document.getElementById("task").value,n=document.getElementById("calendar").value,a=document.querySelectorAll(".radio"),r=null,o=0;o<a.length;o++)a[o].checked&&(r=a[o].value);var d={task:t,date:n,priority:r};try{"undefined"!=typeof Storage?"add"==e.target.button.dataset.action?validateToAdd()?add_Task(d,t):document.getElementById("error").textContent="Formulario Invalido":"update"==e.target.button.dataset.action&&(validateToUpdate(d.priority),add_Task(d,t),document.getElementById("button").dataset.action="add",document.getElementById("button").textContent="Add Task"):document.getElementById("error").textContent="El navegador no soporta Web Storage"}catch(e){console.error(e)}}));