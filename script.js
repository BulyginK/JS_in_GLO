'use strict';

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 20,
    service1: '',
    service2: '',
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    asking: function() {
        appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
        do {
            appData.screenPrice = +prompt("Сколько будет стоить данная работа?", 20000);
        } while (!isNamber(appData.screenPrice));
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    }
}

// Проверка на число
const isNamber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

// Переводим текст на вариант "первый символ с большой буквы, остальные с маленькой (+убираем пробелы вначале)"
const getTitle = function() {
    return appData.title.trim().charAt(0).toUpperCase() + appData.title.trim().slice(1).toLowerCase();
}

const getAllServicePrices = function() {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            appData.service1 = prompt("Какой дополнительный тип услуги нужен?", "Метрика");
        } else if (i === 1) {
            appData.service2 = prompt("Какой дополнительный тип услуги нужен?", "Адаптив");
        }
        let servicePrice = +prompt('Сколько это будет стоить?');
        while (!isNamber(servicePrice)) {
            servicePrice = +prompt('Сколько это будет стоить?');
        }
        sum += servicePrice;
    }
    return sum;
}

function getFullPrice() {
    return appData.screenPrice + appData.allServicePrices;
}

const getServicePercentPrices = function() {
    return Math.ceil(appData.fullPrice * (1 - appData.rollback/100));
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

appData.asking();
appData.title = getTitle();
appData.allServicePrices = getAllServicePrices();
appData.fullPrice = getFullPrice();
appData.servicePercentPrice = getServicePercentPrices();

console.log(appData.fullPrice);
console.log(appData.servicePercentPrice);