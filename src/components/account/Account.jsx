//import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Account.css';

const Account = ({balance,name,accountnumber,bankname,mobile}) => {
 
    return (
       
        <div className='main'>
           <div className='innermain'>
                <h2>Account Details</h2>
                <div className='details'>
                    <p id='name'>Account Name      :<span style={{color:"grey" , fontSize:"20px"}}>{name}</span></p>
                    <p id='balance'>Balance        :<span style={{color:"grey" , fontSize:"20px"  }}>{balance}</span></p>
                    <p id='number'> Account Number:<span style={{color:"grey" , fontSize:"20px"}}>{accountnumber}</span></p>
                    <p id='mobile'>Mobile Number   :<span style={{color:"grey" , fontSize:"20px"}}>{mobile}</span></p>
                    <p id='bank'>Bank Name         :<span style={{color:"grey" , fontSize:"20px"}}>{bankname}</span></p>
                </div>
                <button className='accountbutton'><Link id="buttonlink" to="/">Go to Home</Link></button>
            </div>
			
        </div>
    )
}
export default Account;