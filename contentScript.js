addTitleChangeListener(onTitleChange)

function addTitleChangeListener(onTitleChange) {
    let lastTitle = ''

    const interval = setInterval(() => {
        const titleElement = document.querySelector('.middle-controls .content-info-wrapper .title')
        const title = titleElement.innerText

        if (title && lastTitle !== title) {
            lastTitle = title
            onTitleChange(title)
        }
    }, 5000)

    return () => clearInterval(interval)
}

function onTitleChange(title) {
    const img = document.querySelector('.middle-controls img')
    const imgSrc = img.getAttribute('src')

    const subtitleElement = document.querySelector('.middle-controls .content-info-wrapper .subtitle')
    const subtitle = subtitleElement.innerText
    const subtitleParts = subtitle
        .split('•')
        .map(s => s.replaceAll('\n', ''))
        .map(s => s.trim())
        .join('\n')

    showNotification(title, {
        icon: imgSrc,
        body: subtitleParts
    })

}

async function showNotification(title, options) {
    if (Notification.permission === 'default') {
        await Notification.requestPermission()
    }
    if (Notification.permission === 'granted') {
        new Notification(title, options)
    }
}

function toDataURL(url, callback) {
    const img = new Image();

    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        const dataURL = canvas.toDataURL("image/png");
        callback(dataURL);
    };

    img.src = url;
}
