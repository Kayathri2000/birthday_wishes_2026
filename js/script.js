/* ============================================================
   SUNSHINE — a tiny interactive birthday universe
   Vanilla JavaScript · no dependencies · GitHub Pages friendly
   ============================================================ */

// ================= PERSONAL CONTENT =================
// Everything you may want to personalise lives in this block.

const PERSONAL = {
  name: "Jayasuriya",
  nickname: "Sunshine",

  // Background music. Leave src empty ("") to hide the music button.
  // On by default. It tries to start automatically, then starts on the
  // first tap/click/keypress if the browser blocks autoplay.
  music: {
    src: "ref/music/HAPPY%20BIRTHDAY%20TO%20YOU%20PIANO%20INSTRUMENTAL%20BEST%20HAPPY%20BITHDAY%20MUSIC%202021.mp3",
    volume: 0.55,
    autoplay: true
  },

  // Optional decorative GIF. Leave src empty ("") to skip it.
  gif: {
    src: "", // e.g. "ref/gifs/love.gif"
    alt: "A small animated romantic moment",
    caption: "a tiny piece of us"
  },

  hero: {
    line1: "Somewhere under this same sky...",
    line2: "my favourite person was born.",
    greeting: "Happy Birthday,",
    subtitle: "for my favourite person, on your day."
  },

  before: {
    paragraphs: [
      "Before I knew you,",
      "I didn't know that a person could become a favourite conversation, a favourite notification, a favourite smile...",
      "<em>and somehow... my favourite person.</em>"
    ],
    closing: "And then you happened."
  },

  sunshine: {
    phrases: [
      { text: "your smile", x: 20, y: 12 },
      { text: "your voice", x: 80, y: 17 },
      { text: "your hugs", x: 10, y: 38 },
      { text: "your craziness", x: 90, y: 40 },
      { text: "your patience", x: 14, y: 63 },
      { text: "your presence", x: 86, y: 64 },
      { text: "your warmth", x: 50, y: 7 }
    ],
    lead: "You make ordinary days feel a little warmer.",
    tag: "And that's why I call you <em>Sunshine</em>."
  },

  games: {
    balloons: {
      count: 10,
      title: "Mission accomplished. ❤️",
      body: "Okay fine... you are officially allowed to continue.",
      quips: [
        "One down. My heart's next. 💘",
        "Careful, birthday boy. 😌",
        "You're having way too much fun.",
        "Pop. Just like that, I'm yours.",
        "Another heart? Greedy.",
        "Okay, show-off.",
        "You're really good at stealing hearts.",
        "That one was full of love.",
        "Almost out of hearts...",
        "Fine. You've officially won mine."
      ]
    },
    candles: {
      count: 5,
      lines: [
        "Wish made. ✨",
        "Let your all wishes .....",
        "Comes true .....",
        "My wish is simply more birthdays with you."
      ]
    },
    catch: {
      catches: 5,
      messages: [
        "Got me! ☀️",
        "Too slow 😌",
        "Almost!",
        "Okay, okay!",
        "You're getting good at this."
      ],
      finish: [
        "Maybe you finally caught me.",
        "But you're not getting rid of me that easily. ❤️"
      ]
    },
    find: {
      title: "You found it.",
      body: "Just like you found your way into my heart."
    },
    button: {
      first: "Why did you press it?! 😭",
      second: "Fine.",
      final: "Because I have one last thing to tell you..."
    }
  },

  notes: [
    "The way you make me laugh.",
    "The way you listen.",
    "The little things you remember.",
    "The way you make me feel safe.",
    "Your silly side.",
    "Your smile.",
    "Simply... you."
  ],

  letter: {
    paragraphs: [
      "Dear Sunshine,",
      "I don't know if I say it enough, but having you in my life has changed the way ordinary days feel.",
      "You became the person I look for, the person I want to tell everything to, and somehow... the person who feels like home.",
      "On your birthday, I don't just wish for another beautiful year for you.",
      "I wish that I get to be there for as many of those years as possible.",
      "To celebrate your victories.",
      "To hold your hand through the difficult days.",
      "To laugh at things that aren't even funny.",
      "To make countless ridiculous memories.",
      "And to keep calling you my Sunshine. ☀️",
      "Happy Birthday, Jayasuriya.",
      "I love you. ❤️"
    ]
  },

  final: {
    lines: [
      { text: "If I could make one wish tonight...", className: "wish-line--first" },
      { text: "I'd wish for many more birthdays with you.", className: "wish-line--wish" },
      { text: "More laughs.", className: "wish-line--more" },
      { text: "More silly moments.", className: "wish-line--more" },
      { text: "More memories.", className: "wish-line--more" },
      { text: "More us.", className: "wish-line--more" },
      { text: 'Happy Birthday, Sunshine. <span class="sun-glyph" aria-hidden="true">☀</span>', className: "wish-line--title" },
      { text: 'Jayasuriya <span class="heart-glyph" aria-hidden="true">❤</span>', className: "wish-line--name" },
      { text: "With all my love.", className: "wish-line--sign" }
    ]
  }
};

