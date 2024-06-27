import { append, filter, exists, updateAt, find, findIndex, cons, ofArray, singleton, empty } from "../../fable_modules/fable-library.4.1.4/List.js";
import { EditSuitabilityRequest_$reflection, EditSuitabilityRequest, Proposal, Applicant, EditProposalRequest_$reflection, DeleteProposalRequest_$reflection, DeleteProposalRequest, Proposal_$reflection, Proposal_get_Decoder, EditProposalRequest, Proposal_get_Default } from "../../../../Shared/Shared.fs.js";
import { Msg, Model } from "./ProposalsTypes.fs.js";
import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "../../fable_modules/Fable.Promise.3.2.0/Promise.fs.js";
import { promise } from "../../fable_modules/Fable.Promise.3.2.0/PromiseImpl.fs.js";
import { list } from "../../fable_modules/Thoth.Json.10.2.0/Decode.fs.js";
import { createObj, uncurry2 } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { PromiseBuilder__Delay_62FBFDE1 as PromiseBuilder__Delay_62FBFDE1_1, PromiseBuilder__Run_212F1D4B as PromiseBuilder__Run_212F1D4B_1 } from "../../fable_modules/Thoth.Fetch.3.0.1/../Fable.Promise.3.2.0/Promise.fs.js";
import { promise as promise_1 } from "../../fable_modules/Thoth.Fetch.3.0.1/../Fable.Promise.3.2.0/PromiseImpl.fs.js";
import { FetchError } from "../../fable_modules/Thoth.Fetch.3.0.1/Fetch.fs.js";
import { FSharpResult$2 } from "../../fable_modules/fable-library.4.1.4/Choice.js";
import { Helper_message, Helper_fetch, Helper_withContentTypeJson, Helper_withProperties } from "../../fable_modules/Thoth.Fetch.3.0.1/./Fetch.fs.js";
import { Types_HttpRequestHeaders, Types_RequestProperties } from "../../fable_modules/Fable.Fetch.2.7.0/Fetch.fs.js";
import { keyValueList } from "../../fable_modules/fable-library.4.1.4/MapUtil.js";
import { unwrap, map, defaultArg } from "../../fable_modules/fable-library.4.1.4/Option.js";
import { Auto_generateBoxedEncoderCached_437914C6 } from "../../fable_modules/Thoth.Json.10.2.0/./Encode.fs.js";
import { list_type, bool_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { toString } from "../../fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.10.2.0/Encode.fs.js";
import { Auto_generateBoxedDecoderCached_Z6670B51 } from "../../fable_modules/Thoth.Json.10.2.0/./Decode.fs.js";
import { fromString } from "../../fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.10.2.0/Decode.fs.js";
import { Cmd_none, Cmd_OfPromise_either } from "../../fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { join, printf, toConsole } from "../../fable_modules/fable-library.4.1.4/String.js";
import { toString as toString_1 } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { createElement } from "react";
import { empty as empty_1, singleton as singleton_1, append as append_1, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { TileCss, ImageBackground, TurquoiseBackground, LoadingScreen } from "../../Common.fs.js";
import { NavBar } from "./ProposalsNavBar.fs.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { ProposalTable } from "./ProposalsTable.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { Buttons, selectedProject, Tabs } from "./ProposalsSelectedProject.fs.js";
import { PropHelpers_createOnKey } from "../../fable_modules/Feliz.2.7.0/./Properties.fs.js";
import { key_escape } from "../../fable_modules/Feliz.2.7.0/Key.fs.js";
import { EditProposalModal, DeleteProposalModal } from "./ProposalsModals.fs.js";

export function init(token, user) {
    const defaultModel = new Model(user, true, empty(), token, Proposal_get_Default(), false, false, true, new EditProposalRequest(0, false, "", empty(), empty(), "", "", "", ""));
    const initialLoad = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
        let decoder_1, decoder;
        const proposalsUrl = `${"http://localhost:1234"}/proposals`;
        return ((decoder_1 = ((decoder = Proposal_get_Decoder(), (path) => ((value) => list(uncurry2(decoder), path, value)))), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
            let data_2, caseStrategy_2, extra_2;
            return ((data_2 = false, (caseStrategy_2 = void 0, (extra_2 = void 0, (() => {
                let properties_4;
                try {
                    const properties_3 = Helper_withProperties(void 0, (properties_4 = ofArray([new Types_RequestProperties(0, ["POST"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_2, singleton(new Types_HttpRequestHeaders(5, [`Bearer ${token}`]))), 0)])]), defaultArg(map((data_1_1) => {
                        let encoder;
                        return cons(new Types_RequestProperties(2, [(encoder = Auto_generateBoxedEncoderCached_437914C6(bool_type, caseStrategy_2, extra_2), toString(0, encoder(data_1_1)))]), properties_4);
                    }, data_2), properties_4)));
                    const pr = PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Helper_fetch(proposalsUrl, properties_3).then((_arg) => {
                        let response_1, decoder_1_1, decode;
                        const response = _arg;
                        return ((response_1 = response, (decoder_1_1 = defaultArg(decoder_1, Auto_generateBoxedDecoderCached_Z6670B51(list_type(Proposal_$reflection()), unwrap(caseStrategy_2), unwrap(extra_2))), (decode = ((body_1) => fromString(uncurry2(decoder_1_1), body_1)), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (((response_1.ok) ? PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (response_1.text().then((_arg_1) => {
                            let matchValue, msg, value_1_1;
                            const body_1_1 = _arg_1;
                            return Promise.resolve((matchValue = decode(body_1_1), (matchValue.tag === 1) ? ((msg = matchValue.fields[0], new FSharpResult$2(1, [new FetchError(1, [msg])]))) : ((value_1_1 = matchValue.fields[0], new FSharpResult$2(0, [value_1_1])))));
                        })))) : (Promise.resolve(new FSharpResult$2(1, [new FetchError(2, [response_1])])))).then((_arg_1_1) => {
                            const result = _arg_1_1;
                            return Promise.resolve(result);
                        }))))))));
                    }))));
                    return pr.catch((arg_3) => (new FSharpResult$2(1, [new FetchError(3, [arg_3])])));
                }
                catch (exn) {
                    return PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Promise.resolve(new FSharpResult$2(1, [new FetchError(0, [exn])])))));
                }
            })())))).then((_arg_2) => {
                const result_1 = _arg_2;
                let response_1_1;
                if (result_1.tag === 1) {
                    const error = result_1.fields[0];
                    throw new Error(Helper_message(error));
                }
                else {
                    const response_2 = result_1.fields[0];
                    response_1_1 = response_2;
                }
                return Promise.resolve(response_1_1);
            });
        }))));
    }));
    return [defaultModel, Cmd_OfPromise_either(initialLoad, void 0, (arg_4) => (new Msg(0, [arg_4])), (arg_5) => (new Msg(1, [arg_5])))];
}

