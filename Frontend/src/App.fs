module App

open Elmish
open Elmish.React
open Feliz
open Feliz.Router

open Shared
open Login
open HomeStudent
open Projects
open Preferences
open ProjectPropose

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
    | NotFoundUrl
    | EmptyUrl

type Page = // Pages
    | LoginPage of Login.Model
    | HomeStudentPage of HomeStudent.Model
    | ProjectsPage of Projects.Model
    | PreferencesPage of Preferences.Model
    | ProjectProposePage of ProjectPropose.Model
    | NotFoundPage

type Msg =
    | LoginMsg of Login.Msg
    | HomeStudentMsg of HomeStudent.Msg
    | ProjectsMsg of Projects.Msg
    | PreferencesMsg of Preferences.Msg
    | ProjectProposeMsg of ProjectPropose.Msg
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
            { model with user = (LoggedIn res.person); token = res.token }, Cmd.navigatePath("home-student")
        | msg ->
            let newPage, newMsg = Login.update msg page
            updatePage (LoginPage newPage), Cmd.map LoginMsg newMsg

    | HomeStudentMsg msg, HomeStudentPage page ->
        match msg with
        | HomeStudent.Logout ->
            { model with user = Anonymous; token = ""}, Cmd.navigatePath("login")
        | msg ->
            let newPage, newMsg = HomeStudent.update msg page
            updatePage (HomeStudentPage newPage), Cmd.map HomeStudentMsg newMsg

    | ProjectsMsg msg, ProjectsPage page ->
        match msg with
        | Projects.Logout ->
            { model with user = Anonymous; token = ""}, Cmd.navigatePath("login")
        | msg ->
            let newPage, newMsg = Projects.update msg page
            updatePage (ProjectsPage newPage), Cmd.map ProjectsMsg newMsg

    | PreferencesMsg msg, PreferencesPage page ->
        match msg with
        | Preferences.Logout ->
            { model with user = Anonymous; token = ""}, Cmd.navigatePath("login")
        | msg ->
            let newPage, newMsg = Preferences.update msg page
            updatePage (PreferencesPage newPage), Cmd.map PreferencesMsg newMsg  

    | ProjectProposeMsg msg, ProjectProposePage page ->
        match msg with
        | ProjectPropose.Logout ->
            { model with user = Anonymous; token = ""}, Cmd.navigatePath("login")
        | msg ->
            let newPage, newMsg = ProjectPropose.update msg page
            updatePage (ProjectProposePage newPage), Cmd.map ProjectProposeMsg newMsg            

    | UrlChanged nextUrl, _ ->
        match nextUrl with
        | LoginUrl -> 
            let newPage, newMsg = Login.init ()
            showPage (LoginPage newPage) LoginUrl, Cmd.map LoginMsg newMsg

        | HomeStudentUrl ->
            match model.user with
            | Anonymous -> model, Cmd.navigatePath("login", HistoryMode.ReplaceState)
            | LoggedIn _ ->
                let newPage, newMsg = HomeStudent.init model.token
                showPage (HomeStudentPage newPage) HomeStudentUrl, Cmd.map HomeStudentMsg newMsg

        | ProjectsUrl ->
            match model.user with
            | Anonymous -> model, Cmd.navigatePath("login", HistoryMode.ReplaceState)
            | LoggedIn _ ->
                let newPage, newMsg = Projects.init model.token
                showPage (ProjectsPage newPage) ProjectsUrl, Cmd.map ProjectsMsg newMsg

        | PreferencesUrl ->
            match model.user with
            | Anonymous -> model, Cmd.navigatePath("login", HistoryMode.ReplaceState)
            | LoggedIn _ ->
                let newPage, newMsg = Preferences.init model.token
                showPage (PreferencesPage newPage) ProjectsUrl, Cmd.map PreferencesMsg newMsg

        | ProjectProposeUrl ->
            match model.user with
            | Anonymous -> model, Cmd.navigatePath("login", HistoryMode.ReplaceState)
            | LoggedIn user ->
                let newPage, newMsg = ProjectPropose.init model.token user
                showPage (ProjectProposePage newPage) ProjectsUrl, Cmd.map ProjectProposeMsg newMsg

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
            | NotFoundPage ->
                Html.p "Not Found"
        ]
    ]

Program.mkProgram init update view
|> Program.withReactSynchronous "elmish-app"
|> Program.run