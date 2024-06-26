import { Record, Union } from "./fable_modules/fable-library.4.1.4/Types.js";
import { Person_$reflection } from "../../Shared/Shared.fs.js";
import { record_type, string_type, union_type } from "./fable_modules/fable-library.4.1.4/Reflection.js";
import { view as view_7, update as update_1, init as init_1, Msg_$reflection as Msg_$reflection_1, Model_$reflection as Model_$reflection_1 } from "./pages/Login/Login.fs.js";
import { Msg_$reflection as Msg_$reflection_2, Model_$reflection as Model_$reflection_2 } from "./pages/HomeStudent/HomeStudentTypes.fs.js";
import { Msg_$reflection as Msg_$reflection_3, Model_$reflection as Model_$reflection_3 } from "./pages/Projects/ProjectsTypes.fs.js";
import { Msg_$reflection as Msg_$reflection_4, Model_$reflection as Model_$reflection_4 } from "./pages/Preferences/PreferencesTypes.fs.js";
import { Msg_$reflection as Msg_$reflection_5, Model_$reflection as Model_$reflection_5 } from "./pages/ProjectPropose/ProjectProposeTypes.fs.js";
import { Msg_$reflection as Msg_$reflection_6, Model_$reflection as Model_$reflection_6 } from "./pages/HomeSupervisor/HomeSupervisorTypes.fs.js";
import { Msg_$reflection as Msg_$reflection_7, Model_$reflection as Model_$reflection_7 } from "./pages/Proposals/ProposalsTypes.fs.js";
import { ofArray, singleton, tail, head, isEmpty } from "./fable_modules/fable-library.4.1.4/List.js";
import { RouterModule_router, RouterModule_nav, RouterModule_urlSegments } from "./fable_modules/Feliz.Router.4.0.0/./Router.fs.js";
import { Cmd_ofEffect } from "./fable_modules/Feliz.Router.4.0.0/../Fable.Elmish.4.1.0/cmd.fs.js";
import { Cmd_map, Cmd_none } from "./fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { view as view_1, init as init_2, update as update_2 } from "./pages/HomeStudent/HomeStudent.fs.js";
import { view as view_2, init as init_3, update as update_3 } from "./pages/Projects/Projects.fs.js";
import { view as view_3, init as init_4, update as update_4 } from "./pages/Preferences/Preferences.fs.js";
import { view as view_4, init as init_5, update as update_5 } from "./pages/ProjectPropose/ProjectPropose.fs.js";
import { view as view_5, init as init_6, update as update_6 } from "./pages/HomeSupervisor/HomeSupervisor.fs.js";
import { view as view_6, init as init_7, update as update_7 } from "./pages/Proposals/Proposals.fs.js";
import { createObj } from "./fable_modules/fable-library.4.1.4/Util.js";
import { singleton as singleton_1, delay, toList } from "./fable_modules/fable-library.4.1.4/Seq.js";
import { createElement } from "react";
import * as react from "react";
import { ProgramModule_mkProgram, ProgramModule_run } from "./fable_modules/Fable.Elmish.4.1.0/program.fs.js";
import { Program_withReactSynchronous } from "./fable_modules/Fable.Elmish.React.4.0.0/react.fs.js";
import "./styles.css";


export class ApplicationUser extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Anonymous", "LoggedIn"];
    }
}

export function ApplicationUser_$reflection() {
    return union_type("App.ApplicationUser", [], ApplicationUser, () => [[], [["Item", Person_$reflection()]]]);
}

export class Url extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["LoginUrl", "HomeStudentUrl", "ProjectsUrl", "PreferencesUrl", "ProjectProposeUrl", "HomeSupervisorUrl", "ProposalsUrl", "NotFoundUrl", "EmptyUrl"];
    }
}

export function Url_$reflection() {
    return union_type("App.Url", [], Url, () => [[], [], [], [], [], [], [], [], []]);
}

export class Page extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["LoginPage", "HomeStudentPage", "ProjectsPage", "PreferencesPage", "ProjectProposePage", "HomeSupervisorPage", "ProposalsPage", "NotFoundPage"];
    }
}

export function Page_$reflection() {
    return union_type("App.Page", [], Page, () => [[["Item", Model_$reflection_1()]], [["Item", Model_$reflection_2()]], [["Item", Model_$reflection_3()]], [["Item", Model_$reflection_4()]], [["Item", Model_$reflection_5()]], [["Item", Model_$reflection_6()]], [["Item", Model_$reflection_7()]], []]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["LoginMsg", "HomeStudentMsg", "ProjectsMsg", "PreferencesMsg", "ProjectProposeMsg", "HomeSupervisorMsg", "ProposalsMsg", "UrlChanged"];
    }
}

