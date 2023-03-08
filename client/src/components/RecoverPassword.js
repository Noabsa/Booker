import "../styles/AccountForms.css";
import { useNavigate } from "react-router-dom";

function RecoverPassword() {
  let navigate = useNavigate();
  return (
    <div className="account-form fill">
      <h2>Password recovery</h2>
      <p>Plese, enter your mail and we send you a reset link</p>
      <div className="hide">
        <button>Log in with Google</button>
        <p>or</p>
      </div>
      <form onSubmit={(event) => event.preventDefault()}>
        <span>E-mail</span>
        <input placeholder="e-mail"></input>
        <button className="extra-h">Reset my password</button>
        <p>
          <a onClick={() => navigate("/")}>Back to homepage</a>
        </p>
      </form>
    </div>
  );
}
export default RecoverPassword;
