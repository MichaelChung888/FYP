module HomeSupervisorTables

open Shared
open Common
open HomeSupervisorTypes

open Feliz
open Feliz.Bulma
open Feliz.Router

open color

// ---- Proposal Table -----------------------------------------------------------------

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

let ProposalRow (proposal: Proposal) = 
    let project = proposal.project
    let applicants = proposal.applicants
    Html.tr [
        Html.td [prop.text project.title]
        Html.td [prop.text (List.length applicants)]
        Html.td [prop.text project.r1]
        Html.td [prop.text project.r2]
        Html.td [prop.text project.r3]
        Html.td [prop.text project.r4]
        Html.td [prop.text project.r5]
    ]

let ProposalTable (model: Model) =

    Table [
        Html.thead [
            Html.tr [
                Html.th [ prop.title "Title"; prop.text "Title"]
                Html.th [ prop.title "No of Applicants"; prop.text "No of Applicants"]
                Html.th [ prop.title "P1"; prop.text "P1"]
                Html.th [ prop.title "P2"; prop.text "P2"]
                Html.th [ prop.title "P3"; prop.text "P3"]
                Html.th [ prop.title "P4"; prop.text "P4"]
                Html.th [ prop.title "P5"; prop.text "P5"]
            ]
        ]
        Html.tbody (List.map ProposalRow model.proposals)
    ]