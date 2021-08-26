
Vue.component('showcase', {
    template:
        `<section class="showcase">
            <showcase-filter></showcase-filter>
            <showcase-card
                v-for="key in $root.filtredProducts"
                :item="key"
                :price="key.price"
                :name="key.product_name"
                :idcard="key.id_product">
            </showcase-card>
            <showcase-footer></showcase-footer>
        </section>
        `
})

Vue.component('showcase-card', {
    props: ['item', 'price', 'name', 'idcard'],
    data() {
        return {
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae suscipit quam rerum?',
        }
    },
    template:
        `<article class="card-product" @mouseover="showHover" @mouseout="hideHover">
            <div class="card-product__wrapper">
                <a href="#" class="card-product_hover">
                    <div class="newbtn_ghost_dark" >
                        <svg width="27" height="24" viewBox="0 0 27 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M21.4565 24C21.4088 24 21.3448 24 21.2963 24C20.1587 24 19.2137 23.0873 19.1335 21.9295C19.0535 20.7232 19.9507 19.6474 21.1523 19.5654C21.2012 19.5621 21.2499 19.5605 21.2982 19.5605C22.437 19.5605 23.3984 20.4624 23.4761 21.6196C23.5076 22.2233 23.3312 22.7936 22.9468 23.2342C22.5626 23.691 22.0334 23.9514 21.4565 24ZM7.67657 23.9936C6.47235 23.9936 5.49677 23.0036 5.49677 21.7809C5.49677 20.5592 6.47235 19.5691 7.67657 19.5691C8.88074 19.5691 9.85638 20.5592 9.85638 21.7809C9.85638 23.0036 8.88074 23.9936 7.67657 23.9936ZM20.6555 17.1202H8.59009C8.15717 17.1202 7.77289 16.8265 7.66034 16.4031L3.73456 1.95779H0.97876C0.450439 1.95779 0.0175781 1.51823 0.0175781 0.979444C0.0175781 0.441513 0.450439 0.000976562 0.97876 0.000976562H4.45636C4.88837 0.000976562 5.27264 0.294627 5.38513 0.719032L9.31097 15.1634H20.0146L23.5715 6.84915H11.7148C11.1857 6.84915 10.7527 6.40861 10.7527 5.8708C10.7527 5.33287 11.1857 4.89233 11.7148 4.89233H25.0457C25.3661 4.89233 25.6711 5.05535 25.8467 5.33287C26.0231 5.60941 26.0555 5.95182 25.9268 6.26172L21.5366 16.5328C21.3763 16.8914 21.0397 17.1202 20.6555 17.1202Z" />
                        </svg>
                        <span class="newbtn__txt" @click="$root.addcard(item)">Add to&nbsp;Cart</span>
                    </div>
                </a>
                <img src="img/products/img1.png" alt="" class="card-product__image">
            </div>
            <div class="card-product__description">
                <span style='display: none;'></span>
                <a href="#" class="card-product__description__h4">{{ name }}</a>
                <p class="card-product__description__p">{{ this.description }}</p>
                <span class="card-product__price"> {{ price }} </span>
            </div>
        </article>
        `,
    methods: {
        showHover() {
            event.currentTarget.classList.add('hover');
        },
        hideHover() {
            event.currentTarget.classList.remove('hover');
        }
    }

})

