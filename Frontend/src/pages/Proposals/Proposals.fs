module Preferences

open Shared

open System

open Thoth.Json
open Thoth.Fetch
open Fetch

open Elmish

open Feliz
open Feliz.Bulma
open Feliz.Router

open color

open Zanaptak.TypedCssClasses
type Bulma = CssClasses<"https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css", Naming.PascalCase>

//--------------------------------------------------------------------------------------//
//                                        Types                                         //
//--------------------------------------------------------------------------------------//

type Model = {
    loading: bool
    preference: PreferenceResponse
    unsavedPreference: PreferenceResponse
    preferenceEqualList: List<bool> 
    token: string
    selectedProject: Project
    selectedProjectRank: int
    confirmAddProjectModal: bool
    confirmRemoveProjectModal: bool
    confirmSaveChangesModal: bool
    isPreferenceTab: bool
}

type Msg =
    | SuccessLoad of PreferenceResponse
    | Error of exn
    | Logout
    | OpenProject of Project * int
    | CloseProject
    | ConfirmAddProject
    | AddPreference
    | ConfirmRemoveProject
    | RemovePreference
    | ConfirmSaveChanges
    | SaveChanges
    | CloseModal
    | DiscardChanges
    | DocChange
    | CommentsChange of string
    | PreferenceEqualChange of int * bool
    | PreferenceTab
    | CommentsTab
    | SwapUp of int
    | SwapDown of int

//--------------------------------------------------------------------------------------//
//                                       Helpers                                        //
//--------------------------------------------------------------------------------------//


let checkPreferenceChange (model: Model) : bool =
    let p = model.preference
    let up = model.unsavedPreference
    let pList = [p.p1.pid; p.p2.pid; p.p3.pid; p.p4.pid; p.p5.pid; p.p6.pid; p.p7.pid; p.p8.pid; p.p9.pid; p.p10.pid]
    let upList = [up.p1.pid; up.p2.pid; up.p3.pid; up.p4.pid; up.p5.pid; up.p6.pid; up.p7.pid; up.p8.pid; up.p9.pid; up.p10.pid]
    let nList = [p.n1; p.n2; p.n3; p.n4; p.n5; p.n6; p.n7; p.n8; p.n9; p.n10]
    let unList = [up.n1; up.n2; up.n3; up.n4; up.n5; up.n6; up.n7; up.n8; up.n9; up.n10]
    (pList <> upList) || (nList <> unList) || (p.comments <> up.comments) || (p.doc <> up.doc)

let removePreference (model: Model) : Model =
    let rank = model.selectedProjectRank
    let newModel = { model with selectedProject = Project.Default; selectedProjectRank = 0; confirmRemoveProjectModal = false }

    match rank with
    | 1 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p1 = Project.Default } }
    | 2 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p2 = Project.Default } }
    | 3 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p3 = Project.Default } }
    | 4 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p4 = Project.Default } }
    | 5 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p5 = Project.Default } }
    | 6 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p6 = Project.Default } }
    | 7 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p7 = Project.Default } }
    | 8 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p8 = Project.Default } }
    | 9 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p9 = Project.Default } }
    | 10 -> { newModel with unsavedPreference = { newModel.unsavedPreference with p10 = Project.Default } }
    | _ -> newModel // Shouldn't happen

let swapUp (model: Model) (rank: int) : Model =
    let up = model.unsavedPreference
    let newUp = match rank with
                | 2 -> { up with p1 = up.p2; p2 = up.p1 }
                | 3 -> { up with p2 = up.p3; p3 = up.p2 }
                | 4 -> { up with p3 = up.p4; p4 = up.p3 }
                | 5 -> { up with p4 = up.p5; p5 = up.p4 }
                | 6 -> { up with p5 = up.p6; p6 = up.p5 }
                | 7 -> { up with p6 = up.p7; p7 = up.p6 }
                | 8 -> { up with p7 = up.p8; p8 = up.p7 }
                | 9 -> { up with p8 = up.p9; p9 = up.p8 }
                | 10 -> { up with p9 = up.p10; p10 = up.p9 }
                | _ -> up
    { model with unsavedPreference = newUp }

let swapDown (model: Model) (rank: int) : Model =
    swapUp model (rank + 1)

let getPreferenceEqualList (pref: PreferenceResponse) : List<bool> =
    let prefs = [pref.n2; pref.n3; pref.n4; pref.n5; pref.n6; pref.n7; pref.n8; pref.n9; pref.n10]
    let indexes = [2..10]
    let list = List.zip prefs indexes
    List.map (fun (pref, index) -> (pref <> index)) list // If they aren't equal, then it's a PreferenceEqual

