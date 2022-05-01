import { useGetNewsQuery } from '../app/services/IEXCloud';
import NewsInfoModal from './NewsInfoModal';
import { useSelector } from 'react-redux'

interface NewsProps {
    companySymbol?: string
}

function News({ companySymbol = "aapl" }: NewsProps) {
    const { data, isLoading } = useGetNewsQuery(companySymbol)
    const { mode } = useSelector((state: any) => state.styles)

    if(isLoading) return null
    return (
        <div>
            <div data-mode={mode} className="header-info-container">
                <h1>News</h1>
                <NewsInfoModal />
            </div>
            {data.map((story: any) => 
                <div data-mode={mode} className="news-story" key={story.url}>
                    <div className="title-headline">
                        <h5>{story.source}</h5>
                        {/* <h5>{story.datetime}</h5> */}
                        <a style={{height: "auto"}} href={story.url}>
                            <h4 style={{cursor: 'pointer', color: mode === "dark" ? "white" : 'black'}}>{story.headline}</h4>
                        </a>
                        <p>{story.summary}</p>
                    </div>
                    <img className="news" src={story.image} alt={story.source} width="100px" height="100px"/>
                </div>
            )}
        </div>
    );
}

export default News;