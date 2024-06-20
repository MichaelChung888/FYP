module Shared

open Thoth.Json
open System

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
        newPreferenceRankWhere: int
    }
    // Transform savePreferenceRequest -> JSON
    static member Encoder (addPreferenceRequest: AddPreferenceRequest) =
        Encode.object [
            "preference", string addPreferenceRequest.preference
            "newPreference", string addPreferenceRequest.newPreference
            "newPreferenceRank", int addPreferenceRequest.newPreferenceRankWhere
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

//--------------------------------------------------------------------------------------//
//                                Categories and Streams                                //
//--------------------------------------------------------------------------------------//

type FilterType = 
    | Category
    | Stream

let categories = ["embedded_systems"; "control_engineering"; "electronics"; "renewable_energy"; 
"biomedical_engineering"; "system_optimisation_and_modelling"; "high_performance_computing"; 
"computer_vision"; "digital_signal_processing"; "instrumentation_and_measurement"; "cybersecurity"; 
"robotics"; "signal_processing"; "power_systems"; "machine_learning"; "photonics"; "other"; "discrete_maths"; 
"mathematics_signals_and_systems"; "software_systems"; "communications"; "control_systems"; "information_processing"; 
"instruction_architectures_and_compilers"; "circuit_and_systems"; "power_electronics_and_power_systems"; "electromagnetism"]

let streams = ["E"; "I"; "T"; "D"; "J"]

let getFormattedCategory = function
    | "embedded_systems" -> "Embedded Systems"
    | "control_engineering" -> "Control Engineering"
    | "electronics" -> "Electronics"
    | "renewable_energy" -> "Renewable Energy"
    | "biomedical_engineering" -> "Biomedical Engineering"
    | "system_optimisation_and_modelling" -> "System Optimisation and Modelling"
    | "high_performance_computing" -> "High Performance Computing"
    | "computer_vision" -> "Computer Vision"
    | "digital_signal_processing" -> "Digital Signal Processing"
    | "instrumentation_and_measurement" -> "Instrumentation and Measurement"
    | "cybersecurity" -> "Cybersecurity"
    | "robotics" -> "Robotics"
    | "signal_processing" -> "Signal Processing"
    | "power_systems" -> "Power Systems"
    | "machine_learning" -> "Machine Learning"
    | "photonics" -> "Photonics"
    | "other" -> "Other"
    | "discrete_maths" -> "Discrete Maths"
    | "mathematics_signals_and_systems" -> "Mathematics, Signals and Systems"
    | "software_systems" -> "Software Systems"
    | "communications" -> "Communications"
    | "control_systems" -> "Control Systems"
    | "information_processing" -> "Information Processing"
    | "instruction_architectures_and_compilers" -> "Instruction Architectures and Compilers"
    | "circuit_and_systems" -> "Circuit and Systems"
    | "power_electronics_and_power_systems" -> "Power Electronics and Power Systems"
    | "electromagnetism" -> "Electromagnetism"
    | "E" -> "EEE3"
    | "I" -> "EIE3"
    | "T" -> "TECH4"
    | "D" -> "MANGEMENT4"
    | "J" -> "EIE4"
    | _ -> "Unknown Category"

