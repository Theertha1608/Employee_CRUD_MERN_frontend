import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className="text-4xl font-bold mb-8">Employee Management</header>

      <section className="flex items-center gap-28">
     
        <Link href="/create-emp" className="text-decoration-none">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96 h-[200px]  mr-4 border-2 border-blue-500 transition-all hover:border-blue-700 hover:transform hover:translate-y-[-5px] cursor-pointer">
            <h2 className="text-2xl font-bold mb-4 text-center mt-12">
              Create Employee
            </h2>
        
          </div>
        </Link>

   
        <Link href="/view-all-emp" className="text-decoration-none">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96 h-[200px] border-2 border-green-500 transition-all hover:border-green-700 hover:transform hover:translate-y-[-5px] cursor-pointer">
            <h2 className="text-2xl font-bold mb-4 text-center mt-12">
              View All Employees
            </h2>
        
          </div>
        </Link>
      </section>

      <footer className="text-gray-600 mt-8">
        2024 Employee Management System
      </footer>
    </main>
  );
}
