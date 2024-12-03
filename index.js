// selecting the add button and the app container
const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

// load saved notes from localStorage and display them on the app
getNotes().forEach((note) => {
    const noteEl = createNoteEl(note.id, note.content);
    appEl.insertBefore(noteEl, btnEl);
});

// function to create a note element with id and content
function createNoteEl(id, content) {
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.placeholder = "Empty Note";
    element.value = content;

    // now confirm note deletion on double click
    element.addEventListener("dblclick", () => {
        const warning = confirm("Do you want to delete this note?");
        if (warning) {
            deleteNote(id, element);
        }
    });

    // update note content on input change
    element.addEventListener("input", () => {
        updateNote(id, element.value);
    });

    return element; // return created element
}

// function to delete a note by ID
function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id);
    saveNote(notes);
    appEl.removeChild(element); // remove the note from the DOM
}

// function to update content in localStorage
function updateNote(id, content) {
    const notes = getNotes();
    const target = notes.find((note) => note.id == id);
    target.content = content;
    saveNote(notes);
}

// function to add a new note
function addNote() {
    const notes = getNotes(); // get the existing notes
    const noteObj = {
        id: Math.floor(Math.random() * 100000), // generate random id for the note
        content: "", // start with an empty note
    };
    const noteEl = createNoteEl(noteObj.id, noteObj.content); // create the new note element
    appEl.insertBefore(noteEl, btnEl); // insert the new note element before the button
    notes.push(noteObj); // add the new note to the list
    saveNote(notes); // save updated notes in local storage
}

// function to save notes to local storage
function saveNote(notes) {
    localStorage.setItem("note-app", JSON.stringify(notes));
}

// function to get notes from localStorage
function getNotes() {
    return JSON.parse(localStorage.getItem("note-app") || "[]");
}

// add an event listener to the button to add new note
btnEl.addEventListener("click", addNote);
