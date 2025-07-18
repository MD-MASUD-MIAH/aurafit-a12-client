const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-blue-600"></div>
    </div>
  );
};

export default Loader;
