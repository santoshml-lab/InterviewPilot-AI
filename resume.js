// ======================================
// Resume Analyzer
// resume.js
// ======================================

const API_URL = "https://interviewlession.onrender.com/resume";

// ======================================
// ANALYZE RESUME
// ======================================

async function analyzeResume(){

const file=document.getElementById("resumeFile").files[0];
const role=document.getElementById("role").value;

const output=document.getElementById("resumeOutput");

if(!file){

alert("Please upload your resume (PDF).");
return;

}

output.innerHTML="🤖 AI is analyzing your resume...";

const formData=new FormData();

formData.append("resume",file);
formData.append("role",role);

try{

const response=await fetch(API_URL,{

method:"POST",

body:formData

});

const data=await response.json();

if(data.response){

output.innerHTML=marked.parse(data.response);

}else{

output.innerHTML="❌ No response received.";

}

}catch(error){

console.error(error);

output.innerHTML="❌ Failed to connect to Resume Analyzer API.";

}

}
