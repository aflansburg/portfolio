```
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CodeIconOutline from "@material-ui/icons/CodeOutlined";
import CompanyGrid from "./components/CompanyGrid";
import Expansions from "./components/Expansions";
import profileAvatar from "./images/profile.jpeg";
import IndustryGrid from "./components/IndustryGrid";
import SkillsGrid from "./components/SkillsGrid";
import {
  Paper,
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  Typography,
  Button,
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
import TextMarkdown from "./components/TextMarkdown";
import AppCodeBlock from "./components/component_codeblocks/AppCodeBlock.md";
import WelcomeDialog from "./components/WelcomeDialog";
import Bio from "./data/bio.md";
import "./Styles.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
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
  bio: {
    padding: 12,
    background: "rgba(255,255,255,0.9)"
  }
}));

function App() {
  const classes = useStyles();
  const med = useMediaQuery("(min-width:960px)");
  const mobileHeight = useMediaQuery("(min-height:812px)");
  const show = localStorage.getItem("showWelcome") === "false" ? false : true;
  const [source, setSource] = useState();
  const [bioText, setBio] = useState();
  const [codeBehindOpen, setCodeBehindOpen] = useState(false);
  const [welcomeDialog, setWelcomeDialog] = useState(show);

  function hideWelcome() {
    localStorage.setItem("showWelcome", false);
    setWelcomeDialog(false);
  }

  useEffect(() => {
    fetch(AppCodeBlock)
      .then(res => res.text())
      .then(md => {
        setSource(md);
      });
    fetch(Bio)
      .then(res => res.text())
      .then(b => setBio(b));
  });

  return (
    <div className="Root">
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
                  <Tooltip title="View source code for main component (App.js)">
                    <IconButton
                      style={{ background: "#fff" }}
                      onClick={() => {
                        setCodeBehindOpen(true);
                      }}
                    >
                      <CodeIconOutline />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Click here to add me on LinkedIn">
                    <IconButton
                      onClick={() => {
                        window.location.assign(
                          "https://www.linkedin.com/in/abramflansburg/"
                        );
                      }}
                    >
                      <img src={linkedin} style={{ width: 40 }} />
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
              <Paper className={classes.bio}>
                <ReactMarkdown
                  source={bioText || ""}
                  renderers={{ text: TextMarkdown }}
                />
              </Paper>
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
        <WelcomeDialog open={welcomeDialog} />
      </Container>
    </div>
  );
}

export default App;
```
