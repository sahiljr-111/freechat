const socket = io();

let name;
let msgdisplay = document.querySelector('#textarea');
let mssgbox = document.getElementsByClassName('mssgbox')
do {
  name = prompt("please enter your name:");
} while (!name);

socket.emit('new-user-joined', name);
const appendmsg = (name, type) => {
  let msgElement = document.createElement('div');
  let className = type;
  msgElement.classList.add(className, 'message');
  let markup = `
    <h4>${name}</h4>
  `
  msgElement.innerHTML = markup;
  mssgbox[0].appendChild(msgElement);
} 
socket.on('user-joined', name => {
  appendmsg(`${name} joined the chat`,'incomming');
})

let userboard = document.getElementById("userbox").innerHTML = name;
msgdisplay.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    sendMessage(e.target.value);
    msgdisplay.value = null;
  }
})

function sendMessage(msges) {
  let msg = {
    user: name,
    message: msges
  }
  // append msg
  appendMessage(msg, 'outgoing');

  // server msg
  socket.emit('message', msg)
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement('div');
  let className = type;
  mainDiv.classList.add(className, 'message');
  let markup = `
    <h4>${msg.user}</h4>
    <p class="mb-2">${msg.message}</p>
  `
  mainDiv.innerHTML = markup;
  mssgbox[0].appendChild(mainDiv);
}

// recieve msg
socket.on('message', (msg) => {
  appendMessage(msg, 'incoming')
})
