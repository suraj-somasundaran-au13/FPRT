import { profileTypes } from '../actionTypes';

const initialState = {
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    token: ""
};


const profile = (state, action) => {
    const storedInfo = JSON.parse(localStorage.getItem('profileInfo')) || {}
    state = state?.email ? state : { ...initialState, ...storedInfo };
    switch (action.type) {
        case profileTypes.setDetails: {
            console.log("My images array before sending to localstorage:",action.payload.data.myImages)
            const userData = {
                email: action.payload.data.email,
                firstName: action.payload.data.firstName,
                lastName: action.payload.data.lastName,
                myImages: action.payload.data.myImages,
                token:action.payload.token
            }
            localStorage.setItem('profileInfo', JSON.stringify(userData));
            return userData;
        }
        case profileTypes.getUserInfo: {
            const userData = {
                ...action.payload.data, token:action.payload.token
                
            };
            localStorage.setItem('profileInfo', JSON.stringify(userData));
            return userData;
        }
        case profileTypes.removeDetails: {
            localStorage.removeItem('profileInfo');
            return initialState;
        }
        default:
            return state;
    }
};

export default profile;