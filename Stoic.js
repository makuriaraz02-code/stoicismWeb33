// Stoic.js

let score = 0;
let bestScore = localStorage.getItem("bestScore") 
    ? parseInt(localStorage.getItem("bestScore")) 
    : 0;

let currentScenarioIndex = 0;

const scenarios = [
    {
        text: "You wake up, ready for a productive day, but a notification shows your bus is delayed by 30 minutes, guaranteeing you'll be late for class.",
        choices: [
            { text: "Rage at the uncontrollable delay and complain loudly.", isStoic: false },
            { text: "Accept the event, use the extra time to review your notes, and calmly plan your entry.", isStoic: true }
        ],
        explanation: "The bus schedule is outside your control. Your reaction is within your control. Focus on preparing (virtue) rather than pointless anger."
    },
    {
        text: "A classmate publicly criticizes your philosophy project idea, calling it 'silly' and 'too simple.'",
        choices: [
            { text: "Immediately argue back, defending your idea and attacking theirs.", isStoic: false },
            { text: "Remember their opinion is not under your control, and ask for specific constructive feedback.", isStoic: true }
        ],
        explanation: "Other people's judgments are external. Seek constructive use of feedback, ignore the insult."
    },
    {
        text: "Someone cuts in front of you in a long cafeteria line.",
        choices: [
            { text: "Politely inform them of the line, but remain calm if they refuse.", isStoic: true },
            { text: "Confront them angrily and escalate the situation.", isStoic: false }
        ],
        explanation: "You control your tone and response, not their behavior. Virtue is shown through calm assertiveness."
    },
    {
        text: "During a group project, one member is doing almost nothing, causing the workload to fall on you.",
        choices: [
            { text: "Complain to everyone and resent the entire project.", isStoic: false },
            { text: "Address the issue with the group and focus on what you can do to help move the project forward.", isStoic: true }
        ],
        explanation: "You cannot control others' effort, only your approach. Stoicism encourages rational discussion over resentment."
    },
    {
        text: "You lose your favorite pair of headphones on the way to school.",
        choices: [
            { text: "Accept the loss and focus on the present moment, knowing possessions come and go.", isStoic: true },
            { text: "Spend the rest of the day angry and blaming the universe.", isStoic: false }
        ],
        explanation: "Stoics treat material items as indifferent—they can be used wisely but shouldn’t control our emotions."
    },
    {
        text: "You're assigned a task you dislike at work.",
        choices: [
            { text: "Perform the task to the best of your ability, practicing discipline and excellence.", isStoic: true },
            { text: "Complain to others and do the work poorly out of spite.", isStoic: false }
        ],
        explanation: "Stoics act virtuously regardless of the task. Your character shows in how you approach what you don’t enjoy."
    }
];



// ELEMENTS
const scenarioTextElement = document.getElementById('scenario-text');
const choiceButtonsElement = document.getElementById('choice-buttons');
const scoreElement = document.getElementById('tranquility-score');
const bestScoreElement = document.getElementById('best-score');
const feedbackElement = document.getElementById('feedback');
const startButton = document.getElementById('start-button');
const resultImageElement = document.getElementById('result-image');


// UPDATE SCORE + SHOW FEEDBACK + IMAGE + DELAY
function updateScore(isStoic) {
    const scenario = scenarios[currentScenarioIndex];

    // Clear previous image
    resultImageElement.innerHTML = "";

    // Create image element
    const img = document.createElement("img");
    img.style.width = "180px";
    img.style.marginTop = "15px";

    if (isStoic) {
        score += 10;
        showFeedback("STOIC CHOICE! +10 Tranquility. " + scenario.explanation, true);
        img.src = "assets/smile.jpeg";  
    } else {
        score -= 5;
        showFeedback("UN-STOIC CHOICE! -5 Tranquility. " + scenario.explanation, false);
        img.src = "assets/dislike.jpeg"; 
    }

    // Display result image
    resultImageElement.appendChild(img);

    // Update score UI
    scoreElement.innerText = `Tranquility Score: ${score}`;
    bestScoreElement.innerText = `Best Score: ${bestScore}`;

    // Move to next scenario
    currentScenarioIndex++;

    // Delay next scenario by 3 seconds
    setTimeout(() => {
        if (currentScenarioIndex < scenarios.length) {
            displayScenario();
        } else {
            endGame();
        }
    }, 5000);
}


// DISPLAY SCENARIO
function displayScenario() {
    const scenario = scenarios[currentScenarioIndex];
    scenarioTextElement.innerHTML = `<p>${scenario.text}</p>`;
    choiceButtonsElement.innerHTML = '';
    feedbackElement.innerHTML = '';
    resultImageElement.innerHTML = '';

    scenario.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.onclick = () => updateScore(choice.isStoic);
        choiceButtonsElement.appendChild(button);
    });
}


// FEEDBACK COLOR
function showFeedback(message, isStoic) {
    feedbackElement.innerHTML = message;
    feedbackElement.style.color = isStoic ? "#2d6a4f" : "#b00020";
    feedbackElement.style.fontWeight = "700";
    feedbackElement.style.marginTop = "15px";
}


// START GAME
function startGame() {
    score = 0;
    currentScenarioIndex = 0;

    startButton.style.display = 'none';

    scoreElement.innerText = `Tranquility Score: ${score}`;
    bestScoreElement.innerText = `Best Score: ${bestScore}`;

    displayScenario();
}


// END GAME
function endGame() {
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
    }

    scenarioTextElement.innerHTML = `
        <h2>Your Stoic Journey Is Complete</h2>
        <p>Final Tranquility Score: <strong>${score}</strong></p>
        <p>Best Score Ever: <strong>${bestScore}</strong></p>
    `;

    choiceButtonsElement.innerHTML = '';
    feedbackElement.innerHTML = '';
    resultImageElement.innerHTML = '';

    startButton.innerText = 'Play Again';
    startButton.style.display = 'block';
}
