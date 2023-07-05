// import {base64url} from 'base64url';
// /Users/bhave/webDev/docent/docent_webSurfing/node_modules/base64url/dist/base64url

{

window.addEventListener('load',function(){

    let blackList = function(){
        let blackListForm = $('#blacklist-link-form');

        blackListForm.submit(async function(e){


            const url = $(this).attr('action');

            const i = url.lastIndexOf("/challenge");

            const nextUrl = url.slice(0,i);

            console.log(nextUrl+"/////bc");

            // console.log(url);

            e.preventDefault();


            return fetch(''+url, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json'
                }
              })
              .then(function(response) {
                console.log(response);
             
                return response.json();
              })
              .then(function(json) {
                return navigator.credentials.get({
                  publicKey: {
                    challenge: base64url.decode(json.challenge),
                    allowCredentials: [
                     { type: 'public-key',id:  base64url.decode('VjXl8fuJXIAqLg-BVrR5oeLLfee6gBGKXdMxo6xtMySugJfU2HNvTJk84T1DgFYtJDpDrwL2Bg_QM4xQwVAutA') },
                     { type: 'public-key', id: base64url.decode('noMuGuaaVLubAVjuS6Z2BYrrBpajYhtjnFgvSjk0IV1LJeVrupbpnw') }
                    ]
                  }
                });
              })
              .then(function(credential) {
                var body = {
                  id: credential.id,
                  response: {
                    clientDataJSON: encode(credential.response.clientDataJSON),
                    authenticatorData: encode(credential.response.authenticatorData),
                    signature: encode(credential.response.signature),
                    userHandle: credential.response.userHandle ? encode(credential.response.userHandle) : null
                  }
                };
                if (credential.authenticatorAttachment) {
                  body.authenticatorAttachment = credential.authenticatorAttachment;
                }
                
                return fetch(''+nextUrl, {
                  method: 'POST',
                 
                });
              })
              .then(function(response) {
                return response.json();
              })
              .then(function(json) {
                window.location.href = json.location;
              })
              .catch(function(error) {
                console.log(error);
              });
          

            let adhaar = document.getElementById('adhaar');
            let illegal = document.getElementById('illegal');
            let webAddress = document.getElementById('web-address'); 
            adhaar.value = '';
            illegal.value = '';
            webAddress.value = '';

        });       
        
    }

    blackList();

});
   
   
}

















// {
//     let blackList = function(){
//         let blackListForm = $('#blacklist-link-form');

//         blackListForm.submit(function(e){

//             e.preventDefault();
//             $.ajax({

//                 type:'post',     
//                 url: $(this).attr('action'),
//                 data: blackListForm.serialize(),
                
//                 success: function(data){

//                     let type;
//                     if(data.message=='URL Reported!'){
//                         type = 'success';
//                     }else{
//                         type = 'error';
//                     }

//                     new Noty({
//                         theme:'relax',
//                         text:data.message,
//                         type: type,
//                         layout:'topRight',
//                         timeout : 1500
//                     }).show();
                  
//                     console.log('ajax operation succesfull');   
                    
//                 },error:function(error){
//                     console.log(error.responseText);
//                 }
        
//             }); 
//             let adhaar = document.getElementById('adhaar');
//             let illegal = document.getElementById('illegal');
//             let webAddress = document.getElementById('web-address'); 
//             adhaar.value = '';
//             illegal.value = '';
//             webAddress.value = '';

//         });       
        
//     }

//     blackList();
// }



