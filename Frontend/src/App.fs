module App

open Elmish
open Elmish.React
open Feliz
open Feliz.Router

open Shared
open Common
open Login
open HomeStudent
open Projects
open Preferences
open ProjectPropose
open HomeSupervisor
open Proposals

open Fable.Core.JsInterop
importSideEffects "./styles.css"

//--------------------------------------------------------------------------------------//
//                                        Types                                         //
//--------------------------------------------------------------------------------------//

type ApplicationUser =
    | Anonymous
    | LoggedIn of Person

type Url =
    | LoginUrl
    | HomeStudentUrl
    | ProjectsUrl
    | PreferencesUrl
    | ProjectProposeUrl
    | HomeSupervisorUrl
    | ProposalsUrl
    | AllProjectsUrl
    //| AllPreferencesUrl
    | NotFoundUrl
    | EmptyUrl

type Page = // Pages
    | LoginPage of Login.Model
    | HomeStudentPage of HomeStudent.Model
    | ProjectsPage of Projects.Model
    | PreferencesPage of Preferences.Model
    | ProjectProposePage of ProjectPropose.Model
    | HomeSupervisorPage of HomeSupervisor.Model
    | ProposalsPage of Proposals.Model
    | AllProjectsPage of AllProjects.Model
    //| AllPreferencesPage of AllPreferences.Model
    | NotFoundPage

type Msg =
    | LoginMsg of Login.Msg
    | HomeStudentMsg of HomeStudent.Msg
    | ProjectsMsg of Projects.Msg
    | PreferencesMsg of Preferences.Msg
    | ProjectProposeMsg of ProjectPropose.Msg
    | HomeSupervisorMsg of HomeSupervisor.Msg
    | ProposalsMsg of Proposals.Msg
    | AllProjectsMsg of AllProjects.Msg
    //| AllPreferencesMsg of AllPreferences.Msg
    | UrlChanged of Url

type Model = {
    user : ApplicationUser
    currentUrl: Url
    currentPage: Page
    token: string
}

//--------------------------------------------------------------------------------------//
//                  Model Initalise [init : unit -> Model * Cmd<Msg>]                   //
//--------------------------------------------------------------------------------------//

let parseUrl = function
    | [] -> EmptyUrl
    | ["login"] -> LoginUrl
    | ["home-student"] -> HomeStudentUrl
    | ["home-student"; "projects"] -> ProjectsUrl
    | ["home-student"; "preferences"] -> PreferencesUrl
    | ["project-propose"] -> ProjectProposeUrl
    | ["home-supervisor"] -> HomeSupervisorUrl
    | ["home-supervisor"; "proposals"] -> ProposalsUrl
    | ["home-supervisor"; "all-projects"] -> AllProjectsUrl
    //| ["home-supervisor"; "all-preferences"] -> AllPreferencesUrl
    | _ -> NotFoundUrl

let init () : Model * Cmd<Msg> = 
    let initialUrl = Router.currentPath() |> parseUrl
    let defaultModel = {
        user = Anonymous
        currentUrl = initialUrl
        currentPage = NotFoundPage
        token = ""
    }
    
    match initialUrl with
    | LoginUrl ->
        let page, msg = Login.init ()
        { defaultModel with currentPage = (LoginPage page) }, Cmd.map LoginMsg msg
    | HomeStudentUrl ->
        defaultModel, Cmd.navigatePath("login", HistoryMode.ReplaceState)
    | ProjectsUrl ->
        defaultModel, Cmd.navigatePath("login", HistoryMode.ReplaceState) 
    | PreferencesUrl ->
        defaultModel, Cmd.navigatePath("login", HistoryMode.ReplaceState)
    | ProjectProposeUrl ->
        defaultModel, Cmd.navigatePath("login", HistoryMode.ReplaceState)
    | HomeSupervisorUrl ->
        defaultModel, Cmd.navigatePath("login", HistoryMode.ReplaceState)
    | ProposalsUrl ->
        defaultModel, Cmd.navigatePath("login", HistoryMode.ReplaceState)
    | AllProjectsUrl ->
        defaultModel, Cmd.navigatePath("login", HistoryMode.ReplaceState)
    //| AllPreferencesUrl ->
    //    defaultModel, Cmd.navigatePath("login", HistoryMode.ReplaceState)
    | NotFoundUrl ->
        { defaultModel with currentPage = NotFoundPage }, Cmd.none
    | EmptyUrl ->
        defaultModel, Cmd.navigatePath("login", HistoryMode.ReplaceState) 

//--------------------------------------------------------------------------------------//
//               Model Update [update : Msg -> Model -> Model * Cmd<Msg>]               //
//--------------------------------------------------------------------------------------//

