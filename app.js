// ======================================
// InterviewPilot AI
// app.js
// ======================================

// ----------------------
// AI Tips
// ----------------------

const tips = [

"🎯 Practice one interview every day.",
"💼 Tailor your resume for each company.",
"🧠 Explain your answers confidently.",
"💻 Practice DSA regularly.",
"📄 Keep your resume one page long.",
"🚀 Consistency beats motivation."

];

let tipIndex = 0;

function nextTip(){

const message = document.getElementById("aiMessage");

if(!message) return;

tipIndex++;

if(tipIndex >= tips.length){

tipIndex = 0;

}

message.innerHTML = tips[tipIndex];

}

// ----------------------
// Progress
// ----------------------

let progress = Number(localStorage.getItem("progress")) || 0;

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

function updateProgress(){

if(progressFill){

progressFill.style.width = progress + "%";

}

if(progressText){

progressText.innerHTML = progress + "% Completed";

}

localStorage.setItem("progress", progress);

}

function increaseProgress(){

if(progress < 100){

progress += 10;

}

if(progress > 100){

progress = 100;

}

updateProgress();

alert("🎉 Great Job! Progress Updated.");

}

updateProgress();

// ======================================
// XP SYSTEM
// ======================================

let xp = Number(localStorage.getItem("xp")) || 0;

function addXP(amount){

    xp += amount;

    localStorage.setItem("xp", xp);

    updateXP();

    saveLeaderboard();

}









function updateXP(){

const xpBox = document.getElementById("xp");

if(xpBox){

xpBox.innerHTML = xp + " XP";

}

updateBadge();

}

// ======================================
// BADGE SYSTEM
// ======================================

function updateBadge(){

let badge = "🌱 Beginner";

if(xp >= 100){

badge = "📘 Learner";

}

if(xp >= 250){

badge = "🧠 Skilled";

}

if(xp >= 500){

badge = "🏆 Expert";

}

if(xp >= 1000){

badge = "👑 Interview Master";

}

localStorage.setItem("badge", badge);

const badgeBox = document.getElementById("badge");

if(badgeBox){

badgeBox.innerHTML = badge;

}

}

// ======================================
// DAILY STREAK
// ======================================

let streak = Number(localStorage.getItem("streak")) || 0;

function increaseStreak(){

streak++;

localStorage.setItem("streak", streak);

const streakBox = document.getElementById("streak");

if(streakBox){

streakBox.innerHTML = "🔥 " + streak;

}

}

// ======================================
// COMPLETE TODAY'S PRACTICE
// ======================================

function completePractice(){

increaseProgress();

addXP(20);

increaseStreak();

alert("🎉 +20 XP Earned!");

}

// ======================================
// INITIALIZE
// ======================================

updateXP();
updateBadge();

const streakBox = document.getElementById("streak");

if(streakBox){

streakBox.innerHTML = "🔥 " + streak;

}

// ======================================
// DASHBOARD API
// ======================================

const DASHBOARD_API = "https://interviewlession.onrender.com/dashboard";

async function loadDashboard() {

    if (typeof db === "undefined") return;

    const {
        data: { session }
    } = await db.auth.getSession();

    if (!session) return;

    const userId = session.user.id;

    try {

        const response = await fetch(`${DASHBOARD_API}/${userId}`);

        const data = await response.json();

        const total = document.getElementById("totalInterviews");
        if (total) total.innerHTML = "🏆 " + data.total_interviews;

        const avg = document.getElementById("averageScore");
        if (avg) avg.innerHTML = "⭐ " + data.average_score + "/10";

        const resume = document.getElementById("resumeReviews");
        if (resume) resume.innerHTML = "📄 " + data.resume_reviews;

        const coding = document.getElementById("codingRounds");
        if (coding) coding.innerHTML = "💻 " + data.coding_rounds;

        const xp = document.getElementById("xp");
        if (xp) xp.innerHTML = "⭐ " + data.xp + " XP";

        const streak = document.getElementById("streak");
        if (streak) streak.innerHTML = "🔥 " + data.streak;

        const badge = document.getElementById("badge");
        if (badge) badge.innerHTML = data.badge;

        const ready = document.getElementById("readiness");
        if (ready) ready.innerHTML = "🎯 " + data.readiness + "%";

        saveLeaderboard();

    } catch (err) {
        console.error("Dashboard Error:", err);
    }

}

window.addEventListener("DOMContentLoaded", loadDashboard);

// ======================================
// Save Leaderboard
// ======================================

const LEADERBOARD_API = "https://interviewlession.onrender.com/leaderboard";

async function saveLeaderboard() {

    if (typeof db === "undefined") return;

    const {
        data: { session }
    } = await db.auth.getSession();

    if (!session) return;

    const user = session.user;

    await fetch(LEADERBOARD_API, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            user_id: user.id,
            name: user.user_metadata?.full_name ||
                  user.user_metadata?.name ||
                  user.email,
            xp: xp,
            badge: localStorage.getItem("badge") || "🌱 Beginner"

        })

    });

}
