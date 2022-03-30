'use strict';

let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?', 'Например: Простые, Сложные, Интерактивные');
let screenPrice = prompt('Сколько будет стоить данная работа?', 'Например: 12000');
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = prompt('Сколько это будет стоить?');
let allServicePrices;
let fullPrice;
let rollback = 20;
let servicePercentPrice;


const getTitle = function(title) {
    return title.trim().charAt(0).toUpperCase() + title.trim().slice(1).toLowerCase();
}

const getAllServicePrices = function(serPr1, serPr2) {
    return +serPr1 + +serPr2;
}

function getFullPrice(scrPr, allSerPr) {
    return +scrPr + allSerPr;
}

const getServicePercentPrices = function(fPrice, rBack) {
    return Math.ceil(fPrice * (1 - rBack/100));
}

const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
}

const getRollbackMessage = function(price) {
    if (price >= 30000) {
        return "Даем скидку в 10%";
    } else if (price >= 15000) {
        return "Даем скидку в 5%";
    } else if (price > 0) {
        return "Скидка не предусмотрена";
    } else {
        return "Что то пошло не так!";
    }
}

title = getTitle(title);
allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);