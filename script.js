'use strict';

let title = prompt('Как называется ваш проект?');
if (title != null) {
    let screens = prompt('Какие типы экранов нужно разработать?', 'Например: Простые, Сложные, Интерактивные');
    let screenPrice = prompt('Сколько будет стоить данная работа?', 'Например: 12000');
    let adaptive = confirm('Нужен ли адаптив на сайте? Да - ОК, нет - Отмена');
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
    } else if (fullPrice >= 0) {
        alert('Скидка не предусмотрена');
        console.log('Скидка не предусмотрена');
    } else {
        alert('Что то пошло не так!');
        console.log('Что то пошло не так!');
    }
} else {
    alert('Вам нужно было ввести имя вашего проекта и нажать ОК. Перезагрузите страницу');
}
