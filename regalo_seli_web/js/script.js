// =====================================================
// ESTADO GLOBAL
// =====================================================

let currentScene = 1;

let caughtLights = 0;
const totalLights = 5;

let growClicks = 0;
const targetGrowClicks = 6;

let caughtStars = 0;
const totalStars = 6;
const starsNeeded = 4;

let poppedBubbles = 0;
const targetBubbles = 6;

let openedEnvelopes = 0;
const totalEnvelopes = 3;

let isPlayingMusic = false;
let questionAnswered = false;

let starInterval = null;
let bubbleInterval = null;


// =====================================================
// ELEMENTOS DOM
// =====================================================

const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const startBtn = document.getElementById("startBtn");

const lightCountElem = document.getElementById("lightCount");
const lightArea = document.getElementById("lightArea");

const seedEmoji = document.getElementById("seedEmoji");
const growBtn = document.getElementById("growBtn");
const growCountElem = document.getElementById("growCount");
const growthBar = document.getElementById("growthBar");

const petalsLayer = document.getElementById("petalsLayer");

const questionResponse = document.getElementById("questionResponse");

const starCountElem = document.getElementById("starCount");
const starsArea = document.getElementById("starsArea");
const wishMessage = document.getElementById("wishMessage");

const bubbleCountElem = document.getElementById("bubbleCount");
const bubblesArea = document.getElementById("bubblesArea");

const envelopeCountElem = document.getElementById("envelopeCount");
const envelopesContainer = document.getElementById("envelopesContainer");

const continueQuestionBtn =
  document.getElementById("continueQuestionBtn");

const restartBtn =
  document.getElementById("restartBtn");


// =====================================================
// ETAPAS DE LA SEMILLITA
// =====================================================

const seedStages = [
  "🌱",
  "🌿",
  "🪴",
  "🌱",
  "🌸",
  "🌻"
];


// =====================================================
// MENSAJES DE ESTRELLAS
// =====================================================

const wishWords = [
  "TE",
  "QUIERO",
  "MUCHO",
  "💛"
];


// =====================================================
// PALABRAS DE BURBUJAS
// =====================================================

const bubbleWords = [
  "Tu sonrisa",
  "Tus ojos",
  "A tu lado",
  "Con vos",
  "Siempre",
  "Te quiero"
];


// =====================================================
// MÚSICA
// =====================================================

function updateMusicButton() {

  if (!musicToggle) {
    return;
  }

  if (isPlayingMusic) {

    musicToggle.classList.add("playing");

    musicToggle.setAttribute(
      "aria-label",
      "Pausar música"
    );

    musicToggle.setAttribute(
      "aria-pressed",
      "true"
    );

    musicToggle.querySelector(".music-icon").innerText = "🎵";

  } else {

    musicToggle.classList.remove("playing");

    musicToggle.setAttribute(
      "aria-label",
      "Reproducir música"
    );

    musicToggle.setAttribute(
      "aria-pressed",
      "false"
    );

    musicToggle.querySelector(".music-icon").innerText = "🔇";
  }
}


// =====================================================
// REPRODUCIR MÚSICA
// =====================================================

function startMusic() {

  if (!bgMusic) {
    return;
  }

  const playPromise = bgMusic.play();

  if (playPromise !== undefined) {

    playPromise
      .then(() => {

        isPlayingMusic = true;

        updateMusicButton();

      })
      .catch((error) => {

        isPlayingMusic = false;

        updateMusicButton();

        console.log(
          "El navegador bloqueó el autoplay:",
          error
        );
      });
  }
}


// =====================================================
// DETENER MÚSICA
// =====================================================

function stopMusic() {

  if (!bgMusic) {
    return;
  }

  bgMusic.pause();

  isPlayingMusic = false;

  updateMusicButton();
}


// =====================================================
// BOTÓN DE MÚSICA
// =====================================================

if (musicToggle) {

  musicToggle.addEventListener(
    "click",
    () => {

      if (isPlayingMusic) {

        stopMusic();

      } else {

        startMusic();

      }

    }
  );
}


// =====================================================
// INTENTO DE AUTOPLAY
// =====================================================

