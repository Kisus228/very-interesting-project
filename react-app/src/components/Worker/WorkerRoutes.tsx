import {Route, Routes} from "react-router-dom";
import Vacancies from "./Vacancies/Vacancies";
import LikedResumes from "../Employer/Resumes/LikedResumes";
import MyProfile from "../MyProfile/MyProfile";
import Auth from "../Auth/Auth";
import React from "react";
import {AppWrapper} from "../../App";
import Vacancy from "./Vacancy/Vacancy";

const WorkerRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AppWrapper/>}>
                <Route path="search">
                    <Route path=":vacancyId" element={<Vacancy/>}/>
                    <Route index element={<Vacancies/>}/>
                </Route>
                <Route path="liked" element={<LikedResumes/>}/>
                <Route path="profile" element={<MyProfile/>}/>
            </Route>
            <Route path="auth" element={<Auth/>}/>
        </Routes>
    )
}

export default WorkerRoutes;