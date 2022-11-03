import React from 'react';
import { SiNotion } from 'react-icons/si';
import { connect } from 'react-redux';

const Layout = (props) => {
    const {
        children,
        notionState: { notionData },
    } = props;

    return (
        <div className='main-layout'>
            <div className='navbar'>
                <div className='n-left'>
                    <SiNotion className='notion-icon' />
                    <h2 className='l-heading'>Notion Spreadsheet Plugin</h2>
                </div>
                <div className='n-right'>
                    <div className='workspace-icon'>
                        <span className='w-icon'>
                            {notionData?.workspace_icon}
                        </span>
                    </div>
                    <div className='workspace-details'>
                        <h4 className='workspace-header'>WORKSPACE</h4>
                        <h2 className='workspace-name'>
                            {notionData?.workspace_name}
                        </h2>
                    </div>
                </div>
            </div>
            <div className='l-children'>{children}</div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        notionState: state.notion,
    };
};

export default connect(mapStateToProps)(Layout);
