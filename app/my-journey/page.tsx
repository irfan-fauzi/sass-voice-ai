import { getUser } from "@/lib/actions/companion.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Profile = async () => {
  const { userId } = await auth();
   if (!userId) redirect("/sign-in");

  const data = await getUser()
  if(!data) return (
    <h1>Something wrong when get user</h1>
  )

 
  return (
    <>
      <div>Profile</div>
    </>
  );
};

export default Profile;
