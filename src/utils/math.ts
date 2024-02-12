interface GetRandomIntParams {
  min?: number;
  max: number;
}

export const getRandomInt = (params: GetRandomIntParams) => {
  const min = params.min ? Math.ceil(params.min) : 0;
  const max = Math.floor(params.max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
