import { Tab, TabList, Tabs } from '@mui/joy';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

import { adminTabList } from '../../constants';
import { icons } from '../../theme/icons/icons';
import useLastPartLocation from '../../utils/useLastPartLocation';

import classes from './Drawer.module.scss';
import { useState } from 'react';

const Aside = styled.aside`
width: 240px;
box-sizing: border-box;
position: relative;
background-color: var(--friendly-palette-primary-900);
color: var(--friendly-palette-shades-50);
border-right: 1px solid var(--friendly-palette-primary-900);
padding: 8px 0 8px 16px;
`;

const Drawer = () => {
    const navigate = useNavigate();
    const URLPart = useLastPartLocation();
    const [activeTab, setActiveTab] = useState(URLPart);
    const iconList = [
        icons.backpack,
        icons.signSpot
    ];

    const changeTabHandler = (event: any, value: any) => {
        navigate(value);
        setActiveTab(value);
    };

    const dashboardList = [{
        testId: 'new_board',
        listTitle: adminTabList[0].title
    }, {
        testId: 'boards_management',
        listTitle: adminTabList[1].title
    }];

    return <Aside>
        <Tabs
            aria-label="Vertical tabs"
            orientation="vertical"
            sx={{ minWidth: 'calc(240px - 16px)' }}
            onChange={changeTabHandler}
            value={activeTab}
        >
            <TabList sx={{
                width: '100%', backgroundColor: 'var(--friendly-palette-primary-900)',
                '& .MuiTab-root': {
                    color: 'var(--friendly-palette-shades-50)',
                    '&:not(.Mui-selected, [aria-selected="true"]):hover':
                        { backgroundColor: 'rgba(0, 0, 0, 0.04)', color: 'var(--friendly-palette-shades-50)' },
                    '&::after': {
                        width: 0,
                        display: 'none'
                    }
                },
                '& .MuiTab-root.Mui-selected': { backgroundColor: 'var(--friendly-palette-secondary-900)' }
            }}>
                {dashboardList.map((listItem, index) => (
                    <Tab
                        key={listItem.listTitle}
                        data-testid={listItem.testId}
                        value={listItem.testId}
                        sx={{
                            padding: '8px 16px',
                            borderRadius: '10px',
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0
                        }}
                    >
                        <span className={classes.listItemIcon}>
                            {iconList[index]}
                        </span>
                        <span style={{ width: '100%' }}>{listItem.listTitle}</span>
                    </Tab>
                ))}
            </TabList>
        </Tabs>
    </Aside >;
};

export default Drawer;