// ================= END PERSONAL CONTENT =================

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const noteTilts = [-2.1, 1.6, -1.2, 2.2, -1.7, 1.1, -0.8];
const balloonColors = ["#f5c7d8", "#b9a7e0", "#f6dfa0", "#e9a9bd", "#cdbcf0", "#f3d6bb"];
const balloonSpots = [
  { x: 12, y: 16, size: 68 },
  { x: 34, y: 13, size: 62 },
  { x: 58, y: 17, size: 72 },
  { x: 82, y: 22, size: 62 },
  { x: 18, y: 43, size: 64 },
  { x: 43, y: 38, size: 70 },
  { x: 70, y: 44, size: 64 },
  { x: 88, y: 62, size: 58 },
  { x: 31, y: 69, size: 66 },
  { x: 59, y: 68, size: 62 },
  { x: 12, y: 84, size: 58 },
  { x: 79, y: 84, size: 60 }
];

const randomBetween = (min, max) => min + Math.random() * (max - min);
const pickRandom = (items) => items[Math.floor(Math.random() * items.length)];

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), delay);
  };
}

function setText(selector, value) {
  $$(selector).forEach((element) => {
    element.textContent = value;
  });
}

function setGameResult(result, visible) {
  if (!result) return;
  result.hidden = !visible;
  if (visible) {
    void result.offsetWidth;
    result.classList.add("is-visible");
  }
}

// ---------- optional tiny sounds ----------

let audioContext = null;

function getAudioContext() {
  if (audioContext) return audioContext;
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return null;

  try {
    audioContext = new AudioCtor();
  } catch (error) {
    audioContext = null;
  }

  return audioContext;
}

function playTone(from, to, duration = 0.14, type = "sine", volume = 0.025, delay = 0) {
  const context = getAudioContext();
  if (!context) return;

  const start = context.currentTime + delay;

  try {
    if (context.state === "suspended") {
      context.resume().catch(() => {});
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(from, start);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(40, to), start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);
  } catch (error) {
    // Sound is decorative. Never let it interrupt the experience.
  }
}

const playPopSound = () => playTone(440, 110, 0.13, "triangle", 0.03);
const playCandleSound = () => playTone(240, 80, 0.3, "sine", 0.018);
const playCatchSound = () => {
  playTone(620, 880, 0.12, "sine", 0.026);
  playTone(880, 1180, 0.16, "sine", 0.022, 0.08);
};
const playFindSound = () => {
  playTone(523, 523, 0.24, "sine", 0.02);
  playTone(659, 659, 0.28, "sine", 0.02, 0.1);
  playTone(784, 784, 0.42, "sine", 0.02, 0.22);
};

// ---------- content rendering ----------

function renderContent() {
  document.title = `For my ${PERSONAL.nickname}`;

  setText("[data-nickname]", PERSONAL.nickname);
  setText("[data-hero-line1]", PERSONAL.hero.line1);
  setText("[data-hero-line2]", PERSONAL.hero.line2);
  setText("[data-hero-greeting]", PERSONAL.hero.greeting);
  setText("[data-hero-sub]", PERSONAL.hero.subtitle);

  const beforeText = $("[data-before-text]");
  if (beforeText) {
    beforeText.innerHTML = PERSONAL.before.paragraphs
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join("");
  }

  const beforeClosing = $("[data-before-closing]");
  if (beforeClosing) beforeClosing.textContent = PERSONAL.before.closing;

  renderSunshine();
  renderNotes();
  renderLetter();
  renderFinalWish();
}

function renderSunshine() {
  const words = $("[data-sun-words]");
  if (words) {
    PERSONAL.sunshine.phrases.forEach((phrase, index) => {
      const item = document.createElement("li");
      item.className = "sun-word";
      item.textContent = phrase.text;
      item.style.setProperty("--x", phrase.x);
      item.style.setProperty("--y", phrase.y);
      item.style.setProperty("--delay", `${(-index * 0.7).toFixed(2)}s`);
      words.append(item);
    });
  }

  const lead = $("[data-sun-lead]");
  if (lead) lead.textContent = PERSONAL.sunshine.lead;

  const tag = $("[data-sun-tag]");
  if (tag) tag.innerHTML = PERSONAL.sunshine.tag;
}

