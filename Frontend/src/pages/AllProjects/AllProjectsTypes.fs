module AllProjectsTypes

open Shared

type Model = {
    loading: bool
    projects: List<Project>
    preference: PreferenceResponse
    token: string
    modalState: bool
    searchTitle: string
    searchUser: string
    selectedProject: Project
    selectedProjectIndex: int
    topOrBottom5: string
}

//type InitalLoad = {
//    projects: List<Project>
//    preference: PreferenceResponse
//}

type Msg =
    | SuccessLoad of List<Project> // Initial fetch requests to the server were successful
    | ErrorLoad of exn // Fetch request to the server failed
    | Logout // Logout button of account
    | OpenModal of Project // Selected a project to preview
    | CloseModal // Close the selected project preview
    | SearchTitleChanged of string // Changing Search Title field
    | SearchUserChanged of string // Changing Search Professor field
    | SearchRequest // Sends a server request containing project filters

