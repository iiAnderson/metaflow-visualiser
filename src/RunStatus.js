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
import StatusChips from './StatusChips';

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

class RunStatus extends React.Component {

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
            data: []
        }
    }

    componentDidMount() {
        var time = Math.floor(Date.now() / 1000)
        fetch("http://localhost:5000/flows/" + this.state.flow + "/last")
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
            var obj = this.state.data[i];
            if (obj.project in dataByProject) {
                dataByProject[obj.project].push(obj);
            } else {
                dataByProject[obj.project] = [obj];
            }
        }


        return (
            <React.Fragment>
                <div className={classes.containerDiv}>
                    {
                        Object.entries(dataByProject).map((value) => (
                            <div key={this.generateUUID()}>
                                <div className={classes.root}>
                                </div>
                                <div className={classes.chipDiv}>
                                    {
                                        <StatusChips data={value[1]} compressed={true} />
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

RunStatus.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RunStatus);