export function update(msg, model) {
    let inputRecord_1, inputRecord_2, inputRecord_3, inputRecord_4, inputRecord_5, inputRecord_6, inputRecord_7, inputRecord_8, inputRecord_9;
    switch (msg.tag) {
        case 1: {
            const res = msg.fields[0];
            toConsole(printf("%A"))(res);
            return [new Model(model.user, false, model.proposals, model.token, model.selectedProposal, model.confirmDeleteProposalModal, model.confirmEditProposalModal, model.isProjectInfoTab, model.editProject), Cmd_none()];
        }
        case 2:
            return [model, Cmd_none()];
        case 3:
            return [new Model(model.user, model.loading, model.proposals, model.token, model.selectedProposal, model.confirmDeleteProposalModal, model.confirmEditProposalModal, true, model.editProject), Cmd_none()];
        case 4:
            return [new Model(model.user, model.loading, model.proposals, model.token, model.selectedProposal, model.confirmDeleteProposalModal, model.confirmEditProposalModal, false, model.editProject), Cmd_none()];
        case 5: {
            const proposal = msg.fields[0];
            return [new Model(model.user, model.loading, model.proposals, model.token, proposal, model.confirmDeleteProposalModal, model.confirmEditProposalModal, model.isProjectInfoTab, model.editProject), Cmd_none()];
        }
        case 6:
            return [new Model(model.user, model.loading, model.proposals, model.token, Proposal_get_Default(), model.confirmDeleteProposalModal, model.confirmEditProposalModal, model.isProjectInfoTab, model.editProject), Cmd_none()];
        case 7:
            return [new Model(model.user, model.loading, model.proposals, model.token, model.selectedProposal, true, model.confirmEditProposalModal, model.isProjectInfoTab, model.editProject), Cmd_none()];
        case 8: {
            const initialLoad = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
                let data, decoder_1, decoder;
                const proposalsUrl = `${"http://localhost:1234"}/proposals`;
                return ((data = (new DeleteProposalRequest(false, model.selectedProposal.project.pid)), (decoder_1 = ((decoder = Proposal_get_Decoder(), (path) => ((value) => list(uncurry2(decoder), path, value)))), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
                    let data_2, caseStrategy_2, extra_2;
                    return ((data_2 = data, (caseStrategy_2 = void 0, (extra_2 = void 0, (() => {
                        let properties_4;
                        try {
                            const properties_3 = Helper_withProperties(void 0, (properties_4 = ofArray([new Types_RequestProperties(0, ["DELETE"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_2, singleton(new Types_HttpRequestHeaders(5, [`Bearer ${model.token}`]))), 0)])]), defaultArg(map((data_1_1) => {
                                let encoder;
                                return cons(new Types_RequestProperties(2, [(encoder = Auto_generateBoxedEncoderCached_437914C6(DeleteProposalRequest_$reflection(), caseStrategy_2, extra_2), toString(0, encoder(data_1_1)))]), properties_4);
                            }, data_2), properties_4)));
                            const pr = PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Helper_fetch(proposalsUrl, properties_3).then((_arg) => {
                                let response_1, decoder_1_1, decode;
                                const response = _arg;
                                return ((response_1 = response, (decoder_1_1 = defaultArg(decoder_1, Auto_generateBoxedDecoderCached_Z6670B51(list_type(Proposal_$reflection()), unwrap(caseStrategy_2), unwrap(extra_2))), (decode = ((body_1) => fromString(uncurry2(decoder_1_1), body_1)), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (((response_1.ok) ? PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (response_1.text().then((_arg_1) => {
                                    let matchValue, msg_1, value_1_1;
                                    const body_1_1 = _arg_1;
                                    return Promise.resolve((matchValue = decode(body_1_1), (matchValue.tag === 1) ? ((msg_1 = matchValue.fields[0], new FSharpResult$2(1, [new FetchError(1, [msg_1])]))) : ((value_1_1 = matchValue.fields[0], new FSharpResult$2(0, [value_1_1])))));
                                })))) : (Promise.resolve(new FSharpResult$2(1, [new FetchError(2, [response_1])])))).then((_arg_1_1) => {
                                    const result = _arg_1_1;
                                    return Promise.resolve(result);
                                }))))))));
                            }))));
                            return pr.catch((arg_4) => (new FSharpResult$2(1, [new FetchError(3, [arg_4])])));
                        }
                        catch (exn) {
                            return PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Promise.resolve(new FSharpResult$2(1, [new FetchError(0, [exn])])))));
                        }
                    })())))).then((_arg_2) => {
                        const result_1 = _arg_2;
                        let response_1_1;
                        if (result_1.tag === 1) {
                            const error = result_1.fields[0];
                            throw new Error(Helper_message(error));
                        }
                        else {
                            const response_2 = result_1.fields[0];
                            response_1_1 = response_2;
                        }
                        return Promise.resolve(response_1_1);
                    });
                })))));
            }));
            return [new Model(model.user, true, model.proposals, model.token, Proposal_get_Default(), false, model.confirmEditProposalModal, model.isProjectInfoTab, model.editProject), Cmd_OfPromise_either(initialLoad, void 0, (arg_5) => (new Msg(0, [arg_5])), (arg_6) => (new Msg(1, [arg_6])))];
        }
        case 9: {
            const sp = model.selectedProposal;
            const editInfo = new EditProposalRequest(sp.project.pid, false, sp.project.title, ofArray(sp.project.categories.split(",")), ofArray(sp.project.tstream.split(",")), sp.project.requirements, sp.project.descr, sp.project.skills, sp.project.meetings);
            return [new Model(model.user, model.loading, model.proposals, model.token, model.selectedProposal, model.confirmDeleteProposalModal, true, model.isProjectInfoTab, editInfo), Cmd_none()];
        }
        case 10: {
            const EditProposal = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
                let decoder_6, decoder_5;
                const editProposalsUrl = `${"http://localhost:1234"}/edit-proposal`;
                return ((decoder_6 = ((decoder_5 = Proposal_get_Decoder(), (path_1) => ((value_3) => list(uncurry2(decoder_5), path_1, value_3)))), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
                    let data_7, caseStrategy_10, extra_10;
                    return ((data_7 = model.editProject, (caseStrategy_10 = void 0, (extra_10 = void 0, (() => {
                        let properties_8;
                        try {
                            const properties_3_1 = Helper_withProperties(void 0, (properties_8 = ofArray([new Types_RequestProperties(0, ["PUT"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_7, singleton(new Types_HttpRequestHeaders(5, [`Bearer ${model.token}`]))), 0)])]), defaultArg(map((data_1_2) => {
                                let encoder_1;
                                return cons(new Types_RequestProperties(2, [(encoder_1 = Auto_generateBoxedEncoderCached_437914C6(EditProposalRequest_$reflection(), caseStrategy_10, extra_10), toString(0, encoder_1(data_1_2)))]), properties_8);
                            }, data_7), properties_8)));
                            const pr_1 = PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Helper_fetch(editProposalsUrl, properties_3_1).then((_arg_3) => {
                                let response_4, decoder_1_2, decode_1;
                                const response_3 = _arg_3;
                                return ((response_4 = response_3, (decoder_1_2 = defaultArg(decoder_6, Auto_generateBoxedDecoderCached_Z6670B51(list_type(Proposal_$reflection()), unwrap(caseStrategy_10), unwrap(extra_10))), (decode_1 = ((body_3) => fromString(uncurry2(decoder_1_2), body_3)), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (((response_4.ok) ? PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (response_4.text().then((_arg_4) => {
                                    let matchValue_1, msg_2, value_1_2;
                                    const body_1_2 = _arg_4;
                                    return Promise.resolve((matchValue_1 = decode_1(body_1_2), (matchValue_1.tag === 1) ? ((msg_2 = matchValue_1.fields[0], new FSharpResult$2(1, [new FetchError(1, [msg_2])]))) : ((value_1_2 = matchValue_1.fields[0], new FSharpResult$2(0, [value_1_2])))));
                                })))) : (Promise.resolve(new FSharpResult$2(1, [new FetchError(2, [response_4])])))).then((_arg_1_2) => {
                                    const result_2 = _arg_1_2;
                                    return Promise.resolve(result_2);
                                }))))))));
                            }))));
                            return pr_1.catch((arg_10) => (new FSharpResult$2(1, [new FetchError(3, [arg_10])])));
                        }
                        catch (exn_1) {
                            return PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Promise.resolve(new FSharpResult$2(1, [new FetchError(0, [exn_1])])))));
                        }
                    })())))).then((_arg_5) => {
                        const result_3 = _arg_5;
                        let response_1_2;
                        if (result_3.tag === 1) {
                            const error_1 = result_3.fields[0];
                            throw new Error(Helper_message(error_1));
                        }
                        else {
                            const response_5 = result_3.fields[0];
                            response_1_2 = response_5;
                        }
                        return Promise.resolve(response_1_2);
                    });
                }))));
            }));
            return [new Model(model.user, true, model.proposals, model.token, Proposal_get_Default(), false, model.confirmEditProposalModal, model.isProjectInfoTab, model.editProject), Cmd_OfPromise_either(EditProposal, void 0, (arg_11) => (new Msg(0, [arg_11])), (arg_12) => (new Msg(1, [arg_12])))];
        }
        case 11:
            return [new Model(model.user, model.loading, model.proposals, model.token, model.selectedProposal, false, false, model.isProjectInfoTab, model.editProject), Cmd_none()];
        case 12: {
            const rank = msg.fields[2] | 0;
            const ev = msg.fields[0];
            const applicantId = msg.fields[1];
            const applicantIndex = findIndex((applicant) => (applicant.eeid === applicantId), model.selectedProposal.applicants) | 0;
            const applicant_2 = find((applicant_1) => (applicant_1.eeid === applicantId), model.selectedProposal.applicants);
            const updatedApplicant = new Applicant(applicant_2.eeid, applicant_2.forenames, applicant_2.preference, toString_1(ev.target.value));
            const updatedApplicantList = updateAt(applicantIndex, updatedApplicant, model.selectedProposal.applicants);
            const updatedProposal = new Proposal(model.selectedProposal.project, updatedApplicantList);
            const EditSuitability = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
                let decoder_11, decoder_10;
                const editSuitabilityUrl = `${"http://localhost:1234"}/edit-suitability`;
                const data_10 = new EditSuitabilityRequest(applicantId, rank, toString_1(ev.target.value), false);
                return ((decoder_11 = ((decoder_10 = Proposal_get_Decoder(), (path_2) => ((value_8) => list(uncurry2(decoder_10), path_2, value_8)))), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
                    let data_13, caseStrategy_18, extra_18;
                    return ((data_13 = data_10, (caseStrategy_18 = void 0, (extra_18 = void 0, (() => {
                        let properties_12;
                        try {
                            const properties_3_2 = Helper_withProperties(void 0, (properties_12 = ofArray([new Types_RequestProperties(0, ["PUT"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_13, singleton(new Types_HttpRequestHeaders(5, [`Bearer ${model.token}`]))), 0)])]), defaultArg(map((data_1_3) => {
                                let encoder_2;
                                return cons(new Types_RequestProperties(2, [(encoder_2 = Auto_generateBoxedEncoderCached_437914C6(EditSuitabilityRequest_$reflection(), caseStrategy_18, extra_18), toString(0, encoder_2(data_1_3)))]), properties_12);
                            }, data_13), properties_12)));
                            const pr_2 = PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Helper_fetch(editSuitabilityUrl, properties_3_2).then((_arg_6) => {
                                let response_7, decoder_1_3, decode_2;
                                const response_6 = _arg_6;
                                return ((response_7 = response_6, (decoder_1_3 = defaultArg(decoder_11, Auto_generateBoxedDecoderCached_Z6670B51(list_type(Proposal_$reflection()), unwrap(caseStrategy_18), unwrap(extra_18))), (decode_2 = ((body_5) => fromString(uncurry2(decoder_1_3), body_5)), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (((response_7.ok) ? PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (response_7.text().then((_arg_7) => {
                                    let matchValue_2, msg_3, value_1_3;
                                    const body_1_3 = _arg_7;
                                    return Promise.resolve((matchValue_2 = decode_2(body_1_3), (matchValue_2.tag === 1) ? ((msg_3 = matchValue_2.fields[0], new FSharpResult$2(1, [new FetchError(1, [msg_3])]))) : ((value_1_3 = matchValue_2.fields[0], new FSharpResult$2(0, [value_1_3])))));
                                })))) : (Promise.resolve(new FSharpResult$2(1, [new FetchError(2, [response_7])])))).then((_arg_1_3) => {
                                    const result_4 = _arg_1_3;
                                    return Promise.resolve(result_4);
                                }))))))));
                            }))));
                            return pr_2.catch((arg_16) => (new FSharpResult$2(1, [new FetchError(3, [arg_16])])));
                        }
                        catch (exn_2) {
                            return PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Promise.resolve(new FSharpResult$2(1, [new FetchError(0, [exn_2])])))));
                        }
                    })())))).then((_arg_8) => {
                        const result_5 = _arg_8;
                        let response_1_3;
                        if (result_5.tag === 1) {
                            const error_2 = result_5.fields[0];
                            throw new Error(Helper_message(error_2));
                        }
                        else {
                            const response_8 = result_5.fields[0];
                            response_1_3 = response_8;
                        }
                        return Promise.resolve(response_1_3);
                    });
                }))));
            }));
            return [new Model(model.user, true, model.proposals, model.token, updatedProposal, model.confirmDeleteProposalModal, model.confirmEditProposalModal, model.isProjectInfoTab, model.editProject), Cmd_OfPromise_either(EditSuitability, void 0, (arg_17) => (new Msg(0, [arg_17])), (arg_18) => (new Msg(1, [arg_18])))];
        }
        case 13: {
            const title = msg.fields[0];
            return [new Model(model.user, model.loading, model.proposals, model.token, model.selectedProposal, model.confirmDeleteProposalModal, model.confirmEditProposalModal, model.isProjectInfoTab, (inputRecord_1 = model.editProject, new EditProposalRequest(inputRecord_1.pid, inputRecord_1.isStudent, title, inputRecord_1.categories, inputRecord_1.streams, inputRecord_1.requirements, inputRecord_1.description, inputRecord_1.skills, inputRecord_1.meetings))), Cmd_none()];
        }
        case 14: {
            const tag = msg.fields[0];
            const sc = model.editProject.categories;
            if (exists((c) => (c === tag), sc)) {
                return [new Model(model.user, model.loading, model.proposals, model.token, model.selectedProposal, model.confirmDeleteProposalModal, model.confirmEditProposalModal, model.isProjectInfoTab, (inputRecord_2 = model.editProject, new EditProposalRequest(inputRecord_2.pid, inputRecord_2.isStudent, inputRecord_2.title, filter((c_1) => (c_1 !== tag), sc), inputRecord_2.streams, inputRecord_2.requirements, inputRecord_2.description, inputRecord_2.skills, inputRecord_2.meetings))), Cmd_none()];
            }
            else {
                return [new Model(model.user, model.loading, model.proposals, model.token, model.selectedProposal, model.confirmDeleteProposalModal, model.confirmEditProposalModal, model.isProjectInfoTab, (inputRecord_3 = model.editProject, new EditProposalRequest(inputRecord_3.pid, inputRecord_3.isStudent, inputRecord_3.title, append(sc, singleton(tag)), inputRecord_3.streams, inputRecord_3.requirements, inputRecord_3.description, inputRecord_3.skills, inputRecord_3.meetings))), Cmd_none()];
            }
        }
        case 15: {
            const tag_1 = msg.fields[0];
            const ss = model.editProject.streams;
            if (exists((c_2) => (c_2 === tag_1), ss)) {
                return [new Model(model.user, model.loading, model.proposals, model.token, model.selectedProposal, model.confirmDeleteProposalModal, model.confirmEditProposalModal, model.isProjectInfoTab, (inputRecord_4 = model.editProject, new EditProposalRequest(inputRecord_4.pid, inputRecord_4.isStudent, inputRecord_4.title, inputRecord_4.categories, filter((c_3) => (c_3 !== tag_1), ss), inputRecord_4.requirements, inputRecord_4.description, inputRecord_4.skills, inputRecord_4.meetings))), Cmd_none()];
            }
            else {
                return [new Model(model.user, model.loading, model.proposals, model.token, model.selectedProposal, model.confirmDeleteProposalModal, model.confirmEditProposalModal, model.isProjectInfoTab, (inputRecord_5 = model.editProject, new EditProposalRequest(inputRecord_5.pid, inputRecord_5.isStudent, inputRecord_5.title, inputRecord_5.categories, append(ss, singleton(tag_1)), inputRecord_5.requirements, inputRecord_5.description, inputRecord_5.skills, inputRecord_5.meetings))), Cmd_none()];
            }
        }
        case 16: {
            const requirements = msg.fields[0];
            return [new Model(model.user, model.loading, model.proposals, model.token, model.selectedProposal, model.confirmDeleteProposalModal, model.confirmEditProposalModal, model.isProjectInfoTab, (inputRecord_6 = model.editProject, new EditProposalRequest(inputRecord_6.pid, inputRecord_6.isStudent, inputRecord_6.title, inputRecord_6.categories, inputRecord_6.streams, requirements, inputRecord_6.description, inputRecord_6.skills, inputRecord_6.meetings))), Cmd_none()];
        }
        case 18: {
            const description = msg.fields[0];
            return [new Model(model.user, model.loading, model.proposals, model.token, model.selectedProposal, model.confirmDeleteProposalModal, model.confirmEditProposalModal, model.isProjectInfoTab, (inputRecord_7 = model.editProject, new EditProposalRequest(inputRecord_7.pid, inputRecord_7.isStudent, inputRecord_7.title, inputRecord_7.categories, inputRecord_7.streams, inputRecord_7.requirements, description, inputRecord_7.skills, inputRecord_7.meetings))), Cmd_none()];
        }
        case 17: {
            const skills = msg.fields[0];
            return [new Model(model.user, model.loading, model.proposals, model.token, model.selectedProposal, model.confirmDeleteProposalModal, model.confirmEditProposalModal, model.isProjectInfoTab, (inputRecord_8 = model.editProject, new EditProposalRequest(inputRecord_8.pid, inputRecord_8.isStudent, inputRecord_8.title, inputRecord_8.categories, inputRecord_8.streams, inputRecord_8.requirements, inputRecord_8.description, skills, inputRecord_8.meetings))), Cmd_none()];
        }
        case 19: {
            const meetings = msg.fields[0];
            return [new Model(model.user, model.loading, model.proposals, model.token, model.selectedProposal, model.confirmDeleteProposalModal, model.confirmEditProposalModal, model.isProjectInfoTab, (inputRecord_9 = model.editProject, new EditProposalRequest(inputRecord_9.pid, inputRecord_9.isStudent, inputRecord_9.title, inputRecord_9.categories, inputRecord_9.streams, inputRecord_9.requirements, inputRecord_9.description, inputRecord_9.skills, meetings))), Cmd_none()];
        }
        default: {
            const proposals = msg.fields[0];
            return [new Model(model.user, false, proposals, model.token, model.selectedProposal, model.confirmDeleteProposalModal, model.confirmEditProposalModal, model.isProjectInfoTab, model.editProject), Cmd_none()];
        }
    }
}

