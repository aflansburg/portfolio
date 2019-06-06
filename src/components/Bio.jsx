import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ReactMarkdown from "react-markdown";
import TextMarkdown from "./TextMarkdown";
import Bio from "../data/bio.md";

const useStyles = makeStyles(theme => ({
  bio: {
    padding: 12,
    background: "rgba(255,255,255,0.9)"
  }
}));

export default function() {
  const classes = useStyles();
  const med = useMediaQuery("(min-width:960px)");
  const sm = useMediaQuery("(max-width:600px)");
  const xs = useMediaQuery("(max-width:500px");
  const [bioText, setBio] = useState();
  const [expandedBio, setExpandedBio] = useState(false);

  useEffect(() => {
    fetch(Bio)
      .then(res => res.text())
      .then(b => setBio(b));
  });

  const handleExpandBioClick = () => {
    setExpandedBio(!expandedBio);
  };

  return (
    <Paper className={classes.bio}>
      <ReactMarkdown
        source={
          bioText
            ? expandedBio
              ? bioText
              : `${
                  xs ? bioText.substring(0, 362) : bioText.substring(0, 400)
                }...`
            : "loading"
        }
        renderers={{ text: TextMarkdown }}
      />
      <Button onClick={handleExpandBioClick}>
        {!expandedBio ? "Read More" : "Show Less"}
      </Button>
    </Paper>
  );
}
