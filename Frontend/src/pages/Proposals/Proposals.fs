module Proposals

open Shared
open Common

open System
open ProposalsTypes
type Model = ProposalsTypes.Model
type Msg = ProposalsTypes.Msg
open ProposalsHelpers
open ProposalsNavBar
open ProposalsEditForm
open ProposalsTable
open ProposalsSelectedProject
open ProposalsModals

open Thoth.Json
open Thoth.Fetch
open Fetch

open Elmish

open Feliz
open Feliz.Bulma
open Feliz.Router

open color

open Fable.Core.JsInterop

open Zanaptak.TypedCssClasses
type Bulma = CssClasses<"https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css", Naming.PascalCase>

//--------------------------------------------------------------------------------------//
//                  Model Initalise [init : unit -> Model * Cmd<Msg>]                   //
//--------------------------------------------------------------------------------------//

let init (token: string) : Model * Cmd<Msg> = 
    let defaultModel = { loading = true;
                         proposals =[];
                         token = token; 
                         selectedProposal = Proposal.Default; 
                         confirmDeleteProposalModal = false;
                         confirmEditProposalModal = false;
                         isProjectInfoTab = true 
                         editProject = { 
                            pid = 0; 
                            isStudent = false; title = ""; categories = [];
                            streams = []; requirements = ""; description = "";
                            skills = ""; meetings = "" } 
                        } 
    let initialLoad () = 
        promise {
            let proposalsUrl = $"{Server}/proposals"

            return! Fetch.post(url=proposalsUrl, 
                                  data=(false),
                                  decoder=(Decode.list Proposal.Decoder),
                                  headers=[Authorization $"Bearer {token}"]) 
        }
    defaultModel, Cmd.OfPromise.either initialLoad () SuccessLoad Error

//--------------------------------------------------------------------------------------//
//               Model Update [update : Msg -> Model -> Model * Cmd<Msg>]               //
//--------------------------------------------------------------------------------------//

