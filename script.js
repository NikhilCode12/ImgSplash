const accessKey = "ZSCxsOhjfxzNhuHdbMeI_Gj5R9Bnwi86jsfoJDPsTyw";

const formEl = document.querySelector('form');
const formInputEl = document.getElementById('search-input');
const searchResults = document.querySelector('.card-container');
const showMore = document.getElementById('show-more-button');

let inputData = "";
let pageNo = 1;

async function searchImages(){
    inputData = formInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${pageNo}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(pageNo === 1){
        searchResults.innerHTML = "";
    }

    results.map((result)=>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('card');
        
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        
        const imgContent = document.createElement('p');
        imgContent.classList.add('card-caption');
        imgContent.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imgContent);
        searchResults.appendChild(imageWrapper);
    })

    pageNo++;

    if(pageNo > 1){
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    pageNo = 1;
    searchImages();
})

showMore.addEventListener("click",(event)=>{
    searchImages();
})


// adding dark mode functionality

const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');

toggle.addEventListener("click",function(){
    this.classList.toggle('bi-moon-fill');

    if(this.classList.toggle('bi-brightness-high-fill')){
        this.style.color = "black";
        body.style.backgroundColor = "white";
        body.style.color = "black";
        body.style.transition = ".3s ease-in-out";
    }else{
        this.style.color = "white";
        body.style.backgroundColor = "black";
        body.style.color = "white";
        body.style.transition = ".3s ease-in-out";
    }
})