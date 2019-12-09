const winWidth = document.getElementById('pathfinderContainer').offsetWidth;
const winHeight = document.getElementById('pathfinderContainer').offsetHeight;
const pathForm = document.getElementById('pathfinder-form');
const pathAlgorithm = document.getElementById('pathfinder-algorithm');
const pathOptions = document.getElementById('pathfinder-options');

function setup() {
    shouldDraw = true;
    grid = new Grid(30);
    canvas = createCanvas(winWidth, winHeight);
    canvas.parent('pathfinderContainer');

    pathForm.addEventListener('submit', (event) => {
        event.preventDefault();
        shouldDraw = true;
    })
}

function draw() {
    background(255);
    grid.draw();
}

class Cell {
    constructor(x, y, width, height) {
        this.isActive = false; 
        this.isBest = false; // Indicates if the cell is part of the best path
        this.isWall = false; 
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        if (this.isWall) {
            fill(50);
            rect(this.x, this.y, this.width, this.height);
        } else if (this.isBest) {
            fill(105, 199, 211);
            rect(this.x, this.y, this.width, this.height);
        } else if (this.isActive) {
            fill(73, 80, 87);
            rect(this.x, this.y, this.width, this.height);
        } else {
            fill(255);
            rect(this.x, this.y, this.width, this.height);
        }
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
        print(winHeight, size)
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
}