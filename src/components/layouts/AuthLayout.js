import React from 'react';

const AuthLayout = (props) => {
    const { children } = props;

    return (
        <div className='auth-layout'>
            <h2 className='al-heading'>Spreadsheet - Notion Plugin</h2>
            <div className='al-children'>{children}</div>
        </div>
    );
};

export default AuthLayout;
