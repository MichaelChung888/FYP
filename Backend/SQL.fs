module SQL

open Shared
open JWT

open Microsoft.AspNetCore.Http
open Microsoft.Data.SqlClient
open Giraffe
open System.Data
open Newtonsoft.Json
open System.IdentityModel.Tokens.Jwt

open System.Security.Claims

open Thoth.Json

open dotenv.net
open dotenv.net.Utilities

//--------------------------------------------------------------------------------------//
//                                        DotEnv                                        //
//--------------------------------------------------------------------------------------//

DotEnv.Load()

//--------------------------------------------------------------------------------------//
//                            Opening Connection to Database                            //
//--------------------------------------------------------------------------------------//

let connString = (EnvReader.GetStringValue "KEY")
let conn = new SqlConnection (connString)
conn.Open()

//--------------------------------------------------------------------------------------//
//                         Execute SQL Command and return JSON                          //
//--------------------------------------------------------------------------------------//

let ExecuteQuery (command: SqlCommand) : Result<string, SqlException> = 
    try 
        let reader = command.ExecuteReader()
        let dataTable = new DataTable();
        dataTable.Load(reader)
        Ok (JsonConvert.SerializeObject(dataTable, Formatting.Indented));
    with
        | :? SqlException as ex -> Error ex

//--------------------------------------------------------------------------------------//
//                         All Required Fields from all Tables                          //
//--------------------------------------------------------------------------------------//

let allPersonFields = "eeid, CID, Categ, RegWant, Forenames"
let allProjectFields = "e.Forenames as supName, ps.TITLE, ps.TSTREAM, ps.COMMENTS, ps.STUDENT, ps.DESCR, ps.SUP, pe.*"
let allPreferenceFields = "EEID, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, N1, N2, N3, N4, N5, N6, N7, N8, N9, N10, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, UPDDATE, COMMENTS, FEEDBACK, DOC"
let allApplicantsFields = "EEID, "

//--------------------------------------------------------------------------------------//
//                                    SQL Statements                                    //
//--------------------------------------------------------------------------------------//

