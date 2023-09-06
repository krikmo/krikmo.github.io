javascript:(function(){ 
    if (location.href.includes('youtube.com/watch?v=')) {
        var durationElement = document.querySelector('meta[itemprop=duration]');
        
        if (durationElement) {
            var duration = durationElement.getAttribute('content');
            var hoursMatch = duration.match(/(\d+)H/);
            var minutesMatch = duration.match(/(\d+)M/);
            var secondsMatch = duration.match(/(\d+)S/);

            var hours = 0;
            var minutes = 0;
            var seconds = 0;

            if (hoursMatch) hours = parseInt(hoursMatch[1], 10);
            if (minutesMatch) minutes = parseInt(minutesMatch[1], 10);
            if (secondsMatch) seconds = parseInt(secondsMatch[1], 10);

            hours += Math.floor(minutes / 60);
            minutes = minutes % 60;

            var formattedDuration;

            if (hours > 0) {
                formattedDuration = hours.toString().padStart(2, '0') + ':' +
                                    minutes.toString().padStart(2, '0') + ':' +
                                    seconds.toString().padStart(2, '0');
            } else {
                formattedDuration = minutes.toString().padStart(2, '0') + ':' +
                                    seconds.toString().padStart(2, '0');
            }

            if (formattedDuration !== '00:00') {
                document.title = formattedDuration + ' | ' + document.title; 
            }
        }
    }
    location='https://krikmo.github.io/black.html#url:'+encodeURIComponent(location.href)+'?|title:'+encodeURIComponent(document.title)    ;
})();
