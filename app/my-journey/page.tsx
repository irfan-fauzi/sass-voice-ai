import { getSessionHistoty } from "@/lib/actions/companion.action";

const Profile = async () => {
  const session = await getSessionHistoty();
  console.log(session);
  return <div>Profile</div>;
};

export default Profile;
