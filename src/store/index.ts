import IProjeto from "@/Interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { ADICIONA_PROJETO, DEFINIR_PROJETOS, EDITA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from "./tipos-mutacoes";
import { INotificacao  } from "@/Interfaces/INotificacao";
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, DELETAR_PROJETO } from "./tipos-acoes";
import http from '@/http'

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[],
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: []
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto,
            } as IProjeto
            state.projetos.push(projeto)
        },
        [EDITA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao){
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(noti => noti.id != novaNotificacao.id)
            }, 1500)
        },
    },
    actions:{
        [OBTER_PROJETOS] ({ commit }) {
            http.get('projetos')
                .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
        },
        [CADASTRAR_PROJETO] (contexto, nomeDoProjeto: string) {
             return http.post(`/projetos`, {
                nome: nomeDoProjeto
            })
        },
        [ALTERAR_PROJETO] (contexto, projeto: IProjeto) {
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [DELETAR_PROJETO] (contexto, id: string) {
            return http.delete(`/projetos/${id}`)
                .then(() => this.commit(EXCLUIR_PROJETO, id)
                )
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}