// Check if already logged in
if (localStorage.getItem("adminLoggedIn") === "true") {
  window.location.href = "admin-dashboard.html"
}

// Handle login form submission
const adminLoginForm = document.getElementById("adminLoginForm")
const errorAlert = document.getElementById("errorAlert")
const errorMessage = document.getElementById("errorMessage")

if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    // Simple admin authentication
    if (username === "admin" && password === "admin123") {
      // Store admin session in localStorage
      localStorage.setItem("adminLoggedIn", "true")
      window.location.href = "admin-dashboard.html"
    } else {
      // Show error message
      errorMessage.textContent = "Invalid username or password"
      errorAlert.classList.remove("hidden")
    }
  })
}

