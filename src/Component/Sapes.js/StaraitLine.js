const drawing = require("./drawingEntity");

class StaraightLine extends drawing {
    startingPoint = {};
    endpoints = {}
    constructor(x, y, color, lineWidth, lineType) {
        super(color, lineWidth, lineType)
        this.startingPoint = { x, y }
        this.endpoints = { x, y };
    }


    addNewPoint(x, y) {
        this.endpoints = { x, y };

        this.updateMinMaxPoint();
    }


    draw(context) {

        this.addStyleInContext(context)
        context.beginPath();
        context.moveTo(this.startingPoint.x, this.startingPoint.y)
        context.lineTo(this.endpoints.x, this.endpoints.y)
        // context.rect(this.startingPoint.x, this.startingPoint.y, this.width, this.heigh);
        context.stroke();
    }

    checkBound(x, y) {
        if (x >= this.startingPoint.x - 5 && x <= this.endpoints.x + 5 && y >= this.startingPoint.y - 5 && y <= this.endpoints.y + 5) {
            return true;
        }
        return false;
    }

    scale(x, y) {
        this.width *= x
        this.heigh *= y
        this.updateMinMaxPoint();
    }

    updateMinMaxPoint(x, y) {
        this.minumumPoint = this.startingPoint
        // this.maxPoint = { x: this.startingPoint + this.width, y: this.startingPoint.y + this.heigh }
    }

    transform(x, y) {
        this.startingPoint.x += x
        this.startingPoint.y += y
        this.updateMinMaxPoint();
    }
}

module.exports = StaraightLine;