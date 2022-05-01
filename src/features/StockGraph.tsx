import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

interface StockGraphProps {
    type: string
    data: any,
    width: number,
    height: number,
    color: string
}

function StockGraph({ type, data, width, height, color }: StockGraphProps) {

    return (
      <>
        <div >
          <LineChart width={width} height={height} data={data}>
            <Line dot={false} type={"step"} dataKey={type} stroke={color} />
            <XAxis hide dataKey="name" />
            <YAxis domain={['auto', 'auto']} hide/>
            <Tooltip wrapperStyle={{color: "black"}} formatter={(value: number, name: string) => ['$' + value.toFixed(2), name[0].toUpperCase() + name.slice(1)]} separator=': '/>
          </LineChart>
        </div>
      </>
    );
}

export default StockGraph;