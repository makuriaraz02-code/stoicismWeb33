// Stoic.js
// Minimal, dependency-free game logic for the Stoic Game page.
// Should be referenced with <script src="Stoic.js" defer></script>

document.addEventListener('DOMContentLoaded', () => {
  const prompts = [
    { text: "You missed your bus — what do you focus on?", correct: "B" },
    { text: "A colleague takes credit for your work — what's your priority?", correct: "A" },
    { text: "You have one hour free — how will you spend it?", correct: "A" },
    { text: "You hear bad news about a friend — what matters most?", correct: "B" }
  ];

  // Simple pairing of prompts with "virtuous" answer A or B (for demo)
  // In a real project, expand prompts with better scenarios and exact scoring.

  const promptEl = document.getElementById('prompt');
  const choiceA = document.getElementById('choiceA');
  const choiceB = document.getElementById('choiceB');
  const feedback = document.getElementById('feedback');
  const scoreEl = document.getElementById('score');
  const nextBtn = document.getElementById('nextBtn');

  let score = 0;
  let currentIndex = -1;
  let locked = false;

  function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }

  // Prepare game order
  const order = prompts.map((_, i) => i);
  shuffleArray(order);

  function nextPrompt() {
    locked = false;
    feedback.textContent = '';
    nextBtn.hidden = true;
    currentIndex++;
    if (currentIndex >= order.length) {
      promptEl.textContent = "Game complete — well done!";
      feedback.textContent = "Final score: " + score;
      choiceA.disabled = choiceB.disabled = true;
      return;
    }
    const p = prompts[order[currentIndex]];
    promptEl.textContent = p.text;
    // swap images occasionally for variety (but keep semantics simple)
    // (This demo always keeps the images the same; replace if you want dynamic images.)
  }

  function giveFeedback(isCorrect) {
    locked = true;
    if (isCorrect) {
      score++;
      feedback.textContent = "Good choice — that reflects Stoic focus.";
    } else {
      feedback.textContent = "Try reflecting: ask which part you can control.";
    }
    scoreEl.textContent = score;
    nextBtn.hidden = false;
  }

  choiceA.addEventListener('click', () => {
    if (locked) return;
    const correct = prompts[order[currentIndex]].correct === "A";
    giveFeedback(correct);
  });

  choiceB.addEventListener('click', () => {
    if (locked) return;
    const correct = prompts[order[currentIndex]].correct === "B";
    giveFeedback(correct);
  });

  nextBtn.addEventListener('click', () => {
    nextPrompt();
  });

  // Start
  nextPrompt();
});
