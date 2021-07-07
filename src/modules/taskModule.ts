import { createSlice, PayloadAction } from "redux-starter-kit";

export interface ITask {
    id: number;
    name: string;
    isExecuted: boolean;
}

interface IEditTask {
    id: number;
    name: string;
}

interface ILoadingState {
    isLoading: boolean;
    isSuccess: boolean;
}

export interface IState {
    addTask: IEditTask;
    editTask: IEditTask;
    tasks: ITask[];
    saveState: ILoadingState;
}

const initialState: IState = {
    addTask: {
        id: 1,
        name: "",
    },
    editTask: {
        id: -1,
        name: "",
    },
    tasks: [],
    saveState: {
        isLoading: false,
        isSuccess: false,
    },
};
