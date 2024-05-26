
export default function AdminOrderModal({ image, onClose }) {

    const closeModalHandler = (e) => {
        if (e.target.classList.contains('admin-order-modal')) {
            onClose();
        }
    }

    return (
        <div className="admin-order-modal" onClick={closeModalHandler}>
            <div className="admin-order-modal-image-container">
                <img src={image} alt="order-image" />
                <button onClick={onClose} className="btn btn-danger">X</button>
            </div>
        </div>
    );
}