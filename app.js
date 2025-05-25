const statusEl = document.getElementById("status");
const btnOn = document.getElementById("btn-on");
const btnOff = document.getElementById("btn-off");
const btnAuto = document.getElementById("btn-auto");

const mqtt = window.mqtt;  // Asegúrate de incluir mqtt.js en tu HTML

const client = mqtt.connect("wss://broker.emqx.io:8084/mqtt");

client.on("connect", () => {
  statusEl.textContent = "✅ Conectado al broker MQTT.";
  client.subscribe("habitacion/sensores");
});

client.on("message", (topic, message) => {
  if (topic === "habitacion/sensores") {
    const datos = JSON.parse(message.toString());
    statusEl.textContent = `💡 LDR: ${datos.ldr} | 👤 PIR: ${datos.pir} | 💡 LED: ${datos.led}`;
  }
});

function enviarComando(comando) {
  client.publish("habitacion/control", comando);
}

btnOn.addEventListener("click", () => enviarComando("encender"));
btnOff.addEventListener("click", () => enviarComando("apagar"));
btnAuto.addEventListener("click", () => enviarComando("automatico"));
