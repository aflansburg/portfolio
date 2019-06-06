import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import skillsData from "../data/skillsData";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Dialog,
  DialogContent,
  DialogContentText,
  Divider,
  Tooltip
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import CodeIcon from "@material-ui/icons/Code";

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
  },
  skillImage: {
    maxHeight: "-webkit-fill-available",
    objectFit: "scale-down"
  }
}));

export default function() {
  const classes = useStyles();
  const wide = useMediaQuery("(min-width:1000px)");
  const [open, setOpen] = useState(false);
  const [skillText, setSkillsText] = useState(null);

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
            <IconButton>
              <CodeIcon />
            </IconButton>
          </Tooltip>
        </GridListTile>
        {skillsData.map((skill, index) => (
          <GridListTile
            key={index}
            cols={wide ? skill.cols || 1 : 4}
            className={classes.gridListTile}
          >
            <img
              src={skill.image}
              alt={skill.name}
              className={classes.skillImage}
            />
            <GridListTileBar
              title={skill.name}
              actionIcon={
                <IconButton
                  className={classes.icon}
                  onClick={() => {
                    setOpen(true);
                    setSkillsText(skill.text);
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
          setSkillsText(null);
        }}
      >
        <DialogContent>
          <DialogContentText>{skillText || "I got nothing."}</DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
