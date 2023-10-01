import "./morePopper.scss";
import Popper from "@mui/material/Popper";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

function MorePopper({ moreOpen, anchorEl, placement }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
    }
   return (
    <Popper
      open={moreOpen}
      anchorEl={anchorEl}
      placement={placement}
      transition
      className="popper"
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className="container">
            <Button startIcon={<EditIcon />} className="item">Edit</Button>
            <Button startIcon={<DeleteIcon />} className="item" onClick={handleDeleteDialogOpen}>Delete</Button>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
}

export default MorePopper;
