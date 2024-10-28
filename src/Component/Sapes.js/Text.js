import Drawing from "./drawingEntity"; // Import the base Drawing class

class Text extends Drawing {
    constructor( text ,x, y,color, width , type , fontSize = 20, fontFamily = "Arial" ) {
        console.log(color);
        console.log("color" , color);
        
        super(color ,width ,type); // Set color using the parent class constructor
        this.position = { x, y }; // Position where the text will start
        this.text = text; // The actual text content
        this.fontSize = fontSize; // Font size for the text
        this.fontFamily = fontFamily; // Font family for the text
    }

    // Update the text's bounding box based on position and estimated dimensions
    updateMinMaxPoint() {
        const estimatedWidth = this.text.length * (this.fontSize * 0.6); // Estimate width based on font size and text length
        const estimatedHeight = this.fontSize; // Height roughly equals font size
        this.minumumPoint = { x: this.position.x, y: this.position.y - estimatedHeight };
        this.maxPoint = { x: this.position.x + estimatedWidth, y: this.position.y };
    }

    // Draw the text on the canvas
    draw(context) {
        this.addStyleInContext(context);
        context.font = `${this.fontSize}px ${this.fontFamily}`;
        context.fillStyle = this.BorderColor; // Set text color
        context.fillText(this.text, this.position.x, this.position.y); // Draw the text at the specified position
        context.stroke();
    }

    // Check if a point (x, y) is within the bounds of the text
    checkBound(x, y) {
        this.updateMinMaxPoint(); // Update bounds before checking
        return (
            x >= this.minumumPoint.x &&
            x <= this.maxPoint.x &&
            y >= this.minumumPoint.y &&
            y <= this.maxPoint.y
        );
    }

    addNewPoint(x, y) {
        this.position = { x, y };
        this.updateMinMaxPoint();
    }

    // Move the text by a specified offset (x, y)
    transform(x, y) {
        this.position.x += x;
        this.position.y += y;
        this.updateMinMaxPoint();
    }

    // Update the text content
    updateText(newText) {
        this.text = newText;
        this.updateMinMaxPoint(); // Recalculate bounds after updating text
    }
}

export default Text;
