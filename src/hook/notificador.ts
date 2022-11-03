import { TipoNotificacao } from "@/Interfaces/INotificacao"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/tipos-mutacoes"

type Notificador = {
    notificar:(tipo: TipoNotificacao, titulo: string, texto: string) => void
}

export default () : Notificador => {
    const notificar = (tipo: TipoNotificacao, titulo: string, texto: string): void =>  {
        store.commit(NOTIFICAR, {
            titulo,
            texto,
            tipo,
        });
    }
     return {notificar}
}