function renderNotes() {
  const board = $("[data-notes]");
  if (!board) return;

  PERSONAL.notes.forEach((text, index) => {
    const slot = document.createElement("div");
    slot.className = "note-slot reveal";
    slot.style.setProperty("--reveal-delay", `${index * 75}ms`);

    const note = document.createElement("button");
    note.type = "button";
    note.className = "note";
    note.style.setProperty("--tilt", `${noteTilts[index % noteTilts.length]}deg`);
    note.style.setProperty("--float-duration", `${randomBetween(6.5, 9).toFixed(2)}s`);
    note.style.setProperty("--float-delay", `${(-index * 0.85).toFixed(2)}s`);

    const paragraph = document.createElement("span");
    paragraph.className = "note-text";
    paragraph.textContent = text;
    note.append(paragraph);

    note.addEventListener("click", () => {
      note.classList.remove("is-glowing");
      void note.offsetWidth;
      note.classList.add("is-glowing");
      window.setTimeout(() => note.classList.remove("is-glowing"), 1800);
    });

    slot.append(note);
    board.append(slot);
  });
}

function renderLetter() {
  const body = $("[data-letter-body]");
  if (!body) return;

  body.innerHTML = PERSONAL.letter.paragraphs
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
}

function renderFinalWish() {
  const container = $("[data-wish-lines]");
  if (!container) return;

  PERSONAL.final.lines.forEach((line, index) => {
    const paragraph = document.createElement("p");
    paragraph.className = `wish-line ${line.className || ""}`.trim();
    paragraph.style.setProperty("--i", index);
    paragraph.innerHTML = line.text;
    container.append(paragraph);
  });
}

function renderGameCopy() {
  const balloonTitle = $("#balloon-result-title");
  const balloonBody = $("#balloon-result-body");
  if (balloonTitle) balloonTitle.textContent = PERSONAL.games.balloons.title;
  if (balloonBody) balloonBody.textContent = PERSONAL.games.balloons.body;

  const cakeLines = $("[data-cake-lines]");
  if (cakeLines) {
    PERSONAL.games.candles.lines.forEach((line, index) => {
      const paragraph = document.createElement("p");
      paragraph.className = "cake-line";
      paragraph.style.setProperty("--i", index);
      paragraph.textContent = line;
      cakeLines.append(paragraph);
    });
  }

  const catchLines = $("[data-catch-lines]");
  if (catchLines) {
    PERSONAL.games.catch.finish.forEach((line, index) => {
      const paragraph = document.createElement("p");
      paragraph.className = "catch-line";
      paragraph.style.setProperty("--i", index);
      paragraph.textContent = line;
      catchLines.append(paragraph);
    });
  }

  const findTitle = $("[data-find-title]");
  const findBody = $("[data-find-body]");
  if (findTitle) findTitle.textContent = PERSONAL.games.find.title;
  if (findBody) findBody.textContent = PERSONAL.games.find.body;
}

// ---------- loader ----------

function initLoader() {
  const loader = $("#loader");
  if (!loader) return;

  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;

    document.body.classList.remove("is-loading");
    loader.classList.add("is-finished");

    const hero = $(".hero");
    if (hero) hero.classList.add("is-entered");

    window.setTimeout(() => loader.remove(), 1400);
  };

  window.setTimeout(finish, 1200);
}

// ---------- starfield ----------

class Starfield {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.stars = [];
    this.width = 0;
    this.height = 0;
    this.frame = null;
    this.reduced = reduceMotion.matches;

    this.resize();
    this.createStars();

