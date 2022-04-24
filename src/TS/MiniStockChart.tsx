import { useEffect } from "react";
import { useLazyGetHistoricalDataQuery } from "../app/services/IEXCloud";
import { LineChart, Line, XAxis, YAxis } from 'recharts'

const graphColor = (data: any) => {
    if (data[data.length - 1]?.price >= data[0]?.price){
      return "#228B22"
    } else {
      return '#FF0000'
    }
}

function MiniStockChart({ stockId }: {stockId: string}) {

    const [getHistoricalData, results] = useLazyGetHistoricalDataQuery()

    useEffect(() => {
        getHistoricalData({id: stockId, range: "ytd"}, true)
    }, [])

    console.log(results.data, stockId)

    if(!results.isSuccess) return null
    return (
        <div>
            <LineChart width={80} height={50} data={results.data}>
                <Line dot={false} type="monotone" dataKey={'price'} stroke={graphColor(results.data)} strokeWidth={1}/>
                <XAxis hide dataKey="name" />
                <YAxis domain={['auto', 'auto']} hide/>
            </LineChart>
        </div>
    );
}

export default MiniStockChart;