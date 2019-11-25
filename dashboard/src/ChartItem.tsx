import React, { memo } from "react";
import TradingViewWidget, { Themes, BarStyles } from "react-tradingview-widget";

type Props = {
  symbol: string;
};

const ChartItem = (props: Props) => {
  return (
    <TradingViewWidget
      symbol={props.symbol}
      theme={Themes.DARK}
      locale="en"
      autosize
      interval="30"
      timezone="America/Sao_Paulo"
      style={BarStyles.CANDLES}
      toolbar_bg="#f1f3f6"
      enable_publishing={false}
      withdateranges={true}
      hide_side_toolbar={false}
      allow_symbol_change={true}
    />
  );
};

export default memo(ChartItem);
