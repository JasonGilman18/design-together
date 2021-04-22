import DashboardPage from "../pages/dashboard_page";

export default function DashboardContainer(props: any) {

    return (
        <DashboardPage
            setAuthenticatedStatus={props.setAuthenticatedStatus}
            setAuthToken={props.setAuthToken}
        />
    )   
}