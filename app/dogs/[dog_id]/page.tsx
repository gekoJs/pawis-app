import DogDetail from "@/layouts/dog_detail/DogDetail";

export default function DogById({
  params,
}: {
  params: { dog_id: string | number };
}) {
  return <DogDetail params={params} />;
}
