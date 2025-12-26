import dayjs from "dayjs";
import { type FC, type ReactNode, useState } from "react";

import { ApolloError } from "@apollo/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";

interface Column {
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
    | "SELECT"
    | "FILE";
  formatter?: (value: any) => ReactNode;
}

const DataTableHead: FC<{
  columns: Column[];
  isSelected: boolean;
  onSelectAll: (value: any) => void;
}> = ({ columns }) => (
  <TableHeader>
    <TableRow className="hover:bg-transparent">
      {columns.map((c) => (
        <TableHead key={c.fieldName + c.label}>
          {c.type === "SELECT"
            ? // <Checkbox
              //   size="small"
              //   sx={{
              //     height: '24px',
              //     width: '24px',
              //   }}
              //   value={isSelected}
              //   onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSelectAll(e.target.checked)}
              // />
              null
            : c.label}
        </TableHead>
      ))}
    </TableRow>
  </TableHeader>
);

const DataTableCell: FC<{
  value: any;
  type?: Column["type"];
  formatter?: Column["formatter"];
  onSelect?: (value: any) => void;
}> = ({ value, type, formatter }) => {
  switch (type) {
    case "SELECT":
      return (
        <TableCell onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          {/* <Checkbox
            size="small"
            sx={{
              height: '24px',
              width: '24px',
            }}
            checked={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSelect(e.target.checked)}
          /> */}
        </TableCell>
      );
    case "CURRENCY":
      return (
        <TableCell>
          {value !== undefined && value !== null
            ? `₹ ${value.toLocaleString("en-IN")}`
            : "-"}
        </TableCell>
      );
    case "DATE":
      return (
        <TableCell align="left">{dayjs(value).format("D MMMM YYYY")}</TableCell>
      );
    case "DATETIME":
      return (
        <TableCell align="left">
          {dayjs(value).format("h:mm A, D MMM YYYY")}
        </TableCell>
      );
    case "IMAGE":
      return (
        <TableCell>
          <div
            style={{
              backgroundImage: `url("${value}")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              border: "1px solid #d4d4d4",
              height: "36px",
              width: "36px",
              margin: "8px",
              borderRadius: "4px",
            }}
          />
        </TableCell>
      );
    case "NUMBER":
      return <TableCell>{value}</TableCell>;
    case "BOOLEAN":
      return <TableCell>{value ? "TRUE" : "FALSE"}</TableCell>;
    case "FILE":
      return (
        <TableCell>
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 hover:underline"
          >
            View File
          </a>
        </TableCell>
      );
    default:
      if (formatter) {
        return <TableCell>{formatter(value)}</TableCell>;
      }
      return <TableCell>{value}</TableCell>;
  }
};

const DataTable: FC<{
  data: any[];
  columns: Column[];
  filterLoading?: boolean;
  onClick?: (dataItem: any) => void;
  bulkSelectActions?: {
    label: string;
    icon?: ReactNode;
    action: (selectedItems: any[]) => Promise<any>;
    loading?: boolean;
    error?: ApolloError;
  }[];
  onSelect?: (selectedItems: any[]) => void;
  pagination?: {
    onLoadMore: () => void;
    totalCount?: number | null;
    hasNextPage?: boolean | null;
    loading: boolean;
  };
}> = ({
  data,
  columns,
  filterLoading = false,
  onClick,
  //   bulkSelectActions,
  onSelect,
  pagination,
}) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  function getValueByFieldName(fieldName: string, obj: any) {
    // Example: fieldName "group.name" looks for obj[group][name]
    if (!fieldName) return obj;
    return fieldName.split(".").reduce((acc, curr) => {
      if (!acc) return null;
      return acc[curr];
    }, obj);
  }

  function updateSelectedItems(items: string[]) {
    setSelectedItems(items);
    if (onSelect) {
      onSelect(items);
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <DataTableHead
            columns={columns}
            isSelected={selectedItems.length > 0}
            onSelectAll={(checked) => {
              if (!checked) {
                updateSelectedItems([]);
                return;
              }
              updateSelectedItems(
                data.map((item) =>
                  getValueByFieldName(columns[0].fieldName, item)
                )
              );
            }}
          />
          <TableBody>
            {filterLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <div className="h-16 w-full flex items-center justify-center">
                    <Loader />
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-16 text-center text-muted-foreground"
                >
                  No results found
                </TableCell>
              </TableRow>
            ) : (
              data.map((d) => (
                <TableRow
                  onClick={() => onClick?.(d)}
                  tabIndex={-1}
                  key={d.id}
                  className={
                    onClick ? "cursor-pointer" : "hover:bg-transparent"
                  }
                >
                  {columns.map((c) => (
                    <DataTableCell
                      key={c.fieldName + c.label}
                      type={c.type}
                      formatter={c.formatter}
                      value={
                        c.type === "SELECT"
                          ? selectedItems.includes(
                              getValueByFieldName(c.fieldName, d)
                            )
                          : getValueByFieldName(c.fieldName, d)
                      }
                      onSelect={(checked) => {
                        const newItems = checked
                          ? [
                              ...selectedItems,
                              getValueByFieldName(c.fieldName, d),
                            ]
                          : selectedItems.filter(
                              (item) =>
                                item !== getValueByFieldName(c.fieldName, d)
                            );
                        updateSelectedItems(newItems);
                      }}
                    />
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {/* {selectedItems.length && bulkSelectActions ? (
        <div className={theme.bulkActionsContainer}>
          <div className={theme.top}>
            <span className={theme.actionLabel}>{`${selectedItems.length} item${
              selectedItems.length > 1 ? 's' : ''
            } selected`}</span>
            <Button variant="text" onClick={() => updateSelectedItems([])}>
              Close
            </Button>
          </div>
          <div className={theme.bottom}>
            {bulkSelectActions?.map((action, index) => {
              return (
                <Fragment key={`bulk-action-${index}`}>
                  {action.error ? <ErrorMessage error={action.error} /> : null}
                  <LoadingButton
                    id="id"
                    fullWidth
                    loading={action.loading}
                    endIcon={action.icon}
                    variant="contained"
                    onClick={() => action.action(selectedItems).then(() => updateSelectedItems([]))}
                  >
                    {action.label}
                  </LoadingButton>
                </Fragment>
              );
            })}
          </div>
        </div>
      ) : null} */}
      </div>
      {!filterLoading && pagination ? (
        <div className="flex items-center justify-between p-2">
          {pagination.totalCount ? (
            <p className="text-sm text-muted-foreground">
              Showing {data.length} of {pagination.totalCount}
            </p>
          ) : null}
          {pagination.onLoadMore && pagination.hasNextPage && (
            <Button
              loading={pagination.loading}
              onClick={pagination.onLoadMore}
              variant="outline"
            >
              Load More
            </Button>
          )}
        </div>
      ) : null}
    </>
  );
};

export { DataTable };
