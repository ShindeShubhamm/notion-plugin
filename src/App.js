import React from 'react';
import AppRouter from './router/AppRouter';

import 'styles/global.scss';
import { connect } from 'react-redux';
import Snackbar from 'components/ui/Snackbar';
import { closeSnackbar } from 'lib/redux/slices/global';
import Backdrop from 'components/ui/Backdrop';

const App = (props) => {
    const {
        global: { snackbar, backdrop },
        closeSnackbar,
    } = props;

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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