let update (msg: Msg) (model: Model) : Model * Cmd<Msg> =

    let updatePage (page : Page) : Model =
        { model with currentPage = page }

    let showPage (page : Page) (url : Url): Model =
        { model with currentPage = page; currentUrl = url}

    match msg, model.currentPage with 
    | LoginMsg msg, LoginPage page ->
        match msg with
        | SuccessLogin res ->
            let person = res.person
            match person.categ with
            | "U" | "M" -> // Student
                { model with user = (LoggedIn res.person); token = res.token }, Cmd.navigatePath("home-student")
            | _ -> // Supervisor
                { model with user = (LoggedIn res.person); token = res.token }, Cmd.navigatePath("home-supervisor")

        | msg ->
            let newPage, newMsg = Login.update msg page
            updatePage (LoginPage newPage), Cmd.map LoginMsg newMsg

    | HomeStudentMsg msg, HomeStudentPage page ->
        match msg with
        | HomeStudent.Msg.Logout ->
            { model with user = Anonymous; token = ""}, Cmd.navigatePath("login")
        | msg ->
            let newPage, newMsg = HomeStudent.update msg page
            updatePage (HomeStudentPage newPage), Cmd.map HomeStudentMsg newMsg

    | ProjectsMsg msg, ProjectsPage page ->
        match msg with
        | Projects.Msg.Logout ->
            { model with user = Anonymous; token = ""}, Cmd.navigatePath("login")
        | msg ->
            let newPage, newMsg = Projects.update msg page
            updatePage (ProjectsPage newPage), Cmd.map ProjectsMsg newMsg

    | PreferencesMsg msg, PreferencesPage page ->
        match msg with
        | Preferences.Msg.Logout ->
            { model with user = Anonymous; token = ""}, Cmd.navigatePath("login")
        | msg ->
            let newPage, newMsg = Preferences.update msg page
            updatePage (PreferencesPage newPage), Cmd.map PreferencesMsg newMsg  

    | ProjectProposeMsg msg, ProjectProposePage page ->
        match msg with
        | ProjectPropose.Msg.Logout ->
            { model with user = Anonymous; token = ""}, Cmd.navigatePath("login")
        | msg ->
            let newPage, newMsg = ProjectPropose.update msg page
            updatePage (ProjectProposePage newPage), Cmd.map ProjectProposeMsg newMsg    

    | HomeSupervisorMsg msg, HomeSupervisorPage page ->
        match msg with
        | HomeSupervisor.Msg.Logout ->
            { model with user = Anonymous; token = ""}, Cmd.navigatePath("login")
        | msg ->
            let newPage, newMsg = HomeSupervisor.update msg page
            updatePage (HomeSupervisorPage newPage), Cmd.map HomeSupervisorMsg newMsg 

    | ProposalsMsg msg, ProposalsPage page ->
        match msg with
        | Proposals.Msg.Logout ->
            { model with user = Anonymous; token = ""}, Cmd.navigatePath("login")
        | msg ->
            let newPage, newMsg = Proposals.update msg page
            updatePage (ProposalsPage newPage), Cmd.map ProposalsMsg newMsg         

    | AllProjectsMsg msg, AllProjectsPage page ->
        match msg with
        | AllProjects.Msg.Logout ->
            { model with user = Anonymous; token = ""}, Cmd.navigatePath("login")
        | msg ->
            let newPage, newMsg = AllProjects.update msg page
            updatePage (AllProjectsPage newPage), Cmd.map AllProjectsMsg newMsg  

    (*
    | AllPreferencesMsg msg, AllPreferencesPage page ->
        match msg with
        | AllPreferences.Msg.Logout ->
            { model with user = Anonymous; token = ""}, Cmd.navigatePath("login")
        | msg ->
            let newPage, newMsg = AllPreferences.update msg page
            updatePage (AllPreferencesPage newPage), Cmd.map AllPreferencesMsg newMsg  
    *)

    | UrlChanged nextUrl, _ ->
        match nextUrl with
        | LoginUrl -> 
            let newPage, newMsg = Login.init ()
            showPage (LoginPage newPage) LoginUrl, Cmd.map LoginMsg newMsg

        | HomeStudentUrl ->
            match model.user with
            | LoggedIn user when (isStudent user) ->
                let newPage, newMsg = HomeStudent.init model.token
                showPage (HomeStudentPage newPage) HomeStudentUrl, Cmd.map HomeStudentMsg newMsg
            | LoggedIn user -> model, Cmd.navigateBack()
            | Anonymous -> model, Cmd.navigatePath("login", HistoryMode.ReplaceState)

        | ProjectsUrl ->
            match model.user with
            | LoggedIn user when (isStudent user) ->
                let newPage, newMsg = Projects.init model.token
                showPage (ProjectsPage newPage) ProjectsUrl, Cmd.map ProjectsMsg newMsg
            | LoggedIn user -> model, Cmd.navigateBack()
            | Anonymous -> model, Cmd.navigatePath("login", HistoryMode.ReplaceState)

        | PreferencesUrl ->
            match model.user with
            | LoggedIn user when (isStudent user) ->
                let newPage, newMsg = Preferences.init model.token
                showPage (PreferencesPage newPage) ProjectsUrl, Cmd.map PreferencesMsg newMsg
            | LoggedIn user -> model, Cmd.navigateBack()
            | Anonymous -> model, Cmd.navigatePath("login", HistoryMode.ReplaceState)

        | ProjectProposeUrl ->
            match model.user with
            | LoggedIn user ->
                let newPage, newMsg = ProjectPropose.init model.token user
                showPage (ProjectProposePage newPage) ProjectsUrl, Cmd.map ProjectProposeMsg newMsg
            | Anonymous -> model, Cmd.navigatePath("login", HistoryMode.ReplaceState)

        | HomeSupervisorUrl ->
            match model.user with
            | LoggedIn user when not (isStudent user) ->
                let newPage, newMsg = HomeSupervisor.init model.token user
                showPage (HomeSupervisorPage newPage) HomeSupervisorUrl, Cmd.map HomeSupervisorMsg newMsg
            | LoggedIn user -> model, Cmd.navigateBack()
            | Anonymous -> model, Cmd.navigatePath("login", HistoryMode.ReplaceState)

        | ProposalsUrl ->
            match model.user with
            | LoggedIn user when not (isStudent user) ->
                let newPage, newMsg = Proposals.init model.token user
                showPage (ProposalsPage newPage) ProposalsUrl, Cmd.map ProposalsMsg newMsg
            | LoggedIn user -> model, Cmd.navigateBack()
            | Anonymous -> model, Cmd.navigatePath("login", HistoryMode.ReplaceState)

        | AllProjectsUrl ->
            match model.user with
            | LoggedIn user when user.categ = "C" ->
                let newPage, newMsg = AllProjects.init model.token
                showPage (AllProjectsPage newPage) AllProjectsUrl, Cmd.map AllProjectsMsg newMsg
            | LoggedIn user -> model, Cmd.navigateBack()
            | Anonymous -> model, Cmd.navigatePath("login", HistoryMode.ReplaceState)

        (*
        | AllPreferencesUrl ->
            match model.user with
            | LoggedIn user when user.categ = "C" ->
                let newPage, newMsg = AllPreferences.init model.token
                showPage (AllPreferencesPage newPage) AllPreferencesUrl, Cmd.map AllPreferencesMsg newMsg
            | LoggedIn user -> model, Cmd.navigateBack()
            | Anonymous -> model, Cmd.navigatePath("login", HistoryMode.ReplaceState)
        *)

        | NotFoundUrl ->
            showPage NotFoundPage NotFoundUrl, Cmd.none

        | EmptyUrl ->
            model, Cmd.navigatePath("login", HistoryMode.ReplaceState) 

    | _, _ ->
        model, Cmd.none

