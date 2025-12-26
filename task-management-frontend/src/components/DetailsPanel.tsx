import dayjs from "dayjs";
import type { FC, ReactNode } from "react";

import { cn } from "@/utils/classnames";

interface Field {
  label: string;
  fieldName: string;
  type?:
    | "DATE"
    | "DATETIME"
    | "STRING"
    | "CURRENCY"
    | "IMAGE"
    | "NUMBER"
    | "BOOLEAN"
    | "FILE"
    | "URL";
  formatter?: (value: any) => ReactNode;
}

interface DetailsPanelProps {
  data: any;
  fields: Field[];
  title?: string;
  subTitle?: string;
  className?: string;
  layout?: "grid" | "list";
  gridCols?: 1 | 2 | 3;
}

const DetailsValue: FC<{
  value: any;
  type?: Field["type"];
  formatter?: Field["formatter"];
}> = ({ value, type, formatter }) => {
  if (value === undefined || value === null) {
    return <span className="text-muted-foreground">-</span>;
  }

  switch (type) {
    case "CURRENCY":
      return <span>{`₹ ${value.toLocaleString("en-IN")}`}</span>;
    case "DATE":
      return <span>{dayjs(value).format("D MMMM YYYY")}</span>;
    case "DATETIME":
      return <span>{dayjs(value).format("D MMMM YYYY, h:mm A")}</span>;
    case "BOOLEAN":
      return <span>{value ? "Yes" : "No"}</span>;
    case "FILE":
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 hover:underline"
        >
          View File
        </a>
      );
    case "URL":
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 hover:underline"
        >
          {value}
        </a>
      );
    case "IMAGE":
      return (
        <img
          src={value}
          alt="Preview"
          className="h-20 w-20 object-cover rounded-md"
        />
      );
    default:
      if (formatter) {
        return <span>{formatter(value)}</span>;
      }
      return <span>{value}</span>;
  }
};

function getValueByFieldName(fieldName: string, obj: any) {
  // Example: fieldName "group.name" looks for obj[group][name]
  if (!fieldName) return obj;
  return fieldName.split(".").reduce((acc, curr) => {
    if (!acc) return null;
    return acc[curr];
  }, obj);
}

export const DetailsPanel: FC<DetailsPanelProps> = ({
  data,
  fields,
  title,
  subTitle,
  className,
  layout = "grid",
  gridCols = 2,
}) => {
  if (!data) {
    return <div className="text-muted-foreground">No data available</div>;
  }

  const gridColsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  }[gridCols];

  return (
    <div className={cn("border rounded-lg", className)}>
      {(title || subTitle) && (
        <div className="border-border border-b px-4 py-2">
          {title && (
            <h3 className="text-lg font-semibold leading-7 text-foreground/90 sm:truncate sm:text-lg sm:tracking-tight">
              {title}
            </h3>
          )}
          {subTitle && (
            <div className="flex items-center text-sm text-muted-foreground">
              {subTitle}
            </div>
          )}
        </div>
      )}

      {layout === "grid" ? (
        <div
          className={cn(
            "grid gap-px rounded-lg overflow-hidden bg-background",
            gridColsClass
          )}
        >
          {fields.map((field, index) => (
            <div key={index} className="p-4 bg-background">
              <h3 className="text-sm font-medium text-muted-foreground">
                {field.label}
              </h3>
              <p className="text-base font-medium">
                <DetailsValue
                  value={getValueByFieldName(field.fieldName, data)}
                  type={field.type}
                  formatter={field.formatter}
                />
              </p>
            </div>
          ))}
        </div>
      ) : (
        <dl className="divide-y divide-border">
          {fields.map((field, index) => (
            <div
              key={index}
              className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4"
            >
              <dt className="text-sm font-medium text-muted-foreground">
                {field.label}
              </dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                <DetailsValue
                  value={getValueByFieldName(field.fieldName, data)}
                  type={field.type}
                  formatter={field.formatter}
                />
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
};
