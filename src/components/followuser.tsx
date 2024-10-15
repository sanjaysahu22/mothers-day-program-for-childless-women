// this is component for suggesting the user  whom to follow
// sidebar wala pe lower
export const Followuser = () => {
    return (
        <div className="flex flex-col  justify-center pl-5  ">
        <h1 className="text-2xl pb-3 ">Choose Your Types :</h1>
  
        <div className="flex   h-3/5 flex-col  flex-wrap ">
          <div className="bg-zinc-100 m-2 h-2/5 p-2 rounded-md flex  items-center   ">
          <div className="h-16 w-16 rounded-[50%] mr-2 bg-red-300"></div>
          <div className="flex flex-col w-1/2 h-[80%]    flex-wrap leading-7">
            <div className="font-medium leading-6" >SANJAY SAHU</div>
            <div className="text-xs leading-3">ui/ux  ,web developer/Devops currently at nowhere  </div>
          </div>
          <div className="bg-zinc-300 px-3 py-1 rounded-full ml-2">follow</div>
          </div>
          <div className="bg-zinc-100 m-2 h-2/5 p-2 rounded-md flex  items-center   ">
          <div className="h-16 w-16 rounded-[50%] mr-2 bg-red-300"></div>
          <div className="flex flex-col w-1/2 h-[80%]    flex-wrap leading-7">
            <div className="font-medium leading-6" >SANJAY SAHU</div>
            <div className="text-xs leading-3">ui/ux  ,web developer/Devops currently at nowhere </div>
          </div>
          <div className="bg-zinc-300 px-3 py-1 rounded-full ml-2">follow</div>
          </div><div className="bg-zinc-100 m-2 h-2/5 p-2 rounded-md flex  items-center   ">
          <div className="h-16 w-16 rounded-[50%] mr-2 bg-red-300"></div>
          <div className="flex flex-col w-1/2 h-[80%]    flex-wrap leading-7">
            <div className="font-medium leading-6" >SANJAY SAHU</div>
            <div className="text-xs leading-3">ui/ux  ,web developer/Devops currently at nowhere  </div>
          </div>
          <div className="bg-zinc-300 px-3 py-1 rounded-full ml-2">follow</div>
          </div>
         
        </div>
      </div>
    );
};
export default Followuser;