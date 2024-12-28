import React from "react";
import placeholder from '@/assets/images/profile.png'
const hh = () => {
  return (
    <div className="raci-component shadow">
      <div className="raci-users-container">
        <div className="raci-users">
          <div className="user-image">
          <img src={placeholder.src} alt="Not found" className="img-fluid" />
          </div>
          <h5 className="m-0 text-center mt-2">Brenda</h5>
        </div>
        <div className="raci-users">
        <div className="user-image">
          <img src={placeholder.src} alt="Not found" className="img-fluid" />
          </div>
          <h5 className="m-0 text-center mt-2">Brenda</h5>
        </div>
        <div className="raci-users">
        <div className="user-image">
          <img src={placeholder.src} alt="Not found" className="img-fluid" />
          </div>
          <h5 className="m-0 text-center mt-2">Brenda</h5>
        </div>
        <div className="raci-users">
        <div className="user-image">
          <img src={placeholder.src} alt="Not found" className="img-fluid" />
          </div>
          <h5 className="m-0 text-center mt-2">Brenda</h5>
        </div>
      </div>

      <div className="raci-char-container">
        <div className="raci-R raci-char">R</div>
        <div className="raci-A raci-char">A</div>
        <div className="raci-C raci-char">C</div>
        <div className="raci-I raci-char">I</div>
      </div>
    </div>
  );
};

export default hh;
