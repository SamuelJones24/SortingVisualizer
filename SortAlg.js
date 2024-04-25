function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
    }


var slider = document.getElementById("myRange");
let array = [];
let parent = document.getElementById("arrayCont")
let sliderParent = document.getElementById("sliderCont")
document.querySelector('.sliderVal').innerHTML = slider.value;
let stepOnBool = false;
let time = Math.ceil(500/slider.value)
let StepOnEl = document.getElementById('StepOn')
let StepEl = document.getElementById('Step')
let stopwatch = document.querySelector('.timerVal');
let timeoutId = null;
let ms = 0;
let sec = 0;
let min = 0;
let isSorting = false;

let quickSortRunning = false;
let cancel = false;



reset();


// for (let i = 0; i < slider.value; i++ ) {
//     array.push(Math.floor((Math.random() * 400) + 4));
// }


for (let i = 0; i < slider.value; i++ ) {
    array.push(i + 1);
}
shuffle(array)


for (let i = 0; i < slider.value; i++){
    let bar = document.createElement("div");
    bar.className = "bars";
    bar.style.height = (array[i]) + '%';
    parent.appendChild(bar);
}

let left = 0
let right = array.length - 1

document.getElementById('random').addEventListener("click", () => {
    randomize()
});
document.getElementById('myRange').addEventListener("input", () => {
    randomize()
});
document.getElementById('bubble').addEventListener("click", () => {
    bubbleSort(array)
});
document.getElementById('insertion').addEventListener("click", () => {
    insertionSort(array)
});
document.getElementById('quick').addEventListener("click", () => {
    quickSort(array, left, right)
});
// document.getElementById('bogo').addEventListener("click", () => {
//     bogoSort(array)
// });
document.getElementById('merge').addEventListener("click", () => {
    reset();
    timer();
    mergeSort(array, left, right)
    pause();
});
document.getElementById('radix').addEventListener("click", () => {
    radixSort(array)
});
document.getElementById("stop").addEventListener("click", () => {
    cancelSort();
});
document.getElementById("StepOn").addEventListener("click", () =>{
    stepOn();
})


function stepOn(){
    if (stepOnBool === false) {
        StepOnEl.style.backgroundColor = "goldenrod";
        StepOnEl.style.color = "black";
        StepEl.style.display = "block";
        stepOnBool = true
        console.log("First Section runs")
    }
    else {
        StepOnEl.style.backgroundColor = "#222";
        StepOnEl.style.color = "rgb(77, 102, 100)";
        StepEl.style.display = "none";
        stepOnBool = false
        console.log("Second Section Runs")

    }

}


function randomize(){
    array = [];
    reset();
    let parent = document.getElementById("arrayCont")
    parent.innerHTML = '';
    document.querySelector('.sliderVal').innerHTML = slider.value;
    


    for (let i = 0; i < slider.value; i++ ) {
        array.push(i + 1);
    }
    shuffle(array)

    for (let i = 0; i < slider.value; i++){
        let bar = document.createElement("div");
        bar.className = "bars";
   
        bar.style.height = ((array[i]) * 100 / slider.value) + '%';
        parent.appendChild(bar);
    }

    left = 0
    right = array.length - 1

}


async function bubbleSort(array){
    console.log(cancel)
    if (isSorting){
        return;
    }
    isSorting = true;
    reset();
    timer();
    time = Math.ceil(500/slider.value)

    let swapped;
    for (let i = 0; i < slider.value; i++) {
        swapped = false;
        for (let j = 0; j < slider.value - i - 1; j++) {
            highlight([j, j+1], 'red')
            if (stepOnBool){
                await new Promise((resolve) => {
                    StepEl.onclick = () =>{
                    resolve();
                    };
                });
            } else {
                await sleep(time);
            }
            
            if (cancel && isSorting){
                // highlight([j, j+1], 'rgb(77, 102, 100)')
                cancel = false;
                isSorting = false;
                pause();
                return;
            }
            
            if (array[j] > array[j + 1]) { 
                swap(array, j, j+1)
                swapped = true;
                updateDisplay(array)
            }
            highlight([j, j+1], 'rgb(77, 102, 100)');
        }
        if (swapped == false){
            break;
        }

    }
    isSorting = false;
    pause();


}



