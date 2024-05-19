import React from 'react';
import LoaderImg from '../../assets/images/72f1a425e3ea3505929a30b8adabefb8.gif';

const Loader = () => {
    return (
        <div className="bg-contain bg-center h-screen" style={{ backgroundImage: `url(${LoaderImg})` }}>
        </div>
    );
};

export default Loader;
