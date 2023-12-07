import { Tab, TabList, Tabs } from '@mui/joy';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import { useState } from 'react';

import { adminTabList, navigationBarTitles } from '../../constants';
import { icons } from '../../theme/icons/icons';

import classes from './AsidePanel.module.scss';

const Aside = styled.aside`
    height: 100vh;
    min-width: 275px;
    box-sizing: border-box;
    position: relative;
    background-color: var(--friendly-palette-primary-900);
    color: var(--friendly-palette-shades-50);
    border-right: 1px solid var(--friendly-palette-primary-900);
    padding-top: 23px;
`;

const AsidePanel = () => {
    const navigate = useNavigate();
    const URLPart = useLocation();
    const [activeTab, setActiveTab] = useState(URLPart.pathname.includes('default_board') ? adminTabList[0].path : URLPart.pathname);
    const iconList = [
        icons.backpack(`var(--friendly-palette-${activeTab === adminTabList[0].path ? 'shades-50' : 'primary-400'})`),
        icons.backpack(`var(--friendly-palette-${activeTab === adminTabList[1].path ? 'shades-50' : 'primary-400'})`)
    ];

    const changeTabHandler = (event: any, value: any) => {
        navigate(value);
        setActiveTab(value);
    };

    return <Aside>
        <div className={classes.drawerHeader}>
            <span className={classes.drawerHeaderIcon}>{icons.listUl}</span>
            <span className={classes.drawerHeaderText}>{navigationBarTitles.drawerHeader}</span>
        </div>
        <div className={classes.drawerSubHeader}>
            <span className={classes.drawerSubHeaderIcon}>{icons.tree}</span>
            <span className={classes.drawerSubHeaderText}>{navigationBarTitles.drawerSubheader}</span>
        </div>
        <Tabs
            aria-label="Vertical panel"
            orientation="vertical"
            onChange={changeTabHandler}
            value={activeTab}
        >
            <TabList sx={{
                width: '100%', backgroundColor: 'var(--friendly-palette-primary-900)',
                padding: '8px 14px 8px 0',
                '& .MuiTab-root': {
                    color: 'var(--friendly-palette-shades-50)',
                    '&:not(.Mui-selected, [aria-selected="true"], .Mui-disabled)': {
                        color: 'var(--friendly-palette-primary-400)',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            color: 'var(--friendly-palette-primary-400)'
                        }
                    },
                    '&::after': {
                        width: 0,
                        display: 'none'
                    }
                },
                '& .MuiTab-root.Mui-disabled': {
                    color: 'var(--friendly-palette-shades-50)'
                },
                '& .MuiTab-root.Mui-selected': { backgroundColor: 'var(--friendly-palette-secondary-900)' }
            }
            } >
                <Tab disabled sx={{
                    fontSize: '13px',
                    fontWeight: 500,
                    fontFamily: 'Open Sans, sans-serif',
                    paddingLeft: '26px'
                }}>
                    {navigationBarTitles.navigatingListHeader}
                </Tab>
                {adminTabList.map((listItem, index) => (
                    <Tab
                        key={listItem.title}
                        data-testid={listItem.path}
                        value={listItem.path}
                        sx={{
                            padding: '8px 16px',
                            borderRadius: '15px',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0
                        }}
                        disabled={listItem.disabled}
                    >
                        <span className={classes.listItemIcon}>
                            {iconList[index]}
                        </span>
                        <span className={classes.listItemText}>{listItem.title}</span>
                    </Tab>
                ))}
            </TabList>
        </Tabs>
    </Aside >;
};

export default AsidePanel;
