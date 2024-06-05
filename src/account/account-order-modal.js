import Button from "../components/ui/button";

export default function AccountOrderModal({ image, onClose }) {

    const closeModalHandler = (event) => {
        if (event.target.classList.contains('account-order-modal')) {
            onClose();
        }
    }
    
    return (
        <div className="account-order-modal" onClick={closeModalHandler}>
            <div className="account-order-modal-image-wrapper">
                <img src={image.url} alt="order-image" style={{ width: '100%', height: '100%', objectFit: 'cover'}} />
                <Button text="X" className="delete-button" onClick={onClose} />
            </div>
        </div>
    );
}