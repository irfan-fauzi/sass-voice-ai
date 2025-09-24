import CompanionCard from "@/components/CompanionCard"
import { getAllCompanion } from "@/lib/actions/companion.action"
import { getSubjectColor } from "@/lib/utils"


const CompanionPage = async({searchParams} : SearchParams ) => {
  const filter = await searchParams
  const subject = filter.subject ? filter.subject : ''
  const topic = filter.topic ? filter.topic : ''

  const companion = await getAllCompanion({subject, topic})
  

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companion Library</h1>
        <div className="flex gap-4">Filters</div>
      </section>
      <section className="companions-grid">
        {
          companion.map((companion) => (
            <CompanionCard key={companion.id} color={getSubjectColor(companion.subject)} {...companion} />
          ))
        }
      </section>
    </main>
  )
}

export default CompanionPage