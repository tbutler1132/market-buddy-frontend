import React, { useMemo } from 'react';
import { Chart } from 'react-charts'

function StockGraph(props) {
        const data = useMemo(
          () => [
            {
              label: 'Series 1',
              data: [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 17 }]
            },
          ],
          []
        )
       
        const axes = useMemo(
          () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
          ],
          []
        )
       
        return (
          <div >
            <Chart data={data} axes={axes} />
          </div>
        )
}


export default StockGraph;