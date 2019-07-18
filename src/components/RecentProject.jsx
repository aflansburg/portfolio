import React from "react";
import Grid from "@material-ui/core/Grid";

export default function() {
  return (
    <Grid item style={{ width: "100%" }}>
      <iframe
        src="https://codesandbox.io/embed/req-algolia-99bpb?fontsize=14"
        title="req-navsearch-algolia"
        allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media"
        style={{
          width: "100%",
          height: 500,
          border: 0,
          borderRadius: 4,
          overflow: "hidden"
        }}
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      />
    </Grid>
  );
}
