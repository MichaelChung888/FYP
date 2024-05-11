module App

open Elmish
open Elmish.React
open Feliz
open Feliz.Router

open Shared
open Login
open MainStudent
open Projects

//--------------------------------------------------------------------------------------//
//                                        Types                                         //
//--------------------------------------------------------------------------------------//

type ApplicationUser =
    | Anonymous
    | LoggedIn of AccountInfo

type Url =
    | LoginUrl
    | MainStudentUrl
    | ProjectsUrl
    | NotFound
    | EmptyUrl

type SubModel = // Pages
    | LoginModel of Login.Model
    | MainStudentModel of MainStudent.Model
    | ProjectsModel of Projects.Model
    | NotFound

type Msg =
    | LoginMsg of Login.Msg
    | MainStudentMsg of MainStudent.Msg
    | ProjectsMsg of Projects.Msg
    | UrlChanged of Url

type Model = {
    User : ApplicationUser
    CurrentUrl: Url
    CurrentModel: SubModel
}

//--------------------------------------------------------------------------------------//
//                                   Helper Functions                                   //
//--------------------------------------------------------------------------------------//

let test model ((subModel, msg) : SubModel * Cmd<Msg>) : Model * Cmd<Msg> =
    { model with CurrentModel = subModel }, msg

//--------------------------------------------------------------------------------------//
//                  Model Initalise [init : unit -> Model * Cmd<Msg>]                   //
//--------------------------------------------------------------------------------------//

let parseUrl = function
    | [] -> Url.EmptyUrl
    | ["login"] -> Url.LoginUrl
    | ["main-student"] -> Url.MainStudentUrl
    | ["main-student"; "projects"] -> Url.ProjectsUrl
    | _ -> Url.NotFound

let init () : Model * Cmd<Msg> = 
    let initialUrl = Router.currentPath() |> parseUrl
    let defaultModel = {
        User = Anonymous
        CurrentUrl = initialUrl
        CurrentModel = SubModel.NotFound
    }
    
    match initialUrl with
    | Url.LoginUrl ->
        let loginModel, loginMsg = Login.init ()
        { defaultModel with CurrentModel = (SubModel.LoginModel loginModel) }, loginMsg |> Cmd.map Msg.LoginMsg

    | Url.MainStudentUrl ->
        defaultModel, Cmd.navigatePath("login", HistoryMode.ReplaceState)

    | Url.ProjectsUrl ->
        defaultModel, Cmd.navigatePath("login", HistoryMode.ReplaceState) 

    | Url.NotFound ->
        { defaultModel with CurrentModel = SubModel.NotFound }, Cmd.none

    | Url.EmptyUrl ->
        defaultModel, Cmd.navigatePath("login", HistoryMode.ReplaceState) 

//--------------------------------------------------------------------------------------//
//               Model Update [update : Msg -> Model -> Model * Cmd<Msg>]               //
//--------------------------------------------------------------------------------------//

let update (msg: Msg) (model: Model) : Model * Cmd<Msg> =
    match msg, model.CurrentModel with 
    | Msg.LoginMsg loginMsg, SubModel.LoginModel loginModel ->
        match loginMsg with
        | Login.Msg.Success accountInfo ->
            printfn "%A" accountInfo
            { model with User = (LoggedIn accountInfo) }, Cmd.navigatePath("main-student")
        | loginMsg ->
            let newLoginModel, newLoginMsg = Login.update loginMsg loginModel
            { model with CurrentModel = SubModel.LoginModel newLoginModel }, newLoginMsg |> Cmd.map Msg.LoginMsg

    | Msg.MainStudentMsg mainStudentMsg, SubModel.MainStudentModel mainStudentModel ->
        let newMainStudentModel, newMainStudentMsg = MainStudent.update mainStudentMsg mainStudentModel
        { model with CurrentModel = SubModel.MainStudentModel newMainStudentModel}, newMainStudentMsg |> Cmd.map Msg.MainStudentMsg

    | Msg.ProjectsMsg projectsMsg, SubModel.ProjectsModel projectsModel ->
        let newProjectsModel, newProjectsMsg = Projects.update projectsMsg projectsModel
        { model with CurrentModel = SubModel.ProjectsModel newProjectsModel }, newProjectsMsg |> Cmd.map Msg.ProjectsMsg

    | UrlChanged nextUrl, _ ->
        match nextUrl with
        | Url.LoginUrl -> 
            let loginModel, loginMsg = Login.init ()
            { model with CurrentModel = (SubModel.LoginModel loginModel) }, loginMsg |> Cmd.map Msg.LoginMsg

        | Url.MainStudentUrl ->
            match model.User with
            | Anonymous -> model, Cmd.navigatePath("login", HistoryMode.ReplaceState)
            | LoggedIn _ ->
                let mainStudentModel, mainStudentMsg = MainStudent.init ()
                { model with CurrentModel = (SubModel.MainStudentModel mainStudentModel) }, mainStudentMsg |> Cmd.map Msg.MainStudentMsg

        | Url.ProjectsUrl ->
            match model.User with
            | Anonymous -> model, Cmd.navigatePath("login", HistoryMode.ReplaceState)
            | LoggedIn _ ->
                let projectsModel, projectsMsg = Projects.init ()
                { model with CurrentModel = (SubModel.ProjectsModel projectsModel) }, projectsMsg |> Cmd.map Msg.ProjectsMsg

        | Url.NotFound ->
            { model with CurrentModel = SubModel.NotFound }, Cmd.none

        | Url.EmptyUrl ->
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
            match model.CurrentModel with
            | SubModel.LoginModel loginModel ->
                Login.view loginModel (Msg.LoginMsg >> dispatch)
            | SubModel.MainStudentModel mainStudentModel ->
                MainStudent.view mainStudentModel (Msg.MainStudentMsg >> dispatch)
            | SubModel.ProjectsModel projectsModel ->
                Projects.view projectsModel (Msg.ProjectsMsg >> dispatch)
            | SubModel.NotFound ->
                Html.p "Not Found"
        ]
    ]

Program.mkProgram init update view
|> Program.withReactSynchronous "elmish-app"
|> Program.run