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
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
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
            data: [{
                "project": "IngestPipeline",
                "flow": "DataIngestFlow",
                "state": "success",
                "execution": "scheduled",
                "run_id": 44
            }, {
                "project": "IngestPipeline",
                "flow": "RecordEnricherFlow",
                "state": "fail",
                "execution": "scheduled",
                "run_id": 42
            }, {
                "project": "IngestPipeline",
                "flow": "DuplicateMergerFlow",
                "state": "success",
                "execution": "adhoc",
                "run_id": 15
            }, {
                "project": "DataIngestAnalytics",
                "flow": "AdhocQueryFlow",
                "state": "fail",
                "execution": "adhoc",
                "run_id": 4
            }, {
                "project": "DataIngestAnalytics",
                "flow": "VariableModelTrainingFlow",
                "state": "success",
                "execution": "scheduled",
                "run_id": 6
            }, {
                "project": "ModelService",
                "flow": "ModelLayerProcessingFlow",
                "state": "success",
                "execution": "scheduled",
                "run_id": 4
            }, {
                "project": "ModelService",
                "flow": "ModelInferenceFlow",
                "state": "success",
                "execution": "adhoc",
                "run_id": 8
            }, {
                "project": "ModelService",
                "flow": "ModelVisualiserFlow",
                "state": "fail",
                "execution": "adhoc",
                "run_id": 9
            }]
        }
    }

    render() {
        const { classes } = this.props;

        var dataByProject = {}

        for (var i in this.state.data) {
            var datum = this.state.data[i];
            if (datum.project in dataByProject) {
                dataByProject[datum.project].push(
                    <Chip
                        avatar={<Avatar style={{ backgroundColor: datum.state === "fail" ? this.state.colouring.fail.secondary : this.state.colouring.success.secondary }}> {datum.execution == "scheduled" ? <ScheduleIcon /> : <ArrowUpwardIcon />} </Avatar>}
                        variant="outlined"
                        label={datum.flow + " | " + datum.run_id}
                        style={{ backgroundColor: datum.state === "fail" ? this.state.colouring.fail.primary : this.state.colouring.success.primary }}
                    />
                );
            } else {
                dataByProject[datum.project] = [
                    <Chip
                        avatar={<Avatar style={{ backgroundColor: datum.state === "fail" ? this.state.colouring.fail.secondary : this.state.colouring.success.secondary }}> {datum.execution == "scheduled" ? <ScheduleIcon /> : <ArrowUpwardIcon />} </Avatar>}
                        variant="outlined"
                        label={datum.flow + " | " + datum.run_id}
                        style={{ backgroundColor: datum.state === "fail" ? this.state.colouring.fail.primary : this.state.colouring.success.primary }}
                    />
                ];
            }
        }


        return (
            <React.Fragment>
                <Title>Current Flow Status</Title>

                {
                    Object.entries(dataByProject).map((value) => (
                        <div>
                            <div className={classes.root}>
                                <Typography className={classes.root} component="p" variant="subtitle1" align="left">
                                    {value[0]}
                                </Typography>
                            </div>
                            <div className={classes.root}>
                                {
                                    value[1].map((component) => (
                                        component
                                    ))
                                }
                            </div>
                        </div>
                    ))

                }



            </React.Fragment>
        );
    }
}

TaskStatus.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskStatus);