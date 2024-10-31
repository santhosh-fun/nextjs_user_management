import React from "react";
import { Button, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { MdArrowBack } from "react-icons/md";

interface ActionBarProps {
  onBack: () => void;
  onCreate: () => void;
  title?: string;
}

const ActionBar: React.FC<ActionBarProps> = ({
  onBack,
  onCreate,
  title = "Page Title",
}) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Back Button */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={onBack}
          aria-label="back"
        >
          <MdArrowBack size={24} />
        </IconButton>

        {/* Title */}
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: "center" }}>
          {title}
        </Typography>

        {/* Create Button */}
        <Button color="inherit" onClick={onCreate}>
          Create
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default ActionBar;
