import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../withdraw/Withdraw.css';
import axios from "axios";
const Deposit = () => {
    const [number, setNumber] = useState("");
    const [amount, updateAmount] = useState();

    //handlers for inputs
    const numberHandler = (e) => {
        setNumber(e.target.value);
    }
    const amountHandler = (e) => {
        updateAmount(e.target.value)
    }

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!number || !amount) {
            alert("Provide details to make deposit into your account");
            return;
        }
        // Backend Api call
        try {
            // Make an API request to the withdrawal endpoint
            const response = await axios.post(`http://localhost:8080/banking/deposit/${number}`, {
                amount: parseFloat(amount)
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log("Withdrawal successful:", response.data);
            alert("Deposit successfull");
            navigate("/");

        } catch (error) {
            console.log(error)
            //checks  against response
            if (error.response) {
                if (error.response.status === 400) {
                    console.error('Bad Request. Check if your request is properly formatted.');
                } else if (error.response.status === 404) {
                    alert('Account not found.');
                    setNumber("");
                    updateAmount();
                } else {
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
                    <input className="inputnumber" autoComplete="off" placeholder='Account Number' type='text' name="Account Number" value={number} onChange={numberHandler} />
                    <input className="inputamount" type="number" autoComplete="off" placeholder='Amount' name="Amount" value={amount} onChange={amountHandler} />
                    <div className="divsubmit">
                        <input className='submit'  type='submit' />
                    </div>
                </form>
            </div></div>
    )
}
export default Deposit;