let update (msg: Msg) (model: Model) =
    match msg with
    | SuccessLoad proposals ->
        { model with proposals = proposals; loading = false }, Cmd.none
    | Error res ->
        printfn "%A" res
        { model with loading = false }, Cmd.none
    | Logout -> 
        model, Cmd.none
    | ProjectInfoTab ->
        { model with isProjectInfoTab = true }, Cmd.none
    | SuitabilityTab ->
        { model with isProjectInfoTab = false }, Cmd.none
    | OpenProposal proposal ->
        { model with selectedProposal = proposal}, Cmd.none
    | CloseProposal ->
        { model with selectedProposal = Proposal.Default }, Cmd.none
    | ConfirmDeleteProposal ->
        { model with confirmDeleteProposalModal = true }, Cmd.none
    | DeleteProposal ->
        let initialLoad () = 
            promise {
                let proposalsUrl = $"{Server}/proposals"

                return! Fetch.delete(url=proposalsUrl, 
                                    data=({ isStudent = false; pid = model.selectedProposal.project.pid }),
                                    decoder=(Decode.list Proposal.Decoder),
                                    headers=[Authorization $"Bearer {model.token}"]) 
            }
        { model with loading = true; confirmDeleteProposalModal = false; selectedProposal= Proposal.Default}, 
        Cmd.OfPromise.either initialLoad () SuccessLoad Error
    | ConfirmEditProposal ->
        let sp = model.selectedProposal
        let editInfo = {
            pid = sp.project.pid;
            isStudent = false;
            title = sp.project.title;
            categories = sp.project.categories.Split ',' |> Array.toList;
            streams = sp.project.tstream.Split ',' |> Array.toList;
            requirements = sp.project.requirements;
            description = sp.project.descr;
            skills = sp.project.skills;
            meetings = sp.project.meetings }
        { model with confirmEditProposalModal = true; editProject = editInfo }, Cmd.none
    | EditProposal ->
        let EditProposal () = 
            promise {
                let editProposalsUrl = $"{Server}/edit-proposal"

                return! Fetch.put(url=editProposalsUrl, 
                                    data=(model.editProject),
                                    decoder=(Decode.list Proposal.Decoder),
                                    headers=[Authorization $"Bearer {model.token}"]) 
            }
        { model with loading = true; confirmDeleteProposalModal = false; selectedProposal= Proposal.Default}, 
        Cmd.OfPromise.either EditProposal () SuccessLoad Error 
    | CloseModal ->
        { model with confirmDeleteProposalModal = false; confirmEditProposalModal = false }, Cmd.none
    | ChangedSuitability (ev, applicantId, rank) ->

        let applicantIndex = List.findIndex (fun applicant -> applicant.eeid = applicantId) model.selectedProposal.applicants
        //let proposalIndex = List.findIndex (fun proposal -> proposal.project.pid = model.selectedProposal.project.pid ) model.proposals

        let applicant = List.find (fun applicant -> applicant.eeid = applicantId) model.selectedProposal.applicants
        let updatedApplicant = { applicant with suitability = (ev.target?value |> string) }
        let updatedApplicantList = List.updateAt applicantIndex updatedApplicant model.selectedProposal.applicants
        let updatedProposal = { model.selectedProposal with applicants = updatedApplicantList }
        //let updatedProposalList =  List.updateAt proposalIndex updatedProposal model.proposals

        //{ model with proposals = updatedProposalList }, Cmd.none
        
        let EditSuitability () = 
            promise {
                let editSuitabilityUrl = $"{Server}/edit-suitability"

                let data = {
                    applicantId = applicantId;
                    rank = rank;
                    newSuitability = (ev.target?value |> string);
                    isStudent = false }

                return! Fetch.put(url=editSuitabilityUrl, 
                                    data=data,
                                    decoder=(Decode.list Proposal.Decoder),
                                    headers=[Authorization $"Bearer {model.token}"]) 
            }
        { model with loading = true; selectedProposal = updatedProposal}, 
        Cmd.OfPromise.either EditSuitability () SuccessLoad Error         
    | ProjectTitleChanged title ->
        { model with editProject = { model.editProject with title = title } }, Cmd.none
    | ClickedCategoryTag tag ->
        let sc = model.editProject.categories
        match (List.exists (fun c -> c = tag) sc) with
        | true -> // Already in list, hence removing tag from search
            { model with editProject = { model.editProject with categories = List.filter (fun c -> c <> tag) sc } }, Cmd.none
        | false -> // Not in list, hence adding tag to search
            { model with editProject = { model.editProject with categories = sc @ [tag] } }, Cmd.none
    | ClickedStreamTag tag ->
        let ss =model.editProject.streams
        match (List.exists (fun c -> c = tag) ss) with
        | true -> // Already in list, hence removing tag to search
            { model with editProject = { model.editProject with streams = List.filter (fun c -> c <> tag) ss } }, Cmd.none
        | false -> // Not in list, hence adding tag to search
            { model with editProject = { model.editProject with streams = ss @ [tag] } }, Cmd.none
    | RequirementsChanged requirements ->
        { model with editProject = { model.editProject with requirements = requirements } }, Cmd.none
    | DescriptionChanged description ->
        { model with editProject = { model.editProject with description = description } }, Cmd.none
    | SkillsChanged skills ->
        { model with editProject = { model.editProject with skills = skills } }, Cmd.none
    | MeetingsChanged meetings ->
        { model with editProject = { model.editProject with meetings = meetings } }, Cmd.none

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
                            Bulma.label [ prop.text "Proposals" ] 
                            (ProposalTable model dispatch)
                        ]
                    ]

                    Bulma.column [ prop.classes [Bulma.Is0] ] // Column Gap

                    Bulma.column [
                        prop.style TileCss
                        prop.children [
                            match model.selectedProposal.project.pid = 0 with
                            | true -> ()
                            | false -> 
                                Tabs model dispatch
                                selectedProject model dispatch
                                Buttons model dispatch
                        ]
                    ]

                    Bulma.modal [
                        let cdpm = model.confirmDeleteProposalModal
                        let cscm =  model.confirmEditProposalModal
                        if (cdpm || cscm) then Bulma.modal.isActive
                        prop.onKeyUp (key.escape, fun ev -> dispatch CloseModal)
                        prop.classes [ "scrollbar"; Bulma.IsLarge ]
                        prop.children [
                            Bulma.modalBackground []
                            match cdpm, cscm with
                            | true, _ -> DeleteProposalModal model dispatch
                            | _, true -> EditProposalModal model dispatch
                            | _, _ -> ()
                        ]
                    ]
                ]   
            ]

        ]
    ]