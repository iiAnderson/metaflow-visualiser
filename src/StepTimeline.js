import React from 'react';
import { Timeline, Event } from 'react-trivial-timeline';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Typography } from '@material-ui/core';
import Title from './Title';
import { URL, API_TOKEN } from './static';


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
            flow: props.flow,
            data: {
                steps: [

                ]
            }
        }
    }

    componentDidMount() {
        var url = "";

        url = URL + "/flows/" + this.state.flow + "/recent"

        console.log(url);
        fetch(url, { headers: { 'x-api-key': API_TOKEN } })
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

    formatTimeline() {
        return (
            <Timeline lineColor="black">
                {
                    this.state.data.steps.map((value, index) => (
                        <Event
                            interval={<ArrowForwardIosIcon />}
                            key={this.generateUUID()}
                            title=""
                        >
                            <Typography align="left">{value.step}</Typography>
                        </Event>
                    ))
                }
            </Timeline>);
    }


    render() {
        return (
            <div>
                <Title>Current Steps</Title>
                {this.formatTimeline()}
            </div>
        );
    }

}

StepTimeline.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepTimeline);