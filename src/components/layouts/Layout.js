import React from 'react';

const Layout = (props) => {
    const { children } = props;

    return (
        <div className='main-layout'>
            <div className='navbar'>
                <h2 className='l-heading'>Spreadsheet PLUGIN</h2>
                <div className='logout'></div>
            </div>
            <div className='l-children'>{children}</div>
        </div>
    );
};

export default Layout;
