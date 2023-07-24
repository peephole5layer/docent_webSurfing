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


loadMoreBtn.onclick = () =>{
   let boxes = [...document.querySelectorAll('.post-box')];
   for (var i = currentItem; i < currentItem + 4 && i<boxes.length; i++){
      boxes[i].style.display = 'flex';
      boxes[i].style.flexDirection= 'column';
      boxes[i].style.justifyContent = 'space-between';
      boxes[i].style.marginBottom = '35px';
      boxes[i].style.marginLeft = '25px';
   };
   currentItem += 4;
   if(currentItem >= boxes.length){
      loadMoreBtn.style.display = 'none';
      
   }
}
