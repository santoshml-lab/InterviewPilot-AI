// ===================================
// InterviewPilot AI Authentication
// ===================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

loginForm.addEventListener("submit", async (e) => {

e.preventDefault();

const email = document.getElementById("email").value.trim();

const password = document.getElementById("password").value;

const { data, error } = await db.auth.signInWithPassword({

email,
password

});

if (error) {

alert("❌ " + error.message);
return;

}

alert("✅ Login Successful!");

window.location.href = "dashboard.html";

});

}

// ===================================
// SIGNUP
// ===================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

signupForm.addEventListener("submit", async (e) => {

e.preventDefault();

const email = document.getElementById("email").value.trim();

const password = document.getElementById("password").value;

const { data, error } = await db.auth.signUp({

email,
password

});

if (error) {

alert("❌ " + error.message);
return;

}

alert("🎉 Account Created! Please verify your email.");

window.location.href = "login.html";

});

}

// ===================================
// GOOGLE LOGIN
// ===================================

const googleBtn = document.getElementById("googleLogin");

if (googleBtn) {

googleBtn.addEventListener("click", async () => {

const { error } = await db.auth.signInWithOAuth({

provider: "google",

options: {
redirectTo: window.location.origin + "/index.html"
}

});

if (error) {

alert("❌ " + error.message);

}

});

}

// ===================================
// CHECK LOGIN
// ===================================

async function checkUser() {

const {

data: { session }

} = await db.auth.getSession();

if (session) {

console.log("✅ Logged In:", session.user.email);

}

}

checkUser();

// ===================================
// LOGOUT
// ===================================

async function logout() {

await db.auth.signOut();

window.location.href = "login.html";

}
