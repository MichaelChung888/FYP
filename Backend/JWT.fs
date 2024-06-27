module JWT

open System
open System.Text
open System.Security.Claims
open System.IdentityModel.Tokens.Jwt
open Microsoft.IdentityModel.Tokens
open Microsoft.AspNetCore.Http

open dotenv.net
open dotenv.net.Utilities

//--------------------------------------------------------------------------------------//
//                                       JWT Key                                        //
//--------------------------------------------------------------------------------------//

DotEnv.Load()
let jwtKey = (EnvReader.GetStringValue "JWT")

//--------------------------------------------------------------------------------------//
//                                         JWT                                          //
//--------------------------------------------------------------------------------------//

let getTokenFromRequest (req : HttpRequest) : JwtSecurityToken =
    let jwt = ((Seq.head req.Headers.Authorization).Split " ")[1]
    let handler = JwtSecurityTokenHandler()
    handler.ReadJwtToken(jwt)

let getIdFromToken (token : JwtSecurityToken) =
    (Seq.find (fun (c : Claim) -> c.Type = "id") token.Claims).Value

//let getRoleFromToken (token : JwtSecurityToken) =
//    (Seq.find (fun (c : Claim) -> c.Type = "role") token.Claims).Value

let generateToken eeid role =
    let claims = [|
        Claim("id", eeid);
        Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) // (JWT ID) claim provides a unique identifier for the JWT.
        Claim(ClaimTypes.Role, role)
    |] 

    let expires = Nullable(DateTime.UtcNow.AddHours(3.0))
    let notBefore = Nullable(DateTime.UtcNow)
    let securityKey = SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    let signingCredentials = SigningCredentials(key = securityKey, algorithm = SecurityAlgorithms.HmacSha256)

    let token =
        JwtSecurityToken(
            issuer = "jwtwebapp.net",
            audience = "jwtwebapp.net",
            claims = claims,
            expires = expires,
            notBefore = notBefore,
            signingCredentials = signingCredentials)

    JwtSecurityTokenHandler().WriteToken(token)
(*
let decodeToken (token : JwtSecurityToken) =
    let keyId = token.Header.Kid;
    let audience = token.Audiences.ToList();
    let claims = token.Claims.Select(claim => (claim.Type, claim.Value)).ToList();
    DecodedToken(
        keyId,
        token.Issuer,
        audience,
        claims,
        token.ValidTo,
        token.SignatureAlgorithm,
        token.RawData,
        token.Subject,
        token.ValidFrom,
        token.EncodedHeader,
        token.EncodedPayload
    )
*)

(*
let handleGetSecured =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        let email = ctx.User.FindFirst ClaimTypes.NameIdentifier
            
        text ("User " + email.Value + " is authorized to access this resource.") next ctx

let handlePostToken =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let! model = ctx.BindJsonAsync<LoginViewModel>()

            // authenticate user
            
            let tokenResult = generateToken model.Email

            return! json tokenResult next ctx
        }
*)