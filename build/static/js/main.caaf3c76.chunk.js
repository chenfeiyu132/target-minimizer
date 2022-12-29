(this["webpackJsonptarget-tinimizer"]=this["webpackJsonptarget-tinimizer"]||[]).push([[0],[,,,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var c=n(0),s=n.n(c),i=n(3),a=n.n(i),r=(n(16),n(7)),o=n.n(r),l=n(2),u=(n(17),n(8)),h=n(1),d=function(e){var t=e.item;return Object(h.jsxs)("div",{className:"item",children:[Object(h.jsx)("img",{src:t.image_url,alt:"item"}),Object(h.jsxs)("div",{className:"item-container",children:[Object(h.jsx)("h3",{children:u.Html5Entities.decode(t.name)}),Object(h.jsxs)("p",{children:["TCIN: ",t.tcin]}),Object(h.jsxs)("p",{children:["Price: $",t.min_cost]}),Object(h.jsxs)("p",{children:["Sample Cheapest Store(s): ",t.min_stores.name.slice(0,3).map((function(e,n){return"".concat(e,"(").concat(t.min_stores.id[n],")")})).join(" and ")]})]})]})},j=(n(22),function(e){var t=e.handleSubmit,n=e.handleRandom,c=e.searchQuery,s=e.setSearchQuery;return Object(h.jsxs)("form",{id:"search-bar",onSubmit:t,children:[Object(h.jsx)("label",{htmlFor:"header-search",children:Object(h.jsx)("span",{className:"visually-hidden",children:"Search Item"})}),Object(h.jsx)("input",{type:"text",class:"input",placeholder:"Search TCIN",name:"s",value:c,onInput:function(e){return s(e.target.value)}}),Object(h.jsxs)("div",{className:"button-group",children:[Object(h.jsx)("button",{id:"search-button",class:"primary button",type:"submit",children:"Search"}),Object(h.jsx)("button",{id:"random-button",class:"secondary button",onClick:n,children:"Feeling Random"})]})]})}),m=(n(23),n.p+"static/media/exit.6f2349ca.svg"),b=n(30),f=function(e){var t=e.show,n=e.close,c=e.children,s=e.title;return a.a.createPortal(Object(h.jsx)(b.a,{in:t,unmountOnExit:!0,timeout:{enter:0,exit:300},children:Object(h.jsx)("div",{className:"modal",onClick:function(){return n()},children:Object(h.jsxs)("div",{className:"modal-content",onClick:function(e){return e.stopPropagation()},children:[Object(h.jsxs)("div",{className:"modal-header",children:[Object(h.jsx)("h4",{className:"modal-title",children:s}),Object(h.jsx)("button",{className:"close",onClick:function(){return n()},children:Object(h.jsx)("img",{src:m,alt:"close"})})]}),Object(h.jsxs)("div",{className:"modal-body",children:[" ",c," "]})]})})}),document.getElementById("root"))},O=(n(24),function(e){var t=e.children;return Object(h.jsx)("div",{className:"card",children:Object(h.jsx)("div",{className:"card-container",children:t})})}),p=(n(25),function(){return Object(h.jsxs)("div",{className:"info-wrapper",children:[Object(h.jsx)("p",{children:"The search tool essentially gives you the target store locations which provides the cheapest items of your choosing"}),Object(h.jsx)("p",{children:"Now you might be wondering...How on earth would that be useful? Well, let me tell you a little saving trick that Target doesn't want you to know."}),Object(h.jsx)("p",{children:"When you checkout online, Target uses the home store you set to calculate the price of the items in your cart. However, you can choose to pick up the items wherever you desire. Thus, you can set the cheapest store for your items as your home store and pick up the items at your actual store."}),Object(h.jsx)("p",{children:"For example, you could set your homestore on the top left corner to be Bowling Green, KY(which has eggs going for .69 cents), and set the pick up location to be Champaign Campus Town, IL(which has eggs for 1.39). Boom, you just saved 70 cents per carton of eggs. You can do this on hundreds of items at Target(however not all), there's usually price discrepencies for common every items like eggs and milk."})]})}),x=(n(26),function(e){var t=e.items;return Object(h.jsx)("div",{className:"column-grid",children:t.map((function(e){return Object(h.jsx)(O,{children:e})}))})}),g=n.p+"static/media/target.d4dd655f.svg";n(27);var v=function(){var e=Object(c.useState)(""),t=Object(l.a)(e,2),n=t[0],s=t[1],i=Object(c.useState)([]),a=Object(l.a)(i,2),r=a[0],o=a[1],u=Object(c.useState)(!1),m=Object(l.a)(u,2),b=m[0],O=m[1],v=Object(c.useState)(null),y=Object(l.a)(v,2),N=y[0],w=y[1],S=Object(c.useState)(Object(h.jsx)("p",{class:"text",children:"Please begin your search"})),k=Object(l.a)(S,2),C=k[0],I=k[1],T=function(e){var t=Object(c.useState)(e),n=Object(l.a)(t,2),s=n[0],i=n[1];return{value:s,setValue:i,reset:function(){return i(e)},bind:{value:s,onChange:function(e){i(e.target.value)}}}}(""),F=T.value,P=T.setValue,H=T.reset,B=Object(c.useRef)(null),D=function(){return e=B,window.scrollTo({top:e.current.offsetTop,behavior:"smooth"});var e};return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsx)("header",{className:"header",children:Object(h.jsxs)("div",{className:"content",children:[Object(h.jsx)("img",{src:g,className:"logo",alt:"logo"}),Object(h.jsx)("div",{className:"search",children:Object(h.jsx)(j,{handleSubmit:function(e){e.preventDefault();var t,n="/item";8===(t=F).length&&/^\d+$/.test(t)?(n+="/".concat(F),fetch(n).then((function(e){return e.json()})).then((function(e){!function(e){if(s("Item Details"),e.success){var t=e.result;I(Object(h.jsx)(d,{item:t})),O(!0),w(null)}else w(e.message)}(e)}))):(n+="/search?query=".concat(F),fetch(n).then((function(e){return e.json()})).then((function(e){!function(e){if(e.success){var t=e.result;o(t.map((function(e){return Object(h.jsx)(d,{item:e})}))),D()}}(e)}))),H()},handleRandom:function(e){e.preventDefault();fetch("/item/random").then((function(e){return e.json()})).then((function(e){if(w(null),e.success){s("Item Details");var t=e.result;I(Object(h.jsx)(d,{item:t})),O(!0)}else alert(e.message)}))},searchQuery:F,setSearchQuery:P})}),Object(h.jsx)("span",{style:{visibility:N?"visible":"hidden"},children:N||"Please begin your search"})]})}),Object(h.jsxs)("div",{className:"body",children:[Object(h.jsx)(f,{title:n,show:b,close:function(){O(!1)},children:C}),Object(h.jsx)("div",{ref:B,className:"search-items",children:Object(h.jsx)(x,{items:r})})]}),Object(h.jsx)("div",{className:"footer",children:Object(h.jsxs)("div",{id:"tribute",className:"text-center",children:[Object(h.jsxs)("span",{className:"small highlight",id:"help-trigger",onClick:function(){s("Help"),I(Object(h.jsx)(p,{})),O(!0)},"data-content":"How do I use this?",children:["How do I use this",Object(h.jsx)("span",{style:{visibility:"hidden",fontWeight:"bolder"},children:"?"})]}),Object(h.jsx)("span",{className:"space",children:" | "}),Object(h.jsxs)("span",{className:"small",children:["Fun gadget by\xa0",Object(h.jsx)("a",{id:"name",className:"highlight",href:"https://feiyuwong.codes","data-content":"Feiyu Wong",children:"Feiyu Wong"})]})]})})]})},y=n(9);var N=function(){return Object(h.jsx)(y.a,{children:Object(h.jsx)(v,{})})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,31)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),s(e),i(e),a(e)}))};o.a.polyfill(),a.a.render(Object(h.jsx)(s.a.StrictMode,{children:Object(h.jsx)(N,{})}),document.getElementById("root")),w()}],[[28,1,2]]]);
//# sourceMappingURL=main.caaf3c76.chunk.js.map