//--------------------------------------------------------------------------------------//
//              Model View [view : Model -> (Msg -> unit) -> ReactElement]              //
//--------------------------------------------------------------------------------------//

let view (model: Model) (dispatch: Msg -> unit) =
    React.router [
        router.pathMode
        router.onUrlChanged (parseUrl >> UrlChanged >> dispatch)
        router.children [
            match model.currentPage with
            | LoginPage page ->
                Login.view page (Msg.LoginMsg >> dispatch)
            | HomeStudentPage page ->
                HomeStudent.view page (Msg.HomeStudentMsg >> dispatch)
            | ProjectsPage page ->
                Projects.view page (Msg.ProjectsMsg >> dispatch)
            | PreferencesPage page ->
                Preferences.view page (Msg.PreferencesMsg >> dispatch)
            | ProjectProposePage page ->
                ProjectPropose.view page (Msg.ProjectProposeMsg >> dispatch)
            | HomeSupervisorPage page ->
                HomeSupervisor.view page (Msg.HomeSupervisorMsg >> dispatch)
            | ProposalsPage page ->
                Proposals.view page (Msg.ProposalsMsg >> dispatch)
            | AllProjectsPage page ->
                AllProjects.view page (Msg.AllProjectsMsg >> dispatch)
            //| AllPreferencesPage page ->
            //  AllPreferences.view page (Msg.AllPreferencesMsg >> dispatch)
            | NotFoundPage ->
                Html.p "Not Found"
        ]
    ]

Program.mkProgram init update view
|> Program.withReactSynchronous "elmish-app"
|> Program.run