import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Delete, Edit, EllipsisVertical, Save, X } from "lucide-react";
import { formatTime } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { deleteTask as deleteTaskAPI, updateTask } from "../../utils/api";
import { deleteTask, updateTask as updateTaskStore } from "../../store/taskSlice";
import { useToast } from "../../utils/hooks/useToast";
import { useState } from "react";
import { Button } from "../ui/button";

interface Props {
  id: string;
  label: string;
  checked: boolean;
  date: string;
  onChange: () => void;
}

export const TaskItem = ({ id, label, checked, date, onChange }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [update, setUpdate] = useState(label);
  const [isUpdate, setIsUpdate] = useState(false);
  const { success, error } = useToast();

  const editAction = () => {
    setIsUpdate(true);
  };

  const cancelEdit = () => {
    setUpdate(label); // reset to original label
    setIsUpdate(false);
  };

  const saveEdit = () => {
    if (!update.trim()) {
      error("Task cannot be empty");
      return;
    }

    updateTask(id, { task: update })
      .then(({ data }) => {
        dispatch(updateTaskStore({ id, label: update }));
        success("Task updated successfully");
        setIsUpdate(false);
      })
      .catch((err: any) => {
        console.error("Error updating task", err);
        error("Failed to update task");
      });
  };

  const deleteAction = (id: string) => {
    deleteTaskAPI(id)
      .then(() => {
        dispatch(deleteTask(id));
        success("Task deleted successfully");
      })
      .catch((err: any) => {
        console.error("Error deleting task", err);
        error("Error deleting task");
      });
  };

  return (
    <div className="flex items-center justify-between bg-muted rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
      {/* Left: Checkbox + Label */}
      <div className="flex items-center space-x-3">
        <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
        {isUpdate ? (
          <input
            type="text"
            value={update}
            onChange={(e) => setUpdate(e.target.value)}
            className="border px-2 py-1 rounded text-sm w-full"
          />
        ) : (
          <label
            htmlFor={id}
            className={`text-sm font-medium transition-all ${
              checked ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-800 dark:text-gray-200"
            }`}
          >
            {label}
          </label>
        )}
      </div>

      {/* Right: Meta Info + Actions */}
      <div className="flex items-center space-x-4">
        <div className="flex flex-col text-xs text-right">
          <span className="text-gray-500 dark:text-gray-400 mr-3">{formatTime(date)}</span>
          <Badge
            variant="outline"
            className={`capitalize mt-1 ${checked ? "text-green-600" : "text-gray-600"}`}
          >
            {checked ? "completed" : "pending"}
          </Badge>
        </div>

        {isUpdate ? (
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" onClick={saveEdit}>
              <Save className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={cancelEdit}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded hover:bg-accent hover:text-accent-foreground transition-colors">
                <EllipsisVertical />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={editAction}>
                <Edit className="mr-2" /> <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteAction(id)}>
                <Delete className="mr-2" /> <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};
