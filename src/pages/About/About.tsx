import { Area } from "@ant-design/plots";

const About = () => {
  return (
    <div style={{ paddingTop: 200 }}>
      <DemoArea />
    </div>
  );
};
export default About;
const DemoArea = () => {
  const config = {
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/stocks.json",
      transform: [
        {
          type: "filter",
          callback: (d: { symbol: string }) => d.symbol === "GOOG",
        },
      ],
    },
    xField: (d: { date: string | number | Date }) => new Date(d.date),
    yField: "price",
    style: {
      fill: "linear-gradient(-90deg, white 0%, #16c784 100%)",
    },
    axis: {
      y: { labelFormatter: "~s" },
    },
    line: {
      style: {
        stroke: "#16c784",
        strokeWidth: 2,
      },
    },
  };
  return (
    <div>
      <Area {...config} />
    </div>
  );
};
