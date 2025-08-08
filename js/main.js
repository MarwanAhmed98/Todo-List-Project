var SubmitBtn = document.getElementById('SubmitBtn');
var AddInput = document.getElementById('AddInput');
var AlertDiv = document.getElementById('AlertDiv');
var SubmitBtn = document.getElementById('SubmitBtn');
var UpdateBtn = document.getElementById('UpdateBtn');
var SearchInput = document.getElementById('SearchInput');
var listgroup = document.getElementById('list-group');
var CurrentIndex
var notes = []
if (localStorage.getItem("notes") != null) {
    notes = JSON.parse(localStorage.getItem("notes"));
    DisplayNotes()
}
function AddTodo() {
    var NotesList = {
        NotesValue: AddInput.value,
    }
    notes.push(NotesList);
    localStorage.setItem("notes", JSON.stringify(notes))
    DisplayNotes();
    ClearForm();
    console.log(notes);
}
function DisplayNotes() {
    var cartona = '';
    for (let i = 0; i < notes.length; i++) {
        cartona += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${notes[i].NotesValue}</span>
            <div class="MyIcons d-flex">
                <i onclick="DeleteTodo(${i})" class="far fa-trash-alt delete me-3"></i>
                <i onclick="UpdateTodo(${i})" class="fa-solid fa-pen-to-square"></i>
            </div>
        </li>`;
    }
    listgroup.innerHTML = cartona;
}
function ClearForm() {
    AddInput.value = '';
}
function DeleteTodo(index) {
    notes.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notes))
    DisplayNotes();
}
function InputSearch() {
    var currenttext = SearchInput.value;

    var cartona = '';
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].NotesValue.toLowerCase().includes(currenttext.toLowerCase())) {
            cartona += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${notes[i].NotesValue}</span>
            <div class="MyIcons d-flex">
                <i onclick="DeleteTodo(${i})" class="far fa-trash-alt delete me-3"></i>
                <i onclick="UpdateTodo(${i})" class="fa-solid fa-pen-to-square"></i>
            </div>
        </li>`;
        }
    }
    listgroup.innerHTML = cartona;
}
function UpdateTodo(index) {
    CurrentIndex = index;
    console.log(CurrentIndex);
    AddInput.value = notes[index].NotesValue;
    SubmitBtn.classList.add('d-none');
    UpdateBtn.classList.remove('d-none')
}
function UpdateAll() {
    var NotesList = {
        NotesValue: AddInput.value,
    }
    notes.splice(CurrentIndex, 1, NotesList);
    localStorage.setItem("notes", JSON.stringify(notes))
    DisplayNotes();
    ClearForm();
    console.log(notes);
}
var TodoRegex = /^(?!\s)(.{3,})(?<!\s)$/
function ValidRegex() {
    if (TodoRegex.test(AddInput.value)) {
        return true
    }
    else {
        return false
    }
}
AddInput.addEventListener('keyup', () => {
    if (ValidRegex()) {
        console.log("Valid");
        AddInput.classList.add('is-valid')
        AddInput.classList.remove('is-invalid')
        AlertDiv.classList.add('d-none')
    }
    else {
        console.log("Invalid");
        AddInput.classList.add('is-invalid')
        AddInput.classList.remove('is-valid')
        AlertDiv.classList.remove('d-none')

    }
})
