import {
  Grid,
  Paper,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
} from '@material-ui/core';
import Head from 'next/head';
import React from 'react';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import User from '../types/users';
import { useRouter } from 'next/router';

useRouter;
type Props = {
  children: JSX.Element;
};

export default function Register({ children }: Props) {
  const router = useRouter();

  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  /* const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); */

  const submitHandler = async ({ email, password }: User) => {
    /* e.preventDefault(); */

    try {
      const { data } = await axios.post('/api/users/newusers', {
        email,
        password,
      });
      enqueueSnackbar('Du wurdest erfolgreich registriert!', {
        variant: 'success',
      });
      router.push('/');
    } catch (error: any) {
      enqueueSnackbar(error.response.data?.message ?? error.message, {
        variant: 'error',
      });
    }
  };

  return (
    <div>
      <Head>
        <title>SMP Code Challange - Registrierung</title>
      </Head>
      <Paper elevation={10} className={classes.loginbar}>
        <Grid className={classes.loginDetails}>
          <Typography className={classes.loginTitle}>Registrierung</Typography>
        </Grid>
        <form
          onSubmit={handleSubmit(submitHandler)}
          noValidate
          autoComplete="off"
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            }}
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                inputProps={{ type: 'email' }}
                error={Boolean(errors.email)}
                fullWidth
                helperText={
                  errors.email
                    ? errors.email.type === 'pattern'
                      ? 'Diese E-Mailadresse ist ungültig'
                      : 'Email ist ein Pflichtfeld'
                    : ''
                }
                /* onChange={(e) => setEmail(e.target.value)} */
                {...field}
              />
            )}
          ></Controller>
          <p></p>

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 6,
            }}
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                label="Passwort"
                variant="outlined"
                inputProps={{ type: 'password' }}
                error={Boolean(errors.password)}
                fullWidth
                helperText={
                  errors.password
                    ? errors.password.type === 'minLength'
                      ? 'Dieses Passwort muss mindestens 5 Zeichen beinhalten'
                      : 'Passwort ist ein Pflichtfeld'
                    : ''
                }
                /* onChange={(e) => setEmail(e.target.value)} */
                {...field}
              />
            )}
          ></Controller>

          <FormControlLabel
            control={
              <Checkbox
                /* checked={state.checkedB}
                  onChange={handleChange} */
                name="checkedB"
                color="primary"
              />
            }
            label="Passwort merken"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={{ marginBottom: 20 }}
          >
            Registrieren
          </Button>
        </form>

        <Typography>
          {' '}
          <NextLink href="/" passHref>
            <Link href="#"> Zum Login</Link>
          </NextLink>
        </Typography>
      </Paper>
    </div>
  );
}
