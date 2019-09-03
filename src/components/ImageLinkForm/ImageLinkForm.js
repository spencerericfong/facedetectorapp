import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'This app will detect faces images. Put in a url to an image to try it out!'}
            </p>
            <div className='links'>
                <div className='form url center pa4 br3 shadow-5 ma1'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-blue' onClick={onPictureSubmit}>Detect</button>
                </div>
                <div className='form file center pa4 br3 shadow-5 ma1'>
                    <input className='f4 pa2 w-70 center' type='file' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-blue' onClick={onPictureSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;