export function Msg_$reflection() {
    return union_type("App.Msg", [], Msg, () => [[["Item", Msg_$reflection_1()]], [["Item", Msg_$reflection_2()]], [["Item", Msg_$reflection_3()]], [["Item", Msg_$reflection_4()]], [["Item", Msg_$reflection_5()]], [["Item", Msg_$reflection_6()]], [["Item", Msg_$reflection_7()]], [["Item", Url_$reflection()]]]);
}

export class Model extends Record {
    constructor(user, currentUrl, currentPage, token) {
        super();
        this.user = user;
        this.currentUrl = currentUrl;
        this.currentPage = currentPage;
        this.token = token;
    }
}

export function Model_$reflection() {
    return record_type("App.Model", [], Model, () => [["user", ApplicationUser_$reflection()], ["currentUrl", Url_$reflection()], ["currentPage", Page_$reflection()], ["token", string_type]]);
}

export function parseUrl(_arg) {
    let matchResult;
    if (!isEmpty(_arg)) {
        switch (head(_arg)) {
            case "login": {
                if (isEmpty(tail(_arg))) {
                    matchResult = 1;
                }
                else {
                    matchResult = 8;
                }
                break;
            }
            case "home-student": {
                if (!isEmpty(tail(_arg))) {
                    switch (head(tail(_arg))) {
                        case "projects": {
                            if (isEmpty(tail(tail(_arg)))) {
                                matchResult = 3;
                            }
                            else {
                                matchResult = 8;
                            }
                            break;
                        }
                        case "preferences": {
                            if (isEmpty(tail(tail(_arg)))) {
                                matchResult = 4;
                            }
                            else {
                                matchResult = 8;
                            }
                            break;
                        }
                        default:
                            matchResult = 8;
                    }
                }
                else {
                    matchResult = 2;
                }
                break;
            }
            case "project-propose": {
                if (isEmpty(tail(_arg))) {
                    matchResult = 5;
                }
                else {
                    matchResult = 8;
                }
                break;
            }
            case "home-supervisor": {
                if (!isEmpty(tail(_arg))) {
                    if (head(tail(_arg)) === "proposals") {
                        if (isEmpty(tail(tail(_arg)))) {
                            matchResult = 7;
                        }
                        else {
                            matchResult = 8;
                        }
                    }
                    else {
                        matchResult = 8;
                    }
                }
                else {
                    matchResult = 6;
                }
                break;
            }
            default:
                matchResult = 8;
        }
    }
    else {
        matchResult = 0;
    }
    switch (matchResult) {
        case 0:
            return new Url(8, []);
        case 1:
            return new Url(0, []);
        case 2:
            return new Url(1, []);
        case 3:
            return new Url(2, []);
        case 4:
            return new Url(3, []);
        case 5:
            return new Url(4, []);
        case 6:
            return new Url(5, []);
        case 7:
            return new Url(6, []);
        default:
            return new Url(7, []);
    }
}

export function init() {
    let fullPath;
    const initialUrl = parseUrl((fullPath = (window.location.pathname + window.location.search), RouterModule_urlSegments(fullPath, 2)));
    const defaultModel = new Model(new ApplicationUser(0, []), initialUrl, new Page(7, []), "");
    switch (initialUrl.tag) {
        case 1:
            return [defaultModel, Cmd_ofEffect((_arg_1) => {
                RouterModule_nav(singleton("login"), 2, 2);
            })];
        case 2:
            return [defaultModel, Cmd_ofEffect((_arg_2) => {
                RouterModule_nav(singleton("login"), 2, 2);
            })];
        case 3:
            return [defaultModel, Cmd_ofEffect((_arg_3) => {
                RouterModule_nav(singleton("login"), 2, 2);
            })];
        case 4:
            return [defaultModel, Cmd_ofEffect((_arg_4) => {
                RouterModule_nav(singleton("login"), 2, 2);
            })];
        case 5:
            return [defaultModel, Cmd_ofEffect((_arg_5) => {
                RouterModule_nav(singleton("login"), 2, 2);
            })];
        case 6:
            return [defaultModel, Cmd_ofEffect((_arg_6) => {
                RouterModule_nav(singleton("login"), 2, 2);
            })];
        case 7:
            return [new Model(defaultModel.user, defaultModel.currentUrl, new Page(7, []), defaultModel.token), Cmd_none()];
        case 8:
            return [defaultModel, Cmd_ofEffect((_arg_7) => {
                RouterModule_nav(singleton("login"), 2, 2);
            })];
        default: {
            const patternInput = init_1();
            const page = patternInput[0];
            const msg = patternInput[1];
            return [new Model(defaultModel.user, defaultModel.currentUrl, new Page(0, [page]), defaultModel.token), Cmd_map((arg) => (new Msg(0, [arg])), msg)];
        }
    }
}

