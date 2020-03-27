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

                <Grid container spacing={3} alignItems="stretch">

                    <Grid item xs={12} md={6} lg={9} style={{ display: 'flex' }}>
                        <Paper className={classes.paper}>
                            <Typography component="p" variant="h4" align="left">{this.state.flow}</Typography>
                            <Grid container item xs={12} spacing={3} className={classes.container} alignItems="center">
                                <Typography component="p" variant="subtitle1" align="left">Last Runs: </Typography>
                                <div>
                                    {this.generateChips(classes)}
                                </div>
                            </Grid>
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
                            <RecentFlowExecutions flow={this.state.flow} />
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