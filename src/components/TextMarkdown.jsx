import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

class TextMarkdown extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired
  };

  render() {
    const { value } = this.props;
    return value !== "loading" ? (
      <Typography>{value}</Typography>
    ) : (
      <Typography>Loading Biography.....</Typography>
    );
  }
}

export default TextMarkdown;
