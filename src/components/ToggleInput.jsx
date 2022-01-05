import { useField } from 'formik';

function ToggleInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name} className="cursor-pointer label">
        <span className="label-text mr-4">{label}</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={field.value}
          {...field}
          {...props}
        />
      </label>
      {meta.touched && meta.error ? (
        <span className="block text-red-600 text-sm mt-2">{meta.error}</span>
      ) : null}
    </>
  );
}

export default ToggleInput;
