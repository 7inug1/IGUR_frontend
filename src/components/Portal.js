import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  const modalPortal = document.getElementById("modal-portal");
  
  return ReactDOM.createPortal(children, modalPortal);
};

export default Portal;
