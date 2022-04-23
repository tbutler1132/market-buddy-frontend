import { useParams } from "react-router-dom";
import { useGetCompanyInfoQuery, useGetLatestPriceQuery, useGetHistoricalDataQuery, useGetFinancialDataQuery } from "../app/services/IEXCloud";
import StockGraph from "./StockGraph";
import CircularProgress from "@material-ui/core/CircularProgress";
import News from "./News";

const formatStatistics = (stat: number) => {
    return stat
}

function Stock() {

    let { stockId }: {stockId: string} = useParams()

    const { data, isLoading } = useGetCompanyInfoQuery(stockId)

    const { data: price, isLoading: priceLoading } = useGetLatestPriceQuery(stockId)

    const { data: historicalData, isLoading: historicalDataLoading } = useGetHistoricalDataQuery(stockId)

    const { data: financialData, isLoading: financialDataLoading } = useGetFinancialDataQuery(stockId)

    console.log("DATA", financialData)

    if(isLoading || priceLoading || historicalDataLoading || financialDataLoading) return <CircularProgress />
    return (
        <div className="main-container">
            <div className="row">
                <div className="col-12">
                    <h1>{stockId.toUpperCase()}</h1>
                    <h3>{price}</h3>
                    <StockGraph type="price" data={historicalData}/>
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
                        <h3>Key Statistics</h3>
                        <div className="css-19gdfx2">
                            <div className="css-10ypg7">
                                <div>
                                    Revenue
                                </div>
                                <div>
                                    {financialData.revenue}
                                </div>
                            </div>
                            <div className="css-10ypg7">
                                <div>
                                    EBITDA
                                </div>
                                <div>
                                    {financialData.EBITDA}
                                </div>
                            </div>
                        </div>
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