import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import { unstable_Box as Box } from "@material-ui/core/Box";
// @material-ui/icons
import Save from "@material-ui/icons/Save";
import ImportExport from "@material-ui/icons/ImportExport";
import Settings from "@material-ui/icons/Settings";
// core components
import Button from "components/CustomButtons/Button.jsx";
import { connect } from "react-redux";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

import { GROUP_BY_QUESTION, GROUP_BY_USER } from "../../redux/grouping/grouping.constant.js";
import { setGroupByQuestion, setGroupByUser } from "../../redux/grouping/grouping.action";
import { exportData, saveData } from "../../redux/manipulation-data/manipulation-data.action";
import { logOut } from "../../redux/login/login.action";
import { hidePersonalData, showPersonalData } from "../../redux/personal-data/personal-data.action";

class HeaderLinks extends React.Component {
  state = {
    open: false,
    groupType: "GROUP_BY_QUESTION",
    isShowPersonalData: false
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleChangeGroupType = (e) => {
    const { setGroupByQuestion, setGroupByUser } = this.props;
    const valueGroup = e.target.value;

    if (valueGroup === "GROUP_BY_QUESTION") {
      setGroupByQuestion();
    }

    if (valueGroup === "GROUP_BY_USER") {
      setGroupByUser();
    }

    this.setState({ groupType: valueGroup });
  };

  componentDidUpdate(prevProps) {
    if (this.props.groupByQuestion !== prevProps.groupByQuestion ||
      this.props.groupByUser !== prevProps.groupByUser) {


      const { groupByQuestion, groupByUser } = this.props;

      const groupType = groupByQuestion ? "GROUP_BY_QUESTION" :
        groupByUser ? "GROUP_BY_USER" : "GROUP_BY_QUESTION";

      this.setState((state) => {
        return {
          ...state,
          groupType: groupType
        };
      });
    }

    if (this.props.isShowPersonalData !== prevProps.isShowPersonalData) {
      this.setState((state) => {
        return {
          ...state,
          isShowPersonalData: this.props.isShowPersonalData
        };
      });
    }
  }

  handleSave = () => {
    this.props.saveData();
  };

  handleExport = () => {
    this.props.exportData();
  };

  handleChangePersonalData = (e) => {
    const { showPersonalData, hidePersonalData } = this.props;
    const checked = e.target.checked;

    if (checked) {
      showPersonalData();
    } else {
      hidePersonalData();
    }

    this.setState({ isShowPersonalData: checked });
  };

  render() {
    const { classes, logOut } = this.props;
    const { open, isShowPersonalData } = this.state;
    return (
      <Box display='flex' alignItems='center'>
        <Tooltip title='Сохранить'>
          <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-label='Сохранить'
            onClick={this.handleSave}
            className={classes.buttonLink}
          >
            <Save className={classes.icons}/>
            <Hidden mdUp implementation='css'>
              <p className={classes.linkText}>Сохранить</p>
            </Hidden>
          </Button>
        </Tooltip>

        <Tooltip title='Экспортировать в Технотест'>
          <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-label='Экспортировать'
            className={classes.buttonLink}
            onClick={this.handleExport}
          >
            <ImportExport className={classes.icons}/>
            <Hidden mdUp implementation='css'>
              <p className={classes.linkText}>Экспортировать</p>
            </Hidden>
          </Button>
        </Tooltip>

        <TextField className={classes.margin}
                   label='Фильтр вопросов'
                   value={this.state.filter}
                   onChange={e => this.setState({ filter: e.target.value.toLowerCase() })}
        />

        <FormControl className={classes.margin}>
          <InputLabel htmlFor="group-by">Группировка</InputLabel>
          <Select
            autoWidth
            value={this.state.groupType}
            onChange={this.handleChangeGroupType}
            inputProps={{
              name: "group",
              id: "group-by"
            }}
          >
            <MenuItem value={GROUP_BY_QUESTION}>по вопросу</MenuItem>
            <MenuItem value={GROUP_BY_USER}>по пользователю</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant='contained'
          color='primary'
          onClick={() => logOut()}
        >
          Выйти
        </Button>

        <div className={classes.manager}>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={open ? "menu-list-grow" : null}
            aria-haspopup='true'
            onClick={this.handleToggle}
            className={classes.buttonLink}
          >
            <Settings className={classes.icons}/>
            <Hidden mdUp implementation='css'>
              <p onClick={this.handleClick} className={classes.linkText}>
                Параметры
              </p>
            </Hidden>
          </Button>

          <Popper
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !open }) +
              " " +
              classes.popperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id='menu-list-grow'
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <FormGroup column className={classes.margin}>
                      <FormControlLabel
                        control={
                          <Switch
                            color='primary'
                            checked={isShowPersonalData}
                            onChange={this.handleChangePersonalData}
                            value='isShowPersonalData'
                          />
                        }
                        label='Показать личные данные'
                      />

                    </FormGroup>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {
    groupByQuestion: state.grouping.groupByQuestion,
    groupByUser: state.grouping.groupByUser,
    isShowPersonalData: state.personalData.isShowPersonalData
  };
}

const mapDispatchToProps = (dispatch) => ({
  setGroupByQuestion: () => dispatch(setGroupByQuestion()),
  setGroupByUser: () => dispatch(setGroupByUser()),
  saveData: () => dispatch(saveData()),
  exportData: () => dispatch(exportData()),
  logOut: () => dispatch(logOut()),
  showPersonalData: () => dispatch(showPersonalData()),
  hidePersonalData: () => dispatch(hidePersonalData())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(headerLinksStyle)(HeaderLinks));
