import React from 'react';
import ReactJson from 'react-json-view';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';


class DataArtifactViewer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flow: this.props.flow,
            data: {
                "dataset1": ["abc", "123"],
                "output_data": { "awesome": "sauce" }
            }
        }
    }

    componentDidMount() {
        fetch("http://localhost:5000/flows/" + this.state.flow + "/run/23/artifacts")
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

    render() {
        const expanded = this.state.expanded;

        const setExpanded = (value) => {
            this.setState({ expanded: value })
        }

        const handleChange = (panel) => (event, newExpanded) => {
            setExpanded(newExpanded ? panel : false);
        };

        return (
            <div>

                {
                    Object.entries(this.state.data).map((value) => (

                        <ExpansionPanel square expanded={expanded === value[0]} onChange={handleChange(value[0])}>
                            <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>{value[0]}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <ReactJson src={value[1]} />

                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))
                }
            </div>
        );
    }

}

export default DataArtifactViewer;