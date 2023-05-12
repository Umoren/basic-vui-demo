let recognition;

const startButton = document.getElementById("startButton");
const targetButton = document.getElementById("targetButton");

targetButton.addEventListener("click", () => {
  alert("Button clicked!");
});

function toggleRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (recognition) {
    recognition.stop();
    recognition = null;
    startButton.textContent = "Start Recognition";
    startButton.classList.remove("listening");
  } else {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.start();
    startButton.textContent = "Stop Recognition";
    startButton.classList.add("listening");

    recognition.onresult = function (event) {
      const transcript = event.results[event.results.length - 1][0].transcript;

      if (transcript.toLowerCase() === "click me") {
        targetButton.click();
        console.log('The "Click me" command has been recognized.');
      }
    };

    recognition.onerror = function (event) {
      if (event.error === "no-speech") {
        alert("No speech was detected. Try again.");
      }
    };

    recognition.onend = function () {
      if (recognition) {
        recognition.start();
      }
    };
  }
}

startButton.addEventListener("click", toggleRecognition);
