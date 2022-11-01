import React, { useEffect } from 'react';

const Snackbar = (props) => {
    const { show, message, type, closeSnackbar } = props;

    useEffect(() => {
        if (message) {
            setTimeout(() => closeSnackbar(), 6000);
        }
    }, [message]); // eslint-disable-line

    return (
        <div
            className={`snackbar sn-${type} ${
                !!message?.trim() && show ? `snack-show` : ''
            }`}
        >
            <span className='message'>{message.toString()}</span>
        </div>
    );
};

export default Snackbar;
