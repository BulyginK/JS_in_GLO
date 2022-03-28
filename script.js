'use strict';

let title = prompt('Как называется ваш проект?');
if(title == null){
    title = prompt('Вам нужно ввести имя вашего проекта и нажать ОК')
}
let screens = prompt('Какие типы экранов нужно разработать?', 'Например: "Простые, Сложные, Интерактивные"');
let screenPrice = prompt('Сколько будет стоить данная работа?');
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt ('Какой дополнительный тип услуги нужен?');
let servicePrice1 = prompt ('Сколько это будет стоить?');
let service2 = prompt ('Какой дополнительный тип услуги нужен?');
let servicePrice2 = prompt ('Сколько это будет стоить?');
let fullPrice = +screenPrice + +servicePrice1 + +servicePrice2;
let rollback = 20;
let servicePercentPrice =  Math.ceil(fullPrice * (1 - rollback/100));
console.log(servicePercentPrice);

if (fullPrice >= 30000) {
    alert('Даем скидку в 10%');
    console.log('Даем скидку в 10%');
} else if (fullPrice >= 15000) {
    alert('Даем скидку в 5%');
    console.log('Даем скидку в 5%');
} else if (fullPrice > 0) {
    alert('Скидка не предусмотрена');
    console.log('Скидка не предусмотрена');
}

/*
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 111;
let rollback = 11;
let fullPrice = 1111;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экрана " + screenPrice +" рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");
console.log(screens.toLowerCase(screens.split(", ")));
console.log(fullPrice * (rollback/100) + " рублей");
*/