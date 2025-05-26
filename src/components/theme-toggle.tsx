import React from "react";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useThemeContext } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button 
          isIconOnly 
          variant="ghost" 
          radius="full" 
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Icon icon="lucide:moon" className="h-5 w-5" />
          ) : theme === "light" ? (
            <Icon icon="lucide:sun" className="h-5 w-5" />
          ) : (
            <Icon icon="lucide:laptop" className="h-5 w-5" />
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Theme options">
        <DropdownItem
          key="light"
          startContent={<Icon icon="lucide:sun" className="h-4 w-4" />}
          onPress={() => setTheme("light")}
        >
          Light
        </DropdownItem>
        <DropdownItem
          key="dark"
          startContent={<Icon icon="lucide:moon" className="h-4 w-4" />}
          onPress={() => setTheme("dark")}
        >
          Dark
        </DropdownItem>
        <DropdownItem
          key="system"
          startContent={<Icon icon="lucide:laptop" className="h-4 w-4" />}
          onPress={() => setTheme("system")}
        >
          System
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}