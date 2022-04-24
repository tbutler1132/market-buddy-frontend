import { useParams } from "react-router-dom";
import { useGetCollectionQuery } from "../app/services/IEXCloud";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function List({ type }: {type: string}) {

    let { list }: {list: string} = useParams()
    const { data, isLoading } = useGetCollectionQuery({type, name: list})
    const history = useHistory()

    console.log(data)

    if(isLoading) return <CircularProgress />
    return (
        <div id="list-page" className="main-container">  
            <div className="col-12 css-1e4ygyu">
                <h2>{list}</h2>
                <TableContainer component={Paper}>
                    {/* @ts-ignore */}
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Symbol</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Change</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((data: any) => (
                                /* @ts-ignore */
                                <TableRow style={{cursor: "pointer"}} onClick={() => history.push(`/stocks/${data.symbol}`)} key={data.symbol} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {data.companyName}
                                    </TableCell>
                                    <TableCell align="right">{data.symbol}</TableCell>
                                    <TableCell align="right">${data.latestPrice.toLocaleString()}</TableCell>
                                    <TableCell align="right">{data.change}%</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default List;