// ======================================
// InterviewPilot AI
// history.js
// ======================================

const API_URL = "https://interviewlession.onrender.com/history";

async function loadHistory() {

    const container = document.getElementById("historyContainer");

    container.innerHTML = `
    <div class="loading">
    Loading Interview History...
    </div>
    `;

    try {

        const {
            data: { user }
        } = await db.auth.getUser();

        const response = await fetch(`${API_URL}/${user.id}`);

        const history = await response.json();

        if (history.length === 0) {

            container.innerHTML = `
            <div class="output-box">
            No interview history found.
            </div>
            `;

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
                onclick="deleteHistory(${item.id})">

                🗑 Delete

                </button>

            </div>

            `;
        });

        container.innerHTML = html;

    } catch (error) {

        console.error(error);

        container.innerHTML = `
        <div class="output-box">
        ❌ Failed to load history.
        </div>
        `;
    }
}

// ===============================
// View Feedback
// ===============================

function viewFeedback(feedback) {

    feedback = decodeURIComponent(feedback);

    document.getElementById("historyContainer").innerHTML += `
        <div class="output-box">
            ${marked.parse(feedback)}
        </div>
    `;
}

    

// ===============================
// Delete History
// ===============================

async function deleteHistory(id) {

    if (!confirm("Delete this interview history?")) return;

    try {

        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        loadHistory();

    } catch (error) {

        console.error(error);

        alert("Failed to delete history.");
    }
}

// Auto Load

window.onload = loadHistory;

async function loadAptitudeHistory() {

    const container = document.getElementById("historyContainer");

    container.innerHTML = "<div class='loading'>Loading Aptitude History...</div>";

    const {
        data: { session }
    } = await db.auth.getSession();

    if (!session) {
        container.innerHTML = "Please login first.";
        return;
    }

    const userId = session.user.id;

    try {

        const response = await fetch(`https://interviewlession.onrender.com/aptitude-history/${userId}`);

        const history = await response.json();

        if (history.length === 0) {

            container.innerHTML = "<div class='output-box'>No Aptitude History Found.</div>";

            return;

        }

        let html = "";

        history.forEach(item => {

            html += `
            <div class="continue">

                <h3>🧠 ${item.category}</h3>

                <p><b>Difficulty:</b> ${item.difficulty}</p>

                <p><b>Score:</b> ⭐ ${item.score}</p>

                <p><b>Date:</b> 📅 ${new Date(item.created_at).toLocaleString()}</p>

                <button class="btn primary"
                onclick="viewFeedback(\`${item.feedback}\`)">
                👁 View Feedback
                </button>

                <button class="btn secondary"
                onclick="deleteAptitudeHistory(${item.id})">
                🗑 Delete
                </button>

            </div>
            `;

        });

        container.innerHTML = html;

    }

    catch (err) {

        console.error(err);

        container.innerHTML = "<div class='output-box'>Failed to load Aptitude History.</div>";

    }

}




