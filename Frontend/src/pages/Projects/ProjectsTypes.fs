module ProjectsTypes

open Shared

type Model = {
    loading: bool
    projects: List<Project>
    preference: PreferenceResponse
    token: string
    modalState: bool
    addProjectState: bool
    searchTitle: string
    searchProfessor: string
    selectedCategories: List<string>
    selectedStreams: List<string>
    selectedProject: Project
    selectedProjectIndex: int
    topOrBottom5: string
}

type InitalLoad = {
    projects: List<Project>
    preference: PreferenceResponse
}

type Msg =
    | SuccessLoad of InitalLoad // Initial fetch requests to the server were successful
    | ErrorLoad of exn // Fetch request to the server failed
    | Logout // Logout button of account
    | OpenModal of Project // Selected a project to preview
    | CloseModal // Close the selected project preview
    | AddProject // Send a request to server to add the project to your preference
    | OpenAddProject // Opens the menu to add the selected project to preferences
    | CloseAddProject // Closes the menu to add the selected project to preferences
    | IndexAddProject of int // Selecting an index to preference the selected project
    | SearchTitleChanged of string // Changing Search Title field
    | SearchProfessorChanged of string // Changing Search Professor field
    | ClickedCategoryTag of string // Clicked Search Category tag filter
    | ClickedStreamTag of string // Clicked Stream Category tag filter
    | TopOrBottom5 of Browser.Types.Event // Toggled the top or bottom 5 project popularity display
    | SearchRequest // Sends a server request containing project filters
    | FetchedProjectsLoad of List<Project> // Recieving the filtered projects

