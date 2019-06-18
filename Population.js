// Population Class
class Population {

    /**
     * popSize is the size of population given by user in the HTML page
     * and same goes for the mutationRate
     */
    constructor(popSize, mutationRate) {
        this.popSize = popSize;
        this.individual = [];
        this.bestIndividual;
        this.mutationRate = mutationRate;
    }


    /**
     * This function creates individuals according 
     * to the size of population and path of every individual is generated 
     * randomly using a method named  makeRandomPath() in helpers.js
     */
    createRandomPopulation(firstPath) {
        for (var i = 0; i < this.popSize; i++) {
            this.individual[i] = new Individual(makeRandomPath(firstPath.slice()));
        }
        // Considering the first inidividual as the best just to initialize it :-)
        this.bestIndividual = this.individual[0];
    }


    /**
     * This function calls the calculateFitness() of Individual and
     * it runs for every individual of the population and fitness of each individual is
     * stored in its own object not in this class.
     */
    calculateFitness() {
        for (var i = 0; i < this.individual.length; i++) {
            this.individual[i].calculateFitness();
        }
    }

    /**
     * Individuals that are the most fittest in this population comes
     * in the start of the array. This is done to help us later in the 
     * selection stage. We used bubble sort. we know it sucks but our goal was
     * to show the working of genetic algorithm. Later we can upgrade this to quicksort
     */
    sortByFitness() {
        for (var i = 0; i < this.individual.length; i++) {
            for (var j = 0; j < this.individual.length - i - 1; j++) {
                if (this.individual[j].fitness < this.individual[j + 1].fitness) {
                    swap(this.individual, j, j + 1);
                }
            }
        }

        // If a more fit individual is found then replace it with the previous one
        if (this.individual[0].fitness > this.bestIndividual.fitness) {
            this.bestIndividual = this.individual[0];
        }
    }

    /**
     * This function is the most important part of over script
     * selection, crossover and mutation is done here.
     * First we choose the top 50% (fittest) individuals from this population
     * For Example if population size is 100 then top 50. 
     * Then crossover is applied 2 times on these selected individuals so that
     * the new individuals again are equal to original population size.
     */
    makeNextGeneration() {
        // selection part
        var selectedIndividuals = this.selection();
        // crossing over selected individuals for first time
        // let's call them leftHalf
        var leftHalf = this.crossOver(selectedIndividuals);
        // crossing over selected individuals for second time
        // let's call them rightHalf
        var rightHalf = this.crossOver(selectedIndividuals);

        // An array for combining the above two arrays
        var newIndividuals = [];

        // Combining the arrays into one array named newIndividuals
        for (var i = 0; i < leftHalf.length; i++) {
            newIndividuals.push(leftHalf[i]);
            newIndividuals.push(rightHalf[i]);
        }
        // mutating some the individuals according to the mutation rate
        for (var i = 0; i < (this.popSize * this.mutationRate) / 100; i++) {
            this.mutation(newIndividuals);
        }
        // assigning the new individuals to the individuals of the this
        // population object
        this.individual = newIndividuals;
    }

    // method to select the top 50% fittest of the total population
    selection() {
        var selectedIndividuals = [];
        for (var i = 0; i < this.individual.length / 2; i++) {
            selectedIndividuals[i] = this.individual[i];
        }
        return selectedIndividuals;
    }

    // selecting a random individual to mutate
    mutation(newIndividuals) {
        var i = Math.floor((Math.random() * newIndividuals.length - 1) + 1);
        var mutant = newIndividuals[i];
        this.randomizePath(mutant.path);
    }

    /**
     * We have done mutation on the selected individuals by swaping
     * half of the elements of array randomly. 
     */
    randomizePath(path) {
        var i, j;
        for (var l = 0; l < this.individual[0].path.length / 2; l++) {
            i = getRandom(path.length);
            j = getRandom(path.length);
            swap(path, i, j);
        }
    }

    /**
     * This is the method where crossover happens. It looks complex but it's not you just need to be
     * a genius to understand it's simplicity.
     * 1st individual (that is selected from this population after the selection method is called) is crossed
     * with the last one adn the 2nd one with the 2nd last one and so on.
     * 
     * CROSSOVER TECHNIQUE:
     * 1st individual is cut randomly (excluding first and last element) and stored in a new individual (child)
     * Now the elements which are missing from 1st individual are choose from the 2nd individual but remember
     * in order. Now two parents have produced one child. This is the reason that crossover is done two times
     * to maintain the population size
     */
    crossOver(selectedIndividuals) {
        // Just some declarations :-)
        var childs = [];
        var individualOne, individualTwo;
        var start, end;

        for (var i = 0, j = selectedIndividuals.length - 1; i < selectedIndividuals.length; i++, j--) {
            // getting first and last then second and second last and so on that's why this
            // loop seems weird
            individualOne = selectedIndividuals[i];
            individualTwo = selectedIndividuals[j];

            // preparing to cut the first individual
            // remember to exclude the 1st and last element 
            start = Math.floor(Math.random() * (selectedIndividuals[i].path.length - 1) + 1);
            end = Math.floor(Math.random() * ((selectedIndividuals[i].path.length - 1) - (start + 1)) + (start + 1));
            childs[i] = new Individual(individualOne.path.slice(start, end));
            // unshift method adds element at the start of array
            childs[i].path.unshift(selectedIndividuals[i].path[0]);

            // remaining elements are stored in the child 
            for (var k = 0; k < individualTwo.path.length; k++) {
                if (!childs[i].path.includes(individualTwo.path[k])) {
                    childs[i].path.push(individualTwo.path[k]);
                }
            }
            // push method adds element at the end
            childs[i].path.push(childs[i].path[0]);
        }
        return childs;
    }
}