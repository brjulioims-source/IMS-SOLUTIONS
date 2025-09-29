import "../navbar/Modal.css";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
        <div className="modal-content">
            <div className="modal-header">
                <h2>Modal Title</h2>
                <button className="close-btn" onClick={onClose}>
                    ✖
                </button>
            </div>
            <div className="modal-body">{children}</div>
        </div>
    </div>
  );
}

export default Modal;
