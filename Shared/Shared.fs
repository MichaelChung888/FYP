module Shared

open Thoth.Json

type LoginInfo = 
    { 
        eeid: string
    }
    // Transform LoginInfo -> JSON
    static member Encoder (loginInfo: LoginInfo) =
        Encode.object [
            "eeid", Encode.string loginInfo.eeid
        ]
    // Transform a JSON -> LoginInfo
    static member Decoder = 
        Decode.object (fun json -> {
            eeid = json.Required.Field "eeid" Decode.string
        })


//SELECT eeid, CID, Categ, RegWant, Forenames FROM dbo.eedbo_eepx WHERE eeid = @eeid
type AccountInfo =
    {
        eeid: string
        CID: string
        Categ: string
        RegWant: string
        Forenames: string
    }
    // Transform AccountInfo -> JSON
    static member Encoder (accountInfo: AccountInfo) =
        Encode.object [
            "eeid", Encode.string accountInfo.eeid
            "cid", Encode.string accountInfo.CID
            "categ", Encode.string accountInfo.Categ
            "regWant", Encode.string accountInfo.RegWant
            "forenames", Encode.string accountInfo.Forenames
        ]
    // Transform a JSON -> AccountInfo
    static member Decoder = 
        Decode.object (fun json -> {
            eeid = json.Required.Field "eeid" Decode.string
            CID = json.Required.Field "cid" Decode.string
            Categ = json.Required.Field "categ" Decode.string
            RegWant = json.Required.Field "regWant" Decode.string
            Forenames = json.Required.Field "forenames" Decode.string
        })



type ProjectInfo = 
    {
        ProjectId: string
        Title: string
        Professor: string
        Description: string
    }
    // Transform ProjectInfo -> JSON
    static member Encoder (projectInfo: ProjectInfo) =
        Encode.object [
            "projectId", Encode.string projectInfo.ProjectId
            "title", Encode.string projectInfo.Title
            "professor", Encode.string projectInfo.Professor
            "description", Encode.string projectInfo.Description
        ]
    // Transform a JSON -> ProjectInfo
    static member Decoder = 
        Decode.object (fun json -> {
            ProjectId = json.Required.Field "projectId" Decode.string
            Title = json.Required.Field "title" Decode.string
            Professor = json.Required.Field "professor" Decode.string
            Description = json.Required.Field "description" Decode.string
        })