    window.addEventListener("resize", debounce(() => {
      this.resize();
      this.createStars();
      if (this.reduced) this.draw(0);
    }, 160));

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stop();
      } else if (!this.reduced) {
        this.start();
      }
    });

    if (this.reduced) {
      this.draw(0);
    } else {
      this.start();
    }
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = Math.floor(this.width * dpr);
    this.canvas.height = Math.floor(this.height * dpr);
    this.context.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  createStars() {
    const count = Math.min(230, Math.max(90, Math.round((this.width * this.height) / 9500)));
    this.stars = Array.from({ length: count }, () => {
      const gold = Math.random() < 0.16;
      const radius = Math.random() < 0.12 ? randomBetween(1, 1.55) : randomBetween(0.35, 1);

      return {
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius,
        alpha: randomBetween(0.22, gold ? 0.85 : 0.68),
        phase: Math.random() * Math.PI * 2,
        speed: randomBetween(0.45, 1.7),
        depth: randomBetween(0.02, 0.16),
        gold
      };
    });
  }

  draw(time) {
    const ctx = this.context;
    const scroll = window.scrollY || window.pageYOffset || 0;

    ctx.clearRect(0, 0, this.width, this.height);

    this.stars.forEach((star) => {
      const wrappedY = ((star.y - scroll * star.depth) % this.height + this.height) % this.height;
      const twinkle = this.reduced
        ? star.alpha
        : star.alpha * (0.58 + 0.42 * Math.sin(time * 0.0008 * star.speed + star.phase));

      ctx.beginPath();
      ctx.fillStyle = star.gold
        ? `rgba(246, 223, 160, ${Math.max(0, Math.min(1, twinkle))})`
        : `rgba(255, 248, 234, ${Math.max(0, Math.min(1, twinkle))})`;
      ctx.arc(star.x, wrappedY, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  start() {
    if (this.frame !== null) return;

    const loop = (time) => {
      this.draw(time);
      this.frame = window.requestAnimationFrame(loop);
    };

    this.frame = window.requestAnimationFrame(loop);
  }

  stop() {
    if (this.frame === null) return;
    window.cancelAnimationFrame(this.frame);
    this.frame = null;
  }
}

// ---------- reveal on scroll ----------

function initReveal() {
  const items = $$(".reveal");

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.14,
    rootMargin: "0px 0px -7% 0px"
  });

  items.forEach((item) => observer.observe(item));
}

// ---------- gentle parallax ----------

function initParallax() {
  if (reduceMotion.matches) return;

  const elements = $$("[data-parallax]");
  if (!elements.length) return;

  let queued = false;

  const update = () => {
    const viewportHeight = window.innerHeight;

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > viewportHeight + 200) return;

      const speed = parseFloat(element.dataset.parallax) || 0;
      const centerOffset = rect.top + rect.height / 2 - viewportHeight / 2;
      element.style.setProperty("--py", `${(centerOffset * speed).toFixed(1)}px`);
    });

    queued = false;
  };

  const queueUpdate = () => {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", queueUpdate, { passive: true });
  window.addEventListener("resize", queueUpdate);
  update();
}

// ---------- cursor glow ----------

function initCursorGlow() {
  const glow = $("#cursor-glow");
  if (!glow || reduceMotion.matches || !window.matchMedia("(pointer: fine)").matches) return;

  document.body.classList.add("has-pointer");

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  window.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  }, { passive: true });

  const animate = () => {
    currentX += (targetX - currentX) * 0.075;
    currentY += (targetY - currentY) * 0.075;
    glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
    window.requestAnimationFrame(animate);
  };

  animate();
}

// ---------- shared sparkle bursts ----------

function burstFrom(parent, x, y, options = {}) {
  if (!parent) return;

  const {
    count = 12,
    colors = ["#f6dfa0", "#f5c7d8", "#b9a7e0", "#fff8ea"],
    spread = 64,
    symbols = ["✦", "❤", "✧"]
  } = options;

  for (let index = 0; index < count; index += 1) {
    const bit = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const distance = randomBetween(spread * 0.35, spread);

    bit.className = "burst-bit";
    bit.textContent = pickRandom(symbols);
    bit.style.setProperty("--x", `${x}px`);
    bit.style.setProperty("--y", `${y}px`);
    bit.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    bit.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
    bit.style.setProperty("--size", `${randomBetween(0.62, 1.15).toFixed(2)}rem`);
    bit.style.setProperty("--delay", `${randomBetween(0, 0.16).toFixed(2)}s`);
    bit.style.setProperty("--color", pickRandom(colors));
    parent.append(bit);

    window.setTimeout(() => bit.remove(), 1000);
  }
}

function initSparkles() {
  const container = $("[data-sparkles]");
  if (!container || reduceMotion.matches) return;

  for (let index = 0; index < 28; index += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.setProperty("--top", `${randomBetween(8, 92).toFixed(2)}%`);
    sparkle.style.setProperty("--left", `${randomBetween(6, 94).toFixed(2)}%`);
    sparkle.style.setProperty("--size", `${randomBetween(2, 3.6).toFixed(1)}px`);
    sparkle.style.setProperty("--duration", `${randomBetween(3.2, 7).toFixed(2)}s`);
    sparkle.style.setProperty("--delay", `${randomBetween(0, 6).toFixed(2)}s`);
    container.append(sparkle);
  }
}

// ---------- game 1: heart balloons ----------

