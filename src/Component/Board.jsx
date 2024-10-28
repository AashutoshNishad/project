import React, { useEffect, useRef, useState } from 'react';
import './board.css';

export default function Board() {
  const board = useRef(null);
  const [mode, setMode] = useState('pen');
  const DrawingEntities = useRef([]); // Array to hold all drawing entities
  const lineStart = useRef({ x: 0, y: 0 });
  const colorRef = useRef(null);
  const isDrawable = useRef(false);
  const [isDashedLine, setDashedLine] = useState(false);
  const [lineWidth, setLineWidth] = useState(1); // Default line width
  const selectedEntity = useRef(null); // Store the selected entity

  const pointToLineDistance = (px, py, x1, y1, x2, y2) => {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    const param = len_sq !== 0 ? dot / len_sq : -1;

    let xx, yy;
    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }

    const dx = px - xx;
    const dy = py - yy;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const isPointNearLineSegment = (px, py, p1, p2) => {
    const distance = pointToLineDistance(px, py, p1.x, p1.y, p2.x, p2.y);
    return distance < 5;
  };

  const redrawCanvas = () => {
    const smartBoard = board.current;
    const context = smartBoard.getContext('2d');
    context.clearRect(0, 0, smartBoard.width, smartBoard.height);
    DrawingEntities.current.forEach(entity => {
      // console.log("widhth", entity);

      context.strokeStyle = entity.properties.color;
      context.lineWidth = entity.properties.line.width;
      context.setLineDash(entity.properties.line.type === 'dashed' ? [5, 5] : []);
      context.beginPath();

      if (entity.type === "pen") {
        context.moveTo(entity.startPoints.x, entity.startPoints.y);
        entity.points.forEach(point => {
          context.lineTo(point.x, point.y);
        });
        context.stroke();
      } else if (entity.type === "rectangle") {
        context.rect(entity.startPoints.x, entity.startPoints.y, entity.width, entity.height);
        context.stroke();
      }
    });
  };

  const searchEntityByPoint = (x, y) => {
    let foundEntity = null;
    selectedEntity.current = [];
    DrawingEntities.current.forEach(item => {
      if (item.type === "pen") {
        for (let i = 0; i < item.points.length - 1; i++) {
          const p1 = item.points[i];
          const p2 = item.points[i + 1];
          if (isPointNearLineSegment(x, y, p1, p2)) {
            foundEntity = item;
            break;
          }
        }
      } else if (item.type === "rectangle") {
        if (x >= item.startPoints.x && x <= item.startPoints.x + item.width && y >= item.startPoints.y && y <= item.startPoints.y + item.height) {
          foundEntity = item;
        }
      }
    });

    return foundEntity;
  };

  const assignPenDrawEntity = (ctx) => {
    const newId = 'pen_' + Date.now();
    const entity = {
      _id: newId,
      type: "pen",
      properties: {
        color: ctx.strokeStyle,
        line: {
          type: isDashedLine ? 'dashed' : 'normal',
          width: ctx.lineWidth,
        },
      },
      startPoints: { x: lineStart.current.x, y: lineStart.current.y },
      points: [{ x: lineStart.current.x, y: lineStart.current.y }],
    };
    DrawingEntities.current.push(entity);
  };

  const assignRectangleDrawing = (ctx) => {
    const newId = 'rectangle_' + Date.now();
    const entity = {
      _id: newId,
      type: "rectangle",
      properties: {
        color: ctx.strokeStyle,
        line: {
          type: isDashedLine ? 'dashed' : 'normal',
          width: ctx.lineWidth,
        },
      },
      startPoints: { x: lineStart.current.x, y: lineStart.current.y },
      width: 0,
      height: 0,
    };
    DrawingEntities.current.push(entity);
  };

  const updateSelectedEntity = () => {
    if (!selectedEntity.current) return;
    DrawingEntities.current.forEach((item, index) => {
      if (selectedEntity.current._id === item._id) {
        DrawingEntities.current[index] = { ...item, properties: { ...item.properties, color: "blue", prevColor: item.properties.prevColor || item.properties.color }, line: { width: 10, type: "normal" } };
      } else if (item.properties.prevColor) {
        DrawingEntities.current[index] = { ...item, properties: { ...item.properties, color: item.properties.prevColor, prevColor: undefined } };
      }
    });
    redrawCanvas();
  };

  useEffect(() => {
    const smartBoard = board.current;
    const context = smartBoard.getContext('2d');
    smartBoard.width = 1000;
    smartBoard.height = 1000;

    const startDrawing = (e) => {
      isDrawable.current = true;

      if (mode === "select_pointer") {
        const foundEntity = searchEntityByPoint(e.offsetX, e.offsetY);
        if (foundEntity) {
          selectedEntity.current = foundEntity;
          updateSelectedEntity();
        }
      }

      context.strokeStyle = colorRef.current.value;
      context.lineWidth = lineWidth;
      lineStart.current = { x: e.offsetX, y: e.offsetY };

      if (mode === "pen") {
        assignPenDrawEntity(context);
      } else if (mode === "rectangle") {
        assignRectangleDrawing(context);
      }
    };

    const draw = (e) => {
      if (!isDrawable.current) return;
      context.setLineDash(isDashedLine ? [5, 5] : []);
      context.beginPath();


      if (mode === "select_pointer")
        dragEntity(e);

      if (mode === "pen") {
        context.moveTo(lineStart.current.x, lineStart.current.y);
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
        lineStart.current = { x: e.offsetX, y: e.offsetY };
        const currentEntity = DrawingEntities.current[DrawingEntities.current.length - 1];
        currentEntity.points.push({ x: e.offsetX, y: e.offsetY });
      } else if (mode === "rectangle") {
        const width = e.offsetX - lineStart.current.x;
        const height = e.offsetY - lineStart.current.y;
        context.rect(lineStart.current.x, lineStart.current.y, width, height);
        context.stroke();
        const currentEntity = DrawingEntities.current[DrawingEntities.current.length - 1];
        currentEntity.width = width;
        currentEntity.height = height;
      }

      redrawCanvas();
    };

    const stopDraw = () => {
      isDrawable.current = false;
    };
    const dragEntity = (e) => {
      const dx = e.offsetX - lineStart.current.x;
      const dy = e.offsetY - lineStart.current.y;

      // Only update the starting points without altering width/height
      changeSelectedEntityStyle({ transform: { dx, dy } });

      // Update lineStart to the current mouse position for continuous drag
      lineStart.current = { x: e.offsetX, y: e.offsetY };
    };



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
  }, [isDashedLine, lineWidth, mode]);

  useEffect(() => {
    selectedEntity.current = [];
    updateSelectedEntity();
    redrawCanvas();
  }, [mode]);

  const changeSelectedEntityStyle = (obj) => {
    DrawingEntities.current.forEach((item, index) => {
      const properties = obj.properties;
      if (selectedEntity.current._id === item._id) {

        if (obj.transform) {
          console.log("transform", item);
          if (item.type === "rectangle" || item.type === "pen") {
            DrawingEntities.current[index] = {
              ...DrawingEntities.current[index],
              startPoints: {
                x: DrawingEntities.current[index].startPoints.x + obj.transform.dx,
                y: DrawingEntities.current[index].startPoints.y + obj.transform.dy,
              },
            };
          }


          if (item.type === "pen") {
            // Adjust all points for 'pen' drawing
            DrawingEntities.current[index].points = item.points.map(point => ({
              x: point.x + obj.transform.dx,
              y: point.y + obj.transform.dy,
            }));
          }


        }

        if (properties) {
          DrawingEntities.current[index] = {
            ...item,
            properties: {
              ...item.properties,
              ...(properties.color ? { color: properties.color, prevColor: properties.color } : {}),
              ...(properties.line ? {
                line: {
                  ...item.properties.line,
                  ...(properties.line.width ? { width: properties.line.width } : {}),
                  ...(properties.line.type ? { type: properties.line.type } : {}),
                }
              } : {}),
            },
          };
        }
      }
    });
    redrawCanvas();
    // console.log(DrawingEntities);

  };


  useEffect(() => {
    redrawCanvas()
  }, [lineWidth, isDrawable])

  return (
    <>
      <div>Board</div>
      <div>
        <button disabled={mode === 'pen'} onClick={() => setMode('pen')}>
          Pen
        </button>
        <button disabled={mode === 'rectangle'} onClick={() => setMode('rectangle')}>
          Rectangle
        </button>
        <button disabled={mode === 'select_pointer'} onClick={() => setMode('select_pointer')}>
          Select Pointer
        </button>
        <input
          type='color'
          ref={colorRef}
          defaultValue={"#F4F0F0"}
          onChange={(e) => {
            if (mode === 'select_pointer') {
              changeSelectedEntityStyle({ properties: { color: e.target.value } });
            }
          }}
        />
        <button onClick={() => {
          if (mode === 'select_pointer') {
            changeSelectedEntityStyle({ properties: { line: { type: isDashedLine ? 'normal' : 'dashed' } } });
          }
          setDashedLine(prev => !prev);

        }}>
          Line Dashed {isDashedLine ? '( Yes )' : '( No )'}
        </button>
        <input
          type='range'
          min='1'
          max='10'
          value={lineWidth}
          onChange={(e) => {
            setLineWidth(e.target.value);
            if (mode === 'select_pointer') {
              changeSelectedEntityStyle({ properties: { line: { width: e.target.value } } });
            }

          }}
        />
      </div>

      <div>
        <canvas id='board' ref={board} style={{ border: '1px solid black' }} />
      </div>
    </>
  );
}
