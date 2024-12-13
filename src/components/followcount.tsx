import AxiosInstance from "@/utils/axios";

export const FollowCount = async({id}:{id:string})=>{
  try {
    const token = document.cookie.split("=")[1];
    if (!token) {
      throw new Error("No authentication token found");
    }
    const response = await AxiosInstance.post(
        "act/followcount",
        {id},
        {
          headers: {
            Authorization: `${token}`, 
            "Content-Type": "application/json",
          },
        }
      );
      return response.data
  } catch (error) {
    console.log(error)
    return error
  }   
}