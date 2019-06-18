class Individual {

    /**
     * A single Individual object holds the path to travel through
     * fitness of this path and the total distance of this path
     */
    constructor(path) {
        this.path = path;
        this.fitness = 0;
        this.d = 0;
    }

    // Fitness function
    calculateFitness() {
        // calculateDistance() method is in Helper.js just a simple
        // distance formula sqrt( (x1 - x2)^2 + (y1 - y2)^2 ) 
        var d = calculateDistance(this.path);
        this.d = d;
        // taking inverse because greater the distance lesser the fitness and vice versa
        this.fitness = 1 / d;
    }

    setPath(path) {
        this.path = path;
    }
}