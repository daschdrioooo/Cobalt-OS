setInterval(function () { // Date and time function
            document.querySelector("#timeElement").innerHTML = new Date().toLocaleString();
        }, 1000);

// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));

dragElement(document.querySelector("#notes"));

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
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// THE DRAGGING BIT IS FROM W3SCHOOLS IT'S NOT MINE the open and close bit below is mine tho

// Going to try and make functions to open and close a window now this section is a little bit messy though

var welcomeScreen = document.querySelector("#welcome")

var notesScreen = document.querySelector("#notes")

var notesScreenClose = document.querySelector("#notesclose")

notesScreenClose.addEventListener("click", () => closeWindow(notesScreen));

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

var biggestIndex = 1;

// NOTE TO SELF: remember to call for each window

addWindowTapHandling(welcomeScreen)
addWindowTapHandling(notesScreen)

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
    date: "06/28/2023",
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