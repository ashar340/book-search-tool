import { Link } from "react-router-dom";
import styled from "styled-components";

const PageNotFoundMain = styled.main`
  background-position: top;
  background-size: cover;
  min-height: 100%;
  background-image: url("https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75");

  @media (min-width: 640px) {
    background-position: top;
  }
`;

const PageNotFoundMainContainer = styled.div`
  padding: 1rem 4rem;
  text-align: center;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 640px) {
    padding: 6rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 12rem 2rem;
  }
`;

const PageNotFoundTitle = styled.h1`
  margin-top: 0.5rem;
  color: #ffffff;
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.025em;

  @media (min-width: 640px) {
    font-size: 3rem;
    line-height: 1;
  }
`;

export default function PageNotFound() {
  return (
    <>
      <PageNotFoundMain>
        <PageNotFoundMainContainer>
          <p
            style={{
              color: "#000000",
              opacity: 0.5,
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            404 error
          </p>
          <PageNotFoundTitle>Uh oh!This Page does not exist</PageNotFoundTitle>

          <div style={{ marginTop: "1.5rem", textDecoration: "none" }}>
            <Link
              style={{
                display: "inline-flex",
                padding: "0.5rem 1rem",
                backgroundColor: "#ffffff",
                color: "#000000",
                opacity: 0.75,
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                fontWeight: 500,
               
                alignItems: "center",
                borderRadius: "0.375rem",
                borderWidth: "1px",
                borderColor: "transparent",
              }}
              to="/"
            >
              Go back home
            </Link>
          </div>
        </PageNotFoundMainContainer>
      </PageNotFoundMain>
    </>
  );
}
