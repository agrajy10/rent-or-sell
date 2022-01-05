import { createPortal } from 'react-dom';

import { ReactComponent as DeleteIcon } from '../assets/svg/exclamation.svg';

function DeleteConfirmationModal({ showModal, hideModal, onConfirm, message }) {
  if (!showModal) {
    return null;
  }
  return createPortal(
    <>
      <div className="fixed inset-0 z-[999] bg-black opacity-30"></div>
      <div className="card fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md z-[9999] bg-white w-full max-w-md">
        <div className="card-body">
          <DeleteIcon className="block mx-auto w-14 h-14 stroke-accent" />
          <p className="text-center text-lg mt-4 mb-8">{message}</p>
          <div className="flex items-center justify-center gap-4">
            <button type="button" className="btn" onClick={hideModal}>
              Cancel
            </button>
            <button type="button" className="btn btn-accent" onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default DeleteConfirmationModal;
