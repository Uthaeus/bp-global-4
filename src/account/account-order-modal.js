
export default function AccountOrderModal({ image, onClose }) {

    const closeModalHandler = (event) => {
        if (event.target.classList.contains('account-order-modal')) {
            onClose();
        }
    }
    
    return (
        <div className="account-order-modal" onClick={closeModalHandler}>
            <div className="account-order-modal-image-wrapper">
                <img src={image} alt="order-image" style={{ width: '100%', height: '100%', objectFit: 'cover'}} />
                <button className="btn btn-danger" onClick={onClose}>X</button>
            </div>
        </div>
    );
}