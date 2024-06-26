module HomeStudentTables

open Shared
open Common
open HomeStudentTypes

open Feliz
open Feliz.Bulma
open Feliz.Router

open color

// ---- New Projects Table ---------------------------------------------------------------

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
    
let NewTable (model: Model) =
    Table 90 [
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
    Table 90 [
        Html.thead [
            Html.tr [
                Html.th [ prop.title "Rank"; prop.text "Rank"]
                Html.th [ prop.title "Title"; prop.text "Title"]
                Html.th [ prop.title "Professor"; prop.text "Professor"]
            ]
        ]
        Html.tbody (List.map PreferenceRow prefList)
    ]