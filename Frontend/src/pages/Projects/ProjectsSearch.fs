module ProjectsSearch

open Shared
open Common
open ProjectsTypes

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

let ProfessorInput (dispatch: Msg -> unit) = 
    Bulma.field.div [
        prop.children [
            Bulma.label [ prop.text "Professor Name" ] 
            Html.div [
                prop.classes [Bulma.Control; Bulma.HasIconsLeft]
                prop.children [
                    Bulma.input.text [
                        prop.required true
                        prop.placeholder "Enter a Professor Name"
                        prop.onTextChange (SearchProfessorChanged >> dispatch)
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

// ---- Search ---------------------------------------------------------------------------

let TileCss = 
    [TurquoiseBackgroundRGBA 0.7; style.borderStyle.solid; style.borderColor mediumTurqouise; style.padding (length.perc 1.5)]

let TagFilter (dispatch: Msg -> unit) (model: Model) (filterType: FilterType) (filter: string)  = 
    Bulma.tag [ 
        prop.classes [ "filter-tag" ]
        prop.text (getFormattedCategory filter)
        prop.style [style.marginBottom 10; style.marginRight 10; style.cursor.pointer]
        match filterType with
        | Category ->
            prop.onClick (fun _ -> dispatch (ClickedCategoryTag filter))
            if (List.exists (fun c -> c = filter) model.selectedCategories) then Bulma.color.isInfo
        | Stream ->
            prop.onClick (fun _ -> dispatch (ClickedStreamTag filter))
            if (List.exists (fun c -> c = filter) model.selectedStreams) then Bulma.color.isInfo        
    ] 

let SearchFilters (dispatch: Msg -> unit) (model: Model) = [
    ProjectInput dispatch
    ProfessorInput dispatch

    Bulma.label [ prop.text "Relevant Project Categories" ] 
    for c in categories do
        TagFilter dispatch model FilterType.Category c

    Bulma.label [ prop.text "Stream" ] 
    for s in streams do
        TagFilter dispatch model FilterType.Stream s
]