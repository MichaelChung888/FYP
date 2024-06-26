module Projects

open Shared
open Common
open ProjectsTypes
type Model = ProjectsTypes.Model
type Msg = ProjectsTypes.Msg
open ProjectsHelpers
open ProjectsNavBar
open ProjectsTables
open ProjectsSearch
open ProjectsModals

open Thoth.Json
open Thoth.Fetch
open Fetch

open Elmish

open Feliz
open Feliz.Bulma

open color

open Zanaptak.TypedCssClasses
type Bulma = CssClasses<"https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css", Naming.PascalCase>

//--------------------------------------------------------------------------------------//
//                  Model Initalise [init : unit -> Model * Cmd<Msg>]                   //
//--------------------------------------------------------------------------------------//

let init (token: string) : Model * Cmd<Msg> = 
    let defaultModel = { loading = true;
                        projects = []; 
                        preference = PreferenceResponse.Default;
                        token = token; 
                        modalState = false; 
                        addProjectState = false;
                        searchTitle = "";
                        searchProfessor = "";
                        selectedCategories = [];
                        selectedStreams = [];
                        selectedProject = Project.Default;
                        selectedProjectRank = 0 }
    let initialLoad () = 
        promise {
            let projectsUrl = $"{Server}/projects"
            let preferenceUrl = $"{Server}/preferences"
            
            let! projects =  Fetch.get(url=projectsUrl, 
                                       decoder=(Decode.list Project.Decoder),
                                       headers=[Authorization $"Bearer {token}"]) //properties=[Credentials RequestCredentials.Include]
            let! preference =  Fetch.get(url=preferenceUrl, 
                                         decoder=(PreferenceResponse.Decoder),
                                         headers=[Authorization $"Bearer {token}"]) 
            return { projects = projects; preference = preference }
        }
    defaultModel, Cmd.OfPromise.either initialLoad () SuccessLoad ErrorLoad

//--------------------------------------------------------------------------------------//
//               Model Update [update : Msg -> Model -> Model * Cmd<Msg>]               //
//--------------------------------------------------------------------------------------//

let update (msg: Msg) (model: Model) : Model * Cmd<Msg> =
    match msg with
    | SuccessLoad initialLoad ->
        { model with projects = initialLoad.projects; preference = initialLoad.preference; loading = false }, Cmd.none
    | ErrorLoad res ->
        printfn "%A" res
        { model with loading = false }, Cmd.none
    | Logout -> 
        model, Cmd.none
    | OpenModal project ->
        { model with modalState = true; selectedProject = project }, Cmd.none
    | CloseModal ->
        { model with modalState = false; addProjectState = false; selectedProjectRank = 0 }, Cmd.none
    | AddProject ->
        let data = {
            preference = currentSelectedPreference model
            newPreference = model.selectedProject.pid
            newPreferenceIndex= model.selectedProjectRank
        }
        let addPreference () = 
            promise {
                let addProjectUrl = $"{Server}/add-project"
                let projectsUrl = $"{Server}/projects"

                let! newPreference = Fetch.put(url=addProjectUrl, 
                                              data=data,
                                              decoder=(PreferenceResponse.Decoder),
                                              headers=[Authorization $"Bearer {model.token}"])     
                let! projects =  Fetch.get(url=projectsUrl, 
                                        decoder=(Decode.list Project.Decoder),
                                        headers=[Authorization $"Bearer {model.token}"])
                return { projects = projects; preference = newPreference }      
            }
        { model with modalState = false; addProjectState = false; loading = true; selectedProjectRank = 0 }
        , Cmd.OfPromise.either addPreference () SuccessLoad ErrorLoad
    | OpenAddProject ->
        { model with addProjectState = true }, Cmd.none
    | CloseAddProject ->
        { model with addProjectState = false; selectedProjectRank = 0 }, Cmd.none
    | RankAddProject rank ->
        { model with selectedProjectRank = rank }, Cmd.none
    | SearchTitleChanged title ->
        { model with searchTitle = title }, Cmd.ofMsg SearchRequest
    | SearchProfessorChanged title ->
        { model with searchProfessor = title }, Cmd.ofMsg SearchRequest
    | ClickedCategoryTag tag ->
        let sc = model.selectedCategories
        match (List.exists (fun c -> c = tag) sc) with
        | true -> // Already in list, hence removing tag from search
            { model with selectedCategories = List.filter (fun c -> c <> tag) sc}, Cmd.ofMsg SearchRequest
        | false -> // Not in list, hence adding tag to search
            { model with selectedCategories = sc @ [tag]}, Cmd.ofMsg SearchRequest
    | ClickedStreamTag tag ->
        let ss = model.selectedStreams
        match (List.exists (fun c -> c = tag) ss) with
        | true -> // Already in list, hence removing tag to search
            { model with selectedStreams = List.filter (fun c -> c <> tag) ss}, Cmd.ofMsg SearchRequest
        | false -> // Not in list, hence adding tag to search
            { model with selectedStreams = ss @ [tag]}, Cmd.ofMsg SearchRequest
    | SearchRequest ->
        let data = {
            title = model.searchTitle;
            professor = model.searchProfessor;
            categories = model.selectedCategories;
            streams = model.selectedStreams
        }
        let searchRequest () = 
            promise {
                let url = $"{Server}/search-projects"
                return! Fetch.post(url=url, 
                                  data=data,
                                  decoder=(Decode.list Project.Decoder),
                                  headers=[Authorization $"Bearer {model.token}"]) //properties=[Credentials RequestCredentials.Include]
            }
        model, Cmd.OfPromise.either searchRequest () FetchedProjectsLoad ErrorLoad
    | FetchedProjectsLoad projects ->
        { model with projects = projects }, Cmd.none

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
                        prop.style ([style.overflowY.scroll] @ TileCss)
                        prop.classes [ Bulma.Is3; "scrollbar" ]
                        prop.children (SearchFilters dispatch model)
                    ]

                    Bulma.column [ prop.classes [Bulma.Is0] ] // Column Gap

                    Bulma.column [
                        prop.style TileCss
                        prop.children [
                            Bulma.label [ prop.text "Projects" ] 
                            ProjectTable model dispatch
                        ]
                    ]

                    Bulma.modal [
                        if model.modalState then Bulma.modal.isActive
                        prop.onKeyUp (key.escape, fun ev -> dispatch CloseModal)
                        prop.classes [ "scrollbar"; Bulma.IsLarge ]
                        prop.children [
                            Bulma.modalBackground []
                            match model.addProjectState with
                            | false ->
                                ModalProjectInfo model dispatch
                            | true ->
                                ModalAddProject model dispatch
                        ]
                    ]
                ]   
            ]
 
        ]
    ]
