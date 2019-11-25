import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChartItem from "./ChartItem";
import "./ChartItem.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Charts = [
  { symbol: "MERCADO:BTCBRL" },
  { symbol: "BITSTAMP:BTCUSD" },
  { symbol: "MERCADO:XRPBRL" },
  { symbol: "MERCADO:ETHBRL" },
  { symbol: "MERCADO:BCHBRL" },
  { symbol: "MERCADO:LTCBRL" }
];

const Sizes = ["lg", "md", "sm", "xs", "xxs"] as const;

type Size = typeof Sizes[number];

type ConfigItem = {
  itemsPerRow: number;
  cols: number;
  breakpoint: number;
  height: number;
};

const ItemsConfig: { [key in Size]: ConfigItem } = {
  lg: {
    itemsPerRow: 3,
    cols: 12,
    breakpoint: 1200,
    height: 4
  },
  md: {
    itemsPerRow: 2,
    cols: 12,
    breakpoint: 996,
    height: 4
  },
  sm: {
    itemsPerRow: 2,
    cols: 12,
    breakpoint: 768,
    height: 4
  },
  xs: {
    itemsPerRow: 1,
    cols: 12,
    breakpoint: 480,
    height: 4
  },
  xxs: {
    itemsPerRow: 1,
    cols: 12,
    breakpoint: 0,
    height: 4
  }
};

const makeRowLayout = (index: number, size: Size) => {
  const { cols, height, itemsPerRow } = ItemsConfig[size];

  const width = cols / itemsPerRow;

  const currentX = (index % itemsPerRow) * width;
  const currentY = Math.floor((index * width) / itemsPerRow) * height;

  return {
    i: "" + index,
    x: currentX,
    y: currentY,
    w: width,
    h: height
  };
};

const makeCompleteLayoutPerSize = (size: Size) => {
  return Charts.map((_, index) => makeRowLayout(index, size));
};

const App: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);

  const getWrapperClass = () => {
    return isDragging ? "is_dragging" : "";
  };

  const sizeMap = (callback: (size: Size) => any) => {
    return Sizes.reduce(
      (prev, curr) => ({ ...prev, [curr]: callback(curr) }),
      {}
    );
  };

  return (
    <ResponsiveGridLayout
      layouts={sizeMap(size => makeCompleteLayoutPerSize(size))}
      breakpoints={sizeMap(size => ItemsConfig[size].breakpoint)}
      cols={sizeMap(size => ItemsConfig[size].cols)}
      rowHeight={80}
      draggableHandle=".custom_handle"
      className={getWrapperClass()}
      onDragStart={() => setIsDragging(true)}
      onDragStop={() => setIsDragging(false)}
      onResizeStart={() => setIsDragging(true)}
      onResizeStop={() => setIsDragging(false)}
      margin={[0, 30]}
      containerPadding={[0, 0]}
    >
      {Charts.map((chart, index) => (
        <div key={index}>
          <ChartItem symbol={chart.symbol} />
          <div className="custom_handle">
            <FontAwesomeIcon icon="grip-vertical" />
          </div>
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default App;
