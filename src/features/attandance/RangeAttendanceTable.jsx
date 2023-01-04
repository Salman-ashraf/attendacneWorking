import { addDays } from "date-fns";
import React, { useEffect } from "react";
import AttandanceTable from "./AttandanceTable";

let cal = 2;
const RangeAttendanceTable = ({ range }) => {


  let start = new Date(range[0].startDate);
  let end = new Date(range[0].endDate);
  const alldates = [];
  while (start <= end) {
    alldates.push(start);
    start = addDays(new Date(start), 1);
  }



  let content;

  content = alldates.map((date) => 
    <AttandanceTable date={date} />
  );

  return <>

 {/* {content && content} */}
 </>;
};

export default RangeAttendanceTable;
