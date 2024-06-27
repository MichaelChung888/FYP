module AllProjectsSearch

open Shared
open Common
open AllProjectsTypes

open Feliz
open Feliz.Bulma
open Feliz.Router

open color

// ---- Search ---------------------------------------------------------------------------

let ProjectInput (dispatch: Msg -> unit) = 
    Bulma.field.div [
        prop.children [
            Bulma.label [
                prop.text "Project Title"
            ] 
            Html.div [
                prop.classes [Bulma.Control; Bulma.HasIconsLeft]
                prop.children [
                    Bulma.input.text [
                        prop.required true
                        prop.placeholder "Enter a Project Title"
                        prop.onTextChange (SearchTitleChanged >> dispatch)
                    ]
                    Bulma.icon [
                        Bulma.icon.isSmall
                        Bulma.icon.isLeft
                        prop.children [
                            Html.i [
                                prop.className "fas fa-search"
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]

let UserInput (dispatch: Msg -> unit) = 
    Bulma.field.div [
        prop.children [
            Bulma.label [ prop.text "User's Name" ] 
            Html.div [
                prop.classes [Bulma.Control; Bulma.HasIconsLeft]
                prop.children [
                    Bulma.input.text [
                        prop.required true
                        prop.placeholder "Enter a User's Name"
                        prop.onTextChange (SearchUserChanged >> dispatch)
                    ]
                    Bulma.icon [
                        Bulma.icon.isSmall
                        Bulma.icon.isLeft
                        prop.children [
                            Html.i [
                                prop.className "fas fa-search"
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]

// ---- Whole Search Display -------------------------------------------------------------

let SearchFilters (dispatch: Msg -> unit) (model: Model) = [
    ProjectInput dispatch
    UserInput dispatch
]

