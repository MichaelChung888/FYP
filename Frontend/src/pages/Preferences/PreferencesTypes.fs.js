import { Union, Record } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { union_type, class_type, record_type, int32_type, string_type, list_type, bool_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { Project_$reflection, PreferenceResponse_$reflection } from "../../../../Shared/Shared.fs.js";

export class Model extends Record {
    constructor(loading, preference, unsavedPreference, preferenceEqualList, token, selectedProject, selectedProjectIndex, confirmAddProjectModal, confirmRemoveProjectModal, confirmSaveChangesModal, isPreferenceTab) {
        super();
        this.loading = loading;
        this.preference = preference;
        this.unsavedPreference = unsavedPreference;
        this.preferenceEqualList = preferenceEqualList;
        this.token = token;
        this.selectedProject = selectedProject;
        this.selectedProjectIndex = (selectedProjectIndex | 0);
        this.confirmAddProjectModal = confirmAddProjectModal;
        this.confirmRemoveProjectModal = confirmRemoveProjectModal;
        this.confirmSaveChangesModal = confirmSaveChangesModal;
        this.isPreferenceTab = isPreferenceTab;
    }
}

export function Model_$reflection() {
    return record_type("PreferencesTypes.Model", [], Model, () => [["loading", bool_type], ["preference", PreferenceResponse_$reflection()], ["unsavedPreference", PreferenceResponse_$reflection()], ["preferenceEqualList", list_type(bool_type)], ["token", string_type], ["selectedProject", Project_$reflection()], ["selectedProjectIndex", int32_type], ["confirmAddProjectModal", bool_type], ["confirmRemoveProjectModal", bool_type], ["confirmSaveChangesModal", bool_type], ["isPreferenceTab", bool_type]]);
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
    return union_type("PreferencesTypes.Msg", [], Msg, () => [[["Item", PreferenceResponse_$reflection()]], [["Item", class_type("System.Exception")]], [], [["Item1", Project_$reflection()], ["Item2", int32_type]], [], [], [], [], [], [], [], [], [], [], [["Item", string_type]], [["Item1", int32_type], ["Item2", bool_type]], [], [], [["Item", int32_type]], [["Item", int32_type]]]);
}

//# sourceMappingURL=PreferencesTypes.fs.js.map
