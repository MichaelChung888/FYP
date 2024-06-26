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

// ---- Selected Project View ------------------------------------------------------------

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
                prop.onChange (fun ev -> dispatch (ChangedSuitability (ev, applicant.eeid)))
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

let Tag (model: Model) (filter: string) =
    Bulma.tag [
        prop.text (getFormattedCategory filter)
        prop.style [style.marginBottom 10; style.marginRight 10]
    ]

let TableCategories (model: Model) (categories: string) =
    (categories.Split ',') |> Array.toList |> List.map (Tag model)

let projectInfoMedia (sp: Project) =
    Bulma.media [
        prop.style [style.marginBottom 40]
        prop.children [
            Bulma.mediaLeft [
                Bulma.image [
                    Bulma.image.is48x48
                    prop.children [
                        Html.img [ prop.src "https://bulma.io/assets/images/placeholders/96x96.png" ]
                    ]
                ]
            ]
        
            Bulma.mediaContent [
                Bulma.title [ prop.classes [ Bulma.Is4 ]; prop.text sp.supName] 
                Bulma.subtitle [ prop.classes [ Bulma.Is6 ]; prop.text "example123@ic.ac.uk"]
            ]
        ]
    ]

let projectInfoBody (model: Model) (sp: Project) = 
    Bulma.content [
        Bulma.columns [
            Bulma.column [
                prop.classes [ Bulma.Is4]
                prop.children [
                    Html.h3 "Project Rankings"
                    Html.ol [
                        prop.style [style.fontWeight 700]
                        prop.children [
                            Html.li [ prop.key "1"; prop.text (sp.r1.ToString()) ]
                            Html.li [ prop.key "2"; prop.text (sp.r2.ToString()) ]
                            Html.li [ prop.key "3"; prop.text (sp.r3.ToString()) ]
                            Html.li [ prop.key "4"; prop.text (sp.r4.ToString()) ]
                            Html.li [ prop.key "5"; prop.text (sp.r5.ToString()) ]
                            Html.li [ prop.key "6"; prop.text (sp.r6.ToString()) ]
                            Html.li [ prop.key "7"; prop.text (sp.r7.ToString()) ]
                            Html.li [ prop.key "8"; prop.text (sp.r8.ToString()) ]
                            Html.li [ prop.key "9"; prop.text (sp.r9.ToString()) ]
                            Html.li [ prop.key "10"; prop.text (sp.r10.ToString()) ]

                        ]
                    ]
                ]
            ]
            Bulma.column [
                Html.h3 "Project Categories"
                for c in (TableCategories model sp.categories) do c
                Html.h3 "Student Requirements"
                Html.p sp.requirements
            ]
        ]

        Html.h3 "Desired Skills"
        Html.p sp.skills

        Html.h3 "Project Description"
        Html.p sp.descr

        Html.h3 "Meeting Dates"
        Html.p sp.meetings 
    ]

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
                        projectInfoBody model sp 
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