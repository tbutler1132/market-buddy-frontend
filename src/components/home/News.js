import React from 'react';

function News(props) {

    const {news} = props

    const renderNews = () => {
        return news.map(story => 
            <div key={story.url}>
                <a href={story.url}>
                    <h2 style={{cursor: 'pointer'}}>{story.headline}</h2>
                </a>
                <img src={story.image} alt={story.source} width="250px" height="250px"/>
                <hr></hr>
            </div>
        )
    }

    if(!news) return <div>Loading...</div>
    return (
        <div>
            {renderNews()}
        </div>
    );
}

export default News;