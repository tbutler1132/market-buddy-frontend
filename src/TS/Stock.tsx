import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetCompanyInfoQuery, useGetLatestPriceQuery, useLazyGetHistoricalDataQuery, useGetFinancialDataQuery } from "../app/services/IEXCloud";
import StockGraph from "./StockGraph";
import CircularProgress from "@material-ui/core/CircularProgress";
import News from "./News";


function Stock() {

    const [timeRange, setTimeRange] = useState("ytd")

    let { stockId }: {stockId: string} = useParams()

    const { data, isLoading } = useGetCompanyInfoQuery(stockId)

    const { data: price, isLoading: priceLoading } = useGetLatestPriceQuery(stockId)

    const [getHistoricalData, results] = useLazyGetHistoricalDataQuery()

    const { data: financialData, isLoading: financialDataLoading, isError } = useGetFinancialDataQuery(stockId)

    useEffect(() => {
        getHistoricalData({id: stockId, range: "ytd"}, true)
    }, [])

    const timeRangeClickHandler = (e: any) => {
        setTimeRange(e.target.value)
        getHistoricalData({id: stockId, range: e.target.value})
    }

    if(isLoading || priceLoading || results.isUninitialized || results.isLoading || financialDataLoading) return <CircularProgress />
    return (
        <div className="main-container">
            <div className="row">
                <div className="col-12">
                    <h1>{data.companyName}</h1>
                    <h3>${price.toLocaleString()}</h3>
                    <StockGraph type="price" data={results.data}/>
                    <nav>
                        <div className="YLzQdbd6ixTG1LWujco0N">
                            <button onClick={timeRangeClickHandler} value="ytd" className={timeRange === "ytd" ? "css-klp03n" : "css-16sjopo"}>YTD</button>
                            <button onClick={timeRangeClickHandler} value="1m" className={timeRange === "1m" ? "css-klp03n" : "css-16sjopo"}>1M</button>
                            <button onClick={timeRangeClickHandler} value="3m" className={timeRange === "3m" ? "css-klp03n" : "css-16sjopo"}>3M</button>
                            <button onClick={timeRangeClickHandler} value="1y" className={timeRange === "1y" ? "css-klp03n" : "css-16sjopo"}>1Y</button>
                            <button onClick={timeRangeClickHandler} value="5y" className={timeRange === "5y" ? "css-klp03n" : "css-16sjopo"}>5Y</button>
                        </div>
                    </nav>
                    <section className="_2wuDJhUh9lal-48SV5IIfk">
                        <h3>About</h3>
                        <hr />
                        <p>{data.description}</p>
                        <div className="css-19gdfx2">
                            <div className="css-10ypg7">
                                <div>CEO</div>
                                <div>{data.CEO}</div>
                            </div>
                            <div className="css-10ypg7">
                                <div>Employees</div>
                                <div>{data.employees}</div>
                            </div>
                            <div className="css-10ypg7">
                                <div>Headquarters</div>
                                <div>{data.city}, {data.state}</div>
                            </div>
                        </div>
                    </section>
                    <section className="_2wuDJhUh9lal-48SV5IIfk">
                        {isError
                            ?
                                <h3>No key statistics available</h3>
                            :
                            <>
                                <h3>Key Statistics</h3>
                                <div className="css-19gdfx2">
                                    <div className="css-10ypg7">
                                        <div>
                                            Revenue
                                        </div>
                                        <div>
                                            ${financialData?.revenue.toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="css-10ypg7">
                                        <div>
                                            EBITDA
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
                        <News companySymbol={stockId}/>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Stock;