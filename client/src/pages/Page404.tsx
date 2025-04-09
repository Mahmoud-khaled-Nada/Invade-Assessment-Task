export const Page404 = () => {
  return (
    <div className="bg-white dark:bg-gray-900 flex items-center justify-center min-h-screen px-6 py-12">
    <div className="text-center">
      <h1 className="text-9xl font-extrabold text-gray-300 dark:text-gray-700 tracking-widest">404</h1>
      <div className="bg-blue-500 text-white px-2 py-1 rounded rotate-12 absolute text-sm inline-block mt-2">
        Page Not Found
      </div>
      <p className="text-gray-500 dark:text-gray-400 mt-6 text-lg">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-6 inline-block px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
      >
        Go Home
      </a>
    </div>
    </div>
  );
};
