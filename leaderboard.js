// ======================================
// InterviewPilot AI
// leaderboard.js
// ======================================

const API_URL = "https://interviewlession.onrender.com/leaderboard";

async function loadLeaderboard() {

    const tbody = document.getElementById("leaderboardBody");

    tbody.innerHTML = `
    <tr>
        <td colspan="4" style="text-align:center;padding:20px;">
            Loading...
        </td>
    </tr>
    `;

    try {

        const response = await fetch(API_URL);

        const data = await response.json();

        if (!data.length) {

            tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;padding:20px;">
                    No leaderboard data found.
                </td>
            </tr>
            `;

            return;
        }

        let html = "";

        data.forEach((user, index) => {

            let medal = "";

            if (index === 0) medal = "🥇";
            else if (index === 1) medal = "🥈";
            else if (index === 2) medal = "🥉";
            else medal = index + 1;

            html += `
            <tr>

                <td style="padding:15px;">${medal}</td>

                <td style="padding:15px;">
                    ${user.name || "Anonymous"}
                </td>

                <td style="padding:15px;">
                    ⭐ ${user.xp}
                </td>

                <td style="padding:15px;">
                    ${user.badge}
                </td>

            </tr>
            `;
        });

        tbody.innerHTML = html;

    }

    catch (err) {

        console.error(err);

        tbody.innerHTML = `
        <tr>
            <td colspan="4" style="text-align:center;padding:20px;color:red;">
                Failed to load leaderboard.
            </td>
        </tr>
        `;

    }

}

window.onload = loadLeaderboard;
