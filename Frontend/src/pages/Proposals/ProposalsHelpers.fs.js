import { equals } from "../../fable_modules/fable-library.4.1.4/Util.js";

export function checkProposalChange(model) {
    return !equals(model.proposals, model.unsavedProposals);
}

//# sourceMappingURL=ProposalsHelpers.fs.js.map
