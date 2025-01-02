// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../css/component.css";

// const BackButton = ({ path }) => {
//   const navigate = useNavigate();

//   return (
//     <button className="backbtn" onClick={() => navigate(path)}>
//       <svg
//         height="16"
//         width="16"
//         xmlns="http://www.w3.org/2000/svg"
//         version="1.1"
//         viewBox="0 0 1024 1024"
//       >
//         <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
//       </svg>
//       <span>Back</span>
//     </button>
//   );
// };

// export default BackButton;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/component.css";

const BackButton = ({ path }) => {
  const navigate = useNavigate();

  return (
    <button className="backbtn" onClick={() => navigate(path)}>
      <svg
        height="1.2em"
        className="arrow"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path>
      </svg>
      <p className="text">Back</p>
    </button>
  );
};

export default BackButton;
