import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, CardFooter, Input, Button, Divider, Checkbox } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../../contexts/auth-context";
import { motion } from "framer-motion";

export function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [agreeTerms, setAgreeTerms] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreeTerms?: string;
  }>({});
  
  const { register } = useAuth();

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      agreeTerms?: string;
    } = {};
    
    if (!name) {
      newErrors.name = "Name is required";
    }
    
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
    
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
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
      await register(name, email, password);
    } catch (error) {
      console.error("Registration error:", error);
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
            <Icon icon="lucide:user-plus" className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold">Create Account</h1>
          <p className="text-small text-default-500">Sign up to get started</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              placeholder="Enter your name"
              value={name}
              onValueChange={setName}
              isInvalid={!!errors.name}
              errorMessage={errors.name}
              startContent={<Icon icon="lucide:user" className="text-default-400 text-lg" />}
            />
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
              placeholder="Create a password"
              type="password"
              value={password}
              onValueChange={setPassword}
              isInvalid={!!errors.password}
              errorMessage={errors.password}
              startContent={<Icon icon="lucide:key" className="text-default-400 text-lg" />}
            />
            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              type="password"
              value={confirmPassword}
              onValueChange={setConfirmPassword}
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              startContent={<Icon icon="lucide:check-circle" className="text-default-400 text-lg" />}
            />
            <div>
              <Checkbox
                isSelected={agreeTerms}
                onValueChange={setAgreeTerms}
                isInvalid={!!errors.agreeTerms}
              >
                <div className="text-small">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary">
                    Privacy Policy
                  </Link>
                </div>
              </Checkbox>
              {errors.agreeTerms && (
                <p className="text-tiny text-danger mt-1">{errors.agreeTerms}</p>
              )}
            </div>
            <Button 
              type="submit" 
              color="primary" 
              fullWidth
              isLoading={isSubmitting}
            >
              Create Account
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
              Sign up with Google
            </Button>
            <Button 
              variant="bordered" 
              startContent={<Icon icon="logos:github-icon" className="h-5 w-5" />}
              fullWidth
            >
              Sign up with GitHub
            </Button>
          </div>
          <p className="text-center text-small text-default-500">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}