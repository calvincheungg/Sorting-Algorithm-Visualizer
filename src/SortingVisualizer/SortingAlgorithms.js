// MERGE SORT

export function mergeSort(array) {
    const animations = [];
    // base case if the array only contains 1 number
    if (array.length <= 1) {
        return array;
    }
    const helperArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, helperArray, animations);
    return animations;
}

function mergeSortHelper(array, startIndex, endIndex, helperArray, animations) {
    if (startIndex === endIndex) {
        return;
    }
    const middleIndex = Math.floor((startIndex + endIndex) /2);
    mergeSortHelper(helperArray, startIndex, middleIndex, array, animations);
    mergeSortHelper(helperArray, middleIndex + 1, endIndex, array, animations);
    merge(array, startIndex, middleIndex, endIndex, helperArray, animations);
}

function merge(array, startIndex, middleIndex, endIndex, helperArray, animations) {
    let x = startIndex;
    let y = startIndex;
    let z = middleIndex + 1;

    while (y <= middleIndex && z <= endIndex) {
        animations.push([y, z]);
        animations.push([y, z]);
        if (helperArray[y] <= helperArray[z]) {
            animations.push([x, helperArray[y]]);
            array[x++] = helperArray[y++];
        }
        else {
            animations.push([x, helperArray[z]]);
            array[x++] = helperArray[z++];
        }
    }
    while (y <= middleIndex) {
        animations.push([y, y]);
        animations.push([y, y]);
        animations.push([x, helperArray[y]]);
        array[x++] = helperArray[y++];
    }
    while (z <= endIndex) {
        animations.push([z, z]);
        animations.push([z, z]);
        animations.push([x, helperArray[z]]);
        array[x++] = helperArray[z++];
    }
}
