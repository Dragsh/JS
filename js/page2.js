let ModuleTask2 = {};
ModuleTask2.name = "MODULE_Task2";
let workers;     //массив для первичного заполнения локального хранилища
ModuleTask2.workers = []; //массив работников модуля

//класс рабочий
function Worker (surnameNP, position, enrollmentYear, photo, salary) {
    // имя
    this.surnameNP = surnameNP;
    // название занимаемой должности
    this.position = position;
    // год поступления на работу
    this.enrollmentYear = enrollmentYear;
    // имя файла с фотографией работника
    this.photo = photo;
    // величина оклада работника
    this.salary = salary;

    // метод формирования строки с данными работника: toString()
    Worker.prototype.toString = function () {
        return `<td>${this.surnameNP}</td>
                <td>${this.position}</td>
                <td>${this.enrollmentYear}</td>
                <td class="text-center">
                <img src='../imgs/workers/${this.photo}' width='128' height="128"/>
                </td>
                <td>${this.salary}</td>
                <td>${this.Experience()}</td>`;
    } // toString

    // метод вычисления стажа работника для текущей даты
    this.Experience = function () {
        return parseInt(new Date().getFullYear()) - enrollmentYear;
    } // Experience
} // Worker

//массив для первичного заполнения локального хранилища
  workers = [
        new Worker("Кулик Е.В.", "Директор", 2016, "1.png", 120000),
        new Worker("Лавров Д.Д.", "Менеджер", 2019, "1.png", 55000),
        new Worker("Кульманова М.И.", "Менеджер", 2017, "1.png", 45000),
        new Worker("Толстов М.В.", "Менеджер", 2014, "2.png", 55000),
        new Worker("Шишкин И.Л.", "Менеджер", 2017, "2.png", 50000),
        new Worker("Альферова И.И.", "Бухгалтер", 2011, "2.png", 65000),
        new Worker("Антоненко А.Р.", "Бухгалтер", 2020, "3.png", 65000),
        new Worker("Епифанцева Л.А.", "Бухгалтер", 2015, "3.png", 80000),
        new Worker("Никишова Л.П.", "Кладовщик", 2016, "3.png",50000),
        new Worker("Петрова Р.П.", "Кладовщик", 2019, "4.png", 45000),
        new Worker("Гвоздь Н.Е.", "Инженер", 2013, "4.png", 80000),
        new Worker("Рогов Н.В.", "Инженер", 2017, "4.png", 80000),
        new Worker("Баринцев В.И.", "Инженер", 2019, "5.png",70000),
        new Worker("Лядова Р.И.", "Уборщица", 2012, "5.png", 35000),
        new Worker("Носова К.Д.", "Уборщица", 2017, "5.png", 35000),
    ];

//вывод сотрудников в таблицу на странице
function writeWorkers(workers) {
    let html = workers.reduce((html, w) => html + `<tr>${w.toString()}</tr>`, '');

    document.getElementById('workers').innerHTML = html;
}//writeWorkers

//без хранилища
function workersInitialHandler() {
    document.getElementById('workersHeader').innerText = 'Сотрудники'
    writeWorkers(ModuleTask2.workers);
} // workersInitialOrderHandler

//загрузка из хранилища
function loadAndShowWorkers(){

    //если хранилище пустое, добавляем массив рабочих в хранилище
    if (window.localStorage.getItem("workers") === null) {

        window.localStorage.setItem('workers', JSON.stringify(workers));
    } // if
     //массив рабочих из хранилища
   let temp = JSON.parse(localStorage.getItem('workers') || "[]");

    //добавляем данные в массив модуля(Выражение "ModuleTask2.workers = temp" не работает)
    for (let i = 0; i < temp.length; i++){

        let worker = new Worker(temp[i].surnameNP, temp[i].position, parseInt(temp[i].enrollmentYear), temp[i].photo, parseInt(temp[i].salary));
        ModuleTask2.workers.push(worker);

    }//for

    //вывод на страницу
    writeWorkers(ModuleTask2.workers);


}//loadAndShowWorkers

//модуль
ModuleTask2.startModuleTask2 = function () {
    $("#btnSlideToggle").click(slideToggleHandler);
    $("#btnOriginalOrder").click(workersInitialHandler);
    $("#btnSurnameByAlphabet").click(sortWorkers);
    $("#btnMinSalary").click(makrWorkersMinSalary);
    $("#btnMaxSalary").click(makrWorkersMaxSalary);
    $("#btnOverExp").click(makrWorkersExpOverFive);
    $("#btnAddNewWorkerSave").click(addNewWorkerHandler);
    $("#btnAddNewWorkerCancel").click(addNewWorkerCancelHandler);
    loadAndShowWorkers();

}//startModuleTask2

//старт скрипта на странице
window.onload = function (){

    ModuleTask2.startModuleTask2();

}//onload

