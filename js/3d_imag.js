
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const contentWrapper = document.querySelector('.content-wrapper');
    const loadingText = document.getElementById('loading-text');
  
    if (loadingScreen && loadingText) {
        let progress = 0;
  
        const updateProgress = () => {
            if (progress <= 100) {
                loadingText.textContent = `${progress}%`;
                progress += 1;
                setTimeout(updateProgress, 20); // Adjust timing for smoother progress
            } else {
                // Add class to content wrapper to trigger pull-up effect
                if (contentWrapper) {
                    contentWrapper.classList.add('show');
                }
  
                // Fade out the loading screen
                loadingScreen.style.transition = 'opacity 0.5s ease-out, visibility 0.5s ease-out';
                loadingScreen.style.opacity = '0';
  
                // Wait for the transition to complete before removing the loading screen
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500); // Match this duration with the transition duration
            }
        };
  
        // Start the progress update
        updateProgress();
    } else {
        console.log("Loading screen or text element not found.");
    }
  });
  
const imgElement = document.getElementById('current-image');
const imageCount = 19;
const sensitivity = 10;
const baseUrl = '3d_image/';
let currentIndex = 6; // Set default currentIndex to 6
let startY = 0;
let isMouseDown = false;

// Show default image when page loads
showImage(currentIndex, 'cluster_r_');

function showImage(index, prefix) {
    imgElement.src = `${baseUrl}${prefix}${index.toString().padStart(5, '0')}.jpg`;
    window.history.pushState(null, null, `${window.location.pathname}?image=${index}`);
}

function changeImage(direction, prefix) {
    const newIndex = currentIndex + (direction === 'up' ? -1 : 1);
    if (newIndex >= 0 && newIndex < imageCount) {
        currentIndex = newIndex;
        showImage(currentIndex, prefix);
    }
}

function handleMouseDown(event) {
    if (event.button === 0) {
        startY = event.clientY;
        isMouseDown = true;
    }
}

function handleMouseUp(event) {
    if (event.button === 0) {
        isMouseDown = false;
    }
}

function handleMouseMove(event) {
    if (isMouseDown) {
        const deltaY = event.clientY - startY;
        const direction = deltaY > 0 ? 'down' : 'up';
        const distance = Math.abs(deltaY);

        if (distance > sensitivity) {
            const prefix = getCurrentPrefix();
            changeImage(direction, prefix);
            startY = event.clientY;
        }
    }
}

function getCurrentPrefix() {
    const exteriorButton = document.getElementById('exterior-button');
    const groundFloorButton = document.getElementById('ground-floor-button');
    const firstFloorButton = document.getElementById('first-floor-button');

    if (exteriorButton.classList.contains('active')) {
        return 'cluster_r_';
    } else if (groundFloorButton.classList.contains('active')) {
        return 'cluster_g_';
    } else if (firstFloorButton.classList.contains('active')) {
        return 'cluster_1_';
    } else {
        // Default prefix if no button is active
        return 'cluster_r_';
    }
}

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('mousemove', handleMouseMove);

document.getElementById('exterior-button').addEventListener('click', function() {
    document.getElementById('exterior-button').classList.add('active');
    document.getElementById('ground-floor-button').classList.remove('active');
    document.getElementById('first-floor-button').classList.remove('active');
    currentIndex = 0; // Reset currentIndex when switching clusters
    showImage(currentIndex, 'cluster_r_');
});

document.getElementById('ground-floor-button').addEventListener('click', function() {
    document.getElementById('exterior-button').classList.remove('active');
    document.getElementById('ground-floor-button').classList.add('active');
    document.getElementById('first-floor-button').classList.remove('active');
    currentIndex = 0; // Reset currentIndex when switching clusters
    showImage(currentIndex, 'cluster_g_');
});

document.getElementById('first-floor-button').addEventListener('click', function() {
    document.getElementById('exterior-button').classList.remove('active');
    document.getElementById('ground-floor-button').classList.remove('active');
    document.getElementById('first-floor-button').classList.add('active');
    currentIndex = 0; // Reset currentIndex when switching clusters
    showImage(currentIndex, 'cluster_1_');
});


