// script.js const chat = document.getElementById('chat');

function appendMessage(sender, text) { const bubble = document.createElement('div'); bubble.classList.add('chat-bubble', sender); bubble.textContent = text; chat.appendChild(bubble); chat.scrollTop = chat.scrollHeight; }

async function sendMessage() { const input = document.getElementById('userInput'); const message = input.value.trim(); if (!message) return;

appendMessage('user', message); input.value = '';

appendMessage('bot', 'Thinking...');

try { const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1', { method: 'POST', headers: { 'Authorization': Bearer ${HF_TOKEN}, 'Content-Type': 'application/json' }, body: JSON.stringify({ inputs: message }) });

const data = await response.json();

let reply = '';
if (Array.isArray(data) && data[0]?.generated_text) {
  reply = data[0].generated_text;
} else if (data.error) {
  reply = `Error: ${data.error}`;
} else if (data.estimated_time) {
  reply = `Model is loading. Estimated time: ${data.estimated_time}s`;
} else {
  reply = 'Sorry, I could not understand.';
}

document.querySelector('.bot:last-child').textContent = reply;

} catch (error) { document.querySelector('.bot:last-child').textContent = 'Error: Could not reach the AI service.'; console.error(error); } }

