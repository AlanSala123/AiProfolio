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

const skillsTemplate = `{"skills": {
    "justifyContent" : "",
    "dimensions": {
        "minHeight": ""
    },
    "flexWrap" : "",
    "background": {
        "color": "",
        "image": ""
    },
    "showProgressBar": true,
    "showLevel": true,
    "skillItem": {
        "spacing": "",
        "style": {
            "boxShadow" : "",
            "border" : {
                "borderStyle" : "",
                "borderRadius" : "",
                "borderWidth" : "",
                "borderColor" : ""
            },
            "name": {
                "fontSize": "",
                "fontColor": "",
                "fontFamily": ""
            },
            "progressBar": {
                "color": "",
                "backgroundColor": ""
            },
            "level": {
                "fontSize": "",
                "fontColor": "",
                "fontFamily": ""
            }
        }
    }
}}`

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
    // ...Other template exports...
};
