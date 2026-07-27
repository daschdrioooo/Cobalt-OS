dragElement(document.querySelector("#games"));

var gamesScreen = document.querySelector("#games")

var gamesScreenClose = document.querySelector("#gamesclose")

gamesScreenClose.addEventListener("click", () => closeWindow(gamesScreen));

var gamesScreenOpen = document.querySelector("#gamesopen")

gamesScreenOpen.addEventListener("click", function() {
  openWindow(gamesScreen);
});

addWindowTapHandling(gamesScreen)

initializeWindow("games")