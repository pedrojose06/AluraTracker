import { TipoNotificacao } from "@/Interfaces/INotificacao";
import { NOTIFICAR } from "@/store/tipos-mutacoes";
import { store } from "@/store"

export const notificacaoMixin = {
    methods: {
        notifica(tipo: TipoNotificacao, titulo: string, texto: string): void {
            store.commit(NOTIFICAR, {
                titulo,
                texto,
                tipo,
            });
        },
    }
}