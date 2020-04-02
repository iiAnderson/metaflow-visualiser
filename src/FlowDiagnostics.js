import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import RecentFlowExecutions from './RecentFlowExecutions';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import StepTimeline from './StepTimeline';
import { Typography } from '@material-ui/core';
import Title from './Title';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Chip } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import RunStatus from './RunStatus';

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%'
    },
    container: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(4),
    },
    chipDiv: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        marginLeft: theme.spacing(0.5),
    },
    containerDiv: {
        margin: theme.spacing(3)
    }
});

class FlowDiagnostics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flow: props.flow,
            changePageCallback: props.changePageCallback,
            colouring: {
                "success": {
                    "primary": "#98FB98",
                    "secondary": "#98FB98"
                },
                "fail": {
                    "primary": "#FFA07A",
                    "secondary": "#FFA07A"
                }
            },
        }
    }

    generateUUID() {
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    }

    generateChips(classes) {
        return (
            <RunStatus flow={this.state.flow} />
        )
    }

    render() {
        var { classes } = this.props;

        return (
            <Container maxWidth="lg" className={classes.container}>

                <Grid container spacing={3}>

                    <Grid item xs={12} md={6} lg={9}>
                        <Paper className={classes.paper}>
                            <Typography component="p" variant="h4" align="left">{this.state.flow}</Typography>
                            {this.generateChips(classes)}

                            <Typography component="p" variant="body2" align="left"><b>Total Runs</b>: 43</Typography>
                            <Typography component="p" variant="body2" align="left"><b>Avg time to completion</b>: 5m 4s</Typography>
                            <Typography component="p" variant="body2" align="left"><b>Schedule</b>: Every 1 hour</Typography>
                            <Typography component="p" variant="body2" align="left"><b>Next scheduled for</b>: 29/02/20202 03:00:00</Typography>
                            <Typography component="p" variant="body2" align="left"><b>Most Run by</b>: robanderson</Typography>


                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3} style={{ display: 'flex' }}>
                        <Paper className={classes.paper}>
                            <Chart flow={this.state.flow} />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Paper className={classes.paper}>
                            <StepTimeline flow={this.state.flow} />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6} lg={9}>
                        <Paper className={classes.paper}>
                            <RecentFlowExecutions flow={this.state.flow} changePageCallback={this.state.changePageCallback} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

        )
    }
}

FlowDiagnostics.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlowDiagnostics);