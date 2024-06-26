module PreferencesSelectedProject

open Shared
open Common
open PreferencesTypes
open PreferencesHelpers

open Feliz
open Feliz.Bulma

open color

// ---- Selected Project View ------------------------------------------------------------

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
                for c in (TableCategories sp.categories) do c
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
                    projectInfoBody model sp 
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