import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { Input } from "../ui/input";
import { ClipboardPlus, Search } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { useDebounce } from "../../utils/hooks/useDebounce";
import { searchTasksThunk } from "../../store/taskSlice";

export function SearchModel() {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    if (debouncedSearch.trim().length > 0) {
      dispatch(searchTasksThunk(debouncedSearch));
    }
  }, [debouncedSearch, dispatch]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[200px]">
        <Search /> Search Task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Search Tasks</DialogTitle>
          <DialogDescription>
            Type to search for tasks. It will automatically update after typing.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="task-search">Search Term</Label>
            <Input
              id="task-search"
              placeholder="Search for tasks..."
              onChange={(e) => setSearch(e.target.value)} // Update search state on input change
              value={search} // Controlled input with state
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
