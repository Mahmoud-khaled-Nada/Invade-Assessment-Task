import { ClipboardPlus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { postAddTask } from "../../utils/api";
import { useToast } from "../../utils/hooks/useToast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addTask } from "../../store/taskSlice";


export function AddTaskModal() {
  const [task, setTask] = useState<string>("");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { success, error } = useToast();

  const newTask = () => {
    if (task.trim().length === 0) {
      error("Task cannot be empty");
      return;
    }

    postAddTask({ task })
      .then(({ data }) => {
        setTask("");
        dispatch(addTask(data.data));
        success("Task added successfully");
        setOpen(false);
      })
      .catch((err: any) => {
        error(err.message);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ClipboardPlus /> Add Task{" "}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Describe your task and click save to add it to the list.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="task">Task Description</Label>
            <Textarea
              id="task"
              value={task}
              placeholder="Type your task here..."
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={newTask}>Save Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
