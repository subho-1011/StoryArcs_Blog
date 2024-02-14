const Categories = [
  {
    id: 1,
    name: "All",
  },
  {
    id: 2,
    name: "Popular",
  },
  {
    id: 3,
    name: "Coding",
  },
  {
    id: 4,
    name: "Jokes",
  },
];
const PopularCat = () => {
  return (
    <div className="w-full h-auto flex flex-col my-4 md:py-10">
      <h1 className="text-2xl md:text-4xl font-bold text-left">
        Popular Categories
      </h1>
      <div className="w-full h-auto flex flex-wrap my-4 py-8">
        {Categories.map((category) => (
          <div
            key={category.id}
            className="flex justify-center rounded-2xl bg-slate-300 hover:bg-slate-400 dark:bg-slate-500 mx-6 px-6 py-3 my-2 dark:hover:bg-slate-600"
          >
            <h1 className="text-xl font-bold text-center">{category.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCat;
