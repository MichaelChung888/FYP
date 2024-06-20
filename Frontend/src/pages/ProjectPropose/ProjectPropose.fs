module ProjectPropose

open Shared

open Thoth.Json
open Thoth.Fetch
open Fetch

open Elmish

open Feliz
open Feliz.Bulma
open Feliz.Router

open color

open Zanaptak.TypedCssClasses
type Bulma = CssClasses<"https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css", Naming.PascalCase>

//--------------------------------------------------------------------------------------//
//                                        Types                                         //
//--------------------------------------------------------------------------------------//

type ResponseResult = 
    | Success
    | Failed
    | Neither

type Model = {
    loading: bool
    token: string
    user: Person
    projectTitle: string
    selectedCategories: List<string>
    selectedStreams: List<string>
    requirements: string
    description: string
    skills: string
    meetings: string
    validationMessage: string option
    responseResult: ResponseResult
}

type Msg =
    | SuccessLoad of string
    | Error of exn
    | Logout
    | ProjectTitleChanged of string
    | ClickedCategoryTag of string 
    | ClickedStreamTag of string 
    | RequirementsChanged of string
    | SkillsChanged of string
    | DescriptionChanged of string
    | MeetingsChanged of string
    | Submit of Browser.Types.Event

//--------------------------------------------------------------------------------------//
//                                       Helpers                                        //
//--------------------------------------------------------------------------------------//

let isStudent (user: Person) =
    match user.categ with
    | "U" | "M" -> true // Student
    | _ -> false // Supervisor

let titleValid (model: Model) = (model.projectTitle <> "")
let requirementsValid (model: Model) = (model.requirements <> "")
let skillsValid (model: Model) = (model.skills <> "")
let descriptionValid (model: Model) = (model.description <> "")
let meetingsValid (model: Model) = (model.meetings <> "")
let streamValid (model: Model) = (List.length model.selectedStreams > 0)
let categoryValid (model: Model) = (List.length model.selectedCategories > 0)


let isFormValid (model: Model) =
    if (isStudent model.user) then
        (titleValid model) && (descriptionValid model) && (meetingsValid model) 
        && (categoryValid model) 
    else
        (titleValid model) && (requirementsValid model) && (skillsValid model)
        && (descriptionValid model) && (meetingsValid model) && (categoryValid model) 
        && (streamValid model)

//--------------------------------------------------------------------------------------//
//                  Model Initalise [init : unit -> Model * Cmd<Msg>]                   //
//--------------------------------------------------------------------------------------//

let init (token: string) (user: Person) : Model * Cmd<Msg> = 
    let defaultModel = { loading = false; token = token; user = user; projectTitle = ""; selectedCategories = [];
                          selectedStreams = []; requirements = ""; description = ""; skills = "";
                          meetings = ""; validationMessage = None; responseResult = Neither}
    defaultModel, Cmd.none

//--------------------------------------------------------------------------------------//
//               Model Update [update : Msg -> Model -> Model * Cmd<Msg>]               //
//--------------------------------------------------------------------------------------//

let update (msg: Msg) (model: Model) : Model * Cmd<Msg> =
    match msg with
    | SuccessLoad success ->
        { model with loading = false; responseResult = Success }, Cmd.none
    | Error res ->
        printfn "%A" res
        { model with loading = false; responseResult = Failed }, Cmd.none
    | Logout -> 
        model, Cmd.none
    | ProjectTitleChanged title ->
        { model with projectTitle = title; responseResult = Neither }, Cmd.none
    | ClickedCategoryTag tag ->
        let sc = model.selectedCategories
        match (List.exists (fun c -> c = tag) sc) with
        | true -> // Already in list, hence removing tag from search
            { model with selectedCategories = List.filter (fun c -> c <> tag) sc; responseResult = Neither }, Cmd.none
        | false -> // Not in list, hence adding tag to search
            { model with selectedCategories = sc @ [tag]}, Cmd.none
    | ClickedStreamTag tag ->
        let ss = model.selectedStreams
        match (List.exists (fun c -> c = tag) ss) with
        | true -> // Already in list, hence removing tag to search
            { model with selectedStreams = List.filter (fun c -> c <> tag) ss; responseResult = Neither }, Cmd.none
        | false -> // Not in list, hence adding tag to search
            { model with selectedStreams = ss @ [tag]}, Cmd.none
    | RequirementsChanged requirements ->
        { model with requirements = requirements; responseResult = Neither }, Cmd.none
    | DescriptionChanged description ->
        { model with description = description; responseResult = Neither }, Cmd.none
    | SkillsChanged skills ->
        { model with skills = skills; responseResult = Neither }, Cmd.none
    | MeetingsChanged meetings ->
        { model with meetings = meetings; responseResult = Neither }, Cmd.none
    | Submit ev ->
        ev.preventDefault ()
        let data = {
            title = model.projectTitle
            isStudent = (isStudent model.user)
            categories = model.selectedCategories
            streams = if (isStudent model.user) then [] else model.selectedStreams
            requirements = if (isStudent model.user) then "" else model.requirements
            description = if (isStudent model.user) then "" else model.description
            skills = if (isStudent model.user) then "" else model.skills
            meetings = model.meetings
        }
        let handleSubmit () = 
            promise {
                let url = "http://localhost:1234/project-propose"
                return! Fetch.post(url=url,
                                   data=data,
                                   decoder=Decode.string,
                                   headers=[Authorization $"Bearer {model.token}"]) //properties=[Credentials RequestCredentials.Include]
            }
        { model with loading = true; responseResult = Neither }, Cmd.OfPromise.either handleSubmit () SuccessLoad Error

