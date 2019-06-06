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
    margin: 10,
    width: 60,
    height: 60
  },
  headerIconButton: {
    background: "#fff",
    margin: 12
  }
}));

function App() {
  const classes = useStyles();
  const med = useMediaQuery("(min-width:960px)");
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
            <Avatar
              alt="Abram Flansburg"
              src={profileAvatar}
              className={classes.bigAvatar}
            />
            <Grid
              container
              justify="space-between"
              alignItems="center"
              style={{ padding: 12 }}
            >
              <Grid item>
                <Typography variant="h6">Abram Flansburg</Typography>
                <Typography variant="overline">Software Developer</Typography>
              </Grid>
              <Grid
                item
                container
                xs={3}
                justify={med ? "flex-end" : "center"}
                alignItems="center"
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
                        <PauseCircleOutline fontSize="large" />
                      ) : (
                        <PlayCircleOutline fontSize="large" />
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
                      <CodeIconOutline fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Click here to add me on LinkedIn">
                    <IconButton onClick={handleLinkedInClick}>
                      <img
                        src={linkedin}
                        style={{ width: 40 }}
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
