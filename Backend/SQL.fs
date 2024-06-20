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

//--------------------------------------------------------------------------------------//
//                            Opening Connection to Database                            //
//--------------------------------------------------------------------------------------//

let [<Literal>] connString = "Server=tcp:myfypserver.database.windows.net,1433;Initial Catalog=myDatabase;Persist Security Info=False;User ID=azureuser;Password=michaelchung@123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;" //Connection Timeout=30; "Server=localhost;Database=test;User Id=test;Password=test"
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
let allPreferenceFields = "EEID, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, N1, N2, N3, N4, N5, N6, N7, N8, N9, N10, UPDDATE, COMMENTS, FEEDBACK, DOC"

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
    | Error ex -> []



let newProjectSQL () : List<Project> =
    let projectCmd = new SqlCommand (
        $"SELECT TOP 8 {allProjectFields} 
        FROM eedbo_eepx e
        JOIN eedbo_projects_sqlserver ps ON e.eeid = ps.SUP
        JOIN eedbo_projects_extra pe ON ps.PID = pe.PID
        ORDER BY pe.updated DESC", conn)
    let jsonQuery = ExecuteQuery(projectCmd)
    match jsonQuery with
    | Ok jsonQuery -> JsonConvert.DeserializeObject<List<Project>>(jsonQuery);
    | Error ex -> []



let projectSQL () : List<Project> = 
    let projectCmd = new SqlCommand (
        $"SELECT {allProjectFields} 
        FROM eedbo_eepx e
        JOIN eedbo_projects_sqlserver ps ON e.eeid = ps.SUP
        JOIN eedbo_projects_extra pe ON ps.PID = pe.PID
        ORDER BY pe.updated DESC", conn)
    let jsonQuery = ExecuteQuery(projectCmd)
    match jsonQuery with
    | Ok jsonQuery -> JsonConvert.DeserializeObject<List<Project>>(jsonQuery);
    | Error ex -> []



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
            WHERE {categories} {streams} {searchTitle data.title} > 0 AND {searchProfessor data.professor} > 0
            ORDER BY pe.updated DESC, {searchTitle data.title} DESC, {searchProfessor data.professor} DESC", conn)
    let jsonQuery = ExecuteQuery(projectCmd)
    match jsonQuery with
    | Ok jsonQuery -> JsonConvert.DeserializeObject<List<Project>>(jsonQuery);
    | Error ex -> []



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
        | Error ex -> Project.Default
        


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
            upddate = query.upddate
            comments = query.comments
            feedback = query.feedback
            doc = query.doc
        }
    | Error ex -> PreferenceResponse.Default


let updatePreference (eeid: string) (newPreference: int) (newPreferenceRank: int) : unit =
    let newPreferenceString = newPreference.ToString()
    let update = match newPreferenceRank with
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
    ExecuteQuery(updatePreferenceCmd) |> ignore



let updatePreferences (comments: string) (doc: bool) (eeid: string) (newPreference: List<int>) (newPreferenceRanks: List<int>) : unit =
    let np = newPreference
    let npr = newPreferenceRanks
    let np1, np2, np3, np4, np5, np6, np7, np8, np9, np10 = np[0], np[1], np[2], np[3], np[4], np[5], np[6], np[7], np[8], np[9]
    let npr1, npr2, npr3, npr4, npr5, npr6, npr7, npr8, npr9, npr10 = npr[0], npr[1], npr[2], npr[3], npr[4], npr[5], npr[6], npr[7], npr[8], npr[9]
    let updatePreferencesCmd = new SqlCommand (
        $"UPDATE eedbo_projprefs
        SET P1 = '{np1}', P2 = '{np2}', P3 = '{np3}', P4 = '{np4}', 
        P5 = '{np5}', P6 = '{np6}', P7 = '{np7}', P8 = '{np8}',
        P9 = '{np9}', P10 = '{np10}',
        N1 = {npr1}, N2 = {npr2}, N3 = {npr3}, N4 = {npr4}, 
        N5 = {npr5}, N6 = {npr6}, N7 = {npr7}, N8 = {npr8},
        N9 = {npr9}, N10 = {npr10}, DOC = '{doc}', COMMENTS = '{comments}'
        WHERE EEID = {eeid};", conn)
    ExecuteQuery(updatePreferencesCmd) |> ignore



let updateProjectPopularity (pid: int) : unit =
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
    | Error ex -> ()
    | Ok jsonQuery -> 
        let query = (JsonConvert.DeserializeObject<List<ProjectPopularity>>(jsonQuery))[0];

        let updateProjectPopularityCmd = new SqlCommand (
            $"UPDATE eedbo_projects_extra
            SET R1 = {query.p1Count}, R2 = {query.p2Count}, R3 = {query.p3Count}, R4 = {query.p4Count}, 
            R5 = {query.p5Count}, R6 = {query.p6Count}, R7 = {query.p7Count}, R8 = {query.p8Count},
            R9 = {query.p9Count}, R10 = {query.p10Count}
            WHERE pid = {pid};", conn)
        ExecuteQuery(updateProjectPopularityCmd) |> ignore

let projectPropose (data: ProjectProposeRequest) (eeid: string)=
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


