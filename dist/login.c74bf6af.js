var byId=function(e){return document.getElementById(e)};function checkOverflowText(){function e(e){var a=document.createElement("marquee"),t=e.innerText;a.innerText=t,e.innerHTML="",e.appendChild(a)}var a,t,n,o=document.getElementsByClassName("overmarquee");for(let d=0;d<o.length&&(console.log(o[d]),o[d]);d++)a=o[d],t=void 0,n=void 0,t=a.offsetWidth<a.scrollWidth,n=a.offsetHeight<a.scrollHeight,console.log(t+"+"+n),(t||n)&&e(o[d])}function update_user_details(){UID=store.get("motap_user_data").UID;var e=new URLSearchParams;e.append("UID",UID),axios.post("./api/user_details.php",e).then((function(e){store.set("motap_user_data",{UID:e.data.UID,WIN_WALLET:e.data.WIN_WALLET,DEP_WALLET:e.data.DEP_WALLET,COUNTRY_CODE:e.data.COUNTRY_CODE,EMAIL:e.data.EMAIL,MOB_NUMBER:e.data.MOB_NUMBER,OW_ID:e.data.OW_ID,USERNAME:e.data.USERNAME})})).catch((function(e){console.log(e)}))}function update_l_o_dat(){UID=store.get("motap_user_data").UID;var e=new URLSearchParams;e.append("UID",UID),axios.post("./api/last_online.php",e).then((function(e){console.log(e.data)})).catch((function(e){console.log(e)}))}function login_check(){store.get("motap_user_data")||location.replace("./logout.php")}function logOut(){store.remove("motap_user_data"),location.replace("./login.php")}function d_none(e,a){1==a&&e.classList.add("d-none"),0==a&&e.classList.remove("d-none")}function bootstrapAlert(e,a,t,n){e.innerHTML=`<div class="alert alert-${t}" role="alert">\n        ${a}\n      </div>`;setTimeout((()=>{e.innerHTML=""}),1e3*n)}function btn_loading(e,a,t){btn_id=e.id,1==t&&(e.disabled=!0,old_data=e.innerHTML,e.innerHTML=`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>\n        ${a}\n        <span id='${btn_id+"old_data"}' class='d-none'>${old_data}</span>`),0==t&&(e.disabled=!1,old_data_div=byId(btn_id+"old_data"),old_data=old_data_div.innerHTML,e.innerHTML=`${old_data}`)}
//# sourceMappingURL=login.c74bf6af.js.map