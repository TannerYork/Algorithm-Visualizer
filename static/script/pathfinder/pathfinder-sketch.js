const winWidth = document.getElementById('pathfinderContainer').offsetWidth;
const winHeight = document.getElementById('pathfinderContainer').offsetHeight;
const pathForm = document.getElementById('pathfinder-form');
const pathStartButton = document.getElementById('pathfinder-start');
const pathClearButton = document.getElementById('pathfinder-clear');
const pathAlgorithm = document.getElementById('pathfinder-algorithm');
const pathOptions = document.getElementById('pathfinder-options');

function setup() {
    grid = new Grid(30);
    pathfinder = new Pathfinder(grid);
    canvas = createCanvas(winWidth, winHeight);
    hasStarted = false;
    canvas.parent('pathfinderContainer');

    pathForm.addEventListener('submit', event => {
        event.preventDefault();
        pathStartButton.classList.toggle('nav-button-active');
        if (hasStarted) {
            pathStartButton.innerText = 'Start';
            hasStarted = false;
        } else {
            pathStartButton.innerText = 'Stop';
            hasStarted = true;
        }
    });

    pathClearButton.addEventListener('click', event => {
        event.preventDefault();
        grid.reset();
        pathfinder.reset();
    });
}

function draw() {
    background(255);
    grid.draw();

    if (hasStarted && grid.start && grid.end) {
        pathfinder.aStar();
    }
}

function mouseClicked() {
    if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0 && hasStarted == false) {
        if (pathOptions.value == 'start') {
            grid.activateCellStart(mouseX, mouseY);
            pathfinder.addStart(mouseX, mouseY);
        } else if (pathOptions.value == 'end') {
            grid.activateCellEnd(mouseX, mouseY);
        } else if (pathOptions.value == 'wall') {
            grid.activateCellWall(mouseX, mouseY);
        } else if (pathOptions.value == 'clear') {
            grid.clearCell(mouseX, mouseY);
        }
    }
}

function mouseDragged() {
    if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0 && hasStarted == false) {
        if (pathOptions.value == 'wall') {
            grid.activateCellWall(mouseX, mouseY);
        } else if (pathOptions.value == 'clear') {
            grid.clearCell(mouseX, mouseY);
        }
    }
}
