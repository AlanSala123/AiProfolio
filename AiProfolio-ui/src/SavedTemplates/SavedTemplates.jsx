import "./SavedTemplates.css"
import { Link } from 'react-router-dom'

export default function SavedTemplates({user, token}) {
    return (
        <div className="entire-saved">
            <div className="top-buttons">
                <div className="saved-button">
                    <Link to="/popular-templates" className="saved"> My Saved Templates </Link>
                </div>
                <div className="popular-button">
                    <button> Popular Templates </button>
                </div>
            </div>
            <div className="search-with-create-delete">
                <div className="searchbar">
                    <input type="text" placeholder="Search..." />
                </div>
                <div className="createNew">
                    <button> Create New </button>
                </div>
                <div className="delete">
                    <button> Delete </button>
                </div>
            </div>
            <div className="template-grid">
                {/* we need to fetch the user by their specific template in this section */}
            </div>
        </div>
    )
}