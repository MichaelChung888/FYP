module ProposalsEditForm

open Shared
open Common
open ProposalsTypes

open Feliz
open Feliz.Bulma
open Feliz.Router

open color

let TagFilter (dispatch: Msg -> unit) (project: EditProposalRequest) (filterType: FilterType) (filter: string)  = 
    Bulma.tag [ 
        prop.classes [ "filter-tag" ]
        prop.text (getFormattedCategory filter)
        prop.style [style.marginBottom 10; style.marginRight 10; style.cursor.pointer]
        match filterType with
        | Category ->
            prop.onClick (fun _ -> dispatch (ClickedCategoryTag filter))
            if (List.exists (fun c -> c = filter) project.categories) then Bulma.color.isInfo
        | Stream ->
            prop.onClick (fun _ -> dispatch (ClickedStreamTag filter))
            if (List.exists (fun c -> c = filter) project.streams) then Bulma.color.isInfo        
    ] 


// ---- Project Title --------------------------------------------------------------------

let ProjectTitle (project: EditProposalRequest) (dispatch: Msg -> unit) =
    Bulma.field.div [
        prop.children [
            Bulma.label [ prop.text "Project Title" ] 
            Html.div [
                prop.classes [Bulma.Control; Bulma.HasIconsLeft]
                prop.children [
                    Bulma.input.text [
                        prop.required true
                        prop.placeholder "Enter the title of your project"
                        prop.onTextChange (ProjectTitleChanged >> dispatch)
                        prop.value project.title
                    ]
                    Bulma.icon [
                        Bulma.icon.isSmall
                        Bulma.icon.isLeft
                        prop.children [
                            Html.i [
                                prop.classes ["fas fa-heading"]
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]

// ---- Categories -----------------------------------------------------------------------

let Categories (project: EditProposalRequest) (dispatch: Msg -> unit) =
    Html.div [
        prop.classes [ "field" ]
        prop.children [
            Bulma.label [ prop.text "Select the relevant Project Categories" ] 
            for c in categories do (TagFilter dispatch project FilterType.Category c)
        ]
    ]

// ---- Streams --------------------------------------------------------------------------

let Streams (project: EditProposalRequest) (dispatch: Msg -> unit) =
    Html.div [
        prop.classes [ "field" ]
        prop.children [
            Bulma.label [ prop.text "Select the relevant Student Streams" ] 
            for s in streams do (TagFilter dispatch project FilterType.Stream s)
        ]
    ]

// ---- Requirements ---------------------------------------------------------------------

let Requirements (project: EditProposalRequest) (dispatch: Msg -> unit) =
    Html.div [
        prop.classes [ "field" ]
        prop.children [
            Bulma.label [ prop.text "Student Requirements" ] 
            Html.textarea [
                prop.required true
                prop.rows 5
                prop.cols 33
                prop.placeholder "Enter the student requirements for this project"
                prop.onTextChange (RequirementsChanged >> dispatch)
                prop.value project.requirements
            ]
        ]
    ]

// ---- Skills ---------------------------------------------------------------------------

let Skills (project: EditProposalRequest) (dispatch: Msg -> unit) =
    Html.div [
        prop.classes [ "field" ]
        prop.children [
            Bulma.label [ prop.text "Desired Skills" ] 
            Html.textarea [
                prop.required true
                prop.rows 5
                prop.cols 33
                prop.placeholder "Enter the desired skills for this project"
                prop.onTextChange (SkillsChanged >> dispatch)
                prop.value project.skills
            ]
        ]
    ]

// ---- Description ----------------------------------------------------------------------

let Description (project: EditProposalRequest) (dispatch: Msg -> unit) =
    Html.div [
        prop.classes [ "field" ]
        prop.children [
            Bulma.label [ prop.text "Description" ] 
            Html.textarea [
                prop.required true
                prop.rows 5
                prop.cols 33
                prop.placeholder "Enter the project description"
                prop.onTextChange (DescriptionChanged >> dispatch)
                prop.value project.description
            ]
        ]
    ]

// ---- Meetings -------------------------------------------------------------------------

let Meetings (project: EditProposalRequest) (dispatch: Msg -> unit) =
    Html.div [
        prop.classes [ "field" ]
        prop.children [
            Bulma.label [ prop.text "Meeting dates" ] 
            Html.textarea [
                prop.required true
                prop.rows 5
                prop.cols 33
                prop.placeholder "Enter your availability for meetings"
                prop.onTextChange (MeetingsChanged >> dispatch)
                prop.value project.meetings
            ]
        ]
    ]