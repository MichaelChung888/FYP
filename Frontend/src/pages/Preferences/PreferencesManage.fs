module PreferencesManage

open Shared
open Common
open PreferencesTypes
open PreferencesHelpers

open Feliz
open Feliz.Bulma

open color

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