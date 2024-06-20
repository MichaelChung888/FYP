import { Union, Record } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { obj_type, union_type, class_type, record_type, int32_type, string_type, list_type, bool_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { getFormattedCategory, SavePreferenceRequest_$reflection, SavePreferenceRequest, PreferenceResponse_get_Decoder, PreferenceResponse_get_Default, PreferenceResponse, Project_get_Default, Project_$reflection, PreferenceResponse_$reflection } from "../../../../Shared/Shared.fs.js";
import { fold, updateAt, cons, singleton, empty, map, zip, ofArray } from "../../fable_modules/fable-library.4.1.4/List.js";
import { int32ToString, createObj, uncurry2, equals } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { map as map_2, empty as empty_1, singleton as singleton_1, append, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "../../fable_modules/fable-library.4.1.4/Range.js";
import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "../../fable_modules/Fable.Promise.3.2.0/Promise.fs.js";
import { promise } from "../../fable_modules/Fable.Promise.3.2.0/PromiseImpl.fs.js";
import { PromiseBuilder__Delay_62FBFDE1 as PromiseBuilder__Delay_62FBFDE1_1, PromiseBuilder__Run_212F1D4B as PromiseBuilder__Run_212F1D4B_1 } from "../../fable_modules/Thoth.Fetch.3.0.1/../Fable.Promise.3.2.0/Promise.fs.js";
import { promise as promise_1 } from "../../fable_modules/Thoth.Fetch.3.0.1/../Fable.Promise.3.2.0/PromiseImpl.fs.js";
import { FetchError } from "../../fable_modules/Thoth.Fetch.3.0.1/Fetch.fs.js";
import { FSharpResult$2 } from "../../fable_modules/fable-library.4.1.4/Choice.js";
import { Helper_message, Helper_fetch, Helper_withContentTypeJson, Helper_withProperties } from "../../fable_modules/Thoth.Fetch.3.0.1/./Fetch.fs.js";
import { Types_HttpRequestHeaders, Types_RequestProperties } from "../../fable_modules/Fable.Fetch.2.7.0/Fetch.fs.js";
import { keyValueList } from "../../fable_modules/fable-library.4.1.4/MapUtil.js";
import { unwrap, map as map_1, defaultArg } from "../../fable_modules/fable-library.4.1.4/Option.js";
import { Auto_generateBoxedEncoderCached_437914C6 } from "../../fable_modules/Thoth.Json.10.2.0/./Encode.fs.js";
import { toString } from "../../fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.10.2.0/Encode.fs.js";
import { Auto_generateBoxedDecoderCached_Z6670B51 } from "../../fable_modules/Thoth.Json.10.2.0/./Decode.fs.js";
import { fromString } from "../../fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.10.2.0/Decode.fs.js";
import { Cmd_none, Cmd_OfPromise_either } from "../../fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { join, printf, toConsole } from "../../fable_modules/fable-library.4.1.4/String.js";
import { Cmd_ofEffect } from "../../fable_modules/Feliz.Router.4.0.0/../Fable.Elmish.4.1.0/cmd.fs.js";
import { RouterModule_nav } from "../../fable_modules/Feliz.Router.4.0.0/./Router.fs.js";
import { createElement } from "react";
import { rgba } from "../../fable_modules/Feliz.2.7.0/Colors.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/./ElementBuilders.fs.js";
import { PropHelpers_createOnKey } from "../../fable_modules/Feliz.2.7.0/./Properties.fs.js";
import { key_escape } from "../../fable_modules/Feliz.2.7.0/Key.fs.js";

export class Model extends Record {
    constructor(loading, preference, unsavedPreference, preferenceEqualList, token, selectedProject, selectedProjectRank, confirmAddProjectModal, confirmRemoveProjectModal, confirmSaveChangesModal, isPreferenceTab) {
        super();
        this.loading = loading;
        this.preference = preference;
        this.unsavedPreference = unsavedPreference;
        this.preferenceEqualList = preferenceEqualList;
        this.token = token;
        this.selectedProject = selectedProject;
        this.selectedProjectRank = (selectedProjectRank | 0);
        this.confirmAddProjectModal = confirmAddProjectModal;
        this.confirmRemoveProjectModal = confirmRemoveProjectModal;
        this.confirmSaveChangesModal = confirmSaveChangesModal;
        this.isPreferenceTab = isPreferenceTab;
    }
}

export function Model_$reflection() {
    return record_type("Preferences.Model", [], Model, () => [["loading", bool_type], ["preference", PreferenceResponse_$reflection()], ["unsavedPreference", PreferenceResponse_$reflection()], ["preferenceEqualList", list_type(bool_type)], ["token", string_type], ["selectedProject", Project_$reflection()], ["selectedProjectRank", int32_type], ["confirmAddProjectModal", bool_type], ["confirmRemoveProjectModal", bool_type], ["confirmSaveChangesModal", bool_type], ["isPreferenceTab", bool_type]]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SuccessLoad", "Error", "Logout", "OpenProject", "CloseProject", "ConfirmAddProject", "AddPreference", "ConfirmRemoveProject", "RemovePreference", "ConfirmSaveChanges", "SaveChanges", "CloseModal", "DiscardChanges", "DocChange", "CommentsChange", "PreferenceEqualChange", "PreferenceTab", "CommentsTab", "SwapUp", "SwapDown"];
    }
}

export function Msg_$reflection() {
    return union_type("Preferences.Msg", [], Msg, () => [[["Item", PreferenceResponse_$reflection()]], [["Item", class_type("System.Exception")]], [], [["Item1", Project_$reflection()], ["Item2", int32_type]], [], [], [], [], [], [], [], [], [], [], [["Item", string_type]], [["Item1", int32_type], ["Item2", bool_type]], [], [], [["Item", int32_type]], [["Item", int32_type]]]);
}

export function checkPreferenceChange(model) {
    const p = model.preference;
    const up = model.unsavedPreference;
    const pList = ofArray([p.p1.pid, p.p2.pid, p.p3.pid, p.p4.pid, p.p5.pid, p.p6.pid, p.p7.pid, p.p8.pid, p.p9.pid, p.p10.pid]);
    const upList = ofArray([up.p1.pid, up.p2.pid, up.p3.pid, up.p4.pid, up.p5.pid, up.p6.pid, up.p7.pid, up.p8.pid, up.p9.pid, up.p10.pid]);
    const nList = ofArray([p.n1, p.n2, p.n3, p.n4, p.n5, p.n6, p.n7, p.n8, p.n9, p.n10]);
    const unList = ofArray([up.n1, up.n2, up.n3, up.n4, up.n5, up.n6, up.n7, up.n8, up.n9, up.n10]);
    if ((!equals(pList, upList) ? true : !equals(nList, unList)) ? true : (p.comments !== up.comments)) {
        return true;
    }
    else {
        return p.doc !== up.doc;
    }
}

export function removePreference(model) {
    let inputRecord, inputRecord_1, inputRecord_2, inputRecord_3, inputRecord_4, inputRecord_5, inputRecord_6, inputRecord_7, inputRecord_8, inputRecord_9;
    const rank = model.selectedProjectRank | 0;
    const newModel = new Model(model.loading, model.preference, model.unsavedPreference, model.preferenceEqualList, model.token, Project_get_Default(), 0, model.confirmAddProjectModal, false, model.confirmSaveChangesModal, model.isPreferenceTab);
    switch (rank) {
        case 1:
            return new Model(newModel.loading, newModel.preference, (inputRecord = newModel.unsavedPreference, new PreferenceResponse(inputRecord.eeid, Project_get_Default(), inputRecord.p2, inputRecord.p3, inputRecord.p4, inputRecord.p5, inputRecord.p6, inputRecord.p7, inputRecord.p8, inputRecord.p9, inputRecord.p10, inputRecord.n1, inputRecord.n2, inputRecord.n3, inputRecord.n4, inputRecord.n5, inputRecord.n6, inputRecord.n7, inputRecord.n8, inputRecord.n9, inputRecord.n10, inputRecord.upddate, inputRecord.comments, inputRecord.feedback, inputRecord.doc)), newModel.preferenceEqualList, newModel.token, newModel.selectedProject, newModel.selectedProjectRank, newModel.confirmAddProjectModal, newModel.confirmRemoveProjectModal, newModel.confirmSaveChangesModal, newModel.isPreferenceTab);
        case 2:
            return new Model(newModel.loading, newModel.preference, (inputRecord_1 = newModel.unsavedPreference, new PreferenceResponse(inputRecord_1.eeid, inputRecord_1.p1, Project_get_Default(), inputRecord_1.p3, inputRecord_1.p4, inputRecord_1.p5, inputRecord_1.p6, inputRecord_1.p7, inputRecord_1.p8, inputRecord_1.p9, inputRecord_1.p10, inputRecord_1.n1, inputRecord_1.n2, inputRecord_1.n3, inputRecord_1.n4, inputRecord_1.n5, inputRecord_1.n6, inputRecord_1.n7, inputRecord_1.n8, inputRecord_1.n9, inputRecord_1.n10, inputRecord_1.upddate, inputRecord_1.comments, inputRecord_1.feedback, inputRecord_1.doc)), newModel.preferenceEqualList, newModel.token, newModel.selectedProject, newModel.selectedProjectRank, newModel.confirmAddProjectModal, newModel.confirmRemoveProjectModal, newModel.confirmSaveChangesModal, newModel.isPreferenceTab);
        case 3:
            return new Model(newModel.loading, newModel.preference, (inputRecord_2 = newModel.unsavedPreference, new PreferenceResponse(inputRecord_2.eeid, inputRecord_2.p1, inputRecord_2.p2, Project_get_Default(), inputRecord_2.p4, inputRecord_2.p5, inputRecord_2.p6, inputRecord_2.p7, inputRecord_2.p8, inputRecord_2.p9, inputRecord_2.p10, inputRecord_2.n1, inputRecord_2.n2, inputRecord_2.n3, inputRecord_2.n4, inputRecord_2.n5, inputRecord_2.n6, inputRecord_2.n7, inputRecord_2.n8, inputRecord_2.n9, inputRecord_2.n10, inputRecord_2.upddate, inputRecord_2.comments, inputRecord_2.feedback, inputRecord_2.doc)), newModel.preferenceEqualList, newModel.token, newModel.selectedProject, newModel.selectedProjectRank, newModel.confirmAddProjectModal, newModel.confirmRemoveProjectModal, newModel.confirmSaveChangesModal, newModel.isPreferenceTab);
        case 4:
            return new Model(newModel.loading, newModel.preference, (inputRecord_3 = newModel.unsavedPreference, new PreferenceResponse(inputRecord_3.eeid, inputRecord_3.p1, inputRecord_3.p2, inputRecord_3.p3, Project_get_Default(), inputRecord_3.p5, inputRecord_3.p6, inputRecord_3.p7, inputRecord_3.p8, inputRecord_3.p9, inputRecord_3.p10, inputRecord_3.n1, inputRecord_3.n2, inputRecord_3.n3, inputRecord_3.n4, inputRecord_3.n5, inputRecord_3.n6, inputRecord_3.n7, inputRecord_3.n8, inputRecord_3.n9, inputRecord_3.n10, inputRecord_3.upddate, inputRecord_3.comments, inputRecord_3.feedback, inputRecord_3.doc)), newModel.preferenceEqualList, newModel.token, newModel.selectedProject, newModel.selectedProjectRank, newModel.confirmAddProjectModal, newModel.confirmRemoveProjectModal, newModel.confirmSaveChangesModal, newModel.isPreferenceTab);
        case 5:
            return new Model(newModel.loading, newModel.preference, (inputRecord_4 = newModel.unsavedPreference, new PreferenceResponse(inputRecord_4.eeid, inputRecord_4.p1, inputRecord_4.p2, inputRecord_4.p3, inputRecord_4.p4, Project_get_Default(), inputRecord_4.p6, inputRecord_4.p7, inputRecord_4.p8, inputRecord_4.p9, inputRecord_4.p10, inputRecord_4.n1, inputRecord_4.n2, inputRecord_4.n3, inputRecord_4.n4, inputRecord_4.n5, inputRecord_4.n6, inputRecord_4.n7, inputRecord_4.n8, inputRecord_4.n9, inputRecord_4.n10, inputRecord_4.upddate, inputRecord_4.comments, inputRecord_4.feedback, inputRecord_4.doc)), newModel.preferenceEqualList, newModel.token, newModel.selectedProject, newModel.selectedProjectRank, newModel.confirmAddProjectModal, newModel.confirmRemoveProjectModal, newModel.confirmSaveChangesModal, newModel.isPreferenceTab);
        case 6:
            return new Model(newModel.loading, newModel.preference, (inputRecord_5 = newModel.unsavedPreference, new PreferenceResponse(inputRecord_5.eeid, inputRecord_5.p1, inputRecord_5.p2, inputRecord_5.p3, inputRecord_5.p4, inputRecord_5.p5, Project_get_Default(), inputRecord_5.p7, inputRecord_5.p8, inputRecord_5.p9, inputRecord_5.p10, inputRecord_5.n1, inputRecord_5.n2, inputRecord_5.n3, inputRecord_5.n4, inputRecord_5.n5, inputRecord_5.n6, inputRecord_5.n7, inputRecord_5.n8, inputRecord_5.n9, inputRecord_5.n10, inputRecord_5.upddate, inputRecord_5.comments, inputRecord_5.feedback, inputRecord_5.doc)), newModel.preferenceEqualList, newModel.token, newModel.selectedProject, newModel.selectedProjectRank, newModel.confirmAddProjectModal, newModel.confirmRemoveProjectModal, newModel.confirmSaveChangesModal, newModel.isPreferenceTab);
        case 7:
            return new Model(newModel.loading, newModel.preference, (inputRecord_6 = newModel.unsavedPreference, new PreferenceResponse(inputRecord_6.eeid, inputRecord_6.p1, inputRecord_6.p2, inputRecord_6.p3, inputRecord_6.p4, inputRecord_6.p5, inputRecord_6.p6, Project_get_Default(), inputRecord_6.p8, inputRecord_6.p9, inputRecord_6.p10, inputRecord_6.n1, inputRecord_6.n2, inputRecord_6.n3, inputRecord_6.n4, inputRecord_6.n5, inputRecord_6.n6, inputRecord_6.n7, inputRecord_6.n8, inputRecord_6.n9, inputRecord_6.n10, inputRecord_6.upddate, inputRecord_6.comments, inputRecord_6.feedback, inputRecord_6.doc)), newModel.preferenceEqualList, newModel.token, newModel.selectedProject, newModel.selectedProjectRank, newModel.confirmAddProjectModal, newModel.confirmRemoveProjectModal, newModel.confirmSaveChangesModal, newModel.isPreferenceTab);
        case 8:
            return new Model(newModel.loading, newModel.preference, (inputRecord_7 = newModel.unsavedPreference, new PreferenceResponse(inputRecord_7.eeid, inputRecord_7.p1, inputRecord_7.p2, inputRecord_7.p3, inputRecord_7.p4, inputRecord_7.p5, inputRecord_7.p6, inputRecord_7.p7, Project_get_Default(), inputRecord_7.p9, inputRecord_7.p10, inputRecord_7.n1, inputRecord_7.n2, inputRecord_7.n3, inputRecord_7.n4, inputRecord_7.n5, inputRecord_7.n6, inputRecord_7.n7, inputRecord_7.n8, inputRecord_7.n9, inputRecord_7.n10, inputRecord_7.upddate, inputRecord_7.comments, inputRecord_7.feedback, inputRecord_7.doc)), newModel.preferenceEqualList, newModel.token, newModel.selectedProject, newModel.selectedProjectRank, newModel.confirmAddProjectModal, newModel.confirmRemoveProjectModal, newModel.confirmSaveChangesModal, newModel.isPreferenceTab);
        case 9:
            return new Model(newModel.loading, newModel.preference, (inputRecord_8 = newModel.unsavedPreference, new PreferenceResponse(inputRecord_8.eeid, inputRecord_8.p1, inputRecord_8.p2, inputRecord_8.p3, inputRecord_8.p4, inputRecord_8.p5, inputRecord_8.p6, inputRecord_8.p7, inputRecord_8.p8, Project_get_Default(), inputRecord_8.p10, inputRecord_8.n1, inputRecord_8.n2, inputRecord_8.n3, inputRecord_8.n4, inputRecord_8.n5, inputRecord_8.n6, inputRecord_8.n7, inputRecord_8.n8, inputRecord_8.n9, inputRecord_8.n10, inputRecord_8.upddate, inputRecord_8.comments, inputRecord_8.feedback, inputRecord_8.doc)), newModel.preferenceEqualList, newModel.token, newModel.selectedProject, newModel.selectedProjectRank, newModel.confirmAddProjectModal, newModel.confirmRemoveProjectModal, newModel.confirmSaveChangesModal, newModel.isPreferenceTab);
        case 10:
            return new Model(newModel.loading, newModel.preference, (inputRecord_9 = newModel.unsavedPreference, new PreferenceResponse(inputRecord_9.eeid, inputRecord_9.p1, inputRecord_9.p2, inputRecord_9.p3, inputRecord_9.p4, inputRecord_9.p5, inputRecord_9.p6, inputRecord_9.p7, inputRecord_9.p8, inputRecord_9.p9, Project_get_Default(), inputRecord_9.n1, inputRecord_9.n2, inputRecord_9.n3, inputRecord_9.n4, inputRecord_9.n5, inputRecord_9.n6, inputRecord_9.n7, inputRecord_9.n8, inputRecord_9.n9, inputRecord_9.n10, inputRecord_9.upddate, inputRecord_9.comments, inputRecord_9.feedback, inputRecord_9.doc)), newModel.preferenceEqualList, newModel.token, newModel.selectedProject, newModel.selectedProjectRank, newModel.confirmAddProjectModal, newModel.confirmRemoveProjectModal, newModel.confirmSaveChangesModal, newModel.isPreferenceTab);
        default:
            return newModel;
    }
}

export function swapUp(model, rank) {
    const up = model.unsavedPreference;
    const newUp = (rank === 2) ? (new PreferenceResponse(up.eeid, up.p2, up.p1, up.p3, up.p4, up.p5, up.p6, up.p7, up.p8, up.p9, up.p10, up.n1, up.n2, up.n3, up.n4, up.n5, up.n6, up.n7, up.n8, up.n9, up.n10, up.upddate, up.comments, up.feedback, up.doc)) : ((rank === 3) ? (new PreferenceResponse(up.eeid, up.p1, up.p3, up.p2, up.p4, up.p5, up.p6, up.p7, up.p8, up.p9, up.p10, up.n1, up.n2, up.n3, up.n4, up.n5, up.n6, up.n7, up.n8, up.n9, up.n10, up.upddate, up.comments, up.feedback, up.doc)) : ((rank === 4) ? (new PreferenceResponse(up.eeid, up.p1, up.p2, up.p4, up.p3, up.p5, up.p6, up.p7, up.p8, up.p9, up.p10, up.n1, up.n2, up.n3, up.n4, up.n5, up.n6, up.n7, up.n8, up.n9, up.n10, up.upddate, up.comments, up.feedback, up.doc)) : ((rank === 5) ? (new PreferenceResponse(up.eeid, up.p1, up.p2, up.p3, up.p5, up.p4, up.p6, up.p7, up.p8, up.p9, up.p10, up.n1, up.n2, up.n3, up.n4, up.n5, up.n6, up.n7, up.n8, up.n9, up.n10, up.upddate, up.comments, up.feedback, up.doc)) : ((rank === 6) ? (new PreferenceResponse(up.eeid, up.p1, up.p2, up.p3, up.p4, up.p6, up.p5, up.p7, up.p8, up.p9, up.p10, up.n1, up.n2, up.n3, up.n4, up.n5, up.n6, up.n7, up.n8, up.n9, up.n10, up.upddate, up.comments, up.feedback, up.doc)) : ((rank === 7) ? (new PreferenceResponse(up.eeid, up.p1, up.p2, up.p3, up.p4, up.p5, up.p7, up.p6, up.p8, up.p9, up.p10, up.n1, up.n2, up.n3, up.n4, up.n5, up.n6, up.n7, up.n8, up.n9, up.n10, up.upddate, up.comments, up.feedback, up.doc)) : ((rank === 8) ? (new PreferenceResponse(up.eeid, up.p1, up.p2, up.p3, up.p4, up.p5, up.p6, up.p8, up.p7, up.p9, up.p10, up.n1, up.n2, up.n3, up.n4, up.n5, up.n6, up.n7, up.n8, up.n9, up.n10, up.upddate, up.comments, up.feedback, up.doc)) : ((rank === 9) ? (new PreferenceResponse(up.eeid, up.p1, up.p2, up.p3, up.p4, up.p5, up.p6, up.p7, up.p9, up.p8, up.p10, up.n1, up.n2, up.n3, up.n4, up.n5, up.n6, up.n7, up.n8, up.n9, up.n10, up.upddate, up.comments, up.feedback, up.doc)) : ((rank === 10) ? (new PreferenceResponse(up.eeid, up.p1, up.p2, up.p3, up.p4, up.p5, up.p6, up.p7, up.p8, up.p10, up.p9, up.n1, up.n2, up.n3, up.n4, up.n5, up.n6, up.n7, up.n8, up.n9, up.n10, up.upddate, up.comments, up.feedback, up.doc)) : up))))))));
    return new Model(model.loading, model.preference, newUp, model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab);
}

export function swapDown(model, rank) {
    return swapUp(model, rank + 1);
}

export function getPreferenceEqualList(pref) {
    const prefs = ofArray([pref.n2, pref.n3, pref.n4, pref.n5, pref.n6, pref.n7, pref.n8, pref.n9, pref.n10]);
    const indexes = toList(rangeDouble(2, 1, 10));
    const list = zip(prefs, indexes);
    return map((tupledArg) => {
        const pref_1 = tupledArg[0] | 0;
        const index = tupledArg[1] | 0;
        return pref_1 !== index;
    }, list);
}

export function updatePreferenceRanks(_arg1_, _arg1__1, _arg1__2, isPrefEqual) {
    let inputRecord, inputRecord_1, inputRecord_2, inputRecord_3, inputRecord_4, inputRecord_5, inputRecord_6, inputRecord_7, inputRecord_8;
    const _arg = [_arg1_, _arg1__1, _arg1__2];
    const prevRank = _arg[2] | 0;
    const model = _arg[0];
    const iter = _arg[1] | 0;
    const rank = (isPrefEqual ? prevRank : iter) | 0;
    switch (iter) {
        case 2:
            return [new Model(model.loading, model.preference, (inputRecord = model.unsavedPreference, new PreferenceResponse(inputRecord.eeid, inputRecord.p1, inputRecord.p2, inputRecord.p3, inputRecord.p4, inputRecord.p5, inputRecord.p6, inputRecord.p7, inputRecord.p8, inputRecord.p9, inputRecord.p10, inputRecord.n1, rank, inputRecord.n3, inputRecord.n4, inputRecord.n5, inputRecord.n6, inputRecord.n7, inputRecord.n8, inputRecord.n9, inputRecord.n10, inputRecord.upddate, inputRecord.comments, inputRecord.feedback, inputRecord.doc)), model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), 3, rank];
        case 3:
            return [new Model(model.loading, model.preference, (inputRecord_1 = model.unsavedPreference, new PreferenceResponse(inputRecord_1.eeid, inputRecord_1.p1, inputRecord_1.p2, inputRecord_1.p3, inputRecord_1.p4, inputRecord_1.p5, inputRecord_1.p6, inputRecord_1.p7, inputRecord_1.p8, inputRecord_1.p9, inputRecord_1.p10, inputRecord_1.n1, inputRecord_1.n2, rank, inputRecord_1.n4, inputRecord_1.n5, inputRecord_1.n6, inputRecord_1.n7, inputRecord_1.n8, inputRecord_1.n9, inputRecord_1.n10, inputRecord_1.upddate, inputRecord_1.comments, inputRecord_1.feedback, inputRecord_1.doc)), model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), 4, rank];
        case 4:
            return [new Model(model.loading, model.preference, (inputRecord_2 = model.unsavedPreference, new PreferenceResponse(inputRecord_2.eeid, inputRecord_2.p1, inputRecord_2.p2, inputRecord_2.p3, inputRecord_2.p4, inputRecord_2.p5, inputRecord_2.p6, inputRecord_2.p7, inputRecord_2.p8, inputRecord_2.p9, inputRecord_2.p10, inputRecord_2.n1, inputRecord_2.n2, inputRecord_2.n3, rank, inputRecord_2.n5, inputRecord_2.n6, inputRecord_2.n7, inputRecord_2.n8, inputRecord_2.n9, inputRecord_2.n10, inputRecord_2.upddate, inputRecord_2.comments, inputRecord_2.feedback, inputRecord_2.doc)), model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), 5, rank];
        case 5:
            return [new Model(model.loading, model.preference, (inputRecord_3 = model.unsavedPreference, new PreferenceResponse(inputRecord_3.eeid, inputRecord_3.p1, inputRecord_3.p2, inputRecord_3.p3, inputRecord_3.p4, inputRecord_3.p5, inputRecord_3.p6, inputRecord_3.p7, inputRecord_3.p8, inputRecord_3.p9, inputRecord_3.p10, inputRecord_3.n1, inputRecord_3.n2, inputRecord_3.n3, inputRecord_3.n4, rank, inputRecord_3.n6, inputRecord_3.n7, inputRecord_3.n8, inputRecord_3.n9, inputRecord_3.n10, inputRecord_3.upddate, inputRecord_3.comments, inputRecord_3.feedback, inputRecord_3.doc)), model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), 6, rank];
        case 6:
            return [new Model(model.loading, model.preference, (inputRecord_4 = model.unsavedPreference, new PreferenceResponse(inputRecord_4.eeid, inputRecord_4.p1, inputRecord_4.p2, inputRecord_4.p3, inputRecord_4.p4, inputRecord_4.p5, inputRecord_4.p6, inputRecord_4.p7, inputRecord_4.p8, inputRecord_4.p9, inputRecord_4.p10, inputRecord_4.n1, inputRecord_4.n2, inputRecord_4.n3, inputRecord_4.n4, inputRecord_4.n5, rank, inputRecord_4.n7, inputRecord_4.n8, inputRecord_4.n9, inputRecord_4.n10, inputRecord_4.upddate, inputRecord_4.comments, inputRecord_4.feedback, inputRecord_4.doc)), model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), 7, rank];
        case 7:
            return [new Model(model.loading, model.preference, (inputRecord_5 = model.unsavedPreference, new PreferenceResponse(inputRecord_5.eeid, inputRecord_5.p1, inputRecord_5.p2, inputRecord_5.p3, inputRecord_5.p4, inputRecord_5.p5, inputRecord_5.p6, inputRecord_5.p7, inputRecord_5.p8, inputRecord_5.p9, inputRecord_5.p10, inputRecord_5.n1, inputRecord_5.n2, inputRecord_5.n3, inputRecord_5.n4, inputRecord_5.n5, inputRecord_5.n6, rank, inputRecord_5.n8, inputRecord_5.n9, inputRecord_5.n10, inputRecord_5.upddate, inputRecord_5.comments, inputRecord_5.feedback, inputRecord_5.doc)), model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), 8, rank];
        case 8:
            return [new Model(model.loading, model.preference, (inputRecord_6 = model.unsavedPreference, new PreferenceResponse(inputRecord_6.eeid, inputRecord_6.p1, inputRecord_6.p2, inputRecord_6.p3, inputRecord_6.p4, inputRecord_6.p5, inputRecord_6.p6, inputRecord_6.p7, inputRecord_6.p8, inputRecord_6.p9, inputRecord_6.p10, inputRecord_6.n1, inputRecord_6.n2, inputRecord_6.n3, inputRecord_6.n4, inputRecord_6.n5, inputRecord_6.n6, inputRecord_6.n7, rank, inputRecord_6.n9, inputRecord_6.n10, inputRecord_6.upddate, inputRecord_6.comments, inputRecord_6.feedback, inputRecord_6.doc)), model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), 9, rank];
        case 9:
            return [new Model(model.loading, model.preference, (inputRecord_7 = model.unsavedPreference, new PreferenceResponse(inputRecord_7.eeid, inputRecord_7.p1, inputRecord_7.p2, inputRecord_7.p3, inputRecord_7.p4, inputRecord_7.p5, inputRecord_7.p6, inputRecord_7.p7, inputRecord_7.p8, inputRecord_7.p9, inputRecord_7.p10, inputRecord_7.n1, inputRecord_7.n2, inputRecord_7.n3, inputRecord_7.n4, inputRecord_7.n5, inputRecord_7.n6, inputRecord_7.n7, inputRecord_7.n8, rank, inputRecord_7.n10, inputRecord_7.upddate, inputRecord_7.comments, inputRecord_7.feedback, inputRecord_7.doc)), model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), 10, rank];
        case 10:
            return [new Model(model.loading, model.preference, (inputRecord_8 = model.unsavedPreference, new PreferenceResponse(inputRecord_8.eeid, inputRecord_8.p1, inputRecord_8.p2, inputRecord_8.p3, inputRecord_8.p4, inputRecord_8.p5, inputRecord_8.p6, inputRecord_8.p7, inputRecord_8.p8, inputRecord_8.p9, inputRecord_8.p10, inputRecord_8.n1, inputRecord_8.n2, inputRecord_8.n3, inputRecord_8.n4, inputRecord_8.n5, inputRecord_8.n6, inputRecord_8.n7, inputRecord_8.n8, inputRecord_8.n9, rank, inputRecord_8.upddate, inputRecord_8.comments, inputRecord_8.feedback, inputRecord_8.doc)), model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), 10, rank];
        default:
            return [model, 10, rank];
    }
}

export function init(token) {
    const defaultModel = new Model(true, PreferenceResponse_get_Default(), PreferenceResponse_get_Default(), empty(), token, Project_get_Default(), 0, false, false, false, true);
    const initialLoad = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
        let decoder;
        const preferenceUrl = "http://localhost:1234/preferences";
        return ((decoder = PreferenceResponse_get_Decoder(), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
            let data_2, caseStrategy_2, extra_2;
            return ((data_2 = void 0, (caseStrategy_2 = void 0, (extra_2 = void 0, (() => {
                let properties_4;
                try {
                    const properties_3 = Helper_withProperties(void 0, (properties_4 = ofArray([new Types_RequestProperties(0, ["GET"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_2, singleton(new Types_HttpRequestHeaders(5, [`Bearer ${token}`]))), 0)])]), defaultArg(map_1((data_1_1) => {
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
                const savePreferenceUrl = "http://localhost:1234/save-preferences";
                return ((decoder = PreferenceResponse_get_Decoder(), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
                    let data_3, caseStrategy_2, extra_2;
                    return ((data_3 = data, (caseStrategy_2 = void 0, (extra_2 = void 0, (() => {
                        let properties_4;
                        try {
                            const properties_3 = Helper_withProperties(void 0, (properties_4 = ofArray([new Types_RequestProperties(0, ["PUT"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_3, singleton(new Types_HttpRequestHeaders(5, [`Bearer ${model.token}`]))), 0)])]), defaultArg(map_1((data_1_1) => {
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
            return [new Model(model.loading, model.preference, (inputRecord = model.unsavedPreference, new PreferenceResponse(inputRecord.eeid, inputRecord.p1, inputRecord.p2, inputRecord.p3, inputRecord.p4, inputRecord.p5, inputRecord.p6, inputRecord.p7, inputRecord.p8, inputRecord.p9, inputRecord.p10, inputRecord.n1, inputRecord.n2, inputRecord.n3, inputRecord.n4, inputRecord.n5, inputRecord.n6, inputRecord.n7, inputRecord.n8, inputRecord.n9, inputRecord.n10, inputRecord.upddate, c, inputRecord.feedback, inputRecord.doc)), model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), Cmd_none()];
        }
        case 15: {
            const prefEqualChange = msg.fields[1];
            const index = msg.fields[0] | 0;
            const newPrefEqualList = updateAt(index, prefEqualChange, model.preferenceEqualList);
            const newModel = fold((tupledArg, isPrefEqual) => updatePreferenceRanks(tupledArg[0], tupledArg[1], tupledArg[2], isPrefEqual), [model, 2, 1], newPrefEqualList)[0];
            return [new Model(newModel.loading, newModel.preference, newModel.unsavedPreference, newPrefEqualList, newModel.token, newModel.selectedProject, newModel.selectedProjectRank, newModel.confirmAddProjectModal, newModel.confirmRemoveProjectModal, newModel.confirmSaveChangesModal, newModel.isPreferenceTab), Cmd_none()];
        }
        case 13:
            return [new Model(model.loading, model.preference, (inputRecord_1 = model.unsavedPreference, new PreferenceResponse(inputRecord_1.eeid, inputRecord_1.p1, inputRecord_1.p2, inputRecord_1.p3, inputRecord_1.p4, inputRecord_1.p5, inputRecord_1.p6, inputRecord_1.p7, inputRecord_1.p8, inputRecord_1.p9, inputRecord_1.p10, inputRecord_1.n1, inputRecord_1.n2, inputRecord_1.n3, inputRecord_1.n4, inputRecord_1.n5, inputRecord_1.n6, inputRecord_1.n7, inputRecord_1.n8, inputRecord_1.n9, inputRecord_1.n10, inputRecord_1.upddate, inputRecord_1.comments, inputRecord_1.feedback, !model.unsavedPreference.doc)), model.preferenceEqualList, model.token, model.selectedProject, model.selectedProjectRank, model.confirmAddProjectModal, model.confirmRemoveProjectModal, model.confirmSaveChangesModal, model.isPreferenceTab), Cmd_none()];
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

export const LoadingScreen = createElement("div", createObj(ofArray([["style", {
    top: 0,
    left: 0,
    overflow: "hidden",
    position: "absolute",
    height: 100 + "vh",
    width: 100 + "vw",
    display: "flex",
    zIndex: 100,
    backgroundColor: rgba(0, 0, 0, 0.6),
    justifyContent: "center",
    alignItems: "center",
}], (() => {
    const elems = [createElement("div", {
        className: join(" ", ["loader"]),
    })];
    return ["children", Interop_reactApi.Children.toArray(Array.from(elems))];
})()])));

export function TurquoiseBackground(opacity) {
    return createElement("div", {
        style: {
            top: 0,
            left: 0,
            overflow: "hidden",
            position: "absolute",
            height: 100 + "%",
            width: 100 + "%",
            opacity: opacity,
            zIndex: -1,
            backgroundColor: "#AFEEEE",
        },
    });
}

export function TurquoiseBackgroundRGBA(opacity) {
    return ["backgroundColor", rgba(175, 238, 238, opacity)];
}

export const ImageBackground = createElement("img", {
    style: {
        position: "absolute",
        height: 100 + "%",
        width: 100 + "%",
        zIndex: -2,
        overflow: "hidden",
    },
    src: "/images/imperial.jpg",
});

export const TileCss = ofArray([TurquoiseBackgroundRGBA(0.7), ["borderStyle", "solid"], ["borderColor", "#48D1CC"], ["padding", 1.5 + "%"]]);

export function NavBar(dispatch) {
    let elems_7, elems_1, elems, elms_4, elms, elms_3, elms_2, elms_1;
    return createElement("nav", createObj(Helpers_combineClasses("navbar", ofArray([["style", {
        backgroundColor: "#48D1CC",
        fontWeight: 700,
    }], (elems_7 = [createElement("div", createObj(Helpers_combineClasses("navbar-brand", ofArray([["onClick", (e) => {
        RouterModule_nav(singleton("home-student"), 1, 2);
    }], ["style", {
        paddingTop: 3,
        paddingRight: 20,
        paddingLeft: 10,
        cursor: "pointer",
    }], (elems_1 = [createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-large"], (elems = [createElement("i", {
        className: "fas fa-home fa-2x",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), (elms_4 = ofArray([(elms = ofArray([createElement("a", createObj(Helpers_combineClasses("navbar-item", ofArray([["children", "Projects"], ["onClick", (e_1) => {
        RouterModule_nav(ofArray(["home-student", "projects"]), 1, 2);
    }]])))), createElement("a", createObj(Helpers_combineClasses("navbar-item", ofArray([["children", "Preferences"], ["onClick", (e_2) => {
        RouterModule_nav(ofArray(["home-student", "preferences"]), 1, 2);
    }]])))), createElement("a", createObj(Helpers_combineClasses("navbar-item", ofArray([["children", "Propose a Project"], ["onClick", (e_3) => {
        RouterModule_nav(singleton("project-propose"), 1, 2);
    }]]))))]), createElement("div", {
        className: "navbar-start",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), (elms_3 = singleton((elms_2 = singleton((elms_1 = singleton(createElement("a", createObj(Helpers_combineClasses("button", ofArray([["children", "Log Out"], ["onClick", (_arg) => {
        dispatch(new Msg(2, []));
    }]]))))), createElement("div", {
        className: "buttons",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))), createElement("div", {
        className: "navbar-item",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    }))), createElement("div", {
        className: "navbar-end",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    }))]), createElement("div", {
        className: "navbar-menu",
        children: Interop_reactApi.Children.toArray(Array.from(elms_4)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_7))])]))));
}

export function Tabs(model, dispatch) {
    let elems_2, children;
    return createElement("div", createObj(Helpers_combineClasses("tabs", singleton((elems_2 = [(children = ofArray([createElement("li", createObj(Helpers_combineClasses("", toList(delay(() => append(model.isPreferenceTab ? singleton_1(["className", join(" ", ["is-active"])]) : empty_1(), delay(() => append(singleton_1(["onClick", (_arg) => {
        dispatch(new Msg(16, []));
    }]), delay(() => {
        let elems;
        return singleton_1((elems = [createElement("a", {
            children: "Preferences",
            style: {
                fontWeight: "bold",
            },
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))]));
    }))))))))), createElement("li", createObj(Helpers_combineClasses("", toList(delay(() => append(!model.isPreferenceTab ? singleton_1(["className", join(" ", ["is-active"])]) : empty_1(), delay(() => append(singleton_1(["onClick", (_arg_1) => {
        dispatch(new Msg(17, []));
    }]), delay(() => {
        let elems_1;
        return singleton_1((elems_1 = [createElement("a", {
            children: "Comments",
            style: {
                fontWeight: "bold",
            },
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))]));
    })))))))))]), createElement("ul", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])))));
}

export function Table(model, body) {
    let elems_1;
    return createElement("div", createObj(ofArray([["style", createObj(toList(delay(() => append(singleton_1(["overflowY", "auto"]), delay(() => append(singleton_1(["height", 76 + "%"]), delay(() => append(singleton_1(["marginBottom", 4 + "%"]), delay(() => (model.unsavedPreference.doc ? singleton_1(["opacity", 0.5]) : empty_1()))))))))))], ["className", join(" ", ["scrollbar"])], (elems_1 = [createElement("table", createObj(Helpers_combineClasses("table", ofArray([["style", {
        width: 100 + "%",
        position: "relative",
    }], ["children", Interop_reactApi.Children.toArray(Array.from(body))]]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])));
}

export function PreferenceRow(model, dispatch, _arg1_, _arg1__1, _arg1__2) {
    const _arg = [_arg1_, _arg1__1, _arg1__2];
    const rank = _arg[1] | 0;
    const projectInfo = _arg[0];
    const index = _arg[2] | 0;
    const isSelected = equals(model.selectedProject, projectInfo) && (model.selectedProject.pid !== 0);
    const isProject = projectInfo.pid !== 0;
    const isPrefEqual = rank !== index;
    return createElement("tr", createObj(toList(delay(() => append(singleton_1(["className", join(" ", ["table-row"])]), delay(() => append(singleton_1(["style", createObj(toList(delay(() => append(singleton_1(["cursor", "pointer"]), delay(() => (isSelected ? singleton_1(["backgroundColor", "#D3D3D3"]) : empty_1()))))))]), delay(() => append(isProject ? singleton_1(["onClick", (_arg_1) => {
        dispatch(new Msg(3, [projectInfo, index]));
    }]) : singleton_1(["onClick", (_arg_2) => {
        dispatch(new Msg(5, []));
    }]), delay(() => {
        let elems_2, children, children_2;
        return singleton_1((elems_2 = [createElement("td", {
            children: rank,
        }), (children = toList(delay(() => ((index !== 1) ? singleton_1(createElement("input", {
            checked: isPrefEqual,
            value: isPrefEqual,
            onChange: (ev) => {
                dispatch(new Msg(15, [index - 2, !isPrefEqual]));
            },
            onClick: (ev_1) => {
                ev_1.stopPropagation();
            },
            style: {
                width: 18,
                height: 18,
            },
            type: "checkbox",
        })) : empty_1()))), createElement("td", {
            children: Interop_reactApi.Children.toArray(Array.from(children)),
        })), createElement("td", createObj(toList(delay(() => (isProject ? singleton_1(["children", projectInfo.title]) : empty_1()))))), createElement("td", createObj(toList(delay(() => (isProject ? singleton_1(["children", projectInfo.supName]) : empty_1()))))), (children_2 = toList(delay(() => (isProject ? append(singleton_1(createElement("span", createObj(Helpers_combineClasses("icon", toList(delay(() => {
            let elems;
            return (index !== 1) ? append(singleton_1((elems = [createElement("i", {
                className: "fas fa-angle-double-up fa-lg",
            })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])), delay(() => append(singleton_1(["id", "swap-icon"]), delay(() => append(singleton_1(["onClick", (ev_2) => {
                ev_2.stopPropagation();
                dispatch(new Msg(18, [index]));
            }]), delay(() => singleton_1(["className", "is-medium"]))))))) : empty_1();
        })))))), delay(() => singleton_1(createElement("span", createObj(Helpers_combineClasses("icon", toList(delay(() => {
            let elems_1;
            return (index !== 10) ? append(singleton_1((elems_1 = [createElement("i", {
                className: "fas fa-angle-double-down fa-lg",
            })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])), delay(() => append(singleton_1(["id", "swap-icon"]), delay(() => append(singleton_1(["onClick", (ev_3) => {
                ev_3.stopPropagation();
                dispatch(new Msg(19, [index]));
            }]), delay(() => singleton_1(["className", "is-medium"]))))))) : empty_1();
        })))))))) : empty_1()))), createElement("td", {
            children: Interop_reactApi.Children.toArray(Array.from(children_2)),
        }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))]));
    }))))))))));
}

export function PreferenceTable(model, dispatch) {
    const pref = model.unsavedPreference;
    const prefList = ofArray([[pref.p1, pref.n1, 1], [pref.p2, pref.n2, 2], [pref.p3, pref.n3, 3], [pref.p4, pref.n4, 4], [pref.p5, pref.n5, 5], [pref.p6, pref.n6, 6], [pref.p7, pref.n7, 7], [pref.p8, pref.n8, 8], [pref.p9, pref.n9, 9], [pref.p10, pref.n10, 10]]);
    toConsole(printf("%A"))(ofArray([[pref.n1, 1], [pref.n2, 2], [pref.n3, 3], [pref.n4, 4], [pref.n5, 5], [pref.n6, 6], [pref.n7, 7], [pref.n8, 8], [pref.n9, 9], [pref.n10, 10]]));
    toConsole(printf("%A"))(model.preferenceEqualList);
    return Table(model, toList(delay(() => {
        let children_2, children;
        return append(singleton_1((children_2 = singleton((children = ofArray([createElement("th", {
            title: "Rank",
            children: "Rank",
        }), createElement("th", {
            title: "Title",
            children: "Title",
        }), createElement("th", {
            title: "Professor",
            children: "Professor",
        }), createElement("th", {
            title: "Equal Preferences",
            children: "Equal Preferences",
        }), createElement("th", {
            title: "Swap Preferences",
            children: "Swap Preferences",
        })]), createElement("tr", {
            children: Interop_reactApi.Children.toArray(Array.from(children)),
        }))), createElement("thead", {
            children: Interop_reactApi.Children.toArray(Array.from(children_2)),
        }))), delay(() => {
            let children_4;
            return append(singleton_1((children_4 = map((tupledArg) => PreferenceRow(model, dispatch, tupledArg[0], tupledArg[1], tupledArg[2]), prefList), createElement("tbody", {
                children: Interop_reactApi.Children.toArray(Array.from(children_4)),
            }))), delay(() => (model.unsavedPreference.doc ? singleton_1(createElement("div", {
                style: {
                    top: 0,
                    left: 0,
                    overflow: "hidden",
                    position: "absolute",
                    height: 100 + "%",
                    width: 100 + "%",
                    zIndex: 80,
                },
            })) : empty_1())));
        }));
    })));
}

export function Comments(model, dispatch) {
    return createElement("textarea", {
        rows: 5,
        cols: 33,
        placeholder: "Enter your comments here",
        value: model.unsavedPreference.comments,
        onChange: (ev) => {
            dispatch(new Msg(14, [ev.target.value]));
        },
    });
}

export function Tag(model, filter) {
    return createElement("span", createObj(Helpers_combineClasses("tag", ofArray([["children", getFormattedCategory(filter)], ["style", {
        marginBottom: 10,
        marginRight: 10,
    }]]))));
}

export function TableCategories(model, categories) {
    return map((filter) => Tag(model, filter), ofArray(categories.split(",")));
}

export function projectInfoMedia(sp) {
    let elems_3, elms, elems, elms_1;
    return createElement("article", createObj(Helpers_combineClasses("media", ofArray([["style", {
        marginBottom: 40,
    }], (elems_3 = [(elms = singleton(createElement("figure", createObj(Helpers_combineClasses("image", ofArray([["className", "is-48x48"], (elems = [createElement("img", {
        src: "https://bulma.io/assets/images/placeholders/96x96.png",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))), createElement("div", {
        className: "media-left",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), (elms_1 = ofArray([createElement("h1", createObj(Helpers_combineClasses("title", ofArray([["className", join(" ", ["is-4"])], ["children", sp.supName]])))), createElement("h2", createObj(Helpers_combineClasses("subtitle", ofArray([["className", join(" ", ["is-6"])], ["children", "example123@ic.ac.uk"]]))))]), createElement("div", {
        className: "media-content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])]))));
}

export function projectInfoBody(model, sp) {
    let elms_1, elems_1, elems, elms;
    const elms_2 = ofArray([(elms_1 = ofArray([createElement("div", createObj(Helpers_combineClasses("column", ofArray([["className", join(" ", ["is-4"])], (elems_1 = [createElement("h3", {
        children: ["Project Rankings"],
    }), createElement("ol", createObj(ofArray([["style", {
        fontWeight: 700,
    }], (elems = [createElement("li", {
        key: "1",
        children: int32ToString(sp.r1),
    }), createElement("li", {
        key: "2",
        children: int32ToString(sp.r2),
    }), createElement("li", {
        key: "3",
        children: int32ToString(sp.r3),
    }), createElement("li", {
        key: "4",
        children: int32ToString(sp.r4),
    }), createElement("li", {
        key: "5",
        children: int32ToString(sp.r5),
    }), createElement("li", {
        key: "6",
        children: int32ToString(sp.r6),
    }), createElement("li", {
        key: "7",
        children: int32ToString(sp.r7),
    }), createElement("li", {
        key: "8",
        children: int32ToString(sp.r8),
    }), createElement("li", {
        key: "9",
        children: int32ToString(sp.r9),
    }), createElement("li", {
        key: "10",
        children: int32ToString(sp.r10),
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), (elms = toList(delay(() => append(singleton_1(createElement("h3", {
        children: ["Project Categories"],
    })), delay(() => append(map_2((c) => c, TableCategories(model, sp.categories)), delay(() => append(singleton_1(createElement("h3", {
        children: ["Student Requirements"],
    })), delay(() => singleton_1(createElement("p", {
        children: [sp.requirements],
    })))))))))), createElement("div", {
        className: "column",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))]), createElement("div", {
        className: "columns",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    })), createElement("h3", {
        children: ["Desired Skills"],
    }), createElement("p", {
        children: [sp.skills],
    }), createElement("h3", {
        children: ["Project Description"],
    }), createElement("p", {
        children: [sp.descr],
    }), createElement("h3", {
        children: ["Meeting Dates"],
    }), createElement("p", {
        children: [sp.meetings],
    })]);
    return createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    });
}

export function selectedProject(model) {
    let elems_2, elms, elems_1;
    const sp = model.selectedProject;
    return createElement("div", createObj(Helpers_combineClasses("card", ofArray([["style", {
        overflowY: "auto",
        height: 89.5 + "%",
    }], ["className", join(" ", ["scrollbar"])], (elems_2 = [(elms = singleton(createElement("p", {
        className: "card-header-title",
        children: (("#" + int32ToString(sp.pid)) + " ") + sp.title,
    })), createElement("header", {
        className: "card-header",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), createElement("div", createObj(Helpers_combineClasses("card-content", singleton((elems_1 = [projectInfoMedia(sp), projectInfoBody(model, sp)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])]))));
}

export function saveChangesButtons(model, dispatch) {
    let elems_1, elems;
    return createElement("div", createObj(Helpers_combineClasses("box", ofArray([["style", {
        display: "flex",
        alignItems: "center",
    }], (elems_1 = [createElement("button", createObj(Helpers_combineClasses("button", toList(delay(() => append(singleton_1(["style", {
        marginRight: 30,
    }]), delay(() => append(singleton_1(["children", "Save Changes"]), delay(() => (checkPreferenceChange(model) ? append(singleton_1(["onClick", (_arg) => {
        dispatch(new Msg(9, []));
    }]), delay(() => singleton_1(["className", "is-success"]))) : singleton_1(["disabled", true]))))))))))), createElement("button", createObj(Helpers_combineClasses("button", toList(delay(() => append(singleton_1(["style", {
        marginRight: 30,
    }]), delay(() => append(singleton_1(["children", "Discard Changes"]), delay(() => (checkPreferenceChange(model) ? append(singleton_1(["onClick", (_arg_1) => {
        dispatch(new Msg(12, []));
    }]), delay(() => singleton_1(["className", "is-danger"]))) : singleton_1(["disabled", true]))))))))))), createElement("div", createObj(ofArray([["style", {
        display: "flex",
        alignItems: "center",
    }], (elems = [createElement("input", {
        onChange: (ev) => {
            dispatch(new Msg(13, []));
        },
        checked: model.unsavedPreference.doc,
        style: {
            width: 18,
            height: 18,
            marginRight: 10,
        },
        type: "checkbox",
    }), createElement("label", {
        children: "Entering DOC Allocation",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])]))));
}

export function removeProjectButtons(model, dispatch) {
    const elms = ofArray([createElement("button", createObj(Helpers_combineClasses("button", ofArray([["className", "is-danger"], ["style", {
        marginRight: 30,
    }], ["children", "Remove Preference"], ["onClick", (_arg) => {
        dispatch(new Msg(7, []));
    }]])))), createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Close Project"], ["onClick", (_arg_1) => {
        dispatch(new Msg(4, []));
    }]]))))]);
    return createElement("div", {
        className: "box",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    });
}

export function removePreferenceModal(model, dispatch) {
    let elms, elems_2, elms_1, elms_3, elms_2;
    const sp = model.selectedProject;
    const elms_4 = ofArray([(elms = ofArray([createElement("p", {
        className: "modal-card-title",
        children: "Remove Preference",
    }), createElement("button", createObj(Helpers_combineClasses("modal-close", ofArray([["className", join(" ", ["is-large"])], ["onClick", (_arg) => {
        dispatch(new Msg(11, []));
    }]]))))]), createElement("header", {
        className: "modal-card-head",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), createElement("section", createObj(Helpers_combineClasses("modal-card-body", ofArray([["className", join(" ", ["scrollbar"])], (elems_2 = [(elms_1 = ofArray([createElement("h3", {
        children: ["Are you sure you want to remove the following project from your preferences:"],
    }), createElement("blockquote", {
        children: [("\'" + sp.title) + "\'"],
    }), createElement("p", {
        children: ["You can always undo your changes by pressing \'Discard Changes\' in the bottom left."],
    })]), createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])))), (elms_3 = singleton((elms_2 = ofArray([createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Remove Preference"], ["onClick", (_arg_1) => {
        dispatch(new Msg(8, []));
    }], ["className", "is-danger"]])))), createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Cancel"], ["onClick", (_arg_2) => {
        dispatch(new Msg(11, []));
    }]]))))]), createElement("div", {
        className: "buttons",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    }))), createElement("footer", {
        className: "modal-card-foot",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    }))]);
    return createElement("div", {
        className: "modal-card",
        children: Interop_reactApi.Children.toArray(Array.from(elms_4)),
    });
}

export function addPreferenceModal(model, dispatch) {
    let elms, elems_2, elms_1, elms_3, elms_2;
    const elms_4 = ofArray([(elms = ofArray([createElement("p", {
        className: "modal-card-title",
        children: "Go to Projects Page",
    }), createElement("button", createObj(Helpers_combineClasses("modal-close", ofArray([["className", join(" ", ["is-large"])], ["onClick", (_arg) => {
        dispatch(new Msg(11, []));
    }]]))))]), createElement("header", {
        className: "modal-card-head",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), createElement("section", createObj(Helpers_combineClasses("modal-card-body", ofArray([["className", join(" ", ["scrollbar"])], (elems_2 = [(elms_1 = ofArray([createElement("h3", {
        children: ["Do you want to go to the Projects Page to add projects?"],
    }), createElement("p", {
        style: {
            color: "#FF0000",
        },
        children: "Make sure to save any changes before leaving the page.",
    })]), createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])))), (elms_3 = singleton((elms_2 = ofArray([createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Go to Projects Page"], ["onClick", (_arg_1) => {
        dispatch(new Msg(6, []));
    }], ["className", "is-success"]])))), createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Cancel"], ["onClick", (_arg_2) => {
        dispatch(new Msg(11, []));
    }]]))))]), createElement("div", {
        className: "buttons",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    }))), createElement("footer", {
        className: "modal-card-foot",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    }))]);
    return createElement("div", {
        className: "modal-card",
        children: Interop_reactApi.Children.toArray(Array.from(elms_4)),
    });
}

export function saveChangesModal(model, dispatch) {
    let elms, elems_2, elms_1, elms_3, elms_2;
    const elms_4 = ofArray([(elms = ofArray([createElement("p", {
        className: "modal-card-title",
        children: "Save Changes",
    }), createElement("button", createObj(Helpers_combineClasses("modal-close", ofArray([["className", join(" ", ["is-large"])], ["onClick", (_arg) => {
        dispatch(new Msg(11, []));
    }]]))))]), createElement("header", {
        className: "modal-card-head",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), createElement("section", createObj(Helpers_combineClasses("modal-card-body", ofArray([["className", join(" ", ["scrollbar"])], (elems_2 = [(elms_1 = ofArray([createElement("h3", {
        children: ["Would you like to save your preferences?"],
    }), createElement("p", {
        style: {
            color: "#FF0000",
        },
        children: "Unsaved changes will be lost so save changes before closing?",
    })]), createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])))), (elms_3 = singleton((elms_2 = ofArray([createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Save Changes"], ["onClick", (_arg_1) => {
        dispatch(new Msg(10, []));
    }], ["className", "is-success"]])))), createElement("button", createObj(Helpers_combineClasses("button", ofArray([["children", "Not Yet"], ["onClick", (_arg_2) => {
        dispatch(new Msg(11, []));
    }]]))))]), createElement("div", {
        className: "buttons",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    }))), createElement("footer", {
        className: "modal-card-foot",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    }))]);
    return createElement("div", {
        className: "modal-card",
        children: Interop_reactApi.Children.toArray(Array.from(elms_4)),
    });
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
                return append(singleton_1(selectedProject(model)), delay(() => singleton_1(removeProjectButtons(model, dispatch))));
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