//--------------------------------------------------------------------------------------//
//                                 Render Subcomponents                                 //
//--------------------------------------------------------------------------------------//

let LoadingScreen =
    Html.div [
        prop.style [style.top 0; style.left 0; style.overflow.hidden; style.position.absolute; 
                    style.height (length.vh 100); style.width (length.vw 100); style.display.flex
                    style.zIndex 100; style.backgroundColor (rgba (0, 0, 0, 0.6))
                    style.justifyContent.center; style.alignItems.center]
        prop.children [
            Html.div [ prop.classes [ "loader" ] ]
        ]
    ]

let TurquoiseBackground opacity =
    Html.div [
        prop.style [style.top 0; style.left 0; style.overflow.hidden; style.position.absolute; style.height (length.perc 100); style.width (length.perc 100); style.opacity opacity; style.zIndex -1; style.backgroundColor turqouise]
    ]

let TurquoiseBackgroundRGBA opacity =
    style.backgroundColor (rgba (175, 238, 238, opacity))

let ImageBackground = 
    Html.img [
        prop.style [style.position.absolute; style.height (length.perc 100); style.width (length.perc 100); style.zIndex -2; style.overflow.hidden] // style.objectFit.cover;
        prop.src "/images/imperial.jpg"
    ]

// ---- Navigation Bar -------------------------------------------------------------------

let NavBar (dispatch: Msg -> unit) =
    Bulma.navbar [
        prop.style [style.backgroundColor mediumTurqouise; style.fontWeight 700]
        prop.children [
            Bulma.navbarBrand.div [
                prop.onClick (fun e -> Router.navigatePath("home-student"))
                prop.style [style.paddingTop 3; style.paddingRight 20; style.paddingLeft 10; style.cursor.pointer]
                prop.children [ 
                    Bulma.icon [
                        Bulma.icon.isLarge
                        prop.children [ Html.i [ prop.className "fas fa-home fa-2x"] ]
                    ]
                ] 
            ]
            Bulma.navbarMenu [
                Bulma.navbarStart.div [
                    Bulma.navbarItem.a [ prop.text "Projects"; prop.onClick (fun e -> Router.navigatePath("home-student", "projects")) ]
                    Bulma.navbarItem.a [ prop.text "Preferences"; prop.onClick (fun e -> Router.navigatePath("home-student", "preferences")) ]
                    Bulma.navbarItem.a [ prop.text "Propose a Project"; prop.onClick (fun e -> Router.navigatePath("project-propose")) ]
                ]
                Bulma.navbarEnd.div [
                    Bulma.navbarItem.div [
                        Bulma.buttons [
                            Bulma.button.a [ prop.text "Log Out"; prop.onClick (fun _ -> dispatch Logout) ]
                        ]
                    ]
                ]
            ]
        ]
    ]  

// ---- Components -----------------------------------------------------------------------

let BulmaTile (classes: string list) (styles: IStyleAttribute list) (props: ReactElement list) = 
    Bulma.tile [
        prop.classes classes
        prop.style styles
        prop.children props
    ]

let Div (classes: string list) (styles: IStyleAttribute list) (props: ReactElement list) = 
    Html.div [
        prop.classes classes
        prop.style styles
        prop.children props
    ]

let TileCss = 
    [TurquoiseBackgroundRGBA 0.7; style.borderStyle.solid; style.borderColor mediumTurqouise; style.overflow.hidden]

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
                        prop.classes [ Bulma.IsActive ]
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

// ---- Categories -----------------------------------------------------------------------

let Categories (model: Model) (dispatch: Msg -> unit) =
    Html.div [
        prop.classes [ "field" ]
        prop.children [
            Bulma.label [ prop.text "Select the relevant Project Categories" ] 
            for c in categories do (TagFilter dispatch model FilterType.Category c)
        ]
    ]

// ---- Streams --------------------------------------------------------------------------

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

//--------------------------------------------------------------------------------------//
//              Model View [view : Model -> (Msg -> unit) -> ReactElement]              //
//--------------------------------------------------------------------------------------//

let view (model: Model) (dispatch: Msg -> unit) =
    Html.body [
        prop.style [style.height (length.vh 100); style.position.relative]
        prop.children [
            if model.loading then LoadingScreen
            TurquoiseBackground 0.5
            ImageBackground
            NavBar dispatch

            Bulma.columns [
                prop.classes [ "is-centered" ]
                prop.style [ style.height (length.vh 90); style.margin (length.perc 1); style.position.relative ]
                prop.children [


                    Bulma.column [
                        prop.style TileCss
                        prop.classes [ Bulma.IsHalf ]
                        prop.children [

                            Bulma.content [
                                prop.style [ style.overflowY.scroll; style.height (length.perc 100); style.padding 50 ]
                                prop.classes [ "scrollbar" ]
                                prop.children [
                                    Html.form [
                                        prop.onSubmit (Submit >> dispatch)
                                        prop.children [
                                            Bulma.title [ prop.text "Project Proposal Form" ]
                                            Tabs model 
                                            ResponseResultMessage model
                                            ValidityCheck model
                                            Name model
                                            ProjectTitle model dispatch
                                            Categories model dispatch
                                            if not (isStudent model.user) then Streams model dispatch
                                            if not (isStudent model.user) then Requirements model dispatch
                                            if not (isStudent model.user) then Skills model dispatch
                                            Description model dispatch
                                            Meetings model dispatch
                                            SubmitButton model
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]                    
                ]   
            ]
 
        ]
    ]