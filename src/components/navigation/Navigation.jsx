import { Home, MilitaryTech } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Navigation = ({ page, changePage }) => {
    const history = useHistory()

    useEffect(() => {
        if (page === "ホーム") {
            history.push("/")
        }

        else if (page === "ランキング")
            history.push("/ranking")
    }, [page]);

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={page}
                onChange={(event, newValue) => {
                    changePage(newValue);
                }}
            >
                <BottomNavigationAction label="ホーム" value="ホーム" icon={<Home />} />
                <BottomNavigationAction label="ランキング" value="ランキング" icon={< MilitaryTech />} />
            </BottomNavigation>
        </Paper>
    )
}

export default Navigation
