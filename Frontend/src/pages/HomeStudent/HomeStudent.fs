module HomeStudent

open Shared

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
    projects: List<Project>
    preference: PreferenceResponse
    token: string
}

type InitalLoad = {
    projects: List<Project>
    preference: PreferenceResponse
}

type Msg =
    | SuccessfulLoad of InitalLoad
    | ErrorLoad of exn

//--------------------------------------------------------------------------------------//
//                  Model Initalise [init : unit -> Model * Cmd<Msg>]                   //
//--------------------------------------------------------------------------------------//

let init token : Model * Cmd<Msg> = 
    let defaultModel = { projects = []; preference = PreferenceResponse.Default; token = token }
    let initialLoad() = 
        promise {
            let newProjectsUrl = "http://localhost:1234/new-projects"
            let preferenceUrl = "http://localhost:1234/preferences"

            let! projects =  Fetch.get(url=newProjectsUrl, 
                                       decoder=(Decode.list Project.Decoder),
                                       headers=[Authorization $"Bearer {token}"]) //properties=[Credentials RequestCredentials.Include]
            let! preference =  Fetch.get(url=preferenceUrl, 
                                         decoder=(PreferenceResponse.Decoder),
                                         headers=[Authorization $"Bearer {token}"]) 
            return { projects = projects; preference = preference }
            
        }
    defaultModel, Cmd.OfPromise.either initialLoad () SuccessfulLoad ErrorLoad

//--------------------------------------------------------------------------------------//
//               Model Update [update : Msg -> Model -> Model * Cmd<Msg>]               //
//--------------------------------------------------------------------------------------//

let update (msg: Msg) (model: Model) : Model * Cmd<Msg> =
    match msg with
    | SuccessfulLoad initialLoad ->
        { model with projects = initialLoad.projects; preference = initialLoad.preference }, Cmd.none
    | ErrorLoad res ->
        printfn "%A" res
        model, Cmd.none

//--------------------------------------------------------------------------------------//
//                                 Render Subcomponents                                 //
//--------------------------------------------------------------------------------------//

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

// ---- Navigation Bar -------------------------------------------------------------------

let NavBar =
    Bulma.navbar [
        prop.style [style.backgroundColor mediumTurqouise; style.fontWeight 700]
        prop.children [
            Bulma.navbarBrand.div [
                prop.onClick (fun e -> Router.navigatePath("home-student"))
                prop.children [ Bulma.navbarItem.a [ Html.img [ prop.src "https://bulma.io/images/bulma-logo-white.png"; prop.height 28; prop.width 112] ] ]
            ]
            Bulma.navbarMenu [
                Bulma.navbarStart.div [
                    Bulma.navbarItem.a [ prop.text "Projects"; prop.onClick (fun e -> Router.navigatePath("home-student", "projects")) ]
                    Bulma.navbarItem.a [ prop.text "Preferences" ]
                    Bulma.navbarItem.a [ prop.text "Propose a Project" ]
                ]
                Bulma.navbarEnd.div [
                    Bulma.navbarItem.div [
                        Bulma.buttons [
                            Bulma.button.a [ prop.text "Log Out" ]
                        ]
                    ]
                ]
            ]
        ]
    ]  

// ---- Table ----------------------------------------------------------------------------

let Tag (filter: string) =
    Bulma.tag [
        prop.text (getFormattedCategory filter)
        prop.style [style.marginBottom 10; style.marginRight 10]
    ]

let TableCategories (categories: string) =
    (categories.Split ',') |> Array.toList |> List.map Tag

let ProjectRow (projectInfo: Project) = 
    Html.tr [
            Html.td [prop.text projectInfo.title]
            Html.td []
            Html.td [prop.text projectInfo.p1]
            Html.td [prop.text projectInfo.p2]
            Html.td [prop.text projectInfo.p3]
            Html.td [prop.text projectInfo.p4]
            Html.td [prop.text projectInfo.p5]
            Html.td (TableCategories projectInfo.categories)
            Html.td [prop.text (projectInfo.updated.ToString "yyyy/MM/dd")]
    ]

let Table (body: ReactElement list) = 
    Html.div [
        prop.style [style.overflowY.auto; style.height (length.perc 90)]
        prop.classes [ "scrollbar" ]
        prop.children [
            Bulma.table [
                prop.style [style.width (length.perc 100)]
                prop.children body
            ]
        ]
    ]

// ---- New Projects Table ---------------------------------------------------------------

let NewTable (model: Model) =
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
                Html.th [ prop.title "Related Categories"; prop.text "Related Categories"]
                Html.th [ prop.title "Last Updated"; prop.text "Last Updated"]
            ]
        ]
        Html.tbody (List.map ProjectRow model.projects)
    ]

// ---- Preference Table -----------------------------------------------------------------

let PreferenceRow ((projectInfo, rank): Project * int) = 
    match projectInfo.pid with
    | "-" ->
        Html.tr [
            Html.td [prop.text rank]
            Html.td []
            Html.td []
        ]
    | _ ->
        Html.tr [
            Html.td [prop.text rank]
            Html.td [prop.text projectInfo.title]
            Html.td []
        ]

let PreferenceTable (model: Model) =
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
        Html.tbody (List.map PreferenceRow prefList)
    ]

// ---- Media ----------------------------------------------------------------------------

let Media =
    Bulma.media [
        prop.style []
        prop.children [
            Bulma.mediaLeft [
                Bulma.image [
                    Bulma.image.is64x64
                    prop.children [
                        Html.img [
                            prop.src "https://bulma.io/assets/images/placeholders/128x128.png"
                        ]
                    ]
                ]
            ]
            Bulma.mediaContent [
                Bulma.content [
                    Html.p [
                        Html.strong "John Smith"
                        Html.small "@johnsmith"
                        Html.br []
                        Html.span "Lorem ipsum ... vestibulum ut."
                    ]
                ]
                Bulma.level [
                    Bulma.levelLeft [
                        Bulma.levelItem [
                            Bulma.icon [
                                Bulma.icon.isSmall
                                prop.children [
                                    Html.i [ prop.className "fas fa-reply" ]
                                ]
                            ]
                        ]
                        Bulma.levelItem [
                            Bulma.icon [
                                Bulma.icon.isSmall
                                prop.children [
                                    Html.i [ prop.className "fas fa-retweet" ]
                                ]
                            ]
                        ]
                        Bulma.levelItem [
                            Bulma.icon [
                                Bulma.icon.isSmall
                                prop.children [
                                    Html.i [ prop.className "fas fa-heart" ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]

// ---- Tiles ----------------------------------------------------------------------------

let BulmaTile (classes: string list) (styles: IStyleAttribute list) (props: ReactElement list) = 
    Bulma.tile [
        prop.classes classes
        prop.style styles
        prop.children props
    ]

let Div (classes: string list) (styles: IStyleAttribute list) (props: ReactElement list) = 
    Html.div [
        prop.classes classes
        prop.style styles
        prop.children props
    ]

let TileCss = 
    [TurquoiseBackgroundRGBA 0.7; style.borderStyle.solid; style.borderColor mediumTurqouise; style.overflow.hidden]

let Tiles (model: Model) = 
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

//--------------------------------------------------------------------------------------//
//              Model View [view : Model -> (Msg -> unit) -> ReactElement]              //
//--------------------------------------------------------------------------------------//

let view (model: Model) (dispatch: Msg -> unit) =
    Html.body [
        prop.style [style.height (length.vh 100); style.position.relative]
        prop.children [
            TurquoiseBackground 0.5
            ImageBackground
            NavBar
            Tiles model
        ]
    ]