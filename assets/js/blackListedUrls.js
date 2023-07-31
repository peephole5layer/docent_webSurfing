let boxes = [...document.querySelectorAll('.reports')];

let x = 21;

for(let i=0; i<x; i++){
    boxes[i].style.display = 'inline-block';
}

let nextBtn = document.querySelector('#next');
let prevBtn = document.querySelector('#prev');





let nextCurrentItem = x;
let prevCurrentItem = 1;


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










