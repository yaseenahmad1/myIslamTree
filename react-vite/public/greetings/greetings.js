const greetings = [
    { language: "English", text: "Peace be upon you" },
    { language: "English-Arabic", text: "As Salaamu Alaykum"},
    { language: "Arabic", text: "السلام عليكم" },
    { language: "Mandarin Chinese", text: "愿你平安" },
    { language: "Spanish", text: "Que la paz sea contigo" },
    { language: "Hindi", text: "आप पर शांति हो" },
    { language: "French", text: "Que la paix soit sur vous" },
    { language: "Japanese", text: "あなたに平和が訪れますように" },
    { language: "Bengali", text: "আপনার প্রতি শান্তি বর্ষিত হোক" },
    { language: "Portuguese", text: "Que a paz esteja com você" },
    { language: "Russian", text: "Мир вам" },
    { language: "Urdu", text: "آپ پر امن ہو" },
    { language: "Indonesian", text: "Damai menyertaimu" },
    { language: "German", text: "Friede sei mit dir" },
    { language: "Nigerian Pidgin", text: "Make peace dey with you" },
    { language: "Marathi", text: "तुमच्या वर शांतता असो" },
    { language: "Telugu", text: "మీపై శాంతి ఉండాలి" },
    { language: "Turkish", text: "Huzur seninle olsun" },
    { language: "Tamil", text: "உங்களுக்கு அமைதியுடன் இருக்கட்டும்" },
    { language: "Cantonese", text: "願你平安" },
    { language: "Vietnamese", text: "An bình đến với bạn" },
    { language: "Korean", text: "당신에게 평화가 있기를" },
    { language: "Persian", text: "صلح بر شما" },
    { language: "Swahili", text: "Amani iwe juu yako" },
    { language: "Tagalog", text: "Kapayapaan nawa ay sumaiyo" },
  ];

let i = 0; // Start at index 0 to begin with the frist object in the greetings array

const greetingText = document.getElementById("greeting-text"); 
// This gets the HTML element with id="greeting-text" so we can dynamically change its displayed text

const tooltipText = document.getElementById("tooltip-text");  
// This gets the HTML element with id="tooltip-text" so we can dynamically change the tooltip (language name)

// create a function that goes through each object within our array 
function rotate() {

    // Step 1: Fade out
    greetingText.style.opacity = 0; 
    console.log('Fading Out'); 

    // Step 2: After 500ms (matches CSS transistion), change the text
    setTimeout(() => {
      const { text, language } = greetings[i]; // Destructure : From the object at index i in the greetings array, pull out the text and language properties and store them in variables called text and language. 

      greetingText.textContent = text; // textContent is cool! textContent is saying:
      // “Hey DOM, take this element and swap out whatever’s inside it with this new string.”
      // Set the visible text of the greetingText element to the greeting phrase 
      // textContent is a DOM property that sets or returns the text content of a node and its descendants
      // It replaces any existing content inside the elemnent with this new string 

      tooltipText.textContent = language; // Set the visible text of the tooltipText element to the language name 

      // Step 3: Fade back in 
      greetingText.style.opacity = 1; 
      console.log('Fading in with text:', text);
      i = (i + 1) % greetings.length; // Increase the index by 1 each time. so for i starting at 0 we will have i + 1 = 1 which is 1 % 25 = 1 ensuring that when we reach to 25 % 25 the remainder of that becomes 0 and we start over
    }, 500); // this delay should match the CSS fade-out duration because if not the text won't be smooth so syncing is key here 
}

setInterval(rotate, 2000) // set an interval between this rotate function we established to switch every 1000 milliseconds (1 second) continously

rotate(); 
// Call rotate immediately so the user sees the first greeting right away
// instead of waiting 1 second for the first interval to fire. 

document.body.addEventListener("click", () => {
    window.location.href = "/home"; // this goes to your React app root (the spiral/homepage)
  });