```
import React, { useState, useEffect } from "react";
import CodeIcon from "@material-ui/icons/Code";
import CloseIcon from "@material-ui/icons/Close";
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  IconButton,
  DialogContentText,
  DialogActions,
  DialogTitle
} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import WelcomeDialogCodeBlock from "./component_codeblocks/WelcomeDialogCodeBlock.md";

export default function(props) {
  const [welcomeDialog, setWelcomeDialog] = useState(props.open);
  const [showCodeBlock, setShowCodeBlock] = useState(false);
  const [source, setSource] = useState();

  useEffect(() => {
    fetch(WelcomeDialogCodeBlock)
      .then(res => res.text())
      .then(md => {
        setSource(md);
      });
  });

  function hideWelcome() {
    localStorage.setItem("showWelcome", false);
    setWelcomeDialog(false);
  }

  return (
    <React.Fragment>
      <Dialog
        open={welcomeDialog}
        fullScreen={false}
        maxWidth="md"
        onClose={() => {
          setWelcomeDialog(false);
        }}
      >
        <DialogTitle>
          <IconButton
            style={{ float: "right" }}
            onClick={() => {
              setWelcomeDialog(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Greetings! Thanks for visiting. I have written this site in React
            utilizing the Material design spec from Google. I have also utilized
            their Material-UI library to create a responsive experience. <br />
            <br />
          </DialogContentText>
          <Typography>
            When you see this icon,{" "}
            <IconButton
              onClick={() => {
                setShowCodeBlock(true);
              }}
            >
              <CodeIcon />
            </IconButton>
            , you can click and see the source code behind the various React
            elements
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              hideWelcome();
            }}
          >
            Don't show this next time
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showCodeBlock}
        onClose={() => {
          setShowCodeBlock(false);
        }}
      >
        <DialogContent>
          <ReactMarkdown
            source={source || ""}
            renderers={{ code: CodeBlock }}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
```