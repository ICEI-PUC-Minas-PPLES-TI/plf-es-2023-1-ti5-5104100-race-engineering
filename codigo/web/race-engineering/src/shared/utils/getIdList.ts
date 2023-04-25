type Options = {
  list: any[];
};

export const getIdList = ({ list }: Options) => {
  const idList = list?.map((item) => item?.id);

  return idList;
};
