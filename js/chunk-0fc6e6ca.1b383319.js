(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0fc6e6ca"],{1902:function(e,t,a){},c6b9:function(e,t,a){"use strict";a("1902")},c766:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[e.isLoading?a("Spinner"):e._e(),a("div",{staticClass:"account-container"},[a("div",{staticClass:"account-setting"},[e._m(0),a("div",{staticClass:"form-part"},[a("form",{staticClass:"form-login",attrs:{novalidate:""},on:{submit:function(t){return t.stopPropagation(),t.preventDefault(),e.handleSubmit(e.currentUser.id)}}},[a("div",{staticClass:"form-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.account,expression:"account"}],staticClass:"form-input",class:{"is-valid":e.accountError},attrs:{type:"text",placeholder:"帳號",autocomplete:"account",autofocus:""},domProps:{value:e.account},on:{keyup:e.accountErrorMsg,input:function(t){t.target.composing||(e.account=t.target.value)}}}),a("div",{staticClass:"warning-group"},[a("span",{directives:[{name:"show",rawName:"v-show",value:e.accountError,expression:"accountError"}],staticClass:"invalid-feedback"},[e._v("字數超出上限！")]),a("span",{staticClass:"text-number"},[e._v(e._s(e.accountRemaining)+"/20")])])]),a("div",{staticClass:"form-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"form-input",class:{"is-valid":e.nameError},attrs:{type:"text",placeholder:"名稱",autocomplete:"username"},domProps:{value:e.name},on:{keyup:e.nameErrorMsg,input:function(t){t.target.composing||(e.name=t.target.value)}}}),a("div",{staticClass:"warning-group"},[a("span",{directives:[{name:"show",rawName:"v-show",value:e.nameError,expression:"nameError"}],staticClass:"invalid-feedback"},[e._v("字數超出上限！")]),a("span",{staticClass:"text-number"},[e._v(e._s(e.nameRemaining)+"/50")])])]),a("div",{staticClass:"form-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"form-input",attrs:{type:"email",placeholder:"Email",autocomplete:"email"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}})]),a("div",{staticClass:"form-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"form-input",attrs:{type:"password",placeholder:"密碼",autocomplete:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),a("div",{staticClass:"form-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.checkPassword,expression:"checkPassword"}],staticClass:"form-input",attrs:{type:"password",placeholder:"密碼確認",autocomplete:"password"},domProps:{value:e.checkPassword},on:{input:function(t){t.target.composing||(e.checkPassword=t.target.value)}}})]),a("button",{attrs:{type:"submit",disabled:e.isProcessing}},[e._v(" "+e._s(e.isProcessing?"儲存中":"儲存")+" ")])])])])])],1)},n=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"account-title"},[a("p",[e._v("帳號設定")])])}],s=a("1da1"),i=a("5530"),o=(a("96cf"),a("b0c0"),a("498a"),a("4cce")),c=a("2375"),u=a("2fa3"),l=a("2f62"),m={components:{Spinner:c["a"]},data:function(){return{currentPage:"setting",id:"",account:"",name:"",email:"",password:"",checkPassword:"",accountError:!1,nameError:!1,isProcessing:!1,isLoading:!0}},computed:Object(i["a"])(Object(i["a"])({},Object(l["b"])(["currentUser"])),{},{accountRemaining:function(){return this.account.length},nameRemaining:function(){return this.name.length}}),created:function(){var e=this.$route.params.id;this.fetchUserData(e)},beforeRouteUpdate:function(e,t,a){var r=e.params.id;this.fetchUserData(r),a()},methods:{fetchUserData:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r,n,s,i,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.isLoading=!0,a.prev=1,a.next=4,o["a"].getCurrentUser({id:e});case 4:r=a.sent,n=r.data,s=n.account,i=n.name,c=n.email,t.id=e,t.account=s,t.name=i,t.email=c,t.isLoading=!1,a.next=19;break;case 14:a.prev=14,a.t0=a["catch"](1),t.isLoading=!1,console.log("error",a.t0),u["a"].fire({icon:"error",title:"無法取得使用者資料，請稍後再試"});case 19:case"end":return a.stop()}}),a,null,[[1,14]])})))()},handleSubmit:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r,n,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(t.isProcessing=!0,a.prev=1,!(t.account.trim().length<1||t.name.trim().length<1||t.account.trim().length<1||t.email.trim().length<1||t.password.trim().length<1||t.checkPassword.trim().length<1)){a.next=6;break}return u["a"].fire({icon:"warning",title:"欄位不可留白"}),t.isProcessing=!1,a.abrupt("return");case 6:if(!(t.account.length>20)){a.next=10;break}return u["a"].fire({icon:"warning",title:"帳號限定字數20字數內"}),t.isProcessing=!1,a.abrupt("return");case 10:if(!(t.name.length>50)){a.next=14;break}return u["a"].fire({icon:"warning",title:"名稱限定字數50個字內"}),t.isProcessing=!1,a.abrupt("return");case 14:if(t.account&&t.name&&t.email){a.next=18;break}return u["a"].fire({icon:"warning",title:"請確認所有欄位"}),t.isProcessing=!1,a.abrupt("return");case 18:if(t.password===t.checkPassword){a.next=22;break}return u["a"].fire({icon:"warning",title:"密碼與確認密碼不符"}),t.isProcessing=!1,a.abrupt("return");case 22:return t.isProcessing=!0,r={account:t.account,name:t.name,email:t.email,password:t.password,checkPassword:t.checkPassword},a.next=26,o["a"].updateUserAccont({formData:r});case 26:if(n=a.sent,s=n.data,console.log(n),console.log(s),"success"===s.status){a.next=33;break}throw u["a"].fire({icon:"error",title:s.message}),new Error(s.message);case 33:u["a"].fire({icon:"success",title:"儲存完成"}),t.$router.push({name:"user",params:{id:e}}),t.isProcessing=!1,a.next=42;break;case 38:a.prev=38,a.t0=a["catch"](1),console.log("error",a.t0),t.isProcessing=!1;case 42:case"end":return a.stop()}}),a,null,[[1,38]])})))()},accountErrorMsg:function(){var e=this.account;e.length>20?this.accountError=!0:e.length<21&&(this.accountError=!1)},nameErrorMsg:function(){var e=this.name;e.length>50?this.nameError=!0:e.length<51&&(this.nameError=!1)}}},p=m,d=(a("c6b9"),a("2877")),g=Object(d["a"])(p,r,n,!1,null,"3f7e6459",null);t["default"]=g.exports}}]);
//# sourceMappingURL=chunk-0fc6e6ca.1b383319.js.map