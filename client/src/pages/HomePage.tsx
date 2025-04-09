import { useEffect, useState } from "react";
import { Separator } from "../components/ui/separator";
import { TaskItem } from "../components/to-do/TaskItem";
import { EmptyState } from "../components/to-do/EmptyState";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { storage } from "../utils/storage";
import { postChangeComplete, postLogout } from "../utils/api";
import { changeCompleted, fetchTasksThunk } from "../store/taskSlice";
import { HeaderSection } from "../components/to-do/HeaderSection";
import { useToast } from "../utils/hooks/useToast";

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { data: tasks, loading } = useSelector((state: RootState) => state.tasks);
  const { error, success } = useToast();
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number>(0); // store timestamp

  const toggleTask = (id: string) => {
    const now = Date.now();
  
    if (now - lastUpdatedAt < 5000) {
      error("You can only update the task once every 5 seconds");
      return;
    }
  
    postChangeComplete(id)
      .then(() => {
        success("Task updated successfully");
        dispatch(changeCompleted({ id }));
        setLastUpdatedAt(now); // update the cooldown timer
      })
      .catch((err: any) => {
        error(err.message);
        console.log("Error updating task");
        console.log(err);
      });
  };
  
  const signOut = async () => {
    await postLogout().then(() => {
      console.log("Logout successful");
    });
    storage.cookies_delete("access_token");
    storage.cookies_delete("user");

    window.location.href = "/";
  };

  useEffect(() => {
    if (loading) return;

    if (tasks.length === 0) dispatch(fetchTasksThunk());
  }, [dispatch, loading, tasks.length]);

  return (
    <div className="min-h-screen bg-muted px-4 py-8 flex justify-center">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 space-y-6">
        {/* Header Section */}

        <HeaderSection user={user} signOut={signOut} />
        {/* Separator */}
        <Separator />

        {/* Task List */}
        <div className="relative">
          <div className="h-[100vh] overflow-y-auto pr-1 scrollbar-hide space-y-4">
            {tasks.length ? (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  id={task.id}
                  label={task.task}
                  checked={task.completed}
                  date={task.updated_at}
                  onChange={() => toggleTask(task.id)}
                />
              ))
            ) : (
              <EmptyState message="No tasks yet. Add one!" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
