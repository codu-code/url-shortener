import type { SyntheticEvent } from "react";

export default function Home() {
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      url: { value: string };
      alias: { value: string };
    };
    const url = target.url.value;
    const alias = target.alias.value;

    console.log({ url, alias });
  };

  return (
    <main className="flex min-h-full flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:min-w-[460px]">
          <div className="bg-white p-6 rounded-md border-gray-400 shadow">
            <div>
              <img className="h-12 w-auto" src="/logo.png" alt="Your Company" />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Shorten a long URL
              </h2>
            </div>

            <div className="mt-10">
              <div>
                <form action="submit" method="POST" className="space-y-6">
                  <div>
                    <label
                      htmlFor="url"
                      className="block font-medium leading-6 text-gray-900"
                    >
                      URL
                    </label>
                    <div className="mt-2">
                      <input
                        id="url"
                        name="url"
                        type="url"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="alias"
                      className="block font-medium leading-6 text-gray-900"
                    >
                      Customize{" "}
                      <span className="text-gray-400 font-light">
                        (optional)
                      </span>
                    </label>
                    <div className="mt-2">
                      <input
                        id="alias"
                        name="alias"
                        type="alias"
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                    >
                      Generate
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          alt=""
        />
      </div>
    </main>
  );
}
