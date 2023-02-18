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
import {
  useLoginCheckQuery,
  useLoginMutation,
  useRegisterMutation
} from '../../../redux/features/service/authService';
import { useTranslation } from 'react-i18next';

function PageStart() {
  const { data: isLoggedIn } = useLoginCheckQuery();
  const { t } = useTranslation();
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

  if (isLoggedIn || isSuccess || isSuccessRegisredUser)
    return <Navigate to="/" state={{ from: location }} replace />;

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {isLoading || isLoadingRegisredUser ? t('startLng.wait') : t('startLng.messageError')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isLogin && (isLoading ? t('startLng.wait') : t('startLng.incorrectDataLogin'))}
            {!isLogin && (isLoadingRegisredUser ? t('startLng.wait') : t('startLng.incorrectData'))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            {t('startLng.close')}
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
              {isLoading
                ? 'Идет загрузка'
                : isLogin
                ? t('startLng.titleLogin')
                : t('startLng.titleRegistration')}
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
                            : t('startLng.messageError')
                        }
                        autoComplete="given-name"
                        name="name"
                        value={onSubmit.name}
                        onChange={handleOnChangeTextField}
                        required
                        fullWidth
                        id="name"
                        label={t('startLng.firstName')}
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
                            : t('startLng.messageError')
                        }
                        required
                        fullWidth
                        id="lastname"
                        label={t('startLng.secondName')}
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
                      onSubmit.email === ''
                        ? ' '
                        : isValidForm.email
                        ? ' '
                        : t('startLng.messageError')
                    }
                    required
                    fullWidth
                    id="email"
                    label={t('startLng.mail')}
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
                        ? t('startLng.password')
                        : isValidForm.password
                        ? t('startLng.password')
                        : t('startLng.messageError')}
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
                      label={t('startLng.password')}
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
                      label={t('startLng.checkRules')}
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
                {isLogin ? t('startLng.btnLogin') : t('startLng.btnRegistration')}
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
                {isLogin ? t('startLng.btnToRegistration') : t('startLng.btnToLogin')}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default PageStart;
