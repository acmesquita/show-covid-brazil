import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function App() {
  const data = [
    {name: 'Page A', uv: 400},
    {name: 'Page B', uv: 450},
    {name: 'Page C', uv: 500},
    {name: 'Page D', uv: 550},
    {name: 'Page E', uv: 600},
  ];

  return (
    <>
      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </>
  );
}

export default App;
