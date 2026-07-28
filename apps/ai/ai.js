dragElement(document.querySelector("#ai"));

var aiScreen = document.querySelector("#ai")

var aiScreenClose = document.querySelector("#aiclose")

aiScreenClose.addEventListener("click", () => closeWindow(aiScreen));

var aiScreenOpen = document.querySelector("#aiopen")

aiScreenOpen.addEventListener("click", function() {
  openWindow(aiScreen);
});

addWindowTapHandling(aiScreen)

initializeWindow("ai")

var aiInput = document.querySelector("#aiInput")
var aiSend = document.querySelector("#aiSend")
var aiMessages = document.querySelector("#aiMessages")

// this ai and database stuff genuinely took forever

aiSend.addEventListener("click", function() {
  var userText = aiInput.value

  if (userText === "") {
    return
  }

  var userMsg = document.createElement("p")
  userMsg.textContent = userText
  userMsg.className = "userBubble"
  aiMessages.appendChild(userMsg)

  aiInput.value = ""

  var loadingMsg = document.createElement("p")
  loadingMsg.textContent = "..."
  loadingMsg.id = "loadingMsg"
  aiMessages.appendChild(loadingMsg)
  aiMessages.scrollTop = aiMessages.scrollHeight

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

       if (data.error) {
        var errMsg = document.createElement("p")
        errMsg.textContent = "Cobalt AI is unavailable right now (rate limit reached). Try again later."
        errMsg.className = "aiBubble"
        aiMessages.appendChild(errMsg)
        aiMessages.scrollTop = aiMessages.scrollHeight
        return
      }
      
      var reply = data.candidates[0].content.parts[0].text
      var aiMsg = document.createElement("p")
      aiMsg.innerHTML = marked.parse(reply)
      aiMsg.className = "aiBubble"
      aiMessages.appendChild(aiMsg)
      aiMessages.scrollTop = aiMessages.scrollHeight
    })
})