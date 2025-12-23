import { useState } from "react"
import AppSidebar, { AppSidebarButton, AppSidebarGroupButtons, AppSidebarTrigger } from "../../components/app-menu-sidebar"
import { TooltipProvider } from "../../components/ui/tooltip"
import AppTopbar from "../../components/app-topbar"
import { Button } from "../../components/ui/button"
import { useNavigate } from "react-router"

import orquestraLogo from '../../assets/logos/Orquestra-logo.png'

export default function Layout({ children }: { children? :React.ReactNode }) {

  const [ expandedSidebar, setExpandedSidebar ] = useState(true)
  const colorIconWhenSelected = "var(--lime-base)"
  const navigate = useNavigate()

  return (
    <div className='flex flex-col w-full h-full bg-my-background overflow-y-auto custom-scrollbar'>
      <TooltipProvider>
        <nav>
          <AppTopbar>
            <div className="flex items-center gap-3 max-lg:mr-auto lg:gap-3">
              <AppSidebarTrigger 
                className="text-gray-400 select-none" 
                isExpanded={expandedSidebar} 
                setIsExpanded={setExpandedSidebar} 
              />
              <div className="flex items-center">
                <img className="z-50" src={orquestraLogo} alt="Infinity" loading="lazy" width={40} height={20} decoding="async" style={{color: "transparent"}} />
                <span className="z-50 text-my-foreground-secondary select-none max-[1100px]:hidden font-semibold" style={{fontFamily: 'Montserrat, sans-serif', letterSpacing: '4px', fontSize: 24}}>RQUESTRA</span>
              </div>
            </div>

            <div className="flex items-center gap-3 max-lg:ml-auto lg:gap-3">
              <Button 
                className="bg-[#29292E] hover:bg-[#323238] text-[#DDD] gap-2 rounded-sm text-[15px] font-bold leading-relaxed border-none cursor-pointer overflow-hidden pt-5.5 pb-4.5 px-3 max-md:px-3"
                onClick={()=> navigate('/sign-in')}
              >
                Entrar
              </Button>
              <Button
                className="bg-lime-base hover:bg-lime-base hover:enabled:brightness-115 text-my-foreground-accent  leading-relaxed text-shadow-xs text-shadow-lime-700 font-bold rounded-sm pt-5.5 pb-4.5 px-3 text-[15px] max-md:text-xs max-md:px-3 cursor-pointer"
                onClick={()=> navigate('/register')}
              >
                Comece grátis
              </Button>
            </div>
          </AppTopbar>
        </nav>
        <main className="flex h-[calc(100vh-80px)] bg-my-background">

          <aside>
            <AppSidebar isExpanded={expandedSidebar} setIsExpanded={setExpandedSidebar}>

              <AppSidebarButton 
                className="text-my-background" 
                isExpanded={expandedSidebar} 
                isSelected={true}
                colorIconWhenSelected={colorIconWhenSelected}
                text="Home" 
                icon="home_app_logo" 
              />

              <AppSidebarGroupButtons title="equipamentos" isExpanded={expandedSidebar}>
                <AppSidebarButton 
                  className='text-my-foreground' 
                  isExpanded={expandedSidebar} 
                  isSelected={false}
                  colorIconWhenSelected={colorIconWhenSelected}
                  text="Brooks" 
                  icon="auto_towing" 
                />

                <AppSidebarButton 
                  className="text-my-foreground" 
                  isExpanded={expandedSidebar}
                  isSelected={false}
                  colorIconWhenSelected={colorIconWhenSelected} 
                  text="Pá-carregadeira" 
                  icon="front_loader" 
                />

                <AppSidebarButton 
                  className="text-my-foreground" 
                  isExpanded={expandedSidebar}
                  isSelected={false}
                  colorIconWhenSelected={colorIconWhenSelected}
                  text="Caminhão Sucção" 
                  icon="vacuum" 
                />

                <AppSidebarButton 
                  className="text-my-foreground" 
                  isExpanded={expandedSidebar}
                  isSelected={false}
                  colorIconWhenSelected={colorIconWhenSelected}
                  text="Caminhão Hidrojato" 
                  icon="fire_hydrant" 
                />
              </AppSidebarGroupButtons>

              <AppSidebarGroupButtons title="serviços" isExpanded={expandedSidebar}>
                <AppSidebarButton 
                  className="text-my-foreground" 
                  isExpanded={expandedSidebar}
                  isSelected={false}
                  colorIconWhenSelected={colorIconWhenSelected}
                  text="Programação" 
                  icon="calendar_month" 
                />

                <AppSidebarButton 
                  className="text-my-foreground" 
                  isExpanded={expandedSidebar}
                  isSelected={false}
                  colorIconWhenSelected={colorIconWhenSelected}
                  text="Equipes" 
                  icon="groups_2" 
                />
              </AppSidebarGroupButtons>
              
            </AppSidebar>
          </aside>

          <section className="flex flex-grow">
            {children}
          </section>
        </main>
      </TooltipProvider>
    </div>
  )
}