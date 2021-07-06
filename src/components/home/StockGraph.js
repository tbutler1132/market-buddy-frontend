import React from 'react';
// import { Chart } from 'react-charts'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

function StockGraph(props) {

  const {data, type} = props

        return (
          <div >
              <LineChart width={500} height={400} data={data}>
                <Line type="linear" dataKey={type} stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
          </div>
        )
}


export default StockGraph;