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

// send current location to other users

document.getElementById("sendLocation").addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit("location", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });
});