window.addEventListener(
  "load",
  () => {

    if (!bgMusic) {
      return;
    }

    bgMusic.volume = 0.65;

    /*
      Algunos navegadores permiten autoplay
      y otros lo bloquean.

      Si lo bloquean, el botón "Comenzar"
      iniciará la música mediante una interacción
      del usuario.
    */

    startMusic();

  }
);


// =====================================================
// EVENTO DE LA PRIMERA INTERACCIÓN
// =====================================================

document.addEventListener(
  "click",
  () => {

    if (!isPlayingMusic && bgMusic) {

      startMusic();

    }

  },
  {
    once: true
  }
);


// =====================================================
// BOTÓN COMENZAR
// =====================================================

if (startBtn) {

  startBtn.addEventListener(
    "click",
    () => {

      if (!isPlayingMusic) {
        startMusic();
      }

      nextScene(2);

    }
  );

}


// =====================================================
// CAMBIO DE ESCENA
// =====================================================

function nextScene(sceneNumber) {

  const currentSceneElem =
    document.getElementById(
      `scene${currentScene}`
    );

  const nextSceneElem =
    document.getElementById(
      `scene${sceneNumber}`
    );

  if (!nextSceneElem) {
    return;
  }

  if (currentSceneElem) {

    currentSceneElem.classList.remove(
      "active"
    );

  }

  currentScene = sceneNumber;

  nextSceneElem.classList.add("active");


  // ---------------------------------------------------
  // ESCENA 2
  // ---------------------------------------------------

  if (sceneNumber === 2) {
    initLightsGame();
  }


  // ---------------------------------------------------
  // ESCENA 3
  // ---------------------------------------------------

  if (sceneNumber === 3) {
    resetGrowth();
  }


  // ---------------------------------------------------
  // ESCENA 4
  // ---------------------------------------------------

  if (sceneNumber === 4) {
    initStarsGame();
  }


  // ---------------------------------------------------
  // ESCENA 5
  // ---------------------------------------------------

  if (sceneNumber === 5) {
    startFlowersScene();
  }


  // ---------------------------------------------------
  // ESCENA 6
  // ---------------------------------------------------

  if (sceneNumber === 6) {
    resetQuestion();
  }


  // ---------------------------------------------------
  // ESCENA 7
  // ---------------------------------------------------

  if (sceneNumber === 7) {
    initBubblesGame();
  }


  // ---------------------------------------------------
  // ESCENA 8
  // ---------------------------------------------------

  if (sceneNumber === 8) {
    resetEnvelopes();
  }


  // ---------------------------------------------------
  // ESCENA 9
  // ---------------------------------------------------

  if (sceneNumber === 9) {
    startFinalScene();
  }

}


// =====================================================
// REINICIAR TODO
// =====================================================

function restart() {

  // Detener intervalos anteriores
  if (starInterval) {
    clearInterval(starInterval);
    starInterval = null;
  }

  if (bubbleInterval) {
    clearInterval(bubbleInterval);
    bubbleInterval = null;
  }


  caughtLights = 0;
  growClicks = 0;
  caughtStars = 0;
  poppedBubbles = 0;
  openedEnvelopes = 0;

  questionAnswered = false;


  if (lightCountElem) {
    lightCountElem.innerText = "0";
  }


  if (seedEmoji) {

    seedEmoji.innerText =
      seedStages[0];

    seedEmoji.classList.remove(
      "growing"
    );

  }


  if (growCountElem) {
    growCountElem.innerText = "0";
  }


  if (growthBar) {
    growthBar.style.width = "0%";
  }


  if (growBtn) {
    growBtn.disabled = false;
  }


  if (questionResponse) {
    questionResponse.innerText = "";
  }


  if (starCountElem) {
    starCountElem.innerText = "0";
  }


  if (wishMessage) {
    wishMessage.innerText = "";
  }


  if (bubbleCountElem) {
    bubbleCountElem.innerText = "0";
  }


  if (envelopeCountElem) {
    envelopeCountElem.innerText = "0";
  }


  if (petalsLayer) {
    petalsLayer.innerHTML = "";
  }


  // Limpiar juegos
  if (lightArea) {
    lightArea.innerHTML = "";
  }


  if (starsArea) {
    starsArea.innerHTML = "";
  }


  if (bubblesArea) {
    bubblesArea.innerHTML = "";
  }


  // Resetear sobres
  document
    .querySelectorAll(".envelope")
    .forEach((env) => {

      env.classList.remove(
        "opened"
      );

      const text =
        env.querySelector(
          ".envelope-text"
        );

      if (text) {
        text.innerText = "";
      }

    });


  nextScene(1);

}


// =====================================================
// ESCENA 2: LUCIÉRNAGAS
// =====================================================

function initLightsGame() {

  if (!lightArea) {
    return;
  }

  lightArea.innerHTML = "";

  caughtLights = 0;

  if (lightCountElem) {
    lightCountElem.innerText = "0";
  }


  for (
    let i = 0;
    i < totalLights;
    i++
  ) {

    createLight();

  }

}


function createLight() {

  if (!lightArea) {
    return;
  }

  const light =
    document.createElement(
      "button"
    );

  light.type = "button";

  light.className = "light";

  light.setAttribute(
    "aria-label",
    "Atrapar luciérnaga"
  );


  const topPct =
    Math.floor(
      Math.random() * 76
    ) + 12;

  const leftPct =
    Math.floor(
      Math.random() * 76
    ) + 12;


  light.style.top =
    `${topPct}%`;

  light.style.left =
    `${leftPct}%`;

  light.style.animationDelay =
    `${(
      Math.random() * 1.5
    ).toFixed(2)}s`;


  light.addEventListener(
    "click",
    function () {

      if (
        this.classList.contains(
          "found"
        )
      ) {
        return;
      }


      this.classList.add(
        "found"
      );

      caughtLights++;


      if (lightCountElem) {

        lightCountElem.innerText =
          caughtLights;

      }


      if (
        caughtLights >=
        totalLights
      ) {

        setTimeout(
          () => {
            nextScene(3);
          },
          700
        );

      }

    }
  );


  lightArea.appendChild(light);

}


// =====================================================
// ESCENA 3: SEMILLITA
// =====================================================

function resetGrowth() {

  growClicks = 0;


  if (seedEmoji) {

    seedEmoji.innerText =
      seedStages[0];

    seedEmoji.classList.remove(
      "growing"
    );

  }


  if (growCountElem) {
    growCountElem.innerText = "0";
  }


  if (growthBar) {
    growthBar.style.width = "0%";
  }


  if (growBtn) {
    growBtn.disabled = false;
  }

}


if (growBtn) {

  growBtn.addEventListener(
    "click",
    () => {

      if (
        growClicks >=
        targetGrowClicks
      ) {
        return;
      }


      growClicks++;


      const stageIndex =
        Math.min(
          growClicks,
          seedStages.length - 1
        );


      if (seedEmoji) {

        seedEmoji.innerText =
          seedStages[stageIndex];

        seedEmoji.classList.add(
          "growing"
        );


        setTimeout(
          () => {

            seedEmoji.classList.remove(
              "growing"
            );

          },
          300
        );

      }


      if (growCountElem) {

        growCountElem.innerText =
          growClicks;

      }


      if (growthBar) {

        const progress =
          (
            growClicks /
            targetGrowClicks
          ) * 100;

        growthBar.style.width =
          `${progress}%`;

      }


      if (
        growClicks >=
        targetGrowClicks
      ) {

        growBtn.disabled = true;


        setTimeout(
          () => {

            growBtn.disabled = false;

            nextScene(4);

          },
          900
        );

      }

    }
  );

}


// =====================================================
// ESCENA 4: ESTRELLAS FUGACES
// =====================================================

function initStarsGame() {

  if (!starsArea) {
    return;
  }


  if (starInterval) {

    clearInterval(
      starInterval
    );

    starInterval = null;

  }


  starsArea.innerHTML = "";

  caughtStars = 0;


  if (starCountElem) {
    starCountElem.innerText = "0";
  }


  if (wishMessage) {
    wishMessage.innerText = "";
  }


  let starsCreated = 0;


  // Crear la primera inmediatamente
  createShootingStar();

  starsCreated++;


  starInterval =
    setInterval(
      () => {

        if (
          starsCreated >=
          totalStars ||
          caughtStars >=
          totalStars
        ) {

          clearInterval(
            starInterval
          );

          starInterval = null;

          return;
        }


        createShootingStar();

        starsCreated++;

      },
      3000
    );

}


