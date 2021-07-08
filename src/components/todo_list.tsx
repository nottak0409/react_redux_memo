import React from "react";
import { useDispatch } from "react-redux";

import { ITask } from "../modules/taskModule";
import { taskActions } from "../modules/taskModule";

const TodoList: React.FC<{ list: ITask[], isEndTasks: boolean }> = ({ list, isEndTasks }) => {
    const dispatch = useDispatch();
    const endTask = (task: ITask) => dispatch(taskActions.endTask(task.id));
    const editTask = (task: ITask) => dispatch(taskActions.setEditTaskById(task.id));
    const targetList = list.filter((task) => {
        if (isEndTasks) {
            return task.isExecuted;
        } else {
            return !task.isExecuted;
        }
    });

    if (list.length < 1) {
        return null;
    }
};
