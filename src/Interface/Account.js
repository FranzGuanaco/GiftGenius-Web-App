
import React from 'react';
import AccountMenu from './MenuAccount/AccountMenu';
import Navbar from './Navbar/navbar';
import NewsBox from './NewsBox/NewsBox';

const Account = () => {
    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
        <Navbar width={"100%"} style={{ position: 'sticky', top: '0', zIndex: '100' }}></Navbar>

            <AccountMenu/>
        </div>
    );
}

export default Account;
