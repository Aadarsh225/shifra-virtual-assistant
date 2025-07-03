let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Sir, how can I assist you?");
    }
    else if (message.includes("who are you")) {
        speak("I am Shifra, a virtual assistant created by Aadarsh sir.");
    }
    else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com/");
    }
    else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com/");
    }
    else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com/");
    }
    else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com/");
    }
    else if (message.includes("open calculator")) {
        speak("Opening Calculator");
        window.open("https://www.google.com/search?q=online+calculator");
    }
    else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp Web");
        window.open("https://web.whatsapp.com/");
    }
    else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);
    }
    else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "long" });
        speak("Today's date is " + date);
    }

    // New intelligent features:
    else if (message.includes("play music")) {
        speak("Playing your favorite music");
        window.open("https://www.youtube.com/results?search_query=lofi+music");
    }
    else if (message.includes("open coddy")) {
        speak("Opening Coddy YouTube channel");
        window.open("https://www.youtube.com/@CoddyHQ");
    }
    else if (message.includes("day")) {
        let day = new Date().toLocaleString(undefined, { weekday: "long" });
        speak("Today is " + day);
    }
    else if (message.includes("tell me a joke")) {
        let jokes = [
            "Why don't scientists trust atoms? Because they make up everything.",
            "Why was the math book sad? Because it had too many problems.",
            "What do you call fake spaghetti? An impasta!"
        ];
        let joke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(joke);
    }
    else if (message.includes("wikipedia")) {
        let topic = message.replace("wikipedia", "").trim();
        if (topic.length > 0) {
            speak(`Searching Wikipedia for ${topic}`);
            window.open(`https://en.wikipedia.org/wiki/${topic}`);
        } else {
            speak("Please say a topic after Wikipedia.");
        }
    }
    else if (message.includes("open ai chat")) {
        speak("Opening ChatGPT");
        window.open("https://chat.openai.com/");
    }
    else if (message.includes("remind me to")) {
        let task = message.replace("remind me to", "").trim();
        speak(`Reminder set: ${task}`);
        setTimeout(() => {
            speak(`Reminder: ${task}`);
            alert(`Reminder: ${task}`);
        }, 10000); // You can change delay
    }
    else if (message.includes("weather")) {
        speak("Checking weather forecast");
        window.open("https://www.google.com/search?q=weather");
    }

    // Fallback search
    else {
        let finalText = "This is what I found on the internet regarding " + (message.replace("shifra", "") || message.replace("shipra", ""));
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("shifra", "") || message.replace("shipra", "")}`);
    }
}
