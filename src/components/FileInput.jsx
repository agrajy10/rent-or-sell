import { useDropzone } from 'react-dropzone';
import { useField } from 'formik';

function FileInput({ dropZoneText, label, ...props }) {
  const { getRootProps, getInputProps } = useDropzone(props);
  const [_, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name} className="label">
        {label}
      </label>
      <div
        {...getRootProps({
          className: 'dropzone'
        })}>
        <input id={props.id} name={props.name} {...getInputProps()} />
        <p>{dropZoneText}</p>
      </div>
      {meta.touched && meta.error ? (
        <span className="block text-red-600 text-sm mt-2">{meta.error}</span>
      ) : null}
    </div>
  );
}

export default FileInput;
