"use strict"

/**
 * @author Макаров Александр @Aralary
 * */

/**
 * Функция принимает массив, по которому в дальнейшем будет построена матрица
 * и возвращает массив с длинами столбцов будущей матрицы
 *
 * @param {Object} numbers - входной массив чисел
 * @param {number} colsCount - количество столбцов в будущей матрице
 * @throws {TypeError} - во входном массиве элемент является не числом
 * @return {Object} массив с длинами столбцов будущей матрицы
 * */
function colsWidthArr(numbers, colsCount) {
    const cols = new Array(colsCount);
    for (let i = 0; i < colsCount; ++i) {
        cols[i] = [];
    }
    numbers.forEach((el, index) => cols[index % cols.length].push(numbers[index]));
    return cols.map(col => Math.max(...(col.map(el => String(el).length))));
}

/**
 * Функция строит матрицу по входному массиву чисел и возвращает матрицу в виде строки.
 * У матрицы элементы в столбце одной длины, но все столбцы не обязательно одной ширины.
 *
 * @param {Object} numbers - входной массив чисел
 * @param {number} cols - количество столбцов в будущей матрице
 * @throws {*} - прокидывает исключение дальше
 * @return {String} - матрица записанная в строку
 * */

const format = (numbers, cols) => {
    const numbersChecked = numbers.map(el => {
        const num = Number(el);
        if (!isFinite(num)) {
            throw TypeError("its not a numbers");
        }
        return num;
    });
    let res = "";
    const widths = colsWidthArr(numbersChecked, cols);
    numbersChecked.forEach((el, index) => {
        let i = index % cols;
        res += String(el).padStart(widths[i]);
        let endFlag = (index == numbersChecked.length - 1);
        let rowEnd = (i === cols - 1);
        !endFlag && !rowEnd ? res += ' ' : false;
        !endFlag && rowEnd ? res += '\n' : false;
    });
    return res;
}