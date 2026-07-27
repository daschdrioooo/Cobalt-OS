dragElement(document.querySelector("#notes"));

var notesScreen = document.querySelector("#notes")

var notesScreenClose = document.querySelector("#notesclose")

notesScreenClose.addEventListener("click", () => closeWindow(notesScreen));

var notesScreenOpen = document.querySelector("#notesopen")

notesScreenOpen.addEventListener("click", function() {
  openWindow(notesScreen);
});

addWindowTapHandling(notesScreen)

initializeWindow("notes")

function setNotesContent(index) {
  currentNoteIndex = index
  var notesContent = document.querySelector("#notesContent")
  notesContent.innerHTML = content[index].content
}

var currentNoteIndex = 0

var notesContent = document.querySelector("#notesContent")

notesContent.addEventListener("input", function() {
  content[currentNoteIndex].content = notesContent.innerHTML
  saveNotes()
})

var newNoteBtn = document.querySelector("#newNoteButton")

newNoteBtn.addEventListener("click", function() {
  var newNote = { title: "New Note", date: new Date().toLocaleDateString(), content: "<p contenteditable=\"true\">New note</p>" }
  content.push(newNote)
  addToSideBar(content.length - 1)
  setNotesContent(content.length - 1)
  saveNotes()
})

var content = [
  {
    title: "Welcome",
    date: "26/07/2026",
    content: ` <p contenteditable="True">
          <span contenteditable="true">Welcome to <strong>Cobalt Notes</strong>
            </br>
            </br>
            This is a place where you can write about anything that comes to mind. Whether it be a past adventure, random thoughts or just ideas to remember later.
          </span>
        <blockquote
          style="background-color: #F9F9F9; margin-top: 16x; margin-bottom: 16px; margin-left: 0px; margin-right: 0px; padding: 16px; border-radius: 16px;"
          contenteditable="true">
          <i>Man's only limitation, within reason, lies in his development and use of his imagination.
            </br>
          </br>
            ~ Napoleon Hill
          </i>
        </blockquote>
        <span contenteditable="true">
          </br>
          Click the New Note button to add a new note, and then you can edit it! It saves to your browser, so you can keep your notes even after you close the OS.
        </span>
        </p>
        `
  }
]

function addToSideBar(index) {
	var sidebar = document.querySelector("#notesSidebar");

  var note = content[index];

  var newDiv = document.createElement("div");

  newDiv.innerHTML = `
    <p contenteditable="true" style="margin: 0px;">
      ${note.title}
    </p>
    <p style="font-size: 12px; margin: 0px;">
      ${note.date}
    </p>
  `;

  var titleElement = newDiv.querySelector("p")

  titleElement.addEventListener("input", function() {
    content[index].title = titleElement.textContent
    saveNotes()
  })

  newDiv.addEventListener("click", function() {
    setNotesContent(index);
  });

  sidebar.appendChild(newDiv);
}

function saveNotes() {
  fetch("https://cobalt-os-proxy.alikambalosman8.workers.dev/notes/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: userId, notes: content })
  })
}

function renderNotesUI() {
  var sidebar = document.querySelector("#notesSidebar")
  sidebar.innerHTML = ""

  for (let i = 0; i < content.length; i++) {
    addToSideBar(i)
  }

  setNotesContent(0)
}

fetch("https://cobalt-os-proxy.alikambalosman8.workers.dev/notes/load", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userId: userId })
})
  .then(function(res) {
    return res.json()
  })
  .then(function(savedNotes) {
    console.log("Loaded from server:", savedNotes)
    if (savedNotes !== null) {
      content = savedNotes
    }
    renderNotesUI()
  })
