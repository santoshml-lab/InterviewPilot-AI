// ======================================
// InterviewPilot AI
// coding.js
// ======================================

const API_URL = "https://interviewlession.onrender.com/coding";

let currentQuestion = "";

// ======================================
// GENERATE CODING QUESTION
// ======================================

async function generateQuestion(){

const language=document.getElementById("language").value;
const difficulty=document.getElementById("difficulty").value;
const topic=document.getElementById("topic").value;

const questionBox=document.getElementById("questionBox");

questionBox.innerHTML="🤖 Generating Coding Question...";

try{

const response=await fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

action:"question",

language:language,

difficulty:difficulty,

topic:topic,

code:""

})

});

const data=await response.json();

currentQuestion=data.response;

questionBox.innerHTML=marked.parse(data.response);

}catch(error){

console.error(error);

questionBox.innerHTML="❌ Failed to generate coding question.";

}

}

// ======================================
// SUBMIT CODE
// ======================================

async function submitCode(){

const code=document.getElementById("code").value.trim();

if(code===""){

alert("Please write your code.");

return;

}

const language=document.getElementById("language").value;
const difficulty=document.getElementById("difficulty").value;
const topic=document.getElementById("topic").value;

const feedbackBox=document.getElementById("feedbackBox");

feedbackBox.innerHTML="🧠 AI is reviewing your code...";

try{

const response=await fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

action:"review",

language:language,

difficulty:difficulty,

topic:topic,

question:currentQuestion,

code:code

})

});

const data=await response.json();

feedbackBox.innerHTML=marked.parse(data.response);

}catch(error){

console.error(error);

feedbackBox.innerHTML="❌ Failed to review code.";

}

}
