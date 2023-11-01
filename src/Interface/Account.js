
import React from 'react';
import AccountMenu from './MenuAccount/AccountMenu';
import Navbar from './Navbar/navbar';
import NewsBox from './NewsBox/NewsBox';
import EditAccountBox from './MenuAccount/EditAccountBox';

const Account = () => {
    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column', alignitems: "center", height: "100vh", backgroundColor: "#f0f0f0" }}>
        <Navbar width={"100%"} style={{ position: 'sticky', top: '0', zIndex: '100' }}></Navbar>
        <div style={{ display: 'flex', alignItems: 'center'}}>
        <div className='AccountMenu' style={{marginTop: "10%", marginLeft:"15%"}}>
            <AccountMenu/>
            </div>
        <div className='EditAccountBox' style={{marginLeft: "5%", marginTop: "5%"}}>
            <EditAccountBox/>
            </div>
        </div>
        </div>
    );
}

export default Account;
