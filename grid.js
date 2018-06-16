const grid = [];

const imageLookup = {
    player: '@',
    wall: '|',
    berry: 'o',
    enemy: 'e',
};

const init = (player, enemy) => {
    for (let i = 0; i < 10; i++) {
        grid.push([]);
        for (let j = 0; j < 10; j++) {
            grid[i].push(null);
        }
    }

    grid[player.y][player.x] = player;
    grid[enemy.y][enemy.x] = enemy;
    grid[0][0] = { type: 'wall', solid: true };
    grid[3][0] = { type: 'berry' };
};

const move = (thing, newX, newY, isRelative = false) => {
    let x = newX;
    let y = newY;

    if (isRelative) {
        x += thing.x;
        y += thing.y;
    }

    const canX = Math.min(Math.max(0, x), grid.length - 1);
    const canY = Math.min(Math.max(0, y), grid[0].length - 1);

    //if (x === thing.x && y === thing.y) return false;
    if (canX !== x || canY !== y) return false;

    doMove(thing, x, y, isRelative);

    return true;
};

const doMove = (thing, x, y, isRelative) => {
    const stuffThere = grid[y][x];
    if (stuffThere && (stuffThere.solid || stuffThere.enemy)) return;

    /*
    const leftBehind = grid[thing.y][thing.x];

    if (leftBehind.length) {
        const index = leftBehind.indexOf(thing);
        if (leftBehind.length === 2) {
            grid[thing.y][thing.x] = leftBehind[1 - index];
        } else {
            grid[thing.y][thing.x].splice(index, 1);
        }
    } else {
        grid[thing.y][thing.x] = null;
    }*/

    remove(thing);

    if (stuffThere) {
        if (stuffThere.length) {
            stuffThere.push(thing);
        } else {
            grid[y][x] = [stuffThere, thing];
        }
    } else {
        grid[y][x] = thing;
    }

    thing.x = x;
    thing.y = y;
};

const remove = (thing) => {
    const stuffThere = grid[thing.y][thing.x];
    if (!stuffThere) console.error('there\'s nothing to remove there');

    if (!stuffThere.length) {
        grid[thing.y][thing.x] = null;
    } else {
        const index = stuffThere.indexOf(thing);

        if (stuffThere.length === 2) {
            grid[thing.y][thing.x] = stuffThere[1 - index];
        } else {
            stuffThere.splice(index, 1);
        }
    }
}

const gridElement = document.getElementById('grid');

const draw = () => {
    gridElement.innerHTML = '';

     for (var i = 0; i < 10; i++) {
        const row = document.createElement('div');
        for (var j = 0; j < 10; j++) {
            const element = document.createElement('div');
            const thing = grid[i][j];
            element.innerText = getImage(thing);
            row.appendChild(element);
        }
        gridElement.appendChild(row);
    }
};

const getImage = (things) => {
    let image;

    if (!things) {
        image = ' ';
    } else if (things.length) {
        
    } else {
        image = imageLookup[things.type];
    }

    if (image === undefined) image = '%';

    return image;
};

const index = (x, y) =>{
    return grid[y][x];
}

export default {
    init,
    draw,
    move,
    index,
    remove,
};
