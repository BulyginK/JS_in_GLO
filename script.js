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
    isNamber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    asking: function() {
        appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
        
        do {
            appData.screenPrice = +prompt("Сколько будет стоить данная работа?", 20000);
        } while (!appData.isNamber(appData.screenPrice));

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
        return appData.screenPrice, appData.adaptive;
    },

    getTitle: function() {
        return appData.title.trim().charAt(0).toUpperCase() + appData.title.trim().slice(1).toLowerCase();
    },

    getAllServicePrices: function() {
        // let sum = 0;
        for (let i = 0; i < 2; i++) {
            let servicePrice = 0;
            
            if (i === 0) {
                appData.service1 = prompt("Какой дополнительный тип услуги нужен?", "Метрика");
            } else if (i === 1) {
                appData.service2 = prompt("Какой дополнительный тип услуги нужен?", "Адаптив");
            }
            
            do {
                servicePrice = prompt('Сколько это будет стоить?', "1500");
            } while (!appData.isNamber(servicePrice));
            
            appData.allServicePrices += +servicePrice;
        }
        return appData.service1, appData.service2, appData.allServicePrices;
    },

    getFullPrice: function () {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices
        return appData.fullPrice;
    },

    getServicePercentPrices: function() {
        appData.servicePercentPrice = Math.ceil(appData.fullPrice * (1 - appData.rollback/100))
        return appData.servicePercentPrice;
    },

    getRollbackMessage: function(price) {
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
}

appData.asking();
appData.getTitle();
appData.getAllServicePrices();
appData.getFullPrice();
appData.getServicePercentPrices();

console.log(appData.fullPrice);
console.log(appData.servicePercentPrice);
console.log(appData.getRollbackMessage);