export function view(model, dispatch) {
    let elems_4;
    return createElement("body", createObj(ofArray([["style", {
        height: 100 + "vh",
        position: "relative",
    }], (elems_4 = toList(delay(() => append_1(model.loading ? singleton_1(LoadingScreen) : empty_1(), delay(() => append_1(singleton_1(TurquoiseBackground(0.5)), delay(() => append_1(singleton_1(ImageBackground), delay(() => append_1(singleton_1(NavBar(dispatch, model.user)), delay(() => {
        let elems_3, elems, elems_1;
        return singleton_1(createElement("div", createObj(Helpers_combineClasses("columns", ofArray([["style", {
            height: 90 + "vh",
            margin: 1 + "%",
        }], (elems_3 = [createElement("div", createObj(Helpers_combineClasses("column", ofArray([["style", createObj(TileCss)], (elems = [createElement("label", createObj(Helpers_combineClasses("label", singleton(["children", "Proposals"])))), ProposalTable(model, dispatch)], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))), createElement("div", createObj(Helpers_combineClasses("column", singleton(["className", join(" ", ["is-0"])])))), createElement("div", createObj(Helpers_combineClasses("column", ofArray([["style", createObj(TileCss)], (elems_1 = toList(delay(() => {
            if (model.selectedProposal.project.pid === 0) {
                return empty_1();
            }
            else {
                return append_1(singleton_1(Tabs(model, dispatch)), delay(() => append_1(singleton_1(selectedProject(model, dispatch)), delay(() => singleton_1(Buttons(model, dispatch))))));
            }
        })), ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), createElement("div", createObj(Helpers_combineClasses("modal", toList(delay(() => {
            const cdpm = model.confirmDeleteProposalModal;
            const cscm = model.confirmEditProposalModal;
            return append_1((cdpm ? true : cscm) ? singleton_1(["className", "is-active"]) : empty_1(), delay(() => append_1(singleton_1(["onKeyUp", (ev_1) => {
                PropHelpers_createOnKey(key_escape, (ev) => {
                    dispatch(new Msg(11, []));
                }, ev_1);
            }]), delay(() => append_1(singleton_1(["className", join(" ", ["scrollbar", "is-large"])]), delay(() => {
                let elems_2;
                return singleton_1((elems_2 = toList(delay(() => append_1(singleton_1(createElement("div", createObj(Helpers_combineClasses("modal-background", empty())))), delay(() => {
                    if (cdpm) {
                        return singleton_1(DeleteProposalModal(model, dispatch));
                    }
                    else if (cscm) {
                        return singleton_1(EditProposalModal(model, dispatch));
                    }
                    else {
                        return empty_1();
                    }
                })))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))]));
            }))))));
        })))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])])))));
    })))))))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])])));
}

//# sourceMappingURL=Proposals.fs.js.map
