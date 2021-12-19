import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  body: {
    background: '#ff0000',
  },
  loginbar: {
    padding: 20,
    /*  height: '70vh', */
    width: 300,
    margin: '20px auto',
  },
  loginDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  footer: {
    textAlign: 'center',
  },
  textFieldSpace: {
    paddingTop: 20,
  },
  loginTitle: {
    paddingTop: 5,
    paddingBottom: 20,
    fontSize: '2rem',
  },
});

export default useStyles;
