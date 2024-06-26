module PreferencesModals
open Shared
open Common
open PreferencesTypes
open PreferencesHelpers

open Feliz
open Feliz.Bulma

open color


// ---- Remove Preference Modal -----------------------------------------------------

let removePreferenceModal (model: Model) (dispatch: Msg -> unit) = 
    let sp = model.selectedProject

    Bulma.modalCard [
        Bulma.modalCardHead [
            Bulma.modalCardTitle "Remove Preference"
            Bulma.modalClose [ 
                prop.classes [ Bulma.IsLarge ]
                prop.onClick (fun _ -> dispatch CloseModal)
            ]
        ]
        Bulma.modalCardBody [
            prop.classes [ "scrollbar" ]
            prop.children [
                Bulma.content [
                    Html.h3 "Are you sure you want to remove the following project from your preferences:"
                    Html.blockquote ("'" + sp.title + "'")
                    Html.p "You can always undo your changes by pressing 'Discard Changes' in the bottom left." // "This action is permanent and cannot be undone"
                ]
            ]
        ]
        Bulma.modalCardFoot [
            Bulma.buttons [
                Bulma.button.button [
                    prop.text "Remove Preference"
                    prop.onClick (fun _ -> dispatch RemovePreference)
                    Bulma.color.isDanger 
                ]
                Bulma.button.button [
                    prop.text "Cancel"
                    prop.onClick (fun _ -> dispatch CloseModal)
                ]
            ]
        ]
    ]

// ---- Add Preference Modal -----------------------------------------------------

let addPreferenceModal (model: Model) (dispatch: Msg -> unit) = 
    Bulma.modalCard [
        Bulma.modalCardHead [
            Bulma.modalCardTitle "Go to Projects Page"
            Bulma.modalClose [ 
                prop.classes [ Bulma.IsLarge ]
                prop.onClick (fun _ -> dispatch CloseModal)
            ]
        ]
        Bulma.modalCardBody [
            prop.classes [ "scrollbar" ]
            prop.children [
                Bulma.content [
                    Html.h3 "Do you want to go to the Projects Page to add projects?"
                    Html.p [ prop.style [style.color red]; prop.text "Make sure to save any changes before leaving the page." ]
                ]
            ]
        ]
        Bulma.modalCardFoot [
            Bulma.buttons [
                Bulma.button.button [
                    prop.text "Go to Projects Page"
                    prop.onClick (fun _ -> dispatch AddPreference)
                    Bulma.color.isSuccess
                ]
                Bulma.button.button [
                    prop.text "Cancel"
                    prop.onClick (fun _ -> dispatch CloseModal)
                ]
            ]
        ]
    ]

// ---- Save Changes Modal ---------------------------------------------------------------

let saveChangesModal (model: Model) (dispatch: Msg -> unit) = 
    Bulma.modalCard [
        Bulma.modalCardHead [
            Bulma.modalCardTitle "Save Changes"
            Bulma.modalClose [ 
                prop.classes [ Bulma.IsLarge ]
                prop.onClick (fun _ -> dispatch CloseModal)
            ]
        ]
        Bulma.modalCardBody [
            prop.classes [ "scrollbar" ]
            prop.children [
                Bulma.content [
                    Html.h3 "Would you like to save your preferences?"
                    Html.p [ prop.style [style.color red]; prop.text "Unsaved changes will be lost so save changes before closing?" ]
                ]
            ]
        ]
        Bulma.modalCardFoot [
            Bulma.buttons [
                Bulma.button.button [
                    prop.text "Save Changes"
                    prop.onClick (fun _ -> dispatch SaveChanges)
                    Bulma.color.isSuccess
                ]
                Bulma.button.button [
                    prop.text "Not Yet"
                    prop.onClick (fun _ -> dispatch CloseModal)
                ]
            ]
        ]
    ]