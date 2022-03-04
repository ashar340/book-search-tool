import React, { useEffect } from "react";
import {
  createSearchParams,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";

const defaultParams = { page: "1", limit: "10" };

const HeroSectionContainer = styled.div`
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const HeroSectionSubContainer = styled.div`
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

  @media (min-width: 640px) {
    overflow: hidden;
    border-radius: 1rem;
  }
`;

const PillInput = styled.input`
  display: block;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  height: 2.5rem;
  border-radius: 9999px;
  border-color: #d1d5db;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 640px) {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  @media (min-width: 768px) {
    width: 75%;
  }
`;

const HeroSectionContent = styled.div`
  position: relative;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 4rem;
  padding-bottom: 4rem;

  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 6rem;
    padding-bottom: 6rem;
  }

  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
`;

const HeroSectionTitle = styled.h1`
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  text-align: center;

  @media (min-width: 640px) {
    font-size: 3rem;
    line-height: 1;
  }

  @media (min-width: 1024px) {
    font-size: 3.75rem;
    line-height: 1;
  }
`;

const SearchButton = styled.button`
  display: flex;
  padding: 0.75rem 1rem;
  margin: 0.75rem auto;
  background-color: #ffffff;
  color: #4338ca;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  border-radius: 0.375rem;
  border-width: 1px;
  border-color: transparent;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  @media (min-width: 640px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const MultiplyBlender = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  mix-blend-mode: multiply;
`;

const Search = ({ loading }: { loading: boolean }): JSX.Element => {
  const [error, setError] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  let { searchTerm } = useParams();

  useEffect(() => {
    if (inputRef.current && searchTerm) {
      inputRef.current.value = searchTerm;
    }
  }, [searchTerm]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let searchTerm = formData.get("search") as string;

    if (typeof searchTerm == "string" && searchTerm.length > 0) {
      navigate({
        pathname: `/search/${searchTerm}`,
        search: `?${createSearchParams(defaultParams)}`,
      });
    } else {
      inputRef.current?.focus();
      setError("Please enter a book's name to begin");
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <div
        style={{
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <HeroSectionContainer>
          <HeroSectionSubContainer>
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            >
              <MultiplyBlender />
              <img
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Pile of Books"
              />

              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  mixBlendMode: "multiply",
                }}
              ></div>
            </div>
            <HeroSectionContent>
              <form data-testid="search-form" onSubmit={submitHandler}>
                <HeroSectionTitle>
                  <span style={{ display: "block", color: "#10B981" }}>
                    Open Library Search Tool
                  </span>
                </HeroSectionTitle>
                <div>
                  <label
                    htmlFor="search"
                    style={{
                      display: "block",
                      paddingLeft: "1rem",
                      marginLeft: "1px",
                      color: "#374151",
                      fontSize: "0.875rem",
                      lineHeight: "1.25rem",
                      fontWeight: 500,
                    }}
                    className="sr-only"
                  >
                    Search
                  </label>
                  <div style={{ marginTop: "0.25rem" }}>
                    <PillInput
                      type="text"
                      name="search"
                      id="search"
                      placeholder="The Great Gatsby"
                      ref={inputRef}
                      onChange={(e) => {
                        setError("");
                      }}
                    />
                    {error.length > 0 && (
                      <p data-testid="search-error" className="error">
                        {error}
                      </p>
                    )}
                  </div>
                </div>

                <SearchButton disabled={loading} type="submit">
                  Search
                </SearchButton>
              </form>
            </HeroSectionContent>
          </HeroSectionSubContainer>
        </HeroSectionContainer>
      </div>

      <Outlet />
    </div>
  );
};

export default Search;