async function insertionSort(array) {
        if (isSorting){
            return;
        }
        isSorting = true;
        reset();
        timer();
        time = Math.ceil(500/slider.value)
        for (let i = 1; i < slider.value; i++) {
            // Choosing the first element in our unsorted subarray
            let current = array[i];
            // The last element of our sorted subarray
            let j = i-1; 
            while ((j > -1) && (current < array[j])) {
                highlight([j, j+1], 'red')
                if (stepOnBool){
                    await new Promise((resolve) => {
                        StepEl.onclick = () =>{
                        resolve();
                        };
                    });
                } else {
                    await sleep(time);
                }
                array[j+1] = array[j];
                updateDisplay(array)
                if (cancel && isSorting){
                    // highlight([j, j+1], 'rgb(77, 102, 100)');
                    cancel = false;
                    isSorting = false;
                    pause();
                    return;
                }
                highlight([j, j+1], 'rgb(77, 102, 100')
                j--;

        

            }
            array[j+1] = current;
        }
        updateDisplay(array)
        isSorting = false;
        pause();
}

async function bogoSort(array){
    if (isSorting){
        return;
    }
    isSorting = true;
    reset();
    timer();
    let i = 0
    let j = 0
    time = Math.ceil(50/slider.value)
    while (!isSorted(array)){
        i = Math.floor(Math.random() * slider.value)
        j = Math.floor(Math.random() * slider.value)
        if (cancel && isSorting){
            // highlight([i, j], 'rgb(77, 102, 100)')
            cancel = false;
            isSorting = false;
            pause();
            return;
        }

        highlight([i, j], 'red')
        if (stepOnBool){
            await new Promise((resolve) => {
                StepEl.onclick = () =>{
                resolve();
                };
            });
        } else {
            await sleep(time);
        }
        array = shuffle(array)
        updateDisplay(array)
        highlight([i, j], 'rgb(77, 102, 100')

        
    }
    isSorting = false;
    pause();
}




function shuffle(array) {
    for (let i = slider.value - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      if (i < array.length && j < array.length) {
        [array[i], array[j]] = [array[j], array[i]];
      }
  
      highlight([i, j], 'rgb(77, 102, 100')
    }
    return array;
  }
function highlight(indices, color){
    let bars = document.querySelectorAll('.bars');
    indices.forEach(i => {
        if (bars[i]) {
            bars[i].style.backgroundColor = color;
        }
    });
}





function updateDisplay(array){
    let bar = document.querySelectorAll('.bars');

    for (let i = 0; i < slider.value; i++){
        bar[i].style.height = Math.floor((array[i]) * 100 / slider.value) + '%';
    }
}


function isSorted(array){
    for(var i = 1; i < slider.value; i++) {
        if (array[i] < array[i-1])
            return false;
    }
    return true;
}

function timer(){

    timeoutId = setTimeout(function() {
        ms = parseInt(ms);
        sec = parseInt(sec);
        min = parseInt(min);

        ms++;

        if (ms == 100){
            sec += 1;
            ms = 0;
        }
        if (sec == 60){
            min += 1;
            sec = 0;
        }
        if (ms < 10){
            ms = '0' + ms;
        }
        if (sec < 10){
            sec = '0' + sec;
        }
        if (min < 10){
            min = '0' + min;
        }
        stopwatch.innerHTML = min + ':' + sec + ":" + ms + ' s';
        timer();
    }, 10);
}

function pause() {
    clearTimeout(timeoutId);
}

function reset() {
    ms = 0;
    sec = 0;
    min = 0;
    clearTimeout(timeoutId);
    stopwatch.innerHTML = "00:00:00 s";
}

function swap(array, a, b){
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

function partition(array, left, right) {

    var pivot = array[Math.floor((right + left) / 2)], //middle element
        i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        if (cancel){
            // highlight([i, j], 'rgb(77, 102, 100)')
            cancel = false;
            isSorting = false;
            pause();
            return;
        }

        while (array[i] < pivot) {
            if (cancel){
                // highlight([i, j], 'rgb(77, 102, 100)')
                cancel = false;
                isSorting = false;
                pause();
                return;
            }
            i++;

        }
        while (array[j] > pivot) {
            if (cancel){
                // highlight([i, j], 'rgb(77, 102, 100)')
                cancel = false;
                isSorting = false;
                pause();
                return;
            }
            j--;
        }
        if (i <= j) {
            if (cancel){
                // highlight([i, j], 'rgb(77, 102, 100)')
                cancel = false;
                isSorting = false;
                pause();
                return;
            }
            swap(array, i, j); //swap two elements
            i++;
            j--;
        }
    }
    return i;
}

