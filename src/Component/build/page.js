import Pen from "../Sapes.js/pen";

class Page {
    constructor() {
        this.height = 1000;
        this.width = 1000;
        this.color = "white";
        this.elements = [];
        this.history = []; // Stores the history for undo functionality
    }

    
    addElement(entity) {
        this.elements.push(entity);
        this.history.push([...this.elements]); // Save the state for undo
    }


    addhistory(){
        this.history.push([...this.elements]); // Save the state for undo
    }

    removeEntity(entity) {
        // Find the index of the entity to remove
        const index = this.elements.indexOf(entity);
        if (index !== -1) {
            // Remove the entity from the array
            this.elements.splice(index, 1);
            this.history.push([...this.elements])
        } else {
            console.warn("Entity not found in the page elements.");
        }
    }

    addCurrentPoint(x, y) {
        if (this.elements.length) {
            const currentElement = this.elements[this.elements.length - 1];
            console.log("Adding point to Pen: ", { x, y });
            currentElement.addNewPoint(x, y);
        } else {
            console.warn("No elements in the page.");
        }
    }


    clearPage(){

        if(this.elements.length > 0){
            this.history.push([...this.elements])
        }
        this.elements = []
        
    }

    undo() {
        if (this.history.length > 1) {
            this.history.pop();
            this.elements = [...this.history[this.history.length - 1]];
        } else {
            this.elements = []; // Clear elements if no history is available
        }
    }


    drawPage(context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear previous drawings
        this.elements.forEach((item) => {
            item.draw(context);
        });
    }


    searchElementByPoint(x, y) {
        return this.elements.filter(item => item.checkBound(x, y));
    }
}

export default Page;
