import Stopwatch from "@/app/components/Stopwatch";
import Layout from "../app/components/Layout";
import TimeRecords from "@/app/components/TimeRecords";

export default function Home() {
  return (
    <Layout>
      <div className="py-20 flex items-center justify-center flex-col">
        <div>
          <Stopwatch />
        </div>
        <div className="mt-20">
          <TimeRecords />
        </div>
      </div>
    </Layout>
  );
}
