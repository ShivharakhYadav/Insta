import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { Button, Box, Grid, Paper, TextField, Typography, Container } from "@mui/material";
import styles from "./CommonCSS";
import actions from "../store/actions/actionTypes";
import { useDispatch } from "react-redux";

function Register() {
    const classes = styles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [details, setDetails] = useState({
        username: '',
        name: '',
        password: '',
        emailorphone: ''
    })
    const [erros, setErrors] = useState<any>({
        username: false,
        name: false,
        password: false,
        emailorphone: false
    })

    useEffect(() => {
        let data = localStorage.getItem("instaUser");
        if (data) {
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

    const registerUser = () => {
        let error = false;
        //Checking for Errors
        for (const [key, value] of Object.entries(details)) {
            if (!value) {
                error = true;
                setErrors((erros: any) => {
                    let obj = { ...erros, [key]: true }
                    return obj;
                })
            }
        }

        //Api call for Register a New User
        if (!error) {
            fetch(`http://localhost:4100/register`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(details)
            }).then((response) => {
                response.json().then((result) => {
                    if (result.success === true) {
                        navigate('/');
                    }
                })
            }).catch((err) => {
                const information = { open: true, message: "Internal Server Error", type: "error" }
                dispatch({ type: actions.SHOW_INFORATION, payload: information })
            })
        }
    }
    return (<>
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
                    //bgcolor={"#678983"}
                    bgcolor="#98bfb8"
                    xs={12} sm={6} md={6} lg={5} xl={5}
                >
                    <Box>
                        <Typography variant='h4'>Create Account</Typography>
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
                        <TextField id="filled-basic" label="Name" variant="outlined" className={classes.textFiledStyle}
                            name="name"
                            value={details.name}
                            onChange={onChangeMethod}
                            error={erros.name}
                            helperText={erros.name && "Enter name"}
                        />
                    </Box>
                    <Box>
                        <TextField id="filled-basic" label="Username" variant="outlined" className={classes.textFiledStyle}
                            name="username"
                            value={details.username}
                            onChange={onChangeMethod}
                            error={erros.username}
                            helperText={erros.username && "Enter username"}
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
                        <Link to='/'>Already User</Link>
                    </Box>
                    <Box>
                        <Button variant="contained" className={classes.buttonStyle} onClick={registerUser}>Sign up</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </>
    )
}
export default Register;