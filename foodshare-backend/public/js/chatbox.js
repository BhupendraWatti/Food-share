document.addEventListener("DOMContentLoaded", () => {
    const chatInput = document.getElementById("chatInput");
    const sendMessage = document.getElementById("sendMessage");
    const chatboxMessages = document.getElementById("chatbox-messages");
    const closeChat = document.getElementById("closeChat");
    const chatbox = document.getElementById("chatbox");
    const openChat = document.getElementById("openChat");

    // Open Chatbox
    openChat.addEventListener("click", () => {
        chatbox.classList.remove("hidden");
        openChat.classList.add("hidden");
    });

    // Close Chatbox
    closeChat.addEventListener("click", () => {
        chatbox.classList.add("hidden");
        openChat.classList.remove("hidden");
    });

    // Send Message
    sendMessage.addEventListener("click", async () => {
        const userMessage = chatInput.value.trim();
        if (userMessage === "") return;
    
        appendMessage("You: " + userMessage);
        chatInput.value = "";
    
        try {
            const API_URL = "http://localhost:3000/chat";
    
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }) // Ensure backend accepts this format
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server responded with ${response.status}: ${errorText}`);
            }
    
            const data = await response.json();
    
            // ✅ Handling multiple AI response formats
            let reply = "No reply found."; 
            if (data.reply) {
                reply = data.reply; // If response is { reply: "text" }
            } else if (data.choices?.[0]?.message?.content) {
                reply = data.choices[0].message.content; // If response is OpenAI format
            } else if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
                reply = data.candidates[0].content.parts[0].text; // If response is Gemini AI format
            }
    
            appendMessage("Gemini AI: " + reply);
    
        } catch (error) {
            console.error("Error:", error);
            appendMessage("Gemini AI: Sorry, something went wrong.");
        }
    });
    

    // Append Message Function
    function appendMessage(message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("p-2", "rounded-lg", "w-max", "max-w-xs", "text-white");

        if (message.startsWith("You:")) {
            messageElement.classList.add("bg-blue-600", "self-end");
        } else {
            messageElement.classList.add("bg-gray-600", "self-start");
        }

        messageElement.textContent = message;
        chatboxMessages.appendChild(messageElement);
        chatboxMessages.scrollTop = chatboxMessages.scrollHeight; // Auto-scroll
    }
});
