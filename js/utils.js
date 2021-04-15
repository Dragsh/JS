//#region Вспомогательные функции
// генерация случайного вещественного числа
function getRand(from, to) {
    return from + (to - from) * Math.random();
} // getRandom

// генерация случайного целого числа
function getIntRand(from, to) {
    // Math.trunc(x) - возвращает целую часть числа
    // (без округлений, просто отбрасывается дробная часть)
    return Math.trunc(getRand(from, to));
} // getIntRand

// генерация массива случайной длины (от 5 до 10)
// заполненого случайными
// вещественными числами
function createFillArr() {
    var a = Array(getIntRand(5, 10));
    for (let i = 0; i < a.length; i++) {
        // оставляем 2 знака после запятой
        a[i] = Math.trunc(getRand(-5, 5) * 100) / 100;
        if (Math.abs(a[i] <= 1)) {
            a[i] = 0;
        } // if
    } // for i

    return a;
} // fillArr

// вывод массива в окно браузера
function showArr(array, str) {
    document.write(`${str}`);
    for (let item of array) {
        document.write(`<b class="mark-${item >= 0 ? 'yes' : 'no'}">&nbsp;${item}&nbsp;</b>`);
    } // for
} // showArr
//#endregion

// вывод элемента по id
$ = id => document.getElementById(id);