javascript:(function () {
    let retryCount = 0;

    function mainLogic() {
        if (location.href.includes('youtube.com/watch?v=')) {
            const durationElement = document.querySelector('meta[itemprop=duration]');
            const liveChatElement = document.querySelector('#live-chat-iframe');
            const watchingNowElement = document.body.textContent.includes('watching now');

            if (durationElement) {
                processDuration(durationElement);
                redirect();
            } else if (liveChatElement || watchingNowElement) {
                editTitle(`LIVE`);
                redirect();
            } else if (retryCount < 3) {
                retryCount++;
                setTimeout(mainLogic, 2000);
            } else if (retryCount >= 3) {
                editTitle(``);
                redirect();
            }
        } else if (location.href.endsWith('/live')) {
            editTitle(`LIVE`);
            redirect();
        } else if (location.href.includes('/live/')) {
            const durationElement = document.querySelector('meta[itemprop=duration]');

            if (durationElement) {
                processDuration(durationElement);
                redirect();
            } else
            editTitle(`LIVE`);
            redirect();
        } else {
            editTitle(``);
            redirect();
        }
    }

    function processDuration(durationElement) {
        const duration = durationElement.getAttribute('content');
        let [hours, minutes, seconds] = [0, 0, 0];

        const parseTime = (pattern) => {
            const match = duration.match(pattern);
            return match ? parseInt(match[1], 10) : 0;
        };

        hours = parseTime(/(\d+)H/);
        minutes = parseTime(/(\d+)M/);
        seconds = parseTime(/(\d+)S/);

        minutes += Math.floor(seconds / 60);
        seconds %= 60;
        hours += Math.floor(minutes / 60);
        minutes %= 60;

        const formatTime = (time) => time.toString().padStart(2, '0');
        const formattedDuration = hours > 0 ?
            `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}` :
            `${formatTime(minutes)}:${formatTime(seconds)}`;

        if (formattedDuration !== '00:00') {
            editTitle(formattedDuration);
        } else {
          editTitle(`LIVE`);
          redirect();
        }
    }

    function editTitle(prefix) {
        document.title = document.title.replace(/^\(\d+\)\s*/, '');
        if (prefix) {
            document.title = `${prefix} | ${document.title}`;
        }
    }    

    function redirect() {
        location = `https://krikmo.github.io/black.html#url:${encodeURIComponent(location.href)}?|title:${encodeURIComponent(document.title)}`;
    }

    mainLogic();
})();
