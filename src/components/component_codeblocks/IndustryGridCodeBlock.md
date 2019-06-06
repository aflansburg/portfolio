```
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import industryData from "../data/industryData";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Dialog,
  DialogContent,
  DialogContentText,
  Tooltip,
  Divider
} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import InfoIcon from "@material-ui/icons/Info";
import CodeIcon from "@material-ui/icons/Code";
import CodeBlock from "./CodeBlock";
import IndustryCodeBlock from "./component_codeblocks/IndustryGridCodeBlock.md";

const useStyles = makeStyles(theme => ({
  root: {
    // overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    height: 600,
    justifyContent: "center"
  },
  gridListTile: {
    "&:hover": {
      cursor: "pointer"
    }
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
}));

export default function() {
  const classes = useStyles();
  const wide = useMediaQuery("(min-width:1000px)");
  const [open, setOpen] = useState(false);
  const [codeBehindOpen, setCodeBehindOpen] = useState(false);
  const [industryText, setIndustryText] = useState(null);
  const [source, setSource] = useState();

  useEffect(() => {
    fetch(IndustryCodeBlock)
      .then(res => res.text())
      .then(md => {
        setSource(md);
      });
  });

  return (
    <div className={classes.root}>
      <GridList cellHeight={140} cols={4} className={classes.gridList}>
        <GridListTile
          key="Subheader"
          cols={4}
          style={{
            height: "auto",
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <Tooltip title="View source code">
            <IconButton
              onClick={() => {
                setCodeBehindOpen(true);
              }}
            >
              <CodeIcon />
            </IconButton>
          </Tooltip>
        </GridListTile>
        {industryData.map((industry, index) => (
          <GridListTile
            key={index}
            cols={wide ? industry.cols || 1 : 4}
            className={classes.gridListTile}
          >
            <img src={industry.image} alt={industry.name} />
            <GridListTileBar
              title={industry.name}
              actionIcon={
                <IconButton
                  className={classes.icon}
                  onClick={() => {
                    setOpen(true);
                    setIndustryText(industry.text);
                  }}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      <Dialog
        open={open}
        fullScreen={false}
        onClose={() => {
          setOpen(false);
          setIndustryText(null);
        }}
      >
        <DialogContent>
          <DialogContentText>
            {industryText || "There's nothing here yet, but there should be!"}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        open={codeBehindOpen}
        fullScreen={false}
        onClose={() => {
          setCodeBehindOpen(false);
        }}
      >
        <DialogContent>
          <ReactMarkdown
            source={source || ""}
            renderers={{ code: CodeBlock }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
```
