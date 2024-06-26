module ProjectsModals

open Shared
open Common
open ProjectsTypes
open ProjectsHelpers

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
                    match model.preference.doc, (checkProjectInPreference sp model.preference) with
                    | true, _ ->
                        prop.text "You've entered DOC allocation"
                        prop.disabled true
                        Bulma.color.isWarning
                    | _, true ->
                        prop.text "Already in preferences"
                        prop.disabled true
                        Bulma.color.isWarning
                    | _ ->
                        Bulma.color.isSuccess
                        prop.text "Add Project"
                        prop.onClick (fun _ -> dispatch OpenAddProject)
                ]
                Bulma.button.button [
                    prop.text "Close Project"
                    prop.onClick (fun _ -> dispatch CloseModal)
                ]
            ]
        ]
    ]

(*
match applicant.suitability with
| "Definite" -> prop.style [ style.color (hsl (141, 71, 38)) ]
| "Maybe" -> prop.style [ style.color (hsl (45, 100, 45)) ]
| "No" -> prop.style [ style.color (hsl (348, 100, 61)) ]
| _ -> ()
*)

//--------------------------------------------------------------------------------------//
//                              Modal Add Project Content                               //
//--------------------------------------------------------------------------------------//

let PreferenceRow (model: Model) (dispatch: Msg -> unit) ((projectInfo, rank, index): Project * int * int) = 
    Html.tr [
        prop.classes [ "table-row" ]
        prop.onClick (fun _ -> dispatch (IndexAddProject index))
        prop.style [style.cursor.pointer]
        match (model.selectedProjectIndex = index) , projectInfo.pid with
        | true, _ ->
            prop.children [
                Html.td [prop.style [style.color.red]; prop.text rank]
                Html.td [prop.style [style.color.red]; prop.text model.selectedProject.title]
                Html.td [prop.style [style.color.red]; prop.text model.selectedProject.supName]
            ]
        | _, 0 ->
            prop.children [
                Html.td [prop.text rank]
                Html.td []
                Html.td []
            ]
        | _, _ ->
            prop.children [
                Html.td [prop.text rank]
                Html.td [prop.text projectInfo.title]
                Html.td [prop.text projectInfo.supName]
            ]
    ]


let PreferenceTable (model: Model) (dispatch: Msg -> unit) =
    let pref = model.preference
    let prefList = [(pref.p1, pref.n1, 1); (pref.p2, pref.n2, 2); (pref.p3, pref.n3, 3); (pref.p4, pref.n4, 4); (pref.p5, pref.n5, 5);
                    (pref.p6, pref.n6, 6); (pref.p7, pref.n7, 7); (pref.p8, pref.n8, 8); (pref.p9, pref.n9, 9); (pref.p10, pref.n10, 10);]
    Table 95 [
        Html.thead [
            Html.tr [
                Html.th [ prop.title "Rank"; prop.text "Rank"]
                Html.th [ prop.title "Title"; prop.text "Title"]
                Html.th [ prop.title "Professor"; prop.text "Professor"]
            ]
        ]
        Html.tbody (List.map (PreferenceRow model dispatch) prefList)
    ]

let ModalAddProject (model: Model) (dispatch: Msg -> unit) = 
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
                Bulma.content [
                    Html.h3 "Add Project"
                    Html.p "You are about to add the following project to your preferences:"
                    Html.blockquote ("'" + sp.title + "'")
                    Html.p "Below in your preferences, please select a preference rank 
                            of where you would like to replace or place the project."
                    
                    Html.h3 "Your Preferences"
                    PreferenceTable model dispatch
                ]
            ]
        ]
        Bulma.modalCardFoot [
            Bulma.buttons [
                Bulma.button.button [
                    prop.text "Save Changes"
                    match (model.selectedProjectIndex = 0) with
                    | true -> // If true then selectedProject hasen't been preferenced yet, hence can't save changes
                        prop.disabled true
                    | false -> // If false then selectedProject has been preferenced, hence can now save changes
                        prop.onClick (fun _ -> dispatch AddProject)
                        Bulma.color.isSuccess
                ]
                Bulma.button.button [
                    prop.text "Go Back"
                    prop.onClick (fun _ -> dispatch CloseAddProject)
                ]
            ]
        ]
    ]