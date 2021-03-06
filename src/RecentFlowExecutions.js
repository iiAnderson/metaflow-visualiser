import React from 'react';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { URL, API_TOKEN } from './static';


function preventDefault(event) {
    event.preventDefault();
}

const styles = theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
});

class RecentFlowExecutions extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            changePageCallback: props.changePageCallback,
            data: [

            ],
            flow: props.flow === undefined ? "" : props.flow
        }

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(event, data) {
        this.state.changePageCallback(data);
    }

    componentDidMount() {
        var time = new Date();
        var url = "";
        time.setDate(time.getDate() - 1);
        var time = Math.floor(time / 1000)

        if (this.state.flow === "") {
            url = URL + "/flows/all/" + time;
        } else {
            url = URL + "/flows/" + this.state.flow + "/" + time;
        }
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


    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Title>Recent Flow Executions</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Flow Name</TableCell>
                            <TableCell>Run ID</TableCell>
                            <TableCell>Run Finished</TableCell>
                            <TableCell>Run Success</TableCell>
                            <TableCell>Finished At</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map(row => (
                            <TableRow key={row.flow + " " + row.run_id}>
                                <TableCell>{row.flow}</TableCell>
                                <TableCell>{row.run_id}</TableCell>
                                <TableCell>{row.finished + " "}</TableCell>
                                <TableCell>{row.success + " "}</TableCell>
                                <TableCell>{row.finished_at}</TableCell>
                                <TableCell>{row.user}</TableCell>
                                <TableCell><Button onClick={(event) => this.handleClick(event, {
                                    "page": "run-diagnostics",
                                    "flow": row.flow,
                                    "run_id": row.run_id
                                })}>Details</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className={classes.seeMore}>
                    <Link color="primary" href="#" onClick={preventDefault}>
                        See more flows
                    </Link>
                </div>
            </React.Fragment>
        );
    }
}

RecentFlowExecutions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecentFlowExecutions);