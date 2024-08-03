import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout/Layout.tsx";
import Protected from "@/navigation/Protected.tsx";
import { RegistrationPage } from "@/pages/RegistrationPage/RegistrationPage.tsx";
import Matches from "@/pages/Matches/Matches.tsx";
import { IndexPage } from "@/pages/IndexPage/IndexPage.tsx";
import { routes } from "@/navigation/routes.tsx";

const Router = () => {
    return (
        <Routes>
            <Route path={routes.login} element={<IndexPage />} />
            <Route path={routes.registration} element={<RegistrationPage />} />
            <Route path={routes.home} element={<Protected><Layout /></Protected>}>
                <Route
                    index
                    element={
                        <Protected>
                            <Matches />
                        </Protected>
                    }
                />
                <Route path={routes.profile} element={<Protected><div>Profile</div></Protected>} />
                <Route path={routes.matches} element={<Protected><Matches /></Protected>} />
                <Route path={routes.settings} element={<Protected><div>Settings</div></Protected>} />
            </Route>
            <Route path='*' element={<Navigate to={routes.login}/>}/>
        </Routes>
    );
};

export default Router;