import { omit } from 'lodash';

const pollsDataNormalizer = componentData => {
  return {
    ...omit(componentData, ['siteToken', 'config.enableVoteRole']),
    poll: normalizePoll(componentData.poll),
  };
};

export const normalizePoll = poll => {
  const blackList = [
    'anonymousCount',
    'count',
    'creatorFlag',
    'ownVotes',
    'latestVoters',
    'rating',
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalizedPoll = omit<{ options: any }>(poll, blackList);
  normalizedPoll.options = poll.options.map(option => omit(option, blackList));
  return normalizedPoll;
};

export default pollsDataNormalizer;
