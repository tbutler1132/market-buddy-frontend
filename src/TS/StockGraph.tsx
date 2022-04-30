import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

const graphColor = (data: any) => {
    if (data[data.length - 1]?.price >= data[0]?.price){
      return "#228B22"
    } else {
      return '#C70039'
    }
}

interface StockGraphProps {
    type: string
    data: any,
    width: number,
    height: number,
}


function StockGraph({ type, data, width, height }: StockGraphProps) {

    return (
      <>
        <div >
          <LineChart width={width} height={height} data={data}>
            <Line dot={false} type={"step"} dataKey={type} stroke={graphColor(data)} />
            <XAxis hide dataKey="name" />
            <YAxis domain={['auto', 'auto']} hide/>
            <Tooltip wrapperStyle={{color: "black"}} formatter={(value: number, name: string) => ['$' + value.toFixed(2), "Price"]} separator=': '/>
          </LineChart>
        </div>
      </>
    );
}

export default StockGraph;