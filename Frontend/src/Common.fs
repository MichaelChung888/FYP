module Common

open Shared

open Feliz
open Feliz.Bulma

open color

open Zanaptak.TypedCssClasses
type Bulma = CssClasses<"https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css", Naming.PascalCase>

//--------------------------------------------------------------------------------------//
//                                    Loading Screen                                    //
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

//--------------------------------------------------------------------------------------//
//                             Turquoise Tinted Background                              //
//--------------------------------------------------------------------------------------//

let TurquoiseBackground opacity =
    Html.div [
        prop.style [style.top 0; style.left 0; style.overflow.hidden; style.position.absolute; style.height (length.perc 100); style.width (length.perc 100); style.opacity opacity; style.zIndex -1; style.backgroundColor turqouise]
    ]

let TurquoiseBackgroundRGBA opacity =
    style.backgroundColor (rgba (175, 238, 238, opacity))

//--------------------------------------------------------------------------------------//
//                                   Image Background                                   //
//--------------------------------------------------------------------------------------//

let ImageBackground = 
    Html.img [
        prop.style [style.position.absolute; style.height (length.perc 100); style.width (length.perc 100); style.zIndex -2; style.overflow.hidden] // style.objectFit.cover;
        prop.src "/images/imperial.jpg"
    ]

//--------------------------------------------------------------------------------------//
//                                       Tiles UI                                       //
//--------------------------------------------------------------------------------------//

let BulmaTile (classes: string list) (styles: IStyleAttribute list) (props: ReactElement list) = 
    Bulma.tile [
        prop.classes classes
        prop.style styles
        prop.children props
    ]

let TileCss = 
    [ TurquoiseBackgroundRGBA 0.7; style.borderStyle.solid; style.borderColor mediumTurqouise ]

//--------------------------------------------------------------------------------------//
//                          Filter Tag Categories and Streams                           //
//--------------------------------------------------------------------------------------//

type FilterType = 
    | Category
    | Stream

let categories = ["embedded_systems"; "control_engineering"; "electronics"; "renewable_energy"; 
"biomedical_engineering"; "system_optimisation_and_modelling"; "high_performance_computing"; 
"computer_vision"; "digital_signal_processing"; "instrumentation_and_measurement"; "cybersecurity"; 
"robotics"; "signal_processing"; "power_systems"; "machine_learning"; "photonics"; "other"; "discrete_maths"; 
"mathematics_signals_and_systems"; "software_systems"; "communications"; "control_systems"; "information_processing"; 
"instruction_architectures_and_compilers"; "circuit_and_systems"; "power_electronics_and_power_systems"; "electromagnetism"]

let streams = ["3E"; "3I"; "4T"; "4D"; "4J"]

let getFormattedCategory = function
    | "embedded_systems" -> "Embedded Systems"
    | "control_engineering" -> "Control Engineering"
    | "electronics" -> "Electronics"
    | "renewable_energy" -> "Renewable Energy"
    | "biomedical_engineering" -> "Biomedical Engineering"
    | "system_optimisation_and_modelling" -> "System Optimisation and Modelling"
    | "high_performance_computing" -> "High Performance Computing"
    | "computer_vision" -> "Computer Vision"
    | "digital_signal_processing" -> "Digital Signal Processing"
    | "instrumentation_and_measurement" -> "Instrumentation and Measurement"
    | "cybersecurity" -> "Cybersecurity"
    | "robotics" -> "Robotics"
    | "signal_processing" -> "Signal Processing"
    | "power_systems" -> "Power Systems"
    | "machine_learning" -> "Machine Learning"
    | "photonics" -> "Photonics"
    | "other" -> "Other"
    | "discrete_maths" -> "Discrete Maths"
    | "mathematics_signals_and_systems" -> "Mathematics, Signals and Systems"
    | "software_systems" -> "Software Systems"
    | "communications" -> "Communications"
    | "control_systems" -> "Control Systems"
    | "information_processing" -> "Information Processing"
    | "instruction_architectures_and_compilers" -> "Instruction Architectures and Compilers"
    | "circuit_and_systems" -> "Circuit and Systems"
    | "power_electronics_and_power_systems" -> "Power Electronics and Power Systems"
    | "electromagnetism" -> "Electromagnetism"
    | "3E" -> "EE BEng"
    | "3I" -> "EIE BEng"
    | "4T" -> "EE MEng Tech"
    | "4D" -> "EE MEng Mangement"
    | "4J" -> "EIE MEng"
    | _ -> "Unknown Category"

let splitStreams (streams: string) : List<string> =
    streams
    |> Seq.chunkBySize 2
    |> Seq.map (fun chunk -> new string(chunk))
    |> Seq.toList

let Tag (filter: string) =
    Bulma.tag [
        prop.text (getFormattedCategory filter)
        prop.style [style.marginBottom 10; style.marginRight 10]
    ]

let TableCategories (categories: string) =
    (categories.Split ',') |> Array.toList |> List.map Tag

let TableStreams (streams: string) =
    (splitStreams streams) |> List.map Tag

//--------------------------------------------------------------------------------------//
//                                  Table UI Component                                  //
//--------------------------------------------------------------------------------------//

let Table (body: ReactElement list) = 
    Html.div [
        prop.style [style.overflowY.auto; style.height (length.perc 95); style.overflowX.hidden]
        prop.classes [ "scrollbar" ]
        prop.children [
            Bulma.table [
                prop.style [style.width (length.perc 100)]
                prop.children body
            ]
        ]
    ]

//--------------------------------------------------------------------------------------//
//                           Checks if Student or Supervisor                            //
//--------------------------------------------------------------------------------------//

let isStudent (user: Person) =
    match user.categ with
    | "U" | "M" -> true // Student
    | _ -> false // Supervisor