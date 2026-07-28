dragElement(document.querySelector("#terminal"));

var terminalScreen = document.querySelector("#terminal")

var terminalScreenClose = document.querySelector("#terminalclose")

terminalScreenClose.addEventListener("click", () => closeWindow(terminalScreen));

var terminalScreenOpen = document.querySelector("#terminalopen")

terminalScreenOpen.addEventListener("click", function() {
  openWindow(terminalScreen);
});

addWindowTapHandling(terminalScreen)

initializeWindow("terminal")