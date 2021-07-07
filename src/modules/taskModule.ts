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

const taskModule = createSlice({
    initialState,
    reducers: {
        setAddTaskName: (state: IState, action: PayloadAction<string>) => {
            state.addTask.name = action.payload;
        },
        setEditTaskById: (state: IState, action: PayloadAction<number>) => {
            const task = state.tasks.find((t) => t.id === action.payload);
            if (!task) {
                return;
            }
            state.editTask = task;
        },
        setEditTaskName: (state: IState, action: PayloadAction<string>) => {
            state.editTask.name = action.payload;
        },
        addTask: (state: IState) => {
            if (!state.addTask.name) {
                return;
            }
            state.tasks.push({
                id: state.addTask.id,
                name: state.addTask.name,
                isExecuted: false,
            });
            state.addTask.id = state.addTask.id + 1;
            state.addTask.name = "";
        },
        editTask: (state: IState) => {
            const task = state.tasks.find((t) => t.id === state.editTask.id);
            if (!task) {
                return;
            }
            task.name = state.editTask.name;
            state.editTask.id = -1;
        },
        endTask: (state: IState, action: PayloadAction<number>) => {
            const task = state.tasks.find((t) => t.id === action.payload);
            if (!task) {
                return;
            }
            task.isExecuted = true;
        },
        setSaveState: (state: IState, action: PayloadAction<ILoadingState>) => {
            state.saveState = action.payload;
        },
    },
});

export const { actions: taskActions } = taskModule;
export default taskModule;

export const saveTasks = () => {
    return async (dispatch, getState) => {
        const { task } = getState();
        if (task.saveState.isLoading) {
            return;
        }
        dispatch(taskActions.setSaveState({isLoading: true, isSuccess: false}));
        setTimeout(() => {
            dispatch(taskActions.setSaveState({isLoading: false, isSuccess: true}));
        }, 1000);
    };
};
