import Button from "../../ui/button";

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
                <Button text="X" className="delete-button" onClick={onClose} />
            </div>
        </div>
    );
}