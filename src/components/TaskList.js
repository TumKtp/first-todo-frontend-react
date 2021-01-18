import React from "react";

export default function TaskList({ task, toggleStatus }) {
  return (
    <div className="row mt-1 expand">
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-light col-10"
          key={task.id}
          onClick={() => toggleStatus(task.id, task.title, !task.completed)}
        >
          {task.completed ? <del>{task.title}</del> : task.title}
        </button>
        <button type="button" className="btn btn-info col-1">
          <i class="far fa-edit" />
        </button>
        <button type="button" className="btn btn-danger col-1">
          <i class="far fa-trash-alt" />
        </button>
      </div>
    </div>
  );
}
