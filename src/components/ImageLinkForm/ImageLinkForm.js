import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onUrlInputChange, onFileInputChange, onUrlPictureSubmit, onFilePictureSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'This app will detect faces in images.'}
            </p>
            <div className='links'>
                <div className='form url center pa4 br3 shadow-5 ma1'>
                    <input className='f4 pa2 w-70 center' type='text' placeholder='Enter an image url...' onChange={onUrlInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-blue' onClick={onUrlPictureSubmit}>Detect</button>
                </div>
                <div className='form file center pa4 br3 shadow-5 ma1'>
                    <input className='f4 pa2 w-70 center' type='file' accept='image/*' onChange={onFileInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-blue' onClick={onFilePictureSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;
