import './Modal.css'
import Close from "../../images/exit.svg";
import { CSSTransition } from 'react-transition-group';
import ReactDOM from 'react-dom';

const Modal = ({ show, close, children }) => {
    return ReactDOM.createPortal(
        <CSSTransition in={show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
            <div
            className="modal"
            onClick={() => close()}
            >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                <button className="close" onClick={() => close()}>
                    <img src={Close} alt="close" />
                </button>
                </div>
                <div className="modal-body"> {children} </div>
            </div>
            </div>
        </CSSTransition>,
        document.getElementById('root')
    );
  };

export default Modal