const winWidth = document.getElementById('pathfinderContainer').offsetWidth;
const winHeight = document.getElementById('pathfinderContainer').offsetHeight;
const pathForm = document.getElementById('pathfinder-form');
const pathStartButton = document.getElementById('pathfinder-start');
const pathClearButton = document.getElementById('pathfinder-clear');
const pathAlgorithm = document.getElementById('pathfinder-algorithm');
const pathOptions = document.getElementById('pathfinder-options');

function setup() {
    grid = new Grid(30);
    canvas = createCanvas(winWidth, winHeight);
    hasStarted = false
    canvas.parent('pathfinderContainer');

    pathForm.addEventListener('submit', (event) => {
        event.preventDefault();
        pathStartButton.classList.toggle('nav-button-active')
        if (hasStarted) {
            pathStartButton.innerText = 'Start'
            hasStarted = false;
        } else {
            pathStartButton.innerText = 'Stop'
            hasStarted = true;
        }
    });

    pathClearButton.addEventListener('click', (event) => {
        event.preventDefault()
        grid.clearCells()
    })

}

function draw() {
    background(255);
    grid.draw();
}

function mouseClicked() {
    if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0 && hasStarted == false) {
        if (pathOptions.value == 'start') {
            grid.activateCellStart(mouseX, mouseY);
        } else if (pathOptions.value == 'end') {
            grid.activateCellEnd(mouseX, mouseY);
        } else if (pathOptions.value == 'wall') {
            grid.activateCellWall(mouseX, mouseY);
        } else if (pathOptions.value == 'clear') {
            grid.clearCell(mouseX, mouseY)
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

class Cell {
    constructor(x, y, width, height) {
        this.isActive = false; 
        this.isBest = false; // Indicates if the cell is part of the best path
        this.isStart = false;
        this.isEnd = false;
        this.isWall = false; 
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        if (this.isStart) {
            fill(90, 150, 120);
            rect(this.x, this.y, this.width, this.height);
        } else if (this.isEnd) {
            fill(150, 90, 120);
            rect(this.x, this.y, this.width, this.height);
        } else if (this.isWall) {
            fill(50);
            rect(this.x, this.y, this.width, this.height);
        } else if (this.isBest) {
            fill(105, 199, 211);
            rect(this.x, this.y, this.width, this.height);
        } else if (this.isActive) {
            fill(105, 299, 187);
            rect(this.x, this.y, this.width, this.height);
        } else {
            fill(255);
            rect(this.x, this.y, this.width, this.height);
        }
    }

    deactivate() {
        this.isActive = false; 
        this.isBest = false;
        this.isWall = false;
        this.isStart = false;
        this.isEnd = false;
    }
}

class Grid {
    constructor(size) {
        /**
         * Creates an object that renders a grid onto the canvas
         *  Args:
         *      arrayLength (int): the lenght of the array 0..arrayLength
         *  Returns:
         *      Grid (object): An object capable of rendering an shuffled array on the canvas
         */
        this.cellWidth = winWidth/size;
        this.cellHeight = winHeight/size;
        this.numColums = size;
        this.numRows = size;
        this.grid = [];
        this.x = 0;
        this.y = 0;

        for (var r=0; r<this.numRows; r++) {
            this.grid.push([]);
        }

        for (var r=0; r<this.numRows; r++) {
            for (var c=0; c<this.numColums; c++) {
                this.grid[r].push(new Cell(this.x, this.y, this.cellWidth, this.cellHeight));
                this.x += this.cellWidth;
            }
            this.x = 0;
            this.y += this.cellHeight;
        }
    }

    draw() {
        for (var r=0; r<this.numRows; r++) {
            for (var c=0; c<this.numRows; c++) {
                this.grid[r][c].draw();
            }
        }
    }

    activateCellWall(x, y) {
        for (var r=0; r<this.numRows; r++) {
            for (var c=0; c<this.numRows; c++) {
                var cell = this.grid[r][c]
                if (x < cell.x+cell.height && x > cell.x &&
                     y <cell.y+cell.width && y > cell.y) {
                    cell.deactivate()
                    cell.isWall = true
                }
            }
        }
    }

    activateCellStart(x, y) {
        for (var r=0; r<this.numRows; r++) {
            for (var c=0; c<this.numRows; c++) {
                var cell = this.grid[r][c]
                if (cell.isStart) { cell.deactivate() }
                if (x < cell.x+cell.height && x > cell.x &&
                     y <cell.y+cell.width && y > cell.y) {
                    cell.deactivate()
                    cell.isStart = true
                }
            }
        }
    }

    activateCellEnd(x, y) {
        for (var r=0; r<this.numRows; r++) {
            for (var c=0; c<this.numRows; c++) {
                var cell = this.grid[r][c]
                if (cell.isEnd) { cell.deactivate() }
                if (x < cell.x+cell.height && x > cell.x &&
                     y <cell.y+cell.width && y > cell.y) {
                    cell.deactivate()
                    cell.isEnd = true
                }
            }
        }
    }

    clearCell(x, y) {
        for (var r=0; r<this.numRows; r++) {
            for (var c=0; c<this.numRows; c++) {
                var cell = this.grid[r][c]
                if (x < cell.x+cell.height && x > cell.x &&
                     y <cell.y+cell.width && y > cell.y) {
                    cell.deactivate()
                }
            }
        }
    }

    clearCells() {
        for (var r=0; r<this.numRows; r++) {
            for (var c=0; c<this.numRows; c++) {
                this.grid[r][c].deactivate()
            }
        }
    }
}