let updatePreferenceRanks ((model, iter, prevRank): Model * int * int) (isPrefEqual: bool) : Model * int * int =
    let rank = if isPrefEqual then prevRank else iter
    match iter with
    | 2 -> { model with unsavedPreference = { model.unsavedPreference with n2 = rank }}, 3, rank
    | 3 -> { model with unsavedPreference = { model.unsavedPreference with n3 = rank }}, 4, rank
    | 4 -> { model with unsavedPreference = { model.unsavedPreference with n4 = rank }}, 5, rank
    | 5 -> { model with unsavedPreference = { model.unsavedPreference with n5 = rank }}, 6, rank
    | 6 -> { model with unsavedPreference = { model.unsavedPreference with n6 = rank }}, 7, rank
    | 7 -> { model with unsavedPreference = { model.unsavedPreference with n7 = rank }}, 8, rank
    | 8 -> { model with unsavedPreference = { model.unsavedPreference with n8 = rank }}, 9, rank
    | 9 -> { model with unsavedPreference = { model.unsavedPreference with n9 = rank }}, 10, rank
    | 10 -> { model with unsavedPreference = { model.unsavedPreference with n10 = rank }}, 10, rank // Last iteration
    | _ -> model, 10, rank // Shouldn't happen

//--------------------------------------------------------------------------------------//
//                  Model Initalise [init : unit -> Model * Cmd<Msg>]                   //
//--------------------------------------------------------------------------------------//

let init (token: string) : Model * Cmd<Msg> = 
    let defaultModel = { loading = true;
                        preference = PreferenceResponse.Default;
                        unsavedPreference = PreferenceResponse.Default;
                        preferenceEqualList = [];
                        token = token;
                        selectedProject = Project.Default;
                        selectedProjectRank = 0;
                        confirmAddProjectModal = false;
                        confirmRemoveProjectModal = false; 
                        confirmSaveChangesModal = false; 
                        isPreferenceTab = true }
    let initialLoad () = 
        promise {
            let preferenceUrl = "http://localhost:1234/preferences"
            return! Fetch.get(url=preferenceUrl, 
                              decoder=(PreferenceResponse.Decoder),
                              headers=[Authorization $"Bearer {token}"])             
        }
    defaultModel, Cmd.OfPromise.either initialLoad () SuccessLoad Error

//--------------------------------------------------------------------------------------//
//               Model Update [update : Msg -> Model -> Model * Cmd<Msg>]               //
//--------------------------------------------------------------------------------------//

let update (msg: Msg) (model: Model) =
    match msg with
    | SuccessLoad preference ->
        let prefEqualLst = getPreferenceEqualList preference
        { model with preference = preference; unsavedPreference = preference; preferenceEqualList = prefEqualLst; loading = false }, Cmd.none
    | Error res ->
        printfn "%A" res
        { model with loading = false }, Cmd.none
    | Logout -> 
        model, Cmd.none
    | OpenProject (projectInfo, rank) ->
        { model with selectedProject = projectInfo; selectedProjectRank = rank }, Cmd.none
    | CloseProject ->
        { model with selectedProject = Project.Default; selectedProjectRank = 0}, Cmd.none
    | ConfirmAddProject ->
        { model with confirmAddProjectModal = true }, Cmd.none
    | AddPreference ->
        { model with confirmAddProjectModal = false; }, Cmd.navigatePath("home-student", "projects")
    | ConfirmRemoveProject ->
        { model with confirmRemoveProjectModal = true }, Cmd.none
    | RemovePreference ->
        (removePreference model), Cmd.none
    | ConfirmSaveChanges ->
        { model with confirmSaveChangesModal = true }, Cmd.none
    | SaveChanges ->
        let p = model.preference
        let up = model.unsavedPreference
        let data = {
            comments = model.unsavedPreference.comments
            doc = model.unsavedPreference.doc
            preference = [p.p1.pid; p.p2.pid; p.p3.pid; p.p4.pid; p.p5.pid; p.p6.pid; p.p7.pid; p.p8.pid; p.p9.pid; p.p10.pid]
            newPreference = [up.p1.pid; up.p2.pid; up.p3.pid; up.p4.pid; up.p5.pid; up.p6.pid; up.p7.pid; up.p8.pid; up.p9.pid; up.p10.pid]
            newPreferenceRanks = [up.n1; up.n2; up.n3; up.n4; up.n5; up.n6; up.n7; up.n8; up.n9; up.n10]
        }
        let savePreference () = 
            promise {
                let savePreferenceUrl = "http://localhost:1234/save-preferences"
                return! Fetch.put(url=savePreferenceUrl, 
                                  data=data,
                                  decoder=(PreferenceResponse.Decoder),
                                  headers=[Authorization $"Bearer {model.token}"])             
            }
        { model with confirmSaveChangesModal = false; loading = true }, Cmd.OfPromise.either savePreference () SuccessLoad Error 
    | CloseModal ->
        { model with confirmAddProjectModal = false; confirmRemoveProjectModal = false; confirmSaveChangesModal = false }, Cmd.none  
    | DiscardChanges ->
        let prefEqualLst = getPreferenceEqualList model.preference
        { model with unsavedPreference = model.preference; preferenceEqualList = prefEqualLst }, Cmd.none
    | CommentsChange c ->
        { model with unsavedPreference = { model.unsavedPreference with comments = c } }, Cmd.none
    | PreferenceEqualChange (index, prefEqualChange) ->
        let newPrefEqualList =  List.updateAt index prefEqualChange model.preferenceEqualList
        let newModel, _, _ = List.fold updatePreferenceRanks (model, 2, 1) newPrefEqualList
        { newModel with preferenceEqualList = newPrefEqualList}, Cmd.none
    | DocChange ->
        { model with unsavedPreference = { model.unsavedPreference with doc = not model.unsavedPreference.doc }}, Cmd.none
    | PreferenceTab ->
        { model with isPreferenceTab = true }, Cmd.none
    | CommentsTab ->
        { model with isPreferenceTab = false }, Cmd.none
    | SwapUp index ->
        (swapUp model index), Cmd.none
    | SwapDown index ->
        (swapDown model index), Cmd.none

