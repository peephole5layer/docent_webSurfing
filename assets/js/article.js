const API_KEY = "6f2509490274d40018fe286d26af241f";

const url = "https://gnews.io/api/v4/search?q="


const cardsContainer = document.getElementById("cards-container");
const showContent = cardsContainer.getAttribute("data-showcontent");

if(showContent=="search"){

    window.addEventListener("load",()=> fetchNews("Technology India"));

    const searchButton = document.getElementById("search-button");
    const searchBar = document.getElementById("search-bar");

    searchButton.addEventListener("click", () => {

        const query = searchBar.value;
        if (!query) return;
        fetchNews(query);
        curSelectedNav?.classList.remove("active");
        curSelectedNav = null;
    });

}else{
    window.addEventListener("load", () => fetchNews(showContent));
}


















function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    console.log(query);
    console.log(`${url}${query}&lang=en&max=10&apiKey=${API_KEY}`);
    const res = await fetch(`${url}${query}&lang=en&max=9&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
       
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.image;
    console.log(newsImg.res);
    console.log("image : ",article.image);
    
    let title = article.title;
    newsTitle.innerHTML = title.slice(0,71) +"...";



    newsDesc.innerHTML = article.description.slice(0,215)+"...";

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}


let loadMoreBtn = document.querySelector('.custom-btn');
let currentItem = 6;

loadMoreBtn.onclick = () =>{
    let boxes = document.querySelectorAll('.cards-container .card');
    console.log(boxes);
    for(var i = currentItem; i<currentItem + 6 && i<boxes.length; i++){
        boxes[i].style.display = 'block';
    }

    currentItem += 6;

    if(currentItem >=boxes.length){
        loadMoreBtn.style.display = 'none';
    }
}










