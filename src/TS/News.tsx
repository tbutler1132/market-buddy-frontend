import { useGetNewsQuery } from '../app/services/IEXCloud';

interface NewsProps {
    companySymbol?: string
}

function News({ companySymbol = "aapl" }: NewsProps) {

    const { data, isLoading } = useGetNewsQuery(companySymbol ? companySymbol :  'aapl')

    if(isLoading) return <div>Loading...</div>
    return (
        <div>
            <h1>News</h1>
            {data.map((story: any) => 
                <div className="news-story" key={Math.floor(Math.random() * 1000)}>
                    <div className="title-headline">
                        <h5>{story.source}</h5>
                        <a href={story.url}>
                            <h4 style={{cursor: 'pointer'}}>{story.headline}</h4>
                        </a>
                    </div>
                    <img className="news" src={story.image} alt={story.source} width="100px" height="100px"/>
                </div>
            )}
        </div>
    );
}

export default News;