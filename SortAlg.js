function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
    }


var slider = document.getElementById("myRange");
let array = [];
let parent = document.getElementById("arrayCont")
let sliderParent = document.getElementById("sliderCont")
document.querySelector('.sliderVal').innerHTML = slider.value;

let time = Math.ceil(500/slider.value)

let stopwatch = document.querySelector('.timerVal');
let timeoutId = null;
let ms = 0;
let sec = 0;
let min = 0;
let isSorting = false;

let quickSortRunning = false;

let cancel = false;


reset();


for (let i = 0; i < slider.value; i++ ) {
    array.push(Math.floor((Math.random() * 400) + 4));
}

for (let i = 0; i < slider.value; i++){
    let bar = document.createElement("div");
    bar.className = "bars";
    bar.style.height = (array[i] * 100 / 400) + '%';
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
document.getElementById('bogo').addEventListener("click", () => {
    bogoSort(array)
});
document.getElementById("stop").addEventListener("click", () => {
    cancelSort();
});




function randomize(){
    array = [];
    reset();
    console.log(slider.value)
    let parent = document.getElementById("arrayCont")
    parent.innerHTML = '';
    document.querySelector('.sliderVal').innerHTML = slider.value;
    


    for (let i = 0; i < slider.value; i++ ) {
        array.push(Math.floor((Math.random() * 400) + 4));
    }

    for (let i = 0; i < slider.value; i++){
        let bar = document.createElement("div");
        bar.className = "bars";
   
        bar.style.height = (array[i] * 100 / 400) + '%';
        parent.appendChild(bar);
    }

    left = 0
    right = array.length - 1

    console.log(array)
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
            await sleep(time);
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
                await sleep(time)
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
        await sleep(time)
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
        bar[i].style.height = Math.floor((array[i] * 100 / 400)) + '%';
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
        await sleep(time)
        updateDisplay(array)

        if (left < index - 1) { //more elements on the left side of the pivot
            highlight([index], 'red')

            await sleep(time)
            await quickSort(array, left, index - 1);


        }
        if (index < right) { //more elements on the right side of the pivot
            highlight([index], 'red')

            await sleep(time)
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