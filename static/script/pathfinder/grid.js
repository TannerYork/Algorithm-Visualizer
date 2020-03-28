class Cell {
    constructor(canvasCord, gridCord, size) {
        this.canvasCord = canvasCord; // (x, y)
        this.gridCord = gridCord; // (row, column)
        this.size = size; // (width, height)
        this.neighbors = [];
        this.previous = null;

        // A-star values
        this.fScore = 0;
        this.gScore = 0;
        this.h = 0; // Steps from algorithm starting point

        // Cell color
        this.isActive = false;
        this.isBest = false; // Indicates if the cell is part of the best path
        this.isStart = false;
        this.isEnd = false;
        this.isWall = false;

        if (random(1) < 0.2) {
            this.isWall = true;
        }
    }

    addNeighbors(grid) {
        const { row, column } = this.gridCord;
        if (row < grid.numColums - 1) {
            this.neighbors.push(grid.grid[row + 1][column]);
        }
        if (row > 0) {
            this.neighbors.push(grid.grid[row - 1][column]);
        }
        if (column < grid.numRows - 1) {
            this.neighbors.push(grid.grid[row][column + 1]);
        }
        if (column > 0) {
            this.neighbors.push(grid.grid[row][column - 1]);
        }
        if (row > 0 && column > 0) {
            this.neighbors.push(grid.grid[row - 1][column - 1]);
        }
        if (row < grid.numColums - 1 && column > 0) {
            this.neighbors.push(grid.grid[row + 1][column - 1]);
        }
        if (row > 0 && column < grid.numRows - 1) {
            this.neighbors.push(grid.grid[row - 1][column + 1]);
        }
        if (row < grid.numColums - 1 && column < grid.numRows - 1) {
            this.neighbors.push(grid.grid[row + 1][column + 1]);
        }
    }

    draw() {
        const { x, y } = this.canvasCord;
        const { width, height } = this.size;

        if (this.isStart) {
            fill(83, 144, 152);
        } else if (this.isEnd) {
            fill(255, 136, 136);
        } else if (this.isWall) {
            fill(113);
        } else if (this.isBest) {
            fill(105, 199, 211);
        } else if (this.isActive) {
            fill(105, 299, 187);
        } else {
            fill(255);
        }
        rect(x, y, width, height);
        fill(0);
        text(this.count, x + width / 2.5, y + height / 1.5);
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
        this.cellWidth = winWidth / size;
        this.cellHeight = winHeight / size;
        this.numColums = size;
        this.numRows = size;
        this.grid = [];
        this.start = null;
        this.end = null;
        this.x = 0;
        this.y = 0;
        this.count = 0;
        for (var r = 0; r < this.numRows; r++) {
            this.grid.push([]);
            for (var c = 0; c < this.numColums; c++) {
                this.grid[r].push(
                    new Cell(
                        { x: this.x, y: this.y },
                        { row: r, column: c },
                        { width: this.cellWidth, height: this.cellHeight }
                    )
                );
                this.count += 1;
                this.x += this.cellWidth;
            }
            this.x = 0;
            this.y += this.cellHeight;
        }

        // Add cell neighbors
        for (var r = 0; r < this.numRows; r++) {
            for (var c = 0; c < this.numColums; c++) {
                this.grid[r][c].addNeighbors(this);
            }
        }
    }

    draw() {
        for (var r = 0; r < this.numRows; r++) {
            for (var c = 0; c < this.numRows; c++) {
                this.grid[r][c].draw();
            }
        }
    }

    activateCellWall(i, j) {
        for (let r = 0; r < this.numRows; r++) {
            for (let c = 0; c < this.numRows; c++) {
                let cell = this.grid[r][c];
                const { x, y } = cell.canvasCord;
                const { width, height } = cell.size;

                if (i < x + width && i > x && j < y + height && j > y) {
                    cell.deactivate();
                    cell.isWall = true;
                    if (cell == this.start) this.start = null;
                    if (cell == this.end) this.end = null;
                }
            }
        }
    }

    activateCellStart(i, j) {
        for (let r = 0; r < this.numRows; r++) {
            for (let c = 0; c < this.numRows; c++) {
                let cell = this.grid[r][c];
                const { x, y } = cell.canvasCord;
                const { width, height } = cell.size;

                if (cell.isStart) {
                    cell.deactivate();
                }
                if (i < x + width && i > x && j < y + height && j > y) {
                    cell.deactivate();
                    cell.isStart = true;
                    this.start = cell;
                }
            }
        }
    }

    activateCellEnd(i, j) {
        for (let r = 0; r < this.numRows; r++) {
            for (let c = 0; c < this.numRows; c++) {
                let cell = this.grid[r][c];
                const { x, y } = cell.canvasCord;
                const { width, height } = cell.size;

                if (cell.isEnd) {
                    cell.deactivate();
                }
                if (i < x + width && i > x && j < y + height && j > y) {
                    cell.deactivate();
                    cell.isEnd = true;
                    this.end = cell;
                }
            }
        }
    }

    reset() {
        this.start = null;
        this.end = null;
        this.clearCells();
    }

    clearCell(i, j) {
        for (let r = 0; r < this.numRows; r++) {
            for (let c = 0; c < this.numRows; c++) {
                let cell = this.grid[r][c];
                const { x, y } = cell.canvasCord;
                const { width, height } = cell.size;

                if (i < x + width && i > x && j < y + height && j > y) {
                    cell.deactivate();
                }
            }
        }
    }

    clearCells() {
        loop();
        for (let r = 0; r < this.numRows; r++) {
            for (let c = 0; c < this.numRows; c++) {
                this.grid[r][c].deactivate();
            }
        }
    }

    clearBestPath() {
        for (let r = 0; r < this.numRows; r++) {
            for (let c = 0; c < this.numRows; c++) {
                this.grid[r][c].isBest = false;
            }
        }
    }
}
