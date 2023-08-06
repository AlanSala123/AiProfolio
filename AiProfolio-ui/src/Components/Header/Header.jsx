import './Header.css'

function Header({header, data}){
    return (
        <div id="header" style={header?.background}>
            <h1 id="header-title" style={header?.title}> {data?.user?.name} </h1>
            <p id="header-subtitle" style={header?.subtitle}> {data?.jobAspiration} </p>
        </div> 
    )
}

export default Header
