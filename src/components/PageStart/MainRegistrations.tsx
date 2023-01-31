import React, { useState } from 'react';
import { TextField, Box, Container, Avatar, Typography, FormControlLabel, Checkbox, Button, Grid, Link, Paper } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { margin } from '@mui/system';

function MainRegistrations() {
  const [isSing, setIsSing] = useState(true)
  const [isCheckedRules, setIsCheckedRules] = useState(false)
  const [isCheckedRememberUser, setIsCheckedRememberUser] = useState(false)
  const [onSubmit, setOnSubmit] = useState(
    {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  }
  )

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
  }

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    console.log(onSubmit)
    // ОТПРАВКА ДАННЫХ НА СЕРВЕР
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
                <TextField
                  error
                  required
                  fullWidth
                  name="password"
                  value={onSubmit.password}
                  onChange={handleOnChangeTextField}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText="Ошибочный ввод"

                />
              </Grid>
              <Grid item xs={12}>

                {isSing ?
                  <FormControlLabel
                    control={<Checkbox
                      //  value="allowExtraEmails" 
                      checked={isCheckedRememberUser} onChange={handleRememberUser}
                      color="primary" />}
                    label="Запомнить меня"
                  /> :
                  <FormControlLabel
                    control={<Checkbox
                      //  value="allowExtraEmails" 
                      checked={isCheckedRules} onChange={handleCheckedRules}
                      color="primary" />}
                    label="Я принимаю правила, которых нет"
                  />
                }




              </Grid>
            </Grid>
            <Button
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