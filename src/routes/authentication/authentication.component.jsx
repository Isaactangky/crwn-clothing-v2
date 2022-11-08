import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import "./authentication.styles.scss";
import { selectUserError } from "../../store/user/user.selector";
import { useSelector } from "react-redux";
import { Fragment } from "react";
const Authentication = () => {
  const userError = useSelector(selectUserError);
  return (
    <Fragment>
      {/* {userError && <p className="user-error-message">{userError.message}</p>} */}

      <div className="authentication-container">
        <SignInForm />
        <SignUpForm />
      </div>
    </Fragment>
  );
};
export default Authentication;

/* <button onClick={signInWithGoogleRedirect}>
        Sign In with Google Redirect
      </button> */
// useEffect(async () => {
//   const response = await getRedirectResult(auth);
//   if (response) {
//     const userDocRef = await createUserDocumentFromAuth(response.user);
//   }
// }, []);
