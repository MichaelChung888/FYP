module ProposalsTypes

open Shared

type Model = {
    loading: bool
    proposals: List<Proposal>
    token: string
    selectedProposal: Proposal
    confirmDeleteProposalModal: bool
    confirmEditProposalModal: bool
    isProjectInfoTab: bool
    editProject: EditProposalRequest
}

type Msg =
    | SuccessLoad of List<Proposal>
    | Error of exn
    | Logout
    | ProjectInfoTab
    | SuitabilityTab
    | OpenProposal of Proposal
    | CloseProposal
    | ConfirmDeleteProposal
    | DeleteProposal
    | ConfirmEditProposal
    | EditProposal
    | CloseModal
    | ChangedSuitability of Browser.Types.Event * string * int
    | ProjectTitleChanged of string
    | ClickedCategoryTag of string 
    | ClickedStreamTag of string 
    | RequirementsChanged of string
    | SkillsChanged of string
    | DescriptionChanged of string
    | MeetingsChanged of string
