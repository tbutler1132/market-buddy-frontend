import { useParams } from "react-router-dom";
import { useGetCollectionQuery } from "../app/services/IEXCloud";
import { CircularProgress } from "@material-ui/core";

function List({ type }: {type: string}) {

    let { list }: {list: string} = useParams()
    const { data, isLoading } = useGetCollectionQuery({type, name: list})

    console.log(data)

    if(isLoading) return <CircularProgress />
    return (
        <div className="col-12 css-1e4ygyu">
            <h2>{list}</h2>
            <div className="css-lucj7l">
                
            </div>
        </div>
    );
}

export default List;