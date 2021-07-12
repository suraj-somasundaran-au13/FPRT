import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Link, useHistory} from "react-router-dom";
// import logo from "../../images/logo.png";
import { authAction, imageActions} from "../../actions"
import Addimage from "../AddImage/addimage";
import "./navbar.scss";

function Navbar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const userDetails = useSelector(state => state.profile);

    const handleLogout = () => {
        console.log("Logged out!")
        localStorage.removeItem("profileInfo");
        setUser(null)
        dispatch(authAction.logout());
        history.push("/login")
    }

    useEffect(()=> {
        setUser(userDetails?.email ? userDetails : null);
    },[userDetails])

    useEffect(() => {
        dispatch(imageActions.getList)
        const user = JSON.parse(localStorage.getItem("profileInfo"))
        console.log("User from localStorage: ", user)
        if (user) {
            setUser(user)
            dispatch(authAction.login())
            
        }
    }, [dispatch])

    const setMyImages = () => {
        dispatch(imageActions.getUserImages(userDetails.myImages))
    }

    const setAllImages = () => {
        dispatch(imageActions.getList)
    }

    return (
    <>

       {
                showModal && <div className="uploadmodal">
                    <Addimage />
                </div>
       }
        <div className="navbar">
            <div className="navbar__left">
                <Link to="/">
                    <div className="navbar__left_home">
                        <i className='bx bxs-home-heart'></i>
                    </div>
                </Link>
                <div className="navbar__upload_img" onClick={() => setShowModal(!showModal)}>
                    <i className='bx bxs-cloud-upload' ></i>
                </div>
            </div>
            <div className="navbar__center">
                {user && <h2>{`Welcome, ${user.firstName}`}</h2>}
            </div>
            <div className="navbar__right">
                <div className="navbar__left_images btn" onClick={setAllImages}>
                    <h4>All Images</h4>
                </div>
                {
                    user && <div className="navbar__left_images btn" onClick={setMyImages}>
                        <h4>My Images</h4>
                    </div>
                }
                {
                    !user && <Link to="/login" className="navbar__right_link btn"><h4>Login</h4></Link>}
                {    !user &&  <Link to="/signup" className="navbar__right_link btn"><h4>Signup</h4></Link>
                }
                {
                    user && <div className="navbar__right_link btn" onClick={handleLogout}><h4>Logout</h4></div>
                }
                
                
            </div>

        </div>
        </>
    )
}

export default Navbar
