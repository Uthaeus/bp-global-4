
export default function AdminOrderModal({ image, onClose }) {

    return (
        <div className="admin-order-modal">
            <div className="admin-order-modal-image-container">
                <img src={image} alt="order-image" />
                <button onClick={onClose} className="btn btn-danger">X</button>
            </div>
        </div>
    );
}