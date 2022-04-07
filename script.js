'use strict';

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 20,
    services: {},
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    start: function() {
        appData.asking()
        appData.addPrices();
        appData.getTitle();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.logger();
    },

    isNamber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    asking: function() {
        do {
            appData.title = prompt("Как называется ваш проект?");
        } while (appData.isNamber(+appData.title))
        
        
        for (let i = 0; i < 2; i++) {
            let name = '';
            let price = 0;

            do {
                name = prompt("Какие типы экранов нужно разработать?");
            } while (appData.isNamber(+name))

            do {
                price = prompt("Сколько будет стоить данная работа?");
            } while (!appData.isNamber(price));
            
            appData.screens.push({ id: i, name: name, price: price });
        }

        for (let i = 0; i < 2; i++) {
            let name = '';
            let price = 0;
            
            do {
                name = prompt("Какой дополнительный тип услуги нужен?");
            } while (appData.isNamber(+name))
            
            for(let key in appData.services) {
                if (name == key) {
                    name = name + i;
                }
            }

            do {
                price = prompt('Сколько это будет стоить?');
            } while (!appData.isNamber(price));   
            
            appData.services[name] = +price;
        }

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },

    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },

    getTitle: function() {
        appData.title = appData.title.trim().charAt(0).toUpperCase() + appData.title.trim().slice(1).toLowerCase();
    },

    getFullPrice: function () {
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
    },

    getServicePercentPrices: function() {
        appData.servicePercentPrice = Math.ceil(appData.fullPrice * (1 - appData.rollback/100));
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
    },

    logger: function() {
        for (let key in appData) {
            console.log("Ключ: " + key + " " + "Значение: " + appData[key]);
        }
    }
}

appData.start();