// Main JavaScript for CDN demo page

document.addEventListener('DOMContentLoaded', function() {
    console.log('CDN JavaScript loaded successfully! 🚀');

    // Demo button functionality
    const demoBtn = document.getElementById('demoBtn');
    const demoResult = document.getElementById('demoResult');
    
    if (demoBtn && demoResult) {
        let clickCount = 0;
        
        demoBtn.addEventListener('click', function() {
            clickCount++;
            const messages = [
                '✨ CDN is working perfectly!',
                '🎉 JavaScript files are being served correctly!',
                '⚡ Fast and efficient delivery!',
                '💪 This is click number ' + clickCount + '!',
                '🚀 Keep clicking to see different messages!'
            ];
            
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            demoResult.textContent = randomMessage;
            
            // Add animation
            demoResult.style.opacity = '0';
            setTimeout(() => {
                demoResult.style.transition = 'opacity 0.5s ease';
                demoResult.style.opacity = '1';
            }, 50);
        });
    }

    // Log page load time
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    }

    // Test fetch API to demonstrate CORS
    console.log('Testing CDN file access...');
    fetch('/css/style.css')
        .then(response => {
            console.log('✅ CSS file accessible via fetch API');
            console.log('Response headers:', response.headers.get('content-type'));
        })
        .catch(error => {
            console.error('❌ Error accessing CSS file:', error);
        });
});
