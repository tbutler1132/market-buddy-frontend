import React from 'react';

function News(props) {

    const {news} = props

    const renderNews = () => {
        return news.map(story => 
            <div className="news-story" key={Math.floor(Math.random() * 1000)}>
                <hr></hr>
                <a href={story.url}>
                    <h2 style={{cursor: 'pointer'}}>{story.headline}</h2>
                </a>
                <img className="news" src={story.image} alt={story.source} width="100px" height="100px"/>
            </div>
        )
    }

    if(!news) return <div>Loading...</div>
    return (
        <div>
            <h1>News</h1>
            {renderNews()}
        </div>
    );
}

export default News;