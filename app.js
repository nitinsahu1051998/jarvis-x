const $ = (id) => document.getElementById(id);
const log = $("log");
let recognition = null;
let listening = false;

function addMessage(text, who="bot") {
  const item = document.createElement("div");
  item.className = `bubble ${who}`;
  const label = document.createElement("b");
  label.textContent = who === "user" ? "YOU" : "JARVIS X";
  const p = document.createElement("p");
  p.textContent = text;
  item.append(label, p);
  log.appendChild(item);
  log.scrollTop = log.scrollHeight;
}
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = /[\u0900-\u097F]/.test(text) ? "hi-IN" : "en-IN";
  utterance.rate = 1;
  window.speechSynthesis.speak(utterance);
}
function reply(text) { addMessage(text); speak(text); }
function openSite(url) {
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) reply("Pop-up blocked. Please allow opening this site, or open it from your browser.");
}
function handleCommand(raw) {
  const q = raw.trim().toLowerCase();
  if (!q) return;
  addMessage(raw, "user");

  if (/(hello|hi jarvis|hey jarvis|namaste|नमस्ते|हेलो)/i.test(q)) {
    reply("Namaste! Main JARVIS X hoon. Aapki kya help kar sakta hoon?");
  } else if (/(time|समय|टाइम)/i.test(q)) {
    const t = new Date().toLocaleTimeString("en-IN", {hour:"numeric", minute:"2-digit"});
    reply("Abhi time hai " + t + ".");
  } else if (/(date|दिनांक|तारीख|आज की डेट)/i.test(q)) {
    const d = new Date().toLocaleDateString("hi-IN", {weekday:"long", day:"numeric", month:"long", year:"numeric"});
    reply("Aaj " + d + " hai.");
  } else if (/(youtube|यूट्यूब)/i.test(q) && /(open|kholo|खोलो|चलाओ|chalao)/i.test(q)) {
    reply("YouTube khol raha hoon."); openSite("https://www.youtube.com/");
  } else if (/(google|गूगल)/i.test(q) && /(open|kholo|खोलो)/i.test(q)) {
    reply("Google khol raha hoon."); openSite("https://www.google.com/");
  } else if (/(help|मदद|commands)/i.test(q)) {
    reply("Aap time, date, Namaste, YouTube kholo, ya Google kholo bol sakte hain. Ye starter version hai; naye commands hum code mein add karenge.");
  } else {
    reply("Maine suna: " + raw + ". Abhi mere starter version mein ye command add nahi hai. Hum ise apne code mein add kar sakte hain.");
  }
}
function startListening() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    $("support").textContent = "Speech recognition is not available in this browser. Try updated Google Chrome on Android.";
    return;
  }
  if (listening && recognition) { recognition.stop(); return; }
  recognition = new SR();
  recognition.lang = "hi-IN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onstart = () => {
    listening = true; $("state").textContent = "Listening..."; $("hint").textContent = "Ab boliye — हिंदी या English."; $("micBtn").innerHTML = "⏹️ <span>STOP LISTENING</span>"; document.body.classList.add("listening");
  };
  recognition.onresult = (event) => handleCommand(event.results[0][0].transcript);
  recognition.onerror = (event) => {
    $("hint").textContent = "Voice error: " + event.error + ". Please check microphone permission and internet connection.";
  };
  recognition.onend = () => {
    listening = false; $("state").textContent = "Ready when you are"; $("hint").textContent = "Tap the microphone and speak in Hindi or English."; $("micBtn").innerHTML = "🎙️ <span>START LISTENING</span>"; document.body.classList.remove("listening");
  };
  recognition.start();
}
$("micBtn").addEventListener("click", startListening);
$("textForm").addEventListener("submit", (e) => { e.preventDefault(); const v=$("textInput").value; $("textInput").value=""; handleCommand(v); });
$("clearBtn").addEventListener("click", () => { log.replaceChildren(); });
document.querySelectorAll("[data-cmd]").forEach(btn => btn.addEventListener("click", () => handleCommand(btn.dataset.cmd)));
