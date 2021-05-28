let $todoInput; // miejsce, gdzie użytkownik wpisuje treść
let $alertInfo; // info o braku zadań / konieczności dodania tekstu
let $addBtn; // orzycisk ADD - dodaje nowe elementy do listy
let $ulList; // nasza lista zadań, tagi <ul></ul>
let $newTask; //dynamicznie tworzone li

let $popup; // pobrany popup
let $popupinfo; // alert w popupie, jak się doda pusty tekst
let $editedTodo; // edytowany Todo
let $popupInput; // tekst wpisywany w inputa w popu'pie
let $addPopupBtn; // przycisk 'zatwierdz' w popup'ie
let $closeTodoBtn //przycisk zamykania popup'a
let $idNumber = 0;
let $allTasks;

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};

//pobieramy nasze elementy
const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('li');
};

// nadajemy nasłuchiwanie
const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', enterCheck);
};

// dodajemy nowy element do listy
const addNewTask = () => {
    if($todoInput.value !== '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);
        

        $todoInput.value = '';
        $alertInfo.innerText = '';

        createToolsAre();
    } else {
        $alertInfo.innerHTML = 'Wpisz treść zadania!';
    }
};

const enterCheck = () => {
    if(event.key == 'Enter') {
        addNewTask();
    }
};


// tworzymy przyciski edycji, usuwania, i 'gotowe'
const createToolsAre = () => {
    let toolsPanel = document.createElement('div')
    let completeBtn = document.createElement('button')
    let editBtn = document.createElement('button')
    let deleteBtn = document.createElement('button')
    
    toolsPanel.classList.add('tools');
    completeBtn.classList.add('complete');
    editBtn.classList.add('edit');
    deleteBtn.classList.add('delete');
    
    $newTask.appendChild(toolsPanel);
    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);
    
    completeBtn.innerHTML = '<i class = "fas fa-check"></i>';
    editBtn.innerText = 'EDIT';
    deleteBtn.innerHTML = '<i class = "fas fa-times"></i>';

};
// zarządzanie kliknięciami w przyciski
const checkClick = (e) => {
    if(e.target.closest('button').classList.contains('complete')) {
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');
    } else if(e.target.closest('button').className === 'edit') {
        editTask(e);
    } else if(e.target.closest('button').className === 'delete') {
        deleteTask(e);
    }
};

const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;

    $popup.style.display = 'flex';
};
// sprawdzamy czy popup nie jest pusty i zmieniamy treść zadania
const changeTodo = () => {
    if ($popupInput.value !== '') {
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
        $popupInfo.innerText = '';
    } else {
        $popupInfo.innerText = 'Musisz podać jakąś treść!';
    }
};
// zamykanie popupa
const closePopup = () => {
    $popup.style.display = 'none';
    $popupInfo.innerText = '';
};
//Usuwanie zadania
const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();
    
    if($allTasks.length === 0) {
        $alertInfo.innerText = 'Brak zadań na liście.';
    }
};


document.addEventListener('DOMContentLoaded', main);