import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props {
  handleClose: any;
  onConfirm: any;
  show: boolean;
  title: string;
  text?: string;
  primaryBtnText: string;
  secondaryBtn: boolean;
  secondaryBtnText?: string;
}

const ModalDialog = (props: Props) => {
  const {
    show,
    handleClose,
    title,
    text,
    secondaryBtn,
    secondaryBtnText,
    primaryBtnText,
    onConfirm,
 } = props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      {text && <Modal.Body>{text}</Modal.Body>}
      <Modal.Footer>
        {secondaryBtn && 
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{
                backgroundColor: "white",
                color: "#4da7bc",
                border: "1px solid #4da7bc",
            }}
          >
            {secondaryBtnText}
          </Button>
        }
        <Button
          variant="primary"
          onClick={onConfirm}
          style={{
              backgroundColor: "#4da7bc",
              color: "white",
              border: "1px solid #4da7bc",
          }}
        >
          {primaryBtnText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDialog;
