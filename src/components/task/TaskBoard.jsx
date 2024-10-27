import { useState } from "react";
import Search from "./Search";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";

const defaultTask = {
  id: crypto.randomUUID(),
  title: "Learn React",
  description:
    "I want to Learn React such that I can treat it like my slave and make it do whatever I want to do",
  tags: ["web", "react", "js"],
  priority: "High",
  isFavorite: true,
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([
        ...tasks,
        {
          id: crypto.randomUUID(),
          ...newTask,
        },
      ]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return {
              ...newTask,
            };
          }

          return task;
        })
      );
    }
    setShowAddModal(false);
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
  };

  const handleCloseClick = () => {
    setShowAddModal(false);
    setTaskToUpdate(null);
  };

  const handleDelete = (taskToDelete) => {
    setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
  };

  const handleDeleteAll = () => {
    setTasks([]);
  };

  const handleToggleFavorite = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            isFavorite: !task.isFavorite,
          };
        }

        return task;
      })
    );
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          onCancel={handleCloseClick}
        />
      )}
      <div className="container">
        <Search onSearch={handleSearch} />
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => setShowAddModal(true)}
            handleDelete={handleDeleteAll}
          />
          {filteredTasks.length > 0 ? (
            <TaskList
              tasks={filteredTasks}
              onEdit={handleEditTask}
              onDelete={handleDelete}
              toggleFavorite={handleToggleFavorite}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
