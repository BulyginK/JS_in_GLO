'use strict';

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input');
const inputRangeValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');
let selectScreens = document.querySelector('select');
let intupScreens = document.querySelector('input');

const appData = {
    title: '',
    screens: [],
    screeCount: 0,
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
    servicesPercent: {},
    servicesNumber: {},
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,

    init: function() {
        appData.addTitile();
        appData.addRangeSpan();
        appData.check();
        selectScreens.addEventListener('change', appData.check);
        intupScreens.addEventListener('blur', appData.check);
        startBtn.addEventListener('click', appData.start);
        buttonPlus.addEventListener('click', appData.addScreenBlock);
        inputRange.addEventListener('input', appData.addRangeSpan);        
    },

    addTitile: function() {
        document.title = title.textContent;
    },

    check: function() {
        startBtn.disabled = true;

        screens = document.querySelectorAll('.screen');
        console.log(screens);
            
        screens.forEach(function(screen) {
            const select = screen.querySelector('select');
            console.log(select);
            const input = screen.querySelector('input').textContent;
            console.log(input);
            const selectName = select.options[select.selectedIndex].textContent;

            if (selectName == "Тип экранов" || input == '') {
                console.log("не то");
                startBtn.disabled = true
            } else {
                console.log("то");
                startBtn.disabled = false
            };

        })

        ;

        
    },

    start: function() {
        console.log("СТАРТ");
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        appData.showResult();
        appData.logger();
    },
    showResult: function() {
        total.value = appData.screenPrice;
        totalCount.value = appData.screeCount;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;
    },
    addScreens: function() {
        screens = document.querySelectorAll('.screen');
        
        screens.forEach(function(screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index, 
                name: selectName,
                count: input.value,
                price: +select.value * +input.value
            });
        });
    },
    addServices: function() {
        otherItemsPercent.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if(check.checked) {
                appData.servicesPercent[label.textContent] = + input.value;
            };
        });
        otherItemsNumber.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if(check.checked) {
                appData.servicesNumber[label.textContent] = + input.value;
            };
        })
    },
    addScreenBlock: function() {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);

        appData.check()
    },
    addRangeSpan: function() {
        let size = +inputRange.value;
        inputRangeValue.textContent = size + '%';
        appData.rollback = size;
    },
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screeCount += +screen.count;
        }

        console.log(appData.screeCount);

        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }

        for(let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key]/100);
        }

        for(let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }

        appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
        appData.servicePercentPrice = Math.ceil(appData.fullPrice * (1 - appData.rollback/100));
    },
    logger: function() {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.services);
    },    
}

appData.init();


/*
const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input');
const inputRangeValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screeCount: 0,
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
    servicesPercent: {},
    servicesNumber: {},
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    init: function() {
        appData.addTitile();
        appData.addRangeSpan();
        startBtn.addEventListener('click', appData.start);
        buttonPlus.addEventListener('click', appData.addScreenBlock);
        inputRange.addEventListener('input', appData.addRangeSpan);
    },
    addTitile: function() {
        document.title = title.textContent;
    },
    start: function() {
        appData.addScreens();
        appData.check();
    },
    check: function() {
        let empty = appData.screens.find(search);
        function search(item) {
            return item.name === "Тип экранов" || item.price === 0
        };
        if (empty === undefined) {
            appData.addServices();
            appData.addPrices();
            appData.showResult();
            appData.logger();
        } else {
            appData.screens = [];
            appData.screeCount = 0;
        };
    },    
    showResult: function() {
        total.value = appData.screenPrice;
        totalCount.value = appData.screeCount;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;
    },
    addScreens: function() {
        screens = document.querySelectorAll('.screen');
        
        screens.forEach(function(screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index, 
                name: selectName,
                count: input.value,
                price: +select.value * +input.value
            });
        });
    },
    addServices: function() {
        otherItemsPercent.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if(check.checked) {
                appData.servicesPercent[label.textContent] = + input.value;
            };
        });
        otherItemsNumber.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if(check.checked) {
                appData.servicesNumber[label.textContent] = + input.value;
            };
        })
    },
    addScreenBlock: function() {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
    },
    addRangeSpan: function() {
        let size = +inputRange.value;
        inputRangeValue.textContent = size + '%';
        appData.rollback = size;
    },
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screeCount += +screen.count;
        }

        console.log(appData.screeCount);

        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }

        for(let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key]/100);
        }

        for(let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }

        appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
        appData.servicePercentPrice = Math.ceil(appData.fullPrice * (1 - appData.rollback/100));
    },
    logger: function() {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.services);
    },    
}

appData.init();
*/