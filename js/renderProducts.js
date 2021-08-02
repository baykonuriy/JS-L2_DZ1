const prodCard = [
    {
        title: 'Shirt',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        price: 150
    },
    {
        title: 'Socks',
        description: 'Dolor sit amet, consectetur adipiscing elit',
        price: 350
    },
    {
        title: 'Shoes',
        description: 'Consectetur adipiscing elit. Dolor sit amet, consectetur adipiscing elit',
        price: 250
    },
    {}
];
//добавил значения по умолчанию для аргументов функции
const renderCardItem = (title = 'Futbolka', description = 'Lorem ipsum dolor sit amet', price = '150') => {
    return `<article class="card-product">
        <div class="card-product__wrapper">
            <a href="#" class="card-product_hover">
                <div class="newbtn_ghost_dark">
                    <svg width="27" height="24" viewBox="0 0 27 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M21.4565 24C21.4088 24 21.3448 24 21.2963 24C20.1587 24 19.2137 23.0873 19.1335 21.9295C19.0535 20.7232 19.9507 19.6474 21.1523 19.5654C21.2012 19.5621 21.2499 19.5605 21.2982 19.5605C22.437 19.5605 23.3984 20.4624 23.4761 21.6196C23.5076 22.2233 23.3312 22.7936 22.9468 23.2342C22.5626 23.691 22.0334 23.9514 21.4565 24ZM7.67657 23.9936C6.47235 23.9936 5.49677 23.0036 5.49677 21.7809C5.49677 20.5592 6.47235 19.5691 7.67657 19.5691C8.88074 19.5691 9.85638 20.5592 9.85638 21.7809C9.85638 23.0036 8.88074 23.9936 7.67657 23.9936ZM20.6555 17.1202H8.59009C8.15717 17.1202 7.77289 16.8265 7.66034 16.4031L3.73456 1.95779H0.97876C0.450439 1.95779 0.0175781 1.51823 0.0175781 0.979444C0.0175781 0.441513 0.450439 0.000976562 0.97876 0.000976562H4.45636C4.88837 0.000976562 5.27264 0.294627 5.38513 0.719032L9.31097 15.1634H20.0146L23.5715 6.84915H11.7148C11.1857 6.84915 10.7527 6.40861 10.7527 5.8708C10.7527 5.33287 11.1857 4.89233 11.7148 4.89233H25.0457C25.3661 4.89233 25.6711 5.05535 25.8467 5.33287C26.0231 5.60941 26.0555 5.95182 25.9268 6.26172L21.5366 16.5328C21.3763 16.8914 21.0397 17.1202 20.6555 17.1202Z" />
                    </svg>
                    <span class="newbtn__txt">Add to&nbsp;Cart</span>
                </div>
            </a>
            <img src="img/products/img1.png" alt="" class="card-product__image">
        </div>
        <div class="card-product__description">
            <a href="#" class="card-product__description__h4">${title}</a>
            <p class="card-product__description__p">${description}</p>
            <span class="card-product__price">${price}</span>
        </div>
    </article> `
};
// сократил запись функци и убрал скобки для единсвенного агрумента
const renderCardList = list => {
    //добавил метод join чтобы изсчезла запистая создаваемая map
    document.querySelector('.filter').insertAdjacentHTML('afterend', list.map(item => renderCardItem(item.title, item.description, item.price)).join(''));
}
renderCardList(prodCard);
