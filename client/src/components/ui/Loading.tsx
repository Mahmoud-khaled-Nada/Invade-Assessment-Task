export const Loading = () => {
    return (
      <div className="flex h-screen items-center justify-center bg-[#ffffff]">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#01aa85] border-t-transparent"></div>
          <p className="mt-4 text-lg text-white">Loading...</p>
        </div>
      </div>
    );
  };