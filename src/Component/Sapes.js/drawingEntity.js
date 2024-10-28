class drawing {
    BorderColor = "black"
    lineType = "normal"
    lineWidth = 2
    id = "comp_" + Date.now();
    startPoint = { x: 0, y: 0 }

    selected = false;
    // static selectedDrawings = [];
    minumumPoint = {x: 0 , y: 0}
    maxPoint = {x: 1000 , y: 1000}

    constructor(color = "black", lineWidth = 2, lineType = "normal") {
        this.BorderColor = color
        this.lineType = lineType
        this.lineWidth = lineWidth
    }

    setBorderColor(color) {
        this.BorderColor = color;
    }

    setLineType(type) {
        this.lineType = type;
    }
    setLineWIdth(width) {
        this.lineWidth = width;
    }

    setSelected(value) {
        this.selected = value;
    }



    addStyleInContext(context) {
        context.strokeStyle = this.selected ? "red" : this.BorderColor;
        context.lineWidth = this.lineWidth;
        context.setLineDash(this.lineType === 'dashed' ? [this.lineWidth, 2*this.lineWidth] : []);

    }

}

module.exports = drawing;