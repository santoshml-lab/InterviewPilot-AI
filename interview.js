// ======================================
// InterviewPilot AI
// interview.js
// PART 1
// ======================================
alert("Interview JS Loaded");

const API_URL = "https://interviewlession.onrender.com/interview";
const HISTORY_API = "https://interviewlession.onrender.com/history";

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

feedbackBox.innerHTML="🧠 AI is evaluating your answer...";

try{

const role=document.getElementById("role").value;
const company=document.getElementById("company").value;
const difficulty=document.getElementById("difficulty").value;

const response=await fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

action:"evaluate",

role,

company,

difficulty,

question:currentQuestion,

answer

})

});

const data=await response.json();

feedbackBox.innerHTML = marked.parse(data.response);
// Extract Score
let score = "0/10";

const match = data.response.match(/Score:\s*([0-9.]+\/10)/i);

if (match) {
    score = match[1];
}

// Save History
 const {
    data: { session }
} = await db.auth.getSession();

const userId = session?.user?.id;

if (!userId) {
    alert("Please login first.");
    return;
}   
await fetch(HISTORY_API, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        user_id: localStorage.getItem("user_id") || "guest",
        company: company,
        role: role,
        score: score,
        feedback: data.response,
        interview_type: "Mock Interview"
    })
});  

}catch(error){

feedbackBox.innerHTML="❌ Failed to evaluate answer.";

console.error(error);

}

}


// ======================================
// PART 2
// AI Answer Evaluation
// ======================================



// ======================================
// NEXT QUESTION
// ======================================

function nextQuestion(){

document.getElementById("answer").value="";

document.getElementById("feedbackBox").innerHTML="";

startInterview();

}

