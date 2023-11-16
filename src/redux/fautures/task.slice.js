import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    task: {},
    tasks: [],
    taskModal: false,
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        fillTask: (state, {payload:objTask}) => {
            const {name,value} = objTask
            state.task[name] = value
        },
        showUpModal: (state,{payload:boolean}) => {
            state.taskModal = boolean
        },
        resetTask: state => {
            state.task = {}
        },
        resetTasks: state => {
            state.tasks = []
        },
        addTask: (state, {payload:newTask}) => {
            state.tasks.push(newTask)
        },
        fillTasks: (state,{payload:fetchedTasks}) => {
            state.tasks = fetchedTasks
        },
        deleteTask: (state, {payload:taskId}) => {
            state.tasks = state.tasks.filter(({_id}) => _id !== taskId)
        },
        fillEditTask: (state, {payload:task}) => {
            for (let key in task) {
                state.task[key] = task[key]
            }
        },
        updateTask: (state, {payload:newTask}) => {
            state.tasks.forEach(task => {
                if (task._id === newTask._id) {
                    for (let key in newTask) {
                        task[key] = newTask[key]
                    }
                }
            })
        },
        updateState: (state, {payload:obj}) => {
            const task = state.tasks.find(({_id}) => _id === obj.id)
            task.estado = obj.estado
        }
    }
})


export const {
    fillTask,
    showUpModal,
    addTask,
    resetTask,
    fetchTask,
    fillTasks,
    deleteTask,
    fillEditTask,
    resetTasks,
    updateTask,
    updateState
} = taskSlice.actions

export default taskSlice.reducer