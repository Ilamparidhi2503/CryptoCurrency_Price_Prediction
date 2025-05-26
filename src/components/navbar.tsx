import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Button, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "../contexts/auth-context";

export function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/app/dashboard", icon: "lucide:layout-dashboard" },
    { name: "Prediction", path: "/app/prediction", icon: "lucide:line-chart" },
    { name: "Model", path: "/app/model", icon: "lucide:brain-circuit" },
    { name: "Learn", path: "/app/learn", icon: "lucide:book-open" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Navbar 
      isBordered 
      isMenuOpen={isMenuOpen} 
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      className="bg-background/70 backdrop-blur-md"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="pr-3 sm:hidden" justify="center">
        <NavbarBrand>
          <Icon icon="lucide:brain-circuit" className="text-primary text-2xl mr-2" />
          <p className="font-bold text-inherit">CryptoPredict AI</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <Icon icon="lucide:brain-circuit" className="text-primary text-2xl mr-2" />
          <p className="font-bold text-inherit">CryptoPredict AI</p>
        </NavbarBrand>
        {navItems.map((item) => (
          <NavbarItem key={item.path} isActive={isActive(item.path)}>
            <Link 
              to={item.path} 
              className={`flex items-center gap-1 ${
                isActive(item.path) 
                  ? "text-primary font-medium" 
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              <Icon icon={item.icon} className="h-4 w-4" />
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name={user?.name || "User"}
                size="sm"
                src={user?.avatar || ""}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings" startContent={<Icon icon="lucide:settings" className="h-4 w-4" />}>
                Settings
              </DropdownItem>
              <DropdownItem key="help" startContent={<Icon icon="lucide:help-circle" className="h-4 w-4" />}>
                Help & Feedback
              </DropdownItem>
              <DropdownItem 
                key="logout" 
                color="danger" 
                startContent={<Icon icon="lucide:log-out" className="h-4 w-4" />}
                onPress={logout}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {navItems.map((item) => (
          <NavbarMenuItem key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-2 py-2 ${
                isActive(item.path) 
                  ? "text-primary font-medium" 
                  : "text-foreground/80"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Icon icon={item.icon} className="h-5 w-5" />
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}