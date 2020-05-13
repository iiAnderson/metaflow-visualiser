import React from 'react';
import Title from './Title';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import StatusChips from './StatusChips';
import { URL, API_TOKEN } from './static';


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
            compressed: props.compressed,
            changePageCallback: props.changePageCallback,
            flow: props.flow,
            show: props.show,
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
        fetch(URL + "/flows", { headers: { 'x-api-key': API_TOKEN } })
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
                <Title>Current Flow Status</Title>
                <div className={classes.containerDiv}>
                    {
                        Object.entries(dataByProject).map((value) => (
                            <div key={this.generateUUID()}>
                                <div className={classes.root}>
                                </div>
                                <div className={classes.chipDiv}>
                                    {
                                        <StatusChips data={value[1]} classes={classes} changePageCallback={this.state.changePageCallback} />
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