function initBalloonGame() {
  const field = $("[data-balloon-field]");
  if (!field) return;

  const total = Math.max(1, PERSONAL.games.balloons.count);
  const progress = $("#balloon-count");
  const status = $("#balloon-status");
  const result = $("[data-balloon-result]");
  const quip = $("#balloon-quip");
  const quips = PERSONAL.games.balloons.quips || [];
  let popped = 0;
  let completed = false;

  const updateProgress = () => {
    if (progress) progress.textContent = `${popped} / ${total}`;
  };

  const showQuip = (line) => {
    if (!quip || !line) return;
    quip.textContent = line;
    quip.classList.remove("is-visible");
    void quip.offsetWidth;
    quip.classList.add("is-visible");
  };

  const completeGame = () => {
    if (completed) return;
    completed = true;
    field.classList.add("is-complete");
    if (status) status.textContent = `${PERSONAL.games.balloons.title} ${PERSONAL.games.balloons.body}`;
    setGameResult(result, true);
  };

  for (let index = 0; index < total; index += 1) {
    const spot = balloonSpots[index % balloonSpots.length];
    const color = balloonColors[index % balloonColors.length];
    const balloon = document.createElement("button");

    balloon.type = "button";
    balloon.className = "balloon";
    balloon.setAttribute("aria-label", `Pop heart balloon ${index + 1} of ${total}`);
    balloon.style.setProperty("--x", `${spot.x}%`);
    balloon.style.setProperty("--y", `${spot.y}%`);
    balloon.style.setProperty("--size", `${spot.size}px`);
    balloon.style.setProperty("--balloon", color);
    balloon.style.setProperty("--float-duration", `${randomBetween(6, 9.5).toFixed(2)}s`);
    balloon.style.setProperty("--float-delay", `${(-index * 0.63).toFixed(2)}s`);

    balloon.innerHTML = `
      <span class="balloon-float">
        <svg viewBox="0 0 100 132" aria-hidden="true" focusable="false">
          <path class="balloon-string" d="M50 107 C50 116 46 121 51 129" />
          <path class="balloon-knot" d="M44 101 L50 111 L56 101 Z" />
          <path class="balloon-heart" d="M50 99 C43 92 12 74 12 45 C12 27 24 16 39 16 C45 16 49 20 50 25 C51 20 55 16 61 16 C76 16 88 27 88 45 C88 74 57 92 50 99 Z" />
          <ellipse class="balloon-shine" cx="31" cy="38" rx="8" ry="13" transform="rotate(-28 31 38)" />
        </svg>
      </span>
    `;

    balloon.addEventListener("click", () => {
      if (balloon.classList.contains("is-popped") || completed) return;

      balloon.classList.add("is-popping");
      balloon.setAttribute("aria-label", "Popped heart balloon");
      balloon.disabled = true;

      const fieldRect = field.getBoundingClientRect();
      const rect = balloon.getBoundingClientRect();
      burstFrom(field, rect.left - fieldRect.left + rect.width / 2, rect.top - fieldRect.top + rect.height / 2, {
        count: 11,
        spread: 58
      });

      playPopSound();
      popped += 1;
      updateProgress();

      const quipLine = quips.length ? quips[(popped - 1) % quips.length] : "";
      showQuip(quipLine);
      if (status) status.textContent = `${popped} of ${total} balloons popped. ${quipLine}`;

      window.setTimeout(() => {
        balloon.classList.add("is-popped");
        balloon.hidden = true;
      }, reduceMotion.matches ? 20 : 380);

      if (popped >= total) {
        window.setTimeout(completeGame, reduceMotion.matches ? 80 : 450);
      }
    });

    field.append(balloon);
  }

  updateProgress();
}

// ---------- game 2: birthday candles ----------

function initCakeGame() {
  const section = $("#cake");
  const candleHolder = $("[data-candles]");
  const blowButton = $("[data-blow]");
  const progress = $("#cake-count");
  const status = $("#cake-status");
  const result = $("[data-cake-result]");
  if (!section || !candleHolder) return;

  const total = Math.max(1, PERSONAL.games.candles.count);
  const candles = [];
  let blownOut = 0;
  let finished = false;

  const updateProgress = () => {
    if (progress) progress.textContent = `${blownOut} / ${total} blown out`;
  };

  const finishCake = () => {
    if (finished) return;
    finished = true;
    section.classList.add("is-dark");
    if (blowButton) {
      blowButton.disabled = true;
      blowButton.innerHTML = "Wishes made ✨";
    }
    if (status) status.textContent = PERSONAL.games.candles.lines.join(" ");
    setGameResult(result, true);
  };

  const extinguish = (candle, sound = true) => {
    if (!candle || candle.classList.contains("is-out")) return false;

    candle.classList.add("is-out");
    candle.disabled = true;
    candle.setAttribute("aria-label", candle.dataset.label + " — blown out");
    blownOut += 1;
    updateProgress();
    if (sound) playCandleSound();
    if (status) status.textContent = `${blownOut} of ${total} candles blown out.`;

    if (blownOut >= total) {
      window.setTimeout(finishCake, reduceMotion.matches ? 60 : 620);
    }

    return true;
  };

  for (let index = 0; index < total; index += 1) {
    const candle = document.createElement("button");
    candle.type = "button";
    candle.className = "candle";
    candle.dataset.label = `Blow out candle ${index + 1}`;
    candle.setAttribute("aria-label", candle.dataset.label);
    candle.style.setProperty("--i", index);
    candle.innerHTML = `
      <span class="candle-flame" aria-hidden="true"></span>
      <span class="candle-smoke" aria-hidden="true"></span>
      <span class="candle-wick" aria-hidden="true"></span>
      <span class="candle-wax" aria-hidden="true"></span>
    `;
    candle.addEventListener("click", () => extinguish(candle));
    candleHolder.append(candle);
    candles.push(candle);
  }

  if (blowButton) {
    blowButton.addEventListener("click", () => {
      if (finished) return;
      blowButton.disabled = true;

      const remaining = candles.filter((candle) => !candle.classList.contains("is-out"));
      remaining.forEach((candle, index) => {
        window.setTimeout(() => extinguish(candle, index === 0), reduceMotion.matches ? index * 35 : index * 180);
      });
    });
  }

  updateProgress();
}

// ---------- game 3: catch the sunshine ----------

function initCatchGame() {
  const field = $("[data-catch-field]");
  const sun = $("[data-catch-sun]");
  const progress = $("#catch-count");
  const status = $("#catch-status");
  const message = $("[data-catch-message]");
  const result = $("[data-catch-result]");
  if (!field || !sun) return;

  const total = Math.max(1, PERSONAL.games.catch.catches);
  let catches = 0;
  let x = 50;
  let y = 46;
  let targetX = x;
  let targetY = y;
  let nextTargetAt = 0;
  let frame = null;
  let running = false;
  let finished = false;
  let lastMessage = "";

  const renderSun = () => {
    sun.style.left = `${x}%`;
    sun.style.top = `${y}%`;
  };

  const chooseTarget = () => {
    targetX = randomBetween(16, 84);
    targetY = randomBetween(22, 78);
    nextTargetAt = performance.now() + randomBetween(1250, 2400);
  };

  const loop = (now) => {
    if (finished) return;
    if (now >= nextTargetAt) chooseTarget();

    x += (targetX - x) * 0.038;
    y += (targetY - y) * 0.038;
    renderSun();
    frame = window.requestAnimationFrame(loop);
  };

  const start = () => {
    if (running || finished || reduceMotion.matches) return;
    running = true;
    nextTargetAt = 0;
    frame = window.requestAnimationFrame(loop);
  };

  const stop = () => {
    if (!running) return;
    running = false;
    if (frame !== null) {
      window.cancelAnimationFrame(frame);
      frame = null;
    }
  };

  const updateProgress = () => {
    if (progress) progress.textContent = `${catches} / ${total} caught`;
  };

  const finishCatch = () => {
    if (finished) return;
    finished = true;
    stop();
    sun.classList.add("is-caught");
    sun.disabled = true;
    sun.setAttribute("aria-label", "You caught your Sunshine");
    if (message) message.textContent = "";
    if (status) status.textContent = PERSONAL.games.catch.finish.join(" ");
    setGameResult(result, true);
  };

  const catchSun = () => {
    if (finished) return;

    catches += 1;
    updateProgress();

    sun.classList.remove("is-flashing");
    void sun.offsetWidth;
    sun.classList.add("is-flashing");

    const fieldRect = field.getBoundingClientRect();
    const sunRect = sun.getBoundingClientRect();
    burstFrom(field, sunRect.left - fieldRect.left + sunRect.width / 2, sunRect.top - fieldRect.top + sunRect.height / 2, {
      count: 10,
      spread: 62
    });

    playCatchSound();

    if (message) {
      const options = PERSONAL.games.catch.messages.filter((item) => item !== lastMessage);
      const nextMessage = pickRandom(options.length ? options : PERSONAL.games.catch.messages);
      lastMessage = nextMessage;
      message.textContent = nextMessage;
      message.classList.remove("is-showing");
      void message.offsetWidth;
      message.classList.add("is-showing");
    }

    if (status) status.textContent = `${catches} of ${total} catches.`;

    if (catches >= total) {
      finishCatch();
      return;
    }

    chooseTarget();
    if (reduceMotion.matches) {
      x = targetX;
      y = targetY;
      renderSun();
    }
  };

  sun.addEventListener("click", catchSun);
  renderSun();
  updateProgress();

  if (reduceMotion.matches) {
    start();
    return;
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) start();
        else stop();
      });
    }, { threshold: 0.18 });
    observer.observe(field);
  } else {
    start();
  }
}

// ---------- game 4: hidden heart ----------

