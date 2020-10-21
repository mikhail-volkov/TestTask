
const url = ['https://jsonplaceholder.typicode.com/todos', 
'https://jsonplaceholder.typicode.com/users/5/todos', 
'https://jsonplaceholder.typicode.com/users/10/todos'];

let str = ''
let ul = document.querySelector('.list')
let search = document.querySelector('#search')
let submit = document.querySelector('.submit')
let reset = document.querySelector('.reset')
let tel = document.querySelector('#tel')

//Заполнение полей input из localStorage
document.addEventListener('DOMContentLoaded', () => {
    search.value = ''
    tel.value = ''
    if (localStorage.length !== 0) {
        search.value = localStorage.getItem('search')
        tel.value = localStorage.getItem('tel')
    }
})

// Поиск подстроки в базе данных
search.addEventListener('input', inputHendler)

// Проверка поля для ввода телефона на не цифры
tel.addEventListener('input', () => {
    let num = tel.value.replace(/\D/, '')
    tel.value = num
})

// Выбор элемента из списка
ul.addEventListener('click', (e) => {
    let target = e.target
    search.value = target.innerText
    ul.innerText = ''
})
// Закрытие списка, если он уже не нужен
document.addEventListener('click', () => {
    ul.innerText = ''
})
// Возобновление поиска при неочищенном инпуте
search.addEventListener('focus', inputHendler)

// Обработчик событий на кнопку Отправить
submit.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.setItem('search', search.value)
    localStorage.setItem('tel', tel.value)
    // Отправляем данные на сервер
    submitHendler(search.value, tel.value)
    search.value = ''
    tel.value = ''
})

// Очищаем localStorage
reset.addEventListener('click', () => {
    localStorage.clear()
})

function inputHendler() {
    str = search.value.replace(/\d/, '')
    search.value = str
    ul.innerText = ''
    for (let item of url) {
        let isFind = false
        fetch(item)
        .then(responce => responce.json()
        .then(data => {
            for (let item of data){
                if (item.title.startsWith(str) && str !== '') {
                    isFind = true
                    outOptions(item.title)
                }
            } 
        }))
    }
}

function outOptions(str) {
    let li = document.createElement('li')
    li.innerText = str
    ul.insertAdjacentElement('afterbegin', li)
}

function submitHendler(search, tel) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            search,
            tel
        }),
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
}

