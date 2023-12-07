function saveNote() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const color = document.getElementById('noteColor').value;
    const pin = document.getElementById('notePin').checked;

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}, ${hours}:${minutes}`;

    const note = {
        title,
        content,
        color,
        pin,
        date: formattedDate,
    };

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));

    loadNotes();
}

function loadNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.sort((a, b) => b.pin - a.pin);

    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        const noteElement = document.createElement('div');
        noteElement.className = 'note card';
        noteElement.style.background = note.color;

        noteElement.innerHTML = `
            <div class="card-body">
                <button class="btn btn-danger float-right" onclick="deleteNote(${i})">Usuń</button>
                <h2 class="card-title">${note.title}</h2>
                <p class="card-text">${note.content}</p>
                <p>${note.date}</p>
                ${note.pin ? '<p class="pin badge badge-danger">PINNED</p>' : ''}
            </div>
        `;

        notesList.appendChild(noteElement);
    }
}
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1); 
    localStorage.setItem('notes', JSON.stringify(notes));

    loadNotes(); 
}


loadNotes();