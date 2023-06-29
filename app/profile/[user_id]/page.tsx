import Profile from "@/layouts/profile/Profile";

export default function Profile_page({
  params,
}: {
  params: { user_id: string | number };
}) {
    
  return <Profile id_user={params.user_id} />;
}
