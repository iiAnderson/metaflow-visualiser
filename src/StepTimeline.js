import React from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


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


class StepTimeline extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            steps: props.steps,
            data: [
                {
                    "step": "DataParser",
                    "finished_at": "",
                    "tasks": [
                        {
                            "successful": true,
                            "finished": true,
                            "finished_at": "",
                            "exception": "",
                            "stdout": "",
                            "stderr": ""
                        }
                    ]
                }
            ]
        }

    }


    render() {
        return (
            <div>

            </div>
        );
    }

}

StepTimeline.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepTimeline);