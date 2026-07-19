// ======================================
// InterviewPilot AI
// history.js
// ======================================

const INTERVIEW_API = "https://interviewlession.onrender.com/history";
const APTITUDE_API = "https://interviewlession.onrender.com/aptitude-history";

// ======================================
// Load Interview History
// ======================================

async function loadInterviewHistory() {

    const container = document.getElementById("historyContainer");

    container.innerHTML = `
    <div class="loading">
        Loading Interview History...
    </div>`;

    try {

        const {
            data: { user }
        } = await db.auth.getUser();

        const response = await fetch(`${INTERVIEW_API}/${user.id}`);
        const history = await response.json();

        if (!history.length) {
            container.innerHTML = `
            <div class="output-box">
                No Interview History Found.
            </div>`;
            return;
        }

        let html = "";

        history.forEach(item => {

            const feedback = encodeURIComponent(item.feedback);

            html += `
            <div class="continue">

                <h3>🎤 ${item.company}</h3>

                <p><b>Role:</b> ${item.role}</p>

                <p><b>Score:</b> ⭐ ${item.score}</p>

                <p><b>Date:</b> 📅 ${new Date(item.created_at).toLocaleString()}</p>

                <button class="btn primary"
                onclick="viewFeedback('${feedback}')">
                👁 View Feedback
                </button>

                <button class="btn secondary"
                onclick="deleteInterviewHistory(${item.id})">
                🗑 Delete
                </button>

            </div>`;
        });

        container.innerHTML = html;

    } catch (err) {

        console.error(err);

        container.innerHTML = `
        <div class="output-box">
            ❌ Failed to load Interview History.
        </div>`;
    }

}

// ======================================
// Load Aptitude History
// ======================================

async function loadAptitudeHistory() {

    const container = document.getElementById("historyContainer");

    container.innerHTML = `
    <div class="loading">
        Loading Aptitude History...
    </div>`;

    try {

        const {
            data: { user }
        } = await db.auth.getUser();

        const response = await fetch(`${APTITUDE_API}/${user.id}`);
        const history = await response.json();

        if (!history.length) {

            container.innerHTML = `
            <div class="output-box">
                No Aptitude History Found.
            </div>`;

            return;
        }

        let html = "";

        history.forEach(item => {

            const feedback = encodeURIComponent(item.feedback);

            html += `
            <div class="continue">

                <h3>🧠 ${item.category}</h3>

                <p><b>Difficulty:</b> ${item.difficulty}</p>

                <p><b>Score:</b> ⭐ ${item.score}</p>

                <p><b>Date:</b> 📅 ${new Date(item.created_at).toLocaleString()}</p>

                <button class="btn primary"
                onclick="viewFeedback('${feedback}')">
                👁 View Feedback
                </button>

                <button class="btn secondary"
                onclick="deleteAptitudeHistory(${item.id})">
                🗑 Delete
                </button>

            </div>`;
        });

        container.innerHTML = html;

    } catch (err) {

        console.error(err);

        container.innerHTML = `
        <div class="output-box">
            ❌ Failed to load Aptitude History.
        </div>`;
    }

}

// ======================================
// View Feedback
// ======================================

function viewFeedback(feedback) {

    feedback = decodeURIComponent(feedback);

    document.getElementById("historyContainer").innerHTML += `
    <div class="output-box">
        ${marked.parse(feedback)}
    </div>`;
}

// ======================================
// Delete Interview History
// ======================================

async function deleteInterviewHistory(id) {

    if (!confirm("Delete this interview history?")) return;

    try {

        await fetch(`${INTERVIEW_API}/${id}`, {
            method: "DELETE"
        });

        loadInterviewHistory();

    } catch (err) {

        console.error(err);

        alert("Failed to delete interview history.");

    }

}

// ======================================
// Delete Aptitude History
// ======================================

async function deleteAptitudeHistory(id) {

    if (!confirm("Delete this aptitude history?")) return;

    try {

        await fetch(`${APTITUDE_API}/${id}`, {
            method: "DELETE"
        });

        loadAptitudeHistory();

    } catch (err) {

        console.error(err);

        alert("Failed to delete aptitude history.");

    }

}

// ======================================
// Auto Load
// ======================================

window.onload = function () {
    loadInterviewHistory();
};




