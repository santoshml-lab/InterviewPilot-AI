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

const response = await fetch(API_URL);

const history = await response.json();

if(history.length === 0){

container.innerHTML = `
<div class="output-box">
No interview history found.
</div>
`;

return;

}

let html = "";

history.forEach(item => {

html += `

<div class="continue">

<h3>🎤 ${item.company}</h3>

<p><b>Role:</b> ${item.role}</p>

<p><b>Score:</b> ⭐ ${item.score}</p>

<p><b>Date:</b> 📅 ${item.date}</p>

<button class="btn primary"
onclick="viewFeedback(\`${item.feedback}\`)">

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

}

catch(error){

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

function viewFeedback(feedback){

alert(feedback);

}

// ===============================
// Delete History
// ===============================

async function deleteHistory(id){

if(!confirm("Delete this interview history?")) return;

try{

await fetch(`${API_URL}/${id}`,{
method:"DELETE"
});

loadHistory();

}
catch(error){

console.error(error);

alert("Failed to delete history.");

}

}

// Auto Load

window.onload = loadHistory;
