
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import {  ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS, NOTIFICAR } from "./tipos-mutacoes";
import { INotificacao  } from "@/Interfaces/INotificacao";
import {   OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from "./tipos-acoes";
import http from '@/http'
import ITarefa from "@/Interfaces/ITarefa";
import { EstadoProjeto, projeto } from "./modulos/projeto";

export interface Estado {
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
    projeto: EstadoProjeto,
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        notificacoes: [],
        projeto: {
            projetos:[]
        }
    },
    mutations: {
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },

        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(tare => tare.id == tarefa.id)
            state.tarefas[index] = tarefa
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
        [ALTERAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(resposta => commit(ALTERA_TAREFA, resposta.data))
        },
        [OBTER_TAREFAS] ({ commit }) {
            http.get('tarefas')
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))

        },
        [CADASTRAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            return http.post(`/tarefas`, tarefa)
                .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
       },
    },
    modules:{
        projeto
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}