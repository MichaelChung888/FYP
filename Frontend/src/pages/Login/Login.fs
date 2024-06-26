module Login

open Shared
open Common

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
    login: LoginRequest
}

type Msg =
    | InputChanged of string
    | Submit of Browser.Types.Event
    | SuccessLogin of Account
    | Error of exn

//--------------------------------------------------------------------------------------//
//                  Model Initalise [init : unit -> Model * Cmd<Msg>]                   //
//--------------------------------------------------------------------------------------//

let init () : Model * Cmd<Msg> = 
    { loading = false; login = { eeid = "" } }, Cmd.none

//--------------------------------------------------------------------------------------//
//               Model Update [update : Msg -> Model -> Model * Cmd<Msg>]               //
//--------------------------------------------------------------------------------------//

let update (msg: Msg) (model: Model) =
    match msg with
    | InputChanged newInput ->
        { model with login = { model.login with eeid = newInput } }, Cmd.none
    | Submit ev ->
        ev.preventDefault ()
        let handleSubmit () = 
            promise {
                let url = $"{Server}/login"
                return! Fetch.post(url=url, 
                                   data=model.login, 
                                   decoder=Account.Decoder, 
                                   properties=[Credentials RequestCredentials.Include])
            }
        { model with loading = true }, Cmd.OfPromise.either handleSubmit () SuccessLogin Error
    | SuccessLogin res ->
        printfn "%A" res
        { model with loading = false }, Cmd.none
    | Error res ->
        printfn "%A" res
        { model with loading = false }, Cmd.none

let Input dispatch =
    Bulma.field.div [
        prop.children [
            Bulma.label [ prop.text "EE ID" ] 
            Html.div [
                prop.classes [Bulma.Control; Bulma.HasIconsLeft]
                prop.children [
                    Bulma.input.text [
                        prop.required true
                        prop.placeholder "Enter your EEID"
                        prop.onTextChange (InputChanged >> dispatch)
                        prop.onKeyUp (key.enter, fun ev -> dispatch (Submit ev))
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

//--------------------------------------------------------------------------------------//
//              Model View [view : Model -> (Msg -> unit) -> ReactElement]              //
//--------------------------------------------------------------------------------------//

let view (model: Model) (dispatch: Msg -> unit) =
    Html.body [
        prop.style [style.height (length.vh 100); style.display.flex; style.alignItems.center; style.justifyContent.center]
        prop.children [
            if model.loading then LoadingScreen
            TurquoiseBackground 0.5
            ImageBackground

            Html.div [
                prop.style [TurquoiseBackgroundRGBA 0.7; style.position.relative; style.borderStyle.solid; style.borderColor mediumTurqouise; style.width (length.px 400); style.height (length.px 550); style.padding (length.px 10); style.display.flex; style.flexDirection.column; style.alignItems.center; style.justifyContent.center; style.borderRadius (length.perc 3)]
                prop.children [
                    Html.section [
                        prop.classes ["title"; "is-2"; Bulma.Field]
                        prop.text "EEFYP" //str "EEFYP Login"
                    ]

                    Html.section [
                        prop.style [style.textAlign.center; style.color gray]
                        prop.classes ["section"; "subtitle"; "is-5"; Bulma.Field]
                        prop.text "Electrical and Electronic final year project selection page"
                    ]

                    Html.form [
                        prop.onSubmit (Submit >> dispatch)
                        prop.style [style.width (length.perc 80)]
                        prop.children [

                            Input dispatch
                            
                            Html.div [
                                prop.style [style.marginTop (length.px 35)]
                                prop.classes [Bulma.Field; Bulma.IsGrouped; Bulma.IsGroupedCentered]
                                prop.children [
                                    Bulma.control.div [
                                        Bulma.button.button [
                                            Bulma.color.isInfo
                                            prop.text "Login"
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