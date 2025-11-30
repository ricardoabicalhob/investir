import { Outlet } from "react-router";
import { AuthProvider } from "./contexts/auth.context";

export default function AppContent() {
    return(
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    )
}