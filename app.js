let recognition;

const startButton = document.getElementById("startButton");
const targetButton = document.getElementById("targetButton");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

targetButton.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
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
      const words = transcript.split(" ");

      for (const word of words) {
        console.log(word);
      }

      if (transcript.toLowerCase().includes("button")) {
        targetButton.click();
        console.log('The "button" command has been recognized.');
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
