const socket = io('http://localhost:3000')//puerto
const messageForm = document.getElementById('send-container') //obtener id
const messageContainer = document.getElementById('message-container') //obtener id
const messageInput = document.getElementById('message-input') // obtener id

const name = prompt('Cual es tu nombre?') //obtener nombre
appendMessage('Te uniste al chat!')
socket.emit('new-user', name) // aviso de union

socket.on('chat-message', data =>{
appendMessage(`${data.name}: ${data.message}`)
}) // mensaje

socket.on('user-connected', name =>{
appendMessage(`${name} conectado`)
}) // usuario conectado

socket.on('user-disconnected', name =>{
appendMessage(`${name} desconectado`)
}) // usuario desconectado


messageForm.addEventListener('submit', e=>{
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`Tu: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value=''
})



function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}