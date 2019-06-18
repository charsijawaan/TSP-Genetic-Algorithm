// Declaring some variables to use later
var cities = [];
var firstPath = [];
var pop, avg;
var totalCities;
var interval, gen, genLimit;

// Getting canvas from html
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
c.font = "30px Arial";

// This function is called again and again till max generations are achieved
function runGA() {
    drawBest();
    pop.calculateFitness();
    pop.sortByFitness();
    pop.makeNextGeneration();
    console.log(pop.bestIndividual.d);
    gen++;
    if (gen >= genLimit) {
        clearInterval(interval);
        interval = null;
        window.alert('Optimal Path Found');
    }
}

// function to get values from HTML tags and then run the runGA function
function main(popSize, mutationRate, maxGen, numCities) {
    if (interval != null)
        return;

    // create a population object
    pop = new Population(popSize, mutationRate);
    genLimit = maxGen;
    totalCities = numCities;

    // Making random cities at random locations
    for (var i = 0; i < totalCities; i++) {
        cities[i] = new City(getRandom(350) + 30, getRandom(350) + 20);
        firstPath[i] = i;
    }
    // cities[totalCities] = cities[0];
    pop.createRandomPopulation(firstPath);
    gen = 0;
    // Alternate way of infinite loop
    // if we use infinite loop here browser hangs
    interval = setInterval(runGA, 0);
}

// function to draw on canvas
function drawBest() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.strokeStyle = "#1ce234";
    c.beginPath();
    for (var i = 0; i < totalCities; i++) {
        c.arc(cities[pop.bestIndividual.path[i]].x, cities[pop.bestIndividual.path[i]].y, 4, 0, 2 * Math.PI);
    }
    c.arc(cities[pop.bestIndividual.path[totalCities]].x, cities[pop.bestIndividual.path[totalCities]].y, 4, 0, 2 * Math.PI);
    c.stroke();
}