//--------------------------------------------------------------------------------------//
//                                 Render Subcomponents                                 //
//--------------------------------------------------------------------------------------//

let LoadingScreen =
    Html.div [
        prop.style [style.top 0; style.left 0; style.overflow.hidden; style.position.absolute; 
                    style.height (length.vh 100); style.width (length.vw 100); style.display.flex
                    style.zIndex 100; style.backgroundColor (rgba (0, 0, 0, 0.6))
                    style.justifyContent.center; style.alignItems.center]
        prop.children [
            Html.div [ prop.classes [ "loader" ] ]
        ]
    ]

let TurquoiseBackground opacity =
    Html.div [
        prop.style [style.top 0; style.left 0; style.overflow.hidden; style.position.absolute; style.height (length.perc 100); style.width (length.perc 100); style.opacity opacity; style.zIndex -1; style.backgroundColor turqouise]
    ]

let TurquoiseBackgroundRGBA opacity =
    style.backgroundColor (rgba (175, 238, 238, opacity))

let ImageBackground = 
    Html.img [
        prop.style [style.position.absolute; style.height (length.perc 100); style.width (length.perc 100); style.zIndex -2; style.overflow.hidden] // style.objectFit.cover;
        prop.src "/images/imperial.jpg"
    ]

let TileCss = 
    [TurquoiseBackgroundRGBA 0.7; style.borderStyle.solid; style.borderColor mediumTurqouise; style.padding (length.perc 1.5)]

// ---- Navigation Bar -------------------------------------------------------------------

let NavBar (dispatch: Msg -> unit) =
    Bulma.navbar [
        prop.style [style.backgroundColor mediumTurqouise; style.fontWeight 700]
        prop.children [
            Bulma.navbarBrand.div [
                prop.onClick (fun e -> Router.navigatePath("home-student"))
                prop.style [style.paddingTop 3; style.paddingRight 20; style.paddingLeft 10; style.cursor.pointer]
                prop.children [ 
                    Bulma.icon [
                        Bulma.icon.isLarge
                        prop.children [ Html.i [ prop.className "fas fa-home fa-2x"] ]
                    ]
                ]
            ]
            Bulma.navbarMenu [
                Bulma.navbarStart.div [
                    Bulma.navbarItem.a [ prop.text "Projects"; prop.onClick (fun e -> Router.navigatePath("home-student", "projects")) ]
                    Bulma.navbarItem.a [ prop.text "Preferences"; prop.onClick (fun e -> Router.navigatePath("home-student", "preferences")) ]
                    Bulma.navbarItem.a [ prop.text "Propose a Project"; prop.onClick (fun e -> Router.navigatePath("project-propose")) ]
                ]
                Bulma.navbarEnd.div [
                    Bulma.navbarItem.div [
                        Bulma.buttons [
                            Bulma.button.a [ prop.text "Log Out"; prop.onClick (fun _ -> dispatch Logout) ]
                        ]
                    ]
                ]
            ]
        ]
    ]  

