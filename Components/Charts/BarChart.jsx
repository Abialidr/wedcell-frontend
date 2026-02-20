import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  { name: 'Couples total', uv: 4000, fill: '#ffc658' },
  { name: 'Mutual friends', uv: 3000, fill: '#8884d8' },
  { name: 'Sarah’s friends total', uv: 2000, fill: '#83a6ed' },
  { name: 'Ex friend', uv: 2780, fill: '#8dd1e1' },
  { name: 'Company friends', uv: 1890, fill: '#82ca9d' },
  { name: 'Clients', uv: 2390, fill: '#a4de6c' },
];

const BarChartMain = () => {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      layout='vertical'
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis type='number' />
      <YAxis
        dataKey='name'
        type='category'
        scale='band'
      />
      <Tooltip />
      <Legend />
      {data.map((entry, index) => (
        <Bar
          dataKey='uv'
          fill={entry.fill}
          stackId='a'
          key={`bar-${index}`}
        />
      ))}
    </BarChart>
  );
};
export default BarChartMain;
