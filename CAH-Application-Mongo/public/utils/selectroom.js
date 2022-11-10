const nameDiv = document.getElementById("name");
const roomDiv = document.getElementById("room");

var nameValue = "Player"+ Math.floor(Math.random() * 1000);
nameDiv.value = nameValue;

function setUserName() {
    localStorage.setItem("uname", nameDiv.value);
    localStorage.setItem("uroom", roomDiv.value.toUpperCase());
}