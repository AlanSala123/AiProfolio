import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./Create.css";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useNavigate } from "react-router-dom";

const Create = ({token}) => {
    const [resume, setResume] = useState(null);
    const [images, setImages] = useState([]);
    const [rejected, setRejected] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const navigate = useNavigate()
  
    async function submitResume(e){
      e.preventDefault()
      if (resume){
        try {
          const formData = new FormData();

if (resume) {
  formData.append('resume', resume);
}

images.forEach((imageObj, index) => {
  formData.append('images', imageObj.file);
  formData.append(`labels[${index}]`, imageObj.label);
});

          setLoading(true)
          const res = await axios.post("http://localhost:3001/product/create", formData, {
            headers: {
              'Authorization': `Bearer ${token}`
          }
          } )
          console.log(res)
          setLoading(false)
          navigate(`/view/${res?.data}`)
        } catch (error) {
          setLoading(false)
          console.log("ERROR:", error);
        }
      }
    }


  // Callback function when files are dropped or selected
  // Callback function when files are dropped or selected
const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
  const allowedExtensionsForResume = [".pdf", ".docx"];
  const allowedExtensionsForImages = [".jpg", ".jpeg", ".png"];

  const droppedResume = acceptedFiles.find((file) =>
    allowedExtensionsForResume.includes(
      file.name.substring(file.name.lastIndexOf("."))
    )
  );

  const droppedImages = acceptedFiles.filter((file) =>
    allowedExtensionsForImages.includes(
      file.name.substring(file.name.lastIndexOf("."))
    )
  ).map((file) => ({
    file,
    label: ''
  }));

  if (droppedResume) {
    setResume(droppedResume);
  }

  if (droppedImages.length) {
    setImages((previousFiles) => [...previousFiles, ...droppedImages]);
  }

  if (rejectedFiles?.length) {
    setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
  }
}, []);



  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: [".jpg", ".jpeg", ".png", ".pdf", ".docx"],
    maxSize: 1024 * 1000,
    onDrop,
  });

  const removeResume = () => setResume(null);

  const removeImage = (name) => {
    setImages((images) => images.filter((image) => image.name !== name));
  };

  const removeAll = () => {
    setResume(null);
    setImages([]);
    setRejected([]);
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  function formatBytes(bytes) {
    const maxSize = 1024 * 1000; // 1 MB
    return bytes > maxSize ? "File is too large" : `${bytes} Bytes`;
  }

  const handleLabelChange = (e, index) => {
    const newImages = [...images];
    newImages[index].label = e.target.value;
    setImages(newImages);
  };
  

  if (!loading) {


  return (
    <form id="dragDropForm">
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
          <h2 className="preview-title">Your Files</h2>
          <button
            type="button"
            onClick={removeAll}
            className="remove-all-button"
          >
            Remove all files
          </button>
        </div>

        {resume ? (
          <div className="resumeStatus">
            <h3>Resume</h3>
            <p>{resume.name}</p>
            <button type="button" onClick={removeResume}>Remove</button>
          </div>
        ) : (<>
        Please upload a resume
        </>)}

        <h3 className="accepted-title">Accepted Images</h3>
        <ul className="file-list">
  {images.map((imageObj, index) => (
    <li key={imageObj.file.name} className="file-item">
      <p className="file-name">{imageObj.file.name}</p>
      <img
        src={URL.createObjectURL(imageObj.file)}
        alt={imageObj.file.name}
        className="file-image"
      />
      <input
        type="text"
        placeholder="Enter label"
        value={imageObj.label}
        onChange={(e) => handleLabelChange(e, index)}
      />
      <button
        type="button"
        className="remove-file-button"
        onClick={() => removeImage(imageObj.file.name)} 
      >
        X
      </button>
    </li>
  ))}
</ul>




      </section>
      <button
        onClick={submitResume}
      >
        Submit Resume
      </button>
    </form>
  );
  }else {
    return (
      <>
        <LoadingScreen/>
      </>
    )
  }

};

export default Create;
