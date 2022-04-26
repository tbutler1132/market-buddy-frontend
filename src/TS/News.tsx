import { useGetNewsQuery } from '../app/services/IEXCloud';
import NewsInfoModal from './NewsInfoModal';

interface NewsProps {
    companySymbol?: string
}


function News({ companySymbol = "aapl" }: NewsProps) {

    const { data, isLoading } = useGetNewsQuery(companySymbol)

    if(isLoading) return null
    return (
        <div>
            <div className="header-info-container">
                <h1>News</h1>
                <NewsInfoModal />
            </div>
            {data.map((story: any) => 
                <div className="news-story" key={story.url}>
                    <div className="title-headline">
                        <h5>{story.source}</h5>
                        <a style={{height: "auto"}} href={story.url}>
                            <h4 style={{cursor: 'pointer'}}>{story.headline}</h4>
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