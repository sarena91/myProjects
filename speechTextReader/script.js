const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textArea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./images/thirsty.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./images/hungry.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./images/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./images/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./images/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./images/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./images/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./images/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./images/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./images/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./images/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./images/play.jpg",
    text: "I Want To Play",
  },
  {
    image: "./images/cold.jpg",
    text: "I'm feeling cold",
  },
  {
    image: "./images/grandma.jpg",
    text: "I Want To Go To Grandma",
  },
  {
    image: "./images/bathroom.jpg",
    text: "I Need To Use The Bathroom",
  },
  {
    image: "./images/inside.jpg",
    text: "I Want To Stay Inside",
  },
];

data.forEach(createBox);

// create speech boxes
function createBox(item) {
  const box = document.createElement("div");

  const { image, text } = item;

  box.classList.add("box");
  box.innerHTML = `
        <img src="${image}" alt="${text}"/>
        <p class="info">${text}</p>
    `;

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // add active effect
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });

  main.appendChild(box);
}

// init speech synth
const message = new SpeechSynthesisUtterance();

// store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// set text
function setTextMessage(text) {
  message.text = text;
}

// speak text
function speakText() {
  speechSynthesis.speak(message);
}

// set voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// EVENT LISTENERS///////////////////////////////
// voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

// toggle text box
toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

// close button
closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

// change voice
voicesSelect.addEventListener("change", setVoice);

// read text button
readBtn.addEventListener("click", () => {
  setTextMessage(textArea.value);
  speakText();
});

getVoices();
