import { useParams } from "react-router-dom";
import { WorkByIdSection } from "../modules/WorkById"
import { WorkModal } from "../modules/WorkModal"
import { useMemo } from "react";
import { userStore, worksStore } from "../store";
import { observer } from "mobx-react-lite";

const Work = observer(() => {
  const params = useParams();

  const work = useMemo(() => {
    if (params.id) return worksStore.loadWorkById(+params.id)
  }, [params])
  return (
    <main>
      <WorkByIdSection
        work={work}
        isAdmin={userStore.isAdmin}
        openModal={() => worksStore.setIsWorkCreating(true)}
        deleteWork={(id: number) => worksStore.deleteWork(id)}
      />
      <WorkModal work={work} />
    </main>
  )
})

export default Work