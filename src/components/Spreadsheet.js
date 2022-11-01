import React, { useEffect } from 'react';
import Sheet from 'x-data-spreadsheet';

// AUTHORIZATION URL: https://api.notion.com/v1/oauth/authorize?client_id=fdafbe62-17d4-4c9a-8308-35296427991c&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A3000

// NOTION PAGE URL: https://shindeshubhamm.notion.site/Spreadsheet-Public-753bcd6951634806b90b646fb5c079f8

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
                name: 'Helvetica',
                size: 10,
                bold: false,
                italic: false,
            },
        },
    };
};

const Spreadsheet = (props) => {
    const sheetOptions = getSheetOptions();

    useEffect(() => {
        const s = new Sheet('#x-spreadsheet-demo', sheetOptions)
            .loadData({})
            .change((data) => {});

        s.validate();
    }, []); // eslint-disable-line
    return (
        <div>
            Spreadsheet Component
            <div id='x-spreadsheet-demo'></div>
        </div>
    );
};

export default Spreadsheet;
