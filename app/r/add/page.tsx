import { AddRoutineForm } from "@/components/Routine/AddRoutineForm";
import { getSession } from "@/lib/api/session";

export default async function AddRoutine() {
  const session = await getSession();
  const sessionId = session.id;

  return <AddRoutineForm />;
}