function initFindGame() {
  const field = $("[data-find-field]");
  const stars = $("[data-find-stars]");
  const heart = $("[data-hidden-heart]");
  const hintButton = $("[data-hint]");
  const hintText = $("[data-hint-text]");
  const result = $("[data-find-result]");
  const status = $("#find-status");
  if (!field || !heart) return;

  let found = false;
  let hintTimer = null;

  if (stars) {
    for (let index = 0; index < 72; index += 1) {
      const star = document.createElement("span");
      star.className = "find-star";
      star.style.setProperty("--top", `${randomBetween(4, 96).toFixed(2)}%`);
      star.style.setProperty("--left", `${randomBetween(4, 96).toFixed(2)}%`);
      star.style.setProperty("--size", `${randomBetween(1, 2.7).toFixed(1)}px`);
      star.style.setProperty("--duration", `${randomBetween(2.6, 6.4).toFixed(2)}s`);
      star.style.setProperty("--delay", `${randomBetween(0, 5).toFixed(2)}s`);

      if (index % 11 === 0) {
        star.classList.add("find-star--bright");
        star.textContent = "✦";
      }

      stars.append(star);
    }
  }

  heart.addEventListener("click", () => {
    if (found) return;
    found = true;

    field.classList.add("is-found");
    heart.disabled = true;
    heart.setAttribute("aria-label", "Hidden heart found");

    if (hintButton) hintButton.hidden = true;
    if (hintText) hintText.hidden = true;

    const fieldRect = field.getBoundingClientRect();
    const heartRect = heart.getBoundingClientRect();
    burstFrom(field, heartRect.left - fieldRect.left + heartRect.width / 2, heartRect.top - fieldRect.top + heartRect.height / 2, {
      count: 44,
      spread: 190,
      colors: ["#f6dfa0", "#fff8ea", "#f5c7d8", "#e5b568"],
      symbols: ["✦", "✧", "☀", "❤"]
    });

    playFindSound();
    if (status) status.textContent = `${PERSONAL.games.find.title} ${PERSONAL.games.find.body}`;
    setGameResult(result, true);
  });

  if (hintButton) {
    hintButton.addEventListener("click", () => {
      if (found) return;

      field.classList.add("is-hinting");
      if (hintText) hintText.hidden = false;
      if (status) status.textContent = "A little hint: look for the warmest glow among the stars.";

      window.clearTimeout(hintTimer);
      hintTimer = window.setTimeout(() => field.classList.remove("is-hinting"), 4200);
    });
  }
}

// ---------- final silly button ----------

function initSurprise() {
  const button = $("[data-big-button]");
  const messages = $("[data-surprise-messages]");
  const continueLink = $("[data-surprise-continue]");
  if (!button || !messages) return;

  let step = 0;
  let locked = false;

  const shake = () => {
    button.classList.remove("is-shaking");
    void button.offsetWidth;
    button.classList.add("is-shaking");
    window.setTimeout(() => button.classList.remove("is-shaking"), 620);
  };

  const addMessage = (text, modifier) => {
    const paragraph = document.createElement("p");
    paragraph.className = `surprise-line ${modifier || ""}`.trim();
    paragraph.textContent = text;
    messages.append(paragraph);
    void paragraph.offsetWidth;
    paragraph.classList.add("is-visible");
  };

  const showContinue = () => {
    if (!continueLink) return;
    continueLink.hidden = false;
    void continueLink.offsetWidth;
    continueLink.classList.add("is-visible");
  };

  button.addEventListener("click", () => {
    if (locked || step >= 2) return;

    if (step === 0) {
      locked = true;
      shake();

      window.setTimeout(() => addMessage(PERSONAL.games.button.first, "surprise-line--ouch"), reduceMotion.matches ? 80 : 520);
      window.setTimeout(() => {
        addMessage(PERSONAL.games.button.second, "surprise-line--fine");
        button.innerHTML = 'Press again. <span aria-hidden="true">❤️</span>';
        locked = false;
        step = 1;
      }, reduceMotion.matches ? 240 : 1650);
      return;
    }

    locked = true;
    step = 2;
    shake();

    window.setTimeout(() => {
      addMessage(PERSONAL.games.button.final, "surprise-line--final");
      button.innerHTML = 'Okay, come here <span aria-hidden="true">☀</span>';
      button.disabled = true;
      button.classList.add("is-done");
      showContinue();
    }, reduceMotion.matches ? 160 : 920);
  });
}

// ---------- final wish + golden burst ----------

