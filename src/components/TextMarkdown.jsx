import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class TextMarkdown extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired
  };

  render() {
    const { value } = this.props;
    return value !== "loading" ? (
      <span
        style={{
          fontFamily: `"Trebuchet MS", Helvetica, sans-serif`,
          lineHeight: "1.75rem"
        }}
      >
        {value}
      </span>
    ) : (
      <React.Fragment>Loading Biography.....</React.Fragment>
    );
  }
}

export default TextMarkdown;
