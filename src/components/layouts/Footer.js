import React, { Component } from "react";
import { withWidth, AppBar, Tabs, Tab } from "@material-ui/core";
import { withContext } from "../../context";

class Footer extends Component {
  onIndexSelect = (e, index) => {
    const { onCategorySelect, muscles } = this.props;
    onCategorySelect(index === 0 ? "" : muscles[index - 1]);
  };
  getIndex = () => {
    const { category, muscles } = this.props;
    return category ? muscles.findIndex(group => group === category) + 1 : 0;
  };
  render() {
    const { width, muscles } = this.props;
    return (
      <AppBar position="static">
        <Tabs
          value={this.getIndex()}
          onChange={this.onIndexSelect}
          color="inherit"
          // indicatorColor="secondary"
          // textColor="secondary"
          centered={width !== "xs"}
          scrollable={width === "xs"}
          //fullWidth spreads across the screen
          // variant="standard"
          scrollButtons="on"
        >
          <Tab label="All" />
          {/* iterate through the muscles array and put each in a Tab */}
          {muscles.map(group => (
            <Tab key={group} label={group} />
          ))}
        </Tabs>
      </AppBar>
    );
  }
}

//Get the muscles variable that get parsed
//when this component is called and onSelect var
export default withContext(withWidth()(Footer));
