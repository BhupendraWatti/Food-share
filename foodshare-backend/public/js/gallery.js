// Gallery filter functionality
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".gallery-filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  // Add click event to filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => {
        btn.classList.remove("active", "bg-primary", "text-white")
        btn.classList.add("bg-gray-200")
      })

      // Add active class to clicked button
      button.classList.add("active", "bg-primary", "text-white")
      button.classList.remove("bg-gray-200")

      const filter = button.getAttribute("data-filter")

      // Show/hide gallery items based on filter
      galleryItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // Initialize lightbox for gallery items (placeholder functionality)
  const galleryImages = document.querySelectorAll(".gallery-item img")
  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      console.log("Lightbox would open here for:", img.alt)
      // In a real implementation, you would initialize a lightbox library here
    })
  })
})

