import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        textSecondary: theme.palette.text.secondary,
        textPrimary: theme.palette.text.primary,
        primary: theme.palette.primary.main
    }
});

class Chart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [
                { "time": "03-15", "count": 45 },
                { "time": "03-16", "count": 7 },
                { "time": "03-17", "count": 8 },
                { "time": "03-18", "count": 14 },
                { "time": "03-19", "count": 35 },
                { "time": "03-20", "count": 18 },
            ]
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Title>Metaflow Usage</Title>
                <ResponsiveContainer>
                    <LineChart
                        data={this.state.data}
                        margin={{
                            top: 16,
                            right: 16,
                            bottom: 0,
                            left: 24,
                        }}
                    >
                        <XAxis dataKey="time" stroke={classes.primary} />
                        <YAxis stroke={classes.textSecondary}>
                            <Label
                                angle={270}
                                position="left"
                                style={{ textAnchor: 'middle', fill: classes.textPrimary }}
                            >
                                Executions per day
                            </Label>
                        </YAxis>
                        <Line type="monotone" dataKey="count" stroke={classes.primary} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </React.Fragment>
        );
    }
}

Chart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chart);