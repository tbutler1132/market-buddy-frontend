import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetCompanyInfoQuery, useGetLatestPriceQuery, useLazyGetHistoricalDataQuery, useGetFinancialDataQuery } from "../app/services/IEXCloud";
import StockGraph from "./StockGraph";
import CircularProgress from "@material-ui/core/CircularProgress";
import News from "./News";
import AnalystRatings from "./AnalystRatings";
import { useSelector } from 'react-redux';
import TransactionContainer from "./TransactionContainer";
import ChartNav from "./ChartNav";

const chartRanges = ["ytd", "5d", "1m", "3m", "1y", "5y"]

const graphColor = (data: any) => {
    if (data[data.length - 1]?.price >= data[0]?.price){
      return "#228B22"
    } else {
      return '#C70039'
    }
}

function Stock() {
    const { auth } = useSelector((state: any) => state)
    const [timeRange, setTimeRange] = useState("ytd")
    let { stockId }: {stockId: string} = useParams()
    const { data, isLoading } = useGetCompanyInfoQuery(stockId)
    const { data: price, isLoading: priceLoading } = useGetLatestPriceQuery(stockId)
    const [getHistoricalData, results] = useLazyGetHistoricalDataQuery()
    const { data: financialData, isLoading: financialDataLoading, isError } = useGetFinancialDataQuery(stockId)
    const { mode } = useSelector((state: any) => state.styles)

    useEffect(() => {
        getHistoricalData({id: stockId, range: "ytd"}, true)
    }, [getHistoricalData, stockId])

    const timeRangeClickHandler = (range: any) => {
        setTimeRange(range)
        getHistoricalData({id: stockId, range: range})
    }

    if(isLoading || priceLoading || results.isUninitialized || results.isLoading || financialDataLoading) return <CircularProgress />
    return (
        <div className="main-container">
            <div className="row">
                <div data-mode={mode} className="col-12">
                    <h1>{data.companyName}</h1>
                    <h3>${price.toLocaleString()}</h3>
                    <StockGraph color={graphColor(results.data)} width={500} height={400} type="price" data={results.data}/>
                    <ChartNav chartRanges={chartRanges} setTimeRange={timeRangeClickHandler} timeRange={timeRange}/>
                    <section id="company-about-section" className="_2wuDJhUh9lal-48SV5IIfk">
                        <h2>About</h2>
                        <hr />
                        <p>{data.description}</p>
                        <div className="css-19gdfx2">
                            <div className="css-10ypg7">
                                <div><span className="css-w8p71j">CEO</span></div>
                                <div>{data.CEO}</div>
                            </div>
                            <div className="css-10ypg7">
                                <div><span className="css-w8p71j">Employees</span></div>
                                <div>{data.employees}</div>
                            </div>
                            <div className="css-10ypg7">
                                <div><span className="css-w8p71j">Headquarters</span></div>
                                <div>{data.city}, {data.state}</div>
                            </div>
                        </div>
                    </section>
                    <section className="_2wuDJhUh9lal-48SV5IIfk">
                        {isError
                            ?
                                <h2>No key statistics available</h2>
                            :
                            <>
                                <h2>Key Statistics</h2>
                                <div className="css-19gdfx2">
                                    <div className="css-10ypg7">
                                        <div>
                                            <span className="css-w8p71j">
                                                Revenue
                                            </span>
                                        </div>
                                        <div>
                                            ${financialData?.revenue.toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="css-10ypg7">
                                        <div>
                                            <span className="css-w8p71j">
                                                EBITDA
                                            </span>
                                        </div>
                                        <div>
                                            ${financialData?.EBITDA.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        <hr />
                    </section>
                    <section className="_2wuDJhUh9lal-48SV5IIfk">
                        <AnalystRatings stockId={stockId}/>
                    </section>
                    <section className="_2wuDJhUh9lal-48SV5IIfk">
                        <News companySymbol={stockId}/>
                    </section>
                </div>
                {auth.user 
                    ?
                        <TransactionContainer latestPrice={price} stockId={stockId}/>
                    :
                        null
                }
            </div>
        </div>
    );
}

export default Stock;