let loginAuthenticateSQL (eeid: string) : List<Person> =
    let loginAuthenticateCmd = new SqlCommand (
        $"SELECT {allPersonFields} 
        FROM eedbo_eepx 
        WHERE eeid = @eeid;", conn)
    loginAuthenticateCmd.Parameters.AddWithValue("@eeid", eeid) |> ignore
    let jsonQuery = ExecuteQuery(loginAuthenticateCmd)
    match jsonQuery with
    | Ok jsonQuery -> JsonConvert.DeserializeObject<List<Person>>(jsonQuery);
    | Error ex -> printfn "%A" ex; []



let newProjectSQL () : List<Project> =
    let projectCmd = new SqlCommand (
        $"SELECT TOP 8 {allProjectFields} 
        FROM eedbo_eepx e
        JOIN eedbo_projects_sqlserver ps ON e.eeid = ps.SUP
        JOIN eedbo_projects_extra pe ON ps.PID = pe.PID
        WHERE ps.STUDENT = ''
        ORDER BY pe.updated DESC", conn)
    let jsonQuery = ExecuteQuery(projectCmd)
    match jsonQuery with
    | Ok jsonQuery -> JsonConvert.DeserializeObject<List<Project>>(jsonQuery);
    | Error ex -> printfn "%A" ex; []



let projectSQL () : List<Project> = 
    let projectCmd = new SqlCommand (
        $"SELECT {allProjectFields} 
        FROM eedbo_eepx e
        JOIN eedbo_projects_sqlserver ps ON e.eeid = ps.SUP
        JOIN eedbo_projects_extra pe ON ps.PID = pe.PID
        WHERE ps.STUDENT = ''
        ORDER BY pe.updated DESC", conn)
    let jsonQuery = ExecuteQuery(projectCmd)
    match jsonQuery with
    | Ok jsonQuery -> JsonConvert.DeserializeObject<List<Project>>(jsonQuery);
    | Error ex -> printfn "%A" ex; []



let searchProjectSQL (data: SearchRequest) : List<Project> =
    let categories = data.categories 
                        |> List.map (fun c -> "pe.categories LIKE '%" + c + "%' AND") 
                        |> String.concat " "
    
    let streams = data.streams
                    |> List.map (fun s -> "ps.TSTREAM LIKE '%" + s + "%' AND") 
                    |> String.concat " "
    
    let searchTitle title =
        "(CASE WHEN ps.TITLE LIKE '%" + title + "' THEN 1 ELSE 0 END +
            CASE WHEN ps.TITLE LIKE '%" + title + "%' THEN 1 ELSE 0 END)"
    
    let searchProfessor professor =
        "(CASE WHEN e.Forenames LIKE '%" + professor + "' THEN 1 ELSE 0 END +
            CASE WHEN e.Forenames LIKE '%" + professor + "%' THEN 1 ELSE 0 END)"

    let projectCmd = 
        new SqlCommand (
            $"SELECT {allProjectFields}
            FROM eedbo_eepx e
            JOIN eedbo_projects_sqlserver ps ON e.eeid = ps.SUP
            JOIN eedbo_projects_extra pe ON ps.PID = pe.PID
            WHERE {categories} {streams} {searchTitle data.title} > 0 AND {searchProfessor data.professor} > 0 AND ps.STUDENT = ''
            ORDER BY pe.updated DESC, {searchTitle data.title} DESC, {searchProfessor data.professor} DESC", conn)
    let jsonQuery = ExecuteQuery(projectCmd)
    match jsonQuery with
    | Ok jsonQuery -> JsonConvert.DeserializeObject<List<Project>>(jsonQuery);
    | Error ex -> printfn "%A" ex; []



let getAProjectSQL (pid: int) : Project =
    match pid with
    | 0 -> Project.Default // Preference has not been selected for that Rank
    | _ ->
        let projectCmd = new SqlCommand (
            $"SELECT {allProjectFields}
            FROM eedbo_eepx e
            JOIN eedbo_projects_sqlserver ps ON e.eeid = ps.SUP
            JOIN eedbo_projects_extra pe ON ps.PID = pe.PID
            WHERE ps.PID = {pid}", conn)
        let jsonQuery = ExecuteQuery(projectCmd)
        match jsonQuery with
        | Ok jsonQuery -> (JsonConvert.DeserializeObject<List<Project>>(jsonQuery))[0];
        | Error ex -> printfn "%A" ex; Project.Default
        


let getPreferenceSQL (eeid: string) : PreferenceResponse =
    let preferenceCmd = new SqlCommand (
        $"SELECT {allPreferenceFields} 
        FROM eedbo_projprefs 
        WHERE EEID = {eeid}", conn)
    let jsonQuery = ExecuteQuery(preferenceCmd)
    match jsonQuery with
    | Ok jsonQuery -> 
        let query = (JsonConvert.DeserializeObject<List<Preference>>(jsonQuery))[0];
        {
            eeid = query.eeid
            p1 = getAProjectSQL query.p1; p2 = getAProjectSQL query.p2; p3 = getAProjectSQL query.p3; p4 = getAProjectSQL query.p4
            p5 = getAProjectSQL query.p5; p6 = getAProjectSQL query.p6; p7 = getAProjectSQL query.p7; p8 = getAProjectSQL query.p8 
            p9 = getAProjectSQL query.p9; p10 = getAProjectSQL query.p10
            n1 = query.n1; n2 = query.n2; n3 = query.n3; n4 = query.n4; n5 = query.n5
            n6 = query.n6; n7 = query.n7; n8 = query.n8; n9 = query.n9; n10 = query.n10
            s1 = query.s1; s2 = query.s2; s3 = query.s3; s4 = query.s4; s5 = query.s5
            s6 = query.s6; s7 = query.s7; s8 = query.s8; s9 = query.s9; s10 = query.s10
            upddate = query.upddate
            comments = query.comments
            feedback = query.feedback
            doc = query.doc
        }
    | Error ex -> printfn "%A" ex; PreferenceResponse.Default

//--------------------------------------------------------------------------------------//
//                                 Updating Preferences                                 //
//--------------------------------------------------------------------------------------//

let checkEmptyPreference (newPreference: int) (newPreferenceIndex: int) : string =
    if newPreference = 0 then ("s" + newPreferenceIndex.ToString() + " = 'Pending'") else ""


let updatePreferenceSQL (eeid: string) (newPreference: int) (newPreferenceIndex: int) : unit =
    let newPreferenceString = newPreference.ToString()
    let update = match newPreferenceIndex with
                 | 1 -> "SET P1 = '" + newPreferenceString + "'"
                 | 2 -> "SET P2 = '" + newPreferenceString + "'"
                 | 3 -> "SET P3 = '" + newPreferenceString + "'"
                 | 4 -> "SET P4 = '" + newPreferenceString + "'"
                 | 5 -> "SET P5 = '" + newPreferenceString + "'"
                 | 6 -> "SET P6 = '" + newPreferenceString + "'"
                 | 7 -> "SET P7 = '" + newPreferenceString + "'"
                 | 8 -> "SET P8 = '" + newPreferenceString + "'"
                 | 9 -> "SET P9 = '" + newPreferenceString + "'"
                 | 10 -> "SET P10 = '" + newPreferenceString + "'"
                 | _ -> "" // Shouldn't happen
    let updatePreferenceCmd = new SqlCommand (
        $"UPDATE eedbo_projprefs
        {update}
        WHERE EEID = {eeid};", conn)

    printfn "%A" $"UPDATE eedbo_projprefs
        {update}
        WHERE EEID = {eeid};"
    match ExecuteQuery(updatePreferenceCmd) with
    | Ok sucess -> ()
    | Error ex ->  printfn "%A" ex; ()



let updatePreferencesSQL (comments: string) (doc: bool) (eeid: string) (newPreference: List<int>) (newPreferenceRanks: List<int>) : unit =
    let np = newPreference
    let npr = newPreferenceRanks
    let np1, np2, np3, np4, np5, np6, np7, np8, np9, np10 = np[0], np[1], np[2], np[3], np[4], np[5], np[6], np[7], np[8], np[9]
    let npr1, npr2, npr3, npr4, npr5, npr6, npr7, npr8, npr9, npr10 = npr[0], npr[1], npr[2], npr[3], npr[4], npr[5], npr[6], npr[7], npr[8], npr[9]
    let ns = [(checkEmptyPreference np1 1); (checkEmptyPreference np2 2); (checkEmptyPreference np3 3);
              (checkEmptyPreference np4 4); (checkEmptyPreference np5 5); (checkEmptyPreference np6 6);
              (checkEmptyPreference np7 7); (checkEmptyPreference np8 8); (checkEmptyPreference np9 9);
              (checkEmptyPreference np10 10)] |> List.filter (fun s -> s <> "") |> String.concat ", "

    let updatePreferencesCmd = new SqlCommand (
        $"UPDATE eedbo_projprefs
        SET P1 = '{np1}', P2 = '{np2}', P3 = '{np3}', P4 = '{np4}', 
        P5 = '{np5}', P6 = '{np6}', P7 = '{np7}', P8 = '{np8}',
        P9 = '{np9}', P10 = '{np10}',
        N1 = {npr1}, N2 = {npr2}, N3 = {npr3}, N4 = {npr4}, 
        N5 = {npr5}, N6 = {npr6}, N7 = {npr7}, N8 = {npr8},
        N9 = {npr9}, N10 = {npr10}, 
        DOC = '{doc}', COMMENTS = '{comments}', {ns} 
        WHERE EEID = {eeid};", conn)
    match ExecuteQuery(updatePreferencesCmd) with
    | Ok sucess -> ()
    | Error ex ->  printfn "%A" ex; ()



let updateProjectPopularitySQL (pid: int) : unit =
    let projectPopularityCmd = new SqlCommand (
        $"SELECT 
            {pid} AS PID,
            COUNT(CASE WHEN PreferenceRank = 1 THEN 1 ELSE NULL END) AS P1Count,
            COUNT(CASE WHEN PreferenceRank = 2 THEN 1 ELSE NULL END) AS P2Count,
            COUNT(CASE WHEN PreferenceRank = 3 THEN 1 ELSE NULL END) AS P3Count,
            COUNT(CASE WHEN PreferenceRank = 4 THEN 1 ELSE NULL END) AS P4Count,
            COUNT(CASE WHEN PreferenceRank = 5 THEN 1 ELSE NULL END) AS P5Count,
            COUNT(CASE WHEN PreferenceRank = 6 THEN 1 ELSE NULL END) AS P6Count,
            COUNT(CASE WHEN PreferenceRank = 7 THEN 1 ELSE NULL END) AS P7Count,
            COUNT(CASE WHEN PreferenceRank = 8 THEN 1 ELSE NULL END) AS P8Count,
            COUNT(CASE WHEN PreferenceRank = 9 THEN 1 ELSE NULL END) AS P9Count,
            COUNT(CASE WHEN PreferenceRank = 10 THEN 1 ELSE NULL END) AS P10Count
        FROM (
            SELECT N1 AS PreferenceRank FROM eedbo_projprefs WHERE P1 = {pid}
            UNION ALL
            SELECT N2 AS PreferenceRank FROM eedbo_projprefs WHERE P2 = {pid}
            UNION ALL
            SELECT N3 AS PreferenceRank FROM eedbo_projprefs WHERE P3 = {pid}
            UNION ALL
            SELECT N4 AS PreferenceRank FROM eedbo_projprefs WHERE P4 = {pid}
            UNION ALL
            SELECT N5 AS PreferenceRank FROM eedbo_projprefs WHERE P5 = {pid}
            UNION ALL
            SELECT N6 AS PreferenceRank FROM eedbo_projprefs WHERE P6 = {pid}
            UNION ALL
            SELECT N7 AS PreferenceRank FROM eedbo_projprefs WHERE P7 = {pid}
            UNION ALL
            SELECT N8 AS PreferenceRank FROM eedbo_projprefs WHERE P8 = {pid}
            UNION ALL
            SELECT N9 AS PreferenceRank FROM eedbo_projprefs WHERE P9 = {pid}
            UNION ALL
            SELECT N10 AS PreferenceRank FROM eedbo_projprefs WHERE P10 = {pid}
        ) AS Occurences", conn)
    let jsonQuery = ExecuteQuery(projectPopularityCmd)

    match jsonQuery with
    | Error ex ->  printfn "%A" ex; ()
    | Ok jsonQuery -> 
        let query = (JsonConvert.DeserializeObject<List<ProjectPopularity>>(jsonQuery))[0];

        let updateProjectPopularityCmd = new SqlCommand (
            $"UPDATE eedbo_projects_extra
            SET R1 = {query.p1Count}, R2 = {query.p2Count}, R3 = {query.p3Count}, R4 = {query.p4Count}, 
            R5 = {query.p5Count}, R6 = {query.p6Count}, R7 = {query.p7Count}, R8 = {query.p8Count},
            R9 = {query.p9Count}, R10 = {query.p10Count}
            WHERE pid = {pid};", conn)
        match ExecuteQuery(updateProjectPopularityCmd) with
        | Ok sucess -> ()
        | Error ex ->  printfn "%A" ex; ()

//--------------------------------------------------------------------------------------//
//                                   Propose Projects                                   //
//--------------------------------------------------------------------------------------//

let projectProposeSQL (data: ProjectProposeRequest) (eeid: string) =
    let categoriesString = data.categories |> String.concat ","
    let streamsString = data.streams |> String.concat ","
    let studentOrSupervisor = if data.isStudent then "STUDENT" else "SUP"

    let projectProposeCmd = new SqlCommand ( 
        $"INSERT INTO eedbo_projects_sqlserver 
            (TITLE, TSTREAM, DESCR, {studentOrSupervisor})
        VALUES
            ('{data.title}', '{streamsString}', '{data.description}', {eeid});

        INSERT INTO eedbo_projects_extra 
                    (categories, requirements, skills, meetings)
                VALUES
        ('{categoriesString}', '{data.requirements}', '{data.skills}', '{data.meetings}');", conn)
    ExecuteQuery(projectProposeCmd)

//--------------------------------------------------------------------------------------//
//                                      Proposals                                       //
//--------------------------------------------------------------------------------------//

let proposalsSQL (eeid: string) (isStudent: bool) : List<Project> = 
    let condition = if isStudent then $"ps.STUDENT = {eeid}" else $"ps.SUP = {eeid}"
    let projectCmd = new SqlCommand (
        $"SELECT {allProjectFields} 
        FROM eedbo_eepx e
        JOIN eedbo_projects_sqlserver ps ON e.eeid = ps.SUP
        JOIN eedbo_projects_extra pe ON ps.PID = pe.PID
        WHERE {condition}
        ORDER BY pe.updated DESC;", conn)

    let jsonQuery = ExecuteQuery(projectCmd)
    match jsonQuery with
    | Ok jsonQuery -> JsonConvert.DeserializeObject<List<Project>>(jsonQuery);
    | Error ex -> printfn "%A" ex; []



let applicantsSQL (pid: int) : List<Applicant> =
    let checkCol (prefCol: int) =
        $"SELECT e.eeid, e.forenames, {prefCol} AS preference, s{prefCol} AS suitability
          FROM eedbo_projprefs p JOIN eedbo_eepx e on e.EEID = p.EEID
          WHERE P{prefCol} = '{pid}'"

    let check1, check2, check3, check4, check5, check6, check7, check8, check9, check10 = 
        (checkCol 1), (checkCol 2), (checkCol 3), (checkCol 4), (checkCol 5), 
        (checkCol 6), (checkCol 7), (checkCol 8), (checkCol 9), (checkCol 10)

    let applicantsCmd = new SqlCommand (
        $"{check1} UNION ALL {check2} UNION ALL {check3} UNION ALL {check4} UNION ALL {check5} 
        UNION ALL {check6} UNION ALL {check7} UNION ALL {check8} UNION ALL {check9} 
        UNION ALL {check10};", conn)

    let jsonQuery = ExecuteQuery(applicantsCmd)
    match jsonQuery with
    | Ok jsonQuery -> JsonConvert.DeserializeObject<List<Applicant>>(jsonQuery);
    | Error ex -> printfn "%A" ex; []



let deleteProposalSQL (pid: int) : unit =
    let deleteCmd = new SqlCommand (
        $"DELETE FROM eedbo_projects_sqlserver WHERE PID = {pid};

        DELETE FROM eedbo_projects_extra WHERE PID = {pid};

        UPDATE eedbo_projprefs SET 
        P1 = CASE WHEN P1 = {pid} THEN 0 ELSE P1 END,
        P2 = CASE WHEN P2 = {pid} THEN 0 ELSE P2 END,
        P3 = CASE WHEN P3 = {pid} THEN 0 ELSE P3 END,
        P4 = CASE WHEN P4 = {pid} THEN 0 ELSE P4 END,
        P5 = CASE WHEN P5 = {pid} THEN 0 ELSE P5 END,
        P6 = CASE WHEN P6 = {pid} THEN 0 ELSE P6 END,
        P7 = CASE WHEN P7 = {pid} THEN 0 ELSE P7 END,
        P8 = CASE WHEN P8 = {pid} THEN 0 ELSE P8 END,
        P9 = CASE WHEN P9 = {pid} THEN 0 ELSE P9 END,
        P10 = CASE WHEN P10 = {pid} THEN 0 ELSE P10 END,
        s1 = CASE WHEN P1 = {pid} THEN 'Pending' ELSE s1 END,
        s2 = CASE WHEN P2 = {pid} THEN 'Pending' ELSE s2 END,
        s3 = CASE WHEN P3 = {pid} THEN 'Pending' ELSE s3 END,
        s4 = CASE WHEN P4 = {pid} THEN 'Pending' ELSE s4 END,
        s5 = CASE WHEN P5 = {pid} THEN 'Pending' ELSE s5 END,
        s6 = CASE WHEN P6 = {pid} THEN 'Pending' ELSE s6 END,
        s7 = CASE WHEN P7 = {pid} THEN 'Pending' ELSE s7 END,
        s8 = CASE WHEN P8 = {pid} THEN 'Pending' ELSE s8 END,
        s9 = CASE WHEN P9 = {pid} THEN 'Pending' ELSE s9 END,
        s10 = CASE WHEN P10 = {pid} THEN 'Pending' ELSE s10 END;", conn)

    let jsonQuery = ExecuteQuery(deleteCmd)
    match jsonQuery with
    | Ok sucess -> ()
    | Error ex ->  printfn "%A" ex; ()


(*
let saveProposalSQL (data: EditProposalRequest) : unit =
    let categories = 

    let updateProjectSqlServer = $"
        UPDATE eedbo_projects_sqlserver
        SET title = {data.title}, streams = {data.streams}
        WHERE pid = {data.pid}"

    let updateProjectExtra = $"
        UPDATE eedbo_projects_extra
        SET categories = {data.categories},
            streams = {data.streams},
            requirements = data.requirements,
            description = {data.description},
            skills = {data.skills},
            meetings = {data.meetings},
            updated = GETDATE()
        WHERE pid = @pid"

    use cmd1 = new SqlCommand(updateProjectSqlServer, conn)
    cmd1.Parameters.AddWithValue("@pid", data.pid) |> ignore
    cmd1.Parameters.AddWithValue("@title", data.title) |> ignore
    cmd1.Parameters.AddWithValue("@streams", String.Join(",", editRequest.streams)) |> ignore

    use cmd2 = new SqlCommand(updateProjectExtra, conn)
    cmd2.Parameters.AddWithValue("@pid", data.pid) |> ignore
    cmd2.Parameters.AddWithValue("@categories", String.Join(",", editRequest.categories)) |> ignore
    cmd2.Parameters.AddWithValue("@streams", String.Join(",", editRequest.streams)) |> ignore
    cmd2.Parameters.AddWithValue("@requirements", data.requirements) |> ignore
    cmd2.Parameters.AddWithValue("@description", data.description) |> ignore
    cmd2.Parameters.AddWithValue("@skills", data.skills) |> ignore
    cmd2.Parameters.AddWithValue("@meetings", data.meetings) |> ignore

    let jsonQuery = ExecuteQuery(deleteCmd)
    match jsonQuery with
    | Ok sucess -> ()
    | Error ex ->  printfn "%A" ex; ()
*)