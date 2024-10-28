import Drawing from "./drawingEntity";

class Pen extends Drawing {
    constructor(x, y, color, lineWidth, lineType) {
        super(color, lineWidth, lineType);
        this.points = [{ x, y }];
    }


    updateMinMaxPoint(x, y) {
        this.minumumPoint = {
            x: Math.min(this.minumumPoint.x, x),
            y: Math.min(this.minumumPoint.y, y)
        }

        this.maxPoint = {
            x: Math.max(this.maxPoint.x, x),
            y: Math.max(this.maxPoint.y, y)
        }
    }

    addNewPoint(x, y) {
        console.log("Adding new point:", { x, y });
        this.updateMinMaxPoint(x, y);
        this.points.push({ x, y });
    }

    draw(context) {
        if (this.points.length < 2) return; // Ensure there are at least 2 points

        context.beginPath();
        this.addStyleInContext(context); // Ensure this method exists in the parent class
        context.moveTo(this.points[0].x, this.points[0].y);
        this.points.forEach(({ x, y }) => {
            context.lineTo(x, y);
        });
        context.stroke();
    }

    checkBound(x, y) {
        return this.points.some(item =>
            item.x - 5 < x && item.x + 5 > x && item.y - 5 < y && item.y + 5 > y
        );
    }

    transform(x, y) {
        this.points.map(item => {
            item.y += y
            item.x += x
            this.updateMinMaxPoint(item.x, item.y);

        })

    }
}

export default Pen;
