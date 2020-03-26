import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Chip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

function preventDefault(event) {
    event.preventDefault();
}

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        marginBottom: theme.spacing(1)
    },
    chipDiv: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
    },
    chip: {
        marginLeft: theme.spacing(0.5),
    },
    containerDiv: {
        margin: theme.spacing(3)
    }
});

class TaskStatus extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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
            data: []
        }
    }

    componentDidMount() {
        var time = Math.floor(Date.now() / 1000)
        fetch("http://localhost:5000/flows")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        data: result.data
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    generateUUID() {
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    }

    render() {
        const { classes } = this.props;

        var dataByProject = {}

        for (var i in this.state.data) {
            var datum = this.state.data[i];
            if (datum.project in dataByProject) {
                dataByProject[datum.project].push(
                    <Chip
                        key={this.generateUUID()}
                        className={classes.chip}
                        avatar={<Avatar style={{ backgroundColor: datum.successful ? this.state.colouring.fail.secondary : this.state.colouring.success.secondary }}> {datum.execution == "scheduled" ? <ScheduleIcon /> : <ArrowUpwardIcon />} </Avatar>}
                        variant="outlined"
                        clickable
                        label={datum.flow + " | " + datum.run_id}
                        style={{ backgroundColor: datum.successful ? this.state.colouring.fail.primary : this.state.colouring.success.primary }}
                    />
                );
            } else {
                dataByProject[datum.project] = [
                    <Chip
                        key={this.generateUUID()}
                        className={classes.chip}
                        avatar={<Avatar style={{ backgroundColor: datum.successful ? this.state.colouring.fail.secondary : this.state.colouring.success.secondary }}> {datum.execution == "scheduled" ? <ScheduleIcon /> : <ArrowUpwardIcon />} </Avatar>}
                        variant="outlined"
                        clickable
                        label={datum.flow + " | " + datum.run_id}
                        style={{ backgroundColor: datum.successful ? this.state.colouring.fail.primary : this.state.colouring.success.primary }}
                    />
                ];
            }
        }


        return (
            <React.Fragment>
                <Title>Current Flow Status</Title>
                <div className={classes.containerDiv}>
                    {
                        Object.entries(dataByProject).map((value) => (
                            <div key={this.generateUUID()}>
                                <div className={classes.root}>
                                    <Typography component="p" variant="subtitle1" align="left">
                                        {value[0]}
                                    </Typography>
                                </div>
                                <div className={classes.chipDiv}>
                                    {
                                        value[1].map((component) => (
                                            component
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>

            </React.Fragment>
        );
    }
}

TaskStatus.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskStatus);