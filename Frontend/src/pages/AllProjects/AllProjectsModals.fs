module AllProjectsModals

open Shared
open Common
open AllProjectsTypes
open AllProjectsHelpers

open Feliz
open Feliz.Bulma

open color

//--------------------------------------------------------------------------------------//
//                              Modal Project Info Content                              //
//--------------------------------------------------------------------------------------//

let ModalProjectInfoMedia (sp: Project) =
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

let ModalProjectInfoBody (model: Model) (sp: Project) = 
    Bulma.content [
        Bulma.columns [
            Bulma.column [
                prop.classes [ Bulma.Is3]
                prop.children [
                    Html.h3 "Project Rankings"
                    ProjectPopularityTable sp
                ]
            ]

            Bulma.column [ prop.classes [Bulma.Is1] ] // Column Gap

            Bulma.column [
                Html.h3 "Project Categories"
                for c in (TableCategories model sp.categories) do c

                Html.h3 "Streams"
                for c in (TableStreams model sp.tstream) do c

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

let ModalProjectInfo (model: Model) (dispatch: Msg -> unit) = 
    let sp = model.selectedProject

    Bulma.modalCard [
        Bulma.modalCardHead [
            Bulma.modalCardTitle ("#" + sp.pid.ToString() + " " + sp.title)
            Bulma.modalClose [ 
                prop.classes [ Bulma.IsLarge ]
                prop.onClick (fun _ -> dispatch CloseModal)
            ]
        ]
        Bulma.modalCardBody [
            prop.classes [ "scrollbar" ]
            prop.children [ 
                ModalProjectInfoMedia sp
                ModalProjectInfoBody model sp 
            ]

        ]
        Bulma.modalCardFoot [
            Bulma.buttons [
                Bulma.button.button [
                    prop.text "Close Project"
                    prop.onClick (fun _ -> dispatch CloseModal)
                ]
            ]
        ]
    ]
