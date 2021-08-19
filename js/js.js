//card hover

let card = document.querySelectorAll('.card-product')
let hoverCard = document.querySelectorAll('.card-product_hover')

function hide(e) {
    e.currentTarget.classList.add('hover');
}

function show(e) {
    e.currentTarget.classList.remove('hover');
}

for (i = 0; i <= card.length - 1; i++) {
    card[i].addEventListener('mouseover', hide, false);
    card[i].addEventListener('mouseout', show, false);
}

//open/close menu

let buttonCloseMenu = document.querySelector('.icon-button.icon-button_burger')
let closedAsideMenu = document.querySelector('.nav-aside')
let closeButton = document.querySelector('.icon-button.icon-button_close')

function openedMenu(e) {
    buttonCloseMenu.classList.toggle('open-menu')
    buttonCloseMenu.classList.toggle('close-menu')
    closedAsideMenu.classList.toggle('opened-menu')
    closedAsideMenu.classList.toggle('closed-menu')
}

function removeClickOpen(e) {
    buttonCloseMenu.removeEventListener('click', openedMenu, false)
}

buttonCloseMenu.addEventListener('click', openedMenu, removeClickOpen, false)

function removeClickClose(e) {
    closeButton.removeEventListener('click', openedMenu, removeClickClose, false)
}

closeButton.addEventListener('click', openedMenu, removeClickClose, false)


let listFilter = document.querySelectorAll('.filter__main__list')
let selectItem = document.querySelectorAll('.select-item')
let listWrapper = document.querySelector('.filter__main__list-wrapper');
let filterHeadline = document.querySelectorAll('.filter__main__headline')


function openFilter(e) {
    e.currentTarget.parentElement.classList.toggle('opened-filter')
    e.currentTarget.parentElement.classList.toggle('closed-filter')
}

for (i = 0; i <= selectItem.length; i++) {
    selectItem[i].addEventListener('click', openFilter, false)
}