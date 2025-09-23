import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import Cta from "@/components/CTA";
import { Button } from "@/components/ui/button";
import { recentSessions } from "@/constants";

const Page = () => {
  return (
    <main>
      <h1 className='text-2xl underline'>Popular Companions</h1>
      <section className='home-section'>
        <CompanionCard
          id='1'
          name='Countsy the Number Wizard'
          topic='Derevatives & integral'
          subject='science'
          duration={30}
          color='#e5d0ff'
        />
        <CompanionCard
          id='2'
          name='Verba the Vocubulary Builder'
          topic='language'
          subject='English literatur'
          duration={45}
          color='#BDE7ff'
        />
        <CompanionCard
          id='123'
          name='neura the brain explore'
          topic='lorem3s'
          subject='lorem200'
          duration={45}
          color='#ffff'
        />
      </section>
      <section className='home-section'>
        <CompanionList
          title='Recentry completed session'
          companions={recentSessions}
          className='w-2/3 max-lg:w-full'
        />
        <Cta />
      </section>
      
    </main>
  );
};

export default Page;
