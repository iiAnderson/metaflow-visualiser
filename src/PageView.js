import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FlowDashboard from './FlowDashboard';
import FlowDiagnostics from './FlowDiagnostics';
import RunDiagnostics from './RunDiagnostics';

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
});

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://robbiea.co.uk">
                Robbie Anderson
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

class PageView extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            pageData: props.page,
            changePageCallback: props.changePageCallback
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({
            pageData: nextProps.page
        });
    }

    render() {
        var { classes } = this.props;
        var page = null;
        console.log(this.state.pageData);

        switch (this.state.pageData.page) {
            case "flow-diagnostics":
                page = <FlowDiagnostics flow={this.state.pageData.flow} changePageCallback={this.state.changePageCallback} />
                break;
            case "run-diagnostics":
                page = <RunDiagnostics flow={this.state.pageData.flow} run_id={this.state.pageData.run_id} changePageCallback={this.state.changePageCallback} />
                break;
            default:
                page = <FlowDashboard changePageCallback={this.state.changePageCallback} />
                break;
        }

        return (
            <React.Fragment>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {page}
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </React.Fragment>
        )
    }

}

PageView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageView);