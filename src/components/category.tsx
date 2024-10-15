//types of category
 const Category = () => {
  return (
    <div className="h-1/2 flex flex-col  justify-center p-5">
      <h1 className="text-2xl pb-3 ">Choose Your Types :</h1>

      <div className="flex  h-1/2 overflow-hidden flex-wrap ">
        <div className="bg-zinc-200 p-2 m-2 rounded-full ">TECHNOLOGY</div>
        <div className="bg-zinc-200 p-2 m-2 rounded-full">RELATIONSHIP</div>
        <div className="bg-zinc-200 p-2 m-2 rounded-full">CAR</div>
        <div className="bg-zinc-200 p-2 m-2 rounded-full">PYTHON</div>
        <div className="bg-zinc-200 p-2 m-2 rounded-full">POLITICS</div>
        <div className="bg-zinc-200 p-2 m-2 rounded-full">TECHNOLOGY</div>
        <div className="bg-zinc-200 p-2 m-2 rounded-full">PHYSCHOLOGY</div>
        <div className="bg-zinc-200 p-2 m-2 rounded-full">SCIENCE</div>  
      </div>
    </div>
  );
};
export default Category;
