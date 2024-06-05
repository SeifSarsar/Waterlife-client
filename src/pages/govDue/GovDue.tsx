import { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import "react-edit-text/dist/index.css";
import "../../FireBaseApp";
import {
  Amount,
  ColumnContainer,
  ColumnFlexInput,
  Country,
  Line,
  List,
  ReverseButton,
  Text,
} from "./GovDue.style";
import { GovDueList } from "../../models/GovDueList";
import AxiosHandler from "../../shared/AxiosHandler";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props extends RouteComponentProps {}

interface State {
  govInfos: GovDueList[];
  open: boolean;
  currentState: String;
}

class GovDue extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      govInfos: [],
      open: false,
      currentState: "",
    };

    this.getGovDue = this.getGovDue.bind(this);
    this.getGovDue();
  }

  getGovDue = async () => {
    AxiosHandler.get("/get/govdue")
      .then((res) => {
        if (res) {
          const govInfos: GovDueList[] = res.data;
          this.setState({ govInfos });
        }
      })
      .catch(() => {});
  };

  resetAmount = (stateC: String) => {
    this.setState({ open: false });
    const reset = {
      state: stateC,
      amount: 0,
      dateLastReset: new Date(),
      resetOnce: true,
    };
    AxiosHandler.put("/reset/govdue", reset)
      .then((res) => {
        if (res) {
          this.getGovDue();
        }
      })
      .catch(() => {});
  };

  getText(state: String) {
    switch (state) {
      case "FED":
        return "Fédéral";
      case "DON":
        return "Donnations";
      default:
        return state;
    }
  }

  handleClickOpen = (currentState: String) => {
    this.setState({ open: true, currentState: currentState });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  setTwoNumberDecimal(number: Number) {
    return number.toFixed(2);
  }

  render() {
    const { govInfos } = this.state;
    return (
      <ColumnFlexInput>
        <List>
          {govInfos.map((govInfos: GovDueList) => (
            <ColumnContainer>
              <Text>
                <Country>{this.getText(govInfos.state)}</Country>
                <Line />
                <Amount>
                  {this.setTwoNumberDecimal(govInfos.amount) + " $"}
                </Amount>
              </Text>
              <ReverseButton
                onClick={() => this.handleClickOpen(govInfos.state)}
              >
                Payé
              </ReverseButton>
              {govInfos.resetOnce &&
                new Date(govInfos.dateLastReset).toLocaleString()}
            </ColumnContainer>
          ))}
        </List>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Successful Alert"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Êtes vous sur de vouloir mettre payé pour{" "}
              {this.state.currentState} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <ReverseButton
              style={{ width: "50%" }}
              onClick={this.handleClose}
              color="primary"
            >
              Non
            </ReverseButton>
            <ReverseButton
              style={{ width: "50%" }}
              onClick={() => this.resetAmount(this.state.currentState)}
              color="primary"
            >
              Oui
            </ReverseButton>
          </DialogActions>
        </Dialog>
      </ColumnFlexInput>
    );
  }
}

export default withRouter(GovDue);

//onClick={() => this.resetAmount(govInfos.state)}
