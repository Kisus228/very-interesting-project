import {Route, Routes} from "react-router-dom";
import VacancyItem from "./Vacancies/VacancyItem";
import LikedResumes from "../Employer/Resumes/LikedResumes";
import MyProfile from "../MyProfile/MyProfile";
import Auth from "../Auth/Auth";
import React from "react";
import {AppWrapper} from "../../App";
import Vacancy from "./Vacancy/Vacancy";
import SearchVacancies from "./Vacancies/SearchVacancies";
import LikedVacancies from "./Vacancies/LikedVacancies";

const WorkerRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AppWrapper/>}>
                <Route path="search">
                    <Route path=":vacancyId" element={<Vacancy/>}/>
                    <Route index element={<SearchVacancies/>}/>
                </Route>
                <Route path="liked" element={<LikedVacancies/>}/>
                <Route path="profile" element={<MyProfile/>}/>
            </Route>
            <Route path="auth" element={<Auth/>}/>
        </Routes>
    )
}

export default WorkerRoutes;