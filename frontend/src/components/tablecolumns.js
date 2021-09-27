const tablecolumns = [
  {
    Header: "Title",
    accessor: "title",
    sortType: "alphanumeric",
  },
  {
    Header: "Authors",
    accessor: "authors",
    sortType: "alphanumeric",
  },
  {
    Header: "Source",
    accessor: "source",
    sortType: "alphanumeric",
  },
  {
    Header: "Pub. Year",
    accessor: "pubyear",
    sortType: "alphanumeric",
  },
  {
    Header: "DOI",
    accessor: "doi",
    sortType: "alphanumeric",
  },
  ,
  {
    Header: "Claimed Benefit",
    accessor: "claim",
    sortType: "alphanumeric",
  },
  {
    Header: "Level of Evidence",
    accessor: "evidence",
    sortType: "alphanumeric",
  },
];

module.exports = tablecolumns;
