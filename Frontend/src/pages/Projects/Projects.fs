module Projects

open Shared

open System

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

type Model = {
    loading: bool
    projects: List<Project>
    preference: PreferenceResponse
    token: string
    modalState: bool
    addProjectState: bool
    searchTitle: string
    searchProfessor: string
    selectedCategories: List<string>
    selectedStreams: List<string>
    selectedProject: Project
    selectedProjectRank: int
}

type InitalLoad = {
    projects: List<Project>
    preference: PreferenceResponse
}

type Msg =
    | SuccessLoad of InitalLoad // Initial fetch requests to the server were successful
    | ErrorLoad of exn // Fetch request to the server failed
    | Logout // Logout button of account
    | OpenModal of Project // Selected a project to preview
    | CloseModal // Close the selected project preview
    | AddProject // Send a request to server to add the project to your preference
    | OpenAddProject // Opens the menu to add the selected project to preferences
    | CloseAddProject // Closes the menu to add the selected project to preferences
    | RankAddProject of int // Selecting a rank to preference the selected project
    | SearchTitleChanged of string // Changing Search Title field
    | SearchProfessorChanged of string // Changing Search Professor field
    | ClickedCategoryTag of string // Clicked Search Category tag filter
    | ClickedStreamTag of string // Clicked Stream Category tag filter
    | SearchRequest // Sends a server request containing project filters
    | FetchedProjectsLoad of List<Project> // Recieving the filtered projects

//--------------------------------------------------------------------------------------//
//                                       Helpers                                        //
//--------------------------------------------------------------------------------------//

let currentSelectedPreference (model: Model) : int =
    match model.selectedProjectRank with
    | 1 -> model.preference.p1.pid
    | 2 -> model.preference.p2.pid
    | 3 -> model.preference.p3.pid
    | 4 -> model.preference.p4.pid
    | 5 -> model.preference.p5.pid
    | 6 -> model.preference.p6.pid
    | 7 -> model.preference.p7.pid
    | 8 -> model.preference.p8.pid
    | 9 -> model.preference.p9.pid
    | 10 -> model.preference.p10.pid
    | _ -> 0 // Shouldn't happen

//--------------------------------------------------------------------------------------//
//                  Model Initalise [init : unit -> Model * Cmd<Msg>]                   //
//--------------------------------------------------------------------------------------//

let init (token: string) : Model * Cmd<Msg> = 
    let defaultModel = { loading = true;
                        projects = []; 
                        preference = PreferenceResponse.Default;
                        token = token; 
                        modalState = false; 
                        addProjectState = false;
                        searchTitle = "";
                        searchProfessor = "";
                        selectedCategories = [];
                        selectedStreams = [];
                        selectedProject = Project.Default;
                        selectedProjectRank = 0 }
    let initialLoad () = 
        promise {
            let projectsUrl = "http://localhost:1234/projects"
            let preferenceUrl = "http://localhost:1234/preferences"
            
            let! projects =  Fetch.get(url=projectsUrl, 
                                       decoder=(Decode.list Project.Decoder),
                                       headers=[Authorization $"Bearer {token}"]) //properties=[Credentials RequestCredentials.Include]
            let! preference =  Fetch.get(url=preferenceUrl, 
                                         decoder=(PreferenceResponse.Decoder),
                                         headers=[Authorization $"Bearer {token}"]) 
            return { projects = projects; preference = preference }
        }
    defaultModel, Cmd.OfPromise.either initialLoad () SuccessLoad ErrorLoad

//--------------------------------------------------------------------------------------//
//               Model Update [update : Msg -> Model -> Model * Cmd<Msg>]               //
//--------------------------------------------------------------------------------------//

