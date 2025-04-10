import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export function Template22() {


    return (


        <div class="container">
            <div class="navigation">
                <ul>
                   
                    <li style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
                        <Link to="/template/home" style={{ color: "white", textDecoration: "none" }}>
                            <img
                                src="/assets/imgs/STEG (2).png"
                                alt="Logo"
                                style={{ width: '50px', height: 'auto', display: 'block' }}
                            />
                        </Link>
                    </li>

                
                    <li>
                        <Link to="/AgentTemplate/AccueilAgent" >
                            <span class="icon">
                                <ion-icon name="home-outline"></ion-icon>
                            </span>
                            <span class="title">Accueil</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/AgentTemplate/ListeRéclamation" >

                            <span class="icon">
                                <ion-icon name="people-outline"></ion-icon>
                            </span>
                            <span class="title">Réclamations
                            </span>
                        </Link>
                    </li>



                    {/* <li>
                        <Link to="/template/AllCharts" >

                            <span class="icon">
                                <ion-icon name="people-outline"></ion-icon>
                            </span>
                            <span class="title">Autorelevé
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/template/AllCharts" >

                            <span class="icon">
                                <ion-icon name="people-outline"></ion-icon>
                            </span>
                            <span class="title">Payer la facture
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/template/AllCharts" >

                            <span class="icon">
                                <ion-icon name="people-outline"></ion-icon>
                            </span>
                            <span class="title">Rendez-vous
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/template/Contactez_nous" >

                            <span class="icon">
                                <ion-icon name="people-outline"></ion-icon>
                            </span>
                            <span class="title">Contactez nous
                            </span>
                        </Link>
                    </li> */}



                </ul>
            </div>

            <div class="main">
                <div class="topbar">
                    <div class="toggle">
                        <ion-icon name="menu-outline"></ion-icon>
                    </div>

                    <div class="search">
                        {/* <label>
                            <input type="text" placeholder="Search here" />
                            <ion-icon name="search-outline"></ion-icon>
                        </label> */}
                        <h1>Agent </h1>
                    </div>

                    <div class="user">
                        <img src="/assets/imgs/User_icon_2.svg.png" alt="" />
                    </div>
                </div>


                <div className="content-area">
                    <Outlet />
                </div>


            </div>
        </div>


    )
}
export default Template22;

