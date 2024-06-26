module ProposalsModals

open Shared
open Common
open ProposalsTypes
open ProposalsEditForm

open Feliz
open Feliz.Bulma
open Feliz.Router

open color

// ---- Remove Proposal Modal -----------------------------------------------------

let DeleteProposalModal (model: Model) (dispatch: Msg -> unit) = 
    let sp = model.selectedProposal.project

    Bulma.modalCard [
        Bulma.modalCardHead [
            Bulma.modalCardTitle "Remove Proposal"
            Bulma.modalClose [ 
                prop.classes [ Bulma.IsLarge ]
                prop.onClick (fun _ -> dispatch CloseModal)
            ]
        ]
        Bulma.modalCardBody [
            prop.classes [ "scrollbar" ]
            prop.children [
                Bulma.content [
                    Html.h3 "Are you sure you want to remove the following proposal:"
                    Html.blockquote ("'" + sp.title + "'")
                    Html.p "You can always undo your changes by pressing 'Discard Changes' in the bottom left." // "This action is permanent and cannot be undone"
                ]
            ]
        ]
        Bulma.modalCardFoot [
            Bulma.buttons [
                Bulma.button.button [
                    prop.text "Remove Preference"
                    prop.onClick (fun _ -> dispatch DeleteProposal)
                    Bulma.color.isDanger 
                ]
                Bulma.button.button [
                    prop.text "Cancel"
                    prop.onClick (fun _ -> dispatch CloseModal)
                ]
            ]
        ]
    ]

// ---- Edit Proposal Modal ---------------------------------------------------------------

let EditProposalModal (model: Model) (dispatch: Msg -> unit) = 
    Bulma.modalCard [
        Bulma.modalCardHead [
            Bulma.modalCardTitle "Edit Project Form"
            Bulma.modalClose [ 
                prop.classes [ Bulma.IsLarge ]
                prop.onClick (fun _ -> dispatch CloseModal)
            ]
        ]
        Bulma.modalCardBody [
            prop.classes [ "scrollbar" ]
            prop.children [
                Bulma.content [
                    Html.form [
                        prop.children [
                            let projectInfo = model.editProject
                            ProjectTitle projectInfo dispatch
                            Categories projectInfo dispatch
                            Streams projectInfo dispatch
                            Requirements projectInfo dispatch
                            Skills projectInfo dispatch
                            Description projectInfo dispatch
                            Meetings projectInfo dispatch
                        ]
                    ]
                ]
            ]
        ]
        Bulma.modalCardFoot [
            Bulma.buttons [
                Bulma.button.button [
                    prop.text "Save Changes"
                    prop.onClick (fun _ -> dispatch EditProposal)
                    Bulma.color.isSuccess
                ]
                Bulma.button.button [
                    prop.text "Cancel"
                    prop.onClick (fun _ -> dispatch CloseModal)
                ]
            ]
        ]
    ]