let update (msg: Msg) (model: Model) : Model * Cmd<Msg> =
    match msg with
    | SuccessLoad initialLoad ->
        { model with projects = initialLoad.projects; preference = initialLoad.preference; loading = false }, Cmd.none
    | ErrorLoad res ->
        printfn "%A" res
        { model with loading = false }, Cmd.none
    | Logout -> 
        model, Cmd.none
    | OpenModal project ->
        { model with modalState = true; selectedProject = project }, Cmd.none
    | CloseModal ->
        { model with modalState = false; addProjectState = false; selectedProjectRank = 0 }, Cmd.none
    | AddProject ->
        let data = {
            preference = currentSelectedPreference model
            newPreference = model.selectedProject.pid
            newPreferenceRankWhere = model.selectedProjectRank
        }
        let addPreference () = 
            promise {
                let addProjectUrl = "http://localhost:1234/add-project"
                let projectsUrl = "http://localhost:1234/projects"

                let! newPreference = Fetch.put(url=addProjectUrl, 
                                              data=data,
                                              decoder=(PreferenceResponse.Decoder),
                                              headers=[Authorization $"Bearer {model.token}"])     
                let! projects =  Fetch.get(url=projectsUrl, 
                                        decoder=(Decode.list Project.Decoder),
                                        headers=[Authorization $"Bearer {model.token}"])
                return { projects = projects; preference = newPreference }      
            }
        { model with modalState = false; addProjectState = false; loading = true; selectedProjectRank = 0 }
        , Cmd.OfPromise.either addPreference () SuccessLoad ErrorLoad
    | OpenAddProject ->
        { model with addProjectState = true }, Cmd.none
    | CloseAddProject ->
        { model with addProjectState = false; selectedProjectRank = 0 }, Cmd.none
    | RankAddProject rank ->
        { model with selectedProjectRank = rank }, Cmd.none
    | SearchTitleChanged title ->
        { model with searchTitle = title }, Cmd.ofMsg SearchRequest
    | SearchProfessorChanged title ->
        { model with searchProfessor = title }, Cmd.ofMsg SearchRequest
    | ClickedCategoryTag tag ->
        let sc = model.selectedCategories
        match (List.exists (fun c -> c = tag) sc) with
        | true -> // Already in list, hence removing tag from search
            { model with selectedCategories = List.filter (fun c -> c <> tag) sc}, Cmd.ofMsg SearchRequest
        | false -> // Not in list, hence adding tag to search
            { model with selectedCategories = sc @ [tag]}, Cmd.ofMsg SearchRequest
    | ClickedStreamTag tag ->
        let ss = model.selectedStreams
        match (List.exists (fun c -> c = tag) ss) with
        | true -> // Already in list, hence removing tag to search
            { model with selectedStreams = List.filter (fun c -> c <> tag) ss}, Cmd.ofMsg SearchRequest
        | false -> // Not in list, hence adding tag to search
            { model with selectedStreams = ss @ [tag]}, Cmd.ofMsg SearchRequest
    | SearchRequest ->
        let data = {
            title = model.searchTitle;
            professor = model.searchProfessor;
            categories = model.selectedCategories;
            streams = model.selectedStreams
        }
        let searchRequest () = 
            promise {
                let url = "http://localhost:1234/search-projects"
                return! Fetch.post(url=url, 
                                  data=data,
                                  decoder=(Decode.list Project.Decoder),
                                  headers=[Authorization $"Bearer {model.token}"]) //properties=[Credentials RequestCredentials.Include]
            }
        model, Cmd.OfPromise.either searchRequest () FetchedProjectsLoad ErrorLoad
    | FetchedProjectsLoad projects ->
        { model with projects = projects }, Cmd.none

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

// ---- NavBar ---------------------------------------------------------------------------

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
    
// ---- Table ----------------------------------------------------------------------------

let Tag (model: Model) (filter: string) =
    Bulma.tag [
        prop.text (getFormattedCategory filter)
        prop.style [style.marginBottom 10; style.marginRight 10]
        if (List.exists (fun c -> c = filter) model.selectedCategories) then Bulma.color.isInfo
    ]

let TableCategories (model: Model) (categories: string) =
    (categories.Split ',') |> Array.toList |> List.map (Tag model)

let TableRow (dispatch: Msg -> unit) (model: Model) (projectInfo: Project)  = 
    Html.tr [
        prop.classes [ "table-row" ]
        prop.onClick (fun _ -> dispatch (OpenModal projectInfo))
        prop.style [style.cursor.pointer]
        prop.children [
            Html.td [prop.text projectInfo.title]
            Html.td [prop.text projectInfo.supName]
            Html.td [prop.text projectInfo.r1]
            Html.td [prop.text projectInfo.r2]
            Html.td [prop.text projectInfo.r3]
            Html.td [prop.text projectInfo.r4]
            Html.td [prop.text projectInfo.r5]
            Html.td [prop.text projectInfo.r6]
            Html.td [prop.text projectInfo.r7]
            Html.td [prop.text projectInfo.r8]
            Html.td [prop.text projectInfo.r9]
            Html.td [prop.text projectInfo.r10]
            Html.td (TableCategories model projectInfo.categories)
            Html.td [prop.text (projectInfo.updated.ToString "yyyy/MM/dd")]
        ]
    ]

let Table (body: ReactElement list) = 
    Html.div [
        prop.style [style.overflowY.auto; style.height (length.perc 95)]
        prop.classes [ "scrollbar" ]
        prop.children [
            Bulma.table [
                prop.style [style.width (length.perc 100)]
                prop.children body
            ]
        ]
    ]

// ---- New Projects Table ---------------------------------------------------------------

