// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("item");

// Handle donor type selection
const donorTypeSelect = document.getElementById("donorType");
const customDonorTypeContainer = document.getElementById("customDonorTypeContainer");
const customDonorTypeInput = document.getElementById("customDonorType");

if (donorTypeSelect && customDonorTypeContainer) {
  donorTypeSelect.addEventListener("change", () => {
    if (donorTypeSelect.value === "other") {
      customDonorTypeContainer.classList.remove("hidden");
      customDonorTypeInput.setAttribute("required", "required");
    } else {
      customDonorTypeContainer.classList.add("hidden");
      customDonorTypeInput.removeAttribute("required");
    }
  });
}

// Handle photo upload
// const photoInput = document.getElementById("photo");
// const chooseFileBtn = document.getElementById("chooseFileBtn");
// const fileNameDisplay = document.getElementById("fileNameDisplay");
// const photoPreviewContainer = document.getElementById("photoPreviewContainer");
// const photoPreview = document.getElementById("photoPreview");

// if (photoInput && chooseFileBtn && fileNameDisplay) {
//   chooseFileBtn.addEventListener("click", () => {
//     photoInput.click();
//   });

//   photoInput.addEventListener("change", (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       fileNameDisplay.textContent = file.name;

//       // Show preview
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         photoPreview.src = e.target.result;
//         photoPreviewContainer.classList.remove("hidden");
//       };
//       reader.readAsDataURL(file);
//     } else {
//       fileNameDisplay.textContent = "No photo selected";
//       photoPreviewContainer.classList.add("hidden");
//     }
//   });
// }

// Handle form submission
document.addEventListener("DOMContentLoaded", () => {
  // Get URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get("item");

  const donationForm = document.getElementById("donationForm");
  const donorTypeSelect = document.getElementById("donorType");
  const customDonorTypeContainer = document.getElementById("customDonorTypeContainer");
  const customDonorTypeInput = document.getElementById("customDonorType");

  // Show/hide custom donor type
  if (donorTypeSelect && customDonorTypeContainer && customDonorTypeInput) {
    donorTypeSelect.addEventListener("change", () => {
      if (donorTypeSelect.value === "other") {
        customDonorTypeContainer.classList.remove("hidden");
        customDonorTypeInput.setAttribute("required", "required");
      } else {
        customDonorTypeContainer.classList.add("hidden");
        customDonorTypeInput.removeAttribute("required");
      }
    });
  }

  // Handle form submit
  if (donationForm) {
    donationForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(donationForm);
      let donorType = formData.get("donorType");
      if (donorType === "other") {
        donorType = formData.get("customDonorType");
      }

      const donationData = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        amount: formData.get("amount"),
        donorType: donorType,
        itemId: itemId,
        timestamp: new Date().toISOString(),
      };

      fetch('http://localhost:3000/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      })
      .then(response => response.json())
      .then(data => {
        Toastify({
          text: "Donation submitted successfully!",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#008080",
        }).showToast();

        window.location.href = "thank-you.html";
      })
      .catch(error => {
        console.error('Error:', error);
        Toastify({
          text: "Donation failed. Please try again.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#e53e3e",
        }).showToast();
      });
    });
  }
});
