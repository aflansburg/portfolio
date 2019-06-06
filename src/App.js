import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CodeIconOutline from "@material-ui/icons/CodeOutlined";
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutline from "@material-ui/icons/PauseCircleOutlineOutlined";
import CompanyGrid from "./components/CompanyGrid";
import Expansions from "./components/Expansions";
import profileAvatar from "./images/profile.jpeg";
import IndustryGrid from "./components/IndustryGrid";
import SkillsGrid from "./components/SkillsGrid";
import {
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Container,
  Grid,
  Divider,
  Tooltip
} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import linkedin from "./images/linkedin.png";
import CodeBlock from "./components/CodeBlock";
import AppCodeBlock from "./components/component_codeblocks/AppCodeBlock.md";
import WelcomeDialog from "./components/WelcomeDialog";
import Bio from "./components/Bio";
import "./Styles.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  bg: {
    "-webkit-animation": "100s scroll infinite linear",
    "-moz-animation": "100s scroll infinite linear",
    "-o-animation": "100s scroll infinite linear",
    "-ms-animation": "100s scroll infinite linear",
    animation: "100s scroll infinite linear"
  },
  title: {
    flexGrow: 1
  },
  sectionHeader: {
    background: "rgba(102,130,126,0.34)",
    width: "100%",
    padding: "4px 12px",
    color: "#fff",
    textShadow: "2px 2px 4px #424242"
  },
  appBar: {
    marginBottom: 12,
    background: "#66827e"
  },
  bigAvatar: {
    margin: 4,
    width: 60,
    height: 60
  },
  smallAvatar: {
    margin: 4,
    width: 40,
    height: 40
  },
  headerIconButton: {
    background: "#fff",
    margin: 12
  },
  mobileIconContainer: {
    position: "absolute",
    right: "1rem",
    flexGrow: "unset",
    flexBasis: "unset"
  },
  nonMobileIconContainer: {},
  mobileCodeMarkdown: {
    fontSize: 10
  }
}));

function App() {
  const classes = useStyles();
  const med = useMediaQuery("(min-width:960px)");
  const sm = useMediaQuery("(max-width:600px)");
  const xs = useMediaQuery("(max-width:500px");
  const show = localStorage.getItem("showWelcome") === "false" ? false : true;
  const [source, setSource] = useState();
  const [animateBg, setAnimateBg] = useState(false);
  const [codeBehindOpen, setCodeBehindOpen] = useState(false);

  useEffect(() => {
    fetch(AppCodeBlock)
      .then(res => res.text())
      .then(md => {
        setSource(md);
      });
  });

  const handleSourceCodeClick = () => {
    setCodeBehindOpen(!codeBehindOpen);
  };
  const handleLinkedInClick = () => {
    window.location.assign("https://www.linkedin.com/in/abramflansburg/");
  };
  const handleAnimateBgClick = () => {
    setAnimateBg(!animateBg);
  };

  return (
    <div className={animateBg ? classNames(classes.bg, "Root") : "Root"}>
      <Container maxWidth="xl" className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Grid container justify="space-between" alignItems="center">
              <Grid
                item
                container
                spacing={2}
                xs={7}
                sm={6}
                md={4}
                alignItems="center"
              >
                <Grid item xs={4} lg={3}>
                  <Avatar
                    alt="Abram Flansburg"
                    src={profileAvatar}
                    className={sm ? classes.smallAvatar : classes.bigAvatar}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant={!sm ? "h6" : "subtitle1"}
                    style={{ fontSize: sm && 12 }}
                  >
                    Abram Flansburg
                  </Typography>
                  <Typography
                    variant={!sm ? "overline" : "subtitle1"}
                    style={{ fontSize: sm && 10 }}
                  >
                    Software Developer
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                justify="flex-end"
                alignItems="center"
                sm={6}
                xl={6}
                className={
                  sm
                    ? classes.mobileIconContainer
                    : classes.nonMobileIconContainer
                }
              >
                <Grid item>
                  <Tooltip
                    title={
                      <span>
                        Toggle background animation.
                        <br />
                        May not work in older browser versions.
                      </span>
                    }
                  >
                    <IconButton
                      onClick={handleAnimateBgClick}
                      className={classes.headerIconButton}
                      size="small"
                    >
                      {animateBg ? (
                        <PauseCircleOutline
                          fontSize={!sm ? "large" : "small"}
                        />
                      ) : (
                        <PlayCircleOutline fontSize={!sm ? "large" : "small"} />
                      )}
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="View source code for main component (App.js)">
                    <IconButton
                      className={classes.headerIconButton}
                      onClick={handleSourceCodeClick}
                      size="small"
                    >
                      <CodeIconOutline fontSize={!sm ? "large" : "small"} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Click here to add me on LinkedIn">
                    <IconButton onClick={handleLinkedInClick}>
                      <img
                        src={linkedin}
                        style={{ width: !sm ? 40 : 24 }}
                        alt="LinkedIn"
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container spacing={4} direction="row" justify="center">
          <Grid item container direction="column" xs={12} sm={6} spacing={2}>
            <Grid
              item
              container
              direction="row"
              justify="space-between"
              alignContent="center"
              alignItems="center"
            >
              <Grid item className={classes.sectionHeader}>
                <Typography variant="h6">About Me</Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid item>
              <Bio />
            </Grid>
          </Grid>
          <Grid item container direction="column" xs={12} sm={6} spacing={2}>
            <Grid
              item
              container
              direction="row"
              justify="space-between"
              alignContent="center"
              alignItems="center"
            >
              <Grid item className={classes.sectionHeader}>
                <Typography variant="h6">Experience</Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid item>
              <Expansions headline={"Industries"}>
                <IndustryGrid />
              </Expansions>
            </Grid>
            <Grid item>
              <Expansions
                headline={
                  med ? "Languages, Frameworks, and Technologies" : "Skills"
                }
              >
                <SkillsGrid />
              </Expansions>
            </Grid>
            <Grid item>
              <Expansions
                headline={med ? "Current & Previous Employers" : "Employers"}
              >
                <CompanyGrid />
              </Expansions>
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          open={codeBehindOpen}
          fullScreen={false}
          maxWidth="xl"
          onClose={handleSourceCodeClick}
        >
          <DialogContent>
            <ReactMarkdown
              className={
                med ? classes.codeMarkdown : classes.mobileCodeMarkdown
              }
              source={source || ""}
              renderers={{ code: CodeBlock }}
            />
          </DialogContent>
        </Dialog>
        <WelcomeDialog open={show} />
      </Container>
    </div>
  );
}

export default App;
