// Chatbot IA para GlobalPro 4x4 Chile
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-input');
const chatToggle = document.getElementById('chat-toggle');
const bot = document.getElementById('chat-bot');

let visible = true;
chatToggle.onclick = () => {
  visible = !visible;
  bot.style.display = visible ? 'flex' : 'none';
  chatToggle.textContent = visible ? '−' : '+';
};

// Mensaje inicial
addMessage('¡Hola! 👋 Soy tu asesor 4x4. ¿Qué modelo de Jeep tienes y qué accesorio buscas?', 'bot');

chatForm.onsubmit = async (e) => {
  e.preventDefault();
  const input = document.getElementById('chat-text');
  const msg = input.value.trim();
  if(!msg) return;

  addMessage(msg, 'user');
  input.value = '';

  const res = await fetch('https://chat.globalpro.pages.dev/chat', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({message: msg})
  }).then(r => r.json()).catch(() => ({reply: 'Error de conexión. Escríbenos al WhatsApp +56912345678'}));

  addMessage(res.reply, 'bot');
};

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = sender === 'user' ? 'msg-user' : 'msg-bot';
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}