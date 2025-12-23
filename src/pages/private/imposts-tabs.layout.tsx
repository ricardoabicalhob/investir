import { Outlet, useLocation, useNavigate } from "react-router"
import { AppMenuTopbar, AppTopbarButton } from "@/components/app-menu-topbar"

export default function ImpostosTabsLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const colorIconWhenSelected = "var(--lime-base)"

  return (
    <div className="flex flex-col flex-1 w-full h-full">
      <AppMenuTopbar setIsExpanded={() => {}}>
        <AppTopbarButton
            className="text-my-foreground" 
            isExpanded
            text="Resultado fiscal"
            icon="calculate"
            isSelected={location.pathname === "/carteira/impostos"}
            colorIconWhenSelected={colorIconWhenSelected}
            onClick={() => navigate("/carteira/impostos")}
        />

        <AppTopbarButton
            className="text-my-foreground" 
            isExpanded
            text="Minhas DARFs"
            icon="stacks"
            isSelected={location.pathname === "/carteira/darfs"}
            colorIconWhenSelected={colorIconWhenSelected}
            onClick={() => navigate("/carteira/darfs")}
        />

        <AppTopbarButton
            className="text-my-foreground" 
            isExpanded
            text="Compensações"
            icon="balance"
            isSelected={location.pathname === "/carteira/compensacoes"}
            colorIconWhenSelected={colorIconWhenSelected}
            onClick={() => navigate("/carteira/compensacoes")}
        />
      </AppMenuTopbar>

      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}
