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
let selectScreens = document.querySelectorAll('.screen select');
let intupScreens = document.querySelectorAll('.screen input');

let mainControlsItems = document.querySelectorAll('.main-controls input[type="text"], select');

const appData = {
    title: '',
    screens: [],
    screensArr: [],
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
        this.addTitile();
        this.addRangeSpan();
        this.addListeners();
        this.check();
        startBtn.addEventListener('click', this.start);
        resetBtn.addEventListener('click', this.reset);
        buttonPlus.addEventListener('click', this.addScreenBlock);
        inputRange.addEventListener('input', this.addRangeSpan);        
    },
    addTitile: function() {
        document.title = title.textContent;
    },
    addListeners: function() {
        selectScreens = document.querySelectorAll('.screen select');
        intupScreens = document.querySelectorAll('.screen input');

        for (let i = 0; i < selectScreens.length; i++) {
            selectScreens[i].addEventListener('change', this.check);
        };
        
        for (let i = 0; i < intupScreens.length; i++) {
            intupScreens[i].addEventListener('input', this.check);
        };
    },
    check: function() {
        startBtn.disabled = true;
        appData.enumeration();
        
        let search = appData.screensArr.some(item => {
            if (item === "Тип экранов") {
                return true;
            } else if (item === 0) {
                return true;
            }
            return false;                 
        })

        if (!search) {
            startBtn.disabled = false;
        };
    },
    enumeration: function() {
        this.screensArr = [];
        screens = document.querySelectorAll('.screen');
        
        screens.forEach(screen => {
            const select = screen.querySelector('select');
            const input = +screen.querySelector('input').value;
            const selectName = select.options[select.selectedIndex].textContent;
            
            this.screensArr.push(selectName);
            this.screensArr.push(input);
        });
    },
    addScreenBlock: function() {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
        appData.addListeners();
        appData.check();
        startBtn.disabled = true;
    },
    addRangeSpan: function() {
        let size = +inputRange.value;
        inputRangeValue.textContent = size + '%';
        appData.rollback = size;
        
        appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;

        totalCountRollback.value = Math.ceil(appData.fullPrice * (1 - appData.rollback/100));
    },
    start: function() {
        appData.check();
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        appData.showResult();
        appData.stop();
        appData.logger();
    },
    addScreens: function() {
        screens = document.querySelectorAll('.screen');
        
        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            this.screens.push({
                id: index, 
                name: selectName,
                count: input.value,
                price: +select.value * +input.value
            });
        });
    },
    addServices: function() {
        otherItemsPercent.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if(check.checked) {
                this.servicesPercent[label.textContent] = + input.value;
            };
        });
        otherItemsNumber.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if(check.checked) {
                this.servicesNumber[label.textContent] = + input.value;
            };
        })
    },
    addPrices: function () {
        for (let screen of this.screens) {
            this.screeCount += +screen.count;
        }

        for (let screen of this.screens) {
            this.screenPrice += +screen.price;
        }

        for(let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key]/100);
        }

        for(let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }

        this.fullPrice = +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;
        this.servicePercentPrice = Math.ceil(this.fullPrice * (1 - this.rollback/100));
    },
    showResult: function() {
        total.value = this.screenPrice;
        totalCount.value = this.screeCount;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
    },
    stop: function() {
        mainControlsItems = document.querySelectorAll('.main-controls input[type="text"], input[type="checkbox"], select');

        for (let elem of mainControlsItems) {
            elem.disabled = true;
        }
        buttonPlus.disabled = true;
        startBtn.style.display = 'none';
        resetBtn.style.display = 'block';
    },
    reset: function() {
        appData.resetScreens();
        appData.resetServices();
        appData.resetRange();
        appData.resetShowResult();
        appData.resetResult();
        appData.resetStop();
    },
    resetScreens: function() {
        for(let i = 1; i < screens.length; i++) {
            screens[i].remove()
        };
        document.querySelector('.screen select').value = '';
        document.querySelector('.screen input').value = '';
    },
    resetServices: function() {
        const check = document.querySelectorAll('.main-controls input[type=checkbox]');
        for(let i = 0; i < check.length; i++) {
            if(check[i].checked) {
                check[i].checked = false
            };
        };
    },
    resetRange: function() {
        inputRange.value = '0';
        inputRangeValue.textContent = '0%';
    },
    resetShowResult: function() {
        total.value = '0';
        totalCount.value = '0';
        totalCountOther.value = '0';
        fullTotalCount.value = '0';
        totalCountRollback.value = '0';
    },
    resetResult: function() {
        appData.screens = [];
        appData.screensArr = [];
        appData.screeCount = 0;
        appData.screenPrice = 0;
        appData.adaptive = true;
        appData.rollback = 0;
        appData.servicesPercent = {};
        appData.servicesNumber = {};
        appData.servicePricesPercent = 0;
        appData.servicePricesNumber = 0;
        appData.fullPrice = 0;
        appData.servicePercentPrice = 0;
    },
    resetStop: function() {
        for (let elem of mainControlsItems) {
            elem.disabled = false;
        }
        startBtn.disabled = true;
        buttonPlus.disabled = false;
        startBtn.style.display = 'block';
        resetBtn.style.display = 'none';
    },
    logger: function() {
        console.log(this.fullPrice);
        console.log(this.servicePercentPrice);
    },    
}

appData.init();