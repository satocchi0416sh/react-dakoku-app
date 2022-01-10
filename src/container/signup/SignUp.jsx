import { useEffect, useState } from "react"
import { useHistory, Link } from 'react-router-dom';
import api from "../../components/items/api"
import { Avatar, Button, CircularProgress, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Check, LockOutlined } from "@mui/icons-material";
import { storage } from "../../components/items/firebase";

function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passCheck, setPassCheck] = useState("")
    const [passErr, setPassErr] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const history = useHistory();
    const [image, setImage] = useState("")
    const [preview, setPreview] = useState("")
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        console.log(image)
        setLoaded(false);
        if (image !== "") {
            let blob = new Blob([image], { type: "image/jpeg" })
            const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
            const N = 30;
            const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n % S.length]).join('');
            const uploadRef = storage.ref("images").child(fileName);
            const uploadTask = uploadRef.put(blob);
            uploadTask.then(() => {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    console.log(url)
                    setPreview(url)
                }
                )
            })
        }
    }, [image])

    useEffect(() => {
        setLoaded(true);
    }, [preview])

    /*登録ボタンが押されたとき */
    const register = (e) => {
        e.preventDefault()
        setPassErr(false)
        if (password === passCheck) {
            api.post("signupA", {
                username: name,
                email: email,
                password: password,
                userImage: preview
            }).then((response) => {
                console.log(response.data)
                if (response.data.result) {
                    setIsRegistered(true)
                } else {
                    alert("このメールアドレスは既に登録されています")
                }
            })
        } else {
            setPassErr(true)
        }

    }



    /*ログインページに行く */
    const goLogin = () => {
        history.push("/login")
    }
    const backpage = () => {
        history.goBack()
    }

    return (
        <>
            {
                !isRegistered ?
                    <>
                        < Container component="main" maxWidth="xs" >
                            <CssBaseline />
                            <Box
                                sx={{
                                    mt: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, }}>
                                    {image === "" ? <LockOutlined /> : <>{!loaded ? <CircularProgress /> : <img style={{ width: "100%" }} alt="" src={preview} />}</>}
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    新規登録
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
                                                onChange={(e) => { setName(e.target.value) }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="メールアドレス"
                                                name="email"
                                                autoComplete="email"
                                                onChange={(e) => { setEmail(e.target.value) }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="file"
                                                required
                                                fullWidth
                                                id="profile"
                                                label="プロフィール画像"
                                                name="profile"
                                                autoComplete="profile"
                                                accept="image/*"
                                                onChange={(e) => { setImage(e.target.files[0]) }} />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="password"
                                                label="パスワード"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                                onChange={(e) => { setPassword(e.target.value) }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                error={passErr}
                                                helperText={passErr ? "パスワードが一致しません" : null}
                                                name="password"
                                                label="パスワード(確認)"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                                onChange={(e) => { setPassCheck(e.target.value) }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        onClick={register}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        新規登録
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link onClick={backpage} variant="body2">
                                                戻る
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link to="/login" variant="body2">
                                                アカウント既に持っている場合はログイン
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Container >
                    </ >
                    :
                    <>
                        <Container component="main" maxWidth="xs">
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
                                    <Check />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    新規登録が完了しました。
                                </Typography>
                                <Typography component="h1" variant="body1" sx={{ mt: 2 }}>
                                    ログインしてサービスをお楽しみください。
                                </Typography>
                                <Button
                                    onClick={goLogin}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    ログインする
                                </Button>
                            </Box>
                        </Container>
                    </>
            }
        </>
    )
}
export default SignUp