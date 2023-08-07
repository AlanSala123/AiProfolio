import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./Create.css";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const Create = ({ user }) => {
 
  const [resume, setResume] = useState(null);
  const [images, setImages] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [loading, setLoading] = useState(false);

 
  const navigate = useNavigate();

 
  async function submitResume(e) {
    e.preventDefault();
    if (resume) {
      try {
        // Prepare form data
        const formData = new FormData();

        
        if (resume) {
          formData.append("resume", resume);
        }
        images.forEach((imageObj, index) => {
          formData.append("images", imageObj.file);
          formData.append(`labels[${index}]`, imageObj.label);
        });

        
        setLoading(true);
        const res = await axios.post(
          "http://localhost:3001/product/create",
          formData,
          { withCredentials: true }
        );
        setLoading(false);
  
        navigate(`/view/${res?.data}`);
      } catch (error) {
        setLoading(false);
      }
    }
  }

  // Callback function to handle file drop
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const allowedExtensionsForResume = [".pdf", ".docx"];
    const allowedExtensionsForImages = [".jpg", ".jpeg", ".png"];

    // Separate accepted files into resumes and images
    const droppedResume = acceptedFiles.find((file) =>
      allowedExtensionsForResume.includes(
        file.name.substring(file.name.lastIndexOf("."))
      )
    );
    const droppedImages = acceptedFiles
      .filter((file) =>
        allowedExtensionsForImages.includes(
          file.name.substring(file.name.lastIndexOf("."))
        )
      )
      .map((file) => ({
        file,
        label: "",
      }));

    // Update state with dropped files
    if (droppedResume) {
      setResume(droppedResume);
      toast.success('Successfully Uploaded Resume !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
        
      });
    }
    if (droppedImages.length) {
      toast.success('Successfully Uploaded Image !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
        
      });
      setImages((previousFiles) => [...previousFiles, ...droppedImages]);
    }
  
    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  // Initialize dropzone hook
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: [".jpg", ".jpeg", ".png", ".pdf", ".docx"],
    maxSize: 1024 * 1000 ,
    onDrop,
  });

  // Functions to remove files from state
  const removeResume = () => setResume(null);
  const removeImage = (name) => {
    setImages((images) => images.filter((image) => image.file.name !== name));
  };
  const removeAll = () => {
    setResume(null);
    setImages([]);
    setRejected([]);
  };
  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  // Function to format file sizes
  function formatBytes(bytes) {
    const maxSize = 1024 * 1000 ; // 1 MB
    return bytes > maxSize ? "File is too large" : `${bytes} Bytes`;
  }

  // Function to handle label changes for images
  const handleLabelChange = (e, index) => {
    const newImages = [...images];
    newImages[index].label = e.target.value;
    setImages(newImages);
  };

  // Conditional rendering based on 'loading' state
  if (!loading) {
    return (
      <form id="dragDropForm">
        <ToastContainer />
        <div {...getRootProps()} className="dropzone-container">
          <input {...getInputProps()} />
          <div className="dropzone-content">
            {isDragActive ? (
              <p>Drop The Files Here ...</p>
            ) : (
              <p>Drag & Drop Files Here, Or Click To Select Files</p>
            )}
          </div>
        </div>

        {rejected.length > 0 && (
          <div className="rejected-message">
            <p>
              The following files were rejected due to exceeding the maximum
              size:
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
            {(resume ? 1 : 0) + images.length + rejected.length > 1 && (
              <button
                type="button"
                onClick={removeAll}
                className="remove-all-button"
              >
                Remove all files
              </button>
            )}
          </div>

          {resume ? (
            <div className="resumeStatus">
              <h3>Resume</h3>
              <div className="file-name">{resume.name}</div>
              <button
                type="button"
                className="remove-resume-button"
                onClick={removeResume}
              >
                Remove
              </button>
            </div>
          ) : (
            <>Please upload a resume</>
          )}
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
                <select
                  value={imageObj.label}
                  onChange={(e) => handleLabelChange(e, index)}
                >
                    <option value="">Select Label</option>
                    <option value="profile picture">Profile Picture</option>
                    <option value="logo">Logo</option>
                    <option value="school logo">School Logo</option>
                    <option value="photograph">Photograph</option>
                    <option value="company logo">Company Logo</option>
                </select>

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
        <button id="submit-resume-button" onClick={submitResume}>
          Submit Resume
        </button>
      </form>
    );
  } else {
    return (
      <LoadingScreen />
    );
  }
};

export default Create;
