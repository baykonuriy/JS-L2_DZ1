const app = new Vue({
    el: '#app',
    data: {
        url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
        productCards: [],
        filterCards: [],
        searchLine: '',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit esse architecto libero.',
        bascetCards: [],
        bascetInNav: false,
        errorResponce: false,
    },
    methods: {
        async fetchCards() {
            return await fetch(this.url).then(response => {
                return response.json();
            }).then(data => {
                this.productCards = data;
                this.filterCards = data;
                console.log(this.products);
                this.errorResponce = false;
            }).catch(() => {
                this.errorResponce = true;
            })
        },
        filterCardsFunc() {
            if (this.searchLine != '') {
                let regExp = new RegExp(`${this.searchLine}.+`, 'i');
                this.filterCards = this.productCards.filter(elem => {
                    return regExp.test(elem.product_name) ? true : false;
                })
            }
            else {
                this.filterCards = this.productCards;
            }
        },
        bascetShow() {
            this.bascetInNav = true;
        },
        bascetHide() {
            this.bascetInNav = false;
        },
        showHoverCard() {
            event.currentTarget.classList.add('hover');
        },
        hideHoverCard() {
            event.currentTarget.classList.remove('hover');
        },
        addCardInBascet() {
            if (event.target.className == 'newbtn__txt') {
                let addingBascetCard =
                {
                    id: event.currentTarget.querySelector('.card-product__id').textContent,
                    name: event.currentTarget.querySelector('.card-product__description__h4').textContent,
                    description: event.currentTarget.querySelector('.card-product__description__p').textContent,
                    price: event.currentTarget.querySelector('.card-product__price').textContent,
                    img: event.currentTarget.querySelector('.card-product__image').getAttribute('src')
                }
                this.bascetCards.push(addingBascetCard);
                // console.log(addingBascetCard.img);
            }
        }
    },
    mounted() {
        this.fetchCards()
    }
})