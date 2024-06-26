module Shared

open Thoth.Json
open System

//--------------------------------------------------------------------------------------//
//                                       Origins                                        //
//--------------------------------------------------------------------------------------//

let [<Literal>] Client = "http://localhost:5173"
let [<Literal>] Server = "http://localhost:1234"

//--------------------------------------------------------------------------------------//
//                                       Requests                                       //
//--------------------------------------------------------------------------------------//

type LoginRequest = 
    { 
        eeid: string
    }
    // Transform Login -> JSON
    static member Encoder (loginInfo: LoginRequest) =
        Encode.object [
            "eeid", Encode.string loginInfo.eeid
        ]
    // Transform a JSON -> Login
    static member Decoder = 
        Decode.object (fun json -> {
            eeid = json.Required.Field "eeid" Decode.string
        })



let encodeStringList (list: string list) =
    list |> List.map Encode.string |> Encode.list

type SearchRequest =
    {
        title: string
        professor: string
        categories: string list
        streams: string list
    }
    // Transform searchRequest -> JSON
    static member Encoder (searchRequest: SearchRequest) =
        Encode.object [
            "title", Encode.string searchRequest.title
            "professor", Encode.string searchRequest.professor
            "categories", encodeStringList searchRequest.categories
            "streams",  encodeStringList searchRequest.streams
        ]



let encodeIntList (list: List<int>) =
    list |> List.map Encode.int |> Encode.list

type SavePreferenceRequest =
    {
        comments: string
        doc: bool
        preference: List<int>
        newPreference: List<int>
        newPreferenceRanks: List<int>
    }
    // Transform savePreferenceRequest -> JSON
    static member Encoder (savePreferenceRequest: SavePreferenceRequest) =
        Encode.object [
            "comments", Encode.string savePreferenceRequest.comments
            "doc", Encode.bool savePreferenceRequest.doc
            "preference", encodeIntList savePreferenceRequest.preference
            "newPreference", encodeIntList savePreferenceRequest.newPreference
            "newPreferenceRanks", encodeIntList savePreferenceRequest.newPreferenceRanks
        ]



type AddPreferenceRequest =
    {
        preference: int
        newPreference: int
        newPreferenceIndex: int
    }
    // Transform savePreferenceRequest -> JSON
    static member Encoder (addPreferenceRequest: AddPreferenceRequest) =
        Encode.object [
            "preference", string addPreferenceRequest.preference
            "newPreference", string addPreferenceRequest.newPreference
            "newPreferenceRank", int addPreferenceRequest.newPreferenceIndex
        ]



type ProjectProposeRequest =
    {
        isStudent: bool
        title: string
        categories: List<string>
        streams: List<string>
        requirements: string
        description: string
        skills: string
        meetings: string
    }
    // Transform savePreferenceRequest -> JSON
    static member Encoder (studentPreferenceRequest: ProjectProposeRequest) =
        Encode.object [
            "title", Encode.string studentPreferenceRequest.title
            "isStudent", Encode.bool studentPreferenceRequest.isStudent
            "categories", encodeStringList studentPreferenceRequest.categories
            "streams", encodeStringList studentPreferenceRequest.streams
            "requirements", Encode.string studentPreferenceRequest.requirements
            "description", Encode.string studentPreferenceRequest.description
            "skills", Encode.string studentPreferenceRequest.skills
            "meetings", Encode.string studentPreferenceRequest.meetings
        ]



type EditProposalRequest =
    {
        pid: int
        isStudent: bool
        title: string
        categories: List<string>
        streams: List<string>
        requirements: string
        description: string
        skills: string
        meetings: string
    }
    // Transform savePreferenceRequest -> JSON
    static member Encoder (projectEditRequest: EditProposalRequest) =
        Encode.object [
            "pid", Encode.int projectEditRequest.pid
            "title", Encode.string projectEditRequest.title
            "isStudent", Encode.bool projectEditRequest.isStudent
            "categories", encodeStringList projectEditRequest.categories
            "streams", encodeStringList projectEditRequest.streams
            "requirements", Encode.string projectEditRequest.requirements
            "description", Encode.string projectEditRequest.description
            "skills", Encode.string projectEditRequest.skills
            "meetings", Encode.string projectEditRequest.meetings
        ]



