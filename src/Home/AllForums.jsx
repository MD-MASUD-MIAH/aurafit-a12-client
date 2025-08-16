import ForumsPage from "./ForumsPage";

const AllForums = () => {
  return (
    <div>
      <div className="text-center my-10">
        <h1 className="md:text-4xl text-xl font-bold text-gray-800  mb-2">
          Explore Community Forums
        </h1>
        <p className="text-gray-500   w-10/12 mx-auto md:mt-2 mt-1 md:text-[16px] text-sm">
          Join the conversation, share your thoughts, and learn from others in
          the fitness community.
        </p>
      </div>

      <div>
        <ForumsPage></ForumsPage>
      </div>
    </div>
  );
};

export default AllForums;
