import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';

class DrawerItems extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            changePage: props.changePage
        };
    }

    handleClick(event, name) {
        console.log("clicked cell " + name);
        this.state.changePage(name);
    }

    render() {
        return (
            <div>
                <ListItem button >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText onClick={(event) => this.handleClick(event, "dashboard")} primary="Dashboard" />
                </ListItem>
                <ListItem button >
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText onClick={(event) => this.handleClick(event, "diagnostics")} primary="Flow Diagnostics" />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText onClick={(event) => this.handleClick(event, "run-diagnostics")} primary="Run Diagnostics" />
                </ListItem>
            </div>
        );
    }
}

const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItem>
    </div>
);

export default DrawerItems;