'use strict';

let title
let screens
let screenPrice
let adaptive
let rollback = 20;
let service1;
let service2;
let allServicePrices;
let fullPrice;
let servicePercentPrice;

// Проверка на число
const isNamber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

const asking = function () {
    title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
    do {
        screenPrice = +prompt("Сколько будет стоить данная работа?", 20000);
    } while (!isNamber(screenPrice));
    adaptive = confirm('Нужен ли адаптив на сайте?');
}

// Переводим текст на вариант "первый символ с большой буквы, остальные с маленькой (+убираем пробелы вначале)"
const getTitle = function (str) {
    return str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase();
}

const getAllServicePrices = function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt("Какой дополнительный тип услуги нужен?", "Метрика");
        } else if (i === 1) {
            service2 = prompt("Какой дополнительный тип услуги нужен?", "Адаптив");
        }
        let servicePrice = +prompt('Сколько это будет стоить?');
        while (!isNamber(servicePrice)) {
            servicePrice = +prompt('Сколько это будет стоить?');
        }
        sum += servicePrice
        }
    return sum;
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

asking();
title = getTitle(title);
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);

// Проверить типы получаемых переменных
console.log("allServicePrices", allServicePrices, typeof allServicePrices);;
console.log("servicePercentPrice", servicePercentPrice, typeof servicePercentPrice);