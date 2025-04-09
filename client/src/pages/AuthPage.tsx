import { SignIn } from "../components/auth/SignIn";
import { SignUp } from "../components/auth/SignUp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export const AuthPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{backgroundColor: "#f5f5f5"}}>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 bg-gray-200">
          <TabsTrigger value="account">Sign In</TabsTrigger>
          <TabsTrigger value="password">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
            <SignIn />
        </TabsContent>
        <TabsContent value="password">
            <SignUp/>
        </TabsContent>
      </Tabs>
    </div>
  );
};
