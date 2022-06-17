import React from "react";
import App from "../App";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import mockRes from "./mockRes.json";
import { Provider } from "react-redux";
import { store } from "../store/initStore";

const server = setupServer(
  rest.get("https://api.github.com/search/repositories", (req, res, ctx) => {
    //console.log(req.params);
    const qParam = req.url.searchParams.get("q");
    if (qParam === "empty in:name") {
      return res(
        ctx.json({
          total_count: 0,
          incomplete_results: false,
          items: [],
        })
      );
    }
    return res(ctx.json(mockRes));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders first page", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByPlaceholderText("Search Keyword")).toBeInTheDocument();
  expect(screen.getByText("Search")).toBeInTheDocument();
  expect(
    screen.getByText("Search Github Repositories by Name")
  ).toBeInTheDocument();
});

test("fetch repo data", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  fireEvent.change(screen.getByPlaceholderText("Search Keyword"), {
    target: { value: "react" },
  });
  expect(screen.getByPlaceholderText("Search Keyword")).toHaveAttribute(
    "value",
    "react"
  );
  fireEvent.click(screen.getByText("Search"));

  await waitFor(() => expect(screen.getByText("Search")).toBeDisabled());
  expect(screen.getByTestId("test-circle-progress")).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText("Search")).not.toBeDisabled());
  expect(screen.queryByTestId("test-circle-progress")).not.toBeInTheDocument();
  const repoItems = screen.getAllByTestId("test-repoitem");
  expect(repoItems.length).toBe(10);
});

test("handle empty response", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  fireEvent.change(screen.getByPlaceholderText("Search Keyword"), {
    target: { value: "empty" },
  });
  expect(screen.getByPlaceholderText("Search Keyword")).toHaveAttribute(
    "value",
    "empty"
  );
  fireEvent.click(screen.getByText("Search"));
  await waitFor(() => expect(screen.getByText("Search")).toBeDisabled());
  await waitFor(() => expect(screen.getByText("Search")).not.toBeDisabled());
  expect(screen.getByText("No Repository")).toBeInTheDocument();
});

test("handles server error", async () => {
  server.use(
    rest.get("https://api.github.com/search/repositories", (req, res, ctx) =>
      res(ctx.status(422), ctx.json({ message: "Fetch Error" }))
    )
  );
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  fireEvent.change(screen.getByPlaceholderText("Search Keyword"), {
    target: { value: "react" },
  });
  fireEvent.click(screen.getByText("Search"));

  await waitFor(() => expect(screen.getByText("Search")).toBeDisabled());
  await waitFor(() => expect(screen.getByText("Search")).not.toBeDisabled());

  expect(screen.getByText("Fetch Error")).toBeInTheDocument();
});
