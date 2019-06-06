```
import React, { useState, useEffect } from "react"; ... // truncated

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

  const handleClickSourceCode = () => {
    setCodeBehindOpen(!codeBehindOpen);
  };
  const handleIndustryInfoClick = (open, text) => {
    setOpen(open);
    setIndustryText(text);
  };

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
            <IconButton onClick={handleClickSourceCode}>
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
                    handleIndustryInfoClick(true, industry.text);
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
        onClose={industry => {
          handleIndustryInfoClick(false, industry.text);
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
        maxWidth="xl"
        onClose={handleClickSourceCode}
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
