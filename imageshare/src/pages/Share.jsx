import React from 'react';
import '../index.css';

export function Share(props) {
    return (
        <>
            <section className="share">
                <div className="container-share">
                    <h1 className='common-heading'>Share Your Images</h1>
                    <p className='common-subheading'>Generate shareable links and easily share your images with others.</p>
                </div>
                <div className="share-container grid grid-two-cols">
                    <div className="content">
                        <form>
                            <div className='mb-3'>
                                <label htmlFor="image-url">Image URL</label>
                                <input type="text" name='image-url' id='image-url' placeholder='Paste the image URL here' />
                            </div>
                            <div>
                                <button type='submit' className='btn btn-submit'>Generate Share Link</button>
                            </div>
                        </form>
                    </div>
                    <div className="form-img">
                        <img src="share.png" alt="Share Illustration" />
                    </div>
                </div>
            </section>
        </>
    );
}
