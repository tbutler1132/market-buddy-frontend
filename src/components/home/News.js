import React from 'react';
import { useGetNewsQuery } from '../../app/services/IEXCloud';

function News() {


    const { data, isLoading } = useGetNewsQuery('aapl')

    console.log(data, "NEWS")

    const renderNews = () => {
        return data.map(story => 
            <div className="news-story" key={Math.floor(Math.random() * 1000)}>xr
                <div className="title-headline">
                    <h5>{story.source}</h5>
                    <a href={story.url}>
                        <h4 style={{cursor: 'pointer'}}>{story.headline}</h4>
                    </a>
                </div>
                    <img className="news" src={story.image} alt={story.source} width="100px" height="100px"/>
            </div>
        )
    }

    if(isLoading) return <div>Loading...</div>
    return (
        <div>
            <h1>News</h1>
            {renderNews()}
        </div>
    );
}

export default News;