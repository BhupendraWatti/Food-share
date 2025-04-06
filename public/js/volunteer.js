// Handle form submission
const volunteerForm = document.getElementById("volunteerForm");
if (volunteerForm) {
  volunteerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(volunteerForm);
    const volunteerData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      area: formData.get("area"),
      experience: formData.get("experience"),
      availability: formData.get("availability"),
      timestamp: new Date().toISOString(),
    };

    // Send data to the server
    fetch('http://localhost:3000/volunteer', { // Ensure this matches your server endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(volunteerData),
    })
    .then(response => response.json())
    .then(data => {
      Toastify({
        text: "Volunteer application recorded successfully!",
        duration: 3000,
        gravity: "top", // 'top' or 'bottom'
        position: "right", // 'left', 'center', or 'right'
        backgroundColor: "#008080",
        className: "text-white text-sm font-medium",
        stopOnFocus: true,
      }).showToast();
      
      window.location.href = "volunteer-thank-you.html"; // Redirect to thank you page
    })
    .catch(error => console.error('Error:', error));
  });
}
