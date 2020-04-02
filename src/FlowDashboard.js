import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import RecentFlowExecutions from './RecentFlowExecutions';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TaskStatus from './TaskStatus';

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
});

class FlowDashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            changePageCallback: props.changePageCallback
        }
    }

    render() {
        var { classes } = this.props;

        return (
            <Container maxWidth="lg" className={classes.container}>

                <Grid container spacing={3} alignItems="stretch">

                    <Grid item xs={12} md={6} lg={3} style={{ display: 'flex' }}>
                        <Paper className={classes.paper}>
                            <Chart />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6} lg={9} style={{ display: 'flex' }}>
                        <Paper className={classes.paper}>
                            <TaskStatus changePageCallback={this.state.changePageCallback} />
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <RecentFlowExecutions changePageCallback={this.state.changePageCallback} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

        )
    }
}

FlowDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlowDashboard);