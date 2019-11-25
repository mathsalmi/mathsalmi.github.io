import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import ChartItem from "./ChartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ChartItem.css";

const App: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);

  const getWrapperClass = () => {
    return isDragging ? "is_dragging" : "";
  };

  const charts = [
    { symbol: "MERCADO:BTCBRL" },
    { symbol: "BITSTAMP:BTCUSD" },
    { symbol: "MERCADO:XRPBRL" },
    { symbol: "MERCADO:ETHBRL" },
    { symbol: "MERCADO:BCHBRL" },
    { symbol: "MERCADO:LTCBRL" }
  ];

  const currentLayout = (index: number) => {
    const gridWidth = 12;
    const maxElementsPerRow = 2;

    const width = gridWidth / maxElementsPerRow;
    const height = 4;

    const currentX = (index % maxElementsPerRow) * width;
    const currentY = Math.floor((index * width) / maxElementsPerRow) * height;

    return {
      i: "" + index,
      x: currentX,
      y: currentY,
      w: width,
      h: height
    };
  };

  return (
    <GridLayout
      cols={12}
      rowHeight={80}
      width={1200}
      draggableHandle=".custom_handle"
      className={getWrapperClass()}
      onDragStart={() => setIsDragging(true)}
      onDragStop={() => setIsDragging(false)}
      onResizeStart={() => setIsDragging(true)}
      onResizeStop={() => setIsDragging(false)}
      margin={[0, 30]}
      containerPadding={[0, 0]}
    >
      {charts.map((chart, index) => (
        <div key={index} data-grid={currentLayout(index)}>
          <ChartItem symbol={chart.symbol} />
          <div className="custom_handle">
            <FontAwesomeIcon icon="grip-vertical" />
          </div>
        </div>
      ))}
    </GridLayout>
  );
};

export default App;
