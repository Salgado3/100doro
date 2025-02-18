import { LineChart } from "@mantine/charts";

const UserChart = () => {
  // Data for the last 7 days starting from Monday
  const data = [
    { day: "Mon", points: 25 },
    { day: "Tue", points: 30 },
    { day: "Wed", points: 45 },
    { day: "Thu", points: 60 },
    { day: "Fri", points: 55 },
    { day: "Sat", points: 70 },
    { day: "Sun", points: 80 },
  ];

  return (
    <LineChart
      h={300}
      data={data}
      dataKey="day"
      yAxisProps={{ domain: [0, 100] }}
      series={[{ name: "points", color: "indigo.6" }]}
    />
  );
};

export default UserChart;
