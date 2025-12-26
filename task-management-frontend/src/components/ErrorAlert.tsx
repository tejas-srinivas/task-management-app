import { AlertCircle } from "lucide-react";
import { ApolloError } from "@apollo/client";
import { toast } from "sonner";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { type FC, useEffect } from "react";
import { Button } from "@/components/ui/button";

type ErrorMessageProps = {
  error: ApolloError | boolean | string | undefined;
  refetch?: () => void;
  variant?: "default" | "alert" | "toast";
};

function getErrorMessage(error: ApolloError | string | boolean | undefined) {
  if (error && typeof error === "object" && "graphQLErrors" in error) {
    const graphQLError = error.graphQLErrors[0];
    const code =
      graphQLError && graphQLError.extensions
        ? graphQLError.extensions.code
        : "INTERNAL_SERVER_ERROR";
    switch (code) {
      case "INTERNAL_SERVER_ERROR":
        return "There was an issue processing this request. Please try again later.";
      case "RESOURCE_NOT_FOUND":
        return "The requested resource could not be found. Please try a different one.";
      case "BAD_USER_INPUT":
        return graphQLError.message
          ? graphQLError.message
          : "An incorrect value was provided in this action";
      case "UNAUTHENTICATED":
        return "You need to be authenticated to perform this action. Please log in and try again.";
      case "FORBIDDEN":
        return "You don't have the necessary permissions to perform this action";
      case "GRAPHQL_PARSE_FAILED":
      case "GRAPHQL_VALIDATION_FAILED":
        return "You seem to have encountered a bug. Please report this issue and our team will fix this for you right away.";
      default:
        return "There was an issue processing this request. Please try again later.";
    }
  }
  if (typeof error === "string") {
    return error;
  }
  return "There was an issue processing this request. Please try again later.";
}

export const ErrorAlert: FC<ErrorMessageProps> = ({
  error,
  variant = "alert",
  refetch,
}) => {
  const userMessage = getErrorMessage(error);

  useEffect(() => {
    if (variant === "toast" && error) {
      toast.error(userMessage);
    }
  }, [variant, error, userMessage]);

  if (variant === "toast") {
    return null;
  }

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      {variant === "default" && <AlertTitle>Error</AlertTitle>}
      <AlertDescription>
        {userMessage}
        {refetch && typeof refetch === "function" && (
          <Button
            size="sm"
            variant="outline"
            className="mt-3"
            onClick={refetch}
          >
            Retry
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};
