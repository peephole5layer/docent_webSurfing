// // nav background
// let header = document.querySelector("header");

// window.addEventListener("scroll", () => {
//     header.classList.toggle("shadow", window.scrollY > 0)
// })

// //Filter
// $(document).ready(function () {
//     $(".filter-item").click(function () {
//         const value = $(this).attr("data-filter");
//         if (value == "all"){
//             $(".post-box").show("1000")
//         } else{
//             $(".post-box")
//                 .not("." + value)
//                 .hide(1000);
//             $(".post-box")
//             .filter("." + value)
//             .show("1000")
//         }
//     });
//     $(".filter-item").click(function () {
//         $(this).addClass("active-filter").siblings().removeClass("active-filter")
//     });
// });



let loadMoreBtn = document.querySelector('.custom-btn');
let currentItem = 4;


loadMoreBtn.onclick = () => {
   let boxes = [...document.querySelectorAll('.post-box')];
   for (var i = currentItem; i < currentItem + 4 && i < boxes.length; i++) {
      boxes[i].style.display = 'flex';
      boxes[i].style.flexDirection = 'column';
      boxes[i].style.justifyContent = 'space-between';
      boxes[i].style.marginBottom = '35px';
      boxes[i].style.marginLeft = '25px';
   };
   currentItem += 4;
   if (currentItem >= boxes.length) {
      loadMoreBtn.style.display = 'none';

   }
}


let createBlog = document.getElementById('blog-btn');
let addBlogForm = document.getElementById('add-blog-form');
let blogPageHeader = document.querySelector('#blogs-page-header h1');
// let blogSubmit = document.getElementById("blog-submit-btn");
const user = createBlog.getAttribute('data-user');


createBlog.onclick = () => {

   if (user == "") {

      const msg = document.getElementById('login-message');
      setTimeout(function(){
         msg.style.display = "none";

     },7000);

     msg.style.display= "block";


   } else {

      
      document.getElementById('create-blog-btn-container').style.display="none";
      addBlogForm.style.display = "flex";
      blogPageHeader.style.marginTop = "100px";

   }


}

// blogSubmit.onclick = () => {

// }


let blogSubmit = function () {
   let blogForm = $('#blog-form');

   blogForm.submit(function (e) {

      e.preventDefault();

      let form = $('#blog-form')[0];
      console.log(form);

      let formData = new FormData(form);
   
   




      console.log(formData);




      // console.log("hiill    ",formData.get('coverImage'));


      $.ajax({

         type: 'post',
         url: $(this).attr('action'),
         data: blogForm.serialize(),
         // data:formData,
         // contentType:false,
         // processData : false,
      

         success: function (data) {

            // let type;
            // if (data.message == 'URL Reported!') {
            //    type = 'success';
            // } else {
            //    type = 'error';
            // }

            // new Noty({
            //    theme: 'relax',
            //    text: data.message,
            //    type: type,
            //    layout: 'topRight',
            //    timeout: 1500
            // }).show();

            const blogCreated = document.getElementById('blog-created');
            blogCreated.style.display = "block";
            blogCreated.style.marginTop = "-150px";

            console.log('ajax operation succesfull');

         }, error: function (error) {
            console.log(error.responseText);
         }

      });
      // let adhaar = document.getElementById('adhaar');
      // let illegal = document.getElementById('illegal');
      // let webAddress = document.getElementById('web-address');
      // adhaar.value = '';
      // illegal.value = '';
      // webAddress.value = '';

      addBlogForm.style.display = "none";
      blogPageHeader.style.marginTop = "-145px";


   });

}

blogSubmit();





function reallySure (event) {
   var message = ' Remove this Blog ? ';
   action = confirm(message) ? true : event.preventDefault();
}

function actionToFunction (event) {

   if(event.target.getAttribute('data-removeBlog')=='true'){
       reallySure(event);

   }
}

document.body.addEventListener('click', actionToFunction);











