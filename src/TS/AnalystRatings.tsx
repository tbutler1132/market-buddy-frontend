import { useGetAnalystRatingsQuery } from "../app/services/IEXCloud";

const reccomendation = (rating: number, symbol: string) => {
    if(rating >= 75){
        return `Analysts consider ${symbol} a strong buy`
    }
    if(rating >= 25){
        return `Analysts reccomend buying ${symbol}`
    }
    if(rating >= -25){
        return `Analysts are neutral on ${symbol}`
    }
    if(rating >= -75){
        return `Analysts reccomend selling ${symbol}`
    }
    if(rating >= -100){
        return `Yikes! Analysts consider ${symbol} a strong sell`
    }
}

function AnalystRatings({ stockId }: {stockId: string}) {

    const { data, isLoading } = useGetAnalystRatingsQuery(stockId)

    if(isLoading) return null
    return (
        <>
            <h2>Analyst Rating</h2>
            <div className="css-19gdfx2">
                <div className="row">
                    <div className="_2QDjqlRg7zTUxYLjTHDGlF">
                        <div id="sdp-analyst-ratings-summary-tooltip" className="_1fEdz1YPOLpLW1Ow3rKh92">
                            <h2>{data.marketConsensus}</h2>
                            <p>of {data.analystCount} ratings</p>
                        </div>
                    </div>
                    <div className="_13Jm9_7eI9W-YsXRyrVJX_">
                        <p>{reccomendation(data.marketConsensus, data.symbol)} at a target price of ${data.marketConsensusTargetPrice}</p>
                    </div>
                </div> 
            </div>
        </>
    );
}

export default AnalystRatings;