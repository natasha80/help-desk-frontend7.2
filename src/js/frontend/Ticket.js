/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
export default class Ticket {
  constructor(id, title, created, status) {
    this.id = id;
    this.title = title;
    this.status = status;

    const statusClass = this.status ? 'done' : 'empty';

    const date = new Date(created).toLocaleString().substring(0, 10);
    const time = new Date(created).toLocaleTimeString().substring(0, 5);

    this.ticket = document.createElement('div');
    this.ticket.classList.add('helpdesk__ticket');
    this.ticket.innerHTML = `
      <div class="helpdesk-ticket__status control__button button ${statusClass}"></div>
      <div class="helpdesk-ticket__description">
        <span class="ticket-description__text">${title}</span>
      </div>
      <div class="helpdesk-ticket__control">
        <div class="ticket-control__created">${date} ${time}</div>
        <div class="ticket-control__editing control__button button">✎</div>
        <div class="ticket-control__removing control__button button">✘</div>
      </div>
    `;
  }
}