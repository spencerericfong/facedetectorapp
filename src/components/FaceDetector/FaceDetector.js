import React from 'react';
import './FaceDetector.css'

const FaceDectector = ({ box, imageUrl }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' src={imageUrl} alt="" width='500px' height='auto'/>
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
