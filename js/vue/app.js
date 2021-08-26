const app = new Vue({
    el: '#app',
    data: {
        url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
        products: [],
        filtredProducts: [],
        cardsInBascet: [],
        cardsInBascetVisible: [],
        totalPrice: 0,
        showBasketKey: false,
        searchLine: ''
    },
    methods: {

        addcard(item) {
            item.amount = 0;
            this.cardsInBascet.push(item);
            if (this.cardsInBascet.length == 1) {
                this.cardsInBascet[0].amount = 1;
            }
            if (this.cardsInBascet.length > 1) {
                for (let i = 0; i < this.cardsInBascet.length; i++) {
                    if (item.product_name == this.cardsInBascet[i].product_name) {
                        this.cardsInBascet[i].amount = this.cardsInBascet[i].amount + 1;
                    }
                }
            }
            this.cardsInBascetVisible = [...new Set(this.cardsInBascet)];
            this.totalPriceCalc()
        },
        totalPriceCalc() {
            let totalPriceVar = 0;
            for (key in this.cardsInBascet) {
                totalPriceVar += this.cardsInBascet[key].price;
            }
            this.totalPrice = totalPriceVar;
        },
        showBasket() {
            this.showBasketKey = true;
        },
        hideBasket() {
            this.showBasketKey = false;
        },
        filterCards() {
            let regExp = new RegExp(this.searchLine, 'i');
            this.filtredProducts = this.products.filter(elem => {
                return regExp.test(elem.product_name);
            })
        },
        async fetchCards() {
            return await fetch(this.url).then(responce => {
                return responce.json();
            }).then(data => {
                this.products = data;
                this.filtredProducts = data;
            })
        },
        removeBasketCard(elem) {
            this.cardsInBascet.splice(this.cardsInBascet.indexOf(elem), 1);
            this.cardsInBascetVisible = [...new Set(this.cardsInBascet)];
            if (this.cardsInBascet.length > 0) {
                for (let i = 0; i < this.cardsInBascet.length; i++) {
                    if (this.cardsInBascet[i].product_name == elem.product_name) {
                        this.cardsInBascet[i].amount = this.cardsInBascet[i].amount - 1;
                        this.cardsInBascetVisible = [...new Set(this.cardsInBascet)];
                        return this.totalPriceCalc();
                    }
                }
            }
            else if ((this.cardsInBascet.length == 0)) {
                this.cardsInBascetVisible = [...new Set(this.cardsInBascet)];
                return this.totalPriceCalc();
            }


        }
    },
    mounted() {
        this.fetchCards();
    }

});