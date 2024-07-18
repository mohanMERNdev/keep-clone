document.addEventListener('DOMContentLoaded', () => {
    const createNoteButton = document.getElementById('createNoteButton');
    const allNotesButton = document.getElementById('allNotesButton');
    const viewLabelButton = document.getElementById('viewLabelButton');
    const trashButton = document.getElementById('trashButton');
    const labelButton = document.getElementById('labelButton');
    const labelInput = document.getElementById('labelInput');
    const notesContainer = document.getElementById('notesContainer');
    const noteContent = document.getElementById('noteContent');
    const noteTags = document.getElementById('noteTags');
    const noteColor = document.getElementById('noteColor');

    let notes = [];
    let trash = [];

    noteColor.addEventListener('change', () => {
        noteContent.style.backgroundColor = noteColor.value;
    });

    createNoteButton.addEventListener('click', () => {
        const content = noteContent.value.trim();
        const tags = noteTags.value.trim().split(',').map(tag => tag.trim());
        const color = noteColor.value;
        if (content && tags.length > 0) {
            const note = { id: Date.now(), content, tags, color, archived: false };
            notes.push(note);
            noteContent.value = '';
            noteTags.value = '';
            noteColor.value = '#ffffff';
            noteContent.style.backgroundColor = '#ffffff';
            displayNotes(notes);
        }
    });

    allNotesButton.addEventListener('click', () => {
        displayNotes(notes);
    });

    labelButton.addEventListener('click', () => {
        const label = prompt('Enter label to filter:');
        if (label) {
            const filteredNotes = notes.filter(note => note.tags.includes(label));
            displayNotes(filteredNotes);
        }
    });

    trashButton.addEventListener('click', () => {
        displayNotes(trash);
    });

    function displayNotes(notesToDisplay) {
        notesContainer.innerHTML = '';
        notesToDisplay.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.style.backgroundColor = note.color;
            noteElement.innerHTML = `
                <p>${note.content}</p>
                <p>Tags: ${note.tags.join(', ')}</p>
                <div class="actions">
                    <button class="btn btn-danger deleteButton">Delete</button>
                </div>
            `;
            notesContainer.appendChild(noteElement);

            noteElement.querySelector('.deleteButton').addEventListener('click', () => {
                notes = notes.filter(n => n.id !== note.id);
                trash.push(note);
                displayNotes(notes);
            });
        });
    }
});
