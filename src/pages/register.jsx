import { Link } from "react-router-dom";
import { useAuth } from "../components/authcontext";
import "./login.css";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password_confirmation = e.target.password_confirmation.value;
    const is_volunteer = e.target.is_volunteer.value === "on";
    await register(name, email, password, password_confirmation, is_volunteer);
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
            <h3>Signup</h3>
            <div className="d-flex justify-content-end social_icon">
              <span>
                <i className="fa fa-search" aria-hidden="true"></i>
              </span>
            </div>
          </div>
          <div className="card-body">
            <form
              onSubmit={handleRegister}
              className="d-flex flex-column gap-4"
            >
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Your Name"
                />
              </div>
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
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key"></i>
                  </span>
                </div>
                <input
                  type="password"
                  name="password_confirmation"
                  className="form-control"
                  placeholder="Confirm password"
                />
              </div>
              <div className="d-flex align-items-center remember">
                <input type="checkbox" name="is_volunteer" />
                Are you a volunteer?
              </div>
              <br />
              <br />
              <div className="text-center">
                <button
                  type="submit"
                  value="Login"
                  className="btn btn-warning text-center"
                >
                  Signup
                </button>
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Already have an account?<Link to="/login">Signin</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
