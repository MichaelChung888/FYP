module PreferencesSelectedProject

open Shared
open Common
open PreferencesTypes
open PreferencesHelpers

open Feliz
open Feliz.Bulma

open color

let selectedProject (model: Model) = 
    let sp = model.selectedProject

    Bulma.card [
        prop.style [style.overflowY.auto; style.height (length.perc 89.5)]
        prop.classes [ "scrollbar" ]
        prop.children [
            Bulma.cardHeader [ Bulma.cardHeaderTitle.p ("#" + sp.pid.ToString() + " " + sp.title) ]
            Bulma.cardContent [
                prop.children [ 
                    projectInfoMedia sp
                    projectInfoBody sp 
                ]

            ]
        ]
    ]

// ---- Remove Projects Buttons -----------------------------------------------------

let removeProjectButtons (model: Model) (dispatch: Msg -> unit) =
    Bulma.box [
        Bulma.button.button [
            Bulma.color.isDanger
            prop.style [ style.marginRight 30 ]
            prop.text "Remove Preference"
            prop.onClick (fun _ -> dispatch ConfirmRemoveProject)
        ]
        Bulma.button.button [
            prop.text "Close Project"
            prop.onClick (fun _ -> dispatch CloseProject)
        ]
    ]