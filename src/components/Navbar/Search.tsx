"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";

const Search = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex-1 w-full items-center justify-center hidden md:flex text-black"
    >
      <div className="flex w-full -space-x-10 items-center justify-center">
        <Input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-5/12"
        />
        <button
          type="button"
          onClick={() => handleSearch()}
          className="h-10 w-10 flex items-center justify-center bg-slate-200 text-black rounded-md rounded-s-none"
        >
          <SearchIcon size={25} />
        </button>
      </div>
    </form>
  );
};

export default Search;