function createShootingStar() {

  if (!starsArea) {
    return;
  }


  const star =
    document.createElement(
      "span"
    );

  star.className =
    "shooting-star";

  star.innerText =
    "🌠";


  const topPct =
    Math.floor(
      Math.random() * 70
    ) + 10;


  star.style.top =
    `${topPct}%`;

  star.style.left =
    "-50px";

  star.style.animationDuration =
    "10s";


  star.addEventListener(
    "click",
    function () {

      if (
        this.classList.contains(
          "caught"
        )
      ) {
        return;
      }


      this.classList.add(
        "caught"
      );

      caughtStars++;


      if (starCountElem) {

        starCountElem.innerText =
          caughtStars;

      }


      if (
        wishMessage &&
        caughtStars <=
        wishWords.length
      ) {

        wishMessage.innerText +=
          (
            wishMessage.innerText
              ? " "
              : ""
          ) +
          wishWords[
            caughtStars - 1
          ];

      }


      if (
        caughtStars >=
        starsNeeded
      ) {

        if (starInterval) {

          clearInterval(
            starInterval
          );

          starInterval = null;

        }


        setTimeout(
          () => {
            nextScene(5);
          },
          1500
        );

      }

    }
  );


  starsArea.appendChild(
    star
  );

}


// =====================================================
// ESCENA 5: FLORES
// =====================================================

function startFlowersScene() {

  startPetalsRain();

}


if (continueQuestionBtn) {

  continueQuestionBtn.addEventListener(
    "click",
    () => {

      nextScene(6);

    }
  );

}


// =====================================================
// ESCENA 6: PREGUNTA
// =====================================================

function resetQuestion() {

  questionAnswered = false;


  if (questionResponse) {
    questionResponse.innerText = "";
  }

}


function answerQuestion(answer) {

  if (questionAnswered) {
    return;
  }


  if (!questionResponse) {
    return;
  }


  if (answer === "no") {

    questionResponse.innerText =
      "Mmm... entonces tendrás que descubrirlo 🌻";


    setTimeout(
      () => {

        questionResponse.innerText =
          "Aunque creo que ya tienes una pequeña sospecha... 👀";

      },
      1500
    );


    setTimeout(
      () => {

        questionAnswered = true;

        nextScene(7);

      },
      3000
    );


    return;
  }


  if (answer === "maybe") {

    questionResponse.innerText =
      "Tal vez... ¿quieres comprobarlo? 👀💛";


    setTimeout(
      () => {

        questionAnswered = true;

        nextScene(7);

      },
      1800
    );


    return;
  }


  if (answer === "yes") {

    questionResponse.innerText =
      "Exactamente... eran para ti 💛";


    setTimeout(
      () => {

        questionAnswered = true;

        nextScene(7);

      },
      1600
    );

  }

}


// Botones de respuesta

document
  .querySelectorAll(
    ".question-btn"
  )
  .forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const answer =
            button.dataset.answer;

          answerQuestion(
            answer
          );

        }
      );

    }
  );


// =====================================================
// ESCENA 7: BURBUJAS
// =====================================================

function initBubblesGame() {

  if (!bubblesArea) {
    return;
  }


  if (bubbleInterval) {

    clearInterval(
      bubbleInterval
    );

    bubbleInterval = null;

  }


  bubblesArea.innerHTML = "";

  poppedBubbles = 0;


  if (bubbleCountElem) {
    bubbleCountElem.innerText = "0";
  }


  let bubblesCreated = 0;


  // Primera burbuja inmediata
  createBubble();

  bubblesCreated++;


  bubbleInterval =
    setInterval(
      () => {

        if (
          bubblesCreated >=
          targetBubbles ||
          poppedBubbles >=
          targetBubbles
        ) {

          clearInterval(
            bubbleInterval
          );

          bubbleInterval = null;

          return;

        }


        createBubble();

        bubblesCreated++;

      },
      1200
    );

}


