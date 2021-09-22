/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
export default class Request {
  constructor(url) {
    this.server = `${url}helpdesk`;
  }

  get(params) {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.open('GET', `${this.server}${params}`);
      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              resolve(xhr.response);
            } catch (error) {
              reject(error);
            }
          }
        }
      });

      xhr.send();
    });
  }

  update(method, params, values) {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve) => {
      xhr.open(method, `${this.server}${params}`);

      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 204) {
            resolve(xhr.response);
          }
        }
      });

      xhr.send(values);
    });
  }

  allTickets() {
    return this.get('?method=allTickets');
  }

  ticketById(id) {
    return this.get(`?method=ticketById&id=${id}`);
  }

  createTicket(title, description, status) {
    const values = new URLSearchParams();
    values.append('title', title);
    values.append('description', description);
    values.append('status', status);

    return this.update('POST', '?method=createTicket', values);
  }

  removeTicket(id) {
    const values = new URLSearchParams();
    values.append('currentId', id);

    return this.update('DELETE', `/${id}`, values);
  }

  changeStatus(id) {
    const values = new URLSearchParams();
    values.append('currentId', id);

    return this.update('PUT', `/${id}`, values);
  }

  editTicket(id, title, description) {
    const values = new URLSearchParams();
    values.append('currentId', id);
    values.append('title', title);
    values.append('description', description);

    return this.update('PUT', `/${id}`, values);
  }
}