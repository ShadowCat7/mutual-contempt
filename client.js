import grid from './grid.js';

(() => {
    const keycodeText = document.getElementById('keycode');
    const messageText = document.getElementById('messagetext');

    const player = {
        x: 3,
        y: 4,
        type: 'player',
    };

    const enemy = {
        x: 5,
        y: 6,
        type: 'enemy',
        enemy: true,
    };

    const init = () => {
        grid.init(player, enemy);
    }

    init();
    grid.draw();

    const showMessage = (message) => {
        const thingHere = document.createElement('p');
        thingHere.innerText = message;
        messageText.insertBefore(thingHere, messageText.firstElementChild);

        while (messageText.childElementCount > 20) {
            messageText.lastElementChild.remove();
        }
    };

    let updateLock = false;

    const update = (e) => {
        updateLock = true;
        keycodeText.innerText = e.keyCode;

        let didMove = false;

        if (e.keyCode === 37) {
            didMove = grid.move(player, -1, 0, true); // left
        } else if (e.keyCode === 38) {
            didMove = grid.move(player, 0, -1, true); // up
        } else if (e.keyCode === 39) {
            didMove = grid.move(player, 1, 0, true); // right
        } else if (e.keyCode === 40) {
            didMove = grid.move(player, 0, 1, true); // down
        }

        //num key 1 is 97
        if (e.keyCode >= 97 && e.keyCode <= 105) {
            let x, y;
            x = (e.keyCode + 2) % 3 - 1;
            y = 33 - Math.floor((e.keyCode - 1) / 3);

            didMove = grid.move(player, x, y, true);
        }

        if (e.keyCode === 188) { // , (comma)
            grid.pickup(player);
        }

        if (didMove) {
            const stuffWithPlayer = grid.index(player.x, player.y);
            if (stuffWithPlayer.length) {
                for (let i = 0; i < stuffWithPlayer.length; i++) {
                    let thing = stuffWithPlayer[i];

                    if (thing.type !== 'player') {
                        showMessage(`There is a ${thing.type} here`);
                    }
                }

            }
        }

        grid.draw();
        updateLock = false;
    };

    document.addEventListener('keydown', update);

    const tabs = document.getElementsByClassName('tab');
    const contents = document.getElementsByClassName('content');

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.width = tabs[i].offsetWidth + 2;
    }

    document.getElementById('tabs').addEventListener('click', e => {
        if (event.target.classList.contains('tab')) {
            let index = 0;

            for (let i = 0; i < tabs.length; i++) {
                tabs[i].className = 'tab';
                contents[i].className = 'content';

                if (tabs[i] === event.target) index = i;
            }

            event.target.className += ' active';
            contents[index].className += ' active';
        };
    });
})();
