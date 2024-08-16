javascript:(function () {
    let retryCount = 0;

    function mainLogic() {
        if (location.href.includes('youtube.com/watch?v=')) {
            const durationElement = document.querySelector('meta[itemprop=duration]');
            const liveChatElement = document.querySelector('#live-chat-iframe');
            const watchingNowElement = document.body.textContent.includes('watching now');

            if (getSelectedText()) {
                editTitle(getSelectedText());
            } else if (durationElement) {
                processDuration(durationElement);
            } else if (liveChatElement || watchingNowElement) {
                editTitle(`LIVE`);
            } else if (retryCount < 3) {
                retryCount++;
                setTimeout(mainLogic, 2000);
                return;
            } else if (retryCount >= 3) {
                editTitle(``);
            }
        } else if (location.href.endsWith('/live')) {
            if (getSelectedText()) {
                editTitle(getSelectedText());
            } else {
                editTitle(`LIVE`);
            }
        } else if (location.href.includes('/live/')) {
            const durationElement = document.querySelector('meta[itemprop=duration]');

            if (getSelectedText()) {
                editTitle(getSelectedText());
            } else if (durationElement) {
                processDuration(durationElement);
            } else {
                editTitle(`LIVE`);
            }
        } else {
            if (getSelectedText()) {
                editTitle(getSelectedText());
            } else {
                editTitle(``);
            }
        }
        redirect();
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

    function getSelectedText() {
        return window.getSelection().toString().trim();
    }

    mainLogic();
})();
