import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { GridList, GridListTile, IconButton, Tooltip } from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import companyData from "../data/companyData";

const useStyles = makeStyles(theme => ({
  root: {
    // overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    height: 600,
    justifyContent: "center"
  },
  companyImage: {
    maxHeight: "-webkit-fill-available",
    objectFit: "scale-down"
  },
  gridListTile: {
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

export default function() {
  const classes = useStyles();
  const wide = useMediaQuery("(min-width:1000px)");
  return (
    <div className={classes.root}>
      <GridList
        cellHeight={140}
        cols={4}
        className={classes.gridList}
        spacing={4}
      >
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
        {companyData.map((company, index) => (
          <GridListTile
            key={index}
            cols={wide ? company.cols || 1 : 4}
            onClick={() => {
              window.open(company.url, "_blank");
            }}
            className={classes.gridListTile}
          >
            <img
              className={classes.companyImage}
              src={company.image}
              alt={company.name}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
