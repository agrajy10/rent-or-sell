import { useField } from 'formik';

function TextAreaInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name} className="label">
        {label}
      </label>
      <textarea
        className={`textarea textarea-bordered h-36 w-full ${
          meta.touched && meta.error ? 'textarea-error' : ''
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <span className="block text-red-600 text-sm mt-2">{meta.error}</span>
      ) : null}
    </>
  );
}

export default TextAreaInput;
