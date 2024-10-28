import React, { Children, useState } from 'react';
import "./feature.css";

export default function FeatureBox({ mode, setmode }) {
    const [selectedFeature, setSelectedFeature] = useState(null);


    // Your features array goes here...
    var features = [{
        name: "select_pointer", label: "Select Element", icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-move" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8" />
        </svg>)
    }
        , {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
        </svg>),
        name: "pen",
        label: "Free Hand Drawing",
        SubChiled: [{
            name: "highlighter",
            label: "Highlited Pen",
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-highlighter" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11.096.644a2 2 0 0 1 2.791.036l1.433 1.433a2 2 0 0 1 .035 2.791l-.413.435-8.07 8.995a.5.5 0 0 1-.372.166h-3a.5.5 0 0 1-.234-.058l-.412.412A.5.5 0 0 1 2.5 15h-2a.5.5 0 0 1-.354-.854l1.412-1.412A.5.5 0 0 1 1.5 12.5v-3a.5.5 0 0 1 .166-.372l8.995-8.07zm-.115 1.47L2.727 9.52l3.753 3.753 7.406-8.254zm3.585 2.17.064-.068a1 1 0 0 0-.017-1.396L13.18 1.387a1 1 0 0 0-1.396-.018l-.068.065zM5.293 13.5 2.5 10.707v1.586L3.707 13.5z" />
            </svg>)
        }]
    }, {
        name: "highlighter",
        label: "Highlited Pen",
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-highlighter" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.096.644a2 2 0 0 1 2.791.036l1.433 1.433a2 2 0 0 1 .035 2.791l-.413.435-8.07 8.995a.5.5 0 0 1-.372.166h-3a.5.5 0 0 1-.234-.058l-.412.412A.5.5 0 0 1 2.5 15h-2a.5.5 0 0 1-.354-.854l1.412-1.412A.5.5 0 0 1 1.5 12.5v-3a.5.5 0 0 1 .166-.372l8.995-8.07zm-.115 1.47L2.727 9.52l3.753 3.753 7.406-8.254zm3.585 2.17.064-.068a1 1 0 0 0-.017-1.396L13.18 1.387a1 1 0 0 0-1.396-.018l-.068.065zM5.293 13.5 2.5 10.707v1.586L3.707 13.5z" />
        </svg>)
    }, {
        name: "color-select",
        label: "Select Color",
        icon: <input type='color' value={mode?.propertice?.color || "#000000"} onChange={(e) => { setmode({ ...mode, propertice: { ...mode.propertice, color: e.target.value } }) }} id='color-selecct-div' />

    }, {
        name: "lineWIdht-select",
        label: "Border Width",
        icon: <div id='borderWIdth-selecct-div' >
            <div style={{
                // border: "black solid 2px",
                backgroundColor: "black",
                width: `${(mode?.propertice?.lineWidth * 10 || 3)}%`,
                height: `${(mode?.propertice?.lineWidth * 10 || 3)}%`,
                borderRadius: "50%"
            }}>

            </div>
        </div>,
        onClick: () => {
            // setmode({mode: })
        },
        Children: [{
            name: "range",
            label: "select range",
            icon: <>
                <input min={1} max={10} type='range' onChange={(e) => {

                    setmode({ ...mode, propertice: { ...mode.propertice, lineWidth: e.target.value } })
                    console.log("linewWIdth", e.target.value);

                }} value={mode?.propertice?.lineWidth || 3} />
            </>
        }]
    },
    {
        name: "lineType-select",
        label: "Line Type",
        icon: <div id='LineType-selecct-div' style={mode?.propertice?.lineDahsed ? { borderColor: "red" } : {}}>
        </div>,
        clickFunc: () => {
            setmode({ ...mode, propertice: { ...mode.propertice, lineDahsed: !mode?.propertice?.lineDahsed } })
        }
    }, {
        name: "Text-select",
        label: "Text Insert",
        icon: <div id='Text-selecct-div'  >
            T
        </div>,
        clickFunc: () => {
            var y = prompt("Enter a text for entry.");
            if (y) {
                setmode({ ...mode , mode: "Text-select", text: y })
                console.log(mode);
                
            }
        }

    }, {
        name: "shape",
        label: "Shape",
        icon: <div id='borderWIdth-selecct-div'>
        </div>,
        Children: [{
            name: "line", label: "Line", icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" id="line">
                <path fill="#444" d="M0 7h16v1H0V7z"></path>
            </svg>)
        }, {
            name: "circle", label: "Circle", icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            </svg>)
        }, {
            name: "rectangle", label: "rectangle", icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            </svg>)
        }, {
            name: "pentagan",
            label: "Pentagan",
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pentagon" viewBox="0 0 16 16">
                <path d="M7.685 1.545a.5.5 0 0 1 .63 0l6.263 5.088a.5.5 0 0 1 .161.539l-2.362 7.479a.5.5 0 0 1-.476.349H4.099a.5.5 0 0 1-.476-.35L1.26 7.173a.5.5 0 0 1 .161-.54l6.263-5.087Zm8.213 5.28a.5.5 0 0 0-.162-.54L8.316.257a.5.5 0 0 0-.631 0L.264 6.286a.5.5 0 0 0-.162.538l2.788 8.827a.5.5 0 0 0 .476.349h9.268a.5.5 0 0 0 .476-.35l2.788-8.826Z" />
            </svg>)
        }]
    },
    ]
    return (
        <div id='feature-div'>
            {features.map((item, key) => {
                return (

                    <div key={key} className='feature-icon-wrapper' >
                        <div className='feature-icon-div' style={item.name === mode.mode ? { color: "red" } : {}} onClick={() => {
                            if (!item.Children)
                                setmode({ ...mode, mode: item.name })

                            if (item?.clickFunc)
                                item?.clickFunc();
                        }}>
                            {item.icon}


                            {item.Children && <div className='feature-childre-div'>
                                <div className='box-childe-div-feature'>
                                    {item.Children?.map(element => {
                                        return <div className='subchild-icon-div' style={mode.data?.value === element.name ? {
                                            color: "red"
                                        } : {}} onClick={() => {
                                            console.log("clickrd", element.name);
                                            setmode({ ...mode, mode: item.name, data: { value: element.name }, })
                                            console.log(mode, element);

                                        }}> {element.icon} </div>
                                    })}
                                </div>
                            </div>}
                        </div>

                    </div>
                );
            })}
            <div>

            </div>
        </div>
    );
}
