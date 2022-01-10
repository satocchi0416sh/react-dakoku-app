import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Button, Collapse, Container, Divider, List, ListItem, ListItemButton, ListItemText, Paper, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { AvaterItem } from '../../components'
import api from '../../components/items/api'

const Top = ({ changePage, id, isLoggedIn }) => {

    const [enter, setEnter] = useState(0)
    //const [list, setList] = useState();
    const list = [
        { userId: 1, name: "けんた", isEnter: 1, userImage: "https://picsum.photos/200" },
        { userId: 2, name: "さと", isEnter: 0, userImage: "https://picsum.photos/200" },
        { userId: 3, name: "せな", isEnter: 1, userImage: "https://picsum.photos/200" },
    ]

    const [entryOpen, setEntryOpen] = useState(true);
    const [notEntryOpen, setNotEntryOpen] = useState(false);

    const handleClick = () => {
        if (enter) {
            api.post(`leave/${id}`)
            setEnter(0)
        }
        else {
            api.post(`entry/${id}`)
            setEnter(1)
        }
    }

    useEffect(() => {
        api.post()
    }, [enter])

    return (
        <>
            <Container sx={{ mt: 4 }}>
                <List component={Paper}>
                    <ListItemButton onClick={() => setEntryOpen(!entryOpen)}>
                        <ListItemText primary="入室中" />
                        {entryOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={entryOpen} timeout="auto" unmountOnExit>
                        <Divider />
                        <ListItem sx={{ my: 2 }}>
                            <Stack direction={"row"} spacing={2}>
                                {list.map((data) => {
                                    if (data.isEnter)
                                        return (
                                            <AvaterItem key={data.userId} name={data.name} img={data.userImage} />
                                        )
                                })}
                            </Stack>
                        </ListItem>
                    </Collapse>
                </List>
                <List sx={{ mt: 2 }} component={Paper}>
                    <ListItemButton onClick={() => setNotEntryOpen(!notEntryOpen)}>
                        <ListItemText primary="不在" />
                        {notEntryOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={notEntryOpen} timeout="auto" unmountOnExit>
                        <Divider />
                        <ListItem sx={{ my: 2 }}>
                            <Stack direction={"row"} spacing={2}>
                                {list.map((data) => {
                                    if (!data.isEnter)
                                        return (
                                            <AvaterItem key={data.userId} name={data.name} img={data.userImage} />
                                        )
                                })}
                            </Stack>
                        </ListItem>
                    </Collapse>
                </List>
                {isLoggedIn ? <Button sx={{ mt: 2 }} onClick={() => { handleClick(); }}>{enter ? "退室する" : "入室する"}</Button> : null}
            </Container>
        </>
    )
}

export default Top
