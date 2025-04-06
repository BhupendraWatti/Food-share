

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const formSuccess = document.getElementById("formSuccess");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`); // Debugging form values
    // }

    
    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    console.log("Sending Contact Data:", JSON.stringify(contactData, null, 2));

    console.log("Sending Contact Data:", contactData);

    try 
    {

      // const [formData, setFormData] = useState({
      //   name: "",
      //   email: "",
      //   subject: "",
      //   message: "",
      // });
      
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        console.log("Sending Contact Data:", formData);  
      
        // Ensure all fields are filled
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
          alert("All fields are required.");
          return;
        }
      
      const response = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) throw new error("Server Error");

      const data = await response.json();
      console.log("Server Response:", data);

      formSuccess.classList.remove("hidden"); // Show success message
      setTimeout(() => formSuccess.classList.add("hidden"), 5000);
      contactForm.reset();
    }} catch (error) {
      console.error("Fetch Error:", error);
      Toastify({
        text: "Something went wrong. Please try again.",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#dc2626", // red-600
        className: "text-white text-sm font-medium",
        stopOnFocus: true,
      }).showToast();
      
    }
  });

  // Mobile menu toggle
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
});
