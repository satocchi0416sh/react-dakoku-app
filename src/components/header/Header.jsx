import { Google } from '@mui/icons-material'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useHistory } from 'react-router-dom'
const Header = ({ page, changePage }) => {

    const history = useHistory()

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => { history.push("/"); changePage("ホーム") }}
                        >
                            <Google />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Arklet 入退室アプリ - <Typography component={"span"} variant="body1">{page}</Typography>
                        </Typography>
                        <Button onClick={() => history.push("/login")} color="inherit">ログイン</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Header
