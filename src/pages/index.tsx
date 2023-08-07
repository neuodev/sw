import Stopwatch from "@/app/components/Stopwatch";
import Layout from "../app/components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="py-20">
        <Stopwatch />
      </div>
    </Layout>
  );
}
