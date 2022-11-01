import React, { useEffect } from 'react';
import { SiNotion } from 'react-icons/si';
import { useLocation } from 'react-router-dom';

import { showBackdrop, showSnackbar } from 'lib/redux/slices/global';
import { connect } from 'react-redux';
import { fetchNotionData } from 'lib/redux/slices/notion';

const authURL =
    'https://api.notion.com/v1/oauth/authorize?client_id=fdafbe62-17d4-4c9a-8308-35296427991c&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A3000';

const Login = (props) => {
    const { showSnackbar, showBackdrop, fetchNotionData } = props;
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const code = queryParams.get('code');
    const error = queryParams.get('error');

    useEffect(() => {
        if (!!error?.trim()) {
            showSnackbar({ message: 'Access Denied!', type: 'error' });
            return;
        }
        if (!!code?.trim()) {
            localStorage.setItem('code', code);
            // showSnackbar({
            //     message: 'Authorization Successful!',
            //     type: 'success',
            // });
            fetchNotionData(code);
            showSnackbar({
                message: 'Fetching Data',
                type: 'info',
            });
            showBackdrop();
        }
    }, [code]); // eslint-disable-line

    return (
        <div className='login-page-wrapper'>
            <div className='login-page'>
                <h2 className='lp-heading'>Spreadsheet - Notion Plugin</h2>
                <a
                    href={authURL}
                    className='login-button'
                    onClick={showBackdrop}
                >
                    <SiNotion className='icon' />
                    <span className='text'>Authorize Notion</span>
                </a>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        showSnackbar: (data) => dispatch(showSnackbar(data)),
        showBackdrop: () => dispatch(showBackdrop()),
        fetchNotionData: (code) => dispatch(fetchNotionData(code)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
