let boxes=[...document.querySelectorAll(".reports")],x=21;for(let e=0;e<x&&e<boxes.length;e++)boxes[e].style.display="inline-block";let nextBtn=document.querySelector("#next"),prevBtn=document.querySelector("#prev");boxes.length<=9&&(nextBtn.style.display="none");let nextCurrentItem=x,prevCurrentItem=1;function reallySure(e){action=!!confirm(" Remove this URL ? ")||e.preventDefault()}function actionToFunction(e){"true"==e.target.getAttribute("data-removeLink")&&reallySure(e)}console.log(nextBtn),nextBtn.onclick=()=>{console.log("hi"),prevBtn.style.display="block";for(let e=nextCurrentItem-x;e<=nextCurrentItem&&e<boxes.length;e++)boxes[e].style.display="none";for(let e=nextCurrentItem;e<nextCurrentItem+x&&e<boxes.length;e++)boxes[e].style.display="inline-block";prevCurrentItem=nextCurrentItem,nextCurrentItem+=x,window.scrollTo(0,0),nextCurrentItem>=boxes.length&&(nextBtn.style.display="none")},prevBtn.onclick=()=>{nextBtn.style.display="block";for(let e=prevCurrentItem;e<=nextCurrentItem&&e<boxes.length;e++)boxes[e].style.display="none";for(let e=prevCurrentItem-x;e<prevCurrentItem&&e<boxes.length;e++)boxes[e].style.display="inline-block";nextCurrentItem=prevCurrentItem,prevCurrentItem-=x,prevCurrentItem<=0&&(prevBtn.style.display="none"),window.scrollTo(0,0)},document.body.addEventListener("click",actionToFunction);