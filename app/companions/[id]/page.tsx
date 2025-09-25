import { getCompanion } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const detailCompanion = await getCompanion(id);
  const user = await currentUser();

  if (!user) redirect("/sign-in");
  if (!detailCompanion) redirect("/companions");

  return (
    <main>
      <article className='flex rounded-border justify-between p-6 max-md:flex-col'>
        <div className='flex items-center gap-2'>
          <div
            className='size-[72px] flex items-center justify-center rounded-lg max-md:hidden'
            style={{
              backgroundColor: getSubjectColor(detailCompanion.subject),
            }}
          ></div>
        </div>
      </article>
    </main>
  );
};

export default CompanionSession;
