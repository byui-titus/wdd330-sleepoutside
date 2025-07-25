const form = document.getElementById("loginForm");
const message = document.getElementById("loginMessage");
const baseURL =
  import.meta.env.VITE_SERVER_URL || "https://wdd330-backend.onrender.com/";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = {
    email: form.email.value,
    password: form.password.value,
  };

  try {
    const response = await fetch(`${baseURL}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (response.ok) {
      // Save the token to localStorage
      localStorage.setItem("token", data.token);
      message.textContent = "Login successful! Redirecting...";
      // Redirect to admin page
      window.location.href = "admin.html";
    } else {
      message.textContent = `Login failed: ${data.message || "Invalid credentials"}`;
    }
  } catch (err) {
    console.error("Login error:", err);
    message.textContent = "Login failed. Please try again.";
  }
});
