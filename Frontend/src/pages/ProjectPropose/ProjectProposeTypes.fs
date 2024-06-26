module ProjectProposeTypes

open Shared

type ResponseResult = 
    | Success
    | Failed
    | Neither

type Model = {
    loading: bool
    token: string
    user: Person
    projectTitle: string
    selectedCategories: List<string>
    selectedStreams: List<string>
    requirements: string
    description: string
    skills: string
    meetings: string
    validationMessage: string option
    responseResult: ResponseResult
}

type Msg =
    | SuccessLoad of string
    | Error of exn
    | Logout
    | ProjectTitleChanged of string
    | ClickedCategoryTag of string 
    | ClickedStreamTag of string 
    | RequirementsChanged of string
    | SkillsChanged of string
    | DescriptionChanged of string
    | MeetingsChanged of string
    | Submit of Browser.Types.Event

