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
    loading: bool
    projects: List<Project>
    preference: PreferenceResponse
    token: string
}

type InitalLoad = {
    projects: List<Project>
    preference: PreferenceResponse
}

type Msg =
    | SuccessLoad of InitalLoad
    | Error of exn
    | Logout

//--------------------------------------------------------------------------------------//
//                  Model Initalise [init : unit -> Model * Cmd<Msg>]                   //
//--------------------------------------------------------------------------------------//

let init (token: string) : Model * Cmd<Msg> = 
    let defaultModel = { loading = true; projects = []; preference = PreferenceResponse.Default; token = token }
    let initialLoad () = 
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
//                                 Render Subcomponents                                 //
//--------------------------------------------------------------------------------------//

let LoadingScreen =
    Html.div [
        prop.style [style.top 0; style.left 0; style.overflow.hidden; style.position.absolute; 
                    style.height (length.vh 100); style.width (length.vw 100); style.display.flex
                    style.zIndex 100; style.backgroundColor (rgba (0, 0, 0, 0.6))
                    style.justifyContent.center; style.alignItems.center]
        prop.children [
            Html.div [ prop.classes [ "loader" ] ]
        ]
    ]

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

let NavBar (dispatch: Msg -> unit) =
    Bulma.navbar [
        prop.style [style.backgroundColor mediumTurqouise; style.fontWeight 700]
        prop.children [
            Bulma.navbarBrand.div [
                prop.onClick (fun e -> Router.navigatePath("home-student"))
                prop.style [style.paddingTop 3; style.paddingRight 20; style.paddingLeft 10; style.cursor.pointer]
                prop.children [ 
                    Bulma.icon [
                        Bulma.icon.isLarge
                        prop.children [ Html.i [ prop.className "fas fa-home fa-2x"] ]
                    ]
                ] 
            ]
            Bulma.navbarMenu [
                Bulma.navbarStart.div [
                    Bulma.navbarItem.a [ prop.text "Projects"; prop.onClick (fun e -> Router.navigatePath("home-student", "projects")) ]
                    Bulma.navbarItem.a [ prop.text "Preferences"; prop.onClick (fun e -> Router.navigatePath("home-student", "preferences")) ]
                    Bulma.navbarItem.a [ prop.text "Propose a Project"; prop.onClick (fun e -> Router.navigatePath("project-propose")) ]
                ]
                Bulma.navbarEnd.div [
                    Bulma.navbarItem.div [
                        Bulma.buttons [
                            Bulma.button.a [ prop.text "Log Out"; prop.onClick (fun _ -> dispatch Logout) ]
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
            Html.td [prop.text projectInfo.supName]
            Html.td [prop.text projectInfo.r1]
            Html.td [prop.text projectInfo.r2]
            Html.td [prop.text projectInfo.r3]
            Html.td [prop.text projectInfo.r4]
            Html.td [prop.text projectInfo.r5]
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
    | 0 ->
        Html.tr [
            Html.td [prop.text rank]
            Html.td []
            Html.td []
        ]
    | _ ->
        Html.tr [
            Html.td [prop.text rank]
            Html.td [prop.text projectInfo.title]
            Html.td [prop.text projectInfo.supName]
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
            if model.loading then LoadingScreen
            TurquoiseBackground 0.5
            ImageBackground
            NavBar dispatch
            Tiles model
        ]
    ]