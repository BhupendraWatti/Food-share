// Check if logged in as admin
if (localStorage.getItem("adminLoggedIn") !== "true") {
  window.location.href = "admin-login.html"
}

// Handle logout
const logoutBtn = document.getElementById("logoutBtn")
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("adminLoggedIn")
    window.location.href = "admin-login.html"
  })
}

// Tab switching
// Tab switching (Updated to include Contact & Needy People)
// Tab switching logic: includes Donations, Volunteers, Contact, Needy People, FAQ
const tabButtons = {
  donationsTabBtn: "donationsTab",
  volunteersTabBtn: "volunteersTab",
  contactTabBtn: "contactTab",
  needyTabBtn: "needyTab",
  faqTabBtn: "faqTab"
};

Object.keys(tabButtons).forEach((btnId) => {
  const btn = document.getElementById(btnId);
  const tabId = tabButtons[btnId];

  if (btn) {
    btn.addEventListener("click", () => {
      // Hide all tabs
      Object.values(tabButtons).forEach((tab) => {
        document.getElementById(tab).classList.add("hidden");
      });

      // Reset all button styles
      Object.keys(tabButtons).forEach((id) => {
        const b = document.getElementById(id);
        b.classList.remove("border-b-2", "border-primary", "text-primary");
        b.classList.add("text-gray-500");
      });

      // Show the selected tab
      document.getElementById(tabId).classList.remove("hidden");
      btn.classList.add("border-b-2", "border-primary", "text-primary");
      btn.classList.remove("text-gray-500");
    });
  }
});



if (donationsTabBtn && volunteersTabBtn) {
  donationsTabBtn.addEventListener("click", () => {
    donationsTab.classList.remove("hidden")
    volunteersTab.classList.add("hidden")
    donationsTabBtn.classList.add("border-b-2", "border-primary", "text-primary")
    volunteersTabBtn.classList.remove("border-b-2", "border-primary", "text-primary")
    volunteersTabBtn.classList.add("text-gray-500")
  })

  volunteersTabBtn.addEventListener("click", () => {
    donationsTab.classList.add("hidden")
    volunteersTab.classList.remove("hidden")
    volunteersTabBtn.classList.add("border-b-2", "border-primary", "text-primary")
    volunteersTabBtn.classList.remove("text-gray-500")
    donationsTabBtn.classList.remove("border-b-2", "border-primary", "text-primary")
    donationsTabBtn.classList.add("text-gray-500")
  })
}

// Load data and update dashboard
document.addEventListener("DOMContentLoaded", () => {
  // Load donations
  const donations = JSON.parse(localStorage.getItem("donations") || "[]")
  const volunteers = JSON.parse(localStorage.getItem("volunteers") || "[]")

  // Update stats
  const totalDonationsElement = document.getElementById("totalDonations")
  const totalAmountElement = document.getElementById("totalAmount")
  const totalVolunteersElement = document.getElementById("totalVolunteers")

  if (totalDonationsElement) {
    totalDonationsElement.textContent = donations.length
  }

  if (totalAmountElement) {
    const totalAmount = donations.reduce((sum, donation) => sum + (Number.parseInt(donation.amount) || 0), 0)
    totalAmountElement.textContent = `₹${totalAmount}`
  }

  if (totalVolunteersElement) {
    totalVolunteersElement.textContent = volunteers.length
  }

  // Populate donations table
  const donationsTableBody = document.getElementById("donationsTableBody")
  if (donationsTableBody) {
    if (donations.length > 0) {
      const donationsHTML = donations
        .map(
          (donation) => `
        <tr class="border-t">
          <td class="px-4 py-3">${donation.name}</td>
          <td class="px-4 py-3">${donation.email}</td>
          <td class="px-4 py-3">${donation.phone}</td>
          <td class="px-4 py-3">₹${donation.amount}</td>
          <td class="px-4 py-3">${donation.donorType}</td>
          <td class="px-4 py-3">${new Date(donation.timestamp).toLocaleDateString()}</td>
        </tr>
      `,
        )
        .join("")

      donationsTableBody.innerHTML = donationsHTML
    } else {
      donationsTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="px-4 py-3 text-center text-gray-500">
            No donations found
          </td>
        </tr>
      `
    }
  }

  // Populate volunteers table
  const volunteersTableBody = document.getElementById("volunteersTableBody")
  if (volunteersTableBody) {
    if (volunteers.length > 0) {
      const volunteersHTML = volunteers
        .map(
          (volunteer) => `
        <tr class="border-t">
          <td class="px-4 py-3">${volunteer.name}</td>
          <td class="px-4 py-3">${volunteer.email}</td>
          <td class="px-4 py-3">${volunteer.phone}</td>
          <td class="px-4 py-3">${volunteer.area}</td>
          <td class="px-4 py-3">${new Date(volunteer.timestamp).toLocaleDateString()}</td>
        </tr>
      `,
        )
        .join("")

      volunteersTableBody.innerHTML = volunteersHTML
    } else {
      volunteersTableBody.innerHTML = `
        <tr>
          <td colspan="5" class="px-4 py-3 text-center text-gray-500">
            No volunteers found
          </td>
        </tr>
      `
    }
  }
})

