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
import { updateEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FireBaseApp";
import AxiosHandler from "../../shared/AxiosHandler";
import { AuthContext } from "../../contexts/AuthContext";
import { Page } from "./Account";
import { Input } from "../../shared/inputs/Inputs.style";
import ModalDialog from "../../shared/modal/Modal";

interface Props {
  changePage(page: Page): void;
}

interface State {
  newEmail: string;
  missingNewEmail: boolean;
  password: string;
  returnErrorChangeEmail: string;
  showErrorPasswordLenghtMin: boolean;
  showModal: boolean;
}

class ChangeEmail extends Component<Props, State> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  constructor(props: Props) {
    super(props);
    this.state = {
      newEmail: "",
      missingNewEmail: false,
      password: "",
      returnErrorChangeEmail: "",
      showErrorPasswordLenghtMin: false,
      showModal: false,
    };

    this.changeEmail = this.changeEmail.bind(this);
    this.verifyInformation = this.verifyInformation.bind(this);
  }

  setEmail = (event: any) => {
    if (event.target.name === "newEmail") {
      this.setState({ newEmail: event.target.value });
    }
    if (event.target.name === "password") {
      this.setState({ password: event.target.value });
    }
  };

  changeEmail = () => {
    const user = this.context.user;
    if (!user) return;

    if (this.state.newEmail === "") {
      this.setState({ missingNewEmail: true });
    } else {
      this.setState({ missingNewEmail: false });
      if (this.verifyInformation()) {
        if (auth.currentUser !== null) {
          var oldEmail = auth.currentUser.email;
          if (oldEmail !== null) {
            signInWithEmailAndPassword(auth, oldEmail, this.state.password)
              .then(() => {
                // Signed in
                if (auth.currentUser !== null) {
                  updateEmail(auth.currentUser, this.state.newEmail)
                    .then(() => {
                      // Email updated
                      if (auth.currentUser !== null && auth.currentUser.email) {
                        // this.setState({ email: auth.currentUser.email });

                        AxiosHandler.put(`/update/user/${user._id}`, {
                          email: this.state.newEmail,
                        })
                          .then(() => {
                            this.context.setUser({
                              ...user,
                              email: this.state.newEmail,
                            });
                            // this.setState({ newEmail: '', password: '' });
                            // this.setState({ returnErrorChangeEmail: '' });
                            this.setState({ showModal: true });
                          })
                          .catch((error) => {
                            const errorMessage = error.message;
                            if (
                              auth.currentUser !== null &&
                              oldEmail !== null
                            ) {
                              updateEmail(auth.currentUser, oldEmail);
                            }
                            this.setState({
                              returnErrorChangeEmail: errorMessage,
                            });
                          });
                      }
                    })
                    .catch((error) => {
                      const errorCode = error.code;
                      const text = Translator.getFirebaseError();
                      if (errorCode === "auth/email-already-exists") {
                        this.setState({
                          returnErrorChangeEmail: text.emailalreadyexists,
                        });
                      } else if (errorCode === "auth/invalid-email") {
                        this.setState({
                          returnErrorChangeEmail: text.invalidemail,
                        });
                      } else if (errorCode === "auth/user-not-found") {
                        this.setState({
                          returnErrorChangeEmail: text.usernotfound,
                        });
                      } else if (errorCode === "auth/wrong-password") {
                        this.setState({
                          returnErrorChangeEmail: text.wrongpassword,
                        });
                      } else {
                        this.setState({
                          returnErrorChangeEmail: text.servererror,
                        });
                      }
                    });
                }
              })
              .catch((error) => {
                const errorCode = error.code;
                const text = Translator.getFirebaseError();
                if (errorCode === "auth/email-already-exists") {
                  this.setState({
                    returnErrorChangeEmail: text.emailalreadyexists,
                  });
                } else if (errorCode === "auth/invalid-email") {
                  this.setState({ returnErrorChangeEmail: text.invalidemail });
                } else if (errorCode === "auth/user-not-found") {
                  this.setState({ returnErrorChangeEmail: text.usernotfound });
                } else if (errorCode === "auth/wrong-password") {
                  this.setState({ returnErrorChangeEmail: text.wrongpassword });
                } else {
                  this.setState({ returnErrorChangeEmail: text.servererror });
                }
              });
          }
        }
      }
    }
  };

  verifyInformation = (): Boolean => {
    let valid: Boolean = true;
    if (this.state.newEmail === "") {
      valid = false;
      this.setState({ missingNewEmail: true });
    } else {
      this.setState({ missingNewEmail: false });
    }
    return valid;
  };

  render() {
    const {
      newEmail,
      missingNewEmail,
      returnErrorChangeEmail,
      password,
      showModal,
    } = this.state;
    const text = Translator.getAccountText();

    return (
      <>
        <Title>{text.changeemail}</Title>

        <ColumnFlexInput>
          <Label>{text.newemail}</Label>
          <Input
            type="text"
            name="newEmail"
            value={newEmail}
            onChange={this.setEmail}
          ></Input>
          {missingNewEmail && <ErrorText>{text.require}</ErrorText>}
        </ColumnFlexInput>

        <ColumnFlexInput>
          <Label>{text.password}</Label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={this.setEmail}
          ></Input>
        </ColumnFlexInput>

        <FlexButton>
          <SecondaryButton
            onClick={() => this.props.changePage(Page.PersonalInfo)}
          >
            {text.cancel}
          </SecondaryButton>
          <PrimaryButton onClick={this.changeEmail}>{text.save}</PrimaryButton>
        </FlexButton>

        <ErrorTextReturn>{returnErrorChangeEmail}</ErrorTextReturn>

        <ModalDialog
          handleClose={() => {
            this.setState({ showModal: false });
          }}
          onConfirm={() => {
            this.props.changePage(Page.PersonalInfo);
          }}
          show={showModal}
          title={Translator.getConfirmationsText().emailconfirm}
          secondaryBtn={false}
          primaryBtnText={"Ok"}
        />
      </>
    );
  }
}

export default ChangeEmail;
