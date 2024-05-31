module Projects

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
    test: int
}

type Msg =
    | Nothing of int

//--------------------------------------------------------------------------------------//
//                  Model Initalise [init : unit -> Model * Cmd<Msg>]                   //
//--------------------------------------------------------------------------------------//

let init () : Model * Cmd<Msg> = 
    { test = 5 }, Cmd.none

//--------------------------------------------------------------------------------------//
//               Model Update [update : Msg -> Model -> Model * Cmd<Msg>]               //
//--------------------------------------------------------------------------------------//

let update (msg: Msg) (model: Model) =
    match msg with
    | test ->
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

// ---- NavBar ---------------------------------------------------------------------------

let NavBar =
    Bulma.navbar [
        prop.style [style.backgroundColor mediumTurqouise]
        prop.children [
            Bulma.navbarBrand.div [
                prop.onClick (fun e -> Router.navigatePath("main-student"))
                prop.children [ Bulma.navbarItem.a [ Html.img [ prop.src "https://bulma.io/images/bulma-logo-white.png"; prop.height 28; prop.width 112] ] ]
            ]
            Bulma.navbarMenu [
                Bulma.navbarStart.div [
                    Bulma.navbarItem.a [ prop.text "Projects"; prop.onClick (fun e -> Router.navigatePath("main-student", "projects")) ]
                    Bulma.navbarItem.a [ prop.text "Preferences" ]
                    Bulma.navbarItem.a [ prop.text "Jobs" ]
                ]
                Bulma.navbarEnd.div [
                    Bulma.navbarItem.div [
                        Bulma.buttons [
                            Bulma.button.a [ Html.strong "Sign up"]
                            Bulma.button.a [ prop.text "Log In" ]
                        ]
                    ]
                ]
            ]
        ]
    ]  

// ---- Search ---------------------------------------------------------------------------

