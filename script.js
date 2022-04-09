const headphones = [
    {
        type: "headphones",
        img: "./assets/img/apple_byz_s8521.png",
        title: "Apple BYZ S852I",
        price: 2927,
        rate: 4.7,
    },
    {
        type: "headphones",
        img: "./assets/img/apple_earpods_1.png",
        title: "Apple EarPods",
        price: 2327,
        rate: 4.5,
    },
    {
        type: "headphones",
        img: "./assets/img/apple_earpods_2.png",
        title: "Apple EarPod",
        price: 2327,
        rate: 4.5,
    }
]

let basketCount ;
let basketItems ;


const wrapCart = document.querySelector('.wrap-headphones');

function loadingData() {
    headphones.forEach( (card) => {
        if (card.type ===  "headphones") {
            addCard (wrapCart, card.img, card.title, card.price, card.rate);
        }
    })
}




function addCard (wrap, img, title, price, rate) {
    let card = `<div class="item-card">
                    <div class="wrap-img">
                        <img src=${img} alt="${title}">
                    </div>
                    <div class="footer-item-card">
                        <div class="wrap-footer-card-left">
                            <p class="p-date card-title">${title}</p>
                            <p class="p-date card-rate">${rate}</p>
                        </div>
                        <div class="wrap-footer-card-right">
                            <p class="p-date card-price">${price} &#8381;</p>
                            <button name="${title}" class="p-date card-buy">Купить</button>
                        </div>
                    </div>  
                </div>`;
    wrap.insertAdjacentHTML('beforeend', card);
}

const main = document.querySelector('.main');
const basket = document.querySelector('.counter-basket');


function testu(event) {
    if (event.target.classList.contains('card-buy')) {
        basket.innerHTML = `${++basketCount}`;
        if(Object.keys(basketItems).includes(`${event.target.name}`)) {      
            basketItems[event.target.name][count]++;
        }
        else {
            basketItems[event.target.name] = {'count': 1, 'price': parseInt(event.target.parentElement.childNodes[1].innerHTML, 10)};
        }
        console.log(basketItems);
    }
}

main.addEventListener('click', testu);


// local storage
function setLocalStorage() {
    localStorage.setItem('basketCount', basketCount);
    localStorage.setItem('basketItems', JSON.stringify(basketItems));
}
window.addEventListener('beforeunload', setLocalStorage)
  
function getLocalStorage() {   
    if (localStorage.getItem('basketCount')) {
        basketCount = localStorage.getItem('basketCount');
        basket.innerHTML = basketCount;
    }
    else {
        basketCount = 0;
    }

    if (localStorage.getItem('basketItems')) {
        basketItems = JSON.parse(localStorage.getItem('basketItems'));
    }
    else {
        basketItems = {};
    }
    loadingData();
}
window.addEventListener('load', getLocalStorage)