import { BalanceSheetTable } from "./components/BalanceSheetTable";
import { Report } from "./types/balanceSheetTypes";
import { useQuery } from "@tanstack/react-query";

function App() {
  // const [report, setReport] = useState<Report | undefined>();

  const { isPending, error, data } = useQuery({
    queryKey: ["balanceSheetReport"],
    queryFn: () =>
      fetch("http://localhost:9000/balanceSheetReport").then((res) =>
        res.ok
          ? (res.json() as Promise<Report>)
          : Promise.reject({ message: res.statusText })
      ),
  });

  console.log({ isPending, error, data });

  return (
    <>
      <h1 className="text-3xl font-bold underline">Demyst Coding Assignment</h1>
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && <BalanceSheetTable report={data} />}
    </>
  );
}

export default App;
