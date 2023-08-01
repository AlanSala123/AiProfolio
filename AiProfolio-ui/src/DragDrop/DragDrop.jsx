import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./DragDrop.css";
import axios from "axios";

const Dropzone = ({ setResumeObj, setTemplateObj }) => {
  // State to hold the list of accepted files and rejected files
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  async function submitResume() {
    try {
      const res = await axios.post(
        "http://localhost:3001/product/create",
        files
      );
      setResumeObj(res?.data?.resume);
      setTemplateObj(res?.data?.template);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  // Callback function when files are dropped or selected
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // Define an array of allowed file extensions
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".pdf", ".docx"];

    // Filter the acceptedFiles array to include only allowed file types
    const filteredAcceptedFiles = acceptedFiles.filter((file) =>
      allowedExtensions.includes(
        file.name.substring(file.name.lastIndexOf("."))
      )
    );

    // Add the filtered accepted files to the existing files array
    if (filteredAcceptedFiles.length) {
      setFiles((previousFiles) => [...previousFiles, ...filteredAcceptedFiles]);
    }

    // Add the rejected files to the existing rejected files array
    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  // Hook provided by react-dropzone to manage drag-and-drop functionality
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: [".jpg", ".jpeg", ".png", ".pdf", ".docx"], // Accept images, PDFs, and DOCX files
    maxSize: 1024 * 1000, // 1 MB size limit for files (adjust as needed)
    onDrop, // Call the onDrop callback when files are dropped or selected
  });

  // Function to remove a specific file from the accepted files list
  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  // Function to remove all files and rejected files from the lists
  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  // Function to remove a specific rejected file from the rejected files list
  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  // Function to format file size into human-readable format
  function formatBytes(bytes) {
    const maxSize = 1024 * 1000; // 1 MB
    return bytes > maxSize ? "File is too large" : `${bytes} Bytes`;
  }

  // Render the Dropzone component
  return (
    <form>
      {/* The div with dropzone functionality */}
      <div {...getRootProps()} className="dropzone-container">
        <input {...getInputProps()} />
        <div className="dropzone-content">
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      {/* Display message for rejected files */}
      {rejected.length > 0 && (
        <div className="rejected-message">
          <p>
            The following files were rejected due to exceeding the maximum size:
          </p>
          <ul>
            {rejected.map(({ file, errors }) => (
              <li key={file.name}>
                {file.name} ({formatBytes(file.size)})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Preview section to show the accepted and rejected files */}
      <section className="preview-section">
        <div className="preview-heading">
          <h2 className="preview-title">Preview</h2>
          <button
            type="button"
            onClick={removeAll}
            className="remove-all-button"
          >
            Remove all files
          </button>
        </div>

        {/* List of accepted files */}
        <h3 className="accepted-title">Accepted Files</h3>
        <ul className="file-list">
          {files.map((file) => (
            <li key={file.name} className="file-item">
              <img
                src={URL.createObjectURL(file)} // Display a preview image of the file
                alt={file.name}
                className="file-image"
              />
              <button
                type="button"
                className="remove-file-button"
                onClick={() => removeFile(file.name)} // Call the removeFile function when clicked
              >
                X
              </button>
              <p className="file-name">{file.name}</p>
            </li>
          ))}
        </ul>

        {/* List of rejected files */}
        <h3 className="rejected-title">Rejected Files</h3>
        <ul className="rejected-list">
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className="rejected-item">
              <div>
                <p className="rejected-file-name">{file.name}</p>
                <ul className="error-list">
                  {errors.map((error) => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="remove-rejected-button"
                onClick={() => removeRejected(file.name)} // Call the removeRejected function when clicked
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      </section>
      <button
      onClick={(e)=>{

      }}
      onSub
      >
        Submit Resume
      </button>
    </form>
  );
};

export default Dropzone;
