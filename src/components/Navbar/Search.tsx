"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { SearchIcon } from "lucide-react";

interface Product {
  id: string;
  name: string;
  image: string;
}

const Search = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          const response = await fetch(`/api/search?query=${query}`);
          const products = await response.json();
          setSuggestions(products);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleSearchClick = () => {
    if (query.trim()) {
      try {
        router.push(`/search?query=${query}`);
        return setQuery(""), router.refresh()
      } catch (error) {
        return null;
      }
    }
  };

  return (
    <div className="relative flex justify-center w-full">
      <Autocomplete
        freeSolo
        disableClearable
        options={suggestions}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.name
        }
        onInputChange={(event, value) => setQuery(value)}
        onChange={(event, value) => {
          const selectedProduct =
            typeof value === "string"
              ? suggestions.find((product) => product.name === value)
              : value;

          if (selectedProduct && selectedProduct.id) {
            router.push(`/product/${selectedProduct.id}`);
            setQuery("");
          }
        }}
        onClose={() => setSuggestions([])}
        loading={loading}
        inputValue={query}
        open={query.trim().length > 0}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Ürünleri ara"
            size="small"
            sx={{
              width: "60%",
              minWidth: "500px",
              "& .MuiInputBase-root": {
                borderRadius: "5px",
                bgcolor: "white",
              },
              "& .MuiInputLabel-root": {
                color: "gray",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "red",
              },
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  <IconButton onClick={handleSearchClick}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearchClick();
              }
            }}
          />
        )}
        renderOption={(props, option) => {
          const product =
            typeof option === "string"
              ? suggestions.find((prod) => prod.name === option)
              : option;

          return (
            <li {...props} key={product?.id}>
              <img
                src={product?.image}
                alt={product?.name}
                className="h-14 w-14 object-contain mr-5"
              />
              {product?.name}
            </li>
          );
        }}
      />
    </div>
  );
};

export default Search;
