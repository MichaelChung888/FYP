module App

open Elmish
open Elmish.React
open Feliz
open Feliz.Router

open Shared
open Login
open HomeStudent
open Projects

//--------------------------------------------------------------------------------------//
//                                        Types                                         //
//--------------------------------------------------------------------------------------//

type ApplicationUser =
    | Anonymous
    | LoggedIn of AccountInfo

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
    User : ApplicationUser
    CurrentUrl: Url
    CurrentPage: Page
}

//--------------------------------------------------------------------------------------//
//                  Model Initalise [init : unit -> Model * Cmd<Msg>]                   //
//--------------------------------------------------------------------------------------//

let parseUrl = function
    | [] -> EmptyUrl
    | ["login"] -> LoginUrl
    | ["main-student"] -> HomeStudentUrl
    | ["main-student"; "projects"] -> ProjectsUrl
    | _ -> NotFoundUrl

let init () : Model * Cmd<Msg> = 
    let initialUrl = Router.currentPath() |> parseUrl
    let defaultModel = {
        User = Anonymous
        CurrentUrl = initialUrl
        CurrentPage = NotFoundPage
    }
    
    match initialUrl with
    | LoginUrl ->
        let page, msg = Login.init ()
        { defaultModel with CurrentPage = (LoginPage page) }, Cmd.map LoginMsg msg

    | HomeStudentUrl ->
        defaultModel, Cmd.navigatePath("login", HistoryMode.ReplaceState)

    | ProjectsUrl ->
        defaultModel, Cmd.navigatePath("login", HistoryMode.ReplaceState) 

    | NotFoundUrl ->
        { defaultModel with CurrentPage = NotFoundPage }, Cmd.none

    | EmptyUrl ->
        defaultModel, Cmd.navigatePath("login", HistoryMode.ReplaceState) 

//--------------------------------------------------------------------------------------//
//               Model Update [update : Msg -> Model -> Model * Cmd<Msg>]               //
//--------------------------------------------------------------------------------------//

let update (msg: Msg) (model: Model) : Model * Cmd<Msg> =

    let showPage (page : Page) : Model =
        { model with CurrentPage = page }

    match msg, model.CurrentPage with 
    | LoginMsg msg, LoginPage page ->
        match msg with
        | Success accountInfo ->
            printfn "%A" accountInfo
            { model with User = (LoggedIn accountInfo) }, Cmd.navigatePath("main-student")
        | msg ->
            let newPage, newMsg = Login.update msg page
            showPage (LoginPage newPage), Cmd.map LoginMsg newMsg

    | HomeStudentMsg msg, HomeStudentPage page ->
        let newPage, newMsg = HomeStudent.update msg page
        showPage (HomeStudentPage newPage), Cmd.map HomeStudentMsg newMsg

    | ProjectsMsg msg, ProjectsPage page ->
        let newPage, newMsg = Projects.update msg page
        showPage (ProjectsPage newPage), Cmd.map ProjectsMsg newMsg

    | UrlChanged nextUrl, _ ->
        match nextUrl with
        | LoginUrl -> 
            let newPage, newMsg = Login.init ()
            showPage (LoginPage newPage), Cmd.map LoginMsg newMsg

        | HomeStudentUrl ->
            match model.User with
            | Anonymous -> model, Cmd.navigatePath("login", HistoryMode.ReplaceState)
            | LoggedIn _ ->
                let newPage, newMsg = HomeStudent.init ()
                showPage (HomeStudentPage newPage), Cmd.map HomeStudentMsg newMsg

        | ProjectsUrl ->
            match model.User with
            | Anonymous -> model, Cmd.navigatePath("login", HistoryMode.ReplaceState)
            | LoggedIn _ ->
                let newPage, newMsg = Projects.init ()
                showPage (ProjectsPage newPage), Cmd.map ProjectsMsg newMsg

        | NotFoundUrl ->
            showPage NotFoundPage, Cmd.none

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
            match model.CurrentPage with
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