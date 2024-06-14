// BackgroundAnimation.jsx
import React, { useEffect } from 'react';
import '../sass/components/_background-animation.scss';

const BackgroundAnimation = () => {
    return (
      <div className="container">
        <div className="background"></div>
        <div className="circle-container">
          {/* Dynamic particles will be added by CSS */}
        </div>
      </div>
    );
  };

  export default BackgroundAnimation;
