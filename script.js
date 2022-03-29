'use strict';

let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?', 'Например: Простые, Сложные, Интерактивные');
let screenPrice = +prompt('Сколько будет стоить данная работа?', 'Например: 12000');
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
let rollback = 20;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice =  Math.ceil(fullPrice * (1 - rollback/100));
let allServicePrices;

const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
}

const getRollbackMessage = function (price) {
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

const getAllServicePrices = function(serPr1, serPr2) {
    allServicePrices = serPr1 + serPr2;
}

function getFullPrice(scrPr, allSerPr) {
    fullPrice = scrPr + allSerPr;
}

const getTitle = function(title) {
    return title.trim().charAt(0).toUpperCase() + title.trim().slice(1).toLowerCase();
}

const getServicePercentPrices = function(fPrice, rBack) {
    servicePercentPrice = Math.ceil(fPrice * (1 - rBack/100));
}

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);
getRollbackMessage();
getAllServicePrices(servicePrice1, servicePrice2);
getFullPrice(screenPrice, allServicePrices);
getTitle(title);
getServicePercentPrices(fullPrice, rollback);

console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);