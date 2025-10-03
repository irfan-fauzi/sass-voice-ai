import { getHistoryCompanion, getUser } from "@/lib/actions/companion.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Profile = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const { data, error } = await getUser();
  const companionsHistory = await getHistoryCompanion()
  console.log(companionsHistory)
  if (error) return <h1>Something wrong when get user</h1>;
  if (!data) return <h1>tidak ada data</h1>;

  // setelah dicek, aman untuk destructuring
  const { firstName, lastName, email, profileImg } = data;
  
  return (
    <>
      <div>Profile</div>
    </>
  );
};

export default Profile;
