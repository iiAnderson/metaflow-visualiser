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
import DataArtifactViewer from './DataArtifactViewer';

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

class RunDiagnostics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flow: props.flow,
            run_id: props.run_id,
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

                    <Grid item xs={12} md={12} lg={12}>
                        <Paper className={classes.paper}>
                            <Typography component="p" variant="h4" align="left">{this.state.flow}</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Paper className={classes.paper}>
                            <StepTimeline flow={this.state.flow} />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6} lg={9}>
                        <Paper className={classes.paper}>
                            <DataArtifactViewer flow={this.state.flow} run_id={this.state.run_id} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

        )
    }
}

RunDiagnostics.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RunDiagnostics);