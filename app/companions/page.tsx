import { getAllCompanion } from "@/lib/actions/companion.action"


const CompanionPage = async({searchParams} : SearchParams ) => {
  const filter = await searchParams
  const subject = filter.subject ? filter.subject : ''
  const topic = filter.topic ? filter.topic : ''

  const companion = await getAllCompanion({subject, topic})
  console.log(companion)

  return (
    <div>CompanionPage</div>
  )
}

export default CompanionPage