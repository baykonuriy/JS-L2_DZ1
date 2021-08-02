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

document.querySelector('.nav-bacet__footer__item_amo p').innerHTML = '0';

let cardP = document.querySelectorAll('.card-product');
let basketCard = document.querySelector('.nav-bascet__cntnr');

cardP.forEach(function (elem) {
    elem.addEventListener('click', function (e) {
        if (e.target == e.currentTarget.querySelector('.newbtn_ghost_dark') ||
            e.target == e.currentTarget.querySelector('.newbtn__txt') ||
            e.target == e.currentTarget.querySelector('.newbtn_ghost_dark svg')) {
            let txtProd = e.currentTarget.querySelector('.card-product__description__h4').textContent;
            let txtPrice = e.currentTarget.querySelector('.card-product__price').textContent;
            let img = e.currentTarget.querySelector('.card-product__image').getAttribute('src');
            checkContainer(txtProd, txtPrice, img);
        }
    })
})

function checkContainer(name, price, img) {
    if (basketCard.childElementCount == 0) {
        cardMaker(name, price, img);
    }
    else if (basketCard.childElementCount > 0) {
        let card = document.querySelectorAll('.nav-bacet__card');
        for (let i = 0; i < card.length; i++) {
            let checkName = card[i].querySelector('.nav-bacet__card__item_img-wrp p').textContent;
            let checkAmount = card[i].querySelector('.nav-bacet__card__item_amount p').textContent;
            let checkTotal = card[i].querySelector('.nav-bacet__card__item_total p').textContent;
            let total = card[i].querySelector('.nav-bacet__card__item_total p');
            let amount = card[i].querySelector('.nav-bacet__card__item_amount p');
            if (checkName == name) {
                checkAmount = Number(checkAmount);
                ++checkAmount;
                amount.innerHTML = String(checkAmount);
                checkTotal = Number(checkTotal) + Number(price);
                total.innerHTML = String(checkTotal);
                return changeCount();
            }
            if (checkName !== name && i == card.length - 1) {
                cardMaker(name, price, img);
                document.querySelector('.icon-button__counter').innerHTML = String(card.length);
            }
        }
    }
    changeCount();
}

function changeCount() {
    let items = document.querySelectorAll('.nav-bascet__cntnr .nav-bacet__card');
    let c = 0;
    let t = 0;
    items.forEach(function (elem) {
        let amount = elem.querySelector('.nav-bacet__card__item_amount p').textContent;
        let navC = document.querySelector('.icon-button__counter');
        c = c + Number(amount);
        navC.innerHTML = String(c);

        let total = elem.querySelector('.nav-bacet__card__item_total p').textContent;
        let allTotal = document.querySelector('.nav-bacet__footer__item_amo p');
        t = t + Number(total);
        allTotal.innerHTML = String(t);
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
                        <svg class="nav-bacet__card__button__svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.4099 11.9992L17.7099 7.70921C17.8982 7.52091 18.004 7.26551 18.004 6.99921C18.004 6.73291 17.8982 6.47751 17.7099 6.28921C17.5216 6.10091 17.2662 5.99512 16.9999 5.99512C16.7336 5.99512 16.4782 6.10091 16.2899 6.28921L11.9999 10.5892L7.70994 6.28921C7.52164 6.10091 7.26624 5.99512 6.99994 5.99512C6.73364 5.99512 6.47824 6.10091 6.28994 6.28921C6.10164 6.47751 5.99585 6.73291 5.99585 6.99921C5.99585 7.26551 6.10164 7.52091 6.28994 7.70921L10.5899 11.9992L6.28994 16.2892C6.19621 16.3822 6.12182 16.4928 6.07105 16.6146C6.02028 16.7365 5.99414 16.8672 5.99414 16.9992C5.99414 17.1312 6.02028 17.2619 6.07105 17.3838C6.12182 17.5056 6.19621 17.6162 6.28994 17.7092C6.3829 17.8029 6.4935 17.8773 6.61536 17.9281C6.73722 17.9789 6.86793 18.005 6.99994 18.005C7.13195 18.005 7.26266 17.9789 7.38452 17.9281C7.50638 17.8773 7.61698 17.8029 7.70994 17.7092L11.9999 13.4092L16.2899 17.7092C16.3829 17.8029 16.4935 17.8773 16.6154 17.9281C16.7372 17.9789 16.8679 18.005 16.9999 18.005C17.132 18.005 17.2627 17.9789 17.3845 17.9281C17.5064 17.8773 17.617 17.8029 17.7099 17.7092C17.8037 17.6162 17.8781 17.5056 17.9288 17.3838C17.9796 17.2619 18.0057 17.1312 18.0057 16.9992C18.0057 16.8672 17.9796 16.7365 17.9288 16.6146C17.8781 16.4928 17.8037 16.3822 17.7099 16.2892L13.4099 11.9992Z"
                                fill="#000000" />
                        </svg>

                     </button>
                </div>
            `)
}

basketCard.addEventListener('click', function (e) {
    let cCard = e.currentTarget.querySelectorAll('.nav-bascet__cntnr .nav-bacet__card');
    if (cCard.length > 0) {
        cCard.forEach(function (elem) {
            if (e.target == elem.querySelector('.nav-bacet__card__button__svg') && cCard.length > 1 ||
                e.target == elem.querySelector('.nav-bacet__card__button') && cCard.length > 1 ||
                e.target == elem.querySelector('.nav-bacet__card__button path' && cCard.length > 1)) {
                elem.remove();
                changeCount();
            }
            if (e.target == elem.querySelector('.nav-bacet__card__button__svg') && cCard.length == 1 ||
                e.target == elem.querySelector('.nav-bacet__card__button') && cCard.length == 1 ||
                e.target == elem.querySelector('.nav-bacet__card__button path') && cCard.length == 1) {
                elem.remove();
                document.querySelector('.nav-bacet__footer__item_amo p').innerHTML = '0';
                document.querySelector('.icon-button__counter').innerHTML = '0';
            }
        })
    }
});