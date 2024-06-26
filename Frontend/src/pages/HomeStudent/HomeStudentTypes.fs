module HomeStudentTypes

open Shared

type Model = {
    loading: bool
    projects: List<Project>
    preference: PreferenceResponse
    token: string
}

type InitalLoad = {
    projects: List<Project>
    preference: PreferenceResponse
}

type Msg =
    | SuccessLoad of InitalLoad
    | Error of exn
    | Logout