import React from "react";
import PropTypes from 'prop-types';
import Radium from "radium";

import { lightActive, lightInactive } from "theme/variables";

const size = 18;
const innerPadding = 4;

class Light extends React.Component {
  render() {
    const { active } = this.props;

    const baseInnerStyle = {
      position: "absolute",
      left: innerPadding,
      right: innerPadding,
      top: innerPadding,
      bottom: innerPadding,
      borderRadius: "50%"
    };

    const styles = {
      outer: {
        position: "relative",
        backgroundColor: "rgba(0,0,0,0.4)",
        width: size,
        height: size,
        borderRadius: "50%",
        pointerEvents: "none"
      },
      innerInactive: {
        ...baseInnerStyle,
        backgroundColor: lightInactive
      },
      innerActive: {
        ...baseInnerStyle,
        backgroundColor: lightActive,
        transition: "opacity 0.1s",
        opacity: active ? 1 : 0
      }
    };

    return (
      <div style={styles.outer}>
        <div style={styles.innerInactive} />
        <div style={styles.innerActive} />
      </div>
    );
  }
}

Light.propTypes = {
  active: PropTypes.bool.isRequired
};

export default Radium(Light);
