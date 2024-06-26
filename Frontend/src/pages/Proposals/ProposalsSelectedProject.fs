module ProposalsSelectedProject

open Shared
open Common
open ProposalsTypes
open ProposalsTable

open Feliz
open Feliz.Bulma
open Feliz.Router

open color

// ---- Tabs -----------------------------------------------------------------------------

let Tabs (model: Model) (dispatch: Msg -> Unit) =
    Bulma.tabs [
        prop.children [
            Html.ul [
                Bulma.tab [
                    if model.isProjectInfoTab then prop.classes [ Bulma.IsActive ]
                    prop.onClick (fun _ -> dispatch ProjectInfoTab)
                    prop.children [ Html.a [ prop.text "Project Information"; prop.style [ style.fontWeight.bold ] ] ]
                ]
                Bulma.tab [
                    if not model.isProjectInfoTab then prop.classes [ Bulma.IsActive ]
                    prop.onClick (fun _ -> dispatch SuitabilityTab)
                    prop.children [ Html.a [ prop.text "Suitabilities"; prop.style [ style.fontWeight.bold ] ] ]
                ]
            ]
        ]
    ]

// ---- Suitabilities --------------------------------------------------------------------

let dropdown (model: Model) (dispatch: Msg -> unit) (applicant: Applicant) =
    Html.div [
        prop.classes [ "custom-select"]
        prop.children [
            Html.select [
                prop.value applicant.suitability
                match applicant.suitability with
                | "Definite" -> prop.style [ style.color (hsl (141, 71, 38)) ]
                | "Maybe" -> prop.style [ style.color (hsl (45, 100, 45)) ]
                | "No" -> prop.style [ style.color (hsl (348, 100, 61)) ]
                | _ -> ()
                prop.onChange (fun ev -> dispatch (ChangedSuitability (ev, applicant.eeid, applicant.preference)))
                prop.children [
                    Html.option [ prop.value "Pending"; prop.disabled true; prop.text "-- Pending --" ]
                    Html.option [ prop.value "Definite"; prop.text "Definite" ]
                    Html.option [ prop.value "Maybe"; prop.text "Maybe" ]
                    Html.option [ prop.value "No"; prop.text "No" ]
                ]
            ]
        ]
    ]

let suitabilityRow (model: Model) (dispatch: Msg -> unit) (applicant: Applicant) =
    Html.tr [
        prop.children [
            Html.td [prop.text applicant.eeid]
            Html.td [prop.text applicant.forenames]
            Html.td [prop.text applicant.preference]
            Html.td [ dropdown model dispatch applicant ]
        ]
    ]

let suitabilityTable (model: Model) (dispatch: Msg -> unit) =
    Table model [] [
        Html.thead [
            Html.tr [
                Html.th [ prop.title "EEID"; prop.text "EEID"]
                Html.th [ prop.title "Name"; prop.text "Name" ]
                Html.th [ prop.title "Applicant Ranked this Project"; prop.text "Applicant Ranked this Project" ]
                Html.th [ prop.text "Select their suitability" ]
            ]
        ]
        Html.tbody (List.map (suitabilityRow model dispatch) model.selectedProposal.applicants)
    ] 

// ---- Selected Project Info ------------------------------------------------------------

let selectedProject (model: Model) (dispatch: Msg -> unit) = 
    let sp = model.selectedProposal.project

    Bulma.card [
        prop.style [style.overflowY.auto; style.height (length.perc 81)]
        prop.classes [ "scrollbar" ]
        prop.children [
            match model.isProjectInfoTab with
            | true ->
                Bulma.cardHeader [ Bulma.cardHeaderTitle.p ("#" + sp.pid.ToString() + " " + sp.title) ]
                Bulma.cardContent [
                    prop.children [ 
                        projectInfoMedia sp
                        projectInfoBody sp 
                    ]
                ]
            | false ->
                suitabilityTable model dispatch
        ]
    ]

// ---- Buttons -----------------------------------------------------

let Buttons (model: Model) (dispatch: Msg -> unit) =
    Bulma.box [
        Bulma.button.button [
            Bulma.color.isWarning
            prop.style [ style.marginRight 30 ]
            prop.text "Edit Proposal"
            prop.onClick (fun _ -> dispatch ConfirmEditProposal)
        ]
        Bulma.button.button [
            Bulma.color.isDanger
            prop.style [ style.marginRight 30 ]
            prop.text "Remove Proposal"
            prop.onClick (fun _ -> dispatch ConfirmDeleteProposal)
        ]
        Bulma.button.button [
            prop.text "Close Project"
            prop.onClick (fun _ -> dispatch CloseProposal)
        ]
    ]