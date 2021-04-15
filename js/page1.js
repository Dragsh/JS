let ModuleTask1 = {};
ModuleTask1.name = "MODULE_Task1";
ModuleTask1.books = [];
let books;

// Функция-конструктор для создания объектов Book.
const Book = function (author, title, year, cover, price, amount) {
    //свойства
    this.author = author;
    this.title = title;
    this.year = year;
    this.cover = cover;
    this.price = price;
    this.amount = amount;

    // метод - свойство объекта, которое содежит значение в виде функции.
    Book.prototype.toString = () =>{
        return `<div class="card" style="width:400px">
                        <img class="card-img-top" src="../imgs/cover/${this.cover}"  alt="Card image" style="width:100%">
                        
                        <div class="card-body">
                        <h4 class="card-title">${this.title}</h4>
                        <p class = "card-text" >
                            <label class="col-form-label" for="author"><b>Автор:</b></label>
                            <span id = "author">${this.author}</span>
                        </p>
                        <p class="card-text" >
                            <label class="col-form-label" for="year"><b>Год:</b></label>
                            <span id = "year">${this.year} г.</span>
                        </p>
                        <p class = card-text>
                            <label class="col-form-label " for="price"><b>Цена:</b></label>
                            <span id = "price">${this.price} руб.</span>
                        </p>
                        <p class = card-footer>
                            <label class="col-form-label" for="amount"><b>Количество:</b></label>
                            <span id = "amount">${this.amount} шт.</span>
                        </p>
                        
                         <a href="#" class="btn btn-primary">Подробности</a>
                        </div>                                          
                      
         </div>`;
    }//toString

    // стоимость всех экземпляров книги в магазине
    Book.prototype.totalPrice = function () {
        return +(this.amount * this.price);
    } // totalPrice

};//Book

 books = [
    new Book("Д. Оруэл", "Скотный двор", 1945, "animal_farm.jpg", 980.25, 8),
    new Book("М. Ремарк", "Три товарища", 2003, "three_friends.jpg", 640.73, 3),
    new Book("Д. Робертс", "Шантарам", 2011, "shantaram.jpg", 335.19, 11),
    new Book("Х. Ли", "Убить пересмешника", 2000, "Ubit_peresmeshnika.jpeg", 722.21, 5),
    new Book("Р. Брэдбери", "451 градус по Фарингейту", 1998, "451-gradus-po-farengeytu.jpg", 658.33, 1),
    new Book("Р. Брэдбери", "Вино из одуванчиков", 1996, "Vino.jpg", 910.05, 7),
    new Book("Джефф Стрэнд", "Нелюдим", 2019, "dweller.jpg", 416.26, 5),
    new Book("Говард Филлипс Лавкрафт", "Ужас Данвича", 2020, "dunwich.jpg", 817.75, 11),
    new Book("Эдриан Маккинти", "Цепь", 2019, "chain.jpg", 425.57, 9),
    new Book("Д. Д. Селинджер", "Над пропастью во ржи", 1993, "boocover.jpg", 550.26, 4),


];

//старт скрипта на странице
window.onload = () => {
    ModuleTask1.startModuleTask1();
}//onload

//модуль
ModuleTask1.startModuleTask1 = () => {
    loadAndShowBooks();
    $("#btnSlideToggle").click(slideToggleHandler);
  /*  $(() => {
        let tabs = $("#tabs").tabs();

        // sortable - преобразование выбранных элементов в элементы, которые поддерживают сортировку
        tabs.find(".ui-tabs-nav").sortable({
            axis: "x",
            stop: function () {
                // после завершения сортировки обновить контрол
                tabs.tabs("refresh");
            }
        });
    });*/


}//startModuleTask1

// сворачивание условий задачи
const slideToggleHandler = () => {
    $('#slideToggle').slideToggle("slow");
}; // slideToggleHandler


//загрузка из хранилища
const loadAndShowBooks = () => {

    //если хранилище пустое, добавляем массив рабочих в хранилище
    if (window.localStorage.getItem("books") === null) {

        window.localStorage.setItem('books', JSON.stringify(books));
    } // if
    //массив рабочих из хранилища
    let temp = JSON.parse(localStorage.getItem('books') || "[]");

    //добавляем данные в массив модуля(Выражение "ModuleTask2.workers = temp" не работает)
    for (let i = 0; i < temp.length; i++){

        let book = new Book(temp[i].author, temp[i].title, parseInt(temp[i].year), temp[i].cover, parseFloat(temp[i].price),  parseInt(temp[i].amount));
        ModuleTask1.books.push(book);

    }//for

    //вывод на страницу
    writeBooks(ModuleTask1.books);


};//loadAndShowWorkers

//вывод сотрудников в таблицу на странице
const writeBooks = (books) => {

    let html = "";
    let html2 = ``;
    let newList=$(`<ul id ="list" ></ul>`);
   for ( let i = 0; i < books.length; i++ ){

        html += `<div id = "tabs-${i}">${books[i].toString()}</div>`;
        html2 += `<li><a href="#tabs-${i}">${books[i].title}</a></li>`;

    }//for

   // let newtab = newList + html;
    $('#tabs').html(newList);
    $('#list').html(html2);
    $(html).insertAfter('#list');

};//writeWorkers