let ProjectTable (model: Model) (dispatch: Msg -> unit) =
    Table [
        Html.thead [
            Html.tr [
                Html.th [ prop.title "Title"; prop.text "Title"]
                Html.th [ prop.title "Supervisor"; prop.text "Supervisor"]
                Html.th [ prop.title "P1"; prop.text "P1"]
                Html.th [ prop.title "P2"; prop.text "P2"]
                Html.th [ prop.title "P3"; prop.text "P3"]
                Html.th [ prop.title "P4"; prop.text "P4"]
                Html.th [ prop.title "P5"; prop.text "P5"]
                Html.th [ prop.title "P6"; prop.text "P6"]
                Html.th [ prop.title "P7"; prop.text "P7"]
                Html.th [ prop.title "P8"; prop.text "P8"]
                Html.th [ prop.title "P9"; prop.text "P9"]
                Html.th [ prop.title "P10"; prop.text "P10"]
                Html.th [ prop.title "Related Categories"; prop.text "Related Categories"]
                Html.th [ prop.title "Last Updated"; prop.text "Last Updated"]
            ]
        ]
        Html.tbody (List.map (TableRow dispatch model) model.projects)
    ]

// ---- Modal Project Info Content --------------------------------------------------------------------

let modalProjectInfoMedia (sp: Project) =
    Bulma.media [
        prop.style [style.marginBottom 40]
        prop.children [
            Bulma.mediaLeft [
                Bulma.image [
                    Bulma.image.is48x48
                    prop.children [
                        Html.img [ prop.src "https://bulma.io/assets/images/placeholders/96x96.png" ]
                    ]
                ]
            ]
        
            Bulma.mediaContent [
                Bulma.title [ prop.classes [ Bulma.Is4 ]; prop.text sp.supName] 
                Bulma.subtitle [ prop.classes [ Bulma.Is6 ]; prop.text "example123@ic.ac.uk"]
            ]
        ]
    ]

let modalProjectInfoBody (model: Model) (sp: Project) = 
    Bulma.content [
        Bulma.columns [
            Bulma.column [
                prop.classes [ Bulma.Is4]
                prop.children [
                    Html.h3 "Project Rankings"
                    Html.ol [
                        prop.style [style.fontWeight 700]
                        prop.children [
                            Html.li [ prop.key "1"; prop.text (sp.r1.ToString()) ]
                            Html.li [ prop.key "2"; prop.text (sp.r2.ToString()) ]
                            Html.li [ prop.key "3"; prop.text (sp.r3.ToString()) ]
                            Html.li [ prop.key "4"; prop.text (sp.r4.ToString()) ]
                            Html.li [ prop.key "5"; prop.text (sp.r5.ToString()) ]
                            Html.li [ prop.key "6"; prop.text (sp.r6.ToString()) ]
                            Html.li [ prop.key "7"; prop.text (sp.r7.ToString()) ]
                            Html.li [ prop.key "8"; prop.text (sp.r8.ToString()) ]
                            Html.li [ prop.key "9"; prop.text (sp.r9.ToString()) ]
                            Html.li [ prop.key "10"; prop.text (sp.r10.ToString()) ]

                        ]
                    ]
                ]
            ]
            Bulma.column [
                Html.h3 "Project Categories"
                for c in (TableCategories model sp.categories) do 
                    c

                Html.h3 "Student Requirements"
                Html.p sp.requirements
            ]
        ]

        Html.h3 "Desired Skills"
        Html.p sp.skills

        Html.h3 "Project Description"
        Html.p sp.descr

        Html.h3 "Meeting Dates"
        Html.p sp.meetings 
    ]

let modalProjectInfo (model: Model) (dispatch: Msg -> unit) = 
    let sp = model.selectedProject

    Bulma.modalCard [
        Bulma.modalCardHead [
            Bulma.modalCardTitle ("#" + sp.pid.ToString() + " " + sp.title)
            Bulma.modalClose [ 
                prop.classes [ Bulma.IsLarge ]
                prop.onClick (fun _ -> dispatch CloseModal)
            ]
        ]
        Bulma.modalCardBody [
            prop.classes [ "scrollbar" ]
            prop.children [ 
                modalProjectInfoMedia sp
                modalProjectInfoBody model sp 
            ]

        ]
        Bulma.modalCardFoot [
            Bulma.buttons [
                Bulma.button.button [
                    match model.preference.doc with
                    | true ->
                        prop.text "You've entered DOC allocation"
                        prop.disabled true
                        Bulma.color.isWarning
                    | false ->
                        Bulma.color.isSuccess
                        prop.text "Add Project"
                        prop.onClick (fun _ -> dispatch OpenAddProject)
                ]
                Bulma.button.button [
                    prop.text "Close Project"
                    prop.onClick (fun _ -> dispatch CloseModal)
                ]
            ]
        ]
    ]

