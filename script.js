let title = "Web-разработка";
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