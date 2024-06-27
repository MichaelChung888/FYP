module AllProjects

open Shared
open Common
open AllProjectsTypes
type Model = AllProjectsTypes.Model
type Msg = AllProjectsTypes.Msg
open AllProjectsHelpers
open AllProjectsNavBar
open AllProjectsTables
open AllProjectsSearch
open AllProjectsModals

open Thoth.Json
open Thoth.Fetch
open Fetch

open Elmish

open Feliz
open Feliz.Bulma

open color

open Fable.Core.JsInterop

open Zanaptak.TypedCssClasses
type Bulma = CssClasses<"https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css", Naming.PascalCase>

//--------------------------------------------------------------------------------------//
//                  Model Initalise [init : unit -> Model * Cmd<Msg>]                   //
//--------------------------------------------------------------------------------------//

let init (token: string) : Model * Cmd<Msg> = 
    let defaultModel = { loading = true;
                         projects = []; 
                         preference = PreferenceResponse.Default;
                         token = token; 
                         modalState = false; 
                         searchTitle = "";
                         searchUser = "";
                         selectedProject = Project.Default;
                         selectedProjectIndex = 0;
                         topOrBottom5 = "top" }
    let initialLoad () =
        promise {
            let projectsUrl = $"{Server}/all-projects"
            //let preferenceUrl = $"{Server}/preferences"
            
            return! Fetch.get(url=projectsUrl, 
                              decoder=(Decode.list Project.Decoder),
                              headers=[Authorization $"Bearer {token}"]) //properties=[Credentials RequestCredentials.Include]

            //let! preference =  Fetch.get(url=preferenceUrl, 
            //                             decoder=(PreferenceResponse.Decoder),
            //                             headers=[Authorization $"Bearer {token}"]) 
        }
    defaultModel, Cmd.OfPromise.either initialLoad () SuccessLoad ErrorLoad

//--------------------------------------------------------------------------------------//
//               Model Update [update : Msg -> Model -> Model * Cmd<Msg>]               //
//--------------------------------------------------------------------------------------//

let update (msg: Msg) (model: Model) : Model * Cmd<Msg> =
    match msg with
    | SuccessLoad projects->
        { model with projects = projects; loading = false }, Cmd.none
    | ErrorLoad res ->
        printfn "%A" res
        { model with loading = false }, Cmd.none
    | Logout -> 
        model, Cmd.none
    | OpenModal project ->
        { model with modalState = true; selectedProject = project }, Cmd.none
    | CloseModal ->
        { model with modalState = false; selectedProjectIndex = 0 }, Cmd.none
    | SearchTitleChanged title ->
        { model with searchTitle = title }, Cmd.ofMsg SearchRequest
    | SearchUserChanged title ->
        { model with searchUser = title }, Cmd.ofMsg SearchRequest
    | SearchRequest ->
        let data = {
            title = model.searchTitle;
            professor = model.searchUser;
            categories = [];
            streams = []
        }
        let searchRequest () = 
            promise {
                let url = $"{Server}/search-projects"
                return! Fetch.post(url=url, 
                                  data=data,
                                  decoder=(Decode.list Project.Decoder),
                                  headers=[Authorization $"Bearer {model.token}"]) //properties=[Credentials RequestCredentials.Include]
            }
        model, Cmd.OfPromise.either searchRequest () SuccessLoad ErrorLoad

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
                            ModalProjectInfo model dispatch
                        ]
                    ]
                ]   
            ]
 
        ]
    ]
