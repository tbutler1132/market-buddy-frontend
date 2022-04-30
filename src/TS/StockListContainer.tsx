import AddList from "./AddList";
import { useGetListsQuery } from "../app/services/MarketBuddy";
import { useSelector } from "react-redux";

function StockListContainer() {

    const { auth } = useSelector((state: any) => state)
    const { mode } = useSelector((state: any) => state.styles)


    const { data, isLoading } = useGetListsQuery(auth.user._id)

    const renderLists = () => {
        return data.lists.map((list: any) => 
            <p>{list.title}</p>    
        )
    }


    if(isLoading) return null
    return (
        <div data-mode={mode} className="sidebar-content">
            <div data-mode={mode} className="card" style={{position: 'relative'}}>
                <div className="stock-list-title">
                    <h2>Lists</h2>
                    {renderLists()}
                    <AddList />
                </div>
            </div>
        </div>
    );
}

export default StockListContainer;