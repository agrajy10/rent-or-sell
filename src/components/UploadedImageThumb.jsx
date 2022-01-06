import { ReactComponent as DeleteIcon } from '../assets/svg/delete.svg';

function UploadedImageThumb({ src, onClick }) {
  return (
    <>
      <img className="w-full h-full border border-gray-200 rounded object-cover" src={src} />
      <button onClick={onClick} type="button" aria-label="Delete image" className="delete-btn">
        <DeleteIcon className="h-3 w-3" />
      </button>
    </>
  );
}

export default UploadedImageThumb;
