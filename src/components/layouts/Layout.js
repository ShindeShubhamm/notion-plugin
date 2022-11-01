import React from 'react';

const Layout = (props) => {
    const { children } = props;

    return (
        <div className='layout'>
            <h2 className='heading'>Spreadsheet PLUGIN</h2>
            <div className='l-children'>{children}</div>
        </div>
    );
};

export default Layout;
