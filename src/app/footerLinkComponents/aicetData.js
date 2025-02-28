/* eslint-disable no-undef */
// Dynamic imports for all PDFs
const pdfFiles = {
  "2023-24": () => import("./AICTE/2023-24.pdf"),
  "2022-23": () => import("./AICTE/2022-23.pdf"),
  "2021-22": () => import("./AICTE/2021-22.pdf"),
  "2020-21": () => import("./AICTE/2020-21.pdf"),
  "2019-20": () => import("./AICTE/2019-20.pdf"),
  "2018-19": () => import("./AICTE/2018-19.pdf"),
  "2017-18": () => import("./AICTE/2017-18.pdf"),
  "2016-17": () => import("./AICTE/2016-17.pdf"),
  "2015-16": () => import("./AICTE/2015-16.pdf"),
  "2014-15": () => import("./AICTE/2014-15.pdf"),
  "2013-14": () => import("./AICTE/2013-14.pdf"),
  "2012-13": () => import("./AICTE/2012-13.pdf"),
  "2011-12": () => import("./AICTE/2011-12.pdf"),
  "2010-11": () => import("./AICTE/2010-11.pdf"),
  "2009-10": () => import("./AICTE/2009-10.pdf"),
  "2008-09": () => import("./AICTE/2008-09.pdf"),
  "2007-08": () => import("./AICTE/2007-08.pdf"),
  "2006-07": () => import("./AICTE/2006-07.pdf"),
  "2004-06": () => import("./AICTE/2004-05 & 2005-06.pdf"),
  "2003-04": () => import("./AICTE/2003-04.pdf"),
  "2002-03": () => import("./AICTE/2002-03.pdf"),
  "2000-02": () => import("./AICTE/2001-02.pdf"),
  "1999-00": () => import("./AICTE/1999-2000.pdf"),
  "1998-99": () => import("./AICTE/1998-99.pdf"),
  "1997-98": () => import("./AICTE/1997-98.pdf"),
  "1996-97": () => import("./AICTE/1996-97.pdf"),
  "1995-96": () => import("./AICTE/1995-96.pdf"),
  "1994-95": () => import("./AICTE/1994-95.pdf"),
};

export const yearGroups = [
  {
    id: "recent",
    label: "Recent",
    years: ["2023-24", "2022-23", "2021-22", "2020-21", "2019-20"],
  },
  {
    id: "2010s",
    label: "2010s",
    years: [
      "2018-19",
      "2017-18",
      "2016-17",
      "2015-16",
      "2014-15",
      "2013-14",
      "2012-13",
      "2011-12",
      "2010-11",
    ],
  },
  {
    id: "2000s",
    label: "2000s",
    years: [
      "2009-10",
      "2008-09",
      "2007-08",
      "2006-07",
      "2004-06",
      "2003-04",
      "2002-03",
      "2000-02",
    ],
  },
  {
    id: "1990s",
    label: "1990s",
    years: ["1999-00", "1998-99", "1997-98", "1996-97", "1995-96", "1994-95"],
  },
];

// Add the PDFs to the export
export { pdfFiles };
