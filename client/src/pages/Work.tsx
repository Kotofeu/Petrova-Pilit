import { useParams } from "react-router-dom";
import { WorkByIdSection } from "../modules/WorkById"
import { WorkModal } from "../modules/WorkModal"
import { useCallback, useEffect, useMemo } from "react";
import { IWork, userStore, worksStore } from "../store";
import { observer } from "mobx-react-lite";
import useRequest from "../utils/hooks/useRequest";
import { workApi } from "../http";
import Loader from "../UI/Loader/Loader";

const Work = observer(() => {
  const params = useParams();
  const [
    workById,
    workByIdIsLoading
  ] = useRequest<IWork>(workApi.getWorkById, params ? Number(params.id) : undefined);
  const [
    deletedWork,
    deletedWorkIsLoading,
    deletedWorkError,
    deleteWork,
  ] = useRequest<number>(workApi.deleteWorkById, params.id, false);
  return (
    <main>
      <WorkByIdSection
        work={workById}
        isAdmin={userStore.isAdmin}
        openModal={() => worksStore.setIsWorkCreating(true)}
        deleteWork={deleteWork}
        isLoading={workByIdIsLoading}
      />
      <WorkModal work={workById} />
    </main>
  )
})

export default Work