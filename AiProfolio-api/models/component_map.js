const portfolioJsonTemplate  =  `{
    "portfolio" : {
            "navbar": {
                "dimensions": {
                    "height": "default = 60px",
                    "width": "default = 100vw"
                },
                "background": {
                    "color": "default = #333",
                    "image": "none"
                },
                "items": {
                    "alignment": {
                        "textAlign": "default = center",
                        "verticalAlign": "default = middle"
                    },
                    "spacing": "default = 20px",
                    "style": {
                        "fontSize": "default = 1rem",
                        "fontColor": "default = #ffffff",
                        "fontFamily": "default = Arial",
                        "hover": {
                            "fontColor": "default = #eee",
                            "backgroundColor": "default = #555"
                        }
                    },
                    "navigationItems": []
                }
            },         
        "header" : {
            "dimensions" : {
                "height" : "default = 100vh",
                "width" : "default = 100vw"
            },
            "background" : {
                "color" : "default = transparent",
                "image" : {
                    "url" : "",
                    "dimensions" : {
                        "height" : "default = 100vh",
                        "width" : "default = 100vw"
                    } 
                }
            },
            "foreground" : {
                "image" : {
                    "url" : "",
                    "dimensions" : {
                        "height" : "default = 100vh",
                        "width" : "default = 100vw"
                    } 
                },
                "title" : {
                    "fontSize" : "default = 2rem",
                    "fontColor" : "default = #ffffff",
                    "fontFanily" : "default = Arial"
                },
                "subtitle" : {
                    "fontSize" : "default = 1.5rem",
                    "fontColor" : "default = #ffffff",
                    "fontFanily" : "default = Arial"
                },
                "alignment" : {
                    "textAlign": "default = left",
                    "verticalAlign": "default = top"
                  }
            }
        },
        "experiences": {
            "dimensions": {
                "width": "default = 100vw",
                "minHeight": "default = 100vh"
            },
            "background": {
                "color": "default = #f3f3f3",
                "image": "none"
            },
            "experienceItem": {
                "alignment": {
                    "textAlign": "default = left",
                    "verticalAlign": "default = middle"
                },
                "spacing": "default = 20px",
                "style": {
                    "title": {
                        "fontSize": "default = 1.5rem",
                        "fontColor": "default = #333",
                        "fontFamily": "default = Arial"
                    },
                    "description": {
                        "fontSize": "default = 1rem",
                        "fontColor": "default = #666",
                        "fontFamily": "default = Arial"
                    },
                    "date": {
                        "fontSize": "default = 1rem",
                        "fontColor": "default = #999",
                        "fontFamily": "default = Arial"
                    }
                }
            },
            "Items": [
                {
                    "title": "",
                    "company": "",
                    "date": "",
                    "description": ""
                }
            ]
        },
        "skills": {
            "dimensions": {
                "width": "default = 100vw",
                "minHeight": "default = 100vh"
            },
            "background": {
                "color": "default = #f9f9f9",
                "image": "none"
            },
            "skillItem": {
                "alignment": {
                    "textAlign": "default = center",
                    "verticalAlign": "default = middle"
                },
                "spacing": "default = 20px",
                "style": {
                    "name": {
                        "fontSize": "default = 1.2rem",
                        "fontColor": "default = #333",
                        "fontFamily": "default = Arial"
                    },
                    "progressBar": {
                        "color": "default = #4caf50",
                        "backgroundColor": "default = #ddd"
                    },
                    "level": {
                        "fontSize": "default = 1rem",
                        "fontColor": "default = #666",
                        "fontFamily": "default = Arial"
                    }
                }
            },
            "defaultItems": [
                {
                    "name": "",
                    "level": "",
                    "progress": ""
                }
                
            ]
        },
        "projects": {
            "dimensions": {
                "width": "100vw",
                "minHeight": "default = 100vh"
            },
            "background": {
                "color": "#f9f9f9",
                "image": "none"
            },
            "projectItem": {
                "alignment": {
                    "textAlign": "center",
                    "verticalAlign": "middle"
                },
                "spacing": "20px",
                "style": {
                    "title": {
                        "fontSize": "1.2rem",
                        "fontColor": "#333",
                        "fontFamily": "Arial"
                    },
                    "description": {
                        "fontSize": "1rem",
                        "fontColor": "#666",
                        "fontFamily": "Arial"
                    },
                    "technologies": {
                        "fontSize": "1rem",
                        "fontColor": "#999",
                        "fontFamily": "Arial"
                    }
                }
            },
            "Items": [
                {
                    "title": "",
                    "description": "",
                    "technologies": [],
                    "link": ""
                }
            ]
        },
        "achievements": {
            "dimensions": {
                "width": "100vw",
                "minHeight": "default = 100vh"
            },
            "background": {
                "color": "#f3f3f3",
                "image": "none"
            },
            "achievementItem": {
                "alignment": {
                    "textAlign": "left",
                    "verticalAlign": "middle"
                },
                "spacing": "20px",
                "style": {
                    "title": {
                        "fontSize": "1.5rem",
                        "fontColor": "#333",
                        "fontFamily": "Arial"
                    },
                    "date": {
                        "fontSize": "1rem",
                        "fontColor": "#666",
                        "fontFamily": "Arial"
                    },
                    "description": {
                        "fontSize": "1rem",
                        "fontColor": "#999",
                        "fontFamily": "Arial"
                    }
                }
            },
            "Items": [
                {
                    "title": "",
                    "date": "",
                    "description": ""
                }
            ]
        },
        "education": {
            "dimensions": {
                "width": "100vw",
                "minHeight": "default = 100vh"
            },
            "background": {
                "color": "#f3f3f3",
                "image": "none"
            },
            "educationItem": {
                "alignment": {
                    "textAlign": "left",
                    "verticalAlign": "middle"
                },
                "spacing": "20px",
                "style": {
                    "institution": {
                        "fontSize": "1.5rem",
                        "fontColor": "#333",
                        "fontFamily": "Arial"
                    },
                    "degree": {
                        "fontSize": "1.2rem",
                        "fontColor": "#666",
                        "fontFamily": "Arial"
                    },
                    "date": {
                        "fontSize": "1rem",
                        "fontColor": "#999",
                        "fontFamily": "Arial"
                    }
                }
            },
            "Items": [
                {
                    "institution": "",
                    "degree": "",
                    "date": ""
                }
            ]
        }
    
    }
}`


module.exports = portfolioJsonTemplate;