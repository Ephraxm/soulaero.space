let counter = 0; let Title = 'Ephraxm | IG'; let direction = true;
aniTitle = setInterval(function () {
    if (counter == Title.length) direction = false;
    if (counter == false) direction = true;
    counter = (direction == true) ? ++counter : --counter;
    newtitle = (counter == 0) ? "" : Title.slice(0, counter);
    document.title = '@' + newtitle;
}, 400)

function disableImageDragging() {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
        img.setAttribute('draggable', 'false');
        img.draggable = false;
    });
}

document.addEventListener('dragstart', function (event) {
    const target = event.target;
    if (target instanceof HTMLImageElement) {
        event.preventDefault();
    }
}, true);

document.addEventListener('DOMContentLoaded', function () {
    disableImageDragging();

    const observer = new MutationObserver(function () {
        disableImageDragging();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
