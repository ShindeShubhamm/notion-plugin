import React from 'react';

import { SiNotion } from 'react-icons/si';

const Login = (props) => {
    const authURL =
        'https://api.notion.com/v1/oauth/authorize?client_id=fdafbe62-17d4-4c9a-8308-35296427991c&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A3000';

    return (
        <div className='login-page'>
            <a href={authURL} className='login-button'>
                <SiNotion className='icon' />
                <span className='text'>Authorize Notion</span>
            </a>
        </div>
    );
};

export default Login;
