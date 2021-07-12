import * as actionTypes from "../actionTypes";


export const authAction = {
    login: () => ({ type: actionTypes.authTypes.login }),
    logout: () => ({ type: actionTypes.authTypes.logout })
}

export const loaderActions = {
    start: () => ({ type: actionTypes.loaderTypes.start }),
    stop: () => ({ type: actionTypes.loaderTypes.stop })
}

export const profileAction = {
    setDetails: (payload) => ({
        type: actionTypes.profileTypes.setDetails, payload
    }),
    removeDetails: () => ({
        type: actionTypes.profileTypes.removeDetails
    })
}


export const imageActions = {
    getList: (dispatch) => {
        dispatch(loaderActions.start());

        const url = `https://fprt-backend-server.herokuapp.com/auth/allimages`;
        console.log("Image API URL: ", url)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log("Data from API::", data)
                dispatch({
                    type: actionTypes.imageType.allImages,
                    payload: data.data
                });
                dispatch(loaderActions.stop());
            }).catch(error => {
                console.log("Error: ", error.message)
                dispatch(loaderActions.stop());
            })

    },

    getUserImages: (payload) => ({
        type: actionTypes.imageType.myImages,
        payload
    })
}
