module App

open Elmish
open Elmish.React
open Feliz
open Feliz.Router

open Shared
open Login
open HomeStudent
open Projects

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
    | NotFoundUrl
    | EmptyUrl

type Page = // Pages
    | LoginPage of Login.Model
    | HomeStudentPage of HomeStudent.Model
    | ProjectsPage of Projects.Model
    | NotFoundPage

type Msg =
    | LoginMsg of Login.Msg
    | HomeStudentMsg of HomeStudent.Msg
    | ProjectsMsg of Projects.Msg
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
        | Success res ->
            { model with user = (LoggedIn res.person); token = res.token }, Cmd.navigatePath("home-student")
        | msg ->
            let newPage, newMsg = Login.update msg page
            updatePage (LoginPage newPage), Cmd.map LoginMsg newMsg

    | HomeStudentMsg msg, HomeStudentPage page ->
        let newPage, newMsg = HomeStudent.update msg page
        updatePage (HomeStudentPage newPage), Cmd.map HomeStudentMsg newMsg

    | ProjectsMsg msg, ProjectsPage page ->
        let newPage, newMsg = Projects.update msg page
        updatePage (ProjectsPage newPage), Cmd.map ProjectsMsg newMsg

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
            | NotFoundPage ->
                Html.p "Not Found"
        ]
    ]

Program.mkProgram init update view
|> Program.withReactSynchronous "elmish-app"
|> Program.run