import React from "react";
import { Link } from "react-router-dom";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Button, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { ThemeToggle } from "./theme-toggle";

export function HomeNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
        <NavbarItem>
          <Link to="/#features" className="text-foreground/80 hover:text-foreground">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/#how-it-works" className="text-foreground/80 hover:text-foreground">
            How It Works
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/#about" className="text-foreground/80 hover:text-foreground">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <ThemeToggle />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Link to="/auth/login">
            <Button color="primary" variant="flat">
              Login
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/auth/register">
            <Button color="primary">
              Sign Up
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            to="/#features"
            className="text-foreground/80 w-full"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            to="/#how-it-works"
            className="text-foreground/80 w-full"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            to="/#about"
            className="text-foreground/80 w-full"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            to="/auth/login"
            className="text-foreground/80 w-full"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <ThemeToggle />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}