let ProjectInput = 
    Bulma.field.div [
        prop.children [
            Bulma.label [
                prop.text "Project Title"
            ] 
            Html.div [
                prop.classes [Bulma.Control; Bulma.HasIconsLeft]
                prop.children [
                    Bulma.input.text [
                        prop.required true
                        prop.placeholder "Enter your Query"
                    ]
                    Bulma.icon [
                        Bulma.icon.isSmall
                        Bulma.icon.isLeft
                        prop.children [
                            Html.i [
                                prop.className "fas fa-lock"
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]

let ProfessorInput = 
    Bulma.field.div [
        prop.children [
            Bulma.label [ prop.text "Professor Title" ] 
            Html.div [
                prop.classes [Bulma.Control; Bulma.HasIconsLeft]
                prop.children [
                    Bulma.input.text [
                        prop.required true
                        prop.placeholder "Enter your Query"
                    ]
                    Bulma.icon [
                        Bulma.icon.isSmall
                        Bulma.icon.isLeft
                        prop.children [
                            Html.i [
                                prop.className "fas fa-lock"
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]

// ---- Search ---------------------------------------------------------------------------

let TileCss = 
    [TurquoiseBackgroundRGBA 0.7; style.borderStyle.solid; style.borderColor mediumTurqouise]

let SearchButton = 
    Bulma.button.button [
        Bulma.color.isInfo
        prop.text "Search"
    ]

let BulmaTag (styles: IStyleAttribute list) (text: string) = 
    Bulma.tag [ 
        prop.text text
        prop.style ( List.append [style.marginBottom 10; style.marginRight 10] styles )
    ] 

let BulmaTile (classes: string list) (styles: IStyleAttribute list) (props: ReactElement list) = 
    Bulma.tile [
        prop.classes classes
        prop.style styles
        prop.children props
    ]

let Search = 
    BulmaTile [Bulma.IsAncestor] [] [
        BulmaTile [Bulma.IsParent; Bulma.IsVertical] [] [
            BulmaTile [Bulma.IsChild; Bulma.Box] TileCss [
                ProjectInput
                ProfessorInput
            ]
            BulmaTile [Bulma.IsChild; Bulma.Box] TileCss [
                Bulma.label [ prop.text "Relevant Modules and Skills" ] 
                BulmaTag [] "Communications"
                BulmaTag [] "Information Processing" 
                BulmaTag [] "Control Systems"
                BulmaTag [] "IAC"
                BulmaTag [] "Software Systems" 
                BulmaTag [] "Discrete Maths" 
                BulmaTag [] "Maths"
                BulmaTag [] "Software" 
                BulmaTag [] "Hardware"
            ]
            BulmaTile [Bulma.IsChild; Bulma.Box] TileCss [
                Bulma.label [ prop.text "Degree" ] 
                BulmaTag [] "MEng"
                BulmaTag [] "BEng"
            ]
            BulmaTile [Bulma.IsChild] [] [
                SearchButton
            ]
        ]
    ]


// ---- Table ----------------------------------------------------------------------------
let Table (body: ReactElement list) = 
    Html.div [
        prop.style [style.overflowY.auto; style.height (length.perc 95)]
        prop.children [
            Bulma.table [
                prop.style [style.width (length.perc 100)]
                prop.children body
            ]
        ]
    ]

let ProjectTable =
    Table [
        Html.thead [
            Html.tr [
                Html.th [ prop.title "Title"; prop.text "Title"]
                Html.th [ prop.title "Professor"; prop.text "Professor"]
                Html.th [ prop.title "Tags"; prop.text "Tags"]
                Html.th [ prop.title "Description"; prop.text "Description"]
            ]
        ]
        Html.tbody [
            Html.tr [
                Html.td [prop.text "A framework for the simulation and evaluation of dynamic bus routing"]
                Html.td [prop.text "Cattafi,M."]
                Html.td []
                Html.td [prop.text "«Mobility-on-demand ridesharing services have transformed the transportation landscape by offering commuters the
                                    convenience of point-to-point transportation, while at the same time being more efficient than private vehicles. However, the
                                    benefits these services have to offer are fundamentally limited by their capacities, and are often seen as taxi equivalents.» [1]
                                    In this project we consider «the concept of “dynamic bus routing” (DBR). Like ridesharing services, such buses would not follow
                                    predefined routes nor schedules, but rather constantly generate their routes in real time to most efficiently serve commuters'
                                    travel patterns.» [1]
                                    Attempts along similar lines were also made in London, for example the Citymapper Smartbus [2] which was discontinued for a
                                    variety of reasons [3].
                                    The main deliverable will be a simulation (including visualisation) and evaluation framework. Routing algorithms will also be
                                    implemented and tested.
                                    [1]: Koh et al., Dynamic Bus Routing: A study on the viability of on-demand high-capacity ridesharing as an alternative to fixedroute buses in Singapore
                                    2018 21st International Conference on Intelligent Transportation Systems
                                    https://ieeexplore.ieee.org/document/8569834
                                    [2]: Introducing the Citymapper Smartbus, 2017
                                    https://medium.com/citymapper/smartbus-7b6848241526
                                    [3]: Ending Ride to focus on Pass, 2019
                                    https://medium.com/@Citymapper/ending-ride-to-focus-on-pass-d9ada3021831"]
            ]
            Html.tr [
                Html.td [prop.text "Learning to control a pendulum with data-driven Model Predictive Control "]
                Html.td [prop.text "Angeli,D."]
                Html.td []
                Html.td [prop.text "Pendulums are examples of very non-linear and unstable processes and serve as a toy model of more complicated devices in
                                    real-world applications. The goal of the project is to device a Predictive Control algorithm that gradually adapts and learns the
                                    dynamics of the pendulum (nonlinear and hence 'new' each time a different region in state-space is explored) in order to
                                    balance it in the upwards position, viz. around an unstable equilibrium, or dampen it around the downwards position. This can
                                    be challenging even in the presence of a model due to potential uncertainties and disturbances and we would like to compare
                                    the traditional approach with one where the model is not assumed to be known, while the pendulum is treated as a black-box,
                                    with as little prior information as possible.
                                    Desirable Background: Control Engineering, Model predictive Control, Optimisation, MATLAB"]
            ]
            Html.tr [
                Html.td [prop.text "Learning to control a pendulum with data-driven Model Predictive Control "]
                Html.td [prop.text "Angeli,D."]
                Html.td []
                Html.td [prop.text "Pendulums are examples of very non-linear and unstable processes and serve as a toy model of more complicated devices in
                                    real-world applications. The goal of the project is to device a Predictive Control algorithm that gradually adapts and learns the
                                    dynamics of the pendulum (nonlinear and hence 'new' each time a different region in state-space is explored) in order to
                                    balance it in the upwards position, viz. around an unstable equilibrium, or dampen it around the downwards position. This can
                                    be challenging even in the presence of a model due to potential uncertainties and disturbances and we would like to compare
                                    the traditional approach with one where the model is not assumed to be known, while the pendulum is treated as a black-box,
                                    with as little prior information as possible.
                                    Desirable Background: Control Engineering, Model predictive Control, Optimisation, MATLAB"]
            ]
            Html.tr [
                Html.td [prop.text "Learning to control a pendulum with data-driven Model Predictive Control "]
                Html.td [prop.text "Angeli,D."]
                Html.td []
                Html.td [prop.text "Pendulums are examples of very non-linear and unstable processes and serve as a toy model of more complicated devices in
                                    real-world applications. The goal of the project is to device a Predictive Control algorithm that gradually adapts and learns the
                                    dynamics of the pendulum (nonlinear and hence 'new' each time a different region in state-space is explored) in order to
                                    balance it in the upwards position, viz. around an unstable equilibrium, or dampen it around the downwards position. This can
                                    be challenging even in the presence of a model due to potential uncertainties and disturbances and we would like to compare
                                    the traditional approach with one where the model is not assumed to be known, while the pendulum is treated as a black-box,
                                    with as little prior information as possible.
                                    Desirable Background: Control Engineering, Model predictive Control, Optimisation, MATLAB"]
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

            Bulma.columns [
                prop.style [ style.height (length.vh 100); style.padding (length.perc 1)]
                prop.children [

                    Bulma.column [
                        prop.classes [Bulma.Is3]
                        prop.children [ Search ]
                    ]
                    Bulma.column [
                        BulmaTile [Bulma.IsAncestor] [style.height (length.perc (100))] [
                            BulmaTile [Bulma.IsParent] [] [
                                BulmaTile [Bulma.IsChild; Bulma.Box] TileCss [  
                                        Bulma.label [ prop.text "Projects" ] 
                                        ProjectTable 
                                ]
                            ]
                        ]
                    ]

                ]   
            ]
 
        ]
    ]