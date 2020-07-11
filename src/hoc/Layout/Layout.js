import React, { Component } from 'react';
import Aux from '../Auxi/Auxi';
import Classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Sidebar from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer : false
    }

    sideDrawerClosedHandler = ( ) => {
        this.setState({showSideDrawer : false});
    }

    sideDrawerToggleHander = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer : !prevState.showSideDrawer
            };
        })
    }
    render(){
        return(
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHander} />
                <Sidebar open={this.state.showSideDrawer}  closed={this.sideDrawerClosedHandler}/>
                <main className={Classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;