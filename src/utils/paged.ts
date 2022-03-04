// const handleChangePage = (
//   _event: React.MouseEvent<HTMLButtonElement> | null,
//   newPage: number
// ) => {
//   const oneBasedNewPage = newPage + 1;

//   urlParams.set("page", oneBasedNewPage.toString());
//   history.push({
//     pathname: location.pathname,
//     search: `?${urlParams}`,
//   });
// };

// const handleChangeRowsPerPage = (
//   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// ) => {
//   const numRowPerPage = parseInt(event.target.value, 10);

//   urlParams.set("limit", numRowPerPage.toString());

//   // go to first page and upate url
//   handleChangePage(null, 0);
// };
export default {};
