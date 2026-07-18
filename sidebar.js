// ======================================
// sidebar.js
// Load Sidebar on Every Page
// ======================================

document.addEventListener("DOMContentLoaded", () => {

const sidebar = document.getElementById("sidebar-container");

if(sidebar){

fetch("sidebar.html")

.then(response => response.text())

.then(data => {

sidebar.innerHTML = data;

// Highlight Current Page

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".sidebar nav a").forEach(link=>{

const href = link.getAttribute("href");

if(href===currentPage){

link.classList.add("active");

}

});

})

.catch(error=>{

console.error("Sidebar Load Error:",error);

});

}

});
