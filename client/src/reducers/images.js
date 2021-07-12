import { imageType } from '../actionTypes';


const initialState = [];

const images = (state, action) => {
    state = state || initialState;


    switch (action.type) {
        case imageType.allImages:
            return action.payload;

        case imageType.myImages:
            return action.payload;

        default:
            return state
    }

}

export default images;