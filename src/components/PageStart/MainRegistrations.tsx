import React, { useState } from 'react';
import { TextField, Box, Container, Avatar, Typography, FormControlLabel, Checkbox, Button, Grid, Link, Paper, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Visibility, VisibilityOff } from '@mui/icons-material';


function MainRegistrations() {
  const [isSing, setIsSing] = useState(true)
  const [isCheckedRules, setIsCheckedRules] = useState(false)
  const [isCheckedRememberUser, setIsCheckedRememberUser] = useState(false)
  const [isValidForm, setisValidForm] = useState(
    {
      firstName: true,
      lastName: true,
      password: false,
      email: false,
    }
  )
  const [onSubmit, setOnSubmit] = useState(
    {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
    }
  )

  console.log('XXX-isValidForm', isValidForm)
  console.log('YYY-onSubmit', onSubmit)

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };



  const handleValidvalidEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const target = e.target
    if (EMAIL_REGEXP.test(target.value)) {
      setisValidForm((prev) => ({
        ...prev,
        [e.target.name]: true
      })
      )
    } else {
      setisValidForm((prev) => ({
        ...prev,
        [e.target.name]: false
      })
      )
    }
  }

  const handleValidvalidPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target

    setOnSubmit((prev) => ({
      ...prev,
      [target.name]: target.value.trim()
    }))

    if (target.value.length > 2) {
      setisValidForm((prev) => ({
        ...prev,
        [e.target.name]: true
      })
      )
    } else {
      setisValidForm((prev) => ({
        ...prev,
        [e.target.name]: false
      })
      )
    }
  }

  const handleValidvalidName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target

    setOnSubmit((prev) => ({
      ...prev,
      [target.name]: target.value.replace(/[^a-z^A-Z\s^А-ЯЁ^а-яё]/g, "")
    }))

    if (target.value.length > 2) {
      setisValidForm((prev) => ({
        ...prev,
        [e.target.name]: true
      })
      )
    } else {
      setisValidForm((prev) => ({
        ...prev,
        [e.target.name]: false
      })
      )
    }
  }



  const handleRememberUser = () => {
    setIsCheckedRememberUser(!isCheckedRememberUser);
  };

  const handleCheckedRules = () => {
    setIsCheckedRules(!isCheckedRules);
  };

  const handleOnChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnSubmit((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    })
    )
    if (e.target.name === 'email') { handleValidvalidEmail(e) }
    if (e.target.name === 'password') { handleValidvalidPassword(e) }
    if (e.target.name === 'firstName' || e.target.name === 'lastName') { handleValidvalidName(e) }

  }

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()


    // ОТПРАВКА ДАННЫХ НА СЕРВЕР
    
    
    console.log('НЕ УСПЕХ ПРОВЕРЬТЕ ДАННЫЕ', onSubmit) 
    console.log('УСПЕХ Регистрации', onSubmit) 
    console.log('УСПЕХ Входа', onSubmit)
  }

  return (
    <Container component="main"
      maxWidth='md'
      sx={{
        display: 'flex',
        flexGrow: '1',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // maxWidth: '600px',
      }}
    >
      <Paper elevation={8} sx={{ padding: 5, marginBottom: 5, width: '100%' }}>
        <Box display='flex' flexDirection={'column'}
          sx={{
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSing ? 'Вход в аккаунт' : 'Регистрация'}
          </Typography>
          <Box
            component="form"
            noValidate sx={{ mt: 3 }}
            onSubmit={handleSubmitForm}
          >
            <Grid container spacing={2}>
              {
                !isSing && <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={(onSubmit.firstName === '') ? false : isValidForm.firstName ? false : true}
                      helperText={(onSubmit.firstName === '') ? " " : isValidForm.firstName ? " " : 'Ошибочный ввод длина не менее трёх символов'}
                      autoComplete="given-name"
                      name="firstName"
                      value={onSubmit.firstName}
                      onChange={handleOnChangeTextField}
                      required
                      fullWidth
                      id="firstName"
                      label="Имя"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={(onSubmit.lastName === '') ? false : isValidForm.lastName ? false : true}
                      helperText={(onSubmit.lastName === '') ? " " : isValidForm.lastName ? " " : 'Ошибочный ввод длина не менее трёх символов'}
                      required
                      fullWidth
                      id="lastName"
                      label="Фамилия"
                      name="lastName"
                      value={onSubmit.lastName}
                      onChange={handleOnChangeTextField}
                      autoComplete="family-name"
                    />
                  </Grid>
                </>
              }
              <Grid item xs={12}>
                <TextField
                  error={(onSubmit.email === '') ? false : isValidForm.email ? false : true}
                  helperText={(onSubmit.email === '') ? " " : isValidForm.email ? " " : 'Ошибочный ввод email'}
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={onSubmit.email}
                  onChange={handleOnChangeTextField}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  error={(onSubmit.password === '') ? false : isValidForm.password ? false : true}
                  helperText={(onSubmit.password === '') ? " " : isValidForm.password ? " " : 'Ошибочный ввод длина не менее трёх символов'}
                  required
                  fullWidth
                  name="password"
                  value={onSubmit.password}
                  onChange={handleOnChangeTextField}
                  label="Password"
                  // type="password"
                  type={showPassword ? 'text' : 'password'}

                  id="password"
                  autoComplete="new-password"

                /> */}

                <FormControl    fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">{(onSubmit.password === '') ? "Password*" : isValidForm.password ? "Password*" : 'Ошибка'}</InputLabel>
                  <OutlinedInput
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    error={(onSubmit.password === '') ? false : isValidForm.password ? false : true}
                    // helperText={(onSubmit.password === '') ? " " : isValidForm.password ? " " : 'Ошибочный ввод длина не менее трёх символов'}
                    required
                    fullWidth
                    name="password"
                    value={onSubmit.password}
                    onChange={handleOnChangeTextField}
                    label="Password"
                    // type="password"
                    type={showPassword ? 'text' : 'password'}
                      id="password"
                    autoComplete="new-password"
                  />
                </FormControl>



              </Grid>
              <Grid item xs={12}>

                {isSing ?
                  <FormControlLabel
                    control={<Checkbox
                      //  value="allowExtraEmails" 
                      checked={isCheckedRememberUser}
                      onChange={handleRememberUser}
                      color="primary" />}
                    label="Запомнить меня"
                  /> :
                  <FormControlLabel
                    control={<Checkbox
                      //  value="allowExtraEmails" 
                      checked={isCheckedRules}
                      onChange={handleCheckedRules}
                      color="primary" />}
                    label="Я принимаю правила, которых нет"
                  />
                }

              </Grid>
            </Grid>
            <Button
              // disabled={true}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isSing ? "Войти" : "Зарегистрироваться"}

            </Button>
            <Button

              // variant='contained'
              // type="submit"
              fullWidth
              // variant="contained"
              sx={{ mt: 1, mb: 1 }}
              onClick={() => {
                setIsSing(!isSing)
                // setIsCheckedRules(false)
                // setIsCheckedRememberUser(false)
                setOnSubmit({
                  firstName: "",
                  lastName: "",
                  password: "",
                  email: "",
                })
              }}
            >
              {isSing ? "Перейти к регистрации" : "Перейти ко Входу"}

            </Button>
          </Box>
        </Box>
      </Paper>

    </Container>
  );
}

export default MainRegistrations;