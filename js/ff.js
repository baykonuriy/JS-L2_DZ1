// Некая сеть фастфуда предлагает несколько видов гамбургеров:

// Маленький (50 рублей, 20 калорий).
// Большой (100 рублей, 40 калорий).

// Гамбургер может быть с одним из нескольких видов начинок (обязательно):

// С сыром (+10 рублей, +20 калорий).
// С салатом (+20 рублей, +5 калорий).
// С картофелем (+15 рублей, +10 калорий).

// Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом
// (+20 рублей, +5 калорий). 

// Напишите программу, рассчитывающую стоимость и калорийность гамбургера.
// Можно использовать примерную архитектуру класса со следующей страницы, но можно использовать
// и свою.

class Hamburger {
    constructor() {
        this.size = {
            mimi: {
                name: 'Большой',
                price: 50,
                kcl: 20,
            },
            max: {
                name: 'Маленький',
                price: 100,
                kcl: 40,
            }
        };
        this.stuffing = {
            chees: {
                name: 'Сыр',
                price: 10,
                kcl: 20,
            },
            salad: {
                name: 'Салат',
                price: 20,
                kcl: 5,
            },
            potato: {
                name: 'Картофель',
                price: 15,
                kcl: 10,
            }
        };
        this.totalPrice = 0;
        this.totalkcal = 0;
    }

    makeObj(name, price, kcl, button = 'Add Hamberger') {
        return `
            <div class='size' style='margin: 24px;'>Гамбургер – 
                <span class='name'>${name}</span>
                <div class='price' style='font-size: 14px; margin:4px 0;'>
                    цена – <span>${price}</span>
                </div>
                <div class='kcl' style='font-size: 14px; margin-bottom:4px;'>
                    калорийность – <span>${kcl}</span>
                </div>
                <div class='remove-size' style='color: blue;'>${button}</div>
            </div>
       `;
    }
    makeObjStuff = (name = 'Сыр', price = '20', kcl = '40', button = 'Add') => {
        return `<div class='staff removed' style='font-size:14px; padding-bottom: 8px;'>
                    <span class='staff-add' style='color: blue;'>${button}</span>
                    <span class='staff-name'>
                        ${name},
                    </span>
                    <span class='staff-price'>
                        Стоимость – <span>${price}</span>,
                    </span>
                    <span class='staff-kcl'>
                        Калорийность – <span>${kcl}</span>
                    </span>
                    
                </div>`
    }

    renderTotalCounts = (totalPrice = this.totalPrice, totalCkl = this.totalkcal) => {
        document.querySelector('.bascet').insertAdjacentHTML('beforeend', `
            <div class='total-counter' style='padding: 20px 0; margin-top: 20px; border-top: 1px solid black'>
                <div class='total-counter__price'>Цена за все: <span>${totalPrice}</span></div>
                <div class='total-counter__ckl'>Калорийность всего: <span>${this.totalkcal}</span></div>
            </div>
        `)
        let tc = document.querySelectorAll('.total-counter');
        if (tc.length > 1) {
            tc[0].remove();
        }
    }

    renderSize = () => {
        for (let key in this.size) {
            let obj = this.makeObj(this.size[key].name, this.size[key].price, this.size[key].kcl);
            document.querySelector('.container').insertAdjacentHTML('beforeend', obj);
        }
        this.renderBascet();
        this.getSize();
        this.renderTotalCounts();
    }

