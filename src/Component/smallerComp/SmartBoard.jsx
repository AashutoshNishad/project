import React, { useEffect, useRef } from 'react'
import "./smartBoard.css"
import Page from '../build/page';
import Pen from '../Sapes.js/pen';
import StaraightLine from '../Sapes.js/StaraitLine';
import Circle from '../Sapes.js/Circle';
import rectangle from '../Sapes.js/rectangle';
import Text from '../Sapes.js/Text';
export default function SmartBoard({ mode, setmode }) {

    const board = useRef(null);
    const lineStart = useRef({ x: 0, y: 0 })
    var isDrawable = useRef(false);
    const WorkBook = [];
    const currentPage = useRef(new Page())
    var selectedEntity = useRef([])
    var isDragabel = useRef(false)

    useEffect(() => {
        const smartBoard = board.current;
        const context = smartBoard.getContext('2d');
        smartBoard.width = 1000;
        smartBoard.height = 1000;
        smartBoard.style.height = "1000px"
        smartBoard.style.width = "1000px"


        const startDrawing = (e) => {
            isDrawable.current = true;
            lineStart.current = { x: e.offsetX, y: e.offsetY };

            switch (mode.mode) {
                case "pen":
                    currentPage.current.addElement(new Pen(e.offsetX, e.offsetY, mode?.propertice?.color || "black", mode?.propertice?.lineWidth || 3, mode?.propertice?.lineDahsed ? "dashed" : "normal"))
                    break;
                case "shape":
                    {
                        console.log("under the shape", mode);

                        switch (mode.data.value) {
                            case "line":
                                currentPage.current.addElement(new StaraightLine(e.offsetX, e.offsetY, mode?.propertice?.color || "black", mode?.propertice?.lineWidth || 3, mode?.propertice?.lineDahsed ? "dashed" : "normal"))
                                break;
                            case "circle":
                                currentPage.current.addElement(new Circle(e.offsetX, e.offsetY, mode?.propertice?.color || "black", mode?.propertice?.lineWidth || 3, mode?.propertice?.lineDahsed ? "dashed" : "normal"))
                                break;
                            case "rectangle":
                                currentPage.current.addElement(new rectangle(e.offsetX, e.offsetY, mode?.propertice?.color || "black", mode?.propertice?.lineWidth || 3, mode?.propertice?.lineDahsed ? "dashed" : "normal"))
                                break;

                            default:
                                isDrawable.current = false;

                                break;
                        }
                    }
                    break;
                case "Text-select":
                    currentPage.current.addElement(new Text(mode.text, e.offsetX, e.offsetY, mode?.propertice?.color || "black", mode?.propertice?.lineWidth || 3, mode?.propertice?.lineDahsed ? "dashed" : "normal"))
                    break;
                case "select_pointer":
                    isDrawable.current = false;
                    selectedEntity.current = currentPage.current.searchElementByPoint(e.offsetX, e.offsetY);
                    console.log(selectedEntity.current);
                    isDragabel.current = true;
                    break;
                default:
                    isDrawable.current = false;
                    break;
            }
        };

        const draw = (e) => {

            if (mode.mode === "select_pointer" && isDragabel.current) {
                selectedEntity.current?.forEach(item => {
                    item.transform(e.offsetX - lineStart.current.x, e.offsetY - lineStart.current.y);
                })
                currentPage.current.drawPage(context)
                lineStart.current = { x: e.offsetX, y: e.offsetY };
                // lineStart.current 
                // currentPage.current.drawPage(context);

            }

            if (!isDrawable.current) return;



            //         context.setLineDash(isDashedLine ? [5, 5] : []);
            context.beginPath();
            context.moveTo(lineStart.current.x, lineStart.current.y);
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();


            lineStart.current = { x: e.offsetX, y: e.offsetY };
            currentPage.current.addCurrentPoint(e.offsetX, e.offsetY);
            currentPage.current.drawPage(context);
        };

        const stopDraw = () => {
            isDrawable.current = false;
            isDragabel.current = false;

            //         isDragabel.current = false;
            //         // currentPage.current.addhistory()

        };

        //     // Event Listeners
        smartBoard.addEventListener('mousedown', startDrawing);
        smartBoard.addEventListener('mousemove', draw);
        smartBoard.addEventListener('mouseup', stopDraw);
        smartBoard.addEventListener('mouseleave', stopDraw);

        return () => {
            smartBoard.removeEventListener('mousedown', startDrawing);
            smartBoard.removeEventListener('mousemove', draw);
            smartBoard.removeEventListener('mouseup', stopDraw);
            smartBoard.removeEventListener('mouseleave', stopDraw);
        };
    }, [mode, isDrawable]);



    useEffect(() => { currentPage.current.drawPage(board.current.getContext("2d")) }, [mode])

    return (
        <div id='smart-board'>
            <canvas id='canvas-board' ref={board} />
        </div>
    )
}