// сортировка сотрудников по фамилиям в алфавитном порядке
function sortWorkers() {
    document.getElementById('workersHeader').innerText = 'Сотрудники упорядоченные по алфавиту';
    let orderWorkers = ModuleTask2.workers
        .filter(w => w)
        .sort((a, b) => a.surnameNP < b.surnameNP ? -1 : 1);

    writeWorkers(orderWorkers);
    setTimeout(workersInitialHandler, 15000);

} // sortWorkers

// выделить всех сотрудников с минимальным окладом
function makrWorkersMinSalary() {

    document.getElementById('workersHeader').innerText = 'Сотрудники упорядоченные по алфавиту, с мин. окладом выделены';

    // мин тарифная ставка
    let minSalary = Math.min.apply(null, ModuleTask2.workers.map(r => r.salary));


    let html = ModuleTask2.workers.reduce((html, w) => html + `<tr class="${w.salary === minSalary ? 'mark-yes':''}">${w.toString()}</tr>`, '');

    document.getElementById('workers').innerHTML = html;

    setTimeout(workersInitialHandler, 15000);
} // makrWorkersMinSalary

// выделить всех сотрудников с максимальным окладом
function makrWorkersMaxSalary() {
    document.getElementById('workersHeader').innerText = 'Сотрудники упорядоченные по должностям, с макс. окладом выделены';

    // максимальная тарифная ставка
    let maxSalary = Math.max.apply(null, ModuleTask2.workers.map(r => r.salary));

    let orderWorkers = ModuleTask2.workers
        .filter(w => w)
        .sort((a, b) => a.position < b.position ? -1 : 1);


    let html = orderWorkers.reduce((html, w) => html + `<tr class="${w.salary === maxSalary ? 'mark-yes' : ''}">${w.toString()}</tr>`, '');

    document.getElementById('workers').innerHTML = html;

    setTimeout(workersInitialHandler, 15000);
} // makrWorkersMaxSalary

// выделить всех сотрудников у которых стаж больше 5 лет
function makrWorkersExpOverFive() {
    $('#workersHeader').html('Сотрудники упорядоченные по окладу, с превышением заданного в строке ввода стажа выделены');
    let orderWorkers = ModuleTask2.workers
        .filter(w => w)
        .sort((a, b) => a.salary < b.salary ? -1 : 1);
         writeWorkers(orderWorkers);

    $('#workers td').each(function () {
        let cnt = 5;
        if ($(this).index() === cnt) {
            parseInt($(this).html()) > parseInt($('#overExp').val()) ? $(this).parent().addClass("mark-yes") : $(this);
            cnt += 6;
        }
    });


} // makrWorkersExpOverFive

//добавить сотрудника
function addNewWorkerHandler() {

    // получение формы по имени

    let surnameNp = $("#surnameNp").val();
    //var position = form.Position.value;
   // var year = parseInt(form.Year.value);
   // var salary = parseInt(form.Salary.value);

        ModuleTask2.workers.push(new Worker( surnameNp, $("#position").val(), parseInt($("#enrollmentYear").val()) , `${getIntRand(1, 5)}.png`,parseInt($("#salary").val())));
        //сохранить в локальное хранилище
        localStorage.removeItem('workers');
        window.localStorage.setItem('workers', JSON.stringify(ModuleTask2.workers));

        writeWorkers(ModuleTask2.workers);
        clearInputFields();

}//workersAddNewWorkerHandler

function workersClearStorageHandler() {
    window.localStorage.workers = ' ';
    //если хранилище пустое, добавляем массив рабочих в хранилище
    if (window.localStorage.getItem("workers") === ' ') {
        alert("Хранилище очищенно!")
    } // if


} // workersClearStorageHandler

function  loadWorkersHandler(){

    loadAndShowWorkers();

}//loadWorkersHandler

function  clearCollectionHandler(){

    ModuleTask2.workers = [];
    writeWorkers(ModuleTask2.workers);


}//loadWorkersHandler

// сворачивание условий задачи
function slideToggleHandler() {
    $('#slideToggle').slideToggle("slow");
} // slideToggleHandler


function addNewWorkerCancelHandler() {
    clearInputFields();
} // addNewWorkerCancelHandler

function clearInputFields() {
    $("#surnameNP").val("");
    $("#position").val("Директор");
    $("#enrollmentYear").val("");
    $("#salary").val("");
} // clearInputFields

// подписка на событие увольнения сотрудника
window.addEventListener('load', function () {

    function deleteWorker() {
        let workerArr = $(this).text().split("\n");
        ModuleTask2.workers = ModuleTask2.workers.filter(w => w.surnameNP !== workerArr[0]);

        var result = confirm(`Уволить сотрудника ${workerArr[0]} с должности ${workerArr[1].replace(/\s/g, '')}?`);

        if (result) {
            window.localStorage.workers = JSON.stringify(ModuleTask2.workers);

            // приходится обновлять всю страницу, чтобы подтянуть свежие данные
            window.location = window.location.href;

            // при перезаписи только лишь таблицы
            // событие click перестает срабатывать до обновления станицы
            //writeWorkers(ModuleTask2.workers);
        }
    }
    let trs = $("tr");
    [].forEach.call(trs, function (el) {
        el.addEventListener('click', deleteWorker, false)
    });
}, false);