    renderBascet() {
        document.querySelector('.container').insertAdjacentHTML('afterend', `
                <div class='bascet' style='padding-top: 20px; border-top: 1px solid black;'>
                    Корзина
                </div>`);
    }
    getSize = () => {
        let product = document.querySelectorAll('.container .size');
        product.forEach(elem => {
            elem.addEventListener('click', e => {
                if (e.target.className == 'remove-size') {
                    let name = e.currentTarget.querySelector('.name').textContent;
                    let price = e.currentTarget.querySelector('.price span').textContent;
                    let kcl = e.currentTarget.querySelector('.kcl span').textContent;
                    let obj = this.makeObj(name, price, kcl, 'Remove');

                    document.querySelector('.bascet').insertAdjacentHTML('beforeend', obj);
                    let cards = document.querySelectorAll('.bascet .size');
                    for (let key in this.stuffing) {
                        let objStaff = this.makeObjStuff(this.stuffing[key].name, this.stuffing[key].price, this.stuffing[key].kcl);
                        cards[cards.length - 1].querySelector('.remove-size').insertAdjacentHTML('beforebegin', objStaff);
                    }
                    this.removeCard();
                    this.addStaff();
                    this.calculateCard();
                    this.getAlert();
                }
            })
        })
    }
    removeCard = (elems = document.querySelectorAll('.bascet .size')) => {
        if (elems.length > 0) {
            elems.forEach(elem => {
                elem.addEventListener('click', event => {
                    if (event.target.className == 'remove-size') {
                        event.currentTarget.remove();
                        this.calculateCard();
                    }
                })
            })
        }
    }
    addStaff = () => {
        let bascet = document.querySelector('.bascet');
        bascet.addEventListener('click', e => {
            if (e.target.className == 'staff-add') {
                e.stopImmediatePropagation();
                e.target.closest('.staff').classList.toggle('added');
                e.target.closest('.staff').classList.toggle('removed');
                if (e.target.innerHTML == 'Add') {
                    e.target.innerHTML = 'Remove';
                }
                else if (e.target.innerHTML == 'Remove') {
                    e.target.innerHTML = 'Add';
                }
            }
            this.calculateCard();
            this.getAlert();
        })
    }
    calculateCard = () => {
        let bascetCards = document.querySelectorAll('.bascet .size');
        let burgerPrice = 0;
        let burgerKcal = 0;
        let counterTotalPrice = 0;
        let counterTotalCkl = 0;
        if (bascetCards.length > 0) {
            for (let i = 0; i < bascetCards.length; i++) {
                for (let key in this.size) {
                    if (this.size[key].name == bascetCards[i].querySelector('.name').textContent) {
                        console.log(key);
                        burgerPrice = this.size[key].price;
                        burgerKcal = this.size[key].kcl;
                    }
                }
                let addStaff = bascetCards[i].querySelectorAll('.staff.added');
                let counter = 0;
                let countKcl = 0;
                for (let j = 0; j < addStaff.length; j++) {
                    if (addStaff.length > 0) {
                        counter += Number(addStaff[j].querySelector('.staff-price span').textContent);
                        countKcl += Number(addStaff[j].querySelector('.staff-kcl span').textContent);
                    }
                }
                bascetCards[i].querySelector('.price span').innerHTML = String(counter + burgerPrice);
                bascetCards[i].querySelector('.kcl span').innerHTML = String(countKcl + burgerKcal);

                counterTotalCkl += Number(bascetCards[i].querySelector('.kcl span').textContent);
                this.totalkcal = counterTotalCkl;
                counterTotalPrice += Number(bascetCards[i].querySelector('.price span').textContent);
                this.totalPrice = counterTotalPrice;
                this.renderTotalCounts();
            }
        }
        else if (bascetCards.length == 0) {
            this.totalkcal = 0;
            this.totalPrice = 0;
            this.renderTotalCounts();
        }
    }
    addAlert(elem) {
        elem.insertAdjacentHTML('beforeend', `
                <div class='alert' style='font-size: 14px; margin-top: 8px; width: 320px; background-color: #ff00002e; padding: 8px 12px; border-radius: 8px;'><span>Выберите хотя бы одну добавку</span></div>
        `)
    }
    getAlert = () => {
        let bascetCards = document.querySelectorAll('.bascet .size');
        for (let i = 0; i < bascetCards.length; i++) {
            let bascetCardFull = bascetCards[i].querySelectorAll('.staff.added');
            let alerts = bascetCards[i].querySelectorAll('.alert');
            if (bascetCardFull.length == 0 && alerts.length == 0) {
                this.addAlert(bascetCards[i]);
            }
            if (bascetCardFull.length > 0 && alerts.length == 1) {
                alerts[0].remove();
            }
        }

    }
}

let hamburger = new Hamburger();
hamburger.renderSize();

