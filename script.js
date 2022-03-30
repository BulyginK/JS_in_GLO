'use strict';

let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?', 'Например: Простые, Сложные, Интерактивные');
let screenPrice = +prompt('Сколько будет стоить данная работа?', 'Например: 12000');
let adaptive = confirm('Нужен ли адаптив на сайте?');

let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');

let allServicePrices;
let fullPrice;
let rollback = 20;
let servicePercentPrice;


const getTitle = function () {
    return title.trim().charAt(0).toUpperCase() + title.trim().slice(1).toLowerCase();
}

const getAllServicePrices = function () {
    return servicePrice1 + servicePrice2;
}

function getFullPrice () {
    return screenPrice + allServicePrices;
}

const getServicePercentPrices = function () {
    return Math.ceil(fullPrice * (1 - rollback/100));
}

const showTypeOf = function (variable) {
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

title = getTitle();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);