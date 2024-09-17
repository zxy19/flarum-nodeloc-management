(()=>{var t={n:n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},d:(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},o:(t,n)=>Object.prototype.hasOwnProperty.call(t,n),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},n={};(()=>{"use strict";t.r(n),t.d(n,{extend:()=>l});const e=flarum.core.compat["common/extenders"];var o=t.n(e);function a(t,n){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,n){return t.__proto__=n,t},a(t,n)}function r(t,n){t.prototype=Object.create(n.prototype),t.prototype.constructor=t,a(t,n)}const i=flarum.core.compat["common/Model"];var s=t.n(i),c=function(t){function n(){for(var n,e=arguments.length,o=new Array(e),a=0;a<e;a++)o[a]=arguments[a];return(n=t.call.apply(t,[this].concat(o))||this).content=s().attribute("content"),n.createdAt=s().attribute("createdAt"),n.user_id=s().attribute("user_id"),n.from_user_id=s().attribute("from_user_id"),n.from_user=s().hasOne("from_user"),n}return r(n,t),n}(s());c.TYPE="nodeloc-manage-notes";const l=[(new(o().Store)).add(c.TYPE,c)],u=flarum.core.compat["admin/app"];var p=t.n(u);const d=flarum.core.compat["admin/components/ExtensionPage"];var f=t.n(d);const h=flarum.core.compat["common/components/Button"];var g=t.n(h);const b=flarum.core.compat["common/components/Select"];var y=t.n(b);function v(t,n){var e=p().translator.trans("nodeloc-nodeloc-management.admin."+t,n);return Array.isArray(e)?e.join(""):e}var _=function(t){function n(){for(var n,e=arguments.length,o=new Array(e),a=0;a<e;a++)o[a]=arguments[a];return(n=t.call.apply(t,[this].concat(o))||this).snippets=void 0,n.snippetsData=[],n.blackholeId=void 0,n.tagOptions={},n}r(n,t);var e=n.prototype;return e.oninit=function(n){var e=this;t.prototype.oninit.call(this,n),this.snippets=this.setting("nodeloc_management.snippet"),this.blackholeId=this.setting("nodeloc_management.blackholeId");var o=JSON.parse(this.snippets()||"{}");Object.keys(o).forEach((function(t){e.snippetsData.push({name:t,data:o[t]})})),p().store.all("tags").forEach((function(t){e.tagOptions[t.id()]=t.name()}))},e.oncreate=function(n){t.prototype.oncreate.call(this,n)},e.content=function(t){var n=this;return m("div",{className:"nodeloc-management-adminPage-container container"},m("h2",null,v("snippet")),m("table",{className:"Table Table--full"},m("thead",null,m("tr",null,m("th",null,v("snippet_key")),m("th",null,v("snippet_content")),m("th",null))),m("tbody",null,this.snippetsData.map((function(t,e){return m("tr",{key:e},m("td",null,m("input",{className:"FormControl",type:"text",value:t.name,onchange:function(t){n.snippetsData[e].name=t.target.value,n.storeSetting()}.bind(n)})),m("td",null,m("input",{className:"FormControl",type:"text",value:t.data,onchange:function(t){n.snippetsData[e].data=t.target.value,n.storeSetting()}.bind(n)})),m("td",null,m(g(),{onclick:function(){confirm(v("confirm"))&&n.snippetsData.splice(e,1),m.redraw()}.bind(n)},m("i",{className:"fas fa-trash"}))))})),m("tr",null,m("td",null,m(g(),{className:"Button Button--secondary",onclick:this.addRow.bind(this)},v("addRow")))))),m("div",null,m("h2",null,v("blackhole")),m(y(),{options:this.tagOptions,onchange:function(t){return n.blackholeId(t)}.bind(this),value:this.blackholeId()})),m("br",null),this.submitButton())},e.addRow=function(){this.snippetsData.push({name:"",data:""})},e.storeSetting=function(){var t={};this.snippetsData.forEach((function(n){t[n.name]=n.data})),this.snippets(JSON.stringify(t))},n}(f());p().initializers.add("nodeloc/nodeloc-management",(function(){p().extensionData.for("nodeloc-nodeloc-management").registerPage(_).registerPermission({icon:"fas fa-eye-slash",label:p().translator.trans("nodeloc-nodeloc-management.admin.can_use_management"),permission:"manage_nodeloc"},"view")}))})(),module.exports=n})();
//# sourceMappingURL=admin.js.map