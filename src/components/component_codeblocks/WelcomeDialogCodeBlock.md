```
import React, { useState, useEffect } from "react"; ... // truncated

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

  const handleHideWelcome = () => {
    localStorage.setItem("showWelcome", false);
    setWelcomeDialog(false);
  };

  const handleShowCodeBlock = () => {
    setShowCodeBlock(!showCodeBlock);
  };

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
        <DialogTitle disableTypography>
          <Typography
            variant="h6"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            Welcome!
            <IconButton
              style={{ float: "right" }}
              onClick={() => {
                setWelcomeDialog(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            Greetings! Thanks for checking out my portfolio site. I have written
            this site in React.js utilizing the Material design spec from
            Google. I have also utilized their Material-UI library to create a
            responsive experience. If you're on your mobile device, try rotating
            your screen to checkout the landscape view!
            <br />
            <br />
            When you see this icon,{" "}
            <IconButton onClick={handleShowCodeBlock}>
              <CodeIcon />
            </IconButton>
            , you can click and see the source code behind the various React
            elements. Go ahead and try clicking that button in this sentence
            now!
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions style={{ marginTop: 4 }}>
          <Button onClick={handleHideWelcome}>Don't show this next time</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showCodeBlock} onClose={handleShowCodeBlock} maxWidth="xl">
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
