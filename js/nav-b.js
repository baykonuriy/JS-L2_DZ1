'use strict'

document.querySelector('.nav__wrp__bar').insertAdjacentHTML(
    'beforeend',
    `<section class="nav-bacet">
        <div class="nav-bacet__card nav-bacet__card_header">
            <div class="nav-bacet__card__item nav-bacet__card__item_img-wrp">
                <p>Product Name</p>
            </div>
            <div class="nav-bacet__card__item nav-bacet__card__item_amount">
                <p>Amount</p>
            </div>
            <div class="nav-bacet__card__item nav-bacet__card__item_price">
                <p>Price</p>
            </div>
            <div class="nav-bacet__card__item nav-bacet__card__item_total">
                <p>Total price</p>
            </div>
        </div>
        <div class="nav-bascet__cntnr">
        </div>
        <div class="nav-bacet__footer">
            <div class="nav-bacet__footer__item nav-bacet__footer__item_header">
                <p>Total purchase amount</p>
            </div>
            <div class="nav-bacet__footer__item nav-bacet__footer__item_amo">
                <p>0</p>
            </div>
        </div>
    </section>`);

document.querySelector('.icon-button__counter').innerHTML = '0';

let cardP = document.querySelectorAll('.card-product');
let basketCard = document.querySelector('.nav-bascet__cntnr');

cardP.forEach(function (elem) {
    elem.addEventListener('click', function (e) {
        if (e.target == e.currentTarget.querySelector('.newbtn_ghost_dark') ||
            e.target == e.currentTarget.querySelector('.newbtn__txt') ||
            e.target == e.currentTarget.querySelector('.newbtn_ghost_dark svg')) {
            checkContainer(e.currentTarget);
        }
    })
})

function checkContainer(elem) {
    const crdP = {
        wrp: elem,
        product: elem.querySelector('.card-product__description__h4'),
        price: elem.querySelector('.card-product__price'),
        img: elem.querySelector('.card-product__image')
    }
    if (basketCard.childElementCount == 0) {
        cardMaker(crdP.product.textContent, crdP.price.textContent, crdP.img.getAttribute('src'));
        console.log(crdP.product.textContent + ' ' + crdP.price.textContent + ' ' + crdP.img.getAttribute('src'));
    }
    else if (basketCard.childElementCount > 0) {
        let crdsB = document.querySelectorAll('.nav-bacet__card');
        for (let i = 0; i < crdsB.length; i++) {
            const crdB = {
                wrp: crdsB[i],
                product: crdsB[i].querySelector('.nav-bacet__card__item_img-wrp p'),
                amount: crdsB[i].querySelector('.nav-bacet__card__item_amount p'),
                price: crdsB[i].querySelector('.nav-bacet__card__item_price p'),
                total: crdsB[i].querySelector('.nav-bacet__card__item_total p')
            }
            if (crdB.product.textContent == crdP.product.textContent) {
                let amount = Number(crdB.amount.textContent);
                ++amount;
                crdB.amount.innerHTML = String(amount);
                let total = Number(crdB.total.textContent) + Number(crdB.price.textContent);
                crdB.total.innerHTML = String(total);
                return changeCount();
            }
            if (crdB.product.textContent !== crdP.product.textContent && i == crdsB.length - 1) {
                cardMaker(crdP.product.textContent, crdP.price.textContent, crdP.img.getAttribute('src'));
            }
        }
    }
    changeCount();
}

function changeCount() {
    let items = document.querySelectorAll('.nav-bascet__cntnr .nav-bacet__card');
    let allTotal = 0;
    let navCounter = 0;
    items.forEach(function (elem) {
        const counts = {
            allTotal: document.querySelector('.nav-bacet__footer__item_amo p'),
            navCounter: document.querySelector('.icon-button__counter'),
        }
        const countsNavCard = {
            amount: elem.querySelector('.nav-bacet__card__item_amount p'),
            total: elem.querySelector('.nav-bacet__card__item_total p')
        }
        allTotal = allTotal + Number(countsNavCard.total.textContent);
        counts.allTotal.innerHTML = String(allTotal);
        navCounter = navCounter + Number(countsNavCard.amount.textContent);
        counts.navCounter.innerHTML = String(navCounter);
    })
}

function cardMaker(name, price, img) {
    basketCard.insertAdjacentHTML("afterbegin", `
                <div class="nav-bacet__card">
                    <div class="nav-bacet__card__item nav-bacet__card__item_img-wrp">
                        <img src="${img}" alt="">
                        <p>${name}</p>
                    </div>
                    <div class="nav-bacet__card__item nav-bacet__card__item_amount">
                        <p>1</p>
                    </div>
                    <div class="nav-bacet__card__item nav-bacet__card__item_price">
                        <p>${price}</p>
                    </div>
                    <div class="nav-bacet__card__item nav-bacet__card__item_total">
                        <p>${price}</p>
                    </div>
                    <button class="nav-bacet__card__button">
                     </button>
                </div>
            `)
}

basketCard.addEventListener('click', function (e) {
    let cCard = e.currentTarget.querySelectorAll('.nav-bascet__cntnr .nav-bacet__card');
    if (cCard.length > 0) {
        cCard.forEach(function (elem) {
            if (e.target == elem.querySelector('.nav-bacet__card__button') && cCard.length > 1) {
                elem.remove();
                changeCount();
            }
            if (e.target == elem.querySelector('.nav-bacet__card__button') && cCard.length == 1) {
                elem.remove();
                document.querySelector('.nav-bacet__footer__item_amo p').innerHTML = '0';
                document.querySelector('.icon-button__counter').innerHTML = '0';
            }
        })
    }
});