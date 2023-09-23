javascript:(function() {
    let retryCount = 0;
    function mainLogic() {
        if (location.href.includes('youtube.com/watch?v=')) {
            const durationElement = document.querySelector('meta[itemprop=duration]');
            const liveElement = document.body.textContent.includes('Live');
            if (durationElement) {
                processDuration(durationElement);
                location='https://krikmo.github.io/black.html#url:'+encodeURIComponent(location.href)+'?|title:'+encodeURIComponent(document.title);
            } else if (liveElement) {
                document.title = `LIVE | ${document.title}`;
                location='https://krikmo.github.io/black.html#url:'+encodeURIComponent(location.href)+'?|title:'+encodeURIComponent(document.title);
            } else if (retryCount < 5) {
                retryCount++;
                setTimeout(mainLogic, 1000);
            }
        } else {
            location='https://krikmo.github.io/black.html#url:'+encodeURIComponent(location.href)+'?|title:'+encodeURIComponent(document.title);
        }
    }

    function processDuration(durationElement) {
        const duration = durationElement.getAttribute('content');
        let hours = 0, minutes = 0, seconds = 0;
        const hoursMatch = duration.match(/(\d+)H/);
        const minutesMatch = duration.match(/(\d+)M/);
        const secondsMatch = duration.match(/(\d+)S/);

        if (hoursMatch) hours = parseInt(hoursMatch[1], 10);
        if (minutesMatch) minutes = parseInt(minutesMatch[1], 10);
        if (secondsMatch) seconds = parseInt(secondsMatch[1], 10);

        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;

        let formattedDuration;
        if (hours > 0) {
            formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            formattedDuration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        if (formattedDuration !== '00:00') {
            document.title = `${formattedDuration} | ${document.title}`;
        }
    }

    mainLogic();
})();
