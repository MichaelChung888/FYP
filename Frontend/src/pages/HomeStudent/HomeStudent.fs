module HomeStudent

open Shared
open Common
open HomeStudentTypes
type Model = HomeStudentTypes.Model
type Msg = HomeStudentTypes.Msg
open HomeStudentNavBar
open HomeStudentTables

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
//                  Model Initalise [init : unit -> Model * Cmd<Msg>]                   //
//--------------------------------------------------------------------------------------//

let init (token: string) : Model * Cmd<Msg> = 
    let defaultModel = { loading = true; projects = []; preference = PreferenceResponse.Default; token = token }
    let initialLoad () = 
        promise {
            let newProjectsUrl = $"{Server}/new-projects"
            let preferenceUrl = $"{Server}/preferences"

            let! projects =  Fetch.get(url=newProjectsUrl, 
                                       decoder=(Decode.list Project.Decoder),
                                       headers=[Authorization $"Bearer {token}"]) //properties=[Credentials RequestCredentials.Include]
            let! preference =  Fetch.get(url=preferenceUrl, 
                                         decoder=(PreferenceResponse.Decoder),
                                         headers=[Authorization $"Bearer {token}"]) 
            return { projects = projects; preference = preference }
            
        }
    defaultModel, Cmd.OfPromise.either initialLoad () SuccessLoad Error

//--------------------------------------------------------------------------------------//
//               Model Update [update : Msg -> Model -> Model * Cmd<Msg>]               //
//--------------------------------------------------------------------------------------//

let update (msg: Msg) (model: Model) : Model * Cmd<Msg> =
    match msg with
    | SuccessLoad initialLoad ->
        { model with projects = initialLoad.projects; preference = initialLoad.preference; loading = false }, Cmd.none
    | Error res ->
        printfn "%A" res
        { model with loading = false }, Cmd.none
    | Logout -> 
        model, Cmd.none


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
            
            BulmaTile [Bulma.IsAncestor] [style.padding (length.px 50); style.height (length.vh 95)] [
                BulmaTile [Bulma.Is8; Bulma.IsParent] [] [
                    BulmaTile [Bulma.Tile; Bulma.IsChild; Bulma.Box] TileCss [
                        Bulma.title [ prop.text "New Projects" ]
                        NewTable model
                    ]
                ]
                BulmaTile [Bulma.IsParent; Bulma.IsVertical] [] [
                    BulmaTile [Bulma.IsChild; Bulma.Box] (List.append TileCss [style.height (length.px 8000)]) [
                        Bulma.title [ prop.text "Preferences" ]
                        PreferenceTable model
                    ]
                ]                    
            ]
        ]
    ]