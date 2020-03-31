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

class StatusChips extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            compressed: props.compressed,
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
            /*
            [
                {
                    "successful": true/false,
                    "execution": "scheduled/adhoc",
                    "flow": "flowname",
                    "run_id": "runid"
                }
            ]
            */
            data: props.data,
            classes: props.classes
        }
    }

    generateUUID() {
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.data);

        return (
            <React.Fragment>
                {
                    this.state.data.map((value) => (
                        <div key={this.generateUUID()}>
                            <div className={classes.chipDiv}>
                                {
                                    <Chip
                                        key={this.generateUUID()}
                                        className={classes.chip}
                                        avatar={
                                            <Avatar style={{ backgroundColor: value.finished ? this.state.colouring.success.secondary : this.state.colouring.fail.secondary }}>
                                                {value.execution == "scheduled" ? <ScheduleIcon /> : <ArrowUpwardIcon />}
                                            </Avatar>
                                        }
                                        variant="outlined"
                                        clickable
                                        label={this.state.compressed ? value.run_id : value.flow + " | " + value.run_id}
                                        style={{ backgroundColor: value.finished ? this.state.colouring.success.primary : this.state.colouring.fail.primary }}
                                    />
                                }
                            </div>
                        </div>
                    ))
                }

            </React.Fragment>
        );
    }
}

StatusChips.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default StatusChips;