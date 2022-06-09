const url = "https://jsonplaceholder.typicode.com/";

export const onGet = (endpoint: string) => {
  return fetch(url + endpoint).then((res) => res.json());
};

export const onPost = (endpoint: string, object: any) => {
  return fetch(url + endpoint, {
    method: "POST",
    body: JSON.stringify(object),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((res) => res.json());
};

export const onPut = (endpoint: string, object: any) => {
  return fetch(url + endpoint, {
    method: "PUT",
    body: JSON.stringify(object),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((res) => res.json());
};

export const onDelete = (endpoint: string) => {
  return fetch(url + endpoint, {
    method: "DELETE",
  }).then((res) => res.json());
};
