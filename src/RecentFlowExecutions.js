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
            data: [
                {
                    'successful': true,
                    'finished': true,
                    'finished_at': '2020-03-20T10:48:20.fZ',
                    'run_id': 2,
                    'flow': 'TestModelFlow',
                    'user': 'robbie'
                }
            ]
        }
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
                                <TableCell>{row.successful + " "}</TableCell>
                                <TableCell>{row.finished_at}</TableCell>
                                <TableCell>{row.user}</TableCell>
                                <TableCell><Button>Details</Button></TableCell>
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