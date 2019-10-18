import React from "react";
import PropTypes from "prop-types";
import Button from "components/CustomButtons/Button.jsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import connect from "react-redux/es/connect/connect";
import { checkUser, logIn } from "../redux/login/login.action";
import {Redirect} from 'react-router-dom';

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    this.props.checkUser();
  }

  testEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  testPassword(password) {
    return !!password && password.length >= 4;
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    this.props.logIn({ email, password });
  };

  render() {
    const { email, password } = this.state;
    const { classes, isExpert, isSuperuser } = this.props;

    if (isSuperuser || isExpert) {
      return <Redirect to={'/admin/dashboard'}/>;
    }

    return (
      <main className={classes.main}>
        <CssBaseline/>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Вход в ТехноЧек
          </Typography>
          <form className={classes.form}>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='email'>Почта</InputLabel>
              <Input id='email'
                     name='email'
                     type='email'
                     required={true}
                     onChange={this.handleChange("email")}
                     value={email}
                     autoComplete='email'
                     autoFocus/>
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='password'>Пароль</InputLabel>
              <Input
                name='password'
                type='password'
                id='password'
                required={true}
                onChange={this.handleChange("password")}
                value={password}
                autoComplete='current-password'/>
            </FormControl>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    isExpert: state.login.isExpert,
    isSuperuser: state.login.isSuperuser,
    loginErrorMsg: state.login.loginErrorMsg

  };
};

const mapDispatchToProps = (dispatch) => ({
  logIn: (params) => dispatch(logIn(params)),
  checkUser: () => dispatch(checkUser())
});

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
