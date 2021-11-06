// varieble
const noteList = document.querySelector("#note-list");

// eventlistener
eventListeners();
function eventListeners() {
  // form submission
  document.querySelector("#form").addEventListener("submit", newNote);

  // removenote event listener
  document.querySelector("#note-list").addEventListener("click", removeNote);

  //get data from local storage on loaded
  document.addEventListener("DOMContentLoaded", localStorageOnLoaded);
}

//function
//adding new note
function newNote(e) {
  e.preventDefault();

  //accses to textarea value
  const note = document.querySelector("#note").value;

  //create remove btn
  const removeBtn = document.createElement("a");
  removeBtn.textContent = "x";
  removeBtn.classList = "d-note";
  // removeBtn.classList = "fa , fa-xmark";

  // create <li> tag
  const li = document.createElement("li");
  li.classList = "note-li";
  li.appendChild(document.createTextNode(note));

  //add remove btn to li
  li.appendChild(removeBtn);

  // add li to noteList <div>
  noteList.appendChild(li);

  //add notes to local storage

  this.reset();

  addNoteToLocalStorage(note);

  alert("متن شما با موفقیت ذخیره شد 😍");
}

// remove function

function removeNote(e) {
  if (e.target.classList.contains("d-note")) {
    e.target.parentElement.remove();
  }

  //remove note from local storage
  // console.log(e.target.parentElement.textContent);
  removeNotesLocalStorage(e.target.parentElement.textContent);
}

// get notes from local storage
function addNoteToLocalStorage(note) {
  //get notes from local storage
  const notes = getNoteFromLocalStorage();

  //add new note array
  notes.push(note);

  //send notes to local storage
  localStorage.setItem("notes", JSON.stringify(notes));
  console.log(notes);
}

//cheked local storage
function getNoteFromLocalStorage() {
  //get another notes from local storage
  let notes;
  let getFromLocalStorage = localStorage.getItem("notes");
  if (getFromLocalStorage === null) {
    notes = [];
  } else {
    notes = JSON.parse(getFromLocalStorage);
  }
  return notes;
}

function localStorageOnLoaded() {
  const notes = getNoteFromLocalStorage();

  //print item from local storage
  notes.forEach(function (note) {
    //create remove btn
    const removeBtn = document.createElement("a");
    removeBtn.textContent = "x";

    // create <li> tag
    const li = document.createElement("li");
    li.classList = "note-li";
    li.appendChild(document.createTextNode(note));

    //add remove btn to li
    li.appendChild(removeBtn);

    // add li to noteList <div>
    noteList.appendChild(li);
  });
}

//remove notes from local storage

function removeNotesLocalStorage(noteContent) {
  const noteDeleted = noteContent.substring(0, noteContent.length - 1);
  //get notes from local storage
  const noteFromLS = getNoteFromLocalStorage();

  noteFromLS.forEach(function (note, index) {
    if (note === noteDeleted) {
      noteFromLS.splice(index, 1);
    }
  });
  localStorage.setItem("notes", JSON.stringify(noteFromLS));
}
