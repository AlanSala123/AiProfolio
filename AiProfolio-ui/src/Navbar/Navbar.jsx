import "./Navbar.css"
import { UilInstagram, UilLinkedin, UilTwitter, UilYoutube,  UilGithub, UilFacebook } from '@iconscout/react-unicons';
{/* <Navbar
        Dimensions={{
          height: "70px",
          width: "max-width",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "space-between",
          color: "white",
          alignItems: "center"
        }}
        sectionList={{
          listStyle: "none",
          display: "flex",
          gap: "8rem",
          fontSize: "20px",
          fontWeight: "bold"
        }}
        sectionTag={{
          color: "white",
          textDecoration:"none"
        }}
        sectionName={{
          headerOne: "Marwan",
          headerTwo: "Luis",
          headerThree: "Alan",
          headerFour: "Sammy",
          headerFive: "Paige",
          headerSix: "Ashaun"
        }}
        sectionUrls={{
          instagram:"https://instagram.com", 
          linkedin:"https://linkedin.com", 
          pinterest:"https://pinterest.com", 
          twitter:"https://twitter.com", 
          youtube:"https://youtube.com", 
          tikTok:"https://tiktok.com", 
          facebook:"https://facebook.com", 
          github:"https://github.com", 
          linktree:"https://linktree.com"
        }}
        ProfileUrl={{
          url:"https://www.ocregister.com/wp-content/uploads/migration/o7t/o7tmrb-b88719054z.120160526224550000gg3gqehh.10.jpg?w=620"
        }}
        IconInfo={{
          size: '30',
          color: 'white',
          marginTop: '40px'
        }}
      /> */}
function Navbar({
    Dimensions = { height, width, backgroundColor, display, justifyContent, color, alignItems },
    sectionList = { listStyle, display, gap, fontSize, fontWeight },
    sectionTag = { color, textDecoration },
    sectionName = { headerOne, headerTwo, headerThree, headerFour, headerFive, headerSix },
    sectionUrls = { instagram, linkedin, pinterest, twitter, youtube, tikTok, facebook, github, linktree },
    ProfileUrl = { url },
    IconInfo = { size, color, marginTop }
}) {
    return (
        <nav className="navbar" style={{ height: Dimensions.height, width: Dimensions.width, backgroundColor: Dimensions.backgroundColor, display: Dimensions.display, justifyContent: Dimensions.justifyContent, color: Dimensions.color, alignItems: Dimensions.alignItems }}>
            <ul className="profile">
                <li>
                    {ProfileUrl.url && (
                        <div className="profileImage">
                            <a href="/">
                                <img src= {ProfileUrl.url} />
                            </a>
                        </div>
                    )}
                </li>
            </ul>
            <ul className="uls" style={{ listStyle: sectionList.listStyle, display: sectionList.display, gap: sectionList.gap, fontSize: sectionList.fontSize, fontWeight: sectionList.fontWeight }}>
                <li><a href={`/${sectionName.headerOne}`} style={{ color: sectionTag.color, textDecoration: sectionTag.textDecoration }}>{sectionName.headerOne}</a></li>
                <li><a href={`/${sectionName.headerTwo}`} style={{ color: sectionTag.color, textDecoration: sectionTag.textDecoration }}>{sectionName.headerTwo}</a></li>
                <li><a href={`/${sectionName.headerThree}`} style={{ color: sectionTag.color, textDecoration: sectionTag.textDecoration }}>{sectionName.headerThree}</a></li>
                <li><a href={`/${sectionName.headerFour}`} style={{ color: sectionTag.color, textDecoration: sectionTag.textDecoration }}>{sectionName.headerFour}</a></li>
                <li><a href={`/${sectionName.headerFive}`} style={{ color: sectionTag.color, textDecoration: sectionTag.textDecoration }}>{sectionName.headerFive}</a></li>
                <li><a href={`/${sectionName.headerSix}`} style={{ color: sectionTag.color, textDecoration: sectionTag.textDecoration }}>{sectionName.headerSix}</a></li>
            </ul>
            <ul className="ul" style={{ listStyle: sectionList.listStyle, display: sectionList.display, gap: "1rem" }}>
                <li>
                    {sectionUrls.instagram && (
                        <div className="icons">
                            <a href={sectionUrls.instagram}>
                            <UilInstagram size={IconInfo.size} color={IconInfo.color} className="App-logo" style={{ marginTop: IconInfo.marginTop }}/>
                            </a>
                        </div>
                    )}
                </li>
                <li>
                    {sectionUrls.pinterest && (
                        <div className="icons">
                            <a href={sectionUrls.pinterest}>
                            {/* <UilPinterest size="140" color="#61DAFB" className="App-logo" /> */}
                            </a>
                        </div>
                    )}
                </li>
                <li>
                    {sectionUrls.linkedin && (
                        <div className="icons">
                            <a href={sectionUrls.linkedin}>
                            <UilLinkedin size={IconInfo.size} color={IconInfo.color} className="App-logo" style={{ marginTop: IconInfo.marginTop }} />
                            </a>
                        </div>
                    )}
                </li>
                <li>
                    {sectionUrls.twitter && (
                        <div className="icons">
                            <a href={sectionUrls.twitter}>
                            <UilTwitter size={IconInfo.size} color={IconInfo.color} className="App-logo" style={{ marginTop: IconInfo.marginTop }} />
                            </a>
                        </div>
                    )}
                </li>
                <li>
                    {sectionUrls.youtube && (
                        <div className="icons">
                            <a href={sectionUrls.youtube}>
                            <UilYoutube size={IconInfo.size} color={IconInfo.color} className="App-logo" style={{ marginTop: IconInfo.marginTop }} />
                            </a>
                        </div>
                    )}
                </li>
                <li>
                    {sectionUrls.tikTok && (
                        <div className="icons">
                            <a href={sectionUrls.tikTok}>
                            {/* <UilTikTok size="140" color="#61DAFB" className="App-logo" /> */}
                            </a>
                        </div>
                    )}
                </li>
                <li>
                    {sectionUrls.facebook && (
                        <div className="icons">
                            <a href={sectionUrls.facebook}>
                            <UilFacebook size={IconInfo.size} color={IconInfo.color} className="App-logo"style={{ marginTop: IconInfo.marginTop }}/>
                            </a>
                        </div>
                    )}
                </li>
                <li>
                    {sectionUrls.github && (
                        <div className="icons">
                            <a href={sectionUrls.github}>
                            <UilGithub size={IconInfo.size} color={IconInfo.color} className="App-logo" style={{marginTop: IconInfo.marginTop}}  />
                            </a>
                        </div>

                    )}
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
