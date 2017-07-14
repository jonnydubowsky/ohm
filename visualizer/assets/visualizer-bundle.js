!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="assets/",t(0)}([function(e,t,n){"use strict";function r(e){var t,n,r=ohm.ohmGrammar.match(e);if(r.succeeded()){var i={};try{ohm._buildGrammar(r,i);var a=Object.keys(i)[0];a&&(t=i[a])}catch(e){n=e}}else n={message:r.message,shortMessage:r.shortMessage,interval:r.getInterval()};return{matchResult:r,grammar:t,error:n}}function i(){var e=s.ui.grammarEditor,t=s.ui.inputEditor,n=e.getValue(),i=t.getValue();s.saveState(t,"input");for(var a=0;a<l.length;++a){var o=l[a];s.options[o.name]=o.checked}if((u||c)&&(d=!0),u&&(u=!1,s.emit("change:input",i)),c){c=!1,s.emit("change:grammar",n);var m=r(n);s.grammar=m.grammar,s.emit("parse:grammar",m.matchResult,m.grammar,m.error)}if(s.grammar&&s.grammar.defaultStartRule){var h=s.grammar.trace(i,s.startRule);if(d){var f=p("input[name=showFailures]").checked=h.result.failed();s.options.showFailures=f}s.emit("parse:input",h.result,h)}}function a(e){h&&clearTimeout(h),h=setTimeout(i.bind(s),e||0)}var o=n(2),s=n(1);n(5),n(8),n(6),n(9),n(10),n(11),n(12),n(13),n(14);var l,c=!0,u=!0,d=!0,p=o.$,m=o.$$;s.restoreState=function(e,t,n){var r,i=localStorage.getItem(t);i?r=CodeMirror.Doc(i,"null"):n&&(r=CodeMirror.Doc(n.textContent,"null")),s.ui.grammarEditor.swapDoc(r)},s.saveState=function(e,t){localStorage.setItem(t,e.getValue())};var h;l=m("#options input[type=checkbox]"),l.forEach(function(e){e.addEventListener("click",function(e){"showFailures"===e.target.name?d=!1:"showExampleGenerator"===e.target.name&&m(".exampleGeneratorUI").forEach(function(t){t.classList.toggle("hidden",!e.target.checked)}),a()})}),s.restoreState(s.ui.grammarEditor,"grammar",p("#sampleGrammar")),s.ui.inputEditor.on("change",function(e){u=!0,s.emit("change:inputEditor",e),a(250)}),s.ui.grammarEditor.on("change",function(e){c=!0,s.emit("change:grammarEditor",e),a(250)}),console.log("%cOhm visualizer","color: #e0a; font-family: Avenir; font-size: 18px;"),console.log(["- `ohm` is the Ohm library","- `ohmEditor` is editor object with","  `.grammar` as the current grammar object (if the source is valid)","  `.ui` containing the `inputEditor` and `grammarEditor`"].join("\n")),i()},function(e,t){"use strict";var n=new CheckedEmitter;n.registerEvents({"init:inputEditor":["codeMirror"],"init:grammarEditor":["codeMirror"],"change:inputEditor":["codeMirror"],"change:grammarEditor":["codeMirror"],"change:grammar":["grammarSource"],"change:input":["inputSource"],"parse:grammar":["matchResult","grammar","err"],"parse:input":["matchResult","trace"],"peek:failure":["failure"],"unpeek:failure":[],"goto:failure":["failure"],"peek:ruleDefinition":["ruleName"],"unpeek:ruleDefinition":[]}),n.grammar=null,n.startRule=null,n.options={},n.semantics=new CheckedEmitter,n.semantics.registerEvents({"add:operation":["type","name","optArguments"],"select:operation":["operationName"],"save:action":["operation","key","args","body"],"add:semanticEditor":["type","name"]}),n.ui={inputEditor:CodeMirror(document.querySelector("#exampleContainer .editorWrapper")),grammarEditor:CodeMirror(document.querySelector("#grammarContainer .editorWrapper"))},n.emit("init:inputEditor",n.ui.inputEditor),n.emit("init:grammarEditor",n.ui.grammarEditor),e.exports=n},function(e,t){"use strict";function n(){var e=document.querySelectorAll(".contextMenu");Array.prototype.forEach.call(e,function(e){e.hidden=!0})}var r={ENTER:13,ESC:27};document.addEventListener("click",n),document.addEventListener("contextmenu",n),document.addEventListener("keydown",function(e){e.keyCode!==r.ESC&&e.keyCode!==r.ENTER||n()}),e.exports={$:function(e){return document.querySelector(e)},$$:function(e){return Array.prototype.slice.call(document.querySelectorAll(e))},clearDOMNode:function(e){for(;e.firstChild;)e.removeChild(e.firstChild)},createElement:function(e,t){var n=e.split("."),r=n[0];0===r.length&&(r="div");var i=document.createElement(r);return i.className=n.slice(1).join(" "),t&&(i.textContent=t),i},closestElementMatching:function(e,t){for(var n=t;null!=n;){if(n.matches(e))return n;n=n.parentElement}},toggleClasses:function(e,t){for(var n in t)t.hasOwnProperty(n)&&e.classList.toggle(n,!!t[n])},addMenuItem:function(e,t,n,r,i){var a=document.querySelector("#"+e+" ul"),o=a.querySelector("#"+t);return o||(o=a.appendChild(this.createElement("li")),o.id=t),o.innerHTML="<label></label>",o.firstChild.innerHTML=n,o.classList.toggle("disabled",!r),r&&(o.onclick=i),o}}},function(e,t){"use strict";function n(e){return e.match(/^\s*/)[0].length}function r(e){return e.match(/\s*$/)[0].length}function i(e,t){var n=e.posFromIndex(t);return e.heightAtLine(n.line,"local")}function a(e,t,i){var a=e.getLine(i.line);return n(e.getLine(t.line))===t.ch&&a.length-r(a)===i.ch}function o(e,t,n,r){for(var i=t;i<=n;++i)e.addLineClass(i,"wrap",r);return{clear:function(){for(var i=t;i<=n;++i)e.removeLineClass(i,"wrap",r)}}}e.exports={markInterval:function(e,t,n,r){var i=e.posFromIndex(t.startIdx),s=e.posFromIndex(t.endIdx);return r&&a(e,i,s)?o(e,i.line,s.line,n):e.markText(i,s,{className:n})},clearMark:function(e){e&&e.clear()},scrollToInterval:function(e,t){var n=i(e,t.startIdx),r=i(e,t.endIdx),a=e.getScrollInfo(),o=a.clientHeight-(r-n);(n<a.top||r>a.top+a.clientHeight)&&e.scrollIntoView({left:0,top:n,right:0,bottom:r},o>0?o/2:void 0)}}},function(e,t,n){e.exports=function(){return new Worker(n.p+"f6c92c2b771b1a827802.worker.js")}},function(e,t,n){"use strict";function r(e,t){var n=u[e];n&&(n.mark.clear(),clearTimeout(n.timeout),n.widget&&n.widget.clear(),u[e]=null)}function i(e,t,n,i){r(e,t),u[e]={mark:s.markInterval(t,n,"error-interval",!1),timeout:setTimeout(a.bind(null,e,t,n,i),1500),widget:null}}function a(e,t,n,r){var i=l.createElement(".error");"string"==typeof r?i.textContent=r:i.appendChild(r);var a=t.posFromIndex(n.endIdx).line;u[e].widget=t.addLineWidget(a,i,{insertAt:0})}function o(e,t){var n=l.createElement("span","Expected "),r=e.getRightmostFailures(),i=", ",a=r.length>=3?", or ":" or ";return r.forEach(function(e,t){var o="";t>0&&(o=t===r.length-1?a:i),n.appendChild(document.createTextNode(o));var s=n.appendChild(l.createElement("span.link",e.toString()));s.onclick=function(){c.emit("goto:failure",e)},s.onmouseenter=function(){c.emit("peek:failure",e)},s.onmouseout=function(){c.emit("unpeek:failure")}}),n}var s=n(3),l=n(2),c=n(1),u={grammar:null,input:null};c.addListener("change:grammarEditor",function(e){r("grammar",e)}),c.addListener("change:inputEditor",function(e){r("input",e)}),c.addListener("change:grammar",function(e){r("input",c.ui.inputEditor)}),c.addListener("parse:grammar",function(e,t,n){if(n){var r=c.ui.grammarEditor;i("grammar",r,n.interval,n.shortMessage||n.message)}}),c.addListener("parse:input",function(e,t){if(t.result.failed()){var n=c.ui.inputEditor,r=t.result.getInterval();r.endIdx+=1,i("input",n,r,o(t.result))}})},function(e,t,n){"use strict";function r(e,t,n){var r=n||null,i=a.createElement("select");if(i.id="startRuleDropdown",Object.keys(e.rules).forEach(function(e){var n=a.createElement("option",e);n.value=e,t.includes(e)&&n.classList.add("needed"),i.appendChild(n)}),null!==r){var o=Array.prototype.find.call(i.options,function(e){return e.value===r});o.selected=!0}return i}var i=n(1),a=n(2),o=n(7),s=[],l=null,c="",u=null;o.addListener("received:neededExamples",function(e){u&&clearTimeout(u),u=setTimeout(function(){var t=a.$("#neededExamples > ul");s=e,Array.prototype.slice.call(t.children).forEach(function(e){e.firstChild!==l&&t.removeChild(e)}),s.filter(function(e){return e!==c}).forEach(function(e){t.appendChild(a.createElement("li",e))})},200)}),o.addListener("received:neededExamples",function(e){var t=a.$("#neededExamples > ul"),n=a.$("#startRuleDropdown"),o=i.examples.getSelected().startRule;n&&n.parentElement.removeChild(n),t.parentElement.insertBefore(r(i.grammar,s,o),t)}),i.examples.addListener("set:selected",function(e){var t=i.examples.getExample(e),n=a.$("#neededExamples > ul"),o=a.$("#startRuleDropdown"),l=t.startRule;o&&o.parentElement.removeChild(o),n.parentElement.insertBefore(r(i.grammar,s,l),n),i.startRule=t.startRule})},function(e,t,n){"use strict";function r(e){d&&d.terminate(),d=new o,d.onmessage=i,d.postMessage({name:"initialize",recipe:e.toRecipe()});var t=s.examples.getExamples();Object.keys(t).forEach(function(n){var r=t[n],i=e.match(r.text,r.startRule);i.succeeded()&&c.addUserExample(r.startRule||e.defaultStartRule,r.text)})}function i(e){u.includes(e.data.name)?c.emit.apply(c,[e.data.name].concat(e.data.args)):l&&console.debug("WORKER:",e.data)}function a(e,t){d.postMessage({name:e,args:t})}var o=n(4),s=n(1),l=!1,c=new CheckedEmitter;c.registerEvents({"received:examples":["ruleName","examples"],"received:neededExamples":["neededExamples"]});var u=["received:examples","received:neededExamples"],d=new o;s.addListener("parse:grammar",function(e,t,n){n||r(t)}),s.examples.addListener("set:example",function(e,t,n){var i;""!==n.text.trim()&&(t&&""===t.text.trim()||!t?(i=s.grammar,i.match(n.text,n.startRule).succeeded()&&c.addUserExample(n.startRule||i.defaultStartRule,n.text)):r(s.grammar))}),s.examples.addListener("remove:example",function(e){r(s.grammar)}),c.requestExamples=function(e){a("request:examples",[e])},c.updateNeededExamples=function(){a("update:neededExamples",[])},c.addUserExample=function(e,t){a("add:userExample",[e,t])},c.neededExamples=null,c.addListener("received:neededExamples",function(e){c.neededExamples=e}),e.exports=c},function(e,t,n){"use strict";function r(){return"example-"+x++}function i(e){var t=e.target.closest("li.example");p(t.id)}function a(e){var t,n=l(e),r=n.text,i=n.startRule,a=o(e);try{var s=f.grammar.match(r,i);t=s.succeeded()}catch(e){t=!1}a.classList.toggle("pass",t===n.positive),a.classList.toggle("fail",!t===n.positive)}function o(e){return v.$("#"+e)}function s(){var e=v.createElement("li.example"),t=e.id=r();e.onmousedown=i;var n=e.appendChild(v.createElement("code")),a=n.appendChild(v.createElement("span.code")),o=n.appendChild(v.createElement("span.startRule"));a.onmousedown=i,o.onmousedown=i,E[t]={text:"",startRule:null};var s=e.appendChild(v.createElement("div.sign"));s.onmousedown=function(e){e.stopPropagation()},s.onclick=function(){E[t].positive=!E[t].positive,u(t,E[t].text,E[t].startRule,E[t].positive),h()},E[t].positive=!0;var l=e.appendChild(v.createElement("div.delete"));return l.innerHTML="&#x2716;",l.onmousedown=function(e){e.stopPropagation()},l.onclick=function(){var n=e.previousSibling||e.nextSibling;e.remove(),delete E[t],h(),g===t&&p(n?n.id:-1),f.examples.emit("remove:example",t)},v.$("#exampleContainer ul").appendChild(e),f.ui.inputEditor.focus(),f.examples.emit("add:example",t),t}function l(e){if(e in E)return E[e];throw new Error(e+" is not a valid example id")}function c(){return E}function u(e,t,n,r){if(!(e in E))throw new Error(e+" is not a valid example id");var i=n||null,s=E[e],l=E[e]={text:t,startRule:i,positive:r},c=o(e),u=c.querySelector("code > span.code"),d=c.querySelector("code > span.startRule"),p=c.querySelector("div.sign");u.startRule=i,u.parentElement.classList.remove("pass","fail"),setTimeout(a.bind(null,e),0),l.text.length>0?u.textContent=t:u.innerHTML="&nbsp;",null!==i?d.textContent=i:d.textContent="",l.positive?(p.innerHTML="&#x1F44D;",p.setAttribute("title","Example should pass")):(p.innerHTML="&#x1F44E;",p.setAttribute("title","Example should fail")),f.examples.emit("set:example",e,s,l)}function d(){return g!==-1?E[g]:null}function p(e){var t,n={text:"",startRule:null},r=f.ui.inputEditor;e!==-1&&(n=l(e),t=o(e)),g=e,r.setValue(n.text);var i=v.$("#exampleContainer .selected");i!==t&&(i&&i.classList.remove("selected"),t&&t.classList.add("selected")),r.getWrapperElement().hidden=!t,r.focus(),f.examples.emit("set:selected",e)}function m(e,t){var n=localStorage.getItem(t),r=[];r=n?JSON.parse(n):v.$$("#sampleExamples pre").map(function(e){return{text:e.textContent,startRule:null}}),r.forEach(function(e){e.hasOwnProperty("positive")||(e.positive=!0),u(s(),e.text,e.startRule,e.positive)});var i=v.$("#exampleList li:first-child"),a=i?i.id:-1;p(a)}function h(){localStorage.setItem("examples",JSON.stringify(Object.keys(E).map(function(e){return E[e]})))}var f=n(1),v=n(2),x=0,g=-1,E=Object.create(null);f.examples=Object.assign(new CheckedEmitter,{addExample:s,getExample:l,getExamples:c,setExample:u,setSelected:p,getSelected:d,saveExamples:h}),f.examples.registerEvents({"add:example":["id"],"set:example":["id","oldValue","newValue"],"set:selected":["id"],"remove:example":["id"]}),v.$("#addExampleButton").onclick=function(e){p(s())};var y=function(e){if(g){var t=v.$("#startRuleDropdown"),n=e.getValue(),r=t.options[t.selectedIndex].value,i=E[g].positive;u(g,n,r,i),h()}};f.ui.inputEditor.setOption("extraKeys",{"Cmd-S":y,"Ctrl-S":y}),f.addListener("parse:grammar",function(e,t,n){Object.keys(E).forEach(function(e){var t=o(e);n?t.classList.remove("pass","fail"):a(e)})}),f.ui.inputEditor.getWrapperElement().hidden=!0,m(f.ui.inputEditor,"examples")},function(e,t,n){"use strict";function r(e,t){if(!t||"object"!=typeof t)return e;for(var n=Object.keys(t),r=n.length;r--;)e[n[r]]=t[n[r]];return e}function i(e){return function(t){return t.reduce(function(t,n){return r(t,n[e])},{})}}function a(e){var t={};return Object.keys(e).forEach(function(e){if(e in p.rules){var n=p.rules[e].body;t[e]=n.source?n.source.contents:n.toString()}}),t}function o(e){this.editor=e,this.node=c("#protos .externalRules").cloneNode(!0),this.widget=null,this.placeWidget=this._placeWidget.bind(this),this._placeWidget(null)}var s=n(2),l=n(1),c=s.$,u=s.$$,d=ohm.ohmGrammar,p=ohm.grammar("G {}").superGrammar,m=d.createSemantics();m.addAttribute("referencedRules",{Base_application:function(e,t){var n={};return n[e.sourceString]=!0,r(n,t.referencedRules)},_iter:i("referencedRules"),_nonterminal:i("referencedRules"),_terminal:function(){return{}}}),m.addAttribute("identifiers",{ident:function(e){var t={};return t[this.sourceString]=!0,t},_iter:i("identifiers"),_nonterminal:i("identifiers"),_terminal:function(){return{}}}),o.prototype._placeWidget=function(){this.widget&&this.clear();var e=this.editor,t=this.lineHandle=e.getLineHandle(e.lastLine());this.widget=e.addLineWidget(t,this.node),t.on("change",this.placeWidget),t.on("delete",this.placeWidget)},o.prototype.clear=function(){this.widget.clear(),this.lineHandle.off("change",this.placeWidget),this.lineHandle.off("delete",this.placeWidget)},o.prototype.update=function(e,t,n){if(n)this._rules=a(m(t).referencedRules);else{var r=d.match(e.getValue(),"tokens");this._rules=a(m(r).identifiers)}var i=this.node.querySelector(".content");i.textContent="";for(var o in this._rules){var s=document.createElement("pre");s.id="externalRules-"+o,s.textContent=o+" = "+this._rules[o]+"\n",i.appendChild(s)}};var h;l.addListener("parse:grammar",function(e,t,n){var r=l.ui.grammarEditor;h=h||new o(r),h.update(r,e,t)}),l.addListener("peek:ruleDefinition",function(e){if(!l.grammar.rules.hasOwnProperty(e)){var t=c("#externalRules-"+e);t&&t.classList.add("active-definition")}}),l.addListener("unpeek:ruleDefinition",function(){u(".externalRules pre").forEach(function(e){e.classList.remove("active-definition")})})},function(e,t,n){"use strict";function r(){return"node-"+S++}function i(e){return e.right>0&&e.left<window.innerWidth}function a(){E=w.clearMark(E),y=w.clearMark(y),C=w.clearMark(C),I.ui.grammarEditor.getWrapperElement().classList.remove("highlighting"),I.ui.inputEditor.getWrapperElement().classList.remove("highlighting")}function o(e){return(e||this).offsetHeight+"px"}function s(e,t){return function(n,r,i){var a=d3.interpolate(i,e);return function(e){var n=a.call(this,e);return t(e),n}}}function l(e){var t=e.expr;return!(t instanceof ohm.pexprs.Seq||t instanceof ohm.pexprs.Alt)&&(!e.succeeded||0!==e.bindings.length)}function c(e){return e instanceof ohm.pexprs.Alt}function u(e){return e instanceof ohm.pexprs.Apply?e.isSyntactic():e instanceof ohm.pexprs.Iter||e instanceof ohm.pexprs.Lookahead||e instanceof ohm.pexprs.Not?u(e.expr):e instanceof ohm.pexprs.Seq?e.factors.some(u):e instanceof ohm.pexprs.Param}function d(e,t){return!t.collapsed&&!m(e)&&(!e.succeeded||t.syntactic&&!u(e))}function p(e){return!(!c(e.expr)||!I.options.showFailures)&&e.children.some(function(e){return!e.succeeded})}function m(e){var t=e.expr;if(h(t))return!0;if(t instanceof ohm.pexprs.Apply){var n=I.grammar.rules[t.ruleName].body;if(!n.source)return!0}return!!f(e)||0===e.children.length}function h(e){return e instanceof ohm.pexprs.Terminal||e instanceof ohm.pexprs.Range||e instanceof ohm.pexprs.UnicodeChar}function f(e){return 1===e.children.length&&null==e.children[0]}function v(e){return I.options.showFailures&&null!=e.terminatingLREntry}function x(e,t){return e!==t&&t.succeeded&&!m(t)}function g(e){b("#bottomSection .overlay").style.width="100%"}var E,y,C,w=n(3),L=n(2),I=n(1),T=Array.prototype,b=L.$,N={ANTICLOCKWISE_OPEN_CIRCLE_ARROW:"↺",HORIZONTAL_ELLIPSIS:"…",MIDDLE_DOT:"·"},S=0;Vue.component("trace-label",{props:{traceNode:{type:Object,required:!0},minWidth:{type:String,required:!0}},computed:{extraInfo:function(){if(f(this.traceNode))return"[LR]"},inlineRuleNameParts:function(){var e=this.traceNode.expr.ruleName;if(e)return e.split("_")},labelData:function(){if(this.traceNode.terminatesLR)return{text:"[Grow LR]"};if(this.inlineRuleNameParts)return{text:this.inlineRuleNameParts[0],caseName:this.inlineRuleNameParts[1]};var e=this.traceNode.displayString;return e.length>20&&e.indexOf(" ")>=0?{text:e.slice(0,20)+N.HORIZONTAL_ELLIPSIS,tooltip:e}:{text:e}}},methods:{emitHover:function(){this.$emit("hover")},emitUnhover:function(){this.$emit("unhover")},onClick:function(e){var t=/Mac/.test(navigator.platform),n=t?e.metaKey:e.ctrlKey;!e.altKey||e.shiftKey||e.metaKey?!n||e.altKey||e.shiftKey?this.$emit("click"):this.$emit("click","cmd"):this.$emit("click","alt"),e.preventDefault()},onContextMenu:function(e){this.$emit("showContextMenu",{x:e.clientX,y:e.clientY-6,traceNode:this.traceNode}),e.stopPropagation(),e.preventDefault()}},template:['<div class="label" :title="labelData.tooltip" :style="{minWidth: minWidth}"','     @mouseover="emitHover" @mouseout="emitUnhover" @click="onClick($event)"','     @contextmenu="onContextMenu($event)">{{',"  labelData.text",'}}<span v-if="labelData.caseName" class="caseName">{{ labelData.caseName }}</span>','<span v-if="extraInfo" class="info">{{ extraInfo }}</span>',"</div>"].join("")}),Vue.component("trace-element",{props:{traceNode:{type:Object,required:!0},measureInputText:{type:Function},isInVBox:{type:Boolean},context:{type:Object},currentLR:{type:Object,default:Object},eventHandlers:{type:Object}},computed:{id:function(){return r()},labeled:function(){return l(this.traceNode)},vbox:function(){return p(this.traceNode)||v(this.traceNode)||c(this.traceNode.expr)&&this.context&&this.context.vbox},isWhitespace:function(){return"spaces"===this.traceNode.ruleName},isLeaf:function(){var e=m(this.traceNode);if(this.traceNode.isMemoized){var t=this.traceNode.expr.toMemoKey(),n=this.currentLR[t];n&&n[n.length-1]===this.traceNode.pos&&(e=!0)}return e},classObj:function(){var e={disclosure:this.labeled&&this.isInVBox},t=this.traceNode.ctorName;return t&&(e[t.toLowerCase()]=!0),e.collapsed=this.labeled&&this.context&&d(this.traceNode,this.context),e.failed=!this.traceNode.succeeded,e.labeled=this.labeled,e.leaf=this.isLeaf,e},children:function(){if(this.collapsed)return null;var e=[],t=this;return this.traceNode.children.forEach(function(n){if((n.succeeded||I.options.showFailures)&&(!n.isImplicitSpaces||I.options.showSpaces)){var r="spaces"===n.expr.ruleName;if(!r||0!==n.source.contents.length){var i={traceNode:n,context:{parent:t,collapsed:t.collapsed,syntactic:t.labeled?u(n.expr):t.context&&t.context.syntactic,vbox:t.vbox},isInVBox:!!t.context&&t.context.vbox,currentLR:t.currentLR};e.push(i)}}}),e},minWidth:function(){return this.measureInputText(this.traceNode.source.contents)+"px"}},data:function(){return{collapsed:!1}},template:['<div class="pexpr" :class="classObj" id="id">','  <div v-if="labeled" class="self">','    <trace-label :traceNode="traceNode" :minWidth="minWidth"','                 @hover="onHover" @unhover="onUnhover" @click="onClick"','                 @showContextMenu="onShowContextMenu" />',"  </div>",'  <div v-if="!isLeaf" ref="children"','       class="children" :class="{vbox: vbox}"','       :hidden="classObj.collapsed">','    <trace-element v-for="child in children"','                   :id="child.id" :traceNode="child.traceNode" :context="child.context"','                   :currentLR="child.currentLR" :measureInputText="measureInputText"','                   :isInVBox="child.isInVBox" :eventHandlers="eventHandlers">',"    </trace-element>","  </div>","</div>"].join(""),mounted:function(){var e=this.$el;e._traceNode=this.traceNode,I.parseTree.emit("create:traceElement",e,e._traceNode),this.classObj.collapsed&&I.parseTree.emit("collapse:traceElement",e),this.isLeaf||this.$nextTick(function(){I.parseTree.emit("exit:traceElement",e,e._traceNode)})},created:function(){this.initializeCollapsedState()},updated:function(){this.traceNode!==this.$el._traceNode&&(this.$el._traceNode=this.traceNode,this.initializeCollapsedState())},methods:{initializeCollapsedState:function(){this.collapsed=this.labeled&&this.context&&d(this.traceNode,this.context)},onHover:function(){var e=I.ui.grammarEditor,t=I.ui.inputEditor,n=this.traceNode.source,r=this.traceNode.expr;n&&(E=w.markInterval(t,n,"highlight",!1),t.getWrapperElement().classList.add("highlighting")),r.source&&(y=w.markInterval(e,r.source,"active-appl",!1),e.getWrapperElement().classList.add("highlighting"),w.scrollToInterval(e,r.source));var i=r.ruleName;i&&I.emit("peek:ruleDefinition",i),this.eventHandlers.hover()},onUnhover:function(){I.emit("unpeek:ruleDefinition"),this.eventHandlers.unhover()},onClick:function(e){"alt"===e?console.log(this.traceNode):"cmd"===e?I.parseTree.emit("cmdOrCtrlClick:traceElement",this.$el):m(this.traceNode)||this.toggleCollapsed()},onShowContextMenu:function(e){e.el=this.$el,this.eventHandlers.showContextMenu(e)},toggleCollapsed:function(){var e=this.$refs.children;this.setCollapsed(!e.hidden)},setCollapsed:function(e,t){function n(){i.classList.toggle("collapsed",e),I.parseTree.emit((e?"collapse":"expand")+":traceElement",i)}e||this.children||(this.collapsed=e);var r=null!=t?t:500,i=this.$el;if(0===r)return i.lastChild.hidden=!e,n(),void(i.lastChild.hidden=e);var a=this;this.$nextTick(function(){var t=a.measureChildren(),l=e?a.measureLabel().width:t.width;d3.select(i).transition().duration(r).styleTween("width",s(l+"px",function(t){a.eventHandlers.updateExpandedInput(i,e,t)})).each("start",function(){this.style.width=this.offsetWidth+"px"}).each("end",function(){this.style.width=""});var c=e?0:t.height;d3.select(i.lastChild).style("height",o).transition().duration(r).style("height",c+"px").each("start",function(){e||(n(),this.hidden=!1)}).each("end",function(){this.style.height="",e&&(this.hidden=!0,n()),a.eventHandlers.updateExpandedInput()})})},measureLabel:function(){var e=b("#measuringDiv .pexpr"),t=this.$el.querySelector(".label").cloneNode(!0),n=e.appendChild(t),r={width:n.offsetWidth,height:n.offsetHeight};return e.innerHTML="",r},measureChildren:function(){var e=b("#measuringDiv"),t=e.appendChild(this.$el.cloneNode(!0));t.style.width="";var n=t.lastChild;n.hidden=!n.hidden;var r={width:n.offsetWidth,height:n.offsetHeight};return e.removeChild(t),r}}}),Vue.component("parse-results",{props:{trace:{required:!0},measureInputText:{type:Function,required:!0},highlightNode:{type:Object}},computed:{pexprEventHandlers:function(){var e=this;return{showContextMenu:this.onShowContextMenu,hover:function(){e.emitUpdateExpandedInput()},unhover:function(){e.emitUpdateExpandedInput()},updateExpandedInput:this.emitUpdateExpandedInput}}},methods:{onWheel:function(e){var t,n=this.$el,r=e.deltaY>0;if(r){var i=n.scrollHeight-n.clientHeight-n.scrollTop;t=e.deltaY-i,t>0&&(this.scrollLeft+=t)}else t=n.scrollTop+e.deltaY,t<0&&(this.scrollLeft+=t)},onScroll:function(){this.emitUpdateExpandedInput()},onShowContextMenu:function(e){this.$emit("showContextMenu",e)},emitUpdateExpandedInput:function(){var e=Array.prototype.slice.call(arguments);this.$emit.apply(this,["updateExpandedInput"].concat(e))}},render:function(e){if(!this.trace)return e("div");var t=e("trace-element",{props:{traceNode:this.trace,isInVBox:!1,currentLR:{},measureInputText:this.measureInputText,eventHandlers:this.pexprEventHandlers}}),n=e("div",{domProps:{id:"parseResults"},on:{wheel:this.onWheel,scroll:this.onScroll}},[t]);return I.parseTree.emit("render:parseTree",this.trace),this.$nextTick(function(){this.$emit("updateExpandedInput")}),n}}),Vue.component("expanded-input",{computed:{canvasEl:function(){return this.$el.querySelector("canvas")},inputCtx:function(){return this.canvasEl.getContext("2d")}},template:['<div id="expandedInputWrapper">','  <div id="sizer">&nbsp;</div>','  <canvas id="expandedInput" width="1" height="1"></canvas>',"</div>"].join(""),mounted:function(){this.update()},methods:{getPixelRatio:function(){return window.devicePixelRatio||1},updateCanvasSize:function(){var e=this.canvasEl,t=this.$el.querySelector("#sizer"),n=this.getPixelRatio();e.width=t.offsetWidth*n,e.height=t.offsetHeight*n,e.style.width=t.offsetWidth+"px",e.style.height=t.offsetHeight+"px"},update:function(e,t,n){this.updateCanvasSize();var r=b(".pexpr > .self:hover"),a=r?r.parentNode:b(".zoomBorder"),o=0;e&&(o=t?n:1-n);var s=b(".pexpr"),l=L.$("#parseResults > .pexpr > .children > .pexpr.failed"),c=this;!function t(n,r){var s=n.getBoundingClientRect();if(i(s)&&(!n.classList.contains("failed")||n===l))if(n===a&&c.renderHighlight(n),n.classList.contains("leaf")||n.classList.contains("collapsed"))if(n===l)c.renderFailedInputText(n,s);else{var u=r?1-o:1;c.renderInputText(c.getConsumedInput(n),s,u)}else{var d=n===e;d&&c.renderInputText(c.getConsumedInput(n),s,o);var p=n.lastChild.childNodes;T.forEach.call(p,function(e){t(e,d||r)})}}(s,!1)},measureText:function(e){return this.inputCtx.font=16*this.getPixelRatio()+"px Menlo, Monaco, monospace",this.inputCtx.measureText(e).width/this.getPixelRatio()},renderInputText:function(e,t,n){var r=this.measureText(e),i=(t.right-t.left-r)/e.length/2,a=r/e.length;this.inputCtx.fillStyle="rgba(51, 51, 51, "+(null==n?1:n)+")",this.inputCtx.textBaseline="top";for(var o=b("#expandedInputWrapper").getBoundingClientRect(),s=t.left-o.left,l=0;l<e.length;l++)s+=i,this.inputCtx.fillText(e[l],s*this.getPixelRatio(),0),s+=a+i;return s<=window.innerWidth},renderFailedInputText:function(e,t){var n=e._traceNode.inputStream.sourceSlice(e._traceNode.pos),r=b("#expandedInputWrapper").getBoundingClientRect(),i={bottom:t.bottom,left:t.left-r.left,right:t.left-r.left+this.measureText(n),top:t.top};this.renderInputText(n,i,.5)},renderHighlight:function(e){var t=e.getBoundingClientRect(),n=this.getPixelRatio(),r=b("#expandedInputWrapper").getBoundingClientRect(),i={x:(t.left-r.left)*n,y:0,width:(t.right-t.left)*n,height:b("#expandedInput").height};this.inputCtx.fillStyle="#B5D5FF",this.inputCtx.fillRect(i.x,i.y,i.width,i.height)},getConsumedInput:function(e){if(e._traceNode)return e._traceNode.source.contents}}});var R=new Vue({el:"#parseTree",data:{rootTrace:null,zoomTrace:null,previewedZoomTrace:null},computed:{zoomButtonLabel:function(){return N.ANTICLOCKWISE_OPEN_CIRCLE_ARROW},showZoomButton:function(){return this.zoomTrace||this.previewedZoomTrace},currentRootTrace:function(){return this.zoomTrace||this.rootTrace},zoomHighlight:function(){if(this.previewedZoomTrace)return{node:this.previewedZoomTrace,class:"zoomBorder"}}},template:['<div id="parseTree">','  <button v-if="showZoomButton" id="zoomOutButton" type="button"','          @click="zoomOut" @mouseover="previewZoom" @mouseout="unpreviewZoom">{{',"      zoomButtonLabel","  }}</button>",'  <div id="visualizerBody">','    <expanded-input ref="expandedInput" />','    <parse-results :trace="currentRootTrace" :highlightNode="zoomHighlight"','                   :measureInputText="measureInputText"','                   @showContextMenu="showContextMenu"','                   @updateExpandedInput="updateExpandedInput"/>',"  </div>","</div>"].join(""),mounted:function(){window.addEventListener("resize",this.$refs.expandedInput.update)},methods:{zoom:function(e){this.zoomTrace=e,a()},zoomOut:function(){this.zoomTrace=this.previewedZoomTrace=null},previewZoom:function(){this.previewedZoomTrace=this.zoomTrace,this.zoomTrace=null},unpreviewZoom:function(){this.zoomTrace=this.previewedZoomTrace,this.previewedZoomTrace=null},showContextMenu:function(e){var t=x(this.rootTrace,e.traceNode),n=b("#parseTreeMenu");n.style.left=e.x+"px",n.style.top=e.y+"px",n.hidden=!1;var r=this;L.addMenuItem("parseTreeMenu","getInfoItem","Get Info",!1),L.addMenuItem("parseTreeMenu","zoomItem","Zoom to Node",t,function(){r.zoom(e.traceNode)}),I.parseTree.emit("contextMenu",e.el,e.traceNode)},updateExpandedInput:function(){this.$refs.expandedInput.update.apply(null,arguments)},measureInputText:function(e){return this.$refs.expandedInput.measureText(e)}}}),k=I.parseTree=new CheckedEmitter;k.vue=R,I.addListener("change:inputEditor",g),I.addListener("change:grammarEditor",g),I.addListener("peek:ruleDefinition",function(e){if(I.grammar.rules.hasOwnProperty(e)){var t=I.grammar.rules[e].source;if(t){var n=I.ui.grammarEditor;C=w.markInterval(n,t,"active-definition",!0),w.scrollToInterval(n,t)}}}),I.addListener("unpeek:ruleDefinition",a),I.addListener("parse:input",function(e,t){b("#bottomSection .overlay").style.width=0,b("#semantics").hidden=!I.options.semantics,k.vue.rootTrace=Object.freeze(t)}),k.setTraceElementCollapsed=function(e,t,n){e.__vue__.setCollapsed(t,n)},k.registerEvents({"create:traceElement":["el","traceNode"],"exit:traceElement":["el","traceNode"],"expand:traceElement":["el"],"collapse:traceElement":["el"],contextMenu:["target","traceNode"],"render:parseTree":["traceNode"],"cmdOrCtrlClick:traceElement":["wrapper"]})},function(e,t,n){"use strict";function r(){return/Mac/.test(window.navigator.platform)}function i(e){var t=r()?e.metaKey:e.ctrlKey;return t&&!e.shiftKey&&!e.altKey&&!e.ctrlKey}function a(e,t){if(E.clearMark(v),x=null,f&&h&&i(t)){var n=s(e,f.x,f.y);l(n)&&(v=e.markText(n.startPos,n.endPos,{css:"text-decoration: underline; color: #268BD2; cursor: pointer;"}),x=n)}}function o(e,t){f={x:t.clientX,y:t.clientY},g||a(e,t)}function s(e,t,n){var r=e.coordsChar({left:t,top:n}),i=e.findWordAt(r);return{startIdx:e.indexFromPos(i.anchor),startPos:i.anchor,endPos:i.head,value:e.getRange(i.anchor,i.head).trim()}}function l(e){if(e.value.length>0&&h&&h[e.startIdx]){var t=h[e.startIdx].memo;if(t&&t.Base_application&&t.Base_application.value)return!0}return!1}function c(e){var t=p.rules[e].source;if(t){var n=E.markInterval(m,t,"active-definition",!0);setTimeout(n.clear.bind(n),1e3),E.scrollToInterval(m,t)}}function u(e,t,n){return e.indexFromPos(t.startPos)===e.indexFromPos(n.startPos)&&e.indexFromPos(t.endPos)===e.indexFromPos(n.endPos)}function d(e){e.getWrapperElement().addEventListener("mousemove",o.bind(null,e)),window.addEventListener("keydown",a.bind(null,e)),window.addEventListener("keyup",a.bind(null,e)),e.on("mousedown",function(e,t){g=!0,i(t)&&t.preventDefault()},!0),e.getWrapperElement().addEventListener("mouseup",function(t){if(g=!1,x){var n=s(e,t.clientX,t.clientY);u(e,n,x)&&c(x.value)}})}var p,m,h,f,v,x,g,E=n(3),y=n(1);y.addListener("parse:grammar",function(e,t,n){m||(m=y.ui.grammarEditor,d(m)),p=t,h=e.succeeded()?e.matcher.memoTable:null})},function(e,t,n){"use strict";function r(e,t){for(var n=e;null!=(n=n.parentElement);)if(n.classList.contains(t))return n}function i(e,t,n){var r=t.querySelector("input[type=search]"),i={fallthrough:"default"};i["Cmd-F"]=i["Ctrl-F"]=function(e){var t=e.getSelection();0===t.length||t===r.value?r.select():e.execCommand("findPersistent");
},e.addKeyMap(i);var a=function(t){return"function"==typeof t?(t(e),!0):"string"==typeof t&&0===t.indexOf("find")&&(e.execCommand(t),!0)},o=function(){t.parentNode.removeChild(t),e.execCommand("clearSearch"),e.removeKeyMap(i),e.focus()};t.onkeydown=function(t){var s=CodeMirror.keyName(t);"Esc"===s?(o(),e.focus()):t.target===r&&"Enter"===s?n(r.value,t):"handled"===CodeMirror.lookupKey(s,i,a)&&t.preventDefault()};var s=t.querySelector(".closeButton");s.onclick=o}var a=n(1),o=n(2);CodeMirror.defineExtension("openDialog",function(e,t,n){var a=this;if(0!==e.indexOf("Search:"))throw new Error("No dialog for template "+e);var s=r(a.getWrapperElement(),"flex-fix").parentNode,l=s.querySelector(".footer");l||(l=o.$("#protos .footer").cloneNode(!0),s.appendChild(l),l.removeAttribute("hidden"),i(a,l,t));var c=l.querySelector(".closeButton"),u=l.querySelector("input[type=search]");return n.value&&(u.value=n.value),u.select(),c.onclick});var s={};s["Ctrl-F"]=s["Cmd-F"]="findPersistent";var l=function(e){e.addKeyMap(s)};a.addListener("init:inputEditor",l),a.addListener("init:grammarEditor",l)},function(e,t){"use strict";function n(e,t){return"splitter-"+e.id+"-"+t}function r(e){function t(t,r){var i="prev"===t?o:s;i.style.flexGrow=r,e.id&&localStorage.setItem(n(e,t),r)}var r=document.createElement("div");r.classList.add("handle"),e.appendChild(r);var i=e.classList.contains("vertical"),a=!1,o=e.previousElementSibling,s=e.nextElementSibling,l=e.parentElement,c=document.querySelector("#dragOverlay");if(r.onmousedown=function(t){e.classList.contains("disabled")||(a=!0,c.style.display="block",c.style.cursor=i?"ew-resize":"ns-resize",t.preventDefault())},window.addEventListener("mousemove",function(e){var n=l.getBoundingClientRect(),r=e.clientX-n.left,o=e.clientY-n.top,s=i?n.width:n.height,c=i?r:o;a&&c>0&&c<s&&(t("next",s-c),t("prev",c),e.preventDefault(),e.stopPropagation())}),window.addEventListener("mouseup",function(e){a=!1,c.removeAttribute("style")}),r.ondblclick=function(e){t("next",1),t("prev",1)},e.id){var u=localStorage.getItem(n(e,"next")),d=localStorage.getItem(n(e,"prev"));u&&s&&(s.style.flexGrow=u),d&&o&&(o.style.flexGrow=d)}}for(var i=document.querySelectorAll(".splitter"),a=0;a<i.length;++a)r(i[a])},function(e,t,n){"use strict";function r(e){o.push(e),h.value=h.max=o.length}function i(e,t){e.failed()&&!t.succeeded&&t.pos===e.getRightmostFailurePosition()&&e.getRightmostFailures().find(function(e){return e.pexpr===t.expr&&(l[e.toKey()]=o.length,!0)})}function a(e){h.value=e;for(var t=0;t<o.length;++t){var n=o[t],r=n.el,i=t<=e;switch(n.type){case"enter":r.hidden=!i,r.classList.contains("leaf")||r.classList.add("undecided");break;case"exit":i&&r.classList.remove("undecided")}}var a=p.$(".currentParseStep");if(a)for(a.classList.remove("currentParseStep");a=p.closestElementMatching(".pexpr.should-collapse",a);)a.classList.remove("should-collapse"),m.parseTree.setTraceElementCollapsed(a,!0,0);if(e<o.length)for(a=o[e].el,a.classList.add("currentParseStep");a=p.closestElementMatching(".pexpr.collapsed",a);)a.classList.add("should-collapse"),m.parseTree.setTraceElementCollapsed(a,!1,0)}var o,s,l,c,u,d,p=n(2),m=n(1),h=p.$("#timeSlider");h.oninput=function(e){a(parseInt(e.target.value,10))},m.parseTree.addListener("render:parseTree",function(e){o=[],s={},l={},c=e.result,d=null!=c,h.disabled=!d,h.value=h.max=1}),m.parseTree.addListener("create:traceElement",function(e,t){d&&!e.classList.contains("hidden")&&(i(c,t),s[e.id]={enter:o.length},r({type:"enter",el:e,node:t,collapsed:e.classList.contains("collapsed")}))}),m.parseTree.addListener("exit:traceElement",function(e,t){d&&e.id in s&&(i(c,t),s[e.id].exit=o.length,r({type:"exit",node:t,el:e}))}),m.addListener("peek:failure",function(e){u=h.value,a(l[e.toKey()])}),m.addListener("unpeek:failure",function(){u!==-1&&(a(u),u=-1)}),m.addListener("goto:failure",function(e){a(l[e.toKey()]),u=-1,h.focus()})}]);