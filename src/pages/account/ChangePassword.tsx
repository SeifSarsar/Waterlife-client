import { Component } from "react";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../shared/buttons/Buttons.style";

import Translator from "../../shared/translations/Translator";
import {
  Label,
  Title,
  ErrorText,
  ErrorTextReturn,
  ColumnFlexInput,
  FlexButton,
} from "./Account.style";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { auth } from "../../FireBaseApp";
import { Page } from "./Account";
import { Input } from "../../shared/inputs/Inputs.style";
import ModalDialog from "../../shared/modal/Modal";

const lenghtPasswordMin = 8;
const lenghtPasswordMax = 30;

interface Props {
  changePage(page: Page): void;
}

interface State {
  password: string;
  newPassword: string;
  showErrorPasswordLenghtMin: boolean;
  verifyPassword: string;
  showErrorVerifyPasswordMatch: boolean;
  returnErrorChangePassword: string;
  showModal: boolean;
}

class ChangePassword extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      password: "",
      newPassword: "",
      showErrorPasswordLenghtMin: false,
      verifyPassword: "",
      showErrorVerifyPasswordMatch: false,
      returnErrorChangePassword: "",
      showModal: false,
    };

    this.outFocusVerifyPassword = this.outFocusVerifyPassword.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  outFocusVerifyPassword = () => {
    if (this.state.newPassword !== this.state.verifyPassword) {
      this.setState({ showErrorVerifyPasswordMatch: true });
    }
    if (this.state.newPassword.length < lenghtPasswordMin) {
      this.setState({ showErrorPasswordLenghtMin: true });
    }
  };

  setPassword = (event: any) => {
    let value: string = event.target.value;
    if (event.target.name === "password") {
      this.setState({ password: value });
    }
    if (event.target.name === "newPassword") {
      this.setState({ newPassword: value });
      if (
        value.length > lenghtPasswordMin &&
        value.length < lenghtPasswordMax
      ) {
        this.setState({ showErrorPasswordLenghtMin: false });
      }
    }
    if (event.target.name === "verifyPassword") {
      this.setState({ verifyPassword: value });
      if (value === this.state.newPassword) {
        this.setState({ showErrorVerifyPasswordMatch: false });
      }
    }
  };

  changePassword = () => {
    if (
      !this.state.showErrorVerifyPasswordMatch &&
      !this.state.showErrorPasswordLenghtMin &&
      this.state.newPassword !== ""
    ) {
      if (auth.currentUser !== null) {
        var email = auth.currentUser.email;
        if (email !== null) {
          signInWithEmailAndPassword(auth, email, this.state.password)
            .then(() => {
              // Signed in
              if (auth.currentUser !== null) {
                updatePassword(auth.currentUser, this.state.newPassword)
                  .then(() => {
                    // Update successful.
                    this.setState({
                      password: "",
                      newPassword: "",
                      verifyPassword: "",
                    });
                    this.setState({ returnErrorChangePassword: "" });
                    this.setState({ showModal: true });
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const text = Translator.getFirebaseError();
                    if (errorCode === "auth/email-already-exists") {
                      this.setState({ returnErrorChangePassword: text.emailalreadyexists });
                    } else if (errorCode === "auth/invalid-email") {
                      this.setState({ returnErrorChangePassword: text.invalidemail });
                    } else if (errorCode === "auth/user-not-found") {
                      this.setState({ returnErrorChangePassword: text.usernotfound });
                    } else if (errorCode === "auth/wrong-password") {
                      this.setState({ returnErrorChangePassword: text.wrongpassword });
                    } else {
                      this.setState({ returnErrorChangePassword: text.servererror });
                    }
                  });
              }
            })
            .catch((error) => {
              const errorCode = error.code;
              const text = Translator.getFirebaseError();
              if (errorCode === "auth/email-already-exists") {
                this.setState({
                  returnErrorChangePassword: text.emailalreadyexists,
                });
              } else if (errorCode === "auth/invalid-email") {
                this.setState({ returnErrorChangePassword: text.invalidemail });
              } else if (errorCode === "auth/user-not-found") {
                this.setState({ returnErrorChangePassword: text.usernotfound });
              } else if (errorCode === "auth/wrong-password") {
                this.setState({
                  returnErrorChangePassword: text.wrongpassword,
                });
              } else {
                this.setState({ returnErrorChangePassword: text.servererror });
              }
              // ..
            });
        }
      }
    }
  };

  render() {
    const {
      password,
      newPassword,
      showErrorPasswordLenghtMin,
      verifyPassword,
      showErrorVerifyPasswordMatch,
      returnErrorChangePassword,
      showModal,
    } = this.state;
    const text = Translator.getAccountText();

    return (
      <>
        <Title>{text.changepassword}</Title>

        <ColumnFlexInput>
          <Label>{text.oldpassword}</Label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={this.setPassword}
          ></Input>
        </ColumnFlexInput>

        <ColumnFlexInput>
          <Label>{text.newpassword}</Label>
          <Input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={this.setPassword}
            onBlur={this.outFocusVerifyPassword}
          ></Input>
          {showErrorPasswordLenghtMin && (
            <ErrorText>{text.charpassw}</ErrorText>
          )}
        </ColumnFlexInput>

        <ColumnFlexInput>
          <Label>{text.confirm}</Label>
          <Input
            type="password"
            name="verifyPassword"
            value={verifyPassword}
            onChange={this.setPassword}
            onBlur={this.outFocusVerifyPassword}
          ></Input>
          {showErrorVerifyPasswordMatch && (
            <ErrorText>{text.wrongpwd}</ErrorText>
          )}
        </ColumnFlexInput>

        <ErrorTextReturn>{returnErrorChangePassword}</ErrorTextReturn>

        <FlexButton>
          <SecondaryButton
            onClick={() => this.props.changePage(Page.PersonalInfo)}
          >
            {text.cancel}
          </SecondaryButton>
          <PrimaryButton onClick={this.changePassword}>
            {text.save}
          </PrimaryButton>
        </FlexButton>

        <ModalDialog
          handleClose={() => {
            this.setState({ showModal: false });
          }}
          onConfirm={() => {
            this.props.changePage(Page.PersonalInfo);
          }}
          show={showModal}
          title={Translator.getConfirmationsText().passwordconfirm}
          secondaryBtn={false}
          primaryBtnText={"Ok"}
        />
      </>
    );
  }
}

export default ChangePassword;
