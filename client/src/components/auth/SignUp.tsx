import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useDropzone } from "react-dropzone";
import { RegisterParams } from "../../utils/types";
import { useToast } from "../../utils/hooks/useToast";
import { Loader2, UserPlus } from "lucide-react";
import { postRegister } from "../../utils/api";
import { storage } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [formData, setFormData] = useState<RegisterParams>({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });

  const { success, error } = useToast();

  const navigate = useNavigate();

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Dropzone configuration for image upload
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          avatar: file,
        }));

        // Create an image preview URL
        const filePreview = URL.createObjectURL(file);
        setPreview(filePreview);
      }
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("password", formData.password);

    if (formData.avatar) {
      form.append("avatar", formData.avatar);
    }

    try {
      setLoading(true);
      const { data } = await postRegister(form);
      if (data.data.access_token) {
        storage.cookies_save("access_token", data.data, { expires: 1 });
        success("User signed up successfully");
        navigate("/");
      }
    } catch (error: any) {
      console.error("Error:", error?.message);
      error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your account here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form onSubmit={handleSubmit}>
          <div className="space-y-1 mb-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Pedro Duarte"
              required
            />
          </div>

          <div className="space-y-1 mb-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@example.com"
              required
            />
          </div>

          <div className="space-y-1 mb-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="********"
              required
            />
          </div>

          <div className="space-y-1 mb-3">
            <Label>Avatar</Label>
            <div
              {...getRootProps()}
              className="border border-dashed p-4 rounded-md cursor-pointer text-center text-sm bg-muted hover:bg-muted/60 transition"
            >
              <input {...getInputProps()} />
              {formData.avatar ? (
                <>
                  <img
                    src={preview || ""}
                    alt="Avatar Preview"
                    className="w-32 h-32 object-cover rounded-full mx-auto mb-2"
                  />
                  <p className="text-green-600">Selected: {formData.avatar.name}</p>
                </>
              ) : (
                <p>Drag 'n' drop or click to select an image</p>
              )}
            </div>
          </div>

          <CardFooter className="flex justify-center">
            <Button type="submit">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <UserPlus className="mr-2 h-4 w-4" />
              )}
              {loading ? "Loading..." : "Sign Up"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