type DeleteProposalRequest =
    {
        isStudent: bool
        pid: int
    }
    // Transform savePreferenceRequest -> JSON
    static member Encoder (deleteProposalRequest: DeleteProposalRequest) =
        Encode.object [
            "isStudent", Encode.bool deleteProposalRequest.isStudent
            "proposal", Encode.int deleteProposalRequest.pid
        ]



type EditSuitabilityRequest =
    {
        applicantId: string
        rank: int
        newSuitability: string
        isStudent: bool
    }
    // Transform savePreferenceRequest -> JSON
    static member Encoder (editSuitabilityRequest: EditSuitabilityRequest) =
        Encode.object [
            "applicantId", Encode.string editSuitabilityRequest.applicantId
            "rank", Encode.int editSuitabilityRequest.rank
            "newSuitability", Encode.string editSuitabilityRequest.newSuitability
            "isStudent", Encode.bool editSuitabilityRequest.isStudent
        ]

//--------------------------------------------------------------------------------------//
//                                      Responses                                       //
//--------------------------------------------------------------------------------------//

type Person =
    {
        eeid: string
        cid: string
        categ: string
        regWant: string
        forenames: string
    }
    // Transform a JSON -> Account
    static member Decoder = 
        Decode.object (fun json -> {
            eeid = json.Required.Field "eeid" Decode.string
            cid = json.Required.Field "cid" Decode.string
            categ = json.Required.Field "categ" Decode.string
            regWant = json.Required.Field "regWant" Decode.string
            forenames = json.Required.Field "forenames" Decode.string
        })



type Account = 
    {
        person: Person
        token: string
    }
    // Transform a JSON -> LoginResponse
    static member Decoder = 
        Decode.object (fun json -> {
            person = json.Required.Field "person" Person.Decoder
            token = json.Required.Field "token" Decode.string
        })



type Project = 
    {
        pid: int
        sup: string
        supName: string
        title: string
        comments: string 
        tstream: string
        student: string 
        descr: string
        r1: int; r2: int; r3: int; r4: int; r5: int; r6: int; r7: int; r8: int; r9: int; r10: int
        categories: string
        updated: DateTime
        requirements: string
        skills: string
        meetings: string
    }
    static member Decoder = 
        Decode.object (fun json -> {
            pid = json.Required.Field "pid" Decode.int
            sup = json.Required.Field "sup" Decode.string
            supName = json.Required.Field "supName" Decode.string
            title = json.Required.Field "title" Decode.string
            comments = json.Required.Field "comments" Decode.string
            tstream = json.Required.Field "tstream" Decode.string
            student = json.Required.Field "student" Decode.string
            descr = json.Required.Field "descr" Decode.string
            r1 = json.Required.Field "r1" Decode.int
            r2 = json.Required.Field "r2" Decode.int
            r3 = json.Required.Field "r3" Decode.int
            r4 = json.Required.Field "r4" Decode.int
            r5 = json.Required.Field "r5" Decode.int
            r6 = json.Required.Field "r6" Decode.int
            r7 = json.Required.Field "r7" Decode.int
            r8 = json.Required.Field "r8" Decode.int
            r9 = json.Required.Field "r9" Decode.int
            r10 = json.Required.Field "r10" Decode.int
            categories = json.Required.Field "categories" Decode.string
            updated = json.Required.Field "updated" Decode.datetimeLocal
            requirements = json.Required.Field "requirements" Decode.string
            skills = json.Required.Field "skills" Decode.string
            meetings = json.Required.Field "meetings" Decode.string
        })
    static member Default =
        {
            pid = 0
            sup = ""
            supName = ""
            title = ""
            comments = ""
            tstream = ""
            student = ""
            descr = ""
            r1 = 0; r2 = 0; r3 = 0; r4 = 0; r5 = 0; r6 = 0; r7 = 0; r8 = 0; r9 = 0; r10 = 0
            categories = ""
            updated = DateTime.Now
            requirements = ""
            skills = ""
            meetings = ""
        }



