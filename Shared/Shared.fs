module Shared

open Thoth.Json
open System

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
        categories: string list
        streams: string list
    }
    // Transform searchRequest -> JSON
    static member Encoder (searchRequest: SearchRequest) =
        Encode.object [
            "title", Encode.string searchRequest.title
            "categories", encodeStringList searchRequest.categories
            "streams",  encodeStringList searchRequest.streams
        ]



type Person =
    {
        eeid: string
        cid: string
        categ: string
        regWant: string
        forenames: string
    }
    // Transform Account -> JSON
    static member Encoder (accountInfo: Person) =
        Encode.object [
            "eeid", Encode.string accountInfo.eeid
            "cid", Encode.string accountInfo.cid
            "categ", Encode.string accountInfo.categ
            "regWant", Encode.string accountInfo.regWant
            "forenames", Encode.string accountInfo.forenames
        ]
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
    // Transform LoginResponse -> JSON
    static member Encoder (loginResponse: Account) =
        Encode.object [
            "person", Person.Encoder loginResponse.person
            "token", Encode.string loginResponse.token
        ]
    // Transform a JSON -> LoginResponse
    static member Decoder = 
        Decode.object (fun json -> {
            person = json.Required.Field "person" Person.Decoder
            token = json.Required.Field "token" Decode.string
        })



type Project = 
    {
        pid: string
        title: string
        comments: string 
        tstream: string
        student: string 
        descr: string
        p1: int; p2: int; p3: int; p4: int; p5: int; p6: int; p7: int; p8: int; p9: int; p10: int
        categories: string
        updated: DateTime
        requirements: string
        skills: string
        meetings: string
    }
    static member Decoder = 
        Decode.object (fun json -> {
            pid = json.Required.Field "pid" Decode.string
            title = json.Required.Field "title" Decode.string
            comments = json.Required.Field "comments" Decode.string
            tstream = json.Required.Field "tstream" Decode.string
            student = json.Required.Field "student" Decode.string
            descr = json.Required.Field "descr" Decode.string
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
            categories = json.Required.Field "categories" Decode.string
            updated = json.Required.Field "updated" Decode.datetimeLocal
            requirements = json.Required.Field "requirements" Decode.string
            skills = json.Required.Field "skills" Decode.string
            meetings = json.Required.Field "meetings" Decode.string
        })
    static member Default =
        {
            pid = "-"
            title = ""
            comments = ""
            tstream = ""
            student = ""
            descr = ""
            p1 = 0; p2 = 0; p3 = 0; p4 = 0; p5 = 0; p6 = 0; p7 = 0; p8 = 0; p9 = 0; p10 = 0
            categories = ""
            updated = DateTime.Now
            requirements = ""
            skills = ""
            meetings = ""
        }



type Preference = 
    {
        eeid: string
        p1: string; p2: string; p3: string; p4: string; p5: string; p6: string; p7: string; p8: string; p9: string; p10: string
        n1: int; n2: int; n3: int; n4: int; n5: int; n6: int; n7: int; n8: int; n9: int; n10: int
        upddate: DateTime
        comments: string
        feedback: string
    }
    static member Decoder = 
        Decode.object (fun json -> {
            eeid = json.Required.Field "eeid" Decode.string
            p1 = json.Required.Field "p1" Decode.string
            p2 = json.Required.Field "p2" Decode.string
            p3 = json.Required.Field "p3" Decode.string
            p4 = json.Required.Field "p4" Decode.string
            p5 = json.Required.Field "p5" Decode.string
            p6 = json.Required.Field "p6" Decode.string
            p7 = json.Required.Field "p7" Decode.string
            p8 = json.Required.Field "p8" Decode.string
            p9 = json.Required.Field "p9" Decode.string
            p10 = json.Required.Field "p10" Decode.string
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
        })



type PreferenceResponse = 
    {
        eeid: string
        p1: Project; p2: Project; p3: Project; p4: Project; p5: Project; p6: Project; p7: Project; p8: Project; p9: Project; p10: Project
        n1: int; n2: int; n3: int; n4: int; n5: int; n6: int; n7: int; n8: int; n9: int; n10: int
        upddate: DateTime
        comments: string
        feedback: string
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
        })
    static member Default =
        {
            eeid = ""
            p1 = Project.Default; p2 = Project.Default; p3 = Project.Default; p4 = Project.Default; p5 = Project.Default
            p6 = Project.Default; p7 = Project.Default; p8 = Project.Default; p9 = Project.Default; p10 = Project.Default
            n1 = 0; n2 = 0; n3 = 0; n4 = 0; n5 = 0; n6 = 0; n7 = 0; n8 = 0; n9 = 0; n10 = 0;
            upddate = DateTime.Now
            comments = ""
            feedback = ""
        }

//--------------------------------------------------------------------------------------//
//                                       Helpers                                        //
//--------------------------------------------------------------------------------------//

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