import { PreferenceResponse, SavePreferenceRequest_$reflection, SavePreferenceRequest, PreferenceResponse_$reflection, PreferenceResponse_get_Decoder, Project_get_Default, PreferenceResponse_get_Default } from "../../../../Shared/Shared.fs.js";
import { fold, updateAt, cons, ofArray, singleton, empty } from "../../fable_modules/fable-library.4.1.4/List.js";
import { Msg, Model } from "./PreferencesTypes.fs.js";
import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "../../fable_modules/Fable.Promise.3.2.0/Promise.fs.js";
import { promise } from "../../fable_modules/Fable.Promise.3.2.0/PromiseImpl.fs.js";
import { PromiseBuilder__Delay_62FBFDE1 as PromiseBuilder__Delay_62FBFDE1_1, PromiseBuilder__Run_212F1D4B as PromiseBuilder__Run_212F1D4B_1 } from "../../fable_modules/Thoth.Fetch.3.0.1/../Fable.Promise.3.2.0/Promise.fs.js";
import { promise as promise_1 } from "../../fable_modules/Thoth.Fetch.3.0.1/../Fable.Promise.3.2.0/PromiseImpl.fs.js";
import { FetchError } from "../../fable_modules/Thoth.Fetch.3.0.1/Fetch.fs.js";
import { FSharpResult$2 } from "../../fable_modules/fable-library.4.1.4/Choice.js";
import { Helper_message, Helper_fetch, Helper_withContentTypeJson, Helper_withProperties } from "../../fable_modules/Thoth.Fetch.3.0.1/./Fetch.fs.js";
import { Types_HttpRequestHeaders, Types_RequestProperties } from "../../fable_modules/Fable.Fetch.2.7.0/Fetch.fs.js";
import { keyValueList } from "../../fable_modules/fable-library.4.1.4/MapUtil.js";
import { unwrap, map, defaultArg } from "../../fable_modules/fable-library.4.1.4/Option.js";
import { Auto_generateBoxedEncoderCached_437914C6 } from "../../fable_modules/Thoth.Json.10.2.0/./Encode.fs.js";
import { obj_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { toString } from "../../fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.10.2.0/Encode.fs.js";
import { Auto_generateBoxedDecoderCached_Z6670B51 } from "../../fable_modules/Thoth.Json.10.2.0/./Decode.fs.js";
import { fromString } from "../../fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.10.2.0/Decode.fs.js";
import { createObj, uncurry2 } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { Cmd_none, Cmd_OfPromise_either } from "../../fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { join, printf, toConsole } from "../../fable_modules/fable-library.4.1.4/String.js";
import { Cmd_ofEffect } from "../../fable_modules/Feliz.Router.4.0.0/../Fable.Elmish.4.1.0/cmd.fs.js";
import { RouterModule_nav } from "../../fable_modules/Feliz.Router.4.0.0/./Router.fs.js";
import { swapDown, swapUp, updatePreferenceRanks, getPreferenceEqualList, removePreference } from "./PreferencesHelpers.fs.js";
import { createElement } from "react";
import { empty as empty_1, singleton as singleton_1, append, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { TileCss, ImageBackground, TurquoiseBackground, LoadingScreen } from "../../Common.fs.js";
import { NavBar } from "./PreferencesNavBar.fs.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { saveChangesButtons, Comments, PreferenceTable, Tabs } from "./PreferencesManage.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { removeProjectButtons, selectedProject as selectedProject_1 } from "./PreferencesSelectedProject.fs.js";
import { PropHelpers_createOnKey } from "../../fable_modules/Feliz.2.7.0/./Properties.fs.js";
import { key_escape } from "../../fable_modules/Feliz.2.7.0/Key.fs.js";
import { saveChangesModal, removePreferenceModal, addPreferenceModal } from "./PreferencesModals.fs.js";

export function init(token) {
    const defaultModel = new Model(true, PreferenceResponse_get_Default(), PreferenceResponse_get_Default(), empty(), token, Project_get_Default(), 0, false, false, false, true);
    const initialLoad = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
        let decoder;
        const preferenceUrl = `${"http://localhost:1234"}/preferences`;
        return ((decoder = PreferenceResponse_get_Decoder(), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
            let data_2, caseStrategy_2, extra_2;
            return ((data_2 = void 0, (caseStrategy_2 = void 0, (extra_2 = void 0, (() => {
                let properties_4;
                try {
                    const properties_3 = Helper_withProperties(void 0, (properties_4 = ofArray([new Types_RequestProperties(0, ["GET"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_2, singleton(new Types_HttpRequestHeaders(5, [`Bearer ${token}`]))), 0)])]), defaultArg(map((data_1_1) => {
                        let encoder;
                        return cons(new Types_RequestProperties(2, [(encoder = Auto_generateBoxedEncoderCached_437914C6(obj_type, caseStrategy_2, extra_2), toString(0, encoder(data_1_1)))]), properties_4);
                    }, data_2), properties_4)));
                    const pr = PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Helper_fetch(preferenceUrl, properties_3).then((_arg) => {
                        let response_1, decoder_1_1, decode;
                        const response = _arg;
                        return ((response_1 = response, (decoder_1_1 = defaultArg(decoder, Auto_generateBoxedDecoderCached_Z6670B51(PreferenceResponse_$reflection(), unwrap(caseStrategy_2), unwrap(extra_2))), (decode = ((body_1) => fromString(uncurry2(decoder_1_1), body_1)), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (((response_1.ok) ? PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (response_1.text().then((_arg_1) => {
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
    let xs, inputRecord, inputRecord_1;
    switch (msg.tag) {
        case 1: {
            const res = msg.fields[0];
            toConsole(printf("%A"))(res);
            return [new Model(false, model.preference, model.unsavedPreference, model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), Cmd_none()];
        }
        case 2:
            return [model, Cmd_none()];
        case 3: {
            const rank = msg.fields[1] | 0;
            const projectInfo = msg.fields[0];
            return [new Model(model.loading, model.preference, model.unsavedPreference, model.preferenceEqualList, model.token, projectInfo, rank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), Cmd_none()];
        }
        case 4:
            return [new Model(model.loading, model.preference, model.unsavedPreference, model.preferenceEqualList, model.token, Project_get_Default(), 0, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), Cmd_none()];
        case 5:
            return [new Model(model.loading, model.preference, model.unsavedPreference, model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, true, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), Cmd_none()];
        case 6:
            return [new Model(model.loading, model.preference, model.unsavedPreference, model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, false, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), (xs = ["home-student", "projects"], Cmd_ofEffect((_arg) => {
                RouterModule_nav(ofArray(xs), 1, 2);
            }))];
        case 7:
            return [new Model(model.loading, model.preference, model.unsavedPreference, model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, true, model.confirmSaveChangesModal, model.isPreferenceTab), Cmd_none()];
        case 8:
            return [removePreference(model), Cmd_none()];
        case 9:
            return [new Model(model.loading, model.preference, model.unsavedPreference, model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, true, model.isPreferenceTab), Cmd_none()];
        case 10: {
            const p = model.preference;
            const up = model.unsavedPreference;
            const data = new SavePreferenceRequest(model.unsavedPreference.comments, model.unsavedPreference.doc, ofArray([p.p1.pid, p.p2.pid, p.p3.pid, p.p4.pid, p.p5.pid, p.p6.pid, p.p7.pid, p.p8.pid, p.p9.pid, p.p10.pid]), ofArray([up.p1.pid, up.p2.pid, up.p3.pid, up.p4.pid, up.p5.pid, up.p6.pid, up.p7.pid, up.p8.pid, up.p9.pid, up.p10.pid]), ofArray([up.n1, up.n2, up.n3, up.n4, up.n5, up.n6, up.n7, up.n8, up.n9, up.n10]));
            const savePreference = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
                let decoder;
                const savePreferenceUrl = `${"http://localhost:1234"}/save-preferences`;
                return ((decoder = PreferenceResponse_get_Decoder(), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
                    let data_3, caseStrategy_2, extra_2;
                    return ((data_3 = data, (caseStrategy_2 = void 0, (extra_2 = void 0, (() => {
                        let properties_4;
                        try {
                            const properties_3 = Helper_withProperties(void 0, (properties_4 = ofArray([new Types_RequestProperties(0, ["PUT"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_3, singleton(new Types_HttpRequestHeaders(5, [`Bearer ${model.token}`]))), 0)])]), defaultArg(map((data_1_1) => {
                                let encoder;
                                return cons(new Types_RequestProperties(2, [(encoder = Auto_generateBoxedEncoderCached_437914C6(SavePreferenceRequest_$reflection(), caseStrategy_2, extra_2), toString(0, encoder(data_1_1)))]), properties_4);
                            }, data_3), properties_4)));
                            const pr = PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Helper_fetch(savePreferenceUrl, properties_3).then((_arg_1) => {
                                let response_1, decoder_1_1, decode;
                                const response = _arg_1;
                                return ((response_1 = response, (decoder_1_1 = defaultArg(decoder, Auto_generateBoxedDecoderCached_Z6670B51(PreferenceResponse_$reflection(), unwrap(caseStrategy_2), unwrap(extra_2))), (decode = ((body_1) => fromString(uncurry2(decoder_1_1), body_1)), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (((response_1.ok) ? PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (response_1.text().then((_arg_2) => {
                                    let matchValue, msg_1, value_1_1;
                                    const body_1_1 = _arg_2;
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
                    })())))).then((_arg_3) => {
                        const result_1 = _arg_3;
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
            return [new Model(true, model.preference, model.unsavedPreference, model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, false, model.isPreferenceTab), Cmd_OfPromise_either(savePreference, void 0, (arg_5) => (new Msg(0, [arg_5])), (arg_6) => (new Msg(1, [arg_6])))];
        }
        case 11:
            return [new Model(model.loading, model.preference, model.unsavedPreference, model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, false, false, false, model.isPreferenceTab), Cmd_none()];
        case 12: {
            const prefEqualLst_1 = getPreferenceEqualList(model.preference);
            return [new Model(model.loading, model.preference, model.preference, prefEqualLst_1, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), Cmd_none()];
        }
        case 14: {
            const c = msg.fields[0];
            return [new Model(model.loading, model.preference, (inputRecord = model.unsavedPreference, new PreferenceResponse(inputRecord.eeid, inputRecord.p1, inputRecord.p2, inputRecord.p3, inputRecord.p4, inputRecord.p5, inputRecord.p6, inputRecord.p7, inputRecord.p8, inputRecord.p9, inputRecord.p10, inputRecord.n1, inputRecord.n2, inputRecord.n3, inputRecord.n4, inputRecord.n5, inputRecord.n6, inputRecord.n7, inputRecord.n8, inputRecord.n9, inputRecord.n10, inputRecord.s1, inputRecord.s2, inputRecord.s3, inputRecord.s4, inputRecord.s5, inputRecord.s6, inputRecord.s7, inputRecord.s8, inputRecord.s9, inputRecord.s10, inputRecord.upddate, c, inputRecord.feedback, inputRecord.doc)), model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), Cmd_none()];
        }
        case 15: {
            const prefEqualChange = msg.fields[1];
            const index = msg.fields[0] | 0;
            const newPrefEqualList = updateAt(index, prefEqualChange, model.preferenceEqualList);
            const newModel = fold((tupledArg, isPrefEqual) => updatePreferenceRanks(tupledArg[0], tupledArg[1], tupledArg[2], isPrefEqual), [model, 2, 1], newPrefEqualList)[0];
            return [new Model(newModel.loading, newModel.preference, newModel.unsavedPreference, newPrefEqualList, newModel.token, newModel.selectedProject, newModel.selectedProjectRank, newModel.confirmAddProjectModal, newModel.confirmRemoveProjectModal, newModel.confirmSaveChangesModal, newModel.isPreferenceTab), Cmd_none()];
        }
        case 13:
            return [new Model(model.loading, model.preference, (inputRecord_1 = model.unsavedPreference, new PreferenceResponse(inputRecord_1.eeid, inputRecord_1.p1, inputRecord_1.p2, inputRecord_1.p3, inputRecord_1.p4, inputRecord_1.p5, inputRecord_1.p6, inputRecord_1.p7, inputRecord_1.p8, inputRecord_1.p9, inputRecord_1.p10, inputRecord_1.n1, inputRecord_1.n2, inputRecord_1.n3, inputRecord_1.n4, inputRecord_1.n5, inputRecord_1.n6, inputRecord_1.n7, inputRecord_1.n8, inputRecord_1.n9, inputRecord_1.n10, inputRecord_1.s1, inputRecord_1.s2, inputRecord_1.s3, inputRecord_1.s4, inputRecord_1.s5, inputRecord_1.s6, inputRecord_1.s7, inputRecord_1.s8, inputRecord_1.s9, inputRecord_1.s10, inputRecord_1.upddate, inputRecord_1.comments, inputRecord_1.feedback, !model.unsavedPreference.doc)), model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), Cmd_none()];
        case 16:
            return [new Model(model.loading, model.preference, model.unsavedPreference, model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, true), Cmd_none()];
        case 17:
            return [new Model(model.loading, model.preference, model.unsavedPreference, model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, false), Cmd_none()];
        case 18: {
            const index_1 = msg.fields[0] | 0;
            return [swapUp(model, index_1), Cmd_none()];
        }
        case 19: {
            const index_2 = msg.fields[0] | 0;
            return [swapDown(model, index_2), Cmd_none()];
        }
        default: {
            const preference = msg.fields[0];
            const prefEqualLst = getPreferenceEqualList(preference);
            return [new Model(false, preference, preference, prefEqualLst, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), Cmd_none()];
        }
    }
}

export function view(model, dispatch) {
    let elems_4;
    return createElement("body", createObj(ofArray([["style", {
        height: 100 + "vh",
        position: "relative",
    }], (elems_4 = toList(delay(() => append(model.loading ? singleton_1(LoadingScreen) : empty_1(), delay(() => append(singleton_1(TurquoiseBackground(0.5)), delay(() => append(singleton_1(ImageBackground), delay(() => append(singleton_1(NavBar(dispatch)), delay(() => {
        let elems_3, elems, elems_1;
        return singleton_1(createElement("div", createObj(Helpers_combineClasses("columns", ofArray([["style", {
            height: 90 + "vh",
            margin: 1 + "%",
        }], (elems_3 = [createElement("div", createObj(Helpers_combineClasses("column", ofArray([["style", createObj(TileCss)], (elems = toList(delay(() => append(singleton_1(Tabs(model, dispatch)), delay(() => append(model.isPreferenceTab ? singleton_1(PreferenceTable(model, dispatch)) : singleton_1(Comments(model, dispatch)), delay(() => singleton_1(saveChangesButtons(model, dispatch)))))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))), createElement("div", createObj(Helpers_combineClasses("column", singleton(["className", join(" ", ["is-0"])])))), createElement("div", createObj(Helpers_combineClasses("column", ofArray([["style", createObj(TileCss)], (elems_1 = toList(delay(() => {
            if (model.selectedProjectRank === 0) {
                return empty_1();
            }
            else {
                return append(singleton_1(selectedProject_1(model)), delay(() => singleton_1(removeProjectButtons(model, dispatch))));
            }
        })), ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), createElement("div", createObj(Helpers_combineClasses("modal", toList(delay(() => {
            const capm = model.confirmAddProjectModal;
            const crpm = model.confirmRemoveProjectModal;
            const cscm = model.confirmSaveChangesModal;
            return append(((capm ? true : crpm) ? true : cscm) ? singleton_1(["className", "is-active"]) : empty_1(), delay(() => append(singleton_1(["onKeyUp", (ev_1) => {
                PropHelpers_createOnKey(key_escape, (ev) => {
                    dispatch(new Msg(11, []));
                }, ev_1);
            }]), delay(() => append(singleton_1(["className", join(" ", ["scrollbar", "is-large"])]), delay(() => {
                let elems_2;
                return singleton_1((elems_2 = toList(delay(() => append(singleton_1(createElement("div", createObj(Helpers_combineClasses("modal-background", empty())))), delay(() => {
                    if (capm) {
                        return singleton_1(addPreferenceModal(model, dispatch));
                    }
                    else if (crpm) {
                        return singleton_1(removePreferenceModal(model, dispatch));
                    }
                    else if (cscm) {
                        return singleton_1(saveChangesModal(model, dispatch));
                    }
                    else {
                        return empty_1();
                    }
                })))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))]));
            }))))));
        })))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])])))));
    })))))))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])])));
}

//# sourceMappingURL=Preferences.fs.js.map
