module AllProjectsTables

open Shared
open Common
open AllProjectsTypes
open AllProjectsHelpers

open Feliz
open Feliz.Bulma

open color

open Zanaptak.TypedCssClasses
type Bulma = CssClasses<"https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css", Naming.PascalCase>

let TableRow (dispatch: Msg -> unit) (model: Model) (projectInfo: Project)  = 
    Html.tr [
        prop.classes [ "table-row" ]
        prop.onClick (fun _ -> dispatch (OpenModal projectInfo))
        prop.style [style.cursor.pointer]
        prop.children [
            Html.td [prop.text projectInfo.title]
            Html.td [prop.text projectInfo.supName]
            match model.topOrBottom5 = "top" with
            | true ->
                Html.td [prop.text projectInfo.r1]
                Html.td [prop.text projectInfo.r2]
                Html.td [prop.text projectInfo.r3]
                Html.td [prop.text projectInfo.r4]
                Html.td [prop.text projectInfo.r5]
            | false ->
                Html.td [prop.text projectInfo.r6]
                Html.td [prop.text projectInfo.r7]
                Html.td [prop.text projectInfo.r8]
                Html.td [prop.text projectInfo.r9]
                Html.td [prop.text projectInfo.r10]
            Html.td (TableCategories model projectInfo.categories)
            Html.td (TableStreams model projectInfo.tstream)
            Html.td [prop.text (projectInfo.updated.ToString "yyyy/MM/dd")]
        ]
    ]

// ---- Projects Table -------------------------------------------------------------------

let ProjectTable (model: Model) (dispatch: Msg -> unit) =
    Table 95 [
        Html.thead [
            Html.tr [
                Html.th [ prop.title "Title"; prop.text "Title"]
                Html.th [ prop.title "Supervisor"; prop.text "Supervisor"]
                match model.topOrBottom5 = "top" with
                | true ->
                    Html.th [ prop.title "P1"; prop.text "P1"]
                    Html.th [ prop.title "P2"; prop.text "P2"]
                    Html.th [ prop.title "P3"; prop.text "P3"]
                    Html.th [ prop.title "P4"; prop.text "P4"]
                    Html.th [ prop.title "P5"; prop.text "P5"]
                | false ->
                    Html.th [ prop.title "P6"; prop.text "P6"]
                    Html.th [ prop.title "P7"; prop.text "P7"]
                    Html.th [ prop.title "P8"; prop.text "P8"]
                    Html.th [ prop.title "P9"; prop.text "P9"]
                    Html.th [ prop.title "P10"; prop.text "P10"]
                Html.th [ prop.title "Related Categories"; prop.text "Related Categories"]
                Html.th [ prop.title "Streams"; prop.text "Streams"]
                Html.th [ prop.title "Last Updated"; prop.text "Last Updated"]
            ]
        ]
        Html.tbody (List.map (TableRow dispatch model) model.projects)
    ]