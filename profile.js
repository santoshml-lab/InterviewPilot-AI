// ======================================
// InterviewPilot AI
// profile.js
// ======================================

const DASHBOARD_API = "https://interviewlession.onrender.com/dashboard";

async function loadProfile() {

    const {
        data: { session }
    } = await db.auth.getSession();

    if (!session) {
        window.location.href = "login.html";
        return;
    }

    const user = session.user;

    // ==========================
    // User Info
    // ==========================

    document.getElementById("userName").innerHTML =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        "InterviewPilot User";

    document.getElementById("userEmail").innerHTML =
        user.email;

    // ==========================
    // Dashboard Stats
    // ==========================

    try {

        const response = await fetch(
            `${DASHBOARD_API}/${user.id}`
        );

        const data = await response.json();

        document.getElementById("totalInterviews").innerHTML =
            "🏆 " + data.total_interviews;

        document.getElementById("averageScore").innerHTML =
            "⭐ " + data.average_score + "/10";

        document.getElementById("resumeReviews").innerHTML =
            "📄 " + data.resume_reviews;

        document.getElementById("codingRounds").innerHTML =
            "💻 " + data.coding_rounds;

        document.getElementById("xp").innerHTML =
            "⭐ " + data.xp + " XP";

        document.getElementById("streak").innerHTML =
            "🔥 " + data.streak;

        document.getElementById("badge").innerHTML =
            data.badge;

        document.getElementById("readiness").innerHTML =
            "🎯 " + data.readiness + "%";

    } catch (err) {

        console.error("Profile Error:", err);

    }

}

// ======================================
// Logout
// ======================================

async function logout() {

    await db.auth.signOut();

    window.location.href = "login.html";

}

window.onload = loadProfile;
