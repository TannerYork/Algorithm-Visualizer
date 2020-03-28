/***
 * Pathfinder Algorithms
 */

const removeFromArray = (array, elt) => {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] == elt) {
            array.splice(i, 1);
        }
    }
};

heuristic = (a, b) => {
    var distance = dist(a.gridCord.row, a.gridCord.column, b.gridCord.row, b.gridCord.column);
    // var distance =
    //     abs(a.gridCord.row - b.gridCord.row) + abs(a.gridCord.column - b.gridCord.column);
    return distance;
};

class Pathfinder {
    constructor(grid) {
        this.grid = grid;
        this.openSet = [];
        this.closedSet = [];
        this.path = [];
        this.lastLoop = false;
    }

    reset = () => {
        this.openSet = [];
        this.closedSet = [];
        this.path = [];
        this.lastLoop = false;
    };

    addStart = (i, j) => {
        for (let r = 0; r < this.grid.numRows; r++) {
            for (let c = 0; c < this.grid.numRows; c++) {
                let cell = this.grid.grid[r][c];
                const { x, y } = cell.canvasCord;
                const { width, height } = cell.size;
                if (i < x + width && i > x && j < y + height && j > y) {
                    this.openSet.push(cell);
                }
            }
        }
    };

    aStar = () => {
        const { grid, openSet, closedSet } = this;
        if (openSet.length > 0) {
            var lowest = 0;
            for (var i = 0; i < openSet.length; i++) {
                if (openSet[i].fScore < openSet[lowest].fScore) {
                    lowest = i;
                }
            }

            var current = openSet[lowest];

            if (current === grid.end || this.lastLoop) {
                if (this.lastLoop) noLoop();
                this.lastLoop = true;
            }

            removeFromArray(openSet, current);
            closedSet.push(current);
            current.isActive = true;

            var neighbors = current.neighbors;
            for (var i = 0; i < neighbors.length; i++) {
                var neighbor = neighbors[i];
                if (!closedSet.includes(neighbor) && !neighbor.isWall) {
                    var tentative_gScore = current.gScore + 1;

                    var newPath = false;
                    if (openSet.includes(neighbor)) {
                        if (tentative_gScore < neighbor.gScore) {
                            neighbor.gScore = tentative_gScore;
                            newPath = true;
                        }
                    } else {
                        newPath = true;
                        neighbor.gScore = tentative_gScore;
                        neighbor.isActive = true;
                        openSet.push(neighbor);
                    }
                    if (newPath) {
                        neighbor.h = heuristic(neighbor, grid.end);
                        neighbor.fScore = neighbor.gScore + neighbor.h;
                        neighbor.previous = current;
                    }
                }
            }

            if (current === grid.end) {
                this.path = [];
                var cell = current;
                this.path.push(cell);
                while (cell.previous) {
                    cell.previous.isBest = true;
                    this.path.push(cell.previous);
                    cell = cell.previous;
                }
            }
        } else {
            alert('No Solution');
            noLoop();
        }
    };
}
