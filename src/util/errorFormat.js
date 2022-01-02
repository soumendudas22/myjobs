const format = (errors) => {
  const b = {};
  errors.forEach(el => {
    b[Object.keys(el)[0]] = el[Object.keys(el)[0]];
  });
  return b;
}

export {
  format
}