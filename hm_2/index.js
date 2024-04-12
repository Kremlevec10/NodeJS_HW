// Написать свою собственную библиотеку и опубликовать в NPM.

// Что нужно помнить при реализации:

// — Ваш модуль должен обязательно экспортировать функции которые будут полезны вашим пользователям с помощью modules.exports
// — Не забудьте указать в package.json в поле main файл, который будет основным в вашей библиотеке
// — Обязательно создайте и опишите README.md файл в корне вашего проекта
// — Если у вас есть репозиторий в github или gitlab, опубликуйте туда ваш код и в package.json 
// укажите ссылку на репозиторий в поле repository
// — Протестируйте работу вашей библиотеки после публикации. Попробуйте установить её в любом другом 
// проекте с помощью npm i имявашейбиблиотеки и попробуйте ее использовать.

// Формат сдачи задания:
// — Достаточно прислать ссылку на сайт https://npmjs.com/ на вашу библиотеку.

// Идеи для библиотеки:

// — Библиотека для генерации случайных данных, таких как имена, адреса, даты, числа и т.д. 
// Это может быть полезно для тестирования или создания заглушек данных.
// — Библиотека для работы с математикой: например функции для решения квадратных уравнений.
// — Библиотека для генерации паролей, которая позволяет генерировать случайные и безопасные пароли. 
// Можно реализовать методы для указания длины пароля, использования различных типов символов 
// (буквы, цифры, специальные символы) и т.д.



class HashPassword {
    static upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXY'
    static lowerChars = 'abcdefghijklmnopqrstuvwxyz'
    static numbers = '0123456789'
    static specSymbols = '~!@#$%^&*()-_=+[{]}\\|;:"\',<.>/?'

    constructor() {
        this.length = 8;
        this.amountNumbers = 2;
        this.amountUpperChars = 1;
        this.amountSpecSymbols = 2;
        this.isNUmbers = false;
        this.isSpecSymbols = false;
    }

    setLength(length) {
        this.length = length;
    }

    setAmountNumbers(amountNumbers) {
        if((amountNumbers + this.amountSpecSymbols + this.amountUpperChars) > this.length) {
            throw new Error(`Устанавливаемое вами число ${amountNumbers} для цифр  превышает сумму всех символов используемых в пароле \n Максимально возможное ${this.length - (this.amountSpecSymbols + this.amountUpperChars)}`)
        }
        this.amountNumbers = amountNumbers;
    }
    useNumbers() {
        this.isNUmbers = true;
    }
    setAmountUpperChar(amountUpperChar) {
        if((amountUpperChar + this.amountSpecSymbols + this.amountNumbers) > this.length) {
            throw new Error(`Устанавливаемое вами число ${amountUpperChar} для заглавных символов  превышает сумму всех символов используемых в пароле \n Максимально возможное ${this.length - (this.amountSpecSymbols + this.amountNumbers)}`)
        }
        this.amountUpperChars = amountUpperChar;
    }
    
    setAmountSpecSymbols(amountSpecSymbols) {
        if((amountSpecSymbols + this.amountUpperChars + this.amountNumbers) > this.length) {
            throw new Error(`Устанавливаемое вами число ${amountSpecSymbols} для специальных символов  превышает сумму всех символов используемых в пароле \n Максимально возможное ${this.length - (this.amountUpperChars + this.amountNumbers)}`)
        }
        this.amountSpecSymbols = amountSpecSymbols;
    }

    useSpecSymbols() {
        this.isSpecSymbols = true;
    }
    #getLowerChars(length) {
        let lowerChars = '';
        for (let i = 0; i < length; i++) {
            lowerChars += HashPassword.lowerChars[Math.round(Math.random() * HashPassword.lowerChars.length)]
        }
        return lowerChars;
    }
    #getUpperChars() {
        let upperChars = '';
        for (let i = 0; i < this.amountUpperChars; i++) {
            upperChars += HashPassword.upperChars[Math.round(Math.random() * HashPassword.upperChars.length)]
        }
        return upperChars;
    }
    #getNumbers() {
        if (this.isNUmbers) {
            let numbers = '';
            for (let i = 0; i < this.amountNumbers; i++) {
                numbers += HashPassword.numbers[Math.round(Math.random() * HashPassword.numbers.length)]
            }
            return numbers;
        }
        return ''
    }
    #getSpecSymbols() {
        if (this.isSpecSymbols) {
            let specSymbols = '';
            for (let i = 0; i < this.amountSpecSymbols; i++) {
                specSymbols += HashPassword.specSymbols[Math.round(Math.random() * HashPassword.specSymbols.length)]
            }
            return specSymbols;
        }
        return ''
    }

    getPassword() {
        let password = '';
        password = this.#getUpperChars()
        password += this.#getSpecSymbols()
        password += this.#getNumbers()
        password += this.#getLowerChars(this.length - password.length)
        return password;
    }
}

const gph = new HashPassword();

module.exports = gph;


