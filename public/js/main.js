// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear()

// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobileMenuButton")
const mobileMenu = document.getElementById("mobileMenu")

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
  })
}

// Contact form submission on home page
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
    }

    // Store in localStorage
    const contacts = JSON.parse(localStorage.getItem("contacts") || "[]")
    contacts.push(contactData)
    localStorage.setItem("contacts", JSON.stringify(contacts))
    
    // Reset form
    contactForm.reset()

    // Show success message
    Toastify({
      text: "Thank you for your message. We will get back to you soon!",
      duration: 3000,
      gravity: "top", // 'top' or 'bottom'
      position: "right", // 'left', 'center', or 'right'
      backgroundColor: "#008080",
      className: "text-white text-sm font-medium",
      stopOnFocus: true,
    }).showToast();
    
    // alert("Thank you for your message. We will get back to you soon!")
  })
}

// Load food items in the grid
const foodGrid = document.getElementById("foodGrid")
if (foodGrid) {
  const foodItems = [
    {
      id: 1,
      title: "Thali Meal",
      description: "A complete balanced meal with rice, dal, vegetables, and roti.",
      image: "/Pictures/Gallery/Thali.jpeg",
      price: 70,
    },
    {
      id: 2,
      title: "Rice",
      description: "Fragrant rice cooked with mixed vegetables and aromatic spices.",
      image: "/Pictures/Donate food/Rice.jpg",
      price: 45,
    },
    {
      id: 3,
      title: "Feed a Street Dog",
      description: "Provide nutritious food for street dogs in need like dog foods.",
      image: "/Pictures/Donate food/dog biscuit.avif",
      price: 40,
    },
    {
      id: 4,
      title: "Breakfast Pack",
      description: "Nutritious breakfast including fruits, milk, and bread.",
      image: "/Pictures/Donate food/Poha jalebi.jpg",
      price: 25,
    },
    {
      id: 5,
      title: "Fruit Basket",
      description: "Fresh seasonal fruits for a healthy diet like banana, many more.",
      image: "/Pictures/Donate food/Fruit Basket.jpg",
      price: 60,
    },
    {
      id: 6,
      title: "Grocery Kit",
      description: "Essential groceries including rice, dal, oil, and spices.",
      image: "/Pictures/Donate food/Grocery kit.avif",
      price: 200,
    },
  ]

  // Generate HTML for food items
  const foodItemsHTML = foodItems
    .map(
      (item) => `
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div class="relative h-48">
        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
      </div>
      <div class="p-6">
        <h3 class="text-xl font-bold mb-2">${item.title}</h3>
        <p class="text-gray-600 mb-4">${item.description}</p>
        <div class="flex justify-between items-center">
          <span class="text-primary font-bold">₹${item.price}</span>
          <a href="donate.html?item=${item.id}" class="bg-primary hover:bg-green-700 text-white px-4 py-2 rounded-md">
            Donate
          </a>
        </div>
      </div>
    </div>
  `,
    )
    .join("")

  foodGrid.innerHTML = foodItemsHTML
}

// Check if user is logged in as admin
function isAdmin() {
  return localStorage.getItem("adminLoggedIn") === "true"
}

