
let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');

let showNavBar = false;
console.log(toggle);

toggle.onclick = ()=>{

    showNavBar = !showNavBar;

    console.log(navigation);

    if(showNavBar){
        navigation.style.display = 'inline-block';
        toggle.style.color = 'white';
    }else{
        navigation.style.display = 'none';
        toggle.style.color = 'black';
    }

}