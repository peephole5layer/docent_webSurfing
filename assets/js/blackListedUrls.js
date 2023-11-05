let boxes = [...document.querySelectorAll('.reports')];

let x = 24;

for(let i=0; i<x &&i<boxes.length; i++){
    boxes[i].style.display = 'inline-block';
}


let nextBtn = document.querySelector('#next');
let prevBtn = document.querySelector('#prev');



if(boxes.length<=9){
    nextBtn.style.display = 'none';
    
}





let nextCurrentItem = x;
let prevCurrentItem = 1;

console.log(nextBtn);


nextBtn.onclick = () => {
  console.log('hi');

  prevBtn.style.display = 'block';
  

  for(let i = nextCurrentItem-x; i<=nextCurrentItem && i<boxes.length;i++){
    boxes[i].style.display = 'none';
  }
  for (let i = nextCurrentItem; i < nextCurrentItem + x && i < boxes.length; i++) {
      boxes[i].style.display = 'inline-block';
  };
  prevCurrentItem = nextCurrentItem;
  nextCurrentItem += x;
  window.scrollTo(0,0);
  if (nextCurrentItem >= boxes.length) {
      nextBtn.style.display = 'none';

  }
}

prevBtn.onclick = ()=>{

    nextBtn.style.display = "block";

        
    for(let i = prevCurrentItem; i<=nextCurrentItem && i<boxes.length ;i++){
        boxes[i].style.display = 'none';
    }
    for (let i = prevCurrentItem-x; i<prevCurrentItem && i < boxes.length; i++) {
        boxes[i].style.display = 'inline-block';
    };
    nextCurrentItem = prevCurrentItem;
    prevCurrentItem = prevCurrentItem-x;

 
    if (prevCurrentItem <= 0) {
        prevBtn.style.display = 'none';

    }

    window.scrollTo(0,0);

}


function reallySure (event) {
    var message = ' Remove this URL ? ';
    action = confirm(message) ? true : event.preventDefault();
}

function actionToFunction (event) {

    if(event.target.getAttribute('data-removeLink')=='true'){
        reallySure(event);

    }
}

document.body.addEventListener('click', actionToFunction);










