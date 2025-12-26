import {
  type ElementType,
  type FC,
  type ReactNode,
  createElement,
  isValidElement,
} from "react";
import { NavLink, useLocation } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export interface SidebarItem {
  title: string;
  url: string;
  icon: ReactNode;
}

interface AppSidebarProps {
  title: string;
  subtitle?: string;
  logo: ElementType | ReactNode | string;
  items: SidebarItem[];
  footer?: ReactNode | undefined;
}

export const AppSidebar: FC<AppSidebarProps> = ({
  title,
  subtitle,
  logo,
  items,
  footer,
}) => {
  const location = useLocation();

  const renderLogo = () => {
    if (typeof logo === "string") {
      return <img src={logo} alt="Logo" className="h-10 w-auto" />;
    }
    if (typeof logo === "function") {
      return createElement(logo);
    }
    if (isValidElement(logo)) {
      return logo;
    }
    return null;
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <NavLink to="/" className="flex items-center justify-center p-2">
          <div className="flex items-center justify-center">{renderLogo()}</div>
          <div className="ml-2 grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{title}</span>
            <span className="truncate text-xs">{subtitle}</span>
          </div>
        </NavLink>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.url === "/"
                        ? location.pathname === "/"
                        : location.pathname === item.url ||
                          location.pathname.startsWith(
                            item.url.endsWith("/") ? item.url : item.url + "/"
                          )
                    }
                  >
                    <NavLink key={item.url.replace(/^\/+/, "")} to={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {footer && <SidebarFooter>{footer}</SidebarFooter>}
    </Sidebar>
  );
};
