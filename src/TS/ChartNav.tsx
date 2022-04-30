interface ChartNavProps {
    timeRange: string,
    setTimeRange: any,
    chartRanges: string[]
}


function ChartNav({ timeRange, setTimeRange, chartRanges }: ChartNavProps) {
    return (
        <nav>
            <div className="YLzQdbd6ixTG1LWujco0N">
                {chartRanges.map(range => 
                    <button key={range} onClick={() => setTimeRange(range)} value={range} className={timeRange === range ? "css-klp03n" : "css-16sjopo"}>{range.toUpperCase()}</button>    
                )}
            </div>
        </nav>
    );
}

export default ChartNav;