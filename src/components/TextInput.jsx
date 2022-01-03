import { useField } from 'formik';

function TextInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name} className="label">
        {label}
      </label>
      <input
        className={`input input-bordered w-full ${meta.touched && meta.error ? 'input-error' : ''}`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <span className="block text-red-600 text-sm mt-2">{meta.error}</span>
      ) : null}
    </>
  );
}

export default TextInput;
