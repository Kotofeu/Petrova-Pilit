import React from 'react';
import ReactPlayer from 'react-player';

import Map from '../../../../UI/Map/Map';
import Section from '../../../../components/Section/Section';
import HowToGet from '../../../../assets/video/howToGet.png';

import HowToGetMp4 from '../../../../assets/video/howToGet.mp4';

import classes from './HowToGetSection.module.scss';
import { applicationStore } from '../../../../store';
import { observer } from 'mobx-react-lite';

export const HowToGetSection = observer(() => {
  if (!applicationStore.addressMap || !HowToGet) return null
  return (
    <Section className={classes.howToGet} isUnderline>
      <h2 className={classes.howToGet__title}>Как меня найти</h2>

      <div className={classes.howToGet__inner}>
        <Map
          className={classes.howToGet__map}
          name='Моя мастерская'
          src={applicationStore.addressMap}
          height='100%'
          width='200%'
        />

        <ReactPlayer
          width='100%'
          height='100%'
          playing
          style={{ aspectRatio: "3/4" }}
          url={HowToGetMp4}
          controls
          light={HowToGet}
        />
      </div>
    </Section >
  );
});