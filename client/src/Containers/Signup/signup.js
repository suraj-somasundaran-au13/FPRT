import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authAction } from "../../actions";
import "../Login/login.scss";


const Signup = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const [message, setMessage] = useState("");

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:1234/api/signup", {
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
                }
            }).catch(err => {
                console.log(err);
                setMessage(err.message);
            })
    }

    return (
        <div className="box">
            <h1 className="title">Create account</h1>
            <p className="has-account">
                Already have an account?&nbsp;
                <Link to="/login" className="signin">
                    <u>Sign In</u>
                </Link>
            </p>
            <form>
                <input
                    className="textfield"
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    required
                    onChange={handleInput} />
                <input
                    className="textfield"
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInput} />
                <input
                    className="textfield"
                    type="text"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleInput} />
                <input
                    className="textfield"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleInput} />
                <button
                    className="signup"
                    type="button"
                    onClick={handleSubmit}>
                    <b>&nbsp;</b>
                    Sign up
                    <b className="arrow">&#10095;</b>
                </button>

            </form>
            <div >
                <p className="error">{message}</p>
            </div>
        </div>
    );
}

export default Signup;