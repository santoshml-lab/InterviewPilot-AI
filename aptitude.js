// ======================================
// InterviewPilot AI
// aptitude.js
// ======================================

const API_URL = "https://interviewlession.onrender.com/aptitude";
const HISTORY_API = "https://interviewlession.onrender.com/aptitude-history";

let currentQuestion = "";

// ======================================
// Generate Question
// ======================================

async function generateQuestion() {

    const category = document.getElementById("category").value;
    const difficulty = document.getElementById("difficulty").value;

    const questionBox = document.getElementById("questionBox");

    questionBox.innerHTML = "🧠 Generating AI Question...";

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                action: "question",

                category,

                difficulty,

                question: "",

                answer: ""

            })

        });

        const data = await response.json();

        currentQuestion = data.response;

        questionBox.innerHTML = marked.parse(data.response);

    }

    catch (err) {

        questionBox.innerHTML = "❌ Failed to generate question.";

        console.error(err);

    }

}

// ======================================
// Submit Answer
// ======================================

async function submitAnswer() {

    const answer = document.getElementById("answer").value.trim();

    if (answer === "") {

        alert("Please enter your answer.");

        return;

    }

    const category = document.getElementById("category").value;
    const difficulty = document.getElementById("difficulty").value;

    const feedbackBox = document.getElementById("feedbackBox");

    feedbackBox.innerHTML = "🤖 AI is evaluating your answer...";

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                action: "evaluate",

                category,

                difficulty,

                question: currentQuestion,

                answer

            })

        });

        const data = await response.json();

        feedbackBox.innerHTML = marked.parse(data.response);
        let score = "0/10";

const match = data.response.match(/(\d+(\.\d+)?)\s*\/\s*10/);

if (match) {
    score = match[0];
}

const {
    data: { session }
} = await db.auth.getSession();

await fetch(HISTORY_API, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        user_id: session.user.id,
        category: category,
        difficulty: difficulty,
        score: score,
        question: currentQuestion,
        feedback: data.response
    })
});

    }

    catch (err) {

        feedbackBox.innerHTML = "❌ Failed to evaluate answer.";

        console.error(err);

    }

}
