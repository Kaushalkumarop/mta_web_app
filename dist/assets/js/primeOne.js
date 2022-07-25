
// short hand for get element by id
var byId = function( id ) { return document.getElementById( id ); };





function checkOverflowText(){
    function isElementOverflowing(element) {

        var overflowX = element.offsetWidth < element.scrollWidth,
            overflowY = element.offsetHeight < element.scrollHeight;
        console.log(overflowX + '+' + overflowY)
        return (overflowX || overflowY);
    }
    
    function wrapContentsInMarquee(element) {
    
        var marquee = document.createElement('marquee'),
            contents = element.innerText;
    
        marquee.innerText = contents;
        element.innerHTML = '';
        element.appendChild(marquee);
    }
    
    var element = document.getElementsByClassName('overmarquee');
    
  

    
    for (let i = 0; i < element.length; i++) {
        // element = element[i];
        console.log(element[i]);
        if(!element[i]){
            break;
         
        }
          if (isElementOverflowing(element[i])) {
              wrapContentsInMarquee(element[i]);
      
          }
        
    
      }
    
}
// checkOverflowText()

// update user details function

function update_user_details() {

    UID = store.get('motap_user_data').UID;
    // console.log(UID)
    // api call to update user details
    var bodyFormData = new URLSearchParams();
        bodyFormData.append('UID', UID);
        // bodyFormData.append('password_v', password_v);
        axios.post('./api/user_details.php', bodyFormData)
            .then(function(response) {
                // console.log(response.data);
                // console.log(response.data.EMAIL);
          
                store.set('motap_user_data', {
                    UID: response.data.UID,
                        WIN_WALLET: response.data.WIN_WALLET,
                        DEP_WALLET: response.data.DEP_WALLET,
                        COUNTRY_CODE: response.data.COUNTRY_CODE,
                        EMAIL: response.data.EMAIL,
                        MOB_NUMBER: response.data.MOB_NUMBER,
                        OW_ID: response.data.OW_ID,
                        USERNAME: response.data.USERNAME,
                        
                    })

                    // console.log(store.get('motap_user_data'))


            })
            .catch(function(error) {
                console.log(error);
            });

}

function update_l_o_dat(){
    UID = store.get('motap_user_data').UID;
    // console.log(UID)
    // api call to update user details
    var bodyFormData = new URLSearchParams();
        bodyFormData.append('UID', UID);
        axios.post('./api/last_online.php', bodyFormData)
        .then(function(response) {
            console.log(response.data);
      


        })
        .catch(function(error) {
            console.log(error);
        });
}

// check login
function login_check(){
    if (!(store.get('motap_user_data'))) {
        // moving towards play page 
        location.replace('./logout.php')

    }
}

// logout function

function logOut() {
    store.remove('motap_user_data')
    location.replace('./login.php')
}

function d_none(div_id, status) {

    if (status == true) {
        div_id.classList.add('d-none')
    }
    if (status == false) {
        div_id.classList.remove('d-none')
    }

}

function bootstrapAlert(div_id, msg, type, seconds) {


    div_id.innerHTML = `<div class="alert alert-${type}" role="alert">
        ${msg}
      </div>`


    const myTimeout = setTimeout(() => {
        div_id.innerHTML = ''
    }, seconds * 1000);

}

function btn_loading(btn,msg,status){
    
    btn_id=btn.id
    if(status==true){
        btn.disabled=true;
        old_data=btn.innerHTML
        btn.innerHTML=`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        ${msg}
        <span id='${btn_id+'old_data'}' class='d-none'>${old_data}</span>`
    }
    if(status==false){
        btn.disabled=false;
        old_data_div=byId(btn_id+'old_data')
        old_data=old_data_div.innerHTML
        btn.innerHTML=`${old_data}`
    }
    
    
}