"use client";

const Category = () => {
  const categoryList = [
    {
      name: "Ayakkabı",
    },
    {
      name: "Çanta",
    },
    {
      name: "Gömlek",
    },
    {
      name: "Gözlük",
    },
    {
      name: "Tshirt",
    },
  ];

  return (
    <div className="gap-3 md:gap-10 md:py-8 py-5 grid grid-cols-3 md:grid-cols-5">
      {categoryList.map((category, index) => (
        <div
          key={index}
          className="text-black bg-slate-200 rounded-md min-w-[120px] flex flex-1 items-center justify-center cursor-pointer text-center px-4 py-2 hover:bg-red-700 hover:text-white transition"
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Category;
