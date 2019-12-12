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