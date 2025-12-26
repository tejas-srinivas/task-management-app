import { ArrowLeftIcon, HomeIcon } from "lucide-react";
import { Fragment } from "react";

import {
  AppSidebar,
  type SidebarItem,
} from "@/components/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/classnames";

export interface SidebarProps {
  items: SidebarItem[];
  logo: React.ReactNode | React.ElementType | string;
  title: string;
  subtitle?: string;
  footer?: React.ReactNode;
}

export interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  onBack?: () => void;
  sidebar: SidebarProps;
  className?: string;
}

export const Layout = ({
  children,
  title,
  subtitle,
  breadcrumbs,
  onBack,
  sidebar,
  className,
}: LayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar
        items={sidebar.items || []}
        logo={sidebar.logo}
        title={sidebar.title}
        subtitle={sidebar?.subtitle}
        footer={sidebar.footer}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="" />
            {breadcrumbs && (
              <>
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="/">
                        <HomeIcon className="w-4 h-4" />
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    {breadcrumbs?.map((breadcrumb, index) => (
                      <Fragment key={index}>
                        <BreadcrumbItem>
                          {breadcrumb.href ? (
                            <BreadcrumbLink href={breadcrumb.href}>
                              {breadcrumb.label}
                            </BreadcrumbLink>
                          ) : (
                            <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                          )}
                        </BreadcrumbItem>
                        {index < breadcrumbs.length - 1 && (
                          <BreadcrumbSeparator />
                        )}
                      </Fragment>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </>
            )}
          </div>
        </header>
        <div className={cn("p-4 w-full max-w-5xl md:mx-auto", className)}>
          {(title || subtitle) && (
            <div className="flex items-start gap-3 mb-6">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-1 rounded-full bg-muted hover:bg-muted-foreground hover:text-background transition-colors cursor-pointer"
                  aria-label="Go back"
                >
                  <ArrowLeftIcon className="w-6 h-6" />
                </button>
              )}
              <div>
                {title && <h1 className="text-2xl font-bold">{title}</h1>}
                {subtitle && (
                  <p className="text-base font-light text-foreground">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          )}
          {children}
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
};
