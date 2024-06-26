module PreferencesTypes

open Shared

type Model = {
    loading: bool
    preference: PreferenceResponse
    unsavedPreference: PreferenceResponse
    preferenceEqualList: List<bool> 
    token: string
    selectedProject: Project
    selectedProjectIndex: int
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