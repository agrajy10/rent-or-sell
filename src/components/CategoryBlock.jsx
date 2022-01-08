function CategoryBlock({ bgImage, categoryName }) {
  return (
    <div className="w-full h-64 relative rounded-xl overflow-hidden bg-black group">
      <img
        src={bgImage}
        className="w-full h-full object-cover opacity-70 scale-100 transition-transform duration-500 group-hover:scale-125"
        alt=""
      />
      <h3 className="text-white text-3xl font-bold mb-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {categoryName}
      </h3>
    </div>
  );
}

export default CategoryBlock;
