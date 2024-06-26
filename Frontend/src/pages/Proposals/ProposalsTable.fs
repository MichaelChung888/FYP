module ProposalsTable

open Shared
open Common
open ProposalsTypes

open Feliz
open Feliz.Bulma
open Feliz.Router

open color

let Table (model: Model) (css: IStyleAttribute list) (body: ReactElement list) = 
    Html.div [
        prop.style ([style.overflowY.auto; style.marginBottom (length.perc 4)] @ css)
        prop.classes [ "scrollbar" ]
        prop.children [
            Bulma.table [
                prop.style [style.width (length.perc 100); style.position.relative]
                prop.children body
            ]
        ]
    ]

let ProposalRow (model: Model) (dispatch: Msg -> unit) (proposal: Proposal) = 
    let applicants = proposal.applicants
    let project = proposal.project

    let isSelected = (model.selectedProposal.project.pid = project.pid) // This project is selected to be viewed
    let popularityList = [project.r1; project.r2; project.r3; project.r4; project.r5; 
                          project.r6; project.r7; project.r8; project.r9; project.r10]
    let popularity (amount: int) = Html.td [prop.text amount]

    Html.tr [
        prop.classes [ "table-row" ]
        prop.style [style.cursor.pointer; if isSelected then style.backgroundColor lightGray]
        prop.onClick (fun _ -> dispatch (OpenProposal proposal))
        prop.children [
            Html.td [prop.text project.title]
            Html.td [prop.text (List.length applicants)]
            for p in popularityList do 
                popularity p
        ]
    ]

let ProposalTable (model: Model) (dispatch: Msg -> unit) =

    Table model [ style.height (length.perc 95) ] [
        Html.thead [
            Html.tr [
                Html.th [ prop.title "Title"; prop.text "Title"]
                Html.th [ prop.title "No of Applicants"; prop.text "No of Applicants" ]
                Html.th [ prop.title "P1"; prop.text "P1"]
                Html.th [ prop.title "P2"; prop.text "P2"]
                Html.th [ prop.title "P3"; prop.text "P3"]
                Html.th [ prop.title "P4"; prop.text "P4"]
                Html.th [ prop.title "P5"; prop.text "P5"]
                Html.th [ prop.title "P6"; prop.text "P6"]
                Html.th [ prop.title "P7"; prop.text "P7"]
                Html.th [ prop.title "P8"; prop.text "P8"]
                Html.th [ prop.title "P9"; prop.text "P9"]
                Html.th [ prop.title "P10"; prop.text "P10"]
            ]
        ]
        Html.tbody (List.map (ProposalRow model dispatch) model.proposals)
    ]