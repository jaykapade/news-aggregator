const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-24 w-fit m-auto rounded-md mt-24 bg-gray-100">
      <img
        src="/assets/not-found.svg"
        alt="empty state"
        width="128"
        className="mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-500 mb-1">
        No articles found
      </h2>
      <p className="text-gray-500 text-center">
        We couldn't find any articles in this topic. Please try different
        filters.
      </p>
    </div>
  );
};

export default EmptyState;
