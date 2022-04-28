import OrderSummaryModal from "./OrderSummaryModal";
import { useForm } from "react-hook-form";

function TransactionForm({ latestPrice, symbol }: {latestPrice: number, symbol: string}) {
    return (
        <form>
            <div className="order-type">
                <label>Order Type</label>
            </div>
            <div className="order-type">
                <label>Invest In</label>
                <select>
                    <option>Shares</option>
                </select>
            </div>
            <div className="order-type">
                <label>Shares</label>
                <input />
            </div>
            <div className="order-type">
                <label>Market Price</label>
                <span>${latestPrice.toLocaleString()}</span>
            </div>
            <div className="order-type">
                <label>Estimated Cost</label>
                <span>${(5 * latestPrice).toLocaleString()}</span>
            </div>
            <OrderSummaryModal shares={1} symbol={symbol} transactionType="Buy"/>
        </form>
    );
}

export default TransactionForm;