async function quickSort(array, left, right) {
    reset();
    timer();

    var index;

    if (array.length > 1) {


        index = partition(array, left, right); //index returned from partition
        await sleep(time);
        updateDisplay(array)

        if (left < index - 1) { //more elements on the left side of the pivot
            highlight([index], 'red')

            if (stepOnBool){
                await new Promise((resolve) => {
                    StepEl.onclick = () =>{
                    resolve();
                    };
                });
            } else {
                await sleep(time);
            }
            await quickSort(array, left, index - 1);


        }
        if (index < right) { //more elements on the right side of the pivot
            highlight([index], 'red')

            if (stepOnBool){
                await new Promise((resolve) => {
                    StepEl.onclick = () =>{
                    resolve();
                    };
                });
            } else {
                await sleep(time);
            }
            await quickSort(array, index, right);


        }
    }
    highlight([index], 'red')

    updateDisplay(array)

    await sleep(time)
    highlight([index], 'rgb(77, 102, 100)')
    pause();


    return array;
    
}

function cancelSort() {
    // if (isSorting){
    //     cancel = true;
    // }
    cancel = true
}

function merge(array, start, mid, end){
    let n1 = mid - start + 1
    let n2 = end - mid

    let L = new Array(n1);
    let R = new Array(n2)

    for (let i = 0; i < n1; i++){
        L[i] = array[start + i]
    }
    for (let i = 0; i < n1; i++){
        R[i] = array[mid + 1 + i]
    }

    let i = 0;
    let j = 0;
    let k = start;

    while (i < n1 && j < n2){
        if (L[i] <= R[j]){
            array[k] = L[i];
            i++
        }
        else{
            array[k] = R[j];
            j++
        }
        k++
    }
    while (i < n1){
        array[k] = L[i];
        i++;
        k++;
    }
    while (j < n2){
        array[k] = R[j];
        j++;
        k++;
    }
    updateDisplay(array)
    highlight([...Array(end - start + 1).keys()].map(i => i + start), 'red');
    setTimeout(() => {
        highlight([...Array(end - start + 1).keys()].map(i => i + start), 'rgb(77, 102, 100)');
    }, time * slider.value * 5);
    return array;
}

function printArray( array)
{
    for (var i = 0; i < array.length; i++)
       console.log(array[i] + " ");
}


async function mergeSort(array, start, end){
    if (start >= end) {
        return array;
    }
    let mid = Math.floor((start + end) / 2);
    highlight([...Array(end - start + 1).keys()].map(i => i + start), 'rgb(77, 102, 100)');
    await sleep(time)
    await mergeSort(array, start, mid)
    await sleep(time)
    await mergeSort(array, mid + 1, end)
    await sleep(time)
    highlight([...Array(end - start + 1).keys()].map(i => i + start), 'rgb(77, 102, 100)');


    return merge(array, start, mid, end)

}
function getDigit(num, place){
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

function digitCount(num) {
    if (num === 0 ){
        return 1
    }
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function getMaxDigitCount(array){
    let maxDigits = 0;
    for (let num of array){
        maxDigits = Math.max(maxDigits, digitCount(num));
    }
    return maxDigits;
}

async function radixSort(array){
    if (isSorting){
        return;
    }
    isSorting = true;
    reset();
    timer();
    const maxDigitCounts = getMaxDigitCount(array);
    for (let i = 0; i < maxDigitCounts; i++){
        let digitBucket = Array.from({length: 10}, () => []);
        highlight(Array.from({ length: array.length }, (_, index) => index), 'rgb(77, 102, 100)');

        for (let j = 0; j < array.length; j++){
            let digit = getDigit(array[j], i)
            digitBucket[digit].push(array[j]);
            await sleep(time * time)
            highlight([j], 'red');
            updateDisplay(array)
        }

        array = [].concat(...digitBucket);
        highlight(Array.from({ length: array.length }, (_, index) => index), 'rgb(77, 102, 100)');

        updateDisplay(array)

    }
    isSorting = false;
    pause();
    return array;

}