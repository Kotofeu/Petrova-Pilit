import ReactPlayer from 'react-player';

import Map from '../../../../UI/Map/Map';
import Section from '../../../../components/Section/Section';

import { applicationStore } from '../../../../store';
import { observer } from 'mobx-react-lite';
import classes from './HowToGetSection.module.scss';
import useRequest from '../../../../utils/hooks/useRequest';
import { IMainInfoValue, mainInfoApi } from '../../../../http';
import { useMessage } from '../../../MessageContext';
import { useEffect } from 'react';

export const HowToGetSection = observer(() => {

  const [
    mainInfo,
    mainInfoIsLoading,
    mainInfosError
  ] = useRequest<IMainInfoValue>(mainInfoApi.getInfos);
  const { addMessage } = useMessage()

  useEffect(() => {
    if (mainInfosError && mainInfosError.toString() !== applicationStore.error.toString()) {
      applicationStore.setError(mainInfosError)
      addMessage(applicationStore.error.toString(), 'error')
    }
  }, [mainInfosError])
  useEffect(() => {
    if (mainInfo) {
      applicationStore.setGeneralData(mainInfo)
    }
  }, [mainInfo])
  return (
    <Section className={classes.howToGet} isUnderline>
      <h2 className={classes.howToGet__title}>Как меня найти</h2>

      <div className={classes.howToGet__inner}>
        <Map
          className={classes.howToGet__map}
          name='Моя мастерская'
          src={applicationStore.addressMap}
          height='100%'
          isLoading={mainInfoIsLoading}
        />

        {
          applicationStore.howToGetVideo
            ? <ReactPlayer
              width='100%'
              height='100%'
              playing={applicationStore.howToGetPreview ? true : false}
              style={{ aspectRatio: "3/4", backgroundColor: '#F2F1F0' }}
              url={applicationStore.howToGetVideo}
              controls
              light={applicationStore.howToGetPreview || ''}
            />
            : null
        }

      </div>
    </Section >
  );
});