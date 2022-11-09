import React, { useEffect } from 'react';
import Sheet from 'x-data-spreadsheet';
import { connect } from 'react-redux';
import { fetchPageData } from 'lib/redux/slices/notion';

const getSheetOptions = (data = {}) => {
    const { mode = 'edit' } = data;
    return {
        mode,
        showToolbar: true,
        showGrid: true,
        showContextmenu: true,
        view: {
            height: () => document.documentElement.clientHeight,
            width: () => document.documentElement.clientWidth,
        },
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

const sampleData = {
    name: 'sheet2',
    freeze: 'A1',
    styles: [],
    merges: [],
    rows: {
        6: {
            cells: {
                3: {
                    text: 'sdf',
                },
            },
        },
        len: 100,
    },
    cols: {
        len: 26,
    },
    validations: [],
    autofilter: {},
};

const Spreadsheet = (props) => {
    const { notionState = {}, fetchPageData } = props;
    const { notionData, tableData } = notionState;

    const sheetOptions = getSheetOptions();

    useEffect(() => {
        console.log(tableData);
        console.log(sampleData);
        if (tableData) {
            const s = new Sheet('#x-spreadsheet-demo', sheetOptions)
                .loadData(tableData)
                .change((data) => {
                    console.log(data);
                });
            s.validate();
        }
    }, [tableData]); // eslint-disable-line

    useEffect(() => {
        if (notionData) {
            fetchPageData(notionData.duplicated_template_id);
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Spreadsheet);
