module HomeSupervisor

open Shared
open Common
open HomeSupervisorTypes
type Model = HomeSupervisorTypes.Model
type Msg = HomeSupervisorTypes.Msg
open HomeSupervisorNavBar
open HomeSupervisorTables

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
    let defaultModel = { loading = true; proposals = []; token = token }
    let initialLoad () = 
        promise {
            let proposalsUrl = $"{Server}/proposals"

            return! Fetch.post(url=proposalsUrl, 
                                  data=(false),
                                  decoder=(Decode.list Proposal.Decoder),
                                  headers=[Authorization $"Bearer {token}"]) 
        
        }
    defaultModel, Cmd.OfPromise.either initialLoad () SuccessLoad Error

//--------------------------------------------------------------------------------------//
//               Model Update [update : Msg -> Model -> Model * Cmd<Msg>]               //
//--------------------------------------------------------------------------------------//

let update (msg: Msg) (model: Model) : Model * Cmd<Msg> =
    match msg with
    | SuccessLoad proposals ->
        { model with proposals = proposals; loading = false }, Cmd.none
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
                BulmaTile [Bulma.IsHalf; Bulma.IsParent] [] [
                    BulmaTile [Bulma.Tile; Bulma.IsChild; Bulma.Box] TileCss [
                        Bulma.title [ prop.text "New Self Proposals" ]
                    ]
                ]
                BulmaTile [Bulma.IsParent; Bulma.IsVertical] [] [
                    BulmaTile [Bulma.IsChild; Bulma.Box] (TileCss @ [style.height (length.perc 100)]) [
                        Bulma.title [ prop.text "Proposals" ]
                        ProposalTable model
                    ]
                ]                    
            ]
        ]
    ]