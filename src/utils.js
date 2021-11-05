const initFieldData = () => {
  const data = [];
  for (let i = 0; i < 9; i++) {
    data.push({
      id: i,
      value: undefined,
    });
  }
  return data;
};

export default initFieldData;
