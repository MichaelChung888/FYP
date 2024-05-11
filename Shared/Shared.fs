module Shared

open Thoth.Json

type LoginInfo = 
    { 
        Username: string
        Password: string 
    }
    // Transform LoginInfo -> JSON
    static member Encoder (loginInfo: LoginInfo) =
        Encode.object [
            "username", Encode.string loginInfo.Username
            "password", Encode.string loginInfo.Password
        ]
    // Transform a JSON -> LoginInfo
    static member Decoder = 
        Decode.object (fun json -> {
            Username = json.Required.Field "username" Decode.string
            Password = json.Required.Field "password" Decode.string
        })



type AccountInfo =
    {
        PersonId: int
        Username: string
        Password: string
    }
    // Transform AccountInfo -> JSON
    static member Encoder (accountInfo: AccountInfo) =
        Encode.object [
            "personId", Encode.int accountInfo.PersonId
            "username", Encode.string accountInfo.Username
            "password", Encode.string accountInfo.Password
        ]
    // Transform a JSON -> AccountInfo
    static member Decoder = 
        Decode.object (fun json -> {
            PersonId = json.Required.Field "personId" Decode.int
            Username = json.Required.Field "username" Decode.string
            Password = json.Required.Field "password" Decode.string
        })



type ProjectInfo = 
    {
        Title: string
        Professor: string
        Description: string
    }
    // Transform ProjectInfo -> JSON
    static member Encoder (projectInfo: ProjectInfo) =
        Encode.object [
            "title", Encode.string projectInfo.Title
            "professor", Encode.string projectInfo.Professor
            "description", Encode.string projectInfo.Description
        ]
    // Transform a JSON -> ProjectInfo
    static member Decoder = 
        Decode.object (fun json -> {
            Title = json.Required.Field "title" Decode.string
            Professor = json.Required.Field "professor" Decode.string
            Description = json.Required.Field "description" Decode.string
        })