// ---- Tabs -----------------------------------------------------------------------------

let Tabs (model: Model) (dispatch: Msg -> Unit) =
    Bulma.tabs [
        prop.children [
            Html.ul [
                Bulma.tab [
                    if model.isPreferenceTab then prop.classes [ Bulma.IsActive ]
                    prop.onClick (fun _ -> dispatch PreferenceTab)
                    prop.children [ Html.a [ prop.text "Preferences"; prop.style [ style.fontWeight.bold ] ] ]
                ]
                Bulma.tab [
                    if not model.isPreferenceTab then prop.classes [ Bulma.IsActive ]
                    prop.onClick (fun _ -> dispatch CommentsTab)
                    prop.children [ Html.a [ prop.text "Comments"; prop.style [ style.fontWeight.bold ] ] ]
                ]
            ]
        ]
    ]


// ---- Preference Table --------------------------------------------------------------------

let Table (model: Model) (body: ReactElement list) = 
    Html.div [
        prop.style [style.overflowY.auto; style.height (length.perc 76); style.marginBottom (length.perc 4);
                    if model.unsavedPreference.doc then style.opacity 0.5]
        prop.classes [ "scrollbar" ]
        prop.children [
            Bulma.table [
                prop.style [style.width (length.perc 100); style.position.relative]
                prop.children body
            ]
        ]
    ]

let PreferenceRow (model: Model) (dispatch: Msg -> unit) ((projectInfo, rank, index): Project * int * int) = 
    let isSelected = (model.selectedProject = projectInfo && model.selectedProject.pid <> 0) // This project is selected to be viewed
    let isProject = (projectInfo.pid <> 0) // There is a project (so not empty preference)
    let isPrefEqual = (rank <> index) // If the rank does not equal its actual index/position, then this is a PreferenceEqual
    //let test = if (index <> 1) then model.preferenceEqualList[index - 2] else false

    Html.tr [
        prop.classes [ "table-row" ]
        prop.style [style.cursor.pointer; if isSelected then style.backgroundColor lightGray]

        match isProject with
        | true -> prop.onClick (fun _ -> dispatch (OpenProject (projectInfo, index)))
        | false -> prop.onClick (fun _ -> dispatch ConfirmAddProject)

        prop.children [
            Html.td [prop.text rank]
            Html.td [
                if (index <> 1) then
                    Html.input [
                        prop.isChecked isPrefEqual
                        prop.value isPrefEqual
                        prop.onChange (fun (ev : Browser.Types.Event) -> dispatch (PreferenceEqualChange (index - 2, not isPrefEqual)))
                        prop.onClick (fun ev -> ev.stopPropagation())
                        prop.style [style.width 18; style.height 18]
                        prop.type' "checkbox"
                    ]
            ]
            Html.td [if isProject then prop.text projectInfo.title]
            Html.td [if isProject then prop.text projectInfo.supName]
            Html.td [
                if isProject then
                    Bulma.icon [
                        if (index <> 1) then 
                            prop.children [ Html.i [ prop.className "fas fa-angle-double-up fa-lg"] ]
                            prop.id "swap-icon"
                            prop.onClick (fun ev -> ev.stopPropagation(); dispatch (SwapUp index))
                            Bulma.icon.isMedium
                    ]
                    Bulma.icon [
                        if (index <> 10) then 
                            prop.children [ Html.i [ prop.className "fas fa-angle-double-down fa-lg"] ]
                            prop.id "swap-icon"
                            prop.onClick (fun ev -> ev.stopPropagation(); dispatch (SwapDown index))
                            Bulma.icon.isMedium
                    ]
            ]
        ]
    ]

let PreferenceTable (model: Model) (dispatch: Msg -> unit) =
    let pref = model.unsavedPreference
    let prefList = [(pref.p1, pref.n1, 1); (pref.p2, pref.n2, 2); (pref.p3, pref.n3, 3); (pref.p4, pref.n4, 4); (pref.p5, pref.n5, 5);
                    (pref.p6, pref.n6, 6); (pref.p7, pref.n7, 7); (pref.p8, pref.n8, 8); (pref.p9, pref.n9, 9); (pref.p10, pref.n10, 10)]
    
    printfn "%A" [(pref.n1, 1); (pref.n2, 2); (pref.n3, 3); (pref.n4, 4); (pref.n5, 5);
                    (pref.n6, 6); (pref.n7, 7); (pref.n8, 8); (pref.n9, 9); (pref.n10, 10)]
    printfn "%A" model.preferenceEqualList
    
    Table model [
        Html.thead [
            Html.tr [
                Html.th [ prop.title "Rank"; prop.text "Rank"]
                Html.th [ prop.title "Title"; prop.text "Title"]
                Html.th [ prop.title "Professor"; prop.text "Professor"]
                Html.th [ prop.title "Equal Preferences"; prop.text "Equal Preferences"]
                Html.th [ prop.title "Swap Preferences"; prop.text "Swap Preferences"]
            ]
        ]
        Html.tbody (List.map (PreferenceRow model dispatch) prefList)

        if model.unsavedPreference.doc then 
            Html.div [
                prop.style [style.top 0; style.left 0; style.overflow.hidden; style.position.absolute; 
                            style.height (length.perc 100); style.width (length.perc 100);
                            style.zIndex 80]
            ]
    ]

