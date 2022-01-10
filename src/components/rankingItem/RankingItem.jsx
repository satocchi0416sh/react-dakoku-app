import { Avatar, Button, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const RankingItem = () => {

    const list = [
        { userId: 1, date: "2022-12-09", time: 70 },
        { userId: 1, date: "2022-12-10", time: 70 },
        { userId: 1, date: "2022-12-11", time: 70 },
        { userId: 1, date: "2022-12-12", time: 80 },
        { userId: 1, date: "2022-12-13", time: 150 },
        { userId: 1, date: "2022-12-14", time: 420 },
        { userId: 1, date: "2022-12-15", time: 320 },
        { userId: 1, date: "2022-12-16", time: 120 },
        { userId: 1, date: "2022-12-17", time: 220 },
        { userId: 1, date: "2022-12-18", time: 120 },
    ]

    const [sum, setSum] = useState()

    useEffect(() => {
        let n = 0;
        for (let i = 0; i < list.length; i++) {
            n += list[i].time;
        }
        setSum(n);
        console.log(n)
    })

    const name = (id) => {
        if (id === 1) {
            return "けんた";
        }
        else if (id === 2) {
            return "せな";
        }
        else if (id === 3) {
            return "さと";
        }
    }

    const time = (minute) => {
        var hour = Math.floor(minute / 60);
        var min = minute % 60;
        return {
            hour: hour,
            min: min
        }
    }

    return (
        <>
            <ListItem divider sx={{ width: "100%", my: 4 }} secondaryAction={<Typography color="secondary">{`${time(sum).hour}h ${time(sum).min}min `}</Typography>}>
                <ListItemAvatar>
                    <Avatar alt={name(list[0].userId)} src="https://picsum.photos/200" />
                </ListItemAvatar>
                <ListItemText primary={name(list[0].userId)} />
            </ListItem>
        </>
    )
}

export default RankingItem
