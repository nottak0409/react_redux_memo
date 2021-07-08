import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import { setupStore } from "./store";
import { IRootState } from "./modules";
import TodoList from "./components/todo_list";
import { taskActions, saveTasks } from "./modules/taskModule";

const store = setupStore();

const App: React.FC = () => {
    const dispatch = useDispatch();
    const taskState = useSelector((state: IRootState) => state.task);

    const onChangeTaskName = (e) => dispatch(taskActions.setAddTaskName(e.target.value));
    const onChangeEditTaskName = (e) => dispatch(taskActions.setEditTaskName(e.target.value));
    const onClickAdd = (e) => {
        if (e) {
            e.preventDefault();
        }
        dispatch(taskActions.addTask());
    };
    const onClickEdit = (e) => {
        if (e) {
            e.preventDefault();
        }
        dispatch(taskActions.editTask());
    };
    const onClickSave = () => dispatch(saveTasks());

    return (
        <>
            <h1>Todo</h1>
            <h2>Add Task</h2>
            <form onSubmit={onClickAdd}>
                <input type="text" value={taskState.addTask.name} onChange={onChangeTaskName} />
                <button onClick={onClickAdd}>Add</button>
            </form>
            <h2>Current List</h2>
            <TodoList list={taskState.tasks} isEndTasks={false} />
            {taskState.editTask.id > -1 ? (
                <>
                    <h2>Edit Task</h2>
                    <form onSubmit={onClickEdit}>
                        ({taskState.editTask.id}):
                        <input type="text" value={taskState.editTask.name} onChange={onChangeEditTaskName} />
                        <button onClick={onClickEdit}>Edit</button>
                    </form>
                </>
            ) : null}
            <h2>Executed List</h2>
            <TodoList list={taskState.tasks} isEndTasks={true} />
            <h2>Save</h2>
            <button onClick={onClickSave} disabled={taskState.saveState.isLoading}>
                {taskState.saveState.isLoading ? "Saving..." : "Save"}
            </button>
            <div style={{display: taskState.saveState.isSuccess ? "block" : "none", color: "#FF0000"}}>
                Save Complete!
            </div>
        </>
    );
};

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById("root"),
);