// ---- Comments -------------------------------------------------------------------------

let Comments (model: Model) (dispatch: Msg -> unit)=
    Html.textarea [
        prop.rows 5
        prop.cols 33
        prop.placeholder "Enter your comments here"
        prop.value model.unsavedPreference.comments
        prop.onTextChange (CommentsChange >> dispatch)

    ]

// ---- Selected Project View ------------------------------------------------------------

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

// ---- Save Changes Buttons -----------------------------------------------------

let saveChangesButtons (model: Model) (dispatch: Msg -> unit) =
    Bulma.box [
        prop.style [ style.display.flex; style.alignItems.center ]
        prop.children [
            Bulma.button.button [
                prop.style [ style.marginRight 30 ]
                prop.text "Save Changes"
                match (checkPreferenceChange model) with
                | true -> // If true then there has been changes to preferences
                    prop.onClick (fun _ -> dispatch ConfirmSaveChanges)
                    Bulma.color.isSuccess
                | false -> // If false then no changes to preferences
                    prop.disabled true
            ]
            Bulma.button.button [
                prop.style [ style.marginRight 30 ]
                prop.text "Discard Changes"
                match (checkPreferenceChange model) with
                | true -> // If true then there has been changes to preferences
                    prop.onClick (fun _ -> dispatch DiscardChanges)
                    Bulma.color.isDanger
                | false -> // If false then no changes to preferences
                    prop.disabled true
            ]
            Html.div [
                prop.style [ style.display.flex; style.alignItems.center ]
                prop.children [
                    Html.input [
                        prop.onChange (fun (ev: Browser.Types.Event) -> (dispatch DocChange))
                        prop.isChecked model.unsavedPreference.doc
                        prop.style [style.width 18; style.height 18; style.marginRight 10]
                        prop.type' "checkbox"
                    ]
                    Html.label [ prop.text "Entering DOC Allocation" ]  
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

//--------------------------------------------------------------------------------------//
//              Model View [view : Model -> (Msg -> unit) -> ReactElement]              //
//--------------------------------------------------------------------------------------//

let view (model: Model) (dispatch: Msg -> unit) =
    Html.body [
        prop.style [style.height (length.vh 100); style.position.relative]
        prop.children [
            if model.loading then LoadingScreen
            TurquoiseBackground 0.5
            ImageBackground
            NavBar dispatch

            Bulma.columns [
                prop.style [ style.height (length.vh 90); style.margin (length.perc 1)]
                prop.children [

                    Bulma.column [
                        prop.style TileCss
                        prop.children [ 
                            //if model.isPreferenceTab then (PreferenceTable model dispatch) else (Comments model dispatch)
                            (PreferenceTable model dispatch)
                            //saveChangesButtons model dispatch
                        ]
                    ]

                    Bulma.column [ prop.classes [Bulma.Is0] ] // Column Gap

                    Bulma.column [
                        prop.style TileCss
                        prop.children [
                            match model.selectedProjectRank = 0 with
                            | true -> ()
                            | false -> 
                                selectedProject model
                                removeProjectButtons model dispatch
                        ]
                    ]

                    Bulma.modal [
                        let capm = model.confirmAddProjectModal
                        let crpm = model.confirmRemoveProjectModal
                        let cscm = model.confirmSaveChangesModal
                        if (capm || crpm || cscm) then Bulma.modal.isActive
                        prop.onKeyUp (key.escape, fun ev -> dispatch CloseModal)
                        prop.classes [ "scrollbar"; Bulma.IsLarge ]
                        prop.children [
                            Bulma.modalBackground []
                            match capm, crpm, cscm with
                            | true, _, _ -> addPreferenceModal model dispatch
                            | _, true, _ -> removePreferenceModal model dispatch
                            | _, _, true-> saveChangesModal model dispatch
                            | _, _, _ -> ()
                        ]
                    ]
                ]   
            ]

        ]
    ]