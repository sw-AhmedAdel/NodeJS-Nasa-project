DEFUALT_PAGE_NUMBER = 1;
DEFUALT_LIMIT_NUMBER = 0;

function getPagination(query) {
  const page = Math.abs(query.page) || DEFUALT_PAGE_NUMBER;
  const limit = Math.abs(query.limit) || DEFUALT_LIMIT_NUMBER;
  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  };
}

module.exports = {
  getPagination,
};
