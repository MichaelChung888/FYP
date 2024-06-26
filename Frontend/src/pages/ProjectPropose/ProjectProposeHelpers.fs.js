import { length } from "../../fable_modules/fable-library.4.1.4/List.js";
import { isStudent } from "../../Common.fs.js";

export function titleValid(model) {
    return model.projectTitle !== "";
}

export function requirementsValid(model) {
    return model.requirements !== "";
}

export function skillsValid(model) {
    return model.skills !== "";
}

export function descriptionValid(model) {
    return model.description !== "";
}

export function meetingsValid(model) {
    return model.meetings !== "";
}

export function streamValid(model) {
    return length(model.selectedStreams) > 0;
}

export function categoryValid(model) {
    return length(model.selectedCategories) > 0;
}

export function isFormValid(model) {
    if (isStudent(model.user)) {
        if ((titleValid(model) && descriptionValid(model)) && meetingsValid(model)) {
            return categoryValid(model);
        }
        else {
            return false;
        }
    }
    else if (((((titleValid(model) && requirementsValid(model)) && skillsValid(model)) && descriptionValid(model)) && meetingsValid(model)) && categoryValid(model)) {
        return streamValid(model);
    }
    else {
        return false;
    }
}

//# sourceMappingURL=ProjectProposeHelpers.fs.js.map
