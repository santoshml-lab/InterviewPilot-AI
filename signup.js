// ======================================
// InterviewPilot AI
// signup.js
// ======================================

const form = document.getElementById("signupForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    const message = document.getElementById("message");

    message.innerHTML = "";

    // Validation

    if (password !== confirmPassword) {

        message.style.color = "red";

        message.innerHTML = "❌ Passwords do not match.";

        return;

    }

    try {

        const { data, error } = await db.auth.signUp({

            email,

            password,

            options: {

                data: {

                    full_name: name

                }

            }

        });

        if (error) {

            message.style.color = "red";

            message.innerHTML = "❌ " + error.message;

            return;

        }

        message.style.color = "#22c55e";

        message.innerHTML = "✅ Account created successfully! Redirecting to login...";

        setTimeout(() => {

            window.location.href = "login.html";

        }, 2000);

    }

    catch (err) {

        console.error(err);

        message.style.color = "red";

        message.innerHTML = "❌ Something went wrong.";

    }

});
