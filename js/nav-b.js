class NavBascetCard {
    constructor(wrp, name, price, img) {
        this.wrp = wrp;
        this.name = name;
        this.price = price;
        this.img = img;
    }
    render() {
        return document.querySelector('.nav-bascet__cntnr').insertAdjacentHTML('afterbegin',
            `
                <div class="nav-bacet__card">
                    <div class="nav-bacet__card__item nav-bacet__card__item_img-wrp">
                        <img src="${this.img}" alt="">
                        <p>${this.name}</p>
                    </div>
                    <div class="nav-bacet__card__item nav-bacet__card__item_amount">
                        <p>1</p>
                    </div>
                    <div class="nav-bacet__card__item nav-bacet__card__item_price">
                        <p>${this.price}</p>
                    </div>
                    <div class="nav-bacet__card__item nav-bacet__card__item_total">
                        <p>${this.price}</p>
                    </div>
                    <button class="nav-bacet__card__button">
                        </button>
                </div>
            `);
    }
}

class NavBascet {
    render() {
        return document.querySelector('.nav__wrp__bar').insertAdjacentHTML(
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
    }
    checkContainer = elem => {
        const productCard = {
            wrp: elem,
            name: elem.querySelector('.card-product__description__h4').textContent,
            price: elem.querySelector('.card-product__price').textContent,
            img: elem.querySelector('.card-product__image').getAttribute('src')
        }
        let container = document.querySelector('.nav-bascet__cntnr');
        let navBascetCard = new NavBascetCard(productCard.wrp, productCard.name, productCard.price, productCard.img);
        let bc = new NavBascet();
        if (container.childElementCount == 0) {
            navBascetCard.render();
            bc.changeCount()
        }
        else if (container.childElementCount > 0) {
            let bascetCardList = document.querySelectorAll('.nav-bacet__card');
            for (let i = 0; i < bascetCardList.length; i++) {
                const bascetCard = {
                    wrp: bascetCardList[i],
                    name: bascetCardList[i].querySelector('.nav-bacet__card__item_img-wrp p'),
                    amount: bascetCardList[i].querySelector('.nav-bacet__card__item_amount p'),
                    price: bascetCardList[i].querySelector('.nav-bacet__card__item_price p'),
                    total: bascetCardList[i].querySelector('.nav-bacet__card__item_total p')
                }
                if (bascetCard.name.textContent == productCard.name) {
                    let amount = Number(bascetCard.amount.textContent);
                    ++amount;
                    bascetCard.amount.innerHTML = String(amount);
                    let total = Number(bascetCard.total.textContent) + Number(bascetCard.price.textContent);
                    return bascetCard.total.innerHTML = String(total);
                }
                if (bascetCard.name.textContent !== productCard.name && i == bascetCardList.length - 1) {
                    navBascetCard.render();
                }
            }

        }
    }
    getNavBascetCard = () => {
        let currentCard = document.querySelectorAll('.card-product');
        currentCard.forEach(function (elem) {
            elem.addEventListener('click', function (e) {
                if (e.target == e.currentTarget.querySelector('.newbtn_ghost_dark') ||
                    e.target == e.currentTarget.querySelector('.newbtn__txt') ||
                    e.target == e.currentTarget.querySelector('.newbtn_ghost_dark svg')) {
                    let bc = new NavBascet();
                    bc.checkContainer(e.currentTarget);
                    bc.changeCount();
                }
            })
        })
    }
    changeCount = () => {
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
    removeCard() {
        document.querySelector('.nav-bascet__cntnr').addEventListener('click', function (e) {
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
    }
}