Vue.component('showcase-filter', {
    template:
        `
        <header class="filter">
            <div class="filter__main">
                <div class="option-select">
                    <input id="mfilter" type="checkbox" class="option-select-choff">
                    <label for="mfilter" class="option-select-lable">
                        <span>filter</span>
                    </label>
                    <div class="option-select-list">
                        <div class="filter__main__list-wrapper opened-wrapper">
                            <ul class="filter__main__list opened-filter filter__main__list_category">
                                <li class="filter__main__list__item select-item">CATEGORY</li>
                                <li class="filter__main__list__item">Accessories</li>
                                <li class="filter__main__list__item">Bags</li>
                                <li class="filter__main__list__item">Denim</li>
                                <li class="filter__main__list__item">Hoodies & Sweatshirts</li>
                                <li class="filter__main__list__item">Jackets & Coats</li>
                                <li class="filter__main__list__item">Polos</li>
                                <li class="filter__main__list__item">Shirts</li>
                                <li class="filter__main__list__item">Shoes</li>
                                <li class="filter__main__list__item">Sweaters & Knits</li>
                                <li class="filter__main__list__item">T-Shirts</li>
                                <li class="filter__main__list__item">Tanks</li>
                            </ul>
                            <ul class="filter__main__list closed-filter filter__main__list_brands">
                                <li class="filter__main__list__item select-item">brends</li>
                                <li class="filter__main__list__item">Accessories</li>
                                <li class="filter__main__list__item">Bags</li>
                                <li class="filter__main__list__item">Denim</li>
                                <li class="filter__main__list__item">Hoodies & Sweatshirts</li>
                                <li class="filter__main__list__item">Jackets & Coats</li>
                                <li class="filter__main__list__item">Polos</li>
                                <li class="filter__main__list__item">Shirts</li>
                                <li class="filter__main__list__item">Shoes</li>
                                <li class="filter__main__list__item">Sweaters & Knits</li>
                                <li class="filter__main__list__item">T-Shirts</li>
                                <li class="filter__main__list__item">Tanks</li>
                            </ul>
                            <ul class="filter__main__list closed-filter filter__main__list_designers">
                                <li class="filter__main__list__item select-item">designers</li>
                                <li class="filter__main__list__item">Accessories</li>
                                <li class="filter__main__list__item">Bags</li>
                                <li class="filter__main__list__item">Denim</li>
                                <li class="filter__main__list__item">Hoodies & Sweatshirts</li>
                                <li class="filter__main__list__item">Jackets & Coats</li>
                                <li class="filter__main__list__item">Polos</li>
                                <li class="filter__main__list__item">Shirts</li>
                                <li class="filter__main__list__item">Shoes</li>
                                <li class="filter__main__list__item">Sweaters & Knits</li>
                                <li class="filter__main__list__item">T-Shirts</li>
                                <li class="filter__main__list__item">Tanks</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div class="filter__second">
                <div class="option-select">
                    <label for="ch-color" class="option-select-lable">
                        <span>TRENDING NOW</span>
                    </label>
                    <input id="ch-color" type="checkbox" class="option-select-choff">
                    <div class="option-select-list">
                        <div class="checkbox">
                            <input type="checkbox" id="red" name="red" checked>
                            <label class="checkbox-label" for="red">xs</label>
                        </div>
                        <div class="checkbox">
                            <input type="checkbox" id="green" name="green">
                            <label class="checkbox-label" for="green">xs</label>
                        </div>
                        <div class="checkbox">
                            <input type="checkbox" id="black" name="black">
                            <label class="checkbox-label" for="black">xs</label>
                        </div>
                    </div>
                </div>
                <div class="option-select">
                    <label for="ch-size" class="option-select-lable">
                        <span>SIZE</span>
                    </label>
                    <input id="ch-size" type="checkbox" class="option-select-choff">
                    <div class="option-select-list">
                        <div class="checkbox">
                            <input type="checkbox" id="red-blue" name="red-blue" checked>
                            <label class="checkbox-label" for="red-blue">xs</label>
                        </div>
                        <div class="checkbox">
                            <input type="checkbox" id="green-red" name="green-red">
                            <label class="checkbox-label" for="green-red">xs</label>
                        </div>
                        <div class="checkbox">
                            <input type="checkbox" id="black-yellow" name="black-yellow">
                            <label class="checkbox-label" for="black-yellow">xs</label>
                        </div>
                    </div>
                </div>
                <div class="option-select">
                    <label for="ch-quanti" class="option-select-lable">
                        <span>PRICE</span>
                    </label>
                    <input id="ch-quanti" type="checkbox" class="option-select-choff">
                    <div class="option-select-list">
                        <div class="checkbox">
                            <input type="checkbox" id="red-orange" name="red-orange" checked>
                            <label class="checkbox-label" for="red-orange">xs</label>
                        </div>
                        <div class="checkbox">
                            <input type="checkbox" id="green-white" name="green-white">
                            <label class="checkbox-label" for="green-white">xs</label>
                        </div>
                        <div class="checkbox">
                            <input type="checkbox" id="black-blue" name="black-blue">
                            <label class="checkbox-label" for="black-blue">xs</label>
                        </div>
                    </div>
                </div>

            </div>
        </header>
        `
})

Vue.component('showcase-footer', {
    template:
        `
        <footer class="pagination">
            <div class="pagination__wrapper">
                <button class="pagination-button">
                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.99414 2L3.99414 7L8.99414 12L7.99414 14L0.994141 7L7.99414 0L8.99414 2Z"
                            fill="black" />
                    </svg>
                </button>
                <ul class="pagination-list">
                    <li class="pagination-list__item pagination-list__item_checked"><a href="#">1</a></li>
                    <li class="pagination-list__item"><a href="#">2</a></li>
                    <li class="pagination-list__item"><a href="#">3</a></li>
                    <li class="pagination-list__item"><a href="#">4</a></li>
                    <li class="pagination-list__item"><a href="#">5</a></li>
                    <li class="pagination-list__item"><a href="#">6</a></li>
                    <li class="pagination-list__item"><a href="#">...</a></li>
                    <li class="pagination-list__item"><a href="#">20</a></li>
                </ul>
                <button class="pagination-button">
                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.994141 12L5.99414 7L0.994141 2L1.99414 0L8.99414 7L1.99414 14L0.994141 12Z"
                            fill="black" />
                    </svg>
                </button>
            </div>
        </footer>
        `
})