type Preference = 
    {
        eeid: string
        p1: int; p2: int; p3: int; p4: int; p5: int; p6: int; p7: int; p8: int; p9: int; p10: int
        n1: int; n2: int; n3: int; n4: int; n5: int; n6: int; n7: int; n8: int; n9: int; n10: int
        s1: string; s2: string; s3: string; s4: string; s5: string; s6: string; s7: string; s8: string; s9: string; s10:string
        upddate: DateTime
        comments: string
        feedback: string
        doc: bool
    }
    static member Decoder = 
        Decode.object (fun json -> {
            eeid = json.Required.Field "eeid" Decode.string
            p1 = json.Required.Field "p1" Decode.int
            p2 = json.Required.Field "p2" Decode.int
            p3 = json.Required.Field "p3" Decode.int
            p4 = json.Required.Field "p4" Decode.int
            p5 = json.Required.Field "p5" Decode.int
            p6 = json.Required.Field "p6" Decode.int
            p7 = json.Required.Field "p7" Decode.int
            p8 = json.Required.Field "p8" Decode.int
            p9 = json.Required.Field "p9" Decode.int
            p10 = json.Required.Field "p10" Decode.int
            n1 = json.Required.Field "n1" Decode.int
            n2 = json.Required.Field "n2" Decode.int
            n3 = json.Required.Field "n3" Decode.int
            n4 = json.Required.Field "n4" Decode.int
            n5 = json.Required.Field "n5" Decode.int
            n6 = json.Required.Field "n6" Decode.int
            n7 = json.Required.Field "n7" Decode.int
            n8 = json.Required.Field "n8" Decode.int
            n9 = json.Required.Field "n9" Decode.int
            n10 = json.Required.Field "n10" Decode.int
            s1 = json.Required.Field "s1" Decode.string
            s2 = json.Required.Field "s2" Decode.string
            s3 = json.Required.Field "s3" Decode.string
            s4 = json.Required.Field "s4" Decode.string
            s5 = json.Required.Field "s5" Decode.string
            s6 = json.Required.Field "s6" Decode.string
            s7 = json.Required.Field "s7" Decode.string
            s8 = json.Required.Field "s8" Decode.string
            s9 = json.Required.Field "s9" Decode.string
            s10 = json.Required.Field "s10" Decode.string
            upddate = json.Required.Field "upddate" Decode.datetimeLocal
            comments = json.Required.Field "comments" Decode.string
            feedback = json.Required.Field "feedback" Decode.string
            doc = json.Required.Field "doc" Decode.bool
        })



