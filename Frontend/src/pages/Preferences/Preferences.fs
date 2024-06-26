module Preferences

open Shared
open Common
open PreferencesTypes
type Model = PreferencesTypes.Model
type Msg = PreferencesTypes.Msg
open PreferencesHelpers
open PreferencesNavBar
open PreferencesManage
open PreferencesSelectedProject
open PreferencesModals

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
//                  Model Initalise [init : unit -> Model * Cmd<Msg>]                   //
//--------------------------------------------------------------------------------------//

let init (token: string) : Model * Cmd<Msg> = 
    let defaultModel = { loading = true;
                        preference = PreferenceResponse.Default;
                        unsavedPreference = PreferenceResponse.Default;
                        preferenceEqualList = [];
                        token = token;
                        selectedProject = Project.Default;
                        selectedProjectIndex = 0;
                        confirmAddProjectModal = false;
                        confirmRemoveProjectModal = false; 
                        confirmSaveChangesModal = false; 
                        isPreferenceTab = true }
    let initialLoad () = 
        promise {
            let preferenceUrl = $"{Server}/preferences"
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
    | OpenProject (projectInfo, index) ->
        { model with selectedProject = projectInfo; selectedProjectIndex = index }, Cmd.none
    | CloseProject ->
        { model with selectedProject = Project.Default; selectedProjectIndex = 0}, Cmd.none
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
                let savePreferenceUrl = $"{Server}/save-preferences"
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
                            Tabs model dispatch
                            if model.isPreferenceTab then (PreferenceTable model dispatch) else (Comments model dispatch)
                            saveChangesButtons model dispatch
                        ]
                    ]

                    Bulma.column [ prop.classes [Bulma.Is0] ] // Column Gap

                    Bulma.column [
                        prop.style TileCss
                        prop.children [
                            match model.selectedProjectIndex = 0 with
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