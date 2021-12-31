function FormCard({ children }) {
  return (
    <div className="card card-bordered border-gray-200 shadow-lg w-full max-w-md">
      <div className="card-body">{children}</div>
    </div>
  );
}

export default FormCard;