function createBubble() {

  if (!bubblesArea) {
    return;
  }


  const bubble =
    document.createElement(
      "div"
    );

  bubble.className =
    "bubble";


  const bubbleIndex =
    bubblesArea.querySelectorAll(
      ".bubble"
    ).length;


  bubble.innerText =
    bubbleWords[
      bubbleIndex %
      bubbleWords.length
    ];


  const leftPct =
    Math.floor(
      Math.random() * 75
    ) + 5;


  bubble.style.left =
    `${leftPct}%`;

  bubble.style.bottom =
    "-100px";


  bubble.addEventListener(
    "click",
    function () {

      if (
        this.classList.contains(
          "popped"
        )
      ) {
        return;
      }


      this.classList.add(
        "popped"
      );

      poppedBubbles++;


      if (bubbleCountElem) {

        bubbleCountElem.innerText =
          poppedBubbles;

      }


      if (
        poppedBubbles >=
        targetBubbles
      ) {

        if (bubbleInterval) {

          clearInterval(
            bubbleInterval
          );

          bubbleInterval = null;

        }


        setTimeout(
          () => {

            nextScene(8);

          },
          800
        );

      }

    }
  );


  bubblesArea.appendChild(
    bubble
  );

}


// =====================================================
// ESCENA 8: SOBRES
// =====================================================

function resetEnvelopes() {

  openedEnvelopes = 0;


  if (envelopeCountElem) {
    envelopeCountElem.innerText = "0";
  }


  document
    .querySelectorAll(
      ".envelope"
    )
    .forEach(
      (env) => {

        env.classList.remove(
          "opened"
        );


        const text =
          env.querySelector(
            ".envelope-text"
          );


        if (text) {
          text.innerText = "";
        }

      }
    );

}


function openEnvelope(element) {

  if (
    element.classList.contains(
      "opened"
    )
  ) {
    return;
  }


  element.classList.add(
    "opened"
  );


  const message =
    element.getAttribute(
      "data-message"
    );


  const text =
    element.querySelector(
      ".envelope-text"
    );


  if (text) {
    text.innerText =
      message;
  }


  openedEnvelopes++;


  if (envelopeCountElem) {

    envelopeCountElem.innerText =
      openedEnvelopes;

  }


  if (
    openedEnvelopes >=
    totalEnvelopes
  ) {

    setTimeout(
      () => {

        nextScene(9);

      },
      4500
    );

  }

}


// Eventos de los sobres

if (envelopesContainer) {

  envelopesContainer
    .querySelectorAll(
      ".envelope"
    )
    .forEach(
      (envelope) => {

        envelope.addEventListener(
          "click",
          () => {

            openEnvelope(
              envelope
            );

          }
        );

      }
    );

}


// =====================================================
// ESCENA 9: RAMO FINAL
// =====================================================

function startFinalScene() {

  startPetalsRain();

}


// =====================================================
// LLUVIA DE PÉTALOS
// =====================================================

function startPetalsRain() {

  if (!petalsLayer) {
    return;
  }


  petalsLayer.innerHTML = "";


  const petalTypes = [
    "✨",
    "💛",
    "🌸",
    "🌼",
    "✨"
  ];


  for (
    let i = 0;
    i < 22;
    i++
  ) {

    const petal =
      document.createElement(
        "span"
      );


    petal.className =
      "petal";


    petal.innerText =
      petalTypes[
        Math.floor(
          Math.random() *
          petalTypes.length
        )
      ];


    petal.style.left =
      `${Math.random() * 100}%`;


    petal.style.animationDuration =
      `${(
        Math.random() * 3 + 3
      ).toFixed(2)}s`;


    petal.style.animationDelay =
      `${(
        Math.random() * 2
      ).toFixed(2)}s`;


    petalsLayer.appendChild(
      petal
    );

  }

}


// =====================================================
// BOTÓN REINICIAR
// =====================================================

if (restartBtn) {

  restartBtn.addEventListener(
    "click",
    () => {

      restart();

    }
  );

}


// =====================================================
// ESTADO INICIAL
// =====================================================

updateMusicButton();
