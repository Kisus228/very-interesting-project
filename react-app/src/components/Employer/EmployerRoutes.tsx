import {Route, Routes} from "react-router-dom";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import LikedResumes from "../Resumes/LikedResumes";
import MyProfile from "../MyProfile/MyProfile";
import Search from "../Resumes/SearchResumes";
import Vacancies from "./Vacancies/Vacancies";
import NewVacancy from "./NewVacancy/NewVacancy";
import Vacancy from "./Vacancy/Vacancy";
import Auth from "../Auth/Auth";
import React from "react";
import {AppWrapper} from "../../App";
import EditVacancy from "./NewVacancy/EditVacancy";


const EmployerRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AppWrapper/>}>
                <Route path="search">
                    <Route path=":profileId" element={<ProfileInfo/>}/>
                    <Route index element={<Search/>}/>
                </Route>
                <Route path="liked" element={<LikedResumes/>}/>
                <Route path="vacancies">
                    <Route index element={<Vacancies openedVacancies={true}/>}/>
                    <Route path="history" element={<Vacancies openedVacancies={false}/>}/>
                    <Route path="new" element={<NewVacancy/>}/>
                    <Route path=":vacancyId" element={<Vacancy/>}/>
                    <Route path=":vacancyId/edit" element={<EditVacancy/>}/>
                </Route>
                <Route path="profile" element={<MyProfile/>}/>
            </Route>
            <Route path="auth" element={<Auth/>}/>
        </Routes>
    )
}

export default EmployerRoutes;