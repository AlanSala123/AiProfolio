const navbarTemplate = `{
    "navbar": {
        "dimensions": {
            "height": ""
        },
        "background": {
            "color": "",
            "imageSRC": ""
        },
        "items": {
            "alignment": {
                "textAlign": "",
                "verticalAlign": ""
            },
            "spacing": "",
            "style": {
                "fontSize": "",
                "fontColor": "",
                "fontFamily": ""
            }
        } 
    }
};`

const aboutTemplate = `{
    "about": {
        "dimensions": {
            "minHeight": ""
        },
        "background": {
            "color": "",
            "image": ""
        },
        "aboutItem": {
            "alignment": {
                "textAlign": "",
                "verticalAlign": ""
            },
            "spacing": "",
            "style": {
                "profilePicture": {
                    "width": "",
                    "height": ""
                },
                "name": {
                    "fontSize": "",
                    "fontColor": "",
                    "fontFamily": ""
                },
                "description": {
                    "fontSize": "",
                    "fontColor": "",
                    "fontFamily": ""
                }
            }
        }
    }
};`

// Continue in the same pattern for each section...

const headerTemplate = `{
    "header" : {
        "dimensions" : {
            "height" : "",
            "width" : ""
        },
        "background" : {
            "color" : ""
        },
        "border" : {
            "color" : "",
            "width" : "",
            "style" : ""
        },
        "foreground" : {
            "title" : {
                "fontSize" : "",
                "fontColor" : "",
                "fontFamily" : "",
                "fontWeight" : "",
                "fontStyle" : ""
            },
            "subtitle" : {
                "fontSize" : "",
                "fontColor" : "",
                "fontFamily" : "",
                "fontWeight" : "",
                "fontStyle" : ""
            },
            "alignment" : {
                "textAlign": "",
                "verticalAlign": ""
            }
        }
    }
};`

const experiencesTemplate = ` {
"experiences": {
    "dimensions": {
        "minHeight": ""
    },
    "background": {
        "color": "",
        "image": ""
    },
    "flexWrap" : "",
    "experienceItem": {
        "maxWidth" : "",
        "alignment": {
            "textAlign": "",
            "verticalAlign": ""
        },
        "spacing": "",
        "style": {
            "boxShadow" : "",
            "border" : {
                "borderStyle" : "",
                "borderRadius" : "",
                "borderWidth" : "",
                "borderColor" : ""
            },
            "title": {
                "fontSize": "",
                "fontColor": "",
                "fontFamily": ""
            },
            "description": {
                "fontSize": "",
                "fontColor": "",
                "fontFamily": ""
            },
            "date": {
                "fontSize": "",
                "fontColor": "",
                "fontFamily": ""
            }
            
        }
    }
}
}
`

const skillsTemplate = `{
    "skills": {
        "justifyContent": "This setting controls the alignment of the skill items along the horizontal axis.",
        "dimensions": {
            "description": "This object contains settings for the dimensions of the skills section.",
            "minHeight": "This setting controls the minimum height of the skills section."
        },
        "flexWrap": "This setting controls whether the skill items should wrap onto multiple lines when there are too many to fit on one line.",
        "background": {
            "description": "This object contains settings for the background of the skills section.",
            "color": "This setting controls the color of the background.",
            "image": "This setting specifies the URL of the background image."
        },
        "showProgressBar": "This boolean setting controls whether a progress bar should be shown for each skill.",
        "showLevel": "This boolean setting controls whether the level of proficiency for each skill should be shown.",
        "skillItem": {
            "description": "This object contains settings for individual skill items.",
            "spacing": "This setting controls the spacing between skill items.",
            "style": {
                "description": "This object contains settings for the style of the skill items.",
                "backgroundColor": "This setting controls the background color of the skill items.",
                "boxShadow": "This setting controls the box shadow of the skill items.",
                "border": {
                    "description": "This object contains settings for the border of the skill items.",
                    "borderStyle": "This setting controls the style of the border (e.g., 'solid', 'dashed').",
                    "borderRadius": "This setting controls the radius of the border (for rounded corners).",
                    "borderWidth": "This setting controls the width of the border.",
                    "borderColor": "This setting controls the color of the border."
                },
                "name": {
                    "description": "This object contains settings for the name of the skill.",
                    "fontSize": "This setting controls the font size of the skill name.",
                    "fontColor": "This setting controls the color of the skill name.",
                    "fontFamily": "This setting controls the font family of the skill name."
                },
                "progressBar": {
                    "description": "This object contains settings for the progress bar of the skill.",
                    "color": "This setting controls the color of the filled portion of the progress bar.",
                    "backgroundColor": "This setting controls the color of the unfilled portion of the progress bar."
                },
                "level": {
                    "description": "This object contains settings for the level of proficiency of the skill.",
                    "fontSize": "This setting controls the font size of the skill level.",
                    "fontColor": "This setting controls the color of the skill level.",
                    "fontFamily": "This setting controls the font family of the skill level."
                }
            }
        }
    }
}
`


const projectsTemplate = `{"projects": {
    "dimensions": {
        "minHeight": ""
    },
    "background": {
        "color": "",
        "image": ""
    },
    "projectItem": {
        "alignment": {
            "textAlign": "",
            "verticalAlign": ""
        },
        "spacing": "",
        "style": {
            "boxShadow" : "",
            "border" : {
                "borderStyle" : "",
                "borderRadius" : "",
                "borderWidth" : "",
                "borderColor" : ""
            },
            "title": {
                "fontSize": "",
                "fontColor": "",
                "fontFamily": ""
            },
            "description": {
                "fontSize": "",
                "fontColor": "",
                "fontFamily": ""
            },
            "technologies": {
                "fontSize": "",
                "fontColor": "",
                "fontFamily": ""
            }
        }
    }
}}`

const educationTemplate = `{"education": {
    "flexDirection" : "",
    "background": {
        "color": "",
        "image": ""
    },
    "educationItem": {
        "alignment": {
            "textAlign": "",
            "verticalAlign": ""
        },
        "spacing": "",
        "style": {
            "boxShadow" : "",
            "border" : {
                "borderStyle" : "",
                "borderRadius" : "",
                "borderWidth" : "",
                "borderColor" : ""
            },
            "institution": {
                "fontSize": "",
                "fontColor": "",
                "fontFamily": ""
            },
            "degree": {
                "fontSize": "",
                "fontColor": "",
                "fontFamily": ""
            },
            "major": {
                "fontSize": "",
                "fontColor": "",
                "fontFamily": ""
            },
            "date": {
                "fontSize": "",
                "fontColor": "",
                "fontFamily": ""
            }
        }
    }
}}`

// And so on for experiences, skills, projects, achievements, education...

module.exports = {
    navbarTemplate,
    aboutTemplate,
    headerTemplate,
    experiencesTemplate,
    skillsTemplate,
    projectsTemplate,
    educationTemplate,
  
};
