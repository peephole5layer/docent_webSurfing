console.log("hello i am footer dudj");

let footer = document.querySelector('.footer');
let bgUrl = footer.getAttribute('data-backgroundUrl');



footer.style.background = `url(${bgUrl}) no-repeat`;
footer.style.backgroundSize= "cover";
    
footer.style.backgroundPositionX= "center";
footer.style.backgroundPositionY= "bottom";
  