import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../items/api"
import "./Profile.css"
import { Avatar, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { AccountCircle, Edit } from "@mui/icons-material"


function Profile(props) {
    const { id } = props
    const [editMode, setEditMode] = useState(false)
    const [newName, setNewName] = useState("")
    const { userId } = useParams()

    useEffect(() => {
        api.get(`getUserInfo/${id}`)
            .then((response) => {
                console.log(response.data)
                setNewName(response.data.username)
            })
    }, [id])

    const editInfo = () => {
        api.post("editUserInfo", {
            userId: id,
            name: newName,
        })
        setEditMode(false)
    }

    return (
        <div className="profile-page">
            <Container>
                {editMode ?
                    <>
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <Edit />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                編集
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="Name"
                                            required
                                            fullWidth
                                            id="Name"
                                            label="ユーザーネーム"
                                            autoFocus
                                            value={newName}
                                            onChange={(e) => { setNewName(e.target.value) }}
                                        />
                                    </Grid>

                                </Grid>
                                <Button
                                    onClick={editInfo}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    決定
                                </Button>
                            </Box>
                        </Box>
                    </ >

                    :
                    <>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <AccountCircle />
                            </Avatar>
                            <Typography variant="h5" component="h1">
                                {newName}
                            </Typography>
                            {Number(userId) === id ?
                                <>
                                    <Button
                                        onClick={() => { setEditMode(true) }}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        プロフィールを編集する
                                    </Button>
                                </>
                                : null
                            }
                        </Box>
                    </>
                }
            </Container>
        </div>

    )
}
export default Profile