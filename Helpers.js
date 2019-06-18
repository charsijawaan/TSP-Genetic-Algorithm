// Calculate distance between points
function calculateDistance(path) {
    var a, b, c, distance = 0;
    for (var i = 0; i < totalCities - 1; i++) {
        x1 = cities[path[i]].x;
        x2 = cities[path[i + 1]].x;
        y1 = cities[path[i]].y;
        y2 = cities[path[i + 1]].y;
        a = x1 - x2;
        b = y1 - y2;
        c = Math.sqrt(a * a + b * b);
        distance = distance + c;
    }
    return distance;
}

// Shuffle the array to craete random population
function makeRandomPath(paths) {
    var i, j;
    for (var k = 0; k < totalCities; k++) {
        i = getRandom(paths.length);
        j = getRandom(paths.length);
        swap(paths, i, j);
    }
    paths[totalCities] = paths[0];
    return paths;
}

// Get a random value
function getRandom(max) {
    return Math.floor(Math.random() * max);
}

// Swap two values of array
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}