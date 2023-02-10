import { useEffect, useState } from 'react';
import {
  TextField,
  Box,
  Container,
  Avatar,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Paper,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Navigate, useLocation } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from '../../../redux/features/service/authService';
import useCookies from 'react-cookie/cjs/useCookies';

function PageStart() {
  const [cookies] = useCookies(['logged_in']);
  const location = useLocation();

  const [createUser, { isLoading: isLoadingRegisredUser, isSuccess: isSuccessRegisredUser }] =
    useRegisterMutation();

  const [loginUser, { isLoading, isSuccess }] = useLoginMutation();

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (isSuccess) setOpenDialog(false);
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessRegisredUser) setOpenDialog(false);
  }, [isSuccessRegisredUser]);

  const [isLogin, setIsLogin] = useState(true);
  const [isCheckedRules, setIsCheckedRules] = useState(false);
  const [isValidForm, setisValidForm] = useState({
    name: false,
    lastname: false,
    email: false,
    password: false
  });
  const [onSubmit, setOnSubmit] = useState({
    name: '',
    lastname: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleValidvalidEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const target = e.target;
    if (EMAIL_REGEXP.test(target.value)) {
      setisValidForm((prev) => ({
        ...prev,
        [e.target.name]: true
      }));
    } else {
      setisValidForm((prev) => ({
        ...prev,
        [e.target.name]: false
      }));
    }
  };

  const handleValidvalidPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    setOnSubmit((prev) => ({
      ...prev,
      [target.name]: target.value.trim()
    }));

    if (target.value.length > 2) {
      setisValidForm((prev) => ({
        ...prev,
        [e.target.name]: true
      }));
    } else {
      setisValidForm((prev) => ({
        ...prev,
        [e.target.name]: false
      }));
    }
  };

  const handleValidvalidName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    setOnSubmit((prev) => ({
      ...prev,
      [target.name]: target.value.replace(/[^a-z^A-Z\s^А-ЯЁ^а-яё]/g, '')
    }));

    if (target.value.length > 2) {
      setisValidForm((prev) => ({
        ...prev,
        [e.target.name]: true
      }));
    } else {
      setisValidForm((prev) => ({
        ...prev,
        [e.target.name]: false
      }));
    }
  };

  const handleCheckedRules = () => {
    setIsCheckedRules(!isCheckedRules);
  };

  const handleOnChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnSubmit((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (e.target.name === 'email') {
      handleValidvalidEmail(e);
    }
    if (e.target.name === 'password') {
      handleValidvalidPassword(e);
    }
    if (e.target.name === 'name' || e.target.name === 'lastname') {
      handleValidvalidName(e);
    }
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    if (!isLoading) setOpenDialog(false);
  };

  if (cookies.logged_in || isSuccess || isSuccessRegisredUser)
    return <Navigate to="/" state={{ from: location }} replace />;

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidArray = Object.values(isValidForm);
    // проверяем есть ли поле имени. Если есть значит выполняется РЕЖИМ ВХОДА
    if (!onSubmit.name) {
      const validForm = isValidArray.slice(-2).every((el) => el);
      if (validForm) {
        loginUser({
          email: onSubmit.email,
          password: onSubmit.password
        });
      }
    } else {
      // ВХОД ОТ РЕЖИМА РЕГИСТРАЦИИ
      const validForm = isValidArray.every((el) => el);
      if (validForm && isCheckedRules) {
        createUser(onSubmit);
      }
    }
    handleClickOpen();
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {isLoading || isLoadingRegisredUser ? 'Проверка даных' : 'Попытка ввода данных'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isLogin &&
              (isLoading ? 'Ожидайте ответа сервера' : 'Пожалуйста, проверьте вводимые данные')}
            {!isLogin &&
              (isLoadingRegisredUser
                ? 'Ожидайте ответа сервера'
                : 'Пользователь существует или некоректно введены данные')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>

      <Container
        component="main"
        maxWidth="md"
        sx={{
          display: 'flex',
          flexGrow: '1',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Paper elevation={8} sx={{ padding: 5, marginBottom: 5, width: '100%' }}>
          <Box
            display="flex"
            flexDirection={'column'}
            sx={{
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isLoading ? 'Идет загрузка' : isLogin ? 'Вход в аккаунт' : 'Регистрация'}
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmitForm}>
              <Grid container spacing={2}>
                {!isLogin && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        error={onSubmit.name === '' ? false : isValidForm.name ? false : true}
                        helperText={
                          onSubmit.name === ''
                            ? ' '
                            : isValidForm.name
                            ? ' '
                            : 'Ошибочный ввод длина не менее трёх символов'
                        }
                        autoComplete="given-name"
                        name="name"
                        value={onSubmit.name}
                        onChange={handleOnChangeTextField}
                        required
                        fullWidth
                        id="name"
                        label="Имя"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        disabled={isLoading}
                        error={
                          onSubmit.lastname === '' ? false : isValidForm.lastname ? false : true
                        }
                        helperText={
                          onSubmit.lastname === ''
                            ? ' '
                            : isValidForm.lastname
                            ? ' '
                            : 'Ошибочный ввод длина не менее трёх символов'
                        }
                        required
                        fullWidth
                        id="lastname"
                        label="Фамилия"
                        name="lastname"
                        value={onSubmit.lastname}
                        onChange={handleOnChangeTextField}
                        autoComplete="family-name"
                      />
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <TextField
                    disabled={isLoading}
                    error={onSubmit.email === '' ? false : isValidForm.email ? false : true}
                    helperText={
                      onSubmit.email === '' ? ' ' : isValidForm.email ? ' ' : 'Ошибочный ввод email'
                    }
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
                  <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">
                      {onSubmit.password === ''
                        ? 'Password*'
                        : isValidForm.password
                        ? 'Password*'
                        : 'Ошибка'}
                    </InputLabel>
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
                      error={onSubmit.password === '' ? false : isValidForm.password ? false : true}
                      required
                      fullWidth
                      name="password"
                      value={onSubmit.password}
                      onChange={handleOnChangeTextField}
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      autoComplete="new-password"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  {!isLogin && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isCheckedRules}
                          onChange={handleCheckedRules}
                          color="primary"
                        />
                      }
                      label="Я принимаю правила, которых нет"
                    />
                  )}
                </Grid>
              </Grid>
              <Button
                disabled={isLoading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
              </Button>
              <Button
                disabled={isLoading}
                fullWidth
                sx={{ mt: 1, mb: 1 }}
                onClick={() => {
                  setIsLogin(!isLogin);
                  setOnSubmit({
                    name: '',
                    lastname: '',
                    password: '',
                    email: ''
                  });
                  setisValidForm({
                    name: false,
                    lastname: false,
                    email: false,
                    password: false
                  });
                }}
              >
                {isLogin ? 'Перейти к регистрации' : 'Перейти ко Входу'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default PageStart;
