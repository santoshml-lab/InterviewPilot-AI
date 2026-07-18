// ======================================
// InterviewPilot AI
// performance.js
// ======================================

const API_URL = "https://interviewlession.onrender.com/performance";

async function loadPerformance() {

const overallScore = document.getElementById("overallScore");
const mockCount = document.getElementById("mockCount");
const codingCount = document.getElementById("codingCount");
const resumeCount = document.getElementById("resumeCount");

const interviewScore = document.getElementById("interviewScore");
const codingScore = document.getElementById("codingScore");
const atsScore = document.getElementById("atsScore");

const strengths = document.getElementById("strengths");
const weakAreas = document.getElementById("weakAreas");
const recommendation = document.getElementById("recommendation");

recommendation.innerHTML = "🤖 AI is analyzing your performance...";

try {

const response = await fetch(API_URL);

const data = await response.json();

overallScore.innerHTML = data.overall_score;
mockCount.innerHTML = data.mock_interviews;
codingCount.innerHTML = data.coding_interviews;
resumeCount.innerHTML = data.resume_analysis;

interviewScore.innerHTML = data.interview_score;
codingScore.innerHTML = data.coding_score;
atsScore.innerHTML = data.ats_score;

strengths.innerHTML = marked.parse(data.strengths);

weakAreas.innerHTML = marked.parse(data.weak_areas);

recommendation.innerHTML = marked.parse(data.recommendation);

} catch (error) {

console.error(error);

recommendation.innerHTML =
"❌ Failed to load performance data.";

}

}

// Auto Load

window.onload = loadPerformance;
