import React, { ReactNode } from 'react';
import { Navigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth.tsx";
import { routes } from "@/navigation/routes.tsx";

const Protected: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={routes.login} />;
    }

    return children;
};

export default Protected;