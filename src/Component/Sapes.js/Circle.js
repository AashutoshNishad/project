import Drawing from "./drawingEntity"; // Importing the base Drawing class

class Circle extends Drawing {
    constructor(x, y, color, linewidth, linetype) {
        super(color, linewidth, linetype); // Call the parent constructor (if necessary, can also pass color and lineWidth)
        this.center = { x, y }; // Center point of the circle
        this.radius = 0; // Initialize radius to zero
    }

    updateMinMaxPoint(){

        this.minumumPoint = {x: this.center.x - this.radius , y: this.center.y - this.radius}
        this.maxPoint = {x: this.center.x + this.radius , y: this.center.y - this.radius}
    }
    // Update the radius based on the current mouse position
    addNewPoint(x, y) {
        // Calculate the distance from the center to the new point
        this.radius = Math.sqrt((x - this.center.x) ** 2 + (y - this.center.y) ** 2);
        this.updateMinMaxPoint()
    }

    // Draw the circle on the canvas
    draw(context) {
        this.addStyleInContext(context)
        context.beginPath();
        context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2); // Create circle shape
        context.stroke(); // Outline the circle
        context.closePath(); // Close the path
    }

    checkBound(x, y) {
        var distance_from_center = Math.sqrt((x - this.center.x) ** 2 + (y - this.center.y) ** 2);
        return this.radius >= distance_from_center;
    }

    transform(x, y) {
        this.center.x += x;
        this.center.y += y;
        this.updateMinMaxPoint()
    }
}

export default Circle;
