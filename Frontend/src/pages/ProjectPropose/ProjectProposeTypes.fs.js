import { Record, Union } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { class_type, record_type, option_type, list_type, string_type, bool_type, union_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { Person_$reflection } from "../../../../Shared/Shared.fs.js";

export class ResponseResult extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Success", "Failed", "Neither"];
    }
}

export function ResponseResult_$reflection() {
    return union_type("ProjectProposeTypes.ResponseResult", [], ResponseResult, () => [[], [], []]);
}

export class Model extends Record {
    constructor(loading, token, user, projectTitle, selectedCategories, selectedStreams, requirements, description, skills, meetings, validationMessage, responseResult) {
        super();
        this.loading = loading;
        this.token = token;
        this.user = user;
        this.projectTitle = projectTitle;
        this.selectedCategories = selectedCategories;
        this.selectedStreams = selectedStreams;
        this.requirements = requirements;
        this.description = description;
        this.skills = skills;
        this.meetings = meetings;
        this.validationMessage = validationMessage;
        this.responseResult = responseResult;
    }
}

export function Model_$reflection() {
    return record_type("ProjectProposeTypes.Model", [], Model, () => [["loading", bool_type], ["token", string_type], ["user", Person_$reflection()], ["projectTitle", string_type], ["selectedCategories", list_type(string_type)], ["selectedStreams", list_type(string_type)], ["requirements", string_type], ["description", string_type], ["skills", string_type], ["meetings", string_type], ["validationMessage", option_type(string_type)], ["responseResult", ResponseResult_$reflection()]]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SuccessLoad", "Error", "Logout", "ProjectTitleChanged", "ClickedCategoryTag", "ClickedStreamTag", "RequirementsChanged", "SkillsChanged", "DescriptionChanged", "MeetingsChanged", "Submit"];
    }
}

export function Msg_$reflection() {
    return union_type("ProjectProposeTypes.Msg", [], Msg, () => [[["Item", string_type]], [["Item", class_type("System.Exception")]], [], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", class_type("Browser.Types.Event", void 0)]]]);
}

//# sourceMappingURL=ProjectProposeTypes.fs.js.map
