import React from 'react';
import './FaceDetector.css'

const FaceDectector = ({ isUrl, box, imageUrl, imageBytes }) => {
    return (
        <div className='center ma'>
            <div className='relative mt2'>
                <img id='inputImage' src={isUrl ? imageUrl : imageBytes} alt=""/>
                <div className='bounding-boxes'>
                    {box.map((face, index) => {
                        return <div className='bounding-box' key={index} style={{top: face.topRow, right: face.rightCol, bottom: face.bottomRow, left: face.leftCol}}></div>
                    })}
                </div>
            </div>
        </div>
    );
}

export default FaceDectector;
