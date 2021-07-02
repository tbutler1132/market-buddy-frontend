import React from 'react';
import { Chart } from 'react-charts'

function StockGraph(props) {
        const data = React.useMemo(
          () => [
            {
              label: 'Series 1',
              data: [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 17 }]
            },
          ],
          []
        )
       
        const axes = React.useMemo(
          () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
          ],
          []
        )
       
        return (
          <div className="stock-graph">
            <Chart data={data} axes={axes} />
          </div>
        )
}


export default StockGraph;