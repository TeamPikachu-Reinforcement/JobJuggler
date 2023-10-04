import React, { useEffect } from 'react';
import { loadJobs } from '../../state/reducers/jobSlice';
import type { Job } from '../../../global/types';
import { useAppDispatch, useAppSelector } from '../../state/hooks/hooks';
import Card from './Card';

type params = {};

const loadJobsReact = async (dispatch: any) => {
  const jobs: Response = await fetch('/api/apps');
  const jobsJSON: Job[] = await jobs.json();

  dispatch(loadJobs(jobsJSON));
};

const Dashboard: React.FC<params> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadJobsReact(dispatch);
  }, []);

  const jobList = useAppSelector((state) => state.jobs);
  let newCard = <></>;

  if (jobList[0]) {
    newCard = <Card job={jobList[1]} id={0} key={jobList[1].__id}></Card>;
  }
  const cards = jobList.map<React.JSX.Element>((job, id) => {
    return <Card job={job} id={id} key={id}></Card>;
  });

  return (
    <div className='bg-dominant flex flex-col h-full overflow-scroll'>
      <div className='flex flex-col grow'>{cards}</div>
    </div>
  );
};

export default Dashboard;
