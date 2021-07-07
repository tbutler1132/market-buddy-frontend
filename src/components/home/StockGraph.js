import React from 'react';
// import { Chart } from 'react-charts'
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

function StockGraph(props) {

  const {data, type} = props

  const graphColor = () => {
    if (data[data.length - 2].value < data[data.length - 1].value){
      return "#228B22"
    } else {
      return '#C70039'
    }
  }

        return (
          <div >
              <LineChart width={500} height={400} data={data}>
                <Line type="linear" dataKey={type} stroke={graphColor()} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
          </div>
        )
}


export default StockGraph;