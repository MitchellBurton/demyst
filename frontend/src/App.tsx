import { useEffect, useState } from "react";
import { BalanceSheetTable, Report } from "./BalanceSheetTable";

function App() {
  const [report, setReport] = useState<Report | undefined>();

  // Get data from the API
  useEffect(() => {
    // TODO: error handling
    fetch("http://localhost:9000/balanceSheetReport")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReport(data);
      });
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="card">
        {report && <BalanceSheetTable report={report} />}
        {!report && <div>Loading...</div>}
      </div>
      <p className="read-the-docs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam numquam
        aut ratione minus, molestias illo error maxime architecto est. Saepe
        illum sint, possimus nostrum consectetur fuga incidunt alias modi
        minima!
      </p>
    </>
  );
}

export default App;
