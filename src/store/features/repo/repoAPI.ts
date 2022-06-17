// A mock function to mimic making an async request for data
import axios from "axios";

export function fetchRepoData(
  repoKeyword: string,
  pageInd: number,
  perPage: number
) {
  return axios
    .get(`https://api.github.com/search/repositories`, {
      params: {
        q: `${repoKeyword} in:name`,
        page: pageInd,
        per_page: perPage,
        sort: "stars",
        order: "desc",
      },
    })
    .then((res) => res.data);
}
