module ProjectsProposeForm

open Shared
open Common
open ProjectProposeTypes
open ProjectProposeHelpers

open Feliz
open Feliz.Bulma

open color

// ---- Submit Result ----------------------------------------------------------------

let ResponseResultMessage (model: Model) =
    Html.p [
        match model.responseResult with
        | Success ->
            prop.style [ style.color.green ]
            prop.text "Project created successfully"
        | Failed ->
            prop.style [ style.color.red ]
            prop.text "Failed to create project"
        | Neither -> ()
    ]

// ---- Validity Check -----------------------------------------------------------------

let ValidityCheck (model: Model) =
    Html.p [
        prop.style [ style.color.red ]
        prop.children [
            if not (isFormValid model) then Html.p "Complete all requirements below to propose a project:"
            Html.ul [
                if not (titleValid model) then Html.li "Please enter the title of your project"
                if not (categoryValid model) then Html.li "Please select at least one category"
                if not (streamValid model) && not (isStudent model.user) then Html.li "Please select at least one stream"
                if not (requirementsValid model) && not (isStudent model.user) then Html.li "Please enter the requirements for your project"
                if not (skillsValid model) && not (isStudent model.user) then Html.li "Please enter the skills required for your project"
                if not (descriptionValid model) then Html.li "Please enter the description of your project"
                if not (meetingsValid model) then Html.li "Please enter the meeting details for your project"
            ]
        ]
    ]

// ---- Tabs -----------------------------------------------------------------------------

let Tabs (model: Model) = 
    Bulma.tabs [
        prop.children [
            Html.ul [
                prop.style [ style.marginLeft 0 ]
                prop.children [
                    Bulma.tab [
                        if (isStudent model.user) then prop.classes [ Bulma.IsActive ]
                        prop.children [ Html.a [ prop.text "Student"; prop.style [ style.fontWeight.bold ] ] ]
                    ]
                    Bulma.tab [
                        if not (isStudent model.user) then prop.classes [ Bulma.IsActive ]
                        prop.children [ Html.a [ prop.text "Supervisor"; prop.style [ style.fontWeight.bold ] ] ]
                    ]
                ]
            ]
        ]
    ]

// ---- Name ----------------------------------------------------------------------------

let Name (model: Model) =
    Bulma.field.div [
        prop.children [
            Bulma.label [ prop.text "Name" ] 
            Html.div [
                prop.classes [Bulma.Control; Bulma.HasIconsLeft]
                prop.children [
                    Bulma.input.text [
                        prop.required true
                        prop.disabled true
                        prop.value model.user.forenames
                    ]
                    Bulma.icon [
                        Bulma.icon.isSmall
                        Bulma.icon.isLeft
                        prop.children [
                            Html.i [
                                prop.classes ["fas fa-user"]
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]

// ---- Project Title --------------------------------------------------------------------

let ProjectTitle (model: Model) (dispatch: Msg -> unit) =
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
                        prop.value model.projectTitle
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

// ---- Categories and Streams -----------------------------------------------------------

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

let Categories (model: Model) (dispatch: Msg -> unit) =
    Html.div [
        prop.classes [ "field" ]
        prop.children [
            Bulma.label [ prop.text "Select the relevant Project Categories" ] 
            for c in categories do (TagFilter dispatch model FilterType.Category c)
        ]
    ]

let Streams (model: Model) (dispatch: Msg -> unit) =
    Html.div [
        prop.classes [ "field" ]
        prop.children [
            Bulma.label [ prop.text "Select the relevant Student Streams" ] 
            for s in streams do (TagFilter dispatch model FilterType.Stream s)
        ]
    ]

// ---- Requirements ---------------------------------------------------------------------

let Requirements (model: Model) (dispatch: Msg -> unit) =
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
                prop.value model.requirements
            ]
        ]
    ]

// ---- Skills ---------------------------------------------------------------------------

let Skills (model: Model) (dispatch: Msg -> unit) =
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
                prop.value model.skills
            ]
        ]
    ]

// ---- Description ----------------------------------------------------------------------

let Description (model: Model) (dispatch: Msg -> unit) =
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
                prop.value model.description
            ]
        ]
    ]

// ---- Meetings -------------------------------------------------------------------------

let Meetings (model:Model) (dispatch: Msg -> unit) =
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
                prop.value model.meetings
            ]
        ]
    ]

// ---- Submit Button --------------------------------------------------------------------

let SubmitButton (model: Model) =
    Html.div [
        prop.classes [Bulma.Field; Bulma.IsGrouped; Bulma.IsGroupedCentered]
        prop.children [
            Bulma.control.div [
                Bulma.button.button [
                    Bulma.color.isInfo
                    prop.text "Submit"
                    if not (isFormValid model) then (prop.disabled true)
                ]
            ]
        ]
    ]