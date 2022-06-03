import React from "react";
import {AppStateType} from "../../redux/ReduxStore";
import Loader from "../../components/Common/Loader/Loader";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    loading: state.appData.loading
} as MapPropsType);

type MapPropsType = {
    loading: boolean
}

type DispatchPropsType = {}

export function withLoading<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {loading, ...restProps} = props

        return (
            <>
                {loading && <Loader/>}
                <WrappedComponent {...restProps as WCP}/>
            </>
        )
    }

    return connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(
        mapStateToPropsForRedirect, {})
    (RedirectComponent);
}