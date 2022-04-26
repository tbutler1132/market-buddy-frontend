import { useGetTagsQuery } from "../app/services/IEXCloud";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

function TrendingLists() {

    const { data, isLoading } = useGetTagsQuery("_")
    const history = useHistory()
    const { mode } = useSelector((state: any) => state.styles)

    const renderLists = () => {
        return [...data.slice(0, 10)].map((list: any) => 
            <button data-mode={mode} key={list.name} onClick={() => history.push(`lists/${list.name}`)} className="collection-button">{list.name}</button> 
        )
    }

    if(isLoading) return null
    return (
        <div data-mode={mode} className="trending-lists">
            <h2>Trending Lists</h2> 
            <h4 style={{color: 'green'}}>Beta</h4>
            {renderLists()}
        </div>
    );
}

export default TrendingLists;