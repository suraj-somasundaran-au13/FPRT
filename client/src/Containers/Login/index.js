import {useState} from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authAction, profileAction, imageActions } from "../../actions"
import "./login.scss";

const Login = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [message, setMessage] = useState("");

    const handleInput = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://fprt-backend-server.herokuapp.com/api/login", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then(res => res.json())
          .then(data => {
            if (data.error) {
                setMessage(data.error);
                dispatch(authAction.logout());
            } else {
                setMessage(data.message);
                dispatch(authAction.login());
                dispatch(profileAction.setDetails({data: data.data, token:data.token}));
                console.log("My Images: ",data.data.myImages)
                dispatch(imageActions.getUserImages(data.data.myImages));
                history.push("/");
            }
          }).catch(err => {
            console.log(err);
              dispatch(authAction.logout());
        })
    }

    return (
        <div className="box">
            <h1 className="title">Sign In</h1>
            <p className="has-account">
                Don't have an account?&nbsp;
                <Link to="/signup" className="signin"
                    >
                    <u>Sign Up</u>
                </Link>
            </p>
            <form onSubmit={handleSubmit}>
                
                <input
                    className="textfield"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    required
                    onChange={handleInput} />
                <input
                    className="textfield"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    autoComplete
                    onChange={handleInput} />
                <button
                    className="signup"
                    type="submit"
                    onClick={handleSubmit}>
                    <b>&nbsp;</b>
                    Login
                    <b className="arrow">&#10095;</b>
                </button>

            </form>
            <div >
                <p className="error">{message}</p>
            </div>
        </div>
    );
}

export default Login;