export function update(msg, model) {
    const updatePage = (page) => (new Model(model.user, model.currentUrl, page, model.token));
    const showPage = (page_1, url) => (new Model(model.user, url, page_1, model.token));
    const matchValue = model.currentPage;
    let matchResult, msg_1, page_2, msg_3, page_3, msg_5, page_4, msg_7, page_5, msg_9, page_6, msg_11, page_7, msg_13, page_8, nextUrl;
    switch (msg.tag) {
        case 1: {
            if (matchValue.tag === 1) {
                matchResult = 1;
                msg_3 = msg.fields[0];
                page_3 = matchValue.fields[0];
            }
            else {
                matchResult = 8;
            }
            break;
        }
        case 2: {
            if (matchValue.tag === 2) {
                matchResult = 2;
                msg_5 = msg.fields[0];
                page_4 = matchValue.fields[0];
            }
            else {
                matchResult = 8;
            }
            break;
        }
        case 3: {
            if (matchValue.tag === 3) {
                matchResult = 3;
                msg_7 = msg.fields[0];
                page_5 = matchValue.fields[0];
            }
            else {
                matchResult = 8;
            }
            break;
        }
        case 4: {
            if (matchValue.tag === 4) {
                matchResult = 4;
                msg_9 = msg.fields[0];
                page_6 = matchValue.fields[0];
            }
            else {
                matchResult = 8;
            }
            break;
        }
        case 5: {
            if (matchValue.tag === 5) {
                matchResult = 5;
                msg_11 = msg.fields[0];
                page_7 = matchValue.fields[0];
            }
            else {
                matchResult = 8;
            }
            break;
        }
        case 6: {
            if (matchValue.tag === 6) {
                matchResult = 6;
                msg_13 = msg.fields[0];
                page_8 = matchValue.fields[0];
            }
            else {
                matchResult = 8;
            }
            break;
        }
        case 7: {
            matchResult = 7;
            nextUrl = msg.fields[0];
            break;
        }
        default:
            if (matchValue.tag === 0) {
                matchResult = 0;
                msg_1 = msg.fields[0];
                page_2 = matchValue.fields[0];
            }
            else {
                matchResult = 8;
            }
    }
    switch (matchResult) {
        case 0:
            if (msg_1.tag === 2) {
                const res = msg_1.fields[0];
                const person = res.person;
                const matchValue_2 = person.categ;
                switch (matchValue_2) {
                    case "U":
                    case "M":
                        return [new Model(new ApplicationUser(1, [res.person]), model.currentUrl, model.currentPage, res.token), Cmd_ofEffect((_arg) => {
                            RouterModule_nav(singleton("home-student"), 1, 2);
                        })];
                    default:
                        return [new Model(new ApplicationUser(1, [res.person]), model.currentUrl, model.currentPage, res.token), Cmd_ofEffect((_arg_1) => {
                            RouterModule_nav(singleton("home-supervisor"), 1, 2);
                        })];
                }
            }
            else {
                const msg_2 = msg_1;
                const patternInput = update_1(msg_2, page_2);
                const newPage = patternInput[0];
                const newMsg = patternInput[1];
                return [updatePage(new Page(0, [newPage])), Cmd_map((arg) => (new Msg(0, [arg])), newMsg)];
            }
        case 1:
            if (msg_3.tag === 2) {
                return [new Model(new ApplicationUser(0, []), model.currentUrl, model.currentPage, ""), Cmd_ofEffect((_arg_2) => {
                    RouterModule_nav(singleton("login"), 1, 2);
                })];
            }
            else {
                const msg_4 = msg_3;
                const patternInput_1 = update_2(msg_4, page_3);
                const newPage_1 = patternInput_1[0];
                const newMsg_1 = patternInput_1[1];
                return [updatePage(new Page(1, [newPage_1])), Cmd_map((arg_1) => (new Msg(1, [arg_1])), newMsg_1)];
            }
        case 2:
            if (msg_5.tag === 2) {
                return [new Model(new ApplicationUser(0, []), model.currentUrl, model.currentPage, ""), Cmd_ofEffect((_arg_3) => {
                    RouterModule_nav(singleton("login"), 1, 2);
                })];
            }
            else {
                const msg_6 = msg_5;
                const patternInput_2 = update_3(msg_6, page_4);
                const newPage_2 = patternInput_2[0];
                const newMsg_2 = patternInput_2[1];
                return [updatePage(new Page(2, [newPage_2])), Cmd_map((arg_2) => (new Msg(2, [arg_2])), newMsg_2)];
            }
        case 3:
            if (msg_7.tag === 2) {
                return [new Model(new ApplicationUser(0, []), model.currentUrl, model.currentPage, ""), Cmd_ofEffect((_arg_4) => {
                    RouterModule_nav(singleton("login"), 1, 2);
                })];
            }
            else {
                const msg_8 = msg_7;
                const patternInput_3 = update_4(msg_8, page_5);
                const newPage_3 = patternInput_3[0];
                const newMsg_3 = patternInput_3[1];
                return [updatePage(new Page(3, [newPage_3])), Cmd_map((arg_3) => (new Msg(3, [arg_3])), newMsg_3)];
            }
        case 4:
            if (msg_9.tag === 2) {
                return [new Model(new ApplicationUser(0, []), model.currentUrl, model.currentPage, ""), Cmd_ofEffect((_arg_5) => {
                    RouterModule_nav(singleton("login"), 1, 2);
                })];
            }
            else {
                const msg_10 = msg_9;
                const patternInput_4 = update_5(msg_10, page_6);
                const newPage_4 = patternInput_4[0];
                const newMsg_4 = patternInput_4[1];
                return [updatePage(new Page(4, [newPage_4])), Cmd_map((arg_4) => (new Msg(4, [arg_4])), newMsg_4)];
            }
        case 5:
            if (msg_11.tag === 2) {
                return [new Model(new ApplicationUser(0, []), model.currentUrl, model.currentPage, ""), Cmd_ofEffect((_arg_6) => {
                    RouterModule_nav(singleton("login"), 1, 2);
                })];
            }
            else {
                const msg_12 = msg_11;
                const patternInput_5 = update_6(msg_12, page_7);
                const newPage_5 = patternInput_5[0];
                const newMsg_5 = patternInput_5[1];
                return [updatePage(new Page(5, [newPage_5])), Cmd_map((arg_5) => (new Msg(5, [arg_5])), newMsg_5)];
            }
        case 6:
            if (msg_13.tag === 2) {
                return [new Model(new ApplicationUser(0, []), model.currentUrl, model.currentPage, ""), Cmd_ofEffect((_arg_7) => {
                    RouterModule_nav(singleton("login"), 1, 2);
                })];
            }
            else {
                const msg_14 = msg_13;
                const patternInput_6 = update_7(msg_14, page_8);
                const newPage_6 = patternInput_6[0];
                const newMsg_6 = patternInput_6[1];
                return [updatePage(new Page(6, [newPage_6])), Cmd_map((arg_6) => (new Msg(6, [arg_6])), newMsg_6)];
            }
        case 7:
            switch (nextUrl.tag) {
                case 1:
                    if (model.user.tag === 1) {
                        const patternInput_8 = init_2(model.token);
                        const newPage_8 = patternInput_8[0];
                        const newMsg_8 = patternInput_8[1];
                        return [showPage(new Page(1, [newPage_8]), new Url(1, [])), Cmd_map((arg_8) => (new Msg(1, [arg_8])), newMsg_8)];
                    }
                    else {
                        return [model, Cmd_ofEffect((_arg_8) => {
                            RouterModule_nav(singleton("login"), 2, 2);
                        })];
                    }
                case 2:
                    if (model.user.tag === 1) {
                        const patternInput_9 = init_3(model.token);
                        const newPage_9 = patternInput_9[0];
                        const newMsg_9 = patternInput_9[1];
                        return [showPage(new Page(2, [newPage_9]), new Url(2, [])), Cmd_map((arg_9) => (new Msg(2, [arg_9])), newMsg_9)];
                    }
                    else {
                        return [model, Cmd_ofEffect((_arg_9) => {
                            RouterModule_nav(singleton("login"), 2, 2);
                        })];
                    }
                case 3:
                    if (model.user.tag === 1) {
                        const patternInput_10 = init_4(model.token);
                        const newPage_10 = patternInput_10[0];
                        const newMsg_10 = patternInput_10[1];
                        return [showPage(new Page(3, [newPage_10]), new Url(2, [])), Cmd_map((arg_10) => (new Msg(3, [arg_10])), newMsg_10)];
                    }
                    else {
                        return [model, Cmd_ofEffect((_arg_10) => {
                            RouterModule_nav(singleton("login"), 2, 2);
                        })];
                    }
                case 4: {
                    const matchValue_6 = model.user;
                    if (matchValue_6.tag === 1) {
                        const user_8 = matchValue_6.fields[0];
                        const patternInput_11 = init_5(model.token, user_8);
                        const newPage_11 = patternInput_11[0];
                        const newMsg_11 = patternInput_11[1];
                        return [showPage(new Page(4, [newPage_11]), new Url(2, [])), Cmd_map((arg_11) => (new Msg(4, [arg_11])), newMsg_11)];
                    }
                    else {
                        return [model, Cmd_ofEffect((_arg_11) => {
                            RouterModule_nav(singleton("login"), 2, 2);
                        })];
                    }
                }
                case 5: {
                    const matchValue_7 = model.user;
                    if (matchValue_7.tag === 1) {
                        const user_9 = matchValue_7.fields[0];
                        const patternInput_12 = init_6(model.token);
                        const newPage_12 = patternInput_12[0];
                        const newMsg_12 = patternInput_12[1];
                        return [showPage(new Page(5, [newPage_12]), new Url(5, [])), Cmd_map((arg_12) => (new Msg(5, [arg_12])), newMsg_12)];
                    }
                    else {
                        return [model, Cmd_ofEffect((_arg_12) => {
                            RouterModule_nav(singleton("login"), 2, 2);
                        })];
                    }
                }
                case 6: {
                    const matchValue_8 = model.user;
                    if (matchValue_8.tag === 1) {
                        const user_10 = matchValue_8.fields[0];
                        const patternInput_13 = init_7(model.token);
                        const newPage_13 = patternInput_13[0];
                        const newMsg_13 = patternInput_13[1];
                        return [showPage(new Page(6, [newPage_13]), new Url(6, [])), Cmd_map((arg_13) => (new Msg(6, [arg_13])), newMsg_13)];
                    }
                    else {
                        return [model, Cmd_ofEffect((_arg_13) => {
                            RouterModule_nav(singleton("login"), 2, 2);
                        })];
                    }
                }
                case 7:
                    return [showPage(new Page(7, []), new Url(7, [])), Cmd_none()];
                case 8:
                    return [model, Cmd_ofEffect((_arg_14) => {
                        RouterModule_nav(singleton("login"), 2, 2);
                    })];
                default: {
                    const patternInput_7 = init_1();
                    const newPage_7 = patternInput_7[0];
                    const newMsg_7 = patternInput_7[1];
                    return [showPage(new Page(0, [newPage_7]), new Url(0, [])), Cmd_map((arg_7) => (new Msg(0, [arg_7])), newMsg_7)];
                }
            }
        default:
            return [model, Cmd_none()];
    }
}

