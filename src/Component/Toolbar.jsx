import React, { useEffect, useRef, useState } from 'react';
import logo from './pencil.png';
import page from './build/page';
import pen from './Sapes.js/pen';
import rectangle from './Sapes.js/rectangle';
import Circle from './Sapes.js/Circle';
import StaraightLine from './Sapes.js/StaraitLine';
import SHapeOption from './smallerComp/SHapeOption';
import "./Toolbar.css"
export default function Toolbar() {
    const textColor = "white";
    const Page = new page();
    const board = useRef(null);
    const [mode, setMode] = useState('pen');
    const currentPage = useRef(Page);
    const lineStart = useRef({ x: 0, y: 0 });
    const colorRef = useRef(null);
    const isDrawable = useRef(false);
    const [isDashedLine, setDashedLine] = useState(false);
    const [lineWidth, setLineWidth] = useState(3);
    const selectedEntity = useRef(null);
    // const [selectedEntity, setselectedEntity] = useState([])
    const [lineType, setLineType] = useState("normal");
    const [lineColor, setLineColor] = useState("#000000");
    const [featureDropDown, setFeatureDropDown] = useState({});
    const isDragabel = useRef(false)
    // const selectedEntity = useRef();
    // Initialize Canvas and Setup Drawing
    // useEffect(() => {
    //     const smartBoard = board.current;
    //     const context = smartBoard.getContext('2d');
    //     smartBoard.width = 1000;
    //     smartBoard.height = 1000;

    //     const startDrawing = (e) => {
    //         isDrawable.current = true;
    //         context.strokeStyle = colorRef.current.value;
    //         context.lineWidth = lineWidth;
    //         lineStart.current = { x: e.offsetX, y: e.offsetY };

    //         let element;
    //         switch (mode) {
    //             case "pen":
    //                 element = new pen(e.offsetX, e.offsetY, lineColor, lineWidth, lineType);
    //                 break;
    //             case "rectangle":
    //                 element = new rectangle(e.offsetX, e.offsetY, lineColor, lineWidth, lineType);
    //                 break;
    //             case "circle":
    //                 element = new Circle(e.offsetX, e.offsetY, lineColor, lineWidth, lineType);
    //                 break;
    //             case "staightLine":
    //                 element = new StaraightLine(e.offsetX, e.offsetY, lineColor, lineWidth, lineType);
    //                 break;
    //             case "select_pointer":
    //                 var entity = currentPage.current.searchElementByPoint(e.offsetX, e.offsetY);
    //                 isDrawable.current = false;
    //                 selectedEntity.current = entity;
    //                 console.log(selectedEntity.current);
    //                 isDragabel.current = true;
    //                 // Page.drawPage(context);
    //                 break;
    //             default:
    //                 break;
    //         }

    //         if (element) {
    //             currentPage.current.addElement(element);
    //         }
    //     };

    //     const draw = (e) => {

    //         if (mode === "select_pointer" && isDragabel.current) {
    //             selectedEntity.current?.forEach(item => {
    //                 item.transform(e.offsetX - lineStart.current.x, e.offsetY - lineStart.current.y);
    //             })
    //             currentPage.current.drawPage(context)
    //             lineStart.current = { x: e.offsetX, y: e.offsetY };
    //             // lineStart.current 
    //         }

    //         if (!isDrawable.current) return;


    //         context.setLineDash(isDashedLine ? [5, 5] : []);
    //         context.beginPath();
    //         context.moveTo(lineStart.current.x, lineStart.current.y);
    //         context.lineTo(e.offsetX, e.offsetY);
    //         context.stroke();
    //         lineStart.current = { x: e.offsetX, y: e.offsetY };
    //         currentPage.current.addCurrentPoint(e.offsetX, e.offsetY);
    //         currentPage.current.drawPage(context);
    //     };

    //     const stopDraw = () => {
    //         isDrawable.current = false;
    //         isDragabel.current = false;
    //         // currentPage.current.addhistory()

    //     };

    //     // Event Listeners
    //     smartBoard.addEventListener('mousedown', startDrawing);
    //     smartBoard.addEventListener('mousemove', draw);
    //     smartBoard.addEventListener('mouseup', stopDraw);
    //     smartBoard.addEventListener('mouseleave', stopDraw);

    //     return () => {
    //         smartBoard.removeEventListener('mousedown', startDrawing);
    //         smartBoard.removeEventListener('mousemove', draw);
    //         smartBoard.removeEventListener('mouseup', stopDraw);
    //         smartBoard.removeEventListener('mouseleave', stopDraw);
    //     };
    // }, [isDashedLine, mode, lineWidth, lineColor, lineType]);

    // useEffect(() => {
    //     currentPage.current.drawPage(board.current.getContext("2d"));
    //     if (mode === "select_pointer") {
    //         board.current.style.cursor = "pointer"
    //     }
    //     else {
    //         board.current.style.cursor = ""

    //     }
    // }, [mode, lineColor, lineType, lineWidth, selectedEntity]);

    // const options = [
    //     { label: "File", function: () => { } },
    //     { label: "Edit", function: () => { } },
    //     { label: "View", function: () => { } },
    //     { label: "Arrange", function: () => { } },
    //     { label: "Help", function: () => { } },
    // ];

    // window.addEventListener("keydown", (e) => {
    //     console.log(e);

    // })
    const features = [
        { name: "Shapes", onClick: () => { setMode("rectangle") }, Children: <SHapeOption mode={mode} setMode={setMode} /> },
        { name: "Insert", onClick: () => { setMode("circle") }, Children: <></> },
        { name: "Export", onClick: () => { }, Children: <></> },
        { name: "Record", onClick: () => { }, Children: <></> },
    ];

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: textColor }}>
            {/* Top Toolbar */}

            <div id='document-hedaer'>

                <div id='document-hedaer-left'>
                    <div id='header-logo' className='hoverEffect'>
                        Ashu
                    </div>

                    <div className='vertical-devider' />
                    <div id='header-fileName' className='hoverEffect' >
                        Untitel Document
                    </div>
                    <div>
                        <div id='dot3-icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                            <ul id='dropdown-options'>
                                <li>File</li>
                                <li>Export</li>
                                <li>Import</li>
                                <li>Copy Document</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id='document-hedaer-right'>

                    <div id='video-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" />
                        </svg>
                    </div>
                    <button id='shere-button'>
                        Shere
                    </button>
                </div>
            </div>


         
         

         
            {/* Sidebar and Canvas Container */}
            {/* <div style={{ display: "flex", height: "calc(100vh - 160px)" }}> */}
              

                {/* Canvas Area
                <div style={{ flex: 1, overflow: "auto", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
                    <div style={{ paddingTop: "100px", paddingBottom: "100px", height: "1200px" }}>
                        <canvas
                            ref={board}
                            style={{ height: "1000px", width: "1000px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}
                        />
                    </div>
                </div> */}
            {/* </div> */}
        </div>
    );
}
