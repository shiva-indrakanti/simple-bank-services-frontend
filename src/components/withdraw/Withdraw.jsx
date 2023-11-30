import { useState } from "react";
import './Withdraw.css';
import axios from "axios";
const Withdraw = () => {
    const [number, setNumber] = useState("");
    const [amount, updateAmount] = useState();

    //handlers for inputs
    const numberHandler = (e) => {
        setNumber(e.target.value);
    }
    const amountHandler = (e) => {
        updateAmount(e.target.value)
    }

    //submi handler
    const submitHandler = async (e) => {

        e.preventDefault();
        // Make sure both number and amount are provided
        if (!number || !amount) {
            alert("Please enter both account number and amount.");
            return;
        }
        try {
            // Make an API request to the withdrawal endpoint
            const response = await axios.post(`http://localhost:8080/banking/withdraw/${number}`, JSON.stringify({
                amount: parseFloat(amount)
            }), {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            console.log("Withdrawal successful:", response.data);
            alert("Withdraw successfull ");

        } catch (error) {
            console.log(error)
            //checks  against response
            if (error.response) {
                if (error.response.status === 400) {
                    console.error('Bad Request. Check if your request is properly formatted.');
                } else if (error.response.status === 404) {
                    alert('Account not found.');
                    setNumber("");
                    updateAmount("");
                } else if (error.response.status === 507) {
                    alert("Insufficients Funds..");
                    setNumber("");
                    updateAmount("");
                }
                else {
                    console.error('Unexpected error:', error.response.status);
                }
            }
            //checks against request we made
            else if (error.request) {
                console.error('No response received from the server');
            }
            //Error due to neither response nor request 
            else {
                console.error('Error setting up the request:', error.message);
            }
        }
    }
    return (
        <div className="main">
            <div className='inputdiv'>
                <form className='formoperation' onSubmit={submitHandler}>
                    <input autoComplete="off" placeholder='Account Number' type='text' name="Account Number" value={number} onChange={numberHandler} />
                    <input type="number" autoComplete="off" placeholder='Amount' name="Amount" value={amount} onChange={amountHandler} />
                    <div className='divsubmit'>
                        <input className='submit' type='submit' />
                    </div>
                </form>
            </div></div>
    )
}
export default Withdraw;