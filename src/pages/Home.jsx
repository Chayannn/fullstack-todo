import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context, Server } from "../main";
import toast from "react-hot-toast";
import Task from "../components/Task";
import { Navigate } from "react-router-dom";

function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${Server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${Server}/task/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const taskHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${Server}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${Server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={taskHandler}>
            <input
              type="text"
              placeholder="Title"
              autoComplete="username"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Description"
              autoComplete="username"
              required
            />
            <button disabled={loading} type="submit">
              Add task
            </button>
          </form>
        </section>
      </div>
      <section className="todosContainer">
        {tasks.map((i) => (
          <Task
            id={i._id}
            key={i._id}
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
          />
        ))}
      </section>
    </div>
  );
}

export default Home;
