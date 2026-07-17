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
