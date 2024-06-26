import { Union, Record } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { union_type, class_type, record_type, string_type, list_type, bool_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { EditProposalRequest_$reflection, Proposal_$reflection } from "../../../../Shared/Shared.fs.js";

export class Model extends Record {
    constructor(loading, proposals, unsavedProposals, token, selectedProposal, confirmDeleteProposalModal, confirmEditProposalModal, isProjectInfoTab, editProject) {
        super();
        this.loading = loading;
        this.proposals = proposals;
        this.unsavedProposals = unsavedProposals;
        this.token = token;
        this.selectedProposal = selectedProposal;
        this.confirmDeleteProposalModal = confirmDeleteProposalModal;
        this.confirmEditProposalModal = confirmEditProposalModal;
        this.isProjectInfoTab = isProjectInfoTab;
        this.editProject = editProject;
    }
}

export function Model_$reflection() {
    return record_type("ProposalsTypes.Model", [], Model, () => [["loading", bool_type], ["proposals", list_type(Proposal_$reflection())], ["unsavedProposals", list_type(Proposal_$reflection())], ["token", string_type], ["selectedProposal", Proposal_$reflection()], ["confirmDeleteProposalModal", bool_type], ["confirmEditProposalModal", bool_type], ["isProjectInfoTab", bool_type], ["editProject", EditProposalRequest_$reflection()]]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SuccessLoad", "Error", "Logout", "ProjectInfoTab", "SuitabilityTab", "OpenProposal", "CloseProposal", "ConfirmDeleteProposal", "DeleteProposal", "ConfirmEditProposal", "EditProposal", "DiscardChanges", "CloseModal", "ChangedSuitability", "ProjectTitleChanged", "ClickedCategoryTag", "ClickedStreamTag", "RequirementsChanged", "SkillsChanged", "DescriptionChanged", "MeetingsChanged"];
    }
}

export function Msg_$reflection() {
    return union_type("ProposalsTypes.Msg", [], Msg, () => [[["Item", list_type(Proposal_$reflection())]], [["Item", class_type("System.Exception")]], [], [], [], [["Item", Proposal_$reflection()]], [], [], [], [], [], [], [], [["Item1", class_type("Browser.Types.Event", void 0)], ["Item2", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]]]);
}

//# sourceMappingURL=ProposalsTypes.fs.js.map
