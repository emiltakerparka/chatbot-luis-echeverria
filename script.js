async function loadResponses() {
  const res = await fetch("data.json");
  return await res.json();
}

let respuestas = {};

loadResponses().then(data => {
  respuestas = data;
});

function sendMessage() {
  const input = document.getElementById("userInput");
  const question = input.value.toLowerCase().trim();
  const conversation = document.getElementById("conversation");

  let response = respuestas[question] || "Lo siento, no entiendo la pregunta.";
  
  conversation.innerHTML += `<p><strong>Tú:</strong> ${question}</p>`;
  conversation.innerHTML += `<p><strong>Luis Echeverría:</strong> ${response}</p>`;
  input.value = "";

  // Leer en voz alta
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(response);
  utter.lang = "es-MX";
  synth.speak(utter);

  conversation.scrollTop = conversation.scrollHeight;
}
