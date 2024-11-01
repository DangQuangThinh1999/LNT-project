import { Area } from "@ant-design/plots";
interface ILineChart {
  isNegative?: boolean;
}
export const LineChart: React.FC<ILineChart> = ({ isNegative }) => {
  const config = {
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/stocks.json",
      transform: [
        { type: "filter", callback: (d: any) => d.symbol === "GOOG" },
      ],
    },
    xField: (d: any) => new Date(d.date),
    yField: "price",
    style: {
      fill: isNegative
        ? "linear-gradient(-90deg, white 0%, red 100%)"
        : "linear-gradient(-90deg, white 0%, darkgreen 100%)",
    },
    axis: {
      x: {
        label: null,
      },
      y: {
        label: null,
      },
    },
    line: {
      style: {
        stroke: "darkgreen",
        strokeWidth: 2,
      },
    },
  };
  return (
    <div style={{ height: 70, width: 120 }}>
      <Area {...config} />
    </div>
  );
};
