import IProjeto from "@/Interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EDITA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from "./tipos-mutacoes";
import { INotificacao  } from "@/Interfaces/INotificacao";
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, DELETAR_PROJETO, OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from "./tipos-acoes";
import http from '@/http'
import ITarefa from "@/Interfaces/ITarefa";

interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas: [],
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
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [EDITA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(tare => tare.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
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
        [ALTERAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(resposta => commit(ALTERA_TAREFA, resposta.data))
        },
        [DELETAR_PROJETO] (contexto, id: string) {
            return http.delete(`/projetos/${id}`)
                .then(() => this.commit(EXCLUIR_PROJETO, id)
                )
        },
        [OBTER_TAREFAS] ({ commit }) {
            http.get('tarefas')
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))

        },
        [CADASTRAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            return http.post(`/tarefas`, tarefa)
                .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
       },
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}