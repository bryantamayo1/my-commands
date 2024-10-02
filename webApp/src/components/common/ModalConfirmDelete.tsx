import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "../common/Alert";

type ModalConfirmDeleteProps = {
  open: boolean;
  onClose: () => void;
  ariaLabelledby: string;
  ariaDescribedby: string;
  title: string;
  message: string;
  deleteItem: () => void;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: 200,
    sm: 400,
  },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalConfirmDelete = ({
  open,
  onClose,
  ariaLabelledby,
  ariaDescribedby,
  title,
  message,
  deleteItem,
}: ModalConfirmDeleteProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
    >
      <Box sx={style}>
        {/* Btn close modal */}
        <div className="mc-modal-btn-close ">
          <Button color="inherit" style={{ minWidth: 20 }} onClick={onClose}>
            <CloseIcon />
          </Button>

          <p
            className="mc-modal-create-category-title"
            style={{ textAlign: "start" }}
          >
            {title}
          </p>

          <Alert severity="error">
            <div style={{ textAlign: "start" }}>{message}</div>
          </Alert>

          <div className="mc-modal-create-category-btn-submit">
            <Button variant="contained" color="secondary" onClick={deleteItem}>
              Delete
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
