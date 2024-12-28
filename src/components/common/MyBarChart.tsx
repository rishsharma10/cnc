import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function MyBarChart(props: any) {
  const CustomRoundedBackgroundBar = (props: any) => {
    const { x, y, width, height } = props;
    const radius = 10;

    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={radius}
        ry={radius}
        fill="#f1e0e7"
      />
    );
  };

  const CustomRoundedBar = (props: any) => {
    return <rect {...props} rx="10" ry="10" />;
  };

  let lef = (570 - 10 * props?.data?.total_count) / (props?.data?.total_count + 1);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p>{`No of Hr: ${payload[0]?.payload?.hours_work_load}`}</p>
          <p>{`No of Process: ${payload[0]?.payload?.process_count}`}</p>
        </div>
      );
    }

    return null;
  };

  const filteredWorkload = props.data?.data?.map((day: any) => ({
    hours_work_load: day?.hours_work_load > 8 ? 8 : day?.hours_work_load,
    process_count: day?.process_count,
    name: day?.name,
  }));

  const formatName = (name: string) => (name.length > 3 ? name.slice(0, 3) : name);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={filteredWorkload}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
        barSize={10}
      >
        <XAxis
          tickFormatter={formatName}
          dataKey="name"
          scale="point"
          padding={{ left: lef, right: lef }}
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          dataKey="hours_work_load"
          name="Hours work load"
          fill="#b971f9"
          background={<CustomRoundedBackgroundBar />}
          shape={<CustomRoundedBar />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