export function view(model, dispatch) {
    let elements;
    return RouterModule_router(createObj(ofArray([["hashMode", 2], ["onUrlChanged", (arg_2) => {
        dispatch(new Msg(7, [parseUrl(arg_2)]));
    }], (elements = toList(delay(() => {
        const matchValue = model.currentPage;
        switch (matchValue.tag) {
            case 1: {
                const page_1 = matchValue.fields[0];
                return singleton_1(view_1(page_1, (arg_6) => {
                    dispatch(new Msg(1, [arg_6]));
                }));
            }
            case 2: {
                const page_2 = matchValue.fields[0];
                return singleton_1(view_2(page_2, (arg_8) => {
                    dispatch(new Msg(2, [arg_8]));
                }));
            }
            case 3: {
                const page_3 = matchValue.fields[0];
                return singleton_1(view_3(page_3, (arg_10) => {
                    dispatch(new Msg(3, [arg_10]));
                }));
            }
            case 4: {
                const page_4 = matchValue.fields[0];
                return singleton_1(view_4(page_4, (arg_12) => {
                    dispatch(new Msg(4, [arg_12]));
                }));
            }
            case 5: {
                const page_5 = matchValue.fields[0];
                return singleton_1(view_5(page_5, (arg_14) => {
                    dispatch(new Msg(5, [arg_14]));
                }));
            }
            case 6: {
                const page_6 = matchValue.fields[0];
                return singleton_1(view_6(page_6, (arg_16) => {
                    dispatch(new Msg(6, [arg_16]));
                }));
            }
            case 7:
                return singleton_1(createElement("p", {
                    children: ["Not Found"],
                }));
            default: {
                const page = matchValue.fields[0];
                return singleton_1(view_7(page, (arg_4) => {
                    dispatch(new Msg(0, [arg_4]));
                }));
            }
        }
    })), ["application", react.createElement(react.Fragment, {}, ...elements)])])));
}

ProgramModule_run(Program_withReactSynchronous("elmish-app", ProgramModule_mkProgram(init, update, view)));

//# sourceMappingURL=App.fs.js.map
