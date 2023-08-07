import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import Navbar from "../Components/Navbar/Navbar"
import Header from "../Components/Header/Header"
import AboutMe from "../Components/AboutMe/AboutMe"
import Education from "../Components/Education/Education"
import Experience from "../Components/Experiences/Experiences"
import Skills from "../Components/Skills/Skills"
import Projects from "../Components/Projects/Projects"


export default function Portfolio({user, isPublic=false}){
    const [resumeObj, setResumeObj] = useState(null)
    const [templateObj, setTemplateObj] = useState(null)
    const [images, setImages] = useState(null)
    
    const params = useParams()
    const id = params.id

    useEffect(() => {
        const fetchData = async () => {
            await fetchPortfolio()
        }
    
        fetchData()
    }, [])
    
    console.log(templateObj)

  async function fetchPortfolio() {
    try {
        const res = isPublic ? await axios.get(`http://localhost:3001/public/${id}`) : await axios.get(`http://localhost:3001/product/fetch/${id}`, { withCredentials: true });
        setImages(res?.data?.images);
        setResumeObj(res?.data?.resume);
        setTemplateObj(res?.data?.template);
    } catch (error) {
        console.error("An error occurred while fetching portfolio:", error);
    }
}



    if (resumeObj && templateObj){
        return(
            <>
                <Navbar navbar={templateObj?.navbar} data={resumeObj}/>
                <Header header={templateObj?.header} data={resumeObj}/>
                <AboutMe about={templateObj?.about} data={resumeObj} images={images}/>
                <Education education={templateObj?.education} educationData={resumeObj?.education}/>
                <Experience experiences={templateObj?.experiences} experienceList={resumeObj?.experiences}/>
                <Skills skills={templateObj?.skills} skillList={resumeObj?.skills}/>
                <Projects projects={templateObj?.projects} projectList={resumeObj?.projects} />
                <div>
    </div>
            </>
            )
    }
}