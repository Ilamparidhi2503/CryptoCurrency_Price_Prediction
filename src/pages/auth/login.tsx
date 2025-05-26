import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, CardFooter, Input, Button, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../../contexts/auth-context";
import { motion } from "framer-motion";

export function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<{email?: string; password?: string}>({});
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col gap-1 items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
            <Icon icon="lucide:lock" className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold">Welcome Back</h1>
          <p className="text-small text-default-500">Sign in to your account</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onValueChange={setEmail}
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              startContent={<Icon icon="lucide:mail" className="text-default-400 text-lg" />}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onValueChange={setPassword}
              isInvalid={!!errors.password}
              errorMessage={errors.password}
              startContent={<Icon icon="lucide:key" className="text-default-400 text-lg" />}
            />
            <div className="flex justify-end">
              <Link to="/auth/forgot-password" className="text-small text-primary">
                Forgot password?
              </Link>
            </div>
            <Button 
              type="submit" 
              color="primary" 
              fullWidth
              isLoading={isSubmitting}
            >
              Sign In
            </Button>
          </form>
        </CardBody>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex items-center gap-4 w-full">
            <Divider className="flex-1" />
            <span className="text-small text-default-500">OR</span>
            <Divider className="flex-1" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Button 
              variant="bordered" 
              startContent={<Icon icon="logos:google-icon" className="h-5 w-5" />}
              fullWidth
            >
              Continue with Google
            </Button>
            <Button 
              variant="bordered" 
              startContent={<Icon icon="logos:github-icon" className="h-5 w-5" />}
              fullWidth
            >
              Continue with GitHub
            </Button>
          </div>
          <p className="text-center text-small text-default-500">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-primary">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}