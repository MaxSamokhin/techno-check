import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
// core components
import AdminNavbarLinks from 'components/Navbars/AdminNavbarLinks.jsx';
import sidebarStyle from 'assets/jss/material-dashboard-react/components/sidebarStyle.jsx';

import {getTests} from 'redux/test/tests.action.js';

class Sidebar extends React.Component {
    state = {filter: ''}

    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
    }

    componentDidMount() {
        this.props.getTests();
    }

    render() {
        const { classes, color, image, logoText, routes } = this.props;
        var testLinks = (
            <List className={classes.list}>
                {this.props.tests && this.props.tests.data && Array.isArray(this.props.tests.data) &&
                this.props.tests.data.filter(r => r.name.toLowerCase().includes(this.state.filter))
                 .map((prop, key) => {
                    var listItemClasses;
                    listItemClasses = classNames({
                        [' ' + classes[color]]: this.activeRoute(prop.layout + prop.path)
                    });

                    const whiteFontClasses = classNames({
                        [' ' + classes.whiteFont]: this.activeRoute(prop.layout + prop.path)
                    });
                    return (
                        <NavLink
                            to={prop.layout + prop.id}
                            className={classes.item}
                            activeClassName='active'
                            key={key}
                            >
                            <ListItem button>
                                <ListItemText
                                    primary={prop.name}
                                    className={classNames(classes.itemText, whiteFontClasses)}
                                    disableTypography={true}
                                />
                            </ListItem>
                        </NavLink>
                    );
                })}
            </List>
        );
        var brand = (
            <div className={classes.logo}>
                <a
                    className={classes.logoLink}
                    >
                    {logoText}
                </a>
            </div>
        );

        return (
            <div>
                <Hidden mdUp implementation='css'>
                    <Drawer
                        variant='temporary'
                        anchor='right'
                        open={this.props.open}
                        classes={{
                            paper: classNames(classes.drawerPaper)
                        }}
                        onClose={this.props.handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                        >
                        {brand}
                        <div className={classes.sidebarWrapper}>
                            <AdminNavbarLinks/>
                            {testLinks}
                        </div>
                        {image !== undefined ? (
                            <div
                                className={classes.background}
                                style={{ backgroundImage: 'url(' + image + ')' }}
                            />
                        ) : null}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation='css'>
                    <Drawer
                        anchor='left'
                        variant='permanent'
                        open
                        classes={{
                            paper: classNames(classes.drawerPaper)
                        }}
                        >
                        {brand}
                        <div className={classes.sidebarWrapper}>
                            <TextField className={classes.filter}
                                InputLabelProps={{className: classes.filterLabel}}
                                InputProps={{className: classes.filterBorder}}
                                label='Фильтр тестов'
                                value={this.state.filter}
                                onChange={e => this.setState({filter: e.target.value.toLowerCase()})}
                                />
                            {testLinks}
                        </div>
                    </Drawer>
                </Hidden>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    tests: state.tests.tests
});

const mapDispatchToProps = ({
    getTests
});

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(sidebarStyle)(Sidebar));
