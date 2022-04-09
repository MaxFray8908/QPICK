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

let basketCount;
let basketItems;
const sum = document.querySelector('.result-sum');

function calcSum() {
    let sum = 0;
    for(let key in basketItems) {
        sum += basketItems[key].count * basketItems[key].price;
    }
    return sum;
}



function loadingData(basketItems) {
    let sumResult = calcSum();
    sum.insertAdjacentHTML('beforeend', sumResult);

    for(let key in basketItems) {
        headphones.forEach( (item) => {
            if(item.title === key) {
                addCard(item.img, key, item.price, basketItems[key].count)
            }
        })

    }
}


const wrapBasketCart = document.querySelector('.wrap-basket-items');

function addCard (img, title, price, counter) {
    let card = `<div class="basket-item-card">
                    <div class="wrap-card-date">
                        <img src=${img} alt="${title}" class="basket-card-img" >
                        <div class="wrap-title">
                            <p class="p-date card-title">${title}</p>
                            <p class="p-date card-price">${price} &#8381; </p>
                        </div>
                    </div>
                    <div class="wrap-item-price">
                        <div class="wrap-item-counter">
                            <button name="${title}" class="basket-button minus">
                                <svg class="header-icon">
                                    <use xlink:href="./assets/svg/sprite.svg#minus"></use>
                                </svg>
                            </button>
                            <p class="p-date card-counter">${counter}</p>
                            <button name="${title}" class="basket-button plus">
                                <svg class="header-icon">
                                    <use xlink:href="./assets/svg/sprite.svg#plus"></use>
                                </svg>
                            </button>
                        </div>
                        <p class="p-date">${counter * price} &#8381;</p>
                    </div>
                </div>`;
    wrapBasketCart.insertAdjacentHTML('beforeend', card);
}

const main = document.querySelector('.wrap-basket-items');
const basket = document.querySelector('.counter-basket');


function testu(event) {
    let eventt = event.target.parentElement.parentElement;
    

    if (eventt.classList.contains('plus')) {
        basket.innerHTML = `${++basketCount}`;
        eventt.parentElement.childNodes[3].innerHTML = basketItems[eventt.name].count + 1;
        basketItems[eventt.name].count++;
        
        
    }
    else if(eventt.classList.contains('minus')) {
        basket.innerHTML = `${--basketCount}`;
        eventt.parentElement.childNodes[3].innerHTML = basketItems[eventt.name].count - 1;
        basketItems[eventt.name].count--;
    }

    eventt.parentElement.parentElement.childNodes[3].innerHTML = `${basketItems[eventt.name].count * basketItems[eventt.name].price} &#8381;`;
    sum.innerHTML = `&#8381; ${calcSum()}`;
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
    loadingData(basketItems);

}
window.addEventListener('load', getLocalStorage)