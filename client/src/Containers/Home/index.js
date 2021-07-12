import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import { imageActions } from '../../actions';
import "./home.scss";

function Home() {
    const allImages = useSelector(state => state.images);
    const user = useSelector(state => state.profile);
    const dispatch = useDispatch()
    
    const [showPhotoList, setShowPhotoList] = useState(true);
    const [selectedImage, setSelectedImage] = useState(allImages[0]);

    useEffect(()=> {
        // dispatch(imageActions.getUserImages(user.myImages));
        setSelectedImage(allImages[0])
    },[allImages, dispatch]);
    console.log("All Images: ",allImages)

    return (
        <div className="home">
            {
                selectedImage && <div className="home__imagedisplay">
                    <div className="home__imagedisplay_image">
                        <img src={selectedImage?.image_url} alt={selectedImage?.title} />
                    </div>
                    <div className="home__imagedisplay_details">
                        <h3>{selectedImage?.title}</h3>
                        <p>{`Photo by ${selectedImage?.image_by}`}</p>
                    </div>
                </div>
            }


            <div className="home__showlist">
                <p className="show_hide" onClick={() => setShowPhotoList(!showPhotoList)}>{showPhotoList? "Hide Photo List" : "Show Photo List"} </p>
            </div>
                <div className="home__imagelistwrapper">
                    {
                        showPhotoList && <div className="home__imageslist">
                            {
                                allImages?.map(image => {
                                    return <div className="home__imageslist_item" onClick={() => setSelectedImage(image)}>
                                        <img src={image.image_url} alt={image.title} height="90" />
                                    </div>
                                })
                            }
                        </div>
                    }
                </div>
            
        </div>
    )
}

export default Home
