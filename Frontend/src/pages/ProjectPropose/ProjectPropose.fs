module ProjectPropose

open Shared
open Common
open ProjectProposeTypes
type Model = ProjectProposeTypes.Model
type Msg = ProjectProposeTypes.Msg
open ProjectProposeHelpers
open ProjectProposeNavBar
open ProjectsProposeForm

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

let init (token: string) (user: Person) : Model * Cmd<Msg> = 
    let defaultModel = { loading = false; token = token; user = user; projectTitle = ""; selectedCategories = [];
                          selectedStreams = []; requirements = ""; description = ""; skills = "";
                          meetings = ""; validationMessage = None; responseResult = Neither}
    defaultModel, Cmd.none

//--------------------------------------------------------------------------------------//
//               Model Update [update : Msg -> Model -> Model * Cmd<Msg>]               //
//--------------------------------------------------------------------------------------//

let update (msg: Msg) (model: Model) : Model * Cmd<Msg> =
    match msg with
    | SuccessLoad success ->
        { model with loading = false; responseResult = Success }, Cmd.none
    | Error res ->
        printfn "%A" res
        { model with loading = false; responseResult = Failed }, Cmd.none
    | Logout -> 
        model, Cmd.none
    | ProjectTitleChanged title ->
        { model with projectTitle = title; responseResult = Neither }, Cmd.none
    | ClickedCategoryTag tag ->
        let sc = model.selectedCategories
        match (List.exists (fun c -> c = tag) sc) with
        | true -> // Already in list, hence removing tag from search
            { model with selectedCategories = List.filter (fun c -> c <> tag) sc; responseResult = Neither }, Cmd.none
        | false -> // Not in list, hence adding tag to search
            { model with selectedCategories = sc @ [tag]}, Cmd.none
    | ClickedStreamTag tag ->
        let ss = model.selectedStreams
        match (List.exists (fun c -> c = tag) ss) with
        | true -> // Already in list, hence removing tag to search
            { model with selectedStreams = List.filter (fun c -> c <> tag) ss; responseResult = Neither }, Cmd.none
        | false -> // Not in list, hence adding tag to search
            { model with selectedStreams = ss @ [tag]}, Cmd.none
    | RequirementsChanged requirements ->
        { model with requirements = requirements; responseResult = Neither }, Cmd.none
    | DescriptionChanged description ->
        { model with description = description; responseResult = Neither }, Cmd.none
    | SkillsChanged skills ->
        { model with skills = skills; responseResult = Neither }, Cmd.none
    | MeetingsChanged meetings ->
        { model with meetings = meetings; responseResult = Neither }, Cmd.none
    | Submit ev ->
        ev.preventDefault ()
        let data = {
            title = model.projectTitle
            isStudent = (isStudent model.user)
            categories = model.selectedCategories
            streams = if (isStudent model.user) then [] else model.selectedStreams
            requirements = if (isStudent model.user) then "" else model.requirements
            description = if (isStudent model.user) then "" else model.description
            skills = if (isStudent model.user) then "" else model.skills
            meetings = model.meetings
        }
        let handleSubmit () = 
            promise {
                let url = $"{Server}/project-propose"
                return! Fetch.post(url=url,
                                   data=data,
                                   decoder=Decode.string,
                                   headers=[Authorization $"Bearer {model.token}"]) //properties=[Credentials RequestCredentials.Include]
            }
        { model with loading = true; responseResult = Neither }, Cmd.OfPromise.either handleSubmit () SuccessLoad Error

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
            NavBar dispatch model.user

            Bulma.columns [
                prop.classes [ "is-centered" ]
                prop.style [ style.height (length.vh 90); style.margin (length.perc 1); style.position.relative ]
                prop.children [


                    Bulma.column [
                        prop.style TileCss
                        prop.classes [ Bulma.IsHalf ]
                        prop.children [

                            Bulma.content [
                                prop.style [ style.overflowY.scroll; style.height (length.perc 100); style.padding 50 ]
                                prop.classes [ "scrollbar" ]
                                prop.children [
                                    Html.form [
                                        prop.onSubmit (Submit >> dispatch)
                                        prop.children [
                                            Bulma.title [ prop.text "Project Proposal Form" ]
                                            Tabs model 
                                            ResponseResultMessage model
                                            ValidityCheck model
                                            Name model
                                            ProjectTitle model dispatch
                                            Categories model dispatch
                                            if not (isStudent model.user) then Streams model dispatch
                                            if not (isStudent model.user) then Requirements model dispatch
                                            if not (isStudent model.user) then Skills model dispatch
                                            Description model dispatch
                                            Meetings model dispatch
                                            SubmitButton model
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]                    
                ]   
            ]
 
        ]
    ]