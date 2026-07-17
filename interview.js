// ======================================
// InterviewPilot AI
// interview.js
// PART 1
// ======================================
alert("Interview JS Loaded");

const API_URL = "https://interviewlession.onrender.com/interview";

let currentQuestion = "";

// ======================================
// START INTERVIEW
// ======================================

async function startInterview(){
alert("Start Interview Clicked");  

const role = document.getElementById("role").value;
const company = document.getElementById("company").value;
const difficulty = document.getElementById("difficulty").value;

const questionBox = document.getElementById("questionBox");

questionBox.innerHTML = "🤖 Generating Interview Question...";

try{

const response = await fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

action:"question",

role:role,

company:company,

difficulty:difficulty,

question:"",

answer:""

})

});

const data = await response.json();

currentQuestion = data.response;

questionBox.innerHTML = data.response;

}catch(error){

questionBox.innerHTML = "❌ Failed to connect to AI.";

console.error(error);

}

}

// ======================================
// SUBMIT ANSWER
// ======================================

async function submitAnswer(){

const answer = document.getElementById("answer").value.trim();

if(answer===""){

alert("Please enter your answer.");

return;

}

const feedbackBox = document.getElementById("feedbackBox");

feedbackBox.innerHTML = "🧠 AI is evaluating your answer...";

}
// ======================================
// PART 2
// AI Answer Evaluation
// ======================================

try{

const role = document.getElementById("role").value;
const company = document.getElementById("company").value;
const difficulty = document.getElementById("difficulty").value;

const response = await fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

action:"evaluate",

role:role,

company:company,

difficulty:difficulty,

question:currentQuestion,

answer:answer

})

});

const data = await response.json();

feedbackBox.innerHTML = data.response;

// Give XP if dashboard functions exist
if(typeof addXP === "function"){

addXP(20);

}

}catch(error){

feedbackBox.innerHTML="❌ Failed to evaluate answer.";

console.error(error);

}

// ======================================
// NEXT QUESTION
// ======================================

function nextQuestion(){

document.getElementById("answer").value="";

document.getElementById("feedbackBox").innerHTML="";

startInterview();

}

