import React from "react";

export default function TaskList({
  task,
  toggleStatus,
  deleteTask,
  handleEdit,
  disableId,
}) {
  return (
    <div className="btn-group d-flex expand mt-1">
      <button
        type="button"
        className="btn btn-light w-100 "
        key={task.id}
        onClick={() => toggleStatus(task.id, task.title, !task.completed)}
      >
        {task.completed ? (
          <del>
            {task.title}
            <i className="mx-1 fas fa-check-circle" />
          </del>
        ) : (
          task.title
        )}
      </button>

      {disableId === task.id ? (
        <button type="button" className="btn btn-primary " disabled>
          <i class="far fa-edit" />
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-primary "
          onClick={() => handleEdit(task.id, task.title)}
        >
          <i class="far fa-edit" />
        </button>
      )}
      <button
        type="button"
        className="btn btn-danger "
        onClick={() => deleteTask(task.id)}
      >
        <i class="far fa-trash-alt" />
      </button>
    </div>
  );
}
