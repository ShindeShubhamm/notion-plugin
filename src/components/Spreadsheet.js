import React, { useEffect } from 'react';
import Sheet from 'x-data-spreadsheet';
import { connect } from 'react-redux';
import { fetchPageData, searchNotionData } from 'lib/redux/slices/notion';

const getSheetOptions = (data = {}) => {
    const { mode = 'edit' } = data;
    return {
        mode,
        showToolbar: true,
        showGrid: true,
        showContextmenu: true,
        // view: {
        //     height: () => '1155px',
        //     width: () => '729px',
        // },
        row: {
            len: 100,
            height: 25,
        },
        col: {
            len: 26,
            width: 100,
            indexWidth: 60,
            minWidth: 60,
        },
        style: {
            bgcolor: '#ffffff',
            align: 'left',
            valign: 'middle',
            textwrap: false,
            strike: false,
            underline: false,
            color: '#0a0a0a',
            font: {
                name: 'Inter',
                size: 10,
                bold: false,
                italic: false,
            },
        },
    };
};

const Spreadsheet = (props) => {
    const {
        notionState = {},
        pageData = {},
        fetchPageData,
        searchNotionData,
    } = props;
    const { notionData } = notionState;

    const sheetOptions = getSheetOptions();

    useEffect(() => {
        const s = new Sheet('#x-spreadsheet-demo', sheetOptions)
            .loadData({})
            .change((data) => {});

        s.validate();
    }, []); // eslint-disable-line

    console.log(pageData);

    useEffect(() => {
        if (notionData) {
            fetchPageData(notionData.duplicated_template_id);
            searchNotionData();
        }
    }, [notionData]); // eslint-disable-line

    return (
        <div>
            Spreadsheet Component
            <div id='x-spreadsheet-demo'></div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        notionState: state.notion,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPageData: (pageId) => dispatch(fetchPageData(pageId)),
        searchNotionData: () => dispatch(searchNotionData()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Spreadsheet);
