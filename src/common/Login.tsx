import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from "../store/actions/actionTypes";
import { Button, Box, Grid, Paper, TextField, Typography, Container } from "@mui/material";
import styles from "./CommonCSS";
function Login() {
    let classes = styles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [details, setDetails] = useState({
        password: '',
        emailorphone: ''
    })

    const [erros, setErrors] = useState<any>({
        password: false,
        emailorphone: false
    })

    useEffect(() => {
        let jsonData = localStorage.getItem("instaUser");
        console.log("")
        if (jsonData !== "undefined" && jsonData !== null) {
            navigate('/homepage');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChangeMethod = (e: any) => {
        let field = e.target.name;
        let value = e.target.value;
        if (value.length > 0) {
            setDetails({ ...details, [field]: e.target.value });
            setErrors({ ...erros, [field]: false })
        }
        else {
            setDetails({ ...details, [field]: e.target.value });
            setErrors({ ...erros, [field]: true })
        }
    }

    const loginUser = () => {
        try {
            let error = false;

            //Added to the errFor object
            for (const [key, value] of Object.entries(details)) {
                if (!value) {
                    error = true;
                    setErrors((erros: any) => {
                        let obj = { ...erros, [key]: true }
                        return obj;
                    })
                }
            }

            //API call for Login
            if (!error) {
                fetch(`http://localhost:4100/login`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(details)
                }).then((response) => {
                    response.json().then((result) => {
                        if (result.success === true) {
                            navigate('/homepage');
                            localStorage.setItem("instaUser", JSON.stringify(result.data));
                            dispatch({ type: actions.SAVE_USER, payload: result.data });
                            const information = { open: true, message: "Login Sucessfully", type: "success" }
                            dispatch({ type: actions.SHOW_INFORATION, payload: information })
                        }
                        else {
                            const information = { open: true, message: "Invalid Credentical Please check", type: "error" }
                            dispatch({ type: actions.SHOW_INFORATION, payload: information })
                        }
                    })
                }).catch((err) => {
                    const information = { open: true, message: JSON.stringify(err), type: "error" }
                    dispatch({ type: actions.SHOW_INFORATION, payload: information })
                    console.log("Dd", err);
                })
            }
        }
        catch (err) {
            const information = { open: true, message: "Internal Server Error", type: "error" }
            dispatch({ type: actions.SHOW_INFORATION, payload: information })
        }

    }

    return (
        <>
            <Container sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}>
                <Grid container className={classes.gridContainer}>
                    <Grid item
                        component={Paper}
                        gap={2}
                        elevation={5}
                        bgcolor="#98bfb8"
                        xs={12} sm={6} md={6} lg={5} xl={5}
                    >
                        <Box>
                            <Typography variant='h4'>Sign In</Typography>
                        </Box>
                        <Box>

                            <TextField id="filled-basic" label="Mobile No or phone" variant="outlined" className={classes.textFiledStyle}
                                name="emailorphone"
                                value={details.emailorphone}
                                onChange={onChangeMethod}
                                error={erros.emailorphone}
                                helperText={erros.emailorphone && "Enter mobile no or phone"}
                            />
                        </Box>
                        <Box>
                            <TextField id="filled-basic" label="Password" variant="outlined" className={classes.textFiledStyle}
                                name="password"
                                value={details.password}
                                onChange={onChangeMethod}
                                error={erros.password}
                                helperText={erros.password && "Enter password"}
                            />
                        </Box>
                        <Box>
                            <Link to='#'>Forgot password?</Link>
                            <Link to='/register'>New User</Link>
                        </Box>
                        <Box>
                            <Button variant="contained" className={classes.buttonStyle} onClick={loginUser}>SIGN IN</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default Login;