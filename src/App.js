import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import api from './service';
import { Container } from './styles/app.style.js'

function App() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('result_covid')) || [])
  const [country, setCountry] = useState(localStorage.getItem('country') || '')

  async function getData(){ 
    const response = await api.get('https://coronavirus-tracker-api.herokuapp.com/v2/locations/28?source=jhu&timelines=true');
    const location = response.data.location
    const timeline_confirmed = location.timelines.confirmed.timeline
    const timeline_deaths = location.timelines.deaths.timeline
    
    const result_confirmed = Object.entries(timeline_confirmed).map(a => {return {name: new Date(a[0]).toLocaleDateString(), value: a[1]}})
    const result_deaths = Object.entries(timeline_deaths).map(a => {return {name: new Date(a[0]).toLocaleDateString(), value: a[1]}})
    const result = result_confirmed.map((a, index) => { return {name: a.name, confirmed: a.value, death: result_deaths[index].value} })
    
    localStorage.setItem('result_covid', JSON.stringify(result))
    localStorage.setItem('country', location.country)
    setData(result)
    setCountry(location.country)
  }

  useEffect(()=>{
    if(data.length === 0 || data[data.length - 1].name !== new Date().toLocaleDateString()){
      getData()
    }
  },[data, country])

  return (
    <Container>
      <h1>{country} - COVID19</h1>
      {data.length > 0 &&
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} activeDot={{ r: 8 }}>
          <Line type="monotone" dataKey="confirmed" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="death" stroke="#ab0c0c" strokeWidth={2}/>
          <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      }
    </Container>
  );
}

export default App;
