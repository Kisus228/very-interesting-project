import React, {useEffect, useState} from 'react';
import classes from './MyProfile.less';
import {AppStateType} from "../../redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import {getFullUserDataTC, putPhotoTC} from "../../redux/AuthReducer";
import {withLoading} from "../../hoc/withLoading/withLoading";
import {FullEmployerDataType, FullWorkerDataType} from "../../types/types";
import WorkerProfile from "./WorkerProfile";
import EmployerProfile from "./EmployerProfile";

const MyProfile: React.FC<Props> = (props) => {
    const [editForm, setEditForm] = useState(false);

    useEffect(() => {
        props.getFullUserDataTC();
    }, [])

    const onSubmit = (values: any) => {
        console.log(values);
        setEditForm(false);
    }

    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file)
            props.putPhotoTC(file);
    }

    if (props.userData === null) return null;
    const userData = props.userData;
    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainer}>
                <h2>Мой профиль</h2>
                {
                    props.isHeadDepartment
                        ? <EmployerProfile setEditForm={setEditForm} editForm={editForm} photo={props.photo}
                                           onSubmit={onSubmit} userData={userData as FullEmployerDataType}
                                           onUpload={onUpload}/>
                        : <WorkerProfile setEditForm={setEditForm} editForm={editForm} photo={props.photo}
                                         onSubmit={onSubmit} userData={userData as FullWorkerDataType}
                                         onUpload={onUpload}/>
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        userData: state.authData.userData,
        isHeadDepartment: state.authData.isHeadDepartment,
        photo: state.authData.photo
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getFullUserDataTC: () => void,
    putPhotoTC: (file: File) => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {
    getFullUserDataTC,
    putPhotoTC
}), withLoading)(MyProfile);