// ---- Modal Add Project Content --------------------------------------------------------------------

let PreferenceRow (model: Model) (dispatch: Msg -> unit) ((projectInfo, rank): Project * int) = 
    Html.tr [
        prop.classes [ "table-row" ]
        prop.onClick (fun _ -> dispatch (RankAddProject rank))
        prop.style [style.cursor.pointer]
        match (model.selectedProjectRank = rank) , projectInfo.pid with
        | true, _ ->
            prop.children [
                Html.td [prop.style [style.color.red]; prop.text rank]
                Html.td [prop.style [style.color.red]; prop.text model.selectedProject.title]
                Html.td [prop.style [style.color.red]; prop.text model.selectedProject.supName]
            ]
        | _, 0 ->
            prop.children [
                Html.td [prop.text rank]
                Html.td []
                Html.td []
            ]
        | _, _ ->
            prop.children [
                Html.td [prop.text rank]
                Html.td [prop.text projectInfo.title]
                Html.td [prop.text projectInfo.supName]
            ]
    ]


let PreferenceTable (model: Model) (dispatch: Msg -> unit) =
    let pref = model.preference
    let prefList = [(pref.p1, pref.n1); (pref.p2, pref.n2); (pref.p3, pref.n3); (pref.p4, pref.n4); (pref.p5, pref.n5);
                    (pref.p6, pref.n6); (pref.p7, pref.n7); (pref.p8, pref.n8); (pref.p9, pref.n9); (pref.p10, pref.n10);]
    Table [
        Html.thead [
            Html.tr [
                Html.th [ prop.title "Rank"; prop.text "Rank"]
                Html.th [ prop.title "Title"; prop.text "Title"]
                Html.th [ prop.title "Professor"; prop.text "Professor"]
            ]
        ]
        Html.tbody (List.map (PreferenceRow model dispatch) prefList)
    ]

let modalAddProject (model: Model) (dispatch: Msg -> unit) = 
    let sp = model.selectedProject

    Bulma.modalCard [
        Bulma.modalCardHead [
            Bulma.modalCardTitle ("#" + sp.pid.ToString() + " " + sp.title)
            Bulma.modalClose [ 
                prop.classes [ Bulma.IsLarge ]
                prop.onClick (fun _ -> dispatch CloseModal)
            ]
        ]
        Bulma.modalCardBody [
            prop.classes [ "scrollbar" ]
            prop.children [
                Bulma.content [
                    Html.h3 "Add Project"
                    Html.p "You are about to add the following project to your preferences:"
                    Html.blockquote ("'" + sp.title + "'")
                    Html.p "Below in your preferences, please select a preference rank 
                            of where you would like to replace or place the project."
                    
                    Html.h3 "Your Preferences"
                    PreferenceTable model dispatch
                ]
            ]
        ]
        Bulma.modalCardFoot [
            Bulma.buttons [
                Bulma.button.button [
                    prop.text "Save Changes"
                    match (model.selectedProjectRank = 0) with
                    | true -> // If true then selectedProject hasen't been preferenced yet, hence can't save changes
                        prop.disabled true
                    | false -> // If false then selectedProject has been preferenced, hence can now save changes
                        prop.onClick (fun _ -> dispatch AddProject)
                        Bulma.color.isSuccess
                ]
                Bulma.button.button [
                    prop.text "Go Back"
                    prop.onClick (fun _ -> dispatch CloseAddProject)
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
                prop.style [ style.height (length.vh 90); style.margin (length.perc 1)]
                prop.children [

                    Bulma.column [
                        prop.style ([style.overflowY.scroll] @ TileCss)
                        prop.classes [ Bulma.Is3; "scrollbar" ]
                        prop.children (SearchFilters dispatch model)
                    ]

                    Bulma.column [ prop.classes [Bulma.Is0] ] // Column Gap

                    Bulma.column [
                        prop.style TileCss
                        prop.children [
                            Bulma.label [ prop.text "Projects" ] 
                            ProjectTable model dispatch
                        ]
                    ]

                    Bulma.modal [
                        if model.modalState then Bulma.modal.isActive
                        prop.onKeyUp (key.escape, fun ev -> dispatch CloseModal)
                        prop.classes [ "scrollbar"; Bulma.IsLarge ]
                        prop.children [
                            Bulma.modalBackground []
                            match model.addProjectState with
                            | false ->
                                modalProjectInfo model dispatch
                            | true ->
                                modalAddProject model dispatch
                        ]
                    ]
                ]   
            ]
 
        ]
    ]
