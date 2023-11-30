import { useNavigate } from 'react-router-dom';
import './AccountRegistration.css'
import { useState } from "react";
import axios from 'axios';
const AccountRegistration = () => {

    //use State details of account
    const [data, setData] = useState({
        accountHolderName: "",
        accountNumber: "",
        mobileNumber: "",
        bankName: ""
    })

    const navigate = useNavigate();
    //input change handler
    const changeHandler = (e) => {
        setData(
            { ...data, [e.target.name]: e.target.value }
        )
    }

    //submitting the data 
    const submitHandler = async (event) => {
        // Prevents default form submission behavior      
        event.preventDefault();

        if (!data.accountHolderName || !data.accountNumber || !data.bankName || !data.mobileNumber) {
            alert("Please enter all fields");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8080/banking/accounts/`, JSON.stringify({
                "accountHolderName": data.accountHolderName,
                "accountNumber": data.accountNumber,
                "mobileNumber": data.mobileNumber,
                "bankName": data.bankName
            }), {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log("response of registration details :", response.data)
            alert("Account has been registered successfully");
            navigate('/');

        } catch (error) {
            console.error('Error fetching data:', error);
            //checks against response..
            if (error.response) {
                if (error.response.status === 400) {
                    console.error('Bad Request. Check if your request is properly formatted.');
                } else if (error.response.status === 405) {
                    alert('Account already exist.Please visit Account Details section');
                    navigate('/account/holder');
                } else if (error.response.status === 302) {
                    alert('Account already exist.Please visit Account Details section');
                    navigate('/account/holder');
                }else {
                    console.error('Unexpected error:', error.response.status);
                }
            }
            //checks against request we made..
            else if (error.request) {
                console.error('No response received from the server');
            }
            //Error due to neither response nor request ..
            else {
                console.error('Error setting up the request:', error.message);
            }

        }
    }
    return (
        <>
            ( <div className="register">
                <div className="registerInnerMain">
                    <form className='formregister' onSubmit={submitHandler} method="POST">
                        <input type="text" autoComplete="off" placeholder='Account Holder Name' name="accountHolderName" value={data.name} onChange={changeHandler} />
                        <input type="text" autoComplete="off" placeholder='Account Number' name="accountNumber" value={data.accountnumber} onChange={changeHandler} />
                        <input type="text" autoComplete="off" placeholder='Mobile Number' name="mobileNumber" value={data.mobile} onChange={changeHandler} />
                        <input type="text" autoComplete="off" placeholder='Bank Name' name="bankName" value={data.bankname} onChange={changeHandler} />
                        <div className='divsubmit'>
                            <input type="submit" className='submit' value='Register' />
                        </div>
                    </form>
                </div>
            </div>)
        </>
    )
}
export default AccountRegistration;