import {Routes,Route } from 'react-router-dom';
import './App.css';
import AccountRegistration from './components/accountregistration/AccountRegistration';
import Deposit from './components/deposit/Deposit';
import Home from './components/home/Home';
import Withdraw from './components//withdraw/Withdraw';
import Navbar from './components/navbar/Navbar';
import AccountHolder from './components/accountholder/AccountHolder';
import Account from './components/account/Account';

function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/account-register" element={<AccountRegistration />} />
          <Route exact path="/account/deposit"  element={<Deposit />} />
          <Route exact path="/account/withdraw" element={<Withdraw />} />
          <Route exact path="/account/holder"  element={<AccountHolder/>} />
          <Route exact path="/account"  element={<Account/>} />
        </Routes>

    </div>
  );
}

export default App;
