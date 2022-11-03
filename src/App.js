import React, { useEffect } from 'react';
import AppRouter from './router/AppRouter';

import { connect } from 'react-redux';
import Snackbar from 'components/ui/Snackbar';
import { closeSnackbar } from 'lib/redux/slices/global';
import Backdrop from 'components/ui/Backdrop';
import { populateNotionData } from 'lib/redux/slices/notion';

import 'styles/global.scss';

const App = (props) => {
    const {
        global: { snackbar, backdrop },
        closeSnackbar,
        populateNotionData,
    } = props;

    useEffect(() => {
        if (!!localStorage.getItem('notion')?.trim()) {
            const notionData = JSON.parse(localStorage.getItem('notion'));
            populateNotionData(notionData);
        }
    }, []); // eslint-disable-line

    return (
        <div className='App'>
            <AppRouter />
            <Snackbar {...snackbar} closeSnackbar={closeSnackbar} />
            <Backdrop open={backdrop} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        global: state.global,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeSnackbar: () => dispatch(closeSnackbar()),
        populateNotionData: (data) => dispatch(populateNotionData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
