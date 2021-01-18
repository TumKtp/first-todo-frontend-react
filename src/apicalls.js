function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
export const getAllTodoList = async () => {
  return (
    await fetch("http://localhost:8000/api/task-list/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  ).json();
};

export const createTask = async (title) => {
  return (
    await fetch("http://localhost:8000/api/task-create/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
    })
  ).json();
};

export const updateStatus = async (id, title, completed) => {
  return (
    await fetch(`http://localhost:8000/api/task-update/${id}/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, completed }),
    })
  ).json();
};
