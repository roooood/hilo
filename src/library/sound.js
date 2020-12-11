
const Sound = {
    click: new Audio(require('assets/sound/click.mp3').default),
    win: new Audio(require('assets/sound/win.mp3').default),
    lose: new Audio(require('assets/sound/lose.mp3').default),
    message: new Audio(require('assets/sound/message.mp3').default),
    flip: new Audio(require('assets/sound/flip.mp3').default),
    betting: new Audio(require('assets/sound/betting.mp3').default),
}
let Vulume = true;
export default function play(key) {
    if (typeof key == "boolean") {
        Vulume = key;
    }
    else if (Vulume) {
        try {
            // Sound[key].play();
            const playedPromise = Sound[key].play();
            if (playedPromise) {
                playedPromise.catch((e) => {
                    if (e.name === 'NotAllowedError' ||
                        e.name === 'NotSupportedError') {
                        console.log(e.name);
                    }
                });
            }
        } catch (error) {

        }
    }
}
function playSound(url) {
    var audio = document.createElement('audio');
    audio.style.display = "none";
    audio.src = url;
    audio.autoplay = true;
    audio.onended = function () {
        audio.remove() //Remove when played.
    };
    document.body.appendChild(audio);
}