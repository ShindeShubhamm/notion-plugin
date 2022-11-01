import React from 'react';

const Backdrop = (props) => {
    const { open } = props;

    return (
        <div className={open ? 'backdrop-open' : 'backdrop-close'}>
            <img
                src='/assets/loading.gif'
                alt='Loading...'
                className='loader'
            />
        </div>
    );
};

export default Backdrop;
