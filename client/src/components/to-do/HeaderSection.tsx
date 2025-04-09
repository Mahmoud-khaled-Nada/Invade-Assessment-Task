import { AddTaskModal } from "./AddTaskModel";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, RefreshCcw } from "lucide-react";
import { getRestore } from "../../utils/api";
import { useToast } from "../../utils/hooks/useToast";
import { fetchTasksThunk } from "../../store/taskSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

type Props = {
  user: any;
  signOut: () => void;
};

export const HeaderSection = ({ user, signOut }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, success } = useToast();

  const restore = () => {
    getRestore()
      .then(({ data }) => {
        console.log(data);
        dispatch(fetchTasksThunk());
        success("Tasks restored successfully");
      })
      .catch((err: any) => {
        error("Error restoring tasks");
        console.error("Error restoring tasks", err);
      });
  };
  return (
    <div className="flex items-center justify-between">
      {/* Left: Avatar + Name */}
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={user?.avatar} alt="@shadcn" />
          <AvatarFallback>MN</AvatarFallback>
        </Avatar>
        <h2 className="text-base font-medium text-gray-700 dark:text-gray-300">{user?.name}</h2>
      </div>

      {/* Center: Title */}
      <h1 className="text-xl font-bold text-gray-800 dark:text-white text-center flex-1">To-Do List</h1>

      {/* Right: Add Task Button + Logout Button */}
      <div className="flex-shrink-0 flex items-center space-x-3">
        <AddTaskModal />

        <Button className="ml-4 bg-black flex items-center space-x-2" onClick={restore}>
          <RefreshCcw />
          Restore
        </Button>

        <Button className="ml-4 bg-red-600 flex items-center space-x-2" onClick={() => signOut()}>
          <LogOut />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};
