module ProposalsNavBar

open Shared
open Common
open ProposalsTypes

open Feliz
open Feliz.Bulma
open Feliz.Router

open color

let NavBar (dispatch: Msg -> unit) =
    Bulma.navbar [
        prop.style [style.backgroundColor mediumTurqouise; style.fontWeight 700]
        prop.children [
            Bulma.navbarBrand.div [
                prop.onClick (fun e -> Router.navigatePath("home-supervisor"))
                prop.style [style.paddingTop 3; style.paddingRight 20; style.paddingLeft 10; style.cursor.pointer]
                prop.children [ 
                    Bulma.icon [
                        Bulma.icon.isLarge
                        prop.children [ Html.i [ prop.className "fas fa-home fa-2x"] ]
                    ]
                ] 
            ]
            Bulma.navbarMenu [
                Bulma.navbarStart.div [
                    Bulma.navbarItem.a [ prop.text "Student Proposals"; prop.onClick (fun e -> Router.navigatePath("home-supervisor", "projects")) ]
                    Bulma.navbarItem.a [ prop.text "Your Proposals"; prop.onClick (fun e -> Router.navigatePath("home-supervisor", "proposals")) ]
                    Bulma.navbarItem.a [ prop.text "Propose a Project"; prop.onClick (fun e -> Router.navigatePath("project-propose")) ]
                ]
                Bulma.navbarEnd.div [
                    Bulma.navbarItem.div [
                        Bulma.buttons [
                            Bulma.button.a [ prop.text "Log Out"; prop.onClick (fun _ -> dispatch Logout) ]
                        ]
                    ]
                ]
            ]
        ]
    ] 