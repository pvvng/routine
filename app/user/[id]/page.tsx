interface UserDetailProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetail({ params }: UserDetailProps) {
  const id = (await params).id;
  return <div></div>;
}
