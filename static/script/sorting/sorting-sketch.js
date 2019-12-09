const winWidth = document.getElementById('sortingContainer').offsetWidth;
const winHeight = document.getElementById('sortingContainer').offsetHeight;
const sortingForm = document.getElementById('sorting-form');
const sortingAlgorithm = document.getElementById('sorting-algorithm');
const sortingLength = document.getElementById('sorting-length');

function setup() {
    canvas = createCanvas(winWidth, winHeight);
    shouldDraw = false;
    visualArray = new VisualArray(sortingLength.value);
    sorting = null;

    canvas.parent('sortingContainer');
    frameRate(100);

    sortingForm.addEventListener('submit', (event) => {
        event.preventDefault();
        visualArray = new VisualArray(sortingLength.value);
        sorting = new Sorting(visualArray.intArray);
        algorithm = sortingAlgorithm.value;
        shouldDraw = true;
    })
}

function draw() {
    if (shouldDraw) {
        background(255);
        visualArray.draw();
        visualArray.update();
        if (algorithm == 'bubble') {
            sorting.bubbleSort();
        }
    }
    visualArray.draw();
}

class Bar {
    constructor(value, height, width, x) {
        /** Creates an object thats used to render integers as rects */
        this.value = value;
        this.height = height;
        this.width = width;
        this.x = x;
    }
  
    draw() {
        /** Draws a rect with the x, width, and height of the bar */
        fill(105, 199, 211);
        rect(this.x, winHeight, this.width, -this.height);
    }
}

class VisualArray {
    constructor(arrayLength) {
        /**
         * Creates an object that can render an array onto the canvas
         *  Args:
         *      arrayLength (int): the lenght of the array 0..arrayLength
         *  Returns:
         *      VisualArray (object): An object capable of rendering an shuffled array on the canvas
         */
        this.intArray = shuffle(new Array(int(arrayLength)).fill(0).map((value, index) => index+1));
        this.barWidth = winWidth/this.intArray.length;
        this.barHeight = winHeight/this.intArray.length;
        this.barArray = this.createBarArray();
    }
  
    createBarArray() {
        /** Creates an array of bar objects from the VisualArray's intArray */
        var barArray = [];
        var x = 0;
        const maxValue = Math.max(...this.intArray);
        for (var i=0; i < this.intArray.length; i++) {
            const value = this.intArray[i];
            const height = ((winHeight-50)/maxValue)*value;
            barArray.push(new Bar(value, height, this.barWidth, x));
            x = x + this.barWidth;
        }
        return barArray;
    }

    draw() {
        /** Draws each bar in the barArray onto the canvas */
        this.barArray.forEach(bar => {
            bar.draw();
        })
    }
  
    update() {
        /** Updates the bars in bar array */
        this.barArray = this.createBarArray();
    }
}

/***
 * Sorting Algorythms
 */

class Sorting {
    constructor(intArray) {
        /**
         * Creates an object that sorts an array using various sorting algorithms
         *  Args:
         *      intArray (array): an array of integers
         *  Returns:
         *      Sorting (object): an object that can sort arrays using multiple different algorithms
         */
        this.array = intArray
        this.currentIndex = 0
    }
  
    bubbleSort() {
        /** Takes one step in the bubble sort algorithm */
        var just_set = false
        if (this.currentIndex+1 > this.array.length) {
            this.currentIndex = 0
            var just_set = true
        } else if (this.array[this.currentIndex] > this.array[this.currentIndex+1]) {
            const holder = this.array[this.currentIndex]
            this.array[this.currentIndex] = this.array[this.currentIndex+1]
            this.array[this.currentIndex+1] = holder
        }
        if (just_set == false){this.currentIndex += 1}
    }
}