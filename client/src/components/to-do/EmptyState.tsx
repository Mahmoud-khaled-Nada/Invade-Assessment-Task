interface EmptyStateProps {
    message: string;
  }
  
  export const EmptyState = ({ message }: EmptyStateProps) => {
    return (
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-8">
        {message}
      </div>
    );
  };
  