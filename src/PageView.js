import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FlowDashboard from './FlowDashboard';
import FlowDiagnostics from './FlowDiagnostics';

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
            "page": props.page
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({
            "page": nextProps.page
        });
    }

    render() {
        var { classes } = this.props;
        var page = null;

        switch (this.state.page) {
            case "diagnostics":
                page = <FlowDiagnostics />
                break;
            default:
                page = <FlowDashboard />
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