const socket = io();

socket.on("message", (welcomeMessage) => {
  console.log(welcomeMessage);
});

// get form
document.getElementById("messageForm").addEventListener("submit", (evt) => {
  evt.preventDefault();
  // get intput text
  const inputText = document.getElementById("messageBox");
  let message = inputText.value;
  setTimeout(() => {
    socket.emit("sendMessage", message);
  }, 300);

  // reset form value
  inputText.value = "";
});
