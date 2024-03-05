import { Link } from "react-router-dom";
import { useAuth } from "../components/authcontext";
import "./login.css";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const res = await login(email, password);
    if (!res) {
      return;
    }
    navigate("/");
  };

  if (user) {
    return <div>You are already logged in</div>;
  }
  return (
    <>
      <div className={"body "}>
        <div className="card card-auth">
          <div className="card-header">
            <h3>Sign In</h3>
            <div className="d-flex justify-content-end social_icon">
              <span>
                <i className="fa fa-search" aria-hidden="true"></i>
              </span>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={handleLogin} className="d-flex flex-column gap-4">
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="E-Mail Address"
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key"></i>
                  </span>
                </div>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="password"
                />
              </div>
              <br />
              <br />
              <div className="text-center">
                <button
                  type="submit"
                  value="Login"
                  className="btn btn-warning text-center"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Don't have an account?<Link to="/register">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
