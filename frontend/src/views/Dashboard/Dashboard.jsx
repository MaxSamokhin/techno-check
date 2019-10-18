import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import {unstable_Box as Box} from "@material-ui/core/Box";
// @material-ui/icons
// core components
import Reviews from 'components/Reviews/Reviews.jsx'

import {bugs, server, website} from "variables/general.jsx";

import {completedTasksChart, dailySalesChart, emailsSubscriptionChart} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
    state = {
        value: 0
    };
    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    render() {
        const {classes} = this.props;
        return (
            <Box display='flex'>
                <Reviews/>
            </Box>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
