"use client";

import { useState, SyntheticEvent } from "react";
import { Toaster, toast } from "sonner";

type Error = {
  url?: string;
  custom?: string;
};

type Response = {
  originalUrl: string;
  shortId: string;
};

type State =
  | {
      status: "error";
      error: Error | null;
    }
  | {
      status: "loading" | "initial";
      data: null;
    }
  | {
      status: "success";
      data: Response;
    };

export default function Home() {
  const [pageData, setPageData] = useState<State>({
    status: "initial",
    data: null,
  });

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setPageData({ status: "loading", data: null });
    const target = event.target as typeof event.target & {
      url: { value: string };
      custom: { value: string };
    };
    const url = target.url.value;
    const custom = target.custom.value;

    try {
      const res = await fetch("api/shorten", {
        body: JSON.stringify({ url, custom }),
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        return setPageData({ error: data.error as Error, status: "error" });
      }

      setPageData({ data: data as Response, status: "success" });
    } catch (error) {
      toast("Something went wrong. Please try again.");
      return setPageData({ error: null, status: "error" });
    }
  };

  const copyContent = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied to clipboard.");
    } catch (err) {
      toast("Failed to copy. Sorry!");
    }
  };

  const shortUrl =
    pageData.status === "success"
      ? `${window.origin}/${pageData.data?.shortId}`
      : null;

  return (
    <main className="flex min-h-full flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:min-w-[460px]">
          <div className="bg-white p-6 rounded-md border-gray-400 shadow">
            <div>
              <img className="h-12 w-auto" src="/logo.png" alt="Your Company" />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {pageData.status === "success"
                  ? "Here's your new link!"
                  : "Shorten a long URL"}
              </h2>
            </div>

            <div className="mt-10">
              {pageData.status !== "success" && (
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                        aria-invalid="true"
                        aria-describedby="url-error"
                        className=" px-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                      />
                      <p className="mt-2 text-sm text-red-600" id="url-error">
                        {pageData.status === "error" && pageData.error?.url}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="custom"
                      className="block font-medium leading-6 text-gray-900"
                    >
                      Customize{" "}
                      <span className="text-gray-400 font-light">
                        (optional)
                      </span>
                    </label>
                    <div className="mt-2">
                      <input
                        id="custom"
                        name="custom"
                        type="custom"
                        className="px-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                      />
                      <p className="mt-2 text-sm text-red-600" id="url-error">
                        {pageData.status === "error" && pageData.error?.custom}
                      </p>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={pageData.status === "loading"}
                      className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 disabled:hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                    >
                      {pageData.status === "loading" ? (
                        <span
                          aria-label="loading"
                          className="h-6 w-6 rounded-full animate-spin border-cyan-200 border-l-cyan-900 border-4"
                        />
                      ) : (
                        "Generate"
                      )}
                    </button>
                  </div>
                </form>
              )}
              {pageData.status === "success" && shortUrl && (
                <div>
                  <p className="px-2 block w-full rounded-md py-1.5 shadow-sm sm:text-sm sm:leading-6 mb-6 ring-1 ring-inset ring-gray-300">
                    {shortUrl}
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => copyContent(shortUrl)}
                      className="flex w-full justify-center rounded-md border-cyan-600 border px-3 py-1.5 font-semibold leading-6 text-cyan-600 shadow-sm hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => {
                        setPageData({ status: "initial", data: null });
                      }}
                      className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                    >
                      Shorten Another
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          alt="This is the sign you've been looking for."
        />
      </div>
      <Toaster position="bottom-left" />
    </main>
  );
}
