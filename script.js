setInterval(function () { // Date and time function
            document.querySelector("#timeElement").innerHTML = new Date().toLocaleString();
        }, 1000);

// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));

dragElement(document.querySelector("#notes"));

dragElement(document.querySelector("#games"));

dragElement(document.querySelector("#ai"));

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    var topBarHeight = document.getElementById("top").offsetHeight;
    var newTop = element.offsetTop - currentY;

    if (newTop < topBarHeight) {
      newTop = topBarHeight;
    }

    element.style.top = newTop + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// THE DRAGGING BIT (above) IS FROM W3SCHOOLS IT'S NOT MINE

// Going to try and make functions to open and close a window now this section is a little bit messy though

var welcomeScreen = document.querySelector("#welcome")

var notesScreen = document.querySelector("#notes")

var gamesScreen = document.querySelector("#games")

var aiScreen = document.querySelector("#ai")

var notesScreenClose = document.querySelector("#notesclose")

var gamesScreenClose = document.querySelector("#gamesclose")

var aiScreenClose = document.querySelector("#aiclose")

notesScreenClose.addEventListener("click", () => closeWindow(notesScreen));

gamesScreenClose.addEventListener("click", () => closeWindow(gamesScreen));

aiScreenClose.addEventListener("click", () => closeWindow(aiScreen));

function closeWindow(element) {
  element.style.display = "none"
}

var topBar = document.querySelector("#top")

function openWindow(element) {
  element.style.display = "block"
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

var welcomeScreenClose = document.querySelector("#welcomeclose")

var welcomeScreenOpen = document.querySelector("#welcomeopen")


welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
});

var notesScreenOpen = document.querySelector("#notesopen")

notesScreenOpen.addEventListener("click", function() {
  openWindow(notesScreen);
});

var gamesScreenOpen = document.querySelector("#gamesopen")

gamesScreenOpen.addEventListener("click", function() {
  openWindow(gamesScreen);
});

var aiScreenOpen = document.querySelector("#aiopen")

aiScreenOpen.addEventListener("click", function() {
  openWindow(aiScreen);
});

var biggestIndex = 1;

// NOTE TO SELF: remember to call for each window

addWindowTapHandling(welcomeScreen)
addWindowTapHandling(notesScreen)
addWindowTapHandling(gamesScreen)
addWindowTapHandling(aiScreen)

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}

function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

initializeWindow("notes")

initializeWindow("games")

initializeWindow("ai")

function initializeWindow(elementName) {
  var screen = document.querySelector("#" + elementName)
  addWindowTapHandling(screen)
  dragElement(screen)
}

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
        </p>
        `
  },
  {
    title: "Sample Text",
    date: "26/07/2026",
    content: `
              <p contenteditable="True">
          Here's some sample text
        </p>
      `
  }
]

function setNotesContent(index) {

  var notesContent = document.querySelector("#notesContent")

  notesContent.innerHTML = content[index].content
}

setNotesContent(0)

function addToSideBar(index) {
	var sidebar = document.querySelector("#notesSidebar");

  var note = content[index];

  var newDiv = document.createElement("div");

  newDiv.innerHTML = `
    <p style="margin: 0px;">
      ${note.title}
    </p>
    <p style="font-size: 12px; margin: 0px;">
      ${note.date}
    </p>
  `;

  newDiv.addEventListener("click", function() {
    setNotesContent(index);
  });

  sidebar.appendChild(newDiv);
}

for (let i = 0; i < content.length; i++) {
  addToSideBar(i)
}

// god this ai stuff took quite a bit to figure out but yh im js linking cloudfare and and doing the ai prompt stuff here

var aiInput = document.querySelector("#aiInput")
var aiSend = document.querySelector("#aiSend")
var aiMessages = document.querySelector("#aiMessages")

aiSend.addEventListener("click", function() {
  var userText = aiInput.value

  if (userText === "") {
    return
  }

  var userMsg = document.createElement("p")
  userMsg.textContent = userText
  aiMessages.appendChild(userMsg)

  aiInput.value = ""

  var loadingMsg = document.createElement("p")
  loadingMsg.textContent = "..."
  loadingMsg.id = "loadingMsg"
  aiMessages.appendChild(loadingMsg)

  fetch("https://cobalt-os-proxy.alikambalosman8.workers.dev", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: userText })
  })
    .then(function(res) {
      return res.json()
    })
    .then(function(data) {
      document.getElementById("loadingMsg").remove()
      var reply = data.candidates[0].content.parts[0].text
      var aiMsg = document.createElement("p")
      aiMsg.textContent = reply
      aiMessages.appendChild(aiMsg)
    })
})