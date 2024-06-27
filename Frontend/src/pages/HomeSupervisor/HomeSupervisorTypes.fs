module HomeSupervisorTypes

open Shared

type Model = {
    user: Person
    loading: bool
    proposals: List<Proposal>
    token: string
}

type Msg =
    | SuccessLoad of List<Proposal>
    | Error of exn
    | Logout
