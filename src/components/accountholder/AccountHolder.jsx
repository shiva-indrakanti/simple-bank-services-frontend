import { useState } from 'react';
import Account from '../account/Account';
import './Balance.css'
import axios from 'axios';
const AccountHolder = () => {

    //usestate
    const [number, setNumber] = useState("")
    const [account, setAccount] = useState({});

    const [modal, setModal] = useState(false);

    //on change 
    const changeHandler = (event) => {
        setNumber(event.target.value)
    }


    //submit Handler
    const submitHandler = (e) => {
        e.preventDefault();

        console.log('number', number);

        axios.get(`http://localhost:8080/banking/account/${number}`, {
            headers: {
                'accept': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(result => {
                setAccount(result)
                setModal(true);
            })
            .catch(error => {
                //checks  against response
                if (error.response) {
                    if (error.response.status === 400) {
                        console.error('Bad Request. Check if your request is properly formatted.');
                    } else if (error.response.status === 404) {
                        alert('Account not found.');
                        setNumber("");
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

            });
    };

    return (
        <div className="main">
            {!modal ? (<div className='inputdiv'>
                <form className='form' method='GET' onSubmit={submitHandler}>
                    <input id="number" autoComplete="off" placeholder='Account Number' type='text' name="Account Number" value={number} onChange={changeHandler} />
                    <input id="submit" type='submit' />
                </form>
            </div>) :

                (<div>
                    <Account balance={account.balance}
                        name={account.accountHolderName}
                        accountnumber={account.accountNumber}
                        bankname={account.bankName}
                        mobile={account.mobileNumber}
                    />
                </div>)}

        </div>
    )
}
export default AccountHolder; 