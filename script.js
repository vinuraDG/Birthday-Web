document.addEventListener("DOMContentLoaded", () => {
    const introMusic = document.getElementById("introMusic");
    const mainMusic = document.getElementById("mainMusic");
    
    const startupScreen = document.getElementById("startupScreen");
    const startAppBtn = document.getElementById("startAppBtn");
    const mainPage = document.getElementById("mainPage");
    const audioToggle = document.getElementById("audioToggle");

    // Reduce volume slightly so it's not piercingly loud initially
    introMusic.volume = 0.6;
    mainMusic.volume = 0.6;

    let currentTrack = null;

    // STEP A: User clicks the Initial Startup button
    startAppBtn.addEventListener("click", () => {
        // Start playing the Intro romantic track immediately now that we have interaction
        introMusic.play().catch(error => console.log("Audio playback blocked:", error));
        currentTrack = introMusic;

        // Animate out the startup screen (you can also trigger your app's existing intro transitions here)
        startupScreen.style.opacity = "0";
        startupScreen.style.visibility = "hidden";
        
        // Brief timeout to hide startup entirely and show your primary page
        setTimeout(() => {
            startupScreen.classList.add("hidden");
            mainPage.classList.remove("hidden");
            mainPage.style.opacity = "1";
            mainPage.style.visibility = "visible";
            
            // OPTIONAL STEP B: If you want the music to switch automatically to the MAIN romantic track 
            // once the main page fully loads/reveals, uncomment the function below:
            switchToMainMusic();

        }, 800); 
    });

    // Function to smoothly transition from intro track to main track
    function switchToMainMusic() {
        if (!introMusic.paused) {
            // Smoothly fade out intro music
            let fadeInterval = setInterval(() => {
                if (introMusic.volume > 0.05) {
                    introMusic.volume -= 0.05;
                } else {
                    clearInterval(fadeInterval);
                    introMusic.pause();
                    
                    // Start main romantic music
                    mainMusic.play().catch(err => console.log(err));
                    currentTrack = mainMusic;
                }
            }, 50); // updates every 50ms
        } else {
            mainMusic.play().catch(err => console.log(err));
            currentTrack = mainMusic;
        }
    }

    // Audio controls for the user to toggle Mute/Unmute anytime
    audioToggle.addEventListener("click", () => {
        if (currentTrack) {
            if (currentTrack.muted) {
                currentTrack.muted = false;
                audioToggle.innerText = "🔊 Mute";
            } else {
                currentTrack.muted = true;
                audioToggle.innerText = "🔇 Unmute";
            }
        }
    });
});