type PreferenceResponse = 
    {
        eeid: string
        p1: Project; p2: Project; p3: Project; p4: Project; p5: Project; p6: Project; p7: Project; p8: Project; p9: Project; p10: Project
        n1: int; n2: int; n3: int; n4: int; n5: int; n6: int; n7: int; n8: int; n9: int; n10: int
        s1: string; s2: string; s3: string; s4: string; s5: string; s6: string; s7: string; s8: string; s9: string; s10:string
        upddate: DateTime
        comments: string
        feedback: string
        doc: bool
    }
    static member Decoder = 
        Decode.object (fun json -> {
            eeid = json.Required.Field "eeid" Decode.string
            p1 = json.Required.Field "p1" Project.Decoder
            p2 = json.Required.Field "p2" Project.Decoder
            p3 = json.Required.Field "p3" Project.Decoder
            p4 = json.Required.Field "p4" Project.Decoder
            p5 = json.Required.Field "p5" Project.Decoder
            p6 = json.Required.Field "p6" Project.Decoder
            p7 = json.Required.Field "p7" Project.Decoder
            p8 = json.Required.Field "p8" Project.Decoder
            p9 = json.Required.Field "p9" Project.Decoder
            p10 = json.Required.Field "p10" Project.Decoder
            n1 = json.Required.Field "n1" Decode.int
            n2 = json.Required.Field "n2" Decode.int
            n3 = json.Required.Field "n3" Decode.int
            n4 = json.Required.Field "n4" Decode.int
            n5 = json.Required.Field "n5" Decode.int
            n6 = json.Required.Field "n6" Decode.int
            n7 = json.Required.Field "n7" Decode.int
            n8 = json.Required.Field "n8" Decode.int
            n9 = json.Required.Field "n9" Decode.int
            n10 = json.Required.Field "n10" Decode.int
            s1 = json.Required.Field "s1" Decode.string
            s2 = json.Required.Field "s2" Decode.string
            s3 = json.Required.Field "s3" Decode.string
            s4 = json.Required.Field "s4" Decode.string
            s5 = json.Required.Field "s5" Decode.string
            s6 = json.Required.Field "s6" Decode.string
            s7 = json.Required.Field "s7" Decode.string
            s8 = json.Required.Field "s8" Decode.string
            s9 = json.Required.Field "s9" Decode.string
            s10 = json.Required.Field "s10" Decode.string
            upddate = json.Required.Field "upddate" Decode.datetimeLocal
            comments = json.Required.Field "comments" Decode.string
            feedback = json.Required.Field "feedback" Decode.string
            doc = json.Required.Field "doc" Decode.bool
        })
    static member Default =
        {
            eeid = ""
            p1 = Project.Default; p2 = Project.Default; p3 = Project.Default; p4 = Project.Default; p5 = Project.Default
            p6 = Project.Default; p7 = Project.Default; p8 = Project.Default; p9 = Project.Default; p10 = Project.Default
            n1 = 1; n2 = 2; n3 = 3; n4 = 4; n5 = 5; n6 = 6; n7 = 7; n8 = 8; n9 = 9; n10 = 10;
            s1 = "Pending"; s2 = "Pending"; s3 = "Pending"; s4 = "Pending"; s5 = "Pending"; 
            s6 = "Pending"; s7 = "Pending"; s8 = "Pending"; s9 = "Pending"; s10 = "Pending";
            upddate = DateTime.Now
            comments = ""
            feedback = ""
            doc = false
        }



type ProjectPopularity = 
    {
        pid: string
        p1Count: int; p2Count: int; p3Count: int; p4Count: int; p5Count: int; 
        p6Count: int; p7Count: int; p8Count: int; p9Count: int; p10Count: int
    }
    static member Decoder = 
        Decode.object (fun json -> {
            pid = json.Required.Field "pid" Decode.string
            p1Count = json.Required.Field "p1Count" Decode.int
            p2Count = json.Required.Field "p2Count" Decode.int
            p3Count = json.Required.Field "p3Count" Decode.int
            p4Count = json.Required.Field "p4Count" Decode.int
            p5Count = json.Required.Field "p5Count" Decode.int
            p6Count = json.Required.Field "p6Count" Decode.int
            p7Count = json.Required.Field "p7Count" Decode.int
            p8Count = json.Required.Field "p8Count" Decode.int
            p9Count = json.Required.Field "p9Count" Decode.int
            p10Count = json.Required.Field "p10Count" Decode.int
        })



type Applicant =
    {
        eeid: string
        forenames: string
        preference: int
        suitability: string
    }
    static member Decoder =
        Decode.object (fun json -> {
            eeid = json.Required.Field "eeid" Decode.string
            forenames = json.Required.Field "forenames" Decode.string
            preference = json.Required.Field "preference" Decode.int
            suitability = json.Required.Field "suitability" Decode.string
        })



type Proposal =
    {
        project: Project
        applicants: List<Applicant>
    }
    static member Decoder =
        Decode.object (fun json -> {
            project = json.Required.Field "project" Project.Decoder
            applicants = json.Required.Field "applicants" (Decode.list Applicant.Decoder)
        })
    static member Default =
        {
            project = Project.Default;
            applicants = [];
        }