function initFinale() {
  const section = $("#wish");
  const burst = $("[data-finale-burst]");
  if (!section) return;

  let activated = false;
  let burstTimer = null;

  const fillBurst = () => {
    if (!burst || reduceMotion.matches) return;

    for (let index = 0; index < 46; index += 1) {
      const particle = document.createElement("span");
      const angle = Math.random() * Math.PI * 2;
      const distance = randomBetween(90, 520);

      particle.className = "finale-particle";
      particle.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
      particle.style.setProperty("--size", `${randomBetween(1.5, 4.2).toFixed(1)}px`);
      particle.style.setProperty("--delay", `${randomBetween(0, 1.1).toFixed(2)}s`);
      particle.style.setProperty("--duration", `${randomBetween(2.4, 4.4).toFixed(2)}s`);
      particle.style.setProperty("--color", pickRandom(["#f6dfa0", "#fff8ea", "#f5c7d8", "#e5b568"]));
      burst.append(particle);

      window.setTimeout(() => particle.remove(), 6500);
    }
  };

  const activate = () => {
    if (activated) return;
    activated = true;
    section.classList.add("is-visible");

    if (!reduceMotion.matches) {
      burstTimer = window.setTimeout(fillBurst, 4700);
    }
  };

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    activate();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      activate();
      observer.disconnect();
    });
  }, { threshold: 0.28 });

  observer.observe(section);

  window.addEventListener("pagehide", () => window.clearTimeout(burstTimer), { once: true });
}

// ---------- optional gif ----------

function initGif() {
  const slot = $("[data-gif]");
  if (!slot || !PERSONAL.gif || !PERSONAL.gif.src) return;

  slot.hidden = true;

  const image = document.createElement("img");
  image.alt = PERSONAL.gif.alt || "A small animated moment";
  image.loading = "lazy";
  image.decoding = "async";

  image.addEventListener("load", () => {
    slot.hidden = false;
  });
  image.addEventListener("error", () => {
    slot.hidden = true;
    image.remove();
  });

  const caption = document.createElement("figcaption");
  caption.textContent = PERSONAL.gif.caption || "";

  slot.append(image, caption);
  image.src = PERSONAL.gif.src;
}

// ---------- optional music ----------

function initMusic() {
  const audio = $("#bg-music");
  const button = $("#music-toggle");
  const status = $("#music-status");

  if (!audio || !button || !PERSONAL.music || !PERSONAL.music.src) return;

  const shouldAutoplay = PERSONAL.music.autoplay !== false;
  let available = false;
  let unlockArmed = false;

  audio.volume = PERSONAL.music.volume ?? 0.55;
  audio.src = PERSONAL.music.src;

  const updateUI = (playing) => {
    button.classList.toggle("is-playing", playing);
    button.setAttribute("aria-pressed", String(playing));
    button.setAttribute("aria-label", playing ? "Pause music" : "Play music");
    button.title = playing ? "Pause music" : "Play music";
    if (status) status.textContent = playing ? "Music playing" : "Music paused";
  };

  const play = async () => {
    try {
      await audio.play();
      return true;
    } catch (error) {
      updateUI(false);
      return false;
    }
  };

  const removeUnlockListeners = () => {
    if (!unlockArmed) return;
    document.removeEventListener("pointerdown", unlock, true);
    document.removeEventListener("touchstart", unlock, true);
    document.removeEventListener("keydown", unlock, true);
    unlockArmed = false;
  };

  const unlock = (event) => {
    if (event.target instanceof Element && event.target.closest("#music-toggle")) return;
    removeUnlockListeners();
    if (audio.paused) {
      play().then((started) => {
        if (!started) armUnlock();
      });
    }
  };

  const armUnlock = () => {
    if (!shouldAutoplay || unlockArmed) return;
    unlockArmed = true;
    document.addEventListener("pointerdown", unlock, true);
    document.addEventListener("touchstart", unlock, true);
    document.addEventListener("keydown", unlock, true);
  };

  const startAutomatically = async () => {
    if (!shouldAutoplay) return;
    if (!(await play())) armUnlock();
  };

  const showButton = () => {
    if (available) return;
    available = true;
    button.hidden = false;
    updateUI(!audio.paused);
    startAutomatically();
  };

  audio.addEventListener("loadedmetadata", showButton, { once: true });
  audio.addEventListener("canplay", showButton, { once: true });
  audio.addEventListener("error", () => {
    button.hidden = true;
  });

  if (audio.readyState >= 1) {
    showButton();
  }

  armUnlock();

  button.addEventListener("click", () => {
    if (audio.paused) {
      play();
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => {
    removeUnlockListeners();
    updateUI(true);
  });

  audio.addEventListener("pause", () => {
    updateUI(false);
  });
}

// ---------- boot ----------

renderContent();
renderGameCopy();
initLoader();
initMusic();
initGif();
initSparkles();
initBalloonGame();
initCakeGame();
initCatchGame();
initFindGame();
initSurprise();
initReveal();
initParallax();
initCursorGlow();
initFinale();

const starCanvas = $("#starfield");
if (starCanvas) {
  new Starfield(starCanvas);
}
