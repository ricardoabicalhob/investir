import { TableDarfs } from "@/components/table-darfs";
import { AuthContext } from "@/contexts/auth.context";
import { getDarfs } from "@/queries/darf";
import { useContext } from "react";

export default function DarfsPage() {

    const { loginResponse } = useContext(AuthContext)
    const userId = loginResponse?.objetoResposta.id || ""

    const { data: darfs } = getDarfs(userId)

    return(
        <div className="flex flex-1 w-full h-full text-my-foreground-secondary p-6">
            
            <div className="flex grow w-full min-h-[calc(100dvh-235px)] overflow-y-auto overflow-x-hidden border-[#29292E] border rounded-md p-2 custom-scrollbar-div">
                <TableDarfs
                    darfs={darfs ?? []}
                />
            </div>
        </div>
    )
}