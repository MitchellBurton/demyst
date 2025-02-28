import { useEffect, useState } from "react";
import { BalanceSheetTable } from "./components/BalanceSheetTable";
import { Report } from "./types/balanceSheetTypes";

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
      <h1 className="text-3xl font-bold underline">Demyst Coding Assignment</h1>
      {report && <BalanceSheetTable report={report} />}
      {!report && <div>Loading...</div>}
    </>
  );
}

export default App;
