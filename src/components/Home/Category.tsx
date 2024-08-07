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
          className="text-white border border-white rounded-md min-w-[120px] flex flex-1 items-center justify-center cursor-pointer text-center px-4 py-2 hover:border-red-700 transition"
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Category;
