import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects: [],
    project: {},
    chargingProjects: true,
    showColDiv: false,
}

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        mutatingProject: (state, {payload:objProject}) => {
            const {name,value} = objProject
            state.project[name] = value
        },
        addProject: (state, {payload:newProject}) => {
            state.projects.push(newProject)
        },
        resetProject: state => {
            state.project = {}
        },
        resetProjects: state => {
            state.projects = []
        },
        getProjects: (state, {payload:fetchedProjects}) => {
            state.projects = fetchedProjects
        },
        mutateChargingProjects: (state, {payload:boolean}) => {
            state.chargingProjects = boolean
        },
        editProject: (state, {payload:thisProject}) => {
            for (let key in thisProject) {
                state.project[key] = thisProject[key]
            }
        },
        updateProject: (state, {payload:updatedProject}) => {
            const findProject = state.projects.find(({_id}) => _id === updatedProject._id)
            for (let key in findProject) {
                if (key !== "_id") findProject[key] = updatedProject[key]
            }
        },
        deleteProject: (state, {payload:projectId}) => {
            state.projects = state.projects.filter(({_id}) => _id !== projectId)
        },
    }
})

export const {
    mutatingProject,
    addProject,
    resetProject,
    resetProjects,
    getProjects,
    editProject,
    updateProject,
    deleteProject,
    mutateChargingProjects
} = projectSlice.actions

export default projectSlice.reducer